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
},{"./GameConfig":8}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetEventDispatcher = /** @class */ (function () {
    function NetEventDispatcher() {
        this.messageHandlers = {};
    }
    NetEventDispatcher.getInstance = function () {
        return NetEventDispatcher.instance || (NetEventDispatcher.instance = new NetEventDispatcher());
    };
    NetEventDispatcher.prototype.RegisterMessage = function (messageID, fun) {
        var funs = this.messageHandlers[messageID];
        if (!funs) {
            funs = new Array();
            this.messageHandlers[messageID] = funs;
        }
        funs.push(fun);
    };
    NetEventDispatcher.prototype.UnRegisterMessage = function (messageID, fun) {
        var funs = this.messageHandlers[messageID];
        if (funs) {
            var index = funs.indexOf(fun);
            funs.splice(index, 1);
        }
    };
    NetEventDispatcher.prototype.Dispatch = function (messageID, netPackage) {
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
    GameClient.prototype.sendMessage = function (msgId, msg) {
        this.socketConnect.sendMessage(msgId, msg);
    };
    return GameClient;
}());
var ClientManager = /** @class */ (function () {
    function ClientManager() {
        this.gameClientMap = {};
    }
    ClientManager.getInstance = function () {
        return this.instance || (this.instance = new this());
    };
    ClientManager.prototype.createClient = function (clientID, url) {
        var client = new GameClient(clientID);
        client.connectByUrl(url);
        this.gameClientMap[ClientID.login] = client;
        return client;
    };
    ClientManager.prototype.closeClient = function (clientID) {
        var client = this.getClient(ClientID.login);
        if (client) {
            client.disConnect();
        }
    };
    ClientManager.prototype.reConnect = function (clientID) {
        var client = this.getClient(ClientID.login);
        if (client) {
            client.reConnect();
        }
    };
    ClientManager.prototype.getClient = function (clientID) {
        if (this.gameClientMap[clientID] != null) {
            return this.gameClientMap[clientID];
        }
        return null;
    };
    ClientManager.prototype.loginSendMessage = function (msgId, msg) {
        var client = this.getClient(ClientID.login);
        if (client) {
            client.sendMessage(msgId, msg);
        }
    };
    ClientManager.prototype.logicSendMessage = function (msgId, msg) {
        var client = this.getClient(ClientID.logic);
        if (client) {
            client.sendMessage(msgId, msg);
        }
    };
    ClientManager.prototype.sceneSendMessage = function (msgId, msg) {
        var client = this.getClient(ClientID.scene);
        if (client) {
            client.sendMessage(msgId, msg);
        }
    };
    ClientManager.prototype.sendMessageEmpty = function (msgId) {
        var client = null;
        if (msgId > GameMessage.GM_ACCOUNT_SERVER_MESSAGE_START && msgId < GameMessage.GM_ACCOUNT_SERVER_MESSAGE_END) {
            client = this.getClient(ClientID.login);
        }
        else {
            client = this.getClient(ClientID.logic);
        }
        if (client) {
            client.sendEmpty(msgId);
        }
    };
    ClientManager.prototype.clearAllGameClient = function () {
        var dic = this.gameClientMap;
        for (var key in dic) {
            if (dic.hasOwnProperty(key)) {
                var element = dic[key];
                element.disConnect();
            }
        }
        this.gameClientMap = {};
    };
    ClientManager.instance = null;
    return ClientManager;
}());
exports.default = ClientManager;
},{"./SocketConnect":7}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Byte = Laya.Byte;
var NetPacket = /** @class */ (function () {
    function NetPacket(connect) {
        //private WEBPACK_HEAD_OFFSET: number = 0;	// 自定义数据 一般是roleid (long类型)
        //private WEBPACK_MESSSAGEID_OFFSET: number = 8;	// 消息id
        //private WEBPACK_LENGTH_OFFSET: number = 12;	// 消息长度
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
        var ab = this.readBytes.readArrayBuffer(msgLength - this.WEBPACK_HEAD_SIZE);
        var buffer = new Uint8Array(ab);
        this.message = this.socketConnect.deserialize(this.messageId, buffer);
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
    /**
     * 发送消息
     * @param msgID
     * @param massage
     * var msg = { version: "1", platform:1, istest:3 } 或 var msg = new PBMassage.GM_VerifyVersion(); msg.version = "1"; msg.platform = 1; msg.istest = 1;
     */
    NetworkManager.prototype.loginSendMessage = function (msgID, massage) {
        ClientManager_1.default.getInstance().loginSendMessage(msgID, massage);
    };
    NetworkManager.prototype.logicSendMessage = function (msgID, massage) {
        ClientManager_1.default.getInstance().logicSendMessage(msgID, massage);
    };
    NetworkManager.prototype.sceneSendMessage = function (msgID, massage) {
        ClientManager_1.default.getInstance().sceneSendMessage(msgID, massage);
    };
    return NetworkManager;
}());
exports.default = NetworkManager;
},{"./ClientManager":3}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Protobuf 消息名称匹配
 */
