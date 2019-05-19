export default class Test_3_MeshLoad {

    private scene:Laya.Scene;
    constructor() {
        Laya3D.init(0, 0, true);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        this.scene = new Laya.Scene();
        Laya.stage.addChild(this.scene);

        var camera: Laya.Camera = this.scene.addChild(new Laya.Camera(0, 0.1, 100)) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 0.8, 1.5));
        camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);

        var directionLight: Laya.DirectionLight = this.scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);

        //加载网格
        Laya.Mesh.load("./res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm", Laya.Handler.create(this, this.onLoadCompleted));
    }

    onLoadCompleted(layaMonkey: any): void {
        this.scene.addChild(layaMonkey);
        layaMonkey.transform.localScale = new Laya.Vector3(0.3, 0.3, 0.3);
        layaMonkey.transform.rotation = new Laya.Quaternion(0.7071068, 0, 0, -0.7071067);
    }
}