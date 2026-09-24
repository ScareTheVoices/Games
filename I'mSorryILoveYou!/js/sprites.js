/* ============================================================
   SPRITES.JS
   Renders RPG Maker MV/MZ-style character sheets onto a sprite
   <div> using background-position, instead of drawing to canvas.
   Supports two common sheet shapes:

     'multi'  — a standard 12-column x 8-row sheet holding up to 8
                characters (4 across, 2 down). Each character owns
                a 3-col x 4-row block (walk frames x directions).
                Pick which one with `index` (0-7).
     'single' — a single-character sheet, just 3 cols x 4 rows,
                at whatever pixel size it was exported.

   In both shapes, rows are the standard RPG Maker direction order:
   0 = down, 1 = left, 2 = right, 3 = up. Columns 0/1/2 are the
   walk cycle, with column 1 (the middle frame) as the idle pose.

   This module only computes/applies CSS — it has no opinion about
   game state (facing, walk timing). Callers pass those in.
   ============================================================ */

(function (YG) {
  'use strict';

  const DIRECTION_ROWS = { down: 0, left: 1, right: 2, up: 3 };
  const dimensionCache = {};

  /** Preloads an image and caches its natural size. Resolves {naturalWidth, naturalHeight}. */
  function preload(path) {
    if (dimensionCache[path]) {
      return Promise.resolve(dimensionCache[path]);
    }
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const dims = { naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight };
        dimensionCache[path] = dims;
        resolve(dims);
      };
      img.onerror = () => reject(new Error('Could not load sprite sheet: ' + path));
      img.src = path;
    });
  }

  /**
   * Works out which frame to show.
   * @param {object} config - { path, mode: 'multi'|'single', index? }
   * @param {object} dims - { naturalWidth, naturalHeight } from preload()
   * @param {string} facing - 'down' | 'left' | 'right' | 'up'
   * @param {number} walkFrame - 0, 1 (idle/middle), or 2
   */
  function frameRect(config, dims, facing, walkFrame) {
    let frameW;
    let frameH;
    let blockColOffset = 0;
    let blockRowOffset = 0;

    if (config.mode === 'single') {
      frameW = dims.naturalWidth / 3;
      frameH = dims.naturalHeight / 4;
    } else {
      // 'multi': always a 12x8-frame grid regardless of export resolution.
      frameW = dims.naturalWidth / 12;
      frameH = dims.naturalHeight / 8;
      const index = config.index || 0;
      blockColOffset = (index % 4) * 3;
      blockRowOffset = Math.floor(index / 4) * 4;
    }

    const dirRow = DIRECTION_ROWS[facing] ?? 0;
    const col = blockColOffset + Math.max(0, Math.min(2, walkFrame));
    const row = blockRowOffset + dirRow;

    return {
      frameW,
      frameH,
      x: col * frameW,
      y: row * frameH,
      sheetW: dims.naturalWidth,
      sheetH: dims.naturalHeight
    };
  }

  /**
   * Paints the current frame onto `el` via CSS background properties,
   * scaled so a single frame renders at `renderSize` px square.
   */
  function applyToElement(el, config, dims, facing, walkFrame, renderSize) {
    const rect = frameRect(config, dims, facing, walkFrame);
    const scale = renderSize / rect.frameW;
    el.style.backgroundImage = 'url(' + config.path + ')';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.backgroundSize = rect.sheetW * scale + 'px ' + rect.sheetH * scale + 'px';
    el.style.backgroundPosition = -(rect.x * scale) + 'px ' + -(rect.y * scale) + 'px';
    el.classList.add('sprite-has-art');
  }

  YG.Sprites = { preload, applyToElement };
})(window.YG = window.YG || {});
