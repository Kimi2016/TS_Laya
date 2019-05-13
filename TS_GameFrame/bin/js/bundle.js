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
var Browser = Laya.Browser;
var WebGL = Laya.WebGL;
var Stage = Laya.Stage;
var GameConfig_1 = require("./GameConfig");
var Test_12_TiledMap_1 = require("./study/Test_12_TiledMap");
//启动类
var AppMain = /** @class */ (function () {
    function AppMain() {
        //根据IDE设置初始化引擎		
        if (window["Laya3D"]) {
            Laya3D.init(GameConfig_1.default.width, GameConfig_1.default.height);
        }
        else {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
            //Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
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
        //销毁当前没有被使用的资源,该函数会忽略lock=true的资源。
        //Laya.Resource.destroyUnusedResources();
    }
    AppMain.prototype.onVersionLoaded = function () {
        //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    };
    AppMain.prototype.onConfigLoaded = function () {
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
        //new Test_0_Network_ProtocolBuffer();
        new Test_12_TiledMap_1.default();
        //new Test_13_DomElement();
        //new Test_14_Shader();
    };
    return AppMain;
}());
//激活启动类
new AppMain();
},{"./GameConfig":7,"./study/Test_12_TiledMap":9}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observer = /** @class */ (function () {
    function Observer(context, callback) {
        /** 上下文 */
        this.context = null;
        /** 回调函数 */
        this.callback = null;
        this.context = context;
        this.callback = callback;
    }
    /**
     * 重置
     * @param context 上下文
     * @param callback 回调函数
     */
    Observer.prototype.reset = function (context, callback) {
        if (context === void 0) { context = null; }
        if (callback === void 0) { callback = null; }
        this.context = context;
        this.callback = callback;
    };
    /**
     * 发送通知
     * @param args 不定参数
     */
    Observer.prototype.notify = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a;
        (_a = this.callback).call.apply(_a, [this.context].concat(args));
    };
    /**
     * 上下文比较
     * @param context 上下文
     */
    Observer.prototype.compar = function (context) {
        return context == this.context;
    };
    return Observer;
}());
var NetEventDispatcher = /** @class */ (function () {
    function NetEventDispatcher() {
        /** 监听数组 */
        this.listeners = {};
        /** 移除数组 */
        this.removeListeners = [];
    }
    NetEventDispatcher.getInstance = function () {
        return this.instance || (this.instance = new this());
    };
    NetEventDispatcher.prototype.register = function (messageID, context, callback) {
        var observers = this.listeners[messageID];
        if (!observers) {
            this.listeners[messageID] = [];
        }
        if (this.removeListeners.length > 0) {
            var observer = this.removeListeners.pop();
            observer.reset(context, callback);
            this.listeners[messageID].push(observer);
        }
        else {
            this.listeners[messageID].push(new Observer(context, callback));
        }
    };
    NetEventDispatcher.prototype.unRegister = function (messageID, context, callback) {
        var observers = this.listeners[messageID];
        if (!observers) {
            return;
        }
        for (var i = 0, length_1 = observers.length; i < length_1; i++) {
            var observer = observers[i];
            if (observer.compar(context)) {
                observers.splice(i, 1);
                observer.reset();
                this.removeListeners.push(observer);
                break;
            }
        }
        if (observers.length == 0) {
            delete this.listeners[messageID];
        }
    };
    NetEventDispatcher.prototype.dispatch = function (messageID) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var observers = this.listeners[messageID];
        if (!observers) {
            return;
        }
        for (var i = 0, length_2 = observers.length; i < length_2; i++) {
            var observer = observers[i];
            observer.notify.apply(observer, [messageID].concat(args));
        }
    };
    NetEventDispatcher.prototype.ClearAll = function () {
        this.listeners = {};
    };
    return NetEventDispatcher;
}());
exports.default = NetEventDispatcher;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Protobuf 消息名称匹配
 */
var NetMessageName = /** @class */ (function () {
    function NetMessageName() {
    }
    NetMessageName.getMap = function () {
        if (NetMessageName.isInit) {
            return NetMessageName.messageMap;
        }
        NetMessageName.isInit = true;
        //MessageName
        var map = NetMessageName.messageMap;
        map[210 /* GM_VERIFY_VERSION */] = 'GM_VerifyVersion';
        map[211 /* GM_VERSION_RETURN */] = 'GM_VerifyVersionReturn';
        return map;
    };
    NetMessageName.messageMap = {};
    NetMessageName.isInit = false;
    return NetMessageName;
}());
exports.default = NetMessageName;
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Byte = Laya.Byte;
var NetPacket = /** @class */ (function () {
    function NetPacket(connect) {
        //private WEBPACK_HEAD_OFFSET: number = 0	// 自定义数据 一般是roleid (long类型)
        //private WEBPACK_MESSSAGEID_OFFSET: number = 8	// 消息id
        //private WEBPACK_LENGTH_OFFSET: number = 12	// 消息长度
        this.WEBPACK_HEAD_SIZE = 16; // 消息数据开始位置
        this.socketConnect = connect;
        this.readBytes = new Byte();
        this.readBytes.endian = Laya.Byte.LITTLE_ENDIAN; //这里我们采用小端
    }
    //接收服务器信息
    NetPacket.prototype.receiveMsg = function (bytes) {
        this.readBytes.writeArrayBuffer(bytes);
        this.readBytes.pos = 0; //设置偏移指针
        //按照服务器传递过来的数据，按照顺序读取
        this.roleId = this.readBytes.getFloat64();
        this.messageId = this.readBytes.getInt32();
        var msgLength = this.readBytes.getInt32();
        //let ab = this.readBytes.readArrayBuffer(msgLength - this.WEBPACK_HEAD_SIZE)
        //let buffer = new Uint8Array(ab)
        //this.message = this.socketConnect.deserialize(this.messageId, buffer)
        var uint8Array = this.readBytes.readUint8Array(this.WEBPACK_HEAD_SIZE, msgLength - this.WEBPACK_HEAD_SIZE);
        this.message = this.socketConnect.deserialize(this.messageId, uint8Array);
        //if (msgLength != this.readBytes.length) {
        //    console.error("消息长不一样")
        //}
        this.readBytes.clear();
    };
    return NetPacket;
}());
exports.default = NetPacket;
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketConnect_1 = require("./SocketConnect");
var GameClient = /** @class */ (function () {
    function GameClient(id) {
        this.clientId = id;
    }
    GameClient.prototype.connect = function (host, port) {
        this.socketConnect = new SocketConnect_1.default(" clientId:" + this.clientId);
        this.socketConnect.connect(host, port);
    };
    GameClient.prototype.connectByUrl = function (url) {
        this.socketConnect = new SocketConnect_1.default(" clientId:" + this.clientId);
        this.socketConnect.connectByUrl(url);
    };
    GameClient.prototype.reconnect = function () {
        this.socketConnect.reconnect();
    };
    GameClient.prototype.disconnected = function () {
        this.socketConnect.disconnected();
    };
    GameClient.prototype.isConnected = function () {
        return this.socketConnect.connected();
    };
    GameClient.prototype.sendEmpty = function (msgId) {
        this.socketConnect.sendEmpty(msgId);
    };
    GameClient.prototype.sendMessage = function (msgId, msg) {
        this.socketConnect.sendMessage(msgId, msg);
    };
    GameClient.prototype.onConnectCallback = function (callback) {
        this.socketConnect.onConnect = callback;
    };
    GameClient.prototype.onDisconnectCallback = function (callback) {
        this.socketConnect.onDisconnect = callback;
    };
    return GameClient;
}());
var NetworkManager = /** @class */ (function () {
    function NetworkManager() {
        this.gameClientMap = {};
    }
    NetworkManager.getInstance = function () {
        return this.instance || (this.instance = new this());
    };
    /**
     * 获取角色ID
     */
    NetworkManager.prototype.getRoleId = function () {
        return Math.pow(2, 53) - 1;
    };
    NetworkManager.prototype.createClient = function (clientID, url) {
        var client = new GameClient(clientID);
        client.connectByUrl(url);
        this.gameClientMap[0 /* login */] = client;
        return client;
    };
    NetworkManager.prototype.getClient = function (clientID) {
        if (this.gameClientMap[clientID] != null) {
            return this.gameClientMap[clientID];
        }
        return null;
    };
    NetworkManager.prototype.closeClient = function (clientID) {
        var client = this.getClient(0 /* login */);
        if (client) {
            client.disconnected();
        }
    };
    NetworkManager.prototype.reconnectClient = function (clientID) {
        var client = this.getClient(0 /* login */);
        if (client) {
            client.reconnect();
        }
    };
    NetworkManager.prototype.loginSendMessage = function (msgId, msg) {
        this.sendMessage(msgId, msg, 0 /* login */);
    };
    NetworkManager.prototype.logicSendMessage = function (msgId, msg) {
        this.sendMessage(msgId, msg, 1 /* logic */);
    };
    NetworkManager.prototype.sceneSendMessage = function (msgId, msg) {
        this.sendMessage(msgId, msg, 2 /* scene */);
    };
    NetworkManager.prototype.sendMessage = function (msgId, msg, clientID) {
        var client = this.getClient(clientID);
        if (client) {
            client.sendMessage(msgId, msg);
        }
    };
    NetworkManager.prototype.sendMessageEmpty = function (msgId) {
        var client = null;
        if (msgId > 199 /* GM_ACCOUNT_SERVER_MESSAGE_START */ && msgId < 399 /* GM_ACCOUNT_SERVER_MESSAGE_END */) {
            client = this.getClient(0 /* login */);
        }
        else {
            client = this.getClient(1 /* logic */);
        }
        if (client) {
            client.sendEmpty(msgId);
        }
    };
    NetworkManager.prototype.clearAllGameClient = function () {
        var dic = this.gameClientMap;
        for (var key in dic) {
            if (dic.hasOwnProperty(key)) {
                var element = dic[key];
                element.disconnected();
            }
        }
        this.gameClientMap = {};
    };
    return NetworkManager;
}());
exports.default = NetworkManager;
},{"./SocketConnect":6}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetEventDispatcher_1 = require("../Event/NetEventDispatcher");
var NetPacket_1 = require("./NetPacket");
var NetworkManager_1 = require("./NetworkManager");
var NetMessageName_1 = require("./NetMessageName");
var SocketConnect = /** @class */ (function () {
    //private sendNetPacket: Array<NetPacket> = null
    //private receiveNetPacket: Array<NetPacket> = null
    function SocketConnect(tips) {
        //private WEBPACK_HEAD_OFFSET: number = 0	// 自定义数据 一般是roleid (long类型)
        //private WEBPACK_MESSSAGEID_OFFSET: number = 8	// 消息id
        //private WEBPACK_LENGTH_OFFSET: number = 12	// 消息长度
        this.WEBPACK_HEAD_SIZE = 16; // 消息数据开始位置
        this.socket = null;
        this.sendBytes = null;
        this.readBytes = null;
        this.tempBytes = null;
        this.url = null;
        this.tips = null;
        this.pbMessageName = null;
        this.protoRoot = null;
        this.onConnect = null;
        this.onDisconnect = null;
        this.tips = tips;
        this.sendBytes = new Laya.Byte();
        this.sendBytes.endian = Laya.Byte.LITTLE_ENDIAN; //这里我们采用小端
        this.tempBytes = new Laya.Byte();
        this.tempBytes.endian = Laya.Byte.LITTLE_ENDIAN; //这里我们采用小端
        //this.sendNetPacket = new Array<NetPacket>() //发送的网络包
        //this.receiveNetPacket = new Array<NetPacket>() //接收的网络包
        this.protoRoot = Laya.Browser.window["PBMessage"];
        this.pbMessageName = NetMessageName_1.default.getMap();
    }
    SocketConnect.prototype.connect = function (host, port) {
        this.url = host.concat(port.toString());
        this.connectByUrl(this.url);
    };
    //"ws://localhost:8989"
    SocketConnect.prototype.connectByUrl = function (url) {
        this.url = url;
        this.socket = new Laya.Socket();
        this.socket.endian = Laya.Byte.LITTLE_ENDIAN; //这里我们采用小端
        this.socket.connectByUrl(url);
        this.socket.on(Laya.Event.OPEN, this, this.openHandler);
        this.socket.on(Laya.Event.MESSAGE, this, this.receiveHandler);
        this.socket.on(Laya.Event.CLOSE, this, this.closeHandler);
        this.socket.on(Laya.Event.ERROR, this, this.errorHandler);
    };
    //重新连接
    SocketConnect.prototype.reconnect = function () {
        this.socket.cleanSocket();
        this.connectByUrl(this.url);
    };
    //断开连接
    SocketConnect.prototype.disconnected = function () {
        this.socket.close();
    };
    //是否连接
    SocketConnect.prototype.connected = function () {
        return this.socket.connected;
    };
    //正确建立连接
    SocketConnect.prototype.openHandler = function (event) {
        if (event === void 0) { event = null; }
        console.log(this.url + this.tips + "  正确建立连接");
        if (this.onConnect) {
            this.onConnect();
        }
    };
    //关闭连接事件
    SocketConnect.prototype.closeHandler = function (event) {
        if (event === void 0) { event = null; }
        console.log(this.url + this.tips + " 关闭连接事件");
        if (this.onDisconnect) {
            this.onDisconnect();
        }
    };
    //连接出错
    SocketConnect.prototype.errorHandler = function (e) {
        if (e === void 0) { e = null; }
        console.log(this.url + this.tips + " 连接出错");
    };
    //发送空消息
    SocketConnect.prototype.sendEmpty = function (msgId) {
        // 写入一个数字0
        this.tempBytes.writeFloat32(0);
        this.send(msgId, this.tempBytes);
        this.tempBytes.clear();
    };
    //发送消息
    SocketConnect.prototype.sendMessage = function (msgId, msg) {
        //if (typeof msg == "string") {
        //    this.tempBytes.writeUTFString(msg)
        //    this.send(msgId, this.tempBytes)
        //}
        //else if (msg instanceof ArrayBuffer) {
        //    this.tempBytes.writeArrayBuffer(buffer)
        //    this.send(msgId, this.tempBytes)
        //}
        //else
        {
            var buffer = this.serialize(msgId, msg);
            this.tempBytes.writeArrayBuffer(buffer);
            this.send(msgId, this.tempBytes);
        }
    };
    //需要发送的数据
    SocketConnect.prototype.send = function (msgId, byte) {
        if (!this.socket.connected) {
            console.log("The connection has been disconnected.");
            return;
        }
        //WEBPACK_HEAD_OFFSET
        this.sendBytes.writeFloat64(NetworkManager_1.default.getInstance().getRoleId());
        //WEBPACK_MESSSAGEID_OFFSET
        this.sendBytes.writeInt32(msgId);
        //WEBPACK_LENGTH_OFFSET
        this.sendBytes.writeInt32(this.WEBPACK_HEAD_SIZE + byte.length);
        //Massge body
        this.sendBytes.writeArrayBuffer(byte.buffer);
        //这里是把字节数组的数据通过socket发送给服务器
        this.socket.send(this.sendBytes.buffer);
        //清除掉数据，方便下次读写
        this.sendBytes.clear();
        this.tempBytes.clear();
    };
    //接收到数据
    SocketConnect.prototype.receiveHandler = function (msg) {
        //console.log("Message from server:  " + new Laya.Byte(msg).readUTFBytes())
        var netPacket = new NetPacket_1.default(this);
        netPacket.receiveMsg(msg);
        this.socket.input.clear();
        NetEventDispatcher_1.default.getInstance().dispatch(netPacket.messageId, netPacket);
    };
    /**
     * 序列化 protocol-buffer
     * @param massageId
     * @param massage
     */
    SocketConnect.prototype.serialize = function (massageId, massage) {
        var massageName = this.pbMessageName[massageId];
        // Encode a message to an Uint8Array (browser) or Buffer (node)
        var buffer = this.protoRoot[massageName].encode(massage).finish();
        return buffer;
    };
    /**
     * 反序列化 protocol-buffer
     * @param massageName
     * @param netPackage NetPackage
     */
    SocketConnect.prototype.deserialize = function (massageId, massage) {
        var massageName = this.pbMessageName[massageId];
        // Decode an Uint8Array (browser) or Buffer (node) to a message
        var message = this.protoRoot[massageName].decode(massage);
        return message;
    };
    return SocketConnect;
}());
exports.default = SocketConnect;
},{"../Event/NetEventDispatcher":2,"./NetMessageName":3,"./NetPacket":4,"./NetworkManager":5}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
var MainUI_1 = require("./script/MainUI");
var Test_9_TimeLineUI_1 = require("./study/Test_9_TimeLineUI");
/*
* 游戏初始化配置;
*/
var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    GameConfig.init = function () {
        var reg = Laya.ClassUtils.regClass;
        reg("script/MainUI.ts", MainUI_1.default);
        reg("study/Test_9_TimeLineUI.ts", Test_9_TimeLineUI_1.default);
    };
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedheight";
    GameConfig.screenMode = "horizontal";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "MainScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = true;
    GameConfig.stat = true;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./script/MainUI":8,"./study/Test_9_TimeLineUI":10}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("../ui/layaMaxUI");
