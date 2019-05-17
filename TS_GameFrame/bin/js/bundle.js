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
var Test_24_Pathfinding_1 = require("./study/Test_24_Pathfinding");
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
        this.setup();
        //加载IDE指定的场景
        //GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
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
        //new Test_12_TiledMap();
        //new Test_13_DomElement();
        //new Test_14_Shader();
        //new Test_20_LayaAir3D();
        //new Test_22_LayaAir3D_Animation();
        console.log("Test_24_Pathfinding");
        new Test_24_Pathfinding_1.default();
    };
    return AppMain;
}());
//激活启动类
new AppMain();
},{"./GameConfig":7,"./study/Test_24_Pathfinding":9}],2:[function(require,module,exports){
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
    GameConfig.startScene = "Main.scene";
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
        //Laya.Scene.open(UIPath.testPath,false);
        //Laya.Scene.open(UIPath.testPath1,false);
        //Laya.Scene.open(UIPath.UI_Loading,false);
    };
    MainUI.prototype.testNetwork = function () {
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
        var gameClient = NetworkManager_1.default.getInstance().createClient(0, "ws://192.168.2.126:50000");
        gameClient.onConnectCallback(function () {
            var msg = {
                version: "1.5.4",
                platform: 9007199254740991,
                istest: 0,
            };
            NetworkManager_1.default.getInstance().loginSendMessage(210 /* GM_VERIFY_VERSION */, msg);
        });
    };
    return MainUI;
}(layaMaxUI_1.ui.MainUI));
exports.default = MainUI;
},{"../Framework/Event/NetEventDispatcher":2,"../Framework/Network/NetworkManager":5,"../ui/layaMaxUI":11}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Test_24_Pathfinding = /** @class */ (function () {
    function Test_24_Pathfinding() {
        var matrix = [
            [0, 1, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0]
        ];
        for (var index = 0; index < matrix.length; index++) {
            var element = matrix[index];
            console.log("matrix {" + index + "}" + element);
        }
        var Grid = Laya.ClassUtils.getClass("PathFinding.core.Grid");
        var grid = new Grid(5, 5, matrix);
        console.log(grid);
        var obj = {
            allowDiagonal: false
        };
        var AStarFinder = Laya.ClassUtils.getClass("PathFinding.finders.AStarFinder");
        var finder = new AStarFinder(obj);
        console.log("startX 0,startY 0,endX 4,endY 4 ");
        var path = finder.findPath(0, 0, 4, 4, grid);
        console.log("Path:" + path);
    }
    return Test_24_Pathfinding;
}());
exports.default = Test_24_Pathfinding;
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
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
var View = Laya.View;
var Dialog = Laya.Dialog;
var REG = Laya.ClassUtils.regClass;
var ui;
(function (ui) {
    var MainUI = /** @class */ (function (_super) {
        __extends(MainUI, _super);
        function MainUI() {
            return _super.call(this) || this;
        }
        MainUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("Main");
        };
        return MainUI;
    }(View));
    ui.MainUI = MainUI;
    REG("ui.MainUI", MainUI);
    var TestUI = /** @class */ (function (_super) {
        __extends(TestUI, _super);
        function TestUI() {
            return _super.call(this) || this;
        }
        TestUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("Test");
        };
        return TestUI;
    }(View));
    ui.TestUI = TestUI;
    REG("ui.TestUI", TestUI);
    var Test1UI = /** @class */ (function (_super) {
        __extends(Test1UI, _super);
        function Test1UI() {
            return _super.call(this) || this;
        }
        Test1UI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("Test1");
        };
        return Test1UI;
    }(View));
    ui.Test1UI = Test1UI;
    REG("ui.Test1UI", Test1UI);
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
    var UI_Loading;
    (function (UI_Loading) {
        var UI_LoadingUI = /** @class */ (function (_super) {
            __extends(UI_LoadingUI, _super);
            function UI_LoadingUI() {
                return _super.call(this) || this;
            }
            UI_LoadingUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadScene("UI_Loading/UI_Loading");
            };
            return UI_LoadingUI;
        }(View));
        UI_Loading.UI_LoadingUI = UI_LoadingUI;
        REG("ui.UI_Loading.UI_LoadingUI", UI_LoadingUI);
    })(UI_Loading = ui.UI_Loading || (ui.UI_Loading = {}));
})(ui = exports.ui || (exports.ui = {}));
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkc6L0xheWEvTGF5YUFpcklERV9iZXRhL3Jlc291cmNlcy9hcHAvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9BcHBNYWluLnRzIiwic3JjL0ZyYW1ld29yay9FdmVudC9OZXRFdmVudERpc3BhdGNoZXIudHMiLCJzcmMvRnJhbWV3b3JrL05ldHdvcmsvTmV0TWVzc2FnZU5hbWUudHMiLCJzcmMvRnJhbWV3b3JrL05ldHdvcmsvTmV0UGFja2V0LnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL05ldHdvcmtNYW5hZ2VyLnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL1NvY2tldENvbm5lY3QudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9zY3JpcHQvTWFpblVJLnRzIiwic3JjL3N0dWR5L1Rlc3RfMjRfUGF0aGZpbmRpbmcudHMiLCJzcmMvc3R1ZHkvVGVzdF85X1RpbWVMaW5lVUkudHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1ZBLElBQU8sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDN0IsSUFBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtBQUN6QixJQUFPLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO0FBa0J6QiwyQ0FBc0M7QUFVdEMsbUVBQThEO0FBRTlELEtBQUs7QUFDTDtJQUNJO1FBQ0ksZ0JBQWdCO1FBQ2hCLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQVUsQ0FBQyxLQUFLLEVBQUUsb0JBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwRDthQUNJO1lBQ0QsdUJBQXVCO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxP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QVBZLGFBQVUsYUFPdEIsQ0FBQTtJQUNELEdBQUcsQ0FBQyxlQUFlLEVBQUMsVUFBVSxDQUFDLENBQUM7QUFDcEMsQ0FBQyxFQWxDYSxFQUFFLEdBQUYsVUFBRSxLQUFGLFVBQUUsUUFrQ2Y7QUFDRCxXQUFjLEVBQUU7SUFBQyxJQUFBLFVBQVUsQ0FVMUI7SUFWZ0IsV0FBQSxVQUFVO1FBQ3ZCO1lBQWtDLGdDQUFJO1lBRWxDO3VCQUFlLGlCQUFPO1lBQUEsQ0FBQztZQUN2QixxQ0FBYyxHQUFkO2dCQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDNUMsQ0FBQztZQUNMLG1CQUFDO1FBQUQsQ0FQQSxBQU9DLENBUGlDLElBQUksR0FPckM7UUFQWSx1QkFBWSxlQU94QixDQUFBO1FBQ0QsR0FBRyxDQUFDLDRCQUE0QixFQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ25ELENBQUMsRUFWZ0IsVUFBVSxHQUFWLGFBQVUsS0FBVixhQUFVLFFBVTFCO0FBQUQsQ0FBQyxFQVZhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQVVmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBCcm93c2VyID0gTGF5YS5Ccm93c2VyXHJcbmltcG9ydCBXZWJHTCA9IExheWEuV2ViR0xcclxuaW1wb3J0IFN0YWdlID0gTGF5YS5TdGFnZVxyXG5cclxuaW1wb3J0IFRlc3RfMV9UZXh0IGZyb20gJy4vc3R1ZHkvVGVzdF8xX1RleHQnO1xyXG5pbXBvcnQgVGVzdF8yX0lucHV0VGVzdCBmcm9tICcuL3N0dWR5L1Rlc3RfMl9JbnB1dFRlc3QnO1xyXG5pbXBvcnQgVGVzdF8zX0JpdG1hcEZvbnQgZnJvbSAnLi9zdHVkeS9UZXN0XzNfQml0bWFwRm9udCc7XHJcbmltcG9ydCBUZXN0XzRfMV9TcHJpdGVfRGlzcGxheUltYWdlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSc7XHJcbmltcG9ydCBUZXN0XzRfMV9TcHJpdGVfU3dpdGNoVGV4dHVyZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8xX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlJztcclxuaW1wb3J0IFRlc3RfNF8yX1Nwcml0ZV9EaXNwbGF5SW1hZ2UgZnJvbSAnLi9zdHVkeS9UZXN0XzRfMl9TcHJpdGVfRGlzcGxheUltYWdlJztcclxuaW1wb3J0IFRlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzJfU3ByaXRlX1N3aXRjaFRleHR1cmUnO1xyXG5pbXBvcnQgVGVzdF80X01hc2tEZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF80X01hc2tEZW1vJztcclxuaW1wb3J0IFRlc3RfNV8xX0NvbG9yRmlsdGVyIGZyb20gJy4vc3R1ZHkvVGVzdF81XzFfQ29sb3JGaWx0ZXInO1xyXG5pbXBvcnQgVGVzdF81XzJfR2xvd0ZpbHRlciBmcm9tICcuL3N0dWR5L1Rlc3RfNV8yX0dsb3dGaWx0ZXInO1xyXG5pbXBvcnQgVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMgZnJvbSAnLi9zdHVkeS9UZXN0XzZfMV9TcHJpdGVfRHJhd1NoYXBlcyc7XHJcbmltcG9ydCBUZXN0XzdfQXRsYXNBbmlEZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF83X0F0bGFzQW5pRGVtbyc7XHJcbmltcG9ydCBUZXN0XzhfVHdlZW5EZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF84X1R3ZWVuRGVtbyc7XHJcbmltcG9ydCBUZXN0XzlfVGltZUxpbmUgZnJvbSAnLi9zdHVkeS9UZXN0XzlfVGltZUxpbmUnO1xyXG5pbXBvcnQgVGVzdF85X1RpbWVMaW5lVUkgZnJvbSAnLi9zdHVkeS9UZXN0XzlfVGltZUxpbmVVSSc7XHJcbmltcG9ydCBUZXN0XzExX1NvdW5kIGZyb20gJy4vc3R1ZHkvVGVzdF8xMV9Tb3VuZCc7XHJcbmltcG9ydCBHYW1lQ29uZmlnIGZyb20gJy4vR2FtZUNvbmZpZyc7XHJcbmltcG9ydCBUZXN0XzBfMV9DaGFubmVsIGZyb20gJy4vc3R1ZHkvVGVzdF8wXzFfQ2hhbm5lbCc7XHJcbmltcG9ydCBUZXN0XzBfMV9Tb2NrZXQgZnJvbSAnLi9zdHVkeS9UZXN0XzBfMV9Tb2NrZXQnO1xyXG5pbXBvcnQgVGVzdF8wX05ldHdvcmtfUHJvdG9jb2xCdWZmZXIgZnJvbSAnLi9zdHVkeS9UZXN0XzBfTmV0d29ya19Qcm90b2NvbEJ1ZmZlcic7XHJcbmltcG9ydCBOZXR3b3JrTWFuYWdlciBmcm9tICcuL0ZyYW1ld29yay9OZXR3b3JrL05ldHdvcmtNYW5hZ2VyJztcclxuaW1wb3J0IFRlc3RfMTJfVGlsZWRNYXAgZnJvbSAnLi9zdHVkeS9UZXN0XzEyX1RpbGVkTWFwJztcclxuaW1wb3J0IFRlc3RfMTNfRG9tRWxlbWVudCBmcm9tICcuL3N0dWR5L1Rlc3RfMTNfRG9tRWxlbWVudCc7XHJcbmltcG9ydCBUZXN0XzE0X1NoYWRlciBmcm9tICcuL3N0dWR5L1Rlc3RfMTRfU2hhZGVyJztcclxuaW1wb3J0IFRlc3RfMjBfTGF5YUFpcjNEIGZyb20gJy4vc3R1ZHkvVGVzdF8yMF9MYXlhQWlyM0QnO1xyXG5pbXBvcnQgVGVzdF8yMl9MYXlhQWlyM0RfQW5pbWF0aW9uIGZyb20gJy4vc3R1ZHkvVGVzdF8yMl9MYXlhQWlyM0RfQW5pbWF0aW9uJztcclxuaW1wb3J0IFRlc3RfMjRfUGF0aGZpbmRpbmcgZnJvbSAnLi9zdHVkeS9UZXN0XzI0X1BhdGhmaW5kaW5nJztcclxuXHJcbi8v5ZCv5Yqo57G7XHJcbmNsYXNzIEFwcE1haW4ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy/moLnmja5JREXorr7nva7liJ3lp4vljJblvJXmk45cdFx0XHJcbiAgICAgICAgaWYgKHdpbmRvd1tcIkxheWEzRFwiXSkge1xyXG4gICAgICAgICAgICBMYXlhM0QuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDkuI3mlK/mjIFXZWJHTOaXtuiHquWKqOWIh+aNouiHs0NhbnZhc1xyXG4gICAgICAgICAgICBMYXlhLmluaXQoQnJvd3Nlci5jbGllbnRXaWR0aCwgQnJvd3Nlci5jbGllbnRIZWlnaHQsIFdlYkdMKTtcclxuICAgICAgICAgICAgLy9MYXlhLmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQsIExheWFbXCJXZWJHTFwiXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExheWFbXCJQaHlzaWNzXCJdICYmIExheWFbXCJQaHlzaWNzXCJdLmVuYWJsZSgpO1xyXG4gICAgICAgIExheWFbXCJEZWJ1Z1BhbmVsXCJdICYmIExheWFbXCJEZWJ1Z1BhbmVsXCJdLmVuYWJsZSgpO1xyXG5cclxuXHJcbiAgICAgICAgLy/miZPlvIDosIPor5XpnaLmnb/vvIjpgJrov4dJREXorr7nva7osIPor5XmqKHlvI/vvIzmiJbogIV1cmzlnLDlnYDlop7liqBkZWJ1Zz10cnVl5Y+C5pWw77yM5Z2H5Y+v5omT5byA6LCD6K+V6Z2i5p2/77yJXHJcbiAgICAgICAgaWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuICAgICAgICBpZiAoR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgJiYgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0pIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdLmVuYWJsZSgpO1xyXG4gICAgICAgIGlmIChHYW1lQ29uZmlnLnN0YXQpIExheWEuU3RhdC5zaG93KCk7XHJcblxyXG4gICAgICAgIC8v6KGo56S65piv5ZCm5o2V6I635YWo5bGA6ZSZ6K+v5bm25by55Ye65o+Q56S644CCXHJcbiAgICAgICAgTGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy/mv4DmtLvotYTmupDniYjmnKzmjqfliLbvvIx2ZXJzaW9uLmpzb27nlLFJREXlj5HluIPlip/og73oh6rliqjnlJ/miJDvvIzlpoLmnpzmsqHmnInkuZ/kuI3lvbHlk43lkI7nu63mtYHnqItcclxuICAgICAgICBMYXlhLlJlc291cmNlVmVyc2lvbi5lbmFibGUoXCJ2ZXJzaW9uLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uVmVyc2lvbkxvYWRlZCksIExheWEuUmVzb3VyY2VWZXJzaW9uLkZJTEVOQU1FX1ZFUlNJT04pO1xyXG5cclxuXHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnblYgPSBTdGFnZS5BTElHTl9NSURETEU7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnbkggPSBTdGFnZS5BTElHTl9DRU5URVI7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBHYW1lQ29uZmlnLnNjYWxlTW9kZTsvL1N0YWdlLlNDQUxFX0ZVTEw7Ly9TQ0FMRV9GSVhFRF9IRUlHSFRcclxuICAgICAgICBMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBHYW1lQ29uZmlnLnNjcmVlbk1vZGU7Ly9TdGFnZS5TQ1JFRU5fSE9SSVpPTlRBTDsvL1NDUkVFTl9WRVJUSUNBTFxyXG4gICAgICAgIExheWEuc3RhZ2UuYmdDb2xvciA9IFwiIzdmN2Y3ZlwiO1xyXG5cclxuICAgICAgICAvL+WFvOWuueW+ruS/oeS4jeaUr+aMgeWKoOi9vXNjZW5l5ZCO57yA5Zy65pmvXHJcbiAgICAgICAgTGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuICAgICAgICAvL+WmguaenOmAmui/h+iuvuWkh+mdmemfs+mUruiuqemfs+mikeiHquWKqOi3n+maj+iuvuWkh+mdmemfs+OAgumcgOimgeWwhnVzZUF1ZGlvTXVzaWPorr7nva7kuLpmYWxzZeOAglxyXG4gICAgICAgIExheWEuU291bmRNYW5hZ2VyLnVzZUF1ZGlvTXVzaWMgPSBmYWxzZTtcclxuICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5hdXRvU3RvcE11c2ljID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8v5raI6Zmk55+i6YeP57uY5Yi255qE6ZSv6b2/77yM5L2G5Lya5aKe5Yqg5oCn6IO95raI6ICXXHJcbiAgICAgICAgLy9Db25maWcuaXNBbnRpYWxpYXM9dHJ1ZTtcclxuXHJcbiAgICAgICAgLy/plIDmr4HlvZPliY3msqHmnInooqvkvb/nlKjnmoTotYTmupAs6K+l5Ye95pWw5Lya5b+955WlbG9jaz10cnVl55qE6LWE5rqQ44CCXHJcbiAgICAgICAgLy9MYXlhLlJlc291cmNlLmRlc3Ryb3lVbnVzZWRSZXNvdXJjZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblZlcnNpb25Mb2FkZWQoKTogdm9pZCB7XHJcbiAgICAgICAgLy/mv4DmtLvlpKflsI/lm77mmKDlsITvvIzliqDovb3lsI/lm77nmoTml7blgJnvvIzlpoLmnpzlj5HnjrDlsI/lm77lnKjlpKflm77lkIjpm4bph4zpnaLvvIzliJnkvJjlhYjliqDovb3lpKflm77lkIjpm4bvvIzogIzkuI3mmK/lsI/lm75cclxuICAgICAgICBMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29uZmlnTG9hZGVkKCk6IHZvaWQge1xyXG5cclxuICAgICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICAgICAgLy/liqDovb1JREXmjIflrprnmoTlnLrmma9cclxuICAgICAgICAvL0dhbWVDb25maWcuc3RhcnRTY2VuZSAmJiBMYXlhLlNjZW5lLm9wZW4oR2FtZUNvbmZpZy5zdGFydFNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldHVwKCk6IHZvaWQge1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMV9UZXh0KCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8yX0lucHV0VGVzdCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfM19CaXRtYXBGb250KCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8xX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80XzJfU3ByaXRlX0Rpc3BsYXlJbWFnZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80X01hc2tEZW1vKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF81XzFfQ29sb3JGaWx0ZXIoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzVfMl9HbG93RmlsdGVyKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzdfQXRsYXNBbmlEZW1vKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF84X1R3ZWVuRGVtbygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfOV9UaW1lTGluZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfOV9UaW1lTGluZVVJKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8xMV9Tb3VuZCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMF8xX1NvY2tldCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMF9OZXR3b3JrX1Byb3RvY29sQnVmZmVyKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8xMl9UaWxlZE1hcCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMTNfRG9tRWxlbWVudCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMTRfU2hhZGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9uZXcgVGVzdF8yMF9MYXlhQWlyM0QoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzIyX0xheWFBaXIzRF9BbmltYXRpb24oKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUZXN0XzI0X1BhdGhmaW5kaW5nXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG5ldyBUZXN0XzI0X1BhdGhmaW5kaW5nKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBBcHBNYWluKCk7IiwiY2xhc3MgT2JzZXJ2ZXIge1xyXG4gICAgLyoqIOS4iuS4i+aWhyAqL1xyXG4gICAgcHJpdmF0ZSBjb250ZXh0OiBhbnkgPSBudWxsO1xyXG4gICAgLyoqIOWbnuiwg+WHveaVsCAqL1xyXG4gICAgcHJpdmF0ZSBjYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQ6IGFueSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43nva5cclxuICAgICAqIEBwYXJhbSBjb250ZXh0IOS4iuS4i+aWh1xyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIOWbnuiwg+WHveaVsFxyXG4gICAgICovXHJcbiAgICByZXNldChjb250ZXh0OiBhbnkgPSBudWxsLCBjYWxsYmFjazogRnVuY3Rpb24gPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HpgIHpgJrnn6VcclxuICAgICAqIEBwYXJhbSBhcmdzIOS4jeWumuWPguaVsFxyXG4gICAgICovXHJcbiAgICBub3RpZnkoLi4uYXJnczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrLmNhbGwodGhpcy5jb250ZXh0LCAuLi5hcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4iuS4i+aWh+avlOi+g1xyXG4gICAgICogQHBhcmFtIGNvbnRleHQg5LiK5LiL5paHXHJcbiAgICAgKi9cclxuICAgIGNvbXBhcihjb250ZXh0OiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gY29udGV4dCA9PSB0aGlzLmNvbnRleHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXRFdmVudERpc3BhdGNoZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IE5ldEV2ZW50RGlzcGF0Y2hlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTmV0RXZlbnREaXNwYXRjaGVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZSB8fCAodGhpcy5pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDnm5HlkKzmlbDnu4QgKi9cclxuICAgIHByaXZhdGUgbGlzdGVuZXJzOiB7IFtpbmRleDogbnVtYmVyXTogQXJyYXk8T2JzZXJ2ZXI+IH0gPSB7fVxyXG4gICAgLyoqIOenu+mZpOaVsOe7hCAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVMaXN0ZW5lcnM6IEFycmF5PE9ic2VydmVyPiA9IFtdXHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgIHB1YmxpYyByZWdpc3RlcihtZXNzYWdlSUQ6IG51bWJlciwgY29udGV4dDogYW55LCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgb2JzZXJ2ZXJzOiBPYnNlcnZlcltdID0gdGhpcy5saXN0ZW5lcnNbbWVzc2FnZUlEXTtcclxuICAgICAgICBpZiAoIW9ic2VydmVycykge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttZXNzYWdlSURdID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnJlbW92ZUxpc3RlbmVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBvYnNlcnZlciA9IHRoaXMucmVtb3ZlTGlzdGVuZXJzLnBvcCgpO1xyXG4gICAgICAgICAgICBvYnNlcnZlci5yZXNldChjb250ZXh0LCBjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21lc3NhZ2VJRF0ucHVzaChvYnNlcnZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttZXNzYWdlSURdLnB1c2gobmV3IE9ic2VydmVyKGNvbnRleHQsIGNhbGxiYWNrKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHVuUmVnaXN0ZXIobWVzc2FnZUlEOiBudW1iZXIsIGNvbnRleHQ6IGFueSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IG9ic2VydmVyczogT2JzZXJ2ZXJbXSA9IHRoaXMubGlzdGVuZXJzW21lc3NhZ2VJRF07XHJcbiAgICAgICAgaWYgKCFvYnNlcnZlcnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gb2JzZXJ2ZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYnNlcnZlciA9IG9ic2VydmVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKG9ic2VydmVyLmNvbXBhcihjb250ZXh0KSkge1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXJzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVycy5wdXNoKG9ic2VydmVyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvYnNlcnZlcnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMubGlzdGVuZXJzW21lc3NhZ2VJRF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGRpc3BhdGNoKG1lc3NhZ2VJRDogbnVtYmVyLCAuLi5hcmdzKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG9ic2VydmVyczogT2JzZXJ2ZXJbXSA9IHRoaXMubGlzdGVuZXJzW21lc3NhZ2VJRF07XHJcbiAgICAgICAgaWYgKCFvYnNlcnZlcnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gb2JzZXJ2ZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYnNlcnZlciA9IG9ic2VydmVyc1tpXTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIubm90aWZ5KG1lc3NhZ2VJRCwgLi4uYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIENsZWFyQWxsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge31cclxuICAgIH1cclxufSIsIlxyXG4vKipcclxuICogUHJvdG9idWYg5raI5oGv5ZCN56ew5Yy56YWNXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXRNZXNzYWdlTmFtZSB7XHJcbiAgICBzdGF0aWMgbWVzc2FnZU1hcCA9IHt9XHJcbiAgICBzdGF0aWMgaXNJbml0ID0gZmFsc2VcclxuICAgIHN0YXRpYyBnZXRNYXAoKTogYW55IHtcclxuICAgICAgICBpZiAoTmV0TWVzc2FnZU5hbWUuaXNJbml0KXtcclxuICAgICAgICAgICAgcmV0dXJuIE5ldE1lc3NhZ2VOYW1lLm1lc3NhZ2VNYXBcclxuICAgICAgICB9XHJcbiAgICAgICAgTmV0TWVzc2FnZU5hbWUuaXNJbml0ID0gdHJ1ZVxyXG5cclxuICAgICAgICAvL01lc3NhZ2VOYW1lXHJcbiAgICAgICAgbGV0IG1hcCA9IE5ldE1lc3NhZ2VOYW1lLm1lc3NhZ2VNYXBcclxuXHJcbiAgICAgICAgbWFwW0dhbWVNZXNzYWdlLkdNX1ZFUklGWV9WRVJTSU9OXT0nR01fVmVyaWZ5VmVyc2lvbic7XHJcbiAgICAgICAgbWFwW0dhbWVNZXNzYWdlLkdNX1ZFUlNJT05fUkVUVVJOXT0nR01fVmVyaWZ5VmVyc2lvblJldHVybic7XHJcblxyXG4gICAgICAgIHJldHVybiBtYXBcclxuICAgIH1cclxufSIsImltcG9ydCBCeXRlID0gTGF5YS5CeXRlXHJcbmltcG9ydCBTb2NrZXRDb25uZWN0IGZyb20gXCIuL1NvY2tldENvbm5lY3RcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXRQYWNrZXQge1xyXG4gICAgLy9wcml2YXRlIFdFQlBBQ0tfSEVBRF9PRkZTRVQ6IG51bWJlciA9IDBcdC8vIOiHquWumuS5ieaVsOaNriDkuIDoiKzmmK9yb2xlaWQgKGxvbmfnsbvlnospXHJcbiAgICAvL3ByaXZhdGUgV0VCUEFDS19NRVNTU0FHRUlEX09GRlNFVDogbnVtYmVyID0gOFx0Ly8g5raI5oGvaWRcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX0xFTkdUSF9PRkZTRVQ6IG51bWJlciA9IDEyXHQvLyDmtojmga/plb/luqZcclxuICAgIHB1YmxpYyBXRUJQQUNLX0hFQURfU0laRTogbnVtYmVyID0gMTZcdC8vIOa2iOaBr+aVsOaNruW8gOWni+S9jee9rlxyXG5cclxuICAgIHB1YmxpYyByb2xlSWQ6IG51bWJlclxyXG4gICAgcHVibGljIG1lc3NhZ2VJZDogbnVtYmVyXHJcbiAgICBwdWJsaWMgbWVzc2FnZTogYW55XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkQnl0ZXM6IEJ5dGVcclxuICAgIHByaXZhdGUgc29ja2V0Q29ubmVjdDogU29ja2V0Q29ubmVjdFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbm5lY3Q6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdCA9IGNvbm5lY3RcclxuICAgICAgICB0aGlzLnJlYWRCeXRlcyA9IG5ldyBCeXRlKClcclxuICAgICAgICB0aGlzLnJlYWRCeXRlcy5lbmRpYW4gPSBMYXlhLkJ5dGUuTElUVExFX0VORElBTi8v6L+Z6YeM5oiR5Lus6YeH55So5bCP56uvXHJcbiAgICB9XHJcblxyXG4gICAgLy/mjqXmlLbmnI3liqHlmajkv6Hmga9cclxuICAgIHB1YmxpYyByZWNlaXZlTXNnKGJ5dGVzOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlYWRCeXRlcy53cml0ZUFycmF5QnVmZmVyKGJ5dGVzKVxyXG4gICAgICAgIHRoaXMucmVhZEJ5dGVzLnBvcyA9IDAvL+iuvue9ruWBj+enu+aMh+mSiFxyXG5cclxuICAgICAgICAvL+aMieeFp+acjeWKoeWZqOS8oOmAkui/h+adpeeahOaVsOaNru+8jOaMieeFp+mhuuW6j+ivu+WPllxyXG4gICAgICAgIHRoaXMucm9sZUlkID0gdGhpcy5yZWFkQnl0ZXMuZ2V0RmxvYXQ2NCgpXHJcbiAgICAgICAgdGhpcy5tZXNzYWdlSWQgPSB0aGlzLnJlYWRCeXRlcy5nZXRJbnQzMigpXHJcbiAgICAgICAgbGV0IG1zZ0xlbmd0aCA9IHRoaXMucmVhZEJ5dGVzLmdldEludDMyKClcclxuICAgICAgICAvL2xldCBhYiA9IHRoaXMucmVhZEJ5dGVzLnJlYWRBcnJheUJ1ZmZlcihtc2dMZW5ndGggLSB0aGlzLldFQlBBQ0tfSEVBRF9TSVpFKVxyXG4gICAgICAgIC8vbGV0IGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KGFiKVxyXG4gICAgICAgIC8vdGhpcy5tZXNzYWdlID0gdGhpcy5zb2NrZXRDb25uZWN0LmRlc2VyaWFsaXplKHRoaXMubWVzc2FnZUlkLCBidWZmZXIpXHJcbiAgICAgICAgbGV0IHVpbnQ4QXJyYXkgPSB0aGlzLnJlYWRCeXRlcy5yZWFkVWludDhBcnJheSh0aGlzLldFQlBBQ0tfSEVBRF9TSVpFLCBtc2dMZW5ndGggLSB0aGlzLldFQlBBQ0tfSEVBRF9TSVpFKVxyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IHRoaXMuc29ja2V0Q29ubmVjdC5kZXNlcmlhbGl6ZSh0aGlzLm1lc3NhZ2VJZCwgdWludDhBcnJheSlcclxuXHJcbiAgICAgICAgLy9pZiAobXNnTGVuZ3RoICE9IHRoaXMucmVhZEJ5dGVzLmxlbmd0aCkge1xyXG4gICAgICAgIC8vICAgIGNvbnNvbGUuZXJyb3IoXCLmtojmga/plb/kuI3kuIDmoLdcIilcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgdGhpcy5yZWFkQnl0ZXMuY2xlYXIoKVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFNvY2tldENvbm5lY3QgZnJvbSBcIi4vU29ja2V0Q29ubmVjdFwiO1xyXG5cclxuY2xhc3MgR2FtZUNsaWVudCB7XHJcbiAgICBwcml2YXRlIGNsaWVudElkOiBDbGllbnRJRDtcclxuICAgIHByaXZhdGUgc29ja2V0Q29ubmVjdDogU29ja2V0Q29ubmVjdDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogQ2xpZW50SUQpIHtcclxuICAgICAgICB0aGlzLmNsaWVudElkID0gaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbm5lY3QoaG9zdDogc3RyaW5nLCBwb3J0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QgPSBuZXcgU29ja2V0Q29ubmVjdChcIiBjbGllbnRJZDpcIiArIHRoaXMuY2xpZW50SWQpO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5jb25uZWN0KGhvc3QsIHBvcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25uZWN0QnlVcmwodXJsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QgPSBuZXcgU29ja2V0Q29ubmVjdChcIiBjbGllbnRJZDpcIiArIHRoaXMuY2xpZW50SWQpO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5jb25uZWN0QnlVcmwodXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVjb25uZWN0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5yZWNvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzY29ubmVjdGVkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5kaXNjb25uZWN0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNDb25uZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ja2V0Q29ubmVjdC5jb25uZWN0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZEVtcHR5KG1zZ0lkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3Quc2VuZEVtcHR5KG1zZ0lkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgbXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3Quc2VuZE1lc3NhZ2UobXNnSWQsIG1zZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ29ubmVjdENhbGxiYWNrKGNhbGxiYWNrOkZ1bmN0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5vbkNvbm5lY3QgPSBjYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25EaXNjb25uZWN0Q2FsbGJhY2soY2FsbGJhY2s6RnVuY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0Lm9uRGlzY29ubmVjdCA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0d29ya01hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IE5ldHdvcmtNYW5hZ2VyO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTmV0d29ya01hbmFnZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlIHx8ICh0aGlzLmluc3RhbmNlID0gbmV3IHRoaXMoKSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdhbWVDbGllbnRNYXA6IHsgW2luZGV4OiBudW1iZXJdOiBHYW1lQ2xpZW50OyB9ID0ge307XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6KeS6ImySURcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFJvbGVJZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnBvdygyLCA1MykgLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVDbGllbnQoY2xpZW50SUQ6IG51bWJlciwgdXJsOiBzdHJpbmcpOiBHYW1lQ2xpZW50IHtcclxuICAgICAgICB2YXIgY2xpZW50OiBHYW1lQ2xpZW50ID0gbmV3IEdhbWVDbGllbnQoY2xpZW50SUQpO1xyXG4gICAgICAgIGNsaWVudC5jb25uZWN0QnlVcmwodXJsKTtcclxuICAgICAgICB0aGlzLmdhbWVDbGllbnRNYXBbQ2xpZW50SUQubG9naW5dID0gY2xpZW50O1xyXG4gICAgICAgIHJldHVybiBjbGllbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENsaWVudChjbGllbnRJRDogQ2xpZW50SUQpOiBHYW1lQ2xpZW50IHtcclxuICAgICAgICBpZiAodGhpcy5nYW1lQ2xpZW50TWFwW2NsaWVudElEXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdhbWVDbGllbnRNYXBbY2xpZW50SURdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VDbGllbnQoY2xpZW50SUQ6IENsaWVudElEKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNsaWVudDogR2FtZUNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KENsaWVudElELmxvZ2luKVxyXG4gICAgICAgIGlmIChjbGllbnQpIHtcclxuICAgICAgICAgICAgY2xpZW50LmRpc2Nvbm5lY3RlZCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWNvbm5lY3RDbGllbnQoY2xpZW50SUQ6IENsaWVudElEKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNsaWVudDogR2FtZUNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KENsaWVudElELmxvZ2luKVxyXG4gICAgICAgIGlmIChjbGllbnQpIHtcclxuICAgICAgICAgICAgY2xpZW50LnJlY29ubmVjdCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dpblNlbmRNZXNzYWdlKG1zZ0lkOiBudW1iZXIsIG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShtc2dJZCwgbXNnLCBDbGllbnRJRC5sb2dpbilcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naWNTZW5kTWVzc2FnZShtc2dJZDogbnVtYmVyLCBtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UobXNnSWQsIG1zZywgQ2xpZW50SUQubG9naWMpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNjZW5lU2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgbXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKG1zZ0lkLCBtc2csIENsaWVudElELnNjZW5lKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgbXNnOiBhbnksIGNsaWVudElEOiBDbGllbnRJRCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGllbnQ6IEdhbWVDbGllbnQgPSB0aGlzLmdldENsaWVudChjbGllbnRJRClcclxuICAgICAgICBpZiAoY2xpZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5zZW5kTWVzc2FnZShtc2dJZCwgbXNnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZE1lc3NhZ2VFbXB0eShtc2dJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNsaWVudDogR2FtZUNsaWVudCA9IG51bGw7XHJcbiAgICAgICAgaWYgKG1zZ0lkID4gR2FtZU1lc3NhZ2UuR01fQUNDT1VOVF9TRVJWRVJfTUVTU0FHRV9TVEFSVCAmJiBtc2dJZCA8IEdhbWVNZXNzYWdlLkdNX0FDQ09VTlRfU0VSVkVSX01FU1NBR0VfRU5EKSB7XHJcbiAgICAgICAgICAgIGNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KENsaWVudElELmxvZ2luKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY2xpZW50ID0gdGhpcy5nZXRDbGllbnQoQ2xpZW50SUQubG9naWMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjbGllbnQpIHtcclxuICAgICAgICAgICAgY2xpZW50LnNlbmRFbXB0eShtc2dJZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQWxsR2FtZUNsaWVudCgpIHtcclxuICAgICAgICBsZXQgZGljID0gdGhpcy5nYW1lQ2xpZW50TWFwXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGljKSB7XHJcbiAgICAgICAgICAgIGlmIChkaWMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRpY1trZXldO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5kaXNjb25uZWN0ZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdhbWVDbGllbnRNYXAgPSB7fVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IE5ldEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vRXZlbnQvTmV0RXZlbnREaXNwYXRjaGVyXCJcclxuaW1wb3J0IE5ldFBhY2tldCBmcm9tIFwiLi9OZXRQYWNrZXRcIlxyXG5pbXBvcnQgTmV0d29ya01hbmFnZXIgZnJvbSBcIi4vTmV0d29ya01hbmFnZXJcIlxyXG5pbXBvcnQgTmV0TWVzc2FnZU5hbWUgZnJvbSBcIi4vTmV0TWVzc2FnZU5hbWVcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2NrZXRDb25uZWN0IHtcclxuXHJcbiAgICAvL3ByaXZhdGUgV0VCUEFDS19IRUFEX09GRlNFVDogbnVtYmVyID0gMFx0Ly8g6Ieq5a6a5LmJ5pWw5o2uIOS4gOiIrOaYr3JvbGVpZCAobG9uZ+exu+WeiylcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX01FU1NTQUdFSURfT0ZGU0VUOiBudW1iZXIgPSA4XHQvLyDmtojmga9pZFxyXG4gICAgLy9wcml2YXRlIFdFQlBBQ0tfTEVOR1RIX09GRlNFVDogbnVtYmVyID0gMTJcdC8vIOa2iOaBr+mVv+W6plxyXG4gICAgcHJpdmF0ZSBXRUJQQUNLX0hFQURfU0laRTogbnVtYmVyID0gMTZcdC8vIOa2iOaBr+aVsOaNruW8gOWni+S9jee9rlxyXG5cclxuXHJcbiAgICBwdWJsaWMgc29ja2V0OiBMYXlhLlNvY2tldCA9IG51bGxcclxuICAgIHByaXZhdGUgc2VuZEJ5dGVzOiBMYXlhLkJ5dGUgPSBudWxsXHJcbiAgICBwcml2YXRlIHJlYWRCeXRlczogTGF5YS5CeXRlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSB0ZW1wQnl0ZXM6IExheWEuQnl0ZSA9IG51bGxcclxuICAgIHByaXZhdGUgdXJsOiBzdHJpbmcgPSBudWxsXHJcbiAgICBwcml2YXRlIHRpcHM6IHN0cmluZyA9IG51bGxcclxuICAgIHByaXZhdGUgcGJNZXNzYWdlTmFtZTogYW55ID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBwcm90b1Jvb3Q6IGFueSA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIG9uQ29ubmVjdDpGdW5jdGlvbiA9IG51bGw7XHJcbiAgICBwdWJsaWMgb25EaXNjb25uZWN0OkZ1bmN0aW9uID0gbnVsbDtcclxuXHJcbiAgICAvL3ByaXZhdGUgc2VuZE5ldFBhY2tldDogQXJyYXk8TmV0UGFja2V0PiA9IG51bGxcclxuICAgIC8vcHJpdmF0ZSByZWNlaXZlTmV0UGFja2V0OiBBcnJheTxOZXRQYWNrZXQ+ID0gbnVsbFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRpcHM6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudGlwcyA9IHRpcHNcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcyA9IG5ldyBMYXlhLkJ5dGUoKVxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLmVuZGlhbiA9IExheWEuQnl0ZS5MSVRUTEVfRU5ESUFOLy/ov5nph4zmiJHku6zph4fnlKjlsI/nq69cclxuICAgICAgICB0aGlzLnRlbXBCeXRlcyA9IG5ldyBMYXlhLkJ5dGUoKVxyXG4gICAgICAgIHRoaXMudGVtcEJ5dGVzLmVuZGlhbiA9IExheWEuQnl0ZS5MSVRUTEVfRU5ESUFOLy/ov5nph4zmiJHku6zph4fnlKjlsI/nq69cclxuXHJcbiAgICAgICAgLy90aGlzLnNlbmROZXRQYWNrZXQgPSBuZXcgQXJyYXk8TmV0UGFja2V0PigpIC8v5Y+R6YCB55qE572R57uc5YyFXHJcbiAgICAgICAgLy90aGlzLnJlY2VpdmVOZXRQYWNrZXQgPSBuZXcgQXJyYXk8TmV0UGFja2V0PigpIC8v5o6l5pS255qE572R57uc5YyFXHJcblxyXG4gICAgICAgIHRoaXMucHJvdG9Sb290ID0gTGF5YS5Ccm93c2VyLndpbmRvd1tcIlBCTWVzc2FnZVwiXVxyXG4gICAgICAgIHRoaXMucGJNZXNzYWdlTmFtZSA9IE5ldE1lc3NhZ2VOYW1lLmdldE1hcCgpXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY29ubmVjdChob3N0OiBzdHJpbmcsIHBvcnQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudXJsID0gaG9zdC5jb25jYXQocG9ydC50b1N0cmluZygpKVxyXG4gICAgICAgIHRoaXMuY29ubmVjdEJ5VXJsKHRoaXMudXJsKVxyXG4gICAgfVxyXG4gICAgLy9cIndzOi8vbG9jYWxob3N0Ojg5ODlcIlxyXG4gICAgcHVibGljIGNvbm5lY3RCeVVybCh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudXJsID0gdXJsXHJcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBuZXcgTGF5YS5Tb2NrZXQoKVxyXG4gICAgICAgIHRoaXMuc29ja2V0LmVuZGlhbiA9IExheWEuQnl0ZS5MSVRUTEVfRU5ESUFOLy/ov5nph4zmiJHku6zph4fnlKjlsI/nq69cclxuICAgICAgICB0aGlzLnNvY2tldC5jb25uZWN0QnlVcmwodXJsKVxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKExheWEuRXZlbnQuT1BFTiwgdGhpcywgdGhpcy5vcGVuSGFuZGxlcilcclxuICAgICAgICB0aGlzLnNvY2tldC5vbihMYXlhLkV2ZW50Lk1FU1NBR0UsIHRoaXMsIHRoaXMucmVjZWl2ZUhhbmRsZXIpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oTGF5YS5FdmVudC5DTE9TRSwgdGhpcywgdGhpcy5jbG9zZUhhbmRsZXIpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oTGF5YS5FdmVudC5FUlJPUiwgdGhpcywgdGhpcy5lcnJvckhhbmRsZXIpXHJcbiAgICB9XHJcbiAgICAvL+mHjeaWsOi/nuaOpVxyXG4gICAgcHVibGljIHJlY29ubmVjdCgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5jbGVhblNvY2tldCgpXHJcbiAgICAgICAgdGhpcy5jb25uZWN0QnlVcmwodGhpcy51cmwpXHJcbiAgICB9XHJcbiAgICAvL+aWreW8gOi/nuaOpVxyXG4gICAgcHVibGljIGRpc2Nvbm5lY3RlZCgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5jbG9zZSgpXHJcbiAgICB9XHJcbiAgICAvL+aYr+WQpui/nuaOpVxyXG4gICAgcHVibGljIGNvbm5lY3RlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zb2NrZXQuY29ubmVjdGVkXHJcbiAgICB9XHJcbiAgICAvL+ato+ehruW7uueri+i/nuaOpVxyXG4gICAgcHJpdmF0ZSBvcGVuSGFuZGxlcihldmVudDogYW55ID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXJsICsgdGhpcy50aXBzICsgXCIgIOato+ehruW7uueri+i/nuaOpVwiKVxyXG4gICAgICAgIGlmICh0aGlzLm9uQ29ubmVjdCl7XHJcbiAgICAgICAgICAgIHRoaXMub25Db25uZWN0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WFs+mXrei/nuaOpeS6i+S7tlxyXG4gICAgcHJpdmF0ZSBjbG9zZUhhbmRsZXIoZXZlbnQ6IGFueSA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVybCArIHRoaXMudGlwcyArIFwiIOWFs+mXrei/nuaOpeS6i+S7tlwiKVxyXG4gICAgICAgIGlmICh0aGlzLm9uRGlzY29ubmVjdCl7XHJcbiAgICAgICAgICAgIHRoaXMub25EaXNjb25uZWN0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+i/nuaOpeWHuumUmVxyXG4gICAgcHJpdmF0ZSBlcnJvckhhbmRsZXIoZTogYW55ID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXJsICsgdGhpcy50aXBzICsgXCIg6L+e5o6l5Ye66ZSZXCIpXHJcbiAgICB9XHJcblxyXG4gICAgLy/lj5HpgIHnqbrmtojmga9cclxuICAgIHB1YmxpYyBzZW5kRW1wdHkobXNnSWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIC8vIOWGmeWFpeS4gOS4quaVsOWtlzBcclxuICAgICAgICB0aGlzLnRlbXBCeXRlcy53cml0ZUZsb2F0MzIoMClcclxuICAgICAgICB0aGlzLnNlbmQobXNnSWQsIHRoaXMudGVtcEJ5dGVzKVxyXG4gICAgICAgIHRoaXMudGVtcEJ5dGVzLmNsZWFyKClcclxuICAgIH1cclxuXHJcbiAgICAvL+WPkemAgea2iOaBr1xyXG4gICAgcHVibGljIHNlbmRNZXNzYWdlKG1zZ0lkOiBudW1iZXIsIG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgLy9pZiAodHlwZW9mIG1zZyA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgLy8gICAgdGhpcy50ZW1wQnl0ZXMud3JpdGVVVEZTdHJpbmcobXNnKVxyXG4gICAgICAgIC8vICAgIHRoaXMuc2VuZChtc2dJZCwgdGhpcy50ZW1wQnl0ZXMpXHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy9lbHNlIGlmIChtc2cgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xyXG4gICAgICAgIC8vICAgIHRoaXMudGVtcEJ5dGVzLndyaXRlQXJyYXlCdWZmZXIoYnVmZmVyKVxyXG4gICAgICAgIC8vICAgIHRoaXMuc2VuZChtc2dJZCwgdGhpcy50ZW1wQnl0ZXMpXHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy9lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgYnVmZmVyOiBVaW50OEFycmF5ID0gdGhpcy5zZXJpYWxpemUobXNnSWQsIG1zZylcclxuICAgICAgICAgICAgdGhpcy50ZW1wQnl0ZXMud3JpdGVBcnJheUJ1ZmZlcihidWZmZXIpXHJcbiAgICAgICAgICAgIHRoaXMuc2VuZChtc2dJZCwgdGhpcy50ZW1wQnl0ZXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6ZyA6KaB5Y+R6YCB55qE5pWw5o2uXHJcbiAgICBwcml2YXRlIHNlbmQobXNnSWQ6IG51bWJlciwgYnl0ZTogTGF5YS5CeXRlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNvY2tldC5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgY29ubmVjdGlvbiBoYXMgYmVlbiBkaXNjb25uZWN0ZWQuXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICAvL1dFQlBBQ0tfSEVBRF9PRkZTRVRcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy53cml0ZUZsb2F0NjQoTmV0d29ya01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb2xlSWQoKSlcclxuICAgICAgICAvL1dFQlBBQ0tfTUVTU1NBR0VJRF9PRkZTRVRcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy53cml0ZUludDMyKG1zZ0lkKVxyXG4gICAgICAgIC8vV0VCUEFDS19MRU5HVEhfT0ZGU0VUXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMud3JpdGVJbnQzMih0aGlzLldFQlBBQ0tfSEVBRF9TSVpFICsgYnl0ZS5sZW5ndGgpXHJcbiAgICAgICAgLy9NYXNzZ2UgYm9keVxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLndyaXRlQXJyYXlCdWZmZXIoYnl0ZS5idWZmZXIpXHJcbiAgICAgICAgLy/ov5nph4zmmK/miorlrZfoioLmlbDnu4TnmoTmlbDmja7pgJrov4dzb2NrZXTlj5HpgIHnu5nmnI3liqHlmahcclxuICAgICAgICB0aGlzLnNvY2tldC5zZW5kKHRoaXMuc2VuZEJ5dGVzLmJ1ZmZlcilcclxuICAgICAgICAvL+a4hemZpOaOieaVsOaNru+8jOaWueS+v+S4i+asoeivu+WGmVxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLmNsZWFyKClcclxuICAgICAgICB0aGlzLnRlbXBCeXRlcy5jbGVhcigpXHJcbiAgICB9XHJcblxyXG4gICAgLy/mjqXmlLbliLDmlbDmja5cclxuICAgIHByaXZhdGUgcmVjZWl2ZUhhbmRsZXIobXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiTWVzc2FnZSBmcm9tIHNlcnZlcjogIFwiICsgbmV3IExheWEuQnl0ZShtc2cpLnJlYWRVVEZCeXRlcygpKVxyXG4gICAgICAgIHZhciBuZXRQYWNrZXQ6IE5ldFBhY2tldCA9IG5ldyBOZXRQYWNrZXQodGhpcylcclxuICAgICAgICBuZXRQYWNrZXQucmVjZWl2ZU1zZyhtc2cpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQuaW5wdXQuY2xlYXIoKVxyXG4gICAgICAgIE5ldEV2ZW50RGlzcGF0Y2hlci5nZXRJbnN0YW5jZSgpLmRpc3BhdGNoKG5ldFBhY2tldC5tZXNzYWdlSWQsIG5ldFBhY2tldClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW6j+WIl+WMliBwcm90b2NvbC1idWZmZXJcclxuICAgICAqIEBwYXJhbSBtYXNzYWdlSWQgXHJcbiAgICAgKiBAcGFyYW0gbWFzc2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VyaWFsaXplKG1hc3NhZ2VJZDogbnVtYmVyLCBtYXNzYWdlOiBhbnkpOiBVaW50OEFycmF5IHtcclxuICAgICAgICBsZXQgbWFzc2FnZU5hbWU6IHN0cmluZyA9IHRoaXMucGJNZXNzYWdlTmFtZVttYXNzYWdlSWRdXHJcbiAgICAgICAgLy8gRW5jb2RlIGEgbWVzc2FnZSB0byBhbiBVaW50OEFycmF5IChicm93c2VyKSBvciBCdWZmZXIgKG5vZGUpXHJcbiAgICAgICAgdmFyIGJ1ZmZlcjogYW55ID0gdGhpcy5wcm90b1Jvb3RbbWFzc2FnZU5hbWVdLmVuY29kZShtYXNzYWdlKS5maW5pc2goKTtcclxuICAgICAgICByZXR1cm4gYnVmZmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+N5bqP5YiX5YyWIHByb3RvY29sLWJ1ZmZlclxyXG4gICAgICogQHBhcmFtIG1hc3NhZ2VOYW1lIFxyXG4gICAgICogQHBhcmFtIG5ldFBhY2thZ2UgTmV0UGFja2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVzZXJpYWxpemUobWFzc2FnZUlkOiBudW1iZXIsIG1hc3NhZ2U6IFVpbnQ4QXJyYXkpOiBhbnkge1xyXG4gICAgICAgIGxldCBtYXNzYWdlTmFtZTogc3RyaW5nID0gdGhpcy5wYk1lc3NhZ2VOYW1lW21hc3NhZ2VJZF1cclxuICAgICAgICAvLyBEZWNvZGUgYW4gVWludDhBcnJheSAoYnJvd3Nlcikgb3IgQnVmZmVyIChub2RlKSB0byBhIG1lc3NhZ2VcclxuICAgICAgICB2YXIgbWVzc2FnZTogYW55ID0gdGhpcy5wcm90b1Jvb3RbbWFzc2FnZU5hbWVdLmRlY29kZShtYXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgIH1cclxuXHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cclxuaW1wb3J0IE1haW5VSSBmcm9tIFwiLi9zY3JpcHQvTWFpblVJXCJcbmltcG9ydCBUZXN0XzlfVGltZUxpbmVVSSBmcm9tIFwiLi9zdHVkeS9UZXN0XzlfVGltZUxpbmVVSVwiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj02NDA7XHJcbiAgICBzdGF0aWMgaGVpZ2h0Om51bWJlcj0xMTM2O1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJmaXhlZGhlaWdodFwiO1xyXG4gICAgc3RhdGljIHNjcmVlbk1vZGU6c3RyaW5nPVwiaG9yaXpvbnRhbFwiO1xyXG4gICAgc3RhdGljIGFsaWduVjpzdHJpbmc9XCJ0b3BcIjtcclxuICAgIHN0YXRpYyBhbGlnbkg6c3RyaW5nPVwibGVmdFwiO1xyXG4gICAgc3RhdGljIHN0YXJ0U2NlbmU6YW55PVwiTWFpbi5zY2VuZVwiO1xyXG4gICAgc3RhdGljIHNjZW5lUm9vdDpzdHJpbmc9XCJcIjtcclxuICAgIHN0YXRpYyBkZWJ1Zzpib29sZWFuPXRydWU7XHJcbiAgICBzdGF0aWMgc3RhdDpib29sZWFuPXRydWU7XHJcbiAgICBzdGF0aWMgcGh5c2ljc0RlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgZXhwb3J0U2NlbmVUb0pzb246Ym9vbGVhbj10cnVlO1xyXG4gICAgY29uc3RydWN0b3IoKXt9XHJcbiAgICBzdGF0aWMgaW5pdCgpe1xyXG4gICAgICAgIHZhciByZWc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xyXG4gICAgICAgIHJlZyhcInNjcmlwdC9NYWluVUkudHNcIixNYWluVUkpO1xuICAgICAgICByZWcoXCJzdHVkeS9UZXN0XzlfVGltZUxpbmVVSS50c1wiLFRlc3RfOV9UaW1lTGluZVVJKTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLmluaXQoKTsiLCJpbXBvcnQgeyB1aSB9IGZyb20gXCIuLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IE5ldHdvcmtNYW5hZ2VyIGZyb20gXCIuLi9GcmFtZXdvcmsvTmV0d29yay9OZXR3b3JrTWFuYWdlclwiO1xyXG5pbXBvcnQgTmV0RXZlbnREaXNwYXRjaGVyIGZyb20gXCIuLi9GcmFtZXdvcmsvRXZlbnQvTmV0RXZlbnREaXNwYXRjaGVyXCI7XHJcbmltcG9ydCBOZXRQYWNrZXQgZnJvbSBcIi4uL0ZyYW1ld29yay9OZXR3b3JrL05ldFBhY2tldFwiO1xyXG5pbXBvcnQgR2FtZU1lc3NhZ2VOYW1lIGZyb20gXCIuLi9GcmFtZXdvcmsvTmV0d29yay9OZXRNZXNzYWdlTmFtZVwiO1xyXG5pbXBvcnQgVUlQYXRoIGZyb20gXCIuLi9VSVBhdGhcIjtcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi4vRnJhbWV3b3JrL1VJL1VJTWFuYWdlclwiO1xyXG5cclxuXHJcbi8v5Li755WM6Z2iXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5VSSBleHRlbmRzIHVpLk1haW5VSSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IHN1cGVyKCk7IH1cclxuXHJcbiAgICBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1haW5VSS5vbkVuYWJsZVwiKVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lTWVzc2FnZS5HTV9WRVJTSU9OX1JFVFVSTik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgTmV0RXZlbnREaXNwYXRjaGVyLmdldEluc3RhbmNlKCkucmVnaXN0ZXIoR2FtZU1lc3NhZ2UuR01fVkVSU0lPTl9SRVRVUk4sIHRoaXMsIHRoaXMuR01fVmVyaWZ5VmVyc2lvblJldHVybilcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYWluVUkub25EaXNhYmxlXCIpXHJcbiAgICAgICAgXHJcbiAgICAgICAgTmV0RXZlbnREaXNwYXRjaGVyLmdldEluc3RhbmNlKCkudW5SZWdpc3RlcihHYW1lTWVzc2FnZS5HTV9WRVJTSU9OX1JFVFVSTiwgdGhpcywgdGhpcy5HTV9WZXJpZnlWZXJzaW9uUmV0dXJuKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIEdNX1ZlcmlmeVZlcnNpb25SZXR1cm4obmV0UGFja2FnZTpOZXRQYWNrZXQpOnZvaWR7XHJcbiAgICAgICAgY29uc29sZS5sb2cobmV0UGFja2FnZS5tZXNzYWdlSWQgKyBcIiAgXCIgKyBuZXRQYWNrYWdlLm1lc3NhZ2UpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uQXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgLy9MYXlhLlNjZW5lLm9wZW4oVUlQYXRoLnRlc3RQYXRoLGZhbHNlKTtcclxuICAgICAgICAvL0xheWEuU2NlbmUub3BlbihVSVBhdGgudGVzdFBhdGgxLGZhbHNlKTtcclxuICAgICAgICAvL0xheWEuU2NlbmUub3BlbihVSVBhdGguVUlfTG9hZGluZyxmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0ZXN0TmV0d29yaygpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlByZWNpc2lvbiBzYWZlLlwiICsgKE1hdGgucG93KDIsIDUzKSAtIDEpKTtcclxuXHJcbiAgICAgICAgLy92YXIgbXNnID0ge1xyXG4gICAgICAgIC8vICAgIHZlcnNpb246IFwiMS41LjRcIixcdFx0XHRcdC8v5a6i5oi356uv54mI5pys5Y+3XHJcbiAgICAgICAgLy8gICAgcGxhdGZvcm06IDkwMDcxOTkyNTQ3NDA5OTEsICAgICAgICAgICAgIC8vL+W5s+WPsFxyXG4gICAgICAgIC8vICAgIGlzdGVzdDogMCwvLy8gICAgMOOAgeato+W4uO+8jDHjgIHmtYvor5XvvIzkuI3pnIDopoHpqozor4HniYjmnKxcclxuICAgICAgICAvL31cclxuICAgICAgICAvL3ZhciByb290ID0gTGF5YS5Ccm93c2VyLndpbmRvd1tcIlBCTWVzc2FnZVwiXTtcclxuICAgICAgICAvL3ZhciBwYk1lc3NhZ2VOYW1lID0gR2FtZU1lc3NhZ2VOYW1lLmdldE1hcCgpXHJcbiAgICAgICAgLy92YXIgYnVmZmVyOiBhbnkgPSByb290W3BiTWVzc2FnZU5hbWVbR2FtZU1lc3NhZ2UuR01fVkVSSUZZX1ZFUlNJT05dXS5lbmNvZGUobXNnKS5maW5pc2goKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGJ1ZmZlcik7XHJcbiAgICAgICAgLy9cclxuXHJcbiAgICAgICAgdmFyIGdhbWVDbGllbnQgPSBOZXR3b3JrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUNsaWVudCgwLCBcIndzOi8vMTkyLjE2OC4yLjEyNjo1MDAwMFwiKTtcclxuICAgICAgICBnYW1lQ2xpZW50Lm9uQ29ubmVjdENhbGxiYWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG1zZyA9IHtcclxuICAgICAgICAgICAgICAgIHZlcnNpb246IFwiMS41LjRcIixcdFx0XHRcdC8v5a6i5oi356uv54mI5pys5Y+3XHJcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybTogOTAwNzE5OTI1NDc0MDk5MSwgICAgICAgICAgICAgLy8v5bmz5Y+wXHJcbiAgICAgICAgICAgICAgICBpc3Rlc3Q6IDAsLy8vICAgIDDjgIHmraPluLjvvIwx44CB5rWL6K+V77yM5LiN6ZyA6KaB6aqM6K+B54mI5pysXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgTmV0d29ya01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2dpblNlbmRNZXNzYWdlKEdhbWVNZXNzYWdlLkdNX1ZFUklGWV9WRVJTSU9OLCBtc2cpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0XzI0X1BhdGhmaW5kaW5nIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB2YXIgbWF0cml4OiBBcnJheTxBcnJheTxudW1iZXI+PiA9IFtcclxuICAgICAgICAgICAgWzAsIDEsIDAsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMSwgMCwgMSwgMF0sXHJcbiAgICAgICAgICAgIFswLCAxLCAwLCAxLCAwXSxcclxuICAgICAgICAgICAgWzAsIDEsIDAsIDEsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMSwgMF1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbWF0cml4Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gbWF0cml4W2luZGV4XTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJtYXRyaXgge1wiICsgaW5kZXggKyBcIn1cIiAgKyBlbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBHcmlkOmFueSA9IExheWEuQ2xhc3NVdGlscy5nZXRDbGFzcyhcIlBhdGhGaW5kaW5nLmNvcmUuR3JpZFwiKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgZ3JpZDogYW55ID0gbmV3IEdyaWQoNSwgNSwgbWF0cml4KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhncmlkKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgb2JqOk9iamVjdCA9IHtcclxuICAgICAgICAgICAgYWxsb3dEaWFnb25hbDpmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIEFTdGFyRmluZGVyOmFueSA9IExheWEuQ2xhc3NVdGlscy5nZXRDbGFzcyhcIlBhdGhGaW5kaW5nLmZpbmRlcnMuQVN0YXJGaW5kZXJcIik7XHJcbiAgICAgICAgdmFyIGZpbmRlcjphbnkgPSBuZXcgQVN0YXJGaW5kZXIob2JqKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzdGFydFggMCxzdGFydFkgMCxlbmRYIDQsZW5kWSA0IFwiKTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgdmFyIHBhdGg6YW55ID0gZmluZGVyLmZpbmRQYXRoKDAsMCw0LDQsZ3JpZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQYXRoOlwiICsgcGF0aCk7XHJcbiAgICB9XHJcblxyXG59IiwiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdF85X1RpbWVMaW5lVUlcclxue1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy/liqDovb3lm77pm4bmiJDlip/lkI7vvIzmiafooYxvbkxvYWTlm57osIPmlrnms5VcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKFwicmVzL2F0bGFzL3Rlc3QuYXRsYXNcIixMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbkxvYWRlZCkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIG9uTG9hZGVkKCk6dm9pZHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWKoOi9veWbvumbhuaIkOWKn+WQju+8jOaJp+ihjG9uTG9hZOWbnuiwg+aWueazlVwiKVxyXG4gICAgICAgIC8v5Yib5bu65LiA5LiqVUnlrp7kvotcclxuICAgICAgICAvL3ZhciBwbGFuOlRpbWVMaW5lVUkgPSBuZXcgVGltZUxpbmVVSSgpXHJcbiAgICAgICAgLy/mt7vliqDliLDoiJ7lj7BcclxuICAgICAgICAvL0xheWEuc3RhZ2UuYWRkQ2hpbGQocGxhbik7XHJcbiAgICAgICAgLy/mkq3mlL5VSeWcuuaZr+S4reeahOWKqOeUu1xyXG4gICAgICAgIC8vdGhpcy5iZWFyLnBsYXkoKTtcclxuICAgIH1cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xuaW1wb3J0IFZpZXc9TGF5YS5WaWV3O1xyXG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xyXG5pbXBvcnQgU2NlbmU9TGF5YS5TY2VuZTtcbnZhciBSRUc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xuZXhwb3J0IG1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgTWFpblVJIGV4dGVuZHMgVmlldyB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIk1haW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuTWFpblVJXCIsTWFpblVJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBUZXN0VUkgZXh0ZW5kcyBWaWV3IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiVGVzdFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5UZXN0VUlcIixUZXN0VUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIFRlc3QxVUkgZXh0ZW5kcyBWaWV3IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiVGVzdDFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuVGVzdDFVSVwiLFRlc3QxVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbWVMaW5lVUkgZXh0ZW5kcyBEaWFsb2cge1xyXG5cdFx0cHVibGljIGJlYXI6TGF5YS5BbmltYXRpb247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJUaW1lTGluZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5UaW1lTGluZVVJXCIsVGltZUxpbmVVSSk7XHJcbn1cclxuZXhwb3J0IG1vZHVsZSB1aS5VSV9Mb2FkaW5nIHtcclxuICAgIGV4cG9ydCBjbGFzcyBVSV9Mb2FkaW5nVUkgZXh0ZW5kcyBWaWV3IHtcclxuXHRcdHB1YmxpYyBhbmkxOkxheWEuRnJhbWVBbmltYXRpb247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJVSV9Mb2FkaW5nL1VJX0xvYWRpbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuVUlfTG9hZGluZy5VSV9Mb2FkaW5nVUlcIixVSV9Mb2FkaW5nVUkpO1xyXG59XHIiXX0=
