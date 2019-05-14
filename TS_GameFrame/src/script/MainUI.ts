import { ui } from "../ui/layaMaxUI";
import NetworkManager from "../Framework/Network/NetworkManager";
import NetEventDispatcher from "../Framework/Event/NetEventDispatcher";
import NetPacket from "../Framework/Network/NetPacket";
import GameMessageName from "../Framework/Network/NetMessageName";
import UIPath from "../UIPath";
import UIManager from "../Framework/UI/UIManager";


//主界面
export default class MainUI extends ui.MainUI {

    constructor() { super(); }

    onEnable(): void {
        console.log("MainUI.onEnable")

        console.log(GameMessage.GM_VERSION_RETURN);
        
        NetEventDispatcher.getInstance().register(GameMessage.GM_VERSION_RETURN, this, this.GM_VerifyVersionReturn)
    }

    onDisable(): void {
        console.log("MainUI.onDisable")
        
        NetEventDispatcher.getInstance().unRegister(GameMessage.GM_VERSION_RETURN, this, this.GM_VerifyVersionReturn)
    }


    private GM_VerifyVersionReturn(netPackage:NetPacket):void{
        console.log(netPackage.messageId + "  " + netPackage.message)
    }


    onAwake(): void {
        //Laya.Scene.open(UIPath.testPath,false);
        //Laya.Scene.open(UIPath.testPath1,false);
        //Laya.Scene.open(UIPath.UI_Loading,false);
    }

    private testNetwork(): void {
        console.log("Precision safe." + (Math.pow(2, 53) - 1));

        //var msg = {
        //    version: "1.5.4",				//客户端版本号
        //    platform: 9007199254740991,             ///平台
        //    istest: 0,///    0、正常，1、测试，不需要验证版本
        //}
        //var root = Laya.Browser.window["PBMessage"];
        //var pbMessageName = GameMessageName.getMap()
        //var buffer: any = root[pbMessageName[GameMessage.GM_VERIFY_VERSION]].encode(msg).finish();
        //console.log(buffer);
        //

        var gameClient = NetworkManager.getInstance().createClient(0, "ws://192.168.2.126:50000");
        gameClient.onConnectCallback(function () {
            var msg = {
                version: "1.5.4",				//客户端版本号
                platform: 9007199254740991,             ///平台
                istest: 0,///    0、正常，1、测试，不需要验证版本
            }
            NetworkManager.getInstance().loginSendMessage(GameMessage.GM_VERIFY_VERSION, msg);
        })
    }
}