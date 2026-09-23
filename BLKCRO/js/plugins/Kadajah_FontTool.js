/*:
 * @target MZ
 * @plugindesc v1.1 Allows loading custom fonts (TTF/OTF) and changing them dynamically in text messages and menus using tags.
 * @author Kadajah
 *
 * @help
 * ============================================================================
 * Kadajah_FontTool (v1.1)
 * ============================================================================
 * 
 * This plugin allows you to load external font files (.ttf or .otf) located
 * in your project's "fonts/" folder and use them inside the game.
 * 
 * You can set a global font to replace the standard game font, or use
 * specific tags within Show Text events OR Command Menus (Title, Menu, etc).
 * 
 * ============================================================================
 * HOW TO INSTALL FONTS
 * ============================================================================
 * 1. Put your .ttf or .otf files in the "fonts/" folder of your project.
 * 2. Open the Plugin Parameters.
 * 3. Add a new item to the "Font List".
 * 4. Define an ID (integer) and the Filename (including extension).
 * 
 * ============================================================================
 * MESSAGE & MENU TAGS (USAGE)
 * ============================================================================
 * You can use the <font> tag in Show Text windows AND in Database Terms
 * (e.g., rename "New Game" in the Database to "<font:1>New Game").
 * 
 * Syntax: <font:id, size, color>
 * 
 * Arguments:
 *   id    : The ID defined in the Plugin Parameters for the font.
 *   size  : (Optional) The font size in pixels.
 *   color : (Optional) The color index (0-31) from the Window skin.
 * 
 * Examples:
 * 
 *   <font:1>Text
 *   -> Changes the text font to the font with ID 1. Keeps current size/color.
 * 
 *   <font:1, 40>Text
 *   -> Changes to font ID 1 and sets font size to 40.
 * 
 *   <font:1, 32, 14>Text
 *   -> Changes to font ID 1, size 32, and text color 14 (Yellow).
 * 
 * ============================================================================
 * GLOBAL OVERRIDE
 * ============================================================================
 * If you set the "Default Font ID" parameter to something greater than 0,
 * the entire game will attempt to use that font as the standard font.
 * 
 * ============================================================================
 *
 * @param fontList
 * @text Font List
 * @desc List of custom fonts to load.
 * @type struct<FontStruct>[]
 * @default []
 * 
 * @param defaultFontId
 * @text Default Global Font ID
 * @desc If set > 0, this font ID will replace the main font for the entire game.
 * @type number
 * @min 0
 * @default 0
 *
 * @param defaultFontSize
 * @text Global Override Size
 * @desc If Default Font ID is set, this size will be used. Set 0 to use System default.
 * @type number
 * @min 0
 * @default 0
 * 
 */

/*~struct~FontStruct:
 * @param id
 * @text Font ID
 * @desc The unique ID number to reference this font (e.g., 1).
 * @type number
 * @min 1
 * @default 1
 * 
 * @param filename
 * @text Filename
 * @desc The filename located in the "fonts/" folder (e.g., myfont.ttf).
 * @type string
 * @default myfont.ttf
 * 
 */

