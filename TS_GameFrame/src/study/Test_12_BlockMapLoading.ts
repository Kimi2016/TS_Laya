export default class Test_12_BlockMapLoading extends Laya.Sprite {

    private imagPath: string = "./res/atlas/orange.png";

    constructor() {
        super();
        Laya.stage.addChild(this)
    }

    onEnable(): void {
        console.log("onEnable                  **");
    }

    onDisable(): void {
        console.log("onDisable                  **");
    }

    onAwake(): void {
        console.log("onAwake                  **");
        Laya.stage.on("keydown", this, this.onKeyDown);
        Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
    }

    onKeyDown(e: Laya.Event): void {
        if (e.keyCode == Laya.Keyboard.UP) {
            console.log("Laya.Keyboard.UP");
        } else if (e.keyCode == Laya.Keyboard.DOWN) {
            console.log("Laya.Keyboard.DOWN");
        } else if (e.keyCode == Laya.Keyboard.LEFT) {
            console.log("Laya.Keyboard.LEFT");
        } else if (e.keyCode == Laya.Keyboard.RIGHT) {
            console.log("Laya.Keyboard.RIGHT");
        }
    }

    private scaleValue: number = 0;
    private MapX: number = 0;
    private MapY: number = 0;
    private mLastMouseX: number;
    private mLastMouseY: number;
    
    /**
     * 移动地图视口
     */
    private mouseMove(): void {
        var moveX: number = this.MapX - (Laya.stage.mouseX - this.mLastMouseX);
        var moveY: number = this.MapY - (Laya.stage.mouseY - this.mLastMouseY)
        //移动地图视口
        //this.tMap.moveViewPort(moveX, moveY);
    }
    private mouseUp(): void  {
        this.MapX = this.MapX - (Laya.stage.mouseX - this.mLastMouseX);
        this.MapY = this.MapY - (Laya.stage.mouseY - this.mLastMouseY);
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
    }
    private mouseDown(): void  {
        this.mLastMouseX = Laya.stage.mouseX;
        this.mLastMouseY = Laya.stage.mouseY;
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
    }
    /**
     *  改变视口大小
     *  重设地图视口区域
     */
    private resize(): void  {
        //改变视口大小
        //this.tMap.changeViewPort(this.MapX, this.MapY, Laya.Browser.width, Laya.Browser.height);
    }
}