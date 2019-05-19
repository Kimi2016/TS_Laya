export default class Test_5_LightDemo {

    private scene: Laya.Scene3D;
    constructor() {
        this.scene = new Laya.Scene3D()
        Laya.stage.addChild(this.scene);

        var camera: Laya.Camera = this.scene.addChild(new Laya.Camera(0, 0.1, 100)) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 2, 5));
        camera.transform.rotate(new Laya.Vector3(-10, 0, 0), true, false);
        //camera.addComponent(CameraMoveScript);

        this.addLight()

        Laya.Sprite3D.load("./res/animation/player/mage/mage.lh", Laya.Handler.create(this, this.onLoadCompleted));

        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown)
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp)
    }
    
    onLoadCompleted(sprite3D: Laya.Sprite3D): void {
        this.role3D = sprite3D
        this.scene.addChild(sprite3D);
    }

    addLight(): void {
        //方向光
        //var directionLight: Laya.DirectionLight = new Laya.DirectionLight();
        //this.scene.addChild(directionLight);
        //directionLight.color = new Laya.Vector3(0.7, 0.6, 0.6);

        //点光
        //var pointLight: Laya.PointLight = this.scene.addChild(new Laya.PointLight()) as Laya.PointLight;
        //pointLight.color = new Laya.Vector3(0.1189446, 0.5907708, 0.7352941);
        //pointLight.transform.position = new Laya.Vector3(0.4, 0.4, 0.0);
        //pointLight.range = 3.0;

        //聚光灯
        var spotLight: Laya.SpotLight = this.scene.addChild(new Laya.SpotLight()) as Laya.SpotLight;
        spotLight.color = new Laya.Vector3(1, 1, 0);
        spotLight.transform.position = new Laya.Vector3(0.0, 2, 2);
        spotLight.range = 6.0;
    }

    private role3D: Laya.Sprite3D;
    private mouseX: number = 0;
    private rotateSpeed:number = 0.3;

    onMouseDown(): void {
        this.mouseX = Laya.stage.mouseX;
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.updateRotate)
    }

    onMouseUp(): void {
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.updateRotate)
    }

    updateRotate(): void {
        var rotate = this.mouseX - Laya.stage.mouseX;
        if (rotate > 0)
        {
            rotate = -this.rotateSpeed;
            this.role3D.transform.rotate(new Laya.Vector3(0, rotate))
        }
        else if (rotate < 0)
        {
            rotate = this.rotateSpeed;
            this.role3D.transform.rotate(new Laya.Vector3(0, rotate))
        }
        this.mouseX = Laya.stage.mouseX;
    }
}