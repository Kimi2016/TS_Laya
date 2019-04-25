
class NetPacket {
    //private WEBPACK_HEAD_OFFSET: number = 0;	// 自定义数据 一般是roleid (long类型)
    //private WEBPACK_MESSSAGEID_OFFSET: number = 8;	// 消息id
    //private WEBPACK_LENGTH_OFFSET: number = 12;	// 消息长度
    //private WEBPACK_HEAD_SIZE: number = 16;	// 消息数据开始位置

    public roleid: number;
    public msgid: number;
    public msg: ArrayBuffer;


    //接收服务器信息
    public receiveMsg(byte: Laya.Byte): void {

        //按照服务器传递过来的数据，按照顺序读取
        //var a: number = this.byte.getByte();
        //var b: number = this.byte.getInt16();
        //var c: number = this.byte.getFloat32();
        //var d: string = this.byte.getString();
        //var e: string = this.byte.getUTFString();

        this.roleid = byte.getFloat64();
        this.msgid = byte.getFloat32();
        var msgLength = byte.getFloat32();
        this.msg = byte.readArrayBuffer(msgLength);

        if (msgLength != this.msg.byteLength) {
            //消息长不一样
            console.error("消息长不一样");
        }
    }
}

class SocketConnect {

    private WEBPACK_HEAD_OFFSET: number = 0;	// 自定义数据 一般是roleid (long类型)
    private WEBPACK_MESSSAGEID_OFFSET: number = 8;	// 消息id
    private WEBPACK_LENGTH_OFFSET: number = 12;	// 消息长度
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
        this.readBytes = new Laya.Byte();
        this.readBytes.endian = Laya.Byte.LITTLE_ENDIAN;//这里我们采用小端
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
        console.log(this.url + this.tips + "  正确建立连接");
    }

    //接收到数据
    private receiveHandler(msg: any): void {
        //console.log("Message from server:");
        //console.log(new Laya.Byte(msg).readUTFBytes());

        this.readBytes.clear();
        this.readBytes.writeArrayBuffer(msg);//把接收到的二进制数据读进byte数组便于解析
        this.readBytes.pos = 0;//设置偏移指针

        //接收到数据
        //console.log(this.url + this.tips + " 接收到数据：" + this.readBytes.readUTFString());

        var netPacket: NetPacket = new NetPacket();
        netPacket.receiveMsg(this.readBytes);

        this.socket.input.clear();
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
        // 写入一个字符串
        this.tempBytes.writeUTFString(content);
        this.send(msgId, this.tempBytes);
        //清除掉数据，方便下次读写
        this.tempBytes.clear();
    }

    //发送二进制数据
    public sendByte(msgId: number, layaByte: Laya.Byte): void {
        this.send(msgId, layaByte);
    }

    //需要发送的数据(String或者Laya.Byte)
    private send(msgId: number, layaByte: Laya.Byte): void {
        //WEBPACK_HEAD_OFFSET
        this.sendBytes.writeFloat64(0);
        //WEBPACK_MESSSAGEID_OFFSET
        this.sendBytes.writeFloat32(msgId);
        //WEBPACK_LENGTH_OFFSET
        this.sendBytes.writeFloat32(layaByte.length);
        //Massge body
        this.sendBytes.writeArrayBuffer(layaByte.buffer);

        //这里是把字节数组的数据通过socket发送给服务器
        this.socket.send(this.sendBytes.buffer);
        //清除掉数据，方便下次读写
        this.sendBytes.clear();
    }
}