export default class NetworkEventDispatcher {
    private static instance: NetworkEventDispatcher;
    public static getInstance(): NetworkEventDispatcher {
        return this.instance || (this.instance = new this());
    }

    private messageHandlers: { [index: number]: Function[]; } = {}

    private constructor() { }

    public RegisterMessage(messageID: number, fun: Function) {
        var funs: Array<Function> = this.messageHandlers[messageID];
        if (!funs) {
            funs = new Array<Function>();
            this.messageHandlers[messageID] = funs;
        }
        funs.push(fun);
    }
    public UnRegisterMessage(messageID: number, fun: Function) {
        var funs: Array<Function> = this.messageHandlers[messageID];
        if (funs) {
            var index: number = funs.indexOf(fun);
            funs.splice(index, 1);
        }
    }
    public Dispatch(messageID: number, netPackage: any): void {
        var funs: Array<Function> = this.messageHandlers[messageID];
        if (funs) {
            funs.forEach(element => {
                element.call(element, netPackage)
            });
        }
    }
    public ClearAll(): void {
        this.messageHandlers = {}
    }
}