import NetEventDispatcher from "../Event/NetEventDispatcher"
import NetPacket from "./NetPacket"
import NetworkManager from "./NetworkManager"
import NetMessageName from "./NetMessageName";


export default class SocketConnect {

    //private WEBPACK_HEAD_OFFSET: number = 0	// 自定义数据 一般是roleid (long类型)
    //private WEBPACK_MESSSAGEID_OFFSET: number = 8	// 消息id
    //private WEBPACK_LENGTH_OFFSET: number = 12	// 消息长度
    private WEBPACK_HEAD_SIZE: number = 16	// 消息数据开始位置


    public socket: Laya.Socket = null
    private sendBytes: Laya.Byte = null
    private readBytes: Laya.Byte = null
    private tempBytes: Laya.Byte = null
    private url: string = null
    private tips: string = null
    private pbMessageName: any = null
    private protoRoot: any = null;

    public onConnect:Function = null;
    public onDisconnect:Function = null;

    //private sendNetPacket: Array<NetPacket> = null
    //private receiveNetPacket: Array<NetPacket> = null

    constructor(tips: string) {
        this.tips = tips
        this.sendBytes = new Laya.Byte()
        this.sendBytes.endian = Laya.Byte.LITTLE_ENDIAN//这里我们采用小端
        this.tempBytes = new Laya.Byte()
        this.tempBytes.endian = Laya.Byte.LITTLE_ENDIAN//这里我们采用小端

        //this.sendNetPacket = new Array<NetPacket>() //发送的网络包
        //this.receiveNetPacket = new Array<NetPacket>() //接收的网络包

        this.protoRoot = Laya.Browser.window["PBMessage"]
        this.pbMessageName = NetMessageName.getMap()
    }
    public connect(host: string, port: number): void {
        this.url = host.concat(port.toString())
        this.connectByUrl(this.url)
    }
    //"ws://localhost:8989"
    public connectByUrl(url: string): void {
        this.url = url
        this.socket = new Laya.Socket()
        this.socket.endian = Laya.Byte.LITTLE_ENDIAN//这里我们采用小端
        this.socket.connectByUrl(url)
        this.socket.on(Laya.Event.OPEN, this, this.openHandler)
        this.socket.on(Laya.Event.MESSAGE, this, this.receiveHandler)
        this.socket.on(Laya.Event.CLOSE, this, this.closeHandler)
        this.socket.on(Laya.Event.ERROR, this, this.errorHandler)
    }
    //重新连接
    public reconnect() {
        this.socket.cleanSocket()
        this.connectByUrl(this.url)
    }
    //断开连接
    public disconnected() {
        this.socket.close()
    }
    //是否连接
    public connected() {
        return this.socket.connected
    }
    //正确建立连接
    private openHandler(event: any = null): void {
        console.log(this.url + this.tips + "  正确建立连接")
        if (this.onConnect){
            this.onConnect()
        }
    }
    //关闭连接事件
    private closeHandler(event: any = null): void {
        console.log(this.url + this.tips + " 关闭连接事件")
        if (this.onDisconnect){
            this.onDisconnect()
        }
    }
    //连接出错
    private errorHandler(e: any = null): void {
        console.log(this.url + this.tips + " 连接出错")
    }

    //发送空消息
    public sendEmpty(msgId: number): void {
        // 写入一个数字0
        this.tempBytes.writeFloat32(0)
        this.send(msgId, this.tempBytes)
        this.tempBytes.clear()
    }

    //发送消息
    public sendMessage(msgId: number, msg: any): void {
        //if (typeof msg == "string") {
        //    this.tempBytes.writeUTFString(msg)
        //    this.send(msgId, this.tempBytes)
        //}
        //else if (msg instanceof ArrayBuffer) {
        //    this.tempBytes.writeArrayBuffer(buffer)
        //    this.send(msgId, this.tempBytes)
        //}
        //else
        {
            let buffer: Uint8Array = this.serialize(msgId, msg)
            this.tempBytes.writeArrayBuffer(buffer)
            this.send(msgId, this.tempBytes)
        }
    }

    //需要发送的数据
    private send(msgId: number, byte: Laya.Byte): void {
        if (!this.socket.connected) {
            console.log("The connection has been disconnected.")
            return
        }
        //WEBPACK_HEAD_OFFSET
        this.sendBytes.writeFloat64(NetworkManager.getInstance().getRoleId())
        //WEBPACK_MESSSAGEID_OFFSET
        this.sendBytes.writeInt32(msgId)
        //WEBPACK_LENGTH_OFFSET
        this.sendBytes.writeInt32(this.WEBPACK_HEAD_SIZE + byte.length)
        //Massge body
        this.sendBytes.writeArrayBuffer(byte.buffer)
        //这里是把字节数组的数据通过socket发送给服务器
        this.socket.send(this.sendBytes.buffer)
        //清除掉数据，方便下次读写
        this.sendBytes.clear()
        this.tempBytes.clear()
    }

    //接收到数据
    private receiveHandler(msg: any): void {
        //console.log("Message from server:  " + new Laya.Byte(msg).readUTFBytes())
        var netPacket: NetPacket = new NetPacket(this)
        netPacket.receiveMsg(msg)
        this.socket.input.clear()
        NetEventDispatcher.getInstance().dispatch(netPacket.messageId, netPacket)
    }

    /**
     * 序列化 protocol-buffer
     * @param massageId 
     * @param massage
     */
    public serialize(massageId: number, massage: any): Uint8Array {
        let massageName: string = this.pbMessageName[massageId]
        // Encode a message to an Uint8Array (browser) or Buffer (node)
        var buffer: any = this.protoRoot[massageName].encode(massage).finish();
        return buffer;
    }

    /**
     * 反序列化 protocol-buffer
     * @param massageName 
     * @param netPackage NetPackage
     */
    public deserialize(massageId: number, massage: Uint8Array): any {
        let massageName: string = this.pbMessageName[massageId]
        // Decode an Uint8Array (browser) or Buffer (node) to a message
        var message: any = this.protoRoot[massageName].decode(massage);
        return message;
    }

}