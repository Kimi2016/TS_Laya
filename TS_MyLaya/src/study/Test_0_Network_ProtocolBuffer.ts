


export default class Test_0_Network_ProtocolBuffer {
    private protoBuf: any = Laya.Browser.window.protobuf;

    constructor() {
        //this.testProtobuf1();
        this.testProtobuf2();
    }


    /*private testProtobuf1(): void {
        this.protoBuf.load("./protobuf/protofile/protofile.proto", function (err: any, root: any) {
            if (err)
                throw err;

            // Obtain a message type
            var AwesomeMessage: any = root.lookup("PBMessage.AwesomeMessage");

            // Create a new message
            var message: any = AwesomeMessage.create(
                {
                    awesome_field: "AwesomeString"
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
                    awesome_field: "AwesomeString"
                }).finish();
            // ... do something with buffer


            // Decode an Uint8Array (browser) or Buffer (node) to a message
            var message: any = AwesomeMessage.decode(buffer);
            // ... do something with message

            console.log(message);

            this.createText(message.awesome_field);

            // If your application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.
        });
    }*/


    private testProtobuf2(): void {
        // Create a new message
        var message: PBMessage.AwesomeMessage = new PBMessage.AwesomeMessage();
        message.awesome_field = "AwesomeString";

        // Decode an Uint8Array (browser) or Buffer (node) to a message
        var buffer: Uint8Array = PBMessage.AwesomeMessage.encode(message).finish();

        console.log(buffer);

        // Decode an Uint8Array (browser) or Buffer (node) to a message
        var message: PBMessage.AwesomeMessage = PBMessage.AwesomeMessage.decode(buffer);

        this.createText(message.awesome_field);
    }


    private createText(msg: string): Laya.Text {
        var txt: Laya.Text = new Laya.Text();
        txt.text = "Protobuf：" + msg;
        txt.size(300, 50);
        txt.fontSize = 50;
        txt.color = "#ffffff";
        Laya.stage.addChild(txt);
        return txt;
    }

}