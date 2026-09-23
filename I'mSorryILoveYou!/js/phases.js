/* ============================================================
   PHASES.JS
   The day is a fixed sequence of phases. This module only owns
   the state machine (what comes next, what the display name is);
   game.js decides what to actually show/do for each phase.
   ============================================================ */

(function (YG) {
  'use strict';

  const ORDER = ['morning', 'announcements', 'freePeriod', 'club', 'goingHome', 'night'];

  const LABELS = {
    morning: 'Morning',
    announcements: 'Announcements',
    freePeriod: 'Free Period',
    club: 'Club Activity',
    goingHome: 'Going Home',
    night: 'Night'
  };

  function labelFor(phase) {
    return LABELS[phase] || phase;
  }

  /**
   * Returns the next phase id, or null if 'night' just finished
   * (the caller should start a new day at 'morning').
   */
  function next(currentPhase) {
    const idx = ORDER.indexOf(currentPhase);
    if (idx === -1 || idx === ORDER.length - 1) {
      return null;
    }
    return ORDER[idx + 1];
  }

  function isExplorable(phase) {
    return phase === 'morning' || phase === 'freePeriod' || phase === 'club';
  }

  YG.Phases = {
    ORDER,
    labelFor,
    next,
    isExplorable
  };
})(window.YG = window.YG || {});
