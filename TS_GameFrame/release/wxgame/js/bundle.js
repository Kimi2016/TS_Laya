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
var Test_13_DomElement_1 = require("./study/Test_13_DomElement");
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
        //GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
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
        new Test_13_DomElement_1.default();
    };
    return AppMain;
}());
//激活启动类
new AppMain();
},{"./GameConfig":7,"./study/Test_12_TiledMap":9,"./study/Test_13_DomElement":10}],2:[function(require,module,exports){
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
var Test_13_DomElement = /** @class */ (function () {
    function Test_13_DomElement() {
        //摄像头
        this.video = null;
        this.testDomElement();
        this.testQrcode();
        this.testVideo();
        this.testCamera();
    }
    //SVG
    Test_13_DomElement.prototype.testDomElement = function () {
        var data = "data:image/svg+xml," + '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
            '<foreignObject width="100%" height="100%">' +
            '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
            '<em>I</em> like ' +
            '<span style="color:white; text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;">' +
            'cheese</span>' +
            '</div>' +
            '</foreignObject>' +
            '</svg>';
        var sp = new Laya.Sprite();
        sp.pos(500, 0);
        sp.loadImage(data, Laya.Handler.create(this, function () {
            console.log("SVG onCompleted");
        }));
        Laya.stage.addChild(sp);
    };
    //二维码
    Test_13_DomElement.prototype.testQrcode = function () {
        var div = Laya.Browser.document.createElement("div");
        var qrcode = new Laya.Browser.window.QRCode(div, {
            width: 100,
            height: 100
        });
        var url = "http://layabox.com/";
        //qrcode.clear(); // clear the code.
        qrcode.makeCode(url); // make another code.
        var qrcodeSp = new Laya.Sprite();
        qrcodeSp.pos(500, 100);
        Laya.stage.addChild(qrcodeSp);
        Laya.timer.once(1000, this, function () {
            var url = qrcode._oDrawing._elImage.src; //获取，注意这里是异步的，开发者可以加个延时在获取。
            //console.log("二维码:" + url);
            qrcodeSp.loadImage(url, Laya.Handler.create(this, function () {
                console.log("二维码 onCompleted");
            }));
        });
    };
    //video
    Test_13_DomElement.prototype.testVideo = function () {
        var Hls = Laya.Browser.window.Hls; //获取对Hls的引用。
        var plyr = Laya.Browser.window.plyr; //获取对plyr的引用
        //获取video对象，就是页面上命名为“player”的标签
        var video = Laya.Browser.document.querySelector('#player');
        if (Hls.isSupported()) {
            var hls = new Hls();
            //加载m3u8源
            hls.loadSource('http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8');
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play();
            });
        }
        plyr.setup(video);
    };
    Test_13_DomElement.prototype.testCamera = function () {
        if (Laya.Media.supported() === false) {
            alert("当前浏览器不支持");
        }
        else {
            this.showMessage();
            var options = {
                audio: true,
                video: {
                    facingMode: { exact: "environment" },
                    width: Laya.stage.width,
                    height: Laya.stage.height
                }
            };
            Laya.Media.getMedia(options, Laya.Handler.create(this, this.onSuccess), Laya.Handler.create(this, this.onError));
        }
    };
    Test_13_DomElement.prototype.showMessage = function () {
        var tex = new Laya.Text();
        Laya.stage.addChild(tex);
        tex.text = "单击舞台播放和暂停";
        tex.color = "#ffffff";
        tex.fontSize = 100;
        tex.valign = "middle";
        tex.align = "center";
        tex.size(Laya.stage.width, Laya.stage.height);
    };
    Test_13_DomElement.prototype.onSuccess = function (url) {
        this.video = new Laya.Video(Laya.stage.width, Laya.stage.height);
        this.video.load(url);
        Laya.stage.addChild(this.video);
        Laya.stage.on("click", this, this.onStageClick);
    };
    Test_13_DomElement.prototype.onError = function (error) {
        alert(error.message);
    };
    Test_13_DomElement.prototype.onStageClick = function () {
        //切换播放和暂停
        if (!this.video.paused) {
            this.video.pause();
        }
        else {
            this.video.play();
        }
    };
    return Test_13_DomElement;
}());
exports.default = Test_13_DomElement;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkc6L0xheWEvTGF5YUFpcklERV9iZXRhL3Jlc291cmNlcy9hcHAvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9BcHBNYWluLnRzIiwic3JjL0ZyYW1ld29yay9FdmVudC9OZXRFdmVudERpc3BhdGNoZXIudHMiLCJzcmMvRnJhbWV3b3JrL05ldHdvcmsvR2FtZU1lc3NhZ2VOYW1lLnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL05ldFBhY2tldC50cyIsInNyYy9GcmFtZXdvcmsvTmV0d29yay9OZXR3b3JrTWFuYWdlci50cyIsInNyYy9GcmFtZXdvcmsvTmV0d29yay9Tb2NrZXRDb25uZWN0LnRzIiwic3JjL0dhbWVDb25maWcudHMiLCJzcmMvc2NyaXB0L01haW5VSS50cyIsInNyYy9zdHVkeS9UZXN0XzEyX1RpbGVkTWFwLnRzIiwic3JjL3N0dWR5L1Rlc3RfMTNfRG9tRWxlbWVudC50cyIsInNyYy9zdHVkeS9UZXN0XzlfVGltZUxpbmVVSS50cyIsInNyYy91aS9sYXlhTWF4VUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDVkEsSUFBTyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUM3QixJQUFPLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO0FBQ3pCLElBQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7QUFrQnpCLDJDQUFzQztBQUt0Qyw2REFBd0Q7QUFDeEQsaUVBQTREO0FBRTVELEtBQUs7QUFDTDtJQUNJO1FBQ0ksZ0JBQWdCO1FBQ2hCLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQVUsQ0FBQyxLQUFLLEVBQUUsb0JBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwRDthQUNJO1lBQ0QsdUJBQXVCO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzVELGdFQUFnRTtTQUNuRTtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUdsRCxvREFBb0Q7UUFDcEQsSUFBSSxvQkFBVSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNO1lBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDOUYsSUFBSSxvQkFBVSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUM7WUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMzRixJQUFJLG9CQUFVLENBQUMsSUFBSTtZQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFdEMsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFFN0IsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUdwSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsb0JBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQSx1Q0FBdUM7UUFDbkYsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsb0JBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQSwyQ0FBMkM7UUFDekYsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBRS9CLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLG9CQUFVLENBQUMsaUJBQWlCLENBQUM7UUFFMUQsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUN4QyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFFeEMsb0JBQW9CO1FBQ3BCLDBCQUEwQjtRQUUxQixrQ0FBa0M7UUFDbEMseUNBQXlDO0lBQzdDLENBQUM7SUFFRCxpQ0FBZSxHQUFmO1FBQ0ksK0NBQStDO1FBQy9DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQ3BHLENBQUM7SUFFRCxnQ0FBYyxHQUFkO1FBQ0ksWUFBWTtRQUNaLGtFQUFrRTtRQUVsRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVPLHVCQUFLLEdBQWI7UUFDSSxvQkFBb0I7UUFDcEIseUJBQXlCO1FBQ3pCLDBCQUEwQjtRQUMxQixxQ0FBcUM7UUFDckMsc0NBQXNDO1FBQ3RDLHFDQUFxQztRQUNyQyxzQ0FBc0M7UUFDdEMsd0JBQXdCO1FBQ3hCLDZCQUE2QjtRQUM3Qiw0QkFBNEI7UUFDNUIsbUNBQW1DO1FBQ25DLDRCQUE0QjtRQUM1Qix5QkFBeUI7UUFDekIsd0JBQXdCO1FBQ3hCLDBCQUEwQjtRQUMxQixzQkFBc0I7UUFDdEIsd0JBQXdCO1FBQ3hCLHNDQUFzQztRQUN0QyxJQUFJLDBCQUFnQixFQUFFLENBQUM7UUFDdkIsSUFBSSw0QkFBa0IsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FqRkEsQUFpRkMsSUFBQTtBQUVELE9BQU87QUFDUCxJQUFJLE9BQU8sRUFBRSxDQUFDOzs7O0FDakhkO0lBUUk7UUFGUSxvQkFBZSxHQUFxQyxFQUFFLENBQUE7SUFFdEMsQ0FBQztJQU5YLDhCQUFXLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQU1NLDRDQUFlLEdBQXRCLFVBQXVCLFNBQWlCLEVBQUUsR0FBYTtRQUNuRCxJQUFJLElBQUksR0FBb0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsSUFBSSxHQUFHLElBQUksS0FBSyxFQUFZLENBQUM7WUFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDMUM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFDTSw4Q0FBaUIsR0FBeEIsVUFBeUIsU0FBaUIsRUFBRSxHQUFhO1FBQ3JELElBQUksSUFBSSxHQUFvQixJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVELElBQUksSUFBSSxFQUFFO1lBQ04sSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN6QjtJQUNMLENBQUM7SUFDTSw0Q0FBZSxHQUF0QixVQUF1QixTQUFpQixFQUFFLFVBQWU7UUFDckQsSUFBSSxJQUFJLEdBQW9CLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUQsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztnQkFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUE7WUFDckMsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFDTSxxQ0FBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUE7SUFDN0IsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FwQ0EsQUFvQ0MsSUFBQTs7Ozs7QUNuQ0Q7O0dBRUc7QUFDSDtJQUFBO0lBaUJBLENBQUM7SUFkVSxzQkFBTSxHQUFiO1FBQ0ksSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFDO1lBQ3ZCLE9BQU8sZUFBZSxDQUFDLFVBQVUsQ0FBQTtTQUNwQztRQUNELGVBQWUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO1FBRTdCLGFBQWE7UUFDYixJQUFJLEdBQUcsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFBO1FBRXBDLEdBQUcsNkJBQStCLEdBQUMsa0JBQWtCLENBQUM7UUFDdEQsR0FBRyw2QkFBK0IsR0FBQyx3QkFBd0IsQ0FBQztRQUU1RCxPQUFPLEdBQUcsQ0FBQTtJQUNkLENBQUM7SUFmTSwwQkFBVSxHQUFHLEVBQUUsQ0FBQTtJQUNmLHNCQUFNLEdBQUcsS0FBSyxDQUFBO0lBZXpCLHNCQUFDO0NBakJELEFBaUJDLElBQUE7a0JBakJvQixlQUFlOzs7O0FDSnBDLElBQU8sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUE7QUFFdkI7SUFhSSxtQkFBWSxPQUFZO1FBWnhCLHFFQUFxRTtRQUNyRSx1REFBdUQ7UUFDdkQsb0RBQW9EO1FBQzdDLHNCQUFpQixHQUFXLEVBQUUsQ0FBQSxDQUFDLFdBQVc7UUFVN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUE7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFBLENBQUEsVUFBVTtJQUM3RCxDQUFDO0lBRUQsU0FBUztJQUNGLDhCQUFVLEdBQWpCLFVBQWtCLEtBQVU7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUEsQ0FBQSxRQUFRO1FBRTlCLHFCQUFxQjtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQzFDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDekMsNkVBQTZFO1FBQzdFLGlDQUFpQztRQUNqQyx1RUFBdUU7UUFDdkUsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUMxRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFFekUsMkNBQTJDO1FBQzNDLDZCQUE2QjtRQUM3QixHQUFHO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQXhDQSxBQXdDQyxJQUFBOzs7OztBQzFDRCxpREFBNEM7QUFFNUM7SUFJSSxvQkFBWSxFQUFZO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSw0QkFBTyxHQUFkLFVBQWUsSUFBWSxFQUFFLElBQVk7UUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLHVCQUFhLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLGlDQUFZLEdBQW5CLFVBQW9CLEdBQVc7UUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLHVCQUFhLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sOEJBQVMsR0FBaEI7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFTSxpQ0FBWSxHQUFuQjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVNLGdDQUFXLEdBQWxCO1FBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFTSw4QkFBUyxHQUFoQixVQUFpQixLQUFhO1FBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTSxnQ0FBVyxHQUFsQixVQUFtQixLQUFhLEVBQUUsR0FBUTtRQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FyQ0EsQUFxQ0MsSUFBQTtBQUdEO0lBU0k7UUFGUSxrQkFBYSxHQUFxQyxFQUFFLENBQUM7SUFFckMsQ0FBQztJQU5YLDBCQUFXLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUE7SUFDeEQsQ0FBQztJQU1EOztPQUVHO0lBQ0ksa0NBQVMsR0FBaEI7UUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU0scUNBQVksR0FBbkIsVUFBb0IsUUFBZ0IsRUFBRSxHQUFXO1FBQzdDLElBQUksTUFBTSxHQUFlLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGFBQWEsZUFBZ0IsR0FBRyxNQUFNLENBQUM7UUFDNUMsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVNLGtDQUFTLEdBQWhCLFVBQWlCLFFBQWtCO1FBQy9CLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDdEMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLG9DQUFXLEdBQWxCLFVBQW1CLFFBQWtCO1FBQ2pDLElBQUksTUFBTSxHQUFlLElBQUksQ0FBQyxTQUFTLGVBQWdCLENBQUE7UUFDdkQsSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLENBQUMsWUFBWSxFQUFFLENBQUE7U0FDeEI7SUFDTCxDQUFDO0lBRU0sd0NBQWUsR0FBdEIsVUFBdUIsUUFBa0I7UUFDckMsSUFBSSxNQUFNLEdBQWUsSUFBSSxDQUFDLFNBQVMsZUFBZ0IsQ0FBQTtRQUN2RCxJQUFJLE1BQU0sRUFBRTtZQUNSLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQTtTQUNyQjtJQUNMLENBQUM7SUFFTSx5Q0FBZ0IsR0FBdkIsVUFBd0IsS0FBYSxFQUFFLEdBQVE7UUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxnQkFBaUIsQ0FBQTtJQUNoRCxDQUFDO0lBRU0seUNBQWdCLEdBQXZCLFVBQXdCLEtBQWEsRUFBRSxHQUFRO1FBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsZ0JBQWlCLENBQUE7SUFDaEQsQ0FBQztJQUVNLHlDQUFnQixHQUF2QixVQUF3QixLQUFhLEVBQUUsR0FBUTtRQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxHQUFHLGdCQUFpQixDQUFBO0lBQ2hELENBQUM7SUFFTyxvQ0FBVyxHQUFuQixVQUFvQixLQUFhLEVBQUUsR0FBUSxFQUFFLFFBQWtCO1FBQzNELElBQUksTUFBTSxHQUFlLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDakQsSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtTQUNqQztJQUNMLENBQUM7SUFFTSx5Q0FBZ0IsR0FBdkIsVUFBd0IsS0FBYTtRQUNqQyxJQUFJLE1BQU0sR0FBZSxJQUFJLENBQUM7UUFDOUIsSUFBSSxLQUFLLDRDQUE4QyxJQUFJLEtBQUssMENBQTRDLEVBQUU7WUFDMUcsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLGVBQWdCLENBQUE7U0FDMUM7YUFDSTtZQUNELE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxlQUFnQixDQUFBO1NBQzFDO1FBQ0QsSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQzFCO0lBQ0wsQ0FBQztJQUVNLDJDQUFrQixHQUF6QjtRQUNJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUE7UUFDNUIsS0FBSyxJQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUU7WUFDbkIsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QixJQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3pCLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUMxQjtTQUNKO1FBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUE7SUFDM0IsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0F4RkEsQUF3RkMsSUFBQTs7Ozs7QUNsSUQsa0VBQTREO0FBQzVELHlDQUFtQztBQUNuQyxtREFBNkM7QUFDN0MscURBQWdEO0FBR2hEO0lBaUJJLGdEQUFnRDtJQUNoRCxtREFBbUQ7SUFFbkQsdUJBQVksSUFBWTtRQWxCeEIscUVBQXFFO1FBQ3JFLHVEQUF1RDtRQUN2RCxvREFBb0Q7UUFDNUMsc0JBQWlCLEdBQVcsRUFBRSxDQUFBLENBQUMsV0FBVztRQUczQyxXQUFNLEdBQWdCLElBQUksQ0FBQTtRQUN6QixjQUFTLEdBQWMsSUFBSSxDQUFBO1FBQzNCLGNBQVMsR0FBYyxJQUFJLENBQUE7UUFDM0IsY0FBUyxHQUFjLElBQUksQ0FBQTtRQUMzQixRQUFHLEdBQVcsSUFBSSxDQUFBO1FBQ2xCLFNBQUksR0FBVyxJQUFJLENBQUE7UUFDbkIsa0JBQWEsR0FBUSxJQUFJLENBQUE7UUFDekIsY0FBUyxHQUFRLElBQUksQ0FBQztRQU0xQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFBLENBQUEsVUFBVTtRQUN6RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFBLENBQUEsVUFBVTtRQUV6RCxzREFBc0Q7UUFDdEQseURBQXlEO1FBRXpELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDakQsSUFBSSxDQUFDLGFBQWEsR0FBRyx5QkFBZSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2pELENBQUM7SUFDTSwrQkFBTyxHQUFkLFVBQWUsSUFBWSxFQUFFLElBQVk7UUFDckMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFDRCx1QkFBdUI7SUFDaEIsb0NBQVksR0FBbkIsVUFBb0IsR0FBVztRQUMzQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtRQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUEsQ0FBQSxVQUFVO1FBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUM3RCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3pELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDN0QsQ0FBQztJQUNELE1BQU07SUFDQyxpQ0FBUyxHQUFoQjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDL0IsQ0FBQztJQUNELE1BQU07SUFDQyxvQ0FBWSxHQUFuQjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDdkIsQ0FBQztJQUNELE1BQU07SUFDQyxpQ0FBUyxHQUFoQjtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUE7SUFDaEMsQ0FBQztJQUNELFFBQVE7SUFDQSxtQ0FBVyxHQUFuQixVQUFvQixLQUFpQjtRQUFqQixzQkFBQSxFQUFBLFlBQWlCO1FBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFBO0lBQ2xELENBQUM7SUFDRCxRQUFRO0lBQ0Esb0NBQVksR0FBcEIsVUFBcUIsS0FBaUI7UUFBakIsc0JBQUEsRUFBQSxZQUFpQjtRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBQTtJQUNqRCxDQUFDO0lBQ0QsTUFBTTtJQUNFLG9DQUFZLEdBQXBCLFVBQXFCLENBQWE7UUFBYixrQkFBQSxFQUFBLFFBQWE7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUE7SUFDL0MsQ0FBQztJQUVELE9BQU87SUFDQSxpQ0FBUyxHQUFoQixVQUFpQixLQUFhO1FBQzFCLFVBQVU7UUFDVixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0lBRUQsTUFBTTtJQUNDLG1DQUFXLEdBQWxCLFVBQW1CLEtBQWEsRUFBRSxHQUFRO1FBQ3RDLCtCQUErQjtRQUMvQix3Q0FBd0M7UUFDeEMsc0NBQXNDO1FBQ3RDLEdBQUc7UUFDSCx3Q0FBd0M7UUFDeEMsNkNBQTZDO1FBQzdDLHNDQUFzQztRQUN0QyxHQUFHO1FBQ0gsTUFBTTtRQUNOO1lBQ0ksSUFBSSxNQUFNLEdBQWUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7U0FDbkM7SUFDTCxDQUFDO0lBRUQsU0FBUztJQUNELDRCQUFJLEdBQVosVUFBYSxLQUFhLEVBQUUsSUFBZTtRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFBO1lBQ3BELE9BQU07U0FDVDtRQUNELHFCQUFxQjtRQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyx3QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUE7UUFDckUsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2hDLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQy9ELGFBQWE7UUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUM1QywyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUN2QyxjQUFjO1FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQzFCLENBQUM7SUFFRCxPQUFPO0lBQ0Msc0NBQWMsR0FBdEIsVUFBdUIsR0FBUTtRQUMzQiwyRUFBMkU7UUFDM0UsSUFBSSxTQUFTLEdBQWMsSUFBSSxtQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzlDLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDekIsNEJBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUE7SUFDcEYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxpQ0FBUyxHQUFoQixVQUFpQixTQUFpQixFQUFFLE9BQVk7UUFDNUMsSUFBSSxXQUFXLEdBQVcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN2RCwrREFBK0Q7UUFDL0QsSUFBSSxNQUFNLEdBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkUsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxtQ0FBVyxHQUFsQixVQUFtQixTQUFpQixFQUFFLE9BQW1CO1FBQ3JELElBQUksV0FBVyxHQUFXLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDdkQsK0RBQStEO1FBQy9ELElBQUksT0FBTyxHQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9ELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFTCxvQkFBQztBQUFELENBMUpBLEFBMEpDLElBQUE7Ozs7O0FDaEtELGdHQUFnRztBQUNoRywwQ0FBb0M7QUFDcEMsK0RBQXlEO0FBQ3pEOztFQUVFO0FBQ0Y7SUFhSTtJQUFjLENBQUM7SUFDUixlQUFJLEdBQVg7UUFDSSxJQUFJLEdBQUcsR0FBYSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUM3QyxHQUFHLENBQUMsa0JBQWtCLEVBQUMsZ0JBQU0sQ0FBQyxDQUFDO1FBQy9CLEdBQUcsQ0FBQyw0QkFBNEIsRUFBQywyQkFBaUIsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFqQk0sZ0JBQUssR0FBUSxHQUFHLENBQUM7SUFDakIsaUJBQU0sR0FBUSxJQUFJLENBQUM7SUFDbkIsb0JBQVMsR0FBUSxhQUFhLENBQUM7SUFDL0IscUJBQVUsR0FBUSxZQUFZLENBQUM7SUFDL0IsaUJBQU0sR0FBUSxLQUFLLENBQUM7SUFDcEIsaUJBQU0sR0FBUSxNQUFNLENBQUM7SUFDckIscUJBQVUsR0FBSyxpQkFBaUIsQ0FBQztJQUNqQyxvQkFBUyxHQUFRLEVBQUUsQ0FBQztJQUNwQixnQkFBSyxHQUFTLElBQUksQ0FBQztJQUNuQixlQUFJLEdBQVMsSUFBSSxDQUFDO0lBQ2xCLHVCQUFZLEdBQVMsS0FBSyxDQUFDO0lBQzNCLDRCQUFpQixHQUFTLElBQUksQ0FBQztJQU8xQyxpQkFBQztDQW5CRCxBQW1CQyxJQUFBO2tCQW5Cb0IsVUFBVTtBQW9CL0IsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDOzs7O0FDMUJsQiw2Q0FBcUM7QUFDckMsc0VBQWlFO0FBQ2pFLDRFQUF1RTtBQUt2RSxLQUFLO0FBQ0w7SUFBb0MsMEJBQWM7SUFFOUM7ZUFBZ0IsaUJBQU87SUFBRSxDQUFDO0lBRTFCLHlCQUFRLEdBQVI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFFOUIsT0FBTyxDQUFDLEdBQUcsNkJBQStCLENBQUM7UUFFM0MsNEJBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSw4QkFBZ0MsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUEsQ0FBQSxFQUFFO0lBQ2xILENBQUM7SUFFRCwwQkFBUyxHQUFUO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1FBRS9CLDRCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQiw4QkFBZ0MsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUEsQ0FBQSxFQUFFO0lBQ3BILENBQUM7SUFHTyx1Q0FBc0IsR0FBOUIsVUFBK0IsVUFBb0I7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDakUsQ0FBQztJQUdELHdCQUFPLEdBQVA7UUFFSSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2RCxhQUFhO1FBQ2IsbUNBQW1DO1FBQ25DLG1EQUFtRDtRQUNuRCx3Q0FBd0M7UUFDeEMsR0FBRztRQUNILDhDQUE4QztRQUM5Qyw4Q0FBOEM7UUFDOUMsNEZBQTRGO1FBQzVGLHNCQUFzQjtRQUN0QixFQUFFO1FBRUYsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLDBCQUEwQixDQUFDLENBQUM7UUFDekUsY0FBYztRQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTyw0QkFBVyxHQUFuQjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0IsSUFBSSxHQUFHLEdBQUc7WUFDTixPQUFPLEVBQUUsT0FBTztZQUNoQixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLE1BQU0sRUFBRSxDQUFDO1NBQ1osQ0FBQTtRQUNELHdCQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLDhCQUFpQyxHQUFHLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBQ0wsYUFBQztBQUFELENBckRBLEFBcURDLENBckRtQyxjQUFFLENBQUMsV0FBVyxHQXFEakQ7Ozs7O0FDN0REO0lBOEJJO1FBTFEsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ2pCLFNBQUksR0FBVyxDQUFDLENBQUM7UUFJckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hDLE9BQU87UUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvRCxjQUFjO1FBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQyxvQkFBb0I7UUFDcEIsSUFBSSxRQUFRLEdBQW1CLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BELHFEQUFxRDtRQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQy9HLENBQUM7SUFDTyxzQ0FBVyxHQUFuQjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0IsZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLFVBQVU7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFDRDs7T0FFRztJQUNLLG9DQUFTLEdBQWpCO1FBQ0ksSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2RSxJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3RFLFFBQVE7UUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUNPLGtDQUFPLEdBQWY7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUNPLG9DQUFTLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUNEOzs7T0FHRztJQUNLLGlDQUFNLEdBQWQ7UUFDSSxRQUFRO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUdMLHVCQUFDO0FBQUQsQ0FqRkEsQUFpRkMsSUFBQTs7Ozs7QUNqRkQ7SUFDSTtRQXNFQSxLQUFLO1FBQ0csVUFBSyxHQUFlLElBQUksQ0FBQTtRQXRFNUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxLQUFLO0lBQ0csMkNBQWMsR0FBdEI7UUFDSSxJQUFJLElBQUksR0FBVyxxQkFBcUIsR0FBRyxtRUFBbUU7WUFDMUcsNENBQTRDO1lBQzVDLG1FQUFtRTtZQUNuRSxrQkFBa0I7WUFDbEIsNkxBQTZMO1lBQzdMLGVBQWU7WUFDZixRQUFRO1lBQ1Isa0JBQWtCO1lBQ2xCLFFBQVEsQ0FBQztRQUNiLElBQUksRUFBRSxHQUFnQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN4QyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNmLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxLQUFLO0lBQ0csdUNBQVUsR0FBbEI7UUFDSSxJQUFJLEdBQUcsR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUQsSUFBSSxNQUFNLEdBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ2xELEtBQUssRUFBRSxHQUFHO1lBQ1YsTUFBTSxFQUFFLEdBQUc7U0FDZCxDQUFDLENBQUM7UUFDSCxJQUFJLEdBQUcsR0FBVyxxQkFBcUIsQ0FBQztRQUV4QyxvQ0FBb0M7UUFDcEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBLHFCQUFxQjtRQUUxQyxJQUFJLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU5QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO1lBQ3hCLElBQUksR0FBRyxHQUFXLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBLDJCQUEyQjtZQUMzRSw0QkFBNEI7WUFFNUIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE9BQU87SUFDQyxzQ0FBUyxHQUFqQjtRQUNJLElBQUksR0FBRyxHQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBLFlBQVk7UUFDbkQsSUFBSSxJQUFJLEdBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUEsWUFBWTtRQUNyRCwrQkFBK0I7UUFDL0IsSUFBSSxLQUFLLEdBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ25CLElBQUksR0FBRyxHQUFRLElBQUksR0FBRyxFQUFFLENBQUM7WUFDekIsU0FBUztZQUNULEdBQUcsQ0FBQyxVQUFVLENBQUMsdURBQXVELENBQUMsQ0FBQztZQUN4RSxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZCLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUU7Z0JBQy9CLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBSU8sdUNBQVUsR0FBbEI7UUFDSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssS0FBSyxFQUFFO1lBQ2xDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNyQjthQUNJO1lBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksT0FBTyxHQUFRO2dCQUNmLEtBQUssRUFBRSxJQUFJO2dCQUNYLEtBQUssRUFBRTtvQkFDSCxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO29CQUNwQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO29CQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO2lCQUM1QjthQUNKLENBQUM7WUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDcEg7SUFDTCxDQUFDO0lBQ08sd0NBQVcsR0FBbkI7UUFDSSxJQUFJLEdBQUcsR0FBYyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixHQUFHLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztRQUN2QixHQUFHLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN0QixHQUFHLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNuQixHQUFHLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUN0QixHQUFHLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztRQUNyQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUNPLHNDQUFTLEdBQWpCLFVBQWtCLEdBQVc7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUNPLG9DQUFPLEdBQWYsVUFBZ0IsS0FBWTtRQUN4QixLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDTyx5Q0FBWSxHQUFwQjtRQUNJLFNBQVM7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN0QjthQUNJO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFFTCx5QkFBQztBQUFELENBdkhBLEFBdUhDLElBQUE7Ozs7O0FDcEhEO0lBRUk7UUFDSSxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFTyxvQ0FBUSxHQUFoQjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtRQUNuQyxVQUFVO1FBQ1Ysd0NBQXdDO1FBQ3hDLE9BQU87UUFDUCw0QkFBNEI7UUFDNUIsWUFBWTtRQUNaLG1CQUFtQjtJQUN2QixDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQWhCQSxBQWdCQyxJQUFBOzs7OztBQ2pCRCxJQUFPLE1BQU0sR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzFCLElBQU8sS0FBSyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDeEIsSUFBSSxHQUFHLEdBQWEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7QUFDN0MsSUFBYyxFQUFFLENBa0JmO0FBbEJELFdBQWMsRUFBRTtJQUNaO1FBQWlDLCtCQUFLO1FBQ2xDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixvQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQ0wsa0JBQUM7SUFBRCxDQU5BLEFBTUMsQ0FOZ0MsS0FBSyxHQU1yQztJQU5ZLGNBQVcsY0FNdkIsQ0FBQTtJQUNELEdBQUcsQ0FBQyxnQkFBZ0IsRUFBQyxXQUFXLENBQUMsQ0FBQztJQUNsQztRQUFnQyw4QkFBTTtRQUVsQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsbUNBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FQQSxBQU9DLENBUCtCLE1BQU0sR0FPckM7SUFQWSxhQUFVLGFBT3RCLENBQUE7SUFDRCxHQUFHLENBQUMsZUFBZSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BDLENBQUMsRUFsQmEsRUFBRSxHQUFGLFVBQUUsS0FBRixVQUFFLFFBa0JmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBCcm93c2VyID0gTGF5YS5Ccm93c2VyXHJcbmltcG9ydCBXZWJHTCA9IExheWEuV2ViR0xcclxuaW1wb3J0IFN0YWdlID0gTGF5YS5TdGFnZVxyXG5cclxuaW1wb3J0IFRlc3RfMV9UZXh0IGZyb20gJy4vc3R1ZHkvVGVzdF8xX1RleHQnO1xyXG5pbXBvcnQgVGVzdF8yX0lucHV0VGVzdCBmcm9tICcuL3N0dWR5L1Rlc3RfMl9JbnB1dFRlc3QnO1xyXG5pbXBvcnQgVGVzdF8zX0JpdG1hcEZvbnQgZnJvbSAnLi9zdHVkeS9UZXN0XzNfQml0bWFwRm9udCc7XHJcbmltcG9ydCBUZXN0XzRfMV9TcHJpdGVfRGlzcGxheUltYWdlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSc7XHJcbmltcG9ydCBUZXN0XzRfMV9TcHJpdGVfU3dpdGNoVGV4dHVyZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8xX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlJztcclxuaW1wb3J0IFRlc3RfNF8yX1Nwcml0ZV9EaXNwbGF5SW1hZ2UgZnJvbSAnLi9zdHVkeS9UZXN0XzRfMl9TcHJpdGVfRGlzcGxheUltYWdlJztcclxuaW1wb3J0IFRlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzJfU3ByaXRlX1N3aXRjaFRleHR1cmUnO1xyXG5pbXBvcnQgVGVzdF80X01hc2tEZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF80X01hc2tEZW1vJztcclxuaW1wb3J0IFRlc3RfNV8xX0NvbG9yRmlsdGVyIGZyb20gJy4vc3R1ZHkvVGVzdF81XzFfQ29sb3JGaWx0ZXInO1xyXG5pbXBvcnQgVGVzdF81XzJfR2xvd0ZpbHRlciBmcm9tICcuL3N0dWR5L1Rlc3RfNV8yX0dsb3dGaWx0ZXInO1xyXG5pbXBvcnQgVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMgZnJvbSAnLi9zdHVkeS9UZXN0XzZfMV9TcHJpdGVfRHJhd1NoYXBlcyc7XHJcbmltcG9ydCBUZXN0XzdfQXRsYXNBbmlEZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF83X0F0bGFzQW5pRGVtbyc7XHJcbmltcG9ydCBUZXN0XzhfVHdlZW5EZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF84X1R3ZWVuRGVtbyc7XHJcbmltcG9ydCBUZXN0XzlfVGltZUxpbmUgZnJvbSAnLi9zdHVkeS9UZXN0XzlfVGltZUxpbmUnO1xyXG5pbXBvcnQgVGVzdF85X1RpbWVMaW5lVUkgZnJvbSAnLi9zdHVkeS9UZXN0XzlfVGltZUxpbmVVSSc7XHJcbmltcG9ydCBUZXN0XzExX1NvdW5kIGZyb20gJy4vc3R1ZHkvVGVzdF8xMV9Tb3VuZCc7XHJcbmltcG9ydCBHYW1lQ29uZmlnIGZyb20gJy4vR2FtZUNvbmZpZyc7XHJcbmltcG9ydCBUZXN0XzBfMV9DaGFubmVsIGZyb20gJy4vc3R1ZHkvVGVzdF8wXzFfQ2hhbm5lbCc7XHJcbmltcG9ydCBUZXN0XzBfMV9Tb2NrZXQgZnJvbSAnLi9zdHVkeS9UZXN0XzBfMV9Tb2NrZXQnO1xyXG5pbXBvcnQgVGVzdF8wX05ldHdvcmtfUHJvdG9jb2xCdWZmZXIgZnJvbSAnLi9zdHVkeS9UZXN0XzBfTmV0d29ya19Qcm90b2NvbEJ1ZmZlcic7XHJcbmltcG9ydCBOZXR3b3JrTWFuYWdlciBmcm9tICcuL0ZyYW1ld29yay9OZXR3b3JrL05ldHdvcmtNYW5hZ2VyJztcclxuaW1wb3J0IFRlc3RfMTJfVGlsZWRNYXAgZnJvbSAnLi9zdHVkeS9UZXN0XzEyX1RpbGVkTWFwJztcclxuaW1wb3J0IFRlc3RfMTNfRG9tRWxlbWVudCBmcm9tICcuL3N0dWR5L1Rlc3RfMTNfRG9tRWxlbWVudCc7XHJcblxyXG4vL+WQr+WKqOexu1xyXG5jbGFzcyBBcHBNYWluIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8v5qC55o2uSURF6K6+572u5Yid5aeL5YyW5byV5pOOXHRcdFxyXG4gICAgICAgIGlmICh3aW5kb3dbXCJMYXlhM0RcIl0pIHtcclxuICAgICAgICAgICAgTGF5YTNELmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5LiN5pSv5oyBV2ViR0zml7boh6rliqjliIfmjaLoh7NDYW52YXNcclxuICAgICAgICAgICAgTGF5YS5pbml0KEJyb3dzZXIuY2xpZW50V2lkdGgsIEJyb3dzZXIuY2xpZW50SGVpZ2h0LCBXZWJHTCk7XHJcbiAgICAgICAgICAgIC8vTGF5YS5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0LCBMYXlhW1wiV2ViR0xcIl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBMYXlhW1wiUGh5c2ljc1wiXSAmJiBMYXlhW1wiUGh5c2ljc1wiXS5lbmFibGUoKTtcclxuICAgICAgICBMYXlhW1wiRGVidWdQYW5lbFwiXSAmJiBMYXlhW1wiRGVidWdQYW5lbFwiXS5lbmFibGUoKTtcclxuXHJcblxyXG4gICAgICAgIC8v5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iVxyXG4gICAgICAgIGlmIChHYW1lQ29uZmlnLmRlYnVnIHx8IExheWEuVXRpbHMuZ2V0UXVlcnlTdHJpbmcoXCJkZWJ1Z1wiKSA9PSBcInRydWVcIikgTGF5YS5lbmFibGVEZWJ1Z1BhbmVsKCk7XHJcbiAgICAgICAgaWYgKEdhbWVDb25maWcucGh5c2ljc0RlYnVnICYmIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdKSBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXS5lbmFibGUoKTtcclxuICAgICAgICBpZiAoR2FtZUNvbmZpZy5zdGF0KSBMYXlhLlN0YXQuc2hvdygpO1xyXG5cclxuICAgICAgICAvL+ihqOekuuaYr+WQpuaNleiOt+WFqOWxgOmUmeivr+W5tuW8ueWHuuaPkOekuuOAglxyXG4gICAgICAgIExheWEuYWxlcnRHbG9iYWxFcnJvciA9IHRydWU7XHJcblxyXG4gICAgICAgIC8v5r+A5rS76LWE5rqQ54mI5pys5o6n5Yi277yMdmVyc2lvbi5qc29u55SxSURF5Y+R5biD5Yqf6IO96Ieq5Yqo55Sf5oiQ77yM5aaC5p6c5rKh5pyJ5Lmf5LiN5b2x5ZON5ZCO57ut5rWB56iLXHJcbiAgICAgICAgTGF5YS5SZXNvdXJjZVZlcnNpb24uZW5hYmxlKFwidmVyc2lvbi5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vblZlcnNpb25Mb2FkZWQpLCBMYXlhLlJlc291cmNlVmVyc2lvbi5GSUxFTkFNRV9WRVJTSU9OKTtcclxuXHJcblxyXG4gICAgICAgIExheWEuc3RhZ2UuYWxpZ25WID0gU3RhZ2UuQUxJR05fTUlERExFO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWxpZ25IID0gU3RhZ2UuQUxJR05fQ0VOVEVSO1xyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gR2FtZUNvbmZpZy5zY2FsZU1vZGU7Ly9TdGFnZS5TQ0FMRV9GVUxMOy8vU0NBTEVfRklYRURfSEVJR0hUXHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gR2FtZUNvbmZpZy5zY3JlZW5Nb2RlOy8vU3RhZ2UuU0NSRUVOX0hPUklaT05UQUw7Ly9TQ1JFRU5fVkVSVElDQUxcclxuICAgICAgICBMYXlhLnN0YWdlLmJnQ29sb3IgPSBcIiM3ZjdmN2ZcIjtcclxuXHJcbiAgICAgICAgLy/lhbzlrrnlvq7kv6HkuI3mlK/mjIHliqDovb1zY2VuZeWQjue8gOWcuuaZr1xyXG4gICAgICAgIExheWEuVVJMLmV4cG9ydFNjZW5lVG9Kc29uID0gR2FtZUNvbmZpZy5leHBvcnRTY2VuZVRvSnNvbjtcclxuXHJcbiAgICAgICAgLy/lpoLmnpzpgJrov4forr7lpIfpnZnpn7PplK7orqnpn7PpopHoh6rliqjot5/pmo/orr7lpIfpnZnpn7PjgILpnIDopoHlsIZ1c2VBdWRpb011c2lj6K6+572u5Li6ZmFsc2XjgIJcclxuICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci51c2VBdWRpb011c2ljID0gZmFsc2U7XHJcbiAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIuYXV0b1N0b3BNdXNpYyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvL+a2iOmZpOefoumHj+e7mOWItueahOmUr+m9v++8jOS9huS8muWinuWKoOaAp+iDvea2iOiAl1xyXG4gICAgICAgIC8vQ29uZmlnLmlzQW50aWFsaWFzPXRydWU7XHJcblxyXG4gICAgICAgIC8v6ZSA5q+B5b2T5YmN5rKh5pyJ6KKr5L2/55So55qE6LWE5rqQLOivpeWHveaVsOS8muW/veeVpWxvY2s9dHJ1ZeeahOi1hOa6kOOAglxyXG4gICAgICAgIC8vTGF5YS5SZXNvdXJjZS5kZXN0cm95VW51c2VkUmVzb3VyY2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25WZXJzaW9uTG9hZGVkKCk6IHZvaWQge1xyXG4gICAgICAgIC8v5r+A5rS75aSn5bCP5Zu+5pig5bCE77yM5Yqg6L295bCP5Zu+55qE5pe25YCZ77yM5aaC5p6c5Y+R546w5bCP5Zu+5Zyo5aSn5Zu+5ZCI6ZuG6YeM6Z2i77yM5YiZ5LyY5YWI5Yqg6L295aSn5Zu+5ZCI6ZuG77yM6ICM5LiN5piv5bCP5Zu+XHJcbiAgICAgICAgTGF5YS5BdGxhc0luZm9NYW5hZ2VyLmVuYWJsZShcImZpbGVjb25maWcuanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25Db25maWdMb2FkZWQpKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNvbmZpZ0xvYWRlZCgpOiB2b2lkIHtcclxuICAgICAgICAvL+WKoOi9vUlEReaMh+WumueahOWcuuaZr1xyXG4gICAgICAgIC8vR2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUpO1xyXG5cclxuICAgICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXR1cCgpOiB2b2lkIHtcclxuICAgICAgICAvL25ldyBUZXN0XzFfVGV4dCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMl9JbnB1dFRlc3QoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzNfQml0bWFwRm9udCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8xX1Nwcml0ZV9EaXNwbGF5SW1hZ2UoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzRfMV9TcHJpdGVfU3dpdGNoVGV4dHVyZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8yX1Nwcml0ZV9EaXNwbGF5SW1hZ2UoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzRfMl9TcHJpdGVfU3dpdGNoVGV4dHVyZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF9NYXNrRGVtbygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNV8xX0NvbG9yRmlsdGVyKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF81XzJfR2xvd0ZpbHRlcigpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNl8xX1Nwcml0ZV9EcmF3U2hhcGVzKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF83X0F0bGFzQW5pRGVtbygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfOF9Ud2VlbkRlbW8oKTtcclxuICAgICAgICAvL25ldyBUZXN0XzlfVGltZUxpbmUoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzlfVGltZUxpbmVVSSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMTFfU291bmQoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzBfMV9Tb2NrZXQoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzBfTmV0d29ya19Qcm90b2NvbEJ1ZmZlcigpO1xyXG4gICAgICAgIG5ldyBUZXN0XzEyX1RpbGVkTWFwKCk7XHJcbiAgICAgICAgbmV3IFRlc3RfMTNfRG9tRWxlbWVudCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgQXBwTWFpbigpOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ldEV2ZW50RGlzcGF0Y2hlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogTmV0RXZlbnREaXNwYXRjaGVyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBOZXRFdmVudERpc3BhdGNoZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlIHx8ICh0aGlzLmluc3RhbmNlID0gbmV3IHRoaXMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlSGFuZGxlcnM6IHsgW2luZGV4OiBudW1iZXJdOiBGdW5jdGlvbltdOyB9ID0ge31cclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyTWVzc2FnZShtZXNzYWdlSUQ6IG51bWJlciwgZnVuOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHZhciBmdW5zOiBBcnJheTxGdW5jdGlvbj4gPSB0aGlzLm1lc3NhZ2VIYW5kbGVyc1ttZXNzYWdlSURdO1xyXG4gICAgICAgIGlmICghZnVucykge1xyXG4gICAgICAgICAgICBmdW5zID0gbmV3IEFycmF5PEZ1bmN0aW9uPigpO1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VIYW5kbGVyc1ttZXNzYWdlSURdID0gZnVucztcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVucy5wdXNoKGZ1bik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdW5SZWdpc3Rlck1lc3NhZ2UobWVzc2FnZUlEOiBudW1iZXIsIGZ1bjogRnVuY3Rpb24pIHtcclxuICAgICAgICB2YXIgZnVuczogQXJyYXk8RnVuY3Rpb24+ID0gdGhpcy5tZXNzYWdlSGFuZGxlcnNbbWVzc2FnZUlEXTtcclxuICAgICAgICBpZiAoZnVucykge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXg6IG51bWJlciA9IGZ1bnMuaW5kZXhPZihmdW4pO1xyXG4gICAgICAgICAgICBmdW5zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGRpc3BhdGNoTWVzc2FnZShtZXNzYWdlSUQ6IG51bWJlciwgbmV0UGFja2FnZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdmFyIGZ1bnM6IEFycmF5PEZ1bmN0aW9uPiA9IHRoaXMubWVzc2FnZUhhbmRsZXJzW21lc3NhZ2VJRF07XHJcbiAgICAgICAgaWYgKGZ1bnMpIHtcclxuICAgICAgICAgICAgZnVucy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jYWxsKGVsZW1lbnQsIG5ldFBhY2thZ2UpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBDbGVhckFsbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1lc3NhZ2VIYW5kbGVycyA9IHt9XHJcbiAgICB9XHJcbn0iLCJcclxuLyoqXHJcbiAqIFByb3RvYnVmIOa2iOaBr+WQjeensOWMuemFjVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU1lc3NhZ2VOYW1lIHtcclxuICAgIHN0YXRpYyBtZXNzYWdlTWFwID0ge31cclxuICAgIHN0YXRpYyBpc0luaXQgPSBmYWxzZVxyXG4gICAgc3RhdGljIGdldE1hcCgpOiBhbnkge1xyXG4gICAgICAgIGlmIChHYW1lTWVzc2FnZU5hbWUuaXNJbml0KXtcclxuICAgICAgICAgICAgcmV0dXJuIEdhbWVNZXNzYWdlTmFtZS5tZXNzYWdlTWFwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWVNZXNzYWdlTmFtZS5pc0luaXQgPSB0cnVlXHJcblxyXG4gICAgICAgIC8vTWVzc2FnZU5hbWVcclxuICAgICAgICBsZXQgbWFwID0gR2FtZU1lc3NhZ2VOYW1lLm1lc3NhZ2VNYXBcclxuXHJcbiAgICAgICAgbWFwW0dhbWVNZXNzYWdlLkdNX1ZFUklGWV9WRVJTSU9OXT0nR01fVmVyaWZ5VmVyc2lvbic7XHJcbiAgICAgICAgbWFwW0dhbWVNZXNzYWdlLkdNX1ZFUlNJT05fUkVUVVJOXT0nR01fVmVyaWZ5VmVyc2lvblJldHVybic7XHJcblxyXG4gICAgICAgIHJldHVybiBtYXBcclxuICAgIH1cclxufSIsImltcG9ydCBCeXRlID0gTGF5YS5CeXRlXHJcbmltcG9ydCBTb2NrZXRDb25uZWN0IGZyb20gXCIuL1NvY2tldENvbm5lY3RcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXRQYWNrZXQge1xyXG4gICAgLy9wcml2YXRlIFdFQlBBQ0tfSEVBRF9PRkZTRVQ6IG51bWJlciA9IDBcdC8vIOiHquWumuS5ieaVsOaNriDkuIDoiKzmmK9yb2xlaWQgKGxvbmfnsbvlnospXHJcbiAgICAvL3ByaXZhdGUgV0VCUEFDS19NRVNTU0FHRUlEX09GRlNFVDogbnVtYmVyID0gOFx0Ly8g5raI5oGvaWRcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX0xFTkdUSF9PRkZTRVQ6IG51bWJlciA9IDEyXHQvLyDmtojmga/plb/luqZcclxuICAgIHB1YmxpYyBXRUJQQUNLX0hFQURfU0laRTogbnVtYmVyID0gMTZcdC8vIOa2iOaBr+aVsOaNruW8gOWni+S9jee9rlxyXG5cclxuICAgIHB1YmxpYyByb2xlSWQ6IG51bWJlclxyXG4gICAgcHVibGljIG1lc3NhZ2VJZDogbnVtYmVyXHJcbiAgICBwdWJsaWMgbWVzc2FnZTogYW55XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkQnl0ZXM6IEJ5dGVcclxuICAgIHByaXZhdGUgc29ja2V0Q29ubmVjdDogU29ja2V0Q29ubmVjdFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbm5lY3Q6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdCA9IGNvbm5lY3RcclxuICAgICAgICB0aGlzLnJlYWRCeXRlcyA9IG5ldyBCeXRlKClcclxuICAgICAgICB0aGlzLnJlYWRCeXRlcy5lbmRpYW4gPSBMYXlhLkJ5dGUuTElUVExFX0VORElBTi8v6L+Z6YeM5oiR5Lus6YeH55So5bCP56uvXHJcbiAgICB9XHJcblxyXG4gICAgLy/mjqXmlLbmnI3liqHlmajkv6Hmga9cclxuICAgIHB1YmxpYyByZWNlaXZlTXNnKGJ5dGVzOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlYWRCeXRlcy53cml0ZUFycmF5QnVmZmVyKGJ5dGVzKVxyXG4gICAgICAgIHRoaXMucmVhZEJ5dGVzLnBvcyA9IDAvL+iuvue9ruWBj+enu+aMh+mSiFxyXG5cclxuICAgICAgICAvL+aMieeFp+acjeWKoeWZqOS8oOmAkui/h+adpeeahOaVsOaNru+8jOaMieeFp+mhuuW6j+ivu+WPllxyXG4gICAgICAgIHRoaXMucm9sZUlkID0gdGhpcy5yZWFkQnl0ZXMuZ2V0RmxvYXQ2NCgpXHJcbiAgICAgICAgdGhpcy5tZXNzYWdlSWQgPSB0aGlzLnJlYWRCeXRlcy5nZXRJbnQzMigpXHJcbiAgICAgICAgbGV0IG1zZ0xlbmd0aCA9IHRoaXMucmVhZEJ5dGVzLmdldEludDMyKClcclxuICAgICAgICAvL2xldCBhYiA9IHRoaXMucmVhZEJ5dGVzLnJlYWRBcnJheUJ1ZmZlcihtc2dMZW5ndGggLSB0aGlzLldFQlBBQ0tfSEVBRF9TSVpFKVxyXG4gICAgICAgIC8vbGV0IGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KGFiKVxyXG4gICAgICAgIC8vdGhpcy5tZXNzYWdlID0gdGhpcy5zb2NrZXRDb25uZWN0LmRlc2VyaWFsaXplKHRoaXMubWVzc2FnZUlkLCBidWZmZXIpXHJcbiAgICAgICAgbGV0IHVpbnQ4QXJyYXkgPSB0aGlzLnJlYWRCeXRlcy5yZWFkVWludDhBcnJheSh0aGlzLldFQlBBQ0tfSEVBRF9TSVpFLCBtc2dMZW5ndGggLSB0aGlzLldFQlBBQ0tfSEVBRF9TSVpFKVxyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IHRoaXMuc29ja2V0Q29ubmVjdC5kZXNlcmlhbGl6ZSh0aGlzLm1lc3NhZ2VJZCwgdWludDhBcnJheSlcclxuXHJcbiAgICAgICAgLy9pZiAobXNnTGVuZ3RoICE9IHRoaXMucmVhZEJ5dGVzLmxlbmd0aCkge1xyXG4gICAgICAgIC8vICAgIGNvbnNvbGUuZXJyb3IoXCLmtojmga/plb/kuI3kuIDmoLdcIilcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgdGhpcy5yZWFkQnl0ZXMuY2xlYXIoKVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFNvY2tldENvbm5lY3QgZnJvbSBcIi4vU29ja2V0Q29ubmVjdFwiO1xyXG5cclxuY2xhc3MgR2FtZUNsaWVudCB7XHJcbiAgICBwcml2YXRlIGNsaWVudElkOiBDbGllbnRJRDtcclxuICAgIHByaXZhdGUgc29ja2V0Q29ubmVjdDogU29ja2V0Q29ubmVjdDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogQ2xpZW50SUQpIHtcclxuICAgICAgICB0aGlzLmNsaWVudElkID0gaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbm5lY3QoaG9zdDogc3RyaW5nLCBwb3J0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QgPSBuZXcgU29ja2V0Q29ubmVjdChcIiBjbGllbnRJZDpcIiArIHRoaXMuY2xpZW50SWQpO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5jb25uZWN0KGhvc3QsIHBvcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25uZWN0QnlVcmwodXJsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QgPSBuZXcgU29ja2V0Q29ubmVjdChcIiBjbGllbnRJZDpcIiArIHRoaXMuY2xpZW50SWQpO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5jb25uZWN0QnlVcmwodXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVjb25uZWN0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5yZWNvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzY29ubmVjdGVkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5kaXNjb25uZWN0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNDb25uZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ja2V0Q29ubmVjdC5jb25uZWN0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZEVtcHR5KG1zZ0lkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3Quc2VuZEVtcHR5KG1zZ0lkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgbXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3Quc2VuZE1lc3NhZ2UobXNnSWQsIG1zZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXR3b3JrTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogTmV0d29ya01hbmFnZXI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBOZXR3b3JrTWFuYWdlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2UgfHwgKHRoaXMuaW5zdGFuY2UgPSBuZXcgdGhpcygpKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2FtZUNsaWVudE1hcDogeyBbaW5kZXg6IG51bWJlcl06IEdhbWVDbGllbnQ7IH0gPSB7fTtcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bop5LoibJJRFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Um9sZUlkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucG93KDIsIDUzKSAtIDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZUNsaWVudChjbGllbnRJRDogbnVtYmVyLCB1cmw6IHN0cmluZyk6IEdhbWVDbGllbnQge1xyXG4gICAgICAgIHZhciBjbGllbnQ6IEdhbWVDbGllbnQgPSBuZXcgR2FtZUNsaWVudChjbGllbnRJRCk7XHJcbiAgICAgICAgY2xpZW50LmNvbm5lY3RCeVVybCh1cmwpO1xyXG4gICAgICAgIHRoaXMuZ2FtZUNsaWVudE1hcFtDbGllbnRJRC5sb2dpbl0gPSBjbGllbnQ7XHJcbiAgICAgICAgcmV0dXJuIGNsaWVudDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q2xpZW50KGNsaWVudElEOiBDbGllbnRJRCk6IEdhbWVDbGllbnQge1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWVDbGllbnRNYXBbY2xpZW50SURdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZUNsaWVudE1hcFtjbGllbnRJRF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZUNsaWVudChjbGllbnRJRDogQ2xpZW50SUQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2xpZW50OiBHYW1lQ2xpZW50ID0gdGhpcy5nZXRDbGllbnQoQ2xpZW50SUQubG9naW4pXHJcbiAgICAgICAgaWYgKGNsaWVudCkge1xyXG4gICAgICAgICAgICBjbGllbnQuZGlzY29ubmVjdGVkKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlY29ubmVjdENsaWVudChjbGllbnRJRDogQ2xpZW50SUQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2xpZW50OiBHYW1lQ2xpZW50ID0gdGhpcy5nZXRDbGllbnQoQ2xpZW50SUQubG9naW4pXHJcbiAgICAgICAgaWYgKGNsaWVudCkge1xyXG4gICAgICAgICAgICBjbGllbnQucmVjb25uZWN0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ2luU2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgbXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKG1zZ0lkLCBtc2csIENsaWVudElELmxvZ2luKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dpY1NlbmRNZXNzYWdlKG1zZ0lkOiBudW1iZXIsIG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShtc2dJZCwgbXNnLCBDbGllbnRJRC5sb2dpYylcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2NlbmVTZW5kTWVzc2FnZShtc2dJZDogbnVtYmVyLCBtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UobXNnSWQsIG1zZywgQ2xpZW50SUQuc2NlbmUpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kTWVzc2FnZShtc2dJZDogbnVtYmVyLCBtc2c6IGFueSwgY2xpZW50SUQ6IENsaWVudElEKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNsaWVudDogR2FtZUNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KGNsaWVudElEKVxyXG4gICAgICAgIGlmIChjbGllbnQpIHtcclxuICAgICAgICAgICAgY2xpZW50LnNlbmRNZXNzYWdlKG1zZ0lkLCBtc2cpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kTWVzc2FnZUVtcHR5KG1zZ0lkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2xpZW50OiBHYW1lQ2xpZW50ID0gbnVsbDtcclxuICAgICAgICBpZiAobXNnSWQgPiBHYW1lTWVzc2FnZS5HTV9BQ0NPVU5UX1NFUlZFUl9NRVNTQUdFX1NUQVJUICYmIG1zZ0lkIDwgR2FtZU1lc3NhZ2UuR01fQUNDT1VOVF9TRVJWRVJfTUVTU0FHRV9FTkQpIHtcclxuICAgICAgICAgICAgY2xpZW50ID0gdGhpcy5nZXRDbGllbnQoQ2xpZW50SUQubG9naW4pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjbGllbnQgPSB0aGlzLmdldENsaWVudChDbGllbnRJRC5sb2dpYylcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNsaWVudCkge1xyXG4gICAgICAgICAgICBjbGllbnQuc2VuZEVtcHR5KG1zZ0lkKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJBbGxHYW1lQ2xpZW50KCkge1xyXG4gICAgICAgIGxldCBkaWMgPSB0aGlzLmdhbWVDbGllbnRNYXBcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkaWMpIHtcclxuICAgICAgICAgICAgaWYgKGRpYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZGljW2tleV07XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmRpc2Nvbm5lY3RlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2FtZUNsaWVudE1hcCA9IHt9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgTmV0RXZlbnREaXNwYXRjaGVyIGZyb20gXCIuLi9FdmVudC9OZXRFdmVudERpc3BhdGNoZXJcIlxyXG5pbXBvcnQgTmV0UGFja2V0IGZyb20gXCIuL05ldFBhY2tldFwiXHJcbmltcG9ydCBOZXR3b3JrTWFuYWdlciBmcm9tIFwiLi9OZXR3b3JrTWFuYWdlclwiXHJcbmltcG9ydCBHYW1lTWVzc2FnZU5hbWUgZnJvbSBcIi4vR2FtZU1lc3NhZ2VOYW1lXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29ja2V0Q29ubmVjdCB7XHJcblxyXG4gICAgLy9wcml2YXRlIFdFQlBBQ0tfSEVBRF9PRkZTRVQ6IG51bWJlciA9IDBcdC8vIOiHquWumuS5ieaVsOaNriDkuIDoiKzmmK9yb2xlaWQgKGxvbmfnsbvlnospXHJcbiAgICAvL3ByaXZhdGUgV0VCUEFDS19NRVNTU0FHRUlEX09GRlNFVDogbnVtYmVyID0gOFx0Ly8g5raI5oGvaWRcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX0xFTkdUSF9PRkZTRVQ6IG51bWJlciA9IDEyXHQvLyDmtojmga/plb/luqZcclxuICAgIHByaXZhdGUgV0VCUEFDS19IRUFEX1NJWkU6IG51bWJlciA9IDE2XHQvLyDmtojmga/mlbDmja7lvIDlp4vkvY3nva5cclxuXHJcblxyXG4gICAgcHVibGljIHNvY2tldDogTGF5YS5Tb2NrZXQgPSBudWxsXHJcbiAgICBwcml2YXRlIHNlbmRCeXRlczogTGF5YS5CeXRlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSByZWFkQnl0ZXM6IExheWEuQnl0ZSA9IG51bGxcclxuICAgIHByaXZhdGUgdGVtcEJ5dGVzOiBMYXlhLkJ5dGUgPSBudWxsXHJcbiAgICBwcml2YXRlIHVybDogc3RyaW5nID0gbnVsbFxyXG4gICAgcHJpdmF0ZSB0aXBzOiBzdHJpbmcgPSBudWxsXHJcbiAgICBwcml2YXRlIHBiTWVzc2FnZU5hbWU6IGFueSA9IG51bGxcclxuICAgIHByaXZhdGUgcHJvdG9Sb290OiBhbnkgPSBudWxsO1xyXG5cclxuICAgIC8vcHJpdmF0ZSBzZW5kTmV0UGFja2V0OiBBcnJheTxOZXRQYWNrZXQ+ID0gbnVsbFxyXG4gICAgLy9wcml2YXRlIHJlY2VpdmVOZXRQYWNrZXQ6IEFycmF5PE5ldFBhY2tldD4gPSBudWxsXHJcblxyXG4gICAgY29uc3RydWN0b3IodGlwczogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy50aXBzID0gdGlwc1xyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzID0gbmV3IExheWEuQnl0ZSgpXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMuZW5kaWFuID0gTGF5YS5CeXRlLkxJVFRMRV9FTkRJQU4vL+i/memHjOaIkeS7rOmHh+eUqOWwj+err1xyXG4gICAgICAgIHRoaXMudGVtcEJ5dGVzID0gbmV3IExheWEuQnl0ZSgpXHJcbiAgICAgICAgdGhpcy50ZW1wQnl0ZXMuZW5kaWFuID0gTGF5YS5CeXRlLkxJVFRMRV9FTkRJQU4vL+i/memHjOaIkeS7rOmHh+eUqOWwj+err1xyXG5cclxuICAgICAgICAvL3RoaXMuc2VuZE5ldFBhY2tldCA9IG5ldyBBcnJheTxOZXRQYWNrZXQ+KCkgLy/lj5HpgIHnmoTnvZHnu5zljIVcclxuICAgICAgICAvL3RoaXMucmVjZWl2ZU5ldFBhY2tldCA9IG5ldyBBcnJheTxOZXRQYWNrZXQ+KCkgLy/mjqXmlLbnmoTnvZHnu5zljIVcclxuXHJcbiAgICAgICAgdGhpcy5wcm90b1Jvb3QgPSBMYXlhLkJyb3dzZXIud2luZG93W1wiUEJNZXNzYWdlXCJdXHJcbiAgICAgICAgdGhpcy5wYk1lc3NhZ2VOYW1lID0gR2FtZU1lc3NhZ2VOYW1lLmdldE1hcCgpXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY29ubmVjdChob3N0OiBzdHJpbmcsIHBvcnQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudXJsID0gaG9zdC5jb25jYXQocG9ydC50b1N0cmluZygpKVxyXG4gICAgICAgIHRoaXMuY29ubmVjdEJ5VXJsKHRoaXMudXJsKVxyXG4gICAgfVxyXG4gICAgLy9cIndzOi8vbG9jYWxob3N0Ojg5ODlcIlxyXG4gICAgcHVibGljIGNvbm5lY3RCeVVybCh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudXJsID0gdXJsXHJcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBuZXcgTGF5YS5Tb2NrZXQoKVxyXG4gICAgICAgIHRoaXMuc29ja2V0LmVuZGlhbiA9IExheWEuQnl0ZS5MSVRUTEVfRU5ESUFOLy/ov5nph4zmiJHku6zph4fnlKjlsI/nq69cclxuICAgICAgICB0aGlzLnNvY2tldC5jb25uZWN0QnlVcmwodXJsKVxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKExheWEuRXZlbnQuT1BFTiwgdGhpcywgdGhpcy5vcGVuSGFuZGxlcilcclxuICAgICAgICB0aGlzLnNvY2tldC5vbihMYXlhLkV2ZW50Lk1FU1NBR0UsIHRoaXMsIHRoaXMucmVjZWl2ZUhhbmRsZXIpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oTGF5YS5FdmVudC5DTE9TRSwgdGhpcywgdGhpcy5jbG9zZUhhbmRsZXIpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oTGF5YS5FdmVudC5FUlJPUiwgdGhpcywgdGhpcy5lcnJvckhhbmRsZXIpXHJcbiAgICB9XHJcbiAgICAvL+mHjeaWsOi/nuaOpVxyXG4gICAgcHVibGljIHJlY29ubmVjdCgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5jbGVhblNvY2tldCgpXHJcbiAgICAgICAgdGhpcy5jb25uZWN0QnlVcmwodGhpcy51cmwpXHJcbiAgICB9XHJcbiAgICAvL+aWreW8gOi/nuaOpVxyXG4gICAgcHVibGljIGRpc2Nvbm5lY3RlZCgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5jbG9zZSgpXHJcbiAgICB9XHJcbiAgICAvL+aYr+WQpui/nuaOpVxyXG4gICAgcHVibGljIGNvbm5lY3RlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zb2NrZXQuY29ubmVjdGVkXHJcbiAgICB9XHJcbiAgICAvL+ato+ehruW7uueri+i/nuaOpVxyXG4gICAgcHJpdmF0ZSBvcGVuSGFuZGxlcihldmVudDogYW55ID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXJsICsgdGhpcy50aXBzICsgXCIgIOato+ehruW7uueri+i/nuaOpVwiKVxyXG4gICAgfVxyXG4gICAgLy/lhbPpl63ov57mjqXkuovku7ZcclxuICAgIHByaXZhdGUgY2xvc2VIYW5kbGVyKGV2ZW50OiBhbnkgPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy51cmwgKyB0aGlzLnRpcHMgKyBcIiDlhbPpl63ov57mjqXkuovku7ZcIilcclxuICAgIH1cclxuICAgIC8v6L+e5o6l5Ye66ZSZXHJcbiAgICBwcml2YXRlIGVycm9ySGFuZGxlcihlOiBhbnkgPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy51cmwgKyB0aGlzLnRpcHMgKyBcIiDov57mjqXlh7rplJlcIilcclxuICAgIH1cclxuXHJcbiAgICAvL+WPkemAgeepuua2iOaBr1xyXG4gICAgcHVibGljIHNlbmRFbXB0eShtc2dJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgLy8g5YaZ5YWl5LiA5Liq5pWw5a2XMFxyXG4gICAgICAgIHRoaXMudGVtcEJ5dGVzLndyaXRlRmxvYXQzMigwKVxyXG4gICAgICAgIHRoaXMuc2VuZChtc2dJZCwgdGhpcy50ZW1wQnl0ZXMpXHJcbiAgICAgICAgdGhpcy50ZW1wQnl0ZXMuY2xlYXIoKVxyXG4gICAgfVxyXG5cclxuICAgIC8v5Y+R6YCB5raI5oGvXHJcbiAgICBwdWJsaWMgc2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgbXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAvL2lmICh0eXBlb2YgbXNnID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAvLyAgICB0aGlzLnRlbXBCeXRlcy53cml0ZVVURlN0cmluZyhtc2cpXHJcbiAgICAgICAgLy8gICAgdGhpcy5zZW5kKG1zZ0lkLCB0aGlzLnRlbXBCeXRlcylcclxuICAgICAgICAvL31cclxuICAgICAgICAvL2Vsc2UgaWYgKG1zZyBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XHJcbiAgICAgICAgLy8gICAgdGhpcy50ZW1wQnl0ZXMud3JpdGVBcnJheUJ1ZmZlcihidWZmZXIpXHJcbiAgICAgICAgLy8gICAgdGhpcy5zZW5kKG1zZ0lkLCB0aGlzLnRlbXBCeXRlcylcclxuICAgICAgICAvL31cclxuICAgICAgICAvL2Vsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBidWZmZXI6IFVpbnQ4QXJyYXkgPSB0aGlzLnNlcmlhbGl6ZShtc2dJZCwgbXNnKVxyXG4gICAgICAgICAgICB0aGlzLnRlbXBCeXRlcy53cml0ZUFycmF5QnVmZmVyKGJ1ZmZlcilcclxuICAgICAgICAgICAgdGhpcy5zZW5kKG1zZ0lkLCB0aGlzLnRlbXBCeXRlcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/pnIDopoHlj5HpgIHnmoTmlbDmja5cclxuICAgIHByaXZhdGUgc2VuZChtc2dJZDogbnVtYmVyLCBieXRlOiBMYXlhLkJ5dGUpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuc29ja2V0LmNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBjb25uZWN0aW9uIGhhcyBiZWVuIGRpc2Nvbm5lY3RlZC5cIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vV0VCUEFDS19IRUFEX09GRlNFVFxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLndyaXRlRmxvYXQ2NChOZXR3b3JrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJvbGVJZCgpKVxyXG4gICAgICAgIC8vV0VCUEFDS19NRVNTU0FHRUlEX09GRlNFVFxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLndyaXRlSW50MzIobXNnSWQpXHJcbiAgICAgICAgLy9XRUJQQUNLX0xFTkdUSF9PRkZTRVRcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy53cml0ZUludDMyKHRoaXMuV0VCUEFDS19IRUFEX1NJWkUgKyBieXRlLmxlbmd0aClcclxuICAgICAgICAvL01hc3NnZSBib2R5XHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMud3JpdGVBcnJheUJ1ZmZlcihieXRlLmJ1ZmZlcilcclxuICAgICAgICAvL+i/memHjOaYr+aKiuWtl+iKguaVsOe7hOeahOaVsOaNrumAmui/h3NvY2tldOWPkemAgee7meacjeWKoeWZqFxyXG4gICAgICAgIHRoaXMuc29ja2V0LnNlbmQodGhpcy5zZW5kQnl0ZXMuYnVmZmVyKVxyXG4gICAgICAgIC8v5riF6Zmk5o6J5pWw5o2u77yM5pa55L6/5LiL5qyh6K+75YaZXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMuY2xlYXIoKVxyXG4gICAgICAgIHRoaXMudGVtcEJ5dGVzLmNsZWFyKClcclxuICAgIH1cclxuXHJcbiAgICAvL+aOpeaUtuWIsOaVsOaNrlxyXG4gICAgcHJpdmF0ZSByZWNlaXZlSGFuZGxlcihtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJNZXNzYWdlIGZyb20gc2VydmVyOiAgXCIgKyBuZXcgTGF5YS5CeXRlKG1zZykucmVhZFVURkJ5dGVzKCkpXHJcbiAgICAgICAgdmFyIG5ldFBhY2tldDogTmV0UGFja2V0ID0gbmV3IE5ldFBhY2tldCh0aGlzKVxyXG4gICAgICAgIG5ldFBhY2tldC5yZWNlaXZlTXNnKG1zZylcclxuICAgICAgICB0aGlzLnNvY2tldC5pbnB1dC5jbGVhcigpXHJcbiAgICAgICAgTmV0RXZlbnREaXNwYXRjaGVyLmdldEluc3RhbmNlKCkuZGlzcGF0Y2hNZXNzYWdlKG5ldFBhY2tldC5tZXNzYWdlSWQsIG5ldFBhY2tldClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW6j+WIl+WMliBwcm90b2NvbC1idWZmZXJcclxuICAgICAqIEBwYXJhbSBtYXNzYWdlSWQgXHJcbiAgICAgKiBAcGFyYW0gbWFzc2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VyaWFsaXplKG1hc3NhZ2VJZDogbnVtYmVyLCBtYXNzYWdlOiBhbnkpOiBVaW50OEFycmF5IHtcclxuICAgICAgICBsZXQgbWFzc2FnZU5hbWU6IHN0cmluZyA9IHRoaXMucGJNZXNzYWdlTmFtZVttYXNzYWdlSWRdXHJcbiAgICAgICAgLy8gRW5jb2RlIGEgbWVzc2FnZSB0byBhbiBVaW50OEFycmF5IChicm93c2VyKSBvciBCdWZmZXIgKG5vZGUpXHJcbiAgICAgICAgdmFyIGJ1ZmZlcjogYW55ID0gdGhpcy5wcm90b1Jvb3RbbWFzc2FnZU5hbWVdLmVuY29kZShtYXNzYWdlKS5maW5pc2goKTtcclxuICAgICAgICByZXR1cm4gYnVmZmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+N5bqP5YiX5YyWIHByb3RvY29sLWJ1ZmZlclxyXG4gICAgICogQHBhcmFtIG1hc3NhZ2VOYW1lIFxyXG4gICAgICogQHBhcmFtIG5ldFBhY2thZ2UgTmV0UGFja2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVzZXJpYWxpemUobWFzc2FnZUlkOiBudW1iZXIsIG1hc3NhZ2U6IFVpbnQ4QXJyYXkpOiBhbnkge1xyXG4gICAgICAgIGxldCBtYXNzYWdlTmFtZTogc3RyaW5nID0gdGhpcy5wYk1lc3NhZ2VOYW1lW21hc3NhZ2VJZF1cclxuICAgICAgICAvLyBEZWNvZGUgYW4gVWludDhBcnJheSAoYnJvd3Nlcikgb3IgQnVmZmVyIChub2RlKSB0byBhIG1lc3NhZ2VcclxuICAgICAgICB2YXIgbWVzc2FnZTogYW55ID0gdGhpcy5wcm90b1Jvb3RbbWFzc2FnZU5hbWVdLmRlY29kZShtYXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgIH1cclxuXHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cclxuaW1wb3J0IE1haW5VSSBmcm9tIFwiLi9zY3JpcHQvTWFpblVJXCJcbmltcG9ydCBUZXN0XzlfVGltZUxpbmVVSSBmcm9tIFwiLi9zdHVkeS9UZXN0XzlfVGltZUxpbmVVSVwiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj02NDA7XHJcbiAgICBzdGF0aWMgaGVpZ2h0Om51bWJlcj0xMTM2O1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJmaXhlZGhlaWdodFwiO1xyXG4gICAgc3RhdGljIHNjcmVlbk1vZGU6c3RyaW5nPVwiaG9yaXpvbnRhbFwiO1xyXG4gICAgc3RhdGljIGFsaWduVjpzdHJpbmc9XCJ0b3BcIjtcclxuICAgIHN0YXRpYyBhbGlnbkg6c3RyaW5nPVwibGVmdFwiO1xyXG4gICAgc3RhdGljIHN0YXJ0U2NlbmU6YW55PVwiTWFpblNjZW5lLnNjZW5lXCI7XHJcbiAgICBzdGF0aWMgc2NlbmVSb290OnN0cmluZz1cIlwiO1xyXG4gICAgc3RhdGljIGRlYnVnOmJvb2xlYW49dHJ1ZTtcclxuICAgIHN0YXRpYyBzdGF0OmJvb2xlYW49dHJ1ZTtcclxuICAgIHN0YXRpYyBwaHlzaWNzRGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBleHBvcnRTY2VuZVRvSnNvbjpib29sZWFuPXRydWU7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe31cclxuICAgIHN0YXRpYyBpbml0KCl7XHJcbiAgICAgICAgdmFyIHJlZzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XHJcbiAgICAgICAgcmVnKFwic2NyaXB0L01haW5VSS50c1wiLE1haW5VSSk7XG4gICAgICAgIHJlZyhcInN0dWR5L1Rlc3RfOV9UaW1lTGluZVVJLnRzXCIsVGVzdF85X1RpbWVMaW5lVUkpO1xyXG4gICAgfVxyXG59XHJcbkdhbWVDb25maWcuaW5pdCgpOyIsImltcG9ydCB7IHVpIH0gZnJvbSBcIi4uL3VpL2xheWFNYXhVSVwiO1xyXG5pbXBvcnQgTmV0d29ya01hbmFnZXIgZnJvbSBcIi4uL0ZyYW1ld29yay9OZXR3b3JrL05ldHdvcmtNYW5hZ2VyXCI7XHJcbmltcG9ydCBOZXRFdmVudERpc3BhdGNoZXIgZnJvbSBcIi4uL0ZyYW1ld29yay9FdmVudC9OZXRFdmVudERpc3BhdGNoZXJcIjtcclxuaW1wb3J0IE5ldFBhY2tldCBmcm9tIFwiLi4vRnJhbWV3b3JrL05ldHdvcmsvTmV0UGFja2V0XCI7XHJcbmltcG9ydCBHYW1lTWVzc2FnZU5hbWUgZnJvbSBcIi4uL0ZyYW1ld29yay9OZXR3b3JrL0dhbWVNZXNzYWdlTmFtZVwiO1xyXG5cclxuXHJcbi8v5Li755WM6Z2iXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5VSSBleHRlbmRzIHVpLk1haW5TY2VuZVVJIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoKTsgfVxyXG5cclxuICAgIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFpblVJLm9uRW5hYmxlXCIpXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKEdhbWVNZXNzYWdlLkdNX1ZFUlNJT05fUkVUVVJOKTtcclxuICAgICAgICBcclxuICAgICAgICBOZXRFdmVudERpc3BhdGNoZXIuZ2V0SW5zdGFuY2UoKS5yZWdpc3Rlck1lc3NhZ2UoR2FtZU1lc3NhZ2UuR01fVkVSU0lPTl9SRVRVUk4sIHRoaXMuR01fVmVyaWZ5VmVyc2lvblJldHVybikvL1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1haW5VSS5vbkRpc2FibGVcIilcclxuICAgICAgICBcclxuICAgICAgICBOZXRFdmVudERpc3BhdGNoZXIuZ2V0SW5zdGFuY2UoKS51blJlZ2lzdGVyTWVzc2FnZShHYW1lTWVzc2FnZS5HTV9WRVJTSU9OX1JFVFVSTiwgdGhpcy5HTV9WZXJpZnlWZXJzaW9uUmV0dXJuKS8vXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgR01fVmVyaWZ5VmVyc2lvblJldHVybihuZXRQYWNrYWdlOk5ldFBhY2tldCk6dm9pZHtcclxuICAgICAgICBjb25zb2xlLmxvZyhuZXRQYWNrYWdlLm1lc3NhZ2VJZCArIFwiICBcIiArIG5ldFBhY2thZ2UubWVzc2FnZSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25Bd2FrZSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQcmVjaXNpb24gc2FmZS5cIiArIChNYXRoLnBvdygyLCA1MykgLSAxKSk7XHJcblxyXG4gICAgICAgIC8vdmFyIG1zZyA9IHtcclxuICAgICAgICAvLyAgICB2ZXJzaW9uOiBcIjEuNS40XCIsXHRcdFx0XHQvL+WuouaIt+err+eJiOacrOWPt1xyXG4gICAgICAgIC8vICAgIHBsYXRmb3JtOiA5MDA3MTk5MjU0NzQwOTkxLCAgICAgICAgICAgICAvLy/lubPlj7BcclxuICAgICAgICAvLyAgICBpc3Rlc3Q6IDAsLy8vICAgIDDjgIHmraPluLjvvIwx44CB5rWL6K+V77yM5LiN6ZyA6KaB6aqM6K+B54mI5pysXHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy92YXIgcm9vdCA9IExheWEuQnJvd3Nlci53aW5kb3dbXCJQQk1lc3NhZ2VcIl07XHJcbiAgICAgICAgLy92YXIgcGJNZXNzYWdlTmFtZSA9IEdhbWVNZXNzYWdlTmFtZS5nZXRNYXAoKVxyXG4gICAgICAgIC8vdmFyIGJ1ZmZlcjogYW55ID0gcm9vdFtwYk1lc3NhZ2VOYW1lW0dhbWVNZXNzYWdlLkdNX1ZFUklGWV9WRVJTSU9OXV0uZW5jb2RlKG1zZykuZmluaXNoKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhidWZmZXIpO1xyXG4gICAgICAgIC8vXHJcblxyXG4gICAgICAgIE5ldHdvcmtNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlQ2xpZW50KDAsIFwid3M6Ly8xOTIuMTY4LjIuMTI2OjUwMDAwXCIpO1xyXG4gICAgICAgIC8v5a6a5pe25omn6KGM5LiA5qyhKOmXtOmalOaXtumXtClcclxuICAgICAgICBMYXlhLnRpbWVyLm9uY2UoMjAwMCwgdGhpcywgdGhpcy50ZXN0TmV0d29yayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0ZXN0TmV0d29yaygpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRlc3ROZXR3b3JrKClcIik7XHJcbiAgICAgICAgdmFyIG1zZyA9IHtcclxuICAgICAgICAgICAgdmVyc2lvbjogXCIxLjUuNFwiLFx0XHRcdFx0Ly/lrqLmiLfnq6/niYjmnKzlj7dcclxuICAgICAgICAgICAgcGxhdGZvcm06IDkwMDcxOTkyNTQ3NDA5OTEsICAgICAgICAgICAgIC8vL+W5s+WPsFxyXG4gICAgICAgICAgICBpc3Rlc3Q6IDAsLy8vICAgIDDjgIHmraPluLjvvIwx44CB5rWL6K+V77yM5LiN6ZyA6KaB6aqM6K+B54mI5pysXHJcbiAgICAgICAgfVxyXG4gICAgICAgIE5ldHdvcmtNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9naW5TZW5kTWVzc2FnZShHYW1lTWVzc2FnZS5HTV9WRVJJRllfVkVSU0lPTiwgIG1zZyk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0XzEyX1RpbGVkTWFwIHtcclxuICAgIC8vb3B0aW1pemF0aW9uKCk6dm9pZHtcclxuICAgIC8vICAgIC8v5b2TVGlsZWQgTWFwYeS4jeWGjeS9v+eUqOeahOaXtuWAme+8jOmcgOimgeS9v+eUqGRlc3Ryb3koKeaWueazlei/m+ihjOmUgOavge+8jOWbnuaUtuiiq+WNoOeUqOeahOWGheWtmFxyXG4gICAgLy8gICAgdGhpcy50TWFwLmRlc3Ryb3koKTtcclxuICAgIC8vICAgIC8v6Ieq5Yqo57yT5a2Y5rKh5pyJ5Yqo55S755qE5Zyw5Z2XXHJcbiAgICAvLyAgICB0aGlzLnRNYXAuYXV0b0NhY2hlID0gdHJ1ZTtcclxuICAgIC8vICAgIC8v6Ieq5Yqo57yT5a2Y55qE57G75Z6LLOWcsOWbvui+g+Wkp+aXtuW7uuiuruS9v+eUqG5vcm1hbFxyXG4gICAgLy8gICAgdGhpcy50TWFwLmF1dG9DYWNoZVR5cGUgPSBcIm5vcm1hbFwiO1xyXG4gICAgLy8gICAgLy/mtojpmaTnvKnmlL7lr7zoh7TnmoTnvJ3pmpks5Lmf5bCx5piv5Y676buR6L6577yMMS43LjfniYjmnKzmlrDlop7nmoTkvJjljJblsZ7mgKdcclxuICAgIC8vICAgIHRoaXMudE1hcC5hbnRpQ3JhY2sgPSB0cnVlO1xyXG4gICAgLy8gICAgLy/lvIDlkK/lm77lsYLlkIjlubZcclxuICAgIC8vICAgIHRoaXMudE1hcC5lbmFibGVNZXJnZUxheWVyID0gdHJ1ZTtcclxuICAgIC8vXHJcbiAgICAvLyAgICAvL+e8k+WtmOWMuuWdl+eahOiuvue9ruaOqOiNkFxyXG4gICAgLy8gICAgLy/lpoLmnpzljZXlm77mmK8xNSoxNe+8jOe8k+WtmOWPr+WMuuWdl+WPr+S7peiuvue9ruS4ujUxMCo1MTDvvIgzNOWAje+8ie+8jOS7peatpOexu+aOqO+8jOWwvemHj+WcqOWOn+WMuuWdl+aVtOaVsOWAjeeahOWJjeaPkOS4i++8jOiuvue9ruWcqDUxMuW3puWPs+OAguaOqOiNkOS4ujUxMio1MTJcclxuICAgIC8vICAgIC8v57yT5a2Y5Yy65Z2X55qE5YW35L2T6K6+572u5pa55rOVXHJcbiAgICAvLyAgICAvL+S4uuesrOS6lOS4quWPguaVsGdyaWRTaXpl5Yib5bu65LiA5LiqNTEyKjUxMuWkp+Wwj+eahFBvaW505a+56LGh5a6e5L6LXHJcbiAgICAvLyAgICAvL3ZhciBncmlkU2l6ZTpMYXlhLlBvaW50ID0gbmV3IExheWEuUG9pbnQoNTEyLCA1MTIpO1xyXG4gICAgLy9cclxuICAgIC8vICAgIC8v56e76Zmk6KKr6Z2e6YCP5piO5Zyw5Z2X6KaG55uW55qE6YOo5YiGXHJcbiAgICAvLyAgICAvL+WmguaenOWcqFRpbGVkIE1hcOS4reayoeacieWvueWbvuWdl+iuvue9rnR5cGXlsZ7mgKfvvIzpgqPkuYjljbPkvr/lvIDlkK/kuoZyZW1vdmVDb3ZlcmVkVGlsZSDvvIzkuZ/mmK/ml6DmlYjnmoTjgILmiYDku6XvvIzlvIDlkK/kuYvliY3vvIzpnIDopoHlhYjlnKhUaWxlZE1hcOe8lui+keWZqOS4re+8jOS4uuWbvuWdl+aWsOWinuiHquWumuS5ieWxnuaAp3R5cGXvvIzlubblsIborr7nva7kuLoxXHJcbiAgICAvLyAgICB0aGlzLnRNYXAucmVtb3ZlQ292ZXJlZFRpbGUgPSB0cnVlO1xyXG4gICAgLy99XHJcblxyXG4gICAgcHJpdmF0ZSB0TWFwOiBMYXlhLlRpbGVkTWFwO1xyXG4gICAgcHJpdmF0ZSBzY2FsZVZhbHVlOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBNYXBYOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBNYXBZOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBtTGFzdE1vdXNlWDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtTGFzdE1vdXNlWTogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGVzdF8xMl9UaWxlZE1hcFwiKTtcclxuICAgICAgICAvL+WIneWni+WMluiInuWPsFxyXG4gICAgICAgIExheWEuaW5pdChMYXlhLkJyb3dzZXIud2lkdGgsIExheWEuQnJvd3Nlci5oZWlnaHQsIExheWEuV2ViR0wpO1xyXG4gICAgICAgIC8v5Yib5bu6VGlsZWRNYXDlrp7kvotcclxuICAgICAgICB0aGlzLnRNYXAgPSBuZXcgTGF5YS5UaWxlZE1hcCgpO1xyXG4gICAgICAgIC8v5Yib5bu6UmVjdGFuZ2xl5a6e5L6L77yM6KeG5Y+j5Yy65Z+fXHJcbiAgICAgICAgdmFyIHZpZXdSZWN0OiBMYXlhLlJlY3RhbmdsZSA9IG5ldyBMYXlhLlJlY3RhbmdsZSgpO1xyXG4gICAgICAgIC8v5Yib5bu6VGlsZWRNYXDlnLDlm77vvIzliqDovb1vcnRob2dvbmFsLmpzb27lkI7vvIzmiafooYzlm57osIPmlrnms5Vvbk1hcExvYWRlZCgpXHJcbiAgICAgICAgdGhpcy50TWFwLmNyZWF0ZU1hcChcInJlcy9UaWxlZE1hcC9vcnRob2dvbmFsLmpzb25cIiwgdmlld1JlY3QsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbk1hcExvYWRlZCkpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbk1hcExvYWRlZCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uTWFwTG9hZGVkXCIpO1xyXG4gICAgICAgIC8v6K6+572u57yp5pS+5Lit5b+D54K55Li66KeG5Y+j55qE5bem5LiK6KeSXHJcbiAgICAgICAgdGhpcy50TWFwLnNldFZpZXdQb3J0UGl2b3RCeVNjYWxlKDAsIDApO1xyXG4gICAgICAgIC8v5bCG5Y6f5Zyw5Zu+5pS+5aSnM+WAjVxyXG4gICAgICAgIHRoaXMudE1hcC5zY2FsZSA9IDI7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50LlJFU0laRSwgdGhpcywgdGhpcy5yZXNpemUpO1xyXG4gICAgICAgIExheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5NT1VTRV9ET1dOLCB0aGlzLCB0aGlzLm1vdXNlRG93bik7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50Lk1PVVNFX1VQLCB0aGlzLCB0aGlzLm1vdXNlVXApO1xyXG4gICAgICAgIHRoaXMucmVzaXplKCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOenu+WKqOWcsOWbvuinhuWPo1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1vdXNlTW92ZSgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgbW92ZVg6IG51bWJlciA9IHRoaXMuTWFwWCAtIChMYXlhLnN0YWdlLm1vdXNlWCAtIHRoaXMubUxhc3RNb3VzZVgpO1xyXG4gICAgICAgIHZhciBtb3ZlWTogbnVtYmVyID0gdGhpcy5NYXBZIC0gKExheWEuc3RhZ2UubW91c2VZIC0gdGhpcy5tTGFzdE1vdXNlWSlcclxuICAgICAgICAvL+enu+WKqOWcsOWbvuinhuWPo1xyXG4gICAgICAgIHRoaXMudE1hcC5tb3ZlVmlld1BvcnQobW92ZVgsIG1vdmVZKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbW91c2VVcCgpOiB2b2lkICB7XHJcbiAgICAgICAgdGhpcy5NYXBYID0gdGhpcy5NYXBYIC0gKExheWEuc3RhZ2UubW91c2VYIC0gdGhpcy5tTGFzdE1vdXNlWCk7XHJcbiAgICAgICAgdGhpcy5NYXBZID0gdGhpcy5NYXBZIC0gKExheWEuc3RhZ2UubW91c2VZIC0gdGhpcy5tTGFzdE1vdXNlWSk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vZmYoTGF5YS5FdmVudC5NT1VTRV9NT1ZFLCB0aGlzLCB0aGlzLm1vdXNlTW92ZSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG1vdXNlRG93bigpOiB2b2lkICB7XHJcbiAgICAgICAgdGhpcy5tTGFzdE1vdXNlWCA9IExheWEuc3RhZ2UubW91c2VYO1xyXG4gICAgICAgIHRoaXMubUxhc3RNb3VzZVkgPSBMYXlhLnN0YWdlLm1vdXNlWTtcclxuICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuTU9VU0VfTU9WRSwgdGhpcywgdGhpcy5tb3VzZU1vdmUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAg5pS55Y+Y6KeG5Y+j5aSn5bCPXHJcbiAgICAgKiAg6YeN6K6+5Zyw5Zu+6KeG5Y+j5Yy65Z+fXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVzaXplKCk6IHZvaWQgIHtcclxuICAgICAgICAvL+aUueWPmOinhuWPo+Wkp+Wwj1xyXG4gICAgICAgIHRoaXMudE1hcC5jaGFuZ2VWaWV3UG9ydCh0aGlzLk1hcFgsIHRoaXMuTWFwWSwgTGF5YS5Ccm93c2VyLndpZHRoLCBMYXlhLkJyb3dzZXIuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcblxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdF8xM19Eb21FbGVtZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudGVzdERvbUVsZW1lbnQoKTtcclxuICAgICAgICB0aGlzLnRlc3RRcmNvZGUoKTtcclxuICAgICAgICB0aGlzLnRlc3RWaWRlbygpO1xyXG4gICAgICAgIHRoaXMudGVzdENhbWVyYSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vU1ZHXHJcbiAgICBwcml2YXRlIHRlc3REb21FbGVtZW50KCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBkYXRhOiBzdHJpbmcgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbCxcIiArICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjIwMFwiIGhlaWdodD1cIjIwMFwiPicgK1xyXG4gICAgICAgICAgICAnPGZvcmVpZ25PYmplY3Qgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPicgK1xyXG4gICAgICAgICAgICAnPGRpdiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIiBzdHlsZT1cImZvbnQtc2l6ZTo0MHB4XCI+JyArXHJcbiAgICAgICAgICAgICc8ZW0+STwvZW0+IGxpa2UgJyArXHJcbiAgICAgICAgICAgICc8c3BhbiBzdHlsZT1cImNvbG9yOndoaXRlOyB0ZXh0LXNoYWRvdzogMHB4IDFweCAwcHggIzk5OSwgMHB4IDJweCAwcHggIzg4OCwgMHB4IDNweCAwcHggIzc3NywgMHB4IDRweCAwcHggIzY2NiwgMHB4IDVweCAwcHggIzU1NSwgMHB4IDZweCAwcHggIzQ0NCwgMHB4IDdweCAwcHggIzMzMywgMHB4IDhweCA3cHggIzAwMTEzNTtcIj4nICtcclxuICAgICAgICAgICAgJ2NoZWVzZTwvc3Bhbj4nICtcclxuICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAnPC9mb3JlaWduT2JqZWN0PicgK1xyXG4gICAgICAgICAgICAnPC9zdmc+JztcclxuICAgICAgICB2YXIgc3A6IExheWEuU3ByaXRlID0gbmV3IExheWEuU3ByaXRlKCk7XHJcbiAgICAgICAgc3AucG9zKDUwMCwgMCk7XHJcbiAgICAgICAgc3AubG9hZEltYWdlKGRhdGEsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNWRyBvbkNvbXBsZXRlZFwiKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZChzcCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kuoznu7TnoIFcclxuICAgIHByaXZhdGUgdGVzdFFyY29kZSgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgZGl2OiBhbnkgPSBMYXlhLkJyb3dzZXIuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB2YXIgcXJjb2RlOiBhbnkgPSBuZXcgTGF5YS5Ccm93c2VyLndpbmRvdy5RUkNvZGUoZGl2LCB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHVybDogc3RyaW5nID0gXCJodHRwOi8vbGF5YWJveC5jb20vXCI7XHJcblxyXG4gICAgICAgIC8vcXJjb2RlLmNsZWFyKCk7IC8vIGNsZWFyIHRoZSBjb2RlLlxyXG4gICAgICAgIHFyY29kZS5tYWtlQ29kZSh1cmwpOy8vIG1ha2UgYW5vdGhlciBjb2RlLlxyXG5cclxuICAgICAgICB2YXIgcXJjb2RlU3AgPSBuZXcgTGF5YS5TcHJpdGUoKTtcclxuICAgICAgICBxcmNvZGVTcC5wb3MoNTAwLCAxMDApO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQocXJjb2RlU3ApO1xyXG5cclxuICAgICAgICBMYXlhLnRpbWVyLm9uY2UoMTAwMCwgdGhpcywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdXJsOiBzdHJpbmcgPSBxcmNvZGUuX29EcmF3aW5nLl9lbEltYWdlLnNyYzsvL+iOt+WPlu+8jOazqOaEj+i/memHjOaYr+W8guatpeeahO+8jOW8gOWPkeiAheWPr+S7peWKoOS4quW7tuaXtuWcqOiOt+WPluOAglxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwi5LqM57u056CBOlwiICsgdXJsKTtcclxuXHJcbiAgICAgICAgICAgIHFyY29kZVNwLmxvYWRJbWFnZSh1cmwsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLkuoznu7TnoIEgb25Db21wbGV0ZWRcIik7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL3ZpZGVvXHJcbiAgICBwcml2YXRlIHRlc3RWaWRlbygpOiB2b2lkIHtcclxuICAgICAgICB2YXIgSGxzOiBhbnkgPSBMYXlhLkJyb3dzZXIud2luZG93LkhsczsvL+iOt+WPluWvuUhsc+eahOW8leeUqOOAglxyXG4gICAgICAgIHZhciBwbHlyOiBhbnkgPSBMYXlhLkJyb3dzZXIud2luZG93LnBseXI7Ly/ojrflj5blr7lwbHly55qE5byV55SoXHJcbiAgICAgICAgLy/ojrflj5Z2aWRlb+Wvueixoe+8jOWwseaYr+mhtemdouS4iuWRveWQjeS4uuKAnHBsYXllcuKAneeahOagh+etvlxyXG4gICAgICAgIHZhciB2aWRlbzogYW55ID0gTGF5YS5Ccm93c2VyLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXInKTtcclxuICAgICAgICBpZiAoSGxzLmlzU3VwcG9ydGVkKCkpIHtcclxuICAgICAgICAgICAgdmFyIGhsczogYW55ID0gbmV3IEhscygpO1xyXG4gICAgICAgICAgICAvL+WKoOi9vW0zdTjmupBcclxuICAgICAgICAgICAgaGxzLmxvYWRTb3VyY2UoJ2h0dHA6Ly9jb250ZW50Lmp3cGxhdGZvcm0uY29tL21hbmlmZXN0cy92TTduSDBLbC5tM3U4Jyk7XHJcbiAgICAgICAgICAgIGhscy5hdHRhY2hNZWRpYSh2aWRlbyk7XHJcbiAgICAgICAgICAgIGhscy5vbihIbHMuRXZlbnRzLk1BTklGRVNUX1BBUlNFRCwgZnVuY3Rpb24gKCk6IHZvaWQge1xyXG4gICAgICAgICAgICAgICAgdmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGx5ci5zZXR1cCh2aWRlbyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mkYTlg4/lpLRcclxuICAgIHByaXZhdGUgdmlkZW86IExheWEuVmlkZW8gPSBudWxsXHJcbiAgICBwcml2YXRlIHRlc3RDYW1lcmEoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKExheWEuTWVkaWEuc3VwcG9ydGVkKCkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi5b2T5YmN5rWP6KeI5Zmo5LiN5pSv5oyBXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93TWVzc2FnZSgpO1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9uczogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgYXVkaW86IHRydWUsXHJcbiAgICAgICAgICAgICAgICB2aWRlbzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhY2luZ01vZGU6IHsgZXhhY3Q6IFwiZW52aXJvbm1lbnRcIiB9LCAgICAvLyDlkI7nva7mkYTlg4/lpLTvvIzpu5jorqTlgLzlsLHmmK/vvIzkuI3orr7oh7PkuZ/lj6/ku6XjgIJcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogTGF5YS5zdGFnZS53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IExheWEuc3RhZ2UuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIExheWEuTWVkaWEuZ2V0TWVkaWEob3B0aW9ucywgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uU3VjY2VzcyksIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzaG93TWVzc2FnZSgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgdGV4OiBMYXlhLlRleHQgPSBuZXcgTGF5YS5UZXh0KCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0ZXgpO1xyXG4gICAgICAgIHRleC50ZXh0ID0gXCLljZXlh7voiJ7lj7Dmkq3mlL7lkozmmoLlgZxcIjtcclxuICAgICAgICB0ZXguY29sb3IgPSBcIiNmZmZmZmZcIjtcclxuICAgICAgICB0ZXguZm9udFNpemUgPSAxMDA7XHJcbiAgICAgICAgdGV4LnZhbGlnbiA9IFwibWlkZGxlXCI7XHJcbiAgICAgICAgdGV4LmFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICB0ZXguc2l6ZShMYXlhLnN0YWdlLndpZHRoLCBMYXlhLnN0YWdlLmhlaWdodCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uU3VjY2Vzcyh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmlkZW8gPSBuZXcgTGF5YS5WaWRlbyhMYXlhLnN0YWdlLndpZHRoLCBMYXlhLnN0YWdlLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy52aWRlby5sb2FkKHVybCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLnZpZGVvKTtcclxuICAgICAgICBMYXlhLnN0YWdlLm9uKFwiY2xpY2tcIiwgdGhpcywgdGhpcy5vblN0YWdlQ2xpY2spO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkVycm9yKGVycm9yOiBFcnJvcik6IHZvaWQge1xyXG4gICAgICAgIGFsZXJ0KGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvblN0YWdlQ2xpY2soKTogdm9pZCB7XHJcbiAgICAgICAgLy/liIfmjaLmkq3mlL7lkozmmoLlgZxcclxuICAgICAgICBpZiAoIXRoaXMudmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW8ucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW8ucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0XzlfVGltZUxpbmVVSVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvL+WKoOi9veWbvumbhuaIkOWKn+WQju+8jOaJp+ihjG9uTG9hZOWbnuiwg+aWueazlVxyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQoXCJyZXMvYXRsYXMvdGVzdC5hdGxhc1wiLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uTG9hZGVkKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgb25Mb2FkZWQoKTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Yqg6L295Zu+6ZuG5oiQ5Yqf5ZCO77yM5omn6KGMb25Mb2Fk5Zue6LCD5pa55rOVXCIpXHJcbiAgICAgICAgLy/liJvlu7rkuIDkuKpVSeWunuS+i1xyXG4gICAgICAgIC8vdmFyIHBsYW46VGltZUxpbmVVSSA9IG5ldyBUaW1lTGluZVVJKClcclxuICAgICAgICAvL+a3u+WKoOWIsOiInuWPsFxyXG4gICAgICAgIC8vTGF5YS5zdGFnZS5hZGRDaGlsZChwbGFuKTtcclxuICAgICAgICAvL+aSreaUvlVJ5Zy65pmv5Lit55qE5Yqo55S7XHJcbiAgICAgICAgLy90aGlzLmJlYXIucGxheSgpO1xyXG4gICAgfVxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xudmFyIFJFRzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XG5leHBvcnQgbW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBNYWluU2NlbmVVSSBleHRlbmRzIFNjZW5lIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiTWFpblNjZW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLk1haW5TY2VuZVVJXCIsTWFpblNjZW5lVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbWVMaW5lVUkgZXh0ZW5kcyBEaWFsb2cge1xyXG5cdFx0cHVibGljIGJlYXI6TGF5YS5BbmltYXRpb247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJUaW1lTGluZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5UaW1lTGluZVVJXCIsVGltZUxpbmVVSSk7XHJcbn1cciJdfQ==