var PBMessageName = /** @class */ (function () {
    function PBMessageName() {
    }
    PBMessageName.getMap = function () {
        if (this.isInit) {
            return this.messageMap;
        }
        this.isInit = true;
        //MessageName
        var map = this.messageMap;
        map[GameMessage.GM_VERIFY_VERSION] = 'GM_VerifyVersion';
        map[GameMessage.GM_VERSION_RETURN] = 'GM_VerifyVersionReturn';
        return map;
    };
    PBMessageName.messageMap = {};
    PBMessageName.isInit = false;
    return PBMessageName;
}());
exports.default = PBMessageName;
},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetEventDispatcher_1 = require("../Event/NetEventDispatcher");
var NetPacket_1 = require("./NetPacket");
var NetworkManager_1 = require("./NetworkManager");
var PBMessageName_1 = require("./PBMessageName");
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
        this.pbMessageName = PBMessageName_1.default.getMap();
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
        //console.log(this.url + this.tips + "  正确建立连接")
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
    //发送消息
    SocketConnect.prototype.sendMessage = function (msgId, msg) {
        var buffer = this.serialize(msgId, msg);
        this.tempBytes.writeArrayBuffer(buffer);
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
    };
    //接收到数据
    SocketConnect.prototype.receiveHandler = function (msg) {
        //console.log("Message from server:  " + new Laya.Byte(msg).readUTFBytes())
        var netPacket = new NetPacket_1.default(this);
        netPacket.receiveMsg(msg);
        this.socket.input.clear();
        NetEventDispatcher_1.default.getInstance().Dispatch(netPacket.messageId, netPacket);
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
},{"../Event/NetEventDispatcher":2,"./NetPacket":4,"./NetworkManager":5,"./PBMessageName":6}],8:[function(require,module,exports){
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
},{"./script/MainUI":9,"./study/Test_9_TimeLineUI":10}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("../ui/layaMaxUI");
var NetworkManager_1 = require("../Framework/Network/NetworkManager");
var ClientManager_1 = require("../Framework/Network/ClientManager");
var NetEventDispatcher_1 = require("../Framework/Event/NetEventDispatcher");
//主界面
var MainUI = /** @class */ (function (_super) {
    __extends(MainUI, _super);
    function MainUI() {
        return _super.call(this) || this;
    }
    MainUI.prototype.onEnable = function () {
        console.log("MainUI.onEnable");
        NetEventDispatcher_1.default.getInstance().RegisterMessage(GameMessage.GM_VERSION_RETURN, this.GM_VerifyVersionReturn);
    };
    MainUI.prototype.onDisable = function () {
        console.log("MainUI.onDisable");
        NetEventDispatcher_1.default.getInstance().UnRegisterMessage(GameMessage.GM_VERSION_RETURN, this.GM_VerifyVersionReturn);
    };
    MainUI.prototype.GM_VerifyVersionReturn = function (netPackage) {
        console.log(netPackage.messageId + "  " + netPackage.message);
    };
    MainUI.prototype.onAwake = function () {
        console.log("Precision safe." + (Math.pow(2, 53) - 1));
        ClientManager_1.default.getInstance().createClient(0, "ws://192.168.2.126:50000");
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
        NetworkManager_1.default.getInstance().loginSendMessage(GameMessage.GM_VERIFY_VERSION, msg);
    };
    return MainUI;
}(layaMaxUI_1.ui.MainSceneUI));
exports.default = MainUI;
},{"../Framework/Event/NetEventDispatcher":2,"../Framework/Network/ClientManager":3,"../Framework/Network/NetworkManager":5,"../ui/layaMaxUI":11}],10:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkc6L0xheWFQcm9qZWN0L0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQXBwTWFpbi50cyIsInNyYy9GcmFtZXdvcmsvRXZlbnQvTmV0RXZlbnREaXNwYXRjaGVyLnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL0NsaWVudE1hbmFnZXIudHMiLCJzcmMvRnJhbWV3b3JrL05ldHdvcmsvTmV0UGFja2V0LnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL05ldHdvcmtNYW5hZ2VyLnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL1BCTWVzc2FnZU5hbWUudHMiLCJzcmMvRnJhbWV3b3JrL05ldHdvcmsvU29ja2V0Q29ubmVjdC50cyIsInNyYy9HYW1lQ29uZmlnLnRzIiwic3JjL3NjcmlwdC9NYWluVUkudHMiLCJzcmMvc3R1ZHkvVGVzdF85X1RpbWVMaW5lVUkudHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1JBLElBQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7QUFrQnpCLDJDQUFzQztBQU90QyxLQUFLO0FBQ0w7SUFDSTtRQUNJLGdCQUFnQjtRQUNoQixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFVLENBQUMsS0FBSyxFQUFFLG9CQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDcEQ7YUFDSTtZQUNELHVCQUF1QjtZQUN2Qiw4REFBOEQ7WUFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBVSxDQUFDLEtBQUssRUFBRSxvQkFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNqRTtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUdsRCxvREFBb0Q7UUFDcEQsSUFBSSxvQkFBVSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNO1lBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDOUYsSUFBSSxvQkFBVSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUM7WUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMzRixJQUFJLG9CQUFVLENBQUMsSUFBSTtZQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFdEMsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFFN0IsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUdwSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsb0JBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQSx1Q0FBdUM7UUFDbkYsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsb0JBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQSwyQ0FBMkM7UUFDekYsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBRS9CLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLG9CQUFVLENBQUMsaUJBQWlCLENBQUM7UUFFMUQsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUN4QyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFFeEMsb0JBQW9CO1FBQ3BCLDBCQUEwQjtJQUM5QixDQUFDO0lBRUQsaUNBQWUsR0FBZjtRQUNJLCtDQUErQztRQUMvQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUNwRyxDQUFDO0lBRUQsZ0NBQWMsR0FBZDtRQUNJLFlBQVk7UUFDWixvQkFBVSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWhFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRU8sdUJBQUssR0FBYjtRQUNJLG9CQUFvQjtRQUNwQix5QkFBeUI7UUFDekIsMEJBQTBCO1FBQzFCLHFDQUFxQztRQUNyQyxzQ0FBc0M7UUFDdEMscUNBQXFDO1FBQ3JDLHNDQUFzQztRQUN0Qyx3QkFBd0I7UUFDeEIsNkJBQTZCO1FBQzdCLDRCQUE0QjtRQUM1QixtQ0FBbUM7UUFDbkMsNEJBQTRCO1FBQzVCLHlCQUF5QjtRQUN6Qix3QkFBd0I7UUFDeEIsMEJBQTBCO1FBQzFCLHNCQUFzQjtRQUN0Qix3QkFBd0I7UUFDeEIsc0NBQXNDO0lBQzFDLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0E1RUEsQUE0RUMsSUFBQTtBQUVELE9BQU87QUFDUCxJQUFJLE9BQU8sRUFBRSxDQUFDOzs7O0FDM0dkO0lBUUk7UUFGUSxvQkFBZSxHQUFxQyxFQUFFLENBQUE7SUFFdEMsQ0FBQztJQU5YLDhCQUFXLEdBQXpCO1FBQ0ksT0FBTyxrQkFBa0IsQ0FBQyxRQUFRLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7SUFDbkcsQ0FBQztJQU1NLDRDQUFlLEdBQXRCLFVBQXVCLFNBQWlCLEVBQUUsR0FBYTtRQUNuRCxJQUFJLElBQUksR0FBb0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsSUFBSSxHQUFHLElBQUksS0FBSyxFQUFZLENBQUM7WUFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDMUM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFDTSw4Q0FBaUIsR0FBeEIsVUFBeUIsU0FBaUIsRUFBRSxHQUFhO1FBQ3JELElBQUksSUFBSSxHQUFvQixJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVELElBQUksSUFBSSxFQUFFO1lBQ04sSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN6QjtJQUNMLENBQUM7SUFDTSxxQ0FBUSxHQUFmLFVBQWdCLFNBQWlCLEVBQUUsVUFBZTtRQUM5QyxJQUFJLElBQUksR0FBb0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1RCxJQUFJLElBQUksRUFBRTtZQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO2dCQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQTtZQUNyQyxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUNNLHFDQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQTtJQUM3QixDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQXBDQSxBQW9DQyxJQUFBOzs7OztBQ3BDRCxpREFBNEM7QUFFNUMsa0hBQWtIO0FBR2xILElBQUssUUFLSjtBQUxELFdBQUssUUFBUTtJQUNULHlDQUFTLENBQUE7SUFDVCx5Q0FBSyxDQUFBO0lBQ0wseUNBQUssQ0FBQTtJQUNMLG1EQUFVLENBQUE7QUFDZCxDQUFDLEVBTEksUUFBUSxLQUFSLFFBQVEsUUFLWjtBQUdEO0lBSUksb0JBQVksRUFBWTtRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU0sNEJBQU8sR0FBZCxVQUFlLElBQVksRUFBRSxJQUFZO1FBQ3JDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSx1QkFBYSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxpQ0FBWSxHQUFuQixVQUFvQixHQUFXO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSx1QkFBYSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLDhCQUFTLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRU0sK0JBQVUsR0FBakI7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFTSxnQ0FBVyxHQUFsQjtRQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRU0sOEJBQVMsR0FBaEIsVUFBaUIsS0FBYTtRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU0sZ0NBQVcsR0FBbEIsVUFBbUIsS0FBYSxFQUFFLEdBQVE7UUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDTCxpQkFBQztBQUFELENBckNBLEFBcUNDLElBQUE7QUFHRDtJQVFJO1FBUFEsa0JBQWEsR0FBcUMsRUFBRSxDQUFDO0lBT3JDLENBQUM7SUFKWCx5QkFBVyxHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFJTSxvQ0FBWSxHQUFuQixVQUFvQixRQUFnQixFQUFFLEdBQVc7UUFDN0MsSUFBSSxNQUFNLEdBQWUsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDNUMsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNNLG1DQUFXLEdBQWxCLFVBQW1CLFFBQWtCO1FBQ2pDLElBQUksTUFBTSxHQUFlLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3ZELElBQUksTUFBTSxFQUFFO1lBQ1IsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFBO1NBQ3RCO0lBQ0wsQ0FBQztJQUNNLGlDQUFTLEdBQWhCLFVBQWlCLFFBQWtCO1FBQy9CLElBQUksTUFBTSxHQUFlLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3ZELElBQUksTUFBTSxFQUFFO1lBQ1IsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFBO1NBQ3JCO0lBQ0wsQ0FBQztJQUNNLGlDQUFTLEdBQWhCLFVBQWlCLFFBQWtCO1FBQy9CLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDdEMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLHdDQUFnQixHQUF2QixVQUF3QixLQUFhLEVBQUUsR0FBYztRQUNqRCxJQUFJLE1BQU0sR0FBZSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN2RCxJQUFJLE1BQU0sRUFBRTtZQUNSLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1NBQ2pDO0lBQ0wsQ0FBQztJQUNNLHdDQUFnQixHQUF2QixVQUF3QixLQUFhLEVBQUUsR0FBYztRQUNqRCxJQUFJLE1BQU0sR0FBZSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN2RCxJQUFJLE1BQU0sRUFBRTtZQUNSLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1NBQ2pDO0lBQ0wsQ0FBQztJQUNNLHdDQUFnQixHQUF2QixVQUF3QixLQUFhLEVBQUUsR0FBYztRQUNqRCxJQUFJLE1BQU0sR0FBZSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN2RCxJQUFJLE1BQU0sRUFBRTtZQUNSLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1NBQ2pDO0lBQ0wsQ0FBQztJQUNNLHdDQUFnQixHQUF2QixVQUF3QixLQUFhO1FBQ2pDLElBQUksTUFBTSxHQUFlLElBQUksQ0FBQztRQUM5QixJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsK0JBQStCLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyw2QkFBNkIsRUFBRTtZQUMxRyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDMUM7YUFDSTtZQUNELE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUMxQztRQUNELElBQUksTUFBTSxFQUFFO1lBQ1IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUMxQjtJQUNMLENBQUM7SUFFTSwwQ0FBa0IsR0FBekI7UUFDSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFBO1FBQzVCLEtBQUssSUFBTSxHQUFHLElBQUksR0FBRyxFQUFFO1lBQ25CLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDekIsSUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QixPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDeEI7U0FDSjtRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFBO0lBQzNCLENBQUM7SUF6RWMsc0JBQVEsR0FBa0IsSUFBSSxDQUFDO0lBMkVsRCxvQkFBQztDQTdFRCxBQTZFQyxJQUFBO2tCQTdFb0IsYUFBYTs7OztBQ3JEbEMsSUFBTyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtBQUV2QjtJQWFJLG1CQUFZLE9BQVk7UUFaeEIsc0VBQXNFO1FBQ3RFLHdEQUF3RDtRQUN4RCxxREFBcUQ7UUFDOUMsc0JBQWlCLEdBQVcsRUFBRSxDQUFDLENBQUMsV0FBVztRQVU5QyxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQTtRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQSxVQUFVO0lBQzlELENBQUM7SUFFRCxTQUFTO0lBQ0YsOEJBQVUsR0FBakIsVUFBa0IsS0FBVTtRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBLFFBQVE7UUFFL0IscUJBQXFCO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDNUUsSUFBSSxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBRXJFLDJDQUEyQztRQUMzQyw4QkFBOEI7UUFDOUIsR0FBRztRQUVILElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0F0Q0EsQUFzQ0MsSUFBQTs7Ozs7QUN4Q0QsaURBQTRDO0FBRTVDO0lBT0k7SUFBd0IsQ0FBQztJQUpYLDBCQUFXLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUE7SUFDeEQsQ0FBQztJQUlEOztPQUVHO0lBQ0ksa0NBQVMsR0FBaEI7UUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSx5Q0FBZ0IsR0FBdkIsVUFBd0IsS0FBYSxFQUFFLE9BQVk7UUFDL0MsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVNLHlDQUFnQixHQUF2QixVQUF3QixLQUFhLEVBQUUsT0FBWTtRQUMvQyx1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRU0seUNBQWdCLEdBQXZCLFVBQXdCLEtBQWEsRUFBRSxPQUFZO1FBQy9DLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFDTCxxQkFBQztBQUFELENBakNBLEFBaUNDLElBQUE7Ozs7O0FDbENEOztHQUVHO0FBQ0g7SUFBQTtJQWlCQSxDQUFDO0lBZFUsb0JBQU0sR0FBYjtRQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBQztZQUNaLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQTtTQUN6QjtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO1FBRWxCLGFBQWE7UUFDYixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFBO1FBRXpCLEdBQUcsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsR0FBQyxrQkFBa0IsQ0FBQTtRQUNyRCxHQUFHLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLEdBQUMsd0JBQXdCLENBQUE7UUFFM0QsT0FBTyxHQUFHLENBQUE7SUFDZCxDQUFDO0lBZk0sd0JBQVUsR0FBRyxFQUFFLENBQUE7SUFDZixvQkFBTSxHQUFHLEtBQUssQ0FBQTtJQWV6QixvQkFBQztDQWpCRCxBQWlCQyxJQUFBO2tCQWpCb0IsYUFBYTs7OztBQ0psQyxrRUFBNEQ7QUFDNUQseUNBQW1DO0FBQ25DLG1EQUE2QztBQUM3QyxpREFBNEM7QUFHNUM7SUFpQkksZ0RBQWdEO0lBQ2hELG1EQUFtRDtJQUVuRCx1QkFBWSxJQUFZO1FBbEJ4QixxRUFBcUU7UUFDckUsdURBQXVEO1FBQ3ZELG9EQUFvRDtRQUM1QyxzQkFBaUIsR0FBVyxFQUFFLENBQUEsQ0FBQyxXQUFXO1FBRzNDLFdBQU0sR0FBZ0IsSUFBSSxDQUFBO1FBQ3pCLGNBQVMsR0FBYyxJQUFJLENBQUE7UUFDM0IsY0FBUyxHQUFjLElBQUksQ0FBQTtRQUMzQixjQUFTLEdBQWMsSUFBSSxDQUFBO1FBQzNCLFFBQUcsR0FBVyxJQUFJLENBQUE7UUFDbEIsU0FBSSxHQUFXLElBQUksQ0FBQTtRQUNuQixrQkFBYSxHQUFRLElBQUksQ0FBQTtRQUN6QixjQUFTLEdBQVEsSUFBSSxDQUFDO1FBTTFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUEsQ0FBQSxVQUFVO1FBQ3pELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUEsQ0FBQSxVQUFVO1FBRXpELHNEQUFzRDtRQUN0RCx5REFBeUQ7UUFFekQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNqRCxJQUFJLENBQUMsYUFBYSxHQUFHLHVCQUFhLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDL0MsQ0FBQztJQUNNLCtCQUFPLEdBQWQsVUFBZSxJQUFZLEVBQUUsSUFBWTtRQUNyQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7UUFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDL0IsQ0FBQztJQUNELHVCQUF1QjtJQUNoQixvQ0FBWSxHQUFuQixVQUFvQixHQUFXO1FBQzNCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQSxDQUFBLFVBQVU7UUFDdEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQzdELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUM3RCxDQUFDO0lBQ00saUNBQVMsR0FBaEI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFDTSxrQ0FBVSxHQUFqQjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDdkIsQ0FBQztJQUNELE1BQU07SUFDQyxpQ0FBUyxHQUFoQjtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUE7SUFDaEMsQ0FBQztJQUNELFFBQVE7SUFDQSxtQ0FBVyxHQUFuQixVQUFvQixLQUFpQjtRQUFqQixzQkFBQSxFQUFBLFlBQWlCO1FBQ2pDLGdEQUFnRDtJQUNwRCxDQUFDO0lBQ0QsUUFBUTtJQUNBLG9DQUFZLEdBQXBCLFVBQXFCLEtBQWlCO1FBQWpCLHNCQUFBLEVBQUEsWUFBaUI7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUE7SUFDakQsQ0FBQztJQUNELE1BQU07SUFDRSxvQ0FBWSxHQUFwQixVQUFxQixDQUFhO1FBQWIsa0JBQUEsRUFBQSxRQUFhO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFBO0lBQy9DLENBQUM7SUFFRCxPQUFPO0lBQ0EsaUNBQVMsR0FBaEIsVUFBaUIsS0FBYTtRQUMxQixVQUFVO1FBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDMUIsQ0FBQztJQUVELFNBQVM7SUFDRixrQ0FBVSxHQUFqQixVQUFrQixLQUFhLEVBQUUsT0FBZTtRQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDaEMsY0FBYztRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDMUIsQ0FBQztJQUVELE1BQU07SUFDQyxtQ0FBVyxHQUFsQixVQUFtQixLQUFhLEVBQUUsR0FBUTtRQUN0QyxJQUFJLE1BQU0sR0FBZSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNoQyxjQUFjO1FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0lBRUQsU0FBUztJQUNELDRCQUFJLEdBQVosVUFBYSxLQUFhLEVBQUUsSUFBZTtRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUNqRCxPQUFNO1NBQ1Q7UUFDRCxxQkFBcUI7UUFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFBO1FBQ3JFLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNoQyx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMvRCxhQUFhO1FBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDNUMsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDdkMsY0FBYztRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDMUIsQ0FBQztJQUVELE9BQU87SUFDQyxzQ0FBYyxHQUF0QixVQUF1QixHQUFRO1FBQzNCLDJFQUEyRTtRQUMzRSxJQUFJLFNBQVMsR0FBYyxJQUFJLG1CQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDOUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUN6Qiw0QkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUM3RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGlDQUFTLEdBQWhCLFVBQWlCLFNBQWlCLEVBQUUsT0FBWTtRQUM1QyxJQUFJLFdBQVcsR0FBVyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3ZELCtEQUErRDtRQUMvRCxJQUFJLE1BQU0sR0FBUSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN2RSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNJLG1DQUFXLEdBQWxCLFVBQW1CLFNBQWlCLEVBQUUsT0FBbUI7UUFDckQsSUFBSSxXQUFXLEdBQVcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN2RCwrREFBK0Q7UUFDL0QsSUFBSSxPQUFPLEdBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0QsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVMLG9CQUFDO0FBQUQsQ0FySkEsQUFxSkMsSUFBQTs7Ozs7QUMzSkQsZ0dBQWdHO0FBQ2hHLDBDQUFvQztBQUNwQywrREFBeUQ7QUFDekQ7O0VBRUU7QUFDRjtJQWFJO0lBQWMsQ0FBQztJQUNSLGVBQUksR0FBWDtRQUNJLElBQUksR0FBRyxHQUFhLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQzdDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBQyxnQkFBTSxDQUFDLENBQUM7UUFDL0IsR0FBRyxDQUFDLDRCQUE0QixFQUFDLDJCQUFpQixDQUFDLENBQUM7SUFDeEQsQ0FBQztJQWpCTSxnQkFBSyxHQUFRLEdBQUcsQ0FBQztJQUNqQixpQkFBTSxHQUFRLElBQUksQ0FBQztJQUNuQixvQkFBUyxHQUFRLGFBQWEsQ0FBQztJQUMvQixxQkFBVSxHQUFRLFlBQVksQ0FBQztJQUMvQixpQkFBTSxHQUFRLEtBQUssQ0FBQztJQUNwQixpQkFBTSxHQUFRLE1BQU0sQ0FBQztJQUNyQixxQkFBVSxHQUFLLGlCQUFpQixDQUFDO0lBQ2pDLG9CQUFTLEdBQVEsRUFBRSxDQUFDO0lBQ3BCLGdCQUFLLEdBQVMsS0FBSyxDQUFDO0lBQ3BCLGVBQUksR0FBUyxLQUFLLENBQUM7SUFDbkIsdUJBQVksR0FBUyxLQUFLLENBQUM7SUFDM0IsNEJBQWlCLEdBQVMsSUFBSSxDQUFDO0lBTzFDLGlCQUFDO0NBbkJELEFBbUJDLElBQUE7a0JBbkJvQixVQUFVO0FBb0IvQixVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7QUMxQmxCLDZDQUFxQztBQUNyQyxzRUFBaUU7QUFDakUsb0VBQStEO0FBQy9ELDRFQUF1RTtBQUl2RSxLQUFLO0FBQ0w7SUFBb0MsMEJBQWM7SUFFOUM7ZUFBZ0IsaUJBQU87SUFBRSxDQUFDO0lBRTFCLHlCQUFRLEdBQVI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFFOUIsNEJBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtJQUNoSCxDQUFDO0lBRUQsMEJBQVMsR0FBVDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtRQUUvQiw0QkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFDbEgsQ0FBQztJQUdPLHVDQUFzQixHQUE5QixVQUErQixVQUFvQjtRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNqRSxDQUFDO0lBR0Qsd0JBQU8sR0FBUDtRQUVJLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZELHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1FBRXhFLGNBQWM7UUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU8sNEJBQVcsR0FBbkI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdCLElBQUksR0FBRyxHQUFHO1lBQ04sT0FBTyxFQUFFLE9BQU87WUFDaEIsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixNQUFNLEVBQUUsQ0FBQztTQUNaLENBQUE7UUFDRCx3QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRyxHQUFHLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBQ0wsYUFBQztBQUFELENBekNBLEFBeUNDLENBekNtQyxjQUFFLENBQUMsV0FBVyxHQXlDakQ7Ozs7O0FDOUNEO0lBRUk7UUFDSSxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFTyxvQ0FBUSxHQUFoQjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtRQUNuQyxVQUFVO1FBQ1Ysd0NBQXdDO1FBQ3hDLE9BQU87UUFDUCw0QkFBNEI7UUFDNUIsWUFBWTtRQUNaLG1CQUFtQjtJQUN2QixDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQWhCQSxBQWdCQyxJQUFBOzs7OztBQ2pCRCxJQUFPLE1BQU0sR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzFCLElBQU8sS0FBSyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDeEIsSUFBSSxHQUFHLEdBQWEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7QUFDN0MsSUFBYyxFQUFFLENBa0JmO0FBbEJELFdBQWMsRUFBRTtJQUNaO1FBQWlDLCtCQUFLO1FBQ2xDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixvQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQ0wsa0JBQUM7SUFBRCxDQU5BLEFBTUMsQ0FOZ0MsS0FBSyxHQU1yQztJQU5ZLGNBQVcsY0FNdkIsQ0FBQTtJQUNELEdBQUcsQ0FBQyxnQkFBZ0IsRUFBQyxXQUFXLENBQUMsQ0FBQztJQUNsQztRQUFnQyw4QkFBTTtRQUVsQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsbUNBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FQQSxBQU9DLENBUCtCLE1BQU0sR0FPckM7SUFQWSxhQUFVLGFBT3RCLENBQUE7SUFDRCxHQUFHLENBQUMsZUFBZSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BDLENBQUMsRUFsQmEsRUFBRSxHQUFGLFVBQUUsS0FBRixVQUFFLFFBa0JmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBCcm93c2VyID0gTGF5YS5Ccm93c2VyXHJcbmltcG9ydCBXZWJHTCA9IExheWEuV2ViR0xcclxuaW1wb3J0IFN0YWdlID0gTGF5YS5TdGFnZVxyXG5cclxuaW1wb3J0IFRlc3RfMV9UZXh0IGZyb20gJy4vc3R1ZHkvVGVzdF8xX1RleHQnO1xyXG5pbXBvcnQgVGVzdF8yX0lucHV0VGVzdCBmcm9tICcuL3N0dWR5L1Rlc3RfMl9JbnB1dFRlc3QnO1xyXG5pbXBvcnQgVGVzdF8zX0JpdG1hcEZvbnQgZnJvbSAnLi9zdHVkeS9UZXN0XzNfQml0bWFwRm9udCc7XHJcbmltcG9ydCBUZXN0XzRfMV9TcHJpdGVfRGlzcGxheUltYWdlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSc7XHJcbmltcG9ydCBUZXN0XzRfMV9TcHJpdGVfU3dpdGNoVGV4dHVyZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8xX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlJztcclxuaW1wb3J0IFRlc3RfNF8yX1Nwcml0ZV9EaXNwbGF5SW1hZ2UgZnJvbSAnLi9zdHVkeS9UZXN0XzRfMl9TcHJpdGVfRGlzcGxheUltYWdlJztcclxuaW1wb3J0IFRlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzJfU3ByaXRlX1N3aXRjaFRleHR1cmUnO1xyXG5pbXBvcnQgVGVzdF80X01hc2tEZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF80X01hc2tEZW1vJztcclxuaW1wb3J0IFRlc3RfNV8xX0NvbG9yRmlsdGVyIGZyb20gJy4vc3R1ZHkvVGVzdF81XzFfQ29sb3JGaWx0ZXInO1xyXG5pbXBvcnQgVGVzdF81XzJfR2xvd0ZpbHRlciBmcm9tICcuL3N0dWR5L1Rlc3RfNV8yX0dsb3dGaWx0ZXInO1xyXG5pbXBvcnQgVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMgZnJvbSAnLi9zdHVkeS9UZXN0XzZfMV9TcHJpdGVfRHJhd1NoYXBlcyc7XHJcbmltcG9ydCBUZXN0XzdfQXRsYXNBbmlEZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF83X0F0bGFzQW5pRGVtbyc7XHJcbmltcG9ydCBUZXN0XzhfVHdlZW5EZW1vIGZyb20gJy4vc3R1ZHkvVGVzdF84X1R3ZWVuRGVtbyc7XHJcbmltcG9ydCBUZXN0XzlfVGltZUxpbmUgZnJvbSAnLi9zdHVkeS9UZXN0XzlfVGltZUxpbmUnO1xyXG5pbXBvcnQgVGVzdF85X1RpbWVMaW5lVUkgZnJvbSAnLi9zdHVkeS9UZXN0XzlfVGltZUxpbmVVSSc7XHJcbmltcG9ydCBUZXN0XzExX1NvdW5kIGZyb20gJy4vc3R1ZHkvVGVzdF8xMV9Tb3VuZCc7XHJcbmltcG9ydCBHYW1lQ29uZmlnIGZyb20gJy4vR2FtZUNvbmZpZyc7XHJcbmltcG9ydCBUZXN0XzBfMV9DaGFubmVsIGZyb20gJy4vc3R1ZHkvVGVzdF8wXzFfQ2hhbm5lbCc7XHJcbmltcG9ydCBUZXN0XzBfMV9Tb2NrZXQgZnJvbSAnLi9zdHVkeS9UZXN0XzBfMV9Tb2NrZXQnO1xyXG5pbXBvcnQgVGVzdF8wX05ldHdvcmtfUHJvdG9jb2xCdWZmZXIgZnJvbSAnLi9zdHVkeS9UZXN0XzBfTmV0d29ya19Qcm90b2NvbEJ1ZmZlcic7XHJcbmltcG9ydCBOZXR3b3JrTWFuYWdlciBmcm9tICcuL0ZyYW1ld29yay9OZXR3b3JrL05ldHdvcmtNYW5hZ2VyJztcclxuaW1wb3J0IENsaWVudE1hbmFnZXIgZnJvbSAnLi9GcmFtZXdvcmsvTmV0d29yay9DbGllbnRNYW5hZ2VyJztcclxuXHJcbi8v5ZCv5Yqo57G7XHJcbmNsYXNzIEFwcE1haW4ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy/moLnmja5JREXorr7nva7liJ3lp4vljJblvJXmk45cdFx0XHJcbiAgICAgICAgaWYgKHdpbmRvd1tcIkxheWEzRFwiXSkge1xyXG4gICAgICAgICAgICBMYXlhM0QuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDkuI3mlK/mjIFXZWJHTOaXtuiHquWKqOWIh+aNouiHs0NhbnZhc1xyXG4gICAgICAgICAgICAvL0xheWEuaW5pdChCcm93c2VyLmNsaWVudFdpZHRoLCBCcm93c2VyLmNsaWVudEhlaWdodCwgV2ViR0wpO1xyXG4gICAgICAgICAgICBMYXlhLmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQsIExheWFbXCJXZWJHTFwiXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExheWFbXCJQaHlzaWNzXCJdICYmIExheWFbXCJQaHlzaWNzXCJdLmVuYWJsZSgpO1xyXG4gICAgICAgIExheWFbXCJEZWJ1Z1BhbmVsXCJdICYmIExheWFbXCJEZWJ1Z1BhbmVsXCJdLmVuYWJsZSgpO1xyXG5cclxuXHJcbiAgICAgICAgLy/miZPlvIDosIPor5XpnaLmnb/vvIjpgJrov4dJREXorr7nva7osIPor5XmqKHlvI/vvIzmiJbogIV1cmzlnLDlnYDlop7liqBkZWJ1Zz10cnVl5Y+C5pWw77yM5Z2H5Y+v5omT5byA6LCD6K+V6Z2i5p2/77yJXHJcbiAgICAgICAgaWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuICAgICAgICBpZiAoR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgJiYgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0pIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdLmVuYWJsZSgpO1xyXG4gICAgICAgIGlmIChHYW1lQ29uZmlnLnN0YXQpIExheWEuU3RhdC5zaG93KCk7XHJcblxyXG4gICAgICAgIC8v6KGo56S65piv5ZCm5o2V6I635YWo5bGA6ZSZ6K+v5bm25by55Ye65o+Q56S644CCXHJcbiAgICAgICAgTGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy/mv4DmtLvotYTmupDniYjmnKzmjqfliLbvvIx2ZXJzaW9uLmpzb27nlLFJREXlj5HluIPlip/og73oh6rliqjnlJ/miJDvvIzlpoLmnpzmsqHmnInkuZ/kuI3lvbHlk43lkI7nu63mtYHnqItcclxuICAgICAgICBMYXlhLlJlc291cmNlVmVyc2lvbi5lbmFibGUoXCJ2ZXJzaW9uLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uVmVyc2lvbkxvYWRlZCksIExheWEuUmVzb3VyY2VWZXJzaW9uLkZJTEVOQU1FX1ZFUlNJT04pO1xyXG5cclxuXHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnblYgPSBTdGFnZS5BTElHTl9NSURETEU7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnbkggPSBTdGFnZS5BTElHTl9DRU5URVI7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBHYW1lQ29uZmlnLnNjYWxlTW9kZTsvL1N0YWdlLlNDQUxFX0ZVTEw7Ly9TQ0FMRV9GSVhFRF9IRUlHSFRcclxuICAgICAgICBMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBHYW1lQ29uZmlnLnNjcmVlbk1vZGU7Ly9TdGFnZS5TQ1JFRU5fSE9SSVpPTlRBTDsvL1NDUkVFTl9WRVJUSUNBTFxyXG4gICAgICAgIExheWEuc3RhZ2UuYmdDb2xvciA9IFwiIzdmN2Y3ZlwiO1xyXG5cclxuICAgICAgICAvL+WFvOWuueW+ruS/oeS4jeaUr+aMgeWKoOi9vXNjZW5l5ZCO57yA5Zy65pmvXHJcbiAgICAgICAgTGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuICAgICAgICAvL+WmguaenOmAmui/h+iuvuWkh+mdmemfs+mUruiuqemfs+mikeiHquWKqOi3n+maj+iuvuWkh+mdmemfs+OAgumcgOimgeWwhnVzZUF1ZGlvTXVzaWPorr7nva7kuLpmYWxzZeOAglxyXG4gICAgICAgIExheWEuU291bmRNYW5hZ2VyLnVzZUF1ZGlvTXVzaWMgPSBmYWxzZTtcclxuICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5hdXRvU3RvcE11c2ljID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8v5raI6Zmk55+i6YeP57uY5Yi255qE6ZSv6b2/77yM5L2G5Lya5aKe5Yqg5oCn6IO95raI6ICXXHJcbiAgICAgICAgLy9Db25maWcuaXNBbnRpYWxpYXM9dHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvblZlcnNpb25Mb2FkZWQoKTogdm9pZCB7XHJcbiAgICAgICAgLy/mv4DmtLvlpKflsI/lm77mmKDlsITvvIzliqDovb3lsI/lm77nmoTml7blgJnvvIzlpoLmnpzlj5HnjrDlsI/lm77lnKjlpKflm77lkIjpm4bph4zpnaLvvIzliJnkvJjlhYjliqDovb3lpKflm77lkIjpm4bvvIzogIzkuI3mmK/lsI/lm75cclxuICAgICAgICBMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29uZmlnTG9hZGVkKCk6IHZvaWQge1xyXG4gICAgICAgIC8v5Yqg6L29SURF5oyH5a6a55qE5Zy65pmvXHJcbiAgICAgICAgR2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUpO1xyXG5cclxuICAgICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXR1cCgpOiB2b2lkIHtcclxuICAgICAgICAvL25ldyBUZXN0XzFfVGV4dCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMl9JbnB1dFRlc3QoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzNfQml0bWFwRm9udCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8xX1Nwcml0ZV9EaXNwbGF5SW1hZ2UoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzRfMV9TcHJpdGVfU3dpdGNoVGV4dHVyZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8yX1Nwcml0ZV9EaXNwbGF5SW1hZ2UoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzRfMl9TcHJpdGVfU3dpdGNoVGV4dHVyZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF9NYXNrRGVtbygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNV8xX0NvbG9yRmlsdGVyKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF81XzJfR2xvd0ZpbHRlcigpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNl8xX1Nwcml0ZV9EcmF3U2hhcGVzKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF83X0F0bGFzQW5pRGVtbygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfOF9Ud2VlbkRlbW8oKTtcclxuICAgICAgICAvL25ldyBUZXN0XzlfVGltZUxpbmUoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzlfVGltZUxpbmVVSSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMTFfU291bmQoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzBfMV9Tb2NrZXQoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzBfTmV0d29ya19Qcm90b2NvbEJ1ZmZlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgQXBwTWFpbigpOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ldEV2ZW50RGlzcGF0Y2hlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogTmV0RXZlbnREaXNwYXRjaGVyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBOZXRFdmVudERpc3BhdGNoZXIge1xyXG4gICAgICAgIHJldHVybiBOZXRFdmVudERpc3BhdGNoZXIuaW5zdGFuY2UgfHwgKE5ldEV2ZW50RGlzcGF0Y2hlci5pbnN0YW5jZSA9IG5ldyBOZXRFdmVudERpc3BhdGNoZXIoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlSGFuZGxlcnM6IHsgW2luZGV4OiBudW1iZXJdOiBGdW5jdGlvbltdOyB9ID0ge31cclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgcHVibGljIFJlZ2lzdGVyTWVzc2FnZShtZXNzYWdlSUQ6IG51bWJlciwgZnVuOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHZhciBmdW5zOiBBcnJheTxGdW5jdGlvbj4gPSB0aGlzLm1lc3NhZ2VIYW5kbGVyc1ttZXNzYWdlSURdO1xyXG4gICAgICAgIGlmICghZnVucykge1xyXG4gICAgICAgICAgICBmdW5zID0gbmV3IEFycmF5PEZ1bmN0aW9uPigpO1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VIYW5kbGVyc1ttZXNzYWdlSURdID0gZnVucztcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVucy5wdXNoKGZ1bik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgVW5SZWdpc3Rlck1lc3NhZ2UobWVzc2FnZUlEOiBudW1iZXIsIGZ1bjogRnVuY3Rpb24pIHtcclxuICAgICAgICB2YXIgZnVuczogQXJyYXk8RnVuY3Rpb24+ID0gdGhpcy5tZXNzYWdlSGFuZGxlcnNbbWVzc2FnZUlEXTtcclxuICAgICAgICBpZiAoZnVucykge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXg6IG51bWJlciA9IGZ1bnMuaW5kZXhPZihmdW4pO1xyXG4gICAgICAgICAgICBmdW5zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIERpc3BhdGNoKG1lc3NhZ2VJRDogbnVtYmVyLCBuZXRQYWNrYWdlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB2YXIgZnVuczogQXJyYXk8RnVuY3Rpb24+ID0gdGhpcy5tZXNzYWdlSGFuZGxlcnNbbWVzc2FnZUlEXTtcclxuICAgICAgICBpZiAoZnVucykge1xyXG4gICAgICAgICAgICBmdW5zLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNhbGwoZWxlbWVudCwgbmV0UGFja2FnZSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIENsZWFyQWxsKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWVzc2FnZUhhbmRsZXJzID0ge31cclxuICAgIH1cclxufSIsImltcG9ydCBTb2NrZXRDb25uZWN0IGZyb20gXCIuL1NvY2tldENvbm5lY3RcIjtcclxuXHJcbi8vaW1wb3J0ICogYXMgQ29sbGVjdGlvbnMgZnJvbSAndHlwZXNjcmlwdC1jb2xsZWN0aW9ucyc7IC8vaW1wb3J0IENvbGxlY3Rpb25zID0gcmVxdWlyZSgndHlwZXNjcmlwdC1jb2xsZWN0aW9ucycpO1xyXG5cclxuXHJcbmVudW0gQ2xpZW50SUQge1xyXG4gICAgbG9naW4gPSAwLFxyXG4gICAgbG9naWMsXHJcbiAgICBzY2VuZSxcclxuICAgIHJlY29yZENoYXQsXHJcbn1cclxuXHJcblxyXG5jbGFzcyBHYW1lQ2xpZW50IHtcclxuICAgIHByaXZhdGUgY2xpZW50SWQ6IENsaWVudElEO1xyXG4gICAgcHJpdmF0ZSBzb2NrZXRDb25uZWN0OiBTb2NrZXRDb25uZWN0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBDbGllbnRJRCkge1xyXG4gICAgICAgIHRoaXMuY2xpZW50SWQgPSBpZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29ubmVjdChob3N0OiBzdHJpbmcsIHBvcnQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdCA9IG5ldyBTb2NrZXRDb25uZWN0KFwiIGNsaWVudElkOlwiICsgdGhpcy5jbGllbnRJZCk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LmNvbm5lY3QoaG9zdCwgcG9ydCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbm5lY3RCeVVybCh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdCA9IG5ldyBTb2NrZXRDb25uZWN0KFwiIGNsaWVudElkOlwiICsgdGhpcy5jbGllbnRJZCk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LmNvbm5lY3RCeVVybCh1cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZUNvbm5lY3QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LnJlQ29ubmVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNDb25uZWN0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29ja2V0Q29ubmVjdC5kaXNDb25uZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzQ29ubmVjdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvY2tldENvbm5lY3QuY29ubmVjdGVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmRFbXB0eShtc2dJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LnNlbmRFbXB0eShtc2dJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmRNZXNzYWdlKG1zZ0lkOiBudW1iZXIsIG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LnNlbmRNZXNzYWdlKG1zZ0lkLCBtc2cpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xpZW50TWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGdhbWVDbGllbnRNYXA6IHsgW2luZGV4OiBudW1iZXJdOiBHYW1lQ2xpZW50OyB9ID0ge307XHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ2xpZW50TWFuYWdlciA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBDbGllbnRNYW5hZ2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZSB8fCAodGhpcy5pbnN0YW5jZSA9IG5ldyB0aGlzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlQ2xpZW50KGNsaWVudElEOiBudW1iZXIsIHVybDogc3RyaW5nKTogR2FtZUNsaWVudCB7XHJcbiAgICAgICAgdmFyIGNsaWVudDogR2FtZUNsaWVudCA9IG5ldyBHYW1lQ2xpZW50KGNsaWVudElEKTtcclxuICAgICAgICBjbGllbnQuY29ubmVjdEJ5VXJsKHVybCk7XHJcbiAgICAgICAgdGhpcy5nYW1lQ2xpZW50TWFwW0NsaWVudElELmxvZ2luXSA9IGNsaWVudDtcclxuICAgICAgICByZXR1cm4gY2xpZW50O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGNsb3NlQ2xpZW50KGNsaWVudElEOiBDbGllbnRJRCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGllbnQ6IEdhbWVDbGllbnQgPSB0aGlzLmdldENsaWVudChDbGllbnRJRC5sb2dpbilcclxuICAgICAgICBpZiAoY2xpZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5kaXNDb25uZWN0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVDb25uZWN0KGNsaWVudElEOiBDbGllbnRJRCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGllbnQ6IEdhbWVDbGllbnQgPSB0aGlzLmdldENsaWVudChDbGllbnRJRC5sb2dpbilcclxuICAgICAgICBpZiAoY2xpZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5yZUNvbm5lY3QoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRDbGllbnQoY2xpZW50SUQ6IENsaWVudElEKTogR2FtZUNsaWVudCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZUNsaWVudE1hcFtjbGllbnRJRF0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nYW1lQ2xpZW50TWFwW2NsaWVudElEXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ2luU2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgbXNnOiBMYXlhLkJ5dGUpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2xpZW50OiBHYW1lQ2xpZW50ID0gdGhpcy5nZXRDbGllbnQoQ2xpZW50SUQubG9naW4pXHJcbiAgICAgICAgaWYgKGNsaWVudCkge1xyXG4gICAgICAgICAgICBjbGllbnQuc2VuZE1lc3NhZ2UobXNnSWQsIG1zZylcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbG9naWNTZW5kTWVzc2FnZShtc2dJZDogbnVtYmVyLCBtc2c6IExheWEuQnl0ZSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGllbnQ6IEdhbWVDbGllbnQgPSB0aGlzLmdldENsaWVudChDbGllbnRJRC5sb2dpYylcclxuICAgICAgICBpZiAoY2xpZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5zZW5kTWVzc2FnZShtc2dJZCwgbXNnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzY2VuZVNlbmRNZXNzYWdlKG1zZ0lkOiBudW1iZXIsIG1zZzogTGF5YS5CeXRlKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNsaWVudDogR2FtZUNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KENsaWVudElELnNjZW5lKVxyXG4gICAgICAgIGlmIChjbGllbnQpIHtcclxuICAgICAgICAgICAgY2xpZW50LnNlbmRNZXNzYWdlKG1zZ0lkLCBtc2cpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHNlbmRNZXNzYWdlRW1wdHkobXNnSWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGllbnQ6IEdhbWVDbGllbnQgPSBudWxsO1xyXG4gICAgICAgIGlmIChtc2dJZCA+IEdhbWVNZXNzYWdlLkdNX0FDQ09VTlRfU0VSVkVSX01FU1NBR0VfU1RBUlQgJiYgbXNnSWQgPCBHYW1lTWVzc2FnZS5HTV9BQ0NPVU5UX1NFUlZFUl9NRVNTQUdFX0VORCkge1xyXG4gICAgICAgICAgICBjbGllbnQgPSB0aGlzLmdldENsaWVudChDbGllbnRJRC5sb2dpbilcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KENsaWVudElELmxvZ2ljKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2xpZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5zZW5kRW1wdHkobXNnSWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgY2xlYXJBbGxHYW1lQ2xpZW50KCkge1xyXG4gICAgICAgIGxldCBkaWMgPSB0aGlzLmdhbWVDbGllbnRNYXBcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkaWMpIHtcclxuICAgICAgICAgICAgaWYgKGRpYy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZGljW2tleV07XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmRpc0Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdhbWVDbGllbnRNYXAgPSB7fVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBCeXRlID0gTGF5YS5CeXRlXHJcbmltcG9ydCBTb2NrZXRDb25uZWN0IGZyb20gXCIuL1NvY2tldENvbm5lY3RcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0UGFja2V0IHtcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX0hFQURfT0ZGU0VUOiBudW1iZXIgPSAwO1x0Ly8g6Ieq5a6a5LmJ5pWw5o2uIOS4gOiIrOaYr3JvbGVpZCAobG9uZ+exu+WeiylcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX01FU1NTQUdFSURfT0ZGU0VUOiBudW1iZXIgPSA4O1x0Ly8g5raI5oGvaWRcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX0xFTkdUSF9PRkZTRVQ6IG51bWJlciA9IDEyO1x0Ly8g5raI5oGv6ZW/5bqmXHJcbiAgICBwdWJsaWMgV0VCUEFDS19IRUFEX1NJWkU6IG51bWJlciA9IDE2O1x0Ly8g5raI5oGv5pWw5o2u5byA5aeL5L2N572uXHJcblxyXG4gICAgcHVibGljIHJvbGVJZDogbnVtYmVyO1xyXG4gICAgcHVibGljIG1lc3NhZ2VJZDogbnVtYmVyO1xyXG4gICAgcHVibGljIG1lc3NhZ2U6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRCeXRlczogQnl0ZTtcclxuICAgIHByaXZhdGUgc29ja2V0Q29ubmVjdDogU29ja2V0Q29ubmVjdDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25uZWN0OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QgPSBjb25uZWN0XHJcbiAgICAgICAgdGhpcy5yZWFkQnl0ZXMgPSBuZXcgQnl0ZSgpO1xyXG4gICAgICAgIHRoaXMucmVhZEJ5dGVzLmVuZGlhbiA9IExheWEuQnl0ZS5MSVRUTEVfRU5ESUFOOy8v6L+Z6YeM5oiR5Lus6YeH55So5bCP56uvXHJcbiAgICB9XHJcblxyXG4gICAgLy/mjqXmlLbmnI3liqHlmajkv6Hmga9cclxuICAgIHB1YmxpYyByZWNlaXZlTXNnKGJ5dGVzOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlYWRCeXRlcy53cml0ZUFycmF5QnVmZmVyKGJ5dGVzKTtcclxuICAgICAgICB0aGlzLnJlYWRCeXRlcy5wb3MgPSAwOy8v6K6+572u5YGP56e75oyH6ZKIXHJcblxyXG4gICAgICAgIC8v5oyJ54Wn5pyN5Yqh5Zmo5Lyg6YCS6L+H5p2l55qE5pWw5o2u77yM5oyJ54Wn6aG65bqP6K+75Y+WXHJcbiAgICAgICAgdGhpcy5yb2xlSWQgPSB0aGlzLnJlYWRCeXRlcy5nZXRGbG9hdDY0KCk7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlSWQgPSB0aGlzLnJlYWRCeXRlcy5nZXRJbnQzMigpO1xyXG4gICAgICAgIGxldCBtc2dMZW5ndGggPSB0aGlzLnJlYWRCeXRlcy5nZXRJbnQzMigpO1xyXG4gICAgICAgIGxldCBhYiA9IHRoaXMucmVhZEJ5dGVzLnJlYWRBcnJheUJ1ZmZlcihtc2dMZW5ndGggLSB0aGlzLldFQlBBQ0tfSEVBRF9TSVpFKTtcclxuICAgICAgICBsZXQgYnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IHRoaXMuc29ja2V0Q29ubmVjdC5kZXNlcmlhbGl6ZSh0aGlzLm1lc3NhZ2VJZCwgYnVmZmVyKVxyXG5cclxuICAgICAgICAvL2lmIChtc2dMZW5ndGggIT0gdGhpcy5yZWFkQnl0ZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5lcnJvcihcIua2iOaBr+mVv+S4jeS4gOagt1wiKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgdGhpcy5yZWFkQnl0ZXMuY2xlYXIoKTtcclxuICAgIH1cclxufSIsImltcG9ydCBDbGllbnRNYW5hZ2VyIGZyb20gXCIuL0NsaWVudE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ldHdvcmtNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBOZXR3b3JrTWFuYWdlcjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IE5ldHdvcmtNYW5hZ2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZSB8fCAodGhpcy5pbnN0YW5jZSA9IG5ldyB0aGlzKCkpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6KeS6ImySURcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFJvbGVJZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnBvdygyLCA1MykgLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R6YCB5raI5oGvXHJcbiAgICAgKiBAcGFyYW0gbXNnSURcclxuICAgICAqIEBwYXJhbSBtYXNzYWdlXHJcbiAgICAgKiB2YXIgbXNnID0geyB2ZXJzaW9uOiBcIjFcIiwgcGxhdGZvcm06MSwgaXN0ZXN0OjMgfSDmiJYgdmFyIG1zZyA9IG5ldyBQQk1hc3NhZ2UuR01fVmVyaWZ5VmVyc2lvbigpOyBtc2cudmVyc2lvbiA9IFwiMVwiOyBtc2cucGxhdGZvcm0gPSAxOyBtc2cuaXN0ZXN0ID0gMTtcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvZ2luU2VuZE1lc3NhZ2UobXNnSUQ6IG51bWJlciwgbWFzc2FnZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgQ2xpZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvZ2luU2VuZE1lc3NhZ2UobXNnSUQsIG1hc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dpY1NlbmRNZXNzYWdlKG1zZ0lEOiBudW1iZXIsIG1hc3NhZ2U6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIENsaWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2dpY1NlbmRNZXNzYWdlKG1zZ0lELCBtYXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2NlbmVTZW5kTWVzc2FnZShtc2dJRDogbnVtYmVyLCBtYXNzYWdlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBDbGllbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2NlbmVTZW5kTWVzc2FnZShtc2dJRCwgbWFzc2FnZSk7XHJcbiAgICB9XHJcbn0iLCJcclxuLyoqXHJcbiAqIFByb3RvYnVmIOa2iOaBr+WQjeensOWMuemFjVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUEJNZXNzYWdlTmFtZSB7XHJcbiAgICBzdGF0aWMgbWVzc2FnZU1hcCA9IHt9XHJcbiAgICBzdGF0aWMgaXNJbml0ID0gZmFsc2VcclxuICAgIHN0YXRpYyBnZXRNYXAoKTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy5pc0luaXQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlTWFwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNJbml0ID0gdHJ1ZVxyXG5cclxuICAgICAgICAvL01lc3NhZ2VOYW1lXHJcbiAgICAgICAgbGV0IG1hcCA9IHRoaXMubWVzc2FnZU1hcFxyXG5cclxuICAgICAgICBtYXBbR2FtZU1lc3NhZ2UuR01fVkVSSUZZX1ZFUlNJT05dPSdHTV9WZXJpZnlWZXJzaW9uJ1xyXG4gICAgICAgIG1hcFtHYW1lTWVzc2FnZS5HTV9WRVJTSU9OX1JFVFVSTl09J0dNX1ZlcmlmeVZlcnNpb25SZXR1cm4nXHJcblxyXG4gICAgICAgIHJldHVybiBtYXBcclxuICAgIH1cclxufSIsImltcG9ydCBOZXRFdmVudERpc3BhdGNoZXIgZnJvbSBcIi4uL0V2ZW50L05ldEV2ZW50RGlzcGF0Y2hlclwiXHJcbmltcG9ydCBOZXRQYWNrZXQgZnJvbSBcIi4vTmV0UGFja2V0XCJcclxuaW1wb3J0IE5ldHdvcmtNYW5hZ2VyIGZyb20gXCIuL05ldHdvcmtNYW5hZ2VyXCJcclxuaW1wb3J0IFBCTWVzc2FnZU5hbWUgZnJvbSBcIi4vUEJNZXNzYWdlTmFtZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvY2tldENvbm5lY3Qge1xyXG5cclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX0hFQURfT0ZGU0VUOiBudW1iZXIgPSAwXHQvLyDoh6rlrprkuYnmlbDmja4g5LiA6Iis5pivcm9sZWlkIChsb25n57G75Z6LKVxyXG4gICAgLy9wcml2YXRlIFdFQlBBQ0tfTUVTU1NBR0VJRF9PRkZTRVQ6IG51bWJlciA9IDhcdC8vIOa2iOaBr2lkXHJcbiAgICAvL3ByaXZhdGUgV0VCUEFDS19MRU5HVEhfT0ZGU0VUOiBudW1iZXIgPSAxMlx0Ly8g5raI5oGv6ZW/5bqmXHJcbiAgICBwcml2YXRlIFdFQlBBQ0tfSEVBRF9TSVpFOiBudW1iZXIgPSAxNlx0Ly8g5raI5oGv5pWw5o2u5byA5aeL5L2N572uXHJcblxyXG5cclxuICAgIHB1YmxpYyBzb2NrZXQ6IExheWEuU29ja2V0ID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBzZW5kQnl0ZXM6IExheWEuQnl0ZSA9IG51bGxcclxuICAgIHByaXZhdGUgcmVhZEJ5dGVzOiBMYXlhLkJ5dGUgPSBudWxsXHJcbiAgICBwcml2YXRlIHRlbXBCeXRlczogTGF5YS5CeXRlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSB1cmw6IHN0cmluZyA9IG51bGxcclxuICAgIHByaXZhdGUgdGlwczogc3RyaW5nID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBwYk1lc3NhZ2VOYW1lOiBhbnkgPSBudWxsXHJcbiAgICBwcml2YXRlIHByb3RvUm9vdDogYW55ID0gbnVsbDtcclxuXHJcbiAgICAvL3ByaXZhdGUgc2VuZE5ldFBhY2tldDogQXJyYXk8TmV0UGFja2V0PiA9IG51bGxcclxuICAgIC8vcHJpdmF0ZSByZWNlaXZlTmV0UGFja2V0OiBBcnJheTxOZXRQYWNrZXQ+ID0gbnVsbFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRpcHM6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudGlwcyA9IHRpcHNcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcyA9IG5ldyBMYXlhLkJ5dGUoKVxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLmVuZGlhbiA9IExheWEuQnl0ZS5MSVRUTEVfRU5ESUFOLy/ov5nph4zmiJHku6zph4fnlKjlsI/nq69cclxuICAgICAgICB0aGlzLnRlbXBCeXRlcyA9IG5ldyBMYXlhLkJ5dGUoKVxyXG4gICAgICAgIHRoaXMudGVtcEJ5dGVzLmVuZGlhbiA9IExheWEuQnl0ZS5MSVRUTEVfRU5ESUFOLy/ov5nph4zmiJHku6zph4fnlKjlsI/nq69cclxuXHJcbiAgICAgICAgLy90aGlzLnNlbmROZXRQYWNrZXQgPSBuZXcgQXJyYXk8TmV0UGFja2V0PigpIC8v5Y+R6YCB55qE572R57uc5YyFXHJcbiAgICAgICAgLy90aGlzLnJlY2VpdmVOZXRQYWNrZXQgPSBuZXcgQXJyYXk8TmV0UGFja2V0PigpIC8v5o6l5pS255qE572R57uc5YyFXHJcblxyXG4gICAgICAgIHRoaXMucHJvdG9Sb290ID0gTGF5YS5Ccm93c2VyLndpbmRvd1tcIlBCTWVzc2FnZVwiXVxyXG4gICAgICAgIHRoaXMucGJNZXNzYWdlTmFtZSA9IFBCTWVzc2FnZU5hbWUuZ2V0TWFwKClcclxuICAgIH1cclxuICAgIHB1YmxpYyBjb25uZWN0KGhvc3Q6IHN0cmluZywgcG9ydDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51cmwgPSBob3N0LmNvbmNhdChwb3J0LnRvU3RyaW5nKCkpXHJcbiAgICAgICAgdGhpcy5jb25uZWN0QnlVcmwodGhpcy51cmwpXHJcbiAgICB9XHJcbiAgICAvL1wid3M6Ly9sb2NhbGhvc3Q6ODk4OVwiXHJcbiAgICBwdWJsaWMgY29ubmVjdEJ5VXJsKHVybDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51cmwgPSB1cmxcclxuICAgICAgICB0aGlzLnNvY2tldCA9IG5ldyBMYXlhLlNvY2tldCgpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQuZW5kaWFuID0gTGF5YS5CeXRlLkxJVFRMRV9FTkRJQU4vL+i/memHjOaIkeS7rOmHh+eUqOWwj+err1xyXG4gICAgICAgIHRoaXMuc29ja2V0LmNvbm5lY3RCeVVybCh1cmwpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oTGF5YS5FdmVudC5PUEVOLCB0aGlzLCB0aGlzLm9wZW5IYW5kbGVyKVxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKExheWEuRXZlbnQuTUVTU0FHRSwgdGhpcywgdGhpcy5yZWNlaXZlSGFuZGxlcilcclxuICAgICAgICB0aGlzLnNvY2tldC5vbihMYXlhLkV2ZW50LkNMT1NFLCB0aGlzLCB0aGlzLmNsb3NlSGFuZGxlcilcclxuICAgICAgICB0aGlzLnNvY2tldC5vbihMYXlhLkV2ZW50LkVSUk9SLCB0aGlzLCB0aGlzLmVycm9ySGFuZGxlcilcclxuICAgIH1cclxuICAgIHB1YmxpYyByZUNvbm5lY3QoKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQuY2xlYW5Tb2NrZXQoKVxyXG4gICAgICAgIHRoaXMuY29ubmVjdEJ5VXJsKHRoaXMudXJsKVxyXG4gICAgfVxyXG4gICAgcHVibGljIGRpc0Nvbm5lY3QoKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQuY2xvc2UoKVxyXG4gICAgfVxyXG4gICAgLy/mmK/lkKbov57mjqVcclxuICAgIHB1YmxpYyBjb25uZWN0ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ja2V0LmNvbm5lY3RlZFxyXG4gICAgfVxyXG4gICAgLy/mraPnoa7lu7rnq4vov57mjqVcclxuICAgIHByaXZhdGUgb3BlbkhhbmRsZXIoZXZlbnQ6IGFueSA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMudXJsICsgdGhpcy50aXBzICsgXCIgIOato+ehruW7uueri+i/nuaOpVwiKVxyXG4gICAgfVxyXG4gICAgLy/lhbPpl63ov57mjqXkuovku7ZcclxuICAgIHByaXZhdGUgY2xvc2VIYW5kbGVyKGV2ZW50OiBhbnkgPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy51cmwgKyB0aGlzLnRpcHMgKyBcIiDlhbPpl63ov57mjqXkuovku7ZcIilcclxuICAgIH1cclxuICAgIC8v6L+e5o6l5Ye66ZSZXHJcbiAgICBwcml2YXRlIGVycm9ySGFuZGxlcihlOiBhbnkgPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy51cmwgKyB0aGlzLnRpcHMgKyBcIiDov57mjqXlh7rplJlcIilcclxuICAgIH1cclxuXHJcbiAgICAvL+WPkemAgeepuua2iOaBr1xyXG4gICAgcHVibGljIHNlbmRFbXB0eShtc2dJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgLy8g5YaZ5YWl5LiA5Liq5pWw5a2XMFxyXG4gICAgICAgIHRoaXMudGVtcEJ5dGVzLndyaXRlRmxvYXQzMigwKVxyXG4gICAgICAgIHRoaXMuc2VuZChtc2dJZCwgdGhpcy50ZW1wQnl0ZXMpXHJcbiAgICAgICAgdGhpcy50ZW1wQnl0ZXMuY2xlYXIoKVxyXG4gICAgfVxyXG5cclxuICAgIC8v5Y+R6YCB5a2X56ym5Liy5qC85byPXHJcbiAgICBwdWJsaWMgc2VuZFN0cmluZyhtc2dJZDogbnVtYmVyLCBjb250ZW50OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRlbXBCeXRlcy53cml0ZVVURlN0cmluZyhjb250ZW50KVxyXG4gICAgICAgIHRoaXMuc2VuZChtc2dJZCwgdGhpcy50ZW1wQnl0ZXMpXHJcbiAgICAgICAgLy/muIXpmaTmjonmlbDmja7vvIzmlrnkvr/kuIvmrKHor7vlhplcclxuICAgICAgICB0aGlzLnRlbXBCeXRlcy5jbGVhcigpXHJcbiAgICB9XHJcblxyXG4gICAgLy/lj5HpgIHmtojmga9cclxuICAgIHB1YmxpYyBzZW5kTWVzc2FnZShtc2dJZDogbnVtYmVyLCBtc2c6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBidWZmZXI6IFVpbnQ4QXJyYXkgPSB0aGlzLnNlcmlhbGl6ZShtc2dJZCwgbXNnKVxyXG4gICAgICAgIHRoaXMudGVtcEJ5dGVzLndyaXRlQXJyYXlCdWZmZXIoYnVmZmVyKVxyXG4gICAgICAgIHRoaXMuc2VuZChtc2dJZCwgdGhpcy50ZW1wQnl0ZXMpXHJcbiAgICAgICAgLy/muIXpmaTmjonmlbDmja7vvIzmlrnkvr/kuIvmrKHor7vlhplcclxuICAgICAgICB0aGlzLnRlbXBCeXRlcy5jbGVhcigpXHJcbiAgICB9XHJcblxyXG4gICAgLy/pnIDopoHlj5HpgIHnmoTmlbDmja5cclxuICAgIHByaXZhdGUgc2VuZChtc2dJZDogbnVtYmVyLCBieXRlOiBMYXlhLkJ5dGUpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuc29ja2V0LmNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbm5lY3RlZDpcIiArIHRoaXMuc29ja2V0LmNvbm5lY3RlZClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vV0VCUEFDS19IRUFEX09GRlNFVFxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLndyaXRlRmxvYXQ2NChOZXR3b3JrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJvbGVJZCgpKVxyXG4gICAgICAgIC8vV0VCUEFDS19NRVNTU0FHRUlEX09GRlNFVFxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLndyaXRlSW50MzIobXNnSWQpXHJcbiAgICAgICAgLy9XRUJQQUNLX0xFTkdUSF9PRkZTRVRcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy53cml0ZUludDMyKHRoaXMuV0VCUEFDS19IRUFEX1NJWkUgKyBieXRlLmxlbmd0aClcclxuICAgICAgICAvL01hc3NnZSBib2R5XHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMud3JpdGVBcnJheUJ1ZmZlcihieXRlLmJ1ZmZlcilcclxuICAgICAgICAvL+i/memHjOaYr+aKiuWtl+iKguaVsOe7hOeahOaVsOaNrumAmui/h3NvY2tldOWPkemAgee7meacjeWKoeWZqFxyXG4gICAgICAgIHRoaXMuc29ja2V0LnNlbmQodGhpcy5zZW5kQnl0ZXMuYnVmZmVyKVxyXG4gICAgICAgIC8v5riF6Zmk5o6J5pWw5o2u77yM5pa55L6/5LiL5qyh6K+75YaZXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMuY2xlYXIoKVxyXG4gICAgfVxyXG5cclxuICAgIC8v5o6l5pS25Yiw5pWw5o2uXHJcbiAgICBwcml2YXRlIHJlY2VpdmVIYW5kbGVyKG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIk1lc3NhZ2UgZnJvbSBzZXJ2ZXI6ICBcIiArIG5ldyBMYXlhLkJ5dGUobXNnKS5yZWFkVVRGQnl0ZXMoKSlcclxuICAgICAgICB2YXIgbmV0UGFja2V0OiBOZXRQYWNrZXQgPSBuZXcgTmV0UGFja2V0KHRoaXMpXHJcbiAgICAgICAgbmV0UGFja2V0LnJlY2VpdmVNc2cobXNnKVxyXG4gICAgICAgIHRoaXMuc29ja2V0LmlucHV0LmNsZWFyKClcclxuICAgICAgICBOZXRFdmVudERpc3BhdGNoZXIuZ2V0SW5zdGFuY2UoKS5EaXNwYXRjaChuZXRQYWNrZXQubWVzc2FnZUlkLCBuZXRQYWNrZXQpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDluo/liJfljJYgcHJvdG9jb2wtYnVmZmVyXHJcbiAgICAgKiBAcGFyYW0gbWFzc2FnZUlkIFxyXG4gICAgICogQHBhcmFtIG1hc3NhZ2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlcmlhbGl6ZShtYXNzYWdlSWQ6IG51bWJlciwgbWFzc2FnZTogYW55KTogVWludDhBcnJheSB7XHJcbiAgICAgICAgbGV0IG1hc3NhZ2VOYW1lOiBzdHJpbmcgPSB0aGlzLnBiTWVzc2FnZU5hbWVbbWFzc2FnZUlkXVxyXG4gICAgICAgIC8vIEVuY29kZSBhIG1lc3NhZ2UgdG8gYW4gVWludDhBcnJheSAoYnJvd3Nlcikgb3IgQnVmZmVyIChub2RlKVxyXG4gICAgICAgIHZhciBidWZmZXI6IGFueSA9IHRoaXMucHJvdG9Sb290W21hc3NhZ2VOYW1lXS5lbmNvZGUobWFzc2FnZSkuZmluaXNoKCk7XHJcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+N5bqP5YiX5YyWIHByb3RvY29sLWJ1ZmZlclxyXG4gICAgICogQHBhcmFtIG1hc3NhZ2VOYW1lIFxyXG4gICAgICogQHBhcmFtIG5ldFBhY2thZ2UgTmV0UGFja2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVzZXJpYWxpemUobWFzc2FnZUlkOiBudW1iZXIsIG1hc3NhZ2U6IFVpbnQ4QXJyYXkpOiBhbnkge1xyXG4gICAgICAgIGxldCBtYXNzYWdlTmFtZTogc3RyaW5nID0gdGhpcy5wYk1lc3NhZ2VOYW1lW21hc3NhZ2VJZF1cclxuICAgICAgICAvLyBEZWNvZGUgYW4gVWludDhBcnJheSAoYnJvd3Nlcikgb3IgQnVmZmVyIChub2RlKSB0byBhIG1lc3NhZ2VcclxuICAgICAgICB2YXIgbWVzc2FnZTogYW55ID0gdGhpcy5wcm90b1Jvb3RbbWFzc2FnZU5hbWVdLmRlY29kZShtYXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgIH1cclxuXHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cclxuaW1wb3J0IE1haW5VSSBmcm9tIFwiLi9zY3JpcHQvTWFpblVJXCJcbmltcG9ydCBUZXN0XzlfVGltZUxpbmVVSSBmcm9tIFwiLi9zdHVkeS9UZXN0XzlfVGltZUxpbmVVSVwiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj02NDA7XHJcbiAgICBzdGF0aWMgaGVpZ2h0Om51bWJlcj0xMTM2O1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJmaXhlZGhlaWdodFwiO1xyXG4gICAgc3RhdGljIHNjcmVlbk1vZGU6c3RyaW5nPVwiaG9yaXpvbnRhbFwiO1xyXG4gICAgc3RhdGljIGFsaWduVjpzdHJpbmc9XCJ0b3BcIjtcclxuICAgIHN0YXRpYyBhbGlnbkg6c3RyaW5nPVwibGVmdFwiO1xyXG4gICAgc3RhdGljIHN0YXJ0U2NlbmU6YW55PVwiTWFpblNjZW5lLnNjZW5lXCI7XHJcbiAgICBzdGF0aWMgc2NlbmVSb290OnN0cmluZz1cIlwiO1xyXG4gICAgc3RhdGljIGRlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgc3RhdDpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHBoeXNpY3NEZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIGV4cG9ydFNjZW5lVG9Kc29uOmJvb2xlYW49dHJ1ZTtcclxuICAgIGNvbnN0cnVjdG9yKCl7fVxyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICB2YXIgcmVnOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuICAgICAgICByZWcoXCJzY3JpcHQvTWFpblVJLnRzXCIsTWFpblVJKTtcbiAgICAgICAgcmVnKFwic3R1ZHkvVGVzdF85X1RpbWVMaW5lVUkudHNcIixUZXN0XzlfVGltZUxpbmVVSSk7XHJcbiAgICB9XHJcbn1cclxuR2FtZUNvbmZpZy5pbml0KCk7IiwiaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi4vdWkvbGF5YU1heFVJXCI7XHJcbmltcG9ydCBOZXR3b3JrTWFuYWdlciBmcm9tIFwiLi4vRnJhbWV3b3JrL05ldHdvcmsvTmV0d29ya01hbmFnZXJcIjtcclxuaW1wb3J0IENsaWVudE1hbmFnZXIgZnJvbSBcIi4uL0ZyYW1ld29yay9OZXR3b3JrL0NsaWVudE1hbmFnZXJcIjtcclxuaW1wb3J0IE5ldEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vRnJhbWV3b3JrL0V2ZW50L05ldEV2ZW50RGlzcGF0Y2hlclwiO1xyXG5pbXBvcnQgTmV0UGFja2V0IGZyb20gXCIuLi9GcmFtZXdvcmsvTmV0d29yay9OZXRQYWNrZXRcIjtcclxuXHJcblxyXG4vL+S4u+eVjOmdolxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluVUkgZXh0ZW5kcyB1aS5NYWluU2NlbmVVSSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IHN1cGVyKCk7IH1cclxuXHJcbiAgICBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1haW5VSS5vbkVuYWJsZVwiKVxyXG5cclxuICAgICAgICBOZXRFdmVudERpc3BhdGNoZXIuZ2V0SW5zdGFuY2UoKS5SZWdpc3Rlck1lc3NhZ2UoR2FtZU1lc3NhZ2UuR01fVkVSU0lPTl9SRVRVUk4sIHRoaXMuR01fVmVyaWZ5VmVyc2lvblJldHVybilcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNYWluVUkub25EaXNhYmxlXCIpXHJcbiAgICAgICAgXHJcbiAgICAgICAgTmV0RXZlbnREaXNwYXRjaGVyLmdldEluc3RhbmNlKCkuVW5SZWdpc3Rlck1lc3NhZ2UoR2FtZU1lc3NhZ2UuR01fVkVSU0lPTl9SRVRVUk4sIHRoaXMuR01fVmVyaWZ5VmVyc2lvblJldHVybilcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBHTV9WZXJpZnlWZXJzaW9uUmV0dXJuKG5ldFBhY2thZ2U6TmV0UGFja2V0KTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5ldFBhY2thZ2UubWVzc2FnZUlkICsgXCIgIFwiICsgbmV0UGFja2FnZS5tZXNzYWdlKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkF3YWtlKCk6IHZvaWQge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlByZWNpc2lvbiBzYWZlLlwiICsgKE1hdGgucG93KDIsIDUzKSAtIDEpKTtcclxuICAgICAgICBcclxuICAgICAgICBDbGllbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlQ2xpZW50KDAsIFwid3M6Ly8xOTIuMTY4LjIuMTI2OjUwMDAwXCIpO1xyXG5cclxuICAgICAgICAvL+WumuaXtuaJp+ihjOS4gOasoSjpl7TpmpTml7bpl7QpXHJcbiAgICAgICAgTGF5YS50aW1lci5vbmNlKDIwMDAsIHRoaXMsIHRoaXMudGVzdE5ldHdvcmspO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdGVzdE5ldHdvcmsoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0ZXN0TmV0d29yaygpXCIpO1xyXG4gICAgICAgIHZhciBtc2cgPSB7XHJcbiAgICAgICAgICAgIHZlcnNpb246IFwiMS41LjRcIixcdFx0XHRcdC8v5a6i5oi356uv54mI5pys5Y+3XHJcbiAgICAgICAgICAgIHBsYXRmb3JtOiA5MDA3MTk5MjU0NzQwOTkxLCAgICAgICAgICAgICAvLy/lubPlj7BcclxuICAgICAgICAgICAgaXN0ZXN0OiAwLC8vLyAgICAw44CB5q2j5bi477yMMeOAgea1i+ivle+8jOS4jemcgOimgemqjOivgeeJiOacrFxyXG4gICAgICAgIH1cclxuICAgICAgICBOZXR3b3JrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvZ2luU2VuZE1lc3NhZ2UoR2FtZU1lc3NhZ2UuR01fVkVSSUZZX1ZFUlNJT04sICBtc2cpO1xyXG4gICAgfVxyXG59IiwiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdF85X1RpbWVMaW5lVUlcclxue1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy/liqDovb3lm77pm4bmiJDlip/lkI7vvIzmiafooYxvbkxvYWTlm57osIPmlrnms5VcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKFwicmVzL2F0bGFzL3Rlc3QuYXRsYXNcIixMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbkxvYWRlZCkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIG9uTG9hZGVkKCk6dm9pZHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWKoOi9veWbvumbhuaIkOWKn+WQju+8jOaJp+ihjG9uTG9hZOWbnuiwg+aWueazlVwiKVxyXG4gICAgICAgIC8v5Yib5bu65LiA5LiqVUnlrp7kvotcclxuICAgICAgICAvL3ZhciBwbGFuOlRpbWVMaW5lVUkgPSBuZXcgVGltZUxpbmVVSSgpXHJcbiAgICAgICAgLy/mt7vliqDliLDoiJ7lj7BcclxuICAgICAgICAvL0xheWEuc3RhZ2UuYWRkQ2hpbGQocGxhbik7XHJcbiAgICAgICAgLy/mkq3mlL5VSeWcuuaZr+S4reeahOWKqOeUu1xyXG4gICAgICAgIC8vdGhpcy5iZWFyLnBsYXkoKTtcclxuICAgIH1cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xuaW1wb3J0IFZpZXc9TGF5YS5WaWV3O1xyXG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xyXG5pbXBvcnQgU2NlbmU9TGF5YS5TY2VuZTtcbnZhciBSRUc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xuZXhwb3J0IG1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgTWFpblNjZW5lVUkgZXh0ZW5kcyBTY2VuZSB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIk1haW5TY2VuZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5NYWluU2NlbmVVSVwiLE1haW5TY2VuZVVJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBUaW1lTGluZVVJIGV4dGVuZHMgRGlhbG9nIHtcclxuXHRcdHB1YmxpYyBiZWFyOkxheWEuQW5pbWF0aW9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiVGltZUxpbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuVGltZUxpbmVVSVwiLFRpbWVMaW5lVUkpO1xyXG59XHIiXX0=
