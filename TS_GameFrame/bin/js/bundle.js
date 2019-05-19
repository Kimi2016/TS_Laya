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
var Test_9_SkinAnimation_New_1 = require("./study3D/Test_9_SkinAnimation_New");
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
        new Test_12_TiledMap_1.default();
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
        new Test_9_SkinAnimation_New_1.default();
    };
    return AppMain;
}());
//激活启动类
new AppMain();
},{"./GameConfig":7,"./study/Test_12_TiledMap":10,"./study3D/Test_9_SkinAnimation_New":9}],2:[function(require,module,exports){
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
},{"./script/MainUI":8,"./study/Test_9_TimeLineUI":11}],8:[function(require,module,exports){
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
},{"../Framework/Event/NetEventDispatcher":2,"../Framework/Network/NetworkManager":5,"../ui/layaMaxUI":12}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Test_9_SkinAnimation_New = /** @class */ (function () {
    function Test_9_SkinAnimation_New() {
        this.curStateIndex = 0;
        this.clipName = ["attack", "idle", "run"];
        var scene = new Laya.Scene3D();
        Laya.stage.addChild(scene);
        var camera = (scene.addChild(new Laya.Camera(0, 0.1, 1000)));
        camera.transform.translate(new Laya.Vector3(0, 1.5, 4));
        camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
        //camera.addComponent(CameraMoveScript);
        var directionLight = scene.addChild(new Laya.DirectionLight());
        directionLight.color = new Laya.Vector3(1, 1, 1);
        //var plane: Laya.Sprite3D = scene.addChild(Laya.Sprite3D.load("../../res/threeDimen/skinModel/Zombie/new/Plane.lh")) as Laya.Sprite3D;
        Laya.Sprite3D.load("./res/animation/player/mage/mage.lh", Laya.Handler.create(this, this.onLoadCompleted, [scene]));
    }
    Test_9_SkinAnimation_New.prototype.onLoadCompleted = function (scene, sprite3D) {
        scene.addChild(sprite3D);
        //获取Animator动画组件
        this.roleAnimator = sprite3D.getChildAt(0).getComponent(Laya.Animator);
        this.loadUI();
    };
    Test_9_SkinAnimation_New.prototype.loadUI = function () {
        Laya.loader.load("./res/threeDimen/ui/button.png", Laya.Handler.create(this, this.createButton));
    };
    Test_9_SkinAnimation_New.prototype.createButton = function () {
        this.changeActionButton = new Laya.Button("./res/threeDimen/ui/button.png", "切换动作");
        Laya.stage.addChild(this.changeActionButton);
        this.changeActionButton.size(160, 40);
        this.changeActionButton.labelBold = true;
        this.changeActionButton.labelSize = 30;
        this.changeActionButton.sizeGrid = "4,4,4,4";
        this.changeActionButton.scale(Laya.Browser.pixelRatio, Laya.Browser.pixelRatio);
        this.changeActionButton.pos(Laya.stage.width / 2 - this.changeActionButton.width * Laya.Browser.pixelRatio / 2, Laya.stage.height - 100 * Laya.Browser.pixelRatio);
        this.changeActionButton.on(Laya.Event.CLICK, this, this.playerAnimation);
    };
    Test_9_SkinAnimation_New.prototype.playerAnimation = function () {
        //根据名称播放动画
        var index = ++this.curStateIndex % this.clipName.length;
        var playerName = this.clipName[index];
        console.log(playerName);
        this.roleAnimator.play(playerName);
    };
    return Test_9_SkinAnimation_New;
}());
exports.default = Test_9_SkinAnimation_New;
},{}],10:[function(require,module,exports){
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
        var sprite = this.tMap.mapSprite();
        console.log("this.tMap.mapSprite:" + (sprite instanceof Laya.Sprite));
        console.log("this.tMap.mapSprite.parent:" + (sprite.parent instanceof Laya.Sprite));
        Laya.stage.setChildIndex(sprite, 0);
        console.log("onMapLoaded");
        //设置缩放中心点为视口的左上角
        this.tMap.setViewPortPivotByScale(0, 0);
        //将原地图放大3倍
        this.tMap.scale = 3;
        Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
        //Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        //Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
        this.resize();
    };
    /**
     * 键盘控制
     * @param e
     */
    Test_12_TiledMap.prototype.onKeyDown = function (e) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkc6L0xheWFQcm9qZWN0L0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQXBwTWFpbi50cyIsInNyYy9GcmFtZXdvcmsvRXZlbnQvTmV0RXZlbnREaXNwYXRjaGVyLnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL05ldE1lc3NhZ2VOYW1lLnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL05ldFBhY2tldC50cyIsInNyYy9GcmFtZXdvcmsvTmV0d29yay9OZXR3b3JrTWFuYWdlci50cyIsInNyYy9GcmFtZXdvcmsvTmV0d29yay9Tb2NrZXRDb25uZWN0LnRzIiwic3JjL0dhbWVDb25maWcudHMiLCJzcmMvc2NyaXB0L01haW5VSS50cyIsInNyYy9zdHVkeTNEL1Rlc3RfOV9Ta2luQW5pbWF0aW9uX05ldy50cyIsInNyYy9zdHVkeS9UZXN0XzEyX1RpbGVkTWFwLnRzIiwic3JjL3N0dWR5L1Rlc3RfOV9UaW1lTGluZVVJLnRzIiwic3JjL3VpL2xheWFNYXhVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNWQSxJQUFPLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQzdCLElBQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7QUFDekIsSUFBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtBQWtCekIsMkNBQXNDO0FBS3RDLDZEQUF3RDtBQWN4RCwrRUFBMEU7QUFFMUUsS0FBSztBQUNMO0lBQ0k7UUFDSSxnQkFBZ0I7UUFDaEIsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBVSxDQUFDLEtBQUssRUFBRSxvQkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3BEO2FBQ0k7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dUJBQVksZUFPeEIsQ0FBQTtRQUNELEdBQUcsQ0FBQyw0QkFBNEIsRUFBQyxZQUFZLENBQUMsQ0FBQztJQUNuRCxDQUFDLEVBVmdCLFVBQVUsR0FBVixhQUFVLEtBQVYsYUFBVSxRQVUxQjtBQUFELENBQUMsRUFWYSxFQUFFLEdBQUYsVUFBRSxLQUFGLFVBQUUsUUFVZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgQnJvd3NlciA9IExheWEuQnJvd3NlclxyXG5pbXBvcnQgV2ViR0wgPSBMYXlhLldlYkdMXHJcbmltcG9ydCBTdGFnZSA9IExheWEuU3RhZ2VcclxuXHJcbmltcG9ydCBUZXN0XzFfVGV4dCBmcm9tICcuL3N0dWR5L1Rlc3RfMV9UZXh0JztcclxuaW1wb3J0IFRlc3RfMl9JbnB1dFRlc3QgZnJvbSAnLi9zdHVkeS9UZXN0XzJfSW5wdXRUZXN0JztcclxuaW1wb3J0IFRlc3RfM19CaXRtYXBGb250IGZyb20gJy4vc3R1ZHkvVGVzdF8zX0JpdG1hcEZvbnQnO1xyXG5pbXBvcnQgVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8xX1Nwcml0ZV9EaXNwbGF5SW1hZ2UnO1xyXG5pbXBvcnQgVGVzdF80XzFfU3ByaXRlX1N3aXRjaFRleHR1cmUgZnJvbSAnLi9zdHVkeS9UZXN0XzRfMV9TcHJpdGVfU3dpdGNoVGV4dHVyZSc7XHJcbmltcG9ydCBUZXN0XzRfMl9TcHJpdGVfRGlzcGxheUltYWdlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzJfU3ByaXRlX0Rpc3BsYXlJbWFnZSc7XHJcbmltcG9ydCBUZXN0XzRfMl9TcHJpdGVfU3dpdGNoVGV4dHVyZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlJztcclxuaW1wb3J0IFRlc3RfNF9NYXNrRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfNF9NYXNrRGVtbyc7XHJcbmltcG9ydCBUZXN0XzVfMV9Db2xvckZpbHRlciBmcm9tICcuL3N0dWR5L1Rlc3RfNV8xX0NvbG9yRmlsdGVyJztcclxuaW1wb3J0IFRlc3RfNV8yX0dsb3dGaWx0ZXIgZnJvbSAnLi9zdHVkeS9UZXN0XzVfMl9HbG93RmlsdGVyJztcclxuaW1wb3J0IFRlc3RfNl8xX1Nwcml0ZV9EcmF3U2hhcGVzIGZyb20gJy4vc3R1ZHkvVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMnO1xyXG5pbXBvcnQgVGVzdF83X0F0bGFzQW5pRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfN19BdGxhc0FuaURlbW8nO1xyXG5pbXBvcnQgVGVzdF84X1R3ZWVuRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfOF9Ud2VlbkRlbW8nO1xyXG5pbXBvcnQgVGVzdF85X1RpbWVMaW5lIGZyb20gJy4vc3R1ZHkvVGVzdF85X1RpbWVMaW5lJztcclxuaW1wb3J0IFRlc3RfOV9UaW1lTGluZVVJIGZyb20gJy4vc3R1ZHkvVGVzdF85X1RpbWVMaW5lVUknO1xyXG5pbXBvcnQgVGVzdF8xMV9Tb3VuZCBmcm9tICcuL3N0dWR5L1Rlc3RfMTFfU291bmQnO1xyXG5pbXBvcnQgR2FtZUNvbmZpZyBmcm9tICcuL0dhbWVDb25maWcnO1xyXG5pbXBvcnQgVGVzdF8wXzFfQ2hhbm5lbCBmcm9tICcuL3N0dWR5L1Rlc3RfMF8xX0NoYW5uZWwnO1xyXG5pbXBvcnQgVGVzdF8wXzFfU29ja2V0IGZyb20gJy4vc3R1ZHkvVGVzdF8wXzFfU29ja2V0JztcclxuaW1wb3J0IFRlc3RfMF9OZXR3b3JrX1Byb3RvY29sQnVmZmVyIGZyb20gJy4vc3R1ZHkvVGVzdF8wX05ldHdvcmtfUHJvdG9jb2xCdWZmZXInO1xyXG5pbXBvcnQgTmV0d29ya01hbmFnZXIgZnJvbSAnLi9GcmFtZXdvcmsvTmV0d29yay9OZXR3b3JrTWFuYWdlcic7XHJcbmltcG9ydCBUZXN0XzEyX1RpbGVkTWFwIGZyb20gJy4vc3R1ZHkvVGVzdF8xMl9UaWxlZE1hcCc7XHJcbmltcG9ydCBUZXN0XzEzX0RvbUVsZW1lbnQgZnJvbSAnLi9zdHVkeS9UZXN0XzEzX0RvbUVsZW1lbnQnO1xyXG5pbXBvcnQgVGVzdF8xNF9TaGFkZXIgZnJvbSAnLi9zdHVkeS9UZXN0XzE0X1NoYWRlcic7XHJcbmltcG9ydCBUZXN0XzIwX0xheWFBaXIzRCBmcm9tICcuL3N0dWR5L1Rlc3RfMjBfTGF5YUFpcjNEJztcclxuaW1wb3J0IFRlc3RfMjJfTGF5YUFpcjNEX0FuaW1hdGlvbiBmcm9tICcuL3N0dWR5L1Rlc3RfMjJfTGF5YUFpcjNEX0FuaW1hdGlvbic7XHJcbmltcG9ydCBUZXN0XzI0X1BhdGhmaW5kaW5nIGZyb20gJy4vc3R1ZHkvVGVzdF8yNF9QYXRoZmluZGluZyc7XHJcbmltcG9ydCBUZXN0XzFfT3J0aG9ncmFwaGljQ2FtZXJhIGZyb20gJy4vc3R1ZHkzRC9UZXN0XzFfT3J0aG9ncmFwaGljQ2FtZXJhJztcclxuaW1wb3J0IFRlc3RfMl9TcHJpdGUzRFRyYW5zZm9ybSBmcm9tICcuL3N0dWR5M0QvVGVzdF8yX1Nwcml0ZTNEVHJhbnNmb3JtJztcclxuaW1wb3J0IFRlc3RfM19NZXNoTG9hZCBmcm9tICcuL3N0dWR5M0QvVGVzdF8zX01lc2hMb2FkJztcclxuaW1wb3J0IFRlc3RfNF9DdXN0b21NZXNoIGZyb20gJy4vc3R1ZHkzRC9UZXN0XzRfQ3VzdG9tTWVzaCc7XHJcbmltcG9ydCBUZXN0XzVfTGlnaHREZW1vIGZyb20gJy4vc3R1ZHkzRC9UZXN0XzVfTGlnaHREZW1vJztcclxuaW1wb3J0IFRlc3RfNl9NdWx0aUNhbWVyYSBmcm9tICcuL3N0dWR5M0QvVGVzdF82X011bHRpQ2FtZXJhJztcclxuaW1wb3J0IFRlc3RfN19PcnRob2dyYXBoaWNDYW1lcmEgZnJvbSAnLi9zdHVkeTNEL1Rlc3RfN19PcnRob2dyYXBoaWNDYW1lcmEnO1xyXG5pbXBvcnQgVGVzdF84X0QzU3BhY2VUb0QyU3BhY2UgZnJvbSAnLi9zdHVkeTNEL1Rlc3RfOF9EM1NwYWNlVG9EMlNwYWNlJztcclxuaW1wb3J0IFRlc3RfOV9Ta2luQW5pbWF0aW9uX05ldyBmcm9tICcuL3N0dWR5M0QvVGVzdF85X1NraW5BbmltYXRpb25fTmV3JztcclxuXHJcbi8v5ZCv5Yqo57G7XHJcbmNsYXNzIEFwcE1haW4ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy/moLnmja5JREXorr7nva7liJ3lp4vljJblvJXmk45cdFx0XHJcbiAgICAgICAgaWYgKHdpbmRvd1tcIkxheWEzRFwiXSkge1xyXG4gICAgICAgICAgICBMYXlhM0QuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDkuI3mlK/mjIFXZWJHTOaXtuiHquWKqOWIh+aNouiHs0NhbnZhc1xyXG4gICAgICAgICAgICBMYXlhLmluaXQoQnJvd3Nlci5jbGllbnRXaWR0aCwgQnJvd3Nlci5jbGllbnRIZWlnaHQsIFdlYkdMKTtcclxuICAgICAgICAgICAgLy9MYXlhLmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQsIExheWFbXCJXZWJHTFwiXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExheWFbXCJQaHlzaWNzXCJdICYmIExheWFbXCJQaHlzaWNzXCJdLmVuYWJsZSgpO1xyXG4gICAgICAgIExheWFbXCJEZWJ1Z1BhbmVsXCJdICYmIExheWFbXCJEZWJ1Z1BhbmVsXCJdLmVuYWJsZSgpO1xyXG5cclxuXHJcbiAgICAgICAgLy/miZPlvIDosIPor5XpnaLmnb/vvIjpgJrov4dJREXorr7nva7osIPor5XmqKHlvI/vvIzmiJbogIV1cmzlnLDlnYDlop7liqBkZWJ1Zz10cnVl5Y+C5pWw77yM5Z2H5Y+v5omT5byA6LCD6K+V6Z2i5p2/77yJXHJcbiAgICAgICAgaWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuICAgICAgICBpZiAoR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgJiYgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0pIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdLmVuYWJsZSgpO1xyXG4gICAgICAgIGlmIChHYW1lQ29uZmlnLnN0YXQpIExheWEuU3RhdC5zaG93KCk7XHJcblxyXG4gICAgICAgIC8v6KGo56S65piv5ZCm5o2V6I635YWo5bGA6ZSZ6K+v5bm25by55Ye65o+Q56S644CCXHJcbiAgICAgICAgTGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy/mv4DmtLvotYTmupDniYjmnKzmjqfliLbvvIx2ZXJzaW9uLmpzb27nlLFJREXlj5HluIPlip/og73oh6rliqjnlJ/miJDvvIzlpoLmnpzmsqHmnInkuZ/kuI3lvbHlk43lkI7nu63mtYHnqItcclxuICAgICAgICBMYXlhLlJlc291cmNlVmVyc2lvbi5lbmFibGUoXCJ2ZXJzaW9uLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uVmVyc2lvbkxvYWRlZCksIExheWEuUmVzb3VyY2VWZXJzaW9uLkZJTEVOQU1FX1ZFUlNJT04pO1xyXG5cclxuXHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnblYgPSBTdGFnZS5BTElHTl9NSURETEU7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnbkggPSBTdGFnZS5BTElHTl9DRU5URVI7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBHYW1lQ29uZmlnLnNjYWxlTW9kZTsvL1N0YWdlLlNDQUxFX0ZVTEw7Ly9TQ0FMRV9GSVhFRF9IRUlHSFRcclxuICAgICAgICBMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBHYW1lQ29uZmlnLnNjcmVlbk1vZGU7Ly9TdGFnZS5TQ1JFRU5fSE9SSVpPTlRBTDsvL1NDUkVFTl9WRVJUSUNBTFxyXG4gICAgICAgIExheWEuc3RhZ2UuYmdDb2xvciA9IFwiIzdmN2Y3ZlwiO1xyXG5cclxuICAgICAgICAvL+WFvOWuueW+ruS/oeS4jeaUr+aMgeWKoOi9vXNjZW5l5ZCO57yA5Zy65pmvXHJcbiAgICAgICAgTGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuICAgICAgICAvL+WmguaenOmAmui/h+iuvuWkh+mdmemfs+mUruiuqemfs+mikeiHquWKqOi3n+maj+iuvuWkh+mdmemfs+OAgumcgOimgeWwhnVzZUF1ZGlvTXVzaWPorr7nva7kuLpmYWxzZeOAglxyXG4gICAgICAgIExheWEuU291bmRNYW5hZ2VyLnVzZUF1ZGlvTXVzaWMgPSBmYWxzZTtcclxuICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5hdXRvU3RvcE11c2ljID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8v5raI6Zmk55+i6YeP57uY5Yi255qE6ZSv6b2/77yM5L2G5Lya5aKe5Yqg5oCn6IO95raI6ICXXHJcbiAgICAgICAgLy9Db25maWcuaXNBbnRpYWxpYXM9dHJ1ZTtcclxuXHJcbiAgICAgICAgLy/plIDmr4HlvZPliY3msqHmnInooqvkvb/nlKjnmoTotYTmupAs6K+l5Ye95pWw5Lya5b+955WlbG9jaz10cnVl55qE6LWE5rqQ44CCXHJcbiAgICAgICAgLy9MYXlhLlJlc291cmNlLmRlc3Ryb3lVbnVzZWRSZXNvdXJjZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblZlcnNpb25Mb2FkZWQoKTogdm9pZCB7XHJcbiAgICAgICAgLy/mv4DmtLvlpKflsI/lm77mmKDlsITvvIzliqDovb3lsI/lm77nmoTml7blgJnvvIzlpoLmnpzlj5HnjrDlsI/lm77lnKjlpKflm77lkIjpm4bph4zpnaLvvIzliJnkvJjlhYjliqDovb3lpKflm77lkIjpm4bvvIzogIzkuI3mmK/lsI/lm75cclxuICAgICAgICBMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29uZmlnTG9hZGVkKCk6IHZvaWQge1xyXG5cclxuICAgICAgICB0aGlzLnNldHVwM0QoKTtcclxuICAgICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICAgICAgLy/liqDovb1JREXmjIflrprnmoTlnLrmma9cclxuICAgICAgICAvL0dhbWVDb25maWcuc3RhcnRTY2VuZSAmJiBMYXlhLlNjZW5lLm9wZW4oR2FtZUNvbmZpZy5zdGFydFNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldHVwKCk6IHZvaWQge1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMV9UZXh0KCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8yX0lucHV0VGVzdCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfM19CaXRtYXBGb250KCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8xX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80XzJfU3ByaXRlX0Rpc3BsYXlJbWFnZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80X01hc2tEZW1vKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF81XzFfQ29sb3JGaWx0ZXIoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzVfMl9HbG93RmlsdGVyKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzdfQXRsYXNBbmlEZW1vKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF84X1R3ZWVuRGVtbygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfOV9UaW1lTGluZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfOV9UaW1lTGluZVVJKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8xMV9Tb3VuZCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMF8xX1NvY2tldCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMF9OZXR3b3JrX1Byb3RvY29sQnVmZmVyKCk7XHJcbiAgICAgICAgbmV3IFRlc3RfMTJfVGlsZWRNYXAoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzEzX0RvbUVsZW1lbnQoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzE0X1NoYWRlcigpO1xyXG5cclxuICAgICAgICAvL25ldyBUZXN0XzIwX0xheWFBaXIzRCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMjJfTGF5YUFpcjNEX0FuaW1hdGlvbigpO1xyXG5cclxuICAgICAgICAvL25ldyBUZXN0XzI0X1BhdGhmaW5kaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXR1cDNEKCk6IHZvaWQge1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMV9PcnRob2dyYXBoaWNDYW1lcmEoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzJfU3ByaXRlM0RUcmFuc2Zvcm0oKTtcclxuICAgICAgICAvL25ldyBUZXN0XzNfTWVzaExvYWQoKTtcclxuICAgICAgICAvL25ldyAgVGVzdF80X0N1c3RvbU1lc2goKTtcclxuICAgICAgICAvL25ldyAgVGVzdF81X0xpZ2h0RGVtbygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNl9NdWx0aUNhbWVyYSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfN19PcnRob2dyYXBoaWNDYW1lcmEoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzhfRDNTcGFjZVRvRDJTcGFjZSgpO1xyXG4gICAgICAgIG5ldyBUZXN0XzlfU2tpbkFuaW1hdGlvbl9OZXcoKTtcclxuICAgIH1cclxufVxyXG5cclxuLy/mv4DmtLvlkK/liqjnsbtcclxubmV3IEFwcE1haW4oKTsiLCJjbGFzcyBPYnNlcnZlciB7XHJcbiAgICAvKiog5LiK5LiL5paHICovXHJcbiAgICBwcml2YXRlIGNvbnRleHQ6IGFueSA9IG51bGw7XHJcbiAgICAvKiog5Zue6LCD5Ye95pWwICovXHJcbiAgICBwcml2YXRlIGNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29udGV4dDogYW55LCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmHjee9rlxyXG4gICAgICogQHBhcmFtIGNvbnRleHQg5LiK5LiL5paHXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg5Zue6LCD5Ye95pWwXHJcbiAgICAgKi9cclxuICAgIHJlc2V0KGNvbnRleHQ6IGFueSA9IG51bGwsIGNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkemAgemAmuefpVxyXG4gICAgICogQHBhcmFtIGFyZ3Mg5LiN5a6a5Y+C5pWwXHJcbiAgICAgKi9cclxuICAgIG5vdGlmeSguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2suY2FsbCh0aGlzLmNvbnRleHQsIC4uLmFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5LiL5paH5q+U6L6DXHJcbiAgICAgKiBAcGFyYW0gY29udGV4dCDkuIrkuIvmlodcclxuICAgICAqL1xyXG4gICAgY29tcGFyKGNvbnRleHQ6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBjb250ZXh0ID09IHRoaXMuY29udGV4dDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ldEV2ZW50RGlzcGF0Y2hlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogTmV0RXZlbnREaXNwYXRjaGVyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBOZXRFdmVudERpc3BhdGNoZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlIHx8ICh0aGlzLmluc3RhbmNlID0gbmV3IHRoaXMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOebkeWQrOaVsOe7hCAqL1xyXG4gICAgcHJpdmF0ZSBsaXN0ZW5lcnM6IHsgW2luZGV4OiBudW1iZXJdOiBBcnJheTxPYnNlcnZlcj4gfSA9IHt9XHJcbiAgICAvKiog56e76Zmk5pWw57uEICovXHJcbiAgICBwcml2YXRlIHJlbW92ZUxpc3RlbmVyczogQXJyYXk8T2JzZXJ2ZXI+ID0gW11cclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyKG1lc3NhZ2VJRDogbnVtYmVyLCBjb250ZXh0OiBhbnksIGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBvYnNlcnZlcnM6IE9ic2VydmVyW10gPSB0aGlzLmxpc3RlbmVyc1ttZXNzYWdlSURdO1xyXG4gICAgICAgIGlmICghb2JzZXJ2ZXJzKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21lc3NhZ2VJRF0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucmVtb3ZlTGlzdGVuZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IG9ic2VydmVyID0gdGhpcy5yZW1vdmVMaXN0ZW5lcnMucG9wKCk7XHJcbiAgICAgICAgICAgIG9ic2VydmVyLnJlc2V0KGNvbnRleHQsIGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbWVzc2FnZUlEXS5wdXNoKG9ic2VydmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21lc3NhZ2VJRF0ucHVzaChuZXcgT2JzZXJ2ZXIoY29udGV4dCwgY2FsbGJhY2spKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdW5SZWdpc3RlcihtZXNzYWdlSUQ6IG51bWJlciwgY29udGV4dDogYW55LCBjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgb2JzZXJ2ZXJzOiBPYnNlcnZlcltdID0gdGhpcy5saXN0ZW5lcnNbbWVzc2FnZUlEXTtcclxuICAgICAgICBpZiAoIW9ic2VydmVycykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBvYnNlcnZlcnMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG9ic2VydmVyID0gb2JzZXJ2ZXJzW2ldO1xyXG4gICAgICAgICAgICBpZiAob2JzZXJ2ZXIuY29tcGFyKGNvbnRleHQpKSB7XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzLnB1c2gob2JzZXJ2ZXIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9ic2VydmVycy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5saXN0ZW5lcnNbbWVzc2FnZUlEXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGlzcGF0Y2gobWVzc2FnZUlEOiBudW1iZXIsIC4uLmFyZ3MpOiB2b2lkIHtcclxuICAgICAgICBsZXQgb2JzZXJ2ZXJzOiBPYnNlcnZlcltdID0gdGhpcy5saXN0ZW5lcnNbbWVzc2FnZUlEXTtcclxuICAgICAgICBpZiAoIW9ic2VydmVycykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBvYnNlcnZlcnMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG9ic2VydmVyID0gb2JzZXJ2ZXJzW2ldO1xyXG4gICAgICAgICAgICBvYnNlcnZlci5ub3RpZnkobWVzc2FnZUlELCAuLi5hcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgQ2xlYXJBbGwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fVxyXG4gICAgfVxyXG59IiwiXHJcbi8qKlxyXG4gKiBQcm90b2J1ZiDmtojmga/lkI3np7DljLnphY1cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ldE1lc3NhZ2VOYW1lIHtcclxuICAgIHN0YXRpYyBtZXNzYWdlTWFwID0ge31cclxuICAgIHN0YXRpYyBpc0luaXQgPSBmYWxzZVxyXG4gICAgc3RhdGljIGdldE1hcCgpOiBhbnkge1xyXG4gICAgICAgIGlmIChOZXRNZXNzYWdlTmFtZS5pc0luaXQpe1xyXG4gICAgICAgICAgICByZXR1cm4gTmV0TWVzc2FnZU5hbWUubWVzc2FnZU1hcFxyXG4gICAgICAgIH1cclxuICAgICAgICBOZXRNZXNzYWdlTmFtZS5pc0luaXQgPSB0cnVlXHJcblxyXG4gICAgICAgIC8vTWVzc2FnZU5hbWVcclxuICAgICAgICBsZXQgbWFwID0gTmV0TWVzc2FnZU5hbWUubWVzc2FnZU1hcFxyXG5cclxuICAgICAgICBtYXBbR2FtZU1lc3NhZ2UuR01fVkVSSUZZX1ZFUlNJT05dPSdHTV9WZXJpZnlWZXJzaW9uJztcclxuICAgICAgICBtYXBbR2FtZU1lc3NhZ2UuR01fVkVSU0lPTl9SRVRVUk5dPSdHTV9WZXJpZnlWZXJzaW9uUmV0dXJuJztcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hcFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJ5dGUgPSBMYXlhLkJ5dGVcclxuaW1wb3J0IFNvY2tldENvbm5lY3QgZnJvbSBcIi4vU29ja2V0Q29ubmVjdFwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ldFBhY2tldCB7XHJcbiAgICAvL3ByaXZhdGUgV0VCUEFDS19IRUFEX09GRlNFVDogbnVtYmVyID0gMFx0Ly8g6Ieq5a6a5LmJ5pWw5o2uIOS4gOiIrOaYr3JvbGVpZCAobG9uZ+exu+WeiylcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX01FU1NTQUdFSURfT0ZGU0VUOiBudW1iZXIgPSA4XHQvLyDmtojmga9pZFxyXG4gICAgLy9wcml2YXRlIFdFQlBBQ0tfTEVOR1RIX09GRlNFVDogbnVtYmVyID0gMTJcdC8vIOa2iOaBr+mVv+W6plxyXG4gICAgcHVibGljIFdFQlBBQ0tfSEVBRF9TSVpFOiBudW1iZXIgPSAxNlx0Ly8g5raI5oGv5pWw5o2u5byA5aeL5L2N572uXHJcblxyXG4gICAgcHVibGljIHJvbGVJZDogbnVtYmVyXHJcbiAgICBwdWJsaWMgbWVzc2FnZUlkOiBudW1iZXJcclxuICAgIHB1YmxpYyBtZXNzYWdlOiBhbnlcclxuXHJcbiAgICBwcml2YXRlIHJlYWRCeXRlczogQnl0ZVxyXG4gICAgcHJpdmF0ZSBzb2NrZXRDb25uZWN0OiBTb2NrZXRDb25uZWN0XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29ubmVjdDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0ID0gY29ubmVjdFxyXG4gICAgICAgIHRoaXMucmVhZEJ5dGVzID0gbmV3IEJ5dGUoKVxyXG4gICAgICAgIHRoaXMucmVhZEJ5dGVzLmVuZGlhbiA9IExheWEuQnl0ZS5MSVRUTEVfRU5ESUFOLy/ov5nph4zmiJHku6zph4fnlKjlsI/nq69cclxuICAgIH1cclxuXHJcbiAgICAvL+aOpeaUtuacjeWKoeWZqOS/oeaBr1xyXG4gICAgcHVibGljIHJlY2VpdmVNc2coYnl0ZXM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVhZEJ5dGVzLndyaXRlQXJyYXlCdWZmZXIoYnl0ZXMpXHJcbiAgICAgICAgdGhpcy5yZWFkQnl0ZXMucG9zID0gMC8v6K6+572u5YGP56e75oyH6ZKIXHJcblxyXG4gICAgICAgIC8v5oyJ54Wn5pyN5Yqh5Zmo5Lyg6YCS6L+H5p2l55qE5pWw5o2u77yM5oyJ54Wn6aG65bqP6K+75Y+WXHJcbiAgICAgICAgdGhpcy5yb2xlSWQgPSB0aGlzLnJlYWRCeXRlcy5nZXRGbG9hdDY0KClcclxuICAgICAgICB0aGlzLm1lc3NhZ2VJZCA9IHRoaXMucmVhZEJ5dGVzLmdldEludDMyKClcclxuICAgICAgICBsZXQgbXNnTGVuZ3RoID0gdGhpcy5yZWFkQnl0ZXMuZ2V0SW50MzIoKVxyXG4gICAgICAgIC8vbGV0IGFiID0gdGhpcy5yZWFkQnl0ZXMucmVhZEFycmF5QnVmZmVyKG1zZ0xlbmd0aCAtIHRoaXMuV0VCUEFDS19IRUFEX1NJWkUpXHJcbiAgICAgICAgLy9sZXQgYnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoYWIpXHJcbiAgICAgICAgLy90aGlzLm1lc3NhZ2UgPSB0aGlzLnNvY2tldENvbm5lY3QuZGVzZXJpYWxpemUodGhpcy5tZXNzYWdlSWQsIGJ1ZmZlcilcclxuICAgICAgICBsZXQgdWludDhBcnJheSA9IHRoaXMucmVhZEJ5dGVzLnJlYWRVaW50OEFycmF5KHRoaXMuV0VCUEFDS19IRUFEX1NJWkUsIG1zZ0xlbmd0aCAtIHRoaXMuV0VCUEFDS19IRUFEX1NJWkUpXHJcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gdGhpcy5zb2NrZXRDb25uZWN0LmRlc2VyaWFsaXplKHRoaXMubWVzc2FnZUlkLCB1aW50OEFycmF5KVxyXG5cclxuICAgICAgICAvL2lmIChtc2dMZW5ndGggIT0gdGhpcy5yZWFkQnl0ZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5lcnJvcihcIua2iOaBr+mVv+S4jeS4gOagt1wiKVxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICB0aGlzLnJlYWRCeXRlcy5jbGVhcigpXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgU29ja2V0Q29ubmVjdCBmcm9tIFwiLi9Tb2NrZXRDb25uZWN0XCI7XHJcblxyXG5jbGFzcyBHYW1lQ2xpZW50IHtcclxuICAgIHByaXZhdGUgY2xpZW50SWQ6IENsaWVudElEO1xyXG4gICAgcHJpdmF0ZSBzb2NrZXRDb25uZWN0OiBTb2NrZXRDb25uZWN0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBDbGllbnRJRCkge1xyXG4gICAgICAgIHRoaXMuY2xpZW50SWQgPSBpZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29ubmVjdChob3N0OiBzdHJpbmcsIHBvcnQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdCA9IG5ldyBTb2NrZXRDb25uZWN0KFwiIGNsaWVudElkOlwiICsgdGhpcy5jbGllbnRJZCk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LmNvbm5lY3QoaG9zdCwgcG9ydCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbm5lY3RCeVVybCh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdCA9IG5ldyBTb2NrZXRDb25uZWN0KFwiIGNsaWVudElkOlwiICsgdGhpcy5jbGllbnRJZCk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LmNvbm5lY3RCeVVybCh1cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWNvbm5lY3QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LnJlY29ubmVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNjb25uZWN0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LmRpc2Nvbm5lY3RlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0Nvbm5lY3RlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zb2NrZXRDb25uZWN0LmNvbm5lY3RlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kRW1wdHkobXNnSWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5zZW5kRW1wdHkobXNnSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kTWVzc2FnZShtc2dJZDogbnVtYmVyLCBtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5zZW5kTWVzc2FnZShtc2dJZCwgbXNnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Db25uZWN0Q2FsbGJhY2soY2FsbGJhY2s6RnVuY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0Lm9uQ29ubmVjdCA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkRpc2Nvbm5lY3RDYWxsYmFjayhjYWxsYmFjazpGdW5jdGlvbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3Qub25EaXNjb25uZWN0ID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXR3b3JrTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogTmV0d29ya01hbmFnZXI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBOZXR3b3JrTWFuYWdlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2UgfHwgKHRoaXMuaW5zdGFuY2UgPSBuZXcgdGhpcygpKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2FtZUNsaWVudE1hcDogeyBbaW5kZXg6IG51bWJlcl06IEdhbWVDbGllbnQ7IH0gPSB7fTtcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bop5LoibJJRFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Um9sZUlkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucG93KDIsIDUzKSAtIDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZUNsaWVudChjbGllbnRJRDogbnVtYmVyLCB1cmw6IHN0cmluZyk6IEdhbWVDbGllbnQge1xyXG4gICAgICAgIHZhciBjbGllbnQ6IEdhbWVDbGllbnQgPSBuZXcgR2FtZUNsaWVudChjbGllbnRJRCk7XHJcbiAgICAgICAgY2xpZW50LmNvbm5lY3RCeVVybCh1cmwpO1xyXG4gICAgICAgIHRoaXMuZ2FtZUNsaWVudE1hcFtDbGllbnRJRC5sb2dpbl0gPSBjbGllbnQ7XHJcbiAgICAgICAgcmV0dXJuIGNsaWVudDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q2xpZW50KGNsaWVudElEOiBDbGllbnRJRCk6IEdhbWVDbGllbnQge1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWVDbGllbnRNYXBbY2xpZW50SURdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZUNsaWVudE1hcFtjbGllbnRJRF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZUNsaWVudChjbGllbnRJRDogQ2xpZW50SUQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2xpZW50OiBHYW1lQ2xpZW50ID0gdGhpcy5nZXRDbGllbnQoQ2xpZW50SUQubG9naW4pXHJcbiAgICAgICAgaWYgKGNsaWVudCkge1xyXG4gICAgICAgICAgICBjbGllbnQuZGlzY29ubmVjdGVkKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlY29ubmVjdENsaWVudChjbGllbnRJRDogQ2xpZW50SUQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2xpZW50OiBHYW1lQ2xpZW50ID0gdGhpcy5nZXRDbGllbnQoQ2xpZW50SUQubG9naW4pXHJcbiAgICAgICAgaWYgKGNsaWVudCkge1xyXG4gICAgICAgICAgICBjbGllbnQucmVjb25uZWN0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ2luU2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgbXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKG1zZ0lkLCBtc2csIENsaWVudElELmxvZ2luKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dpY1NlbmRNZXNzYWdlKG1zZ0lkOiBudW1iZXIsIG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShtc2dJZCwgbXNnLCBDbGllbnRJRC5sb2dpYylcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2NlbmVTZW5kTWVzc2FnZShtc2dJZDogbnVtYmVyLCBtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UobXNnSWQsIG1zZywgQ2xpZW50SUQuc2NlbmUpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kTWVzc2FnZShtc2dJZDogbnVtYmVyLCBtc2c6IGFueSwgY2xpZW50SUQ6IENsaWVudElEKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNsaWVudDogR2FtZUNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KGNsaWVudElEKVxyXG4gICAgICAgIGlmIChjbGllbnQpIHtcclxuICAgICAgICAgICAgY2xpZW50LnNlbmRNZXNzYWdlKG1zZ0lkLCBtc2cpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kTWVzc2FnZUVtcHR5KG1zZ0lkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2xpZW50OiBHYW1lQ2xpZW50ID0gbnVsbDtcclxuICAgICAgICBpZiAobXNnSWQgPiBHYW1lTWVzc2FnZS5HTV9BQ0NPVU5UX1NFUlZFUl9NRVNTQUdFX1NUQVJUICYmIG1zZ0lkIDwgR2FtZU1lc3NhZ2UuR01fQUNDT1VOVF9TRVJWRVJfTUVTU0FHRV9FTkQpIHtcclxuICAgICAgICAgICAgY2xpZW50ID0gdGhpcy5nZXRDbGllbnQoQ2xpZW50SUQubG9naW4pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjbGllbnQgPSB0aGlzLmdldENsaWVudChDbGllbnRJRC5sb2dpYylcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNsaWVudCkge1xyXG4gICAgICAgICAgICBjbGllbnQuc2VuZEVtcHR5KG1zZ0lkKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJBbGxHYW1lQ2xpZW50KCkge1xyXG4gICAgICAgIGxldCBkaWMgPSB0aGlzLmdhbWVDbGllbnRNYXBcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkaWMpIHtcclxuICAgICAgICAgICAgaWYgKGRpYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZGljW2tleV07XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmRpc2Nvbm5lY3RlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2FtZUNsaWVudE1hcCA9IHt9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgTmV0RXZlbnREaXNwYXRjaGVyIGZyb20gXCIuLi9FdmVudC9OZXRFdmVudERpc3BhdGNoZXJcIlxyXG5pbXBvcnQgTmV0UGFja2V0IGZyb20gXCIuL05ldFBhY2tldFwiXHJcbmltcG9ydCBOZXR3b3JrTWFuYWdlciBmcm9tIFwiLi9OZXR3b3JrTWFuYWdlclwiXHJcbmltcG9ydCBOZXRNZXNzYWdlTmFtZSBmcm9tIFwiLi9OZXRNZXNzYWdlTmFtZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvY2tldENvbm5lY3Qge1xyXG5cclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX0hFQURfT0ZGU0VUOiBudW1iZXIgPSAwXHQvLyDoh6rlrprkuYnmlbDmja4g5LiA6Iis5pivcm9sZWlkIChsb25n57G75Z6LKVxyXG4gICAgLy9wcml2YXRlIFdFQlBBQ0tfTUVTU1NBR0VJRF9PRkZTRVQ6IG51bWJlciA9IDhcdC8vIOa2iOaBr2lkXHJcbiAgICAvL3ByaXZhdGUgV0VCUEFDS19MRU5HVEhfT0ZGU0VUOiBudW1iZXIgPSAxMlx0Ly8g5raI5oGv6ZW/5bqmXHJcbiAgICBwcml2YXRlIFdFQlBBQ0tfSEVBRF9TSVpFOiBudW1iZXIgPSAxNlx0Ly8g5raI5oGv5pWw5o2u5byA5aeL5L2N572uXHJcblxyXG5cclxuICAgIHB1YmxpYyBzb2NrZXQ6IExheWEuU29ja2V0ID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBzZW5kQnl0ZXM6IExheWEuQnl0ZSA9IG51bGxcclxuICAgIHByaXZhdGUgcmVhZEJ5dGVzOiBMYXlhLkJ5dGUgPSBudWxsXHJcbiAgICBwcml2YXRlIHRlbXBCeXRlczogTGF5YS5CeXRlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSB1cmw6IHN0cmluZyA9IG51bGxcclxuICAgIHByaXZhdGUgdGlwczogc3RyaW5nID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBwYk1lc3NhZ2VOYW1lOiBhbnkgPSBudWxsXHJcbiAgICBwcml2YXRlIHByb3RvUm9vdDogYW55ID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgb25Db25uZWN0OkZ1bmN0aW9uID0gbnVsbDtcclxuICAgIHB1YmxpYyBvbkRpc2Nvbm5lY3Q6RnVuY3Rpb24gPSBudWxsO1xyXG5cclxuICAgIC8vcHJpdmF0ZSBzZW5kTmV0UGFja2V0OiBBcnJheTxOZXRQYWNrZXQ+ID0gbnVsbFxyXG4gICAgLy9wcml2YXRlIHJlY2VpdmVOZXRQYWNrZXQ6IEFycmF5PE5ldFBhY2tldD4gPSBudWxsXHJcblxyXG4gICAgY29uc3RydWN0b3IodGlwczogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy50aXBzID0gdGlwc1xyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzID0gbmV3IExheWEuQnl0ZSgpXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMuZW5kaWFuID0gTGF5YS5CeXRlLkxJVFRMRV9FTkRJQU4vL+i/memHjOaIkeS7rOmHh+eUqOWwj+err1xyXG4gICAgICAgIHRoaXMudGVtcEJ5dGVzID0gbmV3IExheWEuQnl0ZSgpXHJcbiAgICAgICAgdGhpcy50ZW1wQnl0ZXMuZW5kaWFuID0gTGF5YS5CeXRlLkxJVFRMRV9FTkRJQU4vL+i/memHjOaIkeS7rOmHh+eUqOWwj+err1xyXG5cclxuICAgICAgICAvL3RoaXMuc2VuZE5ldFBhY2tldCA9IG5ldyBBcnJheTxOZXRQYWNrZXQ+KCkgLy/lj5HpgIHnmoTnvZHnu5zljIVcclxuICAgICAgICAvL3RoaXMucmVjZWl2ZU5ldFBhY2tldCA9IG5ldyBBcnJheTxOZXRQYWNrZXQ+KCkgLy/mjqXmlLbnmoTnvZHnu5zljIVcclxuXHJcbiAgICAgICAgdGhpcy5wcm90b1Jvb3QgPSBMYXlhLkJyb3dzZXIud2luZG93W1wiUEJNZXNzYWdlXCJdXHJcbiAgICAgICAgdGhpcy5wYk1lc3NhZ2VOYW1lID0gTmV0TWVzc2FnZU5hbWUuZ2V0TWFwKClcclxuICAgIH1cclxuICAgIHB1YmxpYyBjb25uZWN0KGhvc3Q6IHN0cmluZywgcG9ydDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51cmwgPSBob3N0LmNvbmNhdChwb3J0LnRvU3RyaW5nKCkpXHJcbiAgICAgICAgdGhpcy5jb25uZWN0QnlVcmwodGhpcy51cmwpXHJcbiAgICB9XHJcbiAgICAvL1wid3M6Ly9sb2NhbGhvc3Q6ODk4OVwiXHJcbiAgICBwdWJsaWMgY29ubmVjdEJ5VXJsKHVybDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51cmwgPSB1cmxcclxuICAgICAgICB0aGlzLnNvY2tldCA9IG5ldyBMYXlhLlNvY2tldCgpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQuZW5kaWFuID0gTGF5YS5CeXRlLkxJVFRMRV9FTkRJQU4vL+i/memHjOaIkeS7rOmHh+eUqOWwj+err1xyXG4gICAgICAgIHRoaXMuc29ja2V0LmNvbm5lY3RCeVVybCh1cmwpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oTGF5YS5FdmVudC5PUEVOLCB0aGlzLCB0aGlzLm9wZW5IYW5kbGVyKVxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKExheWEuRXZlbnQuTUVTU0FHRSwgdGhpcywgdGhpcy5yZWNlaXZlSGFuZGxlcilcclxuICAgICAgICB0aGlzLnNvY2tldC5vbihMYXlhLkV2ZW50LkNMT1NFLCB0aGlzLCB0aGlzLmNsb3NlSGFuZGxlcilcclxuICAgICAgICB0aGlzLnNvY2tldC5vbihMYXlhLkV2ZW50LkVSUk9SLCB0aGlzLCB0aGlzLmVycm9ySGFuZGxlcilcclxuICAgIH1cclxuICAgIC8v6YeN5paw6L+e5o6lXHJcbiAgICBwdWJsaWMgcmVjb25uZWN0KCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0LmNsZWFuU29ja2V0KClcclxuICAgICAgICB0aGlzLmNvbm5lY3RCeVVybCh0aGlzLnVybClcclxuICAgIH1cclxuICAgIC8v5pat5byA6L+e5o6lXHJcbiAgICBwdWJsaWMgZGlzY29ubmVjdGVkKCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0LmNsb3NlKClcclxuICAgIH1cclxuICAgIC8v5piv5ZCm6L+e5o6lXHJcbiAgICBwdWJsaWMgY29ubmVjdGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvY2tldC5jb25uZWN0ZWRcclxuICAgIH1cclxuICAgIC8v5q2j56Gu5bu656uL6L+e5o6lXHJcbiAgICBwcml2YXRlIG9wZW5IYW5kbGVyKGV2ZW50OiBhbnkgPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy51cmwgKyB0aGlzLnRpcHMgKyBcIiAg5q2j56Gu5bu656uL6L+e5o6lXCIpXHJcbiAgICAgICAgaWYgKHRoaXMub25Db25uZWN0KXtcclxuICAgICAgICAgICAgdGhpcy5vbkNvbm5lY3QoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5YWz6Zet6L+e5o6l5LqL5Lu2XHJcbiAgICBwcml2YXRlIGNsb3NlSGFuZGxlcihldmVudDogYW55ID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXJsICsgdGhpcy50aXBzICsgXCIg5YWz6Zet6L+e5o6l5LqL5Lu2XCIpXHJcbiAgICAgICAgaWYgKHRoaXMub25EaXNjb25uZWN0KXtcclxuICAgICAgICAgICAgdGhpcy5vbkRpc2Nvbm5lY3QoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v6L+e5o6l5Ye66ZSZXHJcbiAgICBwcml2YXRlIGVycm9ySGFuZGxlcihlOiBhbnkgPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy51cmwgKyB0aGlzLnRpcHMgKyBcIiDov57mjqXlh7rplJlcIilcclxuICAgIH1cclxuXHJcbiAgICAvL+WPkemAgeepuua2iOaBr1xyXG4gICAgcHVibGljIHNlbmRFbXB0eShtc2dJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgLy8g5YaZ5YWl5LiA5Liq5pWw5a2XMFxyXG4gICAgICAgIHRoaXMudGVtcEJ5dGVzLndyaXRlRmxvYXQzMigwKVxyXG4gICAgICAgIHRoaXMuc2VuZChtc2dJZCwgdGhpcy50ZW1wQnl0ZXMpXHJcbiAgICAgICAgdGhpcy50ZW1wQnl0ZXMuY2xlYXIoKVxyXG4gICAgfVxyXG5cclxuICAgIC8v5Y+R6YCB5raI5oGvXHJcbiAgICBwdWJsaWMgc2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgbXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAvL2lmICh0eXBlb2YgbXNnID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAvLyAgICB0aGlzLnRlbXBCeXRlcy53cml0ZVVURlN0cmluZyhtc2cpXHJcbiAgICAgICAgLy8gICAgdGhpcy5zZW5kKG1zZ0lkLCB0aGlzLnRlbXBCeXRlcylcclxuICAgICAgICAvL31cclxuICAgICAgICAvL2Vsc2UgaWYgKG1zZyBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XHJcbiAgICAgICAgLy8gICAgdGhpcy50ZW1wQnl0ZXMud3JpdGVBcnJheUJ1ZmZlcihidWZmZXIpXHJcbiAgICAgICAgLy8gICAgdGhpcy5zZW5kKG1zZ0lkLCB0aGlzLnRlbXBCeXRlcylcclxuICAgICAgICAvL31cclxuICAgICAgICAvL2Vsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBidWZmZXI6IFVpbnQ4QXJyYXkgPSB0aGlzLnNlcmlhbGl6ZShtc2dJZCwgbXNnKVxyXG4gICAgICAgICAgICB0aGlzLnRlbXBCeXRlcy53cml0ZUFycmF5QnVmZmVyKGJ1ZmZlcilcclxuICAgICAgICAgICAgdGhpcy5zZW5kKG1zZ0lkLCB0aGlzLnRlbXBCeXRlcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/pnIDopoHlj5HpgIHnmoTmlbDmja5cclxuICAgIHByaXZhdGUgc2VuZChtc2dJZDogbnVtYmVyLCBieXRlOiBMYXlhLkJ5dGUpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuc29ja2V0LmNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBjb25uZWN0aW9uIGhhcyBiZWVuIGRpc2Nvbm5lY3RlZC5cIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vV0VCUEFDS19IRUFEX09GRlNFVFxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLndyaXRlRmxvYXQ2NChOZXR3b3JrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJvbGVJZCgpKVxyXG4gICAgICAgIC8vV0VCUEFDS19NRVNTU0FHRUlEX09GRlNFVFxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLndyaXRlSW50MzIobXNnSWQpXHJcbiAgICAgICAgLy9XRUJQQUNLX0xFTkdUSF9PRkZTRVRcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy53cml0ZUludDMyKHRoaXMuV0VCUEFDS19IRUFEX1NJWkUgKyBieXRlLmxlbmd0aClcclxuICAgICAgICAvL01hc3NnZSBib2R5XHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMud3JpdGVBcnJheUJ1ZmZlcihieXRlLmJ1ZmZlcilcclxuICAgICAgICAvL+i/memHjOaYr+aKiuWtl+iKguaVsOe7hOeahOaVsOaNrumAmui/h3NvY2tldOWPkemAgee7meacjeWKoeWZqFxyXG4gICAgICAgIHRoaXMuc29ja2V0LnNlbmQodGhpcy5zZW5kQnl0ZXMuYnVmZmVyKVxyXG4gICAgICAgIC8v5riF6Zmk5o6J5pWw5o2u77yM5pa55L6/5LiL5qyh6K+75YaZXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMuY2xlYXIoKVxyXG4gICAgICAgIHRoaXMudGVtcEJ5dGVzLmNsZWFyKClcclxuICAgIH1cclxuXHJcbiAgICAvL+aOpeaUtuWIsOaVsOaNrlxyXG4gICAgcHJpdmF0ZSByZWNlaXZlSGFuZGxlcihtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJNZXNzYWdlIGZyb20gc2VydmVyOiAgXCIgKyBuZXcgTGF5YS5CeXRlKG1zZykucmVhZFVURkJ5dGVzKCkpXHJcbiAgICAgICAgdmFyIG5ldFBhY2tldDogTmV0UGFja2V0ID0gbmV3IE5ldFBhY2tldCh0aGlzKVxyXG4gICAgICAgIG5ldFBhY2tldC5yZWNlaXZlTXNnKG1zZylcclxuICAgICAgICB0aGlzLnNvY2tldC5pbnB1dC5jbGVhcigpXHJcbiAgICAgICAgTmV0RXZlbnREaXNwYXRjaGVyLmdldEluc3RhbmNlKCkuZGlzcGF0Y2gobmV0UGFja2V0Lm1lc3NhZ2VJZCwgbmV0UGFja2V0KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bqP5YiX5YyWIHByb3RvY29sLWJ1ZmZlclxyXG4gICAgICogQHBhcmFtIG1hc3NhZ2VJZCBcclxuICAgICAqIEBwYXJhbSBtYXNzYWdlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXJpYWxpemUobWFzc2FnZUlkOiBudW1iZXIsIG1hc3NhZ2U6IGFueSk6IFVpbnQ4QXJyYXkge1xyXG4gICAgICAgIGxldCBtYXNzYWdlTmFtZTogc3RyaW5nID0gdGhpcy5wYk1lc3NhZ2VOYW1lW21hc3NhZ2VJZF1cclxuICAgICAgICAvLyBFbmNvZGUgYSBtZXNzYWdlIHRvIGFuIFVpbnQ4QXJyYXkgKGJyb3dzZXIpIG9yIEJ1ZmZlciAobm9kZSlcclxuICAgICAgICB2YXIgYnVmZmVyOiBhbnkgPSB0aGlzLnByb3RvUm9vdFttYXNzYWdlTmFtZV0uZW5jb2RlKG1hc3NhZ2UpLmZpbmlzaCgpO1xyXG4gICAgICAgIHJldHVybiBidWZmZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj43luo/liJfljJYgcHJvdG9jb2wtYnVmZmVyXHJcbiAgICAgKiBAcGFyYW0gbWFzc2FnZU5hbWUgXHJcbiAgICAgKiBAcGFyYW0gbmV0UGFja2FnZSBOZXRQYWNrYWdlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZXNlcmlhbGl6ZShtYXNzYWdlSWQ6IG51bWJlciwgbWFzc2FnZTogVWludDhBcnJheSk6IGFueSB7XHJcbiAgICAgICAgbGV0IG1hc3NhZ2VOYW1lOiBzdHJpbmcgPSB0aGlzLnBiTWVzc2FnZU5hbWVbbWFzc2FnZUlkXVxyXG4gICAgICAgIC8vIERlY29kZSBhbiBVaW50OEFycmF5IChicm93c2VyKSBvciBCdWZmZXIgKG5vZGUpIHRvIGEgbWVzc2FnZVxyXG4gICAgICAgIHZhciBtZXNzYWdlOiBhbnkgPSB0aGlzLnByb3RvUm9vdFttYXNzYWdlTmFtZV0uZGVjb2RlKG1hc3NhZ2UpO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgfVxyXG5cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xyXG5pbXBvcnQgTWFpblVJIGZyb20gXCIuL3NjcmlwdC9NYWluVUlcIlxyXG5pbXBvcnQgVGVzdF85X1RpbWVMaW5lVUkgZnJvbSBcIi4vc3R1ZHkvVGVzdF85X1RpbWVMaW5lVUlcIlxyXG4vKlxyXG4qIOa4uOaIj+WIneWni+WMlumFjee9rjtcclxuKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNvbmZpZ3tcclxuICAgIHN0YXRpYyB3aWR0aDpudW1iZXI9NjQwO1xyXG4gICAgc3RhdGljIGhlaWdodDpudW1iZXI9MTEzNjtcclxuICAgIHN0YXRpYyBzY2FsZU1vZGU6c3RyaW5nPVwiZml4ZWR3aWR0aFwiO1xyXG4gICAgc3RhdGljIHNjcmVlbk1vZGU6c3RyaW5nPVwidmVydGljYWxcIjtcclxuICAgIHN0YXRpYyBhbGlnblY6c3RyaW5nPVwidG9wXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25IOnN0cmluZz1cImxlZnRcIjtcclxuICAgIHN0YXRpYyBzdGFydFNjZW5lOmFueT1cIk1haW4uc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj10cnVlO1xyXG4gICAgc3RhdGljIHN0YXQ6Ym9vbGVhbj10cnVlO1xyXG4gICAgc3RhdGljIHBoeXNpY3NEZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIGV4cG9ydFNjZW5lVG9Kc29uOmJvb2xlYW49dHJ1ZTtcclxuICAgIGNvbnN0cnVjdG9yKCl7fVxyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICB2YXIgcmVnOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuICAgICAgICByZWcoXCJzY3JpcHQvTWFpblVJLnRzXCIsTWFpblVJKTtcclxuICAgICAgICByZWcoXCJzdHVkeS9UZXN0XzlfVGltZUxpbmVVSS50c1wiLFRlc3RfOV9UaW1lTGluZVVJKTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLmluaXQoKTsiLCJpbXBvcnQgeyB1aSB9IGZyb20gXCIuLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IE5ldHdvcmtNYW5hZ2VyIGZyb20gXCIuLi9GcmFtZXdvcmsvTmV0d29yay9OZXR3b3JrTWFuYWdlclwiO1xyXG5pbXBvcnQgTmV0RXZlbnREaXNwYXRjaGVyIGZyb20gXCIuLi9GcmFtZXdvcmsvRXZlbnQvTmV0RXZlbnREaXNwYXRjaGVyXCI7XHJcbmltcG9ydCBOZXRQYWNrZXQgZnJvbSBcIi4uL0ZyYW1ld29yay9OZXR3b3JrL05ldFBhY2tldFwiO1xyXG5pbXBvcnQgR2FtZU1lc3NhZ2VOYW1lIGZyb20gXCIuLi9GcmFtZXdvcmsvTmV0d29yay9OZXRNZXNzYWdlTmFtZVwiO1xyXG5pbXBvcnQgVUlQYXRoIGZyb20gXCIuLi9VSVBhdGhcIjtcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi4vRnJhbWV3b3JrL1VJL1VJTWFuYWdlclwiO1xyXG5cclxuXHJcbi8v5Li755WM6Z2iXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5VSSBleHRlbmRzIHVpLk1haW5VSSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IHN1cGVyKCk7IH1cclxuXHJcbiAgICBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1haW5VSS5vbkVuYWJsZVwiKVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhHYW1lTWVzc2FnZS5HTV9WRVJTSU9OX1JFVFVSTik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgTmV0RXZlbnREaXNwYXRjaGVyLmdldEluc3RhbmNlKCkucmVnaXN0ZXIoR2FtZU1lc3NhZ2UuR01fVkVSU0lPTl9SRVRVUk4sIHRoaXMsIHRoaXMuR01fVmVyaWZ5VmVyc2lvblJldHVybilcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYWluVUkub25EaXNhYmxlXCIpXHJcbiAgICAgICAgXHJcbiAgICAgICAgTmV0RXZlbnREaXNwYXRjaGVyLmdldEluc3RhbmNlKCkudW5SZWdpc3RlcihHYW1lTWVzc2FnZS5HTV9WRVJTSU9OX1JFVFVSTiwgdGhpcywgdGhpcy5HTV9WZXJpZnlWZXJzaW9uUmV0dXJuKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIEdNX1ZlcmlmeVZlcnNpb25SZXR1cm4obmV0UGFja2FnZTpOZXRQYWNrZXQpOnZvaWR7XHJcbiAgICAgICAgY29uc29sZS5sb2cobmV0UGFja2FnZS5tZXNzYWdlSWQgKyBcIiAgXCIgKyBuZXRQYWNrYWdlLm1lc3NhZ2UpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uQXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgLy9MYXlhLlNjZW5lLm9wZW4oVUlQYXRoLnRlc3RQYXRoLGZhbHNlKTtcclxuICAgICAgICAvL0xheWEuU2NlbmUub3BlbihVSVBhdGgudGVzdFBhdGgxLGZhbHNlKTtcclxuICAgICAgICAvL0xheWEuU2NlbmUub3BlbihVSVBhdGguVUlfTG9hZGluZyxmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0ZXN0TmV0d29yaygpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlByZWNpc2lvbiBzYWZlLlwiICsgKE1hdGgucG93KDIsIDUzKSAtIDEpKTtcclxuXHJcbiAgICAgICAgLy92YXIgbXNnID0ge1xyXG4gICAgICAgIC8vICAgIHZlcnNpb246IFwiMS41LjRcIixcdFx0XHRcdC8v5a6i5oi356uv54mI5pys5Y+3XHJcbiAgICAgICAgLy8gICAgcGxhdGZvcm06IDkwMDcxOTkyNTQ3NDA5OTEsICAgICAgICAgICAgIC8vL+W5s+WPsFxyXG4gICAgICAgIC8vICAgIGlzdGVzdDogMCwvLy8gICAgMOOAgeato+W4uO+8jDHjgIHmtYvor5XvvIzkuI3pnIDopoHpqozor4HniYjmnKxcclxuICAgICAgICAvL31cclxuICAgICAgICAvL3ZhciByb290ID0gTGF5YS5Ccm93c2VyLndpbmRvd1tcIlBCTWVzc2FnZVwiXTtcclxuICAgICAgICAvL3ZhciBwYk1lc3NhZ2VOYW1lID0gR2FtZU1lc3NhZ2VOYW1lLmdldE1hcCgpXHJcbiAgICAgICAgLy92YXIgYnVmZmVyOiBhbnkgPSByb290W3BiTWVzc2FnZU5hbWVbR2FtZU1lc3NhZ2UuR01fVkVSSUZZX1ZFUlNJT05dXS5lbmNvZGUobXNnKS5maW5pc2goKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGJ1ZmZlcik7XHJcbiAgICAgICAgLy9cclxuXHJcbiAgICAgICAgdmFyIGdhbWVDbGllbnQgPSBOZXR3b3JrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUNsaWVudCgwLCBcIndzOi8vMTkyLjE2OC4yLjEyNjo1MDAwMFwiKTtcclxuICAgICAgICBnYW1lQ2xpZW50Lm9uQ29ubmVjdENhbGxiYWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG1zZyA9IHtcclxuICAgICAgICAgICAgICAgIHZlcnNpb246IFwiMS41LjRcIixcdFx0XHRcdC8v5a6i5oi356uv54mI5pys5Y+3XHJcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybTogOTAwNzE5OTI1NDc0MDk5MSwgICAgICAgICAgICAgLy8v5bmz5Y+wXHJcbiAgICAgICAgICAgICAgICBpc3Rlc3Q6IDAsLy8vICAgIDDjgIHmraPluLjvvIwx44CB5rWL6K+V77yM5LiN6ZyA6KaB6aqM6K+B54mI5pysXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgTmV0d29ya01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2dpblNlbmRNZXNzYWdlKEdhbWVNZXNzYWdlLkdNX1ZFUklGWV9WRVJTSU9OLCBtc2cpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0XzlfU2tpbkFuaW1hdGlvbl9OZXcge1xyXG5cclxuICAgIHByaXZhdGUgY2hhbmdlQWN0aW9uQnV0dG9uOiBMYXlhLkJ1dHRvbjtcclxuICAgIHByaXZhdGUgcm9sZUFuaW1hdG9yOiBMYXlhLkFuaW1hdG9yO1xyXG4gICAgcHJpdmF0ZSBjdXJTdGF0ZUluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBjbGlwTmFtZTogQXJyYXk8c3RyaW5nPiA9IFtcImF0dGFja1wiLCBcImlkbGVcIiwgXCJydW5cIl07XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdmFyIHNjZW5lOiBMYXlhLlNjZW5lM0QgPSBuZXcgTGF5YS5TY2VuZTNEKCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZChzY2VuZSlcclxuXHJcbiAgICAgICAgdmFyIGNhbWVyYTogTGF5YS5DYW1lcmEgPSAoc2NlbmUuYWRkQ2hpbGQobmV3IExheWEuQ2FtZXJhKDAsIDAuMSwgMTAwMCkpKSBhcyBMYXlhLkNhbWVyYTtcclxuICAgICAgICBjYW1lcmEudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsIDEuNSwgNCkpO1xyXG4gICAgICAgIGNhbWVyYS50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoLTE1LCAwLCAwKSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgIC8vY2FtZXJhLmFkZENvbXBvbmVudChDYW1lcmFNb3ZlU2NyaXB0KTtcclxuXHJcbiAgICAgICAgdmFyIGRpcmVjdGlvbkxpZ2h0OiBMYXlhLkRpcmVjdGlvbkxpZ2h0ID0gc2NlbmUuYWRkQ2hpbGQobmV3IExheWEuRGlyZWN0aW9uTGlnaHQoKSkgYXMgTGF5YS5EaXJlY3Rpb25MaWdodDtcclxuICAgICAgICBkaXJlY3Rpb25MaWdodC5jb2xvciA9IG5ldyBMYXlhLlZlY3RvcjMoMSwgMSwgMSk7XHJcblxyXG4gICAgICAgIC8vdmFyIHBsYW5lOiBMYXlhLlNwcml0ZTNEID0gc2NlbmUuYWRkQ2hpbGQoTGF5YS5TcHJpdGUzRC5sb2FkKFwiLi4vLi4vcmVzL3RocmVlRGltZW4vc2tpbk1vZGVsL1pvbWJpZS9uZXcvUGxhbmUubGhcIikpIGFzIExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgTGF5YS5TcHJpdGUzRC5sb2FkKFwiLi9yZXMvYW5pbWF0aW9uL3BsYXllci9tYWdlL21hZ2UubGhcIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uTG9hZENvbXBsZXRlZCwgW3NjZW5lXSkpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZENvbXBsZXRlZChzY2VuZTogTGF5YS5TY2VuZTNELCBzcHJpdGUzRDogTGF5YS5TcHJpdGUzRCk6IHZvaWQge1xyXG4gICAgICAgIHNjZW5lLmFkZENoaWxkKHNwcml0ZTNEKTtcclxuICAgICAgICAvL+iOt+WPlkFuaW1hdG9y5Yqo55S757uE5Lu2XHJcbiAgICAgICAgdGhpcy5yb2xlQW5pbWF0b3IgPSBzcHJpdGUzRC5nZXRDaGlsZEF0KDApLmdldENvbXBvbmVudChMYXlhLkFuaW1hdG9yKTtcclxuICAgICAgICB0aGlzLmxvYWRVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZFVJKCk6IHZvaWQge1xyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQoXCIuL3Jlcy90aHJlZURpbWVuL3VpL2J1dHRvbi5wbmdcIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLmNyZWF0ZUJ1dHRvbikpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjcmVhdGVCdXR0b24oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VBY3Rpb25CdXR0b24gPSBuZXcgTGF5YS5CdXR0b24oXCIuL3Jlcy90aHJlZURpbWVuL3VpL2J1dHRvbi5wbmdcIiwgXCLliIfmjaLliqjkvZxcIik7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLmNoYW5nZUFjdGlvbkJ1dHRvbik7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VBY3Rpb25CdXR0b24uc2l6ZSgxNjAsIDQwKTtcclxuICAgICAgICB0aGlzLmNoYW5nZUFjdGlvbkJ1dHRvbi5sYWJlbEJvbGQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQWN0aW9uQnV0dG9uLmxhYmVsU2l6ZSA9IDMwO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlQWN0aW9uQnV0dG9uLnNpemVHcmlkID0gXCI0LDQsNCw0XCI7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VBY3Rpb25CdXR0b24uc2NhbGUoTGF5YS5Ccm93c2VyLnBpeGVsUmF0aW8sIExheWEuQnJvd3Nlci5waXhlbFJhdGlvKTtcclxuICAgICAgICB0aGlzLmNoYW5nZUFjdGlvbkJ1dHRvbi5wb3MoTGF5YS5zdGFnZS53aWR0aCAvIDIgLSB0aGlzLmNoYW5nZUFjdGlvbkJ1dHRvbi53aWR0aCAqIExheWEuQnJvd3Nlci5waXhlbFJhdGlvIC8gMiwgTGF5YS5zdGFnZS5oZWlnaHQgLSAxMDAgKiBMYXlhLkJyb3dzZXIucGl4ZWxSYXRpbyk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VBY3Rpb25CdXR0b24ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5wbGF5ZXJBbmltYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXllckFuaW1hdGlvbigpOiB2b2lkIHtcclxuICAgICAgICAvL+agueaNruWQjeensOaSreaUvuWKqOeUu1xyXG4gICAgICAgIHZhciBpbmRleDogbnVtYmVyID0gKyt0aGlzLmN1clN0YXRlSW5kZXggJSB0aGlzLmNsaXBOYW1lLmxlbmd0aDtcclxuICAgICAgICB2YXIgcGxheWVyTmFtZSA9IHRoaXMuY2xpcE5hbWVbaW5kZXhdXHJcbiAgICAgICAgY29uc29sZS5sb2cocGxheWVyTmFtZSk7XHJcbiAgICAgICAgdGhpcy5yb2xlQW5pbWF0b3IucGxheShwbGF5ZXJOYW1lKTtcclxuICAgIH1cclxuXHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0XzEyX1RpbGVkTWFwIHtcclxuICAgIC8vb3B0aW1pemF0aW9uKCk6dm9pZHtcclxuICAgIC8vICAgIC8v5b2TVGlsZWQgTWFwYeS4jeWGjeS9v+eUqOeahOaXtuWAme+8jOmcgOimgeS9v+eUqGRlc3Ryb3koKeaWueazlei/m+ihjOmUgOavge+8jOWbnuaUtuiiq+WNoOeUqOeahOWGheWtmFxyXG4gICAgLy8gICAgdGhpcy50TWFwLmRlc3Ryb3koKTtcclxuICAgIC8vICAgIC8v6Ieq5Yqo57yT5a2Y5rKh5pyJ5Yqo55S755qE5Zyw5Z2XXHJcbiAgICAvLyAgICB0aGlzLnRNYXAuYXV0b0NhY2hlID0gdHJ1ZTtcclxuICAgIC8vICAgIC8v6Ieq5Yqo57yT5a2Y55qE57G75Z6LLOWcsOWbvui+g+Wkp+aXtuW7uuiuruS9v+eUqG5vcm1hbFxyXG4gICAgLy8gICAgdGhpcy50TWFwLmF1dG9DYWNoZVR5cGUgPSBcIm5vcm1hbFwiO1xyXG4gICAgLy8gICAgLy/mtojpmaTnvKnmlL7lr7zoh7TnmoTnvJ3pmpks5Lmf5bCx5piv5Y676buR6L6577yMMS43LjfniYjmnKzmlrDlop7nmoTkvJjljJblsZ7mgKdcclxuICAgIC8vICAgIHRoaXMudE1hcC5hbnRpQ3JhY2sgPSB0cnVlO1xyXG4gICAgLy8gICAgLy/lvIDlkK/lm77lsYLlkIjlubZcclxuICAgIC8vICAgIHRoaXMudE1hcC5lbmFibGVNZXJnZUxheWVyID0gdHJ1ZTtcclxuICAgIC8vXHJcbiAgICAvLyAgICAvL+e8k+WtmOWMuuWdl+eahOiuvue9ruaOqOiNkFxyXG4gICAgLy8gICAgLy/lpoLmnpzljZXlm77mmK8xNSoxNe+8jOe8k+WtmOWPr+WMuuWdl+WPr+S7peiuvue9ruS4ujUxMCo1MTDvvIgzNOWAje+8ie+8jOS7peatpOexu+aOqO+8jOWwvemHj+WcqOWOn+WMuuWdl+aVtOaVsOWAjeeahOWJjeaPkOS4i++8jOiuvue9ruWcqDUxMuW3puWPs+OAguaOqOiNkOS4ujUxMio1MTJcclxuICAgIC8vICAgIC8v57yT5a2Y5Yy65Z2X55qE5YW35L2T6K6+572u5pa55rOVXHJcbiAgICAvLyAgICAvL+S4uuesrOS6lOS4quWPguaVsGdyaWRTaXpl5Yib5bu65LiA5LiqNTEyKjUxMuWkp+Wwj+eahFBvaW505a+56LGh5a6e5L6LXHJcbiAgICAvLyAgICAvL3ZhciBncmlkU2l6ZTpMYXlhLlBvaW50ID0gbmV3IExheWEuUG9pbnQoNTEyLCA1MTIpO1xyXG4gICAgLy9cclxuICAgIC8vICAgIC8v56e76Zmk6KKr6Z2e6YCP5piO5Zyw5Z2X6KaG55uW55qE6YOo5YiGXHJcbiAgICAvLyAgICAvL+WmguaenOWcqFRpbGVkIE1hcOS4reayoeacieWvueWbvuWdl+iuvue9rnR5cGXlsZ7mgKfvvIzpgqPkuYjljbPkvr/lvIDlkK/kuoZyZW1vdmVDb3ZlcmVkVGlsZSDvvIzkuZ/mmK/ml6DmlYjnmoTjgILmiYDku6XvvIzlvIDlkK/kuYvliY3vvIzpnIDopoHlhYjlnKhUaWxlZE1hcOe8lui+keWZqOS4re+8jOS4uuWbvuWdl+aWsOWinuiHquWumuS5ieWxnuaAp3R5cGXvvIzlubblsIborr7nva7kuLoxXHJcbiAgICAvLyAgICB0aGlzLnRNYXAucmVtb3ZlQ292ZXJlZFRpbGUgPSB0cnVlO1xyXG4gICAgLy99XHJcblxyXG4gICAgcHJpdmF0ZSB0TWFwOiBMYXlhLlRpbGVkTWFwO1xyXG4gICAgcHJpdmF0ZSBzY2FsZVZhbHVlOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBNYXBYOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBNYXBZOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBtTGFzdE1vdXNlWDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtTGFzdE1vdXNlWTogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUZXN0XzEyX1RpbGVkTWFwXCIpO1xyXG4gICAgICAgIC8v5Yid5aeL5YyW6Iie5Y+wXHJcbiAgICAgICAgTGF5YS5pbml0KExheWEuQnJvd3Nlci53aWR0aCwgTGF5YS5Ccm93c2VyLmhlaWdodCwgTGF5YS5XZWJHTCk7XHJcbiAgICAgICAgLy/liJvlu7pUaWxlZE1hcOWunuS+i1xyXG4gICAgICAgIHRoaXMudE1hcCA9IG5ldyBMYXlhLlRpbGVkTWFwKCk7XHJcbiAgICAgICAgLy/liJvlu7pSZWN0YW5nbGXlrp7kvovvvIzop4blj6PljLrln59cclxuICAgICAgICB2YXIgdmlld1JlY3Q6IExheWEuUmVjdGFuZ2xlID0gbmV3IExheWEuUmVjdGFuZ2xlKCk7XHJcbiAgICAgICAgLy/liJvlu7pUaWxlZE1hcOWcsOWbvu+8jOWKoOi9vW9ydGhvZ29uYWwuanNvbuWQju+8jOaJp+ihjOWbnuiwg+aWueazlW9uTWFwTG9hZGVkKClcclxuICAgICAgICB0aGlzLnRNYXAuY3JlYXRlTWFwKFwicmVzL1RpbGVkTWFwL29ydGhvZ29uYWwuanNvblwiLCB2aWV3UmVjdCwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uTWFwTG9hZGVkKSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uTWFwTG9hZGVkKCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBzcHJpdGUgPSB0aGlzLnRNYXAubWFwU3ByaXRlKCkgYXMgTGF5YS5Ob2RlXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLnRNYXAubWFwU3ByaXRlOlwiICsgKHNwcml0ZSBpbnN0YW5jZW9mIExheWEuU3ByaXRlKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLnRNYXAubWFwU3ByaXRlLnBhcmVudDpcIiArIChzcHJpdGUucGFyZW50IGluc3RhbmNlb2YgTGF5YS5TcHJpdGUpKTtcclxuICAgICAgICBMYXlhLnN0YWdlLnNldENoaWxkSW5kZXgoc3ByaXRlLCAwKVxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uTWFwTG9hZGVkXCIpO1xyXG4gICAgICAgIC8v6K6+572u57yp5pS+5Lit5b+D54K55Li66KeG5Y+j55qE5bem5LiK6KeSXHJcbiAgICAgICAgdGhpcy50TWFwLnNldFZpZXdQb3J0UGl2b3RCeVNjYWxlKDAsIDApO1xyXG4gICAgICAgIC8v5bCG5Y6f5Zyw5Zu+5pS+5aSnM+WAjVxyXG4gICAgICAgIHRoaXMudE1hcC5zY2FsZSA9IDM7XHJcblxyXG4gICAgICAgIExheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5SRVNJWkUsIHRoaXMsIHRoaXMucmVzaXplKTtcclxuICAgICAgICAvL0xheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5NT1VTRV9ET1dOLCB0aGlzLCB0aGlzLm1vdXNlRG93bik7XHJcbiAgICAgICAgLy9MYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuTU9VU0VfVVAsIHRoaXMsIHRoaXMubW91c2VVcCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50LktFWV9ET1dOLCB0aGlzLCB0aGlzLm9uS2V5RG93bilcclxuICAgICAgICB0aGlzLnJlc2l6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZSu55uY5o6n5Yi2XHJcbiAgICAgKiBAcGFyYW0gZSBcclxuICAgICAqL1xyXG4gICAgb25LZXlEb3duKGU6IExheWEuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZS5rZXlDb2RlID09IExheWEuS2V5Ym9hcmQuVVApIHtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT0gTGF5YS5LZXlib2FyZC5ET1dOKSB7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09IExheWEuS2V5Ym9hcmQuTEVGVCkge1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PSBMYXlhLktleWJvYXJkLlJJR0hUKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+WKqOWcsOWbvuinhuWPo1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1vdXNlTW92ZSgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgbW92ZVg6IG51bWJlciA9IHRoaXMuTWFwWCAtIChMYXlhLnN0YWdlLm1vdXNlWCAtIHRoaXMubUxhc3RNb3VzZVgpO1xyXG4gICAgICAgIHZhciBtb3ZlWTogbnVtYmVyID0gdGhpcy5NYXBZIC0gKExheWEuc3RhZ2UubW91c2VZIC0gdGhpcy5tTGFzdE1vdXNlWSlcclxuICAgICAgICAvL+enu+WKqOWcsOWbvuinhuWPo1xyXG4gICAgICAgIHRoaXMudE1hcC5tb3ZlVmlld1BvcnQobW92ZVgsIG1vdmVZKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbW91c2VVcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLk1hcFggPSB0aGlzLk1hcFggLSAoTGF5YS5zdGFnZS5tb3VzZVggLSB0aGlzLm1MYXN0TW91c2VYKTtcclxuICAgICAgICB0aGlzLk1hcFkgPSB0aGlzLk1hcFkgLSAoTGF5YS5zdGFnZS5tb3VzZVkgLSB0aGlzLm1MYXN0TW91c2VZKTtcclxuICAgICAgICBMYXlhLnN0YWdlLm9mZihMYXlhLkV2ZW50Lk1PVVNFX01PVkUsIHRoaXMsIHRoaXMubW91c2VNb3ZlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbW91c2VEb3duKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubUxhc3RNb3VzZVggPSBMYXlhLnN0YWdlLm1vdXNlWDtcclxuICAgICAgICB0aGlzLm1MYXN0TW91c2VZID0gTGF5YS5zdGFnZS5tb3VzZVk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50Lk1PVVNFX01PVkUsIHRoaXMsIHRoaXMubW91c2VNb3ZlKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogIOaUueWPmOinhuWPo+Wkp+Wwj1xyXG4gICAgICogIOmHjeiuvuWcsOWbvuinhuWPo+WMuuWfn1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlc2l6ZSgpOiB2b2lkIHtcclxuICAgICAgICAvL+aUueWPmOinhuWPo+Wkp+Wwj1xyXG4gICAgICAgIHRoaXMudE1hcC5jaGFuZ2VWaWV3UG9ydCh0aGlzLk1hcFgsIHRoaXMuTWFwWSwgTGF5YS5Ccm93c2VyLndpZHRoLCBMYXlhLkJyb3dzZXIuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcblxyXG59IiwiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdF85X1RpbWVMaW5lVUlcclxue1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy/liqDovb3lm77pm4bmiJDlip/lkI7vvIzmiafooYxvbkxvYWTlm57osIPmlrnms5VcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKFwicmVzL2F0bGFzL3Rlc3QuYXRsYXNcIixMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbkxvYWRlZCkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIG9uTG9hZGVkKCk6dm9pZHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWKoOi9veWbvumbhuaIkOWKn+WQju+8jOaJp+ihjG9uTG9hZOWbnuiwg+aWueazlVwiKVxyXG4gICAgICAgIC8v5Yib5bu65LiA5LiqVUnlrp7kvotcclxuICAgICAgICAvL3ZhciBwbGFuOlRpbWVMaW5lVUkgPSBuZXcgVGltZUxpbmVVSSgpXHJcbiAgICAgICAgLy/mt7vliqDliLDoiJ7lj7BcclxuICAgICAgICAvL0xheWEuc3RhZ2UuYWRkQ2hpbGQocGxhbik7XHJcbiAgICAgICAgLy/mkq3mlL5VSeWcuuaZr+S4reeahOWKqOeUu1xyXG4gICAgICAgIC8vdGhpcy5iZWFyLnBsYXkoKTtcclxuICAgIH1cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xuaW1wb3J0IFZpZXc9TGF5YS5WaWV3O1xyXG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xyXG5pbXBvcnQgU2NlbmU9TGF5YS5TY2VuZTtcbnZhciBSRUc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xuZXhwb3J0IG1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgTWFpblVJIGV4dGVuZHMgVmlldyB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIk1haW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuTWFpblVJXCIsTWFpblVJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBUZXN0VUkgZXh0ZW5kcyBWaWV3IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiVGVzdFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5UZXN0VUlcIixUZXN0VUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIFRlc3QxVUkgZXh0ZW5kcyBWaWV3IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiVGVzdDFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuVGVzdDFVSVwiLFRlc3QxVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbWVMaW5lVUkgZXh0ZW5kcyBEaWFsb2cge1xyXG5cdFx0cHVibGljIGJlYXI6TGF5YS5BbmltYXRpb247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJUaW1lTGluZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5UaW1lTGluZVVJXCIsVGltZUxpbmVVSSk7XHJcbn1cclxuZXhwb3J0IG1vZHVsZSB1aS5VSV9Mb2FkaW5nIHtcclxuICAgIGV4cG9ydCBjbGFzcyBVSV9Mb2FkaW5nVUkgZXh0ZW5kcyBWaWV3IHtcclxuXHRcdHB1YmxpYyBhbmkxOkxheWEuRnJhbWVBbmltYXRpb247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJVSV9Mb2FkaW5nL1VJX0xvYWRpbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuVUlfTG9hZGluZy5VSV9Mb2FkaW5nVUlcIixVSV9Mb2FkaW5nVUkpO1xyXG59XHIiXX0=
