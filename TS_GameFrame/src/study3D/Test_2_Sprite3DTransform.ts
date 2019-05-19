export default class Test_2_Sprite3DTransform {

    private role_clone0: Laya.Sprite3D;
    private role_clone1: Laya.Sprite3D;
    private role_clone2: Laya.Sprite3D;

    private _position: Laya.Vector3;
    private _rotate: Laya.Vector3;
    private _scale: Laya.Vector3;
    private scaleDelta = 0;
    private scaleValue = 0;

    constructor() {
        var scene = Laya.stage.addChild(new Laya.Scene3D());

        var camera: Laya.Camera = scene.addChild(new Laya.Camera(0, 0.1, 100)) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 5, 10));
        camera.transform.rotate(new Laya.Vector3(-20, 0, 0), true, false);

        this._position = new Laya.Vector3(-0.6, 0, 0);
        this._rotate = new Laya.Vector3(0, 1, 0);
        this._scale = new Laya.Vector3();

        Laya.Sprite3D.load("res/animation/player/mage/mage.lh", Laya.Handler.create(this, this.onLoadCompleted, [scene]));
    }

    onLoadCompleted(scene: Laya.Scene, sprite3D: Laya.Sprite3D): void {
        this.role_clone0 = sprite3D;
        scene.addChild(sprite3D);

        //克隆sprite3d
        this.role_clone1 = Laya.Sprite3D.instantiate(sprite3D, scene, false, new Laya.Vector3(-3, 0, 1.5));
        this.role_clone2 = Laya.Sprite3D.instantiate(sprite3D, scene, false, new Laya.Vector3(3, 0, 1.5));

        Laya.timer.frameLoop(1, this, this.setAnimateEffect);
    }

    setAnimateEffect(): void {
        this.scaleValue = Math.sin(this.scaleDelta += 0.1);

        this._position.y = this.scaleValue / 2;
        this.role_clone0.transform.position = this._position;

        this.role_clone1.transform.rotate(this._rotate, false, false);

        this._scale.x = this._scale.y = this._scale.z = Math.abs(this.scaleValue);
        this.role_clone2.transform.localScale = this._scale;
    }


}