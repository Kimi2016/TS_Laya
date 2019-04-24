var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stage = Laya.Stage;
var GameConfig_1 = require("./GameConfig");
var Test_0_Network_ProtocolBuffer_1 = require("./study/Test_0_Network_ProtocolBuffer");
var NetworkManager_1 = require("./Framework/Network/NetworkManager");
//启动类
var AppMain = /** @class */ (function () {
    function AppMain() {
        //根据IDE设置初始化引擎		
        if (window["Laya3D"]) {
            Laya3D.init(GameConfig_1.default.width, GameConfig_1.default.height);
            // 不支持WebGL时自动切换至Canvas
            //Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
        }
        else {
            Laya.init(GameConfig_1.default.width, GameConfig_1.default.height, Laya["WebGL"]);
        }
        Laya["Physics"] && Laya["Physics"].enable();
        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
        //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
        if (GameConfig_1.default.debug || Laya.Utils.getQueryString("debug") == "true")
            Laya.enableDebugPanel();
        if (GameConfig_1.default.physicsDebug && Laya["PhysicsDebugDraw"])
            Laya["PhysicsDebugDraw"].enable();
        if (GameConfig_1.default.stat)
            Laya.Stat.show();
        //表示是否捕获全局错误并弹出提示。
        Laya.alertGlobalError = true;
        //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = GameConfig_1.default.scaleMode; //Stage.SCALE_FULL;//SCALE_FIXED_HEIGHT
        Laya.stage.screenMode = GameConfig_1.default.screenMode; //Stage.SCREEN_HORIZONTAL;//SCREEN_VERTICAL
        Laya.stage.bgColor = "#7f7f7f";
        //兼容微信不支持加载scene后缀场景
        Laya.URL.exportSceneToJson = GameConfig_1.default.exportSceneToJson;
        //如果通过设备静音键让音频自动跟随设备静音。需要将useAudioMusic设置为false。
        Laya.SoundManager.useAudioMusic = false;
        Laya.SoundManager.autoStopMusic = false;
        //消除矢量绘制的锯齿，但会增加性能消耗
        //Config.isAntialias=true;
    }
    AppMain.prototype.onVersionLoaded = function () {
        //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    };
    AppMain.prototype.onConfigLoaded = function () {
        //初始Protobuf
        NetworkManager_1.default.getInstance();
        //加载IDE指定的场景
        GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene);
        this.setup();
    };
    AppMain.prototype.setup = function () {
        //new Test_1_Text();
        //new Test_2_InputTest();
        //new Test_3_BitmapFont();
        //new Test_4_1_Sprite_DisplayImage();
        //new Test_4_1_Sprite_SwitchTexture();
        //new Test_4_2_Sprite_DisplayImage();
        //new Test_4_2_Sprite_SwitchTexture();
        //new Test_4_MaskDemo();
        //new Test_5_1_ColorFilter();
        //new Test_5_2_GlowFilter();
        //new Test_6_1_Sprite_DrawShapes();
        //new Test_7_AtlasAniDemo();
        //new Test_8_TweenDemo();
        //new Test_9_TimeLine();
        //new Test_9_TimeLineUI();
        //new Test_11_Sound();
        //new Test_0_1_Socket();
        new Test_0_Network_ProtocolBuffer_1.default();
    };
    return AppMain;
}());
//激活启动类
new AppMain();
},{"./Framework/Network/NetworkManager":3,"./GameConfig":4,"./study/Test_0_Network_ProtocolBuffer":10}],2:[function(require,module,exports){
"use strict";
//import * as Collections from 'typescript-collections'; //import Collections = require('typescript-collections');
Object.defineProperty(exports, "__esModule", { value: true });
var ClientID;
(function (ClientID) {
    ClientID[ClientID["login"] = 0] = "login";
    ClientID[ClientID["logic"] = 1] = "logic";
    ClientID[ClientID["scene"] = 2] = "scene";
    ClientID[ClientID["recordChat"] = 3] = "recordChat";
})(ClientID || (ClientID = {}));
var GameClient = /** @class */ (function () {
    function GameClient(id) {
        this.clientId = id;
    }
    GameClient.prototype.connect = function (host, port) {
        this.socketChannel = new SocketChannel("clientId:" + this.clientId);
        this.socketChannel.connect(host, port);
    };
    GameClient.prototype.connectByUrl = function (url) {
        this.socketChannel = new SocketChannel("clientId:" + this.clientId);
        this.socketChannel.connectByUrl(url);
    };
    GameClient.prototype.reConnect = function () {
        this.socketChannel.reConnect();
    };
    GameClient.prototype.disConnect = function () {
        this.socketChannel.disConnect();
    };
    GameClient.prototype.isConnected = function () {
        return this.socketChannel.connected();
    };
    GameClient.prototype.sendString = function (msgId, context) {
        this.socketChannel.sendString(context);
    };
    GameClient.prototype.sendEmpty = function (msgId) {
    };
    GameClient.prototype.sendByte = function (msgId, content) {
        this.socketChannel.sendByte(msgId, content);
    };
    return GameClient;
}());
var ClientManager = /** @class */ (function () {
    function ClientManager() {
        this.gameClientDic = {};
    }
    ClientManager.getSingleton = function () {
        if (this.clientManager == null) {
            this.clientManager = new ClientManager();
        }
        return this.clientManager;
    };
    ClientManager.prototype.GetClient = function (id) {
        if (this.gameClientDic[id] != null) {
            return this.gameClientDic[id];
        }
        return null;
    };
    ClientManager.prototype.login = function () {
        return this.GetClient(ClientID.login);
    };
    ClientManager.prototype.logic = function () {
        return this.GetClient(ClientID.logic);
    };
    ClientManager.prototype.scene = function () {
        return this.GetClient(ClientID.scene);
    };
    ClientManager.prototype.clearAllGameClient = function () {
        this.gameClientDic = {};
    };
    ClientManager.prototype.sendMessageEmpty = function (msgId) {
        var client = null;
        if (msgId > GameMessage.GM_ACCOUNT_SERVER_MESSAGE_START && msgId < GameMessage.GM_ACCOUNT_SERVER_MESSAGE_END) {
            client = this.login();
        }
        else {
            client = this.logic();
        }
        if (client != null) {
            client.sendEmpty(msgId);
        }
    };
    ClientManager.clientManager = null;
    return ClientManager;
}());
exports.default = ClientManager;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientManager_1 = require("./ClientManager");
var Browser = Laya.Browser;
var NetworkManager = /** @class */ (function () {
    function NetworkManager() {
        this.protoBuf = Browser.window.protobuf;
        this.protofilePath = "./protobuf/protofile/protofile.proto";
        this.loadProtofile();
    }
    NetworkManager.getInstance = function () {
        if (!this.instance) {
            this.instance = new NetworkManager();
        }
        return this.instance;
    };
    NetworkManager.prototype.loadProtofile = function () {
        this.protoBuf.load(this.protofilePath, this.onAssetsLoaded);
    };
    NetworkManager.prototype.onAssetsLoaded = function (err, root) {
        if (err) {
            throw err;
        }
        NetworkManager.protoRoot = root;
    };
    NetworkManager.prototype.lookup = function (massageName, massageContent) {
        var MessageBody = NetworkManager.protoRoot.lookup(massageName);
        // Create a new message
        var message = MessageBody.create(massageContent);
        // Verify the message if necessary (i.e. when possibly incomplete or invalid)
        var errMsg = MessageBody.verify(message);
        if (errMsg) {
            throw Error(errMsg);
        }
        // Encode a message to an Uint8Array (browser) or Buffer (node)
        var buffer = MessageBody.encode(message).finish();
        // ... do something with buffer
        return buffer;
    };
    /**
     * 发送消息
     * @param massageID 消息ID
     * @param massageName 消息名称--PBMassage.GM_VerifyVersion
     * @param massageContent 消息结体--PBMassage.GM_VerifyVersion = { version: "1", platform:1, istest:3 }
     */
    NetworkManager.prototype.sendMessage = function (massageID, massageName, massageContent) {
        var buffer = this.lookup(massageName, massageContent);
        ClientManager_1.default.getSingleton().logic().sendByte(massageID, buffer);
    };
    NetworkManager.protoRoot = null;
    return NetworkManager;
}());
exports.default = NetworkManager;
},{"./ClientManager":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
var MainUI_1 = require("./script/MainUI");
var GameUI_1 = require("./script/GameUI");
var GameControl_1 = require("./script/GameControl");
var Test_9_TimeLineUI_1 = require("./study/Test_9_TimeLineUI");
var Bullet_1 = require("./script/Bullet");
var DropBox_1 = require("./script/DropBox");
/*
* 游戏初始化配置;
*/
var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    GameConfig.init = function () {
        var reg = Laya.ClassUtils.regClass;
        reg("script/MainUI.ts", MainUI_1.default);
        reg("script/GameUI.ts", GameUI_1.default);
        reg("script/GameControl.ts", GameControl_1.default);
        reg("study/Test_9_TimeLineUI.ts", Test_9_TimeLineUI_1.default);
        reg("script/Bullet.ts", Bullet_1.default);
        reg("script/DropBox.ts", DropBox_1.default);
    };
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedheight";
    GameConfig.screenMode = "horizontal";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "MainScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./script/Bullet":5,"./script/DropBox":6,"./script/GameControl":7,"./script/GameUI":8,"./script/MainUI":9,"./study/Test_9_TimeLineUI":11}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 子弹脚本，实现子弹飞行逻辑及对象池回收机制
 */
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        return _super.call(this) || this;
    }
    Bullet.prototype.onEnable = function () {
        //设置初始速度
        var rig = this.owner.getComponent(Laya.RigidBody);
        rig.setVelocity({ x: 0, y: -10 });
    };
    Bullet.prototype.onTriggerEnter = function (other, self, contact) {
        //如果被碰到，则移除子弹
        this.owner.removeSelf();
    };
    Bullet.prototype.onUpdate = function () {
        //如果子弹超出屏幕，则移除子弹
        if (this.owner.y < -10) {
            this.owner.removeSelf();
        }
    };
    Bullet.prototype.onDisable = function () {
        //子弹被移除时，回收子弹到对象池，方便下次复用，减少对象创建开销
        Laya.Pool.recover("bullet", this.owner);
    };
    return Bullet;
}(Laya.Script));
exports.default = Bullet;
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameUI_1 = require("./GameUI");
/**
 * 掉落盒子脚本，实现盒子碰撞及回收流程
 */
