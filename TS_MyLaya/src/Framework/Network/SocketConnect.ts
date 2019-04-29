import NetworkEventManager from "../Event/NetworkEventDispatcher";
import NetPacket from "./NetPacket";
import NetworkManager from "./NetworkManager";


export default class SocketConnect {

    //private WEBPACK_HEAD_OFFSET: number = 0;	// 自定义数据 一般是roleid (long类型)
    //private WEBPACK_MESSSAGEID_OFFSET: number = 8;	// 消息id
    //private WEBPACK_LENGTH_OFFSET: number = 12;	// 消息长度
    private WEBPACK_HEAD_SIZE: number = 16;	// 消息数据开始位置


    public socket: Laya.Socket = null;
    private sendBytes: Laya.Byte = null;
    private readBytes: Laya.Byte = null;
    private tempBytes: Laya.Byte = null;
    private url: string = null;
    private tips: string = null;

    //private sendNetPacket: Array<NetPacket> = null;
    //private receiveNetPacket: Array<NetPacket> = null;

    constructor(tips: string) {
        this.tips = tips;
        this.sendBytes = new Laya.Byte();
        this.sendBytes.endian = Laya.Byte.LITTLE_ENDIAN;//这里我们采用小端
        this.tempBytes = new Laya.Byte();
        this.tempBytes.endian = Laya.Byte.LITTLE_ENDIAN;//这里我们采用小端

        //this.sendNetPacket = new Array<NetPacket>(); //发送的网络包
        //this.receiveNetPacket = new Array<NetPacket>(); //接收的网络包
    }
    public connect(host: string, port: number): void {
        this.url = host.concat(port.toString());
        this.connectByUrl(this.url);
    }
    //"ws://localhost:8989"
    public connectByUrl(url: string): void {
        this.url = url;
        this.socket = new Laya.Socket();
        this.socket.endian = Laya.Byte.LITTLE_ENDIAN;//这里我们采用小端
        this.socket.connectByUrl(url);
        this.socket.on(Laya.Event.OPEN, this, this.openHandler);
        this.socket.on(Laya.Event.MESSAGE, this, this.receiveHandler);
        this.socket.on(Laya.Event.CLOSE, this, this.closeHandler);
        this.socket.on(Laya.Event.ERROR, this, this.errorHandler);
    }
    public reConnect() {
        this.socket.cleanSocket();
        this.connectByUrl(this.url);
    }
    public disConnect() {
        this.socket.close();
    }
    //是否连接
    public connected() {
        return this.socket.connected;
    }
    //正确建立连接
    private openHandler(event: any = null): void {
        //console.log(this.url + this.tips + "  正确建立连接");
    }
    //接收到数据
    private receiveHandler(msg: any): void {
        //console.log("Message from server:  " + new Laya.Byte(msg).readUTFBytes());
        var netPacket: NetPacket = new NetPacket();
        netPacket.receiveMsg(msg);
        this.socket.input.clear();
        NetworkEventManager.getInstance().Dispatch(netPacket.msgid, netPacket);
    }

    //关闭连接事件
    private closeHandler(event: any = null): void {
        console.log(this.url + this.tips + " 关闭连接事件");
    }

    //连接出错
    private errorHandler(e: any = null): void {
        console.log(this.url + this.tips + " 连接出错");
    }

    //发送空消息
    public sendEmpty(msgId: number): void {
        // 写入一个数字0
        this.tempBytes.writeFloat32(0);
        this.send(msgId, this.tempBytes);
        this.tempBytes.clear();
    }

    //发送字符串格式
    public sendString(msgId: number, content: string): void {
        this.tempBytes.writeUTFString(content);
        this.send(msgId, this.tempBytes);
        //清除掉数据，方便下次读写
        this.tempBytes.clear();
    }

    //发送二进制数据
    public sendByte(msgId: number, bytes: Uint8Array): void {
        this.tempBytes.writeArrayBuffer(bytes);
        this.send(msgId, this.tempBytes);
        //清除掉数据，方便下次读写
        this.tempBytes.clear();
    }

    //需要发送的数据
    private send(msgId: number, byte: Laya.Byte): void {
        if (!this.socket.connected) {
            console.log("connected:" + this.socket.connected);            
            return;
        }
        //WEBPACK_HEAD_OFFSET
        this.sendBytes.writeFloat64(NetworkManager.getInstance().getRoleId());
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
    }
}