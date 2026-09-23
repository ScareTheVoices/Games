/* ============================================================
   EVENTS.JS
   Minimal event runner. Reserved for future expansion — the
   prototype only ever fires the single scripted day-1 announcement
   event, but the trigger-matching logic here is written generally
   enough that new events can be added to data/events.json without
   touching this file.
   ============================================================ */

(function (YG) {
  'use strict';

  let events = {};
  let loaded = false;
  const firedOneShots = new Set();

  async function load() {
    if (loaded) return events;
    const res = await fetch('data/events.json');
    if (!res.ok) {
      throw new Error('Could not load data/events.json (' + res.status + ')');
    }
    events = await res.json();
    loaded = true;
    return events;
  }

  function matchesTrigger(trigger, day, phase, flags) {
    if (typeof trigger.day === 'number' && trigger.day !== day) return false;
    if (trigger.phase && trigger.phase !== phase) return false;
    if (trigger.requiresFlag && !flags[trigger.requiresFlag]) return false;
    return true;
  }

  /** Returns the list of event objects that should fire right now. */
  function resolve(day, phase, flags) {
    return Object.values(events).filter((evt) => {
      if (evt.oneShot && firedOneShots.has(evt.id)) return false;
      if (!matchesTrigger(evt.trigger, day, phase, flags || {})) return false;
      return true;
    });
  }

  function markFired(eventId) {
    firedOneShots.add(eventId);
  }

  /** Convenience used by the Announcements phase. Falls back to a generic line. */
  function announcementFor(day, phase, flags) {
    const matches = resolve(day, phase, flags);
    const withText = matches.find((e) => e.effects && e.effects.announcementText);
    if (withText) {
      markFired(withText.id);
      return withText.effects.announcementText;
    }
    return 'No incidents were reported overnight.';
  }

  YG.Events = {
    load,
    resolve,
    markFired,
    announcementFor
  };
})(window.YG = window.YG || {});
