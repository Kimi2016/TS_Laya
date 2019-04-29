import Byte = Laya.Byte
import SocketConnect from "./SocketConnect";
export default class NetPacket {
    //private WEBPACK_HEAD_OFFSET: number = 0;	// 自定义数据 一般是roleid (long类型)
    //private WEBPACK_MESSSAGEID_OFFSET: number = 8;	// 消息id
    //private WEBPACK_LENGTH_OFFSET: number = 12;	// 消息长度
    public WEBPACK_HEAD_SIZE: number = 16;	// 消息数据开始位置

    public roleId: number;
    public messageId: number;
    public message: any;

    private readBytes: Byte;
    private socketConnect: SocketConnect;

    constructor(connect: any) {
        this.socketConnect = connect
        this.readBytes = new Byte();
        this.readBytes.endian = Laya.Byte.LITTLE_ENDIAN;//这里我们采用小端
    }

    //接收服务器信息
    public receiveMsg(bytes: any): void {
        this.readBytes.writeArrayBuffer(bytes);
        this.readBytes.pos = 0;//设置偏移指针

        //按照服务器传递过来的数据，按照顺序读取
        this.roleId = this.readBytes.getFloat64();
        this.messageId = this.readBytes.getInt32();
        let msgLength = this.readBytes.getInt32();
        let ab = this.readBytes.readArrayBuffer(msgLength - this.WEBPACK_HEAD_SIZE);
        let buffer = new Uint8Array(ab);
        this.message = this.socketConnect.deserialize(this.messageId, buffer)

        //if (msgLength != this.readBytes.length) {
        //    console.error("消息长不一样");
        //}

        this.readBytes.clear();
    }
}