/* ============================================================
   YANDERE.JS — ARCHITECTURE ONLY

   This module intentionally does NOT generate a case yet. It only
   defines the shape a case will eventually have, so the rest of
   the engine (schedule overrides, evidence, announcements) has a
   stable object to read from once the generator exists.

   Do not fill in yandereId/targetId with real logic in the
   prototype — a null case means "not generated yet" and every
   caller should handle that gracefully.
   ============================================================ */

(function (YG) {
  'use strict';

  /** Personality types the future generator may assign. Not implemented yet. */
  const PERSONALITY_TYPES = [
    { id: 'possessive', label: 'Possessive', summary: 'Becomes jealous of anyone close to their target.' },
    { id: 'protector', label: 'Protector', summary: 'Targets people who threaten or hurt their target.' },
    { id: 'manipulator', label: 'Manipulator', summary: 'Uses social manipulation and framing rather than immediate violence.' },
    { id: 'stalker', label: 'Stalker', summary: "Follows and observes their target." },
    { id: 'romantic', label: 'Romantic', summary: "Attempts to win the target's affection legitimately." },
    { id: 'sadistic', label: 'Sadistic', summary: 'Enjoys eliminating obstacles.' }
  ];

  function emptyCase() {
    return {
      yandereId: null,
      targetId: null,
      personality: null, // one of PERSONALITY_TYPES[].id, once generated
      suspicion: 0, // 0-100, future player-facing "how close am I" meter
      kills: [], // future: [{ victimId, day, method, discovered }]
      victims: [], // characters who have been harmed/killed this playthrough
      evidence: [], // ids referencing evidence items tied to this case
      events: [] // ids of story events that have fired for this case
    };
  }

  /**
   * Stub for the future random case generator. Deliberately unimplemented:
   * throws so it's obvious if something tries to call it before it exists.
   * When built, it must only select from eligibleYandere/eligibleTarget
   * characters (see characters.json) and must never place a character
   * somewhere their schedule makes impossible — see schedule.js overrides.
   */
  function generateCase() {
    throw new Error('Yandere case generation is not implemented in this prototype.');
  }

  YG.Yandere = {
    PERSONALITY_TYPES,
    emptyCase,
    generateCase
  };
})(window.YG = window.YG || {});
