
/**
 * Protobuf 消息名称匹配
 */
export default class GameMessageName {
    static messageMap = {}
    static isInit = false
    static getMap(): any {
        if (GameMessageName.isInit){
            return GameMessageName.messageMap
        }
        GameMessageName.isInit = true

        //MessageName
        let map = GameMessageName.messageMap

        map[GameMessage.GM_VERIFY_VERSION]='GM_VerifyVersion';
        map[GameMessage.GM_VERSION_RETURN]='GM_VerifyVersionReturn';

        return map
    }
}