var DropBox = /** @class */ (function (_super) {
    __extends(DropBox, _super);
    function DropBox() {
        var _this = _super.call(this) || this;
        /**盒子等级 */
        _this.level = 1;
        return _this;
    }
    DropBox.prototype.onEnable = function () {
        /**获得组件引用，避免每次获取组件带来不必要的查询开销 */
        this._rig = this.owner.getComponent(Laya.RigidBody);
        this.level = Math.round(Math.random() * 5) + 1;
        this._text = this.owner.getChildByName("levelTxt");
        this._text.text = this.level + "";
    };
    DropBox.prototype.onUpdate = function () {
        //让持续盒子旋转
        this.owner.rotation++;
    };
    DropBox.prototype.onTriggerEnter = function (other, self, contact) {
        var owner = this.owner;
        if (other.label === "buttle") {
            //碰撞到子弹后，增加积分，播放声音特效
            if (this.level > 1) {
                this.level--;
                this._text.changeText(this.level + "");
                owner.getComponent(Laya.RigidBody).setVelocity({ x: 0, y: -10 });
                Laya.SoundManager.playSound("sound/hit.wav");
            }
            else {
                if (owner.parent) {
                    var effect = Laya.Pool.getItemByCreateFun("effect", this.createEffect, this);
                    effect.pos(owner.x, owner.y);
                    owner.parent.addChild(effect);
                    effect.play(0, true);
                    owner.removeSelf();
                    Laya.SoundManager.playSound("sound/destroy.wav");
                }
            }
            GameUI_1.default.instance.addScore(1);
        }
        else if (other.label === "ground") {
            //只要有一个盒子碰到地板，则停止游戏
            owner.removeSelf();
            GameUI_1.default.instance.stopGame();
        }
    };
    /**使用对象池创建爆炸动画 */
    DropBox.prototype.createEffect = function () {
        var ani = new Laya.Animation();
        ani.loadAnimation("test/TestAni.ani");
        ani.on(Laya.Event.COMPLETE, null, recover);
        function recover() {
            ani.removeSelf();
            Laya.Pool.recover("effect", ani);
        }
        return ani;
    };
    DropBox.prototype.onDisable = function () {
        //盒子被移除时，回收盒子到对象池，方便下次复用，减少对象创建开销。
        Laya.Pool.recover("dropBox", this.owner);
    };
    return DropBox;
}(Laya.Script));
exports.default = DropBox;
},{"./GameUI":8}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 游戏控制脚本。定义了几个dropBox，bullet，createBoxInterval等变量，能够在IDE显示及设置该变量
 * 更多类型定义，请参考官方文档
 */