(() => {
    'use strict';

    const pluginName = "Kadajah_FontTool";
    const parameters = PluginManager.parameters(pluginName);
    
    // Parse Parameters
    const params = {
        fontList: JSON.parse(parameters['fontList'] || '[]').map(json => JSON.parse(json)),
        defaultFontId: Number(parameters['defaultFontId'] || 0),
        defaultFontSize: Number(parameters['defaultFontSize'] || 0)
    };

    const _fontMap = {};

    // ============================================================================
    // Font Loader System
    // ============================================================================

    const Kadajah_FontManager = {
        loadCustomFonts: function() {
            params.fontList.forEach(fontData => {
                const id = Number(fontData.id);
                const filename = fontData.filename;
                
                if (id && filename) {
                    this.loadFont(id, filename);
                }
            });
        },

        loadFont: function(id, filename) {
            const familyName = `KDJ_Font_${id}`;
            const path = `fonts/${filename}`;
            
            const fontFace = new FontFace(familyName, `url("${path}")`);
            
            fontFace.load().then((loadedFace) => {
                document.fonts.add(loadedFace);
                _fontMap[id] = familyName;
                console.log(`${pluginName}: Loaded font ID ${id} (${filename}) as ${familyName}`);
            }).catch((error) => {
                console.error(`${pluginName}: Failed to load font ${filename}.`, error);
            });
        },

        getFontFamily: function(id) {
            return _fontMap[id] || null;
        }
    };

    // Initialize fonts during Scene_Boot
    const _Scene_Boot_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
    Scene_Boot.prototype.loadGameFonts = function() {
        _Scene_Boot_loadGameFonts.call(this);
        Kadajah_FontManager.loadCustomFonts();
    };

    // ============================================================================
    // Window Base - Font Overrides & Tag Parsing
    // ============================================================================

    const _Window_Base_resetFontSettings = Window_Base.prototype.resetFontSettings;
    Window_Base.prototype.resetFontSettings = function() {
        _Window_Base_resetFontSettings.call(this);
        
        if (params.defaultFontId > 0) {
            const globalFont = Kadajah_FontManager.getFontFamily(params.defaultFontId);
            if (globalFont) {
                this.contents.fontFace = globalFont;
            }
            if (params.defaultFontSize > 0) {
                this.contents.fontSize = params.defaultFontSize;
            }
        }
    };

    // Convert <font:x,y,z> to internal escape code \x1bKFT[x,y,z]
    const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = _Window_Base_convertEscapeCharacters.call(this, text);
        
        text = text.replace(/<font:\s*(\d+)(?:,\s*(\d+))?(?:,\s*(\d+))?>/gi, (_, id, size, color) => {
            const args = [id || 0, size || 0, color !== undefined ? color : -1];
            return `\x1bKFT[${args.join(',')}]`;
        });

        return text;
    };

    const _Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function(code, textState) {
        if (code === 'KFT') {
            this.processKadajahFontTag(this.obtainEscapeParamArray(textState));
        } else {
            _Window_Base_processEscapeCharacter.call(this, code, textState);
        }
    };

    Window_Base.prototype.obtainEscapeParamArray = function(textState) {
        const arr = /^\[\d+(?:,\d+|,\-1)*\]/.exec(textState.text.slice(textState.index));
        if (arr) {
            textState.index += arr[0].length;
            const inner = arr[0].slice(1, -1);
            return inner.split(',').map(n => Number(n));
        }
        return [];
    };

    Window_Base.prototype.processKadajahFontTag = function(args) {
        const fontId = args[0];
        const fontSize = args[1];
        const colorId = args[2];

        if (fontId > 0) {
            const family = Kadajah_FontManager.getFontFamily(fontId);
            if (family) {
                this.contents.fontFace = family;
            }
        }

        if (fontSize > 0) {
            this.contents.fontSize = fontSize;
        }

        if (colorId >= 0) {
            this.changeTextColor(ColorManager.textColor(colorId));
        }
    };

    // ============================================================================
    // Window Command - Menu Support (New Game, Options, etc)
    // ============================================================================

    // Override drawItem to check for tags and render using drawTextEx logic if found
    const _Window_Command_drawItem = Window_Command.prototype.drawItem;
    Window_Command.prototype.drawItem = function(index) {
        const name = this.commandName(index);
        
        // Only use the heavy processing if the tag exists
        if (name.includes('<font:')) {
            const rect = this.itemRectWithPadding(index);
            const align = this.itemTextAlign();
            
            this.resetTextColor();
            this.changePaintOpacity(this.isCommandEnabled(index));
            
            // Calculate real width including font changes to handle alignment manually
            const textWidth = this.textSizeEx(name).width;
            let x = rect.x;
            
            if (align === 'center') {
                x += (rect.width - textWidth) / 2;
            } else if (align === 'right') {
                x += rect.width - textWidth;
            }
            
            // Draw using the escape character processing
            this.drawTextEx(name, x, rect.y, rect.width);
        } else {
            // Default fast drawing for normal text
            _Window_Command_drawItem.call(this, index);
        }
    };

})();