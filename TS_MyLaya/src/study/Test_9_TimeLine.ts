
export default class Test_9_TimeLine {
    constructor() {
        //加载图集成功后，执行onLoad回调方法
        Laya.loader.load("res/atlas/test.atlas", Laya.Handler.create(this, this.onLoaded));
    }

    private onLoaded(): void {
        var anil:Laya.Animation = this.createAnimation("test/TimeLine.ani");
        anil.play();
        
        
        // 这里有Bug，只能显示一个动画，不能显示两个以上的动画


        var ani2: Laya.Animation = this.createAnimation("test/TimeLine.ani");
        ani2.play(0, true, "pivot");
        ani2.pos(150, 300);
    }

    private createAnimation(name: string): Laya.Animation {
        //创建一个Animation实例
        var ani: Laya.Animation = new Laya.Animation();
        //加载动画文件
        ani.loadAnimation(name);
        //添加到舞台
        Laya.stage.addChild(ani);
        return ani;
    }
}