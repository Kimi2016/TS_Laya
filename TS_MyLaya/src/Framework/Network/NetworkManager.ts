import ClientManager from "./ClientManager";
import Browser = Laya.Browser

export default class NetworkManager {

    private static instance: NetworkManager;
    private protoBuf: any = Browser.window.protobuf;
    private static protoRoot: any = null;
    private protofilePath: string = "../bin/res/protobuf/protofile.proto";

    public static getInstance(): NetworkManager {
        if (!this.instance) {
            this.instance = new NetworkManager();
        }
        return this.instance
    }

    private constructor() {
        //this.loadProtofile();
    }

    private loadProtofile(): void {
        this.protoBuf.load(this.protofilePath, this.onAssetsLoaded);
    }

    private onAssetsLoaded(err: any, root: any): void {
        if (err) {
            throw err;
        }
        NetworkManager.protoRoot = root;

        // Obtain a message type
        var AwesomeMessage: any = root.lookup("PBMessage.AwesomeMessage");

        // Create a new message
        var message: any = AwesomeMessage.create(
            {
                awesome_Field: "AwesomeString"
            });

        console.log(message);
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
     * 序列化 protocol-buffer
     * @param massageName 
     * @param massageContent 
     */
    public serialize(massageName: string, massageContent: any): any {
        return this.lookup(massageName, massageContent);
    }

    /**
     * 反序列化 protocol-buffer
     * @param massageName 
     * @param netPackage NetPackage
     */
    public deserialize(massageName: string, netPackage: any)  {
        var MessageBody = NetworkManager.protoRoot.lookup(massageName)
        // Decode an Uint8Array (browser) or Buffer (node) to a message
        var message: any = MessageBody.decode(netPackage.msg);
    }

    /**
     * 发送消息
     * @param massageID 消息ID
     * @param massageName 消息名称--PBMassage.GM_VerifyVersion
     * @param massageContent 消息结体--PBMassage.GM_VerifyVersion = { version: "1", platform:1, istest:3 }
     */
    public loginSendMessage(massageID: any, massageName: any, massageContent: any): void {
        var buffer: any = this.serialize(massageName, massageContent);
        ClientManager.getSingleton().loginSendMessage(massageID, buffer);
    }

    public logicSendMessage(massageID: any, massageName: any, massageContent: any): void {
        var buffer: any = this.serialize(massageName, massageContent);
        ClientManager.getSingleton().logicSendMessage(massageID, buffer);
    }

    public sceneSendMessage(massageID: any, massageName: any, massageContent: any): void {
        var buffer: any = this.serialize(massageName, massageContent);
        ClientManager.getSingleton().sceneSendMessage(massageID, buffer);
    }
}