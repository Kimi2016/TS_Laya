export default class NetworkEventManager {
    private static instance: NetworkEventManager;

    public static getInstance(): NetworkEventManager {
        if (!this.instance) {
            this.instance = new NetworkEventManager();
        }
        return this.instance
    }

    private messageHandlers: { [index: number]: Function[]; } = {}

    private constructor() {

    }

    public RegisterMessage(gameMessage: GameMessage, fun: Function) {
        var funs: Array<Function> = this.messageHandlers[gameMessage];

        if (!funs)  {
            funs = new Array<Function>();
            this.messageHandlers[gameMessage] = funs;
        }
        funs.push(fun);
    }

    public UnRegisterMessage(gameMessage: GameMessage, fun: Function) {
        var funs: Array<Function> = this.messageHandlers[gameMessage];

        if (funs)  {
            var index: number = funs.indexOf(fun);
            funs.splice(index, 1);
        }
    }

    public DispatchMessage(gameMessage: GameMessage, netPackage:any):void {
        var funs: Array<Function> = this.messageHandlers[gameMessage];
        
        if (funs)
        {
            funs.forEach(element => {
                element.call(netPackage)
            });
        }
    }


    public RemoveAllNetWorkEvent(): void  {
        this.messageHandlers = {}
    }
}