
/**
 * Protobuf 消息名称匹配
 */
export default class NetMessageName {
    static messageMap = {}
    static isInit = false
    static getMap(): any {
        if (NetMessageName.isInit){
            return NetMessageName.messageMap
        }
        NetMessageName.isInit = true

        //MessageName
        let map = NetMessageName.messageMap

        map[GameMessage.GM_VERIFY_VERSION]='GM_VerifyVersion';
        map[GameMessage.GM_VERSION_RETURN]='GM_VerifyVersionReturn';

        return map
    }
}