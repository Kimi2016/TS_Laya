
/**
 * Protobuf 消息名称匹配
 */
export default class PBMessageName {
    static messageMap = {}
    static isInit = false
    static getMap(): any {
        if (this.isInit){
            return this.messageMap
        }
        this.isInit = true

        //MessageName
        let map = this.messageMap

        map[GameMessage.GM_VERIFY_VERSION]='GM_VerifyVersion'
        map[GameMessage.GM_VERSION_RETURN]='GM_VerifyVersionReturn'

        return map
    }
}