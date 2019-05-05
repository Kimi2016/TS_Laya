import SocketConnect from "./SocketConnect";

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

    public reconnect(): void {
        this.socketConnect.reconnect();
    }

    public disconnected(): void {
        this.socketConnect.disconnected();
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


export default class NetworkManager {
    private static instance: NetworkManager;

    public static getInstance(): NetworkManager {
        return this.instance || (this.instance = new this())
    }

    private gameClientMap: { [index: number]: GameClient; } = {};

    private constructor() { }

    /**
     * 获取角色ID
     */
    public getRoleId(): number {
        return Math.pow(2, 53) - 1;
    }

    public createClient(clientID: number, url: string): GameClient {
        var client: GameClient = new GameClient(clientID);
        client.connectByUrl(url);
        this.gameClientMap[ClientID.login] = client;
        return client;
    }

    public getClient(clientID: ClientID): GameClient {
        if (this.gameClientMap[clientID] != null) {
            return this.gameClientMap[clientID];
        }
        return null;
    }

    public closeClient(clientID: ClientID): void {
        let client: GameClient = this.getClient(ClientID.login)
        if (client) {
            client.disconnected()
        }
    }

    public reconnectClient(clientID: ClientID): void {
        let client: GameClient = this.getClient(ClientID.login)
        if (client) {
            client.reconnect()
        }
    }

    public loginSendMessage(msgId: number, msg: any): void {
        this.sendMessage(msgId, msg, ClientID.login)
    }

    public logicSendMessage(msgId: number, msg: any): void {
        this.sendMessage(msgId, msg, ClientID.logic)
    }

    public sceneSendMessage(msgId: number, msg: any): void {
        this.sendMessage(msgId, msg, ClientID.scene)
    }

    private sendMessage(msgId: number, msg: any, clientID: ClientID): void {
        let client: GameClient = this.getClient(clientID)
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
                element.disconnected();
            }
        }
        this.gameClientMap = {}
    }
}