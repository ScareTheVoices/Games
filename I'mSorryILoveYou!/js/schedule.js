/* ============================================================
   SCHEDULE.JS
   Resolves where an NPC is for the current day/phase.

   Two layers:
     1. baseSchedule  — from characters.json, the character's
        normal routine (homeroom / freePeriod / club / goingHome).
     2. overrides     — keyed by "day:phase:npcId", set at runtime
        by future systems (yandere.js, events.js). An override can
        also carry a `behavior` tag ('unusual', 'following:<id>',
        'avoiding:<id>', 'meeting:<id>', 'investigating',
        'unavailable') that later clue/observation systems can
        read without caring how the location was decided.

   The prototype never writes overrides itself — it only reads
   through this API — but the shape exists now so the eventual
   Yandere/event systems can plug in without changing callers.
   ============================================================ */

(function (YG) {
  'use strict';

  const overrides = {};

  function overrideKey(day, phase, npcId) {
    return day + ':' + phase + ':' + npcId;
  }

  function setOverride(day, phase, npcId, locationId, behavior) {
    overrides[overrideKey(day, phase, npcId)] = {
      locationId,
      behavior: behavior || 'unusual'
    };
  }

  function clearOverride(day, phase, npcId) {
    delete overrides[overrideKey(day, phase, npcId)];
  }

  /**
   * Returns { locationId, behavior } for the given character on the
   * given day/phase. behavior is 'normal' unless an override applies.
   */
  function resolve(character, day, phase) {
    const key = overrideKey(day, phase, character.id);
    if (overrides[key]) {
      return {
        locationId: overrides[key].locationId,
        behavior: overrides[key].behavior
      };
    }
    const baseLocation = (character.schedule && character.schedule[phase]) || 'hallway';
    return { locationId: baseLocation, behavior: 'normal' };
  }

  /** Convenience: every character's resolved location for a phase, as { npcId: {locationId, behavior} }. */
  function resolveAll(characters, day, phase) {
    const result = {};
    characters.forEach((c) => {
      result[c.id] = resolve(c, day, phase);
    });
    return result;
  }

  YG.Schedule = {
    setOverride,
    clearOverride,
    resolve,
    resolveAll
  };
})(window.YG = window.YG || {});
