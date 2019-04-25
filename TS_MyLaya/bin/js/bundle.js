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
        this.socketConnect = new SocketConnect("clientId:" + this.clientId);
        this.socketConnect.connect(host, port);
    };
    GameClient.prototype.connectByUrl = function (url) {
        this.socketConnect = new SocketConnect("clientId:" + this.clientId);
        this.socketConnect.connectByUrl(url);
    };
    GameClient.prototype.reConnect = function () {
        this.socketConnect.reConnect();
    };
    GameClient.prototype.disConnect = function () {
        this.socketConnect.disConnect();
    };
    GameClient.prototype.isConnected = function () {
        return this.socketConnect.connected();
    };
    GameClient.prototype.sendEmpty = function (msgId) {
        this.socketConnect.sendEmpty(msgId);
    };
    GameClient.prototype.sendMassage = function (msgId, content) {
        if (content) {
            this.socketConnect.sendString(msgId, content);
        }
        else {
            this.socketConnect.sendByte(msgId, content);
        }
    };
    return GameClient;
}());
var ClientManager = /** @class */ (function () {
    function ClientManager() {
        this.gameClientDic = {};
    }
    ClientManager.getSingleton = function () {
        if (!this.clientManager) {
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
    ClientManager.prototype.loginSendMessage = function (msgId, content) {
        var client = this.GetClient(ClientID.login);
        if (!client) {
            client.sendMassage(msgId, content);
        }
    };
    ClientManager.prototype.logicSendMessage = function (msgId, content) {
        var client = this.GetClient(ClientID.logic);
        if (!client) {
            client.sendMassage(msgId, content);
        }
    };
    ClientManager.prototype.sceneSendMessage = function (msgId, content) {
        var client = this.GetClient(ClientID.scene);
        if (!client) {
            client.sendMassage(msgId, content);
        }
    };
    ClientManager.prototype.clearAllGameClient = function () {
        var dic = this.gameClientDic;
        for (var key in dic) {
            if (dic.hasOwnProperty(key)) {
                var element = dic[key];
                element.disConnect();
            }
        }
        this.gameClientDic = {};
    };
    ClientManager.prototype.sendMessageEmpty = function (msgId) {
        if (msgId > GameMessage.GM_ACCOUNT_SERVER_MESSAGE_START && msgId < GameMessage.GM_ACCOUNT_SERVER_MESSAGE_END) {
            this.loginSendMessage(msgId, null);
        }
        else {
            this.logicSendMessage(msgId, null);
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
    /**
     * 序列化 protocol-buffer
     * @param massageName
     * @param massageContent
     */
    NetworkManager.prototype.Serialize = function (massageName, massageContent) {
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
     * 反序列化 protocol-buffer
     * @param massageName
     * @param netPackage NetPackage
     */
    NetworkManager.prototype.Deserialize = function (massageName, netPackage) {
        var MessageBody = NetworkManager.protoRoot.lookup(massageName);
        // Decode an Uint8Array (browser) or Buffer (node) to a message
        var message = MessageBody.decode(netPackage.msg);
    };
    /**
     * 发送消息
     * @param massageID 消息ID
     * @param massageName 消息名称--PBMassage.GM_VerifyVersion
     * @param massageContent 消息结体--PBMassage.GM_VerifyVersion = { version: "1", platform:1, istest:3 }
     */
    NetworkManager.prototype.loginSendMessage = function (massageID, massageName, massageContent) {
        var buffer = this.Deserialize(massageName, massageContent);
        ClientManager_1.default.getSingleton().loginSendMessage(massageID, buffer);
    };
    NetworkManager.prototype.logicSendMessage = function (massageID, massageName, massageContent) {
        var buffer = this.Deserialize(massageName, massageContent);
        ClientManager_1.default.getSingleton().logicSendMessage(massageID, buffer);
    };
    NetworkManager.prototype.sceneSendMessage = function (massageID, massageName, massageContent) {
        var buffer = this.Deserialize(massageName, massageContent);
        ClientManager_1.default.getSingleton().sceneSendMessage(massageID, buffer);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkc6L0xheWEvTGF5YUFpcklERV9iZXRhL3Jlc291cmNlcy9hcHAvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9BcHBNYWluLnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL0NsaWVudE1hbmFnZXIudHMiLCJzcmMvRnJhbWV3b3JrL05ldHdvcmsvTmV0d29ya01hbmFnZXIudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9zY3JpcHQvQnVsbGV0LnRzIiwic3JjL3NjcmlwdC9Ecm9wQm94LnRzIiwic3JjL3NjcmlwdC9HYW1lQ29udHJvbC50cyIsInNyYy9zY3JpcHQvR2FtZVVJLnRzIiwic3JjL3NjcmlwdC9NYWluVUkudHMiLCJzcmMvc3R1ZHkvVGVzdF8wX05ldHdvcmtfUHJvdG9jb2xCdWZmZXIudHMiLCJzcmMvc3R1ZHkvVGVzdF85X1RpbWVMaW5lVUkudHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1JBLElBQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7QUFrQnpCLDJDQUFzQztBQUd0Qyx1RkFBa0Y7QUFDbEYscUVBQWdFO0FBRWhFLEtBQUs7QUFDTDtJQUNJO1FBQ0ksZ0JBQWdCO1FBQ2hCLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQVUsQ0FBQyxLQUFLLEVBQUUsb0JBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVqRCx1QkFBdUI7WUFDdkIsOERBQThEO1NBQ2pFO2FBQ0k7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFVLENBQUMsS0FBSyxFQUFFLG9CQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ2pFO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBR2xELG9EQUFvRDtRQUMxRCxJQUFJLG9CQUFVLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU07WUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM5RixJQUFJLG9CQUFVLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztZQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3JGLElBQUksb0JBQVUsQ0FBQyxJQUFJO1lBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV0QyxrQkFBa0I7UUFDeEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUU3QixnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRzlILElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztRQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxvQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBLHVDQUF1QztRQUNuRixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxvQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFBLDJDQUEyQztRQUN6RixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFFL0Isb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsb0JBQVUsQ0FBQyxpQkFBaUIsQ0FBQztRQUUxRCxnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUV4QyxvQkFBb0I7UUFDcEIsMEJBQTBCO0lBQzlCLENBQUM7SUFFRCxpQ0FBZSxHQUFmO1FBQ0YsK0NBQStDO1FBQy9DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFFRCxnQ0FBYyxHQUFkO1FBQ08sWUFBWTtRQUNaLHdCQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkMsWUFBWTtRQUNOLG9CQUFVLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG9CQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFaEUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFVSx1QkFBSyxHQUFiO1FBQ0ksb0JBQW9CO1FBQ3BCLHlCQUF5QjtRQUN6QiwwQkFBMEI7UUFDMUIscUNBQXFDO1FBQ3JDLHNDQUFzQztRQUN0QyxxQ0FBcUM7UUFDckMsc0NBQXNDO1FBQ3RDLHdCQUF3QjtRQUN4Qiw2QkFBNkI7UUFDN0IsNEJBQTRCO1FBQzVCLG1DQUFtQztRQUNuQyw0QkFBNEI7UUFDNUIseUJBQXlCO1FBQ3pCLHdCQUF3QjtRQUN4QiwwQkFBMEI7UUFDMUIsc0JBQXNCO1FBQ3RCLHdCQUF3QjtRQUN4QixJQUFJLHVDQUE2QixFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQWhGQSxBQWdGQyxJQUFBO0FBRUQsT0FBTztBQUNQLElBQUksT0FBTyxFQUFFLENBQUM7OztBQzdHZCxrSEFBa0g7O0FBR2xILElBQUssUUFLSjtBQUxELFdBQUssUUFBUTtJQUNULHlDQUFTLENBQUE7SUFDVCx5Q0FBSyxDQUFBO0lBQ0wseUNBQUssQ0FBQTtJQUNMLG1EQUFVLENBQUE7QUFDZCxDQUFDLEVBTEksUUFBUSxLQUFSLFFBQVEsUUFLWjtBQUdEO0lBSUksb0JBQVksRUFBWTtRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU0sNEJBQU8sR0FBZCxVQUFlLElBQVksRUFBRSxJQUFZO1FBQ3JDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLGlDQUFZLEdBQW5CLFVBQW9CLEdBQVc7UUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSw4QkFBUyxHQUFoQjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVNLCtCQUFVLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRU0sZ0NBQVcsR0FBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVNLDhCQUFTLEdBQWhCLFVBQWlCLEtBQWtCO1FBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTSxnQ0FBVyxHQUFsQixVQUFtQixLQUFrQixFQUFFLE9BQTJCO1FBQzlELElBQUksT0FBaUIsRUFBRTtZQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsT0FBaUIsQ0FBQyxDQUFDO1NBQzNEO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBb0IsQ0FBQyxDQUFDO1NBQzVEO0lBQ0wsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0ExQ0EsQUEwQ0MsSUFBQTtBQUdEO0lBV0k7UUFWUSxrQkFBYSxHQUFxQyxFQUFFLENBQUM7SUFXN0QsQ0FBQztJQVJhLDBCQUFZLEdBQTFCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1NBQzVDO1FBQ0QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFLTyxpQ0FBUyxHQUFqQixVQUFrQixFQUFZO1FBQzFCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDaEMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLHdDQUFnQixHQUF2QixVQUF3QixLQUFrQixFQUFFLE9BQWtCO1FBQzFELElBQUksTUFBTSxHQUFlLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3ZELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtTQUNyQztJQUNMLENBQUM7SUFFTSx3Q0FBZ0IsR0FBdkIsVUFBd0IsS0FBa0IsRUFBRSxPQUFrQjtRQUMxRCxJQUFJLE1BQU0sR0FBZSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN2RCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUE7U0FDckM7SUFDTCxDQUFDO0lBRU0sd0NBQWdCLEdBQXZCLFVBQXdCLEtBQWtCLEVBQUUsT0FBa0I7UUFDMUQsSUFBSSxNQUFNLEdBQWUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDdkQsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1NBQ3JDO0lBQ0wsQ0FBQztJQUVNLDBDQUFrQixHQUF6QjtRQUNJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUE7UUFDNUIsS0FBSyxJQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUU7WUFDbkIsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QixJQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3pCLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUN4QjtTQUNKO1FBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUE7SUFDM0IsQ0FBQztJQUVNLHdDQUFnQixHQUF2QixVQUF3QixLQUFrQjtRQUN0QyxJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsK0JBQStCLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyw2QkFBNkIsRUFBRTtZQUMxRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3RDO2FBQ0k7WUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3RDO0lBQ0wsQ0FBQztJQTFEYywyQkFBYSxHQUFrQixJQUFJLENBQUM7SUEyRHZELG9CQUFDO0NBN0RELEFBNkRDLElBQUE7a0JBN0RvQixhQUFhOzs7O0FDekRsQyxpREFBNEM7QUFDNUMsSUFBTyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUU3QjtJQWNJO1FBWFEsYUFBUSxHQUFRLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBRXhDLGtCQUFhLEdBQVcsc0NBQXNDLENBQUM7UUFVbkUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFUYSwwQkFBVyxHQUF6QjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztTQUN4QztRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQTtJQUN4QixDQUFDO0lBTU8sc0NBQWEsR0FBckI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU8sdUNBQWMsR0FBdEIsVUFBdUIsR0FBUSxFQUFFLElBQVM7UUFDdEMsSUFBSSxHQUFHLEVBQUU7WUFDTCxNQUFNLEdBQUcsQ0FBQztTQUNiO1FBQ0QsY0FBYyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxrQ0FBUyxHQUFoQixVQUFpQixXQUFtQixFQUFFLGNBQW1CO1FBQ3JELElBQUksV0FBVyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBRTlELHVCQUF1QjtRQUN2QixJQUFJLE9BQU8sR0FBUSxXQUFXLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRXRELDZFQUE2RTtRQUM3RSxJQUFJLE1BQU0sR0FBUSxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLElBQUksTUFBTSxFQUFFO1lBQ1IsTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkI7UUFFRCwrREFBK0Q7UUFDL0QsSUFBSSxNQUFNLEdBQVEsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN2RCwrQkFBK0I7UUFFL0IsT0FBTyxNQUFNLENBQUE7SUFDakIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxvQ0FBVyxHQUFsQixVQUFtQixXQUFtQixFQUFFLFVBQWU7UUFDbkQsSUFBSSxXQUFXLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDOUQsK0RBQStEO1FBQy9ELElBQUksT0FBTyxHQUFRLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLHlDQUFnQixHQUF2QixVQUF3QixTQUFjLEVBQUUsV0FBZ0IsRUFBRSxjQUFtQjtRQUN6RSxJQUFJLE1BQU0sR0FBUSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUNoRSx1QkFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRU0seUNBQWdCLEdBQXZCLFVBQXdCLFNBQWMsRUFBRSxXQUFnQixFQUFFLGNBQW1CO1FBQ3pFLElBQUksTUFBTSxHQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ2hFLHVCQUFhLENBQUMsWUFBWSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFTSx5Q0FBZ0IsR0FBdkIsVUFBd0IsU0FBYyxFQUFFLFdBQWdCLEVBQUUsY0FBbUI7UUFDekUsSUFBSSxNQUFNLEdBQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDaEUsdUJBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQS9FYyx3QkFBUyxHQUFRLElBQUksQ0FBQztJQWdGekMscUJBQUM7Q0FwRkQsQUFvRkMsSUFBQTtrQkFwRm9CLGNBQWM7Ozs7QUNIbkMsZ0dBQWdHO0FBQ2hHLDBDQUFvQztBQUNwQywwQ0FBb0M7QUFDcEMsb0RBQThDO0FBQzlDLCtEQUF5RDtBQUN6RCwwQ0FBb0M7QUFDcEMsNENBQXNDO0FBQ3RDOztFQUVFO0FBQ0Y7SUFhSTtJQUFjLENBQUM7SUFDUixlQUFJLEdBQVg7UUFDSSxJQUFJLEdBQUcsR0FBYSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUM3QyxHQUFHLENBQUMsa0JBQWtCLEVBQUMsZ0JBQU0sQ0FBQyxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxrQkFBa0IsRUFBQyxnQkFBTSxDQUFDLENBQUM7UUFDL0IsR0FBRyxDQUFDLHVCQUF1QixFQUFDLHFCQUFXLENBQUMsQ0FBQztRQUN6QyxHQUFHLENBQUMsNEJBQTRCLEVBQUMsMkJBQWlCLENBQUMsQ0FBQztRQUNwRCxHQUFHLENBQUMsa0JBQWtCLEVBQUMsZ0JBQU0sQ0FBQyxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxtQkFBbUIsRUFBQyxpQkFBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQXJCTSxnQkFBSyxHQUFRLEdBQUcsQ0FBQztJQUNqQixpQkFBTSxHQUFRLElBQUksQ0FBQztJQUNuQixvQkFBUyxHQUFRLGFBQWEsQ0FBQztJQUMvQixxQkFBVSxHQUFRLFlBQVksQ0FBQztJQUMvQixpQkFBTSxHQUFRLEtBQUssQ0FBQztJQUNwQixpQkFBTSxHQUFRLE1BQU0sQ0FBQztJQUNyQixxQkFBVSxHQUFLLGlCQUFpQixDQUFDO0lBQ2pDLG9CQUFTLEdBQVEsRUFBRSxDQUFDO0lBQ3BCLGdCQUFLLEdBQVMsS0FBSyxDQUFDO0lBQ3BCLGVBQUksR0FBUyxLQUFLLENBQUM7SUFDbkIsdUJBQVksR0FBUyxLQUFLLENBQUM7SUFDM0IsNEJBQWlCLEdBQVMsSUFBSSxDQUFDO0lBVzFDLGlCQUFDO0NBdkJELEFBdUJDLElBQUE7a0JBdkJvQixVQUFVO0FBd0IvQixVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7QUNsQ2xCOztHQUVHO0FBQ0g7SUFBb0MsMEJBQVc7SUFDM0M7ZUFBZ0IsaUJBQU87SUFBRSxDQUFDO0lBRTFCLHlCQUFRLEdBQVI7UUFDSSxRQUFRO1FBQ1IsSUFBSSxHQUFHLEdBQW1CLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsRSxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCwrQkFBYyxHQUFkLFVBQWUsS0FBVSxFQUFFLElBQVMsRUFBRSxPQUFZO1FBQzlDLGFBQWE7UUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCx5QkFBUSxHQUFSO1FBQ0ksZ0JBQWdCO1FBQ2hCLElBQUssSUFBSSxDQUFDLEtBQXFCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRUQsMEJBQVMsR0FBVDtRQUNJLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0F6QkEsQUF5QkMsQ0F6Qm1DLElBQUksQ0FBQyxNQUFNLEdBeUI5Qzs7Ozs7QUM1QkQsbUNBQThCO0FBQzlCOztHQUVHO0FBQ0g7SUFBcUMsMkJBQVc7SUFRNUM7UUFBQSxZQUFnQixpQkFBTyxTQUFHO1FBUDFCLFVBQVU7UUFDVixXQUFLLEdBQVcsQ0FBQyxDQUFDOztJQU1PLENBQUM7SUFDMUIsMEJBQVEsR0FBUjtRQUNJLCtCQUErQjtRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBYyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRCwwQkFBUSxHQUFSO1FBQ0ksU0FBUztRQUNSLElBQUksQ0FBQyxLQUFxQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxnQ0FBYyxHQUFkLFVBQWUsS0FBVSxFQUFFLElBQVMsRUFBRSxPQUFZO1FBQzlDLElBQUksS0FBSyxHQUFnQixJQUFJLENBQUMsS0FBb0IsQ0FBQztRQUNuRCxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzFCLG9CQUFvQjtZQUNwQixJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO2dCQUNoQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDdkMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNoRDtpQkFBTTtnQkFDSCxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7b0JBQ2QsSUFBSSxNQUFNLEdBQW1CLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQzdGLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDckIsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2lCQUNwRDthQUNKO1lBQ0QsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9CO2FBQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUNqQyxtQkFBbUI7WUFDbkIsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ25CLGdCQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzlCO0lBQ0wsQ0FBQztJQUVELGlCQUFpQjtJQUNqQiw4QkFBWSxHQUFaO1FBQ0ksSUFBSSxHQUFHLEdBQW1CLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQy9DLEdBQUcsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN0QyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzQztZQUNJLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELDJCQUFTLEdBQVQ7UUFDSSxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0wsY0FBQztBQUFELENBakVBLEFBaUVDLENBakVvQyxJQUFJLENBQUMsTUFBTSxHQWlFL0M7Ozs7O0FDbEVEOzs7R0FHRztBQUNIO0lBQXlDLCtCQUFXO0lBY2hEO1FBQUEsWUFBZ0IsaUJBQU8sU0FBRztRQVQxQixpRkFBaUY7UUFDakYsdUJBQWlCLEdBQVcsSUFBSSxDQUFDO1FBQ2pDLFNBQVM7UUFDRCxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGNBQWM7UUFDTixjQUFRLEdBQVksS0FBSyxDQUFDOztJQUlULENBQUM7SUFFMUIsOEJBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFnQixDQUFDO1FBQ3BFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsOEJBQVEsR0FBUjtRQUNJLGVBQWU7UUFDZixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDakIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUVELCtCQUFTLEdBQVQ7UUFDSSxXQUFXO1FBQ1gsSUFBSSxHQUFHLEdBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELGtDQUFZLEdBQVosVUFBYSxDQUFhO1FBQ3RCLHFCQUFxQjtRQUNyQixDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDcEIsa0JBQWtCO1FBQ2xCLElBQUksS0FBSyxHQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCx1QkFBdUI7SUFDdkIsK0JBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVELHVCQUF1QjtJQUN2Qiw4QkFBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFDTCxrQkFBQztBQUFELENBOURBLEFBOERDLENBOUR3QyxJQUFJLENBQUMsTUFBTSxHQThEbkQ7Ozs7O0FDckVELCtDQUF1QztBQUN2Qyw2Q0FBdUM7QUFDdkM7Ozs7R0FJRztBQUNIO0lBQW9DLDBCQUFtQjtJQVFuRDtRQUFBLFlBQ0ksaUJBQU8sU0FJVjtRQUhHLE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDO1FBQ3ZCLGVBQWU7UUFDZixJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQzs7SUFDaEQsQ0FBQztJQUVELHlCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQVcsQ0FBQyxDQUFDO1FBQy9DLGFBQWE7UUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCwyQkFBVSxHQUFWLFVBQVcsQ0FBYTtRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELFVBQVU7SUFDVix5QkFBUSxHQUFSLFVBQVMsS0FBaUI7UUFBakIsc0JBQUEsRUFBQSxTQUFpQjtRQUN0QixJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLGFBQWE7UUFDYixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxJQUFJLENBQUM7WUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixJQUFJLEVBQUUsQ0FBQztJQUM5RyxDQUFDO0lBRUQsVUFBVTtJQUNWLHlCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0wsYUFBQztBQUFELENBMUNBLEFBMENDLENBMUNtQyxjQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsR0EwQ3REOzs7OztBQ2pERCw2Q0FBcUM7QUFHckMsS0FBSztBQUNMO0lBQW9DLDBCQUFjO0lBRTlDO2VBQWdCLGlCQUFPO0lBQUUsQ0FBQztJQUUxQix5QkFBUSxHQUFSO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUFFRCwwQkFBUyxHQUFUO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBQ25DLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0FYQSxBQVdDLENBWG1DLGNBQUUsQ0FBQyxXQUFXLEdBV2pEOzs7OztBQ1pEO0lBR0k7UUFGUSxhQUFRLEdBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBR2pELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRU8sc0RBQWMsR0FBdEIsVUFBdUIsR0FBUSxFQUFFLElBQVM7UUFDdEMsSUFBSSxHQUFHO1lBQ0gsTUFBTSxHQUFHLENBQUM7UUFFZCx3QkFBd0I7UUFDeEIsSUFBSSxjQUFjLEdBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBRWxFLHVCQUF1QjtRQUN2QixJQUFJLE9BQU8sR0FBUSxjQUFjLENBQUMsTUFBTSxDQUNwQztZQUNJLFlBQVksRUFBRSxlQUFlO1NBQ2hDLENBQUMsQ0FBQztRQUVQLDZFQUE2RTtRQUM3RSxJQUFJLE1BQU0sR0FBUSxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELElBQUksTUFBTTtZQUNOLE1BQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXhCLCtEQUErRDtRQUMvRCxJQUFJLE1BQU0sR0FBUSxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzFELCtCQUErQjtRQUUvQiw0QkFBNEI7UUFDNUIsSUFBSSxNQUFNLEdBQVEsY0FBYyxDQUFDLE1BQU0sQ0FDbkM7WUFDSSxZQUFZLEVBQUUsZUFBZTtTQUNoQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsK0JBQStCO1FBRy9CLCtEQUErRDtRQUMvRCxJQUFJLE9BQU8sR0FBUSxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELGdDQUFnQztRQUVoQyx3R0FBd0c7SUFDNUcsQ0FBQztJQUNMLG9DQUFDO0FBQUQsQ0EzQ0EsQUEyQ0MsSUFBQTs7Ozs7QUMzQ0Q7SUFFSTtRQUNJLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVPLG9DQUFRLEdBQWhCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO1FBQ25DLFVBQVU7UUFDVix3Q0FBd0M7UUFDeEMsT0FBTztRQUNQLDRCQUE0QjtRQUM1QixZQUFZO1FBQ1osbUJBQW1CO0lBQ3ZCLENBQUM7SUFDTCx3QkFBQztBQUFELENBaEJBLEFBZ0JDLElBQUE7Ozs7O0FDakJELElBQU8sTUFBTSxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDMUIsSUFBTyxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUN4QixJQUFJLEdBQUcsR0FBYSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztBQUM3QyxJQUFjLEVBQUUsQ0FrQmY7QUFsQkQsV0FBYyxFQUFFO0lBQ1o7UUFBaUMsK0JBQUs7UUFDbEM7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLG9DQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFDTCxrQkFBQztJQUFELENBTkEsQUFNQyxDQU5nQyxLQUFLLEdBTXJDO0lBTlksY0FBVyxjQU12QixDQUFBO0lBQ0QsR0FBRyxDQUFDLGdCQUFnQixFQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xDO1FBQWdDLDhCQUFNO1FBRWxDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixtQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQVBBLEFBT0MsQ0FQK0IsTUFBTSxHQU9yQztJQVBZLGFBQVUsYUFPdEIsQ0FBQTtJQUNELEdBQUcsQ0FBQyxlQUFlLEVBQUMsVUFBVSxDQUFDLENBQUM7QUFDcEMsQ0FBQyxFQWxCYSxFQUFFLEdBQUYsVUFBRSxLQUFGLFVBQUUsUUFrQmY7QUFDRCxXQUFjLEVBQUU7SUFBQyxJQUFBLElBQUksQ0FXcEI7SUFYZ0IsV0FBQSxJQUFJO1FBQ2pCO1lBQWlDLCtCQUFLO1lBR2xDO3VCQUFlLGlCQUFPO1lBQUEsQ0FBQztZQUN2QixvQ0FBYyxHQUFkO2dCQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDckMsQ0FBQztZQUNMLGtCQUFDO1FBQUQsQ0FSQSxBQVFDLENBUmdDLEtBQUssR0FRckM7UUFSWSxnQkFBVyxjQVF2QixDQUFBO1FBQ0QsR0FBRyxDQUFDLHFCQUFxQixFQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNDLENBQUMsRUFYZ0IsSUFBSSxHQUFKLE9BQUksS0FBSixPQUFJLFFBV3BCO0FBQUQsQ0FBQyxFQVhhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQVdmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBCcm93c2VyID0gTGF5YS5Ccm93c2VyXHJcbmltcG9ydCBXZWJHTCA9IExheWEuV2ViR0xcclxuaW1wb3J0IFN0YWdlID0gTGF5YS5TdGFnZVxyXG5cclxuaW1wb3J0IFRlc3RfMV9UZXh0IGZyb20gJy4vc3R1ZHkvVGVzdF8xX1RleHQnO1xyXG5pbXBvcnQgVGVzdF8yX0lucHV0VGVzdCBmcm9tICcuL3N0dWR5L1Rlc3RfMl9JbnB1dFRlc3QnO1xyXG5pbXBvcnQgVGVzdF8zX0JpdG1hcEZvbnQgZnJvbSAnLi9zdHVkeS9UZXN0XzNfQml0bWFwRm9udCc7XHJcbmltcG9ydCBUZXN0XzRfMV9TcHJpdGVfRGlzcGxheUltYWdlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSc7XHJcbmltcG9ydCBUZXN0XzRfMV9TcHJpdGVfU3dpdGNoVGV4dHVyZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8xX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlJztcclxuaW1wb3J0IFRlc3RfNF8yX1Nwcml0ZV9EaXNwbGF5SW1hZ2UgZnJvbSAnLi9zdHVkeS9UZXN0XzRfMl9TcHJpdGVfRGlzcGxheUltYWdlJztcclxuaW1wb3J0IFRlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzJfU3ByaXRlX1N3aXRjaFRleHR1cmUnO1xyXG5pbXBvcnQgVGVzdF80X01hc2tEZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF80X01hc2tEZW1vJztcclxuaW1wb3J0IFRlc3RfNV8xX0NvbG9yRmlsdGVyIGZyb20gJy4vc3R1ZHkvVGVzdF81XzFfQ29sb3JGaWx0ZXInO1xyXG5pbXBvcnQgVGVzdF81XzJfR2xvd0ZpbHRlciBmcm9tICcuL3N0dWR5L1Rlc3RfNV8yX0dsb3dGaWx0ZXInO1xyXG5pbXBvcnQgVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMgZnJvbSAnLi9zdHVkeS9UZXN0XzZfMV9TcHJpdGVfRHJhd1NoYXBlcyc7XHJcbmltcG9ydCBUZXN0XzdfQXRsYXNBbmlEZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF83X0F0bGFzQW5pRGVtbyc7XHJcbmltcG9ydCBUZXN0XzhfVHdlZW5EZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF84X1R3ZWVuRGVtbyc7XHJcbmltcG9ydCBUZXN0XzlfVGltZUxpbmUgZnJvbSAnLi9zdHVkeS9UZXN0XzlfVGltZUxpbmUnO1xyXG5pbXBvcnQgVGVzdF85X1RpbWVMaW5lVUkgZnJvbSAnLi9zdHVkeS9UZXN0XzlfVGltZUxpbmVVSSc7XHJcbmltcG9ydCBUZXN0XzExX1NvdW5kIGZyb20gJy4vc3R1ZHkvVGVzdF8xMV9Tb3VuZCc7XHJcbmltcG9ydCBHYW1lQ29uZmlnIGZyb20gJy4vR2FtZUNvbmZpZyc7XHJcbmltcG9ydCBUZXN0XzBfMV9DaGFubmVsIGZyb20gJy4vc3R1ZHkvVGVzdF8wXzFfQ2hhbm5lbCc7XHJcbmltcG9ydCBUZXN0XzBfMV9Tb2NrZXQgZnJvbSAnLi9zdHVkeS9UZXN0XzBfMV9Tb2NrZXQnO1xyXG5pbXBvcnQgVGVzdF8wX05ldHdvcmtfUHJvdG9jb2xCdWZmZXIgZnJvbSAnLi9zdHVkeS9UZXN0XzBfTmV0d29ya19Qcm90b2NvbEJ1ZmZlcic7XHJcbmltcG9ydCBOZXR3b3JrTWFuYWdlciBmcm9tICcuL0ZyYW1ld29yay9OZXR3b3JrL05ldHdvcmtNYW5hZ2VyJztcclxuXHJcbi8v5ZCv5Yqo57G7XHJcbmNsYXNzIEFwcE1haW4ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy/moLnmja5JREXorr7nva7liJ3lp4vljJblvJXmk45cdFx0XHJcbiAgICAgICAgaWYgKHdpbmRvd1tcIkxheWEzRFwiXSkge1xyXG4gICAgICAgICAgICBMYXlhM0QuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICAvLyDkuI3mlK/mjIFXZWJHTOaXtuiHquWKqOWIh+aNouiHs0NhbnZhc1xyXG4gICAgICAgICAgICAvL0xheWEuaW5pdChCcm93c2VyLmNsaWVudFdpZHRoLCBCcm93c2VyLmNsaWVudEhlaWdodCwgV2ViR0wpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgTGF5YS5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0LCBMYXlhW1wiV2ViR0xcIl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBMYXlhW1wiUGh5c2ljc1wiXSAmJiBMYXlhW1wiUGh5c2ljc1wiXS5lbmFibGUoKTtcclxuICAgICAgICBMYXlhW1wiRGVidWdQYW5lbFwiXSAmJiBMYXlhW1wiRGVidWdQYW5lbFwiXS5lbmFibGUoKTtcclxuXHJcblxyXG4gICAgICAgIC8v5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iVxyXG5cdFx0aWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnBoeXNpY3NEZWJ1ZyAmJiBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXSkgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0uZW5hYmxlKCk7XHJcbiAgICAgICAgaWYgKEdhbWVDb25maWcuc3RhdCkgTGF5YS5TdGF0LnNob3coKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+ihqOekuuaYr+WQpuaNleiOt+WFqOWxgOmUmeivr+W5tuW8ueWHuuaPkOekuuOAglxyXG5cdFx0TGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTsgXHJcblxyXG5cdFx0Ly/mv4DmtLvotYTmupDniYjmnKzmjqfliLbvvIx2ZXJzaW9uLmpzb27nlLFJREXlj5HluIPlip/og73oh6rliqjnlJ/miJDvvIzlpoLmnpzmsqHmnInkuZ/kuI3lvbHlk43lkI7nu63mtYHnqItcclxuXHRcdExheWEuUmVzb3VyY2VWZXJzaW9uLmVuYWJsZShcInZlcnNpb24uanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25WZXJzaW9uTG9hZGVkKSwgTGF5YS5SZXNvdXJjZVZlcnNpb24uRklMRU5BTUVfVkVSU0lPTik7XHJcblxyXG5cclxuICAgICAgICBMYXlhLnN0YWdlLmFsaWduViA9IFN0YWdlLkFMSUdOX01JRERMRTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFsaWduSCA9IFN0YWdlLkFMSUdOX0NFTlRFUjtcclxuICAgICAgICBMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IEdhbWVDb25maWcuc2NhbGVNb2RlOy8vU3RhZ2UuU0NBTEVfRlVMTDsvL1NDQUxFX0ZJWEVEX0hFSUdIVFxyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IEdhbWVDb25maWcuc2NyZWVuTW9kZTsvL1N0YWdlLlNDUkVFTl9IT1JJWk9OVEFMOy8vU0NSRUVOX1ZFUlRJQ0FMXHJcbiAgICAgICAgTGF5YS5zdGFnZS5iZ0NvbG9yID0gXCIjN2Y3ZjdmXCI7XHJcblxyXG4gICAgICAgIC8v5YW85a655b6u5L+h5LiN5pSv5oyB5Yqg6L29c2NlbmXlkI7nvIDlnLrmma9cclxuICAgICAgICBMYXlhLlVSTC5leHBvcnRTY2VuZVRvSnNvbiA9IEdhbWVDb25maWcuZXhwb3J0U2NlbmVUb0pzb247XHJcblxyXG4gICAgICAgIC8v5aaC5p6c6YCa6L+H6K6+5aSH6Z2Z6Z+z6ZSu6K6p6Z+z6aKR6Ieq5Yqo6Lef6ZqP6K6+5aSH6Z2Z6Z+z44CC6ZyA6KaB5bCGdXNlQXVkaW9NdXNpY+iuvue9ruS4umZhbHNl44CCXHJcbiAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIudXNlQXVkaW9NdXNpYyA9IGZhbHNlO1xyXG4gICAgICAgIExheWEuU291bmRNYW5hZ2VyLmF1dG9TdG9wTXVzaWMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy/mtojpmaTnn6Lph4/nu5jliLbnmoTplK/pvb/vvIzkvYbkvJrlop7liqDmgKfog73mtojogJdcclxuICAgICAgICAvL0NvbmZpZy5pc0FudGlhbGlhcz10cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVmVyc2lvbkxvYWRlZCgpOiB2b2lkIHtcclxuXHRcdC8v5r+A5rS75aSn5bCP5Zu+5pig5bCE77yM5Yqg6L295bCP5Zu+55qE5pe25YCZ77yM5aaC5p6c5Y+R546w5bCP5Zu+5Zyo5aSn5Zu+5ZCI6ZuG6YeM6Z2i77yM5YiZ5LyY5YWI5Yqg6L295aSn5Zu+5ZCI6ZuG77yM6ICM5LiN5piv5bCP5Zu+XHJcblx0XHRMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG5cdH1cclxuXHJcblx0b25Db25maWdMb2FkZWQoKTogdm9pZCB7XHJcbiAgICAgICAgLy/liJ3lp4tQcm90b2J1ZlxyXG4gICAgICAgIE5ldHdvcmtNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcblxyXG5cdFx0Ly/liqDovb1JREXmjIflrprnmoTlnLrmma9cclxuICAgICAgICBHYW1lQ29uZmlnLnN0YXJ0U2NlbmUgJiYgTGF5YS5TY2VuZS5vcGVuKEdhbWVDb25maWcuc3RhcnRTY2VuZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZXR1cCgpO1xyXG5cdH1cclxuXHJcbiAgICBwcml2YXRlIHNldHVwKCk6IHZvaWQge1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMV9UZXh0KCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8yX0lucHV0VGVzdCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfM19CaXRtYXBGb250KCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8xX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80XzJfU3ByaXRlX0Rpc3BsYXlJbWFnZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80X01hc2tEZW1vKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF81XzFfQ29sb3JGaWx0ZXIoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzVfMl9HbG93RmlsdGVyKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzdfQXRsYXNBbmlEZW1vKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF84X1R3ZWVuRGVtbygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfOV9UaW1lTGluZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfOV9UaW1lTGluZVVJKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8xMV9Tb3VuZCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMF8xX1NvY2tldCgpO1xyXG4gICAgICAgIG5ldyBUZXN0XzBfTmV0d29ya19Qcm90b2NvbEJ1ZmZlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgQXBwTWFpbigpOyIsIlxyXG4vL2ltcG9ydCAqIGFzIENvbGxlY3Rpb25zIGZyb20gJ3R5cGVzY3JpcHQtY29sbGVjdGlvbnMnOyAvL2ltcG9ydCBDb2xsZWN0aW9ucyA9IHJlcXVpcmUoJ3R5cGVzY3JpcHQtY29sbGVjdGlvbnMnKTtcclxuXHJcblxyXG5lbnVtIENsaWVudElEIHtcclxuICAgIGxvZ2luID0gMCxcclxuICAgIGxvZ2ljLFxyXG4gICAgc2NlbmUsXHJcbiAgICByZWNvcmRDaGF0LFxyXG59XHJcblxyXG5cclxuY2xhc3MgR2FtZUNsaWVudCB7XHJcbiAgICBwcml2YXRlIGNsaWVudElkOiBDbGllbnRJRDtcclxuICAgIHByaXZhdGUgc29ja2V0Q29ubmVjdDogU29ja2V0Q29ubmVjdDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogQ2xpZW50SUQpIHtcclxuICAgICAgICB0aGlzLmNsaWVudElkID0gaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbm5lY3QoaG9zdDogc3RyaW5nLCBwb3J0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QgPSBuZXcgU29ja2V0Q29ubmVjdChcImNsaWVudElkOlwiICsgdGhpcy5jbGllbnRJZCk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LmNvbm5lY3QoaG9zdCwgcG9ydCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbm5lY3RCeVVybCh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdCA9IG5ldyBTb2NrZXRDb25uZWN0KFwiY2xpZW50SWQ6XCIgKyB0aGlzLmNsaWVudElkKTtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QuY29ubmVjdEJ5VXJsKHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlQ29ubmVjdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QucmVDb25uZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc0Nvbm5lY3QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LmRpc0Nvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNDb25uZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ja2V0Q29ubmVjdC5jb25uZWN0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZEVtcHR5KG1zZ0lkOiBHYW1lTWVzc2FnZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5zZW5kRW1wdHkobXNnSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kTWFzc2FnZShtc2dJZDogR2FtZU1lc3NhZ2UsIGNvbnRlbnQ6IHN0cmluZyB8IExheWEuQnl0ZSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChjb250ZW50IGFzIHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLnNvY2tldENvbm5lY3Quc2VuZFN0cmluZyhtc2dJZCwgY29udGVudCBhcyBzdHJpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LnNlbmRCeXRlKG1zZ0lkLCBjb250ZW50IGFzIExheWEuQnl0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xpZW50TWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGdhbWVDbGllbnREaWM6IHsgW2luZGV4OiBudW1iZXJdOiBHYW1lQ2xpZW50OyB9ID0ge307XHJcbiAgICBwcml2YXRlIHN0YXRpYyBjbGllbnRNYW5hZ2VyOiBDbGllbnRNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFNpbmdsZXRvbigpOiBDbGllbnRNYW5hZ2VyIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2xpZW50TWFuYWdlcikge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWVudE1hbmFnZXIgPSBuZXcgQ2xpZW50TWFuYWdlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnRNYW5hZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBHZXRDbGllbnQoaWQ6IENsaWVudElEKTogR2FtZUNsaWVudCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZUNsaWVudERpY1tpZF0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nYW1lQ2xpZW50RGljW2lkXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ2luU2VuZE1lc3NhZ2UobXNnSWQ6IEdhbWVNZXNzYWdlLCBjb250ZW50OiBMYXlhLkJ5dGUpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2xpZW50OiBHYW1lQ2xpZW50ID0gdGhpcy5HZXRDbGllbnQoQ2xpZW50SUQubG9naW4pXHJcbiAgICAgICAgaWYgKCFjbGllbnQpIHtcclxuICAgICAgICAgICAgY2xpZW50LnNlbmRNYXNzYWdlKG1zZ0lkLCBjb250ZW50KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naWNTZW5kTWVzc2FnZShtc2dJZDogR2FtZU1lc3NhZ2UsIGNvbnRlbnQ6IExheWEuQnl0ZSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGllbnQ6IEdhbWVDbGllbnQgPSB0aGlzLkdldENsaWVudChDbGllbnRJRC5sb2dpYylcclxuICAgICAgICBpZiAoIWNsaWVudCkge1xyXG4gICAgICAgICAgICBjbGllbnQuc2VuZE1hc3NhZ2UobXNnSWQsIGNvbnRlbnQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzY2VuZVNlbmRNZXNzYWdlKG1zZ0lkOiBHYW1lTWVzc2FnZSwgY29udGVudDogTGF5YS5CeXRlKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNsaWVudDogR2FtZUNsaWVudCA9IHRoaXMuR2V0Q2xpZW50KENsaWVudElELnNjZW5lKVxyXG4gICAgICAgIGlmICghY2xpZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5zZW5kTWFzc2FnZShtc2dJZCwgY29udGVudClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQWxsR2FtZUNsaWVudCgpIHtcclxuICAgICAgICBsZXQgZGljID0gdGhpcy5nYW1lQ2xpZW50RGljXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGljKSB7XHJcbiAgICAgICAgICAgIGlmIChkaWMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRpY1trZXldO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5kaXNDb25uZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nYW1lQ2xpZW50RGljID0ge31cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZE1lc3NhZ2VFbXB0eShtc2dJZDogR2FtZU1lc3NhZ2UpOiB2b2lkIHtcclxuICAgICAgICBpZiAobXNnSWQgPiBHYW1lTWVzc2FnZS5HTV9BQ0NPVU5UX1NFUlZFUl9NRVNTQUdFX1NUQVJUICYmIG1zZ0lkIDwgR2FtZU1lc3NhZ2UuR01fQUNDT1VOVF9TRVJWRVJfTUVTU0FHRV9FTkQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dpblNlbmRNZXNzYWdlKG1zZ0lkLCBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9naWNTZW5kTWVzc2FnZShtc2dJZCwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IENsaWVudE1hbmFnZXIgZnJvbSBcIi4vQ2xpZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgQnJvd3NlciA9IExheWEuQnJvd3NlclxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0d29ya01hbmFnZXIge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBOZXR3b3JrTWFuYWdlcjtcclxuICAgIHByaXZhdGUgcHJvdG9CdWY6IGFueSA9IEJyb3dzZXIud2luZG93LnByb3RvYnVmO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcHJvdG9Sb290OiBhbnkgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBwcm90b2ZpbGVQYXRoOiBzdHJpbmcgPSBcIi4vcHJvdG9idWYvcHJvdG9maWxlL3Byb3RvZmlsZS5wcm90b1wiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTmV0d29ya01hbmFnZXIge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IE5ldHdvcmtNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxvYWRQcm90b2ZpbGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRQcm90b2ZpbGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wcm90b0J1Zi5sb2FkKHRoaXMucHJvdG9maWxlUGF0aCwgdGhpcy5vbkFzc2V0c0xvYWRlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkFzc2V0c0xvYWRlZChlcnI6IGFueSwgcm9vdDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICB0aHJvdyBlcnI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE5ldHdvcmtNYW5hZ2VyLnByb3RvUm9vdCA9IHJvb3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDluo/liJfljJYgcHJvdG9jb2wtYnVmZmVyXHJcbiAgICAgKiBAcGFyYW0gbWFzc2FnZU5hbWUgXHJcbiAgICAgKiBAcGFyYW0gbWFzc2FnZUNvbnRlbnQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBTZXJpYWxpemUobWFzc2FnZU5hbWU6IHN0cmluZywgbWFzc2FnZUNvbnRlbnQ6IGFueSk6IGFueSB7XHJcbiAgICAgICAgdmFyIE1lc3NhZ2VCb2R5ID0gTmV0d29ya01hbmFnZXIucHJvdG9Sb290Lmxvb2t1cChtYXNzYWdlTmFtZSlcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IG1lc3NhZ2VcclxuICAgICAgICB2YXIgbWVzc2FnZTogYW55ID0gTWVzc2FnZUJvZHkuY3JlYXRlKG1hc3NhZ2VDb250ZW50KTtcclxuXHJcbiAgICAgICAgLy8gVmVyaWZ5IHRoZSBtZXNzYWdlIGlmIG5lY2Vzc2FyeSAoaS5lLiB3aGVuIHBvc3NpYmx5IGluY29tcGxldGUgb3IgaW52YWxpZClcclxuICAgICAgICB2YXIgZXJyTXNnOiBhbnkgPSBNZXNzYWdlQm9keS52ZXJpZnkobWVzc2FnZSk7XHJcbiAgICAgICAgaWYgKGVyck1zZykge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihlcnJNc2cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRW5jb2RlIGEgbWVzc2FnZSB0byBhbiBVaW50OEFycmF5IChicm93c2VyKSBvciBCdWZmZXIgKG5vZGUpXHJcbiAgICAgICAgdmFyIGJ1ZmZlcjogYW55ID0gTWVzc2FnZUJvZHkuZW5jb2RlKG1lc3NhZ2UpLmZpbmlzaCgpO1xyXG4gICAgICAgIC8vIC4uLiBkbyBzb21ldGhpbmcgd2l0aCBidWZmZXJcclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1ZmZlclxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+N5bqP5YiX5YyWIHByb3RvY29sLWJ1ZmZlclxyXG4gICAgICogQHBhcmFtIG1hc3NhZ2VOYW1lIFxyXG4gICAgICogQHBhcmFtIG5ldFBhY2thZ2UgTmV0UGFja2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRGVzZXJpYWxpemUobWFzc2FnZU5hbWU6IHN0cmluZywgbmV0UGFja2FnZTogYW55KSAge1xyXG4gICAgICAgIHZhciBNZXNzYWdlQm9keSA9IE5ldHdvcmtNYW5hZ2VyLnByb3RvUm9vdC5sb29rdXAobWFzc2FnZU5hbWUpXHJcbiAgICAgICAgLy8gRGVjb2RlIGFuIFVpbnQ4QXJyYXkgKGJyb3dzZXIpIG9yIEJ1ZmZlciAobm9kZSkgdG8gYSBtZXNzYWdlXHJcbiAgICAgICAgdmFyIG1lc3NhZ2U6IGFueSA9IE1lc3NhZ2VCb2R5LmRlY29kZShuZXRQYWNrYWdlLm1zZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HpgIHmtojmga9cclxuICAgICAqIEBwYXJhbSBtYXNzYWdlSUQg5raI5oGvSURcclxuICAgICAqIEBwYXJhbSBtYXNzYWdlTmFtZSDmtojmga/lkI3np7AtLVBCTWFzc2FnZS5HTV9WZXJpZnlWZXJzaW9uXHJcbiAgICAgKiBAcGFyYW0gbWFzc2FnZUNvbnRlbnQg5raI5oGv57uT5L2TLS1QQk1hc3NhZ2UuR01fVmVyaWZ5VmVyc2lvbiA9IHsgdmVyc2lvbjogXCIxXCIsIHBsYXRmb3JtOjEsIGlzdGVzdDozIH1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvZ2luU2VuZE1lc3NhZ2UobWFzc2FnZUlEOiBhbnksIG1hc3NhZ2VOYW1lOiBhbnksIG1hc3NhZ2VDb250ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB2YXIgYnVmZmVyOiBhbnkgPSB0aGlzLkRlc2VyaWFsaXplKG1hc3NhZ2VOYW1lLCBtYXNzYWdlQ29udGVudCk7XHJcbiAgICAgICAgQ2xpZW50TWFuYWdlci5nZXRTaW5nbGV0b24oKS5sb2dpblNlbmRNZXNzYWdlKG1hc3NhZ2VJRCwgYnVmZmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naWNTZW5kTWVzc2FnZShtYXNzYWdlSUQ6IGFueSwgbWFzc2FnZU5hbWU6IGFueSwgbWFzc2FnZUNvbnRlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHZhciBidWZmZXI6IGFueSA9IHRoaXMuRGVzZXJpYWxpemUobWFzc2FnZU5hbWUsIG1hc3NhZ2VDb250ZW50KTtcclxuICAgICAgICBDbGllbnRNYW5hZ2VyLmdldFNpbmdsZXRvbigpLmxvZ2ljU2VuZE1lc3NhZ2UobWFzc2FnZUlELCBidWZmZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzY2VuZVNlbmRNZXNzYWdlKG1hc3NhZ2VJRDogYW55LCBtYXNzYWdlTmFtZTogYW55LCBtYXNzYWdlQ29udGVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdmFyIGJ1ZmZlcjogYW55ID0gdGhpcy5EZXNlcmlhbGl6ZShtYXNzYWdlTmFtZSwgbWFzc2FnZUNvbnRlbnQpO1xyXG4gICAgICAgIENsaWVudE1hbmFnZXIuZ2V0U2luZ2xldG9uKCkuc2NlbmVTZW5kTWVzc2FnZShtYXNzYWdlSUQsIGJ1ZmZlcik7XHJcbiAgICB9XHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cclxuaW1wb3J0IE1haW5VSSBmcm9tIFwiLi9zY3JpcHQvTWFpblVJXCJcbmltcG9ydCBHYW1lVUkgZnJvbSBcIi4vc2NyaXB0L0dhbWVVSVwiXG5pbXBvcnQgR2FtZUNvbnRyb2wgZnJvbSBcIi4vc2NyaXB0L0dhbWVDb250cm9sXCJcbmltcG9ydCBUZXN0XzlfVGltZUxpbmVVSSBmcm9tIFwiLi9zdHVkeS9UZXN0XzlfVGltZUxpbmVVSVwiXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL3NjcmlwdC9CdWxsZXRcIlxuaW1wb3J0IERyb3BCb3ggZnJvbSBcIi4vc2NyaXB0L0Ryb3BCb3hcIlxyXG4vKlxyXG4qIOa4uOaIj+WIneWni+WMlumFjee9rjtcclxuKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNvbmZpZ3tcclxuICAgIHN0YXRpYyB3aWR0aDpudW1iZXI9NjQwO1xyXG4gICAgc3RhdGljIGhlaWdodDpudW1iZXI9MTEzNjtcclxuICAgIHN0YXRpYyBzY2FsZU1vZGU6c3RyaW5nPVwiZml4ZWRoZWlnaHRcIjtcclxuICAgIHN0YXRpYyBzY3JlZW5Nb2RlOnN0cmluZz1cImhvcml6b250YWxcIjtcclxuICAgIHN0YXRpYyBhbGlnblY6c3RyaW5nPVwidG9wXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25IOnN0cmluZz1cImxlZnRcIjtcclxuICAgIHN0YXRpYyBzdGFydFNjZW5lOmFueT1cIk1haW5TY2VuZS5zY2VuZVwiO1xyXG4gICAgc3RhdGljIHNjZW5lUm9vdDpzdHJpbmc9XCJcIjtcclxuICAgIHN0YXRpYyBkZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHN0YXQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBwaHlzaWNzRGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBleHBvcnRTY2VuZVRvSnNvbjpib29sZWFuPXRydWU7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe31cclxuICAgIHN0YXRpYyBpbml0KCl7XHJcbiAgICAgICAgdmFyIHJlZzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XHJcbiAgICAgICAgcmVnKFwic2NyaXB0L01haW5VSS50c1wiLE1haW5VSSk7XG4gICAgICAgIHJlZyhcInNjcmlwdC9HYW1lVUkudHNcIixHYW1lVUkpO1xuICAgICAgICByZWcoXCJzY3JpcHQvR2FtZUNvbnRyb2wudHNcIixHYW1lQ29udHJvbCk7XG4gICAgICAgIHJlZyhcInN0dWR5L1Rlc3RfOV9UaW1lTGluZVVJLnRzXCIsVGVzdF85X1RpbWVMaW5lVUkpO1xuICAgICAgICByZWcoXCJzY3JpcHQvQnVsbGV0LnRzXCIsQnVsbGV0KTtcbiAgICAgICAgcmVnKFwic2NyaXB0L0Ryb3BCb3gudHNcIixEcm9wQm94KTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLmluaXQoKTsiLCIvKipcclxuICog5a2Q5by56ISa5pys77yM5a6e546w5a2Q5by56aOe6KGM6YC76L6R5Y+K5a+56LGh5rGg5Zue5pS25py65Yi2XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXQgZXh0ZW5kcyBMYXlhLlNjcmlwdCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoKTsgfVxyXG5cclxuICAgIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIC8v6K6+572u5Yid5aeL6YCf5bqmXHJcbiAgICAgICAgdmFyIHJpZzogTGF5YS5SaWdpZEJvZHkgPSB0aGlzLm93bmVyLmdldENvbXBvbmVudChMYXlhLlJpZ2lkQm9keSk7XHJcbiAgICAgICAgcmlnLnNldFZlbG9jaXR5KHsgeDogMCwgeTogLTEwIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVHJpZ2dlckVudGVyKG90aGVyOiBhbnksIHNlbGY6IGFueSwgY29udGFjdDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgLy/lpoLmnpzooqvnorDliLDvvIzliJnnp7vpmaTlrZDlvLlcclxuICAgICAgICB0aGlzLm93bmVyLnJlbW92ZVNlbGYoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAvL+WmguaenOWtkOW8uei2heWHuuWxj+W5le+8jOWImeenu+mZpOWtkOW8uVxyXG4gICAgICAgIGlmICgodGhpcy5vd25lciBhcyBMYXlhLlNwcml0ZSkueSA8IC0xMCkge1xyXG4gICAgICAgICAgICB0aGlzLm93bmVyLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIC8v5a2Q5by56KKr56e76Zmk5pe277yM5Zue5pS25a2Q5by55Yiw5a+56LGh5rGg77yM5pa55L6/5LiL5qyh5aSN55So77yM5YeP5bCR5a+56LGh5Yib5bu65byA6ZSAXHJcbiAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIoXCJidWxsZXRcIiwgdGhpcy5vd25lcik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZVVJIGZyb20gXCIuL0dhbWVVSVwiO1xyXG4vKipcclxuICog5o6J6JC955uS5a2Q6ISa5pys77yM5a6e546w55uS5a2Q56Kw5pKe5Y+K5Zue5pS25rWB56iLXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcm9wQm94IGV4dGVuZHMgTGF5YS5TY3JpcHQge1xyXG4gICAgLyoq55uS5a2Q562J57qnICovXHJcbiAgICBsZXZlbDogbnVtYmVyID0gMTtcclxuICAgIC8qKuetiee6p+aWh+acrOWvueixoeW8leeUqCAqL1xyXG4gICAgcHJpdmF0ZSBfdGV4dDogTGF5YS5UZXh0O1xyXG4gICAgLyoq5Yia5L2T5a+56LGh5byV55SoICovXHJcbiAgICBwcml2YXRlIF9yaWc6IExheWEuUmlnaWRCb2R5XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IHN1cGVyKCk7IH1cclxuICAgIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIC8qKuiOt+W+l+e7hOS7tuW8leeUqO+8jOmBv+WFjeavj+asoeiOt+WPlue7hOS7tuW4puadpeS4jeW/heimgeeahOafpeivouW8gOmUgCAqL1xyXG4gICAgICAgIHRoaXMuX3JpZyA9IHRoaXMub3duZXIuZ2V0Q29tcG9uZW50KExheWEuUmlnaWRCb2R5KTtcclxuICAgICAgICB0aGlzLmxldmVsID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNSkgKyAxO1xyXG4gICAgICAgIHRoaXMuX3RleHQgPSB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKFwibGV2ZWxUeHRcIikgYXMgTGF5YS5UZXh0O1xyXG4gICAgICAgIHRoaXMuX3RleHQudGV4dCA9IHRoaXMubGV2ZWwgKyBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIC8v6K6p5oyB57ut55uS5a2Q5peL6L2sXHJcbiAgICAgICAgKHRoaXMub3duZXIgYXMgTGF5YS5TcHJpdGUpLnJvdGF0aW9uKys7XHJcbiAgICB9XHJcblxyXG4gICAgb25UcmlnZ2VyRW50ZXIob3RoZXI6IGFueSwgc2VsZjogYW55LCBjb250YWN0OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB2YXIgb3duZXI6IExheWEuU3ByaXRlID0gdGhpcy5vd25lciBhcyBMYXlhLlNwcml0ZTtcclxuICAgICAgICBpZiAob3RoZXIubGFiZWwgPT09IFwiYnV0dGxlXCIpIHtcclxuICAgICAgICAgICAgLy/norDmkp7liLDlrZDlvLnlkI7vvIzlop7liqDnp6/liIbvvIzmkq3mlL7lo7Dpn7PnibnmlYhcclxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWwgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsLS07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0LmNoYW5nZVRleHQodGhpcy5sZXZlbCArIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgb3duZXIuZ2V0Q29tcG9uZW50KExheWEuUmlnaWRCb2R5KS5zZXRWZWxvY2l0eSh7IHg6IDAsIHk6IC0xMCB9KTtcclxuICAgICAgICAgICAgICAgIExheWEuU291bmRNYW5hZ2VyLnBsYXlTb3VuZChcInNvdW5kL2hpdC53YXZcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob3duZXIucGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVmZmVjdDogTGF5YS5BbmltYXRpb24gPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q3JlYXRlRnVuKFwiZWZmZWN0XCIsIHRoaXMuY3JlYXRlRWZmZWN0LCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBlZmZlY3QucG9zKG93bmVyLngsIG93bmVyLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG93bmVyLnBhcmVudC5hZGRDaGlsZChlZmZlY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVmZmVjdC5wbGF5KDAsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG93bmVyLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5wbGF5U291bmQoXCJzb3VuZC9kZXN0cm95LndhdlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBHYW1lVUkuaW5zdGFuY2UuYWRkU2NvcmUoMSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChvdGhlci5sYWJlbCA9PT0gXCJncm91bmRcIikge1xyXG4gICAgICAgICAgICAvL+WPquimgeacieS4gOS4quebkuWtkOeisOWIsOWcsOadv++8jOWImeWBnOatoua4uOaIj1xyXG4gICAgICAgICAgICBvd25lci5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIEdhbWVVSS5pbnN0YW5jZS5zdG9wR2FtZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirkvb/nlKjlr7nosaHmsaDliJvlu7rniIbngrjliqjnlLsgKi9cclxuICAgIGNyZWF0ZUVmZmVjdCgpOiBMYXlhLkFuaW1hdGlvbiB7XHJcbiAgICAgICAgbGV0IGFuaTogTGF5YS5BbmltYXRpb24gPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcclxuICAgICAgICBhbmkubG9hZEFuaW1hdGlvbihcInRlc3QvVGVzdEFuaS5hbmlcIik7XHJcbiAgICAgICAgYW5pLm9uKExheWEuRXZlbnQuQ09NUExFVEUsIG51bGwsIHJlY292ZXIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIHJlY292ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGFuaS5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIExheWEuUG9vbC5yZWNvdmVyKFwiZWZmZWN0XCIsIGFuaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhbmk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIC8v55uS5a2Q6KKr56e76Zmk5pe277yM5Zue5pS255uS5a2Q5Yiw5a+56LGh5rGg77yM5pa55L6/5LiL5qyh5aSN55So77yM5YeP5bCR5a+56LGh5Yib5bu65byA6ZSA44CCXHJcbiAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIoXCJkcm9wQm94XCIsIHRoaXMub3duZXIpO1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCBEcm9wQm94IGZyb20gXCIuL0Ryb3BCb3hcIjtcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcclxuLyoqXHJcbiAqIOa4uOaIj+aOp+WItuiEmuacrOOAguWumuS5ieS6huWHoOS4qmRyb3BCb3jvvIxidWxsZXTvvIxjcmVhdGVCb3hJbnRlcnZhbOetieWPmOmHj++8jOiDveWkn+WcqElEReaYvuekuuWPiuiuvue9ruivpeWPmOmHj1xyXG4gKiDmm7TlpJrnsbvlnovlrprkuYnvvIzor7flj4LogIPlrpjmlrnmlofmoaNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb250cm9sIGV4dGVuZHMgTGF5YS5TY3JpcHQge1xyXG4gICAgLyoqIEBwcm9wIHtuYW1lOmRyb3BCb3gsdGlwczpcIuaOieiQveWuueWZqOmihOWItuS9k+WvueixoVwiLHR5cGU6UHJlZmFifSovXHJcbiAgICBkcm9wQm94OiBMYXlhLlByZWZhYjtcclxuICAgIC8qKiBAcHJvcCB7bmFtZTpidWxsZXQsdGlwczpcIuWtkOW8uemihOWItuS9k+WvueixoVwiLHR5cGU6UHJlZmFifSovXHJcbiAgICBidWxsZXQ6IExheWEuUHJlZmFiO1xyXG4gICAgLyoqIEBwcm9wIHtuYW1lOmNyZWF0ZUJveEludGVydmFsLHRpcHM6XCLpl7TpmpTlpJrlsJHmr6vnp5LliJvlu7rkuIDkuKrkuIvot4znmoTlrrnlmahcIix0eXBlOmludCxkZWZhdWx0OjEwMDB9Ki9cclxuICAgIGNyZWF0ZUJveEludGVydmFsOiBudW1iZXIgPSAxMDAwO1xyXG4gICAgLyoq5byA5aeL5pe26Ze0Ki9cclxuICAgIHByaXZhdGUgX3RpbWU6IG51bWJlciA9IDA7XHJcbiAgICAvKirmmK/lkKblt7Lnu4/lvIDlp4vmuLjmiI8gKi9cclxuICAgIHByaXZhdGUgX3N0YXJ0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKuWtkOW8ueWSjOebkuWtkOaJgOWcqOeahOWuueWZqOWvueixoSAqL1xyXG4gICAgcHJpdmF0ZSBfZ2FtZUJveDogTGF5YS5TcHJpdGU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IHN1cGVyKCk7IH1cclxuXHJcbiAgICBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl90aW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB0aGlzLl9nYW1lQm94ID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcImdhbWVCb3hcIikgYXMgTGF5YS5TcHJpdGU7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCb3goKTtcclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAvL+avj+mXtOmalOS4gOauteaXtumXtOWIm+W7uuS4gOS4quebkuWtkFxyXG4gICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGlmIChub3cgLSB0aGlzLl90aW1lID4gdGhpcy5jcmVhdGVCb3hJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lID0gbm93O1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUJveCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVCb3goKTogdm9pZCB7XHJcbiAgICAgICAgLy/kvb/nlKjlr7nosaHmsaDliJvlu7rnm5LlrZBcclxuICAgICAgICBsZXQgYm94OiBMYXlhLlNwcml0ZSA9IExheWEuUG9vbC5nZXRJdGVtQnlDcmVhdGVGdW4oXCJkcm9wQm94XCIsIHRoaXMuZHJvcEJveC5jcmVhdGUsIHRoaXMuZHJvcEJveCk7XHJcbiAgICAgICAgYm94LnBvcyhNYXRoLnJhbmRvbSgpICogKExheWEuc3RhZ2Uud2lkdGggLSAxMDApLCAtMTAwKTtcclxuICAgICAgICB0aGlzLl9nYW1lQm94LmFkZENoaWxkKGJveCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TdGFnZUNsaWNrKGU6IExheWEuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICAvL+WBnOatouS6i+S7tuWGkuazoe+8jOaPkOmrmOaAp+iDve+8jOW9k+eEtuS5n+WPr+S7peS4jeimgVxyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgLy/oiJ7lj7Dooqvngrnlh7vlkI7vvIzkvb/nlKjlr7nosaHmsaDliJvlu7rlrZDlvLlcclxuICAgICAgICBsZXQgZmx5ZXI6IExheWEuU3ByaXRlID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNyZWF0ZUZ1bihcImJ1bGxldFwiLCB0aGlzLmJ1bGxldC5jcmVhdGUsIHRoaXMuYnVsbGV0KTtcclxuICAgICAgICBmbHllci5wb3MoTGF5YS5zdGFnZS5tb3VzZVgsIExheWEuc3RhZ2UubW91c2VZKTtcclxuICAgICAgICB0aGlzLl9nYW1lQm94LmFkZENoaWxkKGZseWVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirlvIDlp4vmuLjmiI/vvIzpgJrov4fmv4DmtLvmnKzohJrmnKzmlrnlvI/lvIDlp4vmuLjmiI8qL1xyXG4gICAgc3RhcnRHYW1lKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fc3RhcnRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq57uT5p2f5ri45oiP77yM6YCa6L+H6Z2e5r+A5rS75pys6ISa5pys5YGc5q2i5ri45oiPICovXHJcbiAgICBzdG9wR2FtZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCb3hJbnRlcnZhbCA9IDEwMDA7XHJcbiAgICAgICAgdGhpcy5fZ2FtZUJveC5yZW1vdmVDaGlsZHJlbigpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi8uLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IEdhbWVDb250cm9sIGZyb20gXCIuL0dhbWVDb250cm9sXCJcclxuLyoqXHJcbiAqIOacrOekuuS+i+mHh+eUqOmdnuiEmuacrOeahOaWueW8j+WunueOsO+8jOiAjOS9v+eUqOe7p+aJv+mhtemdouWfuuexu++8jOWunueOsOmhtemdoumAu+i+keOAguWcqElERemHjOmdouiuvue9ruWcuuaZr+eahFJ1bnRpbWXlsZ7mgKfljbPlj6/lkozlnLrmma/ov5vooYzlhbPogZRcclxuICog55u45q+U6ISa5pys5pa55byP77yM57un5om/5byP6aG16Z2i57G777yM5Y+v5Lul55u05o6l5L2/55So6aG16Z2i5a6a5LmJ55qE5bGe5oCn77yI6YCa6L+HSURF5YaFdmFy5bGe5oCn5a6a5LmJ77yJ77yM5q+U5aaCdGhpcy50aXBMYmxs77yMdGhpcy5zY29yZUxibO+8jOWFt+acieS7o+eggeaPkOekuuaViOaenFxyXG4gKiDlu7rorq7vvJrlpoLmnpzmmK/pobXpnaLnuqfnmoTpgLvovpHvvIzpnIDopoHpopHnuYHorr/pl67pobXpnaLlhoXlpJrkuKrlhYPntKDvvIzkvb/nlKjnu6fmib/lvI/lhpnms5XvvIzlpoLmnpzmmK/ni6znq4vlsI/mqKHlnZfvvIzlip/og73ljZXkuIDvvIzlu7rorq7nlKjohJrmnKzmlrnlvI/lrp7njrDvvIzmr5TlpoLlrZDlvLnohJrmnKzjgIJcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVVSSBleHRlbmRzIHVpLnRlc3QuVGVzdFNjZW5lVUkge1xyXG4gICAgLyoq6K6+572u5Y2V5L6L55qE5byV55So5pa55byP77yM5pa55L6/5YW25LuW57G75byV55SoICovXHJcbiAgICBzdGF0aWMgaW5zdGFuY2U6IEdhbWVVSTtcclxuICAgIC8qKuW9k+WJjea4uOaIj+enr+WIhuWtl+autSAqL1xyXG4gICAgcHJpdmF0ZSBfc2NvcmU6IG51bWJlcjtcclxuICAgIC8qKua4uOaIj+aOp+WItuiEmuacrOW8leeUqO+8jOmBv+WFjeavj+asoeiOt+WPlue7hOS7tuW4puadpeS4jeW/heimgeeahOaAp+iDveW8gOmUgCAqL1xyXG4gICAgcHJpdmF0ZSBfY29udHJvbDogR2FtZUNvbnRyb2w7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBHYW1lVUkuaW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICAgIC8v5YWz6Zet5aSa54K56Kem5o6n77yM5ZCm5YiZ5bCx5peg5pWM5LqGXHJcbiAgICAgICAgTGF5YS5Nb3VzZU1hbmFnZXIubXVsdGlUb3VjaEVuYWJsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb250cm9sID0gdGhpcy5nZXRDb21wb25lbnQoR2FtZUNvbnRyb2wpO1xyXG4gICAgICAgIC8v54K55Ye75o+Q56S65paH5a2X77yM5byA5aeL5ri45oiPXHJcbiAgICAgICAgdGhpcy50aXBMYmxsLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMub25UaXBDbGljayk7XHJcbiAgICB9XHJcblxyXG4gICAgb25UaXBDbGljayhlOiBMYXlhLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50aXBMYmxsLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zY29yZSA9IDA7XHJcbiAgICAgICAgdGhpcy5zY29yZUxibC50ZXh0ID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9jb250cm9sLnN0YXJ0R2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWinuWKoOWIhuaVsCAqL1xyXG4gICAgYWRkU2NvcmUodmFsdWU6IG51bWJlciA9IDEpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zY29yZSArPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNjb3JlTGJsLmNoYW5nZVRleHQoXCLliIbmlbDvvJpcIiArIHRoaXMuX3Njb3JlKTtcclxuICAgICAgICAvL+maj+edgOWIhuaVsOi2iumrmO+8jOmavuW6puWinuWkp1xyXG4gICAgICAgIGlmICh0aGlzLl9jb250cm9sLmNyZWF0ZUJveEludGVydmFsID4gNjAwICYmIHRoaXMuX3Njb3JlICUgMjAgPT0gMCkgdGhpcy5fY29udHJvbC5jcmVhdGVCb3hJbnRlcnZhbCAtPSAyMDtcclxuICAgIH1cclxuXHJcbiAgICAvKirlgZzmraLmuLjmiI8gKi9cclxuICAgIHN0b3BHYW1lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGlwTGJsbC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRpcExibGwudGV4dCA9IFwi5ri45oiP57uT5p2f5LqG77yM54K55Ye75bGP5bmV6YeN5paw5byA5aeLXCI7XHJcbiAgICAgICAgdGhpcy5fY29udHJvbC5zdG9wR2FtZSgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi4vdWkvbGF5YU1heFVJXCI7XHJcblxyXG5cclxuLy/kuLvnlYzpnaJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpblVJIGV4dGVuZHMgdWkuTWFpblNjZW5lVUkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigpOyB9XHJcblxyXG4gICAgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYWluVUkub25FbmFibGVcIilcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYWluVUkub25EaXNhYmxlXCIpXHJcbiAgICB9XHJcbn0iLCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0XzBfTmV0d29ya19Qcm90b2NvbEJ1ZmZlciB7XHJcbiAgICBwcml2YXRlIFByb3RvQnVmOiBhbnkgPSBMYXlhLkJyb3dzZXIud2luZG93LnByb3RvYnVmO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuUHJvdG9CdWYubG9hZChcIi4vcHJvdG9idWYvcHJvdG9maWxlL3Byb3RvZmlsZS5wcm90b1wiLCB0aGlzLm9uQXNzZXRzTG9hZGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQXNzZXRzTG9hZGVkKGVycjogYW55LCByb290OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgIC8vIE9idGFpbiBhIG1lc3NhZ2UgdHlwZVxyXG4gICAgICAgIHZhciBBd2Vzb21lTWVzc2FnZTogYW55ID0gcm9vdC5sb29rdXAoXCJQQk1hc3NhZ2UuQXdlc29tZU1lc3NhZ2VcIik7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyBtZXNzYWdlXHJcbiAgICAgICAgdmFyIG1lc3NhZ2U6IGFueSA9IEF3ZXNvbWVNZXNzYWdlLmNyZWF0ZShcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYXdlc29tZUZpZWxkOiBcIkF3ZXNvbWVTdHJpbmdcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gVmVyaWZ5IHRoZSBtZXNzYWdlIGlmIG5lY2Vzc2FyeSAoaS5lLiB3aGVuIHBvc3NpYmx5IGluY29tcGxldGUgb3IgaW52YWxpZClcclxuICAgICAgICB2YXIgZXJyTXNnOiBhbnkgPSBBd2Vzb21lTWVzc2FnZS52ZXJpZnkobWVzc2FnZSk7XHJcbiAgICAgICAgaWYgKGVyck1zZylcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoZXJyTXNnKTtcclxuXHJcbiAgICAgICAgLy8gRW5jb2RlIGEgbWVzc2FnZSB0byBhbiBVaW50OEFycmF5IChicm93c2VyKSBvciBCdWZmZXIgKG5vZGUpXHJcbiAgICAgICAgdmFyIGJ1ZmZlcjogYW55ID0gQXdlc29tZU1lc3NhZ2UuZW5jb2RlKG1lc3NhZ2UpLmZpbmlzaCgpO1xyXG4gICAgICAgIC8vIC4uLiBkbyBzb21ldGhpbmcgd2l0aCBidWZmZXJcclxuXHJcbiAgICAgICAgLy8gT3IsIGVuY29kZSBhIHBsYWluIG9iamVjdFxyXG4gICAgICAgIHZhciBidWZmZXI6IGFueSA9IEF3ZXNvbWVNZXNzYWdlLmVuY29kZShcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYXdlc29tZUZpZWxkOiBcIkF3ZXNvbWVTdHJpbmdcIlxyXG4gICAgICAgICAgICB9KS5maW5pc2goKTtcclxuICAgICAgICAvLyAuLi4gZG8gc29tZXRoaW5nIHdpdGggYnVmZmVyXHJcblxyXG5cclxuICAgICAgICAvLyBEZWNvZGUgYW4gVWludDhBcnJheSAoYnJvd3Nlcikgb3IgQnVmZmVyIChub2RlKSB0byBhIG1lc3NhZ2VcclxuICAgICAgICB2YXIgbWVzc2FnZTogYW55ID0gQXdlc29tZU1lc3NhZ2UuZGVjb2RlKGJ1ZmZlcik7XHJcbiAgICAgICAgLy8gLi4uIGRvIHNvbWV0aGluZyB3aXRoIG1lc3NhZ2VcclxuXHJcbiAgICAgICAgLy8gSWYgeW91ciBhcHBsaWNhdGlvbiB1c2VzIGxlbmd0aC1kZWxpbWl0ZWQgYnVmZmVycywgdGhlcmUgaXMgYWxzbyBlbmNvZGVEZWxpbWl0ZWQgYW5kIGRlY29kZURlbGltaXRlZC5cclxuICAgIH1cclxufSIsIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RfOV9UaW1lTGluZVVJXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8v5Yqg6L295Zu+6ZuG5oiQ5Yqf5ZCO77yM5omn6KGMb25Mb2Fk5Zue6LCD5pa55rOVXHJcbiAgICAgICAgTGF5YS5sb2FkZXIubG9hZChcInJlcy9hdGxhcy90ZXN0LmF0bGFzXCIsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Mb2FkZWQpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBvbkxvYWRlZCgpOnZvaWR7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLliqDovb3lm77pm4bmiJDlip/lkI7vvIzmiafooYxvbkxvYWTlm57osIPmlrnms5VcIilcclxuICAgICAgICAvL+WIm+W7uuS4gOS4qlVJ5a6e5L6LXHJcbiAgICAgICAgLy92YXIgcGxhbjpUaW1lTGluZVVJID0gbmV3IFRpbWVMaW5lVUkoKVxyXG4gICAgICAgIC8v5re75Yqg5Yiw6Iie5Y+wXHJcbiAgICAgICAgLy9MYXlhLnN0YWdlLmFkZENoaWxkKHBsYW4pO1xyXG4gICAgICAgIC8v5pKt5pS+VUnlnLrmma/kuK3nmoTliqjnlLtcclxuICAgICAgICAvL3RoaXMuYmVhci5wbGF5KCk7XHJcbiAgICB9XHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG52YXIgUkVHOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcbmV4cG9ydCBtb2R1bGUgdWkge1xyXG4gICAgZXhwb3J0IGNsYXNzIE1haW5TY2VuZVVJIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJNYWluU2NlbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuTWFpblNjZW5lVUlcIixNYWluU2NlbmVVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgVGltZUxpbmVVSSBleHRlbmRzIERpYWxvZyB7XHJcblx0XHRwdWJsaWMgYmVhcjpMYXlhLkFuaW1hdGlvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIlRpbWVMaW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLlRpbWVMaW5lVUlcIixUaW1lTGluZVVJKTtcclxufVxyXG5leHBvcnQgbW9kdWxlIHVpLnRlc3Qge1xyXG4gICAgZXhwb3J0IGNsYXNzIFRlc3RTY2VuZVVJIGV4dGVuZHMgU2NlbmUge1xyXG5cdFx0cHVibGljIHNjb3JlTGJsOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIHRpcExibGw6TGF5YS5MYWJlbDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcInRlc3QvVGVzdFNjZW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLnRlc3QuVGVzdFNjZW5lVUlcIixUZXN0U2NlbmVVSSk7XHJcbn1cciJdfQ==
