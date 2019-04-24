
class SocketChannel {

    WEBPACK_HEAD_OFFSET:number =		0;	// 自定义数据 一般是roleid (long类型)
    WEBPACK_MESSSAGEID_OFFSET:number =	8;	// 消息id
    WEBPACK_LENGTH_OFFSET:number =		12;	// 消息长度
    WEBPACK_HEAD_SIZE:number =			16;	// 消息数据开始位置


    public socket: Laya.Socket = null;
    private byte: Laya.Byte = null;
    private url: string = null;
    private tips: string = null;

    constructor(tips: string) {
        this.tips = tips;
        this.byte = new Laya.Byte();
        this.byte.endian = Laya.Byte.LITTLE_ENDIAN;//这里我们采用小端
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

    public connected() {
        return this.socket.connected;
    }

    private openHandler(event: any = null): void {
        //正确建立连接
        console.log(this.url + this.tips + "  正确建立连接");
        this.sendString(this.tips + "正确建立连接");
    }

    private receiveHandler(msg: any = null): void {
        console.log("Message from server:");
        
        if (typeof msg == "string") {
            console.log(msg);
        }
        else if (msg instanceof ArrayBuffer) {
            console.log(new Laya.Byte(msg).readUTFBytes());

            this.byte.clear();
            this.byte.writeArrayBuffer(msg);//把接收到的二进制数据读进byte数组便于解析。
            this.byte.pos = 0;//设置偏移指针；

            //接收到数据
            console.log(this.url + this.tips + " 接收到数据：" + this.byte.readUTFString());

            ////下面开始读取数据，按照服务器传递过来的数据，按照顺序读取
            var a: number = this.byte.getByte();
            var b: number = this.byte.getInt16();
            var c: number = this.byte.getFloat32();
            var d: string = this.byte.getString();
            var e: string = this.byte.getUTFString();
        }
        this.socket.input.clear();
    }

    private closeHandler(event: any = null): void {
        //关闭连接事件
        console.log(this.url + this.tips + " 关闭连接事件");
    }

    private errorHandler(e: any = null): void {
        //连接出错
        console.log(this.url + this.tips + " 连接出错");
    }

    //发送字符串格式
    public sendString(content: string): void {
        this.send(content);
    }

    //发送二进制数据
    public sendByte(content: Laya.Byte): void {
        this.byte.writeByte(1);//写入一个字节
        this.byte.writeInt16(20);//写入一个int16的数据
        this.byte.writeFloat32(20.5);//写入一个32位的浮点数据
        this.byte.writeUTFString("hello");// 写入一个字符串；

        var by: Laya.Byte = new Laya.Byte();//这里声明一个临时Byte类型
        by.endian = Laya.Byte.LITTLE_ENDIAN;//设置endian；
        by.writeInt32(5000);//写入一个int32数据
        by.writeUint16(16);//写入一个uint16 数据

        this.byte.writeArrayBuffer(by.buffer);//把临时字节数据的数据写入byte中，这里注意写入的是by.buffer;
        this.send(this.byte.buffer);//这里是把字节数组的数据通过socket发送给服务器。
        this.byte.clear();//清除掉数据;方便下次读写；
    }

    //需要发送的数据(String或者ArrayBuffer)
    private send(content: any): void {
        this.socket.send(content);
    }
}