var GameControl = /** @class */ (function (_super) {
    __extends(GameControl, _super);
    function GameControl() {
        var _this = _super.call(this) || this;
        /** @prop {name:createBoxInterval,tips:"间隔多少毫秒创建一个下跌的容器",type:int,default:1000}*/
        _this.createBoxInterval = 1000;
        /**开始时间*/
        _this._time = 0;
        /**是否已经开始游戏 */
        _this._started = false;
        return _this;
    }
    GameControl.prototype.onEnable = function () {
        this._time = Date.now();
        this._gameBox = this.owner.getChildByName("gameBox");
        this.createBox();
    };
    GameControl.prototype.onUpdate = function () {
        //每间隔一段时间创建一个盒子
        var now = Date.now();
        if (now - this._time > this.createBoxInterval) {
            this._time = now;
            this.createBox();
        }
    };
    GameControl.prototype.createBox = function () {
        //使用对象池创建盒子
        var box = Laya.Pool.getItemByCreateFun("dropBox", this.dropBox.create, this.dropBox);
        box.pos(Math.random() * (Laya.stage.width - 100), -100);
        this._gameBox.addChild(box);
    };
    GameControl.prototype.onStageClick = function (e) {
        //停止事件冒泡，提高性能，当然也可以不要
        e.stopPropagation();
        //舞台被点击后，使用对象池创建子弹
        var flyer = Laya.Pool.getItemByCreateFun("bullet", this.bullet.create, this.bullet);
        flyer.pos(Laya.stage.mouseX, Laya.stage.mouseY);
        this._gameBox.addChild(flyer);
    };
    /**开始游戏，通过激活本脚本方式开始游戏*/
    GameControl.prototype.startGame = function () {
        if (!this._started) {
            this._started = true;
            this.enabled = true;
        }
    };
    /**结束游戏，通过非激活本脚本停止游戏 */
    GameControl.prototype.stopGame = function () {
        this._started = false;
        this.enabled = false;
        this.createBoxInterval = 1000;
        this._gameBox.removeChildren();
    };
    return GameControl;
}(Laya.Script));
exports.default = GameControl;
},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./../ui/layaMaxUI");
var GameControl_1 = require("./GameControl");
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
var GameUI = /** @class */ (function (_super) {
    __extends(GameUI, _super);
    function GameUI() {
        var _this = _super.call(this) || this;
        GameUI.instance = _this;
        //关闭多点触控，否则就无敌了
        Laya.MouseManager.multiTouchEnabled = false;
        return _this;
    }
    GameUI.prototype.onEnable = function () {
        this._control = this.getComponent(GameControl_1.default);
        //点击提示文字，开始游戏
        this.tipLbll.on(Laya.Event.CLICK, this, this.onTipClick);
    };
    GameUI.prototype.onTipClick = function (e) {
        this.tipLbll.visible = false;
        this._score = 0;
        this.scoreLbl.text = "";
        this._control.startGame();
    };
    /**增加分数 */
    GameUI.prototype.addScore = function (value) {
        if (value === void 0) { value = 1; }
        this._score += value;
        this.scoreLbl.changeText("分数：" + this._score);
        //随着分数越高，难度增大
        if (this._control.createBoxInterval > 600 && this._score % 20 == 0)
            this._control.createBoxInterval -= 20;
    };
    /**停止游戏 */
    GameUI.prototype.stopGame = function () {
        this.tipLbll.visible = true;
        this.tipLbll.text = "游戏结束了，点击屏幕重新开始";
        this._control.stopGame();
    };
    return GameUI;
}(layaMaxUI_1.ui.test.TestSceneUI));
exports.default = GameUI;
},{"./../ui/layaMaxUI":12,"./GameControl":7}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("../ui/layaMaxUI");
//主界面
var MainUI = /** @class */ (function (_super) {
    __extends(MainUI, _super);
    function MainUI() {
        return _super.call(this) || this;
    }
    MainUI.prototype.onEnable = function () {
        console.log("MainUI.onEnable");
    };
    MainUI.prototype.onDisable = function () {
        console.log("MainUI.onDisable");
    };
    return MainUI;
}(layaMaxUI_1.ui.MainSceneUI));
exports.default = MainUI;
},{"../ui/layaMaxUI":12}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Test_0_Network_ProtocolBuffer = /** @class */ (function () {
    function Test_0_Network_ProtocolBuffer() {
        this.ProtoBuf = Laya.Browser.window.protobuf;
        this.ProtoBuf.load("./protobuf/protofile/protofile.proto", this.onAssetsLoaded);
    }
    Test_0_Network_ProtocolBuffer.prototype.onAssetsLoaded = function (err, root) {
        if (err)
            throw err;
        // Obtain a message type
        var AwesomeMessage = root.lookup("PBMassage.AwesomeMessage");
        // Create a new message
        var message = AwesomeMessage.create({
            awesomeField: "AwesomeString"
        });
        // Verify the message if necessary (i.e. when possibly incomplete or invalid)
        var errMsg = AwesomeMessage.verify(message);
        if (errMsg)
            throw Error(errMsg);
        // Encode a message to an Uint8Array (browser) or Buffer (node)
        var buffer = AwesomeMessage.encode(message).finish();
        // ... do something with buffer
        // Or, encode a plain object
        var buffer = AwesomeMessage.encode({
            awesomeField: "AwesomeString"
        }).finish();
        // ... do something with buffer
        // Decode an Uint8Array (browser) or Buffer (node) to a message
        var message = AwesomeMessage.decode(buffer);
        // ... do something with message
        // If your application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.
    };
    return Test_0_Network_ProtocolBuffer;
}());
exports.default = Test_0_Network_ProtocolBuffer;
},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Test_9_TimeLineUI = /** @class */ (function () {
    function Test_9_TimeLineUI() {
        //加载图集成功后，执行onLoad回调方法
        Laya.loader.load("res/atlas/test.atlas", Laya.Handler.create(this, this.onLoaded));
    }
    Test_9_TimeLineUI.prototype.onLoaded = function () {
        console.log("加载图集成功后，执行onLoad回调方法");
        //创建一个UI实例
        //var plan:TimeLineUI = new TimeLineUI()
        //添加到舞台
        //Laya.stage.addChild(plan);
        //播放UI场景中的动画
        //this.bear.play();
    };
    return Test_9_TimeLineUI;
}());
exports.default = Test_9_TimeLineUI;
},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dialog = Laya.Dialog;
var Scene = Laya.Scene;
var REG = Laya.ClassUtils.regClass;
var ui;
(function (ui) {
    var MainSceneUI = /** @class */ (function (_super) {
        __extends(MainSceneUI, _super);
        function MainSceneUI() {
            return _super.call(this) || this;
        }
        MainSceneUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("MainScene");
        };
        return MainSceneUI;
    }(Scene));
    ui.MainSceneUI = MainSceneUI;
    REG("ui.MainSceneUI", MainSceneUI);
    var TimeLineUI = /** @class */ (function (_super) {
        __extends(TimeLineUI, _super);
        function TimeLineUI() {
            return _super.call(this) || this;
        }
        TimeLineUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("TimeLine");
        };
        return TimeLineUI;
    }(Dialog));
    ui.TimeLineUI = TimeLineUI;
    REG("ui.TimeLineUI", TimeLineUI);
})(ui = exports.ui || (exports.ui = {}));
(function (ui) {
    var test;
    (function (test) {
        var TestSceneUI = /** @class */ (function (_super) {
            __extends(TestSceneUI, _super);
            function TestSceneUI() {
                return _super.call(this) || this;
            }
            TestSceneUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadScene("test/TestScene");
            };
            return TestSceneUI;
        }(Scene));
        test.TestSceneUI = TestSceneUI;
        REG("ui.test.TestSceneUI", TestSceneUI);
    })(test = ui.test || (ui.test = {}));
})(ui = exports.ui || (exports.ui = {}));
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkc6L0xheWEvTGF5YUFpcklERV9iZXRhL3Jlc291cmNlcy9hcHAvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9BcHBNYWluLnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL0NsaWVudE1hbmFnZXIudHMiLCJzcmMvRnJhbWV3b3JrL05ldHdvcmsvTmV0d29ya01hbmFnZXIudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9zY3JpcHQvQnVsbGV0LnRzIiwic3JjL3NjcmlwdC9Ecm9wQm94LnRzIiwic3JjL3NjcmlwdC9HYW1lQ29udHJvbC50cyIsInNyYy9zY3JpcHQvR2FtZVVJLnRzIiwic3JjL3NjcmlwdC9NYWluVUkudHMiLCJzcmMvc3R1ZHkvVGVzdF8wX05ldHdvcmtfUHJvdG9jb2xCdWZmZXIudHMiLCJzcmMvc3R1ZHkvVGVzdF85X1RpbWVMaW5lVUkudHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1JBLElBQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7QUFrQnpCLDJDQUFzQztBQUd0Qyx1RkFBa0Y7QUFDbEYscUVBQWdFO0FBRWhFLEtBQUs7QUFDTDtJQUNJO1FBQ0ksZ0JBQWdCO1FBQ2hCLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQVUsQ0FBQyxLQUFLLEVBQUUsb0JBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVqRCx1QkFBdUI7WUFDdkIsOERBQThEO1NBQ2pFO2FBQ0k7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFVLENBQUMsS0FBSyxFQUFFLG9CQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ2pFO1FBQ0QsSUFBSSxDQUFD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Q0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQ0wsa0JBQUM7SUFBRCxDQU5BLEFBTUMsQ0FOZ0MsS0FBSyxHQU1yQztJQU5ZLGNBQVcsY0FNdkIsQ0FBQTtJQUNELEdBQUcsQ0FBQyxnQkFBZ0IsRUFBQyxXQUFXLENBQUMsQ0FBQztJQUNsQztRQUFnQyw4QkFBTTtRQUVsQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsbUNBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FQQSxBQU9DLENBUCtCLE1BQU0sR0FPckM7SUFQWSxhQUFVLGFBT3RCLENBQUE7SUFDRCxHQUFHLENBQUMsZUFBZSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BDLENBQUMsRUFsQmEsRUFBRSxHQUFGLFVBQUUsS0FBRixVQUFFLFFBa0JmO0FBQ0QsV0FBYyxFQUFFO0lBQUMsSUFBQSxJQUFJLENBV3BCO0lBWGdCLFdBQUEsSUFBSTtRQUNqQjtZQUFpQywrQkFBSztZQUdsQzt1QkFBZSxpQkFBTztZQUFBLENBQUM7WUFDdkIsb0NBQWMsR0FBZDtnQkFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7WUFDTCxrQkFBQztRQUFELENBUkEsQUFRQyxDQVJnQyxLQUFLLEdBUXJDO1FBUlksZ0JBQVcsY0FRdkIsQ0FBQTtRQUNELEdBQUcsQ0FBQyxxQkFBcUIsRUFBQyxXQUFXLENBQUMsQ0FBQztJQUMzQyxDQUFDLEVBWGdCLElBQUksR0FBSixPQUFJLEtBQUosT0FBSSxRQVdwQjtBQUFELENBQUMsRUFYYSxFQUFFLEdBQUYsVUFBRSxLQUFGLFVBQUUsUUFXZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgQnJvd3NlciA9IExheWEuQnJvd3NlclxyXG5pbXBvcnQgV2ViR0wgPSBMYXlhLldlYkdMXHJcbmltcG9ydCBTdGFnZSA9IExheWEuU3RhZ2VcclxuXHJcbmltcG9ydCBUZXN0XzFfVGV4dCBmcm9tICcuL3N0dWR5L1Rlc3RfMV9UZXh0JztcclxuaW1wb3J0IFRlc3RfMl9JbnB1dFRlc3QgZnJvbSAnLi9zdHVkeS9UZXN0XzJfSW5wdXRUZXN0JztcclxuaW1wb3J0IFRlc3RfM19CaXRtYXBGb250IGZyb20gJy4vc3R1ZHkvVGVzdF8zX0JpdG1hcEZvbnQnO1xyXG5pbXBvcnQgVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8xX1Nwcml0ZV9EaXNwbGF5SW1hZ2UnO1xyXG5pbXBvcnQgVGVzdF80XzFfU3ByaXRlX1N3aXRjaFRleHR1cmUgZnJvbSAnLi9zdHVkeS9UZXN0XzRfMV9TcHJpdGVfU3dpdGNoVGV4dHVyZSc7XHJcbmltcG9ydCBUZXN0XzRfMl9TcHJpdGVfRGlzcGxheUltYWdlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzJfU3ByaXRlX0Rpc3BsYXlJbWFnZSc7XHJcbmltcG9ydCBUZXN0XzRfMl9TcHJpdGVfU3dpdGNoVGV4dHVyZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlJztcclxuaW1wb3J0IFRlc3RfNF9NYXNrRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfNF9NYXNrRGVtbyc7XHJcbmltcG9ydCBUZXN0XzVfMV9Db2xvckZpbHRlciBmcm9tICcuL3N0dWR5L1Rlc3RfNV8xX0NvbG9yRmlsdGVyJztcclxuaW1wb3J0IFRlc3RfNV8yX0dsb3dGaWx0ZXIgZnJvbSAnLi9zdHVkeS9UZXN0XzVfMl9HbG93RmlsdGVyJztcclxuaW1wb3J0IFRlc3RfNl8xX1Nwcml0ZV9EcmF3U2hhcGVzIGZyb20gJy4vc3R1ZHkvVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMnO1xyXG5pbXBvcnQgVGVzdF83X0F0bGFzQW5pRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfN19BdGxhc0FuaURlbW8nO1xyXG5pbXBvcnQgVGVzdF84X1R3ZWVuRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfOF9Ud2VlbkRlbW8nO1xyXG5pbXBvcnQgVGVzdF85X1RpbWVMaW5lIGZyb20gJy4vc3R1ZHkvVGVzdF85X1RpbWVMaW5lJztcclxuaW1wb3J0IFRlc3RfOV9UaW1lTGluZVVJIGZyb20gJy4vc3R1ZHkvVGVzdF85X1RpbWVMaW5lVUknO1xyXG5pbXBvcnQgVGVzdF8xMV9Tb3VuZCBmcm9tICcuL3N0dWR5L1Rlc3RfMTFfU291bmQnO1xyXG5pbXBvcnQgR2FtZUNvbmZpZyBmcm9tICcuL0dhbWVDb25maWcnO1xyXG5pbXBvcnQgVGVzdF8wXzFfQ2hhbm5lbCBmcm9tICcuL3N0dWR5L1Rlc3RfMF8xX0NoYW5uZWwnO1xyXG5pbXBvcnQgVGVzdF8wXzFfU29ja2V0IGZyb20gJy4vc3R1ZHkvVGVzdF8wXzFfU29ja2V0JztcclxuaW1wb3J0IFRlc3RfMF9OZXR3b3JrX1Byb3RvY29sQnVmZmVyIGZyb20gJy4vc3R1ZHkvVGVzdF8wX05ldHdvcmtfUHJvdG9jb2xCdWZmZXInO1xyXG5pbXBvcnQgTmV0d29ya01hbmFnZXIgZnJvbSAnLi9GcmFtZXdvcmsvTmV0d29yay9OZXR3b3JrTWFuYWdlcic7XHJcblxyXG4vL+WQr+WKqOexu1xyXG5jbGFzcyBBcHBNYWluIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8v5qC55o2uSURF6K6+572u5Yid5aeL5YyW5byV5pOOXHRcdFxyXG4gICAgICAgIGlmICh3aW5kb3dbXCJMYXlhM0RcIl0pIHtcclxuICAgICAgICAgICAgTGF5YTNELmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgLy8g5LiN5pSv5oyBV2ViR0zml7boh6rliqjliIfmjaLoh7NDYW52YXNcclxuICAgICAgICAgICAgLy9MYXlhLmluaXQoQnJvd3Nlci5jbGllbnRXaWR0aCwgQnJvd3Nlci5jbGllbnRIZWlnaHQsIFdlYkdMKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIExheWEuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCwgTGF5YVtcIldlYkdMXCJdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTGF5YVtcIlBoeXNpY3NcIl0gJiYgTGF5YVtcIlBoeXNpY3NcIl0uZW5hYmxlKCk7XHJcbiAgICAgICAgTGF5YVtcIkRlYnVnUGFuZWxcIl0gJiYgTGF5YVtcIkRlYnVnUGFuZWxcIl0uZW5hYmxlKCk7XHJcblxyXG5cclxuICAgICAgICAvL+aJk+W8gOiwg+ivlemdouadv++8iOmAmui/h0lEReiuvue9ruiwg+ivleaooeW8j++8jOaIluiAhXVybOWcsOWdgOWinuWKoGRlYnVnPXRydWXlj4LmlbDvvIzlnYflj6/miZPlvIDosIPor5XpnaLmnb/vvIlcclxuXHRcdGlmIChHYW1lQ29uZmlnLmRlYnVnIHx8IExheWEuVXRpbHMuZ2V0UXVlcnlTdHJpbmcoXCJkZWJ1Z1wiKSA9PSBcInRydWVcIikgTGF5YS5lbmFibGVEZWJ1Z1BhbmVsKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgJiYgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0pIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdLmVuYWJsZSgpO1xyXG4gICAgICAgIGlmIChHYW1lQ29uZmlnLnN0YXQpIExheWEuU3RhdC5zaG93KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/ooajnpLrmmK/lkKbmjZXojrflhajlsYDplJnor6/lubblvLnlh7rmj5DnpLrjgIJcclxuXHRcdExheWEuYWxlcnRHbG9iYWxFcnJvciA9IHRydWU7IFxyXG5cclxuXHRcdC8v5r+A5rS76LWE5rqQ54mI5pys5o6n5Yi277yMdmVyc2lvbi5qc29u55SxSURF5Y+R5biD5Yqf6IO96Ieq5Yqo55Sf5oiQ77yM5aaC5p6c5rKh5pyJ5Lmf5LiN5b2x5ZON5ZCO57ut5rWB56iLXHJcblx0XHRMYXlhLlJlc291cmNlVmVyc2lvbi5lbmFibGUoXCJ2ZXJzaW9uLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uVmVyc2lvbkxvYWRlZCksIExheWEuUmVzb3VyY2VWZXJzaW9uLkZJTEVOQU1FX1ZFUlNJT04pO1xyXG5cclxuXHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnblYgPSBTdGFnZS5BTElHTl9NSURETEU7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnbkggPSBTdGFnZS5BTElHTl9DRU5URVI7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBHYW1lQ29uZmlnLnNjYWxlTW9kZTsvL1N0YWdlLlNDQUxFX0ZVTEw7Ly9TQ0FMRV9GSVhFRF9IRUlHSFRcclxuICAgICAgICBMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBHYW1lQ29uZmlnLnNjcmVlbk1vZGU7Ly9TdGFnZS5TQ1JFRU5fSE9SSVpPTlRBTDsvL1NDUkVFTl9WRVJUSUNBTFxyXG4gICAgICAgIExheWEuc3RhZ2UuYmdDb2xvciA9IFwiIzdmN2Y3ZlwiO1xyXG5cclxuICAgICAgICAvL+WFvOWuueW+ruS/oeS4jeaUr+aMgeWKoOi9vXNjZW5l5ZCO57yA5Zy65pmvXHJcbiAgICAgICAgTGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuICAgICAgICAvL+WmguaenOmAmui/h+iuvuWkh+mdmemfs+mUruiuqemfs+mikeiHquWKqOi3n+maj+iuvuWkh+mdmemfs+OAgumcgOimgeWwhnVzZUF1ZGlvTXVzaWPorr7nva7kuLpmYWxzZeOAglxyXG4gICAgICAgIExheWEuU291bmRNYW5hZ2VyLnVzZUF1ZGlvTXVzaWMgPSBmYWxzZTtcclxuICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5hdXRvU3RvcE11c2ljID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8v5raI6Zmk55+i6YeP57uY5Yi255qE6ZSv6b2/77yM5L2G5Lya5aKe5Yqg5oCn6IO95raI6ICXXHJcbiAgICAgICAgLy9Db25maWcuaXNBbnRpYWxpYXM9dHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvblZlcnNpb25Mb2FkZWQoKTogdm9pZCB7XHJcblx0XHQvL+a/gOa0u+Wkp+Wwj+WbvuaYoOWwhO+8jOWKoOi9veWwj+WbvueahOaXtuWAme+8jOWmguaenOWPkeeOsOWwj+WbvuWcqOWkp+WbvuWQiOmbhumHjOmdou+8jOWImeS8mOWFiOWKoOi9veWkp+WbvuWQiOmbhu+8jOiAjOS4jeaYr+Wwj+WbvlxyXG5cdFx0TGF5YS5BdGxhc0luZm9NYW5hZ2VyLmVuYWJsZShcImZpbGVjb25maWcuanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25Db25maWdMb2FkZWQpKTtcclxuXHR9XHJcblxyXG5cdG9uQ29uZmlnTG9hZGVkKCk6IHZvaWQge1xyXG4gICAgICAgIC8v5Yid5aeLUHJvdG9idWZcclxuICAgICAgICBOZXR3b3JrTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG5cclxuXHRcdC8v5Yqg6L29SURF5oyH5a6a55qE5Zy65pmvXHJcbiAgICAgICAgR2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2V0dXAoKTtcclxuXHR9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXR1cCgpOiB2b2lkIHtcclxuICAgICAgICAvL25ldyBUZXN0XzFfVGV4dCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMl9JbnB1dFRlc3QoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzNfQml0bWFwRm9udCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8xX1Nwcml0ZV9EaXNwbGF5SW1hZ2UoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzRfMV9TcHJpdGVfU3dpdGNoVGV4dHVyZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8yX1Nwcml0ZV9EaXNwbGF5SW1hZ2UoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzRfMl9TcHJpdGVfU3dpdGNoVGV4dHVyZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF9NYXNrRGVtbygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNV8xX0NvbG9yRmlsdGVyKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF81XzJfR2xvd0ZpbHRlcigpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNl8xX1Nwcml0ZV9EcmF3U2hhcGVzKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF83X0F0bGFzQW5pRGVtbygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfOF9Ud2VlbkRlbW8oKTtcclxuICAgICAgICAvL25ldyBUZXN0XzlfVGltZUxpbmUoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzlfVGltZUxpbmVVSSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMTFfU291bmQoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzBfMV9Tb2NrZXQoKTtcclxuICAgICAgICBuZXcgVGVzdF8wX05ldHdvcmtfUHJvdG9jb2xCdWZmZXIoKTtcclxuICAgIH1cclxufVxyXG5cclxuLy/mv4DmtLvlkK/liqjnsbtcclxubmV3IEFwcE1haW4oKTsiLCJcclxuLy9pbXBvcnQgKiBhcyBDb2xsZWN0aW9ucyBmcm9tICd0eXBlc2NyaXB0LWNvbGxlY3Rpb25zJzsgLy9pbXBvcnQgQ29sbGVjdGlvbnMgPSByZXF1aXJlKCd0eXBlc2NyaXB0LWNvbGxlY3Rpb25zJyk7XHJcblxyXG5cclxuZW51bSBDbGllbnRJRCB7XHJcbiAgICBsb2dpbiA9IDAsXHJcbiAgICBsb2dpYyxcclxuICAgIHNjZW5lLFxyXG4gICAgcmVjb3JkQ2hhdCxcclxufVxyXG5cclxuXHJcbmNsYXNzIEdhbWVDbGllbnQge1xyXG4gICAgcHJpdmF0ZSBjbGllbnRJZDogQ2xpZW50SUQ7XHJcbiAgICBwcml2YXRlIHNvY2tldENoYW5uZWw6IFNvY2tldENoYW5uZWw7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IENsaWVudElEKSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnRJZCA9IGlkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25uZWN0KGhvc3Q6IHN0cmluZywgcG9ydDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDaGFubmVsID0gbmV3IFNvY2tldENoYW5uZWwoXCJjbGllbnRJZDpcIiArIHRoaXMuY2xpZW50SWQpO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q2hhbm5lbC5jb25uZWN0KGhvc3QsIHBvcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25uZWN0QnlVcmwodXJsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENoYW5uZWwgPSBuZXcgU29ja2V0Q2hhbm5lbChcImNsaWVudElkOlwiICsgdGhpcy5jbGllbnRJZCk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDaGFubmVsLmNvbm5lY3RCeVVybCh1cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZUNvbm5lY3QoKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDaGFubmVsLnJlQ29ubmVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNDb25uZWN0KCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q2hhbm5lbC5kaXNDb25uZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzQ29ubmVjdGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvY2tldENoYW5uZWwuY29ubmVjdGVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmRTdHJpbmcobXNnSWQ6IEdhbWVNZXNzYWdlLCBjb250ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnNvY2tldENoYW5uZWwuc2VuZFN0cmluZyhjb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZEVtcHR5KG1zZ0lkOiBHYW1lTWVzc2FnZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZEJ5dGUobXNnSWQ6IEdhbWVNZXNzYWdlLCBjb250ZW50OiBMYXlhLkJ5dGUpIHtcclxuICAgICAgICB0aGlzLnNvY2tldENoYW5uZWwuc2VuZEJ5dGUobXNnSWQsIGNvbnRlbnQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xpZW50TWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGdhbWVDbGllbnREaWM6IHsgW2luZGV4OiBudW1iZXJdOiBHYW1lQ2xpZW50OyB9ID0ge307XHJcbiAgICBwcml2YXRlIHN0YXRpYyBjbGllbnRNYW5hZ2VyOiBDbGllbnRNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFNpbmdsZXRvbigpOiBDbGllbnRNYW5hZ2VyIHtcclxuICAgICAgICBpZiAodGhpcy5jbGllbnRNYW5hZ2VyID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRNYW5hZ2VyID0gbmV3IENsaWVudE1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50TWFuYWdlcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgR2V0Q2xpZW50KGlkOiBDbGllbnRJRCk6IEdhbWVDbGllbnQge1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWVDbGllbnREaWNbaWRdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZUNsaWVudERpY1tpZF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgbG9naW4oKTogR2FtZUNsaWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuR2V0Q2xpZW50KENsaWVudElELmxvZ2luKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dpYygpOiBHYW1lQ2xpZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5HZXRDbGllbnQoQ2xpZW50SUQubG9naWMpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNjZW5lKCk6IEdhbWVDbGllbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkdldENsaWVudChDbGllbnRJRC5zY2VuZSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJBbGxHYW1lQ2xpZW50KCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZUNsaWVudERpYyA9IHt9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmRNZXNzYWdlRW1wdHkobXNnSWQ6IEdhbWVNZXNzYWdlKSB7XHJcbiAgICAgICAgdmFyIGNsaWVudDogR2FtZUNsaWVudCA9IG51bGw7XHJcbiAgICAgICAgaWYgKG1zZ0lkID4gR2FtZU1lc3NhZ2UuR01fQUNDT1VOVF9TRVJWRVJfTUVTU0FHRV9TVEFSVCAmJiBtc2dJZCA8IEdhbWVNZXNzYWdlLkdNX0FDQ09VTlRfU0VSVkVSX01FU1NBR0VfRU5EKSB7XHJcbiAgICAgICAgICAgIGNsaWVudCA9IHRoaXMubG9naW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNsaWVudCA9IHRoaXMubG9naWMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjbGllbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjbGllbnQuc2VuZEVtcHR5KG1zZ0lkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQ2xpZW50TWFuYWdlciBmcm9tIFwiLi9DbGllbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCBCcm93c2VyID0gTGF5YS5Ccm93c2VyXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXR3b3JrTWFuYWdlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IE5ldHdvcmtNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBwcm90b0J1ZjogYW55ID0gQnJvd3Nlci53aW5kb3cucHJvdG9idWY7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBwcm90b1Jvb3Q6IGFueSA9IG51bGw7XHJcbiAgICBwcml2YXRlIHByb3RvZmlsZVBhdGg6IHN0cmluZyA9IFwiLi9wcm90b2J1Zi9wcm90b2ZpbGUvcHJvdG9maWxlLnByb3RvXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBOZXR3b3JrTWFuYWdlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkUHJvdG9maWxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkUHJvdG9maWxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJvdG9CdWYubG9hZCh0aGlzLnByb3RvZmlsZVBhdGgsIHRoaXMub25Bc3NldHNMb2FkZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Bc3NldHNMb2FkZWQoZXJyOiBhbnksIHJvb3Q6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgdGhyb3cgZXJyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBOZXR3b3JrTWFuYWdlci5wcm90b1Jvb3QgPSByb290O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9va3VwKG1hc3NhZ2VOYW1lOiBzdHJpbmcsIG1hc3NhZ2VDb250ZW50OiBhbnkpOiBhbnkge1xyXG4gICAgICAgIHZhciBNZXNzYWdlQm9keSA9IE5ldHdvcmtNYW5hZ2VyLnByb3RvUm9vdC5sb29rdXAobWFzc2FnZU5hbWUpXHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyBtZXNzYWdlXHJcbiAgICAgICAgdmFyIG1lc3NhZ2U6IGFueSA9IE1lc3NhZ2VCb2R5LmNyZWF0ZShtYXNzYWdlQ29udGVudCk7XHJcblxyXG4gICAgICAgIC8vIFZlcmlmeSB0aGUgbWVzc2FnZSBpZiBuZWNlc3NhcnkgKGkuZS4gd2hlbiBwb3NzaWJseSBpbmNvbXBsZXRlIG9yIGludmFsaWQpXHJcbiAgICAgICAgdmFyIGVyck1zZzogYW55ID0gTWVzc2FnZUJvZHkudmVyaWZ5KG1lc3NhZ2UpO1xyXG4gICAgICAgIGlmIChlcnJNc2cpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoZXJyTXNnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEVuY29kZSBhIG1lc3NhZ2UgdG8gYW4gVWludDhBcnJheSAoYnJvd3Nlcikgb3IgQnVmZmVyIChub2RlKVxyXG4gICAgICAgIHZhciBidWZmZXI6IGFueSA9IE1lc3NhZ2VCb2R5LmVuY29kZShtZXNzYWdlKS5maW5pc2goKTtcclxuICAgICAgICAvLyAuLi4gZG8gc29tZXRoaW5nIHdpdGggYnVmZmVyXHJcblxyXG4gICAgICAgIHJldHVybiBidWZmZXJcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkemAgea2iOaBr1xyXG4gICAgICogQHBhcmFtIG1hc3NhZ2VJRCDmtojmga9JRFxyXG4gICAgICogQHBhcmFtIG1hc3NhZ2VOYW1lIOa2iOaBr+WQjeensC0tUEJNYXNzYWdlLkdNX1ZlcmlmeVZlcnNpb25cclxuICAgICAqIEBwYXJhbSBtYXNzYWdlQ29udGVudCDmtojmga/nu5PkvZMtLVBCTWFzc2FnZS5HTV9WZXJpZnlWZXJzaW9uID0geyB2ZXJzaW9uOiBcIjFcIiwgcGxhdGZvcm06MSwgaXN0ZXN0OjMgfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VuZE1lc3NhZ2UobWFzc2FnZUlEOiBhbnksIG1hc3NhZ2VOYW1lOiBhbnksIG1hc3NhZ2VDb250ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB2YXIgYnVmZmVyOiBhbnkgPSB0aGlzLmxvb2t1cChtYXNzYWdlTmFtZSwgbWFzc2FnZUNvbnRlbnQpO1xyXG4gICAgICAgIENsaWVudE1hbmFnZXIuZ2V0U2luZ2xldG9uKCkubG9naWMoKS5zZW5kQnl0ZShtYXNzYWdlSUQsIGJ1ZmZlcik7XHJcbiAgICB9XHJcblxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBNYWluVUkgZnJvbSBcIi4vc2NyaXB0L01haW5VSVwiXG5pbXBvcnQgR2FtZVVJIGZyb20gXCIuL3NjcmlwdC9HYW1lVUlcIlxuaW1wb3J0IEdhbWVDb250cm9sIGZyb20gXCIuL3NjcmlwdC9HYW1lQ29udHJvbFwiXG5pbXBvcnQgVGVzdF85X1RpbWVMaW5lVUkgZnJvbSBcIi4vc3R1ZHkvVGVzdF85X1RpbWVMaW5lVUlcIlxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9zY3JpcHQvQnVsbGV0XCJcbmltcG9ydCBEcm9wQm94IGZyb20gXCIuL3NjcmlwdC9Ecm9wQm94XCJcclxuLypcclxuKiDmuLjmiI/liJ3lp4vljJbphY3nva47XHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb25maWd7XHJcbiAgICBzdGF0aWMgd2lkdGg6bnVtYmVyPTY0MDtcclxuICAgIHN0YXRpYyBoZWlnaHQ6bnVtYmVyPTExMzY7XHJcbiAgICBzdGF0aWMgc2NhbGVNb2RlOnN0cmluZz1cImZpeGVkaGVpZ2h0XCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJob3Jpem9udGFsXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJNYWluU2NlbmUuc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBzdGF0OmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgcGh5c2ljc0RlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgZXhwb3J0U2NlbmVUb0pzb246Ym9vbGVhbj10cnVlO1xyXG4gICAgY29uc3RydWN0b3IoKXt9XHJcbiAgICBzdGF0aWMgaW5pdCgpe1xyXG4gICAgICAgIHZhciByZWc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xyXG4gICAgICAgIHJlZyhcInNjcmlwdC9NYWluVUkudHNcIixNYWluVUkpO1xuICAgICAgICByZWcoXCJzY3JpcHQvR2FtZVVJLnRzXCIsR2FtZVVJKTtcbiAgICAgICAgcmVnKFwic2NyaXB0L0dhbWVDb250cm9sLnRzXCIsR2FtZUNvbnRyb2wpO1xuICAgICAgICByZWcoXCJzdHVkeS9UZXN0XzlfVGltZUxpbmVVSS50c1wiLFRlc3RfOV9UaW1lTGluZVVJKTtcbiAgICAgICAgcmVnKFwic2NyaXB0L0J1bGxldC50c1wiLEJ1bGxldCk7XG4gICAgICAgIHJlZyhcInNjcmlwdC9Ecm9wQm94LnRzXCIsRHJvcEJveCk7XHJcbiAgICB9XHJcbn1cclxuR2FtZUNvbmZpZy5pbml0KCk7IiwiLyoqXHJcbiAqIOWtkOW8ueiEmuacrO+8jOWunueOsOWtkOW8uemjnuihjOmAu+i+keWPiuWvueixoeaxoOWbnuaUtuacuuWItlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgTGF5YS5TY3JpcHQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7IHN1cGVyKCk7IH1cclxuXHJcbiAgICBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICAvL+iuvue9ruWIneWni+mAn+W6plxyXG4gICAgICAgIHZhciByaWc6IExheWEuUmlnaWRCb2R5ID0gdGhpcy5vd25lci5nZXRDb21wb25lbnQoTGF5YS5SaWdpZEJvZHkpO1xyXG4gICAgICAgIHJpZy5zZXRWZWxvY2l0eSh7IHg6IDAsIHk6IC0xMCB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvblRyaWdnZXJFbnRlcihvdGhlcjogYW55LCBzZWxmOiBhbnksIGNvbnRhY3Q6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8v5aaC5p6c6KKr56Kw5Yiw77yM5YiZ56e76Zmk5a2Q5by5XHJcbiAgICAgICAgdGhpcy5vd25lci5yZW1vdmVTZWxmKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgLy/lpoLmnpzlrZDlvLnotoXlh7rlsY/luZXvvIzliJnnp7vpmaTlrZDlvLlcclxuICAgICAgICBpZiAoKHRoaXMub3duZXIgYXMgTGF5YS5TcHJpdGUpLnkgPCAtMTApIHtcclxuICAgICAgICAgICAgdGhpcy5vd25lci5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICAvL+WtkOW8ueiiq+enu+mZpOaXtu+8jOWbnuaUtuWtkOW8ueWIsOWvueixoeaxoO+8jOaWueS+v+S4i+asoeWkjeeUqO+8jOWHj+WwkeWvueixoeWIm+W7uuW8gOmUgFxyXG4gICAgICAgIExheWEuUG9vbC5yZWNvdmVyKFwiYnVsbGV0XCIsIHRoaXMub3duZXIpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVVSSBmcm9tIFwiLi9HYW1lVUlcIjtcclxuLyoqXHJcbiAqIOaOieiQveebkuWtkOiEmuacrO+8jOWunueOsOebkuWtkOeisOaSnuWPiuWbnuaUtua1geeoi1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJvcEJveCBleHRlbmRzIExheWEuU2NyaXB0IHtcclxuICAgIC8qKuebkuWtkOetiee6pyAqL1xyXG4gICAgbGV2ZWw6IG51bWJlciA9IDE7XHJcbiAgICAvKirnrYnnuqfmlofmnKzlr7nosaHlvJXnlKggKi9cclxuICAgIHByaXZhdGUgX3RleHQ6IExheWEuVGV4dDtcclxuICAgIC8qKuWImuS9k+WvueixoeW8leeUqCAqL1xyXG4gICAgcHJpdmF0ZSBfcmlnOiBMYXlhLlJpZ2lkQm9keVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigpOyB9XHJcbiAgICBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICAvKirojrflvpfnu4Tku7blvJXnlKjvvIzpgb/lhY3mr4/mrKHojrflj5bnu4Tku7bluKbmnaXkuI3lv4XopoHnmoTmn6Xor6LlvIDplIAgKi9cclxuICAgICAgICB0aGlzLl9yaWcgPSB0aGlzLm93bmVyLmdldENvbXBvbmVudChMYXlhLlJpZ2lkQm9keSk7XHJcbiAgICAgICAgdGhpcy5sZXZlbCA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDUpICsgMTtcclxuICAgICAgICB0aGlzLl90ZXh0ID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcImxldmVsVHh0XCIpIGFzIExheWEuVGV4dDtcclxuICAgICAgICB0aGlzLl90ZXh0LnRleHQgPSB0aGlzLmxldmVsICsgXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAvL+iuqeaMgee7reebkuWtkOaXi+i9rFxyXG4gICAgICAgICh0aGlzLm93bmVyIGFzIExheWEuU3ByaXRlKS5yb3RhdGlvbisrO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVHJpZ2dlckVudGVyKG90aGVyOiBhbnksIHNlbGY6IGFueSwgY29udGFjdDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdmFyIG93bmVyOiBMYXlhLlNwcml0ZSA9IHRoaXMub3duZXIgYXMgTGF5YS5TcHJpdGU7XHJcbiAgICAgICAgaWYgKG90aGVyLmxhYmVsID09PSBcImJ1dHRsZVwiKSB7XHJcbiAgICAgICAgICAgIC8v56Kw5pKe5Yiw5a2Q5by55ZCO77yM5aKe5Yqg56ev5YiG77yM5pKt5pS+5aOw6Z+z54m55pWIXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbC0tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dC5jaGFuZ2VUZXh0KHRoaXMubGV2ZWwgKyBcIlwiKTtcclxuICAgICAgICAgICAgICAgIG93bmVyLmdldENvbXBvbmVudChMYXlhLlJpZ2lkQm9keSkuc2V0VmVsb2NpdHkoeyB4OiAwLCB5OiAtMTAgfSk7XHJcbiAgICAgICAgICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5wbGF5U291bmQoXCJzb3VuZC9oaXQud2F2XCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKG93bmVyLnBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlZmZlY3Q6IExheWEuQW5pbWF0aW9uID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNyZWF0ZUZ1bihcImVmZmVjdFwiLCB0aGlzLmNyZWF0ZUVmZmVjdCwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0LnBvcyhvd25lci54LCBvd25lci55KTtcclxuICAgICAgICAgICAgICAgICAgICBvd25lci5wYXJlbnQuYWRkQ2hpbGQoZWZmZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICBlZmZlY3QucGxheSgwLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBvd25lci5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKFwic291bmQvZGVzdHJveS53YXZcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgR2FtZVVJLmluc3RhbmNlLmFkZFNjb3JlKDEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAob3RoZXIubGFiZWwgPT09IFwiZ3JvdW5kXCIpIHtcclxuICAgICAgICAgICAgLy/lj6ropoHmnInkuIDkuKrnm5LlrZDnorDliLDlnLDmnb/vvIzliJnlgZzmraLmuLjmiI9cclxuICAgICAgICAgICAgb3duZXIucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICBHYW1lVUkuaW5zdGFuY2Uuc3RvcEdhbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5L2/55So5a+56LGh5rGg5Yib5bu654iG54K45Yqo55S7ICovXHJcbiAgICBjcmVhdGVFZmZlY3QoKTogTGF5YS5BbmltYXRpb24ge1xyXG4gICAgICAgIGxldCBhbmk6IExheWEuQW5pbWF0aW9uID0gbmV3IExheWEuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgYW5pLmxvYWRBbmltYXRpb24oXCJ0ZXN0L1Rlc3RBbmkuYW5pXCIpO1xyXG4gICAgICAgIGFuaS5vbihMYXlhLkV2ZW50LkNPTVBMRVRFLCBudWxsLCByZWNvdmVyKTtcclxuICAgICAgICBmdW5jdGlvbiByZWNvdmVyKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBhbmkucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICBMYXlhLlBvb2wucmVjb3ZlcihcImVmZmVjdFwiLCBhbmkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYW5pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICAvL+ebkuWtkOiiq+enu+mZpOaXtu+8jOWbnuaUtuebkuWtkOWIsOWvueixoeaxoO+8jOaWueS+v+S4i+asoeWkjeeUqO+8jOWHj+WwkeWvueixoeWIm+W7uuW8gOmUgOOAglxyXG4gICAgICAgIExheWEuUG9vbC5yZWNvdmVyKFwiZHJvcEJveFwiLCB0aGlzLm93bmVyKTtcclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQgRHJvcEJveCBmcm9tIFwiLi9Ecm9wQm94XCI7XHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbi8qKlxyXG4gKiDmuLjmiI/mjqfliLbohJrmnKzjgILlrprkuYnkuoblh6DkuKpkcm9wQm9477yMYnVsbGV077yMY3JlYXRlQm94SW50ZXJ2YWznrYnlj5jph4/vvIzog73lpJ/lnKhJREXmmL7npLrlj4rorr7nva7or6Xlj5jph49cclxuICog5pu05aSa57G75Z6L5a6a5LmJ77yM6K+35Y+C6ICD5a6Y5pa55paH5qGjXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29udHJvbCBleHRlbmRzIExheWEuU2NyaXB0IHtcclxuICAgIC8qKiBAcHJvcCB7bmFtZTpkcm9wQm94LHRpcHM6XCLmjonokL3lrrnlmajpooTliLbkvZPlr7nosaFcIix0eXBlOlByZWZhYn0qL1xyXG4gICAgZHJvcEJveDogTGF5YS5QcmVmYWI7XHJcbiAgICAvKiogQHByb3Age25hbWU6YnVsbGV0LHRpcHM6XCLlrZDlvLnpooTliLbkvZPlr7nosaFcIix0eXBlOlByZWZhYn0qL1xyXG4gICAgYnVsbGV0OiBMYXlhLlByZWZhYjtcclxuICAgIC8qKiBAcHJvcCB7bmFtZTpjcmVhdGVCb3hJbnRlcnZhbCx0aXBzOlwi6Ze06ZqU5aSa5bCR5q+r56eS5Yib5bu65LiA5Liq5LiL6LeM55qE5a655ZmoXCIsdHlwZTppbnQsZGVmYXVsdDoxMDAwfSovXHJcbiAgICBjcmVhdGVCb3hJbnRlcnZhbDogbnVtYmVyID0gMTAwMDtcclxuICAgIC8qKuW8gOWni+aXtumXtCovXHJcbiAgICBwcml2YXRlIF90aW1lOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5piv5ZCm5bey57uP5byA5aeL5ri45oiPICovXHJcbiAgICBwcml2YXRlIF9zdGFydGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKirlrZDlvLnlkoznm5LlrZDmiYDlnKjnmoTlrrnlmajlr7nosaEgKi9cclxuICAgIHByaXZhdGUgX2dhbWVCb3g6IExheWEuU3ByaXRlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigpOyB9XHJcblxyXG4gICAgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy5fZ2FtZUJveCA9IHRoaXMub3duZXIuZ2V0Q2hpbGRCeU5hbWUoXCJnYW1lQm94XCIpIGFzIExheWEuU3ByaXRlO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQm94KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgLy/mr4/pl7TpmpTkuIDmrrXml7bpl7TliJvlu7rkuIDkuKrnm5LlrZBcclxuICAgICAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcclxuICAgICAgICBpZiAobm93IC0gdGhpcy5fdGltZSA+IHRoaXMuY3JlYXRlQm94SW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZSA9IG5vdztcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVCb3goKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQm94KCk6IHZvaWQge1xyXG4gICAgICAgIC8v5L2/55So5a+56LGh5rGg5Yib5bu655uS5a2QXHJcbiAgICAgICAgbGV0IGJveDogTGF5YS5TcHJpdGUgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q3JlYXRlRnVuKFwiZHJvcEJveFwiLCB0aGlzLmRyb3BCb3guY3JlYXRlLCB0aGlzLmRyb3BCb3gpO1xyXG4gICAgICAgIGJveC5wb3MoTWF0aC5yYW5kb20oKSAqIChMYXlhLnN0YWdlLndpZHRoIC0gMTAwKSwgLTEwMCk7XHJcbiAgICAgICAgdGhpcy5fZ2FtZUJveC5hZGRDaGlsZChib3gpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU3RhZ2VDbGljayhlOiBMYXlhLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgLy/lgZzmraLkuovku7blhpLms6HvvIzmj5Dpq5jmgKfog73vvIzlvZPnhLbkuZ/lj6/ku6XkuI3opoFcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIC8v6Iie5Y+w6KKr54K55Ye75ZCO77yM5L2/55So5a+56LGh5rGg5Yib5bu65a2Q5by5XHJcbiAgICAgICAgbGV0IGZseWVyOiBMYXlhLlNwcml0ZSA9IExheWEuUG9vbC5nZXRJdGVtQnlDcmVhdGVGdW4oXCJidWxsZXRcIiwgdGhpcy5idWxsZXQuY3JlYXRlLCB0aGlzLmJ1bGxldCk7XHJcbiAgICAgICAgZmx5ZXIucG9zKExheWEuc3RhZ2UubW91c2VYLCBMYXlhLnN0YWdlLm1vdXNlWSk7XHJcbiAgICAgICAgdGhpcy5fZ2FtZUJveC5hZGRDaGlsZChmbHllcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5byA5aeL5ri45oiP77yM6YCa6L+H5r+A5rS75pys6ISa5pys5pa55byP5byA5aeL5ri45oiPKi9cclxuICAgIHN0YXJ0R2FtZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3N0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKue7k+adn+a4uOaIj++8jOmAmui/h+mdnua/gOa0u+acrOiEmuacrOWBnOatoua4uOaIjyAqL1xyXG4gICAgc3RvcEdhbWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQm94SW50ZXJ2YWwgPSAxMDAwO1xyXG4gICAgICAgIHRoaXMuX2dhbWVCb3gucmVtb3ZlQ2hpbGRyZW4oKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IHVpIH0gZnJvbSBcIi4vLi4vdWkvbGF5YU1heFVJXCI7XHJcbmltcG9ydCBHYW1lQ29udHJvbCBmcm9tIFwiLi9HYW1lQ29udHJvbFwiXHJcbi8qKlxyXG4gKiDmnKznpLrkvovph4fnlKjpnZ7ohJrmnKznmoTmlrnlvI/lrp7njrDvvIzogIzkvb/nlKjnu6fmib/pobXpnaLln7rnsbvvvIzlrp7njrDpobXpnaLpgLvovpHjgILlnKhJREXph4zpnaLorr7nva7lnLrmma/nmoRSdW50aW1l5bGe5oCn5Y2z5Y+v5ZKM5Zy65pmv6L+b6KGM5YWz6IGUXHJcbiAqIOebuOavlOiEmuacrOaWueW8j++8jOe7p+aJv+W8j+mhtemdouexu++8jOWPr+S7peebtOaOpeS9v+eUqOmhtemdouWumuS5ieeahOWxnuaAp++8iOmAmui/h0lEReWGhXZhcuWxnuaAp+WumuS5ie+8ie+8jOavlOWmgnRoaXMudGlwTGJsbO+8jHRoaXMuc2NvcmVMYmzvvIzlhbfmnInku6PnoIHmj5DnpLrmlYjmnpxcclxuICog5bu66K6u77ya5aaC5p6c5piv6aG16Z2i57qn55qE6YC76L6R77yM6ZyA6KaB6aKR57mB6K6/6Zeu6aG16Z2i5YaF5aSa5Liq5YWD57Sg77yM5L2/55So57un5om/5byP5YaZ5rOV77yM5aaC5p6c5piv54us56uL5bCP5qih5Z2X77yM5Yqf6IO95Y2V5LiA77yM5bu66K6u55So6ISa5pys5pa55byP5a6e546w77yM5q+U5aaC5a2Q5by56ISa5pys44CCXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lVUkgZXh0ZW5kcyB1aS50ZXN0LlRlc3RTY2VuZVVJIHtcclxuICAgIC8qKuiuvue9ruWNleS+i+eahOW8leeUqOaWueW8j++8jOaWueS+v+WFtuS7luexu+W8leeUqCAqL1xyXG4gICAgc3RhdGljIGluc3RhbmNlOiBHYW1lVUk7XHJcbiAgICAvKirlvZPliY3muLjmiI/np6/liIblrZfmrrUgKi9cclxuICAgIHByaXZhdGUgX3Njb3JlOiBudW1iZXI7XHJcbiAgICAvKirmuLjmiI/mjqfliLbohJrmnKzlvJXnlKjvvIzpgb/lhY3mr4/mrKHojrflj5bnu4Tku7bluKbmnaXkuI3lv4XopoHnmoTmgKfog73lvIDplIAgKi9cclxuICAgIHByaXZhdGUgX2NvbnRyb2w6IEdhbWVDb250cm9sO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgR2FtZVVJLmluc3RhbmNlID0gdGhpcztcclxuICAgICAgICAvL+WFs+mXreWkmueCueinpuaOp++8jOWQpuWImeWwseaXoOaVjOS6hlxyXG4gICAgICAgIExheWEuTW91c2VNYW5hZ2VyLm11bHRpVG91Y2hFbmFibGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY29udHJvbCA9IHRoaXMuZ2V0Q29tcG9uZW50KEdhbWVDb250cm9sKTtcclxuICAgICAgICAvL+eCueWHu+aPkOekuuaWh+Wtl++8jOW8gOWni+a4uOaIj1xyXG4gICAgICAgIHRoaXMudGlwTGJsbC5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLm9uVGlwQ2xpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVGlwQ2xpY2soZTogTGF5YS5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGlwTGJsbC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc2NvcmUgPSAwO1xyXG4gICAgICAgIHRoaXMuc2NvcmVMYmwudGV4dCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fY29udHJvbC5zdGFydEdhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirlop7liqDliIbmlbAgKi9cclxuICAgIGFkZFNjb3JlKHZhbHVlOiBudW1iZXIgPSAxKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2NvcmUgKz0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zY29yZUxibC5jaGFuZ2VUZXh0KFwi5YiG5pWw77yaXCIgKyB0aGlzLl9zY29yZSk7XHJcbiAgICAgICAgLy/pmo/nnYDliIbmlbDotorpq5jvvIzpmr7luqblop7lpKdcclxuICAgICAgICBpZiAodGhpcy5fY29udHJvbC5jcmVhdGVCb3hJbnRlcnZhbCA+IDYwMCAmJiB0aGlzLl9zY29yZSAlIDIwID09IDApIHRoaXMuX2NvbnRyb2wuY3JlYXRlQm94SW50ZXJ2YWwgLT0gMjA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5YGc5q2i5ri45oiPICovXHJcbiAgICBzdG9wR2FtZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRpcExibGwudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy50aXBMYmxsLnRleHQgPSBcIua4uOaIj+e7k+adn+S6hu+8jOeCueWHu+Wxj+W5lemHjeaWsOW8gOWni1wiO1xyXG4gICAgICAgIHRoaXMuX2NvbnRyb2wuc3RvcEdhbWUoKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IHVpIH0gZnJvbSBcIi4uL3VpL2xheWFNYXhVSVwiO1xyXG5cclxuXHJcbi8v5Li755WM6Z2iXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5VSSBleHRlbmRzIHVpLk1haW5TY2VuZVVJIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoKTsgfVxyXG5cclxuICAgIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFpblVJLm9uRW5hYmxlXCIpXHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFpblVJLm9uRGlzYWJsZVwiKVxyXG4gICAgfVxyXG59IiwiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdF8wX05ldHdvcmtfUHJvdG9jb2xCdWZmZXIge1xyXG4gICAgcHJpdmF0ZSBQcm90b0J1ZjogYW55ID0gTGF5YS5Ccm93c2VyLndpbmRvdy5wcm90b2J1ZjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLlByb3RvQnVmLmxvYWQoXCIuL3Byb3RvYnVmL3Byb3RvZmlsZS9wcm90b2ZpbGUucHJvdG9cIiwgdGhpcy5vbkFzc2V0c0xvYWRlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkFzc2V0c0xvYWRlZChlcnI6IGFueSwgcm9vdDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGVycilcclxuICAgICAgICAgICAgdGhyb3cgZXJyO1xyXG5cclxuICAgICAgICAvLyBPYnRhaW4gYSBtZXNzYWdlIHR5cGVcclxuICAgICAgICB2YXIgQXdlc29tZU1lc3NhZ2U6IGFueSA9IHJvb3QubG9va3VwKFwiUEJNYXNzYWdlLkF3ZXNvbWVNZXNzYWdlXCIpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgbWVzc2FnZVxyXG4gICAgICAgIHZhciBtZXNzYWdlOiBhbnkgPSBBd2Vzb21lTWVzc2FnZS5jcmVhdGUoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGF3ZXNvbWVGaWVsZDogXCJBd2Vzb21lU3RyaW5nXCJcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFZlcmlmeSB0aGUgbWVzc2FnZSBpZiBuZWNlc3NhcnkgKGkuZS4gd2hlbiBwb3NzaWJseSBpbmNvbXBsZXRlIG9yIGludmFsaWQpXHJcbiAgICAgICAgdmFyIGVyck1zZzogYW55ID0gQXdlc29tZU1lc3NhZ2UudmVyaWZ5KG1lc3NhZ2UpO1xyXG4gICAgICAgIGlmIChlcnJNc2cpXHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKGVyck1zZyk7XHJcblxyXG4gICAgICAgIC8vIEVuY29kZSBhIG1lc3NhZ2UgdG8gYW4gVWludDhBcnJheSAoYnJvd3Nlcikgb3IgQnVmZmVyIChub2RlKVxyXG4gICAgICAgIHZhciBidWZmZXI6IGFueSA9IEF3ZXNvbWVNZXNzYWdlLmVuY29kZShtZXNzYWdlKS5maW5pc2goKTtcclxuICAgICAgICAvLyAuLi4gZG8gc29tZXRoaW5nIHdpdGggYnVmZmVyXHJcblxyXG4gICAgICAgIC8vIE9yLCBlbmNvZGUgYSBwbGFpbiBvYmplY3RcclxuICAgICAgICB2YXIgYnVmZmVyOiBhbnkgPSBBd2Vzb21lTWVzc2FnZS5lbmNvZGUoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGF3ZXNvbWVGaWVsZDogXCJBd2Vzb21lU3RyaW5nXCJcclxuICAgICAgICAgICAgfSkuZmluaXNoKCk7XHJcbiAgICAgICAgLy8gLi4uIGRvIHNvbWV0aGluZyB3aXRoIGJ1ZmZlclxyXG5cclxuXHJcbiAgICAgICAgLy8gRGVjb2RlIGFuIFVpbnQ4QXJyYXkgKGJyb3dzZXIpIG9yIEJ1ZmZlciAobm9kZSkgdG8gYSBtZXNzYWdlXHJcbiAgICAgICAgdmFyIG1lc3NhZ2U6IGFueSA9IEF3ZXNvbWVNZXNzYWdlLmRlY29kZShidWZmZXIpO1xyXG4gICAgICAgIC8vIC4uLiBkbyBzb21ldGhpbmcgd2l0aCBtZXNzYWdlXHJcblxyXG4gICAgICAgIC8vIElmIHlvdXIgYXBwbGljYXRpb24gdXNlcyBsZW5ndGgtZGVsaW1pdGVkIGJ1ZmZlcnMsIHRoZXJlIGlzIGFsc28gZW5jb2RlRGVsaW1pdGVkIGFuZCBkZWNvZGVEZWxpbWl0ZWQuXHJcbiAgICB9XHJcbn0iLCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0XzlfVGltZUxpbmVVSVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvL+WKoOi9veWbvumbhuaIkOWKn+WQju+8jOaJp+ihjG9uTG9hZOWbnuiwg+aWueazlVxyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQoXCJyZXMvYXRsYXMvdGVzdC5hdGxhc1wiLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uTG9hZGVkKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgb25Mb2FkZWQoKTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Yqg6L295Zu+6ZuG5oiQ5Yqf5ZCO77yM5omn6KGMb25Mb2Fk5Zue6LCD5pa55rOVXCIpXHJcbiAgICAgICAgLy/liJvlu7rkuIDkuKpVSeWunuS+i1xyXG4gICAgICAgIC8vdmFyIHBsYW46VGltZUxpbmVVSSA9IG5ldyBUaW1lTGluZVVJKClcclxuICAgICAgICAvL+a3u+WKoOWIsOiInuWPsFxyXG4gICAgICAgIC8vTGF5YS5zdGFnZS5hZGRDaGlsZChwbGFuKTtcclxuICAgICAgICAvL+aSreaUvlVJ5Zy65pmv5Lit55qE5Yqo55S7XHJcbiAgICAgICAgLy90aGlzLmJlYXIucGxheSgpO1xyXG4gICAgfVxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xudmFyIFJFRzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XG5leHBvcnQgbW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBNYWluU2NlbmVVSSBleHRlbmRzIFNjZW5lIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiTWFpblNjZW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLk1haW5TY2VuZVVJXCIsTWFpblNjZW5lVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbWVMaW5lVUkgZXh0ZW5kcyBEaWFsb2cge1xyXG5cdFx0cHVibGljIGJlYXI6TGF5YS5BbmltYXRpb247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJUaW1lTGluZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5UaW1lTGluZVVJXCIsVGltZUxpbmVVSSk7XHJcbn1cclxuZXhwb3J0IG1vZHVsZSB1aS50ZXN0IHtcclxuICAgIGV4cG9ydCBjbGFzcyBUZXN0U2NlbmVVSSBleHRlbmRzIFNjZW5lIHtcclxuXHRcdHB1YmxpYyBzY29yZUxibDpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyB0aXBMYmxsOkxheWEuTGFiZWw7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJ0ZXN0L1Rlc3RTY2VuZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS50ZXN0LlRlc3RTY2VuZVVJXCIsVGVzdFNjZW5lVUkpO1xyXG59XHIiXX0=
