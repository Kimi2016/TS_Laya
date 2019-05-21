export default class Test_9_SkinAnimation_New {

    private changeActionButton: Laya.Button;
    private roleAnimator: Laya.Animator;
    private curStateIndex: number = 0;
    private clipName: Array<string> = ["idle", "run", "flash", "be_attack", "attack1"
    , "attack2", "attack3", "skill_1", "skill_2", "skill_3", "skill_4", "relive", "Site", "pickup", "walk", "sprint", "Site1"
    , "tp1", "tp2", "ride_up", "mine", "sit_down", "wounded_idle", "wounded_run", "flyup"];

    constructor() {
        var scene: Laya.Scene3D = new Laya.Scene3D();
        Laya.stage.addChild(scene)

        var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 1000))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 1.5, 4));
        camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
        //camera.addComponent(CameraMoveScript);

        var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(1, 1, 1);

        //var plane: Laya.Sprite3D = scene.addChild(Laya.Sprite3D.load("../../res/threeDimen/skinModel/Zombie/new/Plane.lh")) as Laya.Sprite3D;
        Laya.Sprite3D.load("./res/animation/player/mage/mage.lh", Laya.Handler.create(this, this.onLoadCompleted, [scene]));
    }

    onLoadCompleted(scene: Laya.Scene3D, sprite3D: Laya.Sprite3D): void {
        scene.addChild(sprite3D);
        //获取Animator动画组件
        this.roleAnimator = sprite3D.getChildAt(0).getComponent(Laya.Animator);
        this.loadUI();
    }

    private loadUI(): void {
        Laya.loader.load("./res/threeDimen/ui/button.png", Laya.Handler.create(this, this.createButton));
    }
    
    createButton(): void {
        this.changeActionButton = new Laya.Button("./res/threeDimen/ui/button.png", "切换动作");
        Laya.stage.addChild(this.changeActionButton);
        this.changeActionButton.size(160, 40);
        this.changeActionButton.labelBold = true;
        this.changeActionButton.labelSize = 30;
        this.changeActionButton.sizeGrid = "4,4,4,4";
        this.changeActionButton.scale(Laya.Browser.pixelRatio, Laya.Browser.pixelRatio);
        this.changeActionButton.pos(Laya.stage.width / 2 - this.changeActionButton.width * Laya.Browser.pixelRatio / 2, Laya.stage.height - 100 * Laya.Browser.pixelRatio);
        this.changeActionButton.on(Laya.Event.CLICK, this, this.playerAnimation);
    }

    playerAnimation(): void {
        //根据名称播放动画
        var index: number = ++this.curStateIndex % this.clipName.length;
        var playerName = this.clipName[index]
        console.log(playerName);
        this.roleAnimator.play(playerName);
    }

}