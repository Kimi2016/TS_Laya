


export default class Test_9_TimeLineUI
{
    constructor() {
        //加载图集成功后，执行onLoad回调方法
        Laya.loader.load("res/atlas/test.atlas",Laya.Handler.create(this,this.onLoaded));
    }
    
    private onLoaded():void{
        console.log("加载图集成功后，执行onLoad回调方法")
        //创建一个UI实例
        //var plan:TimeLineUI = new TimeLineUI()
        //添加到舞台
        //Laya.stage.addChild(plan);
        //播放UI场景中的动画
        //this.bear.play();
    }
}