
//播放图集动画
export default class Test_7_AtlasAniDemo {
    private atlasPath: string = "res/atlas/Fruits.atlas"

    constructor() {
        this.atlasAnimation();
        this.createFrames();
        this.loadImages();
    }

    //播放图集动画
    private atlasAnimation(): void {
        //创建动画实例
        var ani = new Laya.Animation();
        //加载动画图集，加载成功后执行回调方法
        ani.loadAtlas(this.atlasPath, Laya.Handler.create(this, () => {
            //添加到舞台
            Laya.stage.addChild(ani);
            //播放动画
            ani.play();
        }));
    }

    //用createFrames创建动画模板来播放图集中指定的动画
    private createFrames(): void {
        //创建动画实例
        var ani = new Laya.Animation();
        ani.pos(300, 0);
        //加载动画图集，加载成功后执行回调方法
        ani.loadAtlas(this.atlasPath, Laya.Handler.create(this, () => {
            //添加到舞台
            Laya.stage.addChild(ani);
            //创建动画模板 fruits
            Laya.Animation.createFrames(this.aniUrls("Fruits/eat", 1, 4), "fruits");
            //循环播放动画
            ani.play(0, true, "fruits");
        }));
    }

    //用loadImages直接播放图集中指定的动画
    private loadImages():void {
        //创建动画实例
        var ani = new Laya.Animation();
        ani.pos(0, 300);
        //加载动画图集，加载成功后执行回调方法
        ani.loadAtlas(this.atlasPath, Laya.Handler.create(this, () => {
             //添加到舞台
             Laya.stage.addChild(ani);
            //通过数组加载动画资源，然后用play方法直接播放。由于loadImages方法返回的是Animation对象本身，可以直接使用“loadImages(...).play(...);”语法。
            ani.loadImages(this.aniUrls("Fruits/eat", 1, 4)).play();
        }));
    }

    /**
     * 创建一组动画的url数组（美术资源地址数组）
     * aniName  动作的名称，用于生成url
     * length   动画最后一帧的索引值，
     */
    private aniUrls(aniName: string, star: number, end: number): any {
        var urls: any = [];
        for (var i: number = star; i <= end; i++) {
            //动画资源路径要和动画图集打包前的资源命名对应起来
            urls.push(aniName + i + ".png");
        }

        return urls;
    }
}