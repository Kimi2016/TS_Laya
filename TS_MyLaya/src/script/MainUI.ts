import { ui } from "../ui/layaMaxUI";


//主界面
export default class MainUI extends ui.MainSceneUI {

    constructor() { super(); }

    onEnable(): void {
        console.log("MainUI.onEnable")
    }

    onDisable(): void {
        console.log("MainUI.onDisable")
    }
}