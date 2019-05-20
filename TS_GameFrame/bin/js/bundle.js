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
var Test_12_3DTiledMap_1 = require("./study3D/Test_12_3DTiledMap");
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
        //new Test_7_OrthographicCamera();
        //new Test_8_D3SpaceToD2Space();
        //new Test_9_SkinAnimation_New();
        new Test_12_3DTiledMap_1.default();
    };
    return AppMain;
}());
//激活启动类
new AppMain();
},{"./GameConfig":7,"./study3D/Test_12_3DTiledMap":9}],2:[function(require,module,exports){
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
var Test_12_3DTiledMap = /** @class */ (function () {
    function Test_12_3DTiledMap() {
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
        this.tMap.createMap("res/TiledMap/background.json", viewRect, Laya.Handler.create(this, this.onMapLoaded));
    }
    Test_12_3DTiledMap.prototype.onMapLoaded = function () {
        //与UI搭配的3D场景
        this.addUIScene();
        //设置缩放中心点为视口的左上角
        this.tMap.setViewPortPivotByScale(0, 0);
        //将原地图放大3倍
        //this.tMap.scale = 3;
        Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
        //Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        //Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
        this.resize();
    };
    //与UI搭配的3D场景
    Test_12_3DTiledMap.prototype.addUIScene = function () {
        //重设置层次
        //var sprite = this.tMap.mapSprite()
        //Laya.stage.setChildIndex(sprite, 0)
        var scene3D = new Laya.Scene3D();
        Laya.stage.addChild(scene3D);
        var camera = new Laya.Camera(0, 0.1, 100);
        scene3D.addChild(camera);
        camera.transform.translate(new Laya.Vector3(0, 5, 10));
        camera.transform.rotate(new Laya.Vector3(-20, 0, 0), true, false);
        //正交投影属性设置
        camera.orthographic = true;
        //正交垂直矩阵距离，控制3D物体远近与现实大小
        camera.orthographicVerticalSize = 7;
        //清除标记，仅深度
        camera.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY;
        camera.clearColor = null;
        camera.cullingMask = Math.pow(2, 0) | Math.pow(2, 1);
        //console.log(camera.cullingMask);
        Laya.Sprite3D.load("res/animation/player/mage/mage.lh", Laya.Handler.create(this, this.onLoadCompleted, [scene3D]));
    };
    Test_12_3DTiledMap.prototype.onLoadCompleted = function (scene3D, sprite3D) {
        scene3D.addChild(sprite3D);
    };
    /**
     * 键盘控制
     * @param e
     */
    Test_12_3DTiledMap.prototype.onKeyDown = function (e) {
        if (e.keyCode == Laya.Keyboard.UP) {
        }
        else if (e.keyCode == Laya.Keyboard.DOWN) {
        }
        else if (e.keyCode == Laya.Keyboard.LEFT) {
        }
        else if (e.keyCode == Laya.Keyboard.RIGHT) {
        }
    };
    /**
     * 移动地图视口
     */
    Test_12_3DTiledMap.prototype.mouseMove = function () {
        var moveX = this.MapX - (Laya.stage.mouseX - this.mLastMouseX);
        var moveY = this.MapY - (Laya.stage.mouseY - this.mLastMouseY);
        //移动地图视口
        this.tMap.moveViewPort(moveX, moveY);
    };
    Test_12_3DTiledMap.prototype.mouseUp = function () {
        this.MapX = this.MapX - (Laya.stage.mouseX - this.mLastMouseX);
        this.MapY = this.MapY - (Laya.stage.mouseY - this.mLastMouseY);
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
    };
    Test_12_3DTiledMap.prototype.mouseDown = function () {
        this.mLastMouseX = Laya.stage.mouseX;
        this.mLastMouseY = Laya.stage.mouseY;
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
    };
    /**
     *  改变视口大小
     *  重设地图视口区域
     */
    Test_12_3DTiledMap.prototype.resize = function () {
        //改变视口大小
        this.tMap.changeViewPort(this.MapX, this.MapY, Laya.Browser.width, Laya.Browser.height);
    };
    return Test_12_3DTiledMap;
}());
exports.default = Test_12_3DTiledMap;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkc6L0xheWFQcm9qZWN0L0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQXBwTWFpbi50cyIsInNyYy9GcmFtZXdvcmsvRXZlbnQvTmV0RXZlbnREaXNwYXRjaGVyLnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL05ldE1lc3NhZ2VOYW1lLnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL05ldFBhY2tldC50cyIsInNyYy9GcmFtZXdvcmsvTmV0d29yay9OZXR3b3JrTWFuYWdlci50cyIsInNyYy9GcmFtZXdvcmsvTmV0d29yay9Tb2NrZXRDb25uZWN0LnRzIiwic3JjL0dhbWVDb25maWcudHMiLCJzcmMvc2NyaXB0L01haW5VSS50cyIsInNyYy9zdHVkeTNEL1Rlc3RfMTJfM0RUaWxlZE1hcC50cyIsInNyYy9zdHVkeS9UZXN0XzlfVGltZUxpbmVVSS50cyIsInNyYy91aS9sYXlhTWF4VUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDVkEsSUFBTyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUM3QixJQUFPLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO0FBQ3pCLElBQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7QUFrQnpCLDJDQUFzQztBQW9CdEMsbUVBQThEO0FBRTlELEtBQUs7QUFDTDtJQUNJO1FBQ0ksZ0JBQWdCO1FBQ2hCLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQVUsQ0FBQyxLQUFLLEVBQUUsb0JBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwRDthQUNJO1lBQ0QsdUJBQXVCO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdB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QUN2QixxQ0FBYyxHQUFkO2dCQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDNUMsQ0FBQztZQUNMLG1CQUFDO1FBQUQsQ0FQQSxBQU9DLENBUGlDLElBQUksR0FPckM7UUFQWSx1QkFBWSxlQU94QixDQUFBO1FBQ0QsR0FBRyxDQUFDLDRCQUE0QixFQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ25ELENBQUMsRUFWZ0IsVUFBVSxHQUFWLGFBQVUsS0FBVixhQUFVLFFBVTFCO0FBQUQsQ0FBQyxFQVZhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQVVmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBCcm93c2VyID0gTGF5YS5Ccm93c2VyXHJcbmltcG9ydCBXZWJHTCA9IExheWEuV2ViR0xcclxuaW1wb3J0IFN0YWdlID0gTGF5YS5TdGFnZVxyXG5cclxuaW1wb3J0IFRlc3RfMV9UZXh0IGZyb20gJy4vc3R1ZHkvVGVzdF8xX1RleHQnO1xyXG5pbXBvcnQgVGVzdF8yX0lucHV0VGVzdCBmcm9tICcuL3N0dWR5L1Rlc3RfMl9JbnB1dFRlc3QnO1xyXG5pbXBvcnQgVGVzdF8zX0JpdG1hcEZvbnQgZnJvbSAnLi9zdHVkeS9UZXN0XzNfQml0bWFwRm9udCc7XHJcbmltcG9ydCBUZXN0XzRfMV9TcHJpdGVfRGlzcGxheUltYWdlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSc7XHJcbmltcG9ydCBUZXN0XzRfMV9TcHJpdGVfU3dpdGNoVGV4dHVyZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8xX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlJztcclxuaW1wb3J0IFRlc3RfNF8yX1Nwcml0ZV9EaXNwbGF5SW1hZ2UgZnJvbSAnLi9zdHVkeS9UZXN0XzRfMl9TcHJpdGVfRGlzcGxheUltYWdlJztcclxuaW1wb3J0IFRlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzJfU3ByaXRlX1N3aXRjaFRleHR1cmUnO1xyXG5pbXBvcnQgVGVzdF80X01hc2tEZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF80X01hc2tEZW1vJztcclxuaW1wb3J0IFRlc3RfNV8xX0NvbG9yRmlsdGVyIGZyb20gJy4vc3R1ZHkvVGVzdF81XzFfQ29sb3JGaWx0ZXInO1xyXG5pbXBvcnQgVGVzdF81XzJfR2xvd0ZpbHRlciBmcm9tICcuL3N0dWR5L1Rlc3RfNV8yX0dsb3dGaWx0ZXInO1xyXG5pbXBvcnQgVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMgZnJvbSAnLi9zdHVkeS9UZXN0XzZfMV9TcHJpdGVfRHJhd1NoYXBlcyc7XHJcbmltcG9ydCBUZXN0XzdfQXRsYXNBbmlEZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF83X0F0bGFzQW5pRGVtbyc7XHJcbmltcG9ydCBUZXN0XzhfVHdlZW5EZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF84X1R3ZWVuRGVtbyc7XHJcbmltcG9ydCBUZXN0XzlfVGltZUxpbmUgZnJvbSAnLi9zdHVkeS9UZXN0XzlfVGltZUxpbmUnO1xyXG5pbXBvcnQgVGVzdF85X1RpbWVMaW5lVUkgZnJvbSAnLi9zdHVkeS9UZXN0XzlfVGltZUxpbmVVSSc7XHJcbmltcG9ydCBUZXN0XzExX1NvdW5kIGZyb20gJy4vc3R1ZHkvVGVzdF8xMV9Tb3VuZCc7XHJcbmltcG9ydCBHYW1lQ29uZmlnIGZyb20gJy4vR2FtZUNvbmZpZyc7XHJcbmltcG9ydCBUZXN0XzBfMV9DaGFubmVsIGZyb20gJy4vc3R1ZHkvVGVzdF8wXzFfQ2hhbm5lbCc7XHJcbmltcG9ydCBUZXN0XzBfMV9Tb2NrZXQgZnJvbSAnLi9zdHVkeS9UZXN0XzBfMV9Tb2NrZXQnO1xyXG5pbXBvcnQgVGVzdF8wX05ldHdvcmtfUHJvdG9jb2xCdWZmZXIgZnJvbSAnLi9zdHVkeS9UZXN0XzBfTmV0d29ya19Qcm90b2NvbEJ1ZmZlcic7XHJcbmltcG9ydCBOZXR3b3JrTWFuYWdlciBmcm9tICcuL0ZyYW1ld29yay9OZXR3b3JrL05ldHdvcmtNYW5hZ2VyJztcclxuaW1wb3J0IFRlc3RfMTJfVGlsZWRNYXAgZnJvbSAnLi9zdHVkeS9UZXN0XzEyX1RpbGVkTWFwJztcclxuaW1wb3J0IFRlc3RfMTNfRG9tRWxlbWVudCBmcm9tICcuL3N0dWR5L1Rlc3RfMTNfRG9tRWxlbWVudCc7XHJcbmltcG9ydCBUZXN0XzE0X1NoYWRlciBmcm9tICcuL3N0dWR5L1Rlc3RfMTRfU2hhZGVyJztcclxuaW1wb3J0IFRlc3RfMjBfTGF5YUFpcjNEIGZyb20gJy4vc3R1ZHkvVGVzdF8yMF9MYXlhQWlyM0QnO1xyXG5pbXBvcnQgVGVzdF8yMl9MYXlhQWlyM0RfQW5pbWF0aW9uIGZyb20gJy4vc3R1ZHkvVGVzdF8yMl9MYXlhQWlyM0RfQW5pbWF0aW9uJztcclxuaW1wb3J0IFRlc3RfMjRfUGF0aGZpbmRpbmcgZnJvbSAnLi9zdHVkeS9UZXN0XzI0X1BhdGhmaW5kaW5nJztcclxuaW1wb3J0IFRlc3RfMV9PcnRob2dyYXBoaWNDYW1lcmEgZnJvbSAnLi9zdHVkeTNEL1Rlc3RfMV9PcnRob2dyYXBoaWNDYW1lcmEnO1xyXG5pbXBvcnQgVGVzdF8yX1Nwcml0ZTNEVHJhbnNmb3JtIGZyb20gJy4vc3R1ZHkzRC9UZXN0XzJfU3ByaXRlM0RUcmFuc2Zvcm0nO1xyXG5pbXBvcnQgVGVzdF8zX01lc2hMb2FkIGZyb20gJy4vc3R1ZHkzRC9UZXN0XzNfTWVzaExvYWQnO1xyXG5pbXBvcnQgVGVzdF80X0N1c3RvbU1lc2ggZnJvbSAnLi9zdHVkeTNEL1Rlc3RfNF9DdXN0b21NZXNoJztcclxuaW1wb3J0IFRlc3RfNV9MaWdodERlbW8gZnJvbSAnLi9zdHVkeTNEL1Rlc3RfNV9MaWdodERlbW8nO1xyXG5pbXBvcnQgVGVzdF82X011bHRpQ2FtZXJhIGZyb20gJy4vc3R1ZHkzRC9UZXN0XzZfTXVsdGlDYW1lcmEnO1xyXG5pbXBvcnQgVGVzdF83X09ydGhvZ3JhcGhpY0NhbWVyYSBmcm9tICcuL3N0dWR5M0QvVGVzdF83X09ydGhvZ3JhcGhpY0NhbWVyYSc7XHJcbmltcG9ydCBUZXN0XzhfRDNTcGFjZVRvRDJTcGFjZSBmcm9tICcuL3N0dWR5M0QvVGVzdF84X0QzU3BhY2VUb0QyU3BhY2UnO1xyXG5pbXBvcnQgVGVzdF85X1NraW5BbmltYXRpb25fTmV3IGZyb20gJy4vc3R1ZHkzRC9UZXN0XzlfU2tpbkFuaW1hdGlvbl9OZXcnO1xyXG5pbXBvcnQgVGVzdF8xMl8zRFRpbGVkTWFwIGZyb20gJy4vc3R1ZHkzRC9UZXN0XzEyXzNEVGlsZWRNYXAnO1xyXG5cclxuLy/lkK/liqjnsbtcclxuY2xhc3MgQXBwTWFpbiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvL+agueaNrklEReiuvue9ruWIneWni+WMluW8leaTjlx0XHRcclxuICAgICAgICBpZiAod2luZG93W1wiTGF5YTNEXCJdKSB7XHJcbiAgICAgICAgICAgIExheWEzRC5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOS4jeaUr+aMgVdlYkdM5pe26Ieq5Yqo5YiH5o2i6IezQ2FudmFzXHJcbiAgICAgICAgICAgIExheWEuaW5pdChCcm93c2VyLmNsaWVudFdpZHRoLCBCcm93c2VyLmNsaWVudEhlaWdodCwgV2ViR0wpO1xyXG4gICAgICAgICAgICAvL0xheWEuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCwgTGF5YVtcIldlYkdMXCJdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTGF5YVtcIlBoeXNpY3NcIl0gJiYgTGF5YVtcIlBoeXNpY3NcIl0uZW5hYmxlKCk7XHJcbiAgICAgICAgTGF5YVtcIkRlYnVnUGFuZWxcIl0gJiYgTGF5YVtcIkRlYnVnUGFuZWxcIl0uZW5hYmxlKCk7XHJcblxyXG5cclxuICAgICAgICAvL+aJk+W8gOiwg+ivlemdouadv++8iOmAmui/h0lEReiuvue9ruiwg+ivleaooeW8j++8jOaIluiAhXVybOWcsOWdgOWinuWKoGRlYnVnPXRydWXlj4LmlbDvvIzlnYflj6/miZPlvIDosIPor5XpnaLmnb/vvIlcclxuICAgICAgICBpZiAoR2FtZUNvbmZpZy5kZWJ1ZyB8fCBMYXlhLlV0aWxzLmdldFF1ZXJ5U3RyaW5nKFwiZGVidWdcIikgPT0gXCJ0cnVlXCIpIExheWEuZW5hYmxlRGVidWdQYW5lbCgpO1xyXG4gICAgICAgIGlmIChHYW1lQ29uZmlnLnBoeXNpY3NEZWJ1ZyAmJiBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXSkgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0uZW5hYmxlKCk7XHJcbiAgICAgICAgaWYgKEdhbWVDb25maWcuc3RhdCkgTGF5YS5TdGF0LnNob3coKTtcclxuXHJcbiAgICAgICAgLy/ooajnpLrmmK/lkKbmjZXojrflhajlsYDplJnor6/lubblvLnlh7rmj5DnpLrjgIJcclxuICAgICAgICBMYXlhLmFsZXJ0R2xvYmFsRXJyb3IgPSB0cnVlO1xyXG5cclxuICAgICAgICAvL+a/gOa0u+i1hOa6kOeJiOacrOaOp+WItu+8jHZlcnNpb24uanNvbueUsUlEReWPkeW4g+WKn+iDveiHquWKqOeUn+aIkO+8jOWmguaenOayoeacieS5n+S4jeW9seWTjeWQjue7rea1geeoi1xyXG4gICAgICAgIExheWEuUmVzb3VyY2VWZXJzaW9uLmVuYWJsZShcInZlcnNpb24uanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25WZXJzaW9uTG9hZGVkKSwgTGF5YS5SZXNvdXJjZVZlcnNpb24uRklMRU5BTUVfVkVSU0lPTik7XHJcblxyXG5cclxuICAgICAgICBMYXlhLnN0YWdlLmFsaWduViA9IFN0YWdlLkFMSUdOX01JRERMRTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFsaWduSCA9IFN0YWdlLkFMSUdOX0NFTlRFUjtcclxuICAgICAgICBMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IEdhbWVDb25maWcuc2NhbGVNb2RlOy8vU3RhZ2UuU0NBTEVfRlVMTDsvL1NDQUxFX0ZJWEVEX0hFSUdIVFxyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IEdhbWVDb25maWcuc2NyZWVuTW9kZTsvL1N0YWdlLlNDUkVFTl9IT1JJWk9OVEFMOy8vU0NSRUVOX1ZFUlRJQ0FMXHJcbiAgICAgICAgTGF5YS5zdGFnZS5iZ0NvbG9yID0gXCIjN2Y3ZjdmXCI7XHJcblxyXG4gICAgICAgIC8v5YW85a655b6u5L+h5LiN5pSv5oyB5Yqg6L29c2NlbmXlkI7nvIDlnLrmma9cclxuICAgICAgICBMYXlhLlVSTC5leHBvcnRTY2VuZVRvSnNvbiA9IEdhbWVDb25maWcuZXhwb3J0U2NlbmVUb0pzb247XHJcblxyXG4gICAgICAgIC8v5aaC5p6c6YCa6L+H6K6+5aSH6Z2Z6Z+z6ZSu6K6p6Z+z6aKR6Ieq5Yqo6Lef6ZqP6K6+5aSH6Z2Z6Z+z44CC6ZyA6KaB5bCGdXNlQXVkaW9NdXNpY+iuvue9ruS4umZhbHNl44CCXHJcbiAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIudXNlQXVkaW9NdXNpYyA9IGZhbHNlO1xyXG4gICAgICAgIExheWEuU291bmRNYW5hZ2VyLmF1dG9TdG9wTXVzaWMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy/mtojpmaTnn6Lph4/nu5jliLbnmoTplK/pvb/vvIzkvYbkvJrlop7liqDmgKfog73mtojogJdcclxuICAgICAgICAvL0NvbmZpZy5pc0FudGlhbGlhcz10cnVlO1xyXG5cclxuICAgICAgICAvL+mUgOavgeW9k+WJjeayoeacieiiq+S9v+eUqOeahOi1hOa6kCzor6Xlh73mlbDkvJrlv73nlaVsb2NrPXRydWXnmoTotYTmupDjgIJcclxuICAgICAgICAvL0xheWEuUmVzb3VyY2UuZGVzdHJveVVudXNlZFJlc291cmNlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVmVyc2lvbkxvYWRlZCgpOiB2b2lkIHtcclxuICAgICAgICAvL+a/gOa0u+Wkp+Wwj+WbvuaYoOWwhO+8jOWKoOi9veWwj+WbvueahOaXtuWAme+8jOWmguaenOWPkeeOsOWwj+WbvuWcqOWkp+WbvuWQiOmbhumHjOmdou+8jOWImeS8mOWFiOWKoOi9veWkp+WbvuWQiOmbhu+8jOiAjOS4jeaYr+Wwj+WbvlxyXG4gICAgICAgIExheWEuQXRsYXNJbmZvTWFuYWdlci5lbmFibGUoXCJmaWxlY29uZmlnLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uQ29uZmlnTG9hZGVkKSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Db25maWdMb2FkZWQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0dXAzRCgpO1xyXG4gICAgICAgIHRoaXMuc2V0dXAoKTtcclxuICAgICAgICAvL+WKoOi9vUlEReaMh+WumueahOWcuuaZr1xyXG4gICAgICAgIC8vR2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0dXAoKTogdm9pZCB7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8xX1RleHQoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzJfSW5wdXRUZXN0KCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8zX0JpdG1hcEZvbnQoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzRfMV9TcHJpdGVfRGlzcGxheUltYWdlKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80XzFfU3ByaXRlX1N3aXRjaFRleHR1cmUoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzRfMl9TcHJpdGVfRGlzcGxheUltYWdlKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80XzJfU3ByaXRlX1N3aXRjaFRleHR1cmUoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzRfTWFza0RlbW8oKTtcclxuICAgICAgICAvL25ldyBUZXN0XzVfMV9Db2xvckZpbHRlcigpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNV8yX0dsb3dGaWx0ZXIoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzZfMV9TcHJpdGVfRHJhd1NoYXBlcygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfN19BdGxhc0FuaURlbW8oKTtcclxuICAgICAgICAvL25ldyBUZXN0XzhfVHdlZW5EZW1vKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF85X1RpbWVMaW5lKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF85X1RpbWVMaW5lVUkoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzExX1NvdW5kKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8wXzFfU29ja2V0KCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8wX05ldHdvcmtfUHJvdG9jb2xCdWZmZXIoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzEyX1RpbGVkTWFwKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8xM19Eb21FbGVtZW50KCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8xNF9TaGFkZXIoKTtcclxuXHJcbiAgICAgICAgLy9uZXcgVGVzdF8yMF9MYXlhQWlyM0QoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzIyX0xheWFBaXIzRF9BbmltYXRpb24oKTtcclxuXHJcbiAgICAgICAgLy9uZXcgVGVzdF8yNF9QYXRoZmluZGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0dXAzRCgpOiB2b2lkIHtcclxuICAgICAgICAvL25ldyBUZXN0XzFfT3J0aG9ncmFwaGljQ2FtZXJhKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8yX1Nwcml0ZTNEVHJhbnNmb3JtKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8zX01lc2hMb2FkKCk7XHJcbiAgICAgICAgLy9uZXcgIFRlc3RfNF9DdXN0b21NZXNoKCk7XHJcbiAgICAgICAgLy9uZXcgIFRlc3RfNV9MaWdodERlbW8oKTtcclxuICAgICAgICAvL25ldyBUZXN0XzZfTXVsdGlDYW1lcmEoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzdfT3J0aG9ncmFwaGljQ2FtZXJhKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF84X0QzU3BhY2VUb0QyU3BhY2UoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzlfU2tpbkFuaW1hdGlvbl9OZXcoKTtcclxuICAgICAgICBuZXcgVGVzdF8xMl8zRFRpbGVkTWFwKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBBcHBNYWluKCk7IiwiY2xhc3MgT2JzZXJ2ZXIge1xyXG4gICAgLyoqIOS4iuS4i+aWhyAqL1xyXG4gICAgcHJpdmF0ZSBjb250ZXh0OiBhbnkgPSBudWxsO1xyXG4gICAgLyoqIOWbnuiwg+WHveaVsCAqL1xyXG4gICAgcHJpdmF0ZSBjYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQ6IGFueSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43nva5cclxuICAgICAqIEBwYXJhbSBjb250ZXh0IOS4iuS4i+aWh1xyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIOWbnuiwg+WHveaVsFxyXG4gICAgICovXHJcbiAgICByZXNldChjb250ZXh0OiBhbnkgPSBudWxsLCBjYWxsYmFjazogRnVuY3Rpb24gPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HpgIHpgJrnn6VcclxuICAgICAqIEBwYXJhbSBhcmdzIOS4jeWumuWPguaVsFxyXG4gICAgICovXHJcbiAgICBub3RpZnkoLi4uYXJnczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrLmNhbGwodGhpcy5jb250ZXh0LCAuLi5hcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4iuS4i+aWh+avlOi+g1xyXG4gICAgICogQHBhcmFtIGNvbnRleHQg5LiK5LiL5paHXHJcbiAgICAgKi9cclxuICAgIGNvbXBhcihjb250ZXh0OiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gY29udGV4dCA9PSB0aGlzLmNvbnRleHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXRFdmVudERpc3BhdGNoZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IE5ldEV2ZW50RGlzcGF0Y2hlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTmV0RXZlbnREaXNwYXRjaGVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZSB8fCAodGhpcy5pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDnm5HlkKzmlbDnu4QgKi9cclxuICAgIHByaXZhdGUgbGlzdGVuZXJzOiB7IFtpbmRleDogbnVtYmVyXTogQXJyYXk8T2JzZXJ2ZXI+IH0gPSB7fVxyXG4gICAgLyoqIOenu+mZpOaVsOe7hCAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVMaXN0ZW5lcnM6IEFycmF5PE9ic2VydmVyPiA9IFtdXHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgIHB1YmxpYyByZWdpc3RlcihtZXNzYWdlSUQ6IG51bWJlciwgY29udGV4dDogYW55LCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgb2JzZXJ2ZXJzOiBPYnNlcnZlcltdID0gdGhpcy5saXN0ZW5lcnNbbWVzc2FnZUlEXTtcclxuICAgICAgICBpZiAoIW9ic2VydmVycykge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttZXNzYWdlSURdID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnJlbW92ZUxpc3RlbmVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBvYnNlcnZlciA9IHRoaXMucmVtb3ZlTGlzdGVuZXJzLnBvcCgpO1xyXG4gICAgICAgICAgICBvYnNlcnZlci5yZXNldChjb250ZXh0LCBjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21lc3NhZ2VJRF0ucHVzaChvYnNlcnZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttZXNzYWdlSURdLnB1c2gobmV3IE9ic2VydmVyKGNvbnRleHQsIGNhbGxiYWNrKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHVuUmVnaXN0ZXIobWVzc2FnZUlEOiBudW1iZXIsIGNvbnRleHQ6IGFueSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IG9ic2VydmVyczogT2JzZXJ2ZXJbXSA9IHRoaXMubGlzdGVuZXJzW21lc3NhZ2VJRF07XHJcbiAgICAgICAgaWYgKCFvYnNlcnZlcnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gb2JzZXJ2ZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYnNlcnZlciA9IG9ic2VydmVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKG9ic2VydmVyLmNvbXBhcihjb250ZXh0KSkge1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXJzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVycy5wdXNoKG9ic2VydmVyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvYnNlcnZlcnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMubGlzdGVuZXJzW21lc3NhZ2VJRF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGRpc3BhdGNoKG1lc3NhZ2VJRDogbnVtYmVyLCAuLi5hcmdzKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG9ic2VydmVyczogT2JzZXJ2ZXJbXSA9IHRoaXMubGlzdGVuZXJzW21lc3NhZ2VJRF07XHJcbiAgICAgICAgaWYgKCFvYnNlcnZlcnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gb2JzZXJ2ZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYnNlcnZlciA9IG9ic2VydmVyc1tpXTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIubm90aWZ5KG1lc3NhZ2VJRCwgLi4uYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIENsZWFyQWxsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge31cclxuICAgIH1cclxufSIsIlxyXG4vKipcclxuICogUHJvdG9idWYg5raI5oGv5ZCN56ew5Yy56YWNXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXRNZXNzYWdlTmFtZSB7XHJcbiAgICBzdGF0aWMgbWVzc2FnZU1hcCA9IHt9XHJcbiAgICBzdGF0aWMgaXNJbml0ID0gZmFsc2VcclxuICAgIHN0YXRpYyBnZXRNYXAoKTogYW55IHtcclxuICAgICAgICBpZiAoTmV0TWVzc2FnZU5hbWUuaXNJbml0KXtcclxuICAgICAgICAgICAgcmV0dXJuIE5ldE1lc3NhZ2VOYW1lLm1lc3NhZ2VNYXBcclxuICAgICAgICB9XHJcbiAgICAgICAgTmV0TWVzc2FnZU5hbWUuaXNJbml0ID0gdHJ1ZVxyXG5cclxuICAgICAgICAvL01lc3NhZ2VOYW1lXHJcbiAgICAgICAgbGV0IG1hcCA9IE5ldE1lc3NhZ2VOYW1lLm1lc3NhZ2VNYXBcclxuXHJcbiAgICAgICAgbWFwW0dhbWVNZXNzYWdlLkdNX1ZFUklGWV9WRVJTSU9OXT0nR01fVmVyaWZ5VmVyc2lvbic7XHJcbiAgICAgICAgbWFwW0dhbWVNZXNzYWdlLkdNX1ZFUlNJT05fUkVUVVJOXT0nR01fVmVyaWZ5VmVyc2lvblJldHVybic7XHJcblxyXG4gICAgICAgIHJldHVybiBtYXBcclxuICAgIH1cclxufSIsImltcG9ydCBCeXRlID0gTGF5YS5CeXRlXHJcbmltcG9ydCBTb2NrZXRDb25uZWN0IGZyb20gXCIuL1NvY2tldENvbm5lY3RcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXRQYWNrZXQge1xyXG4gICAgLy9wcml2YXRlIFdFQlBBQ0tfSEVBRF9PRkZTRVQ6IG51bWJlciA9IDBcdC8vIOiHquWumuS5ieaVsOaNriDkuIDoiKzmmK9yb2xlaWQgKGxvbmfnsbvlnospXHJcbiAgICAvL3ByaXZhdGUgV0VCUEFDS19NRVNTU0FHRUlEX09GRlNFVDogbnVtYmVyID0gOFx0Ly8g5raI5oGvaWRcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX0xFTkdUSF9PRkZTRVQ6IG51bWJlciA9IDEyXHQvLyDmtojmga/plb/luqZcclxuICAgIHB1YmxpYyBXRUJQQUNLX0hFQURfU0laRTogbnVtYmVyID0gMTZcdC8vIOa2iOaBr+aVsOaNruW8gOWni+S9jee9rlxyXG5cclxuICAgIHB1YmxpYyByb2xlSWQ6IG51bWJlclxyXG4gICAgcHVibGljIG1lc3NhZ2VJZDogbnVtYmVyXHJcbiAgICBwdWJsaWMgbWVzc2FnZTogYW55XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkQnl0ZXM6IEJ5dGVcclxuICAgIHByaXZhdGUgc29ja2V0Q29ubmVjdDogU29ja2V0Q29ubmVjdFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbm5lY3Q6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdCA9IGNvbm5lY3RcclxuICAgICAgICB0aGlzLnJlYWRCeXRlcyA9IG5ldyBCeXRlKClcclxuICAgICAgICB0aGlzLnJlYWRCeXRlcy5lbmRpYW4gPSBMYXlhLkJ5dGUuTElUVExFX0VORElBTi8v6L+Z6YeM5oiR5Lus6YeH55So5bCP56uvXHJcbiAgICB9XHJcblxyXG4gICAgLy/mjqXmlLbmnI3liqHlmajkv6Hmga9cclxuICAgIHB1YmxpYyByZWNlaXZlTXNnKGJ5dGVzOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlYWRCeXRlcy53cml0ZUFycmF5QnVmZmVyKGJ5dGVzKVxyXG4gICAgICAgIHRoaXMucmVhZEJ5dGVzLnBvcyA9IDAvL+iuvue9ruWBj+enu+aMh+mSiFxyXG5cclxuICAgICAgICAvL+aMieeFp+acjeWKoeWZqOS8oOmAkui/h+adpeeahOaVsOaNru+8jOaMieeFp+mhuuW6j+ivu+WPllxyXG4gICAgICAgIHRoaXMucm9sZUlkID0gdGhpcy5yZWFkQnl0ZXMuZ2V0RmxvYXQ2NCgpXHJcbiAgICAgICAgdGhpcy5tZXNzYWdlSWQgPSB0aGlzLnJlYWRCeXRlcy5nZXRJbnQzMigpXHJcbiAgICAgICAgbGV0IG1zZ0xlbmd0aCA9IHRoaXMucmVhZEJ5dGVzLmdldEludDMyKClcclxuICAgICAgICAvL2xldCBhYiA9IHRoaXMucmVhZEJ5dGVzLnJlYWRBcnJheUJ1ZmZlcihtc2dMZW5ndGggLSB0aGlzLldFQlBBQ0tfSEVBRF9TSVpFKVxyXG4gICAgICAgIC8vbGV0IGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KGFiKVxyXG4gICAgICAgIC8vdGhpcy5tZXNzYWdlID0gdGhpcy5zb2NrZXRDb25uZWN0LmRlc2VyaWFsaXplKHRoaXMubWVzc2FnZUlkLCBidWZmZXIpXHJcbiAgICAgICAgbGV0IHVpbnQ4QXJyYXkgPSB0aGlzLnJlYWRCeXRlcy5yZWFkVWludDhBcnJheSh0aGlzLldFQlBBQ0tfSEVBRF9TSVpFLCBtc2dMZW5ndGggLSB0aGlzLldFQlBBQ0tfSEVBRF9TSVpFKVxyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IHRoaXMuc29ja2V0Q29ubmVjdC5kZXNlcmlhbGl6ZSh0aGlzLm1lc3NhZ2VJZCwgdWludDhBcnJheSlcclxuXHJcbiAgICAgICAgLy9pZiAobXNnTGVuZ3RoICE9IHRoaXMucmVhZEJ5dGVzLmxlbmd0aCkge1xyXG4gICAgICAgIC8vICAgIGNvbnNvbGUuZXJyb3IoXCLmtojmga/plb/kuI3kuIDmoLdcIilcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgdGhpcy5yZWFkQnl0ZXMuY2xlYXIoKVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFNvY2tldENvbm5lY3QgZnJvbSBcIi4vU29ja2V0Q29ubmVjdFwiO1xyXG5cclxuY2xhc3MgR2FtZUNsaWVudCB7XHJcbiAgICBwcml2YXRlIGNsaWVudElkOiBDbGllbnRJRDtcclxuICAgIHByaXZhdGUgc29ja2V0Q29ubmVjdDogU29ja2V0Q29ubmVjdDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogQ2xpZW50SUQpIHtcclxuICAgICAgICB0aGlzLmNsaWVudElkID0gaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbm5lY3QoaG9zdDogc3RyaW5nLCBwb3J0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QgPSBuZXcgU29ja2V0Q29ubmVjdChcIiBjbGllbnRJZDpcIiArIHRoaXMuY2xpZW50SWQpO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5jb25uZWN0KGhvc3QsIHBvcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25uZWN0QnlVcmwodXJsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QgPSBuZXcgU29ja2V0Q29ubmVjdChcIiBjbGllbnRJZDpcIiArIHRoaXMuY2xpZW50SWQpO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5jb25uZWN0QnlVcmwodXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVjb25uZWN0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5yZWNvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzY29ubmVjdGVkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5kaXNjb25uZWN0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNDb25uZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ja2V0Q29ubmVjdC5jb25uZWN0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZEVtcHR5KG1zZ0lkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3Quc2VuZEVtcHR5KG1zZ0lkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgbXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3Quc2VuZE1lc3NhZ2UobXNnSWQsIG1zZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ29ubmVjdENhbGxiYWNrKGNhbGxiYWNrOkZ1bmN0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5vbkNvbm5lY3QgPSBjYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25EaXNjb25uZWN0Q2FsbGJhY2soY2FsbGJhY2s6RnVuY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0Lm9uRGlzY29ubmVjdCA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0d29ya01hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IE5ldHdvcmtNYW5hZ2VyO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTmV0d29ya01hbmFnZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlIHx8ICh0aGlzLmluc3RhbmNlID0gbmV3IHRoaXMoKSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdhbWVDbGllbnRNYXA6IHsgW2luZGV4OiBudW1iZXJdOiBHYW1lQ2xpZW50OyB9ID0ge307XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6KeS6ImySURcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFJvbGVJZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnBvdygyLCA1MykgLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVDbGllbnQoY2xpZW50SUQ6IG51bWJlciwgdXJsOiBzdHJpbmcpOiBHYW1lQ2xpZW50IHtcclxuICAgICAgICB2YXIgY2xpZW50OiBHYW1lQ2xpZW50ID0gbmV3IEdhbWVDbGllbnQoY2xpZW50SUQpO1xyXG4gICAgICAgIGNsaWVudC5jb25uZWN0QnlVcmwodXJsKTtcclxuICAgICAgICB0aGlzLmdhbWVDbGllbnRNYXBbQ2xpZW50SUQubG9naW5dID0gY2xpZW50O1xyXG4gICAgICAgIHJldHVybiBjbGllbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENsaWVudChjbGllbnRJRDogQ2xpZW50SUQpOiBHYW1lQ2xpZW50IHtcclxuICAgICAgICBpZiAodGhpcy5nYW1lQ2xpZW50TWFwW2NsaWVudElEXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdhbWVDbGllbnRNYXBbY2xpZW50SURdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VDbGllbnQoY2xpZW50SUQ6IENsaWVudElEKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNsaWVudDogR2FtZUNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KENsaWVudElELmxvZ2luKVxyXG4gICAgICAgIGlmIChjbGllbnQpIHtcclxuICAgICAgICAgICAgY2xpZW50LmRpc2Nvbm5lY3RlZCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWNvbm5lY3RDbGllbnQoY2xpZW50SUQ6IENsaWVudElEKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNsaWVudDogR2FtZUNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KENsaWVudElELmxvZ2luKVxyXG4gICAgICAgIGlmIChjbGllbnQpIHtcclxuICAgICAgICAgICAgY2xpZW50LnJlY29ubmVjdCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dpblNlbmRNZXNzYWdlKG1zZ0lkOiBudW1iZXIsIG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShtc2dJZCwgbXNnLCBDbGllbnRJRC5sb2dpbilcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naWNTZW5kTWVzc2FnZShtc2dJZDogbnVtYmVyLCBtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UobXNnSWQsIG1zZywgQ2xpZW50SUQubG9naWMpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNjZW5lU2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgbXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKG1zZ0lkLCBtc2csIENsaWVudElELnNjZW5lKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgbXNnOiBhbnksIGNsaWVudElEOiBDbGllbnRJRCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGllbnQ6IEdhbWVDbGllbnQgPSB0aGlzLmdldENsaWVudChjbGllbnRJRClcclxuICAgICAgICBpZiAoY2xpZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5zZW5kTWVzc2FnZShtc2dJZCwgbXNnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZE1lc3NhZ2VFbXB0eShtc2dJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNsaWVudDogR2FtZUNsaWVudCA9IG51bGw7XHJcbiAgICAgICAgaWYgKG1zZ0lkID4gR2FtZU1lc3NhZ2UuR01fQUNDT1VOVF9TRVJWRVJfTUVTU0FHRV9TVEFSVCAmJiBtc2dJZCA8IEdhbWVNZXNzYWdlLkdNX0FDQ09VTlRfU0VSVkVSX01FU1NBR0VfRU5EKSB7XHJcbiAgICAgICAgICAgIGNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KENsaWVudElELmxvZ2luKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY2xpZW50ID0gdGhpcy5nZXRDbGllbnQoQ2xpZW50SUQubG9naWMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjbGllbnQpIHtcclxuICAgICAgICAgICAgY2xpZW50LnNlbmRFbXB0eShtc2dJZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQWxsR2FtZUNsaWVudCgpIHtcclxuICAgICAgICBsZXQgZGljID0gdGhpcy5nYW1lQ2xpZW50TWFwXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGljKSB7XHJcbiAgICAgICAgICAgIGlmIChkaWMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRpY1trZXldO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5kaXNjb25uZWN0ZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdhbWVDbGllbnRNYXAgPSB7fVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IE5ldEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vRXZlbnQvTmV0RXZlbnREaXNwYXRjaGVyXCJcclxuaW1wb3J0IE5ldFBhY2tldCBmcm9tIFwiLi9OZXRQYWNrZXRcIlxyXG5pbXBvcnQgTmV0d29ya01hbmFnZXIgZnJvbSBcIi4vTmV0d29ya01hbmFnZXJcIlxyXG5pbXBvcnQgTmV0TWVzc2FnZU5hbWUgZnJvbSBcIi4vTmV0TWVzc2FnZU5hbWVcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2NrZXRDb25uZWN0IHtcclxuXHJcbiAgICAvL3ByaXZhdGUgV0VCUEFDS19IRUFEX09GRlNFVDogbnVtYmVyID0gMFx0Ly8g6Ieq5a6a5LmJ5pWw5o2uIOS4gOiIrOaYr3JvbGVpZCAobG9uZ+exu+WeiylcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX01FU1NTQUdFSURfT0ZGU0VUOiBudW1iZXIgPSA4XHQvLyDmtojmga9pZFxyXG4gICAgLy9wcml2YXRlIFdFQlBBQ0tfTEVOR1RIX09GRlNFVDogbnVtYmVyID0gMTJcdC8vIOa2iOaBr+mVv+W6plxyXG4gICAgcHJpdmF0ZSBXRUJQQUNLX0hFQURfU0laRTogbnVtYmVyID0gMTZcdC8vIOa2iOaBr+aVsOaNruW8gOWni+S9jee9rlxyXG5cclxuXHJcbiAgICBwdWJsaWMgc29ja2V0OiBMYXlhLlNvY2tldCA9IG51bGxcclxuICAgIHByaXZhdGUgc2VuZEJ5dGVzOiBMYXlhLkJ5dGUgPSBudWxsXHJcbiAgICBwcml2YXRlIHJlYWRCeXRlczogTGF5YS5CeXRlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSB0ZW1wQnl0ZXM6IExheWEuQnl0ZSA9IG51bGxcclxuICAgIHByaXZhdGUgdXJsOiBzdHJpbmcgPSBudWxsXHJcbiAgICBwcml2YXRlIHRpcHM6IHN0cmluZyA9IG51bGxcclxuICAgIHByaXZhdGUgcGJNZXNzYWdlTmFtZTogYW55ID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBwcm90b1Jvb3Q6IGFueSA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIG9uQ29ubmVjdDpGdW5jdGlvbiA9IG51bGw7XHJcbiAgICBwdWJsaWMgb25EaXNjb25uZWN0OkZ1bmN0aW9uID0gbnVsbDtcclxuXHJcbiAgICAvL3ByaXZhdGUgc2VuZE5ldFBhY2tldDogQXJyYXk8TmV0UGFja2V0PiA9IG51bGxcclxuICAgIC8vcHJpdmF0ZSByZWNlaXZlTmV0UGFja2V0OiBBcnJheTxOZXRQYWNrZXQ+ID0gbnVsbFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRpcHM6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudGlwcyA9IHRpcHNcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcyA9IG5ldyBMYXlhLkJ5dGUoKVxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLmVuZGlhbiA9IExheWEuQnl0ZS5MSVRUTEVfRU5ESUFOLy/ov5nph4zmiJHku6zph4fnlKjlsI/nq69cclxuICAgICAgICB0aGlzLnRlbXBCeXRlcyA9IG5ldyBMYXlhLkJ5dGUoKVxyXG4gICAgICAgIHRoaXMudGVtcEJ5dGVzLmVuZGlhbiA9IExheWEuQnl0ZS5MSVRUTEVfRU5ESUFOLy/ov5nph4zmiJHku6zph4fnlKjlsI/nq69cclxuXHJcbiAgICAgICAgLy90aGlzLnNlbmROZXRQYWNrZXQgPSBuZXcgQXJyYXk8TmV0UGFja2V0PigpIC8v5Y+R6YCB55qE572R57uc5YyFXHJcbiAgICAgICAgLy90aGlzLnJlY2VpdmVOZXRQYWNrZXQgPSBuZXcgQXJyYXk8TmV0UGFja2V0PigpIC8v5o6l5pS255qE572R57uc5YyFXHJcblxyXG4gICAgICAgIHRoaXMucHJvdG9Sb290ID0gTGF5YS5Ccm93c2VyLndpbmRvd1tcIlBCTWVzc2FnZVwiXVxyXG4gICAgICAgIHRoaXMucGJNZXNzYWdlTmFtZSA9IE5ldE1lc3NhZ2VOYW1lLmdldE1hcCgpXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY29ubmVjdChob3N0OiBzdHJpbmcsIHBvcnQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudXJsID0gaG9zdC5jb25jYXQocG9ydC50b1N0cmluZygpKVxyXG4gICAgICAgIHRoaXMuY29ubmVjdEJ5VXJsKHRoaXMudXJsKVxyXG4gICAgfVxyXG4gICAgLy9cIndzOi8vbG9jYWxob3N0Ojg5ODlcIlxyXG4gICAgcHVibGljIGNvbm5lY3RCeVVybCh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudXJsID0gdXJsXHJcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBuZXcgTGF5YS5Tb2NrZXQoKVxyXG4gICAgICAgIHRoaXMuc29ja2V0LmVuZGlhbiA9IExheWEuQnl0ZS5MSVRUTEVfRU5ESUFOLy/ov5nph4zmiJHku6zph4fnlKjlsI/nq69cclxuICAgICAgICB0aGlzLnNvY2tldC5jb25uZWN0QnlVcmwodXJsKVxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKExheWEuRXZlbnQuT1BFTiwgdGhpcywgdGhpcy5vcGVuSGFuZGxlcilcclxuICAgICAgICB0aGlzLnNvY2tldC5vbihMYXlhLkV2ZW50Lk1FU1NBR0UsIHRoaXMsIHRoaXMucmVjZWl2ZUhhbmRsZXIpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oTGF5YS5FdmVudC5DTE9TRSwgdGhpcywgdGhpcy5jbG9zZUhhbmRsZXIpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oTGF5YS5FdmVudC5FUlJPUiwgdGhpcywgdGhpcy5lcnJvckhhbmRsZXIpXHJcbiAgICB9XHJcbiAgICAvL+mHjeaWsOi/nuaOpVxyXG4gICAgcHVibGljIHJlY29ubmVjdCgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5jbGVhblNvY2tldCgpXHJcbiAgICAgICAgdGhpcy5jb25uZWN0QnlVcmwodGhpcy51cmwpXHJcbiAgICB9XHJcbiAgICAvL+aWreW8gOi/nuaOpVxyXG4gICAgcHVibGljIGRpc2Nvbm5lY3RlZCgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5jbG9zZSgpXHJcbiAgICB9XHJcbiAgICAvL+aYr+WQpui/nuaOpVxyXG4gICAgcHVibGljIGNvbm5lY3RlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zb2NrZXQuY29ubmVjdGVkXHJcbiAgICB9XHJcbiAgICAvL+ato+ehruW7uueri+i/nuaOpVxyXG4gICAgcHJpdmF0ZSBvcGVuSGFuZGxlcihldmVudDogYW55ID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXJsICsgdGhpcy50aXBzICsgXCIgIOato+ehruW7uueri+i/nuaOpVwiKVxyXG4gICAgICAgIGlmICh0aGlzLm9uQ29ubmVjdCl7XHJcbiAgICAgICAgICAgIHRoaXMub25Db25uZWN0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WFs+mXrei/nuaOpeS6i+S7tlxyXG4gICAgcHJpdmF0ZSBjbG9zZUhhbmRsZXIoZXZlbnQ6IGFueSA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVybCArIHRoaXMudGlwcyArIFwiIOWFs+mXrei/nuaOpeS6i+S7tlwiKVxyXG4gICAgICAgIGlmICh0aGlzLm9uRGlzY29ubmVjdCl7XHJcbiAgICAgICAgICAgIHRoaXMub25EaXNjb25uZWN0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+i/nuaOpeWHuumUmVxyXG4gICAgcHJpdmF0ZSBlcnJvckhhbmRsZXIoZTogYW55ID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXJsICsgdGhpcy50aXBzICsgXCIg6L+e5o6l5Ye66ZSZXCIpXHJcbiAgICB9XHJcblxyXG4gICAgLy/lj5HpgIHnqbrmtojmga9cclxuICAgIHB1YmxpYyBzZW5kRW1wdHkobXNnSWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIC8vIOWGmeWFpeS4gOS4quaVsOWtlzBcclxuICAgICAgICB0aGlzLnRlbXBCeXRlcy53cml0ZUZsb2F0MzIoMClcclxuICAgICAgICB0aGlzLnNlbmQobXNnSWQsIHRoaXMudGVtcEJ5dGVzKVxyXG4gICAgICAgIHRoaXMudGVtcEJ5dGVzLmNsZWFyKClcclxuICAgIH1cclxuXHJcbiAgICAvL+WPkemAgea2iOaBr1xyXG4gICAgcHVibGljIHNlbmRNZXNzYWdlKG1zZ0lkOiBudW1iZXIsIG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgLy9pZiAodHlwZW9mIG1zZyA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgLy8gICAgdGhpcy50ZW1wQnl0ZXMud3JpdGVVVEZTdHJpbmcobXNnKVxyXG4gICAgICAgIC8vICAgIHRoaXMuc2VuZChtc2dJZCwgdGhpcy50ZW1wQnl0ZXMpXHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy9lbHNlIGlmIChtc2cgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xyXG4gICAgICAgIC8vICAgIHRoaXMudGVtcEJ5dGVzLndyaXRlQXJyYXlCdWZmZXIoYnVmZmVyKVxyXG4gICAgICAgIC8vICAgIHRoaXMuc2VuZChtc2dJZCwgdGhpcy50ZW1wQnl0ZXMpXHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy9lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgYnVmZmVyOiBVaW50OEFycmF5ID0gdGhpcy5zZXJpYWxpemUobXNnSWQsIG1zZylcclxuICAgICAgICAgICAgdGhpcy50ZW1wQnl0ZXMud3JpdGVBcnJheUJ1ZmZlcihidWZmZXIpXHJcbiAgICAgICAgICAgIHRoaXMuc2VuZChtc2dJZCwgdGhpcy50ZW1wQnl0ZXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6ZyA6KaB5Y+R6YCB55qE5pWw5o2uXHJcbiAgICBwcml2YXRlIHNlbmQobXNnSWQ6IG51bWJlciwgYnl0ZTogTGF5YS5CeXRlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNvY2tldC5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgY29ubmVjdGlvbiBoYXMgYmVlbiBkaXNjb25uZWN0ZWQuXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICAvL1dFQlBBQ0tfSEVBRF9PRkZTRVRcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy53cml0ZUZsb2F0NjQoTmV0d29ya01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSb2xlSWQoKSlcclxuICAgICAgICAvL1dFQlBBQ0tfTUVTU1NBR0VJRF9PRkZTRVRcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy53cml0ZUludDMyKG1zZ0lkKVxyXG4gICAgICAgIC8vV0VCUEFDS19MRU5HVEhfT0ZGU0VUXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMud3JpdGVJbnQzMih0aGlzLldFQlBBQ0tfSEVBRF9TSVpFICsgYnl0ZS5sZW5ndGgpXHJcbiAgICAgICAgLy9NYXNzZ2UgYm9keVxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLndyaXRlQXJyYXlCdWZmZXIoYnl0ZS5idWZmZXIpXHJcbiAgICAgICAgLy/ov5nph4zmmK/miorlrZfoioLmlbDnu4TnmoTmlbDmja7pgJrov4dzb2NrZXTlj5HpgIHnu5nmnI3liqHlmahcclxuICAgICAgICB0aGlzLnNvY2tldC5zZW5kKHRoaXMuc2VuZEJ5dGVzLmJ1ZmZlcilcclxuICAgICAgICAvL+a4hemZpOaOieaVsOaNru+8jOaWueS+v+S4i+asoeivu+WGmVxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLmNsZWFyKClcclxuICAgICAgICB0aGlzLnRlbXBCeXRlcy5jbGVhcigpXHJcbiAgICB9XHJcblxyXG4gICAgLy/mjqXmlLbliLDmlbDmja5cclxuICAgIHByaXZhdGUgcmVjZWl2ZUhhbmRsZXIobXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiTWVzc2FnZSBmcm9tIHNlcnZlcjogIFwiICsgbmV3IExheWEuQnl0ZShtc2cpLnJlYWRVVEZCeXRlcygpKVxyXG4gICAgICAgIHZhciBuZXRQYWNrZXQ6IE5ldFBhY2tldCA9IG5ldyBOZXRQYWNrZXQodGhpcylcclxuICAgICAgICBuZXRQYWNrZXQucmVjZWl2ZU1zZyhtc2cpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQuaW5wdXQuY2xlYXIoKVxyXG4gICAgICAgIE5ldEV2ZW50RGlzcGF0Y2hlci5nZXRJbnN0YW5jZSgpLmRpc3BhdGNoKG5ldFBhY2tldC5tZXNzYWdlSWQsIG5ldFBhY2tldClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW6j+WIl+WMliBwcm90b2NvbC1idWZmZXJcclxuICAgICAqIEBwYXJhbSBtYXNzYWdlSWQgXHJcbiAgICAgKiBAcGFyYW0gbWFzc2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VyaWFsaXplKG1hc3NhZ2VJZDogbnVtYmVyLCBtYXNzYWdlOiBhbnkpOiBVaW50OEFycmF5IHtcclxuICAgICAgICBsZXQgbWFzc2FnZU5hbWU6IHN0cmluZyA9IHRoaXMucGJNZXNzYWdlTmFtZVttYXNzYWdlSWRdXHJcbiAgICAgICAgLy8gRW5jb2RlIGEgbWVzc2FnZSB0byBhbiBVaW50OEFycmF5IChicm93c2VyKSBvciBCdWZmZXIgKG5vZGUpXHJcbiAgICAgICAgdmFyIGJ1ZmZlcjogYW55ID0gdGhpcy5wcm90b1Jvb3RbbWFzc2FnZU5hbWVdLmVuY29kZShtYXNzYWdlKS5maW5pc2goKTtcclxuICAgICAgICByZXR1cm4gYnVmZmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+N5bqP5YiX5YyWIHByb3RvY29sLWJ1ZmZlclxyXG4gICAgICogQHBhcmFtIG1hc3NhZ2VOYW1lIFxyXG4gICAgICogQHBhcmFtIG5ldFBhY2thZ2UgTmV0UGFja2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVzZXJpYWxpemUobWFzc2FnZUlkOiBudW1iZXIsIG1hc3NhZ2U6IFVpbnQ4QXJyYXkpOiBhbnkge1xyXG4gICAgICAgIGxldCBtYXNzYWdlTmFtZTogc3RyaW5nID0gdGhpcy5wYk1lc3NhZ2VOYW1lW21hc3NhZ2VJZF1cclxuICAgICAgICAvLyBEZWNvZGUgYW4gVWludDhBcnJheSAoYnJvd3Nlcikgb3IgQnVmZmVyIChub2RlKSB0byBhIG1lc3NhZ2VcclxuICAgICAgICB2YXIgbWVzc2FnZTogYW55ID0gdGhpcy5wcm90b1Jvb3RbbWFzc2FnZU5hbWVdLmRlY29kZShtYXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgIH1cclxuXHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cclxuaW1wb3J0IE1haW5VSSBmcm9tIFwiLi9zY3JpcHQvTWFpblVJXCJcclxuaW1wb3J0IFRlc3RfOV9UaW1lTGluZVVJIGZyb20gXCIuL3N0dWR5L1Rlc3RfOV9UaW1lTGluZVVJXCJcclxuLypcclxuKiDmuLjmiI/liJ3lp4vljJbphY3nva47XHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb25maWd7XHJcbiAgICBzdGF0aWMgd2lkdGg6bnVtYmVyPTY0MDtcclxuICAgIHN0YXRpYyBoZWlnaHQ6bnVtYmVyPTExMzY7XHJcbiAgICBzdGF0aWMgc2NhbGVNb2RlOnN0cmluZz1cImZpeGVkd2lkdGhcIjtcclxuICAgIHN0YXRpYyBzY3JlZW5Nb2RlOnN0cmluZz1cInZlcnRpY2FsXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cIm1pZGRsZVwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJjZW50ZXJcIjtcclxuICAgIHN0YXRpYyBzdGFydFNjZW5lOmFueT1cIk1haW4uc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj10cnVlO1xyXG4gICAgc3RhdGljIHN0YXQ6Ym9vbGVhbj10cnVlO1xyXG4gICAgc3RhdGljIHBoeXNpY3NEZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIGV4cG9ydFNjZW5lVG9Kc29uOmJvb2xlYW49dHJ1ZTtcclxuICAgIGNvbnN0cnVjdG9yKCl7fVxyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICB2YXIgcmVnOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuICAgICAgICByZWcoXCJzY3JpcHQvTWFpblVJLnRzXCIsTWFpblVJKTtcclxuICAgICAgICByZWcoXCJzdHVkeS9UZXN0XzlfVGltZUxpbmVVSS50c1wiLFRlc3RfOV9UaW1lTGluZVVJKTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLmluaXQoKTsiLCJpbXBvcnQgeyB1aSB9IGZyb20gXCIuLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IE5ldHdvcmtNYW5hZ2VyIGZyb20gXCIuLi9GcmFtZXdvcmsvTmV0d29yay9OZXR3b3JrTWFuYWdlclwiO1xyXG5pbXBvcnQgTmV0RXZlbnREaXNwYXRjaGVyIGZyb20gXCIuLi9GcmFtZXdvcmsvRXZlbnQvTmV0RXZlbnREaXNwYXRjaGVyXCI7XHJcbmltcG9ydCBOZXRQYWNrZXQgZnJvbSBcIi4uL0ZyYW1ld29yay9OZXR3b3JrL05ldFBhY2tldFwiO1xyXG5pbXBvcnQgR2FtZU1lc3NhZ2VOYW1lIGZyb20gXCIuLi9GcmFtZXdvcmsvTmV0d29yay9OZXRNZXNzYWdlTmFtZVwiO1xyXG5pbXBvcnQgVUlQYXRoIGZyb20gXCIuLi9VSVBhdGhcIjtcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi4vRnJhbWV3b3JrL1VJL1VJTWFuYWdlclwiO1xyXG5cclxuXHJcbi8v5Li755WM6Z2iXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5VSSBleHRlbmRzIHVpLk1haW5VSSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IHN1cGVyKCk7IH1cclxuXHJcbiAgICBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1haW5VSS5vbkVuYWJsZVwiKVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lTWVzc2FnZS5HTV9WRVJTSU9OX1JFVFVSTik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgTmV0RXZlbnREaXNwYXRjaGVyLmdldEluc3RhbmNlKCkucmVnaXN0ZXIoR2FtZU1lc3NhZ2UuR01fVkVSU0lPTl9SRVRVUk4sIHRoaXMsIHRoaXMuR01fVmVyaWZ5VmVyc2lvblJldHVybilcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYWluVUkub25EaXNhYmxlXCIpXHJcbiAgICAgICAgXHJcbiAgICAgICAgTmV0RXZlbnREaXNwYXRjaGVyLmdldEluc3RhbmNlKCkudW5SZWdpc3RlcihHYW1lTWVzc2FnZS5HTV9WRVJTSU9OX1JFVFVSTiwgdGhpcywgdGhpcy5HTV9WZXJpZnlWZXJzaW9uUmV0dXJuKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIEdNX1ZlcmlmeVZlcnNpb25SZXR1cm4obmV0UGFja2FnZTpOZXRQYWNrZXQpOnZvaWR7XHJcbiAgICAgICAgY29uc29sZS5sb2cobmV0UGFja2FnZS5tZXNzYWdlSWQgKyBcIiAgXCIgKyBuZXRQYWNrYWdlLm1lc3NhZ2UpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uQXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgLy9MYXlhLlNjZW5lLm9wZW4oVUlQYXRoLnRlc3RQYXRoLGZhbHNlKTtcclxuICAgICAgICAvL0xheWEuU2NlbmUub3BlbihVSVBhdGgudGVzdFBhdGgxLGZhbHNlKTtcclxuICAgICAgICAvL0xheWEuU2NlbmUub3BlbihVSVBhdGguVUlfTG9hZGluZyxmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0ZXN0TmV0d29yaygpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlByZWNpc2lvbiBzYWZlLlwiICsgKE1hdGgucG93KDIsIDUzKSAtIDEpKTtcclxuXHJcbiAgICAgICAgLy92YXIgbXNnID0ge1xyXG4gICAgICAgIC8vICAgIHZlcnNpb246IFwiMS41LjRcIixcdFx0XHRcdC8v5a6i5oi356uv54mI5pys5Y+3XHJcbiAgICAgICAgLy8gICAgcGxhdGZvcm06IDkwMDcxOTkyNTQ3NDA5OTEsICAgICAgICAgICAgIC8vL+W5s+WPsFxyXG4gICAgICAgIC8vICAgIGlzdGVzdDogMCwvLy8gICAgMOOAgeato+W4uO+8jDHjgIHmtYvor5XvvIzkuI3pnIDopoHpqozor4HniYjmnKxcclxuICAgICAgICAvL31cclxuICAgICAgICAvL3ZhciByb290ID0gTGF5YS5Ccm93c2VyLndpbmRvd1tcIlBCTWVzc2FnZVwiXTtcclxuICAgICAgICAvL3ZhciBwYk1lc3NhZ2VOYW1lID0gR2FtZU1lc3NhZ2VOYW1lLmdldE1hcCgpXHJcbiAgICAgICAgLy92YXIgYnVmZmVyOiBhbnkgPSByb290W3BiTWVzc2FnZU5hbWVbR2FtZU1lc3NhZ2UuR01fVkVSSUZZX1ZFUlNJT05dXS5lbmNvZGUobXNnKS5maW5pc2goKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGJ1ZmZlcik7XHJcbiAgICAgICAgLy9cclxuXHJcbiAgICAgICAgdmFyIGdhbWVDbGllbnQgPSBOZXR3b3JrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUNsaWVudCgwLCBcIndzOi8vMTkyLjE2OC4yLjEyNjo1MDAwMFwiKTtcclxuICAgICAgICBnYW1lQ2xpZW50Lm9uQ29ubmVjdENhbGxiYWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG1zZyA9IHtcclxuICAgICAgICAgICAgICAgIHZlcnNpb246IFwiMS41LjRcIixcdFx0XHRcdC8v5a6i5oi356uv54mI5pys5Y+3XHJcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybTogOTAwNzE5OTI1NDc0MDk5MSwgICAgICAgICAgICAgLy8v5bmz5Y+wXHJcbiAgICAgICAgICAgICAgICBpc3Rlc3Q6IDAsLy8vICAgIDDjgIHmraPluLjvvIwx44CB5rWL6K+V77yM5LiN6ZyA6KaB6aqM6K+B54mI5pysXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgTmV0d29ya01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2dpblNlbmRNZXNzYWdlKEdhbWVNZXNzYWdlLkdNX1ZFUklGWV9WRVJTSU9OLCBtc2cpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0XzEyXzNEVGlsZWRNYXAge1xyXG4gICAgLy9vcHRpbWl6YXRpb24oKTp2b2lke1xyXG4gICAgLy8gICAgLy/lvZNUaWxlZCBNYXBh5LiN5YaN5L2/55So55qE5pe25YCZ77yM6ZyA6KaB5L2/55SoZGVzdHJveSgp5pa55rOV6L+b6KGM6ZSA5q+B77yM5Zue5pS26KKr5Y2g55So55qE5YaF5a2YXHJcbiAgICAvLyAgICB0aGlzLnRNYXAuZGVzdHJveSgpO1xyXG4gICAgLy8gICAgLy/oh6rliqjnvJPlrZjmsqHmnInliqjnlLvnmoTlnLDlnZdcclxuICAgIC8vICAgIHRoaXMudE1hcC5hdXRvQ2FjaGUgPSB0cnVlO1xyXG4gICAgLy8gICAgLy/oh6rliqjnvJPlrZjnmoTnsbvlnoss5Zyw5Zu+6L6D5aSn5pe25bu66K6u5L2/55Sobm9ybWFsXHJcbiAgICAvLyAgICB0aGlzLnRNYXAuYXV0b0NhY2hlVHlwZSA9IFwibm9ybWFsXCI7XHJcbiAgICAvLyAgICAvL+a2iOmZpOe8qeaUvuWvvOiHtOeahOe8nemamSzkuZ/lsLHmmK/ljrvpu5HovrnvvIwxLjcuN+eJiOacrOaWsOWinueahOS8mOWMluWxnuaAp1xyXG4gICAgLy8gICAgdGhpcy50TWFwLmFudGlDcmFjayA9IHRydWU7XHJcbiAgICAvLyAgICAvL+W8gOWQr+WbvuWxguWQiOW5tlxyXG4gICAgLy8gICAgdGhpcy50TWFwLmVuYWJsZU1lcmdlTGF5ZXIgPSB0cnVlO1xyXG4gICAgLy9cclxuICAgIC8vICAgIC8v57yT5a2Y5Yy65Z2X55qE6K6+572u5o6o6I2QXHJcbiAgICAvLyAgICAvL+WmguaenOWNleWbvuaYrzE1KjE177yM57yT5a2Y5Y+v5Yy65Z2X5Y+v5Lul6K6+572u5Li6NTEwKjUxMO+8iDM05YCN77yJ77yM5Lul5q2k57G75o6o77yM5bC96YeP5Zyo5Y6f5Yy65Z2X5pW05pWw5YCN55qE5YmN5o+Q5LiL77yM6K6+572u5ZyoNTEy5bem5Y+z44CC5o6o6I2Q5Li6NTEyKjUxMlxyXG4gICAgLy8gICAgLy/nvJPlrZjljLrlnZfnmoTlhbfkvZPorr7nva7mlrnms5VcclxuICAgIC8vICAgIC8v5Li656ys5LqU5Liq5Y+C5pWwZ3JpZFNpemXliJvlu7rkuIDkuKo1MTIqNTEy5aSn5bCP55qEUG9pbnTlr7nosaHlrp7kvotcclxuICAgIC8vICAgIC8vdmFyIGdyaWRTaXplOkxheWEuUG9pbnQgPSBuZXcgTGF5YS5Qb2ludCg1MTIsIDUxMik7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgLy/np7vpmaTooqvpnZ7pgI/mmI7lnLDlnZfopobnm5bnmoTpg6jliIZcclxuICAgIC8vICAgIC8v5aaC5p6c5ZyoVGlsZWQgTWFw5Lit5rKh5pyJ5a+55Zu+5Z2X6K6+572udHlwZeWxnuaAp++8jOmCo+S5iOWNs+S+v+W8gOWQr+S6hnJlbW92ZUNvdmVyZWRUaWxlIO+8jOS5n+aYr+aXoOaViOeahOOAguaJgOS7pe+8jOW8gOWQr+S5i+WJje+8jOmcgOimgeWFiOWcqFRpbGVkTWFw57yW6L6R5Zmo5Lit77yM5Li65Zu+5Z2X5paw5aKe6Ieq5a6a5LmJ5bGe5oCndHlwZe+8jOW5tuWwhuiuvue9ruS4ujFcclxuICAgIC8vICAgIHRoaXMudE1hcC5yZW1vdmVDb3ZlcmVkVGlsZSA9IHRydWU7XHJcbiAgICAvL31cclxuXHJcbiAgICBwcml2YXRlIHRNYXA6IExheWEuVGlsZWRNYXA7XHJcbiAgICBwcml2YXRlIHNjYWxlVmFsdWU6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIE1hcFg6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIE1hcFk6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIG1MYXN0TW91c2VYOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1MYXN0TW91c2VZOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRlc3RfMTJfVGlsZWRNYXBcIik7XHJcbiAgICAgICAgLy/liJ3lp4vljJboiJ7lj7BcclxuICAgICAgICBMYXlhLmluaXQoTGF5YS5Ccm93c2VyLndpZHRoLCBMYXlhLkJyb3dzZXIuaGVpZ2h0LCBMYXlhLldlYkdMKTtcclxuICAgICAgICAvL+WIm+W7ulRpbGVkTWFw5a6e5L6LXHJcbiAgICAgICAgdGhpcy50TWFwID0gbmV3IExheWEuVGlsZWRNYXAoKTtcclxuICAgICAgICAvL+WIm+W7ulJlY3RhbmdsZeWunuS+i++8jOinhuWPo+WMuuWfn1xyXG4gICAgICAgIHZhciB2aWV3UmVjdDogTGF5YS5SZWN0YW5nbGUgPSBuZXcgTGF5YS5SZWN0YW5nbGUoKTtcclxuICAgICAgICAvL+WIm+W7ulRpbGVkTWFw5Zyw5Zu+77yM5Yqg6L29b3J0aG9nb25hbC5qc29u5ZCO77yM5omn6KGM5Zue6LCD5pa55rOVb25NYXBMb2FkZWQoKVxyXG4gICAgICAgIHRoaXMudE1hcC5jcmVhdGVNYXAoXCJyZXMvVGlsZWRNYXAvYmFja2dyb3VuZC5qc29uXCIsIHZpZXdSZWN0LCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25NYXBMb2FkZWQpKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25NYXBMb2FkZWQoKTogdm9pZCB7XHJcbiAgICAgICAgLy/kuI5VSeaQremFjeeahDNE5Zy65pmvXHJcbiAgICAgICAgdGhpcy5hZGRVSVNjZW5lKCk7XHJcblxyXG4gICAgICAgIC8v6K6+572u57yp5pS+5Lit5b+D54K55Li66KeG5Y+j55qE5bem5LiK6KeSXHJcbiAgICAgICAgdGhpcy50TWFwLnNldFZpZXdQb3J0UGl2b3RCeVNjYWxlKDAsIDApO1xyXG4gICAgICAgIC8v5bCG5Y6f5Zyw5Zu+5pS+5aSnM+WAjVxyXG4gICAgICAgIC8vdGhpcy50TWFwLnNjYWxlID0gMztcclxuXHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50LlJFU0laRSwgdGhpcywgdGhpcy5yZXNpemUpO1xyXG4gICAgICAgIC8vTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sIHRoaXMsIHRoaXMubW91c2VEb3duKTtcclxuICAgICAgICAvL0xheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5NT1VTRV9VUCwgdGhpcywgdGhpcy5tb3VzZVVwKTtcclxuICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuS0VZX0RPV04sIHRoaXMsIHRoaXMub25LZXlEb3duKVxyXG4gICAgICAgIHRoaXMucmVzaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kuI5VSeaQremFjeeahDNE5Zy65pmvXHJcbiAgICBhZGRVSVNjZW5lKCk6dm9pZHtcclxuICAgICAgICAvL+mHjeiuvue9ruWxguasoVxyXG4gICAgICAgIC8vdmFyIHNwcml0ZSA9IHRoaXMudE1hcC5tYXBTcHJpdGUoKVxyXG4gICAgICAgIC8vTGF5YS5zdGFnZS5zZXRDaGlsZEluZGV4KHNwcml0ZSwgMClcclxuXHJcbiAgICAgICAgdmFyIHNjZW5lM0Q6TGF5YS5TY2VuZTNEID0gbmV3IExheWEuU2NlbmUzRCgpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQoc2NlbmUzRClcclxuXHJcbiAgICAgICAgdmFyIGNhbWVyYTogTGF5YS5DYW1lcmEgPSBuZXcgTGF5YS5DYW1lcmEoMCwgMC4xLCAxMDApO1xyXG4gICAgICAgIHNjZW5lM0QuYWRkQ2hpbGQoY2FtZXJhKTtcclxuICAgICAgICBjYW1lcmEudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsIDUsIDEwKSk7XHJcbiAgICAgICAgY2FtZXJhLnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMygtMjAsIDAsIDApLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgLy/mraPkuqTmipXlvbHlsZ7mgKforr7nva5cclxuICAgICAgICBjYW1lcmEub3J0aG9ncmFwaGljID0gdHJ1ZTtcclxuICAgICAgICAvL+ato+S6pOWeguebtOefqemYtei3neemu++8jOaOp+WItjNE54mp5L2T6L+c6L+R5LiO546w5a6e5aSn5bCPXHJcbiAgICAgICAgY2FtZXJhLm9ydGhvZ3JhcGhpY1ZlcnRpY2FsU2l6ZSA9IDc7XHJcbiAgICAgICAgLy/muIXpmaTmoIforrDvvIzku4Xmt7HluqZcclxuICAgICAgICBjYW1lcmEuY2xlYXJGbGFnID0gTGF5YS5CYXNlQ2FtZXJhLkNMRUFSRkxBR19ERVBUSE9OTFk7XHJcbiAgICAgICAgY2FtZXJhLmNsZWFyQ29sb3IgPSBudWxsO1xyXG4gICAgICAgIGNhbWVyYS5jdWxsaW5nTWFzayA9IE1hdGgucG93KDIsIDApIHwgTWF0aC5wb3coMiwgMSlcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGNhbWVyYS5jdWxsaW5nTWFzayk7XHJcblxyXG4gICAgICAgIExheWEuU3ByaXRlM0QubG9hZChcInJlcy9hbmltYXRpb24vcGxheWVyL21hZ2UvbWFnZS5saFwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25Mb2FkQ29tcGxldGVkLCBbc2NlbmUzRF0pKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWRDb21wbGV0ZWQoc2NlbmUzRDogTGF5YS5TY2VuZTNELCBzcHJpdGUzRDogTGF5YS5TcHJpdGUzRCk6IHZvaWQge1xyXG4gICAgICAgIHNjZW5lM0QuYWRkQ2hpbGQoc3ByaXRlM0QpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZSu55uY5o6n5Yi2XHJcbiAgICAgKiBAcGFyYW0gZSBcclxuICAgICAqL1xyXG4gICAgb25LZXlEb3duKGU6IExheWEuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZS5rZXlDb2RlID09IExheWEuS2V5Ym9hcmQuVVApIHtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT0gTGF5YS5LZXlib2FyZC5ET1dOKSB7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09IExheWEuS2V5Ym9hcmQuTEVGVCkge1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PSBMYXlhLktleWJvYXJkLlJJR0hUKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+WKqOWcsOWbvuinhuWPo1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1vdXNlTW92ZSgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgbW92ZVg6IG51bWJlciA9IHRoaXMuTWFwWCAtIChMYXlhLnN0YWdlLm1vdXNlWCAtIHRoaXMubUxhc3RNb3VzZVgpO1xyXG4gICAgICAgIHZhciBtb3ZlWTogbnVtYmVyID0gdGhpcy5NYXBZIC0gKExheWEuc3RhZ2UubW91c2VZIC0gdGhpcy5tTGFzdE1vdXNlWSlcclxuICAgICAgICAvL+enu+WKqOWcsOWbvuinhuWPo1xyXG4gICAgICAgIHRoaXMudE1hcC5tb3ZlVmlld1BvcnQobW92ZVgsIG1vdmVZKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbW91c2VVcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLk1hcFggPSB0aGlzLk1hcFggLSAoTGF5YS5zdGFnZS5tb3VzZVggLSB0aGlzLm1MYXN0TW91c2VYKTtcclxuICAgICAgICB0aGlzLk1hcFkgPSB0aGlzLk1hcFkgLSAoTGF5YS5zdGFnZS5tb3VzZVkgLSB0aGlzLm1MYXN0TW91c2VZKTtcclxuICAgICAgICBMYXlhLnN0YWdlLm9mZihMYXlhLkV2ZW50Lk1PVVNFX01PVkUsIHRoaXMsIHRoaXMubW91c2VNb3ZlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbW91c2VEb3duKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubUxhc3RNb3VzZVggPSBMYXlhLnN0YWdlLm1vdXNlWDtcclxuICAgICAgICB0aGlzLm1MYXN0TW91c2VZID0gTGF5YS5zdGFnZS5tb3VzZVk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50Lk1PVVNFX01PVkUsIHRoaXMsIHRoaXMubW91c2VNb3ZlKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogIOaUueWPmOinhuWPo+Wkp+Wwj1xyXG4gICAgICogIOmHjeiuvuWcsOWbvuinhuWPo+WMuuWfn1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlc2l6ZSgpOiB2b2lkIHtcclxuICAgICAgICAvL+aUueWPmOinhuWPo+Wkp+Wwj1xyXG4gICAgICAgIHRoaXMudE1hcC5jaGFuZ2VWaWV3UG9ydCh0aGlzLk1hcFgsIHRoaXMuTWFwWSwgTGF5YS5Ccm93c2VyLndpZHRoLCBMYXlhLkJyb3dzZXIuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcblxyXG59IiwiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdF85X1RpbWVMaW5lVUlcclxue1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy/liqDovb3lm77pm4bmiJDlip/lkI7vvIzmiafooYxvbkxvYWTlm57osIPmlrnms5VcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKFwicmVzL2F0bGFzL3Rlc3QuYXRsYXNcIixMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbkxvYWRlZCkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIG9uTG9hZGVkKCk6dm9pZHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWKoOi9veWbvumbhuaIkOWKn+WQju+8jOaJp+ihjG9uTG9hZOWbnuiwg+aWueazlVwiKVxyXG4gICAgICAgIC8v5Yib5bu65LiA5LiqVUnlrp7kvotcclxuICAgICAgICAvL3ZhciBwbGFuOlRpbWVMaW5lVUkgPSBuZXcgVGltZUxpbmVVSSgpXHJcbiAgICAgICAgLy/mt7vliqDliLDoiJ7lj7BcclxuICAgICAgICAvL0xheWEuc3RhZ2UuYWRkQ2hpbGQocGxhbik7XHJcbiAgICAgICAgLy/mkq3mlL5VSeWcuuaZr+S4reeahOWKqOeUu1xyXG4gICAgICAgIC8vdGhpcy5iZWFyLnBsYXkoKTtcclxuICAgIH1cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xuaW1wb3J0IFZpZXc9TGF5YS5WaWV3O1xyXG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xyXG5pbXBvcnQgU2NlbmU9TGF5YS5TY2VuZTtcbnZhciBSRUc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xuZXhwb3J0IG1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgTWFpblVJIGV4dGVuZHMgVmlldyB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIk1haW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuTWFpblVJXCIsTWFpblVJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBUZXN0VUkgZXh0ZW5kcyBWaWV3IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiVGVzdFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5UZXN0VUlcIixUZXN0VUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIFRlc3QxVUkgZXh0ZW5kcyBWaWV3IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiVGVzdDFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuVGVzdDFVSVwiLFRlc3QxVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbWVMaW5lVUkgZXh0ZW5kcyBEaWFsb2cge1xyXG5cdFx0cHVibGljIGJlYXI6TGF5YS5BbmltYXRpb247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJUaW1lTGluZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5UaW1lTGluZVVJXCIsVGltZUxpbmVVSSk7XHJcbn1cclxuZXhwb3J0IG1vZHVsZSB1aS5VSV9Mb2FkaW5nIHtcclxuICAgIGV4cG9ydCBjbGFzcyBVSV9Mb2FkaW5nVUkgZXh0ZW5kcyBWaWV3IHtcclxuXHRcdHB1YmxpYyBhbmkxOkxheWEuRnJhbWVBbmltYXRpb247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJVSV9Mb2FkaW5nL1VJX0xvYWRpbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuVUlfTG9hZGluZy5VSV9Mb2FkaW5nVUlcIixVSV9Mb2FkaW5nVUkpO1xyXG59XHIiXX0=
