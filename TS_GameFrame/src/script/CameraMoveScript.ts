export default class CameraMoveScript extends Laya.Sprite {
    private lastMouseX;
    private lastMouseY;
    private yawPitchRoll: Laya.Vector3 = new Laya.Vector3();
    private tempRotationZ: Laya.Quaternion = new Laya.Quaternion();
    private isMouseDown: boolean = false;
    private rotaionSpeed = 0.00006;

    private mainCameraAnimation = null;
    private camera: Laya.Camera = null;
    
    constructor() {
        super();
        Laya.stage.on("mousedown", this, this.mouseDown);
        Laya.stage.on("mouseup", this, this.mouseUp);
        Laya.stage.on("mouseout", this, this.mouseOut);
    }

    updateCamera(elapsedTime): void {
        if (!isNaN(this.lastMouseX) && !isNaN(this.lastMouseY)) {
            //Laya.KeyBoardManager.hasKeyDown(87) && this.camera.transform.translate(-0.002 * elapsedTime);
            //Laya.KeyBoardManager.hasKeyDown(83) && this.camera.moveForward(0.002 * elapsedTime);
            //Laya.KeyBoardManager.hasKeyDown(65) && this.camera.moveRight(-0.002 * elapsedTime);
            //Laya.KeyBoardManager.hasKeyDown(68) && this.camera.moveRight(0.002 * elapsedTime);
            //Laya.KeyBoardManager.hasKeyDown(81) && this.camera.moveVertical(0.002 * elapsedTime);
            //Laya.KeyBoardManager.hasKeyDown(69) && this.camera.moveVertical(-0.002 * elapsedTime);
            if (this.isMouseDown) {
                var offsetX = Laya.stage.mouseX - this.lastMouseX;
                var offsetY = Laya.stage.mouseY - this.lastMouseY;
                //var yprElem = this.yawPitchRoll.elements;
                //yprElem[0] -= offsetX * this.rotaionSpeed * elapsedTime;
                //yprElem[1] -= offsetY * this.rotaionSpeed * elapsedTime;
                //this.updateRotation();
            }
        }
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
    }

    updateRotation(): void {
        var yprElem = this.yawPitchRoll.forNativeElement;//this.yawPitchRoll.elements;
        if (Math.abs(yprElem[1]) < 1.50) {
            Laya.Quaternion.createFromYawPitchRoll(yprElem[0], yprElem[1], yprElem[2], this.tempRotationZ);
            this.camera.transform.localRotation = this.tempRotationZ;
        }
    }

    mouseDown(): void {
        this.camera.transform.localRotation.getYawPitchRoll(this.yawPitchRoll);
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
        this.isMouseDown = true;
    }

    mouseUp(e: any): void {
        this.isMouseDown = false;
    }

    mouseOut(e: any): void {
        this.isMouseDown = false;
    }
}