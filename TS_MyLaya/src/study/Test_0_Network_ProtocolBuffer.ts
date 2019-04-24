


export default class Test_0_Network_ProtocolBuffer {
    private ProtoBuf: any = Laya.Browser.window.protobuf;

    constructor() {
        this.ProtoBuf.load("./protobuf/protofile/protofile.proto", this.onAssetsLoaded);
    }

    private onAssetsLoaded(err: any, root: any): void {
        if (err)
            throw err;

        // Obtain a message type
        var AwesomeMessage: any = root.lookup("PBMassage.AwesomeMessage");

        // Create a new message
        var message: any = AwesomeMessage.create(
            {
                awesomeField: "AwesomeString"
            });

        // Verify the message if necessary (i.e. when possibly incomplete or invalid)
        var errMsg: any = AwesomeMessage.verify(message);
        if (errMsg)
            throw Error(errMsg);

        // Encode a message to an Uint8Array (browser) or Buffer (node)
        var buffer: any = AwesomeMessage.encode(message).finish();
        // ... do something with buffer

        // Or, encode a plain object
        var buffer: any = AwesomeMessage.encode(
            {
                awesomeField: "AwesomeString"
            }).finish();
        // ... do something with buffer

        // Decode an Uint8Array (browser) or Buffer (node) to a message
        var message: any = AwesomeMessage.decode(buffer);
        // ... do something with message

        // If your application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.
    }
}