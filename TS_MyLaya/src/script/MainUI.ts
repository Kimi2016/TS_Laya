import { ui } from "../ui/layaMaxUI";
import NetworkManager from "../Framework/Network/NetworkManager";
import ClientManager from "../Framework/Network/ClientManager";
import NetworkEventDispatcher from "../Framework/Event/NetworkEventDispatcher";
import NetPacket from "../Framework/Network/NetPacket";


//主界面
export default class MainUI extends ui.MainSceneUI {

    constructor() { super(); }

    onEnable(): void {
        console.log("MainUI.onEnable")

        NetworkEventDispatcher.getInstance().RegisterMessage(211, this.GM_VerifyVersionReturn)
    }

    onDisable(): void {
        console.log("MainUI.onDisable")
        
        NetworkEventDispatcher.getInstance().UnRegisterMessage(211, this.GM_VerifyVersionReturn)
    }


    private GM_VerifyVersionReturn(netPackage:NetPacket):void{
        var msg = NetworkManager.getInstance().deserialize("GM_VerifyVersionReturn", netPackage);
        console.log(msg);
    }


    onAwake(): void {

        console.log("Precision safe." + (Math.pow(2, 53) - 1));
        
        ClientManager.getInstance().createClient(0, "ws://192.168.2.126:50000");

        //定时执行一次(间隔时间)
        //Laya.timer.once(2000, this, this.testNetwork);
    }

    private testNetwork(): void {
        console.log("testNetwork()");
        var msg = {
            version: "1.5.4",				//客户端版本号
            platform: 9007199254740988,             ///平台
            istest: 0,///    0、正常，1、测试，不需要验证版本
        }
        NetworkManager.getInstance().loginSendMessage(210, "GM_VerifyVersion", msg);
    }
}