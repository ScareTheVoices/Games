/*:
 * @target MZ
 * @plugindesc Show bubble messages above events without using escape codes
 * @author Sang Hendrix
 * @url https://sanghendrix.itch.io
 * 
 * @help
 * Verion 1.4.1c
 * For support, please visit Discord: https://discord.gg/YKPscqHV8b
 * ----------------------------------------------------------------------------
 * A dynamic message system plugin for RPG Maker MZ that transforms your game's 
 * dialogue into automatic bubble messages. Simply match the event name with the 
 * message's Namebox, and the plugin handles everything else - no escape codes or 
 * manual positioning needed!
 * ----------------------------------------------------------------------------
 * HOW TO USE
 * ----------------------------------------------------------------------------
 * To display bubble on game player (party leader)
 *       -> Namebox: write  player
 * To display bubble on a follower (party member)
 *       -> Namebox: write  follower: Name of the member or their id
 *          e.g. follower: Roza | follower: 2
 * To display bubble on events automatically, match it with the event name.
 *        -> Event name: Kara Ha
 *           Message Namebox: Kara Ha
 * To manually display bubble on a specific event ID
 *       -> Namebox: Name to display (event ID)
 *          e.g. Danial (event 3) -> Display bubble on event ID 3
 *          Danial (this) -> Display bubble on the current event
 * To display bubble on the current event
 *       -> Namebox: this
 * 
 * Empty Namebox will result in default message system (cuz nobody is talking)
 * ----------------------------------------------------------------------------
 * TERMS OF USE
 * ----------------------------------------------------------------------------
 * https://www.sanghendrix.com/p/terms-of-service-license.html
 * 
 * 
 * @command Set Bubble Status
 * @text Set Bubble Messages Status
 * @desc Enable or disable bubble messages
 * 
 * @arg Status
 * @type boolean
 * @text Enable Bubble Messages
 * @desc Enable or disable bubble messages functionality
 * @default true
 * 
 * @command Camera Focus
 * @text Camera Focus To
 * @desc Manually Focus the camera on a target (event name or "player")
 *
 * @arg Target
 * @type string
 * @text Target
 * @desc The target to focus on. Use event name or "player"
 * 
 * @command Force Bubble Position
 * @text Force Bubble Position
 * @desc Force the message bubble to appear at a specific position
 *
 * @arg Force
 * @type boolean
 * @text Force Bubble Position
 * @desc Enable/disable forced bubble position
 * @default false
 *
 * @arg CoordType
 * @type select
 * @text Coordinate Type
 * @desc Whether the position is in map tile coordinates or screen pixel coordinates
 * @option Screen Coordinates
 * @value screen
 * @option Map Coordinates
 * @value map
 * @default screen
 *
 * @arg Position
 * @type string
 * @text Position (x, y)
 * @desc Position in format "x, y". Example: "100, 200" or "Graphics.boxWidth / 2, 200"
 * 
 * @arg ShowTail
 * @type boolean
 * @text Show Tail
 * @desc Whether to show the bubble tail (navigator)
 * @default true
 * 
 * @command Change Bubble Windowskin
 * @text Change Bubble Windowskin
 * @desc Changes the windowskin used for message bubbles
 *
 * @arg filename
 * @type file
 * @dir img/system
 * @text Windowskin File
 * @desc Select a windowskin file from the system folder
 * @default Window
 * 
 * 
 * 
 * 
 * @param ----------------sdf
 * @type string
 * @text -------------------------
 * @default -------------------------
 * 
 * @param sfsadasdsvzxvzxc
 * @type string
 * @text ■ BUBBLE MESSAGE
 * 
 * @param ---------------sdfa
 * @type string
 * @text -------------------------
 * @default -------------------------
 * 
 * @param Manual Word Wrap
 * @text Manual Word Wrap
 * @desc Preserves line breaks from the message editor. If false, combines all text into one line for auto-wrap
 * @default true
 * @type boolean
 * 
 * @param Vertical Position
 * @text Vertical Offset
 * @desc Move the bubble vertically (negative value moves up)
 * @default 0
 * @type string
 * 
 * @param Max Width
 * @desc Maximum width for the bubble (leave empty for no limit)
 * @default 400
 * @type number
 * 
 * @param Max Row
 * @desc Maximum number of row for each bubble
 * @default 4
 * @type number
 * @min 1
 * @max 4
 * 
 * @param Bubble Animation
 * @text Animation
 * @desc Choose the animation style for message bubbles
 * @type select
 * @option Default
 * @value default
 * @option Scale
 * @value scale
 * @default default
 * 
 * @param Bubble Ease
 * @text Ease Movement
 * @desc Ease the movemnt of bubble when camera is focusing on a target. False to display the bubble instantly
 * @type boolean
 * @default true
 * 
 * @param Navigator
 * @text Navigator (Tail)
 * @desc The image that acts potrait who's speaking (bubble tail)
 * @default 
 * @dir img/system/
 * @type file
 * 
 * @param Message Font Settings
 * @text Font Settings
 * @type struct<MessageFontSettings>
 * @desc Font settings for bubble messages
 * @default {"fontFile":"","fontSize":"","fontColor":"","enableOutline":"true","outlineColor":"","lineHeight":""}
 * 
 * @param WindowSkin
 * @text Custom Window Skin
 * @desc The window skin image file to use from img/system folder
 * @default 
 * @dir img/system/
 * @type file
 * 
 * @param --------------xc--sdf
 * @type string
 * @text -------------------------
 * @default -------------------------
 * 
 * @param sfsadasdsxvzxvzxc
 * @type string
 * @text ■ DEFAULT MESSAGE
 * 
 * @param ---------zxc------sdfa
 * @type string
 * @text -------------------------
 * @default -------------------------
 * 
 * @param Normal Message Wrap
 * @text Word Wrap
 * @desc Auto Wrap Normal Message
 * @default false
 * @type boolean
 * 
 * @param Normal Message Width
 * @text Message Width
 * @desc Set the width of normal messages
 * @default
 * @type number
 * 
 * @param Normal Message Row
 * @text Row Count
 * @desc Set the row count for normal messages (1-4)
 * @default 4
 * @type number
 * @min 1
 * @max 4
 * 
 * @param Normal Message Y Offset
 * @text Vertical Position
 * @desc Adjust the vertical position of normal messages (negative value moves up)
 * @default 0
 * @type number
 * @min -9999
 * 
 * @param Normal Message Font Settings
 * @text Message Font Settings
 * @type struct<NormalMessageFontSettings>
 * @desc Font settings for normal messages
 * @default {"fontFile":"","fontSize":"","fontColor":"","enableOutline":"true","outlineColor":""}
 * 
 * @param ------------zz--xc--sdf
 * @type string
 * @text -------------------------
 * @default -------------------------
 * 
 * @param sfsadasccdsxvzxvzxc
 * @type string
 * @text ■ NAMEBOX
 * 
 * @param ---------zxc-xc-----sdfa
 * @type string
 * @text -------------------------
 * @default -------------------------
 * 
 * @param Namebox Position X
 * @text Position
 * @desc Set the horizontal position of the namebox relative to the message window
 * @type select
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @default left
 * 
 * @param Namebox Position Y
 * @text Vertical Position
 * @desc Adjust the vertical position of the namebox (negative value moves up)
 * @default 0
 * @type number
 * @min -9999
 * 
 * @param Namebox Font Settings
 * @text Namebox Font Settings
 * @type struct<NameboxFontSettings>
 * @desc Font settings for the namebox
 * @default {"fontFile":"","fontSize":"20","fontColor":"","enableOutline":"true","outlineColor":""}
 * 
 * @param -----------cc-zz--xc--sdf
 * @type string
 * @text -------------------------
 * @default -------------------------
 * 
 * @param sfsadascccdsxvzxvzxc
 * @type string
 * @text ■ SPEAKER FACE
 * 
 * @param -------c--zxc-xc-----sdfa
 * @type string
 * @text -------------------------
 * @default -------------------------
 * 
 * @param Face Size
 * @text Bubble Message Face Scale
 * @desc Scale factor for face images in bubble messages (1 = 100%, 0.5 = 50%, etc.)
 * @default 0.5
 * @type number
 * @min 0.1
 * @decimals 2
 * 
 * @param Normal Face Scale
 * @text Normal Message Face Scale
 * @desc Scale factor for face images in normal messages (1 = 100%, 0.5 = 50%, etc.)
 * @default 1
 * @type number
 * @min 0.1
 * @decimals 2
 * 
 * @param --------z---cc-zz--xc--sdf
 * @type string
 * @text -------------------------
 * @default -------------------------
 * 
 * @param sfsadazscccdsxvzxvzxc
 * @type string
 * @text ■ CHOICE LIST
 * 
 * @param ------z-c--zxc-xc-----sdfa
 * @type string
 * @text -------------------------
 * @default -------------------------
 * 
 * @param Choice Text Align
 * @text Text Alignment
 * @desc Alignment of text in choice buttons
 * @type select
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @default center
 * 
 * @param Choice List Style
 * @text Style
 * @desc Choose how choices are arranged
 * @type select
 * @option Horizontal (2 columns)
 * @value horizontal
 * @option Vertical (1 column)
 * @value vertical
 * @default horizontal
 * 
 * @param Choice Animation
 * @text Animation
 * @desc Choose the animation style for the choice window
 * @type select
 * @option Default
 * @value default
 * @option Move to Scene
 * @value moveToScene
 * @default moveToScene
 * 
 * @param Choice Window Y
 * @text Vertical Position
 * @desc Y position of choice window
 * @type string
 * @default Graphics.boxHeight - 170
 * 
 * @param Choice Auto Position
 * @text Auto Position
 * @desc Automatically position choices to avoid overlapping with the player, bubbles, and normal messages
 * @type boolean
 * @default true
 * 
 * @param Choice Space
 * @text Spacing
 * @desc Space between each choice item (in pixels)
 * @type number
 * @min 0
 * @default 4
 * 
 * @param Choice Width
 * @text Window Width
 * @desc Width of the choice window (in pixels, empty for auto sizing)
 * @type number
 * @default
 * 
 * @param Choice Height
 * @text Item Height
 * @desc Height of each choice item (in pixels)
 * @type number
 * @default 36
 * 
 * @param Choice Font Settings
 * @text Font Settings
 * @type struct<ChoiceFontSettings>
 * @desc Font settings for choice list
 * @default {"fontFile":"","fontSize":"","fontColor":"","enableOutline":"true","outlineColor":""}
 * 
 * @param Choice Windowskin
 * @text Window Skin
 * @desc The window skin image file to use for choice lists from img/system folder
 * @default 
 * @dir img/system/
 * @type file
 * 
 * @param --------xc--sdf
 * @type string
 * @text -------------------------
 * @default -------------------------
 * 
 * @param dsxvzxvzxc
 * @type string
 * @text ■ MESSAGE SFX
 * 
 * @param ------sdfa
 * @type string
 * @text -------------------------
 * @default -------------------------
 * 
 * @param Message Start VFX
 * @text Start VFX
 * @type struct<MessageStartVFX>
 * @desc Sound effect settings when message starts
 * @default {"soundFile":"","volumePitch":"45, 0"}
 * 
 * @param Typing SFX
 * @text Typing SFX
 * @type struct<TypingSFX>
 * @desc Sound effect settings for typing
 * @default {"soundFile":"","volumePitch":"50, 100"}

 * @param --------xc--sdfxvxvzzx
 * @type string
 * @text -------------------------
 * @default -------------------------
 * 
 * @param dsxvzxvzxcvzxvz
 * @type string
 * @text ■ CAMERA
 * 
 * @param ------sdfaxvzxv
 * @type string
 * @text -------------------------
 * @default -------------------------
 * 
 * @param Camera To Speaker
 * @text Focus Camera on Speaker
 * @desc Move the camera to focus on the speaking character when true
 * @default false
 * @type boolean
 * 
 * @param Camera Pan Speed
 * @text Camera Movement Speed
 * @desc How fast the camera pans (1-10). Lower is slower.
 * @default 4
 * @type number
 * @min 1
 * @max 10
 */
