//2.2 用drawTexture 加载显示图片的示例

import Handler = Laya.Handler
import Texture = Laya.Texture
import Sprite = Laya.Sprite

export default class Test_4_2_Sprite_DisplayImage {
    private texture1: string = "./res/atlas/comp.png";
    constructor() {
        this.showApe();
    }
    private showApe(): void {
        // 方法2：使用drawTexture
        Laya.loader.load(this.texture1, Handler.create(this, function(): void {
            var t: Texture = Laya.loader.getRes(this.texture1);
            var ape: Sprite = new Sprite();
            ape.graphics.drawTexture(t, 0, 0);
            Laya.stage.addChild(ape);
            ape.pos(100, 50);
        }));
    }
}