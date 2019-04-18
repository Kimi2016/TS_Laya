
//1.2 用loadImage加载显示图片的示例
export default class Test_4_1_Sprite_DisplayImage
{  
    constructor() {
        this.showApe();
    }

    private showApe(): void {
        // 方法1：使用loadImage
        var ape: Laya.Sprite = new Laya.Sprite();
        ape.pos(100,50);
        Laya.stage.addChild(ape);
        ape.loadImage("./res/atlas/comp.png");
    }
}