export default class Test_13_DomElement {
    constructor() {
        this.testDomElement();
        this.testQrcode();
        this.testVideo();
    }

    //SVG
    private testDomElement(): void {
        var data: string = "data:image/svg+xml," + '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
            '<foreignObject width="100%" height="100%">' +
            '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
            '<em>I</em> like ' +
            '<span style="color:white; text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;">' +
            'cheese</span>' +
            '</div>' +
            '</foreignObject>' +
            '</svg>';
        var sp: Laya.Sprite = new Laya.Sprite();
        sp.pos(500, 0);
        sp.loadImage(data, Laya.Handler.create(this, function () {
            console.log("SVG onCompleted");
        }));
        Laya.stage.addChild(sp);
    }

    //二维码
    private testQrcode(): void {
        var div: any = Laya.Browser.document.createElement("div");
        var qrcode: any = new Laya.Browser.window.QRCode(div, {
            width: 100,
            height: 100
        });
        var url: string = "http://layabox.com/";

        //qrcode.clear(); // clear the code.
        qrcode.makeCode(url);// make another code.

        var qrcodeSp = new Laya.Sprite();
        qrcodeSp.pos(500, 100);
        Laya.stage.addChild(qrcodeSp);

        Laya.timer.once(1000, this, function () {
            var url: string = qrcode._oDrawing._elImage.src;//获取，注意这里是异步的，开发者可以加个延时在获取。
            //console.log("二维码:" + url);

            qrcodeSp.loadImage(url, Laya.Handler.create(this, function () {
                console.log("二维码 onCompleted");
            }));
        });
    }

    //video
    private testVideo(): void {
        var Hls: any = Laya.Browser.window.Hls;//获取对Hls的引用。
        var plyr: any = Laya.Browser.window.plyr;//获取对plyr的引用
        //获取video对象，就是页面上命名为“player”的标签
        var video: any = Laya.Browser.document.querySelector('#player');
        if (Hls.isSupported()) {
            var hls: any = new Hls();
            //加载m3u8源
            hls.loadSource('http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8');
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function (): void {
                video.play();
            });
        }
        plyr.setup(video);
    }

}