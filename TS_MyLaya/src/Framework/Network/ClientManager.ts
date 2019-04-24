
//import * as Collections from 'typescript-collections'; //import Collections = require('typescript-collections');


enum ClientID {
    login = 0,
    logic,
    scene,
    recordChat,
}


class GameClient {
    private clientId: ClientID;
    private socketChannel: SocketChannel;

    constructor(id: ClientID) {
        this.clientId = id;
    }

    public connect(host: string, port: number): void {
        this.socketChannel = new SocketChannel("clientId:" + this.clientId);
        this.socketChannel.connect(host, port);
    }

    public connectByUrl(url: string): void {
        this.socketChannel = new SocketChannel("clientId:" + this.clientId);
        this.socketChannel.connectByUrl(url);
    }

    public reConnect() {
        this.socketChannel.reConnect();
    }

    public disConnect() {
        this.socketChannel.disConnect();
    }

    public isConnected() {
        return this.socketChannel.connected();
    }

    public sendString(msgId: GameMessage, context: string) {
        this.socketChannel.sendString(context);
    }

    public sendEmpty(msgId: GameMessage) {

    }

    public sendByte(msgId: GameMessage, content: Laya.Byte) {
        this.socketChannel.sendByte(msgId, content);
    }
}


export default class ClientManager {
    private gameClientDic: { [index: number]: GameClient; } = {};
    private static clientManager: ClientManager = null;

    public static getSingleton(): ClientManager {
        if (this.clientManager == null) {
            this.clientManager = new ClientManager();
        }
        return this.clientManager;
    }

    private constructor() {
    }

    private GetClient(id: ClientID): GameClient {
        if (this.gameClientDic[id] != null) {
            return this.gameClientDic[id];
        }
        return null;
    }


    public login(): GameClient {
        return this.GetClient(ClientID.login)
    }

    public logic(): GameClient {
        return this.GetClient(ClientID.logic)
    }

    public scene(): GameClient {
        return this.GetClient(ClientID.scene)
    }

    public clearAllGameClient() {
        this.gameClientDic = {}
    }

    public sendMessageEmpty(msgId: GameMessage) {
        var client: GameClient = null;
        if (msgId > GameMessage.GM_ACCOUNT_SERVER_MESSAGE_START && msgId < GameMessage.GM_ACCOUNT_SERVER_MESSAGE_END) {
            client = this.login();
        }
        else {
            client = this.logic();
        }

        if (client != null) {
            client.sendEmpty(msgId);
        }
    }
}