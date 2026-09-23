/* ============================================================
   DIALOGUE.JS
   A small data-driven dialogue engine. Trees live in
   data/dialogue.json; nothing here is character-specific — new
   dialogue is added by editing that file, not this one.
   ============================================================ */

(function (YG) {
  'use strict';

  let trees = {};
  let loaded = false;

  let els = null; // cached DOM refs, set on first open()
  let activeTree = null;
  let activeNodeId = null;
  let activeNpc = null;
  let onCloseCallback = null;

  async function load() {
    if (loaded) return trees;
    const res = await fetch('data/dialogue.json');
    if (!res.ok) {
      throw new Error('Could not load data/dialogue.json (' + res.status + ')');
    }
    trees = await res.json();
    loaded = true;
    return trees;
  }

  function cacheEls() {
    if (els) return els;
    els = {
      box: document.getElementById('dialogue-box'),
      portrait: document.getElementById('dialogue-portrait'),
      speakerName: document.getElementById('dialogue-speaker-name'),
      text: document.getElementById('dialogue-text'),
      choices: document.getElementById('dialogue-choices'),
      toast: document.getElementById('dialogue-relationship-toast')
    };
    return els;
  }

  function treeIdForCharacter(character) {
    const specific = character.id + '_default';
    return trees[specific] ? specific : 'generic_greeting';
  }

  /**
   * Opens a conversation with an NPC.
   * @param {object} character - from Characters.get()
   * @param {object} player - the player object (relationships/flags mutated in place)
   * @param {function} onClose - called with no args when the conversation ends
   */
  function start(character, player, onClose) {
    const e = cacheEls();
    activeTree = trees[treeIdForCharacter(character)];
    activeNodeId = activeTree.start;
    activeNpc = character;
    onCloseCallback = onClose || null;

    e.box.classList.remove('hidden');
    e.portrait.textContent = initials(character.name);
    e.speakerName.textContent = character.name;
    renderNode();
  }

  function initials(name) {
    return name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  function renderNode() {
    const e = cacheEls();
    const node = activeTree.nodes[activeNodeId];
    e.text.textContent = node.text;
    e.choices.innerHTML = '';

    node.choices.forEach((choice) => {
      const btn = document.createElement('button');
      btn.className = 'dialogue-choice';
      btn.type = 'button';
      btn.textContent = choice.text;
      btn.addEventListener('click', () => chooseOption(choice));
      e.choices.appendChild(btn);
    });
  }

  function chooseOption(choice) {
    if (typeof choice.relationshipDelta === 'number' && choice.relationshipDelta !== 0 && YG.currentPlayer) {
      const result = YG.Relationships.adjust(
        YG.currentPlayer.relationships,
        activeNpc.id,
        choice.relationshipDelta
      );
      showRelationshipToast(result.delta);
    }
    if (choice.setFlag && YG.currentPlayer) {
      YG.currentPlayer.flags[choice.setFlag] = true;
    }
    if (choice.next) {
      activeNodeId = choice.next;
      renderNode();
    } else {
      close();
    }
  }

  function showRelationshipToast(delta) {
    const e = cacheEls();
    if (!delta) return;
    e.toast.textContent = (delta > 0 ? '+' : '') + delta + ' relationship';
    e.toast.classList.add('visible');
    window.clearTimeout(showRelationshipToast._t);
    showRelationshipToast._t = window.setTimeout(() => {
      e.toast.classList.remove('visible');
    }, 1400);
  }

  function close() {
    const e = cacheEls();
    e.box.classList.add('hidden');
    activeTree = null;
    activeNodeId = null;
    activeNpc = null;
    const cb = onCloseCallback;
    onCloseCallback = null;
    if (cb) cb();
  }

  YG.Dialogue = {
    load,
    start,
    close
  };
})(window.YG = window.YG || {});
