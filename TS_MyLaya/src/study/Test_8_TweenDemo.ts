//缓动动画
export default class Test_8_TweenDemo {

    constructor() {
        //创建缓动文本
        this.createTween();
    }
    //创建缓动文本
    private createTween(): void {
        //"LayaBox字符串总宽度"
        var w: number = 800;
        //文本创建的起始位置(>>在此使用右移运算符，相当于/2 用>>效率更高)
        var offsetX: number = Laya.stage.width - w >> 1;
        //显示的字符串
        var demoString: string = "Tween";
        var letterText: Laya.Text;
        //根据"LayaBox"字符串长度创建单个字符，并对每个单独字符使用缓动动画
        for (var i: number = 0, len: number = demoString.length; i < len; ++i) {
            //从"LayaBox"字符串中逐个提出单个字符创建文本
            letterText = this.createLetter(demoString.charAt(i));
            letterText.x = w / len * i + offsetX;
            //文本的初始y属性
            letterText.y = 300;
            //对象letterText属性y从缓动目标的100向初始的y属性300运动，每次执行缓动效果需要3000毫秒，缓类型采用elasticOut函数方式，延迟间隔i*100毫秒执行。
            //Laya.Tween.from(letterText, { y: 0 }, 3000, Laya.Ease.elasticOut, Laya.Handler.create(this,this.changeColor, [letterText]), i * 1000);
            //Laya.Tween.from(letterText, { y: 0 }, 3000, Laya.Ease.bounceIn, Laya.Handler.create(this,this.changeColor, [letterText]), i * 100);
            Laya.Tween.from(letterText, { y: 0 , update: new Laya.Handler(this, this.updateColor,[letterText])},
                 3000, Laya.Ease.bounceIn, Laya.Handler.create(this,this.changeColor, [letterText]), i * 100);
        }
    }
    /**
     * 缓动进行时的回调更新方法
     * txt  缓动对象
     */
    private updateColor(txt:Laya.Text):void{
        var c:number = Math.floor(Math.random()*3);
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
    }
    /**
     * 缓动完成后的回调方法
     * txt  缓动对象
     */    
    private changeColor(txt:Laya.Text):void{
        //将文本字体改变成红色
        txt.color = "#ff0000";
    }
    //创建单个字符文本，并加载到舞台
    private createLetter(char: string): Laya.Text {
        var letter: Laya.Text = new Laya.Text();
        letter.text = char;
        letter.color = "#ffffff";
        letter.font = "Impact";
        letter.fontSize = 180;
        Laya.stage.addChild(letter);
        return letter;
    }
}