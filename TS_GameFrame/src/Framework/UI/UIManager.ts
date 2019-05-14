
import Scene = Laya.Scene
import Handler = Laya.Handler
export default class UIManager {
    private static instance: UIManager;
    public static getInstance(): UIManager {
        return this.instance || (this.instance = new this());
    }

    private constructor() {

    }

    //所有界面集合
    private windowMap: { [path: string]: Scene } = {}


    //Open Loading
    public OpenLoading(): void {
        //Laya.Scene.open(UIPath.UI_Loading, false, null, Laya.Handler.create(this, function (loading) {
        //    Laya.Scene.setLoadingPage(loading)
        //}))
    }

    /**
     * 打开界面
     * @param	varUIPath	界面地址
     * @param	closeOther	是否关闭其他场景，默认为false（可选），【注意】被关闭的场景，如果没有设置autoDestroyAtRemoved=true，则资源可能不能被回收，需要自己手动回收
     * @param	complete	打开完成回调，返回场景实例（可选）
     */
    public OpenWindow(varUIPath: string, closeOther: boolean = false, complete: Function = null): void {
        Laya.Scene.open(varUIPath, closeOther, null, Laya.Handler.create(this, function (varScene: Scene) {
            complete && complete();
            this.windowMap[varUIPath] = varScene;
            //console.log("zOrder:" + varScene.zOrder);
        }))
    }

    /**
     * 闭关界面
     * @param varUIPath 界面地址
     */
    public CloseWindow(varUIPath:string): void {
        //Laya.Scene.close()
        if (this.windowMap[varUIPath])
        {
            this.windowMap[varUIPath].destroy();
            delete this.windowMap[varUIPath];
        }
    }

    //LoadPrefab(): void {
    //    Laya.loader.create("prefabs/Sprite.json", Handler.create(this, function(obj: any){
    //        var json: any = obj;
    //        var prefab: Laya.Prefab = new Laya.Prefab();
    //        var sprite = Laya.Pool.getItemByCreateFun("Sprite名字", prefab.create, prefab);
    //        Laya.stage.addChild(sprite);
    //    }));
    //}
    
}