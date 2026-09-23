/* ============================================================
   PLAYER.JS
   The player character object and its creation flow. Gender and
   club options are declared as data arrays rather than hard-coded
   branches, so adding an option later doesn't require touching
   the logic below.
   ============================================================ */

(function (YG) {
  'use strict';

  const GENDER_OPTIONS = [
    { id: 'male', label: 'Male' },
    { id: 'female', label: 'Female' }
  ];

  const CLUB_OPTIONS = [
    { id: 'cooking_club', label: 'Cooking Club', roomId: 'cooking_club_room' },
    { id: 'photography_club', label: 'Photography Club', roomId: 'photography_club_room' },
    { id: 'occult_club', label: 'Occult Club', roomId: 'occult_club_room' }
  ];

  function clubRoomId(clubId) {
    const club = CLUB_OPTIONS.find((c) => c.id === clubId);
    return club ? club.roomId : null;
  }

  /**
   * Builds a fresh player object. relationships/evidence are filled
   * in by main.js once character data has loaded.
   */
  function createPlayer({ name, gender, club }) {
    return {
      name: name.trim(),
      gender,
      club,
      locationId: 'homeroom',
      day: 1,
      phase: 'morning',
      relationships: {},
      evidence: [],
      flags: {},
      // Reserved for future development — not used by the prototype yet.
      traits: [],
      stats: {},
      skills: []
    };
  }

  function validateCreation({ name, gender, club }) {
    if (!name || !name.trim()) {
      return 'Enter a name before continuing.';
    }
    if (name.trim().length > 18) {
      return 'Keep the name under 18 characters.';
    }
    if (!GENDER_OPTIONS.some((g) => g.id === gender)) {
      return 'Choose a gender.';
    }
    if (!CLUB_OPTIONS.some((c) => c.id === club)) {
      return 'Choose a club.';
    }
    return null;
  }

  YG.Player = {
    GENDER_OPTIONS,
    CLUB_OPTIONS,
    clubRoomId,
    createPlayer,
    validateCreation
  };
})(window.YG = window.YG || {});
