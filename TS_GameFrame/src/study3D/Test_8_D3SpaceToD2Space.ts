export default class Test_8_D3SpaceToD2Space {

    private scene: Laya.Scene3D;
    private camera: Laya.Camera;
    private role3D: Laya.Sprite3D;
    private layaMonkey2D: Laya.Image;
    private role3DPos: Laya.Vector3;
    private out2DPos: Laya.Vector3;
    private scaleDelta: number = 0;

    constructor() {
        this.scene = new Laya.Scene3D()
        Laya.stage.addChild(this.scene);

        this.role3DPos = new Laya.Vector3();
        this.out2DPos = new Laya.Vector3();

        this.camera = new Laya.Camera(0, 0.1, 100);
        this.scene.addChild(this.camera);
        this.camera.transform.translate(new Laya.Vector3(0, 0.35, 1));
        this.camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);

        this.camera.orthographic = true
        this.camera.orthographicVerticalSize = 10;

        //正交投影属性设置
        this.camera.orthographic = true;
        //正交垂直矩阵距离，控制3D物体远近与现实大小
        this.camera.orthographicVerticalSize = 7;
        //清除标记，仅深度
        this.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY;
        this.camera.clearColor = null;
        this.camera.cullingMask = Math.pow(2, 0) | Math.pow(2, 1)

        var directionLight: Laya.DirectionLight =  new Laya.DirectionLight;
        this.scene.addChild(directionLight)

        Laya.Sprite3D.load("./res/animation/player/mage/mage.lh", Laya.Handler.create(this, this.onLoadCompleted));
    }

    onLoadCompleted(sprite3D:Laya.Sprite3D): void {
        this.role3D = sprite3D;
        this.role3D.transform.scale = new Laya.Vector3(0.3, 0.3, 0.3);

        this.scene.addChild(sprite3D);
        this.layaMonkey2D = Laya.stage.addChild(new Laya.Image("./res/threeDimen/monkey.png")) as Laya.Image;

        Laya.timer.frameLoop(1, this, this.animate);
    }

    private animate(): void {
        this.role3DPos.x = Math.sin(this.scaleDelta += 0.01);
        this.role3D.transform.position = this.role3DPos;

        //3D空间转2D空间
        this.camera.viewport.project(this.role3D.transform.position, this.camera.projectionViewMatrix, this.out2DPos);
        this.layaMonkey2D.pos(this.out2DPos.x / Laya.stage.clientScaleX, this.out2DPos.y / Laya.stage.clientScaleY);
    }
}