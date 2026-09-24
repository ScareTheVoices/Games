/* ============================================================
   RELATIONSHIPS.JS
   Tracks a 0-100 numeric relationship value per NPC id. The raw
   number is internal only — the UI always shows the tier label.
   ============================================================ */

(function (YG) {
  'use strict';

  const TIERS = [
    { max: 19, key: 'bad', label: 'Bad' },
    { max: 39, key: 'ok', label: 'OK' },
    { max: 59, key: 'decent', label: 'Decent' },
    { max: 79, key: 'good', label: 'Good' },
    { max: 94, key: 'great', label: 'Great' },
    { max: 100, key: 'amazing', label: 'Amazing!' }
  ];

  function tierFor(value) {
    const clamped = clamp(value);
    return TIERS.find((t) => clamped <= t.max) || TIERS[TIERS.length - 1];
  }

  function clamp(value) {
    return Math.max(0, Math.min(100, value));
  }

  const Relationships = {
    /**
     * Create a fresh relationship table: { [npcId]: number }.
     * Every known character starts at a neutral 30 ("OK") unless
     * a starting value is supplied.
     */
    createTable(characterIds, startingValue = 30) {
      const table = {};
      characterIds.forEach((id) => {
        table[id] = startingValue;
      });
      return table;
    },

    get(table, npcId) {
      return clamp(table[npcId] ?? 30);
    },

    /** Applies a delta and returns { value, tier, changed, delta }. */
    adjust(table, npcId, delta) {
      const before = Relationships.get(table, npcId);
      const after = clamp(before + delta);
      table[npcId] = after;
      return {
        value: after,
        tier: tierFor(after),
        changed: after !== before,
        delta: after - before
      };
    },

    tierFor,
    clamp
  };

  YG.Relationships = Relationships;
})(window.YG = window.YG || {});
