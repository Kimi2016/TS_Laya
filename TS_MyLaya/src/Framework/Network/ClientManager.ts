
//import * as Collections from 'typescript-collections'; //import Collections = require('typescript-collections');


enum ClientID {
    login = 0,
    logic,
    scene,
    recordChat,
}


class GameClient {
    private clientId: ClientID;
    private socketConnect: SocketConnect;

    constructor(id: ClientID) {
        this.clientId = id;
    }

    public connect(host: string, port: number): void {
        this.socketConnect = new SocketConnect("clientId:" + this.clientId);
        this.socketConnect.connect(host, port);
    }

    public connectByUrl(url: string): void {
        this.socketConnect = new SocketConnect("clientId:" + this.clientId);
        this.socketConnect.connectByUrl(url);
    }

    public reConnect(): void {
        this.socketConnect.reConnect();
    }

    public disConnect(): void {
        this.socketConnect.disConnect();
    }

    public isConnected(): boolean {
        return this.socketConnect.connected();
    }

    public sendEmpty(msgId: GameMessage): void {
        this.socketConnect.sendEmpty(msgId);
    }

    public sendMassage(msgId: GameMessage, content: string | Laya.Byte): void {
        if (content as string) {
            this.socketConnect.sendString(msgId, content as string);
        }
        else {
            this.socketConnect.sendByte(msgId, content as Laya.Byte);
        }
    }
}


export default class ClientManager {
    private gameClientDic: { [index: number]: GameClient; } = {};
    private static clientManager: ClientManager = null;

    public static getSingleton(): ClientManager {
        if (!this.clientManager) {
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

    public loginSendMessage(msgId: GameMessage, content: Laya.Byte): void {
        let client: GameClient = this.GetClient(ClientID.login)
        if (!client) {
            client.sendMassage(msgId, content)
        }
    }

    public logicSendMessage(msgId: GameMessage, content: Laya.Byte): void {
        let client: GameClient = this.GetClient(ClientID.logic)
        if (!client) {
            client.sendMassage(msgId, content)
        }
    }

    public sceneSendMessage(msgId: GameMessage, content: Laya.Byte): void {
        let client: GameClient = this.GetClient(ClientID.scene)
        if (!client) {
            client.sendMassage(msgId, content)
        }
    }

    public clearAllGameClient() {
        let dic = this.gameClientDic
        for (const key in dic) {
            if (dic.hasOwnProperty(key)) {
                const element = dic[key];
                element.disConnect();
            }
        }
        this.gameClientDic = {}
    }

    public sendMessageEmpty(msgId: GameMessage): void {
        if (msgId > GameMessage.GM_ACCOUNT_SERVER_MESSAGE_START && msgId < GameMessage.GM_ACCOUNT_SERVER_MESSAGE_END) {
            this.loginSendMessage(msgId, null);
        }
        else {
            this.logicSendMessage(msgId, null);
        }
    }
}