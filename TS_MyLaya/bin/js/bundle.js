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
        //销毁当前没有被使用的资源,该函数会忽略lock=true的资源。
        Laya.Resource.destroyUnusedResources();
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
        if (msgId > 199 /* GM_ACCOUNT_SERVER_MESSAGE_START */ && msgId < 399 /* GM_ACCOUNT_SERVER_MESSAGE_END */) {
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
var PBName = /** @class */ (function () {
    function PBName() {
    }
    PBName.getMap = function () {
        if (PBName.isInit) {
            return PBName.messageMap;
        }
        PBName.isInit = true;
        //MessageName
        var map = PBName.messageMap;
        map[210 /* GM_VERIFY_VERSION */] = 'GM_VerifyVersion';
        map[211 /* GM_VERSION_RETURN */] = 'GM_VerifyVersionReturn';
        return map;
    };
    PBName.messageMap = {};
    PBName.isInit = false;
    return PBName;
}());
exports.default = PBName;
},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetEventDispatcher_1 = require("../Event/NetEventDispatcher");
var NetPacket_1 = require("./NetPacket");
var NetworkManager_1 = require("./NetworkManager");
var PBName_1 = require("./PBName");
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
        this.pbMessageName = PBName_1.default.getMap();
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
},{"../Event/NetEventDispatcher":2,"./NetPacket":4,"./NetworkManager":5,"./PBName":6}],8:[function(require,module,exports){
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
        console.log(211 /* GM_VERSION_RETURN */.toString());
        NetEventDispatcher_1.default.getInstance().RegisterMessage(211 /* GM_VERSION_RETURN */, this.GM_VerifyVersionReturn); //
    };
    MainUI.prototype.onDisable = function () {
        console.log("MainUI.onDisable");
        NetEventDispatcher_1.default.getInstance().UnRegisterMessage(211 /* GM_VERSION_RETURN */, this.GM_VerifyVersionReturn); //
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
        NetworkManager_1.default.getInstance().loginSendMessage(210 /* GM_VERIFY_VERSION */, msg);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkc6L0xheWFQcm9qZWN0L0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQXBwTWFpbi50cyIsInNyYy9GcmFtZXdvcmsvRXZlbnQvTmV0RXZlbnREaXNwYXRjaGVyLnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL0NsaWVudE1hbmFnZXIudHMiLCJzcmMvRnJhbWV3b3JrL05ldHdvcmsvTmV0UGFja2V0LnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL05ldHdvcmtNYW5hZ2VyLnRzIiwic3JjL0ZyYW1ld29yay9OZXR3b3JrL1BCTmFtZS50cyIsInNyYy9GcmFtZXdvcmsvTmV0d29yay9Tb2NrZXRDb25uZWN0LnRzIiwic3JjL0dhbWVDb25maWcudHMiLCJzcmMvc2NyaXB0L01haW5VSS50cyIsInNyYy9zdHVkeS9UZXN0XzlfVGltZUxpbmVVSS50cyIsInNyYy91aS9sYXlhTWF4VUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDUkEsSUFBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtBQWtCekIsMkNBQXNDO0FBT3RDLEtBQUs7QUFDTDtJQUNJO1FBQ0ksZ0JBQWdCO1FBQ2hCLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQVUsQ0FBQyxLQUFLLEVBQUUsb0JBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwRDthQUNJO1lBQ0QsdUJBQXVCO1lBQ3ZCLDhEQUE4RDtZQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFVLENBQUMsS0FBSyxFQUFFLG9CQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ2pFO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBR2xELG9EQUFvRDtRQUNwRCxJQUFJLG9CQUFVLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU07WUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM5RixJQUFJLG9CQUFVLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztZQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzNGLElBQUksb0JBQVUsQ0FBQyxJQUFJO1lBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV0QyxrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUU3QixnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBR3BJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztRQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxvQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBLHVDQUF1QztRQUNuRixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxvQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFBLDJDQUEyQztRQUN6RixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFFL0Isb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsb0JBQVUsQ0FBQyxpQkFBaUIsQ0FBQztRQUUxRCxnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUV4QyxvQkFBb0I7UUFDcEIsMEJBQTBCO1FBRTFCLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELGlDQUFlLEdBQWY7UUFDSSwrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDcEcsQ0FBQztJQUVELGdDQUFjLEdBQWQ7UUFDSSxZQUFZO1FBQ1osb0JBQVUsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsb0JBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVoRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVPLHVCQUFLLEdBQWI7UUFDSSxvQkFBb0I7UUFDcEIseUJBQXlCO1FBQ3pCLDBCQUEwQjtRQUMxQixxQ0FBcUM7UUFDckMsc0NBQXNDO1FBQ3RDLHFDQUFxQztRQUNyQyxzQ0FBc0M7UUFDdEMsd0JBQXdCO1FBQ3hCLDZCQUE2QjtRQUM3Qiw0QkFBNEI7UUFDNUIsbUNBQW1DO1FBQ25DLDRCQUE0QjtRQUM1Qix5QkFBeUI7UUFDekIsd0JBQXdCO1FBQ3hCLDBCQUEwQjtRQUMxQixzQkFBc0I7UUFDdEIsd0JBQXdCO1FBQ3hCLHNDQUFzQztJQUMxQyxDQUFDO0lBQ0wsY0FBQztBQUFELENBL0VBLEFBK0VDLElBQUE7QUFFRCxPQUFPO0FBQ1AsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7OztBQzlHZDtJQVFJO1FBRlEsb0JBQWUsR0FBcUMsRUFBRSxDQUFBO0lBRXRDLENBQUM7SUFOWCw4QkFBVyxHQUF6QjtRQUNJLE9BQU8sa0JBQWtCLENBQUMsUUFBUSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO0lBQ25HLENBQUM7SUFNTSw0Q0FBZSxHQUF0QixVQUF1QixTQUFpQixFQUFFLEdBQWE7UUFDbkQsSUFBSSxJQUFJLEdBQW9CLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLElBQUksR0FBRyxJQUFJLEtBQUssRUFBWSxDQUFDO1lBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBQ00sOENBQWlCLEdBQXhCLFVBQXlCLFNBQWlCLEVBQUUsR0FBYTtRQUNyRCxJQUFJLElBQUksR0FBb0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1RCxJQUFJLElBQUksRUFBRTtZQUNOLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBQ00scUNBQVEsR0FBZixVQUFnQixTQUFpQixFQUFFLFVBQWU7UUFDOUMsSUFBSSxJQUFJLEdBQW9CLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUQsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztnQkFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUE7WUFDckMsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFDTSxxQ0FBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUE7SUFDN0IsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FwQ0EsQUFvQ0MsSUFBQTs7Ozs7QUNwQ0QsaURBQTRDO0FBRTVDLGtIQUFrSDtBQUdsSCxJQUFLLFFBS0o7QUFMRCxXQUFLLFFBQVE7SUFDVCx5Q0FBUyxDQUFBO0lBQ1QseUNBQUssQ0FBQTtJQUNMLHlDQUFLLENBQUE7SUFDTCxtREFBVSxDQUFBO0FBQ2QsQ0FBQyxFQUxJLFFBQVEsS0FBUixRQUFRLFFBS1o7QUFHRDtJQUlJLG9CQUFZLEVBQVk7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVNLDRCQUFPLEdBQWQsVUFBZSxJQUFZLEVBQUUsSUFBWTtRQUNyQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksdUJBQWEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0saUNBQVksR0FBbkIsVUFBb0IsR0FBVztRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksdUJBQWEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSw4QkFBUyxHQUFoQjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVNLCtCQUFVLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRU0sZ0NBQVcsR0FBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVNLDhCQUFTLEdBQWhCLFVBQWlCLEtBQWE7UUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLGdDQUFXLEdBQWxCLFVBQW1CLEtBQWEsRUFBRSxHQUFRO1FBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQXJDQSxBQXFDQyxJQUFBO0FBR0Q7SUFRSTtRQVBRLGtCQUFhLEdBQXFDLEVBQUUsQ0FBQztJQU9yQyxDQUFDO0lBSlgseUJBQVcsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBSU0sb0NBQVksR0FBbkIsVUFBb0IsUUFBZ0IsRUFBRSxHQUFXO1FBQzdDLElBQUksTUFBTSxHQUFlLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQzVDLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFDTSxtQ0FBVyxHQUFsQixVQUFtQixRQUFrQjtRQUNqQyxJQUFJLE1BQU0sR0FBZSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN2RCxJQUFJLE1BQU0sRUFBRTtZQUNSLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQTtTQUN0QjtJQUNMLENBQUM7SUFDTSxpQ0FBUyxHQUFoQixVQUFpQixRQUFrQjtRQUMvQixJQUFJLE1BQU0sR0FBZSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN2RCxJQUFJLE1BQU0sRUFBRTtZQUNSLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQTtTQUNyQjtJQUNMLENBQUM7SUFDTSxpQ0FBUyxHQUFoQixVQUFpQixRQUFrQjtRQUMvQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2QztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSx3Q0FBZ0IsR0FBdkIsVUFBd0IsS0FBYSxFQUFFLEdBQWM7UUFDakQsSUFBSSxNQUFNLEdBQWUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDdkQsSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtTQUNqQztJQUNMLENBQUM7SUFDTSx3Q0FBZ0IsR0FBdkIsVUFBd0IsS0FBYSxFQUFFLEdBQWM7UUFDakQsSUFBSSxNQUFNLEdBQWUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDdkQsSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtTQUNqQztJQUNMLENBQUM7SUFDTSx3Q0FBZ0IsR0FBdkIsVUFBd0IsS0FBYSxFQUFFLEdBQWM7UUFDakQsSUFBSSxNQUFNLEdBQWUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDdkQsSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtTQUNqQztJQUNMLENBQUM7SUFDTSx3Q0FBZ0IsR0FBdkIsVUFBd0IsS0FBYTtRQUNqQyxJQUFJLE1BQU0sR0FBZSxJQUFJLENBQUM7UUFDOUIsSUFBSSxLQUFLLDRDQUF1QyxJQUFJLEtBQUssMENBQXFDLEVBQUU7WUFDNUYsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQzFDO2FBQ0k7WUFDRCxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDMUM7UUFDRCxJQUFJLE1BQU0sRUFBRTtZQUNSLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDMUI7SUFDTCxDQUFDO0lBRU0sMENBQWtCLEdBQXpCO1FBQ0ksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQTtRQUM1QixLQUFLLElBQU0sR0FBRyxJQUFJLEdBQUcsRUFBRTtZQUNuQixJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3pCLElBQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDekIsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3hCO1NBQ0o7UUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQTtJQUMzQixDQUFDO0lBekVjLHNCQUFRLEdBQWtCLElBQUksQ0FBQztJQTJFbEQsb0JBQUM7Q0E3RUQsQUE2RUMsSUFBQTtrQkE3RW9CLGFBQWE7Ozs7QUNyRGxDLElBQU8sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUE7QUFFdkI7SUFhSSxtQkFBWSxPQUFZO1FBWnhCLHFFQUFxRTtRQUNyRSx1REFBdUQ7UUFDdkQsb0RBQW9EO1FBQzdDLHNCQUFpQixHQUFXLEVBQUUsQ0FBQSxDQUFDLFdBQVc7UUFVN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUE7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFBLENBQUEsVUFBVTtJQUM3RCxDQUFDO0lBRUQsU0FBUztJQUNGLDhCQUFVLEdBQWpCLFVBQWtCLEtBQVU7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUEsQ0FBQSxRQUFRO1FBRTlCLHFCQUFxQjtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQzFDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDekMsNkVBQTZFO1FBQzdFLGlDQUFpQztRQUNqQyx1RUFBdUU7UUFDdkUsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUMxRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFFekUsMkNBQTJDO1FBQzNDLDZCQUE2QjtRQUM3QixHQUFHO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQXhDQSxBQXdDQyxJQUFBOzs7OztBQzFDRCxpREFBNEM7QUFFNUM7SUFPSTtJQUF3QixDQUFDO0lBSlgsMEJBQVcsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBSUQ7O09BRUc7SUFDSSxrQ0FBUyxHQUFoQjtRQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLHlDQUFnQixHQUF2QixVQUF3QixLQUFhLEVBQUUsT0FBWTtRQUMvQyx1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRU0seUNBQWdCLEdBQXZCLFVBQXdCLEtBQWEsRUFBRSxPQUFZO1FBQy9DLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFTSx5Q0FBZ0IsR0FBdkIsVUFBd0IsS0FBYSxFQUFFLE9BQVk7UUFDL0MsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FqQ0EsQUFpQ0MsSUFBQTs7Ozs7QUNsQ0Q7O0dBRUc7QUFDSDtJQUFBO0lBaUJBLENBQUM7SUFkVSxhQUFNLEdBQWI7UUFDSSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUM7WUFDZCxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUE7U0FDM0I7UUFDRCxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtRQUVwQixhQUFhO1FBQ2IsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQTtRQUUzQixHQUFHLDZCQUF3QixHQUFDLGtCQUFrQixDQUFDO1FBQy9DLEdBQUcsNkJBQXdCLEdBQUMsd0JBQXdCLENBQUM7UUFFckQsT0FBTyxHQUFHLENBQUE7SUFDZCxDQUFDO0lBZk0saUJBQVUsR0FBRyxFQUFFLENBQUE7SUFDZixhQUFNLEdBQUcsS0FBSyxDQUFBO0lBZXpCLGFBQUM7Q0FqQkQsQUFpQkMsSUFBQTtrQkFqQm9CLE1BQU07Ozs7QUNKM0Isa0VBQTREO0FBQzVELHlDQUFtQztBQUNuQyxtREFBNkM7QUFDN0MsbUNBQXFDO0FBR3JDO0lBaUJJLGdEQUFnRDtJQUNoRCxtREFBbUQ7SUFFbkQsdUJBQVksSUFBWTtRQWxCeEIscUVBQXFFO1FBQ3JFLHVEQUF1RDtRQUN2RCxvREFBb0Q7UUFDNUMsc0JBQWlCLEdBQVcsRUFBRSxDQUFBLENBQUMsV0FBVztRQUczQyxXQUFNLEdBQWdCLElBQUksQ0FBQTtRQUN6QixjQUFTLEdBQWMsSUFBSSxDQUFBO1FBQzNCLGNBQVMsR0FBYyxJQUFJLENBQUE7UUFDM0IsY0FBUyxHQUFjLElBQUksQ0FBQTtRQUMzQixRQUFHLEdBQVcsSUFBSSxDQUFBO1FBQ2xCLFNBQUksR0FBVyxJQUFJLENBQUE7UUFDbkIsa0JBQWEsR0FBUSxJQUFJLENBQUE7UUFDekIsY0FBUyxHQUFRLElBQUksQ0FBQztRQU0xQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFBLENBQUEsVUFBVTtRQUN6RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFBLENBQUEsVUFBVTtRQUV6RCxzREFBc0Q7UUFDdEQseURBQXlEO1FBRXpELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDakQsSUFBSSxDQUFDLGFBQWEsR0FBRyxnQkFBYSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQy9DLENBQUM7SUFDTSwrQkFBTyxHQUFkLFVBQWUsSUFBWSxFQUFFLElBQVk7UUFDckMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFDRCx1QkFBdUI7SUFDaEIsb0NBQVksR0FBbkIsVUFBb0IsR0FBVztRQUMzQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtRQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUEsQ0FBQSxVQUFVO1FBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUM3RCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3pELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDN0QsQ0FBQztJQUNNLGlDQUFTLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBQ00sa0NBQVUsR0FBakI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ3ZCLENBQUM7SUFDRCxNQUFNO0lBQ0MsaUNBQVMsR0FBaEI7UUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFBO0lBQ2hDLENBQUM7SUFDRCxRQUFRO0lBQ0EsbUNBQVcsR0FBbkIsVUFBb0IsS0FBaUI7UUFBakIsc0JBQUEsRUFBQSxZQUFpQjtRQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQTtJQUNsRCxDQUFDO0lBQ0QsUUFBUTtJQUNBLG9DQUFZLEdBQXBCLFVBQXFCLEtBQWlCO1FBQWpCLHNCQUFBLEVBQUEsWUFBaUI7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUE7SUFDakQsQ0FBQztJQUNELE1BQU07SUFDRSxvQ0FBWSxHQUFwQixVQUFxQixDQUFhO1FBQWIsa0JBQUEsRUFBQSxRQUFhO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFBO0lBQy9DLENBQUM7SUFFRCxPQUFPO0lBQ0EsaUNBQVMsR0FBaEIsVUFBaUIsS0FBYTtRQUMxQixVQUFVO1FBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDMUIsQ0FBQztJQUVELFNBQVM7SUFDRixrQ0FBVSxHQUFqQixVQUFrQixLQUFhLEVBQUUsT0FBZTtRQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDaEMsY0FBYztRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDMUIsQ0FBQztJQUVELE1BQU07SUFDQyxtQ0FBVyxHQUFsQixVQUFtQixLQUFhLEVBQUUsR0FBUTtRQUN0QyxJQUFJLE1BQU0sR0FBZSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNoQyxjQUFjO1FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0lBRUQsU0FBUztJQUNELDRCQUFJLEdBQVosVUFBYSxLQUFhLEVBQUUsSUFBZTtRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUNqRCxPQUFNO1NBQ1Q7UUFDRCxxQkFBcUI7UUFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFBO1FBQ3JFLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNoQyx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMvRCxhQUFhO1FBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDNUMsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDdkMsY0FBYztRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDMUIsQ0FBQztJQUVELE9BQU87SUFDQyxzQ0FBYyxHQUF0QixVQUF1QixHQUFRO1FBQzNCLDJFQUEyRTtRQUMzRSxJQUFJLFNBQVMsR0FBYyxJQUFJLG1CQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDOUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUN6Qiw0QkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUM3RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGlDQUFTLEdBQWhCLFVBQWlCLFNBQWlCLEVBQUUsT0FBWTtRQUM1QyxJQUFJLFdBQVcsR0FBVyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3ZELCtEQUErRDtRQUMvRCxJQUFJLE1BQU0sR0FBUSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN2RSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNJLG1DQUFXLEdBQWxCLFVBQW1CLFNBQWlCLEVBQUUsT0FBbUI7UUFDckQsSUFBSSxXQUFXLEdBQVcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN2RCwrREFBK0Q7UUFDL0QsSUFBSSxPQUFPLEdBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0QsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVMLG9CQUFDO0FBQUQsQ0FySkEsQUFxSkMsSUFBQTs7Ozs7QUMzSkQsZ0dBQWdHO0FBQ2hHLDBDQUFvQztBQUNwQywrREFBeUQ7QUFDekQ7O0VBRUU7QUFDRjtJQWFJO0lBQWMsQ0FBQztJQUNSLGVBQUksR0FBWDtRQUNJLElBQUksR0FBRyxHQUFhLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQzdDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBQyxnQkFBTSxDQUFDLENBQUM7UUFDL0IsR0FBRyxDQUFDLDRCQUE0QixFQUFDLDJCQUFpQixDQUFDLENBQUM7SUFDeEQsQ0FBQztJQWpCTSxnQkFBSyxHQUFRLEdBQUcsQ0FBQztJQUNqQixpQkFBTSxHQUFRLElBQUksQ0FBQztJQUNuQixvQkFBUyxHQUFRLGFBQWEsQ0FBQztJQUMvQixxQkFBVSxHQUFRLFlBQVksQ0FBQztJQUMvQixpQkFBTSxHQUFRLEtBQUssQ0FBQztJQUNwQixpQkFBTSxHQUFRLE1BQU0sQ0FBQztJQUNyQixxQkFBVSxHQUFLLGlCQUFpQixDQUFDO0lBQ2pDLG9CQUFTLEdBQVEsRUFBRSxDQUFDO0lBQ3BCLGdCQUFLLEdBQVMsS0FBSyxDQUFDO0lBQ3BCLGVBQUksR0FBUyxLQUFLLENBQUM7SUFDbkIsdUJBQVksR0FBUyxLQUFLLENBQUM7SUFDM0IsNEJBQWlCLEdBQVMsSUFBSSxDQUFDO0lBTzFDLGlCQUFDO0NBbkJELEFBbUJDLElBQUE7a0JBbkJvQixVQUFVO0FBb0IvQixVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7QUMxQmxCLDZDQUFxQztBQUNyQyxzRUFBaUU7QUFDakUsb0VBQStEO0FBQy9ELDRFQUF1RTtBQUl2RSxLQUFLO0FBQ0w7SUFBb0MsMEJBQWM7SUFFOUM7ZUFBZ0IsaUJBQU87SUFBRSxDQUFDO0lBRTFCLHlCQUFRLEdBQVI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFFOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBdUIsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUUvQyw0QkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLDhCQUF5QixJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQSxDQUFBLEVBQUU7SUFDM0csQ0FBQztJQUVELDBCQUFTLEdBQVQ7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFFL0IsNEJBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLDhCQUF5QixJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQSxDQUFBLEVBQUU7SUFDN0csQ0FBQztJQUdPLHVDQUFzQixHQUE5QixVQUErQixVQUFvQjtRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNqRSxDQUFDO0lBR0Qsd0JBQU8sR0FBUDtRQUVJLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZELHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1FBRXhFLGNBQWM7UUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU8sNEJBQVcsR0FBbkI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdCLElBQUksR0FBRyxHQUFHO1lBQ04sT0FBTyxFQUFFLE9BQU87WUFDaEIsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixNQUFNLEVBQUUsQ0FBQztTQUNaLENBQUE7UUFDRCx3QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQiw4QkFBMEIsR0FBRyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQTNDQSxBQTJDQyxDQTNDbUMsY0FBRSxDQUFDLFdBQVcsR0EyQ2pEOzs7OztBQ2hERDtJQUVJO1FBQ0ksc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRU8sb0NBQVEsR0FBaEI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUE7UUFDbkMsVUFBVTtRQUNWLHdDQUF3QztRQUN4QyxPQUFPO1FBQ1AsNEJBQTRCO1FBQzVCLFlBQVk7UUFDWixtQkFBbUI7SUFDdkIsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FoQkEsQUFnQkMsSUFBQTs7Ozs7QUNqQkQsSUFBTyxNQUFNLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUMxQixJQUFPLEtBQUssR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3hCLElBQUksR0FBRyxHQUFhLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO0FBQzdDLElBQWMsRUFBRSxDQWtCZjtBQWxCRCxXQUFjLEVBQUU7SUFDWjtRQUFpQywrQkFBSztRQUNsQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsb0NBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FOQSxBQU1DLENBTmdDLEtBQUssR0FNckM7SUFOWSxjQUFXLGNBTXZCLENBQUE7SUFDRCxHQUFHLENBQUMsZ0JBQWdCLEVBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEM7UUFBZ0MsOEJBQU07UUFFbEM7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLG1DQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFDTCxpQkFBQztJQUFELENBUEEsQUFPQyxDQVArQixNQUFNLEdBT3JDO0lBUFksYUFBVSxhQU90QixDQUFBO0lBQ0QsR0FBRyxDQUFDLGVBQWUsRUFBQyxVQUFVLENBQUMsQ0FBQztBQUNwQyxDQUFDLEVBbEJhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQWtCZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgQnJvd3NlciA9IExheWEuQnJvd3NlclxyXG5pbXBvcnQgV2ViR0wgPSBMYXlhLldlYkdMXHJcbmltcG9ydCBTdGFnZSA9IExheWEuU3RhZ2VcclxuXHJcbmltcG9ydCBUZXN0XzFfVGV4dCBmcm9tICcuL3N0dWR5L1Rlc3RfMV9UZXh0JztcclxuaW1wb3J0IFRlc3RfMl9JbnB1dFRlc3QgZnJvbSAnLi9zdHVkeS9UZXN0XzJfSW5wdXRUZXN0JztcclxuaW1wb3J0IFRlc3RfM19CaXRtYXBGb250IGZyb20gJy4vc3R1ZHkvVGVzdF8zX0JpdG1hcEZvbnQnO1xyXG5pbXBvcnQgVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8xX1Nwcml0ZV9EaXNwbGF5SW1hZ2UnO1xyXG5pbXBvcnQgVGVzdF80XzFfU3ByaXRlX1N3aXRjaFRleHR1cmUgZnJvbSAnLi9zdHVkeS9UZXN0XzRfMV9TcHJpdGVfU3dpdGNoVGV4dHVyZSc7XHJcbmltcG9ydCBUZXN0XzRfMl9TcHJpdGVfRGlzcGxheUltYWdlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzJfU3ByaXRlX0Rpc3BsYXlJbWFnZSc7XHJcbmltcG9ydCBUZXN0XzRfMl9TcHJpdGVfU3dpdGNoVGV4dHVyZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlJztcclxuaW1wb3J0IFRlc3RfNF9NYXNrRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfNF9NYXNrRGVtbyc7XHJcbmltcG9ydCBUZXN0XzVfMV9Db2xvckZpbHRlciBmcm9tICcuL3N0dWR5L1Rlc3RfNV8xX0NvbG9yRmlsdGVyJztcclxuaW1wb3J0IFRlc3RfNV8yX0dsb3dGaWx0ZXIgZnJvbSAnLi9zdHVkeS9UZXN0XzVfMl9HbG93RmlsdGVyJztcclxuaW1wb3J0IFRlc3RfNl8xX1Nwcml0ZV9EcmF3U2hhcGVzIGZyb20gJy4vc3R1ZHkvVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMnO1xyXG5pbXBvcnQgVGVzdF83X0F0bGFzQW5pRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfN19BdGxhc0FuaURlbW8nO1xyXG5pbXBvcnQgVGVzdF84X1R3ZWVuRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfOF9Ud2VlbkRlbW8nO1xyXG5pbXBvcnQgVGVzdF85X1RpbWVMaW5lIGZyb20gJy4vc3R1ZHkvVGVzdF85X1RpbWVMaW5lJztcclxuaW1wb3J0IFRlc3RfOV9UaW1lTGluZVVJIGZyb20gJy4vc3R1ZHkvVGVzdF85X1RpbWVMaW5lVUknO1xyXG5pbXBvcnQgVGVzdF8xMV9Tb3VuZCBmcm9tICcuL3N0dWR5L1Rlc3RfMTFfU291bmQnO1xyXG5pbXBvcnQgR2FtZUNvbmZpZyBmcm9tICcuL0dhbWVDb25maWcnO1xyXG5pbXBvcnQgVGVzdF8wXzFfQ2hhbm5lbCBmcm9tICcuL3N0dWR5L1Rlc3RfMF8xX0NoYW5uZWwnO1xyXG5pbXBvcnQgVGVzdF8wXzFfU29ja2V0IGZyb20gJy4vc3R1ZHkvVGVzdF8wXzFfU29ja2V0JztcclxuaW1wb3J0IFRlc3RfMF9OZXR3b3JrX1Byb3RvY29sQnVmZmVyIGZyb20gJy4vc3R1ZHkvVGVzdF8wX05ldHdvcmtfUHJvdG9jb2xCdWZmZXInO1xyXG5pbXBvcnQgTmV0d29ya01hbmFnZXIgZnJvbSAnLi9GcmFtZXdvcmsvTmV0d29yay9OZXR3b3JrTWFuYWdlcic7XHJcbmltcG9ydCBDbGllbnRNYW5hZ2VyIGZyb20gJy4vRnJhbWV3b3JrL05ldHdvcmsvQ2xpZW50TWFuYWdlcic7XHJcblxyXG4vL+WQr+WKqOexu1xyXG5jbGFzcyBBcHBNYWluIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8v5qC55o2uSURF6K6+572u5Yid5aeL5YyW5byV5pOOXHRcdFxyXG4gICAgICAgIGlmICh3aW5kb3dbXCJMYXlhM0RcIl0pIHtcclxuICAgICAgICAgICAgTGF5YTNELmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5LiN5pSv5oyBV2ViR0zml7boh6rliqjliIfmjaLoh7NDYW52YXNcclxuICAgICAgICAgICAgLy9MYXlhLmluaXQoQnJvd3Nlci5jbGllbnRXaWR0aCwgQnJvd3Nlci5jbGllbnRIZWlnaHQsIFdlYkdMKTtcclxuICAgICAgICAgICAgTGF5YS5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0LCBMYXlhW1wiV2ViR0xcIl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBMYXlhW1wiUGh5c2ljc1wiXSAmJiBMYXlhW1wiUGh5c2ljc1wiXS5lbmFibGUoKTtcclxuICAgICAgICBMYXlhW1wiRGVidWdQYW5lbFwiXSAmJiBMYXlhW1wiRGVidWdQYW5lbFwiXS5lbmFibGUoKTtcclxuXHJcblxyXG4gICAgICAgIC8v5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iVxyXG4gICAgICAgIGlmIChHYW1lQ29uZmlnLmRlYnVnIHx8IExheWEuVXRpbHMuZ2V0UXVlcnlTdHJpbmcoXCJkZWJ1Z1wiKSA9PSBcInRydWVcIikgTGF5YS5lbmFibGVEZWJ1Z1BhbmVsKCk7XHJcbiAgICAgICAgaWYgKEdhbWVDb25maWcucGh5c2ljc0RlYnVnICYmIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdKSBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXS5lbmFibGUoKTtcclxuICAgICAgICBpZiAoR2FtZUNvbmZpZy5zdGF0KSBMYXlhLlN0YXQuc2hvdygpO1xyXG5cclxuICAgICAgICAvL+ihqOekuuaYr+WQpuaNleiOt+WFqOWxgOmUmeivr+W5tuW8ueWHuuaPkOekuuOAglxyXG4gICAgICAgIExheWEuYWxlcnRHbG9iYWxFcnJvciA9IHRydWU7XHJcblxyXG4gICAgICAgIC8v5r+A5rS76LWE5rqQ54mI5pys5o6n5Yi277yMdmVyc2lvbi5qc29u55SxSURF5Y+R5biD5Yqf6IO96Ieq5Yqo55Sf5oiQ77yM5aaC5p6c5rKh5pyJ5Lmf5LiN5b2x5ZON5ZCO57ut5rWB56iLXHJcbiAgICAgICAgTGF5YS5SZXNvdXJjZVZlcnNpb24uZW5hYmxlKFwidmVyc2lvbi5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vblZlcnNpb25Mb2FkZWQpLCBMYXlhLlJlc291cmNlVmVyc2lvbi5GSUxFTkFNRV9WRVJTSU9OKTtcclxuXHJcblxyXG4gICAgICAgIExheWEuc3RhZ2UuYWxpZ25WID0gU3RhZ2UuQUxJR05fTUlERExFO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWxpZ25IID0gU3RhZ2UuQUxJR05fQ0VOVEVSO1xyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gR2FtZUNvbmZpZy5zY2FsZU1vZGU7Ly9TdGFnZS5TQ0FMRV9GVUxMOy8vU0NBTEVfRklYRURfSEVJR0hUXHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gR2FtZUNvbmZpZy5zY3JlZW5Nb2RlOy8vU3RhZ2UuU0NSRUVOX0hPUklaT05UQUw7Ly9TQ1JFRU5fVkVSVElDQUxcclxuICAgICAgICBMYXlhLnN0YWdlLmJnQ29sb3IgPSBcIiM3ZjdmN2ZcIjtcclxuXHJcbiAgICAgICAgLy/lhbzlrrnlvq7kv6HkuI3mlK/mjIHliqDovb1zY2VuZeWQjue8gOWcuuaZr1xyXG4gICAgICAgIExheWEuVVJMLmV4cG9ydFNjZW5lVG9Kc29uID0gR2FtZUNvbmZpZy5leHBvcnRTY2VuZVRvSnNvbjtcclxuXHJcbiAgICAgICAgLy/lpoLmnpzpgJrov4forr7lpIfpnZnpn7PplK7orqnpn7PpopHoh6rliqjot5/pmo/orr7lpIfpnZnpn7PjgILpnIDopoHlsIZ1c2VBdWRpb011c2lj6K6+572u5Li6ZmFsc2XjgIJcclxuICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci51c2VBdWRpb011c2ljID0gZmFsc2U7XHJcbiAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIuYXV0b1N0b3BNdXNpYyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvL+a2iOmZpOefoumHj+e7mOWItueahOmUr+m9v++8jOS9huS8muWinuWKoOaAp+iDvea2iOiAl1xyXG4gICAgICAgIC8vQ29uZmlnLmlzQW50aWFsaWFzPXRydWU7XHJcblxyXG4gICAgICAgIC8v6ZSA5q+B5b2T5YmN5rKh5pyJ6KKr5L2/55So55qE6LWE5rqQLOivpeWHveaVsOS8muW/veeVpWxvY2s9dHJ1ZeeahOi1hOa6kOOAglxyXG4gICAgICAgIExheWEuUmVzb3VyY2UuZGVzdHJveVVudXNlZFJlc291cmNlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVmVyc2lvbkxvYWRlZCgpOiB2b2lkIHtcclxuICAgICAgICAvL+a/gOa0u+Wkp+Wwj+WbvuaYoOWwhO+8jOWKoOi9veWwj+WbvueahOaXtuWAme+8jOWmguaenOWPkeeOsOWwj+WbvuWcqOWkp+WbvuWQiOmbhumHjOmdou+8jOWImeS8mOWFiOWKoOi9veWkp+WbvuWQiOmbhu+8jOiAjOS4jeaYr+Wwj+WbvlxyXG4gICAgICAgIExheWEuQXRsYXNJbmZvTWFuYWdlci5lbmFibGUoXCJmaWxlY29uZmlnLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uQ29uZmlnTG9hZGVkKSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Db25maWdMb2FkZWQoKTogdm9pZCB7XHJcbiAgICAgICAgLy/liqDovb1JREXmjIflrprnmoTlnLrmma9cclxuICAgICAgICBHYW1lQ29uZmlnLnN0YXJ0U2NlbmUgJiYgTGF5YS5TY2VuZS5vcGVuKEdhbWVDb25maWcuc3RhcnRTY2VuZSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0dXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldHVwKCk6IHZvaWQge1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMV9UZXh0KCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8yX0lucHV0VGVzdCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfM19CaXRtYXBGb250KCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8xX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80XzJfU3ByaXRlX0Rpc3BsYXlJbWFnZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80X01hc2tEZW1vKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF81XzFfQ29sb3JGaWx0ZXIoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzVfMl9HbG93RmlsdGVyKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzdfQXRsYXNBbmlEZW1vKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF84X1R3ZWVuRGVtbygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfOV9UaW1lTGluZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfOV9UaW1lTGluZVVJKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8xMV9Tb3VuZCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMF8xX1NvY2tldCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMF9OZXR3b3JrX1Byb3RvY29sQnVmZmVyKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBBcHBNYWluKCk7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0RXZlbnREaXNwYXRjaGVyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBOZXRFdmVudERpc3BhdGNoZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IE5ldEV2ZW50RGlzcGF0Y2hlciB7XHJcbiAgICAgICAgcmV0dXJuIE5ldEV2ZW50RGlzcGF0Y2hlci5pbnN0YW5jZSB8fCAoTmV0RXZlbnREaXNwYXRjaGVyLmluc3RhbmNlID0gbmV3IE5ldEV2ZW50RGlzcGF0Y2hlcigpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VIYW5kbGVyczogeyBbaW5kZXg6IG51bWJlcl06IEZ1bmN0aW9uW107IH0gPSB7fVxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgUmVnaXN0ZXJNZXNzYWdlKG1lc3NhZ2VJRDogbnVtYmVyLCBmdW46IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdmFyIGZ1bnM6IEFycmF5PEZ1bmN0aW9uPiA9IHRoaXMubWVzc2FnZUhhbmRsZXJzW21lc3NhZ2VJRF07XHJcbiAgICAgICAgaWYgKCFmdW5zKSB7XHJcbiAgICAgICAgICAgIGZ1bnMgPSBuZXcgQXJyYXk8RnVuY3Rpb24+KCk7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUhhbmRsZXJzW21lc3NhZ2VJRF0gPSBmdW5zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5zLnB1c2goZnVuKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBVblJlZ2lzdGVyTWVzc2FnZShtZXNzYWdlSUQ6IG51bWJlciwgZnVuOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHZhciBmdW5zOiBBcnJheTxGdW5jdGlvbj4gPSB0aGlzLm1lc3NhZ2VIYW5kbGVyc1ttZXNzYWdlSURdO1xyXG4gICAgICAgIGlmIChmdW5zKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleDogbnVtYmVyID0gZnVucy5pbmRleE9mKGZ1bik7XHJcbiAgICAgICAgICAgIGZ1bnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgRGlzcGF0Y2gobWVzc2FnZUlEOiBudW1iZXIsIG5ldFBhY2thZ2U6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHZhciBmdW5zOiBBcnJheTxGdW5jdGlvbj4gPSB0aGlzLm1lc3NhZ2VIYW5kbGVyc1ttZXNzYWdlSURdO1xyXG4gICAgICAgIGlmIChmdW5zKSB7XHJcbiAgICAgICAgICAgIGZ1bnMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2FsbChlbGVtZW50LCBuZXRQYWNrYWdlKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgQ2xlYXJBbGwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlSGFuZGxlcnMgPSB7fVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFNvY2tldENvbm5lY3QgZnJvbSBcIi4vU29ja2V0Q29ubmVjdFwiO1xyXG5cclxuLy9pbXBvcnQgKiBhcyBDb2xsZWN0aW9ucyBmcm9tICd0eXBlc2NyaXB0LWNvbGxlY3Rpb25zJzsgLy9pbXBvcnQgQ29sbGVjdGlvbnMgPSByZXF1aXJlKCd0eXBlc2NyaXB0LWNvbGxlY3Rpb25zJyk7XHJcblxyXG5cclxuZW51bSBDbGllbnRJRCB7XHJcbiAgICBsb2dpbiA9IDAsXHJcbiAgICBsb2dpYyxcclxuICAgIHNjZW5lLFxyXG4gICAgcmVjb3JkQ2hhdCxcclxufVxyXG5cclxuXHJcbmNsYXNzIEdhbWVDbGllbnQge1xyXG4gICAgcHJpdmF0ZSBjbGllbnRJZDogQ2xpZW50SUQ7XHJcbiAgICBwcml2YXRlIHNvY2tldENvbm5lY3Q6IFNvY2tldENvbm5lY3Q7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IENsaWVudElEKSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnRJZCA9IGlkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25uZWN0KGhvc3Q6IHN0cmluZywgcG9ydDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0ID0gbmV3IFNvY2tldENvbm5lY3QoXCIgY2xpZW50SWQ6XCIgKyB0aGlzLmNsaWVudElkKTtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QuY29ubmVjdChob3N0LCBwb3J0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29ubmVjdEJ5VXJsKHVybDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0ID0gbmV3IFNvY2tldENvbm5lY3QoXCIgY2xpZW50SWQ6XCIgKyB0aGlzLmNsaWVudElkKTtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QuY29ubmVjdEJ5VXJsKHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlQ29ubmVjdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3QucmVDb25uZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc0Nvbm5lY3QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0LmRpc0Nvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNDb25uZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ja2V0Q29ubmVjdC5jb25uZWN0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZEVtcHR5KG1zZ0lkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3Quc2VuZEVtcHR5KG1zZ0lkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgbXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvY2tldENvbm5lY3Quc2VuZE1lc3NhZ2UobXNnSWQsIG1zZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGllbnRNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgZ2FtZUNsaWVudE1hcDogeyBbaW5kZXg6IG51bWJlcl06IEdhbWVDbGllbnQ7IH0gPSB7fTtcclxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDbGllbnRNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IENsaWVudE1hbmFnZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlIHx8ICh0aGlzLmluc3RhbmNlID0gbmV3IHRoaXMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVDbGllbnQoY2xpZW50SUQ6IG51bWJlciwgdXJsOiBzdHJpbmcpOiBHYW1lQ2xpZW50IHtcclxuICAgICAgICB2YXIgY2xpZW50OiBHYW1lQ2xpZW50ID0gbmV3IEdhbWVDbGllbnQoY2xpZW50SUQpO1xyXG4gICAgICAgIGNsaWVudC5jb25uZWN0QnlVcmwodXJsKTtcclxuICAgICAgICB0aGlzLmdhbWVDbGllbnRNYXBbQ2xpZW50SUQubG9naW5dID0gY2xpZW50O1xyXG4gICAgICAgIHJldHVybiBjbGllbnQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xvc2VDbGllbnQoY2xpZW50SUQ6IENsaWVudElEKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNsaWVudDogR2FtZUNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KENsaWVudElELmxvZ2luKVxyXG4gICAgICAgIGlmIChjbGllbnQpIHtcclxuICAgICAgICAgICAgY2xpZW50LmRpc0Nvbm5lY3QoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyByZUNvbm5lY3QoY2xpZW50SUQ6IENsaWVudElEKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNsaWVudDogR2FtZUNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KENsaWVudElELmxvZ2luKVxyXG4gICAgICAgIGlmIChjbGllbnQpIHtcclxuICAgICAgICAgICAgY2xpZW50LnJlQ29ubmVjdCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldENsaWVudChjbGllbnRJRDogQ2xpZW50SUQpOiBHYW1lQ2xpZW50IHtcclxuICAgICAgICBpZiAodGhpcy5nYW1lQ2xpZW50TWFwW2NsaWVudElEXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdhbWVDbGllbnRNYXBbY2xpZW50SURdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naW5TZW5kTWVzc2FnZShtc2dJZDogbnVtYmVyLCBtc2c6IExheWEuQnl0ZSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGllbnQ6IEdhbWVDbGllbnQgPSB0aGlzLmdldENsaWVudChDbGllbnRJRC5sb2dpbilcclxuICAgICAgICBpZiAoY2xpZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5zZW5kTWVzc2FnZShtc2dJZCwgbXNnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBsb2dpY1NlbmRNZXNzYWdlKG1zZ0lkOiBudW1iZXIsIG1zZzogTGF5YS5CeXRlKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNsaWVudDogR2FtZUNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KENsaWVudElELmxvZ2ljKVxyXG4gICAgICAgIGlmIChjbGllbnQpIHtcclxuICAgICAgICAgICAgY2xpZW50LnNlbmRNZXNzYWdlKG1zZ0lkLCBtc2cpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHNjZW5lU2VuZE1lc3NhZ2UobXNnSWQ6IG51bWJlciwgbXNnOiBMYXlhLkJ5dGUpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2xpZW50OiBHYW1lQ2xpZW50ID0gdGhpcy5nZXRDbGllbnQoQ2xpZW50SUQuc2NlbmUpXHJcbiAgICAgICAgaWYgKGNsaWVudCkge1xyXG4gICAgICAgICAgICBjbGllbnQuc2VuZE1lc3NhZ2UobXNnSWQsIG1zZylcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2VuZE1lc3NhZ2VFbXB0eShtc2dJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNsaWVudDogR2FtZUNsaWVudCA9IG51bGw7XHJcbiAgICAgICAgaWYgKG1zZ0lkID4gUEJJRC5HTV9BQ0NPVU5UX1NFUlZFUl9NRVNTQUdFX1NUQVJUICYmIG1zZ0lkIDwgUEJJRC5HTV9BQ0NPVU5UX1NFUlZFUl9NRVNTQUdFX0VORCkge1xyXG4gICAgICAgICAgICBjbGllbnQgPSB0aGlzLmdldENsaWVudChDbGllbnRJRC5sb2dpbilcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNsaWVudCA9IHRoaXMuZ2V0Q2xpZW50KENsaWVudElELmxvZ2ljKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2xpZW50KSB7XHJcbiAgICAgICAgICAgIGNsaWVudC5zZW5kRW1wdHkobXNnSWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckFsbEdhbWVDbGllbnQoKSB7XHJcbiAgICAgICAgbGV0IGRpYyA9IHRoaXMuZ2FtZUNsaWVudE1hcFxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRpYykge1xyXG4gICAgICAgICAgICBpZiAoZGljLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkaWNba2V5XTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuZGlzQ29ubmVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2FtZUNsaWVudE1hcCA9IHt9XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IEJ5dGUgPSBMYXlhLkJ5dGVcclxuaW1wb3J0IFNvY2tldENvbm5lY3QgZnJvbSBcIi4vU29ja2V0Q29ubmVjdFwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ldFBhY2tldCB7XHJcbiAgICAvL3ByaXZhdGUgV0VCUEFDS19IRUFEX09GRlNFVDogbnVtYmVyID0gMFx0Ly8g6Ieq5a6a5LmJ5pWw5o2uIOS4gOiIrOaYr3JvbGVpZCAobG9uZ+exu+WeiylcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX01FU1NTQUdFSURfT0ZGU0VUOiBudW1iZXIgPSA4XHQvLyDmtojmga9pZFxyXG4gICAgLy9wcml2YXRlIFdFQlBBQ0tfTEVOR1RIX09GRlNFVDogbnVtYmVyID0gMTJcdC8vIOa2iOaBr+mVv+W6plxyXG4gICAgcHVibGljIFdFQlBBQ0tfSEVBRF9TSVpFOiBudW1iZXIgPSAxNlx0Ly8g5raI5oGv5pWw5o2u5byA5aeL5L2N572uXHJcblxyXG4gICAgcHVibGljIHJvbGVJZDogbnVtYmVyXHJcbiAgICBwdWJsaWMgbWVzc2FnZUlkOiBudW1iZXJcclxuICAgIHB1YmxpYyBtZXNzYWdlOiBhbnlcclxuXHJcbiAgICBwcml2YXRlIHJlYWRCeXRlczogQnl0ZVxyXG4gICAgcHJpdmF0ZSBzb2NrZXRDb25uZWN0OiBTb2NrZXRDb25uZWN0XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29ubmVjdDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXRDb25uZWN0ID0gY29ubmVjdFxyXG4gICAgICAgIHRoaXMucmVhZEJ5dGVzID0gbmV3IEJ5dGUoKVxyXG4gICAgICAgIHRoaXMucmVhZEJ5dGVzLmVuZGlhbiA9IExheWEuQnl0ZS5MSVRUTEVfRU5ESUFOLy/ov5nph4zmiJHku6zph4fnlKjlsI/nq69cclxuICAgIH1cclxuXHJcbiAgICAvL+aOpeaUtuacjeWKoeWZqOS/oeaBr1xyXG4gICAgcHVibGljIHJlY2VpdmVNc2coYnl0ZXM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVhZEJ5dGVzLndyaXRlQXJyYXlCdWZmZXIoYnl0ZXMpXHJcbiAgICAgICAgdGhpcy5yZWFkQnl0ZXMucG9zID0gMC8v6K6+572u5YGP56e75oyH6ZKIXHJcblxyXG4gICAgICAgIC8v5oyJ54Wn5pyN5Yqh5Zmo5Lyg6YCS6L+H5p2l55qE5pWw5o2u77yM5oyJ54Wn6aG65bqP6K+75Y+WXHJcbiAgICAgICAgdGhpcy5yb2xlSWQgPSB0aGlzLnJlYWRCeXRlcy5nZXRGbG9hdDY0KClcclxuICAgICAgICB0aGlzLm1lc3NhZ2VJZCA9IHRoaXMucmVhZEJ5dGVzLmdldEludDMyKClcclxuICAgICAgICBsZXQgbXNnTGVuZ3RoID0gdGhpcy5yZWFkQnl0ZXMuZ2V0SW50MzIoKVxyXG4gICAgICAgIC8vbGV0IGFiID0gdGhpcy5yZWFkQnl0ZXMucmVhZEFycmF5QnVmZmVyKG1zZ0xlbmd0aCAtIHRoaXMuV0VCUEFDS19IRUFEX1NJWkUpXHJcbiAgICAgICAgLy9sZXQgYnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoYWIpXHJcbiAgICAgICAgLy90aGlzLm1lc3NhZ2UgPSB0aGlzLnNvY2tldENvbm5lY3QuZGVzZXJpYWxpemUodGhpcy5tZXNzYWdlSWQsIGJ1ZmZlcilcclxuICAgICAgICBsZXQgdWludDhBcnJheSA9IHRoaXMucmVhZEJ5dGVzLnJlYWRVaW50OEFycmF5KHRoaXMuV0VCUEFDS19IRUFEX1NJWkUsIG1zZ0xlbmd0aCAtIHRoaXMuV0VCUEFDS19IRUFEX1NJWkUpXHJcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gdGhpcy5zb2NrZXRDb25uZWN0LmRlc2VyaWFsaXplKHRoaXMubWVzc2FnZUlkLCB1aW50OEFycmF5KVxyXG5cclxuICAgICAgICAvL2lmIChtc2dMZW5ndGggIT0gdGhpcy5yZWFkQnl0ZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5lcnJvcihcIua2iOaBr+mVv+S4jeS4gOagt1wiKVxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICB0aGlzLnJlYWRCeXRlcy5jbGVhcigpXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQ2xpZW50TWFuYWdlciBmcm9tIFwiLi9DbGllbnRNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXR3b3JrTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogTmV0d29ya01hbmFnZXI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBOZXR3b3JrTWFuYWdlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2UgfHwgKHRoaXMuaW5zdGFuY2UgPSBuZXcgdGhpcygpKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluinkuiJsklEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRSb2xlSWQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5wb3coMiwgNTMpIC0gMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkemAgea2iOaBr1xyXG4gICAgICogQHBhcmFtIG1zZ0lEXHJcbiAgICAgKiBAcGFyYW0gbWFzc2FnZVxyXG4gICAgICogdmFyIG1zZyA9IHsgdmVyc2lvbjogXCIxXCIsIHBsYXRmb3JtOjEsIGlzdGVzdDozIH0g5oiWIHZhciBtc2cgPSBuZXcgUEJNYXNzYWdlLkdNX1ZlcmlmeVZlcnNpb24oKTsgbXNnLnZlcnNpb24gPSBcIjFcIjsgbXNnLnBsYXRmb3JtID0gMTsgbXNnLmlzdGVzdCA9IDE7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2dpblNlbmRNZXNzYWdlKG1zZ0lEOiBudW1iZXIsIG1hc3NhZ2U6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIENsaWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2dpblNlbmRNZXNzYWdlKG1zZ0lELCBtYXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naWNTZW5kTWVzc2FnZShtc2dJRDogbnVtYmVyLCBtYXNzYWdlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBDbGllbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9naWNTZW5kTWVzc2FnZShtc2dJRCwgbWFzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNjZW5lU2VuZE1lc3NhZ2UobXNnSUQ6IG51bWJlciwgbWFzc2FnZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgQ2xpZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLnNjZW5lU2VuZE1lc3NhZ2UobXNnSUQsIG1hc3NhZ2UpO1xyXG4gICAgfVxyXG59IiwiXHJcbi8qKlxyXG4gKiBQcm90b2J1ZiDmtojmga/lkI3np7DljLnphY1cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBCTmFtZSB7XHJcbiAgICBzdGF0aWMgbWVzc2FnZU1hcCA9IHt9XHJcbiAgICBzdGF0aWMgaXNJbml0ID0gZmFsc2VcclxuICAgIHN0YXRpYyBnZXRNYXAoKTogYW55IHtcclxuICAgICAgICBpZiAoUEJOYW1lLmlzSW5pdCl7XHJcbiAgICAgICAgICAgIHJldHVybiBQQk5hbWUubWVzc2FnZU1hcFxyXG4gICAgICAgIH1cclxuICAgICAgICBQQk5hbWUuaXNJbml0ID0gdHJ1ZVxyXG5cclxuICAgICAgICAvL01lc3NhZ2VOYW1lXHJcbiAgICAgICAgbGV0IG1hcCA9IFBCTmFtZS5tZXNzYWdlTWFwXHJcblxyXG4gICAgICAgIG1hcFtQQklELkdNX1ZFUklGWV9WRVJTSU9OXT0nR01fVmVyaWZ5VmVyc2lvbic7XHJcbiAgICAgICAgbWFwW1BCSUQuR01fVkVSU0lPTl9SRVRVUk5dPSdHTV9WZXJpZnlWZXJzaW9uUmV0dXJuJztcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hcFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IE5ldEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vRXZlbnQvTmV0RXZlbnREaXNwYXRjaGVyXCJcclxuaW1wb3J0IE5ldFBhY2tldCBmcm9tIFwiLi9OZXRQYWNrZXRcIlxyXG5pbXBvcnQgTmV0d29ya01hbmFnZXIgZnJvbSBcIi4vTmV0d29ya01hbmFnZXJcIlxyXG5pbXBvcnQgUEJNZXNzYWdlTmFtZSBmcm9tIFwiLi9QQk5hbWVcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2NrZXRDb25uZWN0IHtcclxuXHJcbiAgICAvL3ByaXZhdGUgV0VCUEFDS19IRUFEX09GRlNFVDogbnVtYmVyID0gMFx0Ly8g6Ieq5a6a5LmJ5pWw5o2uIOS4gOiIrOaYr3JvbGVpZCAobG9uZ+exu+WeiylcclxuICAgIC8vcHJpdmF0ZSBXRUJQQUNLX01FU1NTQUdFSURfT0ZGU0VUOiBudW1iZXIgPSA4XHQvLyDmtojmga9pZFxyXG4gICAgLy9wcml2YXRlIFdFQlBBQ0tfTEVOR1RIX09GRlNFVDogbnVtYmVyID0gMTJcdC8vIOa2iOaBr+mVv+W6plxyXG4gICAgcHJpdmF0ZSBXRUJQQUNLX0hFQURfU0laRTogbnVtYmVyID0gMTZcdC8vIOa2iOaBr+aVsOaNruW8gOWni+S9jee9rlxyXG5cclxuXHJcbiAgICBwdWJsaWMgc29ja2V0OiBMYXlhLlNvY2tldCA9IG51bGxcclxuICAgIHByaXZhdGUgc2VuZEJ5dGVzOiBMYXlhLkJ5dGUgPSBudWxsXHJcbiAgICBwcml2YXRlIHJlYWRCeXRlczogTGF5YS5CeXRlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSB0ZW1wQnl0ZXM6IExheWEuQnl0ZSA9IG51bGxcclxuICAgIHByaXZhdGUgdXJsOiBzdHJpbmcgPSBudWxsXHJcbiAgICBwcml2YXRlIHRpcHM6IHN0cmluZyA9IG51bGxcclxuICAgIHByaXZhdGUgcGJNZXNzYWdlTmFtZTogYW55ID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBwcm90b1Jvb3Q6IGFueSA9IG51bGw7XHJcblxyXG4gICAgLy9wcml2YXRlIHNlbmROZXRQYWNrZXQ6IEFycmF5PE5ldFBhY2tldD4gPSBudWxsXHJcbiAgICAvL3ByaXZhdGUgcmVjZWl2ZU5ldFBhY2tldDogQXJyYXk8TmV0UGFja2V0PiA9IG51bGxcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0aXBzOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnRpcHMgPSB0aXBzXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMgPSBuZXcgTGF5YS5CeXRlKClcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy5lbmRpYW4gPSBMYXlhLkJ5dGUuTElUVExFX0VORElBTi8v6L+Z6YeM5oiR5Lus6YeH55So5bCP56uvXHJcbiAgICAgICAgdGhpcy50ZW1wQnl0ZXMgPSBuZXcgTGF5YS5CeXRlKClcclxuICAgICAgICB0aGlzLnRlbXBCeXRlcy5lbmRpYW4gPSBMYXlhLkJ5dGUuTElUVExFX0VORElBTi8v6L+Z6YeM5oiR5Lus6YeH55So5bCP56uvXHJcblxyXG4gICAgICAgIC8vdGhpcy5zZW5kTmV0UGFja2V0ID0gbmV3IEFycmF5PE5ldFBhY2tldD4oKSAvL+WPkemAgeeahOe9kee7nOWMhVxyXG4gICAgICAgIC8vdGhpcy5yZWNlaXZlTmV0UGFja2V0ID0gbmV3IEFycmF5PE5ldFBhY2tldD4oKSAvL+aOpeaUtueahOe9kee7nOWMhVxyXG5cclxuICAgICAgICB0aGlzLnByb3RvUm9vdCA9IExheWEuQnJvd3Nlci53aW5kb3dbXCJQQk1lc3NhZ2VcIl1cclxuICAgICAgICB0aGlzLnBiTWVzc2FnZU5hbWUgPSBQQk1lc3NhZ2VOYW1lLmdldE1hcCgpXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY29ubmVjdChob3N0OiBzdHJpbmcsIHBvcnQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudXJsID0gaG9zdC5jb25jYXQocG9ydC50b1N0cmluZygpKVxyXG4gICAgICAgIHRoaXMuY29ubmVjdEJ5VXJsKHRoaXMudXJsKVxyXG4gICAgfVxyXG4gICAgLy9cIndzOi8vbG9jYWxob3N0Ojg5ODlcIlxyXG4gICAgcHVibGljIGNvbm5lY3RCeVVybCh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudXJsID0gdXJsXHJcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBuZXcgTGF5YS5Tb2NrZXQoKVxyXG4gICAgICAgIHRoaXMuc29ja2V0LmVuZGlhbiA9IExheWEuQnl0ZS5MSVRUTEVfRU5ESUFOLy/ov5nph4zmiJHku6zph4fnlKjlsI/nq69cclxuICAgICAgICB0aGlzLnNvY2tldC5jb25uZWN0QnlVcmwodXJsKVxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKExheWEuRXZlbnQuT1BFTiwgdGhpcywgdGhpcy5vcGVuSGFuZGxlcilcclxuICAgICAgICB0aGlzLnNvY2tldC5vbihMYXlhLkV2ZW50Lk1FU1NBR0UsIHRoaXMsIHRoaXMucmVjZWl2ZUhhbmRsZXIpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oTGF5YS5FdmVudC5DTE9TRSwgdGhpcywgdGhpcy5jbG9zZUhhbmRsZXIpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oTGF5YS5FdmVudC5FUlJPUiwgdGhpcywgdGhpcy5lcnJvckhhbmRsZXIpXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVDb25uZWN0KCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0LmNsZWFuU29ja2V0KClcclxuICAgICAgICB0aGlzLmNvbm5lY3RCeVVybCh0aGlzLnVybClcclxuICAgIH1cclxuICAgIHB1YmxpYyBkaXNDb25uZWN0KCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0LmNsb3NlKClcclxuICAgIH1cclxuICAgIC8v5piv5ZCm6L+e5o6lXHJcbiAgICBwdWJsaWMgY29ubmVjdGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvY2tldC5jb25uZWN0ZWRcclxuICAgIH1cclxuICAgIC8v5q2j56Gu5bu656uL6L+e5o6lXHJcbiAgICBwcml2YXRlIG9wZW5IYW5kbGVyKGV2ZW50OiBhbnkgPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy51cmwgKyB0aGlzLnRpcHMgKyBcIiAg5q2j56Gu5bu656uL6L+e5o6lXCIpXHJcbiAgICB9XHJcbiAgICAvL+WFs+mXrei/nuaOpeS6i+S7tlxyXG4gICAgcHJpdmF0ZSBjbG9zZUhhbmRsZXIoZXZlbnQ6IGFueSA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVybCArIHRoaXMudGlwcyArIFwiIOWFs+mXrei/nuaOpeS6i+S7tlwiKVxyXG4gICAgfVxyXG4gICAgLy/ov57mjqXlh7rplJlcclxuICAgIHByaXZhdGUgZXJyb3JIYW5kbGVyKGU6IGFueSA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVybCArIHRoaXMudGlwcyArIFwiIOi/nuaOpeWHuumUmVwiKVxyXG4gICAgfVxyXG5cclxuICAgIC8v5Y+R6YCB56m65raI5oGvXHJcbiAgICBwdWJsaWMgc2VuZEVtcHR5KG1zZ0lkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICAvLyDlhpnlhaXkuIDkuKrmlbDlrZcwXHJcbiAgICAgICAgdGhpcy50ZW1wQnl0ZXMud3JpdGVGbG9hdDMyKDApXHJcbiAgICAgICAgdGhpcy5zZW5kKG1zZ0lkLCB0aGlzLnRlbXBCeXRlcylcclxuICAgICAgICB0aGlzLnRlbXBCeXRlcy5jbGVhcigpXHJcbiAgICB9XHJcblxyXG4gICAgLy/lj5HpgIHlrZfnrKbkuLLmoLzlvI9cclxuICAgIHB1YmxpYyBzZW5kU3RyaW5nKG1zZ0lkOiBudW1iZXIsIGNvbnRlbnQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGVtcEJ5dGVzLndyaXRlVVRGU3RyaW5nKGNvbnRlbnQpXHJcbiAgICAgICAgdGhpcy5zZW5kKG1zZ0lkLCB0aGlzLnRlbXBCeXRlcylcclxuICAgICAgICAvL+a4hemZpOaOieaVsOaNru+8jOaWueS+v+S4i+asoeivu+WGmVxyXG4gICAgICAgIHRoaXMudGVtcEJ5dGVzLmNsZWFyKClcclxuICAgIH1cclxuXHJcbiAgICAvL+WPkemAgea2iOaBr1xyXG4gICAgcHVibGljIHNlbmRNZXNzYWdlKG1zZ0lkOiBudW1iZXIsIG1zZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGJ1ZmZlcjogVWludDhBcnJheSA9IHRoaXMuc2VyaWFsaXplKG1zZ0lkLCBtc2cpXHJcbiAgICAgICAgdGhpcy50ZW1wQnl0ZXMud3JpdGVBcnJheUJ1ZmZlcihidWZmZXIpXHJcbiAgICAgICAgdGhpcy5zZW5kKG1zZ0lkLCB0aGlzLnRlbXBCeXRlcylcclxuICAgICAgICAvL+a4hemZpOaOieaVsOaNru+8jOaWueS+v+S4i+asoeivu+WGmVxyXG4gICAgICAgIHRoaXMudGVtcEJ5dGVzLmNsZWFyKClcclxuICAgIH1cclxuXHJcbiAgICAvL+mcgOimgeWPkemAgeeahOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBzZW5kKG1zZ0lkOiBudW1iZXIsIGJ5dGU6IExheWEuQnl0ZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5zb2NrZXQuY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29ubmVjdGVkOlwiICsgdGhpcy5zb2NrZXQuY29ubmVjdGVkKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9XRUJQQUNLX0hFQURfT0ZGU0VUXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMud3JpdGVGbG9hdDY0KE5ldHdvcmtNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Um9sZUlkKCkpXHJcbiAgICAgICAgLy9XRUJQQUNLX01FU1NTQUdFSURfT0ZGU0VUXHJcbiAgICAgICAgdGhpcy5zZW5kQnl0ZXMud3JpdGVJbnQzMihtc2dJZClcclxuICAgICAgICAvL1dFQlBBQ0tfTEVOR1RIX09GRlNFVFxyXG4gICAgICAgIHRoaXMuc2VuZEJ5dGVzLndyaXRlSW50MzIodGhpcy5XRUJQQUNLX0hFQURfU0laRSArIGJ5dGUubGVuZ3RoKVxyXG4gICAgICAgIC8vTWFzc2dlIGJvZHlcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy53cml0ZUFycmF5QnVmZmVyKGJ5dGUuYnVmZmVyKVxyXG4gICAgICAgIC8v6L+Z6YeM5piv5oqK5a2X6IqC5pWw57uE55qE5pWw5o2u6YCa6L+Hc29ja2V05Y+R6YCB57uZ5pyN5Yqh5ZmoXHJcbiAgICAgICAgdGhpcy5zb2NrZXQuc2VuZCh0aGlzLnNlbmRCeXRlcy5idWZmZXIpXHJcbiAgICAgICAgLy/muIXpmaTmjonmlbDmja7vvIzmlrnkvr/kuIvmrKHor7vlhplcclxuICAgICAgICB0aGlzLnNlbmRCeXRlcy5jbGVhcigpXHJcbiAgICB9XHJcblxyXG4gICAgLy/mjqXmlLbliLDmlbDmja5cclxuICAgIHByaXZhdGUgcmVjZWl2ZUhhbmRsZXIobXNnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiTWVzc2FnZSBmcm9tIHNlcnZlcjogIFwiICsgbmV3IExheWEuQnl0ZShtc2cpLnJlYWRVVEZCeXRlcygpKVxyXG4gICAgICAgIHZhciBuZXRQYWNrZXQ6IE5ldFBhY2tldCA9IG5ldyBOZXRQYWNrZXQodGhpcylcclxuICAgICAgICBuZXRQYWNrZXQucmVjZWl2ZU1zZyhtc2cpXHJcbiAgICAgICAgdGhpcy5zb2NrZXQuaW5wdXQuY2xlYXIoKVxyXG4gICAgICAgIE5ldEV2ZW50RGlzcGF0Y2hlci5nZXRJbnN0YW5jZSgpLkRpc3BhdGNoKG5ldFBhY2tldC5tZXNzYWdlSWQsIG5ldFBhY2tldClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW6j+WIl+WMliBwcm90b2NvbC1idWZmZXJcclxuICAgICAqIEBwYXJhbSBtYXNzYWdlSWQgXHJcbiAgICAgKiBAcGFyYW0gbWFzc2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VyaWFsaXplKG1hc3NhZ2VJZDogbnVtYmVyLCBtYXNzYWdlOiBhbnkpOiBVaW50OEFycmF5IHtcclxuICAgICAgICBsZXQgbWFzc2FnZU5hbWU6IHN0cmluZyA9IHRoaXMucGJNZXNzYWdlTmFtZVttYXNzYWdlSWRdXHJcbiAgICAgICAgLy8gRW5jb2RlIGEgbWVzc2FnZSB0byBhbiBVaW50OEFycmF5IChicm93c2VyKSBvciBCdWZmZXIgKG5vZGUpXHJcbiAgICAgICAgdmFyIGJ1ZmZlcjogYW55ID0gdGhpcy5wcm90b1Jvb3RbbWFzc2FnZU5hbWVdLmVuY29kZShtYXNzYWdlKS5maW5pc2goKTtcclxuICAgICAgICByZXR1cm4gYnVmZmVyO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj43luo/liJfljJYgcHJvdG9jb2wtYnVmZmVyXHJcbiAgICAgKiBAcGFyYW0gbWFzc2FnZU5hbWUgXHJcbiAgICAgKiBAcGFyYW0gbmV0UGFja2FnZSBOZXRQYWNrYWdlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZXNlcmlhbGl6ZShtYXNzYWdlSWQ6IG51bWJlciwgbWFzc2FnZTogVWludDhBcnJheSk6IGFueSB7XHJcbiAgICAgICAgbGV0IG1hc3NhZ2VOYW1lOiBzdHJpbmcgPSB0aGlzLnBiTWVzc2FnZU5hbWVbbWFzc2FnZUlkXVxyXG4gICAgICAgIC8vIERlY29kZSBhbiBVaW50OEFycmF5IChicm93c2VyKSBvciBCdWZmZXIgKG5vZGUpIHRvIGEgbWVzc2FnZVxyXG4gICAgICAgIHZhciBtZXNzYWdlOiBhbnkgPSB0aGlzLnByb3RvUm9vdFttYXNzYWdlTmFtZV0uZGVjb2RlKG1hc3NhZ2UpO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgfVxyXG5cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xyXG5pbXBvcnQgTWFpblVJIGZyb20gXCIuL3NjcmlwdC9NYWluVUlcIlxuaW1wb3J0IFRlc3RfOV9UaW1lTGluZVVJIGZyb20gXCIuL3N0dWR5L1Rlc3RfOV9UaW1lTGluZVVJXCJcclxuLypcclxuKiDmuLjmiI/liJ3lp4vljJbphY3nva47XHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb25maWd7XHJcbiAgICBzdGF0aWMgd2lkdGg6bnVtYmVyPTY0MDtcclxuICAgIHN0YXRpYyBoZWlnaHQ6bnVtYmVyPTExMzY7XHJcbiAgICBzdGF0aWMgc2NhbGVNb2RlOnN0cmluZz1cImZpeGVkaGVpZ2h0XCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJob3Jpem9udGFsXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJNYWluU2NlbmUuc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBzdGF0OmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgcGh5c2ljc0RlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgZXhwb3J0U2NlbmVUb0pzb246Ym9vbGVhbj10cnVlO1xyXG4gICAgY29uc3RydWN0b3IoKXt9XHJcbiAgICBzdGF0aWMgaW5pdCgpe1xyXG4gICAgICAgIHZhciByZWc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xyXG4gICAgICAgIHJlZyhcInNjcmlwdC9NYWluVUkudHNcIixNYWluVUkpO1xuICAgICAgICByZWcoXCJzdHVkeS9UZXN0XzlfVGltZUxpbmVVSS50c1wiLFRlc3RfOV9UaW1lTGluZVVJKTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLmluaXQoKTsiLCJpbXBvcnQgeyB1aSB9IGZyb20gXCIuLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IE5ldHdvcmtNYW5hZ2VyIGZyb20gXCIuLi9GcmFtZXdvcmsvTmV0d29yay9OZXR3b3JrTWFuYWdlclwiO1xyXG5pbXBvcnQgQ2xpZW50TWFuYWdlciBmcm9tIFwiLi4vRnJhbWV3b3JrL05ldHdvcmsvQ2xpZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgTmV0RXZlbnREaXNwYXRjaGVyIGZyb20gXCIuLi9GcmFtZXdvcmsvRXZlbnQvTmV0RXZlbnREaXNwYXRjaGVyXCI7XHJcbmltcG9ydCBOZXRQYWNrZXQgZnJvbSBcIi4uL0ZyYW1ld29yay9OZXR3b3JrL05ldFBhY2tldFwiO1xyXG5cclxuXHJcbi8v5Li755WM6Z2iXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5VSSBleHRlbmRzIHVpLk1haW5TY2VuZVVJIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoKTsgfVxyXG5cclxuICAgIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFpblVJLm9uRW5hYmxlXCIpXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFBCSUQuR01fVkVSU0lPTl9SRVRVUk4udG9TdHJpbmcoKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgTmV0RXZlbnREaXNwYXRjaGVyLmdldEluc3RhbmNlKCkuUmVnaXN0ZXJNZXNzYWdlKFBCSUQuR01fVkVSU0lPTl9SRVRVUk4sIHRoaXMuR01fVmVyaWZ5VmVyc2lvblJldHVybikvL1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk1haW5VSS5vbkRpc2FibGVcIilcclxuICAgICAgICBcclxuICAgICAgICBOZXRFdmVudERpc3BhdGNoZXIuZ2V0SW5zdGFuY2UoKS5VblJlZ2lzdGVyTWVzc2FnZShQQklELkdNX1ZFUlNJT05fUkVUVVJOLCB0aGlzLkdNX1ZlcmlmeVZlcnNpb25SZXR1cm4pLy9cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBHTV9WZXJpZnlWZXJzaW9uUmV0dXJuKG5ldFBhY2thZ2U6TmV0UGFja2V0KTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG5ldFBhY2thZ2UubWVzc2FnZUlkICsgXCIgIFwiICsgbmV0UGFja2FnZS5tZXNzYWdlKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkF3YWtlKCk6IHZvaWQge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlByZWNpc2lvbiBzYWZlLlwiICsgKE1hdGgucG93KDIsIDUzKSAtIDEpKTtcclxuICAgICAgICBcclxuICAgICAgICBDbGllbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlQ2xpZW50KDAsIFwid3M6Ly8xOTIuMTY4LjIuMTI2OjUwMDAwXCIpO1xyXG5cclxuICAgICAgICAvL+WumuaXtuaJp+ihjOS4gOasoSjpl7TpmpTml7bpl7QpXHJcbiAgICAgICAgTGF5YS50aW1lci5vbmNlKDIwMDAsIHRoaXMsIHRoaXMudGVzdE5ldHdvcmspO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdGVzdE5ldHdvcmsoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0ZXN0TmV0d29yaygpXCIpO1xyXG4gICAgICAgIHZhciBtc2cgPSB7XHJcbiAgICAgICAgICAgIHZlcnNpb246IFwiMS41LjRcIixcdFx0XHRcdC8v5a6i5oi356uv54mI5pys5Y+3XHJcbiAgICAgICAgICAgIHBsYXRmb3JtOiA5MDA3MTk5MjU0NzQwOTkxLCAgICAgICAgICAgICAvLy/lubPlj7BcclxuICAgICAgICAgICAgaXN0ZXN0OiAwLC8vLyAgICAw44CB5q2j5bi477yMMeOAgea1i+ivle+8jOS4jemcgOimgemqjOivgeeJiOacrFxyXG4gICAgICAgIH1cclxuICAgICAgICBOZXR3b3JrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvZ2luU2VuZE1lc3NhZ2UoUEJJRC5HTV9WRVJJRllfVkVSU0lPTiwgIG1zZyk7XHJcbiAgICB9XHJcbn0iLCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0XzlfVGltZUxpbmVVSVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvL+WKoOi9veWbvumbhuaIkOWKn+WQju+8jOaJp+ihjG9uTG9hZOWbnuiwg+aWueazlVxyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQoXCJyZXMvYXRsYXMvdGVzdC5hdGxhc1wiLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uTG9hZGVkKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgb25Mb2FkZWQoKTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Yqg6L295Zu+6ZuG5oiQ5Yqf5ZCO77yM5omn6KGMb25Mb2Fk5Zue6LCD5pa55rOVXCIpXHJcbiAgICAgICAgLy/liJvlu7rkuIDkuKpVSeWunuS+i1xyXG4gICAgICAgIC8vdmFyIHBsYW46VGltZUxpbmVVSSA9IG5ldyBUaW1lTGluZVVJKClcclxuICAgICAgICAvL+a3u+WKoOWIsOiInuWPsFxyXG4gICAgICAgIC8vTGF5YS5zdGFnZS5hZGRDaGlsZChwbGFuKTtcclxuICAgICAgICAvL+aSreaUvlVJ5Zy65pmv5Lit55qE5Yqo55S7XHJcbiAgICAgICAgLy90aGlzLmJlYXIucGxheSgpO1xyXG4gICAgfVxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xudmFyIFJFRzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XG5leHBvcnQgbW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBNYWluU2NlbmVVSSBleHRlbmRzIFNjZW5lIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiTWFpblNjZW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLk1haW5TY2VuZVVJXCIsTWFpblNjZW5lVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIFRpbWVMaW5lVUkgZXh0ZW5kcyBEaWFsb2cge1xyXG5cdFx0cHVibGljIGJlYXI6TGF5YS5BbmltYXRpb247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJUaW1lTGluZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5UaW1lTGluZVVJXCIsVGltZUxpbmVVSSk7XHJcbn1cciJdfQ==
