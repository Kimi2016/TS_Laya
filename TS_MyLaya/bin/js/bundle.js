var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Browser = Laya.Browser;
var WebGL = Laya.WebGL;
var Stage = Laya.Stage;
var Test_8_TweenDemo_1 = require("./study/Test_8_TweenDemo");
//启动类
var AppMain = /** @class */ (function () {
    function AppMain() {
        // 不支持WebGL时自动切换至Canvas
        Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = "showall";
        Laya.stage.bgColor = "#7f7f7f";
        //消除矢量绘制的锯齿，但会增加性能消耗
        Config.isAntialias = true;
        this.setup();
    }
    AppMain.prototype.setup = function () {
        //new Test_1_Text();
        //new Test_2_InputTest();
        //new Test_3_BitmapFont();
        //new Test_4_1_Sprite_DisplayImage();
        //new Test_4_1_Sprite_SwitchTexture();
        //new Test_4_2_Sprite_DisplayImage();
        //new Test_4_2_Sprite_SwitchTexture();
        //new Test_4_MaskDemo();
        //new Test_5_1_ColorFilter();
        //new Test_5_2_GlowFilter();
        //new Test_6_1_Sprite_DrawShapes();
        //new Test_7_AtlasAniDemo();
        new Test_8_TweenDemo_1.default();
    };
    return AppMain;
}());
//激活启动类
new AppMain();
},{"./study/Test_8_TweenDemo":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//缓动动画
var Test_8_TweenDemo = /** @class */ (function () {
    function Test_8_TweenDemo() {
        //创建缓动文本
        this.createTween();
    }
    //创建缓动文本
    Test_8_TweenDemo.prototype.createTween = function () {
        //"LayaBox字符串总宽度"
        var w = 800;
        //文本创建的起始位置(>>在此使用右移运算符，相当于/2 用>>效率更高)
        var offsetX = Laya.stage.width - w >> 1;
        //显示的字符串
        var demoString = "Tween";
        var letterText;
        //根据"LayaBox"字符串长度创建单个字符，并对每个单独字符使用缓动动画
        for (var i = 0, len = demoString.length; i < len; ++i) {
            //从"LayaBox"字符串中逐个提出单个字符创建文本
            letterText = this.createLetter(demoString.charAt(i));
            letterText.x = w / len * i + offsetX;
            //文本的初始y属性
            letterText.y = 300;
            //对象letterText属性y从缓动目标的100向初始的y属性300运动，每次执行缓动效果需要3000毫秒，缓类型采用elasticOut函数方式，延迟间隔i*100毫秒执行。
            //Laya.Tween.from(letterText, { y: 0 }, 3000, Laya.Ease.elasticOut, Laya.Handler.create(this,this.changeColor, [letterText]), i * 1000);
            //Laya.Tween.from(letterText, { y: 0 }, 3000, Laya.Ease.bounceIn, Laya.Handler.create(this,this.changeColor, [letterText]), i * 100);
            Laya.Tween.from(letterText, { y: 0, update: new Laya.Handler(this, this.updateColor, [letterText]) }, 3000, Laya.Ease.bounceIn, Laya.Handler.create(this, this.changeColor, [letterText]), i * 100);
        }
    };
    /**
     * 缓动进行时的回调更新方法
     * txt  缓动对象
     */
    Test_8_TweenDemo.prototype.updateColor = function (txt) {
        var c = Math.floor(Math.random() * 3);
        switch (c) {
            case 0:
                txt.color = "#eee000";
                break;
            case 1:
                txt.color = "#ffffff";
                break;
            case 2:
                txt.color = "#ff0000";
                break;
            default:
                txt.color = "#eee000";
                break;
        }
    };
    /**
     * 缓动完成后的回调方法
     * txt  缓动对象
     */
    Test_8_TweenDemo.prototype.changeColor = function (txt) {
        //将文本字体改变成红色
        txt.color = "#ff0000";
    };
    //创建单个字符文本，并加载到舞台
    Test_8_TweenDemo.prototype.createLetter = function (char) {
        var letter = new Laya.Text();
        letter.text = char;
        letter.color = "#ffffff";
        letter.font = "Impact";
        letter.fontSize = 180;
        Laya.stage.addChild(letter);
        return letter;
    };
    return Test_8_TweenDemo;
}());
exports.default = Test_8_TweenDemo;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkc6L0xheWEvTGF5YUFpcklERV9iZXRhL3Jlc291cmNlcy9hcHAvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9BcHBNYWluLnRzIiwic3JjL3N0dWR5L1Rlc3RfOF9Ud2VlbkRlbW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDVkEsSUFBTyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUM3QixJQUFPLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO0FBQ3pCLElBQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7QUFjekIsNkRBQXdEO0FBRXhELEtBQUs7QUFDTDtJQUNJO1FBQ0ksdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztRQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQy9CLG9CQUFvQjtRQUNwQixNQUFNLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQztRQUV4QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVPLHVCQUFLLEdBQWI7UUFFSSxvQkFBb0I7UUFDcEIseUJBQXlCO1FBQ3pCLDBCQUEwQjtRQUMxQixxQ0FBcUM7UUFDckMsc0NBQXNDO1FBQ3RDLHFDQUFxQztRQUNyQyxzQ0FBc0M7UUFDdEMsd0JBQXdCO1FBQ3hC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TSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7UUFDdkIsTUFBTSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0FwRUEsQUFvRUMsSUFBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgQnJvd3NlciA9IExheWEuQnJvd3NlclxyXG5pbXBvcnQgV2ViR0wgPSBMYXlhLldlYkdMXHJcbmltcG9ydCBTdGFnZSA9IExheWEuU3RhZ2VcclxuXHJcbmltcG9ydCBUZXN0XzFfVGV4dCBmcm9tICcuL3N0dWR5L1Rlc3RfMV9UZXh0JztcclxuaW1wb3J0IFRlc3RfMl9JbnB1dFRlc3QgZnJvbSAnLi9zdHVkeS9UZXN0XzJfSW5wdXRUZXN0JztcclxuaW1wb3J0IFRlc3RfM19CaXRtYXBGb250IGZyb20gJy4vc3R1ZHkvVGVzdF8zX0JpdG1hcEZvbnQnO1xyXG5pbXBvcnQgVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8xX1Nwcml0ZV9EaXNwbGF5SW1hZ2UnO1xyXG5pbXBvcnQgVGVzdF80XzFfU3ByaXRlX1N3aXRjaFRleHR1cmUgZnJvbSAnLi9zdHVkeS9UZXN0XzRfMV9TcHJpdGVfU3dpdGNoVGV4dHVyZSc7XHJcbmltcG9ydCBUZXN0XzRfMl9TcHJpdGVfRGlzcGxheUltYWdlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzJfU3ByaXRlX0Rpc3BsYXlJbWFnZSc7XHJcbmltcG9ydCBUZXN0XzRfMl9TcHJpdGVfU3dpdGNoVGV4dHVyZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlJztcclxuaW1wb3J0IFRlc3RfNF9NYXNrRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfNF9NYXNrRGVtbyc7XHJcbmltcG9ydCBUZXN0XzVfMV9Db2xvckZpbHRlciBmcm9tICcuL3N0dWR5L1Rlc3RfNV8xX0NvbG9yRmlsdGVyJztcclxuaW1wb3J0IFRlc3RfNV8yX0dsb3dGaWx0ZXIgZnJvbSAnLi9zdHVkeS9UZXN0XzVfMl9HbG93RmlsdGVyJztcclxuaW1wb3J0IFRlc3RfNl8xX1Nwcml0ZV9EcmF3U2hhcGVzIGZyb20gJy4vc3R1ZHkvVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMnO1xyXG5pbXBvcnQgVGVzdF83X0F0bGFzQW5pRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfN19BdGxhc0FuaURlbW8nO1xyXG5pbXBvcnQgVGVzdF84X1R3ZWVuRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfOF9Ud2VlbkRlbW8nO1xyXG5cclxuLy/lkK/liqjnsbtcclxuY2xhc3MgQXBwTWFpbiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgXHJcbiAgICAgICAgLy8g5LiN5pSv5oyBV2ViR0zml7boh6rliqjliIfmjaLoh7NDYW52YXNcclxuICAgICAgICBMYXlhLmluaXQoQnJvd3Nlci5jbGllbnRXaWR0aCwgQnJvd3Nlci5jbGllbnRIZWlnaHQsIFdlYkdMKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFsaWduViA9IFN0YWdlLkFMSUdOX01JRERMRTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFsaWduSCA9IFN0YWdlLkFMSUdOX0NFTlRFUjtcclxuICAgICAgICBMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IFwic2hvd2FsbFwiO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYmdDb2xvciA9IFwiIzdmN2Y3ZlwiO1xyXG4gICAgICAgIC8v5raI6Zmk55+i6YeP57uY5Yi255qE6ZSv6b2/77yM5L2G5Lya5aKe5Yqg5oCn6IO95raI6ICXXHJcbiAgICAgICAgQ29uZmlnLmlzQW50aWFsaWFzPXRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0dXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldHVwKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMV9UZXh0KCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF8yX0lucHV0VGVzdCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfM19CaXRtYXBGb250KCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8xX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80XzJfU3ByaXRlX0Rpc3BsYXlJbWFnZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF80X01hc2tEZW1vKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF81XzFfQ29sb3JGaWx0ZXIoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzVfMl9HbG93RmlsdGVyKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzdfQXRsYXNBbmlEZW1vKCk7XHJcbiAgICAgICAgbmV3IFRlc3RfOF9Ud2VlbkRlbW8oKTtcclxuICAgIH1cclxufVxyXG5cclxuLy/mv4DmtLvlkK/liqjnsbtcclxubmV3IEFwcE1haW4oKTsiLCIvL+e8k+WKqOWKqOeUu1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0XzhfVHdlZW5EZW1vIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvL+WIm+W7uue8k+WKqOaWh+acrFxyXG4gICAgICAgIHRoaXMuY3JlYXRlVHdlZW4oKTtcclxuICAgIH1cclxuICAgIC8v5Yib5bu657yT5Yqo5paH5pysXHJcbiAgICBwcml2YXRlIGNyZWF0ZVR3ZWVuKCk6IHZvaWQge1xyXG4gICAgICAgIC8vXCJMYXlhQm945a2X56ym5Liy5oC75a695bqmXCJcclxuICAgICAgICB2YXIgdzogbnVtYmVyID0gODAwO1xyXG4gICAgICAgIC8v5paH5pys5Yib5bu655qE6LW35aeL5L2N572uKD4+5Zyo5q2k5L2/55So5Y+z56e76L+Q566X56ym77yM55u45b2T5LqOLzIg55SoPj7mlYjnjofmm7Tpq5gpXHJcbiAgICAgICAgdmFyIG9mZnNldFg6IG51bWJlciA9IExheWEuc3RhZ2Uud2lkdGggLSB3ID4+IDE7XHJcbiAgICAgICAgLy/mmL7npLrnmoTlrZfnrKbkuLJcclxuICAgICAgICB2YXIgZGVtb1N0cmluZzogc3RyaW5nID0gXCJUd2VlblwiO1xyXG4gICAgICAgIHZhciBsZXR0ZXJUZXh0OiBMYXlhLlRleHQ7XHJcbiAgICAgICAgLy/moLnmja5cIkxheWFCb3hcIuWtl+espuS4sumVv+W6puWIm+W7uuWNleS4quWtl+espu+8jOW5tuWvueavj+S4quWNleeLrOWtl+espuS9v+eUqOe8k+WKqOWKqOeUu1xyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDAsIGxlbjogbnVtYmVyID0gZGVtb1N0cmluZy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICAvL+S7jlwiTGF5YUJveFwi5a2X56ym5Liy5Lit6YCQ5Liq5o+Q5Ye65Y2V5Liq5a2X56ym5Yib5bu65paH5pysXHJcbiAgICAgICAgICAgIGxldHRlclRleHQgPSB0aGlzLmNyZWF0ZUxldHRlcihkZW1vU3RyaW5nLmNoYXJBdChpKSk7XHJcbiAgICAgICAgICAgIGxldHRlclRleHQueCA9IHcgLyBsZW4gKiBpICsgb2Zmc2V0WDtcclxuICAgICAgICAgICAgLy/mlofmnKznmoTliJ3lp4t55bGe5oCnXHJcbiAgICAgICAgICAgIGxldHRlclRleHQueSA9IDMwMDtcclxuICAgICAgICAgICAgLy/lr7nosaFsZXR0ZXJUZXh05bGe5oCneeS7jue8k+WKqOebruagh+eahDEwMOWQkeWIneWni+eahHnlsZ7mgKczMDDov5DliqjvvIzmr4/mrKHmiafooYznvJPliqjmlYjmnpzpnIDopoEzMDAw5q+r56eS77yM57yT57G75Z6L6YeH55SoZWxhc3RpY091dOWHveaVsOaWueW8j++8jOW7tui/n+mXtOmalGkqMTAw5q+r56eS5omn6KGM44CCXHJcbiAgICAgICAgICAgIC8vTGF5YS5Ud2Vlbi5mcm9tKGxldHRlclRleHQsIHsgeTogMCB9LCAzMDAwLCBMYXlhLkVhc2UuZWxhc3RpY091dCwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMuY2hhbmdlQ29sb3IsIFtsZXR0ZXJUZXh0XSksIGkgKiAxMDAwKTtcclxuICAgICAgICAgICAgLy9MYXlhLlR3ZWVuLmZyb20obGV0dGVyVGV4dCwgeyB5OiAwIH0sIDMwMDAsIExheWEuRWFzZS5ib3VuY2VJbiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMuY2hhbmdlQ29sb3IsIFtsZXR0ZXJUZXh0XSksIGkgKiAxMDApO1xyXG4gICAgICAgICAgICBMYXlhLlR3ZWVuLmZyb20obGV0dGVyVGV4dCwgeyB5OiAwICwgdXBkYXRlOiBuZXcgTGF5YS5IYW5kbGVyKHRoaXMsIHRoaXMudXBkYXRlQ29sb3IsW2xldHRlclRleHRdKX0sXHJcbiAgICAgICAgICAgICAgICAgMzAwMCwgTGF5YS5FYXNlLmJvdW5jZUluLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5jaGFuZ2VDb2xvciwgW2xldHRlclRleHRdKSwgaSAqIDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDnvJPliqjov5vooYzml7bnmoTlm57osIPmm7TmlrDmlrnms5VcclxuICAgICAqIHR4dCAg57yT5Yqo5a+56LGhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdXBkYXRlQ29sb3IodHh0OkxheWEuVGV4dCk6dm9pZHtcclxuICAgICAgICB2YXIgYzpudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMyk7XHJcbiAgICAgICAgc3dpdGNoIChjKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHR4dC5jb2xvciA9IFwiI2VlZTAwMFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHR4dC5jb2xvciA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHR4dC5jb2xvciA9IFwiI2ZmMDAwMFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0eHQuY29sb3IgPSBcIiNlZWUwMDBcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog57yT5Yqo5a6M5oiQ5ZCO55qE5Zue6LCD5pa55rOVXHJcbiAgICAgKiB0eHQgIOe8k+WKqOWvueixoVxyXG4gICAgICovICAgIFxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VDb2xvcih0eHQ6TGF5YS5UZXh0KTp2b2lke1xyXG4gICAgICAgIC8v5bCG5paH5pys5a2X5L2T5pS55Y+Y5oiQ57qi6ImyXHJcbiAgICAgICAgdHh0LmNvbG9yID0gXCIjZmYwMDAwXCI7XHJcbiAgICB9XHJcbiAgICAvL+WIm+W7uuWNleS4quWtl+espuaWh+acrO+8jOW5tuWKoOi9veWIsOiInuWPsFxyXG4gICAgcHJpdmF0ZSBjcmVhdGVMZXR0ZXIoY2hhcjogc3RyaW5nKTogTGF5YS5UZXh0IHtcclxuICAgICAgICB2YXIgbGV0dGVyOiBMYXlhLlRleHQgPSBuZXcgTGF5YS5UZXh0KCk7XHJcbiAgICAgICAgbGV0dGVyLnRleHQgPSBjaGFyO1xyXG4gICAgICAgIGxldHRlci5jb2xvciA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgICAgIGxldHRlci5mb250ID0gXCJJbXBhY3RcIjtcclxuICAgICAgICBsZXR0ZXIuZm9udFNpemUgPSAxODA7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZChsZXR0ZXIpO1xyXG4gICAgICAgIHJldHVybiBsZXR0ZXI7XHJcbiAgICB9XHJcbn0iXX0=