var NetworkManager_1 = require("../Framework/Network/NetworkManager");
var NetEventDispatcher_1 = require("../Framework/Event/NetEventDispatcher");
//主界面
var MainUI = /** @class */ (function (_super) {
    __extends(MainUI, _super);
    function MainUI() {
        return _super.call(this) || this;
    }
    MainUI.prototype.onEnable = function () {
        console.log("MainUI.onEnable");
        console.log(211 /* GM_VERSION_RETURN */);
        NetEventDispatcher_1.default.getInstance().register(211 /* GM_VERSION_RETURN */, this, this.GM_VerifyVersionReturn);
    };
    MainUI.prototype.onDisable = function () {
        console.log("MainUI.onDisable");
        NetEventDispatcher_1.default.getInstance().unRegister(211 /* GM_VERSION_RETURN */, this, this.GM_VerifyVersionReturn);
    };
    MainUI.prototype.GM_VerifyVersionReturn = function (netPackage) {
        console.log(netPackage.messageId + "  " + netPackage.message);
    };
    MainUI.prototype.onAwake = function () {
        console.log("Precision safe." + (Math.pow(2, 53) - 1));
        //var msg = {
        //    version: "1.5.4",				//客户端版本号
        //    platform: 9007199254740991,             ///平台
        //    istest: 0,///    0、正常，1、测试，不需要验证版本
        //}
        //var root = Laya.Browser.window["PBMessage"];
        //var pbMessageName = GameMessageName.getMap()
        //var buffer: any = root[pbMessageName[GameMessage.GM_VERIFY_VERSION]].encode(msg).finish();
        //console.log(buffer);
        //
        NetworkManager_1.default.getInstance().createClient(0, "ws://192.168.2.126:50000");
        //定时执行一次(间隔时间)
        Laya.timer.once(2000, this, this.testNetwork);
    };
    MainUI.prototype.testNetwork = function () {
        console.log("testNetwork()");
        var msg = {
            version: "1.5.4",
            platform: 9007199254740991,
            istest: 0,
        };
        NetworkManager_1.default.getInstance().loginSendMessage(210 /* GM_VERIFY_VERSION */, msg);
    };
    return MainUI;
}(layaMaxUI_1.ui.MainSceneUI));
exports.default = MainUI;
},{"../Framework/Event/NetEventDispatcher":2,"../Framework/Network/NetworkManager":5,"../ui/layaMaxUI":11}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Test_12_TiledMap = /** @class */ (function () {
    function Test_12_TiledMap() {
        this.scaleValue = 0;
        this.MapX = 0;
        this.MapY = 0;
        console.log("Test_12_TiledMap");
        //初始化舞台
        Laya.init(Laya.Browser.width, Laya.Browser.height, Laya.WebGL);
        //创建TiledMap实例
        this.tMap = new Laya.TiledMap();
        //创建Rectangle实例，视口区域
        var viewRect = new Laya.Rectangle();
        //创建TiledMap地图，加载orthogonal.json后，执行回调方法onMapLoaded()
        this.tMap.createMap("res/TiledMap/orthogonal.json", viewRect, Laya.Handler.create(this, this.onMapLoaded));
    }
    Test_12_TiledMap.prototype.onMapLoaded = function () {
        console.log("onMapLoaded");
        //设置缩放中心点为视口的左上角
        this.tMap.setViewPortPivotByScale(0, 0);
        //将原地图放大3倍
        this.tMap.scale = 2;
        Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        this.resize();
    };
    /**
     * 移动地图视口
     */
    Test_12_TiledMap.prototype.mouseMove = function () {
        var moveX = this.MapX - (Laya.stage.mouseX - this.mLastMouseX);
        var moveY = this.MapY - (Laya.stage.mouseY - this.mLastMouseY);
        //移动地图视口
        this.tMap.moveViewPort(moveX, moveY);
    };
    Test_12_TiledMap.prototype.mouseUp = function () {
        this.MapX = this.MapX - (Laya.stage.mouseX - this.mLastMouseX);
        this.MapY = this.MapY - (Laya.stage.mouseY - this.mLastMouseY);
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
    };
    Test_12_TiledMap.prototype.mouseDown = function () {
        this.mLastMouseX = Laya.stage.mouseX;
        this.mLastMouseY = Laya.stage.mouseY;
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
    };
    /**
     *  改变视口大小
     *  重设地图视口区域
     */
    Test_12_TiledMap.prototype.resize = function () {
        //改变视口大小
        this.tMap.changeViewPort(this.MapX, this.MapY, Laya.Browser.width, Laya.Browser.height);
    };
    return Test_12_TiledMap;
}());
exports.default = Test_12_TiledMap;
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkc6L0xheWEvTGF5YUFpcklERV9iZXRhL3Jlc291cmNlcy9hcHAvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9BcHBNYWluLnRzIiwic3JjL0ZyYW1ld29yay9FdmVudC9OZXRFdmVudERpc3BhdGNoZXIudHMiLCJzcmMvRnJhbWV3b3JrL05ldHdvcmsvTmV0TWVzc2FnZU5hbWUudHMiLCJzcmMvRnJhbWV3b3JrL05ldHdvcmsvTmV0UGFja2V0LnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL05ldHdvcmtNYW5hZ2VyLnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL1NvY2tldENvbm5lY3QudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9zY3JpcHQvTWFpblVJLnRzIiwic3JjL3N0dWR5L1Rlc3RfMTJfVGlsZWRNYXAudHMiLCJzcmMvc3R1ZHkvVGVzdF85X1RpbWVMaW5lVUkudHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1ZBLElBQU8sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDN0IsSUFBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtBQUN6QixJQUFPLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO0FBa0J6QiwyQ0FBc0M7QUFLdEMsNkRBQXdEO0FBSXhELEtBQUs7QUFDTDtJQUNJO1FBQ0ksZ0JBQWdCO1FBQ2hCLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQVUsQ0FBQyxLQUFLLEVBQUUsb0JBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwRDthQUNJO1lBQ0QsdUJBQXVCO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxPQUFP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QU0sQ0FBQztBQUMxQixJQUFPLEtBQUssR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3hCLElBQUksR0FBRyxHQUFhLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO0FBQzdDLElBQWMsRUFBRSxDQWtCZjtBQWxCRCxXQUFjLEVBQUU7SUFDWjtRQUFpQywrQkFBSztRQUNsQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsb0NBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FOQSxBQU1DLENBTmdDLEtBQUssR0FNckM7SUFOWSxjQUFXLGNBTXZCLENBQUE7SUFDRCxHQUFHLENBQUMsZ0JBQWdCLEVBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEM7UUFBZ0MsOEJBQU07UUFFbEM7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLG1DQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFDTCxpQkFBQztJQUFELENBUEEsQUFPQyxDQVArQixNQUFNLEdBT3JDO0lBUFksYUFBVSxhQU90QixDQUFBO0lBQ0QsR0FBRyxDQUFDLGVBQWUsRUFBQyxVQUFVLENBQUMsQ0FBQztBQUNwQyxDQUFDLEVBbEJhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQWtCZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgQnJvd3NlciA9IExheWEuQnJvd3NlclxyXG5pbXBvcnQgV2ViR0wgPSBMYXlhLldlYkdMXHJcbmltcG9ydCBTdGFnZSA9IExheWEuU3RhZ2VcclxuXHJcbmltcG9ydCBUZXN0XzFfVGV4dCBmcm9tICcuL3N0dWR5L1Rlc3RfMV9UZXh0JztcclxuaW1wb3J0IFRlc3RfMl9JbnB1dFRlc3QgZnJvbSAnLi9zdHVkeS9UZXN0XzJfSW5wdXRUZXN0JztcclxuaW1wb3J0IFRlc3RfM19CaXRtYXBGb250IGZyb20gJy4vc3R1ZHkvVGVzdF8zX0JpdG1hcEZvbnQnO1xyXG5pbXBvcnQgVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8xX1Nwcml0ZV9EaXNwbGF5SW1hZ2UnO1xyXG5pbXBvcnQgVGVzdF80XzFfU3ByaXRlX1N3aXRjaFRleHR1cmUgZnJvbSAnLi9zdHVkeS9UZXN0XzRfMV9TcHJpdGVfU3dpdGNoVGV4dHVyZSc7XHJcbmltcG9ydCBUZXN0XzRfMl9TcHJpdGVfRGlzcGxheUltYWdlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzJfU3ByaXRlX0Rpc3BsYXlJbWFnZSc7XHJcbmltcG9ydCBUZXN0XzRfMl9TcHJpdGVfU3dpdGNoVGV4dHVyZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlJztcclxuaW1wb3J0IFRlc3RfNF9NYXNrRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfNF9NYXNrRGVtbyc7XHJcbmltcG9ydCBUZXN0XzVfMV9Db2xvckZpbHRlciBmcm9tICcuL3N0dWR5L1Rlc3RfNV8xX0NvbG9yRmlsdGVyJztcclxuaW1wb3J0IFRlc3RfNV8yX0dsb3dGaWx0ZXIgZnJvbSAnLi9zdHVkeS9UZXN0XzVfMl9HbG93RmlsdGVyJztcclxuaW1wb3J0IFRlc3RfNl8xX1Nwcml0ZV9EcmF3U2hhcGVzIGZyb20gJy4vc3R1ZHkvVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMnO1xyXG5pbXBvcnQgVGVzdF83X0F0bGFzQW5pRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfN19BdGxhc0FuaURlbW8nO1xyXG5pbXBvcnQgVGVzdF84X1R3ZWVuRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfOF9Ud2VlbkRlbW8nO1xyXG5pbXBvcnQgVGVzdF85X1RpbWVMaW5lIGZyb20gJy4vc3R1ZHkvVGVzdF85X1RpbWVMaW5lJztcclxuaW1wb3J0IFRlc3RfOV9UaW1lTGluZVVJIGZyb20gJy4vc3R1ZHkvVGVzdF85X1RpbWVMaW5lVUknO1xyXG5pbXBvcnQgVGVzdF8xMV9Tb3VuZCBmcm9tICcuL3N0dWR5L1Rlc3RfMTFfU291bmQnO1xyXG5pbXBvcnQgR2FtZUNvbmZpZyBmcm9tICcuL0dhbWVDb25maWcnO1xyXG5pbXBvcnQgVGVzdF8wXzFfQ2hhbm5lbCBmcm9tICcuL3N0dWR5L1Rlc3RfMF8xX0NoYW5uZWwnO1xyXG5pbXBvcnQgVGVzdF8wXzFfU29ja2V0IGZyb20gJy4vc3R1ZHkvVGVzdF8wXzFfU29ja2V0JztcclxuaW1wb3J0IFRlc3RfMF9OZXR3b3JrX1Byb3RvY29sQnVmZmVyIGZyb20gJy4vc3R1ZHkvVGVzdF8wX05ldHdvcmtfUHJvdG9jb2xCdWZmZXInO1xyXG5pbXBvcnQgTmV0d29ya01hbmFnZXIgZnJvbSAnLi9GcmFtZXdvcmsvTmV0d29yay9OZXR3b3JrTWFuYWdlcic7XHJcbmltcG9ydCBUZXN0XzEyX1RpbGVkTWFwIGZyb20gJy4vc3R1ZHkvVGVzdF8xMl9UaWxlZE1hcCc7XHJcbmltcG9ydCBUZXN0XzEzX0RvbUVsZW1lbnQgZnJvbSAnLi9zdHVkeS9UZXN0XzEzX0RvbUVsZW1lbnQnO1xyXG5pbXBvcnQgVGVzdF8xNF9TaGFkZXIgZnJvbSAnLi9zdHVkeS9UZXN0XzE0X1NoYWRlcic7XHJcblxyXG4vL+WQr+WKqOexu1xyXG5jbGFzcyBBcHBNYWluIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8v5qC55o2uSURF6K6+572u5Yid5aeL5YyW5byV5pOOXHRcdFxyXG4gICAgICAgIGlmICh3aW5kb3dbXCJMYXlhM0RcIl0pIHtcclxuICAgICAgICAgICAgTGF5YTNELmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5LiN5pSv5oyBV2ViR0zml7boh6rliqjliIfmjaLoh7NDYW52YXNcclxuICAgICAgICAgICAgTGF5YS5pbml0KEJyb3dzZXIuY2xpZW50V2lkdGgsIEJyb3dzZXIuY2xpZW50SGVpZ2h0LCBXZWJHTCk7XHJcbiAgICAgICAgICAgIC8vTGF5YS5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0LCBMYXlhW1wiV2ViR0xcIl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBMYXlhW1wiUGh5c2ljc1wiXSAmJiBMYXlhW1wiUGh5c2ljc1wiXS5lbmFibGUoKTtcclxuICAgICAgICBMYXlhW1wiRGVidWdQYW5lbFwiXSAmJiBMYXlhW1wiRGVidWdQYW5lbFwiXS5lbmFibGUoKTtcclxuXHJcblxyXG4gICAgICAgIC8v5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iVxyXG4gICAgICAgIGlmIChHYW1lQ29uZmlnLmRlYnVnIHx8IExheWEuVXRpbHMuZ2V0UXVlcnlTdHJpbmcoXCJkZWJ1Z1wiKSA9PSBcInRydWVcIikgTGF5YS5lbmFibGVEZWJ1Z1BhbmVsKCk7XHJcbiAgICAgICAgaWYgKEdhbWVDb25maWcucGh5c2ljc0RlYnVnICYmIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdKSBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXS5lbmFibGUoKTtcclxuICAgICAgICBpZiAoR2FtZUNvbmZpZy5zdGF0KSBMYXlhLlN0YXQuc2hvdygpO1xyXG5cclxuICAgICAgICAvL+ihqOekuuaYr+WQpuaNleiOt+WFqOWxgOmUmeivr+W5tuW8ueWHuuaPkOekuuOAglxyXG4gICAgICAgIExheWEuYWxlcnRHbG9iYWxFcnJvciA9IHRydWU7XHJcblxyXG4gICAgICAgIC8v5r+A5rS76LWE5rqQ54mI5pys5o6n5Yi277yMdmVyc2lvbi5qc29u55SxSURF5Y+R5biD5Yqf6IO96Ieq5Yqo55Sf5oiQ77yM5aaC5p6c5rKh5pyJ5Lmf5LiN5b2x5ZON5ZCO57ut5rWB56iLXHJcbiAgICAgICAgTGF5YS5SZXNvdXJjZVZlcnNpb24uZW5hYmxlKFwidmVyc2lvbi5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vblZlcnNpb25Mb2FkZWQpLCBMYXlhLlJlc291cmNlVmVyc2lvbi5GSUxFTkFNRV9WRVJTSU9OKTtcclxuXHJcblxyXG4gICAgICAgIExheWEuc3RhZ2UuYWxpZ25WID0gU3RhZ2UuQUxJR05fTUlERExFO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWxpZ25IID0gU3RhZ2UuQUxJR05fQ0VOVEVSO1xyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gR2FtZUNvbmZpZy5zY2FsZU1vZGU7Ly9TdGFnZS5TQ0FMRV9GVUxMOy8vU0NBTEVfRklYRURfSEVJR0hUXHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gR2FtZUNvbmZpZy5zY3JlZW5Nb2RlOy8vU3RhZ2UuU0NSRUVOX0hPUklaT05UQUw7Ly9TQ1JFRU5fVkVSVElDQUxcclxuICAgICAgICBMYXlhLnN0YWdlLmJnQ29sb3IgPSBcIiM3ZjdmN2ZcIjtcclxuXHJcbiAgICAgICAgLy/lhbzlrrnlvq7kv6HkuI3mlK/mjIHliqDovb1zY2VuZeWQjue8gOWcuuaZr1xyXG4gICAgICAgIExheWEuVVJMLmV4cG9ydFNjZW5lVG9Kc29uID0gR2FtZUNvbmZpZy5leHBvcnRTY2VuZVRvSnNvbjtcclxuXHJcbiAgICAgICAgLy/lpoLmnpzpgJrov4forr7lpIfpnZnpn7PplK7orqnpn7PpopHoh6rliqjot5/pmo/orr7lpIfpnZnpn7PjgILpnIDopoHlsIZ1c2VBdWRpb011c2lj6K6+572u5Li6ZmFsc2XjgIJcclxuICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci51c2VBdWRpb011c2ljID0gZmFsc2U7XHJcbiAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIuYXV0b1N0b3BNdXNpYyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvL+a2iOmZpOefoumHj+e7mOWItueahOmUr+m9v++8jOS9huS8muWinuWKoOaAp+iDvea2iOiAl1xyXG4gICAgICAgIC8vQ29uZmlnLmlzQW50aWFsaWFzPXRydWU7XHJcblxyXG4gICAgICAgIC8v6ZSA5q+B5b2T5YmN5rKh5pyJ6KKr5L2/55So55qE6LWE5rqQLOivpeWHveaVsOS8muW/veeVpWxvY2s9dHJ1ZeeahOi1hOa6kOOAglxyXG4gICAgICAgIC8vTGF5YS5SZXNvdXJjZS5kZXN0cm95VW51c2VkUmVzb3VyY2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25WZXJzaW9uTG9hZGVkKCk6IHZvaWQge1xyXG4gICAgICAgIC8v5r+A5rS75aSn5bCP5Zu+5pig5bCE77yM5Yqg6L295bCP5Zu+55qE5pe25YCZ77yM5aaC5p6c5Y+R546w5bCP5Zu+5Zyo5aSn5Zu+5ZCI6ZuG6YeM6Z2i77yM5YiZ5LyY5YWI5Yqg6L295aSn5Zu+5ZCI6ZuG77yM6ICM5LiN5piv5bCP5Zu+XHJcbiAgICAgICAgTGF5YS5BdGxhc0luZm9NYW5hZ2VyLmVuYWJsZShcImZpbGVjb25maWcuanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25Db25maWdMb2FkZWQpKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNvbmZpZ0xvYWRlZCgpOiB2b2lkIHtcclxuICAgICAgICAvL+WKoOi9vUlEReaMh+WumueahOWcuuaZr1xyXG4gICAgICAgIEdhbWVDb25maWcuc3RhcnRTY2VuZSAmJiBMYXlhLlNjZW5lLm9wZW4oR2FtZUNvbmZpZy5zdGFydFNjZW5lKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXR1cCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0dXAoKTogdm9pZCB7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8xX1RleHQoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzJfSW5wdXRUZXN0KCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8zX0JpdG1hcEZvbnQoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzRfMV9TcHJpdGVfRGlzcGxheUltYWdlKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80XzFfU3ByaXRlX1N3aXRjaFRleHR1cmUoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzRfMl9TcHJpdGVfRGlzcGxheUltYWdlKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80XzJfU3ByaXRlX1N3aXRjaFRleHR1cmUoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzRfTWFza0RlbW8oKTtcclxuICAgICAgICAvL25ldyBUZXN0XzVfMV9Db2xvckZpbHRlcigpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNV8yX0dsb3dGaWx0ZXIoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzZfMV9TcHJpdGVfRHJhd1NoYXBlcygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfN19BdGxhc0FuaURlbW8oKTtcclxuICAgICAgICAvL25ldyBUZXN0XzhfVHdlZW5EZW1vKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF85X1RpbWVMaW5lKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF85X1RpbWVMaW5lVUkoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzExX1NvdW5kKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8wXzFfU29ja2V0KCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8wX05ldHdvcmtfUHJvdG9jb2xCdWZmZXIoKTtcclxuICAgICAgICBuZXcgVGVzdF8xMl9UaWxlZE1hcCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMTNfRG9tRWxlbWVudCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMTRfU2hhZGVyKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBBcHBNYWluKCk7IiwiY2xhc3MgT2JzZXJ2ZXIge1xyXG4gICAgLyoqIOS4iuS4i+aWhyAqL1xyXG4gICAgcHJpdmF0ZSBjb250ZXh0OiBhbnkgPSBudWxsO1xyXG4gICAgLyoqIOWbnuiwg+WHveaVsCAqL1xyXG4gICAgcHJpdmF0ZSBjYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQ6IGFueSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43nva5cclxuICAgICAqIEBwYXJhbSBjb250ZXh0IOS4iuS4i+aWh1xyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIOWbnuiwg+WHveaVsFxyXG4gICAgICovXHJcbiAgICByZXNldChjb250ZXh0OiBhbnkgPSBudWxsLCBjYWxsYmFjazogRnVuY3Rpb24gPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HpgIHpgJrnn6VcclxuICAgICAqIEBwYXJhbSBhcmdzIOS4jeWumuWPguaVsFxyXG4gICAgICovXHJcbiAgICBub3RpZnkoLi4uYXJnczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrLmNhbGwodGhpcy5jb250ZXh0LCAuLi5hcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4iuS4i+aWh+avlOi+g1xyXG4gICAgICogQHBhcmFtIGNvbnRleHQg5LiK5LiL5paHXHJcbiAgICAgKi9cclxuICAgIGNvbXBhcihjb250ZXh0OiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gY29udGV4dCA9PSB0aGlzLmNvbnRleHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXRFdmVudERpc3BhdGNoZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IE5ldEV2ZW50RGlzcGF0Y2hlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTmV0RXZlbnREaXNwYXRjaGVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZSB8fCAodGhpcy5pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDnm5HlkKzmlbDnu4QgKi9cclxuICAgIHByaXZhdGUgbGlzdGVuZXJzOiB7IFtpbmRleDogbnVtYmVyXTogQXJyYXk8T2JzZXJ2ZXI+IH0gPSB7fVxyXG4gICAgLyoqIOenu+mZpOaVsOe7hCAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVMaXN0ZW5lcnM6IEFycmF5PE9ic2VydmVyPiA9IFtdXHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgIHB1YmxpYyByZWdpc3RlcihtZXNzYWdlSUQ6IG51bWJlciwgY29udGV4dDogYW55LCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgb2JzZXJ2ZXJzOiBPYnNlcnZlcltdID0gdGhpcy5saXN0ZW5lcnNbbWVzc2FnZUlEXTtcclxuICAgICAgICBpZiAoIW9ic2VydmVycykge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttZXNzYWdlSURdID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnJlbW92ZUxpc3RlbmVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBvYnNlcnZlciA9IHRoaXMucmVtb3ZlTGlzdGVuZXJzLnBvcCgpO1xyXG4gICAgICAgICAgICBvYnNlcnZlci5yZXNldChjb250ZXh0LCBjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21lc3NhZ2VJRF0ucHVzaChvYnNlcnZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttZXNzYWdlSURdLnB1c2gobmV3IE9ic2VydmVyKGNvbnRleHQsIGNhbGxiYWNrKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHVuUmVnaXN0ZXIobWVzc2FnZUlEOiBudW1iZXIsIGNvbnRleHQ6IGFueSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IG9ic2VydmVyczogT2JzZXJ2ZXJbXSA9IHRoaXMubGlzdGVuZXJzW21lc3NhZ2VJRF07XHJcbiAgICAgICAgaWYgKCFvYnNlcnZlcnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gb2JzZXJ2ZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYnNlcnZlciA9IG9ic2VydmVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKG9ic2VydmVyLmNvbXBhcihjb250ZXh0KSkge1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXJzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVycy5wdXNoKG9ic2VydmVyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvYnNlcnZlcnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMubGlzdGVuZXJzW21lc3NhZ2VJRF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGRpc3BhdGNoKG1lc3NhZ2VJRDogbnVtYmVyLCAuLi5hcmdzKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG9ic2VydmVyczogT2JzZXJ2ZXJbXSA9IHRoaXMubGlzdGVuZXJzW21lc3NhZ2VJRF07XHJcbiAgICAgICAgaWYgKCFvYnNlcnZlcnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gb2JzZXJ2ZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYnNlcnZlciA9IG9ic2VydmVyc1tpXTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIubm90aWZ5KG1lc3NhZ2VJRCwgLi4uYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIENsZWFyQWxsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge31cclxuICAgIH1cclxufSIsIlxyXG4vKipcclxuICogUHJvdG9idWYg5raI5oGv5ZCN56ew5Yy56YWNXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXRNZXNzYWdlTmFtZSB7XHJcbiAgICBzdGF0aWMgbWVzc2FnZU1hcCA9IHt9XHJcbiAgICBzdGF0aWMgaXNJbml0ID0gZmFsc2VcclxuICAgIHN0YXRpYyBnZXRNYXAoKTogYW55IHtcclxuICAgICAgICBpZiAoTmV0TWVzc2FnZU5hbWUuaXNJbml0KXtcclxuICAgICAgICAgICAgcmV0dXJuIE5ldE1lc3NhZ2VOYW1lLm1lc3NhZ2VNYXBcclxuICAgICAgICB9XHJcbiAgICAgICAgTmV0TWVzc2FnZU5hbWUuaXNJbml0ID0gdHJ1ZVxyXG5cclxuICAgICAgICAvL01lc3NhZ2VOYW1lXHJcbiAgICAgICAgbGV0IG1hcCA9IE5ldE1lc3NhZ2VOYW1lLm1lc3NhZ2VNYXBcclxuXHJcbiAgICAgICAgbWFwW0dhbWVNZXNzYWdlLkdNX1ZFUklGWV9WRVJTSU9OXT0nR01fVmVyaWZ5VmVyc2lvbic7XHJcbiAgICAgICAgbWFwW0dhbWVNZXNzYWdlLkdNX1ZFUlNJT05fUkVUVVJOXT0nR01fVmVyaWZ5VmVyc2lvblJldHVybic7XHJcblxyXG4gICAgICAgIHJldHVybiBtYXBcclxuICAgIH1cclxufSIsImltcG9ydCBCeXRlID0gTGF5YS5CeXRlXHJcbmltcG9ydCBTb2NrZXRDb25uZWN0IGZyb20gXCIuL1NvY2tldENvbm5lY3RcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXRQYWNrZXQge1xyXG4gICAgLy9wcml2YXRlIFdFQlBBQ0tfSEVBRF9PRkZTRVQ6IG51bWJlciA9IDBcdC8vIOiHquWumuS5ieaVsOaNriDkuIDoiKzmmK9yb2xlaWQgKGxvbmfnsbvlnospXHJcbiAgICAvL3ByaXZhdGUgV0VCUEFDS19NRVNTU0FHRUlEX09GRlNFVDogbnVtYmVyID0gOFx0Ly8g5raI5oGvaWRcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX0xFTkdUSF9PRkZTRVQ6IG51bWJlciA9IDEyXHQvLyDmtojmga/plb/luqZcclxuICAgIHB1YmxpYyBXRUJQQUNLX0hFQURfU0laRTogbnVtYmVyID0gMTZcdC8vIOa2iOaBr+aVsOaNruW8gOWni+S9jee9rlxyXG5cclxuICAgIHB1YmxpYyByb2xlSWQ6IG51bWJlclxyXG4gICAgcHVibGljIG1lc3NhZ2VJZDogbnVtYmVyXHJcbiAgICBwdWJsaWMgbWVzc2FnZTogYW55XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkQnl0ZXM6IEJ5dGVcclxuICAgIHByaXZhdGUgc29ja2V0Q29ubmVjdDogU29ja2V0Q29ubmVjdFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbm5lY3Q6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdCA9IGNvbm5lY3RcclxuICAgICAgICB0aGlzLnJlYWRCeXRlcyA9IG5ldyBCeXRlKClcclxuICAgICAgICB0aGlzLnJlYWRCeXRlcy5lbmRpYW4gPSBMYXlhLkJ5dGUuTElUVExFX0VORElBTi8v6L+Z6YeM5oiR5Lus6YeH55So5bCP56uvXHJcbiAgICB9XHJcblxyXG4gICAgLy/mjqXmlLbmnI3liqHlmajkv6Hmga9cclxuICAgIHB1YmxpYyByZWNlaXZlTXNnKGJ5dGVzOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlYWRCeXRlcy53cml0ZUFycmF5QnVmZmVyKGJ5dGVzKVxyXG4gICAgICAgIHRoaXMucmVhZEJ5dGVzLnBvcyA9IDAvL+iuvue9ruWBj+enu+aMh+mSiFxyXG5cclxuICAgICAgICAvL+aMieeFp+acjeWKoeWZqOS8oOmAkui/h+adpeeahOaVsOaNru+8jOaMieeFp+mhuuW6j+ivu+WPllxyXG4gICAgICAgIHRoaXMucm9sZUlkID0gdGhpcy5yZWFkQnl0ZXMuZ2V0RmxvYXQ2NCgpXHJcbiAgICAgICAgdGhpcy5tZXNzYWdlSWQgPSB0aGlzLnJlYWRCeXRlcy5nZXRJbnQzMigpXHJcbiAgICAgICAgbGV0IG1zZ0xlbmd0aCA9IHRoaXMucmVhZEJ5dGVzLmdldEludDMyKClcclxuICAgICAgICAvL2xldCBhYiA9IHRoaXMucmVhZEJ5dGVzLnJlYWRBcnJheUJ1ZmZlcihtc2dMZW5ndGggLSB0aGlzLldFQlBBQ0tfSEVBRF9TSVpFKVxyXG4gICAgICAgIC8vbGV0IGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KGFiKVxyXG4gICAgICAgIC8vdGhpcy5tZXNzYWdlID0gdGhpcy5zb2NrZXRDb25uZWN0LmRlc2VyaWFsaXplKHRoaXMubWVzc2FnZUlkLCBidWZmZXIpXHJcbiAgICAgICAgbGV0IHVpbnQ4QXJyYXkgPSB0aGlzLnJlYWRCeXRlcy5yZWFkVWludDhBcnJheSh0aGlzLldFQlBBQ0tfSEVBRF9TSVpFLCBtc2dMZW5ndGggLSB0aGlzLldFQlBBQ0tfSEVBRF9TSVpFKVxyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IHRoaXMuc29ja2V0Q29ubmVjdC5kZXNlcmlhbGl6ZSh0aGlzLm1lc3NhZ2VJZCwgdWludDhBcnJheSlcclxuXHJcbiAgICAgICAgLy9pZiAobXNnTGVuZ3RoICE9IHRoaXMucmVhZEJ5dGVzLmxlbmd0aCkge1xyXG4gICAgICAgIC8vICAgIGNvbnNvbGUuZXJyb3IoXCLmtojmga/plb/kuI3kuIDmoLdcIilcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgdGhpcy5yZWFkQnl0ZXMuY2xlYXIoKVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFNvY2tldENvbm5lY3QgZnJvbSBcIi4vU29ja2V0Q29ubmVjdFwiO1xyXG5cclxuY2xhc3MgR2FtZUNsaWVudCB7XHJcbiAgICBwcml2YXRlIGNsaWVudElkOiBDbGllbnRJRDtcclxuICAgIHByaXZhdGUgc29ja2V0Q29ubmVjdDogU29ja2V0Q29ubmVjdDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogQ2xpZW50SUQpIHtcclxuICAgICAgICB0aGlzLmNsaWVudElkID0gaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbm5lY3QoaG9zdDogc3RyaW5nLCBwb3J0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QgPSBuZXcgU29ja2V0Q29ubmVjdChcIiBjbGllbnRJZDpcIiArIHRoaXMuY2xpZW50SWQpO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5jb25uZWN0KGhvc3QsIHBvcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25uZWN0QnlVcmwodXJsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QgPSBuZXcgU29ja2V0Q29ubmVjdChcIiBjbGllbnRJZDpcIiArIHRoaXMuY2xpZW50SWQpO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5jb25uZWN0QnlVcmwodXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVjb25uZWN0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5yZWNvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzY29ubmVjdGVkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5kaXNjb25uZWN0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNDb25uZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ja2V0Q29ubmVjdC5jb25uZWN0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZEVtcHR5KG1zZ0lkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3Quc2VuZEVtcHR5KG1zZ0lkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgbXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3Quc2VuZE1lc3NhZ2UobXNnSWQsIG1zZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ29ubmVjdENhbGxiYWNrKGNhbGxiYWNrOkZ1bmN0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5vbkNvbm5lY3QgPSBjYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25EaXNjb25uZWN0Q2FsbGJhY2soY2FsbGJhY2s6RnVuY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0Lm9uRGlzY29ubmVjdCA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0d29ya01hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IE5ldHdvcmtNYW5hZ2VyO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTmV0d29ya01hbmFnZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlIHx8ICh0aGlzLmluc3RhbmNlID0gbmV3IHRoaXMoKSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdhbWVDbGllbnRNYXA6IHsgW2luZGV4OiBudW1iZXJdOiBHYW1lQ2xpZW50OyB9ID0ge307XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6KeS6ImySURcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFJvbGVJZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnBvdygyLCA1MykgLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVDbGllbnQoY2xpZW50SUQ6IG51bWJlciwgdXJsOiBzdHJpbmcpOiBHYW1lQ2xpZW50IHtcclxuICAgICAgICB2YXIgY2xpZW50OiBHYW1lQ2xpZW50ID0gbmV3IEdhbWVDbGllbnQoY2xpZW50SUQpO1xyXG4gICAgICAgIGNsaWVudC5jb25uZWN0QnlVcmwodXJsKTtcclxuICAgICAgICB0aGlzLmdhbWVDbGllbnRNYXBbQ2xpZW50SUQubG9naW5dID0gY2xpZW50O1xyXG4gICAgICAgIHJldHVybiBjbGllbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENsaWVudChjbGllbnRJRDogQ2xpZW50SUQpOiBHYW1lQ2xpZW50IHtcclxuICAgICAgICBpZiAodGhpcy5nYW1lQ2xpZW50TWFwW2NsaWVudElEXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdhbWVDbGllbnRNYXBbY2xpZW50SURdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VDbGllbnQoY2xpZW50SUQ6IENsaWVudElEKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNsaWVudDogR2FtZUNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KENsaWVudElELmxvZ2luKVxyXG4gICAgICAgIGlmIChjbGllbnQpIHtcclxuICAgICAgICAgICAgY2xpZW50LmRpc2Nvbm5lY3RlZCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWNvbm5lY3RDbGllbnQoY2xpZW50SUQ6IENsaWVudElEKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNsaWVudDogR2FtZUNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KENsaWVudElELmxvZ2luKVxyXG4gICAgICAgIGlmIChjbGllbnQpIHtcclxuICAgICAgICAgICAgY2xpZW50LnJlY29ubmVjdCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dpblNlbmRNZXNzYWdlKG1zZ0lkOiBudW1iZXIsIG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShtc2dJZCwgbXNnLCBDbGllbnRJRC5sb2dpbilcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naWNTZW5kTWVzc2FnZShtc2dJZDogbnVtYmVyLCBtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UobXNnSWQsIG1zZywgQ2xpZW50SUQubG9naWMpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNjZW5lU2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgbXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKG1zZ0lkLCBtc2csIENsaWVudElELnNjZW5lKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgbXNnOiBhbnksIGNsaWVudElEOiBDbGllbnRJRCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGllbnQ6IEdhbWVDbGllbnQgPSB0aGlzLmdldENsaWVudChjbGllbnRJRClcclxuICAgICAgICBpZiAoY2xpZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5zZW5kTWVzc2FnZShtc2dJZCwgbXNnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZE1lc3NhZ2VFbXB0eShtc2dJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNsaWVudDogR2FtZUNsaWVudCA9IG51bGw7XHJcbiAgICAgICAgaWYgKG1zZ0lkID4gR2FtZU1lc3NhZ2UuR01fQUNDT1VOVF9TRVJWRVJfTUVTU0FHRV9TVEFSVCAmJiBtc2dJZCA8IEdhbWVNZXNzYWdlLkdNX0FDQ09VTlRfU0VSVkVSX01FU1NBR0VfRU5EKSB7XHJcbiAgICAgICAgICAgIGNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KENsaWVudElELmxvZ2luKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY2xpZW50ID0gdGhpcy5nZXRDbGllbnQoQ2xpZW50SUQubG9naWMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjbGllbnQpIHtcclxuICAgICAgICAgICAgY2xpZW50LnNlbmRFbXB0eShtc2dJZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQWxsR2FtZUNsaWVudCgpIHtcclxuICAgICAgICBsZXQgZGljID0gdGhpcy5nYW1lQ2xpZW50TWFwXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGljKSB7XHJcbiAgICAgICAgICAgIGlmIChkaWMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRpY1trZXldO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5kaXNjb25uZWN0ZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdhbWVDbGllbnRNYXAgPSB7fVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IE5ldEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vRXZlbnQvTmV0RXZlbnREaXNwYXRjaGVyXCJcclxuaW1wb3J0IE5ldFBhY2tldCBmcm9tIFwiLi9OZXRQYWNrZXRcIlxyXG5pbXBvcnQgTmV0d29ya01hbmFnZXIgZnJvbSBcIi4vTmV0d29ya01hbmFnZXJcIlxyXG5pbXBvcnQgTmV0TWVzc2FnZU5hbWUgZnJvbSBcIi4vTmV0TWVzc2FnZU5hbWVcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2NrZXRDb25uZWN0IHtcclxuXHJcbiAgICAvL3ByaXZhdGUgV0VCUEFDS19IRUFEX09GRlNFVDogbnVtYmVyID0gMFx0Ly8g6Ieq5a6a5LmJ5pWw5o2uIOS4gOiIrOaYr3JvbGVpZCAobG9uZ+exu+WeiylcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX01FU1NTQUdFSURfT0ZGU0VUOiBudW1iZXIgPSA4XHQvLyDmtojmga9pZFxyXG4gICAgLy9wcml2YXRlIFdFQlBBQ0tfTEVOR1RIX09GRlNFVDogbnVtYmVyID0gMTJcdC8vIOa2iOaBr+mVv+W6plxyXG4gICAgcHJpdmF0ZSBXRUJQQUNLX0hFQURfU0laRTogbnVtYmVyID0gMTZcdC8vIOa2iOaBr+aVsOaNruW8gOWni+S9jee9rlxyXG5cclxuXHJcbiAgICBwdWJsaWMgc29ja2V0OiBMYXlhLlNvY2tldCA9IG51bGxcclxuICAgIHByaXZhdGUgc2VuZEJ5dGVzOiBMYXlhLkJ5dGUgPSBudWxsXHJcbiAgICBwcml2YXRlIHJlYWRCeXRlczogTGF5YS5CeXRlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSB0ZW1wQnl0ZXM6IExheWEuQnl0ZSA9IG51bGxcclxuICAgIHByaXZhdGUgdXJsOiBzdHJpbmcgPSBudWxsXHJcbiAgICBwcml2YXRlIHRpcHM6IHN0cmluZyA9IG51bGxcclxuICAgIHByaXZhdGUgcGJNZXNzYWdlTmFtZTogYW55ID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBwcm90b1Jvb3Q6IGFueSA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIG9uQ29ubmVjdDpGdW5jdGlvbiA9IG51bGw7XHJcbiAgICBwdWJsaWMgb25EaXNjb25uZWN0OkZ1bmN0aW9uID0gbnVsbDtcclxuXHJcbiAgICAvL3ByaXZhdGUgc2VuZE5ldFBhY2tldDogQXJyYXk8TmV0UGFja2V0PiA9IG51bGxcclxuICAgIC8vcHJpdmF0ZSByZWNlaXZlTmV0UGFja2V0OiBBcnJheTxOZXRQYWNrZXQ+ID0gbnVsbFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRpcHM6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudGlwcyA9IHRpcHNcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcyA9IG5ldyBMYXlhLkJ5dGUoKVxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLmVuZGlhbiA9IExheWEuQnl0ZS5MSVRUTEVfRU5ESUFOLy/ov5nph4zmiJHku6zph4fnlKjlsI/nq69cclxuICAgICAgICB0aGlzLnRlbXBCeXRlcyA9IG5ldyBMYXlhLkJ5dGUoKVxyXG4gICAgICAgIHRoaXMudGVtcEJ5dGVzLmVuZGlhbiA9IExheWEuQnl0ZS5MSVRUTEVfRU5ESUFOLy/ov5nph4zmiJHku6zph4fnlKjlsI/nq69cclxuXHJcbiAgICAgICAgLy90aGlzLnNlbmROZXRQYWNrZXQgPSBuZXcgQXJyYXk8TmV0UGFja2V0PigpIC8v5Y+R6YCB55qE572R57uc5YyFXHJcbiAgICAgICAgLy90aGlzLnJlY2VpdmVOZXRQYWNrZXQgPSBuZXcgQXJyYXk8TmV0UGFja2V0PigpIC8v5o6l5pS255qE572R57uc5YyFXHJcblxyXG4gICAgICAgIHRoaXMucHJvdG9Sb290ID0gTGF5YS5Ccm93c2VyLndpbmRvd1tcIlBCTWVzc2FnZVwiXVxyXG4gICAgICAgIHRoaXMucGJNZXNzYWdlTmFtZSA9IE5ldE1lc3NhZ2VOYW1lLmdldE1hcCgpXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY29ubmVjdChob3N0OiBzdHJpbmcsIHBvcnQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudXJsID0gaG9zdC5jb25jYXQocG9ydC50b1N0cmluZygpKVxyXG4gICAgICAgIHRoaXMuY29ubmVjdEJ5VXJsKHRoaXMudXJsKVxyXG4gICAgfVxyXG4gICAgLy9cIndzOi8vbG9jYWxob3N0Ojg5ODlcIlxyXG4gICAgcHVibGljIGNvbm5lY3RCeVVybCh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudXJsID0gdXJsXHJcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBuZXcgTGF5YS5Tb2NrZXQoKVxyXG4gICAgICAgIHRoaXMuc29ja2V0LmVuZGlhbiA9IExheWEuQnl0ZS5MSVRUTEVfRU5ESUFOLy/ov5nph4zmiJHku6zph4fnlKjlsI/nq69cclxuICAgICAgICB0aGlzLnNvY2tldC5jb25uZWN0QnlVcmwodXJsKVxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKExheWEuRXZlbnQuT1BFTiwgdGhpcywgdGhpcy5vcGVuSGFuZGxlcilcclxuICAgICAgICB0aGlzLnNvY2tldC5vbihMYXlhLkV2ZW50Lk1FU1NBR0UsIHRoaXMsIHRoaXMucmVjZWl2ZUhhbmRsZXIpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oTGF5YS5FdmVudC5DTE9TRSwgdGhpcywgdGhpcy5jbG9zZUhhbmRsZXIpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oTGF5YS5FdmVudC5FUlJPUiwgdGhpcywgdGhpcy5lcnJvckhhbmRsZXIpXHJcbiAgICB9XHJcbiAgICAvL+mHjeaWsOi/nuaOpVxyXG4gICAgcHVibGljIHJlY29ubmVjdCgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5jbGVhblNvY2tldCgpXHJcbiAgICAgICAgdGhpcy5jb25uZWN0QnlVcmwodGhpcy51cmwpXHJcbiAgICB9XHJcbiAgICAvL+aWreW8gOi/nuaOpVxyXG4gICAgcHVibGljIGRpc2Nvbm5lY3RlZCgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5jbG9zZSgpXHJcbiAgICB9XHJcbiAgICAvL+aYr+WQpui/nuaOpVxyXG4gICAgcHVibGljIGNvbm5lY3RlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zb2NrZXQuY29ubmVjdGVkXHJcbiAgICB9XHJcbiAgICAvL+ato+ehruW7uueri+i/nuaOpVxyXG4gICAgcHJpdmF0ZSBvcGVuSGFuZGxlcihldmVudDogYW55ID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXJsICsgdGhpcy50aXBzICsgXCIgIOato+ehruW7uueri+i/nuaOpVwiKVxyXG4gICAgICAgIGlmICh0aGlzLm9uQ29ubmVjdCl7XHJcbiAgICAgICAgICAgIHRoaXMub25Db25uZWN0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WFs+mXrei/nuaOpeS6i+S7tlxyXG4gICAgcHJpdmF0ZSBjbG9zZUhhbmRsZXIoZXZlbnQ6IGFueSA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVybCArIHRoaXMudGlwcyArIFwiIOWFs+mXrei/nuaOpeS6i+S7tlwiKVxyXG4gICAgICAgIGlmICh0aGlzLm9uRGlzY29ubmVjdCl7XHJcbiAgICAgICAgICAgIHRoaXMub25EaXNjb25uZWN0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+i/nuaOpeWHuumUmVxyXG4gICAgcHJpdmF0ZSBlcnJvckhhbmRsZXIoZTogYW55ID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXJsICsgdGhpcy50aXBzICsgXCIg6L+e5o6l5Ye66ZSZXCIpXHJcbiAgICB9XHJcblxyXG4gICAgLy/lj5HpgIHnqbrmtojmga9cclxuICAgIHB1YmxpYyBzZW5kRW1wdHkobXNnSWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIC8vIOWGmeWFpeS4gOS4quaVsOWtlzBcclxuICAgICAgICB0aGlzLnRlbXBCeXRlcy53cml0ZUZsb2F0MzIoMClcclxuICAgICAgICB0aGlzLnNlbmQobXNnSWQsIHRoaXMudGVtcEJ5dGVzKVxyXG4gICAgICAgIHRoaXMudGVtcEJ5dGVzLmNsZWFyKClcclxuICAgIH1cclxuXHJcbiAgICAvL+WPkemAgea2iOaBr1xyXG4gICAgcHVibGljIHNlbmRNZXNzYWdlKG1zZ0lkOiBudW1iZXIsIG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgLy9pZiAodHlwZW9mIG1zZyA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgLy8gICAgdGhpcy50ZW1wQnl0ZXMud3JpdGVVVEZTdHJpbmcobXNnKVxyXG4gICAgICAgIC8vICAgIHRoaXMuc2VuZChtc2dJZCwgdGhpcy50ZW1wQnl0ZXMpXHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy9lbHNlIGlmIChtc2cgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xyXG4gICAgICAgIC8vICAgIHRoaXMudGVtcEJ5dGVzLndyaXRlQXJyYXlCdWZmZXIoYnVmZmVyKVxyXG4gICAgICAgIC8vICAgIHRoaXMuc2VuZChtc2dJZCwgdGhpcy50ZW1wQnl0ZXMpXHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy9lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgYnVmZmVyOiBVaW50OEFycmF5ID0gdGhpcy5zZXJpYWxpemUobXNnSWQsIG1zZylcclxuICAgICAgICAgICAgdGhpcy50ZW1wQnl0ZXMud3JpdGVBcnJheUJ1ZmZlcihidWZmZXIpXHJcbiAgICAgICAgICAgIHRoaXMuc2VuZChtc2dJZCwgdGhpcy50ZW1wQnl0ZXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6ZyA6KaB5Y+R6YCB55qE5pWw5o2uXHJcbiAgICBwcml2YXRlIHNlbmQobXNnSWQ6IG51bWJlciwgYnl0ZTogTGF5YS5CeXRlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNvY2tldC5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgY29ubmVjdGlvbiBoYXMgYmVlbiBkaXNjb25uZWN0ZWQuXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICAvL1dFQlBBQ0tfSEVBRF9PRkZTRVRcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy53cml0ZUZsb2F0NjQoTmV0d29ya01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb2xlSWQoKSlcclxuICAgICAgICAvL1dFQlBBQ0tfTUVTU1NBR0VJRF9PRkZTRVRcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy53cml0ZUludDMyKG1zZ0lkKVxyXG4gICAgICAgIC8vV0VCUEFDS19MRU5HVEhfT0ZGU0VUXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMud3JpdGVJbnQzMih0aGlzLldFQlBBQ0tfSEVBRF9TSVpFICsgYnl0ZS5sZW5ndGgpXHJcbiAgICAgICAgLy9NYXNzZ2UgYm9keVxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLndyaXRlQXJyYXlCdWZmZXIoYnl0ZS5idWZmZXIpXHJcbiAgICAgICAgLy/ov5nph4zmmK/miorlrZfoioLmlbDnu4TnmoTmlbDmja7pgJrov4dzb2NrZXTlj5HpgIHnu5nmnI3liqHlmahcclxuICAgICAgICB0aGlzLnNvY2tldC5zZW5kKHRoaXMuc2VuZEJ5dGVzLmJ1ZmZlcilcclxuICAgICAgICAvL+a4hemZpOaOieaVsOaNru+8jOaWueS+v+S4i+asoeivu+WGmVxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLmNsZWFyKClcclxuICAgICAgICB0aGlzLnRlbXBCeXRlcy5jbGVhcigpXHJcbiAgICB9XHJcblxyXG4gICAgLy/mjqXmlLbliLDmlbDmja5cclxuICAgIHByaXZhdGUgcmVjZWl2ZUhhbmRsZXIobXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiTWVzc2FnZSBmcm9tIHNlcnZlcjogIFwiICsgbmV3IExheWEuQnl0ZShtc2cpLnJlYWRVVEZCeXRlcygpKVxyXG4gICAgICAgIHZhciBuZXRQYWNrZXQ6IE5ldFBhY2tldCA9IG5ldyBOZXRQYWNrZXQodGhpcylcclxuICAgICAgICBuZXRQYWNrZXQucmVjZWl2ZU1zZyhtc2cpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQuaW5wdXQuY2xlYXIoKVxyXG4gICAgICAgIE5ldEV2ZW50RGlzcGF0Y2hlci5nZXRJbnN0YW5jZSgpLmRpc3BhdGNoKG5ldFBhY2tldC5tZXNzYWdlSWQsIG5ldFBhY2tldClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW6j+WIl+WMliBwcm90b2NvbC1idWZmZXJcclxuICAgICAqIEBwYXJhbSBtYXNzYWdlSWQgXHJcbiAgICAgKiBAcGFyYW0gbWFzc2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VyaWFsaXplKG1hc3NhZ2VJZDogbnVtYmVyLCBtYXNzYWdlOiBhbnkpOiBVaW50OEFycmF5IHtcclxuICAgICAgICBsZXQgbWFzc2FnZU5hbWU6IHN0cmluZyA9IHRoaXMucGJNZXNzYWdlTmFtZVttYXNzYWdlSWRdXHJcbiAgICAgICAgLy8gRW5jb2RlIGEgbWVzc2FnZSB0byBhbiBVaW50OEFycmF5IChicm93c2VyKSBvciBCdWZmZXIgKG5vZGUpXHJcbiAgICAgICAgdmFyIGJ1ZmZlcjogYW55ID0gdGhpcy5wcm90b1Jvb3RbbWFzc2FnZU5hbWVdLmVuY29kZShtYXNzYWdlKS5maW5pc2goKTtcclxuICAgICAgICByZXR1cm4gYnVmZmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+N5bqP5YiX5YyWIHByb3RvY29sLWJ1ZmZlclxyXG4gICAgICogQHBhcmFtIG1hc3NhZ2VOYW1lIFxyXG4gICAgICogQHBhcmFtIG5ldFBhY2thZ2UgTmV0UGFja2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVzZXJpYWxpemUobWFzc2FnZUlkOiBudW1iZXIsIG1hc3NhZ2U6IFVpbnQ4QXJyYXkpOiBhbnkge1xyXG4gICAgICAgIGxldCBtYXNzYWdlTmFtZTogc3RyaW5nID0gdGhpcy5wYk1lc3NhZ2VOYW1lW21hc3NhZ2VJZF1cclxuICAgICAgICAvLyBEZWNvZGUgYW4gVWludDhBcnJheSAoYnJvd3Nlcikgb3IgQnVmZmVyIChub2RlKSB0byBhIG1lc3NhZ2VcclxuICAgICAgICB2YXIgbWVzc2FnZTogYW55ID0gdGhpcy5wcm90b1Jvb3RbbWFzc2FnZU5hbWVdLmRlY29kZShtYXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgIH1cclxuXHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cclxuaW1wb3J0IE1haW5VSSBmcm9tIFwiLi9zY3JpcHQvTWFpblVJXCJcbmltcG9ydCBUZXN0XzlfVGltZUxpbmVVSSBmcm9tIFwiLi9zdHVkeS9UZXN0XzlfVGltZUxpbmVVSVwiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj02NDA7XHJcbiAgICBzdGF0aWMgaGVpZ2h0Om51bWJlcj0xMTM2O1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJmaXhlZGhlaWdodFwiO1xyXG4gICAgc3RhdGljIHNjcmVlbk1vZGU6c3RyaW5nPVwiaG9yaXpvbnRhbFwiO1xyXG4gICAgc3RhdGljIGFsaWduVjpzdHJpbmc9XCJ0b3BcIjtcclxuICAgIHN0YXRpYyBhbGlnbkg6c3RyaW5nPVwibGVmdFwiO1xyXG4gICAgc3RhdGljIHN0YXJ0U2NlbmU6YW55PVwiTWFpblNjZW5lLnNjZW5lXCI7XHJcbiAgICBzdGF0aWMgc2NlbmVSb290OnN0cmluZz1cIlwiO1xyXG4gICAgc3RhdGljIGRlYnVnOmJvb2xlYW49dHJ1ZTtcclxuICAgIHN0YXRpYyBzdGF0OmJvb2xlYW49dHJ1ZTtcclxuICAgIHN0YXRpYyBwaHlzaWNzRGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBleHBvcnRTY2VuZVRvSnNvbjpib29sZWFuPXRydWU7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe31cclxuICAgIHN0YXRpYyBpbml0KCl7XHJcbiAgICAgICAgdmFyIHJlZzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XHJcbiAgICAgICAgcmVnKFwic2NyaXB0L01haW5VSS50c1wiLE1haW5VSSk7XG4gICAgICAgIHJlZyhcInN0dWR5L1Rlc3RfOV9UaW1lTGluZVVJLnRzXCIsVGVzdF85X1RpbWVMaW5lVUkpO1xyXG4gICAgfVxyXG59XHJcbkdhbWVDb25maWcuaW5pdCgpOyIsImltcG9ydCB7IHVpIH0gZnJvbSBcIi4uL3VpL2xheWFNYXhVSVwiO1xyXG5pbXBvcnQgTmV0d29ya01hbmFnZXIgZnJvbSBcIi4uL0ZyYW1ld29yay9OZXR3b3JrL05ldHdvcmtNYW5hZ2VyXCI7XHJcbmltcG9ydCBOZXRFdmVudERpc3BhdGNoZXIgZnJvbSBcIi4uL0ZyYW1ld29yay9FdmVudC9OZXRFdmVudERpc3BhdGNoZXJcIjtcclxuaW1wb3J0IE5ldFBhY2tldCBmcm9tIFwiLi4vRnJhbWV3b3JrL05ldHdvcmsvTmV0UGFja2V0XCI7XHJcbmltcG9ydCBHYW1lTWVzc2FnZU5hbWUgZnJvbSBcIi4uL0ZyYW1ld29yay9OZXR3b3JrL05ldE1lc3NhZ2VOYW1lXCI7XHJcblxyXG5cclxuLy/kuLvnlYzpnaJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpblVJIGV4dGVuZHMgdWkuTWFpblNjZW5lVUkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigpOyB9XHJcblxyXG4gICAgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYWluVUkub25FbmFibGVcIilcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZU1lc3NhZ2UuR01fVkVSU0lPTl9SRVRVUk4pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIE5ldEV2ZW50RGlzcGF0Y2hlci5nZXRJbnN0YW5jZSgpLnJlZ2lzdGVyKEdhbWVNZXNzYWdlLkdNX1ZFUlNJT05fUkVUVVJOLCB0aGlzLCB0aGlzLkdNX1ZlcmlmeVZlcnNpb25SZXR1cm4pXHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFpblVJLm9uRGlzYWJsZVwiKVxyXG4gICAgICAgIFxyXG4gICAgICAgIE5ldEV2ZW50RGlzcGF0Y2hlci5nZXRJbnN0YW5jZSgpLnVuUmVnaXN0ZXIoR2FtZU1lc3NhZ2UuR01fVkVSU0lPTl9SRVRVUk4sIHRoaXMsIHRoaXMuR01fVmVyaWZ5VmVyc2lvblJldHVybilcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBHTV9WZXJpZnlWZXJzaW9uUmV0dXJuKG5ldFBhY2thZ2U6TmV0UGFja2V0KTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5ldFBhY2thZ2UubWVzc2FnZUlkICsgXCIgIFwiICsgbmV0UGFja2FnZS5tZXNzYWdlKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkF3YWtlKCk6IHZvaWQge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlByZWNpc2lvbiBzYWZlLlwiICsgKE1hdGgucG93KDIsIDUzKSAtIDEpKTtcclxuXHJcbiAgICAgICAgLy92YXIgbXNnID0ge1xyXG4gICAgICAgIC8vICAgIHZlcnNpb246IFwiMS41LjRcIixcdFx0XHRcdC8v5a6i5oi356uv54mI5pys5Y+3XHJcbiAgICAgICAgLy8gICAgcGxhdGZvcm06IDkwMDcxOTkyNTQ3NDA5OTEsICAgICAgICAgICAgIC8vL+W5s+WPsFxyXG4gICAgICAgIC8vICAgIGlzdGVzdDogMCwvLy8gICAgMOOAgeato+W4uO+8jDHjgIHmtYvor5XvvIzkuI3pnIDopoHpqozor4HniYjmnKxcclxuICAgICAgICAvL31cclxuICAgICAgICAvL3ZhciByb290ID0gTGF5YS5Ccm93c2VyLndpbmRvd1tcIlBCTWVzc2FnZVwiXTtcclxuICAgICAgICAvL3ZhciBwYk1lc3NhZ2VOYW1lID0gR2FtZU1lc3NhZ2VOYW1lLmdldE1hcCgpXHJcbiAgICAgICAgLy92YXIgYnVmZmVyOiBhbnkgPSByb290W3BiTWVzc2FnZU5hbWVbR2FtZU1lc3NhZ2UuR01fVkVSSUZZX1ZFUlNJT05dXS5lbmNvZGUobXNnKS5maW5pc2goKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGJ1ZmZlcik7XHJcbiAgICAgICAgLy9cclxuXHJcbiAgICAgICAgTmV0d29ya01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVDbGllbnQoMCwgXCJ3czovLzE5Mi4xNjguMi4xMjY6NTAwMDBcIik7XHJcbiAgICAgICAgLy/lrprml7bmiafooYzkuIDmrKEo6Ze06ZqU5pe26Ze0KVxyXG4gICAgICAgIExheWEudGltZXIub25jZSgyMDAwLCB0aGlzLCB0aGlzLnRlc3ROZXR3b3JrKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRlc3ROZXR3b3JrKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGVzdE5ldHdvcmsoKVwiKTtcclxuICAgICAgICB2YXIgbXNnID0ge1xyXG4gICAgICAgICAgICB2ZXJzaW9uOiBcIjEuNS40XCIsXHRcdFx0XHQvL+WuouaIt+err+eJiOacrOWPt1xyXG4gICAgICAgICAgICBwbGF0Zm9ybTogOTAwNzE5OTI1NDc0MDk5MSwgICAgICAgICAgICAgLy8v5bmz5Y+wXHJcbiAgICAgICAgICAgIGlzdGVzdDogMCwvLy8gICAgMOOAgeato+W4uO+8jDHjgIHmtYvor5XvvIzkuI3pnIDopoHpqozor4HniYjmnKxcclxuICAgICAgICB9XHJcbiAgICAgICAgTmV0d29ya01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2dpblNlbmRNZXNzYWdlKEdhbWVNZXNzYWdlLkdNX1ZFUklGWV9WRVJTSU9OLCAgbXNnKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RfMTJfVGlsZWRNYXAge1xyXG4gICAgLy9vcHRpbWl6YXRpb24oKTp2b2lke1xyXG4gICAgLy8gICAgLy/lvZNUaWxlZCBNYXBh5LiN5YaN5L2/55So55qE5pe25YCZ77yM6ZyA6KaB5L2/55SoZGVzdHJveSgp5pa55rOV6L+b6KGM6ZSA5q+B77yM5Zue5pS26KKr5Y2g55So55qE5YaF5a2YXHJcbiAgICAvLyAgICB0aGlzLnRNYXAuZGVzdHJveSgpO1xyXG4gICAgLy8gICAgLy/oh6rliqjnvJPlrZjmsqHmnInliqjnlLvnmoTlnLDlnZdcclxuICAgIC8vICAgIHRoaXMudE1hcC5hdXRvQ2FjaGUgPSB0cnVlO1xyXG4gICAgLy8gICAgLy/oh6rliqjnvJPlrZjnmoTnsbvlnoss5Zyw5Zu+6L6D5aSn5pe25bu66K6u5L2/55Sobm9ybWFsXHJcbiAgICAvLyAgICB0aGlzLnRNYXAuYXV0b0NhY2hlVHlwZSA9IFwibm9ybWFsXCI7XHJcbiAgICAvLyAgICAvL+a2iOmZpOe8qeaUvuWvvOiHtOeahOe8nemamSzkuZ/lsLHmmK/ljrvpu5HovrnvvIwxLjcuN+eJiOacrOaWsOWinueahOS8mOWMluWxnuaAp1xyXG4gICAgLy8gICAgdGhpcy50TWFwLmFudGlDcmFjayA9IHRydWU7XHJcbiAgICAvLyAgICAvL+W8gOWQr+WbvuWxguWQiOW5tlxyXG4gICAgLy8gICAgdGhpcy50TWFwLmVuYWJsZU1lcmdlTGF5ZXIgPSB0cnVlO1xyXG4gICAgLy9cclxuICAgIC8vICAgIC8v57yT5a2Y5Yy65Z2X55qE6K6+572u5o6o6I2QXHJcbiAgICAvLyAgICAvL+WmguaenOWNleWbvuaYrzE1KjE177yM57yT5a2Y5Y+v5Yy65Z2X5Y+v5Lul6K6+572u5Li6NTEwKjUxMO+8iDM05YCN77yJ77yM5Lul5q2k57G75o6o77yM5bC96YeP5Zyo5Y6f5Yy65Z2X5pW05pWw5YCN55qE5YmN5o+Q5LiL77yM6K6+572u5ZyoNTEy5bem5Y+z44CC5o6o6I2Q5Li6NTEyKjUxMlxyXG4gICAgLy8gICAgLy/nvJPlrZjljLrlnZfnmoTlhbfkvZPorr7nva7mlrnms5VcclxuICAgIC8vICAgIC8v5Li656ys5LqU5Liq5Y+C5pWwZ3JpZFNpemXliJvlu7rkuIDkuKo1MTIqNTEy5aSn5bCP55qEUG9pbnTlr7nosaHlrp7kvotcclxuICAgIC8vICAgIC8vdmFyIGdyaWRTaXplOkxheWEuUG9pbnQgPSBuZXcgTGF5YS5Qb2ludCg1MTIsIDUxMik7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgLy/np7vpmaTooqvpnZ7pgI/mmI7lnLDlnZfopobnm5bnmoTpg6jliIZcclxuICAgIC8vICAgIC8v5aaC5p6c5ZyoVGlsZWQgTWFw5Lit5rKh5pyJ5a+55Zu+5Z2X6K6+572udHlwZeWxnuaAp++8jOmCo+S5iOWNs+S+v+W8gOWQr+S6hnJlbW92ZUNvdmVyZWRUaWxlIO+8jOS5n+aYr+aXoOaViOeahOOAguaJgOS7pe+8jOW8gOWQr+S5i+WJje+8jOmcgOimgeWFiOWcqFRpbGVkTWFw57yW6L6R5Zmo5Lit77yM5Li65Zu+5Z2X5paw5aKe6Ieq5a6a5LmJ5bGe5oCndHlwZe+8jOW5tuWwhuiuvue9ruS4ujFcclxuICAgIC8vICAgIHRoaXMudE1hcC5yZW1vdmVDb3ZlcmVkVGlsZSA9IHRydWU7XHJcbiAgICAvL31cclxuXHJcbiAgICBwcml2YXRlIHRNYXA6IExheWEuVGlsZWRNYXA7XHJcbiAgICBwcml2YXRlIHNjYWxlVmFsdWU6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIE1hcFg6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIE1hcFk6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIG1MYXN0TW91c2VYOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1MYXN0TW91c2VZOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUZXN0XzEyX1RpbGVkTWFwXCIpO1xyXG4gICAgICAgIC8v5Yid5aeL5YyW6Iie5Y+wXHJcbiAgICAgICAgTGF5YS5pbml0KExheWEuQnJvd3Nlci53aWR0aCwgTGF5YS5Ccm93c2VyLmhlaWdodCwgTGF5YS5XZWJHTCk7XHJcbiAgICAgICAgLy/liJvlu7pUaWxlZE1hcOWunuS+i1xyXG4gICAgICAgIHRoaXMudE1hcCA9IG5ldyBMYXlhLlRpbGVkTWFwKCk7XHJcbiAgICAgICAgLy/liJvlu7pSZWN0YW5nbGXlrp7kvovvvIzop4blj6PljLrln59cclxuICAgICAgICB2YXIgdmlld1JlY3Q6IExheWEuUmVjdGFuZ2xlID0gbmV3IExheWEuUmVjdGFuZ2xlKCk7XHJcbiAgICAgICAgLy/liJvlu7pUaWxlZE1hcOWcsOWbvu+8jOWKoOi9vW9ydGhvZ29uYWwuanNvbuWQju+8jOaJp+ihjOWbnuiwg+aWueazlW9uTWFwTG9hZGVkKClcclxuICAgICAgICB0aGlzLnRNYXAuY3JlYXRlTWFwKFwicmVzL1RpbGVkTWFwL29ydGhvZ29uYWwuanNvblwiLCB2aWV3UmVjdCwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uTWFwTG9hZGVkKSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uTWFwTG9hZGVkKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25NYXBMb2FkZWRcIik7XHJcbiAgICAgICAgLy/orr7nva7nvKnmlL7kuK3lv4PngrnkuLrop4blj6PnmoTlt6bkuIrop5JcclxuICAgICAgICB0aGlzLnRNYXAuc2V0Vmlld1BvcnRQaXZvdEJ5U2NhbGUoMCwgMCk7XHJcbiAgICAgICAgLy/lsIbljp/lnLDlm77mlL7lpKcz5YCNXHJcbiAgICAgICAgdGhpcy50TWFwLnNjYWxlID0gMjtcclxuICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuUkVTSVpFLCB0aGlzLCB0aGlzLnJlc2l6ZSk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sIHRoaXMsIHRoaXMubW91c2VEb3duKTtcclxuICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuTU9VU0VfVVAsIHRoaXMsIHRoaXMubW91c2VVcCk7XHJcbiAgICAgICAgdGhpcy5yZXNpemUoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog56e75Yqo5Zyw5Zu+6KeG5Y+jXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbW91c2VNb3ZlKCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBtb3ZlWDogbnVtYmVyID0gdGhpcy5NYXBYIC0gKExheWEuc3RhZ2UubW91c2VYIC0gdGhpcy5tTGFzdE1vdXNlWCk7XHJcbiAgICAgICAgdmFyIG1vdmVZOiBudW1iZXIgPSB0aGlzLk1hcFkgLSAoTGF5YS5zdGFnZS5tb3VzZVkgLSB0aGlzLm1MYXN0TW91c2VZKVxyXG4gICAgICAgIC8v56e75Yqo5Zyw5Zu+6KeG5Y+jXHJcbiAgICAgICAgdGhpcy50TWFwLm1vdmVWaWV3UG9ydChtb3ZlWCwgbW92ZVkpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBtb3VzZVVwKCk6IHZvaWQgIHtcclxuICAgICAgICB0aGlzLk1hcFggPSB0aGlzLk1hcFggLSAoTGF5YS5zdGFnZS5tb3VzZVggLSB0aGlzLm1MYXN0TW91c2VYKTtcclxuICAgICAgICB0aGlzLk1hcFkgPSB0aGlzLk1hcFkgLSAoTGF5YS5zdGFnZS5tb3VzZVkgLSB0aGlzLm1MYXN0TW91c2VZKTtcclxuICAgICAgICBMYXlhLnN0YWdlLm9mZihMYXlhLkV2ZW50Lk1PVVNFX01PVkUsIHRoaXMsIHRoaXMubW91c2VNb3ZlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbW91c2VEb3duKCk6IHZvaWQgIHtcclxuICAgICAgICB0aGlzLm1MYXN0TW91c2VYID0gTGF5YS5zdGFnZS5tb3VzZVg7XHJcbiAgICAgICAgdGhpcy5tTGFzdE1vdXNlWSA9IExheWEuc3RhZ2UubW91c2VZO1xyXG4gICAgICAgIExheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5NT1VTRV9NT1ZFLCB0aGlzLCB0aGlzLm1vdXNlTW92ZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqICDmlLnlj5jop4blj6PlpKflsI9cclxuICAgICAqICDph43orr7lnLDlm77op4blj6PljLrln59cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXNpemUoKTogdm9pZCAge1xyXG4gICAgICAgIC8v5pS55Y+Y6KeG5Y+j5aSn5bCPXHJcbiAgICAgICAgdGhpcy50TWFwLmNoYW5nZVZpZXdQb3J0KHRoaXMuTWFwWCwgdGhpcy5NYXBZLCBMYXlhLkJyb3dzZXIud2lkdGgsIExheWEuQnJvd3Nlci5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0XzlfVGltZUxpbmVVSVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvL+WKoOi9veWbvumbhuaIkOWKn+WQju+8jOaJp+ihjG9uTG9hZOWbnuiwg+aWueazlVxyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQoXCJyZXMvYXRsYXMvdGVzdC5hdGxhc1wiLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uTG9hZGVkKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgb25Mb2FkZWQoKTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Yqg6L295Zu+6ZuG5oiQ5Yqf5ZCO77yM5omn6KGMb25Mb2Fk5Zue6LCD5pa55rOVXCIpXHJcbiAgICAgICAgLy/liJvlu7rkuIDkuKpVSeWunuS+i1xyXG4gICAgICAgIC8vdmFyIHBsYW46VGltZUxpbmVVSSA9IG5ldyBUaW1lTGluZVVJKClcclxuICAgICAgICAvL+a3u+WKoOWIsOiInuWPsFxyXG4gICAgICAgIC8vTGF5YS5zdGFnZS5hZGRDaGlsZChwbGFuKTtcclxuICAgICAgICAvL+aSreaUvlVJ5Zy65pmv5Lit55qE5Yqo55S7XHJcbiAgICAgICAgLy90aGlzLmJlYXIucGxheSgpO1xyXG4gICAgfVxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xudmFyIFJFRzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XG5leHBvcnQgbW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBNYWluU2NlbmVVSSBleHRlbmRzIFNjZW5lIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiTWFpblNjZW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLk1haW5TY2VuZVVJXCIsTWFpblNjZW5lVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbWVMaW5lVUkgZXh0ZW5kcyBEaWFsb2cge1xyXG5cdFx0cHVibGljIGJlYXI6TGF5YS5BbmltYXRpb247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJUaW1lTGluZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5UaW1lTGluZVVJXCIsVGltZUxpbmVVSSk7XHJcbn1cciJdfQ==