/*~struct~MessageFontSettings:
 * @param fontFile
 * @text Font Filename
 * @desc Font file to use for message text (must be in fonts folder). e.g., abc.ttf or abc.otf
 * @type string
 * @default
 * 
 * @param fontSize
 * @text Font Size
 * @desc
 * @default
 * @type number
 * 
 * @param fontColor
 * @text Font Color
 * @desc Use Hex color
 * @default
 * 
 * @param enableOutline
 * @text Font Outline
 * @desc Enable or disable text outline in message window
 * @default true
 * @type boolean
 * 
 * @param outlineColor
 * @text Outline Color
 * @desc Use Hex color
 * @default
 * 
 * @param lineHeight
 * @text Line Height
 * @desc Height between lines in the message window (empty = 36)
 * @default
 * @type number
 */
/*~struct~NormalMessageFontSettings:
 * @param fontFile
 * @text Font Filename
 * @desc Font file to use for normal messages (must be in fonts folder). e.g., abc.ttf or abc.otf
 * @type string
 * @default
 * 
 * @param fontSize
 * @text Font Size
 * @desc
 * @default
 * @type number
 * 
 * @param fontColor
 * @text Font Color
 * @desc Hex color
 * @default
 * 
 * @param enableOutline
 * @text Font Outline
 * @desc Enable or disable text outline in normal messages
 * @default true
 * @type boolean
 * 
 * @param outlineColor
 * @text Outline Color
 * @desc Hex color
 * @default
 */
/*~struct~ChoiceFontSettings:
 * @param fontFile
 * @text Font Filename
 * @desc Font file to use for choice text (must be in fonts folder). e.g., abc.ttf or abc.otf
 * @type string
 * @default
 * 
 * @param fontSize
 * @text Font Size
 * @desc Font size for the choice text
 * @default
 * @type number
 * 
 * @param fontColor
 * @text Font Color
 * @desc Hex color
 * @default
 * 
 * @param enableOutline
 * @text Font Outline
 * @desc Enable or disable text outline in choices
 * @default true
 * @type boolean
 * 
 * @param outlineColor
 * @text Outline Color
 * @desc Hex color
 * @default
 */
/*~struct~MessageStartVFX:
 * @param soundFile
 * @text Message Start Sound
 * @desc Sound effect to play when message starts
 * @dir audio/se/
 * @type file
 * @default
 * 
 * @param volumePitch
 * @text Volume & Pitch
 * @desc Volume and Pitch in format "volume, pitch". Use "x - y" for random range (e.g., "50 - 100, -20 - 20")
 * @default 45, 0
 * @type string
 */
/*~struct~TypingSFX:
 * @param soundFile
 * @text Typing Sound Effect
 * @desc Sound effect to play for each character typed
 * @dir audio/se/
 * @type file
 * @default
 * 
 * @param volumePitch
 * @text Volume & Pitch
 * @desc Volume and Pitch in format "volume, pitch" (e.g., "50, 100")
 * @default 50, 100
 * @type string
 */
/*~struct~NameboxFontSettings:
 * @param fontFile
 * @text Font Filename
 * @desc Font file to use for namebox text (must be in fonts folder). e.g., abc.ttf or abc.otf
 * @type string
 * @default
 * 
 * @param fontSize
 * @text Font Size
 * @desc Font size for the namebox text
 * @default 20
 * @type number
 * 
 * @param fontColor
 * @text Font Color
 * @desc Use Hex color
 * @default
 * 
 * @param enableOutline
 * @text Font Outline
 * @desc Enable or disable text outline in namebox
 * @default true
 * @type boolean
 * 
 * @param outlineColor
 * @text Outline Color
 * @desc Use Hex color
 * @default
 */

var Imported = Imported || {};
Imported.Hendrix_Smart_Bubble_Message = true;

