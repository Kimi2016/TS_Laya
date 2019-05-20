export default class Test_6_MultiCamera {
    
    constructor() {
        var scene: Laya.Scene3D = new Laya.Scene3D()
        Laya.stage.addChild(scene);

        var camera1: Laya.Camera = scene.addChild(new Laya.Camera(0, 0.1, 100)) as Laya.Camera;
        camera1.clearColor = new Laya.Vector4(0.3, 0.3, 0.3, 1.0);
        camera1.transform.translate(new Laya.Vector3(0, 2, 5));
        camera1.transform.rotate(new Laya.Vector3(-10, 0, 0), false, false);
        camera1.normalizedViewport = new Laya.Viewport(0, 0.5, 0.5, 1.0);

        //正交投影属性设置
        camera1.orthographic = true;
        //正交垂直矩阵距离，控制3D物体远近与现实大小
        camera1.orthographicVerticalSize = 7;
        //清除标记，仅深度
        camera1.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY;
        camera1.clearColor = null;
        camera1.cullingMask = Math.pow(2, 0) | Math.pow(2, 1)



        var camera2: Laya.Camera = scene.addChild(new Laya.Camera(0, 0.1, 100)) as Laya.Camera;
        camera2.clearColor = new Laya.Vector4(0.0, 0.0, 1.0, 1.0);
        camera2.transform.translate(new Laya.Vector3(0, 2, 5));
        camera1.transform.rotate(new Laya.Vector3(-10, 0, 0), false, false);
        camera2.normalizedViewport = new Laya.Viewport(0.5, 0.0, 0.5, 0.5);
        camera2.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;


        //正交投影属性设置
        camera2.orthographic = true;
        //正交垂直矩阵距离，控制3D物体远近与现实大小
        camera2.orthographicVerticalSize = 7;
        //清除标记，仅深度
        camera2.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY;
        camera2.clearColor = null;
        camera2.cullingMask = Math.pow(2, 0) | Math.pow(2, 1)
        
        Laya.Sprite3D.load("./res/animation/player/mage/mage.lh", Laya.Handler.create(this, this.onLoadCompleted, [scene]));
    }

    onLoadCompleted(scene:Laya.Scene3D, sprite3D: Laya.Sprite3D): void {
        scene.addChild(sprite3D);
    }
}