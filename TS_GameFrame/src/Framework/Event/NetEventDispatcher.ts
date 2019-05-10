class Observer {
    /** 上下文 */
    private context: any = null;
    /** 回调函数 */
    private callback: Function = null;

    constructor(context: any, callback: Function) {
        this.context = context;
        this.callback = callback;
    }

    /**
     * 重置
     * @param context 上下文
     * @param callback 回调函数
     */
    reset(context: any = null, callback: Function = null): void {
        this.context = context;
        this.callback = callback;
    }

    /**
     * 发送通知
     * @param args 不定参数
     */
    notify(...args: any[]): void {
        this.callback.call(this.context, ...args);
    }

    /**
     * 上下文比较
     * @param context 上下文
     */
    compar(context: any): boolean {
        return context == this.context;
    }
}


export default class NetEventDispatcher {
    private static instance: NetEventDispatcher;
    public static getInstance(): NetEventDispatcher {
        return this.instance || (this.instance = new this());
    }

    /** 监听数组 */
    private listeners: { [index: number]: Array<Observer> } = {}
    /** 移除数组 */
    private removeListeners: Array<Observer> = []

    private constructor() { }

    public register(messageID: number, context: any, callback: Function) {
        let observers: Observer[] = this.listeners[messageID];
        if (!observers) {
            this.listeners[messageID] = [];
        }
        if (this.removeListeners.length > 0) {
            let observer = this.removeListeners.pop();
            observer.reset(context, callback);
            this.listeners[name].push(observer);
        }
        else {
            this.listeners[name].push(new Observer(context, callback));
        }
    }
    public unRegister(messageID: number, context: any, callback: Function) {
        let observers: Observer[] = this.listeners[messageID];
        if (!observers) {
            return;
        }
        for (let i = 0, length = observers.length; i < length; i++) {
            let observer = observers[i];
            if (observer.compar(context)) {
                observers.splice(i, 1);
                observer.reset();
                this.removeListeners.push(observer);
                break;
            }
        }
        if (observers.length == 0) {
            delete this.listeners[messageID];
        }
    }
    public dispatch(messageID: number, ...args): void {
        let observers: Observer[] = this.listeners[messageID];
        if (!observers) {
            return;
        }
        for (let i = 0, length = observers.length; i < length; i++) {
            let observer = observers[i];
            observer.notify(messageID, ...args);
        }
    }
    public ClearAll(): void {
        this.listeners = {}
    }
}