(function () {
    const pluginName = 'Hendrix_Smart_Bubble_Message';
    const pluginParams = PluginManager.parameters(pluginName);
    const VERTICAL_ADJUSTMENT = pluginParams['Vertical Adjustment'] || 'auto';
    const MAX_WIDTH = Number(pluginParams['Max Width'] || 400);
    const NAMEBOX_POSITION = String(pluginParams['Namebox Position X'] || 'left');
    const NAMEBOX_Y_OFFSET = Number(pluginParams['Namebox Position Y'] || 0);
    const MAX_ROW = Number(pluginParams['Max Row'] || 4);
    const MANUAL_WORD_WRAP = pluginParams['Manual Word Wrap'] === 'true';
    const FACE_SCALE = Number(pluginParams['Face Size'] || 1);
    const BUBBLE_ANIMATION = String(pluginParams['Bubble Animation'] || 'default');
    const BUBBLE_EASE = String(pluginParams['Bubble Ease'] === 'true');
    const CAMERA_TO_SPEAKER = pluginParams['Camera To Speaker'] === 'true';
    const CAMERA_PAN_SPEED = Number(pluginParams['Camera Pan Speed']);
    const CHOICE_WINDOW_SKIN = pluginParams['Choice Windowskin'];
    const CHOICE_WINDOW_Y = String(pluginParams['Choice Window Y']);
    const CHOICE_SPACE = Number(pluginParams['Choice Space'] || 4);
    const CHOICE_WIDTH = Number(pluginParams['Choice Width']);
    const CHOICE_HEIGHT = Number(pluginParams['Choice Height'] || 36);
    const CHOICE_ANIMATION = String(pluginParams['Choice Animation'] || 'default');
    const CHOICE_TEXT_ALIGN = String(pluginParams['Choice Text Align'] || 'left');
    const NORMAL_MESSAGE_WIDTH = Number(pluginParams['Normal Message Width']);
    const NORMAL_MESSAGE_ROW = Number(pluginParams['Normal Message Row'] || 4);
    const NORMAL_FACE_SCALE = Number(pluginParams['Normal Face Scale'] || 1);
    const NORMAL_MESSAGE_Y_OFFSET = Number(pluginParams['Normal Message Y Offset'] || 0);
    const WRAP_NORMAL_MESSAGE = pluginParams['Normal Message Wrap'] === 'true';
    const CHOICE_AUTO_POSITION = pluginParams['Choice Auto Position'] === 'true';
    const CHOICE_STYLE = String(pluginParams['Choice List Style'] || 'horizontal');
    const TYPING_SFX_VOLUME = pluginParams['Typing SFX Volume'];
    const BUBBLE_NAVIGATOR = pluginParams['Navigator'];
    const messageFontSettings = JSON.parse(pluginParams['Message Font Settings'] || '{}');
    const MESSAGE_FONT_FILE = messageFontSettings.fontFile || '';
    const MESSAGE_FONT_SIZE = Number(messageFontSettings.fontSize || 0);
    const MESSAGE_FONT_COLOR = messageFontSettings.fontColor || '';
    const MESSAGE_OUTLINE = messageFontSettings.enableOutline === 'true';
    const MESSAGE_OUTLINE_COLOR = messageFontSettings.outlineColor || '';
    const MESSAGE_LINE_HEIGHT = Number(messageFontSettings.lineHeight || 36);
    const normalMessageFontSettings = JSON.parse(pluginParams['Normal Message Font Settings'] || '{}');
    const NORMAL_MESSAGE_FONT_FILE = normalMessageFontSettings.fontFile || '';
    const NORMAL_MESSAGE_FONT_SIZE = Number(normalMessageFontSettings.fontSize || 0);
    const NORMAL_MESSAGE_FONT_COLOR = normalMessageFontSettings.fontColor || '';
    const NORMAL_MESSAGE_OUTLINE = normalMessageFontSettings.enableOutline === 'true';
    const NORMAL_MESSAGE_OUTLINE_COLOR = normalMessageFontSettings.outlineColor || '';
    const choiceFontSettings = JSON.parse(pluginParams['Choice Font Settings'] || '{}');
    const CHOICE_FONT_FILE = choiceFontSettings.fontFile || '';
    const CHOICE_FONT_SIZE = Number(choiceFontSettings.fontSize || 0);
    const CHOICE_FONT_COLOR = choiceFontSettings.fontColor || '';
    const CHOICE_FONT_OUTLINE = choiceFontSettings.enableOutline === 'true';
    const CHOICE_FONT_OUTLINE_COLOR = choiceFontSettings.outlineColor || '';
    const messageStartVFX = JSON.parse(pluginParams['Message Start VFX'] || '{}');
    const MESSAGE_SFX = messageStartVFX.soundFile || '';
    const MESSAGE_SFX_VOLUME_PITCH = messageStartVFX.volumePitch || '45, 0';
    const nameboxFontSettings = JSON.parse(pluginParams['Namebox Font Settings'] || '{}');
    const NAMEBOX_FONT_FILE = nameboxFontSettings.fontFile || '';
    const NAMEBOX_FONT_SIZE = Number(nameboxFontSettings.fontSize || 20);
    const NAMEBOX_FONT_COLOR = nameboxFontSettings.fontColor || '';
    const NAMEBOX_OUTLINE = nameboxFontSettings.enableOutline === 'true';
    const NAMEBOX_OUTLINE_COLOR = nameboxFontSettings.outlineColor || '';
    function splitVFX(volumePitch) {
        const parts = volumePitch.split(',').map(p => p.trim());
        return {
            volume: parts[0] || '45',
            pitch: parts[1] || '0'
        };
    }

    const messageVFXParams = splitVFX(MESSAGE_SFX_VOLUME_PITCH);
    const typingSFX = JSON.parse(pluginParams['Typing SFX'] || '{}');
    const TYPING_SFX = typingSFX.soundFile || '';
    const TYPING_SFX_VOLUME_PITCH = typingSFX.volumePitch || '50, 100';

    const eventHeightCache = new Map();
    const ROW_COUNT = 4;
    const BUFFER_SPACE = 8;
    let forceBubblePosition = false;
    let bubbleMessagesEnabled = true;
    let forcedBubbleX = 0;
    let forcedBubbleY = 0;
    let forcedShowTail = true;
    let currentBubbleWindowskin = pluginParams['WindowSkin'] || 'Window';

    PluginManager.registerCommand(pluginName, "Set Bubble Status", args => {
        bubbleMessagesEnabled = Boolean(args.Status === "true");
    });

    PluginManager.registerCommand(pluginName, "Change Bubble Windowskin", args => {
        const bitmap = ImageManager.loadSystem(args.filename);
        bitmap.addLoadListener(() => {
            currentBubbleWindowskin = args.filename;
            if (SceneManager._scene && SceneManager._scene._messageWindow) {
                SceneManager._scene._messageWindow.loadWindowskin();
            }
        });
    });

    PluginManager.registerCommand(pluginName, "Camera Focus", args => {
        const target = String(args.Target || '').trim().toLowerCase();

        const isDragonCameraActive = typeof SDragon !== 'undefined' &&
            SDragon.SmoothCamera &&
            SDragon.SmoothCamera.enabled;

        if (target === "player") {
            if (isDragonCameraActive) {
                $gamePlayer.setCameraFocus(0);
            } else {
                if (!$gameMap._cameraTarget || typeof $gameMap._cameraTarget.update !== 'function') {
                    $gameMap._cameraTarget = new Game_CameraTarget();
                }
                $gameMap._cameraTarget.setTarget($gamePlayer._realX, $gamePlayer._realY);
                $gameMap._cameraTarget._autoDeactivate = true;
            }
            return;
        }

        const event = $gameMap.events().find(event => {
            return event && event.event().name.toLowerCase() === target;
        });

        if (event) {
            if (isDragonCameraActive) {
                $gamePlayer.setCameraFocus(event.x, event.y);
            } else {
                if (!$gameMap._cameraTarget || typeof $gameMap._cameraTarget.update !== 'function') {
                    $gameMap._cameraTarget = new Game_CameraTarget();
                }
                $gameMap._cameraTarget.setTarget(event.x, event.y);
                $gameMap._cameraTarget._autoDeactivate = false;
            }
        }
    });

    PluginManager.registerCommand(pluginName, "Force Bubble Position", args => {
        forceBubblePosition = args.Force === "true";

        if (forceBubblePosition && args.Position) {
            const [xEval, yEval] = args.Position.split(',').map(str => str.trim());
            const isMapCoord = args.CoordType === "map";
            if (isMapCoord) {
                forcedBubbleX = (eval(xEval) - $gameMap._displayX) * $gameMap.tileWidth();
                forcedBubbleY = (eval(yEval) - $gameMap._displayY) * $gameMap.tileHeight();
            } else {
                forcedBubbleX = eval(xEval);
                forcedBubbleY = eval(yEval);
            }
            forcedShowTail = args.ShowTail !== "false";
        }
    });

    //=============================================================================
    // Camera Control
    //=============================================================================

    function Game_CameraTarget() {
        this.initialize(...arguments);
    }

    Game_CameraTarget.prototype.initialize = function () {
        this._targetX = null;
        this._targetY = null;
        this._currentX = null;
        this._currentY = null;
        this._isActive = false;
        this._lastPlayerX = null;
        this._lastPlayerY = null;
        this._isDragonCameraActive = typeof SDragon !== 'undefined' &&
            SDragon.SmoothCamera &&
            SDragon.SmoothCamera.enabled;
    };

    Game_CameraTarget.prototype.setTarget = function (x, y) {
        if (this._isDragonCameraActive) {
            $gamePlayer._cameraOffset ??= { x: 0, y: 0 };
            $gamePlayer.setCameraFocus(x, y);
            this._isActive = true;
            this._isMovingToTarget = true;
            setTimeout(() => {
                this._isMovingToTarget = false;
            }, 500);
            return;
        }

        const screenWidth = Graphics.boxWidth / $gameMap.tileWidth();
        const screenHeight = Graphics.boxHeight / $gameMap.tileHeight();

        this._isMovingToTarget = true;

        if ((typeof ScSWinter !== 'undefined' && ScSWinter.params) || Imported.Hendrix_Map_Zoom) {
            this._currentX ??= $gameMap._displayX;
            this._currentY ??= $gameMap._displayY;

            const wasPlayerTarget = this._isPlayerTarget;
            this._isPlayerTarget = Math.abs(x - $gamePlayer._realX) + Math.abs(y - $gamePlayer._realY) <= 8;

            const halfWidth = (screenWidth - !this._isPlayerTarget) / 2;
            if (Imported.Hendrix_Map_Zoom) {
                this._targetX = this.clampX(x - halfWidth);
                this._targetY = this.clampY(y - screenHeight / 2);
            } else {
                this._targetX = !this._isPlayerTarget ? this.clampX(x - halfWidth) : x - halfWidth;
                this._targetY = !this._isPlayerTarget ? this.clampY(y - screenHeight / 2) : y - screenHeight / 2;
            }

            if (wasPlayerTarget !== this._isPlayerTarget) {
                [this._transitionStartX, this._transitionStartY] = [$gameMap._displayX, $gameMap._displayY];
                this._transitionProgress = 0;
            }
        } else {
            if (this._currentX === null) {
                this._currentX = $gameMap._displayX;
                this._currentY = $gameMap._displayY;
            }

            this._targetX = this.clampX(x - (screenWidth - 1) / 2);
            this._targetY = this.clampY(y - (screenHeight - 1) / 2);
        }

        this._isActive = true;
    };

    Game_Map.prototype.updateParallaxForCamera = function (oldX, oldY) {
        if (this._parallaxName && this._parallaxName.startsWith('!')) {
            if (!this._parallaxLoopX) {
                this._parallaxX += this._displayX - oldX;
            }
            if (!this._parallaxLoopY) {
                this._parallaxY += this._displayY - oldY;
            }
        }
    };

    Game_CameraTarget.prototype.isPlayerMoving = function () {
        const currentX = $gamePlayer._realX;
        const currentY = $gamePlayer._realY;

        if (this._lastPlayerX === null) {
            this._lastPlayerX = currentX;
            this._lastPlayerY = currentY;
            return false;
        }

        const hasMoved = (this._lastPlayerX !== currentX || this._lastPlayerY !== currentY);

        this._lastPlayerX = currentX;
        this._lastPlayerY = currentY;

        return hasMoved || $gamePlayer.isMoving();
    };

    Game_CameraTarget.prototype.update = function () {
        if (!this._isActive || this._isDragonCameraActive) return;

        const oldDisplayX = $gameMap._displayX;
        const oldDisplayY = $gameMap._displayY;

        // MultiTweaks plugin
        if ((typeof ScSWinter !== 'undefined' && ScSWinter.params) || Imported.Hendrix_Map_Zoom) {
            if (this._currentX === this._targetX && this._currentY === this._targetY) {
                this._isMovingToTarget = false;
                return;
            }

            const dx = Math.abs(this._targetX - $gameMap._displayX);
            const dy = Math.abs(this._targetY - $gameMap._displayY);
            const distance = Math.sqrt(dx * dx + dy * dy);

            const speedMultiplier = Math.max(0.15,
                distance <= 5 ? 1 : 1 / (1 + Math.log10(distance))
            );
            const baseSpeed = CAMERA_PAN_SPEED / 50 * speedMultiplier;

            if (typeof this._transitionProgress === 'number') {
                this._transitionProgress = Math.min(1, this._transitionProgress + baseSpeed);
                const ease = 1 - Math.pow(1 - this._transitionProgress, 3);

                this._currentX = this._transitionStartX + (this._targetX - this._transitionStartX) * ease;
                this._currentY = this._transitionStartY + (this._targetY - this._transitionStartY) * ease;

                if (this._transitionProgress >= 1) this._transitionProgress = null;
            } else {
                this._currentX += (this._targetX - this._currentX) * baseSpeed;
                this._currentY += (this._targetY - this._currentY) * baseSpeed;
            }

            if (Imported.Hendrix_Map_Zoom) {
                $gameMap._displayX = this.clampX(this._currentX);
                $gameMap._displayY = this.clampY(this._currentY);
            } else {
                $gameMap._displayX = this._isPlayerTarget ? this._currentX : this.clampX(this._currentX);
                $gameMap._displayY = this._isPlayerTarget ? this._currentY : this.clampY(this._currentY);
            }

            if (distance < 0.5) {
                this._isMovingToTarget = false;
            }
        } else {
            const speed = CAMERA_PAN_SPEED * 0.04;

            if (this._currentX !== this._targetX || this._currentY !== this._targetY) {
                this._currentX = this._currentX + (this._targetX - this._currentX) * speed;
                this._currentY = this._currentY + (this._targetY - this._currentY) * speed;

                $gameMap._displayX = this.clampX(this._currentX);
                $gameMap._displayY = this.clampY(this._currentY);

                const distance = Math.hypot(this._targetX - this._currentX, this._targetY - this._currentY);
                if (distance < 0.1) {
                    this._isMovingToTarget = false;
                }
            } else {
                this._isMovingToTarget = false;
            }
        }

        $gameMap.updateParallaxForCamera(oldDisplayX, oldDisplayY);
        if (this._autoDeactivate && this._isActive) {
            const distance = Math.abs(this._targetX - this._currentX) + Math.abs(this._targetY - this._currentY);
            if (distance < 0.5) {
                this.deactivate();
            }
        }
    };

    Game_CameraTarget.prototype.clampX = function (x) {
        if (Imported.Hendrix_Map_Zoom) {
            const extX = $gameMap._extraScreenTileX || 0;
            const minX = -extX;
            const maxX = Math.max(minX, $gameMap.width() - $gameMap.screenTileX() + extX);
            return Math.round(Math.max(minX, Math.min(maxX, x)) * 100) / 100;
        }
        const screenWidth = Graphics.boxWidth / $gameMap.tileWidth();
        const minX = 0;
        const maxX = Math.max(0, $gameMap.width() - screenWidth);
        return Math.round(Math.max(minX, Math.min(maxX, x)) * 100) / 100;
    };

    Game_CameraTarget.prototype.clampY = function (y) {
        if (Imported.Hendrix_Map_Zoom) {
            const extY = $gameMap._extraScreenTileY || 0;
            const minY = -extY;
            const maxY = Math.max(minY, $gameMap.height() - $gameMap.screenTileY() + extY);
            return Math.round(Math.max(minY, Math.min(maxY, y)) * 100) / 100;
        }
        const screenHeight = Graphics.boxHeight / $gameMap.tileHeight();
        const minY = 0;
        const maxY = Math.max(0, $gameMap.height() - screenHeight);
        return Math.round(Math.max(minY, Math.min(maxY, y)) * 100) / 100;
    };

    Game_CameraTarget.prototype.deactivate = function () {
        if (this._isDragonCameraActive) {
            $gamePlayer.setCameraFocus(0);
            // MultiTweaks plugin Compitibility
        } else if ((typeof ScSWinter !== 'undefined' && ScSWinter.params) || Imported.Hendrix_Map_Zoom) {
            const screenWidth = Graphics.boxWidth / $gameMap.tileWidth();
            const screenHeight = Graphics.boxHeight / $gameMap.tileHeight();
            $gameMap.setDisplayPos($gamePlayer._realX - screenWidth / 2, $gamePlayer._realY - screenHeight / 2);
        }

        this._isActive = false;
        this._targetX = null;
        this._targetY = null;
        this._currentX = null;
        this._currentY = null;
    };

    const _Game_Map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function (sceneActive) {
        _Game_Map_update.call(this, sceneActive);
        if (!this._cameraTarget || typeof this._cameraTarget.update !== 'function') {
            this._cameraTarget = new Game_CameraTarget();
        }
        this._cameraTarget.update();
    };

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        _Scene_Map_update.call(this);

        if (!CAMERA_TO_SPEAKER ||
            !$gameMap._cameraTarget?._isActive ||
            $gameMap._interpreter.isRunning()) return;

        if ($gameMap._cameraTarget._manualFocusActive) return;
        if ($gameMap._cameraTarget.isPlayerMoving()) {
            $gameMap._cameraTarget._settledTimer = null;
            $gameMap._cameraTarget._resetTimer = null;

            const playerRealX = $gamePlayer._realX;
            const playerRealY = $gamePlayer._realY;
            $gameMap._cameraTarget.setTarget(playerRealX, playerRealY);
            return;
        }
        if ($gameMap._cameraTarget._isMovingToTarget) return;

        if ($gameMap._cameraTarget._isDragonCameraActive) {
            $gamePlayer.setCameraFocus(0);
            return;
        }

        if (!$gameMap._cameraTarget._settledTimer) {
            $gameMap._cameraTarget._settledTimer = 10;
            return;
        } else {
            $gameMap._cameraTarget._settledTimer--;
            if ($gameMap._cameraTarget._settledTimer > 0) return;
        }

        if (!$gameMap._cameraTarget._resetTimer) {
            $gameMap._cameraTarget._resetTimer = 60;
        } else {
            $gameMap._cameraTarget._resetTimer--;
            if ($gameMap._cameraTarget._resetTimer <= 0) {
                $gameMap._cameraTarget.setTarget($gamePlayer._realX, $gamePlayer._realY);
                $gameMap._cameraTarget._resetTimer = null;
                $gameMap._cameraTarget._settledTimer = null;

                if ((typeof ScSWinter !== 'undefined' && ScSWinter.params) || Imported.Hendrix_Map_Zoom) {
                    const distance = Math.hypot(
                        $gameMap._cameraTarget._currentX - $gameMap._cameraTarget._targetX,
                        $gameMap._cameraTarget._currentY - $gameMap._cameraTarget._targetY
                    );

                    if (distance < 0.1) {
                        setTimeout(() => $gameMap._cameraTarget.deactivate(), 50);
                    }
                } else {
                    setTimeout(() => {
                        $gameMap._cameraTarget.deactivate();
                    }, 1000);
                }
            }
        }
    };

    const _Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function () {
        _Game_Map_initialize.call(this);
        this._cameraTarget = new Game_CameraTarget();
    };

    //=============================================================================
    // Font Management
    //=============================================================================

    const loadCustomFont = (fontFile) => {
        if (!fontFile) return null;
        const fontFace = fontFile.split('.')[0];
        const fontPath = `fonts/${fontFile}`;
        const customFont = new FontFace(fontFace, `url('${fontPath}')`);
        customFont.load().then(loadedFont => {
            document.fonts.add(loadedFont);
        }).catch(error => {
            console.error('Font loading failed:', error);
        });
        return fontFace;
    };

    const nameboxFontFamily = loadCustomFont(NAMEBOX_FONT_FILE);
    const messageFontFamily = loadCustomFont(MESSAGE_FONT_FILE);

    if (CHOICE_FONT_FILE) {
        loadCustomFont(CHOICE_FONT_FILE);
    }

    if (NORMAL_MESSAGE_FONT_FILE) {
        loadCustomFont(NORMAL_MESSAGE_FONT_FILE);
    }

    //=============================================================================
    // Message Window - Core
    //=============================================================================

    const _Window_Message_open = Window_Message.prototype.open;
    Window_Message.prototype.open = function () {
        const speakerName = $gameMessage.speakerName();
        if (!speakerName || !bubbleMessagesEnabled) {
            _Window_Message_open.call(this, arguments);
            return;
        }

        if (BUBBLE_ANIMATION === 'scale') {
            this.pivot.x = this.width / 2;
            this.pivot.y = this.height / 2;
            this.scale.x = 0;
            this.scale.y = 0;
        }

        if (this._navigatorSprite) {
            this._navigatorSprite.visible = true;
        }

        if (!this.isClosing()) {
            this._opening = true;
            this.openness = 0;
        }
    };


    const _Window_Message_updateOpen = Window_Message.prototype.updateOpen;
    Window_Message.prototype.updateOpen = function () {
        const speakerName = $gameMessage.speakerName();
        if (!speakerName || !bubbleMessagesEnabled) {
            _Window_Message_updateOpen.call(this, arguments);
            return;
        }
        if (this._opening) {
            this.openness += 32;
            if (this.isOpen()) {
                this._opening = false;
            }

            const event = this.findEventByName(speakerName);
            if (event) {
                this.placeBubbleMessage(event);
            }

            if (this._opening && BUBBLE_ANIMATION === 'scale') {
                const progress = this.openness / 255;
                this.scale.x = progress;
                this.scale.y = progress;
            }
        }
    };

    const _Window_Message_updateClose = Window_Message.prototype.updateClose;
    Window_Message.prototype.updateClose = function () {
        if (this._navigatorSprite) {
            this._navigatorSprite.visible = false;
        }
        if (BUBBLE_ANIMATION === 'scale' && this._currentSpeakerName) {
            if (this._closing) {
                this.scale.x = Math.max(this.scale.x - 0.15, 0);
                this.scale.y = Math.max(this.scale.y - 0.15, 0);
                if (this.scale.x <= 0) {
                    this._closing = false;
                    this.openness = 0;
                }
            }
        } else {
            _Window_Message_updateClose.call(this);
        }
    };

    const _Window_Message_updateShowFast = Window_Message.prototype.updateShowFast;
    Window_Message.prototype.updateShowFast = function () {
        const speakerName = $gameMessage.speakerName();
        if (!speakerName || !bubbleMessagesEnabled) {
            _Window_Message_updateShowFast.call(this, arguments);
            return;
        }
        if (BUBBLE_ANIMATION === 'scale') {
            this._showFast = true;
        }
        _Window_Message_updateShowFast.call(this);
    };

    Window_Message.prototype.drawFace = function (faceName, faceIndex, x, y, width, height) {
        const speakerName = $gameMessage.speakerName();
        if (!speakerName || !bubbleMessagesEnabled) {
            width = width || ImageManager.faceWidth;
            height = height || ImageManager.faceHeight;
            const normalScaledSize = Math.floor(width * NORMAL_FACE_SCALE);

            const bitmap = ImageManager.loadFace(faceName);
            bitmap.smooth = false;
            const pw = ImageManager.faceWidth;
            const ph = ImageManager.faceHeight;
            const sw = pw;
            const sh = ph;
            const sx = (faceIndex % 4) * pw;
            const sy = Math.floor(faceIndex / 4) * ph;
            const dx = x;
            const dy = y;
            const dw = normalScaledSize;
            const dh = normalScaledSize;

            this.contents.smooth = false;
            this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
            this.contents.smooth = true;
            return;
        }

        width = width || ImageManager.faceWidth;
        height = height || ImageManager.faceHeight;

        const scaledSize = Math.floor(width * FACE_SCALE);
        const bitmap = ImageManager.loadFace(faceName);
        bitmap.smooth = false;
        const pw = ImageManager.faceWidth;
        const ph = ImageManager.faceHeight;
        const sw = pw;
        const sh = ph;
        const sx = (faceIndex % 4) * pw;
        const sy = Math.floor(faceIndex / 4) * ph;
        const dx = x;
        const dy = y;
        const dw = scaledSize;
        const dh = scaledSize;

        this.contents.smooth = false;
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
        this.contents.smooth = true;
    };

    const _Window_Message_newLineX = Window_Message.prototype.newLineX;
    Window_Message.prototype.newLineX = function () {
        const speakerName = $gameMessage.speakerName();
        if (!speakerName || !bubbleMessagesEnabled) {
            if ($gameMessage.faceName() === '') {
                return _Window_Message_newLineX.call(this, arguments);
            }
            const normalScaledFaceWidth = Math.floor(ImageManager.faceWidth * NORMAL_FACE_SCALE);
            return normalScaledFaceWidth + 24;
        }

        if ($gameMessage.faceName() === '') {
            return _Window_Message_newLineX.call(this, arguments);
        }

        const scaledFaceWidth = Math.floor(ImageManager.faceWidth * FACE_SCALE);
        return scaledFaceWidth + 24;
    };


    Window_Message.prototype.processCharacter = function (textState) {
        const c = textState.text[textState.index++];
        if (c.charCodeAt(0) < 0x20) {
            this.flushTextState(textState);
            this.processControlCharacter(textState, c);
        } else {
            textState.buffer += c;
            if (!this._typingSoundCounter) this._typingSoundCounter = 0;
            this._typingSoundCounter++;
            if (TYPING_SFX && !this._showFast && !this._lineShowFast && this._typingSoundCounter >= 4) {
                this.playTypingSFX();
                this._typingSoundCounter = 0;
            }
        }
    };

    Window_Message.prototype.playTypingSFX = function () {
        if (!TYPING_SFX) return;

        let volume = 50; let pitch = 100;

        if (TYPING_SFX_VOLUME_PITCH) {
            const params = TYPING_SFX_VOLUME_PITCH.split(',').map(v => parseInt(v.trim()));
            if (params.length >= 2) {
                volume = params[0];
                pitch = params[1];
            } else {
                volume = params[0];
            }
        }

        AudioManager.playSe({ name: TYPING_SFX, volume: volume, pitch: pitch, pan: 0 });
    };

    const _Window_NameBox_start = Window_NameBox.prototype.start;
    Window_NameBox.prototype.start = function () {

        if (!bubbleMessagesEnabled || !$gameMessage.speakerName()) {
            this.show();
            this.open();
            _Window_NameBox_start.call(this);
        } else {
            this.openness = 0;
            this.hide();
            this.close();
            this.contents.clear();
        }
    };

    Window_Message.prototype.drawMessageName = function (name) {
        name = name.replace(/\\V\[(\d+)\]/gi, (match, n) => {
            return $gameVariables.value(parseInt(n));
        });
        let displayName = name.replace(/\s*\([^)]*\)/gi, '').trim();

        if (displayName.toLowerCase() === 'this') return;

        const normalizedName = displayName.toLowerCase();
        if (normalizedName === 'player') {
            displayName = $gameParty.leader().name();
        } else if (normalizedName.startsWith('follower:')) {
            const followerIdentifier = displayName.substring(9).trim();

            const actorId = parseInt(followerIdentifier);
            if (!isNaN(actorId)) {
                const actor = $gameParty.battleMembers().find(member => member && member.actorId() === actorId);
                displayName = actor ? actor.name() : followerIdentifier;
            } else {
                displayName = followerIdentifier;
            }
        }

        const padding = 4;

        const originalReset = this.resetFontSettings.bind(this);
        this.resetFontSettings = function () {
            this.contents.fontSize = NAMEBOX_FONT_SIZE !== null ? NAMEBOX_FONT_SIZE : $gameSystem.mainFontSize();
            this.contents.fontFace = nameboxFontFamily || $gameSystem.mainFontFace();
            this.contents.textColor = NAMEBOX_FONT_COLOR || ColorManager.normalColor();
            this.contents.outlineWidth = NAMEBOX_OUTLINE ? 4 : 0;
            this.contents.outlineColor = NAMEBOX_OUTLINE_COLOR || ColorManager.outlineColor();
        };

        const textWidth = this.textSizeEx(displayName).width + padding * 2;

        let x;
        switch (NAMEBOX_POSITION.toLowerCase()) {
            case 'center':
                x = (this.width - textWidth) / 2;
                break;
            case 'right':
                x = this.width - textWidth - this.padding;
                break;
            default:
                x = this.padding;
                break;
        }

        const newSprite = new Sprite();
        newSprite.bitmap = new Bitmap(textWidth, this.lineHeight());
        newSprite.x = x;
        newSprite.y = -this.lineHeight() + NAMEBOX_Y_OFFSET;

        if (this._nameSprite &&
            this._nameSprite.width === newSprite.width &&
            this._nameSprite.height === newSprite.height &&
            this._nameSprite.x === newSprite.x &&
            this._nameSprite.y === newSprite.y) {
            this.resetFontSettings = originalReset;
            return;
        }

        if (this._nameSprite) {
            this.removeChild(this._nameSprite);
            this._nameSprite = null;
        }

        this._nameSprite = newSprite;
        this.addChild(this._nameSprite);

        const tempContents = this.contents;
        this.contents = newSprite.bitmap;
        this.drawTextEx(displayName, padding, 0, textWidth - padding * 2);
        this.contents = tempContents;

        this.resetFontSettings = originalReset;
        this.resetFontSettings();
    };

    const _Window_Message_lineHeight = Window_Message.prototype.lineHeight;
    Window_Message.prototype.lineHeight = function () {
        const speakerName = $gameMessage.speakerName();
        if (!speakerName || !bubbleMessagesEnabled) {
            return _Window_Message_lineHeight.call(this);
        }
        return MESSAGE_LINE_HEIGHT;
    };

    const _Window_Message_resetFontSettings = Window_Message.prototype.resetFontSettings;
    Window_Message.prototype.resetFontSettings = function () {
        _Window_Message_resetFontSettings.call(this);

        if (!this._currentSpeakerName) {
            // Normal message settings
            this.contents.fontFace = NORMAL_MESSAGE_FONT_FILE ? NORMAL_MESSAGE_FONT_FILE.split('.')[0] : $gameSystem.mainFontFace();
            this.contents.fontSize = NORMAL_MESSAGE_FONT_SIZE || $gameSystem.mainFontSize();
            this.contents.textColor = NORMAL_MESSAGE_FONT_COLOR || ColorManager.normalColor();
            this.contents.outlineWidth = NORMAL_MESSAGE_OUTLINE ? 4 : 0;
            this.contents.outlineColor = NORMAL_MESSAGE_OUTLINE_COLOR || ColorManager.outlineColor();
            return;
        }

        // Bubble message settings
        this.contents.fontFace = messageFontFamily || $gameSystem.mainFontFace();
        this.contents.fontSize = MESSAGE_FONT_SIZE || $gameSystem.mainFontSize();
        this.contents.textColor = MESSAGE_FONT_COLOR || ColorManager.normalColor();
        this.contents.outlineWidth = MESSAGE_OUTLINE ? 4 : 0;
        this.contents.outlineColor = MESSAGE_OUTLINE_COLOR || ColorManager.outlineColor();
    };


    const _Window_Message_loadWindowskin = Window_Message.prototype.loadWindowskin;
    Window_Message.prototype.loadWindowskin = function () {
        const speakerName = $gameMessage.speakerName();
        if (!speakerName || !bubbleMessagesEnabled) {
            _Window_Message_loadWindowskin.call(this);
            return;
        }

        this.windowskin = ImageManager.loadSystem(currentBubbleWindowskin);
        this.windowskin.smooth = false;
    };

    function randomizeValue(value, defaultValue) {
        if (!value) return defaultValue;
        if (value.includes('-')) {
            const [min, max] = value.split('-').map(v => Number(v.trim()));
            if (!isNaN(min) && !isNaN(max)) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }
        const num = Number(value);
        return isNaN(num) ? defaultValue : num;
    }

    const _Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function () {
        this._typingSoundCounter = 0;
        this._expandedWidth = null;
        const speakerName = $gameMessage.speakerName();

        if (this._nameSprite) {
            this.removeChild(this._nameSprite);
            this._nameSprite = null;
        }

        if (speakerName && bubbleMessagesEnabled) {
            this.resizeBubble();
            this.updatePlacement();
        } else {
            // Regular messages, reset window dimenssion
            this.width = NORMAL_MESSAGE_WIDTH > 0 ? NORMAL_MESSAGE_WIDTH : Graphics.boxWidth;
            this.height = this.fittingHeight(NORMAL_MESSAGE_ROW);
            this.x = (Graphics.boxWidth - this.width) / 2;
            this.createContents();
        }

        this._currentSpeakerName = bubbleMessagesEnabled ? speakerName : null;

        if (MESSAGE_SFX) {
            const vfxParams = splitVFX(MESSAGE_SFX_VOLUME_PITCH);
            AudioManager.playSe({
                name: MESSAGE_SFX,
                volume: randomizeValue(vfxParams.volume, 45),
                pitch: 100 + randomizeValue(vfxParams.pitch, 0),
                pan: 0
            });
        }

        // Wrap Text for Normal Message
        if (!speakerName || !bubbleMessagesEnabled) {
            if (WRAP_NORMAL_MESSAGE && $gameMessage._texts.length > 0) {
                const wrappedLines = [];
                for (const text of $gameMessage._texts) {
                    wrappedLines.push(...this.wrapText(text));
                }

                if (wrappedLines.length > NORMAL_MESSAGE_ROW) {
                    const pages = [];
                    for (let i = 0; i < wrappedLines.length; i += NORMAL_MESSAGE_ROW) {
                        const page = wrappedLines.slice(i, i + NORMAL_MESSAGE_ROW);
                        pages.push(page.join('\n'));
                    }
                    $gameMessage._texts = [pages.join('\f')];
                } else {
                    $gameMessage._texts = wrappedLines;
                }
            }
            this._messageInitialized = false;
            _Window_Message_startMessage.call(this);
            return;
        }

        if (CAMERA_TO_SPEAKER && speakerName && bubbleMessagesEnabled) {
            const event = this.findEventByName(speakerName);
            if (event) {
                if (!$gameMap._cameraTarget) {
                    $gameMap._cameraTarget = new Game_CameraTarget();
                }

                if (speakerName.toLowerCase() === 'player') {
                    $gameMap._cameraTarget.setTarget($gamePlayer._realX, $gamePlayer._realY);
                } else {
                    $gameMap._cameraTarget.setTarget(event.x, event.y);
                }
            }
        }

        // Wrap Text for Bubble Message
        if (speakerName && bubbleMessagesEnabled && $gameMessage._texts.length > 0) {
            if (MANUAL_WORD_WRAP) {
                // Manual line break - preserve line breaks from editor
                const combinedText = $gameMessage._texts.join('\n');
                const manualLines = combinedText.split('\n');
                const wrappedLines = [];

                for (const line of manualLines) {
                    if (line.trim()) {
                        wrappedLines.push(...this.wrapText(line));
                    } else {
                        wrappedLines.push('');
                    }
                }

                if (wrappedLines.length > MAX_ROW) {
                    const pages = [];
                    for (let i = 0; i < wrappedLines.length; i += MAX_ROW) {
                        pages.push(wrappedLines.slice(i, i + MAX_ROW).join('\n'));
                    }
                    $gameMessage._texts = pages;
                } else {
                    $gameMessage._texts = wrappedLines;
                }
            } else {
                // Auto word wrap - combine all text into one line
                const combinedText = $gameMessage._texts.join(' ').replace(/\n/g, ' ');
                const wrappedLines = this.wrapText(combinedText);

                if (wrappedLines.length > MAX_ROW) {
                    const pages = [];
                    for (let i = 0; i < wrappedLines.length; i += MAX_ROW) {
                        pages.push(wrappedLines.slice(i, i + MAX_ROW).join('\n'));
                    }
                    $gameMessage._texts = pages;
                } else {
                    $gameMessage._texts = wrappedLines;
                }
            }
        }

        //if (bubbleMessagesEnabled && speakerName) {
        //    this.drawMessageName(speakerName);
        //}
        _Window_Message_startMessage.call(this);
    };

    const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function () {
        _Window_Message_terminateMessage.call(this);

        // Return camera to player when dialogue ends
        if (CAMERA_TO_SPEAKER) {
            setTimeout(() => {
                if (!$gameMessage.hasText() && !$gameMap._interpreter.isRunning()) {
                    if (SceneManager._scene && SceneManager._scene.executeCameraReturn) {
                        SceneManager._scene.executeCameraReturn();
                    } else {
                        if ($gameMap._cameraTarget) {
                            if ($gameMap._cameraTarget._isDragonCameraActive) {
                                $gamePlayer.setCameraFocus(0);
                            } else {
                                $gameMap._cameraTarget.setTarget($gamePlayer._realX, $gamePlayer._realY);
                                setTimeout(() => {
                                    $gameMap._cameraTarget.deactivate();
                                }, 1000);
                            }
                        }
                    }
                }
            }, 200);
        }
    };

    Window_Message.prototype.wrapText = function (text) {
        const speakerName = $gameMessage.speakerName();
        const faceExists = $gameMessage.faceName() !== '';
        const faceScale = speakerName ? FACE_SCALE : NORMAL_FACE_SCALE;
        const faceWidth = faceExists ? Math.floor(ImageManager.faceWidth * faceScale) + 20 : 0;
        const maxWidth = speakerName ?
            (MAX_WIDTH - faceWidth - this.padding * 2 - BUFFER_SPACE) :
            (NORMAL_MESSAGE_WIDTH - faceWidth - this.padding * 2 - BUFFER_SPACE);

        const removeEscapeCodes = (text) => {
            if (!text) return '';
            let result = text.replace(/\\([\w!$&.|^]|[A-Z])\[([^\]]*)\]/gi, '');
            result = result.replace(/\\./g, '');
            return result;
        };

        const isAsian = /[\u3000-\u9fff]/.test(text);
        const lines = [''];
        let currentLine = 0;

        const segments = isAsian ? [...text] : text.split(/([\s\n])/);
        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            const testLine = lines[currentLine] + segment;
            const maxRows = speakerName ? MAX_ROW : NORMAL_MESSAGE_ROW;

            const cleanTestLine = removeEscapeCodes(testLine);
            const cleanWidth = this.textWidth(cleanTestLine);

            if (cleanWidth <= maxWidth) {
                lines[currentLine] += segment;
            } else if (currentLine === maxRows - 1) {
                const remaining = isAsian ? text.slice(i) : segments.slice(i).join('').trim();
                const cleanRemaining = removeEscapeCodes(remaining);
                const shortTextLimit = isAsian ? 3 : 9;

                if (cleanRemaining.length <= shortTextLimit &&
                    this.textWidth(removeEscapeCodes(lines[currentLine] + remaining)) <= maxWidth * 1.2) {
                    lines[currentLine] += remaining;
                    this._expandedWidth = this.textWidth(removeEscapeCodes(lines[currentLine])) +
                        faceWidth + this.padding * 2 + BUFFER_SPACE;
                    break;
                }
                currentLine++;
                if (segment === ' ' && i + 1 < segments.length) {
                    lines[currentLine] = segments[i + 1];
                    i++;
                } else {
                    lines[currentLine] = segment;
                }
            } else {
                currentLine++;
                if (segment === ' ' && i + 1 < segments.length) {
                    lines[currentLine] = segments[i + 1];
                    i++;
                } else {
                    lines[currentLine] = segment;
                }
            }
        }

        return lines.filter(line => removeEscapeCodes(line).trim().length > 0);
    };

    const _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function () {
        const speakerName = this._currentSpeakerName;

        if (!speakerName || !bubbleMessagesEnabled) {
            // Normal messages, reset
            this.scale.x = 1;
            this.scale.y = 1;
            this.pivot.x = 0;
            this.pivot.y = 0;
            this.width = NORMAL_MESSAGE_WIDTH > 0 ? NORMAL_MESSAGE_WIDTH : Graphics.boxWidth;
            this.height = this.fittingHeight(NORMAL_MESSAGE_ROW);
            this.x = (Graphics.boxWidth - this.width) / 2;
            this.createContents();
            this.loadWindowskin();
            _Window_Message_updatePlacement.call(this);
            this.y += NORMAL_MESSAGE_Y_OFFSET;
            return;
        }
        if (this._currentSpeakerName && bubbleMessagesEnabled && this._dimmerSprite) {
            this._dimmerSprite.visible = false;
        }
        const event = this.findEventByName(speakerName);
        if (event) {
            this.resizeBubble();
            this.placeBubbleMessage(event);
            if (this._nameSprite) {
                this.removeChild(this._nameSprite);
                this._nameSprite = null;
            }
            this.loadWindowskin();
            this.drawMessageName(speakerName);
        }
    };

    Window_Message.prototype.resizeBubble = function () {
        const dimensions = this.calcAutoSize();
        this.width = dimensions.width;
        this.height = dimensions.height;
        this.createContents();
    };

    Window_Message.prototype.calcAutoSize = function () {
        const texts = $gameMessage._texts;
        const faceExists = $gameMessage.faceName() !== '';
        const scaledFaceSize = Math.floor(ImageManager.faceWidth * FACE_SCALE);
        const faceWidth = faceExists ? scaledFaceSize + 20 : 0;
        let maxWidth = 0;

        if (this._expandedWidth) {
            maxWidth = this._expandedWidth;
            this._expandedWidth = null;
        } else {
            const availableWidth = MAX_WIDTH > 0 ? MAX_WIDTH : Graphics.boxWidth - this.padding * 2;
            for (const text of texts) {
                const width = this.textWidth(text) + faceWidth + this.padding * 2 + BUFFER_SPACE;

                if (width >= availableWidth * 0.85) {
                    maxWidth = availableWidth;
                } else {
                    maxWidth = Math.max(maxWidth, width);
                }
            }
            maxWidth = Math.max(maxWidth, faceWidth + this.padding * 4);
            maxWidth = Math.min(maxWidth, availableWidth);
        }

        const totalLines = Math.min(texts.length, ROW_COUNT > 0 ? ROW_COUNT : texts.length);
        const lineHeight = this.lineHeight();
        const textHeight = totalLines * lineHeight;
        const faceHeight = faceExists ? scaledFaceSize : 0;
        const height = Math.max(textHeight, faceHeight) + this.padding * 2;

        return {
            width: maxWidth,
            height: Math.min(height, Graphics.boxHeight)
        };
    };

    Window_Message.prototype.findEventByName = function (name) {
        name = name.replace(/\\V\[(\d+)\]/gi, (match, n) => {
            return $gameVariables.value(parseInt(n));
        });

        // Strip color codes for event matching
        const cleanName = name.replace(/\\C\[(\d+)\]/gi, '');
        const normalizedName = cleanName.toLowerCase();

        // Name (event X)
        const thisEventMatch = cleanName.match(/(.+?)\s*\(this\)/i);
        if (thisEventMatch) {
            const eventId = $gameMap._interpreter.eventId();
            if (eventId > 0) {
                const event = $gameMap.event(eventId);
                if (event) {
                    return event;
                }
            }
            return null;
        }

        // this
        if (normalizedName === 'this') {
            const eventId = $gameMap._interpreter.eventId();
            if (eventId > 0) {
                const event = $gameMap.event(eventId);
                if (event) return event;
            }
            return null;
        }

        const eventIdMatch = cleanName.match(/(.+?)\s*\(event\s*(\d+)\)/i);

        if (eventIdMatch) {
            const eventId = parseInt(eventIdMatch[2]);
            const event = $gameMap.event(eventId);
            if (event) {
                return event;
            }
            return null;
        }

        // Display on Player
        if (normalizedName === 'player') {
            return $gamePlayer;
        }

        if (normalizedName.startsWith('follower:')) {
            const followerIdentifier = cleanName.substring(9).trim();

            const actorId = parseInt(followerIdentifier);
            if (!isNaN(actorId)) {
                // Actor ID
                for (let i = 0; i < $gameParty.battleMembers().length; i++) {
                    const member = $gameParty.battleMembers()[i];
                    if (member && member.actorId() === actorId && $gamePlayer.followers()._data[i - 1]) {
                        return $gamePlayer.followers()._data[i - 1];
                    }
                }
            } else {
                // Name
                for (let i = 0; i < $gameParty.battleMembers().length; i++) {
                    const member = $gameParty.battleMembers()[i];
                    if (member && member.name() === followerIdentifier && $gamePlayer.followers()._data[i - 1]) {
                        return $gamePlayer.followers()._data[i - 1];
                    }
                }
            }
            return null;
        }

        return $gameMap.events().find(event => {
            // Check if event name matches AND has an active page
            return event.event().name === cleanName &&
                event.page() !== null;
        });
    };

    Window_Message.prototype.createNavigator = function () {
        if (!this._navigatorSprite && BUBBLE_NAVIGATOR) {
            this._navigatorSprite = new Sprite();
            this._navigatorSprite.bitmap = ImageManager.loadSystem(BUBBLE_NAVIGATOR);
            this._navigatorSprite.visible = false;
            this.addChild(this._navigatorSprite);
        }
    };

    Window_Message.prototype.updateNavigatorPosition = function (isAboveCharacter, speakerScreenX) {
        if (!this._navigatorSprite || !BUBBLE_NAVIGATOR) return;
        this._navigatorSprite.visible = this.openness >= 255;

        if (speakerScreenX !== undefined) {
            const tailX = speakerScreenX - this.x - this._navigatorSprite.width / 2;
            const minX = 10;
            const maxX = this.width - this._navigatorSprite.width - 10;
            this._navigatorSprite.x = Math.max(minX, Math.min(maxX, tailX));
        } else {
            this._navigatorSprite.x = this.width / 2 - this._navigatorSprite.width / 2;
        }

        if (isAboveCharacter) {
            this._navigatorSprite.y = this.height;
            this._navigatorSprite.scale.y = 1;
        } else {
            this._navigatorSprite.y = 0;
            this._navigatorSprite.scale.y = -1;
        }
    };
    Game_Character.prototype.getSpriteHeight = function () {
        const characterName = this.characterName();

        if (!characterName) return 48;

        if (eventHeightCache.has(characterName)) {
            return eventHeightCache.get(characterName);
        }

        const bitmap = ImageManager.loadCharacter(characterName);
        const defaultHeight = ImageManager.isBigCharacter(characterName) ? 64 : 48;

        eventHeightCache.set(characterName, defaultHeight);

        bitmap.addLoadListener(() => {
            const big = ImageManager.isBigCharacter(characterName);
            const isSingleRow = Imported.Hendrix_Animation_Solution && this._isSingleRowSprite;
            const charWidth = isSingleRow ? Math.floor(bitmap.width / this._frames) : (big ? bitmap.width / 3 : bitmap.width / 12);
            const charHeight = isSingleRow ? bitmap.height : (big ? bitmap.height / 4 : bitmap.height / 8);
            const index = this.characterIndex();
            const sx = isSingleRow ? 0 : (index % 4 * 3) * charWidth;
            const sy = isSingleRow ? 0 : Math.floor(index / 4) * 4 * charHeight;

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = charWidth;
            canvas.height = charHeight;

            ctx.drawImage(bitmap._canvas || bitmap._image,
                sx, sy, charWidth, charHeight,
                0, 0, charWidth, charHeight);

            const imageData = ctx.getImageData(0, 0, charWidth, charHeight);
            const data = imageData.data;

            let topPixel = charHeight;
            let bottomPixel = 0;

            for (let y = 0; y < charHeight; y++) {
                for (let x = 0; x < charWidth; x++) {
                    const alpha = data[(y * charWidth + x) * 4 + 3];
                    if (alpha > 0) {
                        topPixel = Math.min(topPixel, y);
                        bottomPixel = Math.max(bottomPixel, y + 1);
                    }
                }
            }

            const actualHeight = bottomPixel - topPixel;
            eventHeightCache.set(characterName, actualHeight > 0 ? actualHeight : defaultHeight);
        });

        return eventHeightCache.get(characterName);
    };

    Window_Message.prototype.placeBubbleMessage = function (event) {
        if (!this._navigatorSprite) {
            this.createNavigator();
        }

        if (forceBubblePosition) {
            if (BUBBLE_ANIMATION === 'scale') {
                this.pivot.x = this.width / 2;
                this.pivot.y = this.height / 2;
                this.x = forcedBubbleX;
                this.y = forcedBubbleY;
            } else {
                this.x = forcedBubbleX - this.width / 2;
                this.y = forcedBubbleY;
            }
            if (this._navigatorSprite) {
                this._navigatorSprite.visible = forcedShowTail;
            }
            return;
        }

        const tileHeight = $gameMap.tileHeight();
        const tileWidth = $gameMap.tileWidth();

        let speakerScreenX;
        if ((typeof ScSWinter !== 'undefined' && ScSWinter.params) || Imported.Hendrix_Map_Zoom) {
            const zoom = $gameMap._currentZoom || 1.0;
            speakerScreenX = Math.round((event._realX - $gameMap._displayX - $gameMap._extraScreenTileX) * tileWidth * zoom + tileWidth * zoom / 2);
        } else {
            speakerScreenX = Math.round((event._realX - $gameMap._displayX) * tileWidth + tileWidth / 2);
        }

        const screenY = Math.round((event._realY - $gameMap._displayY) * tileHeight + tileHeight / 2);
        const baseY = screenY - (VERTICAL_ADJUSTMENT === 'auto' ? event.getSpriteHeight() : tileHeight) - this.height + (VERTICAL_ADJUSTMENT === 'auto' ? 0 : Number(VERTICAL_ADJUSTMENT));
        const isAboveCharacter = baseY >= 0 && baseY + this.height <= Graphics.boxHeight;

        this.updateNavigatorPosition(isAboveCharacter, speakerScreenX);
        this.placeCloselyStickingBubble(event);
    };

    const _Window_Message_close = Window_Message.prototype.close;
    Window_Message.prototype.close = function () {
        _Window_Message_close.call(this);
        if (this._navigatorSprite) {
            this._navigatorSprite.visible = false;
        }
    };

    Window_Message.prototype.placeCloselyStickingBubble = function (event) {
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();

        if ((typeof ScSWinter !== 'undefined' && ScSWinter.params) || Imported.Hendrix_Map_Zoom) {
            const zoom = $gameMap._currentZoom || 1.0;
            const screenX = Math.round((event._realX - $gameMap._displayX - $gameMap._extraScreenTileX) * tileWidth * zoom + tileWidth * zoom / 2);
            const screenY = Math.round((event._realY - $gameMap._displayY - $gameMap._extraScreenTileY) * tileHeight * zoom + tileHeight * zoom / 2);
            let baseX = screenX - this.width / 2;
            let baseY;

            if (VERTICAL_ADJUSTMENT === 'auto') {
                baseY = screenY - event.getSpriteHeight() * zoom - this.height + Number(pluginParams['Vertical Position'] || 0);
                if (baseY < 0 || baseY + this.height > Graphics.boxHeight) {
                    baseY = screenY + tileHeight * zoom;
                }
            } else {
                baseY = screenY - tileHeight * zoom - this.height + Number(VERTICAL_ADJUSTMENT);
                if (baseY < 0 || baseY + this.height > Graphics.boxHeight) {
                    baseY = screenY + tileHeight * zoom + Number(VERTICAL_ADJUSTMENT);
                }
            }

            if (baseX < 0) {
                baseX = 0;
            } else if (baseX + this.width > Graphics.boxWidth) {
                baseX = Graphics.boxWidth - this.width;
            }

            if (!this._messageInitialized) {
                if (BUBBLE_ANIMATION === 'scale') {
                    this.pivot.x = this.width / 2;
                    this.pivot.y = this.height / 2;
                    this.x = baseX + this.width / 2;
                    this.y = baseY + this.height / 2;
                } else {
                    this.x = baseX;
                    this.y = baseY;
                }
                this._messageInitialized = true;
            } else {
                const targetX = BUBBLE_ANIMATION === 'scale' ? baseX + this.width / 2 : baseX;
                const targetY = BUBBLE_ANIMATION === 'scale' ? baseY + this.height / 2 : baseY;

                if (BUBBLE_EASE === 'true') {
                    const distanceX = targetX - this.x;
                    const distanceY = targetY - this.y;
                    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                    const smoothness = Math.min(0.5, distance / 100);

                    if (distance > 0.01) {
                        this.x += distanceX * smoothness;
                        this.y += distanceY * smoothness;
                    } else {
                        this.x = targetX;
                        this.y = targetY;
                    }
                } else {
                    this.x = targetX;
                    this.y = targetY;
                }
            }
        } else {
            // Without MultiTweaks plugin
            const screenX = Math.round((event._realX - $gameMap._displayX) * tileWidth + tileWidth / 2);
            const screenY = Math.round((event._realY - $gameMap._displayY) * tileHeight + tileHeight / 2);

            let baseX = screenX - this.width / 2;
            let baseY;

            if (VERTICAL_ADJUSTMENT === 'auto') {
                baseY = screenY - event.getSpriteHeight() - this.height + Number(pluginParams['Vertical Position'] || 0);
                if (baseY < 0 || baseY + this.height > Graphics.boxHeight) {
                    baseY = screenY + tileHeight;
                }
            } else {
                baseY = screenY - tileHeight - this.height + Number(VERTICAL_ADJUSTMENT);
                if (baseY < 0 || baseY + this.height > Graphics.boxHeight) {
                    baseY = screenY + tileHeight + Number(VERTICAL_ADJUSTMENT);
                }
            }

            if (baseX < 0) {
                baseX = 0;
            } else if (baseX + this.width > Graphics.boxWidth) {
                baseX = Graphics.boxWidth - this.width;
            }

            if (!this._messageInitialized) {
                if (BUBBLE_ANIMATION === 'scale') {
                    this.pivot.x = this.width / 2;
                    this.pivot.y = this.height / 2;
                    this.x = baseX + this.width / 2;
                    this.y = baseY + this.height / 2;
                } else {
                    this.x = baseX;
                    this.y = baseY;
                }
                this._messageInitialized = true;
            } else {
                const targetX = BUBBLE_ANIMATION === 'scale' ? baseX + this.width / 2 : baseX;
                const targetY = BUBBLE_ANIMATION === 'scale' ? baseY + this.height / 2 : baseY;

                if (BUBBLE_EASE === 'true') {
                    const distanceX = targetX - this.x;
                    const distanceY = targetY - this.y;
                    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                    const smoothness = Math.min(0.5, distance / 100);

                    if (distance > 0.01) {
                        this.x += distanceX * smoothness;
                        this.y += distanceY * smoothness;
                    } else {
                        this.x = targetX;
                        this.y = targetY;
                    }
                } else {
                    this.x = targetX;
                    this.y = targetY;
                }
            }
        }
    };

    const _Window_Message_update = Window_Message.prototype.update;
    Window_Message.prototype.update = function () {
        _Window_Message_update.call(this);

        if (!bubbleMessagesEnabled) { return }
        if (this.isOpen() &&
            this.openness === 255 &&
            !this._opening &&
            !this._closing &&
            $gameMessage.speakerName()) {
            const event = this.findEventByName($gameMessage.speakerName());
            if (event) {
                this.placeBubbleMessage(event);
            }
        }
    };

    Window_Message.prototype.adjustPosition = function () {
        const minX = 0;
        const maxX = Graphics.boxWidth - this.width;
        const minY = 0;
        const maxY = Graphics.boxHeight - this.height;
        this.x = Math.max(minX, Math.min(maxX, this.x));
        this.y = Math.max(minY, Math.min(maxY, this.y));
    };

    const _Window_Message_initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function (rect) {
        _Window_Message_initialize.call(this, rect);
        this._defaultOpacity = this.opacity;
        this._defaultBackOpacity = this.backOpacity;
    };

    const _Window_Message_updateBackground = Window_Message.prototype.updateBackground;
    Window_Message.prototype.updateBackground = function () {
        const speakerName = $gameMessage.speakerName();
        if (speakerName && bubbleMessagesEnabled) {
            this.opacity = 255;
            this.backOpacity = 255;
        } else {
            this.opacity = this._defaultOpacity;
            this.backOpacity = this._defaultBackOpacity;
            _Window_Message_updateBackground.call(this);
        }
    };

    //=============================================================================
    // Choice Window
    //=============================================================================

    let targetY = 0;

    const _Window_ChoiceList_initialize = Window_ChoiceList.prototype.initialize;
    Window_ChoiceList.prototype.initialize = function (messageWindow) {
        _Window_ChoiceList_initialize.call(this, messageWindow);
        this.loadCustomWindowskin();
        this._animating = false;
        this._animationProgress = 0;
    };

    Window_ChoiceList.prototype.resetFontSettings = function () {
        this.contents.fontFace = CHOICE_FONT_FILE ? CHOICE_FONT_FILE.split('.')[0] : $gameSystem.mainFontFace();
        this.contents.fontSize = CHOICE_FONT_SIZE || $gameSystem.mainFontSize();
        this.contents.textColor = CHOICE_FONT_COLOR || ColorManager.normalColor();
        this.contents.outlineWidth = CHOICE_FONT_OUTLINE ? 4 : 0;
        this.contents.outlineColor = CHOICE_FONT_OUTLINE_COLOR || ColorManager.outlineColor();
    };

    Window_ChoiceList.prototype.loadCustomWindowskin = function () {
        if (CHOICE_WINDOW_SKIN) {
            this.windowskin = ImageManager.loadSystem(CHOICE_WINDOW_SKIN);
        } else {
            this.windowskin = ImageManager.loadSystem('Window');
        }
    };

    Window_ChoiceList.prototype.calculateCustomY = function (messageY, messageHeight) {
        return CHOICE_WINDOW_Y ? eval(CHOICE_WINDOW_Y) : null;
    };

    Window_ChoiceList.prototype.updatePlacement = function () {
        const messageY = this._messageWindow.y;
        const messageHeight = this._messageWindow.height;
        const choices = $gameMessage.choices();
        const maxCols = this.maxCols();

        this.numVisibleRows = function () {
            return Math.ceil(choices.length / maxCols);
        };

        const cleanedChoices = choices.map(choice => {
            const textMeasurer = new Window_Base(new Rectangle(0, 0, 1000, 100));
            textMeasurer._isWindow = false;

            let text = choice;

            // \V[n]
            text = text.replace(/\\V\[(\d+)\]/gi, (_, n) => {
                return $gameVariables.value(parseInt(n));
            });

            // \N[n]
            text = text.replace(/\\N\[(\d+)\]/gi, (_, n) => {
                const actor = $gameActors.actor(parseInt(n));
                return actor ? actor.name() : '';
            });

            // P[]
            text = text.replace(/\\P\[(\d+)\]/gi, (_, n) => {
                const actor = $gameParty.members()[parseInt(n) - 1];
                return actor ? actor.name() : '';
            });

            // G
            text = text.replace(/\\G/gi, TextManager.currencyUnit);

            // Color codes and others
            text = text.replace(/\\C\[(\d+)\]/gi, '');
            text = text.replace(/\\I\[(\d+)\]/gi, '    ');
            text = text.replace(/\\{/g, '');
            text = text.replace(/\\}/g, '');
            text = text.replace(/\\\\/g, '\\');

            textMeasurer.destroy();
            return text;
        });

        const maxWidth = Math.max(...cleanedChoices.map(choice => this.textWidth(choice)));

        this.width = maxCols === 1 ?
            (CHOICE_WIDTH > 0 ? CHOICE_WIDTH : maxWidth + this.padding * 4) :
            (CHOICE_WIDTH > 0 ? CHOICE_WIDTH : (maxWidth + this.padding * 4) * 2);

        this.height = this.fittingHeight(this.numVisibleRows());
        this.x = (Graphics.boxWidth - this.width) / 2;

        if (CHOICE_AUTO_POSITION) {
            const playerScreenY = this.calculatePlayerScreenY();
            const safeDistance = 50;
            const isBubbleMessage = !!$gameMessage.speakerName();
            const isMessageVisible = this._messageWindow.isOpen();

            let positionAbove = playerScreenY - this.height - safeDistance;
            let positionBelow = playerScreenY + safeDistance;

            if (isMessageVisible) {
                const messageTop = messageY;
                const messageBottom = messageY + messageHeight;

                if (isBubbleMessage) {
                    if (positionBelow < messageBottom && positionBelow + this.height > messageTop) {
                        positionBelow = messageBottom + 8;
                    }
                    if (positionAbove < messageBottom && positionAbove + this.height > messageTop) {
                        positionAbove = messageTop - this.height - 8;
                    }

                    if (messageY < Graphics.boxHeight / 2) {
                        positionBelow = Math.max(positionBelow, messageBottom + 8);
                    } else {
                        positionAbove = Math.min(positionAbove, messageTop - this.height - 8);
                    }
                } else {
                    if (positionBelow < messageBottom && positionBelow + this.height > messageTop) {
                        positionBelow = messageBottom + 8;
                    }
                    if (positionAbove < messageBottom && positionAbove + this.height > messageTop) {
                        positionAbove = messageTop - this.height - 8;
                    }

                    const screenMiddle = Graphics.boxHeight / 2;
                    if (playerScreenY > screenMiddle && messageY > screenMiddle) {
                        positionAbove = 80;
                        positionBelow = 80;
                    }
                }
            }

            const wouldOverflowTop = positionAbove < 0;
            const wouldOverflowBottom = positionBelow + this.height > Graphics.boxHeight;

            if (!wouldOverflowBottom && (!isMessageVisible || positionBelow > messageY + messageHeight)) {
                targetY = positionBelow;
            } else if (!wouldOverflowTop && (!isMessageVisible || positionAbove + this.height < messageY)) {
                targetY = positionAbove;
            } else {
                const topOverflow = Math.abs(Math.min(0, positionAbove));
                const bottomOverflow = Math.abs(Math.max(0, (positionBelow + this.height) - Graphics.boxHeight));
                if (isMessageVisible) {
                    const messageOverlapTop = Math.max(0, messageY + messageHeight - positionAbove);
                    const messageOverlapBottom = Math.max(0, positionBelow + this.height - messageY);
                    targetY = (topOverflow + messageOverlapTop) < (bottomOverflow + messageOverlapBottom) ?
                        positionAbove : positionBelow;
                } else {
                    targetY = topOverflow < bottomOverflow ? positionAbove : positionBelow;
                }
            }

            targetY = Math.max(0, Math.min(Graphics.boxHeight - this.height, targetY));

        } else {
            const customY = this.calculateCustomY(messageY, messageHeight);
            targetY = customY !== null ? customY : (messageY >= Graphics.boxHeight / 2 ?
                messageY - this.height - 8 : messageY + messageHeight + 8);
        }

        if (CHOICE_ANIMATION === 'moveToScene') {
            this.y = targetY < Graphics.boxHeight / 2 ? -this.height : Graphics.boxHeight;
            this._animating = true;
            this._animationProgress = 0;
        } else {
            this.y = targetY;
        }
    };

    Window_ChoiceList.prototype.calculatePlayerScreenY = function () {
        const tileHeight = $gameMap.tileHeight();
        const scrolledY = $gameMap._displayY;
        return Math.round(($gamePlayer.y - scrolledY) * tileHeight + tileHeight / 2);
    };

    // Create two columns
    //const _Window_ChoiceList_drawItem = Window_ChoiceList.prototype.drawItem;
    Window_ChoiceList.prototype.drawItem = function (index) {
        //const speakerName = $gameMessage.speakerName();
        //if (!speakerName) {
        //    _Window_ChoiceList_drawItem.call(this, index);
        //   return;
        //}

        const rect = this.itemLineRect(index);
        const text = this.commandName(index);

        this.resetFontSettings();

        const textWidth = this.textWidth(text);
        const availableWidth = rect.width - 16;

        let x = rect.x + 8;
        if (CHOICE_TEXT_ALIGN === 'center') {
            x = rect.x + (rect.width - textWidth) / 2;
        } else if (CHOICE_TEXT_ALIGN === 'right') {
            x = rect.x + rect.width - textWidth - 8;
        }

        if (textWidth > availableWidth) {
            const scale = availableWidth / textWidth;
            const context = this.contents.context;
            context.save();

            context.font = `${this.contents.fontSize}px ${this.contents.fontFace}`;
            context.fillStyle = this.contents.textColor;
            if (CHOICE_FONT_OUTLINE) {
                context.strokeStyle = this.contents.outlineColor;
                context.lineWidth = this.contents.outlineWidth;
            }

            let translateX = rect.x + 8;
            if (CHOICE_TEXT_ALIGN === 'center') {
                translateX = rect.x + rect.width / 2 - (textWidth * scale) / 2;
            } else if (CHOICE_TEXT_ALIGN === 'right') {
                translateX = rect.x + rect.width - (textWidth * scale) - 8;
            }

            context.translate(translateX, rect.y);
            context.scale(scale, 1);
            this.drawTextEx(text, 0, 0, textWidth);
            context.restore();
        } else {
            this.drawTextEx(text, x, rect.y, rect.width);
        }
    };

    Window_ChoiceList.prototype.itemRect = function (index) {
        const rect = new Rectangle();
        const maxCols = this.maxCols();

        if (maxCols === 1) {
            const itemWidth = this.innerWidth;
            const itemHeight = this.itemHeight();
            rect.width = itemWidth - 4;
            rect.height = itemHeight - 4;
            rect.x = 2;
            rect.y = index * (itemHeight + this.spacing()) + 2;
        } else {
            const itemWidth = (this.innerWidth - this.spacing() * (maxCols - 1)) / maxCols;
            const itemHeight = this.itemHeight();
            const colIndex = index % maxCols;
            const rowIndex = Math.floor(index / maxCols);
            rect.width = itemWidth - 4;
            rect.height = itemHeight - 4;
            rect.x = colIndex * (itemWidth + this.spacing()) + 2;
            rect.y = rowIndex * (itemHeight + this.spacing()) + 2;
        }

        return rect;
    };

    Window_ChoiceList.prototype.drawBackgroundRect = function (rect) {
        const x = rect.x;
        const y = rect.y;
        const w = rect.width;
        const h = rect.height;
        const radius = 10;
        const color1 = ColorManager.itemBackColor1();
        const color2 = ColorManager.itemBackColor2();
        const fillColor = color1;
        const strokeColor = color2;

        const context = this.contents.context;
        context.save();

        context.globalAlpha = 1;

        context.beginPath();
        context.moveTo(x + radius, y);
        context.lineTo(x + w - radius, y);
        context.quadraticCurveTo(x + w, y, x + w, y + radius);
        context.lineTo(x + w, y + h - radius);
        context.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
        context.lineTo(x + radius, y + h);
        context.quadraticCurveTo(x, y + h, x, y + h - radius);
        context.lineTo(x, y + radius);
        context.quadraticCurveTo(x, y, x + radius, y);
        context.closePath();

        const gradient = context.createLinearGradient(x, y, x, y + h);
        gradient.addColorStop(0, fillColor);
        gradient.addColorStop(1, strokeColor);
        context.fillStyle = gradient;
        context.fill();

        context.strokeStyle = strokeColor;
        context.lineWidth = 1;
        context.stroke();
        context.restore();
    };

    Window_ChoiceList.prototype.maxCols = function () {
        const choices = $gameMessage.choices();
        if (CHOICE_STYLE === 'vertical' || choices.length <= 1) {
            return 1;
        }
        return 2;
    };

    Window_ChoiceList.prototype.rowSpacing = function () {
        return 4;
    };

    Window_ChoiceList.prototype.itemHeight = function () {
        return CHOICE_HEIGHT;
    };

    Window_ChoiceList.prototype.spacing = function () {
        return CHOICE_SPACE;
    };

    Window_ChoiceList.prototype.fittingHeight = function (numLines) {
        return numLines * this.itemHeight() + (numLines - 1) * this.spacing() + this.padding * 2;
    };

    Window_ChoiceList.prototype.itemLineRect = function (index) {
        const rect = this.itemRect(index);
        rect.x += 4;
        rect.width -= 8;
        rect.y = rect.y + (rect.height - this.lineHeight()) / 2;
        return rect;
    };

    // Wait till animation is finished before allowing player to choose
    Window_ChoiceList.prototype.isOpenAndActive = function () {
        const isAnimating = this._animating && CHOICE_ANIMATION === 'moveToScene';
        return this.isOpen() && this.active && !isAnimating;
    };

    const _Window_ChoiceList_update = Window_ChoiceList.prototype.update;
    Window_ChoiceList.prototype.update = function () {
        _Window_ChoiceList_update.call(this);

        if (this._animating) {
            this._animationProgress = Math.min(1, this._animationProgress + 0.03);

            const easeOut = 1 - Math.pow(1 - this._animationProgress, 1);
            this.y = this.y + (targetY - this.y) * easeOut;

            if (this._animationProgress >= 1) {
                this._animating = false;
                this.y = targetY;
            }
        }
    };

    const _Window_ChoiceList_show = Window_ChoiceList.prototype.show;
    Window_ChoiceList.prototype.show = function () {
        if (CHOICE_ANIMATION === 'moveToScene') {
            this.openness = 255;
            this._animating = true;
            this._animationProgress = 0;
        } else {
            _Window_ChoiceList_show.call(this);
        }
    };

    const _Window_ChoiceList_hide = Window_ChoiceList.prototype.hide;
    Window_ChoiceList.prototype.hide = function () {
        this._animating = false;
        _Window_ChoiceList_hide.call(this);
    };

    // GALV MESSAGE BACKGROUND_____________________________________
    if (Imported.Galv_MessageBackground) {
        const _Window_Message_setBackgroundType = Window_Message.prototype.setBackgroundType;
        Window_Message.prototype.setBackgroundType = function (type) {
            if ($gameMessage.speakerName()) {
                Galv.MBG.disable = true;
                this.opacity = type === 0 ? 255 : 0;
                if (type === 1) this.showBackgroundDimmer();
                return;
            }
            _Window_Message_setBackgroundType.call(this, type);
        };
    }

    const _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        const contents = _DataManager_makeSaveContents.call(this);
        contents.bubbleSettings = contents.bubbleSettings || {};
        contents.bubbleSettings.windowskin = currentBubbleWindowskin;
        return contents;
    };

    const _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        _DataManager_extractSaveContents.call(this, contents);
        if (contents.bubbleSettings && contents.bubbleSettings.windowskin) {
            currentBubbleWindowskin = contents.bubbleSettings.windowskin;
        }
    };
})();