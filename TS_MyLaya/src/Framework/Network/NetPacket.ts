import Byte = Laya.Byte
export default class NetPacket {
    //private WEBPACK_HEAD_OFFSET: number = 0;	// 自定义数据 一般是roleid (long类型)
    //private WEBPACK_MESSSAGEID_OFFSET: number = 8;	// 消息id
    //private WEBPACK_LENGTH_OFFSET: number = 12;	// 消息长度
    public WEBPACK_HEAD_SIZE: number = 16;	// 消息数据开始位置

    public roleid: number;
    public msgid: number;
    public body: Uint8Array;

    private readBytes: Byte;

    constructor() {
        this.readBytes = new Byte();
        this.readBytes.endian = Laya.Byte.LITTLE_ENDIAN;//这里我们采用小端
    }

    //接收服务器信息
    public receiveMsg(bytes: any): void {
        this.readBytes.writeArrayBuffer(bytes);
        this.readBytes.pos = 0;//设置偏移指针

        //按照服务器传递过来的数据，按照顺序读取
        this.roleid = this.readBytes.getFloat64();
        console.log("roleid：" + this.roleid);
        
        this.msgid = this.readBytes.getInt32();
        var msgLength = this.readBytes.getInt32();
        var ab = this.readBytes.readArrayBuffer(msgLength - this.WEBPACK_HEAD_SIZE);
        this.body = new Uint8Array(ab);

        //if (msgLength != this.readBytes.length) {
        //    console.error("消息长不一样");
        //}

        this.readBytes.clear();
    }
}