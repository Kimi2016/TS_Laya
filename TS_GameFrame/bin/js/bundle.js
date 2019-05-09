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
var Test_14_Shader_1 = require("./study/Test_14_Shader");
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
        new Test_14_Shader_1.default();
    };
    return AppMain;
}());
//激活启动类
new AppMain();
},{"./GameConfig":7,"./study/Test_12_TiledMap":9,"./study/Test_14_Shader":10}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetEventDispatcher = /** @class */ (function () {
    function NetEventDispatcher() {
        this.messageHandlers = {};
    }
    NetEventDispatcher.getInstance = function () {
        return this.instance || (this.instance = new this());
    };
    NetEventDispatcher.prototype.registerMessage = function (messageID, fun) {
        var funs = this.messageHandlers[messageID];
        if (!funs) {
            funs = new Array();
            this.messageHandlers[messageID] = funs;
        }
        funs.push(fun);
    };
    NetEventDispatcher.prototype.unRegisterMessage = function (messageID, fun) {
        var funs = this.messageHandlers[messageID];
        if (funs) {
            var index = funs.indexOf(fun);
            funs.splice(index, 1);
        }
    };
    NetEventDispatcher.prototype.dispatchMessage = function (messageID, netPackage) {
        var funs = this.messageHandlers[messageID];
        if (funs) {
            funs.forEach(function (element) {
                element.call(element, netPackage);
            });
        }
    };
    NetEventDispatcher.prototype.ClearAll = function () {
        this.messageHandlers = {};
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
var GameMessageName = /** @class */ (function () {
    function GameMessageName() {
    }
    GameMessageName.getMap = function () {
        if (GameMessageName.isInit) {
            return GameMessageName.messageMap;
        }
        GameMessageName.isInit = true;
        //MessageName
        var map = GameMessageName.messageMap;
        map[210 /* GM_VERIFY_VERSION */] = 'GM_VerifyVersion';
        map[211 /* GM_VERSION_RETURN */] = 'GM_VerifyVersionReturn';
        return map;
    };
    GameMessageName.messageMap = {};
    GameMessageName.isInit = false;
    return GameMessageName;
}());
exports.default = GameMessageName;
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
var GameMessageName_1 = require("./GameMessageName");
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
        this.tips = tips;
        this.sendBytes = new Laya.Byte();
        this.sendBytes.endian = Laya.Byte.LITTLE_ENDIAN; //这里我们采用小端
        this.tempBytes = new Laya.Byte();
        this.tempBytes.endian = Laya.Byte.LITTLE_ENDIAN; //这里我们采用小端
        //this.sendNetPacket = new Array<NetPacket>() //发送的网络包
        //this.receiveNetPacket = new Array<NetPacket>() //接收的网络包
        this.protoRoot = Laya.Browser.window["PBMessage"];
        this.pbMessageName = GameMessageName_1.default.getMap();
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
    };
    //关闭连接事件
    SocketConnect.prototype.closeHandler = function (event) {
        if (event === void 0) { event = null; }
        console.log(this.url + this.tips + " 关闭连接事件");
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
        NetEventDispatcher_1.default.getInstance().dispatchMessage(netPacket.messageId, netPacket);
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
},{"../Event/NetEventDispatcher":2,"./GameMessageName":3,"./NetPacket":4,"./NetworkManager":5}],7:[function(require,module,exports){
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
        NetEventDispatcher_1.default.getInstance().registerMessage(211 /* GM_VERSION_RETURN */, this.GM_VerifyVersionReturn); //
    };
    MainUI.prototype.onDisable = function () {
        console.log("MainUI.onDisable");
        NetEventDispatcher_1.default.getInstance().unRegisterMessage(211 /* GM_VERSION_RETURN */, this.GM_VerifyVersionReturn); //
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
},{"../Framework/Event/NetEventDispatcher":2,"../Framework/Network/NetworkManager":5,"../ui/layaMaxUI":12}],9:[function(require,module,exports){
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
var myShaderValue = /** @class */ (function (_super) {
    __extends(myShaderValue, _super);
    function myShaderValue() {
        var _this = _super.call(this, 0, 0) || this;
        var _vlen = 8 * Laya.CONST3D2D.BYTES_PE;
        //设置在shader程序文件里定义的属性相关描述：【属性长度，属性类型，false，属性起始位置索引*CONST3D2D.BYTES_PE】
        _this.position = [2, Laya.WebGLContext.FLOAT, false, _vlen, 0];
        _this.texcoord = [2, Laya.WebGLContext.FLOAT, false, _vlen, 2 * Laya.CONST3D2D.BYTES_PE];
        _this.color = [4, Laya.WebGLContext.FLOAT, false, _vlen, 4 * Laya.CONST3D2D.BYTES_PE];
        return _this;
    }
    return myShaderValue;
}(Laya.Value2D));
/*
自定义着色器
*/
var myShader = /** @class */ (function (_super) {
    __extends(myShader, _super);
    function myShader() {
        var _this = this;
        //顶点着色器程序和片元着色器程序。
        var vs = "attribute vec2 position;attribute vec2 texcoord;attribute vec4 color;uniform vec2 size;uniform mat4 mmat;varying vec2 v_texcoord;varying vec4 v_color;void main(){vec4 pos =mmat*vec4(position.x,position.y,0,1);gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);v_color = color;v_texcoord = texcoord;}";
        var ps = "precision mediump float;varying vec2 v_texcoord;varying vec4 v_color;uniform sampler2D texture;void main(){vec4 t_color = texture2D(texture, v_texcoord);gl_FragColor = t_color.rgba * v_color.rgba;}";
        _this = _super.call(this, vs, ps, "myShader") || this;
        return _this;
    }
    /**
     *当前着色器的一个实例对象
     */
    myShader.shader = new myShader();
    return myShader;
}(Laya.Shader));
var myShaderSprite = /** @class */ (function (_super) {
    __extends(myShaderSprite, _super);
    function myShaderSprite() {
        var _this = _super.call(this) || this;
        _this.iNum = 0;
        return _this;
    }
    /*
    初始化此类
    texture 纹理对象
    vb 顶点数组
    ib 顶点索引数组
    */
    myShaderSprite.prototype.init = function (texture, vb, ib) {
        if (vb === void 0) { vb = null; }
        if (ib === void 0) { ib = null; }
        this.vBuffer = Laya.VertexBuffer2D.create();
        this.iBuffer = Laya.IndexBuffer2D.create();
        this.ibData = new Uint16Array([]);
        var vbArray;
        var ibArray;
        if (vb) {
            vbArray = vb;
        }
        else {
            vbArray = [];
            var texWidth = texture.width;
            var texHeight = texture.height;
            //定义颜色值，取值范围0~1浮点
            var red = 1;
            var greed = 1;
            var blue = 1;
            var alpha = 1;
            //在顶点数组中放入4个顶点
            //每个顶点的数据：（坐标x，坐标y，u，v，R,G,B,A）
            vbArray.push(0, 0, 0, 0, red, greed, blue, alpha);
            vbArray.push(texWidth, 0, 1, 0, red, greed, blue, alpha);
            vbArray.push(texWidth, texHeight, 1, 1, red, greed, blue, alpha);
            vbArray.push(0, texHeight, 0, 1, red, greed, blue, alpha);
        }
        if (ib) {
            ibArray = ib;
        }
        else {
            ibArray = [];
            //在顶点索引数组中放入组成三角形的顶点索引
            //三角形的顶点索引对应顶点数组vbArray里的点索引，索引从0开始
            ibArray.push(0, 1, 3); //从第一个三角形的顶点索引
            //ibArray.push(3,1,2);第二个三角形的顶点索引
        }
        this.iNum = ibArray.length;
        this.vbData = new Float32Array(vbArray);
        this.ibData = new Uint16Array(ibArray);
        this.vBuffer.append(this.vbData);
        this.iBuffer.append(this.ibData);
        this.shaderValue = new myShaderValue();
        this.shaderValue.textureHost = texture;
        //this._renderType |= Laya.RenderSprite.CUSTOM;//设置当前显示对象的渲染模式为自定义渲染模式
    };
    //重写渲染函数
    myShaderSprite.prototype.customRender = function (context, x, y) {
        //context:Laya.RenderContext
        console.log(context);
        context.ctx.drawMesh(x, y, this.iBuffer, this.vBuffer, this.iNum, null, myShader.shader, this.shaderValue, 0);
    };
    return myShaderSprite;
}(Laya.Script));
var Test_14_Shader = /** @class */ (function () {
    function Test_14_Shader() {
        //加载一张图片
        Laya.loader.load("res/texture.png", Laya.Handler.create(this, this.loadComplete));
    }
    Test_14_Shader.prototype.loadComplete = function () {
        var texture = Laya.Loader.getRes("res/atlas/comp.png");
        var spe = new myShaderSprite();
        spe.init(texture);
        spe.pos(50, 50);
        Laya.stage.addChild(spe);
    };
    return Test_14_Shader;
}());
exports.default = Test_14_Shader;
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkc6L0xheWEvTGF5YUFpcklERV9iZXRhL3Jlc291cmNlcy9hcHAvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9BcHBNYWluLnRzIiwic3JjL0ZyYW1ld29yay9FdmVudC9OZXRFdmVudERpc3BhdGNoZXIudHMiLCJzcmMvRnJhbWV3b3JrL05ldHdvcmsvR2FtZU1lc3NhZ2VOYW1lLnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL05ldFBhY2tldC50cyIsInNyYy9GcmFtZXdvcmsvTmV0d29yay9OZXR3b3JrTWFuYWdlci50cyIsInNyYy9GcmFtZXdvcmsvTmV0d29yay9Tb2NrZXRDb25uZWN0LnRzIiwic3JjL0dhbWVDb25maWcudHMiLCJzcmMvc2NyaXB0L01haW5VSS50cyIsInNyYy9zdHVkeS9UZXN0XzEyX1RpbGVkTWFwLnRzIiwic3JjL3N0dWR5L1Rlc3RfMTRfU2hhZGVyLnRzIiwic3JjL3N0dWR5L1Rlc3RfOV9UaW1lTGluZVVJLnRzIiwic3JjL3VpL2xheWFNYXhVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNWQSxJQUFPLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQzdCLElBQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7QUFDekIsSUFBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtBQWtCekIsMkNBQXNDO0FBS3RDLDZEQUF3RDtBQUV4RCx5REFBb0Q7QUFFcEQsS0FBSztBQUNMO0lBQ0k7UUFDSSxnQkFBZ0I7UUFDaEIsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBVSxDQUFDLEtBQUssRUFBRSxvQkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3BEO2FBQ0k7WUFDRCx1QkFBdUI7WUFDdkIs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LFdBQWMsRUFBRTtJQUNaO1FBQWlDLCtCQUFLO1FBQ2xDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixvQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQ0wsa0JBQUM7SUFBRCxDQU5BLEFBTUMsQ0FOZ0MsS0FBSyxHQU1yQztJQU5ZLGNBQVcsY0FNdkIsQ0FBQTtJQUNELEdBQUcsQ0FBQyxnQkFBZ0IsRUFBQyxXQUFXLENBQUMsQ0FBQztJQUNsQztRQUFnQyw4QkFBTTtRQUVsQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsbUNBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FQQSxBQU9DLENBUCtCLE1BQU0sR0FPckM7SUFQWSxhQUFVLGFBT3RCLENBQUE7SUFDRCxHQUFHLENBQUMsZUFBZSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BDLENBQUMsRUFsQmEsRUFBRSxHQUFGLFVBQUUsS0FBRixVQUFFLFFBa0JmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBCcm93c2VyID0gTGF5YS5Ccm93c2VyXHJcbmltcG9ydCBXZWJHTCA9IExheWEuV2ViR0xcclxuaW1wb3J0IFN0YWdlID0gTGF5YS5TdGFnZVxyXG5cclxuaW1wb3J0IFRlc3RfMV9UZXh0IGZyb20gJy4vc3R1ZHkvVGVzdF8xX1RleHQnO1xyXG5pbXBvcnQgVGVzdF8yX0lucHV0VGVzdCBmcm9tICcuL3N0dWR5L1Rlc3RfMl9JbnB1dFRlc3QnO1xyXG5pbXBvcnQgVGVzdF8zX0JpdG1hcEZvbnQgZnJvbSAnLi9zdHVkeS9UZXN0XzNfQml0bWFwRm9udCc7XHJcbmltcG9ydCBUZXN0XzRfMV9TcHJpdGVfRGlzcGxheUltYWdlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSc7XHJcbmltcG9ydCBUZXN0XzRfMV9TcHJpdGVfU3dpdGNoVGV4dHVyZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8xX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlJztcclxuaW1wb3J0IFRlc3RfNF8yX1Nwcml0ZV9EaXNwbGF5SW1hZ2UgZnJvbSAnLi9zdHVkeS9UZXN0XzRfMl9TcHJpdGVfRGlzcGxheUltYWdlJztcclxuaW1wb3J0IFRlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzJfU3ByaXRlX1N3aXRjaFRleHR1cmUnO1xyXG5pbXBvcnQgVGVzdF80X01hc2tEZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF80X01hc2tEZW1vJztcclxuaW1wb3J0IFRlc3RfNV8xX0NvbG9yRmlsdGVyIGZyb20gJy4vc3R1ZHkvVGVzdF81XzFfQ29sb3JGaWx0ZXInO1xyXG5pbXBvcnQgVGVzdF81XzJfR2xvd0ZpbHRlciBmcm9tICcuL3N0dWR5L1Rlc3RfNV8yX0dsb3dGaWx0ZXInO1xyXG5pbXBvcnQgVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMgZnJvbSAnLi9zdHVkeS9UZXN0XzZfMV9TcHJpdGVfRHJhd1NoYXBlcyc7XHJcbmltcG9ydCBUZXN0XzdfQXRsYXNBbmlEZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF83X0F0bGFzQW5pRGVtbyc7XHJcbmltcG9ydCBUZXN0XzhfVHdlZW5EZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF84X1R3ZWVuRGVtbyc7XHJcbmltcG9ydCBUZXN0XzlfVGltZUxpbmUgZnJvbSAnLi9zdHVkeS9UZXN0XzlfVGltZUxpbmUnO1xyXG5pbXBvcnQgVGVzdF85X1RpbWVMaW5lVUkgZnJvbSAnLi9zdHVkeS9UZXN0XzlfVGltZUxpbmVVSSc7XHJcbmltcG9ydCBUZXN0XzExX1NvdW5kIGZyb20gJy4vc3R1ZHkvVGVzdF8xMV9Tb3VuZCc7XHJcbmltcG9ydCBHYW1lQ29uZmlnIGZyb20gJy4vR2FtZUNvbmZpZyc7XHJcbmltcG9ydCBUZXN0XzBfMV9DaGFubmVsIGZyb20gJy4vc3R1ZHkvVGVzdF8wXzFfQ2hhbm5lbCc7XHJcbmltcG9ydCBUZXN0XzBfMV9Tb2NrZXQgZnJvbSAnLi9zdHVkeS9UZXN0XzBfMV9Tb2NrZXQnO1xyXG5pbXBvcnQgVGVzdF8wX05ldHdvcmtfUHJvdG9jb2xCdWZmZXIgZnJvbSAnLi9zdHVkeS9UZXN0XzBfTmV0d29ya19Qcm90b2NvbEJ1ZmZlcic7XHJcbmltcG9ydCBOZXR3b3JrTWFuYWdlciBmcm9tICcuL0ZyYW1ld29yay9OZXR3b3JrL05ldHdvcmtNYW5hZ2VyJztcclxuaW1wb3J0IFRlc3RfMTJfVGlsZWRNYXAgZnJvbSAnLi9zdHVkeS9UZXN0XzEyX1RpbGVkTWFwJztcclxuaW1wb3J0IFRlc3RfMTNfRG9tRWxlbWVudCBmcm9tICcuL3N0dWR5L1Rlc3RfMTNfRG9tRWxlbWVudCc7XHJcbmltcG9ydCBUZXN0XzE0X1NoYWRlciBmcm9tICcuL3N0dWR5L1Rlc3RfMTRfU2hhZGVyJztcclxuXHJcbi8v5ZCv5Yqo57G7XHJcbmNsYXNzIEFwcE1haW4ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy/moLnmja5JREXorr7nva7liJ3lp4vljJblvJXmk45cdFx0XHJcbiAgICAgICAgaWYgKHdpbmRvd1tcIkxheWEzRFwiXSkge1xyXG4gICAgICAgICAgICBMYXlhM0QuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDkuI3mlK/mjIFXZWJHTOaXtuiHquWKqOWIh+aNouiHs0NhbnZhc1xyXG4gICAgICAgICAgICBMYXlhLmluaXQoQnJvd3Nlci5jbGllbnRXaWR0aCwgQnJvd3Nlci5jbGllbnRIZWlnaHQsIFdlYkdMKTtcclxuICAgICAgICAgICAgLy9MYXlhLmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQsIExheWFbXCJXZWJHTFwiXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExheWFbXCJQaHlzaWNzXCJdICYmIExheWFbXCJQaHlzaWNzXCJdLmVuYWJsZSgpO1xyXG4gICAgICAgIExheWFbXCJEZWJ1Z1BhbmVsXCJdICYmIExheWFbXCJEZWJ1Z1BhbmVsXCJdLmVuYWJsZSgpO1xyXG5cclxuXHJcbiAgICAgICAgLy/miZPlvIDosIPor5XpnaLmnb/vvIjpgJrov4dJREXorr7nva7osIPor5XmqKHlvI/vvIzmiJbogIV1cmzlnLDlnYDlop7liqBkZWJ1Zz10cnVl5Y+C5pWw77yM5Z2H5Y+v5omT5byA6LCD6K+V6Z2i5p2/77yJXHJcbiAgICAgICAgaWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuICAgICAgICBpZiAoR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgJiYgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0pIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdLmVuYWJsZSgpO1xyXG4gICAgICAgIGlmIChHYW1lQ29uZmlnLnN0YXQpIExheWEuU3RhdC5zaG93KCk7XHJcblxyXG4gICAgICAgIC8v6KGo56S65piv5ZCm5o2V6I635YWo5bGA6ZSZ6K+v5bm25by55Ye65o+Q56S644CCXHJcbiAgICAgICAgTGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy/mv4DmtLvotYTmupDniYjmnKzmjqfliLbvvIx2ZXJzaW9uLmpzb27nlLFJREXlj5HluIPlip/og73oh6rliqjnlJ/miJDvvIzlpoLmnpzmsqHmnInkuZ/kuI3lvbHlk43lkI7nu63mtYHnqItcclxuICAgICAgICBMYXlhLlJlc291cmNlVmVyc2lvbi5lbmFibGUoXCJ2ZXJzaW9uLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uVmVyc2lvbkxvYWRlZCksIExheWEuUmVzb3VyY2VWZXJzaW9uLkZJTEVOQU1FX1ZFUlNJT04pO1xyXG5cclxuXHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnblYgPSBTdGFnZS5BTElHTl9NSURETEU7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnbkggPSBTdGFnZS5BTElHTl9DRU5URVI7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBHYW1lQ29uZmlnLnNjYWxlTW9kZTsvL1N0YWdlLlNDQUxFX0ZVTEw7Ly9TQ0FMRV9GSVhFRF9IRUlHSFRcclxuICAgICAgICBMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBHYW1lQ29uZmlnLnNjcmVlbk1vZGU7Ly9TdGFnZS5TQ1JFRU5fSE9SSVpPTlRBTDsvL1NDUkVFTl9WRVJUSUNBTFxyXG4gICAgICAgIExheWEuc3RhZ2UuYmdDb2xvciA9IFwiIzdmN2Y3ZlwiO1xyXG5cclxuICAgICAgICAvL+WFvOWuueW+ruS/oeS4jeaUr+aMgeWKoOi9vXNjZW5l5ZCO57yA5Zy65pmvXHJcbiAgICAgICAgTGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuICAgICAgICAvL+WmguaenOmAmui/h+iuvuWkh+mdmemfs+mUruiuqemfs+mikeiHquWKqOi3n+maj+iuvuWkh+mdmemfs+OAgumcgOimgeWwhnVzZUF1ZGlvTXVzaWPorr7nva7kuLpmYWxzZeOAglxyXG4gICAgICAgIExheWEuU291bmRNYW5hZ2VyLnVzZUF1ZGlvTXVzaWMgPSBmYWxzZTtcclxuICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5hdXRvU3RvcE11c2ljID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8v5raI6Zmk55+i6YeP57uY5Yi255qE6ZSv6b2/77yM5L2G5Lya5aKe5Yqg5oCn6IO95raI6ICXXHJcbiAgICAgICAgLy9Db25maWcuaXNBbnRpYWxpYXM9dHJ1ZTtcclxuXHJcbiAgICAgICAgLy/plIDmr4HlvZPliY3msqHmnInooqvkvb/nlKjnmoTotYTmupAs6K+l5Ye95pWw5Lya5b+955WlbG9jaz10cnVl55qE6LWE5rqQ44CCXHJcbiAgICAgICAgLy9MYXlhLlJlc291cmNlLmRlc3Ryb3lVbnVzZWRSZXNvdXJjZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblZlcnNpb25Mb2FkZWQoKTogdm9pZCB7XHJcbiAgICAgICAgLy/mv4DmtLvlpKflsI/lm77mmKDlsITvvIzliqDovb3lsI/lm77nmoTml7blgJnvvIzlpoLmnpzlj5HnjrDlsI/lm77lnKjlpKflm77lkIjpm4bph4zpnaLvvIzliJnkvJjlhYjliqDovb3lpKflm77lkIjpm4bvvIzogIzkuI3mmK/lsI/lm75cclxuICAgICAgICBMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29uZmlnTG9hZGVkKCk6IHZvaWQge1xyXG4gICAgICAgIC8v5Yqg6L29SURF5oyH5a6a55qE5Zy65pmvXHJcbiAgICAgICAgR2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUpO1xyXG5cclxuICAgICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXR1cCgpOiB2b2lkIHtcclxuICAgICAgICAvL25ldyBUZXN0XzFfVGV4dCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMl9JbnB1dFRlc3QoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzNfQml0bWFwRm9udCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8xX1Nwcml0ZV9EaXNwbGF5SW1hZ2UoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzRfMV9TcHJpdGVfU3dpdGNoVGV4dHVyZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8yX1Nwcml0ZV9EaXNwbGF5SW1hZ2UoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzRfMl9TcHJpdGVfU3dpdGNoVGV4dHVyZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF9NYXNrRGVtbygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNV8xX0NvbG9yRmlsdGVyKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF81XzJfR2xvd0ZpbHRlcigpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNl8xX1Nwcml0ZV9EcmF3U2hhcGVzKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF83X0F0bGFzQW5pRGVtbygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfOF9Ud2VlbkRlbW8oKTtcclxuICAgICAgICAvL25ldyBUZXN0XzlfVGltZUxpbmUoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzlfVGltZUxpbmVVSSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMTFfU291bmQoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzBfMV9Tb2NrZXQoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzBfTmV0d29ya19Qcm90b2NvbEJ1ZmZlcigpO1xyXG4gICAgICAgIG5ldyBUZXN0XzEyX1RpbGVkTWFwKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8xM19Eb21FbGVtZW50KCk7XHJcbiAgICAgICAgbmV3IFRlc3RfMTRfU2hhZGVyKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBBcHBNYWluKCk7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0RXZlbnREaXNwYXRjaGVyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBOZXRFdmVudERpc3BhdGNoZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IE5ldEV2ZW50RGlzcGF0Y2hlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2UgfHwgKHRoaXMuaW5zdGFuY2UgPSBuZXcgdGhpcygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VIYW5kbGVyczogeyBbaW5kZXg6IG51bWJlcl06IEZ1bmN0aW9uW107IH0gPSB7fVxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJNZXNzYWdlKG1lc3NhZ2VJRDogbnVtYmVyLCBmdW46IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGZ1bnM6IEFycmF5PEZ1bmN0aW9uPiA9IHRoaXMubWVzc2FnZUhhbmRsZXJzW21lc3NhZ2VJRF07XHJcbiAgICAgICAgaWYgKCFmdW5zKSB7XHJcbiAgICAgICAgICAgIGZ1bnMgPSBuZXcgQXJyYXk8RnVuY3Rpb24+KCk7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUhhbmRsZXJzW21lc3NhZ2VJRF0gPSBmdW5zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5zLnB1c2goZnVuKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB1blJlZ2lzdGVyTWVzc2FnZShtZXNzYWdlSUQ6IG51bWJlciwgZnVuOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHZhciBmdW5zOiBBcnJheTxGdW5jdGlvbj4gPSB0aGlzLm1lc3NhZ2VIYW5kbGVyc1ttZXNzYWdlSURdO1xyXG4gICAgICAgIGlmIChmdW5zKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleDogbnVtYmVyID0gZnVucy5pbmRleE9mKGZ1bik7XHJcbiAgICAgICAgICAgIGZ1bnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGlzcGF0Y2hNZXNzYWdlKG1lc3NhZ2VJRDogbnVtYmVyLCBuZXRQYWNrYWdlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB2YXIgZnVuczogQXJyYXk8RnVuY3Rpb24+ID0gdGhpcy5tZXNzYWdlSGFuZGxlcnNbbWVzc2FnZUlEXTtcclxuICAgICAgICBpZiAoZnVucykge1xyXG4gICAgICAgICAgICBmdW5zLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNhbGwoZWxlbWVudCwgbmV0UGFja2FnZSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIENsZWFyQWxsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWVzc2FnZUhhbmRsZXJzID0ge31cclxuICAgIH1cclxufSIsIlxyXG4vKipcclxuICogUHJvdG9idWYg5raI5oGv5ZCN56ew5Yy56YWNXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWVzc2FnZU5hbWUge1xyXG4gICAgc3RhdGljIG1lc3NhZ2VNYXAgPSB7fVxyXG4gICAgc3RhdGljIGlzSW5pdCA9IGZhbHNlXHJcbiAgICBzdGF0aWMgZ2V0TWFwKCk6IGFueSB7XHJcbiAgICAgICAgaWYgKEdhbWVNZXNzYWdlTmFtZS5pc0luaXQpe1xyXG4gICAgICAgICAgICByZXR1cm4gR2FtZU1lc3NhZ2VOYW1lLm1lc3NhZ2VNYXBcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1lc3NhZ2VOYW1lLmlzSW5pdCA9IHRydWVcclxuXHJcbiAgICAgICAgLy9NZXNzYWdlTmFtZVxyXG4gICAgICAgIGxldCBtYXAgPSBHYW1lTWVzc2FnZU5hbWUubWVzc2FnZU1hcFxyXG5cclxuICAgICAgICBtYXBbR2FtZU1lc3NhZ2UuR01fVkVSSUZZX1ZFUlNJT05dPSdHTV9WZXJpZnlWZXJzaW9uJztcclxuICAgICAgICBtYXBbR2FtZU1lc3NhZ2UuR01fVkVSU0lPTl9SRVRVUk5dPSdHTV9WZXJpZnlWZXJzaW9uUmV0dXJuJztcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hcFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJ5dGUgPSBMYXlhLkJ5dGVcclxuaW1wb3J0IFNvY2tldENvbm5lY3QgZnJvbSBcIi4vU29ja2V0Q29ubmVjdFwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ldFBhY2tldCB7XHJcbiAgICAvL3ByaXZhdGUgV0VCUEFDS19IRUFEX09GRlNFVDogbnVtYmVyID0gMFx0Ly8g6Ieq5a6a5LmJ5pWw5o2uIOS4gOiIrOaYr3JvbGVpZCAobG9uZ+exu+WeiylcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX01FU1NTQUdFSURfT0ZGU0VUOiBudW1iZXIgPSA4XHQvLyDmtojmga9pZFxyXG4gICAgLy9wcml2YXRlIFdFQlBBQ0tfTEVOR1RIX09GRlNFVDogbnVtYmVyID0gMTJcdC8vIOa2iOaBr+mVv+W6plxyXG4gICAgcHVibGljIFdFQlBBQ0tfSEVBRF9TSVpFOiBudW1iZXIgPSAxNlx0Ly8g5raI5oGv5pWw5o2u5byA5aeL5L2N572uXHJcblxyXG4gICAgcHVibGljIHJvbGVJZDogbnVtYmVyXHJcbiAgICBwdWJsaWMgbWVzc2FnZUlkOiBudW1iZXJcclxuICAgIHB1YmxpYyBtZXNzYWdlOiBhbnlcclxuXHJcbiAgICBwcml2YXRlIHJlYWRCeXRlczogQnl0ZVxyXG4gICAgcHJpdmF0ZSBzb2NrZXRDb25uZWN0OiBTb2NrZXRDb25uZWN0XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29ubmVjdDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0ID0gY29ubmVjdFxyXG4gICAgICAgIHRoaXMucmVhZEJ5dGVzID0gbmV3IEJ5dGUoKVxyXG4gICAgICAgIHRoaXMucmVhZEJ5dGVzLmVuZGlhbiA9IExheWEuQnl0ZS5MSVRUTEVfRU5ESUFOLy/ov5nph4zmiJHku6zph4fnlKjlsI/nq69cclxuICAgIH1cclxuXHJcbiAgICAvL+aOpeaUtuacjeWKoeWZqOS/oeaBr1xyXG4gICAgcHVibGljIHJlY2VpdmVNc2coYnl0ZXM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVhZEJ5dGVzLndyaXRlQXJyYXlCdWZmZXIoYnl0ZXMpXHJcbiAgICAgICAgdGhpcy5yZWFkQnl0ZXMucG9zID0gMC8v6K6+572u5YGP56e75oyH6ZKIXHJcblxyXG4gICAgICAgIC8v5oyJ54Wn5pyN5Yqh5Zmo5Lyg6YCS6L+H5p2l55qE5pWw5o2u77yM5oyJ54Wn6aG65bqP6K+75Y+WXHJcbiAgICAgICAgdGhpcy5yb2xlSWQgPSB0aGlzLnJlYWRCeXRlcy5nZXRGbG9hdDY0KClcclxuICAgICAgICB0aGlzLm1lc3NhZ2VJZCA9IHRoaXMucmVhZEJ5dGVzLmdldEludDMyKClcclxuICAgICAgICBsZXQgbXNnTGVuZ3RoID0gdGhpcy5yZWFkQnl0ZXMuZ2V0SW50MzIoKVxyXG4gICAgICAgIC8vbGV0IGFiID0gdGhpcy5yZWFkQnl0ZXMucmVhZEFycmF5QnVmZmVyKG1zZ0xlbmd0aCAtIHRoaXMuV0VCUEFDS19IRUFEX1NJWkUpXHJcbiAgICAgICAgLy9sZXQgYnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoYWIpXHJcbiAgICAgICAgLy90aGlzLm1lc3NhZ2UgPSB0aGlzLnNvY2tldENvbm5lY3QuZGVzZXJpYWxpemUodGhpcy5tZXNzYWdlSWQsIGJ1ZmZlcilcclxuICAgICAgICBsZXQgdWludDhBcnJheSA9IHRoaXMucmVhZEJ5dGVzLnJlYWRVaW50OEFycmF5KHRoaXMuV0VCUEFDS19IRUFEX1NJWkUsIG1zZ0xlbmd0aCAtIHRoaXMuV0VCUEFDS19IRUFEX1NJWkUpXHJcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gdGhpcy5zb2NrZXRDb25uZWN0LmRlc2VyaWFsaXplKHRoaXMubWVzc2FnZUlkLCB1aW50OEFycmF5KVxyXG5cclxuICAgICAgICAvL2lmIChtc2dMZW5ndGggIT0gdGhpcy5yZWFkQnl0ZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5lcnJvcihcIua2iOaBr+mVv+S4jeS4gOagt1wiKVxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICB0aGlzLnJlYWRCeXRlcy5jbGVhcigpXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgU29ja2V0Q29ubmVjdCBmcm9tIFwiLi9Tb2NrZXRDb25uZWN0XCI7XHJcblxyXG5jbGFzcyBHYW1lQ2xpZW50IHtcclxuICAgIHByaXZhdGUgY2xpZW50SWQ6IENsaWVudElEO1xyXG4gICAgcHJpdmF0ZSBzb2NrZXRDb25uZWN0OiBTb2NrZXRDb25uZWN0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBDbGllbnRJRCkge1xyXG4gICAgICAgIHRoaXMuY2xpZW50SWQgPSBpZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29ubmVjdChob3N0OiBzdHJpbmcsIHBvcnQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdCA9IG5ldyBTb2NrZXRDb25uZWN0KFwiIGNsaWVudElkOlwiICsgdGhpcy5jbGllbnRJZCk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LmNvbm5lY3QoaG9zdCwgcG9ydCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbm5lY3RCeVVybCh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdCA9IG5ldyBTb2NrZXRDb25uZWN0KFwiIGNsaWVudElkOlwiICsgdGhpcy5jbGllbnRJZCk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LmNvbm5lY3RCeVVybCh1cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWNvbm5lY3QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LnJlY29ubmVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNjb25uZWN0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LmRpc2Nvbm5lY3RlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0Nvbm5lY3RlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zb2NrZXRDb25uZWN0LmNvbm5lY3RlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kRW1wdHkobXNnSWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5zZW5kRW1wdHkobXNnSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kTWVzc2FnZShtc2dJZDogbnVtYmVyLCBtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5zZW5kTWVzc2FnZShtc2dJZCwgbXNnKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ldHdvcmtNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBOZXR3b3JrTWFuYWdlcjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IE5ldHdvcmtNYW5hZ2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZSB8fCAodGhpcy5pbnN0YW5jZSA9IG5ldyB0aGlzKCkpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnYW1lQ2xpZW50TWFwOiB7IFtpbmRleDogbnVtYmVyXTogR2FtZUNsaWVudDsgfSA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluinkuiJsklEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRSb2xlSWQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5wb3coMiwgNTMpIC0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlQ2xpZW50KGNsaWVudElEOiBudW1iZXIsIHVybDogc3RyaW5nKTogR2FtZUNsaWVudCB7XHJcbiAgICAgICAgdmFyIGNsaWVudDogR2FtZUNsaWVudCA9IG5ldyBHYW1lQ2xpZW50KGNsaWVudElEKTtcclxuICAgICAgICBjbGllbnQuY29ubmVjdEJ5VXJsKHVybCk7XHJcbiAgICAgICAgdGhpcy5nYW1lQ2xpZW50TWFwW0NsaWVudElELmxvZ2luXSA9IGNsaWVudDtcclxuICAgICAgICByZXR1cm4gY2xpZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDbGllbnQoY2xpZW50SUQ6IENsaWVudElEKTogR2FtZUNsaWVudCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZUNsaWVudE1hcFtjbGllbnRJRF0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nYW1lQ2xpZW50TWFwW2NsaWVudElEXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlQ2xpZW50KGNsaWVudElEOiBDbGllbnRJRCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGllbnQ6IEdhbWVDbGllbnQgPSB0aGlzLmdldENsaWVudChDbGllbnRJRC5sb2dpbilcclxuICAgICAgICBpZiAoY2xpZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5kaXNjb25uZWN0ZWQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVjb25uZWN0Q2xpZW50KGNsaWVudElEOiBDbGllbnRJRCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGllbnQ6IEdhbWVDbGllbnQgPSB0aGlzLmdldENsaWVudChDbGllbnRJRC5sb2dpbilcclxuICAgICAgICBpZiAoY2xpZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5yZWNvbm5lY3QoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naW5TZW5kTWVzc2FnZShtc2dJZDogbnVtYmVyLCBtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UobXNnSWQsIG1zZywgQ2xpZW50SUQubG9naW4pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ2ljU2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgbXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKG1zZ0lkLCBtc2csIENsaWVudElELmxvZ2ljKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzY2VuZVNlbmRNZXNzYWdlKG1zZ0lkOiBudW1iZXIsIG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShtc2dJZCwgbXNnLCBDbGllbnRJRC5zY2VuZSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRNZXNzYWdlKG1zZ0lkOiBudW1iZXIsIG1zZzogYW55LCBjbGllbnRJRDogQ2xpZW50SUQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2xpZW50OiBHYW1lQ2xpZW50ID0gdGhpcy5nZXRDbGllbnQoY2xpZW50SUQpXHJcbiAgICAgICAgaWYgKGNsaWVudCkge1xyXG4gICAgICAgICAgICBjbGllbnQuc2VuZE1lc3NhZ2UobXNnSWQsIG1zZylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmRNZXNzYWdlRW1wdHkobXNnSWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGllbnQ6IEdhbWVDbGllbnQgPSBudWxsO1xyXG4gICAgICAgIGlmIChtc2dJZCA+IEdhbWVNZXNzYWdlLkdNX0FDQ09VTlRfU0VSVkVSX01FU1NBR0VfU1RBUlQgJiYgbXNnSWQgPCBHYW1lTWVzc2FnZS5HTV9BQ0NPVU5UX1NFUlZFUl9NRVNTQUdFX0VORCkge1xyXG4gICAgICAgICAgICBjbGllbnQgPSB0aGlzLmdldENsaWVudChDbGllbnRJRC5sb2dpbilcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KENsaWVudElELmxvZ2ljKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2xpZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5zZW5kRW1wdHkobXNnSWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckFsbEdhbWVDbGllbnQoKSB7XHJcbiAgICAgICAgbGV0IGRpYyA9IHRoaXMuZ2FtZUNsaWVudE1hcFxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRpYykge1xyXG4gICAgICAgICAgICBpZiAoZGljLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkaWNba2V5XTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuZGlzY29ubmVjdGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nYW1lQ2xpZW50TWFwID0ge31cclxuICAgIH1cclxufSIsImltcG9ydCBOZXRFdmVudERpc3BhdGNoZXIgZnJvbSBcIi4uL0V2ZW50L05ldEV2ZW50RGlzcGF0Y2hlclwiXHJcbmltcG9ydCBOZXRQYWNrZXQgZnJvbSBcIi4vTmV0UGFja2V0XCJcclxuaW1wb3J0IE5ldHdvcmtNYW5hZ2VyIGZyb20gXCIuL05ldHdvcmtNYW5hZ2VyXCJcclxuaW1wb3J0IEdhbWVNZXNzYWdlTmFtZSBmcm9tIFwiLi9HYW1lTWVzc2FnZU5hbWVcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2NrZXRDb25uZWN0IHtcclxuXHJcbiAgICAvL3ByaXZhdGUgV0VCUEFDS19IRUFEX09GRlNFVDogbnVtYmVyID0gMFx0Ly8g6Ieq5a6a5LmJ5pWw5o2uIOS4gOiIrOaYr3JvbGVpZCAobG9uZ+exu+WeiylcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX01FU1NTQUdFSURfT0ZGU0VUOiBudW1iZXIgPSA4XHQvLyDmtojmga9pZFxyXG4gICAgLy9wcml2YXRlIFdFQlBBQ0tfTEVOR1RIX09GRlNFVDogbnVtYmVyID0gMTJcdC8vIOa2iOaBr+mVv+W6plxyXG4gICAgcHJpdmF0ZSBXRUJQQUNLX0hFQURfU0laRTogbnVtYmVyID0gMTZcdC8vIOa2iOaBr+aVsOaNruW8gOWni+S9jee9rlxyXG5cclxuXHJcbiAgICBwdWJsaWMgc29ja2V0OiBMYXlhLlNvY2tldCA9IG51bGxcclxuICAgIHByaXZhdGUgc2VuZEJ5dGVzOiBMYXlhLkJ5dGUgPSBudWxsXHJcbiAgICBwcml2YXRlIHJlYWRCeXRlczogTGF5YS5CeXRlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSB0ZW1wQnl0ZXM6IExheWEuQnl0ZSA9IG51bGxcclxuICAgIHByaXZhdGUgdXJsOiBzdHJpbmcgPSBudWxsXHJcbiAgICBwcml2YXRlIHRpcHM6IHN0cmluZyA9IG51bGxcclxuICAgIHByaXZhdGUgcGJNZXNzYWdlTmFtZTogYW55ID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBwcm90b1Jvb3Q6IGFueSA9IG51bGw7XHJcblxyXG4gICAgLy9wcml2YXRlIHNlbmROZXRQYWNrZXQ6IEFycmF5PE5ldFBhY2tldD4gPSBudWxsXHJcbiAgICAvL3ByaXZhdGUgcmVjZWl2ZU5ldFBhY2tldDogQXJyYXk8TmV0UGFja2V0PiA9IG51bGxcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0aXBzOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnRpcHMgPSB0aXBzXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMgPSBuZXcgTGF5YS5CeXRlKClcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy5lbmRpYW4gPSBMYXlhLkJ5dGUuTElUVExFX0VORElBTi8v6L+Z6YeM5oiR5Lus6YeH55So5bCP56uvXHJcbiAgICAgICAgdGhpcy50ZW1wQnl0ZXMgPSBuZXcgTGF5YS5CeXRlKClcclxuICAgICAgICB0aGlzLnRlbXBCeXRlcy5lbmRpYW4gPSBMYXlhLkJ5dGUuTElUVExFX0VORElBTi8v6L+Z6YeM5oiR5Lus6YeH55So5bCP56uvXHJcblxyXG4gICAgICAgIC8vdGhpcy5zZW5kTmV0UGFja2V0ID0gbmV3IEFycmF5PE5ldFBhY2tldD4oKSAvL+WPkemAgeeahOe9kee7nOWMhVxyXG4gICAgICAgIC8vdGhpcy5yZWNlaXZlTmV0UGFja2V0ID0gbmV3IEFycmF5PE5ldFBhY2tldD4oKSAvL+aOpeaUtueahOe9kee7nOWMhVxyXG5cclxuICAgICAgICB0aGlzLnByb3RvUm9vdCA9IExheWEuQnJvd3Nlci53aW5kb3dbXCJQQk1lc3NhZ2VcIl1cclxuICAgICAgICB0aGlzLnBiTWVzc2FnZU5hbWUgPSBHYW1lTWVzc2FnZU5hbWUuZ2V0TWFwKClcclxuICAgIH1cclxuICAgIHB1YmxpYyBjb25uZWN0KGhvc3Q6IHN0cmluZywgcG9ydDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51cmwgPSBob3N0LmNvbmNhdChwb3J0LnRvU3RyaW5nKCkpXHJcbiAgICAgICAgdGhpcy5jb25uZWN0QnlVcmwodGhpcy51cmwpXHJcbiAgICB9XHJcbiAgICAvL1wid3M6Ly9sb2NhbGhvc3Q6ODk4OVwiXHJcbiAgICBwdWJsaWMgY29ubmVjdEJ5VXJsKHVybDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51cmwgPSB1cmxcclxuICAgICAgICB0aGlzLnNvY2tldCA9IG5ldyBMYXlhLlNvY2tldCgpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQuZW5kaWFuID0gTGF5YS5CeXRlLkxJVFRMRV9FTkRJQU4vL+i/memHjOaIkeS7rOmHh+eUqOWwj+err1xyXG4gICAgICAgIHRoaXMuc29ja2V0LmNvbm5lY3RCeVVybCh1cmwpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oTGF5YS5FdmVudC5PUEVOLCB0aGlzLCB0aGlzLm9wZW5IYW5kbGVyKVxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKExheWEuRXZlbnQuTUVTU0FHRSwgdGhpcywgdGhpcy5yZWNlaXZlSGFuZGxlcilcclxuICAgICAgICB0aGlzLnNvY2tldC5vbihMYXlhLkV2ZW50LkNMT1NFLCB0aGlzLCB0aGlzLmNsb3NlSGFuZGxlcilcclxuICAgICAgICB0aGlzLnNvY2tldC5vbihMYXlhLkV2ZW50LkVSUk9SLCB0aGlzLCB0aGlzLmVycm9ySGFuZGxlcilcclxuICAgIH1cclxuICAgIC8v6YeN5paw6L+e5o6lXHJcbiAgICBwdWJsaWMgcmVjb25uZWN0KCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0LmNsZWFuU29ja2V0KClcclxuICAgICAgICB0aGlzLmNvbm5lY3RCeVVybCh0aGlzLnVybClcclxuICAgIH1cclxuICAgIC8v5pat5byA6L+e5o6lXHJcbiAgICBwdWJsaWMgZGlzY29ubmVjdGVkKCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0LmNsb3NlKClcclxuICAgIH1cclxuICAgIC8v5piv5ZCm6L+e5o6lXHJcbiAgICBwdWJsaWMgY29ubmVjdGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvY2tldC5jb25uZWN0ZWRcclxuICAgIH1cclxuICAgIC8v5q2j56Gu5bu656uL6L+e5o6lXHJcbiAgICBwcml2YXRlIG9wZW5IYW5kbGVyKGV2ZW50OiBhbnkgPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy51cmwgKyB0aGlzLnRpcHMgKyBcIiAg5q2j56Gu5bu656uL6L+e5o6lXCIpXHJcbiAgICB9XHJcbiAgICAvL+WFs+mXrei/nuaOpeS6i+S7tlxyXG4gICAgcHJpdmF0ZSBjbG9zZUhhbmRsZXIoZXZlbnQ6IGFueSA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVybCArIHRoaXMudGlwcyArIFwiIOWFs+mXrei/nuaOpeS6i+S7tlwiKVxyXG4gICAgfVxyXG4gICAgLy/ov57mjqXlh7rplJlcclxuICAgIHByaXZhdGUgZXJyb3JIYW5kbGVyKGU6IGFueSA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVybCArIHRoaXMudGlwcyArIFwiIOi/nuaOpeWHuumUmVwiKVxyXG4gICAgfVxyXG5cclxuICAgIC8v5Y+R6YCB56m65raI5oGvXHJcbiAgICBwdWJsaWMgc2VuZEVtcHR5KG1zZ0lkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICAvLyDlhpnlhaXkuIDkuKrmlbDlrZcwXHJcbiAgICAgICAgdGhpcy50ZW1wQnl0ZXMud3JpdGVGbG9hdDMyKDApXHJcbiAgICAgICAgdGhpcy5zZW5kKG1zZ0lkLCB0aGlzLnRlbXBCeXRlcylcclxuICAgICAgICB0aGlzLnRlbXBCeXRlcy5jbGVhcigpXHJcbiAgICB9XHJcblxyXG4gICAgLy/lj5HpgIHmtojmga9cclxuICAgIHB1YmxpYyBzZW5kTWVzc2FnZShtc2dJZDogbnVtYmVyLCBtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8vaWYgKHR5cGVvZiBtc2cgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIC8vICAgIHRoaXMudGVtcEJ5dGVzLndyaXRlVVRGU3RyaW5nKG1zZylcclxuICAgICAgICAvLyAgICB0aGlzLnNlbmQobXNnSWQsIHRoaXMudGVtcEJ5dGVzKVxyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vZWxzZSBpZiAobXNnIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICAvLyAgICB0aGlzLnRlbXBCeXRlcy53cml0ZUFycmF5QnVmZmVyKGJ1ZmZlcilcclxuICAgICAgICAvLyAgICB0aGlzLnNlbmQobXNnSWQsIHRoaXMudGVtcEJ5dGVzKVxyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGJ1ZmZlcjogVWludDhBcnJheSA9IHRoaXMuc2VyaWFsaXplKG1zZ0lkLCBtc2cpXHJcbiAgICAgICAgICAgIHRoaXMudGVtcEJ5dGVzLndyaXRlQXJyYXlCdWZmZXIoYnVmZmVyKVxyXG4gICAgICAgICAgICB0aGlzLnNlbmQobXNnSWQsIHRoaXMudGVtcEJ5dGVzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+mcgOimgeWPkemAgeeahOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBzZW5kKG1zZ0lkOiBudW1iZXIsIGJ5dGU6IExheWEuQnl0ZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5zb2NrZXQuY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIGNvbm5lY3Rpb24gaGFzIGJlZW4gZGlzY29ubmVjdGVkLlwiKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9XRUJQQUNLX0hFQURfT0ZGU0VUXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMud3JpdGVGbG9hdDY0KE5ldHdvcmtNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um9sZUlkKCkpXHJcbiAgICAgICAgLy9XRUJQQUNLX01FU1NTQUdFSURfT0ZGU0VUXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMud3JpdGVJbnQzMihtc2dJZClcclxuICAgICAgICAvL1dFQlBBQ0tfTEVOR1RIX09GRlNFVFxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLndyaXRlSW50MzIodGhpcy5XRUJQQUNLX0hFQURfU0laRSArIGJ5dGUubGVuZ3RoKVxyXG4gICAgICAgIC8vTWFzc2dlIGJvZHlcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy53cml0ZUFycmF5QnVmZmVyKGJ5dGUuYnVmZmVyKVxyXG4gICAgICAgIC8v6L+Z6YeM5piv5oqK5a2X6IqC5pWw57uE55qE5pWw5o2u6YCa6L+Hc29ja2V05Y+R6YCB57uZ5pyN5Yqh5ZmoXHJcbiAgICAgICAgdGhpcy5zb2NrZXQuc2VuZCh0aGlzLnNlbmRCeXRlcy5idWZmZXIpXHJcbiAgICAgICAgLy/muIXpmaTmjonmlbDmja7vvIzmlrnkvr/kuIvmrKHor7vlhplcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy5jbGVhcigpXHJcbiAgICAgICAgdGhpcy50ZW1wQnl0ZXMuY2xlYXIoKVxyXG4gICAgfVxyXG5cclxuICAgIC8v5o6l5pS25Yiw5pWw5o2uXHJcbiAgICBwcml2YXRlIHJlY2VpdmVIYW5kbGVyKG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIk1lc3NhZ2UgZnJvbSBzZXJ2ZXI6ICBcIiArIG5ldyBMYXlhLkJ5dGUobXNnKS5yZWFkVVRGQnl0ZXMoKSlcclxuICAgICAgICB2YXIgbmV0UGFja2V0OiBOZXRQYWNrZXQgPSBuZXcgTmV0UGFja2V0KHRoaXMpXHJcbiAgICAgICAgbmV0UGFja2V0LnJlY2VpdmVNc2cobXNnKVxyXG4gICAgICAgIHRoaXMuc29ja2V0LmlucHV0LmNsZWFyKClcclxuICAgICAgICBOZXRFdmVudERpc3BhdGNoZXIuZ2V0SW5zdGFuY2UoKS5kaXNwYXRjaE1lc3NhZ2UobmV0UGFja2V0Lm1lc3NhZ2VJZCwgbmV0UGFja2V0KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bqP5YiX5YyWIHByb3RvY29sLWJ1ZmZlclxyXG4gICAgICogQHBhcmFtIG1hc3NhZ2VJZCBcclxuICAgICAqIEBwYXJhbSBtYXNzYWdlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXJpYWxpemUobWFzc2FnZUlkOiBudW1iZXIsIG1hc3NhZ2U6IGFueSk6IFVpbnQ4QXJyYXkge1xyXG4gICAgICAgIGxldCBtYXNzYWdlTmFtZTogc3RyaW5nID0gdGhpcy5wYk1lc3NhZ2VOYW1lW21hc3NhZ2VJZF1cclxuICAgICAgICAvLyBFbmNvZGUgYSBtZXNzYWdlIHRvIGFuIFVpbnQ4QXJyYXkgKGJyb3dzZXIpIG9yIEJ1ZmZlciAobm9kZSlcclxuICAgICAgICB2YXIgYnVmZmVyOiBhbnkgPSB0aGlzLnByb3RvUm9vdFttYXNzYWdlTmFtZV0uZW5jb2RlKG1hc3NhZ2UpLmZpbmlzaCgpO1xyXG4gICAgICAgIHJldHVybiBidWZmZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj43luo/liJfljJYgcHJvdG9jb2wtYnVmZmVyXHJcbiAgICAgKiBAcGFyYW0gbWFzc2FnZU5hbWUgXHJcbiAgICAgKiBAcGFyYW0gbmV0UGFja2FnZSBOZXRQYWNrYWdlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZXNlcmlhbGl6ZShtYXNzYWdlSWQ6IG51bWJlciwgbWFzc2FnZTogVWludDhBcnJheSk6IGFueSB7XHJcbiAgICAgICAgbGV0IG1hc3NhZ2VOYW1lOiBzdHJpbmcgPSB0aGlzLnBiTWVzc2FnZU5hbWVbbWFzc2FnZUlkXVxyXG4gICAgICAgIC8vIERlY29kZSBhbiBVaW50OEFycmF5IChicm93c2VyKSBvciBCdWZmZXIgKG5vZGUpIHRvIGEgbWVzc2FnZVxyXG4gICAgICAgIHZhciBtZXNzYWdlOiBhbnkgPSB0aGlzLnByb3RvUm9vdFttYXNzYWdlTmFtZV0uZGVjb2RlKG1hc3NhZ2UpO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgfVxyXG5cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xyXG5pbXBvcnQgTWFpblVJIGZyb20gXCIuL3NjcmlwdC9NYWluVUlcIlxuaW1wb3J0IFRlc3RfOV9UaW1lTGluZVVJIGZyb20gXCIuL3N0dWR5L1Rlc3RfOV9UaW1lTGluZVVJXCJcclxuLypcclxuKiDmuLjmiI/liJ3lp4vljJbphY3nva47XHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb25maWd7XHJcbiAgICBzdGF0aWMgd2lkdGg6bnVtYmVyPTY0MDtcclxuICAgIHN0YXRpYyBoZWlnaHQ6bnVtYmVyPTExMzY7XHJcbiAgICBzdGF0aWMgc2NhbGVNb2RlOnN0cmluZz1cImZpeGVkaGVpZ2h0XCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJob3Jpem9udGFsXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJNYWluU2NlbmUuc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj10cnVlO1xyXG4gICAgc3RhdGljIHN0YXQ6Ym9vbGVhbj10cnVlO1xyXG4gICAgc3RhdGljIHBoeXNpY3NEZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIGV4cG9ydFNjZW5lVG9Kc29uOmJvb2xlYW49dHJ1ZTtcclxuICAgIGNvbnN0cnVjdG9yKCl7fVxyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICB2YXIgcmVnOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuICAgICAgICByZWcoXCJzY3JpcHQvTWFpblVJLnRzXCIsTWFpblVJKTtcbiAgICAgICAgcmVnKFwic3R1ZHkvVGVzdF85X1RpbWVMaW5lVUkudHNcIixUZXN0XzlfVGltZUxpbmVVSSk7XHJcbiAgICB9XHJcbn1cclxuR2FtZUNvbmZpZy5pbml0KCk7IiwiaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi4vdWkvbGF5YU1heFVJXCI7XHJcbmltcG9ydCBOZXR3b3JrTWFuYWdlciBmcm9tIFwiLi4vRnJhbWV3b3JrL05ldHdvcmsvTmV0d29ya01hbmFnZXJcIjtcclxuaW1wb3J0IE5ldEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vRnJhbWV3b3JrL0V2ZW50L05ldEV2ZW50RGlzcGF0Y2hlclwiO1xyXG5pbXBvcnQgTmV0UGFja2V0IGZyb20gXCIuLi9GcmFtZXdvcmsvTmV0d29yay9OZXRQYWNrZXRcIjtcclxuaW1wb3J0IEdhbWVNZXNzYWdlTmFtZSBmcm9tIFwiLi4vRnJhbWV3b3JrL05ldHdvcmsvR2FtZU1lc3NhZ2VOYW1lXCI7XHJcblxyXG5cclxuLy/kuLvnlYzpnaJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpblVJIGV4dGVuZHMgdWkuTWFpblNjZW5lVUkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigpOyB9XHJcblxyXG4gICAgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYWluVUkub25FbmFibGVcIilcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZU1lc3NhZ2UuR01fVkVSU0lPTl9SRVRVUk4pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIE5ldEV2ZW50RGlzcGF0Y2hlci5nZXRJbnN0YW5jZSgpLnJlZ2lzdGVyTWVzc2FnZShHYW1lTWVzc2FnZS5HTV9WRVJTSU9OX1JFVFVSTiwgdGhpcy5HTV9WZXJpZnlWZXJzaW9uUmV0dXJuKS8vXHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFpblVJLm9uRGlzYWJsZVwiKVxyXG4gICAgICAgIFxyXG4gICAgICAgIE5ldEV2ZW50RGlzcGF0Y2hlci5nZXRJbnN0YW5jZSgpLnVuUmVnaXN0ZXJNZXNzYWdlKEdhbWVNZXNzYWdlLkdNX1ZFUlNJT05fUkVUVVJOLCB0aGlzLkdNX1ZlcmlmeVZlcnNpb25SZXR1cm4pLy9cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBHTV9WZXJpZnlWZXJzaW9uUmV0dXJuKG5ldFBhY2thZ2U6TmV0UGFja2V0KTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5ldFBhY2thZ2UubWVzc2FnZUlkICsgXCIgIFwiICsgbmV0UGFja2FnZS5tZXNzYWdlKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkF3YWtlKCk6IHZvaWQge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlByZWNpc2lvbiBzYWZlLlwiICsgKE1hdGgucG93KDIsIDUzKSAtIDEpKTtcclxuXHJcbiAgICAgICAgLy92YXIgbXNnID0ge1xyXG4gICAgICAgIC8vICAgIHZlcnNpb246IFwiMS41LjRcIixcdFx0XHRcdC8v5a6i5oi356uv54mI5pys5Y+3XHJcbiAgICAgICAgLy8gICAgcGxhdGZvcm06IDkwMDcxOTkyNTQ3NDA5OTEsICAgICAgICAgICAgIC8vL+W5s+WPsFxyXG4gICAgICAgIC8vICAgIGlzdGVzdDogMCwvLy8gICAgMOOAgeato+W4uO+8jDHjgIHmtYvor5XvvIzkuI3pnIDopoHpqozor4HniYjmnKxcclxuICAgICAgICAvL31cclxuICAgICAgICAvL3ZhciByb290ID0gTGF5YS5Ccm93c2VyLndpbmRvd1tcIlBCTWVzc2FnZVwiXTtcclxuICAgICAgICAvL3ZhciBwYk1lc3NhZ2VOYW1lID0gR2FtZU1lc3NhZ2VOYW1lLmdldE1hcCgpXHJcbiAgICAgICAgLy92YXIgYnVmZmVyOiBhbnkgPSByb290W3BiTWVzc2FnZU5hbWVbR2FtZU1lc3NhZ2UuR01fVkVSSUZZX1ZFUlNJT05dXS5lbmNvZGUobXNnKS5maW5pc2goKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGJ1ZmZlcik7XHJcbiAgICAgICAgLy9cclxuXHJcbiAgICAgICAgTmV0d29ya01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVDbGllbnQoMCwgXCJ3czovLzE5Mi4xNjguMi4xMjY6NTAwMDBcIik7XHJcbiAgICAgICAgLy/lrprml7bmiafooYzkuIDmrKEo6Ze06ZqU5pe26Ze0KVxyXG4gICAgICAgIExheWEudGltZXIub25jZSgyMDAwLCB0aGlzLCB0aGlzLnRlc3ROZXR3b3JrKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRlc3ROZXR3b3JrKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGVzdE5ldHdvcmsoKVwiKTtcclxuICAgICAgICB2YXIgbXNnID0ge1xyXG4gICAgICAgICAgICB2ZXJzaW9uOiBcIjEuNS40XCIsXHRcdFx0XHQvL+WuouaIt+err+eJiOacrOWPt1xyXG4gICAgICAgICAgICBwbGF0Zm9ybTogOTAwNzE5OTI1NDc0MDk5MSwgICAgICAgICAgICAgLy8v5bmz5Y+wXHJcbiAgICAgICAgICAgIGlzdGVzdDogMCwvLy8gICAgMOOAgeato+W4uO+8jDHjgIHmtYvor5XvvIzkuI3pnIDopoHpqozor4HniYjmnKxcclxuICAgICAgICB9XHJcbiAgICAgICAgTmV0d29ya01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2dpblNlbmRNZXNzYWdlKEdhbWVNZXNzYWdlLkdNX1ZFUklGWV9WRVJTSU9OLCAgbXNnKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RfMTJfVGlsZWRNYXAge1xyXG4gICAgLy9vcHRpbWl6YXRpb24oKTp2b2lke1xyXG4gICAgLy8gICAgLy/lvZNUaWxlZCBNYXBh5LiN5YaN5L2/55So55qE5pe25YCZ77yM6ZyA6KaB5L2/55SoZGVzdHJveSgp5pa55rOV6L+b6KGM6ZSA5q+B77yM5Zue5pS26KKr5Y2g55So55qE5YaF5a2YXHJcbiAgICAvLyAgICB0aGlzLnRNYXAuZGVzdHJveSgpO1xyXG4gICAgLy8gICAgLy/oh6rliqjnvJPlrZjmsqHmnInliqjnlLvnmoTlnLDlnZdcclxuICAgIC8vICAgIHRoaXMudE1hcC5hdXRvQ2FjaGUgPSB0cnVlO1xyXG4gICAgLy8gICAgLy/oh6rliqjnvJPlrZjnmoTnsbvlnoss5Zyw5Zu+6L6D5aSn5pe25bu66K6u5L2/55Sobm9ybWFsXHJcbiAgICAvLyAgICB0aGlzLnRNYXAuYXV0b0NhY2hlVHlwZSA9IFwibm9ybWFsXCI7XHJcbiAgICAvLyAgICAvL+a2iOmZpOe8qeaUvuWvvOiHtOeahOe8nemamSzkuZ/lsLHmmK/ljrvpu5HovrnvvIwxLjcuN+eJiOacrOaWsOWinueahOS8mOWMluWxnuaAp1xyXG4gICAgLy8gICAgdGhpcy50TWFwLmFudGlDcmFjayA9IHRydWU7XHJcbiAgICAvLyAgICAvL+W8gOWQr+WbvuWxguWQiOW5tlxyXG4gICAgLy8gICAgdGhpcy50TWFwLmVuYWJsZU1lcmdlTGF5ZXIgPSB0cnVlO1xyXG4gICAgLy9cclxuICAgIC8vICAgIC8v57yT5a2Y5Yy65Z2X55qE6K6+572u5o6o6I2QXHJcbiAgICAvLyAgICAvL+WmguaenOWNleWbvuaYrzE1KjE177yM57yT5a2Y5Y+v5Yy65Z2X5Y+v5Lul6K6+572u5Li6NTEwKjUxMO+8iDM05YCN77yJ77yM5Lul5q2k57G75o6o77yM5bC96YeP5Zyo5Y6f5Yy65Z2X5pW05pWw5YCN55qE5YmN5o+Q5LiL77yM6K6+572u5ZyoNTEy5bem5Y+z44CC5o6o6I2Q5Li6NTEyKjUxMlxyXG4gICAgLy8gICAgLy/nvJPlrZjljLrlnZfnmoTlhbfkvZPorr7nva7mlrnms5VcclxuICAgIC8vICAgIC8v5Li656ys5LqU5Liq5Y+C5pWwZ3JpZFNpemXliJvlu7rkuIDkuKo1MTIqNTEy5aSn5bCP55qEUG9pbnTlr7nosaHlrp7kvotcclxuICAgIC8vICAgIC8vdmFyIGdyaWRTaXplOkxheWEuUG9pbnQgPSBuZXcgTGF5YS5Qb2ludCg1MTIsIDUxMik7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgLy/np7vpmaTooqvpnZ7pgI/mmI7lnLDlnZfopobnm5bnmoTpg6jliIZcclxuICAgIC8vICAgIC8v5aaC5p6c5ZyoVGlsZWQgTWFw5Lit5rKh5pyJ5a+55Zu+5Z2X6K6+572udHlwZeWxnuaAp++8jOmCo+S5iOWNs+S+v+W8gOWQr+S6hnJlbW92ZUNvdmVyZWRUaWxlIO+8jOS5n+aYr+aXoOaViOeahOOAguaJgOS7pe+8jOW8gOWQr+S5i+WJje+8jOmcgOimgeWFiOWcqFRpbGVkTWFw57yW6L6R5Zmo5Lit77yM5Li65Zu+5Z2X5paw5aKe6Ieq5a6a5LmJ5bGe5oCndHlwZe+8jOW5tuWwhuiuvue9ruS4ujFcclxuICAgIC8vICAgIHRoaXMudE1hcC5yZW1vdmVDb3ZlcmVkVGlsZSA9IHRydWU7XHJcbiAgICAvL31cclxuXHJcbiAgICBwcml2YXRlIHRNYXA6IExheWEuVGlsZWRNYXA7XHJcbiAgICBwcml2YXRlIHNjYWxlVmFsdWU6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIE1hcFg6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIE1hcFk6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIG1MYXN0TW91c2VYOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1MYXN0TW91c2VZOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUZXN0XzEyX1RpbGVkTWFwXCIpO1xyXG4gICAgICAgIC8v5Yid5aeL5YyW6Iie5Y+wXHJcbiAgICAgICAgTGF5YS5pbml0KExheWEuQnJvd3Nlci53aWR0aCwgTGF5YS5Ccm93c2VyLmhlaWdodCwgTGF5YS5XZWJHTCk7XHJcbiAgICAgICAgLy/liJvlu7pUaWxlZE1hcOWunuS+i1xyXG4gICAgICAgIHRoaXMudE1hcCA9IG5ldyBMYXlhLlRpbGVkTWFwKCk7XHJcbiAgICAgICAgLy/liJvlu7pSZWN0YW5nbGXlrp7kvovvvIzop4blj6PljLrln59cclxuICAgICAgICB2YXIgdmlld1JlY3Q6IExheWEuUmVjdGFuZ2xlID0gbmV3IExheWEuUmVjdGFuZ2xlKCk7XHJcbiAgICAgICAgLy/liJvlu7pUaWxlZE1hcOWcsOWbvu+8jOWKoOi9vW9ydGhvZ29uYWwuanNvbuWQju+8jOaJp+ihjOWbnuiwg+aWueazlW9uTWFwTG9hZGVkKClcclxuICAgICAgICB0aGlzLnRNYXAuY3JlYXRlTWFwKFwicmVzL1RpbGVkTWFwL29ydGhvZ29uYWwuanNvblwiLCB2aWV3UmVjdCwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uTWFwTG9hZGVkKSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uTWFwTG9hZGVkKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25NYXBMb2FkZWRcIik7XHJcbiAgICAgICAgLy/orr7nva7nvKnmlL7kuK3lv4PngrnkuLrop4blj6PnmoTlt6bkuIrop5JcclxuICAgICAgICB0aGlzLnRNYXAuc2V0Vmlld1BvcnRQaXZvdEJ5U2NhbGUoMCwgMCk7XHJcbiAgICAgICAgLy/lsIbljp/lnLDlm77mlL7lpKcz5YCNXHJcbiAgICAgICAgdGhpcy50TWFwLnNjYWxlID0gMjtcclxuICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuUkVTSVpFLCB0aGlzLCB0aGlzLnJlc2l6ZSk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sIHRoaXMsIHRoaXMubW91c2VEb3duKTtcclxuICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuTU9VU0VfVVAsIHRoaXMsIHRoaXMubW91c2VVcCk7XHJcbiAgICAgICAgdGhpcy5yZXNpemUoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog56e75Yqo5Zyw5Zu+6KeG5Y+jXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbW91c2VNb3ZlKCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBtb3ZlWDogbnVtYmVyID0gdGhpcy5NYXBYIC0gKExheWEuc3RhZ2UubW91c2VYIC0gdGhpcy5tTGFzdE1vdXNlWCk7XHJcbiAgICAgICAgdmFyIG1vdmVZOiBudW1iZXIgPSB0aGlzLk1hcFkgLSAoTGF5YS5zdGFnZS5tb3VzZVkgLSB0aGlzLm1MYXN0TW91c2VZKVxyXG4gICAgICAgIC8v56e75Yqo5Zyw5Zu+6KeG5Y+jXHJcbiAgICAgICAgdGhpcy50TWFwLm1vdmVWaWV3UG9ydChtb3ZlWCwgbW92ZVkpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBtb3VzZVVwKCk6IHZvaWQgIHtcclxuICAgICAgICB0aGlzLk1hcFggPSB0aGlzLk1hcFggLSAoTGF5YS5zdGFnZS5tb3VzZVggLSB0aGlzLm1MYXN0TW91c2VYKTtcclxuICAgICAgICB0aGlzLk1hcFkgPSB0aGlzLk1hcFkgLSAoTGF5YS5zdGFnZS5tb3VzZVkgLSB0aGlzLm1MYXN0TW91c2VZKTtcclxuICAgICAgICBMYXlhLnN0YWdlLm9mZihMYXlhLkV2ZW50Lk1PVVNFX01PVkUsIHRoaXMsIHRoaXMubW91c2VNb3ZlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbW91c2VEb3duKCk6IHZvaWQgIHtcclxuICAgICAgICB0aGlzLm1MYXN0TW91c2VYID0gTGF5YS5zdGFnZS5tb3VzZVg7XHJcbiAgICAgICAgdGhpcy5tTGFzdE1vdXNlWSA9IExheWEuc3RhZ2UubW91c2VZO1xyXG4gICAgICAgIExheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5NT1VTRV9NT1ZFLCB0aGlzLCB0aGlzLm1vdXNlTW92ZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqICDmlLnlj5jop4blj6PlpKflsI9cclxuICAgICAqICDph43orr7lnLDlm77op4blj6PljLrln59cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZXNpemUoKTogdm9pZCAge1xyXG4gICAgICAgIC8v5pS55Y+Y6KeG5Y+j5aSn5bCPXHJcbiAgICAgICAgdGhpcy50TWFwLmNoYW5nZVZpZXdQb3J0KHRoaXMuTWFwWCwgdGhpcy5NYXBZLCBMYXlhLkJyb3dzZXIud2lkdGgsIExheWEuQnJvd3Nlci5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJcclxuY2xhc3MgbXlTaGFkZXJWYWx1ZSBleHRlbmRzIExheWEuVmFsdWUyRCB7XHJcbiAgICBwdWJsaWMgcG9zaXRpb246IGFueTtcclxuICAgIHB1YmxpYyB0ZXhjb29yZDogYW55O1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoMCwgMCk7XHJcbiAgICAgICAgdmFyIF92bGVuOiBudW1iZXIgPSA4ICogTGF5YS5DT05TVDNEMkQuQllURVNfUEU7XHJcbiAgICAgICAgLy/orr7nva7lnKhzaGFkZXLnqIvluo/mlofku7bph4zlrprkuYnnmoTlsZ7mgKfnm7jlhbPmj4/ov7DvvJrjgJDlsZ7mgKfplb/luqbvvIzlsZ7mgKfnsbvlnovvvIxmYWxzZe+8jOWxnuaAp+i1t+Wni+S9jee9rue0ouW8lSpDT05TVDNEMkQuQllURVNfUEXjgJFcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gWzIsIExheWEuV2ViR0xDb250ZXh0LkZMT0FULCBmYWxzZSwgX3ZsZW4sIDBdO1xyXG4gICAgICAgIHRoaXMudGV4Y29vcmQgPSBbMiwgTGF5YS5XZWJHTENvbnRleHQuRkxPQVQsIGZhbHNlLCBfdmxlbiwgMiAqIExheWEuQ09OU1QzRDJELkJZVEVTX1BFXTtcclxuICAgICAgICB0aGlzLmNvbG9yID0gWzQsIExheWEuV2ViR0xDb250ZXh0LkZMT0FULCBmYWxzZSwgX3ZsZW4sIDQgKiBMYXlhLkNPTlNUM0QyRC5CWVRFU19QRV07XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qXHJcbuiHquWumuS5ieedgOiJsuWZqFxyXG4qL1xyXG5jbGFzcyBteVNoYWRlciBleHRlbmRzIExheWEuU2hhZGVyIHtcclxuICAgIC8qKlxyXG4gICAgICrlvZPliY3nnYDoibLlmajnmoTkuIDkuKrlrp7kvovlr7nosaEgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2hhZGVyOiBteVNoYWRlciA9IG5ldyBteVNoYWRlcigpO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy/pobbngrnnnYDoibLlmajnqIvluo/lkozniYflhYPnnYDoibLlmajnqIvluo/jgIJcclxuICAgICAgICB2YXIgdnM6IHN0cmluZyA9IFwiYXR0cmlidXRlIHZlYzIgcG9zaXRpb247YXR0cmlidXRlIHZlYzIgdGV4Y29vcmQ7YXR0cmlidXRlIHZlYzQgY29sb3I7dW5pZm9ybSB2ZWMyIHNpemU7dW5pZm9ybSBtYXQ0IG1tYXQ7dmFyeWluZyB2ZWMyIHZfdGV4Y29vcmQ7dmFyeWluZyB2ZWM0IHZfY29sb3I7dm9pZCBtYWluKCl7dmVjNCBwb3MgPW1tYXQqdmVjNChwb3NpdGlvbi54LHBvc2l0aW9uLnksMCwxKTtnbF9Qb3NpdGlvbiA9IHZlYzQoKHBvcy54L3NpemUueC0wLjUpKjIuMCwgKDAuNS1wb3MueS9zaXplLnkpKjIuMCwgcG9zLnosIDEuMCk7dl9jb2xvciA9IGNvbG9yO3ZfdGV4Y29vcmQgPSB0ZXhjb29yZDt9XCJcclxuICAgICAgICB2YXIgcHM6IHN0cmluZyA9IFwicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7dmFyeWluZyB2ZWMyIHZfdGV4Y29vcmQ7dmFyeWluZyB2ZWM0IHZfY29sb3I7dW5pZm9ybSBzYW1wbGVyMkQgdGV4dHVyZTt2b2lkIG1haW4oKXt2ZWM0IHRfY29sb3IgPSB0ZXh0dXJlMkQodGV4dHVyZSwgdl90ZXhjb29yZCk7Z2xfRnJhZ0NvbG9yID0gdF9jb2xvci5yZ2JhICogdl9jb2xvci5yZ2JhO31cIjtcclxuICAgICAgICBzdXBlcih2cywgcHMsIFwibXlTaGFkZXJcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIG15U2hhZGVyU3ByaXRlIGV4dGVuZHMgTGF5YS5TY3JpcHQge1xyXG4gICAgLyoqIOmhtueCuee8k+WGsuWMuuOAgiAgICAgICovXHJcbiAgICBwcml2YXRlIHZCdWZmZXI6IExheWEuVmVydGV4QnVmZmVyMkQ7Ly9MYXlhLkJ1ZmZlcjtcclxuICAgIC8qKiDniYflhYPnvJPlhrLljLrjgIIgICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpQnVmZmVyOiBMYXlhLkluZGV4QnVmZmVyMkQ7Ly9MYXlhLkJ1ZmZlcjtcclxuICAgIHByaXZhdGUgdmJEYXRhOiBGbG9hdDMyQXJyYXk7XHJcbiAgICBwcml2YXRlIGliRGF0YTogVWludDE2QXJyYXk7XHJcbiAgICBwcml2YXRlIGlOdW06IG51bWJlciA9IDA7XHJcbiAgICAvKiog552A6Imy5Zmo5Y+Y6YeP44CCICAgICAgKi9cclxuICAgIHByaXZhdGUgc2hhZGVyVmFsdWU6IG15U2hhZGVyVmFsdWU7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgIOWIneWni+WMluatpOexu1xyXG4gICAgdGV4dHVyZSDnurnnkIblr7nosaFcclxuICAgIHZiIOmhtueCueaVsOe7hFxyXG4gICAgaWIg6aG254K557Si5byV5pWw57uEXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGluaXQodGV4dHVyZTogTGF5YS5UZXh0dXJlLCB2YjogQXJyYXk8YW55PiA9IG51bGwsIGliOiBBcnJheTxhbnk+ID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudkJ1ZmZlciA9IExheWEuVmVydGV4QnVmZmVyMkQuY3JlYXRlKCk7XHJcbiAgICAgICAgdGhpcy5pQnVmZmVyID0gTGF5YS5JbmRleEJ1ZmZlcjJELmNyZWF0ZSgpO1xyXG4gICAgICAgIHRoaXMuaWJEYXRhID0gbmV3IFVpbnQxNkFycmF5KFtdKTtcclxuICAgICAgICB2YXIgdmJBcnJheTogQXJyYXk8YW55PjtcclxuICAgICAgICB2YXIgaWJBcnJheTogQXJyYXk8YW55PjtcclxuICAgICAgICBpZiAodmIpIHtcclxuICAgICAgICAgICAgdmJBcnJheSA9IHZiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmJBcnJheSA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgdGV4V2lkdGg6IG51bWJlciA9IHRleHR1cmUud2lkdGg7XHJcbiAgICAgICAgICAgIHZhciB0ZXhIZWlnaHQ6IG51bWJlciA9IHRleHR1cmUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAvL+WumuS5ieminOiJsuWAvO+8jOWPluWAvOiMg+WbtDB+Mea1rueCuVxyXG4gICAgICAgICAgICB2YXIgcmVkOiBudW1iZXIgPSAxO1xyXG4gICAgICAgICAgICB2YXIgZ3JlZWQ6IG51bWJlciA9IDE7XHJcbiAgICAgICAgICAgIHZhciBibHVlOiBudW1iZXIgPSAxO1xyXG4gICAgICAgICAgICB2YXIgYWxwaGE6IG51bWJlciA9IDE7XHJcbiAgICAgICAgICAgIC8v5Zyo6aG254K55pWw57uE5Lit5pS+5YWlNOS4qumhtueCuVxyXG4gICAgICAgICAgICAvL+avj+S4qumhtueCueeahOaVsOaNru+8mu+8iOWdkOagh3jvvIzlnZDmoId577yMde+8jHbvvIxSLEcsQixB77yJXHJcbiAgICAgICAgICAgIHZiQXJyYXkucHVzaCgwLCAwLCAwLCAwLCByZWQsIGdyZWVkLCBibHVlLCBhbHBoYSk7XHJcbiAgICAgICAgICAgIHZiQXJyYXkucHVzaCh0ZXhXaWR0aCwgMCwgMSwgMCwgcmVkLCBncmVlZCwgYmx1ZSwgYWxwaGEpO1xyXG4gICAgICAgICAgICB2YkFycmF5LnB1c2godGV4V2lkdGgsIHRleEhlaWdodCwgMSwgMSwgcmVkLCBncmVlZCwgYmx1ZSwgYWxwaGEpO1xyXG4gICAgICAgICAgICB2YkFycmF5LnB1c2goMCwgdGV4SGVpZ2h0LCAwLCAxLCByZWQsIGdyZWVkLCBibHVlLCBhbHBoYSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpYikge1xyXG4gICAgICAgICAgICBpYkFycmF5ID0gaWI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpYkFycmF5ID0gW107XHJcbiAgICAgICAgICAgIC8v5Zyo6aG254K557Si5byV5pWw57uE5Lit5pS+5YWl57uE5oiQ5LiJ6KeS5b2i55qE6aG254K557Si5byVXHJcbiAgICAgICAgICAgIC8v5LiJ6KeS5b2i55qE6aG254K557Si5byV5a+55bqU6aG254K55pWw57uEdmJBcnJheemHjOeahOeCuee0ouW8le+8jOe0ouW8leS7jjDlvIDlp4tcclxuICAgICAgICAgICAgaWJBcnJheS5wdXNoKDAsIDEsIDMpOy8v5LuO56ys5LiA5Liq5LiJ6KeS5b2i55qE6aG254K557Si5byVXHJcbiAgICAgICAgICAgIC8vaWJBcnJheS5wdXNoKDMsMSwyKTvnrKzkuozkuKrkuInop5LlvaLnmoTpobbngrnntKLlvJVcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pTnVtID0gaWJBcnJheS5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy52YkRhdGEgPSBuZXcgRmxvYXQzMkFycmF5KHZiQXJyYXkpO1xyXG4gICAgICAgIHRoaXMuaWJEYXRhID0gbmV3IFVpbnQxNkFycmF5KGliQXJyYXkpO1xyXG4gICAgICAgIHRoaXMudkJ1ZmZlci5hcHBlbmQodGhpcy52YkRhdGEpO1xyXG4gICAgICAgIHRoaXMuaUJ1ZmZlci5hcHBlbmQodGhpcy5pYkRhdGEpO1xyXG4gICAgICAgIHRoaXMuc2hhZGVyVmFsdWUgPSBuZXcgbXlTaGFkZXJWYWx1ZSgpO1xyXG4gICAgICAgIHRoaXMuc2hhZGVyVmFsdWUudGV4dHVyZUhvc3QgPSB0ZXh0dXJlO1xyXG4gICAgICAgIC8vdGhpcy5fcmVuZGVyVHlwZSB8PSBMYXlhLlJlbmRlclNwcml0ZS5DVVNUT007Ly/orr7nva7lvZPliY3mmL7npLrlr7nosaHnmoTmuLLmn5PmqKHlvI/kuLroh6rlrprkuYnmuLLmn5PmqKHlvI9cclxuICAgIH1cclxuICAgIC8v6YeN5YaZ5riy5p+T5Ye95pWwXHJcbiAgICBwdWJsaWMgY3VzdG9tUmVuZGVyKGNvbnRleHQ6IGFueSwgeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICAvL2NvbnRleHQ6TGF5YS5SZW5kZXJDb250ZXh0XHJcbiAgICAgICAgY29uc29sZS5sb2coY29udGV4dCk7XHJcblxyXG4gICAgICAgIChjb250ZXh0LmN0eCBhcyBMYXlhLldlYkdMQ29udGV4dDJEKS5kcmF3TWVzaCh4LCB5LCB0aGlzLmlCdWZmZXIsIHRoaXMudkJ1ZmZlciwgdGhpcy5pTnVtLCBudWxsLCBteVNoYWRlci5zaGFkZXIsIHRoaXMuc2hhZGVyVmFsdWUsIDApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0XzE0X1NoYWRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvL+WKoOi9veS4gOW8oOWbvueJh1xyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQoXCJyZXMvdGV4dHVyZS5wbmdcIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLmxvYWRDb21wbGV0ZSkpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBsb2FkQ29tcGxldGUoKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIHRleHR1cmU6IExheWEuVGV4dHVyZSA9IExheWEuTG9hZGVyLmdldFJlcyhcInJlcy9hdGxhcy9jb21wLnBuZ1wiKTtcclxuICAgICAgICB2YXIgc3BlOiBhbnkgPSBuZXcgbXlTaGFkZXJTcHJpdGUoKTtcclxuICAgICAgICBzcGUuaW5pdCh0ZXh0dXJlKTtcclxuICAgICAgICAoc3BlIGFzIExheWEuU3ByaXRlKS5wb3MoNTAsIDUwKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHNwZSk7XHJcbiAgICB9XHJcbn0iLCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0XzlfVGltZUxpbmVVSVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvL+WKoOi9veWbvumbhuaIkOWKn+WQju+8jOaJp+ihjG9uTG9hZOWbnuiwg+aWueazlVxyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQoXCJyZXMvYXRsYXMvdGVzdC5hdGxhc1wiLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uTG9hZGVkKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgb25Mb2FkZWQoKTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Yqg6L295Zu+6ZuG5oiQ5Yqf5ZCO77yM5omn6KGMb25Mb2Fk5Zue6LCD5pa55rOVXCIpXHJcbiAgICAgICAgLy/liJvlu7rkuIDkuKpVSeWunuS+i1xyXG4gICAgICAgIC8vdmFyIHBsYW46VGltZUxpbmVVSSA9IG5ldyBUaW1lTGluZVVJKClcclxuICAgICAgICAvL+a3u+WKoOWIsOiInuWPsFxyXG4gICAgICAgIC8vTGF5YS5zdGFnZS5hZGRDaGlsZChwbGFuKTtcclxuICAgICAgICAvL+aSreaUvlVJ5Zy65pmv5Lit55qE5Yqo55S7XHJcbiAgICAgICAgLy90aGlzLmJlYXIucGxheSgpO1xyXG4gICAgfVxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xudmFyIFJFRzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XG5leHBvcnQgbW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBNYWluU2NlbmVVSSBleHRlbmRzIFNjZW5lIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiTWFpblNjZW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLk1haW5TY2VuZVVJXCIsTWFpblNjZW5lVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbWVMaW5lVUkgZXh0ZW5kcyBEaWFsb2cge1xyXG5cdFx0cHVibGljIGJlYXI6TGF5YS5BbmltYXRpb247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJUaW1lTGluZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5UaW1lTGluZVVJXCIsVGltZUxpbmVVSSk7XHJcbn1cciJdfQ==
