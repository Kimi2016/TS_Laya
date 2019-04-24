import ClientManager from "./ClientManager";
import Browser = Laya.Browser

export default class NetworkManager {

    private static instance: NetworkManager;
    private protoBuf: any = Browser.window.protobuf;
    private static protoRoot: any = null;
    private protofilePath: string = "./protobuf/protofile/protofile.proto";

    public static getInstance() {
        if (!this.instance) {
            this.instance = new NetworkManager();
        }
        return this.instance
    }

    private constructor() {
        this.loadProtofile();
    }

    private loadProtofile(): void {
        this.protoBuf.load(this.protofilePath, this.onAssetsLoaded);
    }

    private onAssetsLoaded(err: any, root: any): void {
        if (err) {
            throw err;
        }
        NetworkManager.protoRoot = root;
    }

    private lookup(massageName: string, massageContent: any): any {
        var MessageBody = NetworkManager.protoRoot.lookup(massageName)

        // Create a new message
        var message: any = MessageBody.create(massageContent);

        // Verify the message if necessary (i.e. when possibly incomplete or invalid)
        var errMsg: any = MessageBody.verify(message);
        if (errMsg) {
            throw Error(errMsg);
        }

        // Encode a message to an Uint8Array (browser) or Buffer (node)
        var buffer: any = MessageBody.encode(message).finish();
        // ... do something with buffer

        return buffer
    }

    /**
     * 发送消息
     * @param massageID 消息ID
     * @param massageName 消息名称--PBMassage.GM_VerifyVersion
     * @param massageContent 消息结体--PBMassage.GM_VerifyVersion = { version: "1", platform:1, istest:3 }
     */
    public sendMessage(massageID: any, massageName: any, massageContent: any): void {
        var buffer: any = this.lookup(massageName, massageContent);
        ClientManager.getSingleton().logic().sendByte(massageID, buffer);
    }

}