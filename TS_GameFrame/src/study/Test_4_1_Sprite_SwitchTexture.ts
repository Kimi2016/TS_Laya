import Sprite = Laya.Sprite;
import Texture = Laya.Texture;
import Handler = Laya.Handler;

//1.3 用loadImage切换图片的示例
export default class Test_4_1_Sprite_SwitchTexture {
    private texture1: string = "./res/atlas/comp.png";
    private texture2: string = "./res/atlas/test.png";
    private flag: boolean = false;
    private sprite: Sprite;

    constructor() {
        Laya.loader.load([this.texture1, this.texture2], Handler.create(this, this.onAssetsLoaded));
    }
    private onAssetsLoaded(): void {
        this.sprite = new Sprite();
        Laya.stage.addChild(this.sprite);
        this.sprite.pivot(55, 72);
        this.sprite.pos(100,50);
        // 显示默认纹理
        this.switchTexture();
        this.sprite.on("click", this, this.switchTexture);
    }
    private switchTexture(): void {
        var textureUrl: string = (this.flag = !this.flag) ? this.texture1 : this.texture2;
        // 更换纹理
        this.sprite.graphics.clear();
        var texture: Texture = Laya.loader.getRes(textureUrl);
        this.sprite.loadImage(textureUrl);
        // 设置交互区域
        this.sprite.size(texture.width, texture.height);
    }
}