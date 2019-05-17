export default class Test_22_LayaAir3D_Animation {

    private roleAni:Laya.Animator;
    constructor() {
        this.setup()
    }

    setup(): void {
        //预加载角色动画资源
        //Laya.Sprite3D.load("LayaMonkey/LayaMonkey.lh", Laya.Handler.create(this,this.onModelOK));
        //Laya.loader.create(["LayaMonkey/LayaMonkey.lh", "animation/player/mage/mage.lh"],Laya.Handler.create(this,this.onModelOK),null,"Sprite3D");
        Laya.Sprite3D.load("animation/player/mage/mage.lh", Laya.Handler.create(this,this.onModelOK));
    }

    private onModelOK(sprite3D:Laya.Sprite3D): void {
        //添加3D场景
        var scene: Laya.Scene3D = new Laya.Scene3D();
        Laya.stage.addChild(scene);
        //设置场景在2D界面最后（最底层为第0层）
        Laya.stage.setChildIndex(scene, 0);

        //创建摄像机（纵横比，近距裁剪，远距裁剪）
        var camera: Laya.Camera = new Laya.Camera(0, 0.1, 1000);
        //加载到场景
        scene.addChild(camera);
        //旋转摄像机角度
        camera.transform.rotate(new Laya.Vector3(-25, 0, 0), false, false);
        //移动摄像机位置
        camera.transform.position = new Laya.Vector3(0, 5, 10);
        //加入摄像机移动控制脚本
        //camera.addComponent(CameraMoveScript);
        //添加蒙皮动画角色模型
        //var role3D: Laya.Sprite3D = Laya.loader.getRes("LayaMonkey/LayaMonkey.lh");
        //console.log(role3D);
        //console.log(sprite3D);
        
        //获取角色动画组件（.lh格式会把scene当做一层Sprite3D导出，因此组件是在子对象上）
        this.roleAni = sprite3D.getChildAt(0).getComponent(Laya.Animator) as Laya.Animator;
        //this.roleAni.play("run");
        
        Laya.timer.loop(5000, this, this.onDelayComplete)

        // 添加到场景
        scene.addChild(sprite3D);
    }

    private onDelayComplete():void{
        this.roleAni.play("run");
    }
}