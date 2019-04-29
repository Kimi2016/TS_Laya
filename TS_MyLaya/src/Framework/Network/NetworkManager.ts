import ClientManager from "./ClientManager";

export default class NetworkManager {
    private static instance: NetworkManager;

    public static getInstance(): NetworkManager {
        return this.instance || (this.instance = new this())
    }

    private constructor() { }

    /**
     * 获取角色ID
     */
    public getRoleId(): number {
        return Math.pow(2, 53) - 1;
    }

    /**
     * 发送消息
     * @param msgID
     * @param massage
     * var msg = { version: "1", platform:1, istest:3 } 或 var msg = new PBMassage.GM_VerifyVersion(); msg.version = "1"; msg.platform = 1; msg.istest = 1;
     */
    public loginSendMessage(msgID: number, massage: any): void {
        ClientManager.getInstance().loginSendMessage(msgID, massage);
    }

    public logicSendMessage(msgID: number, massage: any): void {
        ClientManager.getInstance().logicSendMessage(msgID, massage);
    }

    public sceneSendMessage(msgID: number, massage: any): void {
        ClientManager.getInstance().sceneSendMessage(msgID, massage);
    }
}