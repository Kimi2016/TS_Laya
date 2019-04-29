import SocketConnect from "./SocketConnect";

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
        this.socketConnect = new SocketConnect(" clientId:" + this.clientId);
        this.socketConnect.connect(host, port);
    }

    public connectByUrl(url: string): void {
        this.socketConnect = new SocketConnect(" clientId:" + this.clientId);
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

    public sendEmpty(msgId: number): void {
        this.socketConnect.sendEmpty(msgId);
    }

    public sendMessage(msgId: number, msg: any): void {
        this.socketConnect.sendMessage(msgId, msg);
    }
}


export default class ClientManager {
    private gameClientMap: { [index: number]: GameClient; } = {};
    private static instance: ClientManager = null;

    public static getInstance(): ClientManager {
        return this.instance || (this.instance = new this());
    }

    private constructor() { }

    public createClient(clientID: number, url: string): GameClient {
        var client: GameClient = new GameClient(clientID);
        client.connectByUrl(url);
        this.gameClientMap[ClientID.login] = client;
        return client;
    }
    public closeClient(clientID: ClientID): void {
        let client: GameClient = this.getClient(ClientID.login)
        if (client) {
            client.disConnect()
        }
    }
    public reConnect(clientID: ClientID): void {
        let client: GameClient = this.getClient(ClientID.login)
        if (client) {
            client.reConnect()
        }
    }
    public getClient(clientID: ClientID): GameClient {
        if (this.gameClientMap[clientID] != null) {
            return this.gameClientMap[clientID];
        }
        return null;
    }

    public loginSendMessage(msgId: number, msg: Laya.Byte): void {
        let client: GameClient = this.getClient(ClientID.login)
        if (client) {
            client.sendMessage(msgId, msg)
        }
    }
    public logicSendMessage(msgId: number, msg: Laya.Byte): void {
        let client: GameClient = this.getClient(ClientID.logic)
        if (client) {
            client.sendMessage(msgId, msg)
        }
    }
    public sceneSendMessage(msgId: number, msg: Laya.Byte): void {
        let client: GameClient = this.getClient(ClientID.scene)
        if (client) {
            client.sendMessage(msgId, msg)
        }
    }
    public sendMessageEmpty(msgId: number): void {
        let client: GameClient = null;
        if (msgId > GameMessage.GM_ACCOUNT_SERVER_MESSAGE_START && msgId < GameMessage.GM_ACCOUNT_SERVER_MESSAGE_END) {
            client = this.getClient(ClientID.login)
        }
        else {
            client = this.getClient(ClientID.logic)
        }
        if (client) {
            client.sendEmpty(msgId)
        }
    }
    
    public clearAllGameClient() {
        let dic = this.gameClientMap
        for (const key in dic) {
            if (dic.hasOwnProperty(key)) {
                const element = dic[key];
                element.disConnect();
            }
        }
        this.gameClientMap = {}
    }

}