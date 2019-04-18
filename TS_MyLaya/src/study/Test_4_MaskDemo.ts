// 程序入口
export default class Test_5_MaskDemo
{
    private Res:string;
    private img:Laya.Sprite;
    private cMask:Laya.Sprite;

    constructor()
    {
        //资源路径
        this.Res = "./res/atlas/comp.png";
        //先加载图片资源，在图片资源加载成功后，通过回调方法绘制图片并添加到舞台
        Laya.loader.load(this.Res,Laya.Handler.create(this,this.graphicsImg));
    }
    private graphicsImg():void{
        this.img = new Laya.Sprite();
        //获取图片资源，绘制到画布
        this.img.graphics.drawTexture(Laya.loader.getRes(this.Res),100,50);
        //添加到舞台
        Laya.stage.addChild(this.img);
        //创建遮罩对象
        this.cMask = new Laya.Sprite();
        //画一个圆形的遮罩区域
        this.cMask.graphics.drawCircle(100,0,100,"#ff0000");
        //圆形所在的位置坐标
        this.cMask.pos(100,50);
        //实现img显示对象的遮罩效果
        this.img.mask = this.cMask;
    }
}