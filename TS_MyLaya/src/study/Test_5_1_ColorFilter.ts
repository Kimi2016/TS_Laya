
import Sprite = Laya.Sprite
import Texture = Laya.Texture
import ColorFilter = Laya.ColorFilter
import Handler = Laya.Handler

//1.2 设置颜色滤镜
export default class Test_5_1_ColorFilter
{
    //private imgPath: string = "./././laya/assets/test/if_grapes_2003194.png";
    private imgPath: string = "./res/atlas/orange.png";
    private img:Texture;
    
    constructor() {
        Laya.loader.load(this.imgPath, Handler.create(this, this.setup));
    }

    private setup(): void {
        this.normalizeImg();
        this.makeRedImg();
        this.grayingImg();
    }
    
    private normalizeImg(): void {
        var original: Sprite = this.createImg();
        this.img = Laya.loader.getRes(this.imgPath);
        original.x = 0;
        original.y = 100;
    }
    private makeRedImg(): void {
        //由 20 个项目（排列成 4 x 5 矩阵）组成的数组，红色
        var redMat: Array<number> =
            [
                1, 0, 0, 0, 0, //R
                0, 0, 0, 0, 0, //G
                0, 0, 0, 0, 0, //B
                0, 0, 0, 1, 0, //A
            ];
        //创建一个颜色滤镜对象,红色
        var redFilter: ColorFilter = new ColorFilter(redMat);
        // 赤化猩猩
        var red: Sprite = this.createImg();
        red.filters = [redFilter];
        var firstChild: any = Laya.stage.getChildAt(0);
        red.x = firstChild.x + this.img.width;
        red.y = firstChild.y;
    }
    private grayingImg(): void {
        //由 20 个项目（排列成 4 x 5 矩阵）组成的数组，灰图
        var grayscaleMat: Array<number> = [
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0, 0, 0, 1, 0];
        //创建一个颜色滤镜对象，灰图
        var grayscaleFilter: ColorFilter = new ColorFilter(grayscaleMat);
        // 灰度猩猩
        var gray: Sprite = this.createImg();
        gray.filters = [grayscaleFilter];
        var secondChild: any = Laya.stage.getChildAt(1);
        gray.x = secondChild.x + this.img.width;
        gray.y = secondChild.y;
    }
    private createImg(): Sprite {
        var sprite: Sprite = new Sprite();
        sprite.loadImage(this.imgPath);
        Laya.stage.addChild(sprite);
        return sprite;
    }
}