/* ============================================================
   INVESTIGATION.JS
   Basic evidence/inventory system. The prototype ships a handful
   of sample items that CAN be granted (e.g. for testing the
   Evidence menu) but nothing in the prototype awards them
   automatically — that hookup belongs to the future event/mystery
   system. Evidence is intentionally not typed as "real" or "red
   herring" here; that classification will be assigned per
   playthrough by the future case generator.
   ============================================================ */

(function (YG) {
  'use strict';

  const SAMPLE_EVIDENCE = [
    {
      id: 'strange_photograph',
      name: 'Strange Photograph',
      description: 'A blurry photo of the courtyard at night. Something — or someone — is standing near the gate.'
    },
    {
      id: 'missing_club_key',
      name: 'Missing Club Key',
      description: "One of the club room keys is unaccounted for. No one's admitting to taking it."
    },
    {
      id: 'deleted_message',
      name: 'Deleted Message',
      description: 'A partial screenshot of a conversation someone tried to erase. Most of it is unreadable.'
    },
    {
      id: 'muddy_footprints',
      name: 'Muddy Footprints',
      description: 'A trail of footprints leading from the courtyard toward the gym, still damp.'
    },
    {
      id: 'burnt_note',
      name: 'Burnt Note',
      description: 'Most of a folded note, charred at the edges. Only a few words are still legible.'
    }
  ];

  function getDefinition(evidenceId) {
    return SAMPLE_EVIDENCE.find((e) => e.id === evidenceId) || null;
  }

  /** Adds an evidence id to the player's inventory if not already present. */
  function grant(player, evidenceId) {
    if (!player.evidence.includes(evidenceId)) {
      player.evidence.push(evidenceId);
      return true;
    }
    return false;
  }

  function inventory(player) {
    return player.evidence.map(getDefinition).filter(Boolean);
  }

  YG.Investigation = {
    SAMPLE_EVIDENCE,
    getDefinition,
    grant,
    inventory
  };
})(window.YG = window.YG || {});
