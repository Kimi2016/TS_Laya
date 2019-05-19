export default class Test_4_CustomMesh {
    constructor() {

        var scene: Laya.Scene = Laya.stage.addChild(new Laya.Scene()) as Laya.Scene;

        var camera: Laya.Camera = scene.addChild(new Laya.Camera(0, 0.1, 100)) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 2, 5));
        camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);

        //var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        //directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);

        //平面
        var plane: Laya.MeshSprite3D = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(6, 6, 10, 10))
        scene.addChild(plane);

        //正方体
        var box: Laya.MeshSprite3D = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.5, 0.5, 0.5));
        scene.addChild(box);
        box.transform.position = new Laya.Vector3(1.5, 0.25, 0.6);
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);

        //球体
        var sphere: Laya.MeshSprite3D = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(0.25));
        scene.addChild(sphere);
        sphere.transform.position = new Laya.Vector3(0.5, 0.25, 0.6);

        //圆柱体
        var cylinder: Laya.MeshSprite3D =new Laya.MeshSprite3D(Laya.PrimitiveMesh.createCylinder(0.25, 1))
        scene.addChild(cylinder);
        cylinder.transform.position = new Laya.Vector3(-0.5, 0.5, 0.6);

        //胶囊体
        var capsule: Laya.MeshSprite3D = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createCapsule(0.25, 1))
        scene.addChild(capsule);
        capsule.transform.position = new Laya.Vector3(-1.5, 0.5, 0.6);
    }
}