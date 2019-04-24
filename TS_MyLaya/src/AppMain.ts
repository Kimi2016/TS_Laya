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
import Test_9_TimeLineUI from './study/Test_9_TimeLineUI';
import Test_11_Sound from './study/Test_11_Sound';
import GameConfig from './GameConfig';
import Test_0_1_Channel from './study/Test_0_1_Channel';
import Test_0_1_Socket from './study/Test_0_1_Socket';
import Test_0_Network_ProtocolBuffer from './study/Test_0_Network_ProtocolBuffer';

//启动类
class AppMain {
    constructor() {
        //根据IDE设置初始化引擎		
        if (window["Laya3D"]) {
            Laya3D.init(GameConfig.width, GameConfig.height);

            // 不支持WebGL时自动切换至Canvas
            //Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
        }
        else {
            Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
        }
        Laya["Physics"] && Laya["Physics"].enable();
        Laya["DebugPanel"] && Laya["DebugPanel"].enable();


        //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
        if (GameConfig.stat) Laya.Stat.show();
        
        //表示是否捕获全局错误并弹出提示。
		Laya.alertGlobalError = true; 

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);


        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;
        Laya.stage.scaleMode = GameConfig.scaleMode;//Stage.SCALE_FULL;//SCALE_FIXED_HEIGHT
        Laya.stage.screenMode = GameConfig.screenMode;//Stage.SCREEN_HORIZONTAL;//SCREEN_VERTICAL
        Laya.stage.bgColor = "#7f7f7f";

        //兼容微信不支持加载scene后缀场景
        Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

        //如果通过设备静音键让音频自动跟随设备静音。需要将useAudioMusic设置为false。
        Laya.SoundManager.useAudioMusic = false;
        Laya.SoundManager.autoStopMusic = false;

        //消除矢量绘制的锯齿，但会增加性能消耗
        //Config.isAntialias=true;
    }

    onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded(): void {
		//加载IDE指定的场景
        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        
        this.setup();
	}

    private setup(): void {
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
        //new Test_9_TimeLine();
        //new Test_9_TimeLineUI();
        //new Test_11_Sound();
        //new Test_0_1_Socket();
        new Test_0_Network_ProtocolBuffer();
    }
}

//激活启动类
new AppMain();