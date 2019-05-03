
import Input = Laya.Input;

export default class Test_2_InputTest
 {
    constructor() {
        this.createSingleInput();
        this.createMultiInput();
    }
    private createSingleInput(): void {
        var inputText: Input = new Input();
        inputText.size(350, 100);
        inputText.x = Laya.stage.width - inputText.width >> 1;
        inputText.y = (Laya.stage.height - inputText.height >> 1) - 100;
        // 移动端输入提示符
        inputText.prompt = "Type some word...";
        // 设置字体样式
        inputText.bold = true;
        inputText.bgColor = "#666666";
        inputText.color = "#ffffff";
        inputText.fontSize = 20;
        Laya.stage.addChild(inputText);
    }
    private createMultiInput(): void {
        var inputText: Input = new Input();
        // 移动端输入提示符
        inputText.prompt = "Type some word...";
        //多行输入
        inputText.multiline = true;
        inputText.wordWrap = true;
        inputText.size(350, 100);
        inputText.x = Laya.stage.width - inputText.width >> 1;
        inputText.y = (Laya.stage.height - inputText.height >> 1) +100;
        inputText.padding = [2, 2, 2, 2];
        inputText.bgColor = "#666666";
        inputText.color = "#ffffff";
        inputText.fontSize = 20;
        Laya.stage.addChild(inputText);
    }
}