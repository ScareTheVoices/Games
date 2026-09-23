/* ============================================================
   MAIN.JS
   Drives index.html: title screen -> character creation ->
   hands off to game.html. Nothing here touches game state beyond
   building the initial player object.
   ============================================================ */

(function (YG) {
  'use strict';

  const HANDOFF_KEY = 'yandere_rpg_pending_player';

  document.addEventListener('DOMContentLoaded', () => {
    spawnSakura();
    wireTitleMenu();
    wireOverlays();
    wireCreationForm();
  });

  function spawnSakura() {
    const layer = document.getElementById('title-sakura');
    if (!layer) return;
    const count = 22;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('span');
      const left = Math.random() * 100;
      const duration = 9 + Math.random() * 10;
      const delay = Math.random() * 10;
      const size = 5 + Math.random() * 5;
      dot.style.left = left + 'vw';
      dot.style.animationDuration = duration + 's';
      dot.style.animationDelay = '-' + delay + 's';
      dot.style.width = size + 'px';
      dot.style.height = size + 'px';
      layer.appendChild(dot);
    }
  }

  function wireTitleMenu() {
    document.getElementById('btn-start').addEventListener('click', () => {
      showScreen('creation-screen');
    });

    document.getElementById('btn-quit').addEventListener('click', () => {
      openOverlay('overlay-quit');
    });

    document.getElementById('btn-how-to-play').addEventListener('click', () => {
      openOverlay('overlay-how-to-play');
    });

    document.getElementById('btn-options').addEventListener('click', () => {
      openOverlay('overlay-options');
    });
  }

  function wireOverlays() {
    document.querySelectorAll('[data-close-overlay]').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.title-overlay').forEach((el) => el.classList.add('hidden'));
      });
    });
  }

  function openOverlay(id) {
    document.getElementById(id).classList.remove('hidden');
  }

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach((el) => el.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
  }

  function wireCreationForm() {
    const state = { name: '', gender: null, club: null };

    const nameInput = document.getElementById('creation-name');
    nameInput.addEventListener('input', (e) => {
      state.name = e.target.value;
      refreshContinueEnabled(state);
    });

    renderChipGroup('creation-gender-options', YG.Player.GENDER_OPTIONS, (id) => {
      state.gender = id;
      refreshContinueEnabled(state);
    });

    renderChipGroup('creation-club-options', YG.Player.CLUB_OPTIONS, (id) => {
      state.club = id;
      refreshContinueEnabled(state);
    });

    document.getElementById('creation-continue').addEventListener('click', () => {
      const error = YG.Player.validateCreation(state);
      const errorEl = document.getElementById('creation-error');
      if (error) {
        errorEl.textContent = error;
        return;
      }
      errorEl.textContent = '';
      const player = YG.Player.createPlayer(state);
      window.localStorage.setItem(HANDOFF_KEY, JSON.stringify(player));
      window.location.href = 'game.html';
    });
  }

  function renderChipGroup(containerId, options, onPick) {
    const container = document.getElementById(containerId);
    options.forEach((opt) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'option-chip';
      chip.textContent = opt.label;
      chip.addEventListener('click', () => {
        container.querySelectorAll('.option-chip').forEach((c) => c.classList.remove('selected'));
        chip.classList.add('selected');
        onPick(opt.id);
      });
      container.appendChild(chip);
    });
  }

  function refreshContinueEnabled(state) {
    const btn = document.getElementById('creation-continue');
    btn.disabled = !(state.name && state.name.trim() && state.gender && state.club);
  }

  // Quit: this is a browser game, so "quit" is answered in-universe rather
  // than attempting to force-close the tab. See the static overlay markup.
})(window.YG = window.YG || {});
