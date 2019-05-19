export default class Test_1_OrthographicCamera {
    constructor() {
        Laya3D.init(0, 0, true);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        var scene = Laya.stage.addChild(new Laya.Scene3D());

        var camera: Laya.Camera = scene.addChild(new Laya.Camera(0, 0.1, 100)) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 5, 10));
        camera.transform.rotate(new Laya.Vector3(-20, 0, 0), true, false);

        Laya.Sprite3D.load("res/animation/player/mage/mage.lh", Laya.Handler.create(null,function(sprite3D){
            scene.addChild(sprite3D)

            //克隆sprite3d
            var role_clone1: Laya.Sprite3D = Laya.Sprite3D.instantiate(sprite3D, scene, false, new Laya.Vector3(3, 0, 1.5));
            var role_clone2: Laya.Sprite3D = Laya.Sprite3D.instantiate(sprite3D, scene, false, new Laya.Vector3(-3, 0, 1.5));
        }));
    }
}