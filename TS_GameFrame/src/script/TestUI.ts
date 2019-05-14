import { ui } from "../ui/layaMaxUI";

export default class TestUI extends ui.TestUI {
    
    constructor() { super(); }
    
    onEnable(): void {
        console.log("TestUI.onEnable")
    }

    onDisable(): void {
        console.log("TestUI.onDisable")
    }
}