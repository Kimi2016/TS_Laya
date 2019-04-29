//UI Event
export default class UIEventDispatcher extends laya.events.EventDispatcher {
    private static instance: UIEventDispatcher;
    public static getInstance(): UIEventDispatcher {
        return this.instance || (this.instance = new UIEventDispatcher());
    }
    private constructor() { super(); }
}