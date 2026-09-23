/* ============================================================
   SAVE.JS
   Basic localStorage save/load. Stores the player object (which
   already carries relationships, evidence, flags, day and phase)
   plus the current yandere case shell. NPC schedule overrides are
   NOT persisted yet — the prototype has none — so that's flagged
   as future work below rather than silently dropped.
   ============================================================ */

(function (YG) {
  'use strict';

  const KEY = 'yandere_rpg_save_v1';

  function save(player, yandereCase) {
    const payload = {
      version: 1,
      savedAt: new Date().toISOString(),
      player,
      yandereCase
      // future: scheduleOverrides, firedEvents, mapCameraState
    };
    try {
      window.localStorage.setItem(KEY, JSON.stringify(payload));
      return true;
    } catch (err) {
      console.error('Save failed:', err);
      return false;
    }
  }

  function hasSave() {
    return window.localStorage.getItem(KEY) !== null;
  }

  function load() {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (err) {
      console.error('Save data was corrupted:', err);
      return null;
    }
  }

  function clear() {
    window.localStorage.removeItem(KEY);
  }

  YG.Save = { save, hasSave, load, clear };
})(window.YG = window.YG || {});
