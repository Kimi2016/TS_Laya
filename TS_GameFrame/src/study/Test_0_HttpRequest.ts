//import HttpRequest = laya.net.HttpRequest;

export default class Test_0_HttpRequest
{
    constructor()
    {
        console.log("Test_0_HttpRequest");

        //var httpRequest:Laya.HttpRequest = new Laya.HttpRequest();
        var xhr:HttpRequestExtension = new HttpRequestExtension();
        xhr.http.timeout = 10000;//设置超时时间
        xhr.once(Laya.Event.COMPLETE, this, this.completeHandler);
        xhr.once(Laya.Event.ERROR, this, this.errorHandler);
        xhr.on(Laya.Event.PROGRESS, this, this.processHandler);
        
        xhr.send("res/data.data", "", "get", "test");//用来获取一个远端的文件，格式为文本的格式
        
        //httpRequest.send("http:xxx.xxx.com?a=xxxx&b=xxx","","get","text");//发送了一个get请求，携带的参数为a = xxxx,b=xxx
        //httpRequest.send("http:xxx.xxx.com","a=xxxx&b=xxx","post","text");//用post方法请求一个数据方式
    }

    private completeHandler(data:any):void{
        console.log(data);
    }
    private errorHandler(data:any):void{
        console.log(data);
    }
    private processHandler(data:any):void {
        console.log(data);
    }
}