export default class Test_12_3DTiledMap {
    //optimization():void{
    //    //当Tiled Mapa不再使用的时候，需要使用destroy()方法进行销毁，回收被占用的内存
    //    this.tMap.destroy();
    //    //自动缓存没有动画的地块
    //    this.tMap.autoCache = true;
    //    //自动缓存的类型,地图较大时建议使用normal
    //    this.tMap.autoCacheType = "normal";
    //    //消除缩放导致的缝隙,也就是去黑边，1.7.7版本新增的优化属性
    //    this.tMap.antiCrack = true;
    //    //开启图层合并
    //    this.tMap.enableMergeLayer = true;
    //
    //    //缓存区块的设置推荐
    //    //如果单图是15*15，缓存可区块可以设置为510*510（34倍），以此类推，尽量在原区块整数倍的前提下，设置在512左右。推荐为512*512
    //    //缓存区块的具体设置方法
    //    //为第五个参数gridSize创建一个512*512大小的Point对象实例
    //    //var gridSize:Laya.Point = new Laya.Point(512, 512);
    //
    //    //移除被非透明地块覆盖的部分
    //    //如果在Tiled Map中没有对图块设置type属性，那么即便开启了removeCoveredTile ，也是无效的。所以，开启之前，需要先在TiledMap编辑器中，为图块新增自定义属性type，并将设置为1
    //    this.tMap.removeCoveredTile = true;
    //}

    private tMap: Laya.TiledMap;
    private scaleValue: number = 0;
    private MapX: number = 0;
    private MapY: number = 0;
    private mLastMouseX: number;
    private mLastMouseY: number;


    constructor() {
        this.createMap();
    }

    private createMap(): void {
        //创建TiledMap实例
        this.tMap = new Laya.TiledMap();
        //创建Rectangle实例，视口区域
        var viewRect: Laya.Rectangle = new Laya.Rectangle();
        //视口扩充区域，把视口区域上、下、左、右扩充一下，防止视口移动时的穿帮
        var paddingRect: Laya.Rectangle = new Laya.Rectangle(0, 0, 100, 100);

        //创建TiledMap地图，加载orthogonal.json后，执行回调方法onMapLoaded()
        this.tMap.createMap("res/TiledMap/background.json", viewRect, Laya.Handler.create(this, this.onMapLoaded), paddingRect);
    }

    private onMapLoaded(): void {
        //与UI搭配的3D场景
        this.addUIScene();

        //设置缩放中心点为视口的左上角
        this.tMap.setViewPortPivotByScale(0, 0);
        //将原地图放大3倍
        //this.tMap.scale = 3;

        Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
        //Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        //Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown)
        this.resize();
    }

    //与UI搭配的3D场景
    addUIScene(): void {
        //重设置层次
        //var sprite = this.tMap.mapSprite()
        //Laya.stage.setChildIndex(sprite, 0)

        var scene3D: Laya.Scene3D = new Laya.Scene3D();
        Laya.stage.addChild(scene3D)

        var camera: Laya.Camera = new Laya.Camera(0, 0.1, 100);
        scene3D.addChild(camera);
        camera.transform.translate(new Laya.Vector3(0, 5, 10));
        camera.transform.rotate(new Laya.Vector3(-20, 0, 0), true, false);
        //正交投影属性设置
        camera.orthographic = true;
        //正交垂直矩阵距离，控制3D物体远近与现实大小
        camera.orthographicVerticalSize = 7;
        //清除标记，仅深度
        camera.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY;
        camera.clearColor = null;
        camera.cullingMask = Math.pow(2, 0) | Math.pow(2, 1)
        //console.log(camera.cullingMask);

        Laya.Sprite3D.load("res/animation/player/mage/mage.lh", Laya.Handler.create(this, this.onLoadCompleted, [scene3D]));
    }

    onLoadCompleted(scene3D: Laya.Scene3D, sprite3D: Laya.Sprite3D): void {
        scene3D.addChild(sprite3D);
    }

    private moveSpeed: number = 2;
    onKeyDown(e: Laya.Event): void {
        if (e.keyCode == Laya.Keyboard.UP) {
            this.MapY -= this.moveSpeed
            this.tMap.moveViewPort(0, this.MapY);
        } else if (e.keyCode == Laya.Keyboard.DOWN) {
            this.MapY += this.moveSpeed
            this.tMap.moveViewPort(0, this.MapY);
        } else if (e.keyCode == Laya.Keyboard.LEFT) {
            this.MapX -= this.moveSpeed
            this.tMap.moveViewPort(this.MapX, 0);
        } else if (e.keyCode == Laya.Keyboard.RIGHT) {
            this.MapX += this.moveSpeed
            this.tMap.moveViewPort(this.MapX, 0);
        }
    }

    /**
     * 移动地图视口
     */
    private mouseMove(): void {
        var moveX: number = this.MapX - (Laya.stage.mouseX - this.mLastMouseX);
        var moveY: number = this.MapY - (Laya.stage.mouseY - this.mLastMouseY)
        //移动地图视口
        this.tMap.moveViewPort(moveX, moveY);
    }
    private mouseUp(): void {
        this.MapX = this.MapX - (Laya.stage.mouseX - this.mLastMouseX);
        this.MapY = this.MapY - (Laya.stage.mouseY - this.mLastMouseY);
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
    }
    private mouseDown(): void {
        this.mLastMouseX = Laya.stage.mouseX;
        this.mLastMouseY = Laya.stage.mouseY;
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
    }
    /**
     *  改变视口大小
     *  重设地图视口区域
     */
    private resize(): void {
        //改变视口大小
        this.tMap.changeViewPort(this.MapX, this.MapY, Laya.Browser.clientWidth, Laya.Browser.clientHeight);
    }


}