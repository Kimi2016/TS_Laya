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
var Test_7_OrthographicCamera_1 = require("./study3D/Test_7_OrthographicCamera");
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
        this.setup3D();
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
        //new Test_24_Pathfinding();
    };
    AppMain.prototype.setup3D = function () {
        //new Test_1_OrthographicCamera();
        //new Test_2_Sprite3DTransform();
        //new Test_3_MeshLoad();
        //new  Test_4_CustomMesh();
        //new  Test_5_LightDemo();
        //new Test_6_MultiCamera();
        new Test_7_OrthographicCamera_1.default();
        //new Test_8_D3SpaceToD2Space();
        //new Test_9_SkinAnimation_New();
        //new Test_12_3DTiledMap();
    };
    return AppMain;
}());
//激活启动类
new AppMain();
},{"./GameConfig":7,"./study3D/Test_7_OrthographicCamera":9}],2:[function(require,module,exports){
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
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
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
var Test_7_OrthographicCamera = /** @class */ (function () {
    function Test_7_OrthographicCamera() {
        this._2DPos = new Laya.Vector3(310, 500, 0);
        this.out3DPos = new Laya.Vector3(0, 0, 0);
        var image = new Laya.Image("./res/cartoon2/background.jpg");
        Laya.stage.addChild(image);
        var scene = new Laya.Scene3D();
        Laya.stage.addChild(scene);
        this.camera = new Laya.Camera(0, 0.1, 1000);
        this.camera.transform.rotate(new Laya.Vector3(-45, 0, 0), false, false);
        this.camera.transform.translate(new Laya.Vector3(0, 2, 500));
        //正交投影属性设置
        this.camera.orthographic = true;
        //正交垂直矩阵距离，控制3D物体远近与现实大小
        this.camera.orthographicVerticalSize = 10;
        //清除标记，仅深度
        this.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY;
        this.camera.clearColor = null;
        this.camera.cullingMask = Math.pow(2, 0) | Math.pow(2, 1);
        scene.addChild(this.camera);
        var directionLight = new Laya.DirectionLight();
        scene.addChild(directionLight);
        Laya.Sprite3D.load("./res/animation/player/mage/mage.lh", Laya.Handler.create(this, this.onLoadCompleted, [scene]));
        Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
    }
    Test_7_OrthographicCamera.prototype.onLoadCompleted = function (scene, sprite3D) {
        this.role3D = sprite3D;
        scene.addChild(sprite3D);
        this.role3D.transform.scale = new Laya.Vector3(0.3, 0.3, 0.3);
        this.resize();
    };
    Test_7_OrthographicCamera.prototype.resize = function () {
        //转换2D屏幕坐标系统到3D正交投影下的坐标系统
        this.camera.convertScreenCoordToOrthographicCoord(this._2DPos, this.out3DPos);
        this.role3D.transform.position = this.out3DPos;
    };
    return Test_7_OrthographicCamera;
}());
exports.default = Test_7_OrthographicCamera;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkc6L0xheWEvTGF5YUFpcklERV9iZXRhL3Jlc291cmNlcy9hcHAvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9BcHBNYWluLnRzIiwic3JjL0ZyYW1ld29yay9FdmVudC9OZXRFdmVudERpc3BhdGNoZXIudHMiLCJzcmMvRnJhbWV3b3JrL05ldHdvcmsvTmV0TWVzc2FnZU5hbWUudHMiLCJzcmMvRnJhbWV3b3JrL05ldHdvcmsvTmV0UGFja2V0LnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL05ldHdvcmtNYW5hZ2VyLnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL1NvY2tldENvbm5lY3QudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9zY3JpcHQvTWFpblVJLnRzIiwic3JjL3N0dWR5M0QvVGVzdF83X09ydGhvZ3JhcGhpY0NhbWVyYS50cyIsInNyYy9zdHVkeS9UZXN0XzlfVGltZUxpbmVVSS50cyIsInNyYy91aS9sYXlhTWF4VUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDVkEsSUFBTyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUM3QixJQUFPLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO0FBQ3pCLElBQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7QUFrQnpCLDJDQUFzQztBQWlCdEMsaUZBQTRFO0FBSzVFLEtBQUs7QUFDTDtJQUNJO1FBQ0ksZ0JBQWdCO1FBQ2hCLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQVUsQ0FBQyxLQUFLLEVBQUUsb0JBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwRDthQUNJO1lBQ0QsdUJBQXVCO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdB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QyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FQQSxBQU9DLENBUCtCLE1BQU0sR0FPckM7SUFQWSxhQUFVLGFBT3RCLENBQUE7SUFDRCxHQUFHLENBQUMsZUFBZSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BDLENBQUMsRUFsQ2EsRUFBRSxHQUFGLFVBQUUsS0FBRixVQUFFLFFBa0NmO0FBQ0QsV0FBYyxFQUFFO0lBQUMsSUFBQSxVQUFVLENBVTFCO0lBVmdCLFdBQUEsVUFBVTtRQUN2QjtZQUFrQyxnQ0FBSTtZQUVsQzt1QkFBZSxpQkFBTztZQUFBLENBQUM7WUFDdkIscUNBQWMsR0FBZDtnQkFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQzVDLENBQUM7WUFDTCxtQkFBQztRQUFELENBUEEsQUFPQyxDQVBpQyxJQUFJLEdBT3JDO1FBUFksdUJBQVksZUFPeEIsQ0FBQTtRQUNELEdBQUcsQ0FBQyw0QkFBNEIsRUFBQyxZQUFZLENBQUMsQ0FBQztJQUNuRCxDQUFDLEVBVmdCLFVBQVUsR0FBVixhQUFVLEtBQVYsYUFBVSxRQVUxQjtBQUFELENBQUMsRUFWYSxFQUFFLEdBQUYsVUFBRSxLQUFGLFVBQUUsUUFVZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgQnJvd3NlciA9IExheWEuQnJvd3NlclxyXG5pbXBvcnQgV2ViR0wgPSBMYXlhLldlYkdMXHJcbmltcG9ydCBTdGFnZSA9IExheWEuU3RhZ2VcclxuXHJcbmltcG9ydCBUZXN0XzFfVGV4dCBmcm9tICcuL3N0dWR5L1Rlc3RfMV9UZXh0JztcclxuaW1wb3J0IFRlc3RfMl9JbnB1dFRlc3QgZnJvbSAnLi9zdHVkeS9UZXN0XzJfSW5wdXRUZXN0JztcclxuaW1wb3J0IFRlc3RfM19CaXRtYXBGb250IGZyb20gJy4vc3R1ZHkvVGVzdF8zX0JpdG1hcEZvbnQnO1xyXG5pbXBvcnQgVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8xX1Nwcml0ZV9EaXNwbGF5SW1hZ2UnO1xyXG5pbXBvcnQgVGVzdF80XzFfU3ByaXRlX1N3aXRjaFRleHR1cmUgZnJvbSAnLi9zdHVkeS9UZXN0XzRfMV9TcHJpdGVfU3dpdGNoVGV4dHVyZSc7XHJcbmltcG9ydCBUZXN0XzRfMl9TcHJpdGVfRGlzcGxheUltYWdlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzJfU3ByaXRlX0Rpc3BsYXlJbWFnZSc7XHJcbmltcG9ydCBUZXN0XzRfMl9TcHJpdGVfU3dpdGNoVGV4dHVyZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlJztcclxuaW1wb3J0IFRlc3RfNF9NYXNrRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfNF9NYXNrRGVtbyc7XHJcbmltcG9ydCBUZXN0XzVfMV9Db2xvckZpbHRlciBmcm9tICcuL3N0dWR5L1Rlc3RfNV8xX0NvbG9yRmlsdGVyJztcclxuaW1wb3J0IFRlc3RfNV8yX0dsb3dGaWx0ZXIgZnJvbSAnLi9zdHVkeS9UZXN0XzVfMl9HbG93RmlsdGVyJztcclxuaW1wb3J0IFRlc3RfNl8xX1Nwcml0ZV9EcmF3U2hhcGVzIGZyb20gJy4vc3R1ZHkvVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMnO1xyXG5pbXBvcnQgVGVzdF83X0F0bGFzQW5pRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfN19BdGxhc0FuaURlbW8nO1xyXG5pbXBvcnQgVGVzdF84X1R3ZWVuRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfOF9Ud2VlbkRlbW8nO1xyXG5pbXBvcnQgVGVzdF85X1RpbWVMaW5lIGZyb20gJy4vc3R1ZHkvVGVzdF85X1RpbWVMaW5lJztcclxuaW1wb3J0IFRlc3RfOV9UaW1lTGluZVVJIGZyb20gJy4vc3R1ZHkvVGVzdF85X1RpbWVMaW5lVUknO1xyXG5pbXBvcnQgVGVzdF8xMV9Tb3VuZCBmcm9tICcuL3N0dWR5L1Rlc3RfMTFfU291bmQnO1xyXG5pbXBvcnQgR2FtZUNvbmZpZyBmcm9tICcuL0dhbWVDb25maWcnO1xyXG5pbXBvcnQgVGVzdF8wXzFfQ2hhbm5lbCBmcm9tICcuL3N0dWR5L1Rlc3RfMF8xX0NoYW5uZWwnO1xyXG5pbXBvcnQgVGVzdF8wXzFfU29ja2V0IGZyb20gJy4vc3R1ZHkvVGVzdF8wXzFfU29ja2V0JztcclxuaW1wb3J0IFRlc3RfMF9OZXR3b3JrX1Byb3RvY29sQnVmZmVyIGZyb20gJy4vc3R1ZHkvVGVzdF8wX05ldHdvcmtfUHJvdG9jb2xCdWZmZXInO1xyXG5pbXBvcnQgTmV0d29ya01hbmFnZXIgZnJvbSAnLi9GcmFtZXdvcmsvTmV0d29yay9OZXR3b3JrTWFuYWdlcic7XHJcbmltcG9ydCBUZXN0XzEyX1RpbGVkTWFwIGZyb20gJy4vc3R1ZHkvVGVzdF8xMl9UaWxlZE1hcCc7XHJcbmltcG9ydCBUZXN0XzEzX0RvbUVsZW1lbnQgZnJvbSAnLi9zdHVkeS9UZXN0XzEzX0RvbUVsZW1lbnQnO1xyXG5pbXBvcnQgVGVzdF8xNF9TaGFkZXIgZnJvbSAnLi9zdHVkeS9UZXN0XzE0X1NoYWRlcic7XHJcbmltcG9ydCBUZXN0XzIwX0xheWFBaXIzRCBmcm9tICcuL3N0dWR5L1Rlc3RfMjBfTGF5YUFpcjNEJztcclxuaW1wb3J0IFRlc3RfMjJfTGF5YUFpcjNEX0FuaW1hdGlvbiBmcm9tICcuL3N0dWR5L1Rlc3RfMjJfTGF5YUFpcjNEX0FuaW1hdGlvbic7XHJcbmltcG9ydCBUZXN0XzI0X1BhdGhmaW5kaW5nIGZyb20gJy4vc3R1ZHkvVGVzdF8yNF9QYXRoZmluZGluZyc7XHJcbmltcG9ydCBUZXN0XzFfT3J0aG9ncmFwaGljQ2FtZXJhIGZyb20gJy4vc3R1ZHkzRC9UZXN0XzFfT3J0aG9ncmFwaGljQ2FtZXJhJztcclxuaW1wb3J0IFRlc3RfMl9TcHJpdGUzRFRyYW5zZm9ybSBmcm9tICcuL3N0dWR5M0QvVGVzdF8yX1Nwcml0ZTNEVHJhbnNmb3JtJztcclxuaW1wb3J0IFRlc3RfM19NZXNoTG9hZCBmcm9tICcuL3N0dWR5M0QvVGVzdF8zX01lc2hMb2FkJztcclxuaW1wb3J0IFRlc3RfNF9DdXN0b21NZXNoIGZyb20gJy4vc3R1ZHkzRC9UZXN0XzRfQ3VzdG9tTWVzaCc7XHJcbmltcG9ydCBUZXN0XzVfTGlnaHREZW1vIGZyb20gJy4vc3R1ZHkzRC9UZXN0XzVfTGlnaHREZW1vJztcclxuaW1wb3J0IFRlc3RfNl9NdWx0aUNhbWVyYSBmcm9tICcuL3N0dWR5M0QvVGVzdF82X011bHRpQ2FtZXJhJztcclxuaW1wb3J0IFRlc3RfN19PcnRob2dyYXBoaWNDYW1lcmEgZnJvbSAnLi9zdHVkeTNEL1Rlc3RfN19PcnRob2dyYXBoaWNDYW1lcmEnO1xyXG5pbXBvcnQgVGVzdF84X0QzU3BhY2VUb0QyU3BhY2UgZnJvbSAnLi9zdHVkeTNEL1Rlc3RfOF9EM1NwYWNlVG9EMlNwYWNlJztcclxuaW1wb3J0IFRlc3RfOV9Ta2luQW5pbWF0aW9uX05ldyBmcm9tICcuL3N0dWR5M0QvVGVzdF85X1NraW5BbmltYXRpb25fTmV3JztcclxuaW1wb3J0IFRlc3RfMTJfM0RUaWxlZE1hcCBmcm9tICcuL3N0dWR5M0QvVGVzdF8xMl8zRFRpbGVkTWFwJztcclxuXHJcbi8v5ZCv5Yqo57G7XHJcbmNsYXNzIEFwcE1haW4ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy/moLnmja5JREXorr7nva7liJ3lp4vljJblvJXmk45cdFx0XHJcbiAgICAgICAgaWYgKHdpbmRvd1tcIkxheWEzRFwiXSkge1xyXG4gICAgICAgICAgICBMYXlhM0QuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDkuI3mlK/mjIFXZWJHTOaXtuiHquWKqOWIh+aNouiHs0NhbnZhc1xyXG4gICAgICAgICAgICBMYXlhLmluaXQoQnJvd3Nlci5jbGllbnRXaWR0aCwgQnJvd3Nlci5jbGllbnRIZWlnaHQsIFdlYkdMKTtcclxuICAgICAgICAgICAgLy9MYXlhLmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQsIExheWFbXCJXZWJHTFwiXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExheWFbXCJQaHlzaWNzXCJdICYmIExheWFbXCJQaHlzaWNzXCJdLmVuYWJsZSgpO1xyXG4gICAgICAgIExheWFbXCJEZWJ1Z1BhbmVsXCJdICYmIExheWFbXCJEZWJ1Z1BhbmVsXCJdLmVuYWJsZSgpO1xyXG5cclxuXHJcbiAgICAgICAgLy/miZPlvIDosIPor5XpnaLmnb/vvIjpgJrov4dJREXorr7nva7osIPor5XmqKHlvI/vvIzmiJbogIV1cmzlnLDlnYDlop7liqBkZWJ1Zz10cnVl5Y+C5pWw77yM5Z2H5Y+v5omT5byA6LCD6K+V6Z2i5p2/77yJXHJcbiAgICAgICAgaWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuICAgICAgICBpZiAoR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgJiYgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0pIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdLmVuYWJsZSgpO1xyXG4gICAgICAgIGlmIChHYW1lQ29uZmlnLnN0YXQpIExheWEuU3RhdC5zaG93KCk7XHJcblxyXG4gICAgICAgIC8v6KGo56S65piv5ZCm5o2V6I635YWo5bGA6ZSZ6K+v5bm25by55Ye65o+Q56S644CCXHJcbiAgICAgICAgTGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy/mv4DmtLvotYTmupDniYjmnKzmjqfliLbvvIx2ZXJzaW9uLmpzb27nlLFJREXlj5HluIPlip/og73oh6rliqjnlJ/miJDvvIzlpoLmnpzmsqHmnInkuZ/kuI3lvbHlk43lkI7nu63mtYHnqItcclxuICAgICAgICBMYXlhLlJlc291cmNlVmVyc2lvbi5lbmFibGUoXCJ2ZXJzaW9uLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uVmVyc2lvbkxvYWRlZCksIExheWEuUmVzb3VyY2VWZXJzaW9uLkZJTEVOQU1FX1ZFUlNJT04pO1xyXG5cclxuXHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnblYgPSBTdGFnZS5BTElHTl9NSURETEU7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnbkggPSBTdGFnZS5BTElHTl9DRU5URVI7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBHYW1lQ29uZmlnLnNjYWxlTW9kZTsvL1N0YWdlLlNDQUxFX0ZVTEw7Ly9TQ0FMRV9GSVhFRF9IRUlHSFRcclxuICAgICAgICBMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBHYW1lQ29uZmlnLnNjcmVlbk1vZGU7Ly9TdGFnZS5TQ1JFRU5fSE9SSVpPTlRBTDsvL1NDUkVFTl9WRVJUSUNBTFxyXG4gICAgICAgIExheWEuc3RhZ2UuYmdDb2xvciA9IFwiIzdmN2Y3ZlwiO1xyXG5cclxuICAgICAgICAvL+WFvOWuueW+ruS/oeS4jeaUr+aMgeWKoOi9vXNjZW5l5ZCO57yA5Zy65pmvXHJcbiAgICAgICAgTGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuICAgICAgICAvL+WmguaenOmAmui/h+iuvuWkh+mdmemfs+mUruiuqemfs+mikeiHquWKqOi3n+maj+iuvuWkh+mdmemfs+OAgumcgOimgeWwhnVzZUF1ZGlvTXVzaWPorr7nva7kuLpmYWxzZeOAglxyXG4gICAgICAgIExheWEuU291bmRNYW5hZ2VyLnVzZUF1ZGlvTXVzaWMgPSBmYWxzZTtcclxuICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5hdXRvU3RvcE11c2ljID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8v5raI6Zmk55+i6YeP57uY5Yi255qE6ZSv6b2/77yM5L2G5Lya5aKe5Yqg5oCn6IO95raI6ICXXHJcbiAgICAgICAgLy9Db25maWcuaXNBbnRpYWxpYXM9dHJ1ZTtcclxuXHJcbiAgICAgICAgLy/plIDmr4HlvZPliY3msqHmnInooqvkvb/nlKjnmoTotYTmupAs6K+l5Ye95pWw5Lya5b+955WlbG9jaz10cnVl55qE6LWE5rqQ44CCXHJcbiAgICAgICAgLy9MYXlhLlJlc291cmNlLmRlc3Ryb3lVbnVzZWRSZXNvdXJjZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblZlcnNpb25Mb2FkZWQoKTogdm9pZCB7XHJcbiAgICAgICAgLy/mv4DmtLvlpKflsI/lm77mmKDlsITvvIzliqDovb3lsI/lm77nmoTml7blgJnvvIzlpoLmnpzlj5HnjrDlsI/lm77lnKjlpKflm77lkIjpm4bph4zpnaLvvIzliJnkvJjlhYjliqDovb3lpKflm77lkIjpm4bvvIzogIzkuI3mmK/lsI/lm75cclxuICAgICAgICBMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29uZmlnTG9hZGVkKCk6IHZvaWQge1xyXG5cclxuICAgICAgICB0aGlzLnNldHVwM0QoKTtcclxuICAgICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICAgICAgLy/liqDovb1JREXmjIflrprnmoTlnLrmma9cclxuICAgICAgICAvL0dhbWVDb25maWcuc3RhcnRTY2VuZSAmJiBMYXlhLlNjZW5lLm9wZW4oR2FtZUNvbmZpZy5zdGFydFNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldHVwKCk6IHZvaWQge1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMV9UZXh0KCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8yX0lucHV0VGVzdCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfM19CaXRtYXBGb250KCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8xX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80XzJfU3ByaXRlX0Rpc3BsYXlJbWFnZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80X01hc2tEZW1vKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF81XzFfQ29sb3JGaWx0ZXIoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzVfMl9HbG93RmlsdGVyKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzdfQXRsYXNBbmlEZW1vKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF84X1R3ZWVuRGVtbygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfOV9UaW1lTGluZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfOV9UaW1lTGluZVVJKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8xMV9Tb3VuZCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMF8xX1NvY2tldCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMF9OZXR3b3JrX1Byb3RvY29sQnVmZmVyKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8xMl9UaWxlZE1hcCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMTNfRG9tRWxlbWVudCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMTRfU2hhZGVyKCk7XHJcblxyXG4gICAgICAgIC8vbmV3IFRlc3RfMjBfTGF5YUFpcjNEKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8yMl9MYXlhQWlyM0RfQW5pbWF0aW9uKCk7XHJcblxyXG4gICAgICAgIC8vbmV3IFRlc3RfMjRfUGF0aGZpbmRpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldHVwM0QoKTogdm9pZCB7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8xX09ydGhvZ3JhcGhpY0NhbWVyYSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMl9TcHJpdGUzRFRyYW5zZm9ybSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfM19NZXNoTG9hZCgpO1xyXG4gICAgICAgIC8vbmV3ICBUZXN0XzRfQ3VzdG9tTWVzaCgpO1xyXG4gICAgICAgIC8vbmV3ICBUZXN0XzVfTGlnaHREZW1vKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF82X011bHRpQ2FtZXJhKCk7XHJcbiAgICAgICAgbmV3IFRlc3RfN19PcnRob2dyYXBoaWNDYW1lcmEoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzhfRDNTcGFjZVRvRDJTcGFjZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfOV9Ta2luQW5pbWF0aW9uX05ldygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMTJfM0RUaWxlZE1hcCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgQXBwTWFpbigpOyIsImNsYXNzIE9ic2VydmVyIHtcclxuICAgIC8qKiDkuIrkuIvmlocgKi9cclxuICAgIHByaXZhdGUgY29udGV4dDogYW55ID0gbnVsbDtcclxuICAgIC8qKiDlm57osIPlh73mlbAgKi9cclxuICAgIHByaXZhdGUgY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBhbnksIGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeN572uXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCDkuIrkuIvmlodcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDlm57osIPlh73mlbBcclxuICAgICAqL1xyXG4gICAgcmVzZXQoY29udGV4dDogYW55ID0gbnVsbCwgY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R6YCB6YCa55+lXHJcbiAgICAgKiBAcGFyYW0gYXJncyDkuI3lrprlj4LmlbBcclxuICAgICAqL1xyXG4gICAgbm90aWZ5KC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjay5jYWxsKHRoaXMuY29udGV4dCwgLi4uYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrkuIvmlofmr5TovoNcclxuICAgICAqIEBwYXJhbSBjb250ZXh0IOS4iuS4i+aWh1xyXG4gICAgICovXHJcbiAgICBjb21wYXIoY29udGV4dDogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRleHQgPT0gdGhpcy5jb250ZXh0O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0RXZlbnREaXNwYXRjaGVyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBOZXRFdmVudERpc3BhdGNoZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IE5ldEV2ZW50RGlzcGF0Y2hlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2UgfHwgKHRoaXMuaW5zdGFuY2UgPSBuZXcgdGhpcygpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog55uR5ZCs5pWw57uEICovXHJcbiAgICBwcml2YXRlIGxpc3RlbmVyczogeyBbaW5kZXg6IG51bWJlcl06IEFycmF5PE9ic2VydmVyPiB9ID0ge31cclxuICAgIC8qKiDnp7vpmaTmlbDnu4QgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlTGlzdGVuZXJzOiBBcnJheTxPYnNlcnZlcj4gPSBbXVxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXIobWVzc2FnZUlEOiBudW1iZXIsIGNvbnRleHQ6IGFueSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IG9ic2VydmVyczogT2JzZXJ2ZXJbXSA9IHRoaXMubGlzdGVuZXJzW21lc3NhZ2VJRF07XHJcbiAgICAgICAgaWYgKCFvYnNlcnZlcnMpIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbWVzc2FnZUlEXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5yZW1vdmVMaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgb2JzZXJ2ZXIgPSB0aGlzLnJlbW92ZUxpc3RlbmVycy5wb3AoKTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIucmVzZXQoY29udGV4dCwgY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttZXNzYWdlSURdLnB1c2gob2JzZXJ2ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbWVzc2FnZUlEXS5wdXNoKG5ldyBPYnNlcnZlcihjb250ZXh0LCBjYWxsYmFjaykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyB1blJlZ2lzdGVyKG1lc3NhZ2VJRDogbnVtYmVyLCBjb250ZXh0OiBhbnksIGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBvYnNlcnZlcnM6IE9ic2VydmVyW10gPSB0aGlzLmxpc3RlbmVyc1ttZXNzYWdlSURdO1xyXG4gICAgICAgIGlmICghb2JzZXJ2ZXJzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbmd0aCA9IG9ic2VydmVycy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgb2JzZXJ2ZXIgPSBvYnNlcnZlcnNbaV07XHJcbiAgICAgICAgICAgIGlmIChvYnNlcnZlci5jb21wYXIoY29udGV4dCkpIHtcclxuICAgICAgICAgICAgICAgIG9ic2VydmVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMucHVzaChvYnNlcnZlcik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob2JzZXJ2ZXJzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmxpc3RlbmVyc1ttZXNzYWdlSURdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBkaXNwYXRjaChtZXNzYWdlSUQ6IG51bWJlciwgLi4uYXJncyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBvYnNlcnZlcnM6IE9ic2VydmVyW10gPSB0aGlzLmxpc3RlbmVyc1ttZXNzYWdlSURdO1xyXG4gICAgICAgIGlmICghb2JzZXJ2ZXJzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbmd0aCA9IG9ic2VydmVycy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgb2JzZXJ2ZXIgPSBvYnNlcnZlcnNbaV07XHJcbiAgICAgICAgICAgIG9ic2VydmVyLm5vdGlmeShtZXNzYWdlSUQsIC4uLmFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBDbGVhckFsbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9XHJcbiAgICB9XHJcbn0iLCJcclxuLyoqXHJcbiAqIFByb3RvYnVmIOa2iOaBr+WQjeensOWMuemFjVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0TWVzc2FnZU5hbWUge1xyXG4gICAgc3RhdGljIG1lc3NhZ2VNYXAgPSB7fVxyXG4gICAgc3RhdGljIGlzSW5pdCA9IGZhbHNlXHJcbiAgICBzdGF0aWMgZ2V0TWFwKCk6IGFueSB7XHJcbiAgICAgICAgaWYgKE5ldE1lc3NhZ2VOYW1lLmlzSW5pdCl7XHJcbiAgICAgICAgICAgIHJldHVybiBOZXRNZXNzYWdlTmFtZS5tZXNzYWdlTWFwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIE5ldE1lc3NhZ2VOYW1lLmlzSW5pdCA9IHRydWVcclxuXHJcbiAgICAgICAgLy9NZXNzYWdlTmFtZVxyXG4gICAgICAgIGxldCBtYXAgPSBOZXRNZXNzYWdlTmFtZS5tZXNzYWdlTWFwXHJcblxyXG4gICAgICAgIG1hcFtHYW1lTWVzc2FnZS5HTV9WRVJJRllfVkVSU0lPTl09J0dNX1ZlcmlmeVZlcnNpb24nO1xyXG4gICAgICAgIG1hcFtHYW1lTWVzc2FnZS5HTV9WRVJTSU9OX1JFVFVSTl09J0dNX1ZlcmlmeVZlcnNpb25SZXR1cm4nO1xyXG5cclxuICAgICAgICByZXR1cm4gbWFwXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQnl0ZSA9IExheWEuQnl0ZVxyXG5pbXBvcnQgU29ja2V0Q29ubmVjdCBmcm9tIFwiLi9Tb2NrZXRDb25uZWN0XCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0UGFja2V0IHtcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX0hFQURfT0ZGU0VUOiBudW1iZXIgPSAwXHQvLyDoh6rlrprkuYnmlbDmja4g5LiA6Iis5pivcm9sZWlkIChsb25n57G75Z6LKVxyXG4gICAgLy9wcml2YXRlIFdFQlBBQ0tfTUVTU1NBR0VJRF9PRkZTRVQ6IG51bWJlciA9IDhcdC8vIOa2iOaBr2lkXHJcbiAgICAvL3ByaXZhdGUgV0VCUEFDS19MRU5HVEhfT0ZGU0VUOiBudW1iZXIgPSAxMlx0Ly8g5raI5oGv6ZW/5bqmXHJcbiAgICBwdWJsaWMgV0VCUEFDS19IRUFEX1NJWkU6IG51bWJlciA9IDE2XHQvLyDmtojmga/mlbDmja7lvIDlp4vkvY3nva5cclxuXHJcbiAgICBwdWJsaWMgcm9sZUlkOiBudW1iZXJcclxuICAgIHB1YmxpYyBtZXNzYWdlSWQ6IG51bWJlclxyXG4gICAgcHVibGljIG1lc3NhZ2U6IGFueVxyXG5cclxuICAgIHByaXZhdGUgcmVhZEJ5dGVzOiBCeXRlXHJcbiAgICBwcml2YXRlIHNvY2tldENvbm5lY3Q6IFNvY2tldENvbm5lY3RcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25uZWN0OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QgPSBjb25uZWN0XHJcbiAgICAgICAgdGhpcy5yZWFkQnl0ZXMgPSBuZXcgQnl0ZSgpXHJcbiAgICAgICAgdGhpcy5yZWFkQnl0ZXMuZW5kaWFuID0gTGF5YS5CeXRlLkxJVFRMRV9FTkRJQU4vL+i/memHjOaIkeS7rOmHh+eUqOWwj+err1xyXG4gICAgfVxyXG5cclxuICAgIC8v5o6l5pS25pyN5Yqh5Zmo5L+h5oGvXHJcbiAgICBwdWJsaWMgcmVjZWl2ZU1zZyhieXRlczogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWFkQnl0ZXMud3JpdGVBcnJheUJ1ZmZlcihieXRlcylcclxuICAgICAgICB0aGlzLnJlYWRCeXRlcy5wb3MgPSAwLy/orr7nva7lgY/np7vmjIfpkohcclxuXHJcbiAgICAgICAgLy/mjInnhafmnI3liqHlmajkvKDpgJLov4fmnaXnmoTmlbDmja7vvIzmjInnhafpobrluo/or7vlj5ZcclxuICAgICAgICB0aGlzLnJvbGVJZCA9IHRoaXMucmVhZEJ5dGVzLmdldEZsb2F0NjQoKVxyXG4gICAgICAgIHRoaXMubWVzc2FnZUlkID0gdGhpcy5yZWFkQnl0ZXMuZ2V0SW50MzIoKVxyXG4gICAgICAgIGxldCBtc2dMZW5ndGggPSB0aGlzLnJlYWRCeXRlcy5nZXRJbnQzMigpXHJcbiAgICAgICAgLy9sZXQgYWIgPSB0aGlzLnJlYWRCeXRlcy5yZWFkQXJyYXlCdWZmZXIobXNnTGVuZ3RoIC0gdGhpcy5XRUJQQUNLX0hFQURfU0laRSlcclxuICAgICAgICAvL2xldCBidWZmZXIgPSBuZXcgVWludDhBcnJheShhYilcclxuICAgICAgICAvL3RoaXMubWVzc2FnZSA9IHRoaXMuc29ja2V0Q29ubmVjdC5kZXNlcmlhbGl6ZSh0aGlzLm1lc3NhZ2VJZCwgYnVmZmVyKVxyXG4gICAgICAgIGxldCB1aW50OEFycmF5ID0gdGhpcy5yZWFkQnl0ZXMucmVhZFVpbnQ4QXJyYXkodGhpcy5XRUJQQUNLX0hFQURfU0laRSwgbXNnTGVuZ3RoIC0gdGhpcy5XRUJQQUNLX0hFQURfU0laRSlcclxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSB0aGlzLnNvY2tldENvbm5lY3QuZGVzZXJpYWxpemUodGhpcy5tZXNzYWdlSWQsIHVpbnQ4QXJyYXkpXHJcblxyXG4gICAgICAgIC8vaWYgKG1zZ0xlbmd0aCAhPSB0aGlzLnJlYWRCeXRlcy5sZW5ndGgpIHtcclxuICAgICAgICAvLyAgICBjb25zb2xlLmVycm9yKFwi5raI5oGv6ZW/5LiN5LiA5qC3XCIpXHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIHRoaXMucmVhZEJ5dGVzLmNsZWFyKClcclxuICAgIH1cclxufSIsImltcG9ydCBTb2NrZXRDb25uZWN0IGZyb20gXCIuL1NvY2tldENvbm5lY3RcIjtcclxuXHJcbmNsYXNzIEdhbWVDbGllbnQge1xyXG4gICAgcHJpdmF0ZSBjbGllbnRJZDogQ2xpZW50SUQ7XHJcbiAgICBwcml2YXRlIHNvY2tldENvbm5lY3Q6IFNvY2tldENvbm5lY3Q7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IENsaWVudElEKSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnRJZCA9IGlkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25uZWN0KGhvc3Q6IHN0cmluZywgcG9ydDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0ID0gbmV3IFNvY2tldENvbm5lY3QoXCIgY2xpZW50SWQ6XCIgKyB0aGlzLmNsaWVudElkKTtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QuY29ubmVjdChob3N0LCBwb3J0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29ubmVjdEJ5VXJsKHVybDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0ID0gbmV3IFNvY2tldENvbm5lY3QoXCIgY2xpZW50SWQ6XCIgKyB0aGlzLmNsaWVudElkKTtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QuY29ubmVjdEJ5VXJsKHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlY29ubmVjdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QucmVjb25uZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc2Nvbm5lY3RlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QuZGlzY29ubmVjdGVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzQ29ubmVjdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvY2tldENvbm5lY3QuY29ubmVjdGVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmRFbXB0eShtc2dJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LnNlbmRFbXB0eShtc2dJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmRNZXNzYWdlKG1zZ0lkOiBudW1iZXIsIG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LnNlbmRNZXNzYWdlKG1zZ0lkLCBtc2cpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbm5lY3RDYWxsYmFjayhjYWxsYmFjazpGdW5jdGlvbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3Qub25Db25uZWN0ID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRGlzY29ubmVjdENhbGxiYWNrKGNhbGxiYWNrOkZ1bmN0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5vbkRpc2Nvbm5lY3QgPSBjYWxsYmFjaztcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ldHdvcmtNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBOZXR3b3JrTWFuYWdlcjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IE5ldHdvcmtNYW5hZ2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZSB8fCAodGhpcy5pbnN0YW5jZSA9IG5ldyB0aGlzKCkpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnYW1lQ2xpZW50TWFwOiB7IFtpbmRleDogbnVtYmVyXTogR2FtZUNsaWVudDsgfSA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluinkuiJsklEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRSb2xlSWQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5wb3coMiwgNTMpIC0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlQ2xpZW50KGNsaWVudElEOiBudW1iZXIsIHVybDogc3RyaW5nKTogR2FtZUNsaWVudCB7XHJcbiAgICAgICAgdmFyIGNsaWVudDogR2FtZUNsaWVudCA9IG5ldyBHYW1lQ2xpZW50KGNsaWVudElEKTtcclxuICAgICAgICBjbGllbnQuY29ubmVjdEJ5VXJsKHVybCk7XHJcbiAgICAgICAgdGhpcy5nYW1lQ2xpZW50TWFwW0NsaWVudElELmxvZ2luXSA9IGNsaWVudDtcclxuICAgICAgICByZXR1cm4gY2xpZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDbGllbnQoY2xpZW50SUQ6IENsaWVudElEKTogR2FtZUNsaWVudCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZUNsaWVudE1hcFtjbGllbnRJRF0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nYW1lQ2xpZW50TWFwW2NsaWVudElEXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlQ2xpZW50KGNsaWVudElEOiBDbGllbnRJRCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGllbnQ6IEdhbWVDbGllbnQgPSB0aGlzLmdldENsaWVudChDbGllbnRJRC5sb2dpbilcclxuICAgICAgICBpZiAoY2xpZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5kaXNjb25uZWN0ZWQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVjb25uZWN0Q2xpZW50KGNsaWVudElEOiBDbGllbnRJRCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGllbnQ6IEdhbWVDbGllbnQgPSB0aGlzLmdldENsaWVudChDbGllbnRJRC5sb2dpbilcclxuICAgICAgICBpZiAoY2xpZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5yZWNvbm5lY3QoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naW5TZW5kTWVzc2FnZShtc2dJZDogbnVtYmVyLCBtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UobXNnSWQsIG1zZywgQ2xpZW50SUQubG9naW4pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ2ljU2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgbXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKG1zZ0lkLCBtc2csIENsaWVudElELmxvZ2ljKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzY2VuZVNlbmRNZXNzYWdlKG1zZ0lkOiBudW1iZXIsIG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShtc2dJZCwgbXNnLCBDbGllbnRJRC5zY2VuZSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRNZXNzYWdlKG1zZ0lkOiBudW1iZXIsIG1zZzogYW55LCBjbGllbnRJRDogQ2xpZW50SUQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2xpZW50OiBHYW1lQ2xpZW50ID0gdGhpcy5nZXRDbGllbnQoY2xpZW50SUQpXHJcbiAgICAgICAgaWYgKGNsaWVudCkge1xyXG4gICAgICAgICAgICBjbGllbnQuc2VuZE1lc3NhZ2UobXNnSWQsIG1zZylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmRNZXNzYWdlRW1wdHkobXNnSWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGllbnQ6IEdhbWVDbGllbnQgPSBudWxsO1xyXG4gICAgICAgIGlmIChtc2dJZCA+IEdhbWVNZXNzYWdlLkdNX0FDQ09VTlRfU0VSVkVSX01FU1NBR0VfU1RBUlQgJiYgbXNnSWQgPCBHYW1lTWVzc2FnZS5HTV9BQ0NPVU5UX1NFUlZFUl9NRVNTQUdFX0VORCkge1xyXG4gICAgICAgICAgICBjbGllbnQgPSB0aGlzLmdldENsaWVudChDbGllbnRJRC5sb2dpbilcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KENsaWVudElELmxvZ2ljKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2xpZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5zZW5kRW1wdHkobXNnSWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckFsbEdhbWVDbGllbnQoKSB7XHJcbiAgICAgICAgbGV0IGRpYyA9IHRoaXMuZ2FtZUNsaWVudE1hcFxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRpYykge1xyXG4gICAgICAgICAgICBpZiAoZGljLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkaWNba2V5XTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuZGlzY29ubmVjdGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nYW1lQ2xpZW50TWFwID0ge31cclxuICAgIH1cclxufSIsImltcG9ydCBOZXRFdmVudERpc3BhdGNoZXIgZnJvbSBcIi4uL0V2ZW50L05ldEV2ZW50RGlzcGF0Y2hlclwiXHJcbmltcG9ydCBOZXRQYWNrZXQgZnJvbSBcIi4vTmV0UGFja2V0XCJcclxuaW1wb3J0IE5ldHdvcmtNYW5hZ2VyIGZyb20gXCIuL05ldHdvcmtNYW5hZ2VyXCJcclxuaW1wb3J0IE5ldE1lc3NhZ2VOYW1lIGZyb20gXCIuL05ldE1lc3NhZ2VOYW1lXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29ja2V0Q29ubmVjdCB7XHJcblxyXG4gICAgLy9wcml2YXRlIFdFQlBBQ0tfSEVBRF9PRkZTRVQ6IG51bWJlciA9IDBcdC8vIOiHquWumuS5ieaVsOaNriDkuIDoiKzmmK9yb2xlaWQgKGxvbmfnsbvlnospXHJcbiAgICAvL3ByaXZhdGUgV0VCUEFDS19NRVNTU0FHRUlEX09GRlNFVDogbnVtYmVyID0gOFx0Ly8g5raI5oGvaWRcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX0xFTkdUSF9PRkZTRVQ6IG51bWJlciA9IDEyXHQvLyDmtojmga/plb/luqZcclxuICAgIHByaXZhdGUgV0VCUEFDS19IRUFEX1NJWkU6IG51bWJlciA9IDE2XHQvLyDmtojmga/mlbDmja7lvIDlp4vkvY3nva5cclxuXHJcblxyXG4gICAgcHVibGljIHNvY2tldDogTGF5YS5Tb2NrZXQgPSBudWxsXHJcbiAgICBwcml2YXRlIHNlbmRCeXRlczogTGF5YS5CeXRlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSByZWFkQnl0ZXM6IExheWEuQnl0ZSA9IG51bGxcclxuICAgIHByaXZhdGUgdGVtcEJ5dGVzOiBMYXlhLkJ5dGUgPSBudWxsXHJcbiAgICBwcml2YXRlIHVybDogc3RyaW5nID0gbnVsbFxyXG4gICAgcHJpdmF0ZSB0aXBzOiBzdHJpbmcgPSBudWxsXHJcbiAgICBwcml2YXRlIHBiTWVzc2FnZU5hbWU6IGFueSA9IG51bGxcclxuICAgIHByaXZhdGUgcHJvdG9Sb290OiBhbnkgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBvbkNvbm5lY3Q6RnVuY3Rpb24gPSBudWxsO1xyXG4gICAgcHVibGljIG9uRGlzY29ubmVjdDpGdW5jdGlvbiA9IG51bGw7XHJcblxyXG4gICAgLy9wcml2YXRlIHNlbmROZXRQYWNrZXQ6IEFycmF5PE5ldFBhY2tldD4gPSBudWxsXHJcbiAgICAvL3ByaXZhdGUgcmVjZWl2ZU5ldFBhY2tldDogQXJyYXk8TmV0UGFja2V0PiA9IG51bGxcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0aXBzOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnRpcHMgPSB0aXBzXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMgPSBuZXcgTGF5YS5CeXRlKClcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy5lbmRpYW4gPSBMYXlhLkJ5dGUuTElUVExFX0VORElBTi8v6L+Z6YeM5oiR5Lus6YeH55So5bCP56uvXHJcbiAgICAgICAgdGhpcy50ZW1wQnl0ZXMgPSBuZXcgTGF5YS5CeXRlKClcclxuICAgICAgICB0aGlzLnRlbXBCeXRlcy5lbmRpYW4gPSBMYXlhLkJ5dGUuTElUVExFX0VORElBTi8v6L+Z6YeM5oiR5Lus6YeH55So5bCP56uvXHJcblxyXG4gICAgICAgIC8vdGhpcy5zZW5kTmV0UGFja2V0ID0gbmV3IEFycmF5PE5ldFBhY2tldD4oKSAvL+WPkemAgeeahOe9kee7nOWMhVxyXG4gICAgICAgIC8vdGhpcy5yZWNlaXZlTmV0UGFja2V0ID0gbmV3IEFycmF5PE5ldFBhY2tldD4oKSAvL+aOpeaUtueahOe9kee7nOWMhVxyXG5cclxuICAgICAgICB0aGlzLnByb3RvUm9vdCA9IExheWEuQnJvd3Nlci53aW5kb3dbXCJQQk1lc3NhZ2VcIl1cclxuICAgICAgICB0aGlzLnBiTWVzc2FnZU5hbWUgPSBOZXRNZXNzYWdlTmFtZS5nZXRNYXAoKVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNvbm5lY3QoaG9zdDogc3RyaW5nLCBwb3J0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnVybCA9IGhvc3QuY29uY2F0KHBvcnQudG9TdHJpbmcoKSlcclxuICAgICAgICB0aGlzLmNvbm5lY3RCeVVybCh0aGlzLnVybClcclxuICAgIH1cclxuICAgIC8vXCJ3czovL2xvY2FsaG9zdDo4OTg5XCJcclxuICAgIHB1YmxpYyBjb25uZWN0QnlVcmwodXJsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnVybCA9IHVybFxyXG4gICAgICAgIHRoaXMuc29ja2V0ID0gbmV3IExheWEuU29ja2V0KClcclxuICAgICAgICB0aGlzLnNvY2tldC5lbmRpYW4gPSBMYXlhLkJ5dGUuTElUVExFX0VORElBTi8v6L+Z6YeM5oiR5Lus6YeH55So5bCP56uvXHJcbiAgICAgICAgdGhpcy5zb2NrZXQuY29ubmVjdEJ5VXJsKHVybClcclxuICAgICAgICB0aGlzLnNvY2tldC5vbihMYXlhLkV2ZW50Lk9QRU4sIHRoaXMsIHRoaXMub3BlbkhhbmRsZXIpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oTGF5YS5FdmVudC5NRVNTQUdFLCB0aGlzLCB0aGlzLnJlY2VpdmVIYW5kbGVyKVxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKExheWEuRXZlbnQuQ0xPU0UsIHRoaXMsIHRoaXMuY2xvc2VIYW5kbGVyKVxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKExheWEuRXZlbnQuRVJST1IsIHRoaXMsIHRoaXMuZXJyb3JIYW5kbGVyKVxyXG4gICAgfVxyXG4gICAgLy/ph43mlrDov57mjqVcclxuICAgIHB1YmxpYyByZWNvbm5lY3QoKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQuY2xlYW5Tb2NrZXQoKVxyXG4gICAgICAgIHRoaXMuY29ubmVjdEJ5VXJsKHRoaXMudXJsKVxyXG4gICAgfVxyXG4gICAgLy/mlq3lvIDov57mjqVcclxuICAgIHB1YmxpYyBkaXNjb25uZWN0ZWQoKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQuY2xvc2UoKVxyXG4gICAgfVxyXG4gICAgLy/mmK/lkKbov57mjqVcclxuICAgIHB1YmxpYyBjb25uZWN0ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ja2V0LmNvbm5lY3RlZFxyXG4gICAgfVxyXG4gICAgLy/mraPnoa7lu7rnq4vov57mjqVcclxuICAgIHByaXZhdGUgb3BlbkhhbmRsZXIoZXZlbnQ6IGFueSA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVybCArIHRoaXMudGlwcyArIFwiICDmraPnoa7lu7rnq4vov57mjqVcIilcclxuICAgICAgICBpZiAodGhpcy5vbkNvbm5lY3Qpe1xyXG4gICAgICAgICAgICB0aGlzLm9uQ29ubmVjdCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/lhbPpl63ov57mjqXkuovku7ZcclxuICAgIHByaXZhdGUgY2xvc2VIYW5kbGVyKGV2ZW50OiBhbnkgPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy51cmwgKyB0aGlzLnRpcHMgKyBcIiDlhbPpl63ov57mjqXkuovku7ZcIilcclxuICAgICAgICBpZiAodGhpcy5vbkRpc2Nvbm5lY3Qpe1xyXG4gICAgICAgICAgICB0aGlzLm9uRGlzY29ubmVjdCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/ov57mjqXlh7rplJlcclxuICAgIHByaXZhdGUgZXJyb3JIYW5kbGVyKGU6IGFueSA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVybCArIHRoaXMudGlwcyArIFwiIOi/nuaOpeWHuumUmVwiKVxyXG4gICAgfVxyXG5cclxuICAgIC8v5Y+R6YCB56m65raI5oGvXHJcbiAgICBwdWJsaWMgc2VuZEVtcHR5KG1zZ0lkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICAvLyDlhpnlhaXkuIDkuKrmlbDlrZcwXHJcbiAgICAgICAgdGhpcy50ZW1wQnl0ZXMud3JpdGVGbG9hdDMyKDApXHJcbiAgICAgICAgdGhpcy5zZW5kKG1zZ0lkLCB0aGlzLnRlbXBCeXRlcylcclxuICAgICAgICB0aGlzLnRlbXBCeXRlcy5jbGVhcigpXHJcbiAgICB9XHJcblxyXG4gICAgLy/lj5HpgIHmtojmga9cclxuICAgIHB1YmxpYyBzZW5kTWVzc2FnZShtc2dJZDogbnVtYmVyLCBtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8vaWYgKHR5cGVvZiBtc2cgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIC8vICAgIHRoaXMudGVtcEJ5dGVzLndyaXRlVVRGU3RyaW5nKG1zZylcclxuICAgICAgICAvLyAgICB0aGlzLnNlbmQobXNnSWQsIHRoaXMudGVtcEJ5dGVzKVxyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vZWxzZSBpZiAobXNnIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICAvLyAgICB0aGlzLnRlbXBCeXRlcy53cml0ZUFycmF5QnVmZmVyKGJ1ZmZlcilcclxuICAgICAgICAvLyAgICB0aGlzLnNlbmQobXNnSWQsIHRoaXMudGVtcEJ5dGVzKVxyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGJ1ZmZlcjogVWludDhBcnJheSA9IHRoaXMuc2VyaWFsaXplKG1zZ0lkLCBtc2cpXHJcbiAgICAgICAgICAgIHRoaXMudGVtcEJ5dGVzLndyaXRlQXJyYXlCdWZmZXIoYnVmZmVyKVxyXG4gICAgICAgICAgICB0aGlzLnNlbmQobXNnSWQsIHRoaXMudGVtcEJ5dGVzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+mcgOimgeWPkemAgeeahOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBzZW5kKG1zZ0lkOiBudW1iZXIsIGJ5dGU6IExheWEuQnl0ZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5zb2NrZXQuY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIGNvbm5lY3Rpb24gaGFzIGJlZW4gZGlzY29ubmVjdGVkLlwiKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9XRUJQQUNLX0hFQURfT0ZGU0VUXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMud3JpdGVGbG9hdDY0KE5ldHdvcmtNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um9sZUlkKCkpXHJcbiAgICAgICAgLy9XRUJQQUNLX01FU1NTQUdFSURfT0ZGU0VUXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMud3JpdGVJbnQzMihtc2dJZClcclxuICAgICAgICAvL1dFQlBBQ0tfTEVOR1RIX09GRlNFVFxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLndyaXRlSW50MzIodGhpcy5XRUJQQUNLX0hFQURfU0laRSArIGJ5dGUubGVuZ3RoKVxyXG4gICAgICAgIC8vTWFzc2dlIGJvZHlcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy53cml0ZUFycmF5QnVmZmVyKGJ5dGUuYnVmZmVyKVxyXG4gICAgICAgIC8v6L+Z6YeM5piv5oqK5a2X6IqC5pWw57uE55qE5pWw5o2u6YCa6L+Hc29ja2V05Y+R6YCB57uZ5pyN5Yqh5ZmoXHJcbiAgICAgICAgdGhpcy5zb2NrZXQuc2VuZCh0aGlzLnNlbmRCeXRlcy5idWZmZXIpXHJcbiAgICAgICAgLy/muIXpmaTmjonmlbDmja7vvIzmlrnkvr/kuIvmrKHor7vlhplcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy5jbGVhcigpXHJcbiAgICAgICAgdGhpcy50ZW1wQnl0ZXMuY2xlYXIoKVxyXG4gICAgfVxyXG5cclxuICAgIC8v5o6l5pS25Yiw5pWw5o2uXHJcbiAgICBwcml2YXRlIHJlY2VpdmVIYW5kbGVyKG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIk1lc3NhZ2UgZnJvbSBzZXJ2ZXI6ICBcIiArIG5ldyBMYXlhLkJ5dGUobXNnKS5yZWFkVVRGQnl0ZXMoKSlcclxuICAgICAgICB2YXIgbmV0UGFja2V0OiBOZXRQYWNrZXQgPSBuZXcgTmV0UGFja2V0KHRoaXMpXHJcbiAgICAgICAgbmV0UGFja2V0LnJlY2VpdmVNc2cobXNnKVxyXG4gICAgICAgIHRoaXMuc29ja2V0LmlucHV0LmNsZWFyKClcclxuICAgICAgICBOZXRFdmVudERpc3BhdGNoZXIuZ2V0SW5zdGFuY2UoKS5kaXNwYXRjaChuZXRQYWNrZXQubWVzc2FnZUlkLCBuZXRQYWNrZXQpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDluo/liJfljJYgcHJvdG9jb2wtYnVmZmVyXHJcbiAgICAgKiBAcGFyYW0gbWFzc2FnZUlkIFxyXG4gICAgICogQHBhcmFtIG1hc3NhZ2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlcmlhbGl6ZShtYXNzYWdlSWQ6IG51bWJlciwgbWFzc2FnZTogYW55KTogVWludDhBcnJheSB7XHJcbiAgICAgICAgbGV0IG1hc3NhZ2VOYW1lOiBzdHJpbmcgPSB0aGlzLnBiTWVzc2FnZU5hbWVbbWFzc2FnZUlkXVxyXG4gICAgICAgIC8vIEVuY29kZSBhIG1lc3NhZ2UgdG8gYW4gVWludDhBcnJheSAoYnJvd3Nlcikgb3IgQnVmZmVyIChub2RlKVxyXG4gICAgICAgIHZhciBidWZmZXI6IGFueSA9IHRoaXMucHJvdG9Sb290W21hc3NhZ2VOYW1lXS5lbmNvZGUobWFzc2FnZSkuZmluaXNoKCk7XHJcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPjeW6j+WIl+WMliBwcm90b2NvbC1idWZmZXJcclxuICAgICAqIEBwYXJhbSBtYXNzYWdlTmFtZSBcclxuICAgICAqIEBwYXJhbSBuZXRQYWNrYWdlIE5ldFBhY2thZ2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlc2VyaWFsaXplKG1hc3NhZ2VJZDogbnVtYmVyLCBtYXNzYWdlOiBVaW50OEFycmF5KTogYW55IHtcclxuICAgICAgICBsZXQgbWFzc2FnZU5hbWU6IHN0cmluZyA9IHRoaXMucGJNZXNzYWdlTmFtZVttYXNzYWdlSWRdXHJcbiAgICAgICAgLy8gRGVjb2RlIGFuIFVpbnQ4QXJyYXkgKGJyb3dzZXIpIG9yIEJ1ZmZlciAobm9kZSkgdG8gYSBtZXNzYWdlXHJcbiAgICAgICAgdmFyIG1lc3NhZ2U6IGFueSA9IHRoaXMucHJvdG9Sb290W21hc3NhZ2VOYW1lXS5kZWNvZGUobWFzc2FnZSk7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBNYWluVUkgZnJvbSBcIi4vc2NyaXB0L01haW5VSVwiXHJcbmltcG9ydCBUZXN0XzlfVGltZUxpbmVVSSBmcm9tIFwiLi9zdHVkeS9UZXN0XzlfVGltZUxpbmVVSVwiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj02NDA7XHJcbiAgICBzdGF0aWMgaGVpZ2h0Om51bWJlcj0xMTM2O1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJmaXhlZHdpZHRoXCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJ2ZXJ0aWNhbFwiO1xyXG4gICAgc3RhdGljIGFsaWduVjpzdHJpbmc9XCJtaWRkbGVcIjtcclxuICAgIHN0YXRpYyBhbGlnbkg6c3RyaW5nPVwiY2VudGVyXCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJNYWluLnNjZW5lXCI7XHJcbiAgICBzdGF0aWMgc2NlbmVSb290OnN0cmluZz1cIlwiO1xyXG4gICAgc3RhdGljIGRlYnVnOmJvb2xlYW49dHJ1ZTtcclxuICAgIHN0YXRpYyBzdGF0OmJvb2xlYW49dHJ1ZTtcclxuICAgIHN0YXRpYyBwaHlzaWNzRGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBleHBvcnRTY2VuZVRvSnNvbjpib29sZWFuPXRydWU7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe31cclxuICAgIHN0YXRpYyBpbml0KCl7XHJcbiAgICAgICAgdmFyIHJlZzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XHJcbiAgICAgICAgcmVnKFwic2NyaXB0L01haW5VSS50c1wiLE1haW5VSSk7XHJcbiAgICAgICAgcmVnKFwic3R1ZHkvVGVzdF85X1RpbWVMaW5lVUkudHNcIixUZXN0XzlfVGltZUxpbmVVSSk7XHJcbiAgICB9XHJcbn1cclxuR2FtZUNvbmZpZy5pbml0KCk7IiwiaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi4vdWkvbGF5YU1heFVJXCI7XHJcbmltcG9ydCBOZXR3b3JrTWFuYWdlciBmcm9tIFwiLi4vRnJhbWV3b3JrL05ldHdvcmsvTmV0d29ya01hbmFnZXJcIjtcclxuaW1wb3J0IE5ldEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vRnJhbWV3b3JrL0V2ZW50L05ldEV2ZW50RGlzcGF0Y2hlclwiO1xyXG5pbXBvcnQgTmV0UGFja2V0IGZyb20gXCIuLi9GcmFtZXdvcmsvTmV0d29yay9OZXRQYWNrZXRcIjtcclxuaW1wb3J0IEdhbWVNZXNzYWdlTmFtZSBmcm9tIFwiLi4vRnJhbWV3b3JrL05ldHdvcmsvTmV0TWVzc2FnZU5hbWVcIjtcclxuaW1wb3J0IFVJUGF0aCBmcm9tIFwiLi4vVUlQYXRoXCI7XHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4uL0ZyYW1ld29yay9VSS9VSU1hbmFnZXJcIjtcclxuXHJcblxyXG4vL+S4u+eVjOmdolxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluVUkgZXh0ZW5kcyB1aS5NYWluVUkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigpOyB9XHJcblxyXG4gICAgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYWluVUkub25FbmFibGVcIilcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZU1lc3NhZ2UuR01fVkVSU0lPTl9SRVRVUk4pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIE5ldEV2ZW50RGlzcGF0Y2hlci5nZXRJbnN0YW5jZSgpLnJlZ2lzdGVyKEdhbWVNZXNzYWdlLkdNX1ZFUlNJT05fUkVUVVJOLCB0aGlzLCB0aGlzLkdNX1ZlcmlmeVZlcnNpb25SZXR1cm4pXHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFpblVJLm9uRGlzYWJsZVwiKVxyXG4gICAgICAgIFxyXG4gICAgICAgIE5ldEV2ZW50RGlzcGF0Y2hlci5nZXRJbnN0YW5jZSgpLnVuUmVnaXN0ZXIoR2FtZU1lc3NhZ2UuR01fVkVSU0lPTl9SRVRVUk4sIHRoaXMsIHRoaXMuR01fVmVyaWZ5VmVyc2lvblJldHVybilcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBHTV9WZXJpZnlWZXJzaW9uUmV0dXJuKG5ldFBhY2thZ2U6TmV0UGFja2V0KTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5ldFBhY2thZ2UubWVzc2FnZUlkICsgXCIgIFwiICsgbmV0UGFja2FnZS5tZXNzYWdlKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkF3YWtlKCk6IHZvaWQge1xyXG4gICAgICAgIC8vTGF5YS5TY2VuZS5vcGVuKFVJUGF0aC50ZXN0UGF0aCxmYWxzZSk7XHJcbiAgICAgICAgLy9MYXlhLlNjZW5lLm9wZW4oVUlQYXRoLnRlc3RQYXRoMSxmYWxzZSk7XHJcbiAgICAgICAgLy9MYXlhLlNjZW5lLm9wZW4oVUlQYXRoLlVJX0xvYWRpbmcsZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdGVzdE5ldHdvcmsoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQcmVjaXNpb24gc2FmZS5cIiArIChNYXRoLnBvdygyLCA1MykgLSAxKSk7XHJcblxyXG4gICAgICAgIC8vdmFyIG1zZyA9IHtcclxuICAgICAgICAvLyAgICB2ZXJzaW9uOiBcIjEuNS40XCIsXHRcdFx0XHQvL+WuouaIt+err+eJiOacrOWPt1xyXG4gICAgICAgIC8vICAgIHBsYXRmb3JtOiA5MDA3MTk5MjU0NzQwOTkxLCAgICAgICAgICAgICAvLy/lubPlj7BcclxuICAgICAgICAvLyAgICBpc3Rlc3Q6IDAsLy8vICAgIDDjgIHmraPluLjvvIwx44CB5rWL6K+V77yM5LiN6ZyA6KaB6aqM6K+B54mI5pysXHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy92YXIgcm9vdCA9IExheWEuQnJvd3Nlci53aW5kb3dbXCJQQk1lc3NhZ2VcIl07XHJcbiAgICAgICAgLy92YXIgcGJNZXNzYWdlTmFtZSA9IEdhbWVNZXNzYWdlTmFtZS5nZXRNYXAoKVxyXG4gICAgICAgIC8vdmFyIGJ1ZmZlcjogYW55ID0gcm9vdFtwYk1lc3NhZ2VOYW1lW0dhbWVNZXNzYWdlLkdNX1ZFUklGWV9WRVJTSU9OXV0uZW5jb2RlKG1zZykuZmluaXNoKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhidWZmZXIpO1xyXG4gICAgICAgIC8vXHJcblxyXG4gICAgICAgIHZhciBnYW1lQ2xpZW50ID0gTmV0d29ya01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVDbGllbnQoMCwgXCJ3czovLzE5Mi4xNjguMi4xMjY6NTAwMDBcIik7XHJcbiAgICAgICAgZ2FtZUNsaWVudC5vbkNvbm5lY3RDYWxsYmFjayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBtc2cgPSB7XHJcbiAgICAgICAgICAgICAgICB2ZXJzaW9uOiBcIjEuNS40XCIsXHRcdFx0XHQvL+WuouaIt+err+eJiOacrOWPt1xyXG4gICAgICAgICAgICAgICAgcGxhdGZvcm06IDkwMDcxOTkyNTQ3NDA5OTEsICAgICAgICAgICAgIC8vL+W5s+WPsFxyXG4gICAgICAgICAgICAgICAgaXN0ZXN0OiAwLC8vLyAgICAw44CB5q2j5bi477yMMeOAgea1i+ivle+8jOS4jemcgOimgemqjOivgeeJiOacrFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE5ldHdvcmtNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9naW5TZW5kTWVzc2FnZShHYW1lTWVzc2FnZS5HTV9WRVJJRllfVkVSU0lPTiwgbXNnKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdF83X09ydGhvZ3JhcGhpY0NhbWVyYSB7XHJcbiAgICBwcml2YXRlIF8yRFBvczogTGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygzMTAsIDUwMCwgMCk7XHJcbiAgICBwcml2YXRlIG91dDNEUG9zOiBMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIDAsIDApO1xyXG4gICAgcHJpdmF0ZSByb2xlM0Q6IExheWEuU3ByaXRlM0Q7XHJcbiAgICBwcml2YXRlIGNhbWVyYTogTGF5YS5DYW1lcmE7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdmFyIGltYWdlOiBMYXlhLkltYWdlID0gbmV3IExheWEuSW1hZ2UoXCIuL3Jlcy9jYXJ0b29uMi9iYWNrZ3JvdW5kLmpwZ1wiKVxyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQoaW1hZ2UpXHJcblxyXG4gICAgICAgIHZhciBzY2VuZTogTGF5YS5TY2VuZTNEID0gbmV3IExheWEuU2NlbmUzRCgpXHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZChzY2VuZSlcclxuXHJcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgTGF5YS5DYW1lcmEoMCwgMC4xLCAxMDAwKVxyXG4gICAgICAgIHRoaXMuY2FtZXJhLnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMygtNDUsIDAsIDApLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnRyYW5zZm9ybS50cmFuc2xhdGUobmV3IExheWEuVmVjdG9yMygwLCAyLCA1MDApKVxyXG5cclxuXHJcbiAgICAgICAgLy/mraPkuqTmipXlvbHlsZ7mgKforr7nva5cclxuICAgICAgICB0aGlzLmNhbWVyYS5vcnRob2dyYXBoaWMgPSB0cnVlO1xyXG4gICAgICAgIC8v5q2j5Lqk5Z6C55u055+p6Zi16Led56a777yM5o6n5Yi2M0TniankvZPov5zov5HkuI7njrDlrp7lpKflsI9cclxuICAgICAgICB0aGlzLmNhbWVyYS5vcnRob2dyYXBoaWNWZXJ0aWNhbFNpemUgPSAxMDtcclxuICAgICAgICAvL+a4hemZpOagh+iusO+8jOS7hea3seW6plxyXG4gICAgICAgIHRoaXMuY2FtZXJhLmNsZWFyRmxhZyA9IExheWEuQmFzZUNhbWVyYS5DTEVBUkZMQUdfREVQVEhPTkxZO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLmNsZWFyQ29sb3IgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLmN1bGxpbmdNYXNrID0gTWF0aC5wb3coMiwgMCkgfCBNYXRoLnBvdygyLCAxKVxyXG5cclxuICAgICAgICBzY2VuZS5hZGRDaGlsZCh0aGlzLmNhbWVyYSlcclxuXHJcbiAgICAgICAgdmFyIGRpcmVjdGlvbkxpZ2h0OiBMYXlhLkRpcmVjdGlvbkxpZ2h0ID0gbmV3IExheWEuRGlyZWN0aW9uTGlnaHQoKTtcclxuICAgICAgICBzY2VuZS5hZGRDaGlsZChkaXJlY3Rpb25MaWdodClcclxuXHJcbiAgICAgICAgTGF5YS5TcHJpdGUzRC5sb2FkKFwiLi9yZXMvYW5pbWF0aW9uL3BsYXllci9tYWdlL21hZ2UubGhcIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uTG9hZENvbXBsZXRlZCwgW3NjZW5lXSkpO1xyXG5cclxuICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuUkVTSVpFLCB0aGlzLCB0aGlzLnJlc2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkQ29tcGxldGVkKHNjZW5lOiBMYXlhLlNjZW5lM0QsIHNwcml0ZTNEOiBMYXlhLlNwcml0ZTNEKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yb2xlM0QgPSBzcHJpdGUzRDtcclxuICAgICAgICBzY2VuZS5hZGRDaGlsZChzcHJpdGUzRCk7XHJcbiAgICAgICAgdGhpcy5yb2xlM0QudHJhbnNmb3JtLnNjYWxlID0gbmV3IExheWEuVmVjdG9yMygwLjMsIDAuMywgMC4zKVxyXG4gICAgICAgIHRoaXMucmVzaXplKClcclxuICAgIH1cclxuXHJcbiAgICByZXNpemUoKTogdm9pZCB7XHJcbiAgICAgICAgLy/ovazmjaIyROWxj+W5leWdkOagh+ezu+e7n+WIsDNE5q2j5Lqk5oqV5b2x5LiL55qE5Z2Q5qCH57O757ufXHJcbiAgICAgICAgdGhpcy5jYW1lcmEuY29udmVydFNjcmVlbkNvb3JkVG9PcnRob2dyYXBoaWNDb29yZCh0aGlzLl8yRFBvcywgdGhpcy5vdXQzRFBvcyk7XHJcbiAgICAgICAgdGhpcy5yb2xlM0QudHJhbnNmb3JtLnBvc2l0aW9uID0gdGhpcy5vdXQzRFBvcztcclxuICAgIH1cclxufSIsIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RfOV9UaW1lTGluZVVJXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8v5Yqg6L295Zu+6ZuG5oiQ5Yqf5ZCO77yM5omn6KGMb25Mb2Fk5Zue6LCD5pa55rOVXHJcbiAgICAgICAgTGF5YS5sb2FkZXIubG9hZChcInJlcy9hdGxhcy90ZXN0LmF0bGFzXCIsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Mb2FkZWQpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBvbkxvYWRlZCgpOnZvaWR7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLliqDovb3lm77pm4bmiJDlip/lkI7vvIzmiafooYxvbkxvYWTlm57osIPmlrnms5VcIilcclxuICAgICAgICAvL+WIm+W7uuS4gOS4qlVJ5a6e5L6LXHJcbiAgICAgICAgLy92YXIgcGxhbjpUaW1lTGluZVVJID0gbmV3IFRpbWVMaW5lVUkoKVxyXG4gICAgICAgIC8v5re75Yqg5Yiw6Iie5Y+wXHJcbiAgICAgICAgLy9MYXlhLnN0YWdlLmFkZENoaWxkKHBsYW4pO1xyXG4gICAgICAgIC8v5pKt5pS+VUnlnLrmma/kuK3nmoTliqjnlLtcclxuICAgICAgICAvL3RoaXMuYmVhci5wbGF5KCk7XHJcbiAgICB9XHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG52YXIgUkVHOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcbmV4cG9ydCBtb2R1bGUgdWkge1xyXG4gICAgZXhwb3J0IGNsYXNzIE1haW5VSSBleHRlbmRzIFZpZXcge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJNYWluXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLk1haW5VSVwiLE1haW5VSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgVGVzdFVJIGV4dGVuZHMgVmlldyB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIlRlc3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuVGVzdFVJXCIsVGVzdFVJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBUZXN0MVVJIGV4dGVuZHMgVmlldyB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIlRlc3QxXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLlRlc3QxVUlcIixUZXN0MVVJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBUaW1lTGluZVVJIGV4dGVuZHMgRGlhbG9nIHtcclxuXHRcdHB1YmxpYyBiZWFyOkxheWEuQW5pbWF0aW9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiVGltZUxpbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuVGltZUxpbmVVSVwiLFRpbWVMaW5lVUkpO1xyXG59XHJcbmV4cG9ydCBtb2R1bGUgdWkuVUlfTG9hZGluZyB7XHJcbiAgICBleHBvcnQgY2xhc3MgVUlfTG9hZGluZ1VJIGV4dGVuZHMgVmlldyB7XHJcblx0XHRwdWJsaWMgYW5pMTpMYXlhLkZyYW1lQW5pbWF0aW9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiVUlfTG9hZGluZy9VSV9Mb2FkaW5nXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLlVJX0xvYWRpbmcuVUlfTG9hZGluZ1VJXCIsVUlfTG9hZGluZ1VJKTtcclxufVxyIl19
