import Browser = Laya.Browser
import WebGL = Laya.WebGL
import Stage = Laya.Stage

import Test_1_Text from './study/Test_1_Text';
import Test_2_InputTest from './study/Test_2_InputTest';
import Test_3_BitmapFont from './study/Test_3_BitmapFont';
import Test_4_1_Sprite_DisplayImage from './study/Test_4_1_Sprite_DisplayImage';
import Test_4_1_Sprite_SwitchTexture from './study/Test_4_1_Sprite_SwitchTexture';
import Test_4_2_Sprite_DisplayImage from './study/Test_4_2_Sprite_DisplayImage';
import Test_4_2_Sprite_SwitchTexture from './study/Test_4_2_Sprite_SwitchTexture';
import Test_4_MaskDemo from './study/Test_4_MaskDemo';
import Test_5_1_ColorFilter from './study/Test_5_1_ColorFilter';
import Test_5_2_GlowFilter from './study/Test_5_2_GlowFilter';
import Test_6_1_Sprite_DrawShapes from './study/Test_6_1_Sprite_DrawShapes';
import Test_7_AtlasAniDemo from './study/Test_7_AtlasAniDemo';
import Test_8_TweenDemo from './study/Test_8_TweenDemo';
import Test_9_TimeLine from './study/Test_9_TimeLine';

//启动类
class AppMain {
    constructor() { 
        // 不支持WebGL时自动切换至Canvas
        Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = "showall";
        Laya.stage.bgColor = "#7f7f7f";
        //消除矢量绘制的锯齿，但会增加性能消耗
        Config.isAntialias=true;

        this.setup();
    }

    private setup():void
    {
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
        new Test_9_TimeLine();
    }
}

//激活启动类
new AppMain();