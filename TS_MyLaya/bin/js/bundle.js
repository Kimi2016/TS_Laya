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
//启动类
var AppMain = /** @class */ (function () {
    function AppMain() {
        //根据IDE设置初始化引擎		
        if (window["Laya3D"]) {
            Laya3D.init(GameConfig_1.default.width, GameConfig_1.default.height);
        }
        else {
            // 不支持WebGL时自动切换至Canvas
            //Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
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
    };
    return AppMain;
}());
//激活启动类
new AppMain();
},{"./GameConfig":7}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetworkEventDispatcher = /** @class */ (function () {
    function NetworkEventDispatcher() {
        this.messageHandlers = {};
    }
    NetworkEventDispatcher.getInstance = function () {
        return this.instance || (this.instance = new this());
    };
    NetworkEventDispatcher.prototype.RegisterMessage = function (messageID, fun) {
        var funs = this.messageHandlers[messageID];
        if (!funs) {
            funs = new Array();
            this.messageHandlers[messageID] = funs;
        }
        funs.push(fun);
    };
    NetworkEventDispatcher.prototype.UnRegisterMessage = function (messageID, fun) {
        var funs = this.messageHandlers[messageID];
        if (funs) {
            var index = funs.indexOf(fun);
            funs.splice(index, 1);
        }
    };
    NetworkEventDispatcher.prototype.Dispatch = function (messageID, netPackage) {
        var funs = this.messageHandlers[messageID];
        if (funs) {
            funs.forEach(function (element) {
                element.call(element, netPackage);
            });
        }
    };
    NetworkEventDispatcher.prototype.ClearAll = function () {
        this.messageHandlers = {};
    };
    return NetworkEventDispatcher;
}());
exports.default = NetworkEventDispatcher;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketConnect_1 = require("./SocketConnect");
//import * as Collections from 'typescript-collections'; //import Collections = require('typescript-collections');
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
        this.socketConnect = new SocketConnect_1.default(" clientId:" + this.clientId);
        this.socketConnect.connect(host, port);
    };
    GameClient.prototype.connectByUrl = function (url) {
        this.socketConnect = new SocketConnect_1.default(" clientId:" + this.clientId);
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
    GameClient.prototype.sendString = function (msgId, content) {
        this.socketConnect.sendString(msgId, content);
    };
    GameClient.prototype.sendByte = function (msgId, content) {
        this.socketConnect.sendByte(msgId, content);
    };
    return GameClient;
}());
var ClientManager = /** @class */ (function () {
    function ClientManager() {
        this.gameClientDic = {};
        //this.gameClientDic[ClientID.login] = this.CreateClient(ClientID.login, "ws://192.168.2.126:50000");
    }
    ClientManager.getSingleton = function () {
        if (!this.clientManager) {
            this.clientManager = new ClientManager();
        }
        return this.clientManager;
    };
    ClientManager.prototype.CreateClient = function (clientID, url) {
        var client = new GameClient(clientID);
        client.connectByUrl(url);
        this.gameClientDic[ClientID.login] = client;
        return client;
    };
    ClientManager.prototype.GetClient = function (clientID) {
        if (this.gameClientDic[clientID] != null) {
            return this.gameClientDic[clientID];
        }
        return null;
    };
    ClientManager.prototype.loginSendMessage = function (msgId, content) {
        var client = this.GetClient(ClientID.login);
        if (client) {
            client.sendByte(msgId, content);
        }
    };
    ClientManager.prototype.logicSendMessage = function (msgId, content) {
        var client = this.GetClient(ClientID.logic);
        if (client) {
            client.sendByte(msgId, content);
        }
    };
    ClientManager.prototype.sceneSendMessage = function (msgId, content) {
        var client = this.GetClient(ClientID.scene);
        if (client) {
            client.sendByte(msgId, content);
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
},{"./SocketConnect":6}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Byte = Laya.Byte;
var NetPacket = /** @class */ (function () {
    function NetPacket() {
        //private WEBPACK_HEAD_OFFSET: number = 0;	// 自定义数据 一般是roleid (long类型)
        //private WEBPACK_MESSSAGEID_OFFSET: number = 8;	// 消息id
        //private WEBPACK_LENGTH_OFFSET: number = 12;	// 消息长度
        this.WEBPACK_HEAD_SIZE = 16; // 消息数据开始位置
        this.readBytes = new Byte();
        this.readBytes.endian = Laya.Byte.LITTLE_ENDIAN; //这里我们采用小端
    }
    //接收服务器信息
    NetPacket.prototype.receiveMsg = function (bytes) {
        this.readBytes.writeArrayBuffer(bytes);
        this.readBytes.pos = 0; //设置偏移指针
        //按照服务器传递过来的数据，按照顺序读取
        this.roleid = this.readBytes.getFloat64();
        console.log("roleid：" + this.roleid);
        this.msgid = this.readBytes.getInt32();
        var msgLength = this.readBytes.getInt32();
        var ab = this.readBytes.readArrayBuffer(msgLength - this.WEBPACK_HEAD_SIZE);
        this.body = new Uint8Array(ab);
        //if (msgLength != this.readBytes.length) {
        //    console.error("消息长不一样");
        //}
        this.readBytes.clear();
    };
    return NetPacket;
}());
exports.default = NetPacket;
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientManager_1 = require("./ClientManager");
var NetworkManager = /** @class */ (function () {
    function NetworkManager() {
        this.protoRoot = null;
        this.protoRoot = Laya.Browser.window["PBMessage"];
    }
    NetworkManager.getInstance = function () {
        if (!this.instance) {
            this.instance = new NetworkManager();
        }
        return this.instance;
    };
    /**
     * 序列化 protocol-buffer
     * @param massageName
     * @param massage
     */
    NetworkManager.prototype.serialize = function (massageName, massage) {
        // Encode a message to an Uint8Array (browser) or Buffer (node)
        var buffer = this.protoRoot[massageName].encode(massage).finish();
        return buffer;
    };
    /**
     * 反序列化 protocol-buffer
     * @param massageName
     * @param netPackage NetPackage
     */
    NetworkManager.prototype.deserialize = function (massageName, netPackage) {
        // Decode an Uint8Array (browser) or Buffer (node) to a message
        var message = this.protoRoot[massageName].decode(netPackage.body);
        return message;
    };
    /**
     * 发送消息
     * @param massageID ID
     * @param massageName GM_VerifyVersion
     * @param massage
     * var msg = { version: "1", platform:1, istest:3 } 或 var msg = new PBMassage.GM_VerifyVersion(); msg.version = "1"; msg.platform = 1; msg.istest = 1;
     */
    NetworkManager.prototype.loginSendMessage = function (massageID, massageName, massage) {
        var buffer = this.serialize(massageName, massage);
        ClientManager_1.default.getSingleton().loginSendMessage(massageID, buffer);
    };
    NetworkManager.prototype.logicSendMessage = function (massageID, massageName, massage) {
        var buffer = this.serialize(massageName, massage);
        ClientManager_1.default.getSingleton().logicSendMessage(massageID, buffer);
    };
    NetworkManager.prototype.sceneSendMessage = function (massageID, massageName, massage) {
        var buffer = this.serialize(massageName, massage);
        ClientManager_1.default.getSingleton().sceneSendMessage(massageID, buffer);
    };
    return NetworkManager;
}());
exports.default = NetworkManager;
},{"./ClientManager":3}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetworkEventDispatcher_1 = require("../Event/NetworkEventDispatcher");
var NetPacket_1 = require("./NetPacket");
var SocketConnect = /** @class */ (function () {
    //private sendNetPacket: Array<NetPacket> = null;
    //private receiveNetPacket: Array<NetPacket> = null;
    function SocketConnect(tips) {
        this.WEBPACK_HEAD_OFFSET = 0; // 自定义数据 一般是roleid (long类型)
        this.WEBPACK_MESSSAGEID_OFFSET = 8; // 消息id
        this.WEBPACK_LENGTH_OFFSET = 12; // 消息长度
        this.WEBPACK_HEAD_SIZE = 16; // 消息数据开始位置
        this.socket = null;
        this.sendBytes = null;
        this.readBytes = null;
        this.tempBytes = null;
        this.url = null;
        this.tips = null;
        this.tips = tips;
        this.sendBytes = new Laya.Byte();
        this.sendBytes.endian = Laya.Byte.LITTLE_ENDIAN; //这里我们采用小端
        this.tempBytes = new Laya.Byte();
        this.tempBytes.endian = Laya.Byte.LITTLE_ENDIAN; //这里我们采用小端
        //this.sendNetPacket = new Array<NetPacket>(); //发送的网络包
        //this.receiveNetPacket = new Array<NetPacket>(); //接收的网络包
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
    SocketConnect.prototype.reConnect = function () {
        this.socket.cleanSocket();
        this.connectByUrl(this.url);
    };
    SocketConnect.prototype.disConnect = function () {
        this.socket.close();
    };
    //是否连接
    SocketConnect.prototype.connected = function () {
        return this.socket.connected;
    };
    //正确建立连接
    SocketConnect.prototype.openHandler = function (event) {
        if (event === void 0) { event = null; }
        //console.log(this.url + this.tips + "  正确建立连接");
    };
    //接收到数据
    SocketConnect.prototype.receiveHandler = function (msg) {
        //console.log("Message from server:  " + new Laya.Byte(msg).readUTFBytes());
        var netPacket = new NetPacket_1.default();
        netPacket.receiveMsg(msg);
        this.socket.input.clear();
        NetworkEventDispatcher_1.default.getInstance().Dispatch(netPacket.msgid, netPacket);
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
    //发送字符串格式
    SocketConnect.prototype.sendString = function (msgId, content) {
        this.tempBytes.writeUTFString(content);
        this.send(msgId, this.tempBytes);
        //清除掉数据，方便下次读写
        this.tempBytes.clear();
    };
    //发送二进制数据
    SocketConnect.prototype.sendByte = function (msgId, bytes) {
        this.tempBytes.writeArrayBuffer(bytes);
        this.send(msgId, this.tempBytes);
        //清除掉数据，方便下次读写
        this.tempBytes.clear();
    };
    //需要发送的数据
    SocketConnect.prototype.send = function (msgId, byte) {
        if (!this.socket.connected) {
            console.log("connected:" + this.socket.connected);
            return;
        }
        //WEBPACK_HEAD_OFFSET
        this.sendBytes.writeFloat64(Math.pow(2, 53) - 4); //2 * 53 - 1
        //WEBPACK_MESSSAGEID_OFFSET
        this.sendBytes.writeInt32(msgId);
        //WEBPACK_LENGTH_OFFSET
        this.sendBytes.writeInt32(byte.length + 16);
        //Massge body
        this.sendBytes.writeArrayBuffer(byte.buffer);
        //这里是把字节数组的数据通过socket发送给服务器
        this.socket.send(this.sendBytes.buffer);
        //清除掉数据，方便下次读写
        this.sendBytes.clear();
    };
    return SocketConnect;
}());
exports.default = SocketConnect;
},{"../Event/NetworkEventDispatcher":2,"./NetPacket":4}],7:[function(require,module,exports){
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
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./script/MainUI":8,"./study/Test_9_TimeLineUI":9}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("../ui/layaMaxUI");
var NetworkManager_1 = require("../Framework/Network/NetworkManager");
var ClientManager_1 = require("../Framework/Network/ClientManager");
var NetworkEventDispatcher_1 = require("../Framework/Event/NetworkEventDispatcher");
//主界面
var MainUI = /** @class */ (function (_super) {
    __extends(MainUI, _super);
    function MainUI() {
        return _super.call(this) || this;
    }
    MainUI.prototype.onEnable = function () {
        console.log("MainUI.onEnable");
        NetworkEventDispatcher_1.default.getInstance().RegisterMessage(211, this.GM_VerifyVersionReturn);
    };
    MainUI.prototype.onDisable = function () {
        console.log("MainUI.onDisable");
        NetworkEventDispatcher_1.default.getInstance().UnRegisterMessage(211, this.GM_VerifyVersionReturn);
    };
    MainUI.prototype.GM_VerifyVersionReturn = function (netPackage) {
        var msg = NetworkManager_1.default.getInstance().deserialize("GM_VerifyVersionReturn", netPackage);
        console.log(msg);
    };
    MainUI.prototype.onAwake = function () {
        console.log("Precision safe." + (Math.pow(2, 53) - 1));
        ClientManager_1.default.getSingleton().CreateClient(0, "ws://192.168.2.126:50000");
        //定时执行一次(间隔时间)
        Laya.timer.once(2000, this, this.testNetwork);
    };
    MainUI.prototype.testNetwork = function () {
        console.log("testNetwork()");
        var msg = {
            version: "1.5.4",
            platform: 9007199254740988,
            istest: 0,
        };
        NetworkManager_1.default.getInstance().loginSendMessage(210, "GM_VerifyVersion", msg);
    };
    return MainUI;
}(layaMaxUI_1.ui.MainSceneUI));
exports.default = MainUI;
},{"../Framework/Event/NetworkEventDispatcher":2,"../Framework/Network/ClientManager":3,"../Framework/Network/NetworkManager":5,"../ui/layaMaxUI":10}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkc6L0xheWEvTGF5YUFpcklERV9iZXRhL3Jlc291cmNlcy9hcHAvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9BcHBNYWluLnRzIiwic3JjL0ZyYW1ld29yay9FdmVudC9OZXR3b3JrRXZlbnREaXNwYXRjaGVyLnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL0NsaWVudE1hbmFnZXIudHMiLCJzcmMvRnJhbWV3b3JrL05ldHdvcmsvTmV0UGFja2V0LnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL05ldHdvcmtNYW5hZ2VyLnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL1NvY2tldENvbm5lY3QudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9zY3JpcHQvTWFpblVJLnRzIiwic3JjL3N0dWR5L1Rlc3RfOV9UaW1lTGluZVVJLnRzIiwic3JjL3VpL2xheWFNYXhVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNSQSxJQUFPLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO0FBa0J6QiwyQ0FBc0M7QUFPdEMsS0FBSztBQUNMO0lBQ0k7UUFDSSxnQkFBZ0I7UUFDaEIsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBVSxDQUFDLEtBQUssRUFBRSxvQkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3BEO2FBQ0k7WUFDRCx1QkFBdUI7WUFDdkIsOERBQThEO1lBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQVUsQ0FBQyxLQUFLLEVBQUUsb0JBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDakU7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1B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LENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQVBBLEFBT0MsQ0FQK0IsTUFBTSxHQU9yQztJQVBZLGFBQVUsYUFPdEIsQ0FBQTtJQUNELEdBQUcsQ0FBQyxlQUFlLEVBQUMsVUFBVSxDQUFDLENBQUM7QUFDcEMsQ0FBQyxFQWxCYSxFQUFFLEdBQUYsVUFBRSxLQUFGLFVBQUUsUUFrQmYiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IEJyb3dzZXIgPSBMYXlhLkJyb3dzZXJcclxuaW1wb3J0IFdlYkdMID0gTGF5YS5XZWJHTFxyXG5pbXBvcnQgU3RhZ2UgPSBMYXlhLlN0YWdlXHJcblxyXG5pbXBvcnQgVGVzdF8xX1RleHQgZnJvbSAnLi9zdHVkeS9UZXN0XzFfVGV4dCc7XHJcbmltcG9ydCBUZXN0XzJfSW5wdXRUZXN0IGZyb20gJy4vc3R1ZHkvVGVzdF8yX0lucHV0VGVzdCc7XHJcbmltcG9ydCBUZXN0XzNfQml0bWFwRm9udCBmcm9tICcuL3N0dWR5L1Rlc3RfM19CaXRtYXBGb250JztcclxuaW1wb3J0IFRlc3RfNF8xX1Nwcml0ZV9EaXNwbGF5SW1hZ2UgZnJvbSAnLi9zdHVkeS9UZXN0XzRfMV9TcHJpdGVfRGlzcGxheUltYWdlJztcclxuaW1wb3J0IFRlc3RfNF8xX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzFfU3ByaXRlX1N3aXRjaFRleHR1cmUnO1xyXG5pbXBvcnQgVGVzdF80XzJfU3ByaXRlX0Rpc3BsYXlJbWFnZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8yX1Nwcml0ZV9EaXNwbGF5SW1hZ2UnO1xyXG5pbXBvcnQgVGVzdF80XzJfU3ByaXRlX1N3aXRjaFRleHR1cmUgZnJvbSAnLi9zdHVkeS9UZXN0XzRfMl9TcHJpdGVfU3dpdGNoVGV4dHVyZSc7XHJcbmltcG9ydCBUZXN0XzRfTWFza0RlbW8gZnJvbSAnLi9zdHVkeS9UZXN0XzRfTWFza0RlbW8nO1xyXG5pbXBvcnQgVGVzdF81XzFfQ29sb3JGaWx0ZXIgZnJvbSAnLi9zdHVkeS9UZXN0XzVfMV9Db2xvckZpbHRlcic7XHJcbmltcG9ydCBUZXN0XzVfMl9HbG93RmlsdGVyIGZyb20gJy4vc3R1ZHkvVGVzdF81XzJfR2xvd0ZpbHRlcic7XHJcbmltcG9ydCBUZXN0XzZfMV9TcHJpdGVfRHJhd1NoYXBlcyBmcm9tICcuL3N0dWR5L1Rlc3RfNl8xX1Nwcml0ZV9EcmF3U2hhcGVzJztcclxuaW1wb3J0IFRlc3RfN19BdGxhc0FuaURlbW8gZnJvbSAnLi9zdHVkeS9UZXN0XzdfQXRsYXNBbmlEZW1vJztcclxuaW1wb3J0IFRlc3RfOF9Ud2VlbkRlbW8gZnJvbSAnLi9zdHVkeS9UZXN0XzhfVHdlZW5EZW1vJztcclxuaW1wb3J0IFRlc3RfOV9UaW1lTGluZSBmcm9tICcuL3N0dWR5L1Rlc3RfOV9UaW1lTGluZSc7XHJcbmltcG9ydCBUZXN0XzlfVGltZUxpbmVVSSBmcm9tICcuL3N0dWR5L1Rlc3RfOV9UaW1lTGluZVVJJztcclxuaW1wb3J0IFRlc3RfMTFfU291bmQgZnJvbSAnLi9zdHVkeS9UZXN0XzExX1NvdW5kJztcclxuaW1wb3J0IEdhbWVDb25maWcgZnJvbSAnLi9HYW1lQ29uZmlnJztcclxuaW1wb3J0IFRlc3RfMF8xX0NoYW5uZWwgZnJvbSAnLi9zdHVkeS9UZXN0XzBfMV9DaGFubmVsJztcclxuaW1wb3J0IFRlc3RfMF8xX1NvY2tldCBmcm9tICcuL3N0dWR5L1Rlc3RfMF8xX1NvY2tldCc7XHJcbmltcG9ydCBUZXN0XzBfTmV0d29ya19Qcm90b2NvbEJ1ZmZlciBmcm9tICcuL3N0dWR5L1Rlc3RfMF9OZXR3b3JrX1Byb3RvY29sQnVmZmVyJztcclxuaW1wb3J0IE5ldHdvcmtNYW5hZ2VyIGZyb20gJy4vRnJhbWV3b3JrL05ldHdvcmsvTmV0d29ya01hbmFnZXInO1xyXG5pbXBvcnQgQ2xpZW50TWFuYWdlciBmcm9tICcuL0ZyYW1ld29yay9OZXR3b3JrL0NsaWVudE1hbmFnZXInO1xyXG5cclxuLy/lkK/liqjnsbtcclxuY2xhc3MgQXBwTWFpbiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvL+agueaNrklEReiuvue9ruWIneWni+WMluW8leaTjlx0XHRcclxuICAgICAgICBpZiAod2luZG93W1wiTGF5YTNEXCJdKSB7XHJcbiAgICAgICAgICAgIExheWEzRC5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOS4jeaUr+aMgVdlYkdM5pe26Ieq5Yqo5YiH5o2i6IezQ2FudmFzXHJcbiAgICAgICAgICAgIC8vTGF5YS5pbml0KEJyb3dzZXIuY2xpZW50V2lkdGgsIEJyb3dzZXIuY2xpZW50SGVpZ2h0LCBXZWJHTCk7XHJcbiAgICAgICAgICAgIExheWEuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCwgTGF5YVtcIldlYkdMXCJdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTGF5YVtcIlBoeXNpY3NcIl0gJiYgTGF5YVtcIlBoeXNpY3NcIl0uZW5hYmxlKCk7XHJcbiAgICAgICAgTGF5YVtcIkRlYnVnUGFuZWxcIl0gJiYgTGF5YVtcIkRlYnVnUGFuZWxcIl0uZW5hYmxlKCk7XHJcblxyXG5cclxuICAgICAgICAvL+aJk+W8gOiwg+ivlemdouadv++8iOmAmui/h0lEReiuvue9ruiwg+ivleaooeW8j++8jOaIluiAhXVybOWcsOWdgOWinuWKoGRlYnVnPXRydWXlj4LmlbDvvIzlnYflj6/miZPlvIDosIPor5XpnaLmnb/vvIlcclxuICAgICAgICBpZiAoR2FtZUNvbmZpZy5kZWJ1ZyB8fCBMYXlhLlV0aWxzLmdldFF1ZXJ5U3RyaW5nKFwiZGVidWdcIikgPT0gXCJ0cnVlXCIpIExheWEuZW5hYmxlRGVidWdQYW5lbCgpO1xyXG4gICAgICAgIGlmIChHYW1lQ29uZmlnLnBoeXNpY3NEZWJ1ZyAmJiBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXSkgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0uZW5hYmxlKCk7XHJcbiAgICAgICAgaWYgKEdhbWVDb25maWcuc3RhdCkgTGF5YS5TdGF0LnNob3coKTtcclxuXHJcbiAgICAgICAgLy/ooajnpLrmmK/lkKbmjZXojrflhajlsYDplJnor6/lubblvLnlh7rmj5DnpLrjgIJcclxuICAgICAgICBMYXlhLmFsZXJ0R2xvYmFsRXJyb3IgPSB0cnVlO1xyXG5cclxuICAgICAgICAvL+a/gOa0u+i1hOa6kOeJiOacrOaOp+WItu+8jHZlcnNpb24uanNvbueUsUlEReWPkeW4g+WKn+iDveiHquWKqOeUn+aIkO+8jOWmguaenOayoeacieS5n+S4jeW9seWTjeWQjue7rea1geeoi1xyXG4gICAgICAgIExheWEuUmVzb3VyY2VWZXJzaW9uLmVuYWJsZShcInZlcnNpb24uanNvblwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25WZXJzaW9uTG9hZGVkKSwgTGF5YS5SZXNvdXJjZVZlcnNpb24uRklMRU5BTUVfVkVSU0lPTik7XHJcblxyXG5cclxuICAgICAgICBMYXlhLnN0YWdlLmFsaWduViA9IFN0YWdlLkFMSUdOX01JRERMRTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFsaWduSCA9IFN0YWdlLkFMSUdOX0NFTlRFUjtcclxuICAgICAgICBMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IEdhbWVDb25maWcuc2NhbGVNb2RlOy8vU3RhZ2UuU0NBTEVfRlVMTDsvL1NDQUxFX0ZJWEVEX0hFSUdIVFxyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IEdhbWVDb25maWcuc2NyZWVuTW9kZTsvL1N0YWdlLlNDUkVFTl9IT1JJWk9OVEFMOy8vU0NSRUVOX1ZFUlRJQ0FMXHJcbiAgICAgICAgTGF5YS5zdGFnZS5iZ0NvbG9yID0gXCIjN2Y3ZjdmXCI7XHJcblxyXG4gICAgICAgIC8v5YW85a655b6u5L+h5LiN5pSv5oyB5Yqg6L29c2NlbmXlkI7nvIDlnLrmma9cclxuICAgICAgICBMYXlhLlVSTC5leHBvcnRTY2VuZVRvSnNvbiA9IEdhbWVDb25maWcuZXhwb3J0U2NlbmVUb0pzb247XHJcblxyXG4gICAgICAgIC8v5aaC5p6c6YCa6L+H6K6+5aSH6Z2Z6Z+z6ZSu6K6p6Z+z6aKR6Ieq5Yqo6Lef6ZqP6K6+5aSH6Z2Z6Z+z44CC6ZyA6KaB5bCGdXNlQXVkaW9NdXNpY+iuvue9ruS4umZhbHNl44CCXHJcbiAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIudXNlQXVkaW9NdXNpYyA9IGZhbHNlO1xyXG4gICAgICAgIExheWEuU291bmRNYW5hZ2VyLmF1dG9TdG9wTXVzaWMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy/mtojpmaTnn6Lph4/nu5jliLbnmoTplK/pvb/vvIzkvYbkvJrlop7liqDmgKfog73mtojogJdcclxuICAgICAgICAvL0NvbmZpZy5pc0FudGlhbGlhcz10cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVmVyc2lvbkxvYWRlZCgpOiB2b2lkIHtcclxuICAgICAgICAvL+a/gOa0u+Wkp+Wwj+WbvuaYoOWwhO+8jOWKoOi9veWwj+WbvueahOaXtuWAme+8jOWmguaenOWPkeeOsOWwj+WbvuWcqOWkp+WbvuWQiOmbhumHjOmdou+8jOWImeS8mOWFiOWKoOi9veWkp+WbvuWQiOmbhu+8jOiAjOS4jeaYr+Wwj+WbvlxyXG4gICAgICAgIExheWEuQXRsYXNJbmZvTWFuYWdlci5lbmFibGUoXCJmaWxlY29uZmlnLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uQ29uZmlnTG9hZGVkKSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Db25maWdMb2FkZWQoKTogdm9pZCB7XHJcbiAgICAgICAgLy/liqDovb1JREXmjIflrprnmoTlnLrmma9cclxuICAgICAgICBHYW1lQ29uZmlnLnN0YXJ0U2NlbmUgJiYgTGF5YS5TY2VuZS5vcGVuKEdhbWVDb25maWcuc3RhcnRTY2VuZSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0dXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldHVwKCk6IHZvaWQge1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMV9UZXh0KCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8yX0lucHV0VGVzdCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfM19CaXRtYXBGb250KCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8xX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80XzJfU3ByaXRlX0Rpc3BsYXlJbWFnZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80X01hc2tEZW1vKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF81XzFfQ29sb3JGaWx0ZXIoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzVfMl9HbG93RmlsdGVyKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzdfQXRsYXNBbmlEZW1vKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF84X1R3ZWVuRGVtbygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfOV9UaW1lTGluZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfOV9UaW1lTGluZVVJKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8xMV9Tb3VuZCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMF8xX1NvY2tldCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMF9OZXR3b3JrX1Byb3RvY29sQnVmZmVyKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBBcHBNYWluKCk7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0d29ya0V2ZW50RGlzcGF0Y2hlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogTmV0d29ya0V2ZW50RGlzcGF0Y2hlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTmV0d29ya0V2ZW50RGlzcGF0Y2hlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2UgfHwgKHRoaXMuaW5zdGFuY2UgPSBuZXcgdGhpcygpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VIYW5kbGVyczogeyBbaW5kZXg6IG51bWJlcl06IEZ1bmN0aW9uW107IH0gPSB7fVxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgUmVnaXN0ZXJNZXNzYWdlKG1lc3NhZ2VJRDogbnVtYmVyLCBmdW46IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGZ1bnM6IEFycmF5PEZ1bmN0aW9uPiA9IHRoaXMubWVzc2FnZUhhbmRsZXJzW21lc3NhZ2VJRF07XHJcbiAgICAgICAgaWYgKCFmdW5zKSB7XHJcbiAgICAgICAgICAgIGZ1bnMgPSBuZXcgQXJyYXk8RnVuY3Rpb24+KCk7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUhhbmRsZXJzW21lc3NhZ2VJRF0gPSBmdW5zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5zLnB1c2goZnVuKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBVblJlZ2lzdGVyTWVzc2FnZShtZXNzYWdlSUQ6IG51bWJlciwgZnVuOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHZhciBmdW5zOiBBcnJheTxGdW5jdGlvbj4gPSB0aGlzLm1lc3NhZ2VIYW5kbGVyc1ttZXNzYWdlSURdO1xyXG4gICAgICAgIGlmIChmdW5zKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleDogbnVtYmVyID0gZnVucy5pbmRleE9mKGZ1bik7XHJcbiAgICAgICAgICAgIGZ1bnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgRGlzcGF0Y2gobWVzc2FnZUlEOiBudW1iZXIsIG5ldFBhY2thZ2U6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHZhciBmdW5zOiBBcnJheTxGdW5jdGlvbj4gPSB0aGlzLm1lc3NhZ2VIYW5kbGVyc1ttZXNzYWdlSURdO1xyXG4gICAgICAgIGlmIChmdW5zKSB7XHJcbiAgICAgICAgICAgIGZ1bnMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2FsbChlbGVtZW50LCBuZXRQYWNrYWdlKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgQ2xlYXJBbGwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlSGFuZGxlcnMgPSB7fVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFNvY2tldENvbm5lY3QgZnJvbSBcIi4vU29ja2V0Q29ubmVjdFwiO1xyXG5cclxuLy9pbXBvcnQgKiBhcyBDb2xsZWN0aW9ucyBmcm9tICd0eXBlc2NyaXB0LWNvbGxlY3Rpb25zJzsgLy9pbXBvcnQgQ29sbGVjdGlvbnMgPSByZXF1aXJlKCd0eXBlc2NyaXB0LWNvbGxlY3Rpb25zJyk7XHJcblxyXG5cclxuZW51bSBDbGllbnRJRCB7XHJcbiAgICBsb2dpbiA9IDAsXHJcbiAgICBsb2dpYyxcclxuICAgIHNjZW5lLFxyXG4gICAgcmVjb3JkQ2hhdCxcclxufVxyXG5cclxuXHJcbmNsYXNzIEdhbWVDbGllbnQge1xyXG4gICAgcHJpdmF0ZSBjbGllbnRJZDogQ2xpZW50SUQ7XHJcbiAgICBwcml2YXRlIHNvY2tldENvbm5lY3Q6IFNvY2tldENvbm5lY3Q7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IENsaWVudElEKSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnRJZCA9IGlkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25uZWN0KGhvc3Q6IHN0cmluZywgcG9ydDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0ID0gbmV3IFNvY2tldENvbm5lY3QoXCIgY2xpZW50SWQ6XCIgKyB0aGlzLmNsaWVudElkKTtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QuY29ubmVjdChob3N0LCBwb3J0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29ubmVjdEJ5VXJsKHVybDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0ID0gbmV3IFNvY2tldENvbm5lY3QoXCIgY2xpZW50SWQ6XCIgKyB0aGlzLmNsaWVudElkKTtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QuY29ubmVjdEJ5VXJsKHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlQ29ubmVjdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QucmVDb25uZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc0Nvbm5lY3QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LmRpc0Nvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNDb25uZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ja2V0Q29ubmVjdC5jb25uZWN0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZEVtcHR5KG1zZ0lkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3Quc2VuZEVtcHR5KG1zZ0lkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZFN0cmluZyhtc2dJZDogbnVtYmVyLCBjb250ZW50OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3Quc2VuZFN0cmluZyhtc2dJZCwgY29udGVudCBhcyBzdHJpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kQnl0ZShtc2dJZDogbnVtYmVyLCBjb250ZW50OmFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5zZW5kQnl0ZShtc2dJZCwgY29udGVudCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGllbnRNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgZ2FtZUNsaWVudERpYzogeyBbaW5kZXg6IG51bWJlcl06IEdhbWVDbGllbnQ7IH0gPSB7fTtcclxuICAgIHByaXZhdGUgc3RhdGljIGNsaWVudE1hbmFnZXI6IENsaWVudE1hbmFnZXIgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0U2luZ2xldG9uKCk6IENsaWVudE1hbmFnZXIge1xyXG4gICAgICAgIGlmICghdGhpcy5jbGllbnRNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50TWFuYWdlciA9IG5ldyBDbGllbnRNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudE1hbmFnZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvL3RoaXMuZ2FtZUNsaWVudERpY1tDbGllbnRJRC5sb2dpbl0gPSB0aGlzLkNyZWF0ZUNsaWVudChDbGllbnRJRC5sb2dpbiwgXCJ3czovLzE5Mi4xNjguMi4xMjY6NTAwMDBcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENyZWF0ZUNsaWVudChjbGllbnRJRDogbnVtYmVyLCB1cmw6IHN0cmluZyk6IEdhbWVDbGllbnQge1xyXG4gICAgICAgIHZhciBjbGllbnQ6IEdhbWVDbGllbnQgPSBuZXcgR2FtZUNsaWVudChjbGllbnRJRCk7XHJcbiAgICAgICAgY2xpZW50LmNvbm5lY3RCeVVybCh1cmwpO1xyXG4gICAgICAgIHRoaXMuZ2FtZUNsaWVudERpY1tDbGllbnRJRC5sb2dpbl0gPSBjbGllbnQ7XHJcbiAgICAgICAgcmV0dXJuIGNsaWVudDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIEdldENsaWVudChjbGllbnRJRDogQ2xpZW50SUQpOiBHYW1lQ2xpZW50IHtcclxuICAgICAgICBpZiAodGhpcy5nYW1lQ2xpZW50RGljW2NsaWVudElEXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdhbWVDbGllbnREaWNbY2xpZW50SURdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naW5TZW5kTWVzc2FnZShtc2dJZDogbnVtYmVyLCBjb250ZW50OiBMYXlhLkJ5dGUpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2xpZW50OiBHYW1lQ2xpZW50ID0gdGhpcy5HZXRDbGllbnQoQ2xpZW50SUQubG9naW4pXHJcbiAgICAgICAgaWYgKGNsaWVudCkge1xyXG4gICAgICAgICAgICBjbGllbnQuc2VuZEJ5dGUobXNnSWQsIGNvbnRlbnQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dpY1NlbmRNZXNzYWdlKG1zZ0lkOiBudW1iZXIsIGNvbnRlbnQ6IExheWEuQnl0ZSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGllbnQ6IEdhbWVDbGllbnQgPSB0aGlzLkdldENsaWVudChDbGllbnRJRC5sb2dpYylcclxuICAgICAgICBpZiAoY2xpZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5zZW5kQnl0ZShtc2dJZCwgY29udGVudClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNjZW5lU2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgY29udGVudDogTGF5YS5CeXRlKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNsaWVudDogR2FtZUNsaWVudCA9IHRoaXMuR2V0Q2xpZW50KENsaWVudElELnNjZW5lKVxyXG4gICAgICAgIGlmIChjbGllbnQpIHtcclxuICAgICAgICAgICAgY2xpZW50LnNlbmRCeXRlKG1zZ0lkLCBjb250ZW50KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJBbGxHYW1lQ2xpZW50KCkge1xyXG4gICAgICAgIGxldCBkaWMgPSB0aGlzLmdhbWVDbGllbnREaWNcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkaWMpIHtcclxuICAgICAgICAgICAgaWYgKGRpYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZGljW2tleV07XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmRpc0Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdhbWVDbGllbnREaWMgPSB7fVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kTWVzc2FnZUVtcHR5KG1zZ0lkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAobXNnSWQgPiBHYW1lTWVzc2FnZS5HTV9BQ0NPVU5UX1NFUlZFUl9NRVNTQUdFX1NUQVJUICYmIG1zZ0lkIDwgR2FtZU1lc3NhZ2UuR01fQUNDT1VOVF9TRVJWRVJfTUVTU0FHRV9FTkQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dpblNlbmRNZXNzYWdlKG1zZ0lkLCBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9naWNTZW5kTWVzc2FnZShtc2dJZCwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJ5dGUgPSBMYXlhLkJ5dGVcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0UGFja2V0IHtcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX0hFQURfT0ZGU0VUOiBudW1iZXIgPSAwO1x0Ly8g6Ieq5a6a5LmJ5pWw5o2uIOS4gOiIrOaYr3JvbGVpZCAobG9uZ+exu+WeiylcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX01FU1NTQUdFSURfT0ZGU0VUOiBudW1iZXIgPSA4O1x0Ly8g5raI5oGvaWRcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX0xFTkdUSF9PRkZTRVQ6IG51bWJlciA9IDEyO1x0Ly8g5raI5oGv6ZW/5bqmXHJcbiAgICBwdWJsaWMgV0VCUEFDS19IRUFEX1NJWkU6IG51bWJlciA9IDE2O1x0Ly8g5raI5oGv5pWw5o2u5byA5aeL5L2N572uXHJcblxyXG4gICAgcHVibGljIHJvbGVpZDogbnVtYmVyO1xyXG4gICAgcHVibGljIG1zZ2lkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgYm9keTogVWludDhBcnJheTtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRCeXRlczogQnl0ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnJlYWRCeXRlcyA9IG5ldyBCeXRlKCk7XHJcbiAgICAgICAgdGhpcy5yZWFkQnl0ZXMuZW5kaWFuID0gTGF5YS5CeXRlLkxJVFRMRV9FTkRJQU47Ly/ov5nph4zmiJHku6zph4fnlKjlsI/nq69cclxuICAgIH1cclxuXHJcbiAgICAvL+aOpeaUtuacjeWKoeWZqOS/oeaBr1xyXG4gICAgcHVibGljIHJlY2VpdmVNc2coYnl0ZXM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVhZEJ5dGVzLndyaXRlQXJyYXlCdWZmZXIoYnl0ZXMpO1xyXG4gICAgICAgIHRoaXMucmVhZEJ5dGVzLnBvcyA9IDA7Ly/orr7nva7lgY/np7vmjIfpkohcclxuXHJcbiAgICAgICAgLy/mjInnhafmnI3liqHlmajkvKDpgJLov4fmnaXnmoTmlbDmja7vvIzmjInnhafpobrluo/or7vlj5ZcclxuICAgICAgICB0aGlzLnJvbGVpZCA9IHRoaXMucmVhZEJ5dGVzLmdldEZsb2F0NjQoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInJvbGVpZO+8mlwiICsgdGhpcy5yb2xlaWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubXNnaWQgPSB0aGlzLnJlYWRCeXRlcy5nZXRJbnQzMigpO1xyXG4gICAgICAgIHZhciBtc2dMZW5ndGggPSB0aGlzLnJlYWRCeXRlcy5nZXRJbnQzMigpO1xyXG4gICAgICAgIHZhciBhYiA9IHRoaXMucmVhZEJ5dGVzLnJlYWRBcnJheUJ1ZmZlcihtc2dMZW5ndGggLSB0aGlzLldFQlBBQ0tfSEVBRF9TSVpFKTtcclxuICAgICAgICB0aGlzLmJvZHkgPSBuZXcgVWludDhBcnJheShhYik7XHJcblxyXG4gICAgICAgIC8vaWYgKG1zZ0xlbmd0aCAhPSB0aGlzLnJlYWRCeXRlcy5sZW5ndGgpIHtcclxuICAgICAgICAvLyAgICBjb25zb2xlLmVycm9yKFwi5raI5oGv6ZW/5LiN5LiA5qC3XCIpO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICB0aGlzLnJlYWRCeXRlcy5jbGVhcigpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IENsaWVudE1hbmFnZXIgZnJvbSBcIi4vQ2xpZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgTmV0UGFja2V0IGZyb20gXCIuL05ldFBhY2tldFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0d29ya01hbmFnZXIge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBOZXR3b3JrTWFuYWdlcjtcclxuICAgIHByaXZhdGUgcHJvdG9Sb290OiBhbnkgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTmV0d29ya01hbmFnZXIge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IE5ldHdvcmtNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnByb3RvUm9vdCA9IExheWEuQnJvd3Nlci53aW5kb3dbXCJQQk1lc3NhZ2VcIl07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDluo/liJfljJYgcHJvdG9jb2wtYnVmZmVyXHJcbiAgICAgKiBAcGFyYW0gbWFzc2FnZU5hbWUgXHJcbiAgICAgKiBAcGFyYW0gbWFzc2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VyaWFsaXplKG1hc3NhZ2VOYW1lOiBzdHJpbmcsIG1hc3NhZ2U6IGFueSk6IGFueSB7XHJcbiAgICAgICAgLy8gRW5jb2RlIGEgbWVzc2FnZSB0byBhbiBVaW50OEFycmF5IChicm93c2VyKSBvciBCdWZmZXIgKG5vZGUpXHJcbiAgICAgICAgdmFyIGJ1ZmZlcjogYW55ID0gdGhpcy5wcm90b1Jvb3RbbWFzc2FnZU5hbWVdLmVuY29kZShtYXNzYWdlKS5maW5pc2goKTtcclxuICAgICAgICByZXR1cm4gYnVmZmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+N5bqP5YiX5YyWIHByb3RvY29sLWJ1ZmZlclxyXG4gICAgICogQHBhcmFtIG1hc3NhZ2VOYW1lIFxyXG4gICAgICogQHBhcmFtIG5ldFBhY2thZ2UgTmV0UGFja2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVzZXJpYWxpemUobWFzc2FnZU5hbWU6IHN0cmluZywgbmV0UGFja2FnZTogTmV0UGFja2V0KSB7XHJcbiAgICAgICAgLy8gRGVjb2RlIGFuIFVpbnQ4QXJyYXkgKGJyb3dzZXIpIG9yIEJ1ZmZlciAobm9kZSkgdG8gYSBtZXNzYWdlXHJcbiAgICAgICAgdmFyIG1lc3NhZ2U6IGFueSA9IHRoaXMucHJvdG9Sb290W21hc3NhZ2VOYW1lXS5kZWNvZGUobmV0UGFja2FnZS5ib2R5KTtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkemAgea2iOaBr1xyXG4gICAgICogQHBhcmFtIG1hc3NhZ2VJRCBJRFxyXG4gICAgICogQHBhcmFtIG1hc3NhZ2VOYW1lIEdNX1ZlcmlmeVZlcnNpb25cclxuICAgICAqIEBwYXJhbSBtYXNzYWdlXHJcbiAgICAgKiB2YXIgbXNnID0geyB2ZXJzaW9uOiBcIjFcIiwgcGxhdGZvcm06MSwgaXN0ZXN0OjMgfSDmiJYgdmFyIG1zZyA9IG5ldyBQQk1hc3NhZ2UuR01fVmVyaWZ5VmVyc2lvbigpOyBtc2cudmVyc2lvbiA9IFwiMVwiOyBtc2cucGxhdGZvcm0gPSAxOyBtc2cuaXN0ZXN0ID0gMTtcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvZ2luU2VuZE1lc3NhZ2UobWFzc2FnZUlEOiBudW1iZXIsIG1hc3NhZ2VOYW1lOiBhbnksIG1hc3NhZ2U6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHZhciBidWZmZXI6IGFueSA9IHRoaXMuc2VyaWFsaXplKG1hc3NhZ2VOYW1lLCBtYXNzYWdlKTtcclxuICAgICAgICBDbGllbnRNYW5hZ2VyLmdldFNpbmdsZXRvbigpLmxvZ2luU2VuZE1lc3NhZ2UobWFzc2FnZUlELCBidWZmZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dpY1NlbmRNZXNzYWdlKG1hc3NhZ2VJRDogbnVtYmVyLCBtYXNzYWdlTmFtZTogYW55LCBtYXNzYWdlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB2YXIgYnVmZmVyOiBhbnkgPSB0aGlzLnNlcmlhbGl6ZShtYXNzYWdlTmFtZSwgbWFzc2FnZSk7XHJcbiAgICAgICAgQ2xpZW50TWFuYWdlci5nZXRTaW5nbGV0b24oKS5sb2dpY1NlbmRNZXNzYWdlKG1hc3NhZ2VJRCwgYnVmZmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2NlbmVTZW5kTWVzc2FnZShtYXNzYWdlSUQ6IG51bWJlciwgbWFzc2FnZU5hbWU6IGFueSwgbWFzc2FnZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdmFyIGJ1ZmZlcjogYW55ID0gdGhpcy5zZXJpYWxpemUobWFzc2FnZU5hbWUsIG1hc3NhZ2UpO1xyXG4gICAgICAgIENsaWVudE1hbmFnZXIuZ2V0U2luZ2xldG9uKCkuc2NlbmVTZW5kTWVzc2FnZShtYXNzYWdlSUQsIGJ1ZmZlcik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgTmV0d29ya0V2ZW50TWFuYWdlciBmcm9tIFwiLi4vRXZlbnQvTmV0d29ya0V2ZW50RGlzcGF0Y2hlclwiO1xyXG5pbXBvcnQgTmV0UGFja2V0IGZyb20gXCIuL05ldFBhY2tldFwiO1xyXG5pbXBvcnQgTmV0d29ya01hbmFnZXIgZnJvbSBcIi4vTmV0d29ya01hbmFnZXJcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2NrZXRDb25uZWN0IHtcclxuXHJcbiAgICBwcml2YXRlIFdFQlBBQ0tfSEVBRF9PRkZTRVQ6IG51bWJlciA9IDA7XHQvLyDoh6rlrprkuYnmlbDmja4g5LiA6Iis5pivcm9sZWlkIChsb25n57G75Z6LKVxyXG4gICAgcHJpdmF0ZSBXRUJQQUNLX01FU1NTQUdFSURfT0ZGU0VUOiBudW1iZXIgPSA4O1x0Ly8g5raI5oGvaWRcclxuICAgIHByaXZhdGUgV0VCUEFDS19MRU5HVEhfT0ZGU0VUOiBudW1iZXIgPSAxMjtcdC8vIOa2iOaBr+mVv+W6plxyXG4gICAgcHJpdmF0ZSBXRUJQQUNLX0hFQURfU0laRTogbnVtYmVyID0gMTY7XHQvLyDmtojmga/mlbDmja7lvIDlp4vkvY3nva5cclxuXHJcblxyXG4gICAgcHVibGljIHNvY2tldDogTGF5YS5Tb2NrZXQgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBzZW5kQnl0ZXM6IExheWEuQnl0ZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIHJlYWRCeXRlczogTGF5YS5CeXRlID0gbnVsbDtcclxuICAgIHByaXZhdGUgdGVtcEJ5dGVzOiBMYXlhLkJ5dGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSB1cmw6IHN0cmluZyA9IG51bGw7XHJcbiAgICBwcml2YXRlIHRpcHM6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gICAgLy9wcml2YXRlIHNlbmROZXRQYWNrZXQ6IEFycmF5PE5ldFBhY2tldD4gPSBudWxsO1xyXG4gICAgLy9wcml2YXRlIHJlY2VpdmVOZXRQYWNrZXQ6IEFycmF5PE5ldFBhY2tldD4gPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRpcHM6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudGlwcyA9IHRpcHM7XHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMgPSBuZXcgTGF5YS5CeXRlKCk7XHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMuZW5kaWFuID0gTGF5YS5CeXRlLkxJVFRMRV9FTkRJQU47Ly/ov5nph4zmiJHku6zph4fnlKjlsI/nq69cclxuICAgICAgICB0aGlzLnRlbXBCeXRlcyA9IG5ldyBMYXlhLkJ5dGUoKTtcclxuICAgICAgICB0aGlzLnRlbXBCeXRlcy5lbmRpYW4gPSBMYXlhLkJ5dGUuTElUVExFX0VORElBTjsvL+i/memHjOaIkeS7rOmHh+eUqOWwj+err1xyXG5cclxuICAgICAgICAvL3RoaXMuc2VuZE5ldFBhY2tldCA9IG5ldyBBcnJheTxOZXRQYWNrZXQ+KCk7IC8v5Y+R6YCB55qE572R57uc5YyFXHJcbiAgICAgICAgLy90aGlzLnJlY2VpdmVOZXRQYWNrZXQgPSBuZXcgQXJyYXk8TmV0UGFja2V0PigpOyAvL+aOpeaUtueahOe9kee7nOWMhVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNvbm5lY3QoaG9zdDogc3RyaW5nLCBwb3J0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnVybCA9IGhvc3QuY29uY2F0KHBvcnQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0QnlVcmwodGhpcy51cmwpO1xyXG4gICAgfVxyXG4gICAgLy9cIndzOi8vbG9jYWxob3N0Ojg5ODlcIlxyXG4gICAgcHVibGljIGNvbm5lY3RCeVVybCh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xyXG4gICAgICAgIHRoaXMuc29ja2V0ID0gbmV3IExheWEuU29ja2V0KCk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQuZW5kaWFuID0gTGF5YS5CeXRlLkxJVFRMRV9FTkRJQU47Ly/ov5nph4zmiJHku6zph4fnlKjlsI/nq69cclxuICAgICAgICB0aGlzLnNvY2tldC5jb25uZWN0QnlVcmwodXJsKTtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbihMYXlhLkV2ZW50Lk9QRU4sIHRoaXMsIHRoaXMub3BlbkhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKExheWEuRXZlbnQuTUVTU0FHRSwgdGhpcywgdGhpcy5yZWNlaXZlSGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oTGF5YS5FdmVudC5DTE9TRSwgdGhpcywgdGhpcy5jbG9zZUhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKExheWEuRXZlbnQuRVJST1IsIHRoaXMsIHRoaXMuZXJyb3JIYW5kbGVyKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZUNvbm5lY3QoKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQuY2xlYW5Tb2NrZXQoKTtcclxuICAgICAgICB0aGlzLmNvbm5lY3RCeVVybCh0aGlzLnVybCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGlzQ29ubmVjdCgpIHtcclxuICAgICAgICB0aGlzLnNvY2tldC5jbG9zZSgpO1xyXG4gICAgfVxyXG4gICAgLy/mmK/lkKbov57mjqVcclxuICAgIHB1YmxpYyBjb25uZWN0ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ja2V0LmNvbm5lY3RlZDtcclxuICAgIH1cclxuICAgIC8v5q2j56Gu5bu656uL6L+e5o6lXHJcbiAgICBwcml2YXRlIG9wZW5IYW5kbGVyKGV2ZW50OiBhbnkgPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnVybCArIHRoaXMudGlwcyArIFwiICDmraPnoa7lu7rnq4vov57mjqVcIik7XHJcbiAgICB9XHJcbiAgICAvL+aOpeaUtuWIsOaVsOaNrlxyXG4gICAgcHJpdmF0ZSByZWNlaXZlSGFuZGxlcihtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJNZXNzYWdlIGZyb20gc2VydmVyOiAgXCIgKyBuZXcgTGF5YS5CeXRlKG1zZykucmVhZFVURkJ5dGVzKCkpO1xyXG4gICAgICAgIHZhciBuZXRQYWNrZXQ6IE5ldFBhY2tldCA9IG5ldyBOZXRQYWNrZXQoKTtcclxuICAgICAgICBuZXRQYWNrZXQucmVjZWl2ZU1zZyhtc2cpO1xyXG4gICAgICAgIHRoaXMuc29ja2V0LmlucHV0LmNsZWFyKCk7XHJcbiAgICAgICAgTmV0d29ya0V2ZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLkRpc3BhdGNoKG5ldFBhY2tldC5tc2dpZCwgbmV0UGFja2V0KTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WFs+mXrei/nuaOpeS6i+S7tlxyXG4gICAgcHJpdmF0ZSBjbG9zZUhhbmRsZXIoZXZlbnQ6IGFueSA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVybCArIHRoaXMudGlwcyArIFwiIOWFs+mXrei/nuaOpeS6i+S7tlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+i/nuaOpeWHuumUmVxyXG4gICAgcHJpdmF0ZSBlcnJvckhhbmRsZXIoZTogYW55ID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXJsICsgdGhpcy50aXBzICsgXCIg6L+e5o6l5Ye66ZSZXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Y+R6YCB56m65raI5oGvXHJcbiAgICBwdWJsaWMgc2VuZEVtcHR5KG1zZ0lkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICAvLyDlhpnlhaXkuIDkuKrmlbDlrZcwXHJcbiAgICAgICAgdGhpcy50ZW1wQnl0ZXMud3JpdGVGbG9hdDMyKDApO1xyXG4gICAgICAgIHRoaXMuc2VuZChtc2dJZCwgdGhpcy50ZW1wQnl0ZXMpO1xyXG4gICAgICAgIHRoaXMudGVtcEJ5dGVzLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lj5HpgIHlrZfnrKbkuLLmoLzlvI9cclxuICAgIHB1YmxpYyBzZW5kU3RyaW5nKG1zZ0lkOiBudW1iZXIsIGNvbnRlbnQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGVtcEJ5dGVzLndyaXRlVVRGU3RyaW5nKGNvbnRlbnQpO1xyXG4gICAgICAgIHRoaXMuc2VuZChtc2dJZCwgdGhpcy50ZW1wQnl0ZXMpO1xyXG4gICAgICAgIC8v5riF6Zmk5o6J5pWw5o2u77yM5pa55L6/5LiL5qyh6K+75YaZXHJcbiAgICAgICAgdGhpcy50ZW1wQnl0ZXMuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WPkemAgeS6jOi/m+WItuaVsOaNrlxyXG4gICAgcHVibGljIHNlbmRCeXRlKG1zZ0lkOiBudW1iZXIsIGJ5dGVzOiBVaW50OEFycmF5KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50ZW1wQnl0ZXMud3JpdGVBcnJheUJ1ZmZlcihieXRlcyk7XHJcbiAgICAgICAgdGhpcy5zZW5kKG1zZ0lkLCB0aGlzLnRlbXBCeXRlcyk7XHJcbiAgICAgICAgLy/muIXpmaTmjonmlbDmja7vvIzmlrnkvr/kuIvmrKHor7vlhplcclxuICAgICAgICB0aGlzLnRlbXBCeXRlcy5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6ZyA6KaB5Y+R6YCB55qE5pWw5o2uXHJcbiAgICBwcml2YXRlIHNlbmQobXNnSWQ6IG51bWJlciwgYnl0ZTogTGF5YS5CeXRlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNvY2tldC5jb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb25uZWN0ZWQ6XCIgKyB0aGlzLnNvY2tldC5jb25uZWN0ZWQpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vV0VCUEFDS19IRUFEX09GRlNFVFxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLndyaXRlRmxvYXQ2NChNYXRoLnBvdygyLCA1MykgLSA0KTsgLy8yICogNTMgLSAxXHJcbiAgICAgICAgLy9XRUJQQUNLX01FU1NTQUdFSURfT0ZGU0VUXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMud3JpdGVJbnQzMihtc2dJZCk7XHJcbiAgICAgICAgLy9XRUJQQUNLX0xFTkdUSF9PRkZTRVRcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy53cml0ZUludDMyKGJ5dGUubGVuZ3RoICsgMTYpO1xyXG4gICAgICAgIC8vTWFzc2dlIGJvZHlcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy53cml0ZUFycmF5QnVmZmVyKGJ5dGUuYnVmZmVyKTtcclxuICAgICAgICAvL+i/memHjOaYr+aKiuWtl+iKguaVsOe7hOeahOaVsOaNrumAmui/h3NvY2tldOWPkemAgee7meacjeWKoeWZqFxyXG4gICAgICAgIHRoaXMuc29ja2V0LnNlbmQodGhpcy5zZW5kQnl0ZXMuYnVmZmVyKTtcclxuICAgICAgICAvL+a4hemZpOaOieaVsOaNru+8jOaWueS+v+S4i+asoeivu+WGmVxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLmNsZWFyKCk7XHJcbiAgICB9XHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cclxuaW1wb3J0IE1haW5VSSBmcm9tIFwiLi9zY3JpcHQvTWFpblVJXCJcbmltcG9ydCBUZXN0XzlfVGltZUxpbmVVSSBmcm9tIFwiLi9zdHVkeS9UZXN0XzlfVGltZUxpbmVVSVwiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj02NDA7XHJcbiAgICBzdGF0aWMgaGVpZ2h0Om51bWJlcj0xMTM2O1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJmaXhlZGhlaWdodFwiO1xyXG4gICAgc3RhdGljIHNjcmVlbk1vZGU6c3RyaW5nPVwiaG9yaXpvbnRhbFwiO1xyXG4gICAgc3RhdGljIGFsaWduVjpzdHJpbmc9XCJ0b3BcIjtcclxuICAgIHN0YXRpYyBhbGlnbkg6c3RyaW5nPVwibGVmdFwiO1xyXG4gICAgc3RhdGljIHN0YXJ0U2NlbmU6YW55PVwiTWFpblNjZW5lLnNjZW5lXCI7XHJcbiAgICBzdGF0aWMgc2NlbmVSb290OnN0cmluZz1cIlwiO1xyXG4gICAgc3RhdGljIGRlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgc3RhdDpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHBoeXNpY3NEZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIGV4cG9ydFNjZW5lVG9Kc29uOmJvb2xlYW49dHJ1ZTtcclxuICAgIGNvbnN0cnVjdG9yKCl7fVxyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICB2YXIgcmVnOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuICAgICAgICByZWcoXCJzY3JpcHQvTWFpblVJLnRzXCIsTWFpblVJKTtcbiAgICAgICAgcmVnKFwic3R1ZHkvVGVzdF85X1RpbWVMaW5lVUkudHNcIixUZXN0XzlfVGltZUxpbmVVSSk7XHJcbiAgICB9XHJcbn1cclxuR2FtZUNvbmZpZy5pbml0KCk7IiwiaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi4vdWkvbGF5YU1heFVJXCI7XHJcbmltcG9ydCBOZXR3b3JrTWFuYWdlciBmcm9tIFwiLi4vRnJhbWV3b3JrL05ldHdvcmsvTmV0d29ya01hbmFnZXJcIjtcclxuaW1wb3J0IENsaWVudE1hbmFnZXIgZnJvbSBcIi4uL0ZyYW1ld29yay9OZXR3b3JrL0NsaWVudE1hbmFnZXJcIjtcclxuaW1wb3J0IE5ldHdvcmtFdmVudERpc3BhdGNoZXIgZnJvbSBcIi4uL0ZyYW1ld29yay9FdmVudC9OZXR3b3JrRXZlbnREaXNwYXRjaGVyXCI7XHJcbmltcG9ydCBOZXRQYWNrZXQgZnJvbSBcIi4uL0ZyYW1ld29yay9OZXR3b3JrL05ldFBhY2tldFwiO1xyXG5cclxuXHJcbi8v5Li755WM6Z2iXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5VSSBleHRlbmRzIHVpLk1haW5TY2VuZVVJIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoKTsgfVxyXG5cclxuICAgIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFpblVJLm9uRW5hYmxlXCIpXHJcblxyXG4gICAgICAgIE5ldHdvcmtFdmVudERpc3BhdGNoZXIuZ2V0SW5zdGFuY2UoKS5SZWdpc3Rlck1lc3NhZ2UoMjExLCB0aGlzLkdNX1ZlcmlmeVZlcnNpb25SZXR1cm4pXHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFpblVJLm9uRGlzYWJsZVwiKVxyXG4gICAgICAgIFxyXG4gICAgICAgIE5ldHdvcmtFdmVudERpc3BhdGNoZXIuZ2V0SW5zdGFuY2UoKS5VblJlZ2lzdGVyTWVzc2FnZSgyMTEsIHRoaXMuR01fVmVyaWZ5VmVyc2lvblJldHVybilcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBHTV9WZXJpZnlWZXJzaW9uUmV0dXJuKG5ldFBhY2thZ2U6TmV0UGFja2V0KTp2b2lke1xyXG4gICAgICAgIHZhciBtc2cgPSBOZXR3b3JrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc2VyaWFsaXplKFwiR01fVmVyaWZ5VmVyc2lvblJldHVyblwiLCBuZXRQYWNrYWdlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkF3YWtlKCk6IHZvaWQge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlByZWNpc2lvbiBzYWZlLlwiICsgKE1hdGgucG93KDIsIDUzKSAtIDEpKTtcclxuICAgICAgICBcclxuICAgICAgICBDbGllbnRNYW5hZ2VyLmdldFNpbmdsZXRvbigpLkNyZWF0ZUNsaWVudCgwLCBcIndzOi8vMTkyLjE2OC4yLjEyNjo1MDAwMFwiKTtcclxuXHJcbiAgICAgICAgLy/lrprml7bmiafooYzkuIDmrKEo6Ze06ZqU5pe26Ze0KVxyXG4gICAgICAgIExheWEudGltZXIub25jZSgyMDAwLCB0aGlzLCB0aGlzLnRlc3ROZXR3b3JrKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRlc3ROZXR3b3JrKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGVzdE5ldHdvcmsoKVwiKTtcclxuICAgICAgICB2YXIgbXNnID0ge1xyXG4gICAgICAgICAgICB2ZXJzaW9uOiBcIjEuNS40XCIsXHRcdFx0XHQvL+WuouaIt+err+eJiOacrOWPt1xyXG4gICAgICAgICAgICBwbGF0Zm9ybTogOTAwNzE5OTI1NDc0MDk4OCwgICAgICAgICAgICAgLy8v5bmz5Y+wXHJcbiAgICAgICAgICAgIGlzdGVzdDogMCwvLy8gICAgMOOAgeato+W4uO+8jDHjgIHmtYvor5XvvIzkuI3pnIDopoHpqozor4HniYjmnKxcclxuICAgICAgICB9XHJcbiAgICAgICAgTmV0d29ya01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2dpblNlbmRNZXNzYWdlKDIxMCwgXCJHTV9WZXJpZnlWZXJzaW9uXCIsIG1zZyk7XHJcbiAgICB9XHJcbn0iLCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0XzlfVGltZUxpbmVVSVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvL+WKoOi9veWbvumbhuaIkOWKn+WQju+8jOaJp+ihjG9uTG9hZOWbnuiwg+aWueazlVxyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQoXCJyZXMvYXRsYXMvdGVzdC5hdGxhc1wiLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uTG9hZGVkKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgb25Mb2FkZWQoKTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Yqg6L295Zu+6ZuG5oiQ5Yqf5ZCO77yM5omn6KGMb25Mb2Fk5Zue6LCD5pa55rOVXCIpXHJcbiAgICAgICAgLy/liJvlu7rkuIDkuKpVSeWunuS+i1xyXG4gICAgICAgIC8vdmFyIHBsYW46VGltZUxpbmVVSSA9IG5ldyBUaW1lTGluZVVJKClcclxuICAgICAgICAvL+a3u+WKoOWIsOiInuWPsFxyXG4gICAgICAgIC8vTGF5YS5zdGFnZS5hZGRDaGlsZChwbGFuKTtcclxuICAgICAgICAvL+aSreaUvlVJ5Zy65pmv5Lit55qE5Yqo55S7XHJcbiAgICAgICAgLy90aGlzLmJlYXIucGxheSgpO1xyXG4gICAgfVxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xudmFyIFJFRzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XG5leHBvcnQgbW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBNYWluU2NlbmVVSSBleHRlbmRzIFNjZW5lIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiTWFpblNjZW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLk1haW5TY2VuZVVJXCIsTWFpblNjZW5lVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbWVMaW5lVUkgZXh0ZW5kcyBEaWFsb2cge1xyXG5cdFx0cHVibGljIGJlYXI6TGF5YS5BbmltYXRpb247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJUaW1lTGluZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5UaW1lTGluZVVJXCIsVGltZUxpbmVVSSk7XHJcbn1cciJdfQ==
