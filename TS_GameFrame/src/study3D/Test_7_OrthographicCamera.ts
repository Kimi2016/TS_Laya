export default class Test_7_OrthographicCamera {
    private _2DPos: Laya.Vector3 = new Laya.Vector3(310, 500, 0);
    private out3DPos: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
    private role3D: Laya.Sprite3D;
    private camera: Laya.Camera;

    constructor() {
        var image: Laya.Image = new Laya.Image("./res/cartoon2/background.jpg")
        Laya.stage.addChild(image)

        var scene: Laya.Scene3D = new Laya.Scene3D()
        Laya.stage.addChild(scene)

        this.camera = new Laya.Camera(0, 0.1, 1000)
        this.camera.transform.rotate(new Laya.Vector3(-45, 0, 0), false, false);
        this.camera.transform.translate(new Laya.Vector3(0, 2, 500))


        //正交投影属性设置
        this.camera.orthographic = true;
        //正交垂直矩阵距离，控制3D物体远近与现实大小
        this.camera.orthographicVerticalSize = 10;
        //清除标记，仅深度
        this.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY;
        this.camera.clearColor = null;
        this.camera.cullingMask = Math.pow(2, 0) | Math.pow(2, 1)

        scene.addChild(this.camera)

        var directionLight: Laya.DirectionLight = new Laya.DirectionLight();
        scene.addChild(directionLight)

        Laya.Sprite3D.load("./res/animation/player/mage/mage.lh", Laya.Handler.create(this, this.onLoadCompleted, [scene]));

        Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
    }

    onLoadCompleted(scene: Laya.Scene3D, sprite3D: Laya.Sprite3D): void {
        this.role3D = sprite3D;
        scene.addChild(sprite3D);
        this.role3D.transform.scale = new Laya.Vector3(0.3, 0.3, 0.3)
        this.resize()
    }

    resize(): void {
        //转换2D屏幕坐标系统到3D正交投影下的坐标系统
        this.camera.convertScreenCoordToOrthographicCoord(this._2DPos, this.out3DPos);
        this.role3D.transform.position = this.out3DPos;
    }
}