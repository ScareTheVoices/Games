/* ============================================================
   CHARACTERS.JS
   Loads data/characters.json once and exposes lookup helpers.
   Every character (student or staff) is stored exactly once in
   a flat map keyed by id, even though they belong to multiple
   logical groups (homeroom, club, etc).
   ============================================================ */

(function (YG) {
  'use strict';

  let byId = {};
  let allStudentIds = [];
  let allStaffIds = [];
  let loaded = false;

  async function load() {
    if (loaded) return byId;
    const res = await fetch('data/characters.json');
    if (!res.ok) {
      throw new Error('Could not load data/characters.json (' + res.status + ')');
    }
    const data = await res.json();

    (data.students || []).forEach((c) => {
      byId[c.id] = Object.assign({ isStaff: false }, c);
      allStudentIds.push(c.id);
    });
    (data.staff || []).forEach((c) => {
      byId[c.id] = Object.assign({ isStaff: true }, c);
      allStaffIds.push(c.id);
    });

    loaded = true;
    return byId;
  }

  function get(id) {
    return byId[id] || null;
  }

  function all() {
    return Object.values(byId);
  }

  function students() {
    return allStudentIds.map((id) => byId[id]);
  }

  function staff() {
    return allStaffIds.map((id) => byId[id]);
  }

  function byClub(clubId) {
    return students().filter((c) => c.club === clubId);
  }

  function homeroomStudents() {
    return students().filter((c) => c.homeroom);
  }

  /** Every character id the player can eventually have a relationship with. */
  function relationshipEligibleIds() {
    return allStudentIds.slice();
  }

  YG.Characters = {
    load,
    get,
    all,
    students,
    staff,
    byClub,
    homeroomStudents,
    relationshipEligibleIds
  };
})(window.YG = window.YG || {});
