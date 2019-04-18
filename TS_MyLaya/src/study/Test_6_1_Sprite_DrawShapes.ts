import Sprite = Laya.Sprite

export default class Test_6_1_Sprite_DrawShapes
{
    constructor()
    {
        this.drawSomething1();
        this.drawSomething2();
        this.drawSomething3();
        this.drawSomething4();
        this.drawSomething5();
        this.drawSomething6();
        this.drawSomething7();
        this.drawSomething8();
        this.drawSomething9();
        this.drawSomething10();
    }

    //绘制直线
    private drawSomething1(): void {
        var s:Sprite = new Sprite();
        Laya.stage.addChild(s);
        //画直线
        s.graphics.drawLine(10, 58, 146, 58, "#ff0000", 3);
    }
    //绘制折线
    private drawSomething2():void{
        var s:Sprite = new Sprite();
        Laya.stage.addChild(s);
        //画折线
        s.graphics.drawLines(10, 150, [0, 0, 39, -50, 78, 0, 120, -50], "#ff0000", 3);
    }
    //绘制二次贝塞尔曲线
    private drawSomething3():void{
        var s:Sprite = new Sprite();
        Laya.stage.addChild(s);
        //画折线
        s.graphics.drawCurves(250, 58, [0, 0, 19, -100, 39, 0], "#ff0000", 3);

        s = new Sprite();
        Laya.stage.addChild(s);
        //增加58, 100与78, 0坐标让曲线更复杂一些
        s.graphics.drawCurves(250, 150, [0, 0, 19, -100, 39, 0, 58, 100, 78, 0], "#ff0000", 3) ;
    }
    //绘制三角形
    private drawSomething4(): void {
        var s:Sprite = new Sprite();
        Laya.stage.addChild(s);
        //画三角形
        s.graphics.drawPoly(500, 28, [0, 100, 50, 0, 100, 100], "#ffff00");

        s = new Sprite();
        Laya.stage.addChild(s);
        //画多边形
        s.graphics.drawPoly(500, 150, [0, 100, 50, 0, 100, 100, 75, 150, 25, 150], "#ffff00");
    }
    //根据指定的路径数据绘制出图案
    private drawSomething5(): void {
        var canvas: Sprite = new Sprite();
        Laya.stage.addChild(canvas);
        var path: Array<number> = [];
        path.push(0, -130);//五角星A点坐标
        path.push(33, -33);//五角星B点坐标
        path.push(137, -30);//五角星C点坐标
        path.push(55, 32);//五角星D点坐标
        path.push(85, 130);//五角星E点坐标
        path.push(0, 73);//五角星F点坐标
        path.push(-85, 130);//五角星G点坐标
        path.push(-55, 32);//五角星H点坐标
        path.push(-137, -30);//五角星I点坐标
        path.push(-33, -33);//五角星J点坐标
        canvas.graphics.drawPoly(Laya.stage.width / 2, Laya.stage.height / 2, path, "#FF7F50");
    }
    //绘制圆形
    private drawSomething6(): void {
        var sp = new Sprite();
        Laya.stage.addChild(sp);
        //画圆
        sp.graphics.drawCircle(60,250,50,"#ff0000");
    }
    //绘制扇形
    private drawSomething7(): void {
        var sp = new Sprite();
        Laya.stage.addChild(sp);
        //画圆
        sp.graphics.drawPie(60,400,50,90,180,"#ff0000");
    }
    //用drawRect方法绘制矩形
    private drawSomething8(): void {
        var s = new Sprite();
        Laya.stage.addChild(s);
        //画矩形
        s.graphics.drawRect(150, 250, 100, 50, "#ffff00");
    }
    //用drawPath绘制矩形
    private drawSomething9(): void {
        var s = new Sprite();
        Laya.stage.addChild(s);
         //自定义路径
         var path:Array<any> =  [
            ["moveTo", 0, 0], //画笔移到A点
            ["lineTo", 100, 0],//画到B点
            ["lineTo", 100, 50],//再画到C点
            ["lineTo", 0, 50], //继续画到D点
            ["closePath"] //闭合路径
        ];
         //绘制矩形
        s.graphics.drawPath(150, 400, path, {fillStyle: "#ff0000"});
    }
    //用drawPath绘制圆角矩形
    private drawSomething10(): void {
        var s = new Sprite();
        Laya.stage.addChild(s);
        //自定义路径
        var path:any[] =  [
            ["moveTo", 30, 0], //画笔的起始点，
            ["arcTo", 500, 0, 500, 30, 30], //p1（500,0）为夹角B，（500,30）为端点p2
            ["arcTo", 500, 300, 470, 300, 30],//p1（500,300）为夹角C，（470,300）为端点p2
            ["arcTo", 0, 300, 0, 270, 30], //p1(0,300)为夹角D，（0,270）为端点p2
            ["arcTo", 0, 0, 30, 0, 30],//p1(0,0)为夹角A，（30,0）为端点p2
        ];
        //绘制圆角矩形
        s.graphics.drawPath(500, 350, path, {fillStyle: "#ff0000"}, {"strokeStyle":"#ffffff","lineWidth":"10"});
    }
}