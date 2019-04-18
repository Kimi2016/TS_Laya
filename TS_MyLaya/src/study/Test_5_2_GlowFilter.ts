import Sprite = Laya.Sprite;
import Texture = Laya.Texture
import GlowFilter = Laya.GlowFilter;
import Handler = Laya.Handler;
    
//2.2 设置发光滤镜与阴影滤镜
export default class Test_5_2_GlowFilter
{
    //private imgPath: string = "./res/atlas/strawberry.png";
    private imgPath: string = "./res/atlas/strawberry.png";
    
    constructor() {
        Laya.loader.load(this.imgPath, Handler.create(this, this.setup));
    }
    
    setup(): void {
        this.createImg(100,50);
        this.createGlowFilter(400,50);
        this.createShadowFilter(700,50);
   }
   /**创建位图**/
   private createImg(w:number,h:number):Sprite
   {
        var img:Sprite = new Sprite();
        //加载显示图片
        img.loadImage(this.imgPath);
        img.pos(w,h)
        //添加到舞台
        Laya.stage.addChild(img);
        return img;
    }
   private createGlowFilter(w:number,h:number): void {
       //创建一个发光滤镜
       var glowFilter: GlowFilter = new GlowFilter("#ff0000", 10, 0, 0);
       //在坐标280,50创建位图
       var img:Sprite = this.createImg(w,h);
       //设置滤镜集合为发光滤镜
       img.filters = [glowFilter];
   }
   private createShadowFilter(w:number,h:number): void {
       //创建一个发光滤镜
       var shadowFilter: GlowFilter = new GlowFilter("#000000", 8, 8, 8);
       //在坐标460,50创建位图
       var img:Sprite = this.createImg(w,h);
       //设置滤镜为阴影滤镜
       img.filters = [shadowFilter];
   }
}