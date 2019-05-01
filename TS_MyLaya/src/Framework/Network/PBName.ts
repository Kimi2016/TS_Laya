
/**
 * Protobuf 消息名称匹配
 */
export default class PBName {
    static messageMap = {}
    static isInit = false
    static getMap(): any {
        if (PBName.isInit){
            return PBName.messageMap
        }
        PBName.isInit = true

        //MessageName
        let map = PBName.messageMap

        map[PBID.GM_VERIFY_VERSION]='GM_VerifyVersion';
        map[PBID.GM_VERSION_RETURN]='GM_VerifyVersionReturn';

        return map
    }
}