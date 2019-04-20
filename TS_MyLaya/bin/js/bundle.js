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
var Test_9_TimeLine_1 = require("./study/Test_9_TimeLine");
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
        //new Test_8_TweenDemo();
        new Test_9_TimeLine_1.default();
    };
    return AppMain;
}());
//激活启动类
new AppMain();
},{"./study/Test_9_TimeLine":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Test_9_TimeLine = /** @class */ (function () {
    function Test_9_TimeLine() {
        //加载图集成功后，执行onLoad回调方法
        Laya.loader.load("res/atlas/test.atlas", Laya.Handler.create(this, this.onLoaded));
    }
    Test_9_TimeLine.prototype.onLoaded = function () {
        //var anil:Laya.Animation = this.createAnimation("test/TimeLine.ani");
        //anil.play();
        //var ani2: Laya.Animation = this.createAnimation("test/TimeLine.ani");
        //ani2.play(0, true, "pivot");
        //ani2.pos(150, 300);
        //创建一个Animation实例
        var tl = new Laya.Animation();
        //加载动画文件
        tl.loadAnimation("test/TimeLine.ani");
        //添加到舞台
        Laya.stage.addChild(tl);
        //播放Animation动画
        tl.play();
        //创建一个新的Animation实例
        var tl2 = new Laya.Animation();
        //加载动画文件
        tl2.loadAnimation("test/TimeLine.ani");
        //添加到舞台
        Laya.stage.addChild(tl2);
        //播放Animation动画的pivot动画
        tl2.play(0, true, "pivot");
        //动画的显示位置
        tl2.pos(300, 0);
    };
    Test_9_TimeLine.prototype.createAnimation = function (name) {
        //创建一个Animation实例
        var ani = new Laya.Animation();
        //加载动画文件
        ani.loadAnimation(name);
        //添加到舞台
        Laya.stage.addChild(ani);
        return ani;
    };
    return Test_9_TimeLine;
}());
exports.default = Test_9_TimeLine;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkc6L0xheWFQcm9qZWN0L0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQXBwTWFpbi50cyIsInNyYy9zdHVkeS9UZXN0XzlfVGltZUxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDVkEsSUFBTyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUM3QixJQUFPLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO0FBQ3pCLElBQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7QUFlekIsMkRBQXNEO0FBRXRELEtBQUs7QUFDTDtJQUNJO1FBQ0ksdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztRQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQy9CLG9CQUFvQjtRQUNwQixNQUFNLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQztRQUV4QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVPLHVCQUFLLEdBQWI7UUFFSSxvQkFBb0I7UUFDcEIseUJBQXlCO1FBQ3pCLDBCQUEwQjtRQUMxQixxQ0FBcUM7UUFDckMsc0NBQXNDO1FBQ3RDLHFDQUFxQztRQUNyQyxzQ0FBc0M7UUFDdEMsd0JBQXdCO1FBQ3hCLDZCQUE2QjtRQUM3Qiw0QkFBNEI7UUFDNUIsbUNBQW1DO1FBQ25DLDRCQUE0QjtRQUM1Qix5QkFBeUI7UUFDekIsSUFBSSx5QkFBZSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQS9CQSxBQStCQyxJQUFBO0FBRUQsT0FBTztBQUNQLElBQUksT0FBTyxFQUFFLENBQUM7Ozs7QUNyRGQ7SUFDSTtRQUNJLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVPLGtDQUFRLEdBQWhCO1FBQ0ksc0VBQXNFO1FBQ3RFLGNBQWM7UUFHZCx1RUFBdUU7UUFDdkUsOEJBQThCO1FBQzlCLHFCQUFxQjtRQUlyQixpQkFBaUI7UUFDakIsSUFBSSxFQUFFLEdBQWtCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzdDLFFBQVE7UUFDUixFQUFFLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDdEMsT0FBTztRQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLGVBQWU7UUFDZixFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDVixtQkFBbUI7UUFDbkIsSUFBSSxHQUFHLEdBQWtCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzlDLFFBQVE7UUFDUixHQUFHLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDdkMsT0FBTztRQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLHVCQUF1QjtRQUN2QixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFDekIsU0FBUztRQUNULEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFTyx5Q0FBZSxHQUF2QixVQUF3QixJQUFZO1FBQ2hDLGlCQUFpQjtRQUNqQixJQUFJLEdBQUcsR0FBbUIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDL0MsUUFBUTtRQUNSLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsT0FBTztRQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0E5Q0EsQUE4Q0MsSUFBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgQnJvd3NlciA9IExheWEuQnJvd3NlclxyXG5pbXBvcnQgV2ViR0wgPSBMYXlhLldlYkdMXHJcbmltcG9ydCBTdGFnZSA9IExheWEuU3RhZ2VcclxuXHJcbmltcG9ydCBUZXN0XzFfVGV4dCBmcm9tICcuL3N0dWR5L1Rlc3RfMV9UZXh0JztcclxuaW1wb3J0IFRlc3RfMl9JbnB1dFRlc3QgZnJvbSAnLi9zdHVkeS9UZXN0XzJfSW5wdXRUZXN0JztcclxuaW1wb3J0IFRlc3RfM19CaXRtYXBGb250IGZyb20gJy4vc3R1ZHkvVGVzdF8zX0JpdG1hcEZvbnQnO1xyXG5pbXBvcnQgVGVzdF80XzFfU3ByaXRlX0Rpc3BsYXlJbWFnZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8xX1Nwcml0ZV9EaXNwbGF5SW1hZ2UnO1xyXG5pbXBvcnQgVGVzdF80XzFfU3ByaXRlX1N3aXRjaFRleHR1cmUgZnJvbSAnLi9zdHVkeS9UZXN0XzRfMV9TcHJpdGVfU3dpdGNoVGV4dHVyZSc7XHJcbmltcG9ydCBUZXN0XzRfMl9TcHJpdGVfRGlzcGxheUltYWdlIGZyb20gJy4vc3R1ZHkvVGVzdF80XzJfU3ByaXRlX0Rpc3BsYXlJbWFnZSc7XHJcbmltcG9ydCBUZXN0XzRfMl9TcHJpdGVfU3dpdGNoVGV4dHVyZSBmcm9tICcuL3N0dWR5L1Rlc3RfNF8yX1Nwcml0ZV9Td2l0Y2hUZXh0dXJlJztcclxuaW1wb3J0IFRlc3RfNF9NYXNrRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfNF9NYXNrRGVtbyc7XHJcbmltcG9ydCBUZXN0XzVfMV9Db2xvckZpbHRlciBmcm9tICcuL3N0dWR5L1Rlc3RfNV8xX0NvbG9yRmlsdGVyJztcclxuaW1wb3J0IFRlc3RfNV8yX0dsb3dGaWx0ZXIgZnJvbSAnLi9zdHVkeS9UZXN0XzVfMl9HbG93RmlsdGVyJztcclxuaW1wb3J0IFRlc3RfNl8xX1Nwcml0ZV9EcmF3U2hhcGVzIGZyb20gJy4vc3R1ZHkvVGVzdF82XzFfU3ByaXRlX0RyYXdTaGFwZXMnO1xyXG5pbXBvcnQgVGVzdF83X0F0bGFzQW5pRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfN19BdGxhc0FuaURlbW8nO1xyXG5pbXBvcnQgVGVzdF84X1R3ZWVuRGVtbyBmcm9tICcuL3N0dWR5L1Rlc3RfOF9Ud2VlbkRlbW8nO1xyXG5pbXBvcnQgVGVzdF85X1RpbWVMaW5lIGZyb20gJy4vc3R1ZHkvVGVzdF85X1RpbWVMaW5lJztcclxuXHJcbi8v5ZCv5Yqo57G7XHJcbmNsYXNzIEFwcE1haW4ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7IFxyXG4gICAgICAgIC8vIOS4jeaUr+aMgVdlYkdM5pe26Ieq5Yqo5YiH5o2i6IezQ2FudmFzXHJcbiAgICAgICAgTGF5YS5pbml0KEJyb3dzZXIuY2xpZW50V2lkdGgsIEJyb3dzZXIuY2xpZW50SGVpZ2h0LCBXZWJHTCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnblYgPSBTdGFnZS5BTElHTl9NSURETEU7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnbkggPSBTdGFnZS5BTElHTl9DRU5URVI7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBcInNob3dhbGxcIjtcclxuICAgICAgICBMYXlhLnN0YWdlLmJnQ29sb3IgPSBcIiM3ZjdmN2ZcIjtcclxuICAgICAgICAvL+a2iOmZpOefoumHj+e7mOWItueahOmUr+m9v++8jOS9huS8muWinuWKoOaAp+iDvea2iOiAl1xyXG4gICAgICAgIENvbmZpZy5pc0FudGlhbGlhcz10cnVlO1xyXG5cclxuICAgICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXR1cCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL25ldyBUZXN0XzFfVGV4dCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfMl9JbnB1dFRlc3QoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzNfQml0bWFwRm9udCgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8xX1Nwcml0ZV9EaXNwbGF5SW1hZ2UoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzRfMV9TcHJpdGVfU3dpdGNoVGV4dHVyZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF8yX1Nwcml0ZV9EaXNwbGF5SW1hZ2UoKTtcclxuICAgICAgICAvL25ldyBUZXN0XzRfMl9TcHJpdGVfU3dpdGNoVGV4dHVyZSgpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNF9NYXNrRGVtbygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNV8xX0NvbG9yRmlsdGVyKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF81XzJfR2xvd0ZpbHRlcigpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfNl8xX1Nwcml0ZV9EcmF3U2hhcGVzKCk7XHJcbiAgICAgICAgLy9uZXcgVGVzdF83X0F0bGFzQW5pRGVtbygpO1xyXG4gICAgICAgIC8vbmV3IFRlc3RfOF9Ud2VlbkRlbW8oKTtcclxuICAgICAgICBuZXcgVGVzdF85X1RpbWVMaW5lKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBBcHBNYWluKCk7IiwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RfOV9UaW1lTGluZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvL+WKoOi9veWbvumbhuaIkOWKn+WQju+8jOaJp+ihjG9uTG9hZOWbnuiwg+aWueazlVxyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQoXCJyZXMvYXRsYXMvdGVzdC5hdGxhc1wiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25Mb2FkZWQpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTG9hZGVkKCk6IHZvaWQge1xyXG4gICAgICAgIC8vdmFyIGFuaWw6TGF5YS5BbmltYXRpb24gPSB0aGlzLmNyZWF0ZUFuaW1hdGlvbihcInRlc3QvVGltZUxpbmUuYW5pXCIpO1xyXG4gICAgICAgIC8vYW5pbC5wbGF5KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy92YXIgYW5pMjogTGF5YS5BbmltYXRpb24gPSB0aGlzLmNyZWF0ZUFuaW1hdGlvbihcInRlc3QvVGltZUxpbmUuYW5pXCIpO1xyXG4gICAgICAgIC8vYW5pMi5wbGF5KDAsIHRydWUsIFwicGl2b3RcIik7XHJcbiAgICAgICAgLy9hbmkyLnBvcygxNTAsIDMwMCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy/liJvlu7rkuIDkuKpBbmltYXRpb27lrp7kvotcclxuICAgICAgICB2YXIgdGw6TGF5YS5BbmltYXRpb24gPSBuZXcgTGF5YS5BbmltYXRpb24oKTtcclxuICAgICAgICAvL+WKoOi9veWKqOeUu+aWh+S7tlxyXG4gICAgICAgIHRsLmxvYWRBbmltYXRpb24oXCJ0ZXN0L1RpbWVMaW5lLmFuaVwiKTtcclxuICAgICAgICAvL+a3u+WKoOWIsOiInuWPsFxyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGwpO1xyXG4gICAgICAgIC8v5pKt5pS+QW5pbWF0aW9u5Yqo55S7XHJcbiAgICAgICAgdGwucGxheSgpO1xyXG4gICAgICAgIC8v5Yib5bu65LiA5Liq5paw55qEQW5pbWF0aW9u5a6e5L6LXHJcbiAgICAgICAgdmFyIHRsMjpMYXlhLkFuaW1hdGlvbiA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG4gICAgICAgIC8v5Yqg6L295Yqo55S75paH5Lu2XHJcbiAgICAgICAgdGwyLmxvYWRBbmltYXRpb24oXCJ0ZXN0L1RpbWVMaW5lLmFuaVwiKTtcclxuICAgICAgICAvL+a3u+WKoOWIsOiInuWPsFxyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGwyKTtcclxuICAgICAgICAvL+aSreaUvkFuaW1hdGlvbuWKqOeUu+eahHBpdm905Yqo55S7XHJcbiAgICAgICAgdGwyLnBsYXkoMCx0cnVlLFwicGl2b3RcIik7XHJcbiAgICAgICAgLy/liqjnlLvnmoTmmL7npLrkvY3nva5cclxuICAgICAgICB0bDIucG9zKDMwMCwwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUFuaW1hdGlvbihuYW1lOiBzdHJpbmcpOiBMYXlhLkFuaW1hdGlvbiB7XHJcbiAgICAgICAgLy/liJvlu7rkuIDkuKpBbmltYXRpb27lrp7kvotcclxuICAgICAgICB2YXIgYW5pOiBMYXlhLkFuaW1hdGlvbiA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG4gICAgICAgIC8v5Yqg6L295Yqo55S75paH5Lu2XHJcbiAgICAgICAgYW5pLmxvYWRBbmltYXRpb24obmFtZSk7XHJcbiAgICAgICAgLy/mt7vliqDliLDoiJ7lj7BcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKGFuaSk7XHJcbiAgICAgICAgcmV0dXJuIGFuaTtcclxuICAgIH1cclxufSJdfQ==
