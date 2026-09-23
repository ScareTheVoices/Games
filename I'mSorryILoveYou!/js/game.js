/* ============================================================
   GAME.JS
   Owns game.html: the school map, player movement, NPC placement
   per the schedule system, dialogue hookup, phase flow, and the
   pause menu. This file is the "systems" layer — it reads data
   from characters.js/schedule.js/dialogue.js/etc rather than
   duplicating any of it.
   ============================================================ */

(function (YG) {
  'use strict';

  const HANDOFF_KEY = 'yandere_rpg_pending_player';

  // --- world / room layout -----------------------------------------
  // Simple non-overlapping rectangles in world pixel space. Doors are
  // implied by adjacency, not simulated as separate collidable objects —
  // the prototype uses free movement within the world bounds rather than
  // per-wall collision (see project notes at the end of the README).
  const WORLD = { w: 1040, h: 560 };

  const ROOMS = [
    { id: 'school_entrance', label: 'School Entrance', x: 20, y: 20, w: 170, h: 120 },
    { id: 'hallway', label: 'Hallway', x: 210, y: 20, w: 610, h: 120 },
    { id: 'courtyard', label: 'Courtyard', x: 840, y: 20, w: 180, h: 250 },
    { id: 'homeroom', label: 'Homeroom', x: 20, y: 160, w: 230, h: 160 },
    { id: 'cafeteria', label: 'Cafeteria', x: 270, y: 160, w: 230, h: 160 },
    { id: 'library', label: 'Library', x: 520, y: 160, w: 300, h: 110 },
    { id: 'gym', label: 'Gym', x: 520, y: 290, w: 300, h: 130 },
    { id: 'cooking_club_room', label: 'Cooking Club', x: 20, y: 340, w: 230, h: 150 },
    { id: 'photography_club_room', label: 'Photography Club', x: 270, y: 340, w: 230, h: 150 },
    { id: 'occult_club_room', label: 'Occult Club', x: 840, y: 290, w: 180, h: 200 }
  ];

  const CLUB_ROOM_BY_CLUB = {
    cooking_club: 'cooking_club_room',
    photography_club: 'photography_club_room',
    occult_club: 'occult_club_room'
  };

  const roomById = {};
  ROOMS.forEach((r) => (roomById[r.id] = r));

  const SPRITE_SIZE = 28;
  const MOVE_SPEED = 230; // px/sec
  const INTERACT_RANGE = 46;

  // --- mutable state --------------------------------------------------
  const state = {
    player: null,
    keys: {},
    pos: { x: 0, y: 0 },
    npcSprites: {}, // npcId -> { el, x, y, character, locationId }
    lastFrameTime: 0,
    dialogueOpen: false,
    menuOpen: false,
    nearestNpcId: null,
    yandereCase: null
  };

  let els = {};

  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    const pending = window.localStorage.getItem(HANDOFF_KEY);
    if (!pending) {
      // No character was created this session — send the player back
      // to the title screen rather than showing a broken game state.
      window.location.href = 'index.html';
      return;
    }

    cacheEls();

    try {
      await Promise.all([YG.Characters.load(), YG.Dialogue.load(), YG.Events.load()]);
    } catch (err) {
      console.error(err);
      els.mapViewport.innerHTML =
        '<p style="padding:2rem;color:#f8f7f2;">Could not load game data. If you opened this file directly, ' +
        'run a local server (for example <code>python -m http.server</code>) and reload.</p>';
      return;
    }

    const player = JSON.parse(pending);
    player.relationships = YG.Relationships.createTable(YG.Characters.relationshipEligibleIds());
    state.player = player;
    YG.currentPlayer = player;
    state.yandereCase = YG.Yandere.emptyCase();

    window.localStorage.removeItem(HANDOFF_KEY);

    buildRooms();
    wireMovement();
    wireMenu();
    wireDialogueClose();
    els.hudNextBtn.addEventListener('click', advancePhase);
    els.announcementContinue.addEventListener('click', advancePhase);

    startPhase(player.phase);
    requestAnimationFrame(loop);
  }

  function cacheEls() {
    els = {
      mapViewport: document.getElementById('map-viewport'),
      mapWorld: document.getElementById('map-world'),
      hudPhase: document.getElementById('hud-phase'),
      hudDay: document.getElementById('hud-day'),
      hudNextBtn: document.getElementById('hud-next-phase-btn'),
      moveHint: document.getElementById('move-hint'),
      clubLockBanner: document.getElementById('club-lock-banner'),
      interactPrompt: document.getElementById('interact-prompt'),
      phaseCurtain: document.getElementById('phase-curtain'),
      phaseCurtainTitle: document.getElementById('phase-curtain-title'),
      phaseCurtainSub: document.getElementById('phase-curtain-sub'),
      announcementPanel: document.getElementById('announcement-panel'),
      announcementText: document.getElementById('announcement-text'),
      announcementContinue: document.getElementById('announcement-continue'),
      goingHomePanel: document.getElementById('going-home-panel'),
      goingHomeList: document.getElementById('going-home-list'),
      pauseMenu: document.getElementById('pause-menu'),
      menuBody: document.getElementById('menu-body'),
      menuCloseBtn: document.getElementById('menu-close-btn'),
      hudMenuBtn: document.getElementById('hud-menu-btn')
    };
  }

  // --- room / world rendering -----------------------------------------

  function buildRooms() {
    els.mapWorld.style.width = WORLD.w + 'px';
    els.mapWorld.style.height = WORLD.h + 'px';

    ROOMS.forEach((room) => {
      const div = document.createElement('div');
      div.className = 'room';
      div.style.left = room.x + 'px';
      div.style.top = room.y + 'px';
      div.style.width = room.w + 'px';
      div.style.height = room.h + 'px';

      const label = document.createElement('div');
      label.className = 'room-label';
      label.textContent = room.label;
      div.appendChild(label);

      els.mapWorld.appendChild(div);
    });

    const playerEl = document.createElement('div');
    playerEl.className = 'sprite sprite-player';
    playerEl.id = 'player-sprite';
    playerEl.textContent = '';
    els.mapWorld.appendChild(playerEl);
    els.playerEl = playerEl;

    // The interact prompt needs to scroll with the world (it points at an
    // NPC sprite), so it's reparented into map-world rather than staying a
    // fixed-position sibling.
    els.mapWorld.appendChild(els.interactPrompt);
  }

  // --- camera -------------------------------------------------------------
  // No physics engine, just a simple centered-on-player camera implemented
  // as a CSS transform on the whole map-world layer.
  function updateCamera() {
    const viewportRect = els.mapViewport.getBoundingClientRect();
    const vw = viewportRect.width;
    const vh = viewportRect.height;
    let camX = state.pos.x + SPRITE_SIZE / 2 - vw / 2;
    let camY = state.pos.y + SPRITE_SIZE / 2 - vh / 2;
    camX = Math.min(Math.max(camX, 0), Math.max(0, WORLD.w - vw));
    camY = Math.min(Math.max(camY, 0), Math.max(0, WORLD.h - vh));
    els.mapWorld.style.transform = 'translate(' + -camX + 'px, ' + -camY + 'px)';
  }

  function roomCenter(roomId) {
    const r = roomById[roomId] || roomById.hallway;
    return { x: r.x + r.w / 2 - SPRITE_SIZE / 2, y: r.y + r.h / 2 - SPRITE_SIZE / 2 };
  }

  function clampToRoom(x, y, room) {
    const pad = 6;
    return {
      x: Math.min(Math.max(x, room.x + pad), room.x + room.w - SPRITE_SIZE - pad),
      y: Math.min(Math.max(y, room.y + pad), room.y + room.h - SPRITE_SIZE - pad)
    };
  }

  // --- movement ---------------------------------------------------------

  function wireMovement() {
    window.addEventListener('keydown', (e) => {
      const k = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) {
        state.keys[k] = true;
      }
      if (k === 'e') {
        tryInteract();
      }
      if (k === 'escape') {
        toggleMenu();
      }
    });
    window.addEventListener('keyup', (e) => {
      state.keys[e.key.toLowerCase()] = false;
    });
  }

  function loop(timestamp) {
    const dt = state.lastFrameTime ? (timestamp - state.lastFrameTime) / 1000 : 0;
    state.lastFrameTime = timestamp;

    if (!state.dialogueOpen && !state.menuOpen && YG.Phases.isExplorable(state.player.phase)) {
      updateMovement(dt);
    }
    updateInteractPrompt();

    requestAnimationFrame(loop);
  }

  function updateMovement(dt) {
    let dx = 0;
    let dy = 0;
    if (state.keys.w || state.keys.arrowup) dy -= 1;
    if (state.keys.s || state.keys.arrowdown) dy += 1;
    if (state.keys.a || state.keys.arrowleft) dx -= 1;
    if (state.keys.d || state.keys.arrowright) dx += 1;

    if (dx === 0 && dy === 0) return;

    const len = Math.hypot(dx, dy) || 1;
    let nx = state.pos.x + (dx / len) * MOVE_SPEED * dt;
    let ny = state.pos.y + (dy / len) * MOVE_SPEED * dt;

    if (state.player.phase === 'club') {
      // Club Activity: confined to the player's own club room.
      const clubRoom = roomById[CLUB_ROOM_BY_CLUB[state.player.club]];
      const clamped = clampToRoom(nx, ny, clubRoom);
      nx = clamped.x;
      ny = clamped.y;
    } else {
      nx = Math.min(Math.max(nx, 0), WORLD.w - SPRITE_SIZE);
      ny = Math.min(Math.max(ny, 0), WORLD.h - SPRITE_SIZE);
    }

    state.pos.x = nx;
    state.pos.y = ny;
    els.playerEl.style.left = nx + 'px';
    els.playerEl.style.top = ny + 'px';
    updateCamera();
  }

  // --- NPCs ---------------------------------------------------------------

  function renderNpcsForPhase(phase) {
    // Clear old sprites.
    Object.values(state.npcSprites).forEach((s) => s.el.remove());
    state.npcSprites = {};

    const visibleCharacters = charactersVisibleThisPhase(phase);
    const resolved = YG.Schedule.resolveAll(visibleCharacters, state.player.day, phase);

    // Group by room so NPCs in the same room don't stack on top of each other.
    const byRoom = {};
    visibleCharacters.forEach((c) => {
      const locationId = resolved[c.id].locationId;
      byRoom[locationId] = byRoom[locationId] || [];
      byRoom[locationId].push(c);
    });

    Object.entries(byRoom).forEach(([roomId, npcs]) => {
      const room = roomById[roomId];
      if (!room) return;
      npcs.forEach((character, idx) => {
        const cols = Math.max(1, Math.floor((room.w - 20) / 40));
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const x = room.x + 16 + col * 40;
        const y = room.y + 34 + row * 40;
        spawnNpcSprite(character, Math.min(x, room.x + room.w - SPRITE_SIZE - 6), Math.min(y, room.y + room.h - SPRITE_SIZE - 6));
      });
    });
  }

  function charactersVisibleThisPhase(phase) {
    if (phase === 'club') {
      // During Club Activity the player can only see/interact with
      // members of their own club (per design spec).
      return YG.Characters.byClub(state.player.club);
    }
    return YG.Characters.students().concat(YG.Characters.staff());
  }

  function spawnNpcSprite(character, x, y) {
    const el = document.createElement('div');
    el.className = 'sprite sprite-npc' + (character.isStaff ? ' sprite-staff' : '');
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.textContent = initials(character.name);
    el.title = character.name;
    el.addEventListener('click', () => tryInteract(character.id));
    els.mapWorld.appendChild(el);
    state.npcSprites[character.id] = { el, x, y, character };
  }

  function initials(name) {
    return name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  function updateInteractPrompt() {
    if (state.dialogueOpen || state.menuOpen) {
      els.interactPrompt.classList.add('hidden');
      return;
    }
    let nearest = null;
    let nearestDist = Infinity;
    Object.entries(state.npcSprites).forEach(([id, sprite]) => {
      const d = Math.hypot(sprite.x - state.pos.x, sprite.y - state.pos.y);
      sprite.el.classList.remove('interactable');
      if (d < nearestDist) {
        nearestDist = d;
        nearest = id;
      }
    });

    if (nearest && nearestDist <= INTERACT_RANGE) {
      state.nearestNpcId = nearest;
      const sprite = state.npcSprites[nearest];
      sprite.el.classList.add('interactable');
      els.interactPrompt.textContent = 'Press E to talk to ' + sprite.character.name;
      els.interactPrompt.style.left = sprite.x + SPRITE_SIZE / 2 + 'px';
      els.interactPrompt.style.top = sprite.y + 'px';
      els.interactPrompt.classList.remove('hidden');
    } else {
      state.nearestNpcId = null;
      els.interactPrompt.classList.add('hidden');
    }
  }

  function tryInteract(forcedId) {
    if (state.dialogueOpen || state.menuOpen) return;
    const id = forcedId || state.nearestNpcId;
    if (!id) return;
    const sprite = state.npcSprites[id];
    if (!sprite) return;

    // Range check even for clicked sprites, so clicking across the map
    // doesn't teleport-talk.
    const d = Math.hypot(sprite.x - state.pos.x, sprite.y - state.pos.y);
    if (d > INTERACT_RANGE * 2.2) return;

    state.dialogueOpen = true;
    YG.Dialogue.start(sprite.character, state.player, () => {
      state.dialogueOpen = false;
    });
  }

  function wireDialogueClose() {
    // Dialogue closes itself via its own choice flow; nothing extra needed
    // here, but keeping a hook makes it easy to add an Escape-to-skip later.
  }

  // --- phase flow ---------------------------------------------------------

  function startPhase(phase) {
    hideAllOverlays();
    state.player.phase = phase;

    els.hudPhase.textContent = YG.Phases.labelFor(phase);
    els.hudDay.textContent = 'Day ' + state.player.day;

    showCurtain(YG.Phases.labelFor(phase), curtainSubtitle(phase), () => {
      runPhase(phase);
    });
  }

  function curtainSubtitle(phase) {
    switch (phase) {
      case 'morning':
        return 'Another day begins.';
      case 'freePeriod':
        return 'Time to explore.';
      case 'club':
        return 'Time for club activities.';
      case 'goingHome':
        return 'The school day is ending.';
      case 'night':
        return '...';
      default:
        return '';
    }
  }

  function showCurtain(title, subtitle, onDone) {
    els.phaseCurtain.classList.remove('hidden');
    els.phaseCurtainTitle.textContent = title;
    els.phaseCurtainSub.textContent = subtitle;
    window.setTimeout(() => {
      els.phaseCurtain.classList.add('hidden');
      onDone();
    }, 850);
  }

  function hideAllOverlays() {
    els.announcementPanel.classList.add('hidden');
    els.goingHomePanel.classList.add('hidden');
    els.clubLockBanner.classList.add('hidden');
  }

  function runPhase(phase) {
    if (phase === 'morning') {
      enterExplorable('homeroom');
    } else if (phase === 'announcements') {
      runAnnouncements();
    } else if (phase === 'freePeriod') {
      enterExplorable(null); // keep current position
    } else if (phase === 'club') {
      enterExplorable(CLUB_ROOM_BY_CLUB[state.player.club]);
      els.clubLockBanner.classList.remove('hidden');
    } else if (phase === 'goingHome') {
      runGoingHome();
    } else if (phase === 'night') {
      runNight();
    }
  }

  function enterExplorable(forcedRoomId) {
    els.mapViewport.classList.remove('hidden');
    els.hudNextBtn.classList.remove('hidden');
    els.hudNextBtn.textContent = nextButtonLabel(state.player.phase);

    if (forcedRoomId) {
      const c = roomCenter(forcedRoomId);
      state.pos.x = c.x;
      state.pos.y = c.y;
      els.playerEl.style.left = c.x + 'px';
      els.playerEl.style.top = c.y + 'px';
    }

    renderNpcsForPhase(state.player.phase);
    updateCamera();
  }

  function nextButtonLabel(phase) {
    if (phase === 'morning') return 'Head to Announcements →';
    if (phase === 'freePeriod') return 'Head to Club Activity →';
    if (phase === 'club') return 'Head Home →';
    return 'Continue →';
  }

  function runAnnouncements() {
    els.mapViewport.classList.add('hidden');
    els.hudNextBtn.classList.add('hidden');
    els.announcementPanel.classList.remove('hidden');
    els.announcementText.textContent = YG.Events.announcementFor(
      state.player.day,
      'announcements',
      state.player.flags
    );
  }

  function runGoingHome() {
    els.mapViewport.classList.add('hidden');
    els.hudNextBtn.classList.add('hidden');
    els.goingHomePanel.classList.remove('hidden');
    els.goingHomeList.innerHTML = '';

    YG.Characters.homeroomStudents().forEach((c) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = 'Walk home with ' + c.name;
      btn.addEventListener('click', () => walkHomeWith(c));
      els.goingHomeList.appendChild(btn);
    });

    const aloneBtn = document.createElement('button');
    aloneBtn.type = 'button';
    aloneBtn.textContent = 'Walk home alone';
    aloneBtn.addEventListener('click', () => walkHomeWith(null));
    els.goingHomeList.appendChild(aloneBtn);
  }

  function walkHomeWith(character) {
    els.goingHomePanel.classList.add('hidden');
    if (!character) {
      startPhase('night');
      return;
    }
    const result = YG.Relationships.adjust(state.player.relationships, character.id, 3);
    state.dialogueOpen = true;
    YG.Dialogue.start(character, state.player, () => {
      state.dialogueOpen = false;
      startPhase('night');
    });
    // Silently log the small relationship bump from the walk itself;
    // the conversation that follows can add more on top of it.
    void result;
  }

  function runNight() {
    els.mapViewport.classList.add('hidden');
    els.hudNextBtn.classList.add('hidden');
    showCurtain('Night', 'The lights go out across the dormitories.', () => {
      window.setTimeout(() => {
        state.player.day += 1;
        startPhase('morning');
      }, 400);
    });
  }

  function advancePhase() {
    const next = YG.Phases.next(state.player.phase);
    if (next) {
      startPhase(next);
    } else {
      startPhase('night');
    }
  }

  // --- pause menu -----------------------------------------------------------

  const MENU_TABS = ['character', 'relationships', 'evidence', 'map', 'save', 'settings'];

  function wireMenu() {
    els.hudMenuBtn.addEventListener('click', () => toggleMenu(true));
    els.menuCloseBtn.addEventListener('click', () => toggleMenu(false));
    document.querySelectorAll('.menu-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.menu-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        renderMenuTab(tab.dataset.tab);
      });
    });
  }

  function toggleMenu(forceOpen) {
    const open = forceOpen === undefined ? !state.menuOpen : forceOpen;
    state.menuOpen = open;
    els.pauseMenu.classList.toggle('hidden', !open);
    if (open) {
      const activeTab = document.querySelector('.menu-tab.active');
      renderMenuTab(activeTab ? activeTab.dataset.tab : 'character');
    }
  }

  function renderMenuTab(tab) {
    const body = els.menuBody;
    body.innerHTML = '';

    if (tab === 'character') {
      body.appendChild(sectionTitle('Character'));
      body.appendChild(statRow('Name', state.player.name));
      body.appendChild(statRow('Gender', capitalize(state.player.gender)));
      const club = YG.Player.CLUB_OPTIONS.find((c) => c.id === state.player.club);
      body.appendChild(statRow('Club', club ? club.label : '—'));
      body.appendChild(statRow('Day', String(state.player.day)));
    }

    if (tab === 'relationships') {
      body.appendChild(sectionTitle('Relationships'));
      const ids = YG.Characters.relationshipEligibleIds();
      if (ids.length === 0) {
        body.appendChild(emptyNote('No one to report on yet.'));
      }
      ids.forEach((id) => {
        const character = YG.Characters.get(id);
        if (!character) return;
        const value = YG.Relationships.get(state.player.relationships, id);
        const tier = YG.Relationships.tierFor(value);
        const row = document.createElement('div');
        row.className = 'relationship-row';
        row.innerHTML =
          '<span class="relationship-name">' +
          character.name +
          '</span><span class="relationship-tier tier-' +
          tier.key +
          '">' +
          tier.label +
          '</span>';
        body.appendChild(row);
      });
    }

    if (tab === 'evidence') {
      body.appendChild(sectionTitle('Evidence'));
      const items = YG.Investigation.inventory(state.player);
      if (items.length === 0) {
        body.appendChild(emptyNote('No evidence discovered yet.'));
      }
      items.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'evidence-item';
        row.innerHTML =
          '<div class="evidence-item-name">' +
          item.name +
          '</div><div class="evidence-item-desc">' +
          item.description +
          '</div>';
        body.appendChild(row);
      });
    }

    if (tab === 'map') {
      body.appendChild(sectionTitle('Map'));
      const legend = document.createElement('div');
      legend.className = 'map-legend';
      legend.innerHTML = ROOMS.map((r) => r.label).join('<br>');
      body.appendChild(legend);
    }

    if (tab === 'save') {
      body.appendChild(sectionTitle('Save'));
      const saveBtn = document.createElement('button');
      saveBtn.className = 'creation-continue';
      saveBtn.textContent = 'Save Game';
      saveBtn.addEventListener('click', () => {
        const ok = YG.Save.save(state.player, state.yandereCase);
        saveBtn.textContent = ok ? 'Saved!' : 'Save failed';
        window.setTimeout(() => (saveBtn.textContent = 'Save Game'), 1200);
      });
      body.appendChild(saveBtn);
    }

    if (tab === 'settings') {
      body.appendChild(sectionTitle('Settings'));
      const row = document.createElement('div');
      row.className = 'settings-row';
      row.innerHTML = '<span>More settings are reserved for a future update.</span>';
      body.appendChild(row);
    }
  }

  function sectionTitle(text) {
    const h = document.createElement('h3');
    h.textContent = text;
    return h;
  }

  function statRow(label, value) {
    const row = document.createElement('div');
    row.className = 'char-stat-row';
    row.innerHTML = '<span>' + label + '</span><span>' + value + '</span>';
    return row;
  }

  function emptyNote(text) {
    const p = document.createElement('p');
    p.className = 'menu-empty-note';
    p.textContent = text;
    return p;
  }

  function capitalize(s) {
    return s ? s[0].toUpperCase() + s.slice(1) : s;
  }
})(window.YG = window.YG || {});
