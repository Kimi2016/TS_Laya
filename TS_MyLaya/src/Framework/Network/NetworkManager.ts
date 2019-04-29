import ClientManager from "./ClientManager";
import NetPacket from "./NetPacket";

export default class NetworkManager {

    private static instance: NetworkManager;
    private protoRoot: any = null;

    public static getInstance(): NetworkManager {
        if (!this.instance) {
            this.instance = new NetworkManager();
        }
        return this.instance
    }

    private constructor() {
        this.protoRoot = Laya.Browser.window["PBMessage"];
    }

    /**
     * 获取角色ID
     */
    public getRoleId(): number {
        return Math.pow(2, 53) - 1;
    }

    /**
     * 序列化 protocol-buffer
     * @param massageName 
     * @param massage
     */
    public serialize(massageName: string, massage: any): any {
        // Encode a message to an Uint8Array (browser) or Buffer (node)
        var buffer: any = this.protoRoot[massageName].encode(massage).finish();
        return buffer;
    }

    /**
     * 反序列化 protocol-buffer
     * @param massageName 
     * @param netPackage NetPackage
     */
    public deserialize(massageName: string, netPackage: NetPacket): any {
        // Decode an Uint8Array (browser) or Buffer (node) to a message
        var message: any = this.protoRoot[massageName].decode(netPackage.body);
        return message;
    }

    /**
     * 发送消息
     * @param msgID ID
     * @param msgName GM_VerifyVersion
     * @param massage
     * var msg = { version: "1", platform:1, istest:3 } 或 var msg = new PBMassage.GM_VerifyVersion(); msg.version = "1"; msg.platform = 1; msg.istest = 1;
     */
    public loginSendMessage(msgID: number, msgName: string, massage: any): void {
        var buffer: any = this.serialize(msgName, massage);
        ClientManager.getInstance().loginSendMessage(msgID, buffer);
    }

    public logicSendMessage(msgID: number, msgName: string, massage: any): void {
        var buffer: any = this.serialize(msgName, massage);
        ClientManager.getInstance().logicSendMessage(msgID, buffer);
    }

    public sceneSendMessage(msgID: number, msgName: string, massage: any): void {
        var buffer: any = this.serialize(msgName, massage);
        ClientManager.getInstance().sceneSendMessage(msgID, buffer);
    }
}