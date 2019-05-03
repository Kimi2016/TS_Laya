class HttpRequestExtension extends Laya.HttpRequest {
    
    constructor() {
        super();
    }
    
    /**
     * send
    url:string,data:any=null,method:string="get", responseType:string="text", headers:any=null :void    */
    public send(url:string,data:any=null,method:string="get", responseType:string="text", headers:any=null):void {
        super.send(url, data, method, responseType, headers);
        
        this._http.upload.onprogress= function(e:any):void {
            //上传进度
            console.log("onprogress:" + e);
        }
        this._http.upload.onload= function(e:any):void {
            console.log("onload");
        }
        this._http.upload.onerror= function(e:any):void {
            console.log("onerror:" + e);
        }
        this._http.upload.onabort = function(e:any):void {
            console.log("onabort");
        }
    }
}