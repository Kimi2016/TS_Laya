
import BitmapFont = Laya.BitmapFont
import Stage = Laya.Stage
import Text = Laya.Text
import Handler = Laya.Handler
    
export default class Test_3_BitmapFont
{
    private fontName:string = "BMFont_fnt";

    constructor()
    {
        this.loadFont();
    }

    private loadFont():void
    {
        var bitmapFont:BitmapFont = new BitmapFont();
        bitmapFont.loadFont("./res/font/BMFont.fnt", new Handler(this, this.onFontLoaded, [bitmapFont]));
    }

    private onFontLoaded(bitmapFont:BitmapFont):void
    {
        //设置空格的宽（如果字体库有空格，这里就可以不用设置了）。
        bitmapFont.setSpaceWidth(10);
        Text.registerBitmapFont(this.fontName, bitmapFont);
        this.createText(this.fontName);
    }

    private createText(font:string):void
    {
        var txt:Text = new Text();
        txt.width = 250;
        txt.wordWrap = true;
        txt.font = font;
        txt.text = "位图字体的制作与使用";
        txt.leading = 5;
        txt.pos(Laya.stage.width - txt.width >> 1, Laya.stage.height - txt.height >> 1);
        Laya.stage.addChild(txt);
    }
}