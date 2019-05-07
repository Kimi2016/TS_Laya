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
    };
    return AppMain;
}());
//激活启动类
new AppMain();
},{"./GameConfig":7,"./study/Test_12_TiledMap":9}],2:[function(require,module,exports){
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
},{"./script/MainUI":8,"./study/Test_9_TimeLineUI":10}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("../ui/layaMaxUI");
var NetworkManager_1 = require("../Framework/Network/NetworkManager");
var NetEventDispatcher_1 = require("../Framework/Event/NetEventDispatcher");
var GameMessageName_1 = require("../Framework/Network/GameMessageName");
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
        var msg = {
            version: "1.5.4",
            platform: 9007199254740991,
            istest: 0,
        };
        var root = Laya.Browser.window["PBMessage"];
        var pbMessageName = GameMessageName_1.default.getMap();
        var buffer = root[pbMessageName[210 /* GM_VERIFY_VERSION */]].encode(msg).finish();
        console.log(buffer);
        NetworkManager_1.default.getInstance().createClient(0, "ws://192.168.2.126:50000");
        //定时执行一次(间隔时间)
        //Laya.timer.once(2000, this, this.testNetwork);
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
},{"../Framework/Event/NetEventDispatcher":2,"../Framework/Network/GameMessageName":3,"../Framework/Network/NetworkManager":5,"../ui/layaMaxUI":11}],9:[function(require,module,exports){
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
        this.tMap.scale = 3;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkc6L0xheWEvTGF5YUFpcklERV9iZXRhL3Jlc291cmNlcy9hcHAvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9BcHBNYWluLnRzIiwic3JjL0ZyYW1ld29yay9FdmVudC9OZXRFdmVudERpc3BhdGNoZXIudHMiLCJzcmMvRnJhbWV3b3JrL05ldHdvcmsvR2FtZU1lc3NhZ2VOYW1lLnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL05ldFBhY2tldC50cyIsInNyYy9GcmFtZXdvcmsvTmV0d29yay9OZXR3b3JrTWFuYWdlci50cyIsInNyYy9GcmFtZXdvcmsvTmV0d29yay9Tb2NrZXRDb25uZWN0LnRzIiwic3JjL0dhbWVDb25maWcudHMiLCJzcmMvc2NyaXB0L01haW5VSS50cyIsInNyYy9zdHVkeS9UZXN0XzEyX1RpbGVkTWFwLnRzIiwic3JjL3N0dWR5L1Rlc3RfOV9UaW1lTGluZVVJLnRzIiwic3JjL3VpL2xheWFNYXhVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNWQSxJQUFPLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQzdCLElBQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7QUFDekIsSUFBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtBQWtCekIsMkNBQXNDO0FBS3RDLDZEQUF3RDtBQUV4RCxLQUFLO0FBQ0w7SUFDSTtRQUNJLGdCQUFnQjtRQUNoQixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFVLENBQUMsS0FBSyxFQUFFLG9CQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDcEQ7YUFDSTtZQUNELHVCQUF1QjtZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsT0FB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QUNaLG1CQUFtQjtJQUN2QixDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQWhCQSxBQWdCQyxJQUFBOzs7OztBQ2pCRCxJQUFPLE1BQU0sR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzFCLElBQU8sS0FBSyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDeEIsSUFBSSxHQUFHLEdBQWEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7QUFDN0MsSUFBYyxFQUFFLENBa0JmO0FBbEJELFdBQWMsRUFBRTtJQUNaO1FBQWlDLCtCQUFLO1FBQ2xDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixvQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQ0wsa0JBQUM7SUFBRCxDQU5BLEFBTUMsQ0FOZ0MsS0FBSyxHQU1yQztJQU5ZLGNBQVcsY0FNdkIsQ0FBQTtJQUNELEdBQUcsQ0FBQyxnQkFBZ0IsRUFBQyxXQUFXLENBQUMsQ0FBQztJQUNsQztRQUFnQyw4QkFBTTtRQUVsQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsbUNBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FQQSxBQU9DLENBUCtCLE1BQU0sR0FPckM7SUFQWSxhQUFVLGFBT3RCLENBQUE7SUFDRCxHQUFHLENBQUMsZUFBZSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BDLENBQUMsRUFsQmEsRUFBRSxHQUFGLFVBQUUsS0FBRixVQUFFLFFBa0JmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBCcm93c2VyID0gTGF5YS5Ccm93c2VyXHJcbmltcG9ydCBXZWJHTCA9IExheWEuV2ViR0xcclxuaW1wb3J0IFN0YWdlID0gTGF5YS5TdGFnZVxyXG5cclxuaW1wb3J0IFRlc3RfMV9UZXh0IGZyb20gJy4vc3R1ZHkvVGVzdF8xX1RleHQnO1xyXG5pbXBvcnQgVGVzdF8yX0lucHV0VGVzdCBmcm9tICcuL3N0dWR5L1Rlc3RfMl9JbnB1dFRlc3QnO1xyXG5pbXBvcnQgVGVzdF8zX0JpdG1hcEZvbnQgZnJvbSAnLi9zdHVkeS9UZXN0XzNfQml0bWFwRm9udCc7XHJcbmltcG9ydCBUZXN0XzRfMV9TcHJpdGVfRGlzcGxheUltYWdlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSc7XHJcbmltcG9ydCBUZXN0XzRfMV9TcHJpdGVfU3dpdGNoVGV4dHVyZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8xX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlJztcclxuaW1wb3J0IFRlc3RfNF8yX1Nwcml0ZV9EaXNwbGF5SW1hZ2UgZnJvbSAnLi9zdHVkeS9UZXN0XzRfMl9TcHJpdGVfRGlzcGxheUltYWdlJztcclxuaW1wb3J0IFRlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzJfU3ByaXRlX1N3aXRjaFRleHR1cmUnO1xyXG5pbXBvcnQgVGVzdF80X01hc2tEZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF80X01hc2tEZW1vJztcclxuaW1wb3J0IFRlc3RfNV8xX0NvbG9yRmlsdGVyIGZyb20gJy4vc3R1ZHkvVGVzdF81XzFfQ29sb3JGaWx0ZXInO1xyXG5pbXBvcnQgVGVzdF81XzJfR2xvd0ZpbHRlciBmcm9tICcuL3N0dWR5L1Rlc3RfNV8yX0dsb3dGaWx0ZXInO1xyXG5pbXBvcnQgVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMgZnJvbSAnLi9zdHVkeS9UZXN0XzZfMV9TcHJpdGVfRHJhd1NoYXBlcyc7XHJcbmltcG9ydCBUZXN0XzdfQXRsYXNBbmlEZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF83X0F0bGFzQW5pRGVtbyc7XHJcbmltcG9ydCBUZXN0XzhfVHdlZW5EZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF84X1R3ZWVuRGVtbyc7XHJcbmltcG9ydCBUZXN0XzlfVGltZUxpbmUgZnJvbSAnLi9zdHVkeS9UZXN0XzlfVGltZUxpbmUnO1xyXG5pbXBvcnQgVGVzdF85X1RpbWVMaW5lVUkgZnJvbSAnLi9zdHVkeS9UZXN0XzlfVGltZUxpbmVVSSc7XHJcbmltcG9ydCBUZXN0XzExX1NvdW5kIGZyb20gJy4vc3R1ZHkvVGVzdF8xMV9Tb3VuZCc7XHJcbmltcG9ydCBHYW1lQ29uZmlnIGZyb20gJy4vR2FtZUNvbmZpZyc7XHJcbmltcG9ydCBUZXN0XzBfMV9DaGFubmVsIGZyb20gJy4vc3R1ZHkvVGVzdF8wXzFfQ2hhbm5lbCc7XHJcbmltcG9ydCBUZXN0XzBfMV9Tb2NrZXQgZnJvbSAnLi9zdHVkeS9UZXN0XzBfMV9Tb2NrZXQnO1xyXG5pbXBvcnQgVGVzdF8wX05ldHdvcmtfUHJvdG9jb2xCdWZmZXIgZnJvbSAnLi9zdHVkeS9UZXN0XzBfTmV0d29ya19Qcm90b2NvbEJ1ZmZlcic7XHJcbmltcG9ydCBOZXR3b3JrTWFuYWdlciBmcm9tICcuL0ZyYW1ld29yay9OZXR3b3JrL05ldHdvcmtNYW5hZ2VyJztcclxuaW1wb3J0IFRlc3RfMTJfVGlsZWRNYXAgZnJvbSAnLi9zdHVkeS9UZXN0XzEyX1RpbGVkTWFwJztcclxuXHJcbi8v5ZCv5Yqo57G7XHJcbmNsYXNzIEFwcE1haW4ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy/moLnmja5JREXorr7nva7liJ3lp4vljJblvJXmk45cdFx0XHJcbiAgICAgICAgaWYgKHdpbmRvd1tcIkxheWEzRFwiXSkge1xyXG4gICAgICAgICAgICBMYXlhM0QuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDkuI3mlK/mjIFXZWJHTOaXtuiHquWKqOWIh+aNouiHs0NhbnZhc1xyXG4gICAgICAgICAgICBMYXlhLmluaXQoQnJvd3Nlci5jbGllbnRXaWR0aCwgQnJvd3Nlci5jbGllbnRIZWlnaHQsIFdlYkdMKTtcclxuICAgICAgICAgICAgLy9MYXlhLmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQsIExheWFbXCJXZWJHTFwiXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExheWFbXCJQaHlzaWNzXCJdICYmIExheWFbXCJQaHlzaWNzXCJdLmVuYWJsZSgpO1xyXG4gICAgICAgIExheWFbXCJEZWJ1Z1BhbmVsXCJdICYmIExheWFbXCJEZWJ1Z1BhbmVsXCJdLmVuYWJsZSgpO1xyXG5cclxuXHJcbiAgICAgICAgLy/miZPlvIDosIPor5XpnaLmnb/vvIjpgJrov4dJREXorr7nva7osIPor5XmqKHlvI/vvIzmiJbogIV1cmzlnLDlnYDlop7liqBkZWJ1Zz10cnVl5Y+C5pWw77yM5Z2H5Y+v5omT5byA6LCD6K+V6Z2i5p2/77yJXHJcbiAgICAgICAgaWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuICAgICAgICBpZiAoR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgJiYgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0pIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdLmVuYWJsZSgpO1xyXG4gICAgICAgIGlmIChHYW1lQ29uZmlnLnN0YXQpIExheWEuU3RhdC5zaG93KCk7XHJcblxyXG4gICAgICAgIC8v6KGo56S65piv5ZCm5o2V6I635YWo5bGA6ZSZ6K+v5bm25by55Ye65o+Q56S644CCXHJcbiAgICAgICAgTGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy/mv4DmtLvotYTmupDniYjmnKzmjqfliLbvvIx2ZXJzaW9uLmpzb27nlLFJREXlj5HluIPlip/og73oh6rliqjnlJ/miJDvvIzlpoLmnpzmsqHmnInkuZ/kuI3lvbHlk43lkI7nu63mtYHnqItcclxuICAgICAgICBMYXlhLlJlc291cmNlVmVyc2lvbi5lbmFibGUoXCJ2ZXJzaW9uLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uVmVyc2lvbkxvYWRlZCksIExheWEuUmVzb3VyY2VWZXJzaW9uLkZJTEVOQU1FX1ZFUlNJT04pO1xyXG5cclxuXHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnblYgPSBTdGFnZS5BTElHTl9NSURETEU7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnbkggPSBTdGFnZS5BTElHTl9DRU5URVI7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBHYW1lQ29uZmlnLnNjYWxlTW9kZTsvL1N0YWdlLlNDQUxFX0ZVTEw7Ly9TQ0FMRV9GSVhFRF9IRUlHSFRcclxuICAgICAgICBMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBHYW1lQ29uZmlnLnNjcmVlbk1vZGU7Ly9TdGFnZS5TQ1JFRU5fSE9SSVpPTlRBTDsvL1NDUkVFTl9WRVJUSUNBTFxyXG4gICAgICAgIExheWEuc3RhZ2UuYmdDb2xvciA9IFwiIzdmN2Y3ZlwiO1xyXG5cclxuICAgICAgICAvL+WFvOWuueW+ruS/oeS4jeaUr+aMgeWKoOi9vXNjZW5l5ZCO57yA5Zy65pmvXHJcbiAgICAgICAgTGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuICAgICAgICAvL+WmguaenOmAmui/h+iuvuWkh+mdmemfs+mUruiuqemfs+mikeiHquWKqOi3n+maj+iuvuWkh+mdmemfs+OAgumcgOimgeWwhnVzZUF1ZGlvTXVzaWPorr7nva7kuLpmYWxzZeOAglxyXG4gICAgICAgIExheWEuU291bmRNYW5hZ2VyLnVzZUF1ZGlvTXVzaWMgPSBmYWxzZTtcclxuICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5hdXRvU3RvcE11c2ljID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8v5raI6Zmk55+i6YeP57uY5Yi255qE6ZSv6b2/77yM5L2G5Lya5aKe5Yqg5oCn6IO95raI6ICXXHJcbiAgICAgICAgLy9Db25maWcuaXNBbnRpYWxpYXM9dHJ1ZTtcclxuXHJcbiAgICAgICAgLy/plIDmr4HlvZPliY3msqHmnInooqvkvb/nlKjnmoTotYTmupAs6K+l5Ye95pWw5Lya5b+955WlbG9jaz10cnVl55qE6LWE5rqQ44CCXHJcbiAgICAgICAgLy9MYXlhLlJlc291cmNlLmRlc3Ryb3lVbnVzZWRSZXNvdXJjZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblZlcnNpb25Mb2FkZWQoKTogdm9pZCB7XHJcbiAgICAgICAgLy/mv4DmtLvlpKflsI/lm77mmKDlsITvvIzliqDovb3lsI/lm77nmoTml7blgJnvvIzlpoLmnpzlj5HnjrDlsI/lm77lnKjlpKflm77lkIjpm4bph4zpnaLvvIzliJnkvJjlhYjliqDovb3lpKflm77lkIjpm4bvvIzogIzkuI3mmK/lsI/lm75cclxuICAgICAgICBMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29uZmlnTG9hZGVkKCk6IHZvaWQge1xyXG4gICAgICAgIC8v5Yqg6L29SURF5oyH5a6a55qE5Zy65pmvXHJcbiAgICAgICAgR2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUpO1xyXG5cclxuICAgICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXR1cCgpOiB2b2lkIHtcclxuICAgICAgICAvL25ldyBUZXN0XzFfVGV4dCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMl9JbnB1dFRlc3QoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzNfQml0bWFwRm9udCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8xX1Nwcml0ZV9EaXNwbGF5SW1hZ2UoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzRfMV9TcHJpdGVfU3dpdGNoVGV4dHVyZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8yX1Nwcml0ZV9EaXNwbGF5SW1hZ2UoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzRfMl9TcHJpdGVfU3dpdGNoVGV4dHVyZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF9NYXNrRGVtbygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNV8xX0NvbG9yRmlsdGVyKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF81XzJfR2xvd0ZpbHRlcigpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNl8xX1Nwcml0ZV9EcmF3U2hhcGVzKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF83X0F0bGFzQW5pRGVtbygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfOF9Ud2VlbkRlbW8oKTtcclxuICAgICAgICAvL25ldyBUZXN0XzlfVGltZUxpbmUoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzlfVGltZUxpbmVVSSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMTFfU291bmQoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzBfMV9Tb2NrZXQoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzBfTmV0d29ya19Qcm90b2NvbEJ1ZmZlcigpO1xyXG4gICAgICAgIG5ldyBUZXN0XzEyX1RpbGVkTWFwKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBBcHBNYWluKCk7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0RXZlbnREaXNwYXRjaGVyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBOZXRFdmVudERpc3BhdGNoZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IE5ldEV2ZW50RGlzcGF0Y2hlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2UgfHwgKHRoaXMuaW5zdGFuY2UgPSBuZXcgdGhpcygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VIYW5kbGVyczogeyBbaW5kZXg6IG51bWJlcl06IEZ1bmN0aW9uW107IH0gPSB7fVxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJNZXNzYWdlKG1lc3NhZ2VJRDogbnVtYmVyLCBmdW46IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGZ1bnM6IEFycmF5PEZ1bmN0aW9uPiA9IHRoaXMubWVzc2FnZUhhbmRsZXJzW21lc3NhZ2VJRF07XHJcbiAgICAgICAgaWYgKCFmdW5zKSB7XHJcbiAgICAgICAgICAgIGZ1bnMgPSBuZXcgQXJyYXk8RnVuY3Rpb24+KCk7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUhhbmRsZXJzW21lc3NhZ2VJRF0gPSBmdW5zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5zLnB1c2goZnVuKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB1blJlZ2lzdGVyTWVzc2FnZShtZXNzYWdlSUQ6IG51bWJlciwgZnVuOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHZhciBmdW5zOiBBcnJheTxGdW5jdGlvbj4gPSB0aGlzLm1lc3NhZ2VIYW5kbGVyc1ttZXNzYWdlSURdO1xyXG4gICAgICAgIGlmIChmdW5zKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleDogbnVtYmVyID0gZnVucy5pbmRleE9mKGZ1bik7XHJcbiAgICAgICAgICAgIGZ1bnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGlzcGF0Y2hNZXNzYWdlKG1lc3NhZ2VJRDogbnVtYmVyLCBuZXRQYWNrYWdlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB2YXIgZnVuczogQXJyYXk8RnVuY3Rpb24+ID0gdGhpcy5tZXNzYWdlSGFuZGxlcnNbbWVzc2FnZUlEXTtcclxuICAgICAgICBpZiAoZnVucykge1xyXG4gICAgICAgICAgICBmdW5zLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNhbGwoZWxlbWVudCwgbmV0UGFja2FnZSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIENsZWFyQWxsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWVzc2FnZUhhbmRsZXJzID0ge31cclxuICAgIH1cclxufSIsIlxyXG4vKipcclxuICogUHJvdG9idWYg5raI5oGv5ZCN56ew5Yy56YWNXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWVzc2FnZU5hbWUge1xyXG4gICAgc3RhdGljIG1lc3NhZ2VNYXAgPSB7fVxyXG4gICAgc3RhdGljIGlzSW5pdCA9IGZhbHNlXHJcbiAgICBzdGF0aWMgZ2V0TWFwKCk6IGFueSB7XHJcbiAgICAgICAgaWYgKEdhbWVNZXNzYWdlTmFtZS5pc0luaXQpe1xyXG4gICAgICAgICAgICByZXR1cm4gR2FtZU1lc3NhZ2VOYW1lLm1lc3NhZ2VNYXBcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1lc3NhZ2VOYW1lLmlzSW5pdCA9IHRydWVcclxuXHJcbiAgICAgICAgLy9NZXNzYWdlTmFtZVxyXG4gICAgICAgIGxldCBtYXAgPSBHYW1lTWVzc2FnZU5hbWUubWVzc2FnZU1hcFxyXG5cclxuICAgICAgICBtYXBbR2FtZU1lc3NhZ2UuR01fVkVSSUZZX1ZFUlNJT05dPSdHTV9WZXJpZnlWZXJzaW9uJztcclxuICAgICAgICBtYXBbR2FtZU1lc3NhZ2UuR01fVkVSU0lPTl9SRVRVUk5dPSdHTV9WZXJpZnlWZXJzaW9uUmV0dXJuJztcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hcFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJ5dGUgPSBMYXlhLkJ5dGVcclxuaW1wb3J0IFNvY2tldENvbm5lY3QgZnJvbSBcIi4vU29ja2V0Q29ubmVjdFwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ldFBhY2tldCB7XHJcbiAgICAvL3ByaXZhdGUgV0VCUEFDS19IRUFEX09GRlNFVDogbnVtYmVyID0gMFx0Ly8g6Ieq5a6a5LmJ5pWw5o2uIOS4gOiIrOaYr3JvbGVpZCAobG9uZ+exu+WeiylcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX01FU1NTQUdFSURfT0ZGU0VUOiBudW1iZXIgPSA4XHQvLyDmtojmga9pZFxyXG4gICAgLy9wcml2YXRlIFdFQlBBQ0tfTEVOR1RIX09GRlNFVDogbnVtYmVyID0gMTJcdC8vIOa2iOaBr+mVv+W6plxyXG4gICAgcHVibGljIFdFQlBBQ0tfSEVBRF9TSVpFOiBudW1iZXIgPSAxNlx0Ly8g5raI5oGv5pWw5o2u5byA5aeL5L2N572uXHJcblxyXG4gICAgcHVibGljIHJvbGVJZDogbnVtYmVyXHJcbiAgICBwdWJsaWMgbWVzc2FnZUlkOiBudW1iZXJcclxuICAgIHB1YmxpYyBtZXNzYWdlOiBhbnlcclxuXHJcbiAgICBwcml2YXRlIHJlYWRCeXRlczogQnl0ZVxyXG4gICAgcHJpdmF0ZSBzb2NrZXRDb25uZWN0OiBTb2NrZXRDb25uZWN0XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29ubmVjdDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0ID0gY29ubmVjdFxyXG4gICAgICAgIHRoaXMucmVhZEJ5dGVzID0gbmV3IEJ5dGUoKVxyXG4gICAgICAgIHRoaXMucmVhZEJ5dGVzLmVuZGlhbiA9IExheWEuQnl0ZS5MSVRUTEVfRU5ESUFOLy/ov5nph4zmiJHku6zph4fnlKjlsI/nq69cclxuICAgIH1cclxuXHJcbiAgICAvL+aOpeaUtuacjeWKoeWZqOS/oeaBr1xyXG4gICAgcHVibGljIHJlY2VpdmVNc2coYnl0ZXM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVhZEJ5dGVzLndyaXRlQXJyYXlCdWZmZXIoYnl0ZXMpXHJcbiAgICAgICAgdGhpcy5yZWFkQnl0ZXMucG9zID0gMC8v6K6+572u5YGP56e75oyH6ZKIXHJcblxyXG4gICAgICAgIC8v5oyJ54Wn5pyN5Yqh5Zmo5Lyg6YCS6L+H5p2l55qE5pWw5o2u77yM5oyJ54Wn6aG65bqP6K+75Y+WXHJcbiAgICAgICAgdGhpcy5yb2xlSWQgPSB0aGlzLnJlYWRCeXRlcy5nZXRGbG9hdDY0KClcclxuICAgICAgICB0aGlzLm1lc3NhZ2VJZCA9IHRoaXMucmVhZEJ5dGVzLmdldEludDMyKClcclxuICAgICAgICBsZXQgbXNnTGVuZ3RoID0gdGhpcy5yZWFkQnl0ZXMuZ2V0SW50MzIoKVxyXG4gICAgICAgIC8vbGV0IGFiID0gdGhpcy5yZWFkQnl0ZXMucmVhZEFycmF5QnVmZmVyKG1zZ0xlbmd0aCAtIHRoaXMuV0VCUEFDS19IRUFEX1NJWkUpXHJcbiAgICAgICAgLy9sZXQgYnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoYWIpXHJcbiAgICAgICAgLy90aGlzLm1lc3NhZ2UgPSB0aGlzLnNvY2tldENvbm5lY3QuZGVzZXJpYWxpemUodGhpcy5tZXNzYWdlSWQsIGJ1ZmZlcilcclxuICAgICAgICBsZXQgdWludDhBcnJheSA9IHRoaXMucmVhZEJ5dGVzLnJlYWRVaW50OEFycmF5KHRoaXMuV0VCUEFDS19IRUFEX1NJWkUsIG1zZ0xlbmd0aCAtIHRoaXMuV0VCUEFDS19IRUFEX1NJWkUpXHJcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gdGhpcy5zb2NrZXRDb25uZWN0LmRlc2VyaWFsaXplKHRoaXMubWVzc2FnZUlkLCB1aW50OEFycmF5KVxyXG5cclxuICAgICAgICAvL2lmIChtc2dMZW5ndGggIT0gdGhpcy5yZWFkQnl0ZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5lcnJvcihcIua2iOaBr+mVv+S4jeS4gOagt1wiKVxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICB0aGlzLnJlYWRCeXRlcy5jbGVhcigpXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgU29ja2V0Q29ubmVjdCBmcm9tIFwiLi9Tb2NrZXRDb25uZWN0XCI7XHJcblxyXG5jbGFzcyBHYW1lQ2xpZW50IHtcclxuICAgIHByaXZhdGUgY2xpZW50SWQ6IENsaWVudElEO1xyXG4gICAgcHJpdmF0ZSBzb2NrZXRDb25uZWN0OiBTb2NrZXRDb25uZWN0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBDbGllbnRJRCkge1xyXG4gICAgICAgIHRoaXMuY2xpZW50SWQgPSBpZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29ubmVjdChob3N0OiBzdHJpbmcsIHBvcnQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdCA9IG5ldyBTb2NrZXRDb25uZWN0KFwiIGNsaWVudElkOlwiICsgdGhpcy5jbGllbnRJZCk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LmNvbm5lY3QoaG9zdCwgcG9ydCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbm5lY3RCeVVybCh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdCA9IG5ldyBTb2NrZXRDb25uZWN0KFwiIGNsaWVudElkOlwiICsgdGhpcy5jbGllbnRJZCk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LmNvbm5lY3RCeVVybCh1cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWNvbm5lY3QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LnJlY29ubmVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNjb25uZWN0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LmRpc2Nvbm5lY3RlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0Nvbm5lY3RlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zb2NrZXRDb25uZWN0LmNvbm5lY3RlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kRW1wdHkobXNnSWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5zZW5kRW1wdHkobXNnSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kTWVzc2FnZShtc2dJZDogbnVtYmVyLCBtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5zZW5kTWVzc2FnZShtc2dJZCwgbXNnKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ldHdvcmtNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBOZXR3b3JrTWFuYWdlcjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IE5ldHdvcmtNYW5hZ2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZSB8fCAodGhpcy5pbnN0YW5jZSA9IG5ldyB0aGlzKCkpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnYW1lQ2xpZW50TWFwOiB7IFtpbmRleDogbnVtYmVyXTogR2FtZUNsaWVudDsgfSA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluinkuiJsklEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRSb2xlSWQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5wb3coMiwgNTMpIC0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlQ2xpZW50KGNsaWVudElEOiBudW1iZXIsIHVybDogc3RyaW5nKTogR2FtZUNsaWVudCB7XHJcbiAgICAgICAgdmFyIGNsaWVudDogR2FtZUNsaWVudCA9IG5ldyBHYW1lQ2xpZW50KGNsaWVudElEKTtcclxuICAgICAgICBjbGllbnQuY29ubmVjdEJ5VXJsKHVybCk7XHJcbiAgICAgICAgdGhpcy5nYW1lQ2xpZW50TWFwW0NsaWVudElELmxvZ2luXSA9IGNsaWVudDtcclxuICAgICAgICByZXR1cm4gY2xpZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDbGllbnQoY2xpZW50SUQ6IENsaWVudElEKTogR2FtZUNsaWVudCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZUNsaWVudE1hcFtjbGllbnRJRF0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nYW1lQ2xpZW50TWFwW2NsaWVudElEXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlQ2xpZW50KGNsaWVudElEOiBDbGllbnRJRCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGllbnQ6IEdhbWVDbGllbnQgPSB0aGlzLmdldENsaWVudChDbGllbnRJRC5sb2dpbilcclxuICAgICAgICBpZiAoY2xpZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5kaXNjb25uZWN0ZWQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVjb25uZWN0Q2xpZW50KGNsaWVudElEOiBDbGllbnRJRCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGllbnQ6IEdhbWVDbGllbnQgPSB0aGlzLmdldENsaWVudChDbGllbnRJRC5sb2dpbilcclxuICAgICAgICBpZiAoY2xpZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5yZWNvbm5lY3QoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naW5TZW5kTWVzc2FnZShtc2dJZDogbnVtYmVyLCBtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UobXNnSWQsIG1zZywgQ2xpZW50SUQubG9naW4pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ2ljU2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgbXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKG1zZ0lkLCBtc2csIENsaWVudElELmxvZ2ljKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzY2VuZVNlbmRNZXNzYWdlKG1zZ0lkOiBudW1iZXIsIG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShtc2dJZCwgbXNnLCBDbGllbnRJRC5zY2VuZSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRNZXNzYWdlKG1zZ0lkOiBudW1iZXIsIG1zZzogYW55LCBjbGllbnRJRDogQ2xpZW50SUQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2xpZW50OiBHYW1lQ2xpZW50ID0gdGhpcy5nZXRDbGllbnQoY2xpZW50SUQpXHJcbiAgICAgICAgaWYgKGNsaWVudCkge1xyXG4gICAgICAgICAgICBjbGllbnQuc2VuZE1lc3NhZ2UobXNnSWQsIG1zZylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmRNZXNzYWdlRW1wdHkobXNnSWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGllbnQ6IEdhbWVDbGllbnQgPSBudWxsO1xyXG4gICAgICAgIGlmIChtc2dJZCA+IEdhbWVNZXNzYWdlLkdNX0FDQ09VTlRfU0VSVkVSX01FU1NBR0VfU1RBUlQgJiYgbXNnSWQgPCBHYW1lTWVzc2FnZS5HTV9BQ0NPVU5UX1NFUlZFUl9NRVNTQUdFX0VORCkge1xyXG4gICAgICAgICAgICBjbGllbnQgPSB0aGlzLmdldENsaWVudChDbGllbnRJRC5sb2dpbilcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KENsaWVudElELmxvZ2ljKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2xpZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5zZW5kRW1wdHkobXNnSWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckFsbEdhbWVDbGllbnQoKSB7XHJcbiAgICAgICAgbGV0IGRpYyA9IHRoaXMuZ2FtZUNsaWVudE1hcFxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRpYykge1xyXG4gICAgICAgICAgICBpZiAoZGljLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkaWNba2V5XTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuZGlzY29ubmVjdGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nYW1lQ2xpZW50TWFwID0ge31cclxuICAgIH1cclxufSIsImltcG9ydCBOZXRFdmVudERpc3BhdGNoZXIgZnJvbSBcIi4uL0V2ZW50L05ldEV2ZW50RGlzcGF0Y2hlclwiXHJcbmltcG9ydCBOZXRQYWNrZXQgZnJvbSBcIi4vTmV0UGFja2V0XCJcclxuaW1wb3J0IE5ldHdvcmtNYW5hZ2VyIGZyb20gXCIuL05ldHdvcmtNYW5hZ2VyXCJcclxuaW1wb3J0IEdhbWVNZXNzYWdlTmFtZSBmcm9tIFwiLi9HYW1lTWVzc2FnZU5hbWVcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2NrZXRDb25uZWN0IHtcclxuXHJcbiAgICAvL3ByaXZhdGUgV0VCUEFDS19IRUFEX09GRlNFVDogbnVtYmVyID0gMFx0Ly8g6Ieq5a6a5LmJ5pWw5o2uIOS4gOiIrOaYr3JvbGVpZCAobG9uZ+exu+WeiylcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX01FU1NTQUdFSURfT0ZGU0VUOiBudW1iZXIgPSA4XHQvLyDmtojmga9pZFxyXG4gICAgLy9wcml2YXRlIFdFQlBBQ0tfTEVOR1RIX09GRlNFVDogbnVtYmVyID0gMTJcdC8vIOa2iOaBr+mVv+W6plxyXG4gICAgcHJpdmF0ZSBXRUJQQUNLX0hFQURfU0laRTogbnVtYmVyID0gMTZcdC8vIOa2iOaBr+aVsOaNruW8gOWni+S9jee9rlxyXG5cclxuXHJcbiAgICBwdWJsaWMgc29ja2V0OiBMYXlhLlNvY2tldCA9IG51bGxcclxuICAgIHByaXZhdGUgc2VuZEJ5dGVzOiBMYXlhLkJ5dGUgPSBudWxsXHJcbiAgICBwcml2YXRlIHJlYWRCeXRlczogTGF5YS5CeXRlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSB0ZW1wQnl0ZXM6IExheWEuQnl0ZSA9IG51bGxcclxuICAgIHByaXZhdGUgdXJsOiBzdHJpbmcgPSBudWxsXHJcbiAgICBwcml2YXRlIHRpcHM6IHN0cmluZyA9IG51bGxcclxuICAgIHByaXZhdGUgcGJNZXNzYWdlTmFtZTogYW55ID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBwcm90b1Jvb3Q6IGFueSA9IG51bGw7XHJcblxyXG4gICAgLy9wcml2YXRlIHNlbmROZXRQYWNrZXQ6IEFycmF5PE5ldFBhY2tldD4gPSBudWxsXHJcbiAgICAvL3ByaXZhdGUgcmVjZWl2ZU5ldFBhY2tldDogQXJyYXk8TmV0UGFja2V0PiA9IG51bGxcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0aXBzOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnRpcHMgPSB0aXBzXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMgPSBuZXcgTGF5YS5CeXRlKClcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy5lbmRpYW4gPSBMYXlhLkJ5dGUuTElUVExFX0VORElBTi8v6L+Z6YeM5oiR5Lus6YeH55So5bCP56uvXHJcbiAgICAgICAgdGhpcy50ZW1wQnl0ZXMgPSBuZXcgTGF5YS5CeXRlKClcclxuICAgICAgICB0aGlzLnRlbXBCeXRlcy5lbmRpYW4gPSBMYXlhLkJ5dGUuTElUVExFX0VORElBTi8v6L+Z6YeM5oiR5Lus6YeH55So5bCP56uvXHJcblxyXG4gICAgICAgIC8vdGhpcy5zZW5kTmV0UGFja2V0ID0gbmV3IEFycmF5PE5ldFBhY2tldD4oKSAvL+WPkemAgeeahOe9kee7nOWMhVxyXG4gICAgICAgIC8vdGhpcy5yZWNlaXZlTmV0UGFja2V0ID0gbmV3IEFycmF5PE5ldFBhY2tldD4oKSAvL+aOpeaUtueahOe9kee7nOWMhVxyXG5cclxuICAgICAgICB0aGlzLnByb3RvUm9vdCA9IExheWEuQnJvd3Nlci53aW5kb3dbXCJQQk1lc3NhZ2VcIl1cclxuICAgICAgICB0aGlzLnBiTWVzc2FnZU5hbWUgPSBHYW1lTWVzc2FnZU5hbWUuZ2V0TWFwKClcclxuICAgIH1cclxuICAgIHB1YmxpYyBjb25uZWN0KGhvc3Q6IHN0cmluZywgcG9ydDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51cmwgPSBob3N0LmNvbmNhdChwb3J0LnRvU3RyaW5nKCkpXHJcbiAgICAgICAgdGhpcy5jb25uZWN0QnlVcmwodGhpcy51cmwpXHJcbiAgICB9XHJcbiAgICAvL1wid3M6Ly9sb2NhbGhvc3Q6ODk4OVwiXHJcbiAgICBwdWJsaWMgY29ubmVjdEJ5VXJsKHVybDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51cmwgPSB1cmxcclxuICAgICAgICB0aGlzLnNvY2tldCA9IG5ldyBMYXlhLlNvY2tldCgpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQuZW5kaWFuID0gTGF5YS5CeXRlLkxJVFRMRV9FTkRJQU4vL+i/memHjOaIkeS7rOmHh+eUqOWwj+err1xyXG4gICAgICAgIHRoaXMuc29ja2V0LmNvbm5lY3RCeVVybCh1cmwpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oTGF5YS5FdmVudC5PUEVOLCB0aGlzLCB0aGlzLm9wZW5IYW5kbGVyKVxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKExheWEuRXZlbnQuTUVTU0FHRSwgdGhpcywgdGhpcy5yZWNlaXZlSGFuZGxlcilcclxuICAgICAgICB0aGlzLnNvY2tldC5vbihMYXlhLkV2ZW50LkNMT1NFLCB0aGlzLCB0aGlzLmNsb3NlSGFuZGxlcilcclxuICAgICAgICB0aGlzLnNvY2tldC5vbihMYXlhLkV2ZW50LkVSUk9SLCB0aGlzLCB0aGlzLmVycm9ySGFuZGxlcilcclxuICAgIH1cclxuICAgIC8v6YeN5paw6L+e5o6lXHJcbiAgICBwdWJsaWMgcmVjb25uZWN0KCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0LmNsZWFuU29ja2V0KClcclxuICAgICAgICB0aGlzLmNvbm5lY3RCeVVybCh0aGlzLnVybClcclxuICAgIH1cclxuICAgIC8v5pat5byA6L+e5o6lXHJcbiAgICBwdWJsaWMgZGlzY29ubmVjdGVkKCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0LmNsb3NlKClcclxuICAgIH1cclxuICAgIC8v5piv5ZCm6L+e5o6lXHJcbiAgICBwdWJsaWMgY29ubmVjdGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvY2tldC5jb25uZWN0ZWRcclxuICAgIH1cclxuICAgIC8v5q2j56Gu5bu656uL6L+e5o6lXHJcbiAgICBwcml2YXRlIG9wZW5IYW5kbGVyKGV2ZW50OiBhbnkgPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy51cmwgKyB0aGlzLnRpcHMgKyBcIiAg5q2j56Gu5bu656uL6L+e5o6lXCIpXHJcbiAgICB9XHJcbiAgICAvL+WFs+mXrei/nuaOpeS6i+S7tlxyXG4gICAgcHJpdmF0ZSBjbG9zZUhhbmRsZXIoZXZlbnQ6IGFueSA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVybCArIHRoaXMudGlwcyArIFwiIOWFs+mXrei/nuaOpeS6i+S7tlwiKVxyXG4gICAgfVxyXG4gICAgLy/ov57mjqXlh7rplJlcclxuICAgIHByaXZhdGUgZXJyb3JIYW5kbGVyKGU6IGFueSA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVybCArIHRoaXMudGlwcyArIFwiIOi/nuaOpeWHuumUmVwiKVxyXG4gICAgfVxyXG5cclxuICAgIC8v5Y+R6YCB56m65raI5oGvXHJcbiAgICBwdWJsaWMgc2VuZEVtcHR5KG1zZ0lkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICAvLyDlhpnlhaXkuIDkuKrmlbDlrZcwXHJcbiAgICAgICAgdGhpcy50ZW1wQnl0ZXMud3JpdGVGbG9hdDMyKDApXHJcbiAgICAgICAgdGhpcy5zZW5kKG1zZ0lkLCB0aGlzLnRlbXBCeXRlcylcclxuICAgICAgICB0aGlzLnRlbXBCeXRlcy5jbGVhcigpXHJcbiAgICB9XHJcblxyXG4gICAgLy/lj5HpgIHmtojmga9cclxuICAgIHB1YmxpYyBzZW5kTWVzc2FnZShtc2dJZDogbnVtYmVyLCBtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8vaWYgKHR5cGVvZiBtc2cgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIC8vICAgIHRoaXMudGVtcEJ5dGVzLndyaXRlVVRGU3RyaW5nKG1zZylcclxuICAgICAgICAvLyAgICB0aGlzLnNlbmQobXNnSWQsIHRoaXMudGVtcEJ5dGVzKVxyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vZWxzZSBpZiAobXNnIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICAvLyAgICB0aGlzLnRlbXBCeXRlcy53cml0ZUFycmF5QnVmZmVyKGJ1ZmZlcilcclxuICAgICAgICAvLyAgICB0aGlzLnNlbmQobXNnSWQsIHRoaXMudGVtcEJ5dGVzKVxyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGJ1ZmZlcjogVWludDhBcnJheSA9IHRoaXMuc2VyaWFsaXplKG1zZ0lkLCBtc2cpXHJcbiAgICAgICAgICAgIHRoaXMudGVtcEJ5dGVzLndyaXRlQXJyYXlCdWZmZXIoYnVmZmVyKVxyXG4gICAgICAgICAgICB0aGlzLnNlbmQobXNnSWQsIHRoaXMudGVtcEJ5dGVzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+mcgOimgeWPkemAgeeahOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBzZW5kKG1zZ0lkOiBudW1iZXIsIGJ5dGU6IExheWEuQnl0ZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5zb2NrZXQuY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIGNvbm5lY3Rpb24gaGFzIGJlZW4gZGlzY29ubmVjdGVkLlwiKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9XRUJQQUNLX0hFQURfT0ZGU0VUXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMud3JpdGVGbG9hdDY0KE5ldHdvcmtNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um9sZUlkKCkpXHJcbiAgICAgICAgLy9XRUJQQUNLX01FU1NTQUdFSURfT0ZGU0VUXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMud3JpdGVJbnQzMihtc2dJZClcclxuICAgICAgICAvL1dFQlBBQ0tfTEVOR1RIX09GRlNFVFxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLndyaXRlSW50MzIodGhpcy5XRUJQQUNLX0hFQURfU0laRSArIGJ5dGUubGVuZ3RoKVxyXG4gICAgICAgIC8vTWFzc2dlIGJvZHlcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy53cml0ZUFycmF5QnVmZmVyKGJ5dGUuYnVmZmVyKVxyXG4gICAgICAgIC8v6L+Z6YeM5piv5oqK5a2X6IqC5pWw57uE55qE5pWw5o2u6YCa6L+Hc29ja2V05Y+R6YCB57uZ5pyN5Yqh5ZmoXHJcbiAgICAgICAgdGhpcy5zb2NrZXQuc2VuZCh0aGlzLnNlbmRCeXRlcy5idWZmZXIpXHJcbiAgICAgICAgLy/muIXpmaTmjonmlbDmja7vvIzmlrnkvr/kuIvmrKHor7vlhplcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy5jbGVhcigpXHJcbiAgICAgICAgdGhpcy50ZW1wQnl0ZXMuY2xlYXIoKVxyXG4gICAgfVxyXG5cclxuICAgIC8v5o6l5pS25Yiw5pWw5o2uXHJcbiAgICBwcml2YXRlIHJlY2VpdmVIYW5kbGVyKG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIk1lc3NhZ2UgZnJvbSBzZXJ2ZXI6ICBcIiArIG5ldyBMYXlhLkJ5dGUobXNnKS5yZWFkVVRGQnl0ZXMoKSlcclxuICAgICAgICB2YXIgbmV0UGFja2V0OiBOZXRQYWNrZXQgPSBuZXcgTmV0UGFja2V0KHRoaXMpXHJcbiAgICAgICAgbmV0UGFja2V0LnJlY2VpdmVNc2cobXNnKVxyXG4gICAgICAgIHRoaXMuc29ja2V0LmlucHV0LmNsZWFyKClcclxuICAgICAgICBOZXRFdmVudERpc3BhdGNoZXIuZ2V0SW5zdGFuY2UoKS5kaXNwYXRjaE1lc3NhZ2UobmV0UGFja2V0Lm1lc3NhZ2VJZCwgbmV0UGFja2V0KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bqP5YiX5YyWIHByb3RvY29sLWJ1ZmZlclxyXG4gICAgICogQHBhcmFtIG1hc3NhZ2VJZCBcclxuICAgICAqIEBwYXJhbSBtYXNzYWdlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXJpYWxpemUobWFzc2FnZUlkOiBudW1iZXIsIG1hc3NhZ2U6IGFueSk6IFVpbnQ4QXJyYXkge1xyXG4gICAgICAgIGxldCBtYXNzYWdlTmFtZTogc3RyaW5nID0gdGhpcy5wYk1lc3NhZ2VOYW1lW21hc3NhZ2VJZF1cclxuICAgICAgICAvLyBFbmNvZGUgYSBtZXNzYWdlIHRvIGFuIFVpbnQ4QXJyYXkgKGJyb3dzZXIpIG9yIEJ1ZmZlciAobm9kZSlcclxuICAgICAgICB2YXIgYnVmZmVyOiBhbnkgPSB0aGlzLnByb3RvUm9vdFttYXNzYWdlTmFtZV0uZW5jb2RlKG1hc3NhZ2UpLmZpbmlzaCgpO1xyXG4gICAgICAgIHJldHVybiBidWZmZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj43luo/liJfljJYgcHJvdG9jb2wtYnVmZmVyXHJcbiAgICAgKiBAcGFyYW0gbWFzc2FnZU5hbWUgXHJcbiAgICAgKiBAcGFyYW0gbmV0UGFja2FnZSBOZXRQYWNrYWdlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZXNlcmlhbGl6ZShtYXNzYWdlSWQ6IG51bWJlciwgbWFzc2FnZTogVWludDhBcnJheSk6IGFueSB7XHJcbiAgICAgICAgbGV0IG1hc3NhZ2VOYW1lOiBzdHJpbmcgPSB0aGlzLnBiTWVzc2FnZU5hbWVbbWFzc2FnZUlkXVxyXG4gICAgICAgIC8vIERlY29kZSBhbiBVaW50OEFycmF5IChicm93c2VyKSBvciBCdWZmZXIgKG5vZGUpIHRvIGEgbWVzc2FnZVxyXG4gICAgICAgIHZhciBtZXNzYWdlOiBhbnkgPSB0aGlzLnByb3RvUm9vdFttYXNzYWdlTmFtZV0uZGVjb2RlKG1hc3NhZ2UpO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgfVxyXG5cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xyXG5pbXBvcnQgTWFpblVJIGZyb20gXCIuL3NjcmlwdC9NYWluVUlcIlxuaW1wb3J0IFRlc3RfOV9UaW1lTGluZVVJIGZyb20gXCIuL3N0dWR5L1Rlc3RfOV9UaW1lTGluZVVJXCJcclxuLypcclxuKiDmuLjmiI/liJ3lp4vljJbphY3nva47XHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb25maWd7XHJcbiAgICBzdGF0aWMgd2lkdGg6bnVtYmVyPTY0MDtcclxuICAgIHN0YXRpYyBoZWlnaHQ6bnVtYmVyPTExMzY7XHJcbiAgICBzdGF0aWMgc2NhbGVNb2RlOnN0cmluZz1cImZpeGVkaGVpZ2h0XCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJob3Jpem9udGFsXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJNYWluU2NlbmUuc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj10cnVlO1xyXG4gICAgc3RhdGljIHN0YXQ6Ym9vbGVhbj10cnVlO1xyXG4gICAgc3RhdGljIHBoeXNpY3NEZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIGV4cG9ydFNjZW5lVG9Kc29uOmJvb2xlYW49dHJ1ZTtcclxuICAgIGNvbnN0cnVjdG9yKCl7fVxyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICB2YXIgcmVnOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuICAgICAgICByZWcoXCJzY3JpcHQvTWFpblVJLnRzXCIsTWFpblVJKTtcbiAgICAgICAgcmVnKFwic3R1ZHkvVGVzdF85X1RpbWVMaW5lVUkudHNcIixUZXN0XzlfVGltZUxpbmVVSSk7XHJcbiAgICB9XHJcbn1cclxuR2FtZUNvbmZpZy5pbml0KCk7IiwiaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi4vdWkvbGF5YU1heFVJXCI7XHJcbmltcG9ydCBOZXR3b3JrTWFuYWdlciBmcm9tIFwiLi4vRnJhbWV3b3JrL05ldHdvcmsvTmV0d29ya01hbmFnZXJcIjtcclxuaW1wb3J0IE5ldEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vRnJhbWV3b3JrL0V2ZW50L05ldEV2ZW50RGlzcGF0Y2hlclwiO1xyXG5pbXBvcnQgTmV0UGFja2V0IGZyb20gXCIuLi9GcmFtZXdvcmsvTmV0d29yay9OZXRQYWNrZXRcIjtcclxuaW1wb3J0IEdhbWVNZXNzYWdlTmFtZSBmcm9tIFwiLi4vRnJhbWV3b3JrL05ldHdvcmsvR2FtZU1lc3NhZ2VOYW1lXCI7XHJcblxyXG5cclxuLy/kuLvnlYzpnaJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpblVJIGV4dGVuZHMgdWkuTWFpblNjZW5lVUkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigpOyB9XHJcblxyXG4gICAgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYWluVUkub25FbmFibGVcIilcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coR2FtZU1lc3NhZ2UuR01fVkVSU0lPTl9SRVRVUk4pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIE5ldEV2ZW50RGlzcGF0Y2hlci5nZXRJbnN0YW5jZSgpLnJlZ2lzdGVyTWVzc2FnZShHYW1lTWVzc2FnZS5HTV9WRVJTSU9OX1JFVFVSTiwgdGhpcy5HTV9WZXJpZnlWZXJzaW9uUmV0dXJuKS8vXHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFpblVJLm9uRGlzYWJsZVwiKVxyXG4gICAgICAgIFxyXG4gICAgICAgIE5ldEV2ZW50RGlzcGF0Y2hlci5nZXRJbnN0YW5jZSgpLnVuUmVnaXN0ZXJNZXNzYWdlKEdhbWVNZXNzYWdlLkdNX1ZFUlNJT05fUkVUVVJOLCB0aGlzLkdNX1ZlcmlmeVZlcnNpb25SZXR1cm4pLy9cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBHTV9WZXJpZnlWZXJzaW9uUmV0dXJuKG5ldFBhY2thZ2U6TmV0UGFja2V0KTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5ldFBhY2thZ2UubWVzc2FnZUlkICsgXCIgIFwiICsgbmV0UGFja2FnZS5tZXNzYWdlKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkF3YWtlKCk6IHZvaWQge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlByZWNpc2lvbiBzYWZlLlwiICsgKE1hdGgucG93KDIsIDUzKSAtIDEpKTtcclxuXHJcbiAgICAgICAgdmFyIG1zZyA9IHtcclxuICAgICAgICAgICAgdmVyc2lvbjogXCIxLjUuNFwiLFx0XHRcdFx0Ly/lrqLmiLfnq6/niYjmnKzlj7dcclxuICAgICAgICAgICAgcGxhdGZvcm06IDkwMDcxOTkyNTQ3NDA5OTEsICAgICAgICAgICAgIC8vL+W5s+WPsFxyXG4gICAgICAgICAgICBpc3Rlc3Q6IDAsLy8vICAgIDDjgIHmraPluLjvvIwx44CB5rWL6K+V77yM5LiN6ZyA6KaB6aqM6K+B54mI5pysXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcm9vdCA9IExheWEuQnJvd3Nlci53aW5kb3dbXCJQQk1lc3NhZ2VcIl07XHJcbiAgICAgICAgdmFyIHBiTWVzc2FnZU5hbWUgPSBHYW1lTWVzc2FnZU5hbWUuZ2V0TWFwKClcclxuICAgICAgICB2YXIgYnVmZmVyOiBhbnkgPSByb290W3BiTWVzc2FnZU5hbWVbR2FtZU1lc3NhZ2UuR01fVkVSSUZZX1ZFUlNJT05dXS5lbmNvZGUobXNnKS5maW5pc2goKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhidWZmZXIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIE5ldHdvcmtNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlQ2xpZW50KDAsIFwid3M6Ly8xOTIuMTY4LjIuMTI2OjUwMDAwXCIpO1xyXG5cclxuICAgICAgICAvL+WumuaXtuaJp+ihjOS4gOasoSjpl7TpmpTml7bpl7QpXHJcbiAgICAgICAgLy9MYXlhLnRpbWVyLm9uY2UoMjAwMCwgdGhpcywgdGhpcy50ZXN0TmV0d29yayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0ZXN0TmV0d29yaygpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRlc3ROZXR3b3JrKClcIik7XHJcbiAgICAgICAgdmFyIG1zZyA9IHtcclxuICAgICAgICAgICAgdmVyc2lvbjogXCIxLjUuNFwiLFx0XHRcdFx0Ly/lrqLmiLfnq6/niYjmnKzlj7dcclxuICAgICAgICAgICAgcGxhdGZvcm06IDkwMDcxOTkyNTQ3NDA5OTEsICAgICAgICAgICAgIC8vL+W5s+WPsFxyXG4gICAgICAgICAgICBpc3Rlc3Q6IDAsLy8vICAgIDDjgIHmraPluLjvvIwx44CB5rWL6K+V77yM5LiN6ZyA6KaB6aqM6K+B54mI5pysXHJcbiAgICAgICAgfVxyXG4gICAgICAgIE5ldHdvcmtNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9naW5TZW5kTWVzc2FnZShHYW1lTWVzc2FnZS5HTV9WRVJJRllfVkVSU0lPTiwgIG1zZyk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0XzEyX1RpbGVkTWFwIHtcclxuICAgIC8vb3B0aW1pemF0aW9uKCk6dm9pZHtcclxuICAgIC8vICAgIC8v5b2TVGlsZWQgTWFwYeS4jeWGjeS9v+eUqOeahOaXtuWAme+8jOmcgOimgeS9v+eUqGRlc3Ryb3koKeaWueazlei/m+ihjOmUgOavge+8jOWbnuaUtuiiq+WNoOeUqOeahOWGheWtmFxyXG4gICAgLy8gICAgdGhpcy50TWFwLmRlc3Ryb3koKTtcclxuICAgIC8vICAgIC8v6Ieq5Yqo57yT5a2Y5rKh5pyJ5Yqo55S755qE5Zyw5Z2XXHJcbiAgICAvLyAgICB0aGlzLnRNYXAuYXV0b0NhY2hlID0gdHJ1ZTtcclxuICAgIC8vICAgIC8v6Ieq5Yqo57yT5a2Y55qE57G75Z6LLOWcsOWbvui+g+Wkp+aXtuW7uuiuruS9v+eUqG5vcm1hbFxyXG4gICAgLy8gICAgdGhpcy50TWFwLmF1dG9DYWNoZVR5cGUgPSBcIm5vcm1hbFwiO1xyXG4gICAgLy8gICAgLy/mtojpmaTnvKnmlL7lr7zoh7TnmoTnvJ3pmpks5Lmf5bCx5piv5Y676buR6L6577yMMS43LjfniYjmnKzmlrDlop7nmoTkvJjljJblsZ7mgKdcclxuICAgIC8vICAgIHRoaXMudE1hcC5hbnRpQ3JhY2sgPSB0cnVlO1xyXG4gICAgLy8gICAgLy/lvIDlkK/lm77lsYLlkIjlubZcclxuICAgIC8vICAgIHRoaXMudE1hcC5lbmFibGVNZXJnZUxheWVyID0gdHJ1ZTtcclxuICAgIC8vXHJcbiAgICAvLyAgICAvL+e8k+WtmOWMuuWdl+eahOiuvue9ruaOqOiNkFxyXG4gICAgLy8gICAgLy/lpoLmnpzljZXlm77mmK8xNSoxNe+8jOe8k+WtmOWPr+WMuuWdl+WPr+S7peiuvue9ruS4ujUxMCo1MTDvvIgzNOWAje+8ie+8jOS7peatpOexu+aOqO+8jOWwvemHj+WcqOWOn+WMuuWdl+aVtOaVsOWAjeeahOWJjeaPkOS4i++8jOiuvue9ruWcqDUxMuW3puWPs+OAguaOqOiNkOS4ujUxMio1MTJcclxuICAgIC8vICAgIC8v57yT5a2Y5Yy65Z2X55qE5YW35L2T6K6+572u5pa55rOVXHJcbiAgICAvLyAgICAvL+S4uuesrOS6lOS4quWPguaVsGdyaWRTaXpl5Yib5bu65LiA5LiqNTEyKjUxMuWkp+Wwj+eahFBvaW505a+56LGh5a6e5L6LXHJcbiAgICAvLyAgICAvL3ZhciBncmlkU2l6ZTpMYXlhLlBvaW50ID0gbmV3IExheWEuUG9pbnQoNTEyLCA1MTIpO1xyXG4gICAgLy9cclxuICAgIC8vICAgIC8v56e76Zmk6KKr6Z2e6YCP5piO5Zyw5Z2X6KaG55uW55qE6YOo5YiGXHJcbiAgICAvLyAgICAvL+WmguaenOWcqFRpbGVkIE1hcOS4reayoeacieWvueWbvuWdl+iuvue9rnR5cGXlsZ7mgKfvvIzpgqPkuYjljbPkvr/lvIDlkK/kuoZyZW1vdmVDb3ZlcmVkVGlsZSDvvIzkuZ/mmK/ml6DmlYjnmoTjgILmiYDku6XvvIzlvIDlkK/kuYvliY3vvIzpnIDopoHlhYjlnKhUaWxlZE1hcOe8lui+keWZqOS4re+8jOS4uuWbvuWdl+aWsOWinuiHquWumuS5ieWxnuaAp3R5cGXvvIzlubblsIborr7nva7kuLoxXHJcbiAgICAvLyAgICB0aGlzLnRNYXAucmVtb3ZlQ292ZXJlZFRpbGUgPSB0cnVlO1xyXG4gICAgLy99XHJcblxyXG4gICAgcHJpdmF0ZSB0TWFwOiBMYXlhLlRpbGVkTWFwO1xyXG4gICAgcHJpdmF0ZSBzY2FsZVZhbHVlOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBNYXBYOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBNYXBZOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBtTGFzdE1vdXNlWDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtTGFzdE1vdXNlWTogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGVzdF8xMl9UaWxlZE1hcFwiKTtcclxuICAgICAgICAvL+WIneWni+WMluiInuWPsFxyXG4gICAgICAgIExheWEuaW5pdChMYXlhLkJyb3dzZXIud2lkdGgsIExheWEuQnJvd3Nlci5oZWlnaHQsIExheWEuV2ViR0wpO1xyXG4gICAgICAgIC8v5Yib5bu6VGlsZWRNYXDlrp7kvotcclxuICAgICAgICB0aGlzLnRNYXAgPSBuZXcgTGF5YS5UaWxlZE1hcCgpO1xyXG4gICAgICAgIC8v5Yib5bu6UmVjdGFuZ2xl5a6e5L6L77yM6KeG5Y+j5Yy65Z+fXHJcbiAgICAgICAgdmFyIHZpZXdSZWN0OiBMYXlhLlJlY3RhbmdsZSA9IG5ldyBMYXlhLlJlY3RhbmdsZSgpO1xyXG4gICAgICAgIC8v5Yib5bu6VGlsZWRNYXDlnLDlm77vvIzliqDovb1vcnRob2dvbmFsLmpzb27lkI7vvIzmiafooYzlm57osIPmlrnms5Vvbk1hcExvYWRlZCgpXHJcbiAgICAgICAgdGhpcy50TWFwLmNyZWF0ZU1hcChcInJlcy9UaWxlZE1hcC9vcnRob2dvbmFsLmpzb25cIiwgdmlld1JlY3QsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbk1hcExvYWRlZCkpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbk1hcExvYWRlZCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uTWFwTG9hZGVkXCIpO1xyXG4gICAgICAgIC8v6K6+572u57yp5pS+5Lit5b+D54K55Li66KeG5Y+j55qE5bem5LiK6KeSXHJcbiAgICAgICAgdGhpcy50TWFwLnNldFZpZXdQb3J0UGl2b3RCeVNjYWxlKDAsIDApO1xyXG4gICAgICAgIC8v5bCG5Y6f5Zyw5Zu+5pS+5aSnM+WAjVxyXG4gICAgICAgIHRoaXMudE1hcC5zY2FsZSA9IDM7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50LlJFU0laRSwgdGhpcywgdGhpcy5yZXNpemUpO1xyXG4gICAgICAgIExheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5NT1VTRV9ET1dOLCB0aGlzLCB0aGlzLm1vdXNlRG93bik7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50Lk1PVVNFX1VQLCB0aGlzLCB0aGlzLm1vdXNlVXApO1xyXG4gICAgICAgIHRoaXMucmVzaXplKCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOenu+WKqOWcsOWbvuinhuWPo1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1vdXNlTW92ZSgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgbW92ZVg6IG51bWJlciA9IHRoaXMuTWFwWCAtIChMYXlhLnN0YWdlLm1vdXNlWCAtIHRoaXMubUxhc3RNb3VzZVgpO1xyXG4gICAgICAgIHZhciBtb3ZlWTogbnVtYmVyID0gdGhpcy5NYXBZIC0gKExheWEuc3RhZ2UubW91c2VZIC0gdGhpcy5tTGFzdE1vdXNlWSlcclxuICAgICAgICAvL+enu+WKqOWcsOWbvuinhuWPo1xyXG4gICAgICAgIHRoaXMudE1hcC5tb3ZlVmlld1BvcnQobW92ZVgsIG1vdmVZKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbW91c2VVcCgpOiB2b2lkICB7XHJcbiAgICAgICAgdGhpcy5NYXBYID0gdGhpcy5NYXBYIC0gKExheWEuc3RhZ2UubW91c2VYIC0gdGhpcy5tTGFzdE1vdXNlWCk7XHJcbiAgICAgICAgdGhpcy5NYXBZID0gdGhpcy5NYXBZIC0gKExheWEuc3RhZ2UubW91c2VZIC0gdGhpcy5tTGFzdE1vdXNlWSk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vZmYoTGF5YS5FdmVudC5NT1VTRV9NT1ZFLCB0aGlzLCB0aGlzLm1vdXNlTW92ZSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG1vdXNlRG93bigpOiB2b2lkICB7XHJcbiAgICAgICAgdGhpcy5tTGFzdE1vdXNlWCA9IExheWEuc3RhZ2UubW91c2VYO1xyXG4gICAgICAgIHRoaXMubUxhc3RNb3VzZVkgPSBMYXlhLnN0YWdlLm1vdXNlWTtcclxuICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuTU9VU0VfTU9WRSwgdGhpcywgdGhpcy5tb3VzZU1vdmUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAg5pS55Y+Y6KeG5Y+j5aSn5bCPXHJcbiAgICAgKiAg6YeN6K6+5Zyw5Zu+6KeG5Y+j5Yy65Z+fXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVzaXplKCk6IHZvaWQgIHtcclxuICAgICAgICAvL+aUueWPmOinhuWPo+Wkp+Wwj1xyXG4gICAgICAgIHRoaXMudE1hcC5jaGFuZ2VWaWV3UG9ydCh0aGlzLk1hcFgsIHRoaXMuTWFwWSwgTGF5YS5Ccm93c2VyLndpZHRoLCBMYXlhLkJyb3dzZXIuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcblxyXG59IiwiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdF85X1RpbWVMaW5lVUlcclxue1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy/liqDovb3lm77pm4bmiJDlip/lkI7vvIzmiafooYxvbkxvYWTlm57osIPmlrnms5VcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKFwicmVzL2F0bGFzL3Rlc3QuYXRsYXNcIixMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbkxvYWRlZCkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIG9uTG9hZGVkKCk6dm9pZHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWKoOi9veWbvumbhuaIkOWKn+WQju+8jOaJp+ihjG9uTG9hZOWbnuiwg+aWueazlVwiKVxyXG4gICAgICAgIC8v5Yib5bu65LiA5LiqVUnlrp7kvotcclxuICAgICAgICAvL3ZhciBwbGFuOlRpbWVMaW5lVUkgPSBuZXcgVGltZUxpbmVVSSgpXHJcbiAgICAgICAgLy/mt7vliqDliLDoiJ7lj7BcclxuICAgICAgICAvL0xheWEuc3RhZ2UuYWRkQ2hpbGQocGxhbik7XHJcbiAgICAgICAgLy/mkq3mlL5VSeWcuuaZr+S4reeahOWKqOeUu1xyXG4gICAgICAgIC8vdGhpcy5iZWFyLnBsYXkoKTtcclxuICAgIH1cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xuaW1wb3J0IFZpZXc9TGF5YS5WaWV3O1xyXG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xyXG5pbXBvcnQgU2NlbmU9TGF5YS5TY2VuZTtcbnZhciBSRUc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xuZXhwb3J0IG1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgTWFpblNjZW5lVUkgZXh0ZW5kcyBTY2VuZSB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5NYWluU2NlbmVVSVwiLE1haW5TY2VuZVVJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBUaW1lTGluZVVJIGV4dGVuZHMgRGlhbG9nIHtcclxuXHRcdHB1YmxpYyBiZWFyOkxheWEuQW5pbWF0aW9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiVGltZUxpbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuVGltZUxpbmVVSVwiLFRpbWVMaW5lVUkpO1xyXG59XHIiXX0=
