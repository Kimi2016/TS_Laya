const enum GameMessage
{
    ///**************************************************************************************************
    GM_GAMESERVER_INIT_OK = 101,//逻辑服务器初始化完成消息(共享内存部分)
    GM_DATABASESERVER_INIT_OK,//数据库服务器初始化完成
    GM_REGISTERLOGSERVER,///注册日志服务器
	GM_REGISTERLOGSERVER_RETURN,
    GM_REGISTER_GAME_SERVER,
    GM_INIT_OK_REQUEST, //http服务器初始化OK
    GM_INIT_OK_RETURN,
    GM_REGISTER_AUDIO_SERVER, //GameServer 注册语音服务器
    GM_GAMESERVERINITOK,///逻辑服务器初始化完成

    GM_SERVERSTATECHANGE_NOTIFYTOHTTP,///逻辑服务器通知http服务器服务器状态修改 add by dsq
	GM_SERVERSTATECHANGE_NOTIFYTOGATE,///通知网关服务器状态修改
	GM_SERVERSTATECHANGE_NOTIFYTOLOGIN,///网关服务器通知全局服务器状态修改
	GM_AUTOOPENSTATECHANGE,///自动开服，将其他推荐服改成爆满

    GM_CREATEROLESTATE_TOHTTP,  // 通知http创角状态变化

    GM_ACCOUNT_SERVER_MESSAGE_START = 199,          ///账号服务器消息开始


    ///***************玩家账号登入流程*****************************************************************************/
    GM_ACCOUNT_REQUEST = 200,      ///验证是否有这个帐号,
	GM_ACCOUNT_REQUEST_RETURN,  ///验证是否有这个帐号返回

    GM_ACCOUNT_VERIFY,            ///验证帐号密码,
	GM_ACCOUNT_VERIFY_RETURN,     ///验证帐号密码返回

    GM_ACCOUNT_CREATE,			///进行账号创建的消息
	GM_ACCOUNT_CREATE_RETURN,   ///进行账号创建的消息返回	

    GM_PASSWORD_MODIFY,			///进行帐号密码修改的消息
	GM_PASSWORD_MODIFY_RETURN,  ///进行帐号密码修改的消息返回

    GM_ACCOUNT_LOGIN_AREA,      ///玩家选区,不需要返回消息

    GM_ROLE_ENSURE_CHOOSE_AREA,     ///玩家确定选区,

    GM_VERIFY_VERSION,          /*!< 客户端验证版本号 */
    GM_VERSION_RETURN,          /*!< 版本号验证结果 */

    SM_NOTIFY_DBWRITE = 212,  //gmdb 告诉gmserver写一次

    GM_NOTIFY_QUEEN_INFO = 214,///通知排队信息
	GM_NOTIFY_TAKELOGIN,///通知客户端你可以登陆了


    SM_NOTIFY_ERASE_PLAYER,//共享内存主动清除玩家通知
    GM_IS_EXAMINATION_REQUEST,
    GM_IS_EXAMINATION_RETURN,       //通知客户端是否审核

    GM_IS_SERVERONLOGINNOTICE_REQUEST,//请求是否在登陆界面显示公告
    GM_IS_SERVERONLOGINNOTICE_RETURN,

    GM_TEASTACCOUNT_REQUEST = 250,///客户端请求试玩账号
	GM_TEASTACCOUNT_RETURN,///返回客户端试玩账号用户名和密码
	GM_BANDTESTACCOUNT_REQUEST,///客户端请求绑定试玩账号
	GM_BANDTESTACCOUNT_RETURN,///返回绑定账号结果

    GM_RECORDACCOUNTINFO_REQUEST,///记录玩家用户名和密码

    ///***************玩家账号登入流程结束**************************************************************************/

    ///**************选择区号消息*************************************************************************************/
    GM_STATELIST_REQUEST = 300,	///区列表请求
	GM_STATELIST_RETURN,        ///区列表请求返回

    GM_CHOOSE_AREA,				///选择区
	GM_CHOOSE_AREA_RETURN = 303,        ///选择区返回

    GM_REGISTER_STATSERVER = 306,		///状态服务器向全局服务器注册
	GM_UNREGISTER_STATSERVER, ///注销状态服务器

    SM_REGISTER_SERVER_TO_GATE,	///向网关服务器注册服务器信息,
	SM_UNREGISTER_SERVER_TO_GATE,///注销服务器信息,


    GM_MY_SERVERS,				/// 我的服务器
	GM_MY_SERVERS_RETURN,       /// 我的服务器返回

    GM_MY_SERVERS_CHG,          /// 我的服务器改变


    GM_REGISTER_CENTERVER,		///中心服务器向全局服务器注册
	GM_LOGIN_TO_CENTER_TOUTIAO, // 头条信息1
    GM_GAME_TO_CENTER_TOUTIAO,  // 头条信息2

    GM_ACCOUNT_SERVER_MESSAGE_END = 399,        ///账号服务器消息结束

    ///**************选择区号消息返回*************************************************************************************/


    /***************************网关服务器分配网络包消息id段：GameServer*****************************************/
    GATE_MESSAGE_GAME_SERVER_BEGIN = 400,

    ///**************角色消息*************************************************************************************/
    GM_ROLELIST_REQUEST = 400,		///请求角色列表
	GM_ROLELIST_RETURN = 401,           ///返回角色列表

    GM_ROLE_CREATE = 407,										     ///角色创建
	GM_ROLE_CREATE_RETURN,									///创建角色消息返回 
	GM_ROLE_DELETE,											///删除角色信息
	GM_ROLE_DELETE_RETURN,									///删除角色信息返回 
	GM_ROLE_LOGIN,											///玩家登陆
	GM_ROLE_LOGIN_RETURN,                                   ///角色登陆成功返回 

    GM_ROLENAME_REQUEST,									///随机名字
	GM_ROLENAME_REQUEST_RETURN,

    GM_RECOVER_DELETE_ROLE_REQUEST = 420,         //可恢复删除角色请求
    GM_RECOVER_DELETE_ROLE_RETURN,          //可恢复删除角色返回
    GM_CANCEL_RECOVER_DELETE_ROLE_REQUEST,  //取消 删除角色请求
    GM_CANCEL_RECOVER_DELETE_ROLE_RETURN,   //取消 删除角色返回
    GM_RECOVER_DELETE_ROLE_NOTIFY,          //通知客户端 是否取消删除角色

    GM_AREAACCOUNT_INFO_REQUEST = 440,	///L,请求区类表中角色信息,
	GM_AREAACCOUNT_INFO_RETURN,         ///L,回调区类表中角色信息,
                                        ///L 03.25add
    GM_UPDATEAREA_RETURN,              ///L,回调区更新区服信息

    GM_CREATE_ROLE_NOTIFY = 443,					///创建角色通知,
	GM_DELETE_ROLE_NOTIFY,					///删除角色通知,
	GM_ROLE_LEVEL_NOTIFY,					///角色等级更改通知,
	GM_ROLE_LOGIN_NOTIFY,                   ///角色登陆成功通知

    GM_RESTORE_CONNECT_FROM_OFFLINEHANG,        //掉线重连
    GM_RESTORE_CONNECT_FROM_OFFLINEHANG_OK,     //重连成功
    GM_RESTORE_CONNECT_FROM_OFFLINEHANG_FAILED, //不具备重连资格,重连失败

    GAME_SERVER_LOGIN_MESSAGE_SPLIT = 450,          ///游戏服务器登录前后消息分隔id,

    GM_ROLE_QUIT = 451,										///清除内存玩家退出	  
	SM_PULL_PLAYER_CACHE_REQUEST = 456,                     //请求玩家数据拉玩家进入缓存
    SM_PULL_PLAYER_CACHE_RETURN,//离线玩家信息返回

    GM_ROLE_HANG = 461,///角色挂起

    GM_NOTIFYDISCONNECT,                           ///通知逻辑服务器客户端连接断开

    GM_CHACKPLAYERSTATE = 463,                       ///网关服务器通知逻辑服务器所有在线玩家

    GM_READ_PLAYDELETE_INFO = 465,              //请求角色删除数据
    GM_READ_PLAYDELETE_INFO_RETURN,             //数据库角色删除数据返回

    GM_PLAYERCREATTIME_REQUEST,         ////客户端请求玩家创建时间
    GM_PLAYERCREATTIME_RETURN,          ///返回玩家创建时间

    //**************************查看角色信息,***********************************/
    GM_CHECK_ROLEINFO_REQUEST = 520,		///请求查看角色信息,
	SM_REQUEST_ROLE_BASE_INFO,		///游戏服务器向数据库服务器请求角色基本信息,
	GM_ROLE_BASEINFO_RETURN,		///角色的基本信息回调,
	SM_ROLE_ID_BY_NAME,             //后台封号  gameServer 通过名字  向数据库请求查找roleID 
    SM_ROLE_ID_BY_NAME_RETURN,      ///通过角色名获得的角色信息的回调
    //***************************查看角色信息结束,*******************************/

    GM_SENDCRCKEY = 750,            ///将玩家消息校验码发给客户端
                                    ///**************角色消息完*************************************************************************************/

    /**********************************心跳包、时间包开始*********************************************/
    GM_ROLE_HEARTBEAT_MESSAGE = 1200,
    SM_WATCHDOG_HEARTBEAT,
    GM_HEARTBEAT_MESSAGE,			///心跳包
	GM_CENTERCOPY_HEARBEAT,         ///中心服务器副本的心跳包,
    /**********************************心跳包、时间包结束*********************************************/


    /***************************************** 网络延迟 ****************************************************/
    GM_CHECKTIME_REQUEST = 1300,              //请求场景服务器时间
    GM_CHECKTIME_RETURN,
    GM_DELAYTEST_MESSAGE_REQUEST,      //向场景服务器请求  延迟测试
    GM_DELAYTEST_MESSAGE_RETURN,
    /***************************************** 网络延迟结束 ****************************************************/


    ///*******************************************跨服战模块********************************************************//
    GM_REGISTER_FBSERVER_REQUEST = 5100,            //"某某"服务器注册到副本服务器上,
    GM_REGISTER_FBSERVER_RETURN,
    GM_UNREGISTER_FBSERVER_REQUEST,             //"某某"服务器注销从副本服务器上,
    GM_UNREGISTER_FBSERVER_RETURN,
    GM_GAMESERVERREGISTERCENTER_REQUEST,		///1\逻辑服务器注册到中心服务器,
	GM_GAMESERVERREGISTERCENTER_RETURN,			///回调,
	GM_TOPFIGHT_MATCHREQUEST,					///2\逻辑服务器向中心服务器请求决斗之巅匹配,
	GM_TOPFIGHT_MATCHRETURN,					///回调,
	GM_TOPFIGHTCANCLEMATCH_REQUEST,				///3\逻辑服务器请求取消匹配,
	GM_TOPFIGHTCANCLEMATCH_RETURN,				///回调,
	GM_TOPFIGHTCENTERRANK_REQUEST,				///4\逻辑服务器请求中心服务器中决斗之巅的排行数据,
	GM_TOPFIGHTCENTERRANK_RETURN,				///回调,
	GM_TOPFIGHT_FBSERVERRESULT_REQUEST,			///5\副本服务器通知中心服务器战斗结果,
	GM_TOPFIGHT_FBSERVERRESULT_RETURN,			///回调,
	GM_CENTERFBIP_NOTIFY,                       ///通知客户端中心服务器ip地址,

    ///*******************************************跨服战模块over********************************************************//


    /***************************************动态typeobject表********************************/
    GM_GET_DYNAMIC_TYPEOBJECT_REQUEST = 5450,
    GM_GET_DYNAMIC_TYPEOBJECT_RETURN,
    /***************************************动态typeobject表结束*****************************/


    /****************************************动态表同步操作*******************************************/
    SM_GET_DYN_OBJECT_FROM_CENTER_REQUEST = 5550,       //向中心服务器请求动态礼包描述
    SM_GET_DYN_OBJECT_FROM_CENTER_RETURN,           //向中心服务器返回动态礼包描述
    SM_GET_DYN_GIFT_BAG_FROM_CENTER_REQUEST,        //向中心服务器请求具体的礼包物品详情
    SM_GET_DYN_GIFT_BAG_FROM_CENTER_RETURN,         //向中心服务器请求具体的礼包物品详情返回
    SM_GET_TABLE_VERSION_REQUEST,   //请求当前活动的版本号
    SM_GET_TABLE_VERSION_RETURN,    //返回当前活动的版本号
                                    /****************************************动态表同步操作结束***************************************/


    /***************************************日志服务器使用开始*******************************************/
    SM_LOG_INFO_STRRT = 7000,
    ///----------角色类信息------------
    SM_LOG_CREATE_ACCOUNT,				///帐号创建
	SM_LOG_ACCOUNT_LOGIN,				///帐号登入
	SM_LOG_ROLE_CREATE,					///角色创建
	SM_LOG_ROLE_LOGIN,					///角色登入
	SM_LOG_ROLE_BASE,					///角色基本信息
	SM_LOG_ROLE_LOGOUT,					///角色登出
	SM_LOG_ROLE_UPGRADE,				///角色升级
	SM_LOG_SKILL_UPGRADE,				///技能升级
	SM_LOG_ACTIVATE_ARTIFACT,			///激活神器（至宝）
	SM_LOG_IMPROVE_ARTIFACT,			///培养神器（至宝）
	SM_LOG_FLYUP_UPGRADE,				///飞升升级
	SM_LOG_FLYUP_PRACT,					///飞升修行
	SM_LOG_FLYUP_POINT,					///飞升指点
	SM_LOG_FLYUP_OVER,					///飞升收功
	SM_LOG_ZHUANSHENG,					///转生
	SM_LOG_SWAPXIUWEI,					///兑换修为
	SM_LOG_BAGUNLOCK,					///背包解锁
	SM_LOG_BAGOILUSE,					///祝福油使用
	SM_LOG_COMPOSE,						///合成使用
	SM_LOG_UNCOMPOSE,					///分解使用
	SM_LOG_STOREHOUSEIN,				///仓库存放
	SM_LOG_STOREHOUSEOUT,				///仓库取出
	SM_LOG_SHOPSELL,					///杂货店出售
	SM_LOG_SHOPSELLBACK,				///杂货店回购
	SM_LOG_XIANMAI_LEVEL,				///提升心法（仙脉）
	SM_LOG_XIANMAI_SKILL,				///提升心法技能（仙脉）
	SM_LOG_SHOP_EXCHANGE,				///杂货店-兑换
	SM_LOG_RIDE,						///坐骑培养
	SM_LOG_RIDEEQUIP,					///坐骑装备合成
	SM_LOG_PETGROW,                     // 宠物成长日志
    SM_LOG_PETPRACT,                    // 宠物灵修日志
    SM_LOG_PETCOMPOSE,                  // 宠物融合日志
    SM_LOG_PETUSEDAN,                   // 宠物使用融合丹日志
    SM_LOG_PETEATEGG,                   // 宠物宠物蛋融合日志
    SM_LOG_WINGGET,						///仙羽获取
	SM_LOG_WINGUPGRADE,                 // 仙羽升级
    SM_LOG_TITLEADD,                    // 称号获取
    SM_LOG_TITLEREMOVE,                 // 称号失去
    SM_LOG_TRUMPACTIVATE,				///法宝（法器）激活
	SM_LOG_TRUMPREFINE,					///法宝（法器）淬炼
	SM_LOG_TRUMPSOUL,					///法宝（法器）淬炼
	SM_LOG_FASHIONADD,                  // 时装获取
    SM_LOG_FASHIONREMOVE,               // 时装消失
    SM_LOG_FASHIONUPGRADE,              // 时装升级永久
    SM_LOG_RIDEFASHION,					///使用坐骑时装
	SM_LOG_EQUIPSTRENGTH,				///装备强化
	SM_LOG_EQUIPLEVELUP,				///装备升阶
	SM_LOG_EQUIPREFINE,					///装备精炼
	SM_LOG_CLEAR,                       // 装备洗练
    SM_LOG_CLEARSWAP,                   // 装备洗练替换
    SM_LOG_EQUIPDIAMOND,                // 装备镶嵌
    SM_LOG_EQUIPINHERIT,                // 装备继承
    SM_LOG_MALLBUY,						///商城购买
	SM_LOG_FRIENDADD,					///添加好友
	SM_LOG_FRIENDDELETE,				///删除好友
	SM_LOG_FRIENDADDBLACK,				///添加黑名单
	SM_LOG_FRIENDDELETEBLACK,			///移除黑名单
	SM_LOG_FRIENDRECIEVE,				///领取馈赠
	SM_LOG_MAIL_RECEIVE,                //邮件领取信息
    SM_LOG_MAIL_ATTACHMENT,             //邮件附件信息

    SM_LOG_MUSTDONE,                    //领取每日必做奖励
    SM_LOG_BUILDSOUL,                   //铸魂
    SM_LOG_SEVENLOGIN,                  //七天登录
    SM_LOG_TREASUREGET,                 //藏宝库抽取
    SM_LOG_WEEKCARDCLICK,               //理财周卡
    SM_LOG_FIRSTRECHARGECLICK,          //首冲
    SM_LOG_WEEKCARDACTIVATE,            //理财周卡激活
    SM_LOG_VIP,                         //VIP
    SM_LOG_TASK,                        // 任务改变
    SM_LOG_ARENA,                       //竞技场
    SM_LOG_FRIENDGOENEMY,               //传送仇人
    SM_LOG_TIREDVALUE,                  //体力改变
    SM_LOG_WLZDFB,                      //永恒试炼
    SM_LOG_WLZDBOX,                     //永恒试炼宝箱
    SM_LOG_MARRY,                       //结婚
    SM_LOG_MARRYIMPROVE,                //结婚信物提升
    SM_LOG_RECHARGEORDER,               //订单信息
    SM_LOG_RECHARGE,                    //充值信息
    SM_LOG_DIAMOND,                     //获得元宝
    SM_LOG_GOLD,                        //金币变化
    SM_LOG_BINDGOLD,                    //绑铜变化
    SM_LOG_BINDDIAMOND,                 //礼券变化
    SM_LOG_DUOBAO,                      //夺宝
    SM_LOG_ACHIEVE,                     //领取成就
    SM_LOG_STATISTIC,					///日志内容
	SM_LOG_MARKETBUY,                   //市场购买
    SM_LOG_MARKETONSELL,                //市场上架
    SM_LOG_GANGSTORE,                   //仙盟商店购买
    SM_LOG_GANGCITYSTORE,               //仙盟城战商店购买
    SM_LOG_ONLINE_COUNT,                //在线人数
    SM_LOG_GANGCREATE,                  // 仙盟创建
    SM_LOG_GANGAPPLY,                   // 仙盟申请
    SM_LOG_GANGADD,                     // 加入仙盟
    SM_LOG_GANGCONTRIBUTE,              // 仙盟贡献变化
    SM_LOG_GANGMEMBCONT,                // 玩家贡献变化
    SM_LOG_GANGPOSITION,                // 玩家职务变化
    SM_LOG_GANGLEAVE,                   // 玩家退出仙盟
    SM_LOG_GANGSALARY,                  // 仙盟俸禄
    SM_LOG_GANGDONATE,                  // 仙盟捐献
    SM_LOG_GANGSKILL,                   // 仙盟技能
    SM_LOG_GANGHOUSEADD,                // 仙盟仓库放入
    SM_LOG_GANGHOUSEREMOVE,             // 仙盟仓库取出
    SM_LOG_GANGHOUSEAPPLY,              // 仙盟申请取出
    SM_LOG_GANGDISMISS,                 // 仙盟解散
    SM_LOG_TRADEADD,                    // 交易添加
    SM_LOG_TRADEGET,                    // 交易获取
    SM_LOG_INTIMACY,                    // 亲密度改变
    SM_LOG_MAILDELETE,                  // 邮件删除
    SM_LOG_COPY,                        // 通关副本
    SM_LOG_CHOISECARD,                  // 翻牌奖励
    SM_LOG_FENGSHEN,                    // 封神之战
    SM_LOG_BROTHER,                     // 结义
    SM_LOG_BROTHERWINE,                 // 情义值改变
    SM_LOG_BROTHERBREAK,                // 退出结义
    SM_LOG_BROTHETASK,                  // 完成结义任务
    SM_LOG_WUDAOHUI,                    // 武道会、仙武大会

    SM_LOG_CDKEYUSE,                    // 激活码使用
    SM_LOG_EXPADD,                      // 经验增加
    SM_LOG_ITEMCHANGE,                  // 物品变化
    SM_LOG_ACTREACH,                    // 活动达到可领取条件
    SM_LOG_ACTOBTAIN,                   // 活动领取奖励
    SM_LOG_DAILYLOGIN,                  // 每日签到

    SM_LOG_TASKCIRCLEACCEPT,            // 接受环式任务
    SM_LOG_TASKCIRCLEREFRESH,           // 环式任务刷星
    SM_LOG_TASKCIRCLERECV,              // 环式任务领取
    SM_LOG_TASKTRIALACCEPT,             // 接受试炼任务
    SM_LOG_TASKTRIALQUICK,              // 快速完成试炼任务
    SM_LOG_TASKTRIALONEKEY,             // 一键完成试炼任务

    SM_LOG_ROLENAMECHANGE,              // 玩家名字
    SM_LOG_GNAGNAMECHANGE,              // 仙盟名字

    SM_LOG_SINGLEFBBUY,                 //单人副本购买次数

    SM_LOG_MAIL_GET,                    //邮件获取信息
    SM_LOG_MAIL_READ,                   //读取邮件

    SM_LOG_SAVVY_CHANGE,                // 悟性变化
    SM_LOG_PRESTIGE_CHANGE,             // 声望变化
    SM_LOG_FEATS_CHANGE,                // 功勋变化
    SM_LOG_POINT_CHANGE,                // 积分变化

    SM_LOG_RANK_HISTORY,                // 排行榜日志

    SM_LOG_GANG_HISTORY,                // 仙盟日志

    SM_LOG_SENDCHAT,                    //聊天

    SM_LOG_BKLTV,
    SM_LOG_BKPAIDRETENTION,
    SM_LOG_BKROLERETENTION,

    SM_LOG_DIAMONDGODCHARGE,            //财神到充值元宝
    SM_LOG_DIAMONDGODCLICK,             //财神到迎财神
    SM_LOG_RUNEGET,                     //符文获取
    SM_LOG_RUNEDECOMPOSE,               //符文分解
    SM_LOG_RUNECOMPOSE,                 //符文合成

    SM_LOG_BESTEQUIPUPGRADE,                    //极品装备升星
    SM_LOG_BESTEQUIPSTRENGTH,                   //极品装备强化
    SM_LOG_BESTEQUIPCLEAR,                      //极品装备洗练
    SM_LOG_BESTEQUIPCLEARREPLACE,               //极品装备洗练替换	
    SM_LOG_ACT_CHUBAO,// 除暴
    SM_LOG_ACT_SSJS,//女娲神石
    SM_LOG_ACT_HYQX,// 盗宝小妖
    SM_LOG_ACT_GWGC,// 无间入侵
    SM_LOG_ACT_DUOBAO,// 秘殿夺宝
    SM_LOG_ACT_PLAYERDART,// 个人运镖
    SM_LOG_ACT_GANGDART,// 仙盟运镖
    SM_LOG_ACT_HOLLOW,//异界虚空
    SM_LOG_ACT_BONFIRE,// 仙盟篝火
    SM_LOG_ACT_MARTIAL,//武道会
    SM_LOG_ACT_CROSSTOP,// 个人跨服赛
    SM_LOG_ACT_DEADFIGHT,// 绝地乱斗
    SM_LOG_ACT_FENDSHEN,// 金剑大典
    SM_LOG_ACT_GANGWAR,//仙盟争霸
    SM_LOG_ACT_CROSSPEAK,//巅峰竞技
    SM_LOG_ACT_GANGPOINT,//跨服据点战
    SM_LOG_ACT_FINALBOSS,//荒古神域
    SM_LOG_ACT_SPEEDFIGHT,//极速挑战

    SM_LOG_MYSTICALSTOREPOINT,// 神秘商店积分
    SM_LOG_FIGHTVALCHANGE,// 战斗力改变
    SM_LOG_LORDRINGVIP,// vip特戒次数改变

    SM_LOG_ACT_CROSS3V3,// 3v3挑战
    SM_LOG_CROSS3V3_POINT,// 3v3积分
    SM_LOG_AUTOSUBOPERAT,// 自动订阅日志
    SM_LOG_PEAKHONOR,// 巅峰竞技荣誉变化日志

    SM_LOG_YAOSHENJINGPOCHANGE,// 精魄数量变化日志
    SM_LOG_YAOSHENJINGPOUPGRADE,// 精魄等级变化日志

    SM_LOG_LOGIN_OP = 8990,				/// 玩家操作日志 未创建角色  运维
	SM_LOG_PLAYER_OP,					/// 玩家操作日志  运维
	SM_LOG_FPS_CHANGE,                  /// 客户端fps策略变化

    SM_LOG_INFO_END = 8999,
    /***************************************日志服务器使用结束*******************************************/

    /*************************************GM工具开始**************************************************/
    GMCOMMAND_START = 9000,
    GMCOMMAND_GETONLINE_REQUEST,				///请求获得最大现在玩家数
	GMCOMMAND_GETONLINE_RETURN,				///请求获得最大现在玩家数回包
	GMCOMMAND_REQUEST_LOADPLUG, //加载插件
    GMCOMMAND_REQUEST_UNLOADPLUG,   //卸载插件
    GMCOMMAND_RETURN_PLUGRESULT,    //插件结果
    GMCOMMAND_SEALPLAYER_REQUEST,				///请求封禁角色
	GMCOMMAND_SEALPLAYER_RETURN,				///请求封禁角色回调
	GMCOMMAND_KICKOFF_REQUEST,					///请求踢角色下线
	GMCOMMAND_KICKOFF_RETURN,					///请求踢角色下线回调
	GMCOMMAND_REMOVE_SEALPLAYER_REQUEST,		///请求移除封禁角色
	GMCOMMAND_REMOVE_SEALPLAYER_RETURN,		///请求移除封禁角色回调
	GMCOMMAND_GET_SEALPLAYER_LIST_REQUEST,		///封禁角色列表
	GMCOMMAND_GET_SEALPLAYER_LIST_RETURN,       ///封禁角色列表回调

    GMCOMMAND_HTTP_REGISTER,                            ///apache扫描服务器的心跳包

    GMCOMMAND_GET_SEAL_ACCOUNT_LIST_REQUEST,                //获得封禁账号列表
    GMCOMMAND_GET_SEAL_ACCOUNT_LIST_RETURN,
    GMCOMMAND_ADD_SEAL_ACCOUNT_REQUEST,                 //添加封禁账号
    GMCOMMAND_ADD_SEAL_ACCOUNT_RETURN,
    GMCOMMAND_REMOVE_SEAL_ACCOUNT_REQUEST,                  //移除封禁账号
    GMCOMMAND_REMOVE_SEAL_ACCOUNT_RETURN,

    GMCOMMAND_MOVE_PLAYER_TO_CITY_REQUEST,                  //将玩家拉回主城
    GMCOMMAND_MOVE_PLAYER_TO_CITY_RETURN,
    GMCOMMAND_MODIFY_PASSWORD_REQUEST,                      //修改账目密码
    GMCOMMAND_MODIFY_PASSWORD_RETURN,
    GMCOMMAND_SEND_SYSTEM_WORD_REQUEST,                 //推送系统公告
    GMCOMMAND_SEND_SYSTEM_WORD_RETURN,

    GMCOMMAND_ADD_TASK_REQUEST, //添加任务
    GMCOMMAND_ADD_TASK_RETURN,
    GMCOMMAND_REMOVE_TASK_REQUEST,  //移除任务
    GMCOMMAND_REMOVE_TASK_RETURN,
    GMCOMMAND_GM_COMMAND_REQUEST,   //gm命令
    GMCOMMAND_GM_COMMAND_RETURN,

    GMCOMMAND_BOARDCAST_SEAL_ACCOUNT,       //广播账号被封消息
    GMCOMMAND_UPGRADE_PLAYER,               //拉角色等级
    GMCOMMAND_UPGRADE_PLAYER_RETURN,

    GMCOMMAND_EXCEL_SEAL_PLAYERS,           //通过excel封角色
    GMCOMMAND_EXCEL_SEAL_PLAYERS_RETURN,
    GMCOMMAND_EXCEL_SEAL_ACCOUNT,           //通过excel封账号
    GMCOMMAND_EXCEL_SEAL_ACCOUNT_RETURN,

    GMCOMMAND_CDKEY_REWARD_REQUEST,		///cdkey发送奖励,
	GMCOMMAND_CDKEY_REWARD_RETURN,          ///cdkey发送奖励回调,

    GMCOMMAND_GET_AREA_STRATEGY,            //请求选区策略
    GMCOMMAND_GET_AREA_STRATEGY_RETURN,
    GMCOMMAND_CHANGE_AREA_STRATEGY,     //改变选区策略
    GMCOMMAND_CHANGE_AREA_STRATEGY_RETURN,
    GMCOMMAND_HTTPSERVER_INIT_OK,               //通知http服务器初始化好了
    GMCOMMAND_GET_AREA_FLAG,                //向httpServer获得分区状态标识
    GMCOMMAND_GET_AREA_FLAG_RETURN,
    GMCOMMAND_CHANGE_AREA_FLAG,         //gm工具改变服务器状态
    GMCOMMAND_CHANGE_AREA_FLAG_RETURN,

    GMCOMMAND_GET_BLACKLIST,                //获取登陆黑名单
    GMCOMMAND_GET_BLACKLIST_RETURN,
    GMCOMMAND_ADD_BLACKLIST,                //加登陆黑名单
    GMCOMMAND_ADD_BLACKLIST_RETURN,
    GMCOMMAND_REMOVE_BLACKLIST,         //移除登陆黑名单
    GMCOMMAND_REMOVE_BLACKLIST_RETURN,

    GMCOMMAND_RELOAD_TABLE,     //重新加载表格
    GMCOMMAND_RELOAD_TABLE_RETURN,  //重新加载表格返回

    GMCOMMAND_RELOAD_OPERATION_PARAM,   //加载系数
    GMCOMMAND_RELOAD_OPERATION_PARAM_RETURN,    //加载 系数返回
    GMCOMMAND_CHANGESYSTEMTIME_REQUEST,         //修改系统时间
    GMCOMMAND_CHANGESYSTEMTIME_RETURN,              //返回系统修改结果
    GMCOMMAND_RELOADWONDERFUL_REQUEST,          //GM命令重新读取精彩活动表格
    GMCOMMAND_RELOADWONDERFUL_RETURN,               //返回结果
    GMCOMMAND_CELLPHONEGIFT_SENDMSG_REQUEST,    //向HTTP服务器请求发送短信
    GMCOMMAND_REMOVE_DYNAMIC_GIFTBAG_REQUEST,		///移除动态礼包
	GMCOMMAND_REMOVE_DYNAMIC_GIFTBAG_RETURN,		///移除动态礼包回调
	GMCOMMAND_ADD_DYNAMIC_GIFTBAG_REQUEST,			///添加动态礼包
	GMCOMMAND_ADD_DYNAMIC_GIFTBAG_RETURN,           ///添加动态礼包回调

    GMCOMMAND_SEND_SINGLE_MAIL,///单发邮件
	GMCOMMAND_SEND_SINGLE_MAIL_RETURN,///单发邮件返回
	GMCOMMAND_SEND_GROUP_MAIL,///群发邮件
	GMCOMMAND_SEND_GROUP_MAIL_RETURN,///群发邮件返回
	GMCOMMAND_SEND_TIMER_MAIL,///定时邮件添加
	GMCOMMAND_SEND_TIMER_MAIL_EDIT,///定时邮件修改
	GMCOMMAND_SEND_TIMER_MAIL_DEL,  ///定时邮件删除



    GMCOMMAND_UPDATE_AREA,	///更新服务器状态
	GMCOMMAND_UPDATE_AREA_RETURN,   ///更新服务器状态返回

    GMCOMMAND_FRESH_RETURN,         //刷新动态表回调

    GMCOMMAND_FRESHDYNTEST_RETURN,  //刷新dyn_test,

    GMCOMMAND_FRESH_DYNTABLE,       //刷新动态表
                                    //agoni临时加的,
    GMCOMMAND_FRESH_DYNTESTTABLE,

    GMCOMMAND_SEAL_ALL,     //封所有
    GMCOMMAND_SEAL_ACCOUNT, //封账号
    GMCOMMAND_SEAL_DEVICE,  //封设备

    GMCOMMAND_KICKPLAYER,           //踢人下线
    GMCOMMAND_KICKPLAYER_RETURN,    //踢人下线返回

    GMCOMMAND_ONLINEPLAYER,         //内存中玩家
    GMCOMMAND_ONLINEPLAYER_RETURN,    //内存中玩家返回

    GMCOMMAND_ONLINEPLAYERINFO,         //在线玩家信息	
    GMCOMMAND_ONLINEPLAYERINFO_RETURN,	//在线玩家信息返回
    GMCOMMAND_SEND_NEWSINGLE_MAIL,///新单发邮件
	GMCOMMAND_SEND_NEWSINGLE_MAILLV,///新按等级发邮件
	GMCOMMAND_SEND_NEWSINGLE_MAIL_RETURN,///新单发邮件返回

    GMCOMMAND_SEND_NOTICE,          //修改游戏内公告
    GMCOMMAND_SEND_NOTICE_RETURN,

    GMCOMMAND_SEND_LOADTABLE,           //加载表命令

    GMCOMMAND_CONFIG_ACTIVITY,          //管理活动
    GMCOMMAND_CONFIG_DYNOBJECT,         //添加动态物品

    GMCOMMAND_DELETE_SYSTEM_WORD_REQUEST,       //删除系统公告

    GMCOMMAND_CONFIG_LIMITTIME,         //管理显示活动

    GMCOMMAND_CONFIG_SERVERTIME,        //配置开服时间
    GMCOMMAND_CONFIGSERVERTIME_RETURN,

    GMCOMMAND_GETACTIVITY,            //获取未过期的活动
    GMCOMMAND_GETACTIVITY_RETURN,    //获取未过期的活动返回

    GMCOMMAND_GETLIMITACTIVITY,           //获取未过期的活动
    GMCOMMAND_GETLIMITACTIVITY_RETURN,    //获取未过期的活动返回

    GMCOMMAND_DELETEACTIVITY,             //删除活动
    GMCOMMAND_DELETEACTIVITY_RETURN,    //删除活动返回

    GMCOMMAND_DELETELIMITACTIVITY,            //删除活动
    GMCOMMAND_DELETELIMITACTIVITY_RETURN,    //删除活动返回

    GMCOMMAND_CONFIG_LUCKYWHEEL,            //配置幸运转盘

    GMCOMMAND_CONFIG_MALLLIMITBUY,          //配置商城抢购

    GMCOMMAND_GETLUCKYWHEEL,                //获取未过期的幸运转盘
    GMCOMMAND_GETLUCKYWHEEL_RETURN,
    GMCOMMAND_GETMALLLIMITBUY,              //获取未过期的商城抢购
    GMCOMMAND_GETMALLLIMITBUY_RETURN,

    GMCOMMAND_DELETELUCKYWHEEL,             //删除幸运转盘
    GMCOMMAND_DELETELUCKYWHEEL_RETURN,      //删除幸运转盘返回
    GMCOMMAND_DELETEMALLLIMITBUY,           //删除商城抢购
    GMCOMMAND_DELETEMALLLIMITBUY_RETURN,    //删除商城抢购返回

    GMCOMMAND_UPDATE_AREA_NEW,	///更新服务器状态
	GMCOMMAND_GETSERVERSTATE_REQUEST,       //获取服务器状态
    GMCOMMAND_GETSERVERSTATE_RETURN,        //获取服务器状态返回

    GMCOMMAND_GETGANGINFO_REQUEST,      //获取公会信息
    GMCOMMAND_GETGANGINFO_RETURN,       //获取公会信息返回

    GMCOMMAND_GETGANGSTOREGOODS_REQUEST,        //获取公会仓库物品
    GMCOMMAND_GETGANGSTOREGOODS_RETURN,         //获取公会仓库物品

    GMCOMMAND_GETBAGINFO_REQUEST,       //获取个人背包信息
    GMCOMMAND_GETBAGINFO_RETURN,        //获取个人背包信息返回

    GMCOMMAND_SETBAGINFO_REQUEST,       //获取公会仓库物品
    GMCOMMAND_SETBAGINFO_RETURN,            //获取公会仓库物品

    GMCOMMAND_BKLTV_REQUEST,            //
    GMCOMMAND_BKPAID_REQUEST,           //
    GMCOMMAND_BKRETENTION_REQUEST,      //

    GMCOMMAND_GETROLEID_REQUEST,
    GMCOMMAND_GETROLEID_RETURN,

    GMCOMMAND_CONFIG_DIAMONDGOD,            //配置财神到
    GMCOMMAND_GETDIAMONDGOD,                //获取未过期的财神到
    GMCOMMAND_GETDIAMONDGOD_RETURN,         //获取未过期的财神到返回

    GMCOMMAND_DELETEDIAMONDGOD,             //删除财神到
    GMCOMMAND_DELETEDIAMONDGOD_RETURN,      //删除财神到返回

    GMCOMMAND_CONFIG_PRACTICEDAY,           //配置修炼日
    GMCOMMAND_GETPRACTICEDAY,               //获取未过期的修炼日
    GMCOMMAND_GETPRACTICEDAY_RETURN,        //获取未过期的修炼日返回
    GMCOMMAND_DELETEPRACTICEDAY,            //删除修炼日
    GMCOMMAND_DELETEPRACTICEDAY_RETURN,     //删除修炼日返回

    GMCOMMAND_CONFIG_HOLIDAY,           //配置节日活动
    GMCOMMAND_GETHOLIDAY,               //获取未过期的节日活动
    GMCOMMAND_GETHOLIDAY_RETURN,        //获取未过期的节日活动返回
    GMCOMMAND_DELETEHOLIDAY,            //删除节日活动
    GMCOMMAND_DELETEHOLIDAY_RETURN,     //删除节日活动返回

    GMCOMMAND_NEW_SEAL_CHAT,            //新禁言
    GMCOMMAND_NEW_SEAL_CHAT_RETURN,         //

    GMCOMMAND_CONFIG_CHATCHECK,         //配置禁言参数
    GMCOMMAND_GET_CHATCHECK,            //获取禁言参数
    GMCOMMAND_GET_CHATCHECK_RETURN,

    GMCOMMAND_SEAL_IP,  //封ip
    GMCOMMAND_SEAL_IP_RETURN,           //封ip返回

    GMCOMMAND_NEWSEAL_ALL,              //新封所有

    GMCOMMAND_CONFIG_RECHARGELIST,          //配置充值排行
    GMCOMMAND_GETRECHARGELIST,              //获取未过期的充值排行
    GMCOMMAND_GETRECHARGELIST_RETURN,       //获取未过期的充值排行
    GMCOMMAND_DELETERECHARGELIST_RETURN,    //删除未过期的充值排行

    GMCOMMAND_SENDPOOLREWARD,               //发送奖励池邮件
    GMCOMMAND_SENDPOOLREWARD_RETURN,        ///发送奖励池邮件返回

    GMCOMMAND_GETMARKET,                    //获取市场交易额度
    GMCOMMAND_COMMONSTR_RETURN,             //通用返回

    GMCOMMAND_CONFIGMARKET,                 //配置市场交易额度
    GMCOMMAND_CONFIGMARKET_RETURN,          //删除未过期的充值排行

    GMCOMMAND_CHANGEGANGTENET,              //修改公会宗旨
    GMCOMMAND_CHANGEGANGTENET_RETURN,       //修改公会宗旨返回

    GMCOMMAND_GETCHATLEVEL,             //获取当前聊天等级配置
    GMCOMMAND_CONFIG_CHATLEVEL,         //配置聊天等级
    GMCOMMAND_DELETE_CHATLEVEL,         //删除配置聊天等级

    GMCOMMAND_GETOPENBUTTON,            //获取创角开关当前状态
    GMCOMMAND_CONFIGOPENBUTTON,         //配置创角开关当前状态

    GMCOMMAND_NOTIFYOPENBUTTON,         ///通知创角状态变化

    GMCOMMAND_CONFIGPOOLPLAYER,         //配置内玩

    GMCOMMAND_PLAYERCHANGENAME,         // 玩家改名

    GMCOMMAND_MYSTICALSTORECONFIG,          // 同步新活动
    GMCOMMAND_MYSTICALSTORECONFIG_RETURN,   // 同步新活动返回
    GMCOMMAND_MYSTICALSTORELIST,            // 查看当前未过期活动
    GMCOMMAND_MYSTICALSTORELIST_RETURN,     // 查看当前未过期活动返回
    GMCOMMAND_MYSTICALSTOREDELETE,          // 删除活动
    GMCOMMAND_MYSTICALSTOREDELETE_RETURN,   // 删除活动返回


    GMCOMMAND_END = 9999,
    /*************************************GM工具结束**************************************************/

    PLAYER_MESSAGE_START = 10000,           // 玩家模块消息开始
    GM_PLAYER_OPERATE_LOG = 10001,          //玩家操作统计  用于运维
    GM_LOG_ENTERSYSTEM_REQUEST = 10002,     // 玩家进入系统信息
    GM_LOG_STATISTICS,                      // 日志数据
    GM_PLAYER_OPERATE_LOG_GS,               //玩家操作统计  用于运维

    GM_ROLEINFO_REQUEST = 10050,            // 玩家请求界面信息
    GM_ROLEINFO_RETURN,
    GM_ROLE_CHANGE_NAME_REQUEST,            // 求该玩家名字
    GM_ROLE_CHANGE_NAME_RETURN,
    GM_ROLE_CHANGE_BORADCAST,               // 玩家改名广播
    SM_ROLE_CHANGE_NAME_REQUEST,            // 玩家改名db
    SM_ROLE_CHANGE_NAME_RETURN,


    //***************************************通知客户端信息改变,***************************************/
    GM_NOTIFY_MONEYCHANGE = 10100,
    GM_NOTIFY_GOLDCHANGE,
    GM_NOTIFY_SCORECHANGE,
    GM_NOTIFY_HPCHANGE,
    GM_NOTIFY_MPCHANGE,
    GM_NOTIFY_EXPCHANGE,
    GM_NOTIFY_TIREDVALUE_CHANGE,
    GM_NOTIFY_PRESTIGE_CHANGE,
    GM_NOTIFY_COMMON_CHANGE,

    GM_NOTIFY_STRENGTH_CHANGE,
    GM_NOTIFY_INTELLECT_CHANGE,
    GM_NOTIFY_STAMINA_CHANGE,
    GM_NOTIFY_SPIRIT_CHANGE,
    GM_NOTIFY_HONOR_CHANGE,
    GM_NOTIFY_FIGHTVAL_CHANGE,
    GM_NOTIFY_NAMECHANGE,

    GM_NOTIFY_FIGHTDATA_CHANGE,         //战力基础数据变化通知
    GM_NOTIFY_CHANGE_int32,             //整形数据变化通知
    GM_NOTIFY_CHANGE_LONG64,            //长整形数据变化通知
    GM_NOTIFY_CHANGE_float,             //浮点变化通知
    GM_NOTIFY_CHANGE_xstring,           //字符串变化通知

    GM_NOTIFY_SETTINGCHANGE,

    GM_NOTIFY_RESETDATA,                // 通知过刷新点

    GM_NOTIFY_FIGHTDATA_CHANGE2,        //战力基础数据变化通知


    /***************人物背包模块 evange***********************************************************************/
    GM_PACK_SETTING = 10200,            // 获取背包的设置
    GM_PACK_SETTING_RETURN,         // 获取背包设置的响应

    GM_PACK_REQUEST,                // 请求背包列表
    GM_PACK_REQUEST_RETURN,         // 请求背包的返回

    GM_PACK_TIDY,                   // 整理背包
    GM_PACK_TIDY_RETURN,            // 整理背包的响应

    GM_PACK_STOREOBJECT,            // 存放物品到仓库中
    GM_PACK_STOREOBJECT_RETURN,     // 回包
    GM_PACK_RESTOREOBJECT,          // 从仓库拿回物品
    GM_PACK_RESTOREOBJECT_RETURN,   // 回包

    GM_SOLD_OBJ_REQUEST,            // 出售物品
    GM_SOLD_OBJ_RETURN,             // 出售物品返回
    GM_SOLDBACK_OBJ_REQUEST,        // 回购出售
    GM_SOLDBACK_OBJ_RETURN,         // 回购物品返回

    GM_MOUNT_EQUIP_REQUEST,         // 安装装备
    GM_MOUNT_EQUIP_RETURN,          // 安装装备返回
    GM_UNMOUNT_EQUIP_REQUEST,       // 卸下装备
    GM_UNMOUNT_EQUIP_RETURN,        // 卸下装备返回

    GM_PICKUP_TEMP_PACKAGE_REQUEST, // 拾取临时背包物品
    GM_PICKUP_TEMP_PACKAGE_RESULT,  // 拾取临时背包物品结果

    GM_COMPOSE_PACKAGE_REQUEST,     // 合成物品
    GM_COMPOSE_PACKAGE_RESULT,      // 合成物品结果

    GM_DECPMPOSE_PACKAGE_REQUEST,   // 分解物品
    GM_DECPMPOSE_PACKAGE_RESULT,    // 分解物品结果

    GM_DROP_PACKAGE_REQUEST,        // 丢弃物品
    GM_DROP_PACKAGE_RESULT,         // 丢弃物品结果

    GM_PACK_UNLOCK_GRID,            // 解锁背包格子
    GM_PACK_UNLOCK_GRID_RETURN,     // 解锁背包格子响应

    GM_PACK_ITEM_USE,               // 物品使用
    GM_PACK_ITEM_USE_RETURN,        // 物品使用回包

    GM_PACK_ITEM_EXCHANGE,              // 物品使用
    GM_PACK_ITEM_EXCHANGE_RETURN,       // 物品使用回包

    GM_DYN_BOXOBJECT_REQUEST,       // 请求时装宝箱物品信息
    GM_DYN_BOXOBJECT_ITEM_REQUEST,  // 请求时装宝箱物品信息
    GM_DYN_BOXOBJECT_RETURN,
    GM_DYN_BOXOBJECT_USE_REQUEST,   // 使用时装宝箱
    GM_DYN_BOXOBJECT_USE_RETURN,

    GM_MOUNT_PETEQUIP_REQUEST,          // 安装宠物装备
    GM_MOUNT_PETEQUIP_RETURN,           // 安装宠物装备返回
    GM_UNMOUNT_PETEQUIP_REQUEST,        // 卸下宠物装备
    GM_UNMOUNT_PETEQUIP_RETURN,         // 卸下宠物装备返回

    GM_PACK_NOTIFY = 10290,         // 背包变化通知
    GM_PACK_NOTIFY_ALLGRID,         // 通知背包整理结果
    GM_PACK_VALIDGRID_NOTIFY,       // 背包最大格子数变化通知
    GM_PACKAGE_GETITEM_NOTIFY,      // 通知物品增加
    GM_DYN_OBJECTS_NOTIFY,          // 动态物品通知
    GM_PACK_TIME_RECAL,             // 通知格子时间变化
    GM_TMPPACKAGE_EQUIP_NOTIFY,     // 通知装备信息变化

    /***************人物背包结束***********************************************************************/


    /*********************************技能 evange***************************************/
    SM_SKILL_INFO_REQUEST = 10300,          // DB请求玩家技能信息
    SM_SKILL_INFO_RETURN,                   // DB玩家技能信息返回

    GM_SKILL_INFO_REQUEST = 10320,          // 请求玩家技能信息
    GM_SKILL_INFO_RETURN,                   // 玩家技能信息返回
    GM_SKILL_UPGRADE_REQUEST,               // 技能升级
    GM_SKILL_UPGRADE_RETURN,                // 技能升级结果
    GM_SKILL_SETTING_REQUEST,               // 技能设置修改
    GM_SKILL_SETTING_RETURN,                // 技能设置成功  只有操作结果

    GM_SKILL_INFO_NOTIFY = 10380,               // 技能信息通知
    GM_SKILL_SETTING_NOTIFY,                // 技能摆放位置修改通知

    /*********************************技能结束***************************************/

    /*********************************转生 evange***************************************/
    SM_REINCAR_INFO_REQUEST = 10400,            // DB请求玩家转生信息
    SM_REINCAR_INFO_RETURN,                 // DB玩家转生信息返回

    GM_REINCAR_INFO_REQUEST = 10420,            // 请求玩家转生界面信息
    GM_REINCAR_INFO_RETURN,                 // 玩家转生信息返回
    GM_REINCAR_ZHUANSHENG_REQUEST,          // 转生请求
    GM_REINCAR_ZHUANSHENG_RETURN,           // 转生请求结果
    GM_REINCAR_XIUWEI_REQUEST,              // 打开修为界面
    GM_REINCAR_XIUWEI_RETURN,               // 修为界面结果
    GM_REINCAR_EXCHANGE_REQUEST,            // 经验和修为兑换
    GM_REINCAR_SEXCHANGE_RETURN,            // 经验和修为兑换结果
    GM_REINCAR_BUY_XIUWEI_REQUEST,          // 购买悟性
    GM_REINCAR_BUY_XIUWEI_RETURN,           // 购买悟性结果

    GM_REINCAR_INFO_NOTIFY = 10480,         // 悟性变化通知

    /*********************************转生结束***************************************/

    /*********************************wings evange***************************************/
    SM_WINGS_REQUEST = 10500,                   // DB wings
    SM_WINGS_RETURN,                        // DB
    SM_WINGSFASHION_REQUEST,                // DB wingsfashion
    SM_WINGSFASHION_RETURN,
    SM_WINGSSHOW_REQUEST,                   // DB wingsshow
    SM_WINGSSHOW_RETURN,

    GM_WINGS_UI_REQUEST = 10520,                // 仙羽界面
    GM_WINGS_UI_RETURN,
    GM_WINGS_UNLOCK_REQUEST,                // 翅膀解锁
    GM_WINGS_UNLOCK_RETURN,
    GM_WINGS_UPGRADE_REQUEST,               // 翅膀升级
    GM_WINGS_UPGRADE_RETURN,
    GM_WINGS_VISIBLE_REQUEST,               // 翅膀显示状态
    GM_WINGS_VISIBLE_RETURN,

    GM_WINGS_FASHION_REQUEST,               //请求翅膀幻化界面信息
    GM_WING_FASHION_RETURN,
    GM_WINGS_CHANGE_REQUEST,                //请求翅膀幻化
    GM_WINGS_FASHION_CHANGE_RETURN,
    GM_WINGS_FASHION_UNCHANGE_REQUEST,
    GM_WINGS_FASHION_UNCHANGE_RETURN,
    GM_WINGS_FASHION_OVER_NOTIFY,

    GM_WINGS_WING_NOTIFY = 10580,               // 翅膀信息同步


    /*********************************wings END***************************************/

    /*********************************flyup evange***************************************/
    SM_FLYUP_PRACT_REQUEST = 10600,         // DB flyup
    SM_FLYUP_PRACT_RETURN,                  // DB // DB flyup
    SM_FLYUP_PRACTGAS_REQUEST,              // DB flyup
    SM_FLYUP_PRACTGAS_RETURN,               // DB // DB flyup

    GM_FLYUP_UI_REQUEST = 10620,                // 飞升界面
    GM_FLYUP_UI_RETURN,
    GM_FLYUP_UPGRADE_REQUEST,               // 提升境界
    GM_FLYUP_UPGRADE_RETURN,
    GM_FLYUP_BEAKUP_REQUEST,                // 突破境界
    GM_FLYUP_BEAKUP_RETURN,
    GM_FLYUP_XIUXING_UI_REQUEST,            // 修为界面
    GM_FLYUP_XIUXING_UI_RETURN,
    GM_FLYUP_PRACTICEGLOD_REQUEST,          // 高人运功
    GM_FLYUP_PRACTICEGLOD_RETURN,
    GM_FLYUP_PRACTICEDIAM_REQUEST,          // 仙人运功
    GM_FLYUP_PRACTICEDIAM_RETURN,
    GM_FLYUP_OVER_REQUEST,                  // 收功
    GM_FLYUP_OVER_RETURN,
    GM_FLYUP_EXCHANGE_REQUEST,              // 仙气兑换
    GM_FLYUP_EXCHANGE_RETURN,
    GM_FLYUP_GAOREN_REQUEST,                // 高人指点
    GM_FLYUP_GAOREN_RETURN,
    GM_FLYUP_XIANREN_REQUEST,               // 仙人指点
    GM_FLYUP_XIANRENREN_RETURN,

    GM_FLYUP_VALUE_NOTIFY = 10680,          // 仙气灵气通知


    /*********************************flyup END***************************************/

    /*********************************fashion evange***************************************/
    SM_FASHION_FASHION_REQUEST = 10700,     // DB fashion
    SM_FASHION_FASHION_RETURN,              // DB
    SM_FASHION_SHOW_REQUEST,                // DB fashion show
    SM_FASHION_SHOW_RETURN,                 // DB
    SM_FASHION_TITLE_REQUEST,               // DB title
    SM_FASHION_TITLE_RETURN,                // DB

    GM_FASHION_UI_REQUEST = 10720,          // 界面信息
    GM_FASHION_UI_RETURN,
    GM_FASHION_EQUIP_REQUEST,               // 选择装备的物品
    GM_FASHION_EQUIP_RETURN,
    GM_FASHION_UPGRADE_REQUEST,             // 临时升级永久的
    GM_FASHION_UPGRADE_RETURN,
    GM_FASHION_EXCHANGE_REQUEST,            // 购买永久时装
    GM_FASHION_EXCHANGE_RETURN,

    GM_FASHION_LEVEL_NOTIFY = 10780,        // 等级经验改变提示
    GM_FASHION_CHANGE_NOTIFY,               // 外形改变改变提示
    GM_FASHION_TIMEROVER_NOTIFY,            // 时装时间到了通知
    GM_FASHION_TITLE_NOTIFY,                // 称号获取通知
    GM_FASHION_NEW_NOTIFY,                  // 获得新时装通知

    /*********************************fashion END***************************************/

    /*********************************clear evange***************************************/
    SM_CLEAR_CLEAR_REQUEST = 10800,         // DB clear
    SM_CLEAR_CLEAR_RETURN,                  // DB
    SM_CLEAR_PROPERTY_REQUEST,              // DB clear property
    SM_CLEAR_PROPERTY_RETURN,               // DB
    SM_CLEAR_PROPTMP_REQUEST,               // DB clear property tmp
    SM_CLEAR_PROPTMP_RETURN,                // DB

    GM_CLEAR_UI_REQUEST = 10820,            // 界面信息
    GM_CLEAR_UI_RETURN,
    GM_CLEAR_OPERATE_REQUEST,               // 洗练操作
    GM_CLEAR_OPERATE_RETURN,
    GM_CLEAR_QUICKUI_REQUEST,               // 批量洗练界面
    GM_CLEAR_QUICKUI_RETURN,
    GM_CLEAR_QUICKOP_REQUEST,               // 批量洗练操作
    GM_CLEAR_QUICKOP_RETURN,
    GM_CLEAR_SWAP_REQUEST,                  // 替换
    GM_CLEAR_SWAP_RETURN,

    GM_CLEAR_PROPERTY_NOTIFY = 10880,       // 通知洗练属性

    /*********************************clear END***************************************/


    /*********************************diamond evange***************************************/
    SM_DIAMOND_REQUEST = 10900,         // DB diamond
    SM_DIAMOND_RETURN,                  // DB

    GM_DIAMOND_UI_REQUEST = 10920,      // 界面信息
    GM_DIAMOND_UI_RETURN,
    GM_DIAMOND_MOUNT_REQUEST,           // 镶嵌宝石
    GM_DIAMOND_MOUNT_RETURN,
    GM_DIAMOND_UNMOUNT_REQUEST,         // 卸下宝石
    GM_DIAMOND_UNMOUNT_RETURN,
    GM_DIAMOND_UPGRADE_REQUEST,         // 升级宝石
    GM_DIAMOND_UPGRADE_RETURN,


    GM_DIAMOND_NOTIFY = 10980,          // 

    /*********************************diamond evange***************************************/

    /*********************************equip evange***************************************/
    SM_EQUIP_REQUEST = 11000,               // DB equip
    SM_EQUIP_RETURN,                        // DB

    GM_EQUIP_ALL_RETURN = 11020,            //  所有装备信息返回
    GM_EQUIP_INFO_REQUEST,                  //  装备信息返回
    GM_EQUIP_INFO_RETURN,
    GM_EQUIP_INHERIT_REQUEST,               //  装备继承
    GM_EQUIP_INHERIT_RETURN,

    GM_EQUIP_FIGHT_NOTIFY = 11050,          //  装备战斗力变化
    GM_EQUIP_INFO_NOTIFY,                   //  装备信息改变
    GM_EQUIP_DESTORY_NOTIFY,                //	装备销毁通知
    GM_EQUIP_LUCKY_NOTIFY,                  //	装备幸运值改变
    GM_EQUIP_SUIT_NOTIFY,                   //	套装信息通知

    /*********************************equip evange***************************************/

    /*********************************pet evange***************************************/
    SM_PET_REQUEST = 11100,             // DB pet
    SM_PET_RETURN,                      // DB
    SM_PET_SKILL_REQUEST,               // DB pet skill
    SM_PET_SKILL_RETURN,                // DB
    SM_PET_SKILL_GET_REQUEST,           // DB pet skill get
    SM_PET_SKILL_GET_RETURN,            // DB
    SM_PET_SKILL_LUCKY_REQUEST,         // DB pet skill lucky
    SM_PET_SKILL_LUCKY_RETURN,          // DB
    SM_PET_HISTORY_REQUEST,
    SM_PET_HISTORY_RETURN,

    GM_PET_UI_REQUEST = 11130,          // 宠物界面  （左边的信息）
    GM_PET_UI_RETURN,
    GM_PET_INFO_UI_REQUEST,             // 宠物信息界面
    GM_PET_INFO_UI_RETURN,
    GM_PET_CHANGE_NAME_REQUEST,         // 宠物改名
    GM_PET_CHANGE_NAME_RETURN,
    GM_PET_DELETE_REQUEST,              // 宠物放生
    GM_PET_DELETE_RETURN,
    GM_PET_ON_REQUEST,                  // 宠物出站
    GM_PET_ON_RETURN,
    GM_PET_OFF_REQUEST,                 // 宠物休息
    GM_PET_OFF_RETURN,
    GM_PET_GROWTH_UI_REQUEST,           // 宠物成长界面
    GM_PET_GROWTH_UI_RETURN,
    GM_PET_GROWTH_UPGRADE_REQUEST,      // 宠物成长升级界面
    GM_PET_GROWTH_UPGRADE_RETURN,
    GM_PET_PRACTICE_UI_REQUEST,         // 宠物灵修界面
    GM_PET_PRACTICE_UI_RETURN,
    GM_PET_PRACTICE_UPGRADE_REQUEST,    // 宠物灵修升级界面
    GM_PET_PRACTICE_UPGRADE_RETURN,
    GM_PET_MIX_UI_REQUEST,              // 宠物融合信息
    GM_PET_MIX_UI_RETURN,
    GM_PET_MIX_UPGRADE_DAN_REQUEST,     // 宠物资质升级 资质丹
    GM_PET_MIX_UPGRADE_DAN_RETURN,
    GM_PET_MIX_UPGRADE_EGG_REQUEST,     // 宠物资质升级 宠物蛋
    GM_PET_MIX_UPGRADE_EGG_RETURN,
    GM_PET_MIX_COMPOSE_REQUEST,         // 宠物融合
    GM_PET_MIX_COMPOSE_RETURN,
    GM_PET_GUARD_UI_REQUEST,            // 宠物守护信息
    GM_PET_GUARD_UI_RETURN,
    GM_PET_GUARD_ON_REQUEST,            // 宠物守护操作信息
    GM_PET_GUARD_ON_RETURN,
    GM_PET_GUARD_OFF_REQUEST,           // 宠物取消守护操作信息
    GM_PET_GUARD_OFF_RETURN,
    GM_PET_SKILL_UI_REQUEST,            // 宠物技能信息
    GM_PET_SKILL_UI_RETURN,
    GM_PET_SKILL_DELETE_REQUEST,        // 宠物技能遗忘
    GM_PET_SKILL_DELETE_RETURN,
    GM_PET_SKILL_SAVE_REQUEST,          // 宠物技能封印
    GM_PET_SKILL_SAVE_RETURN,
    GM_PET_SKILL_LEARN_REQUEST,         // 宠物技能学习
    GM_PET_SKILL_LEARN_RETURN,
    // 获取技能输的消息 与宠物无关
    GM_PET_SKILL_EXCHG_UI_REQUEST,      // 宠物技能抄写
    GM_PET_SKILL_EXCHG_UI_RETURN,
    GM_PET_SKILL_EXCHG_REQUEST,         // 宠物技能抄写
    GM_PET_SKILL_EXCHG_RETURN,
    GM_PET_SKILL_SELECT_REQUEST,        // 宠物技能抄写选择
    GM_PET_SKILL_SELECT_RETURN,
    GM_PET_SKILL_COMPOSE_REQUEST,       // 宠物技能合成
    GM_PET_SKILL_COMPOSE_RETURN,

    GM_PET_ADD_NOTIFY = 11190,          // 宠物获取通知
    GM_PET_REMOVE_NOTIFY,               // 宠物删除通知
    GM_PET_FIGHTDATA_NOTIFY,            // 战斗力改变

    /*********************************equip evange***************************************/

    /***************任务模块*************************************************************************/
    GM_REQUEST_PLAYERTASK = 11200,      //请求角色任务列表
    GM_REQUEST_PLAYERTASK_RETURN,

    GM_ROLE_ALLOC_TASK_RETURN,           ///分配一个任务给客户端
	GM_ROLE_FINSH_TASK_NOTIFY,           ///服务器通知玩家完成一个任务

    GM_ROLE_COMMIT_TASK_REQUEST,         ///客户端提交一个任务
	GM_ROLE_COMMIT_TASK_RETURN,          ///返回提交任务是否成功，如果成功获取奖励  

    GM_TASK_PROGRESS_CHANGE,             ///通知客户端收集/打怪任务进度改变

    GM_ROLE_ACCEPT_TASK_REQUEST,         ///接受任务请求
	GM_ROLE_ACCEPT_TASK_RETURN,          ///接受任务返回
	GM_TALK_EVENT,						 ///对话事件
	GM_ROLE_ACCEPT_TASK_NOTIFY,          ///服务器通知玩家接受了一个任务
	GM_ROLE_COMMIT_TASK_NOTIFY,          ///服务器通知提交了一个任务（删除任务）

    GM_TASK_COPY_REQUEST,               // 副本任务进副本
    GM_TASK_COPY_RETURN,

    GM_TASK_QUZZLE_OVER,              // 玩家完成擦灰、拼图任务

    SM_TASK_TRAIL_REQUEST = 11230,      // 试炼任务
    SM_TASK_TRAIL_RETURN,
    SM_TASK_CIRCLE_REQUEST,             // 环式任务
    SM_TASK_CIRCLE_RETURN,
    SM_TASK_CIRCLE_WHEEL_REQUEST,       // 环式转盘
    SM_TASK_CIRCLE_WHEEL_RETURN,


    // 试炼
    GM_TASK_TRIAL_REQUEST = 11240,      // 试炼界面
    GM_TASK_TRIAL_RETURN,
    GM_TASK_TRIAL_ACCEPT_REQUEST,       // 接受某个试炼
    GM_TASK_TRIAL_ACCEPT_RETURN,
    GM_TASK_TRIAL_QUICK_REQUEST,        // 快速完成某个试炼
    GM_TASK_TRIAL_QUICK_RETURN,
    GM_TASK_TRIAL_DROP_REQUEST,         // 放弃某个试炼
    GM_TASK_TRIAL_DROP_RETURN,
    GM_TASK_TRIAL_REWARD_REQUEST,       // 领取某个试炼
    GM_TASK_TRIAL_REWARD_RETURN,
    GM_TASK_TRIAL_ONEKEY_REQUEST,       // 一键领取
    GM_TASK_TRIAL_ONEKEY_RETURN,

    // 环式
    GM_TASK_CIRCLE_START_REQUEST,       // 开始环式任务
    GM_TASK_CIRCLE_START_RETURN,
    GM_TASK_CIRCLE_UI_REQUEST,          // 环式任务界面
    GM_TASK_CIRCLE_UI_RETURN,
    GM_TASK_CIRCLE_ONEKEY_REQUEST,      // 环式一键完成
    GM_TASK_CIRCLE_ONEKEY_RETURN,
    GM_TASK_CIRCLE_REFRESH_REQUEST,     // 环式刷星级
    GM_TASK_CIRCLE_REFRESH_RETURN,
    GM_TASK_CIRCLE_ACCEPT_REQUEST,      // 接受环式任务
    GM_TASK_CIRCLE_ACCEPT_RETURN,
    GM_TASK_CIRCLE_NORMAL_REQUEST,      // 环式普通领取
    GM_TASK_CIRCLE_NORMAL_RETURN,
    GM_TASK_CIRCLE_DOUBLE_REQUEST,      // 环式双倍领取
    GM_TASK_CIRCLE_DOUBLE_RETURN,
    GM_NEWCOPYINTO_REQUEST,              ///客户端请求进人新手本
	GM_TASK_CIRCLE_WHEEL_DRAW_REQUEST,      // 环式转盘抽奖
    GM_TASK_CIRCLE_WHEEL_DRAW_RETURN,
    GM_TASK_CIRCLE_WHEEL_REWARD_REQUEST,    // 环式转盘领奖
    GM_TASK_CIRCLE_WHEEL_REWARD_RETURN,
    GM_TASK_CIRCLE_WHEEL_UI_REQUEST,    // 环式转盘UI
    GM_TASK_CIRCLE_WHEEL_UI_RETURN,
    GM_TASK_CIRCLE_WHEEL_CLOSE_REQUEST, // 环式转盘关界面
    GM_TASK_CIRCLE_WHEEL_CLOSE_RETURN,
    GM_TASK_CIRCLE_STORE_EXP_REQUEST,   // 环式额外经验领取
    GM_TASK_CIRCLE_STORE_EXP_RETURN,


    GM_TASK_NOTIFY = 11290,             // 通知


    /***************任务模块结束***********************************************************************/

    /*******************玩家历史操作数据模块,********************/
    SM_OPERATE_DATA_REQUEST = 11300,	///请求玩家操作数据,
	SM_OPERATE_DATA_RETURN,             ///玩家操作数据回调,
    /*******************玩家历史操作数据模块结束,********************/

    /***************buff模块*****************************/
    SM_BUFF_REQUEST = 11400,
    SM_BUFF_RETURN,

    GM_BUFF_REQUEST = 11420,
    GM_BUFF_RETURN,
    GM_FREEWING_REQUEST,    // 免费翅膀体验
    GM_FREEWING_RETURN,
    GM_VIP_TRIAL_REQUEST,   // vip体验
    GM_VIP_TRIAL_RETURN,

    GM_BUFF_NOTIFY = 11480,     // 通知
    GM_FREEWING_NOTIFY,         // 免费到期通知
    GM_VIP_TRIAL_GET_NOTIFY,    // 通知vip获取
    GM_VIP_TRIAL_OVER_NOTIFY,   // 通知vip测试到期

    /*******************buff模块结束,********************/

    /*************** 组队模块 *****************************/
    SM_TEAM_REQUEST = 11500,
    SM_TEAM_RETURN,
    SM_TEAM_STAR_REQUEST,
    SM_TEAM_STAR_RETURN,
    SM_TEAM_ZMT_REQUEST,
    SM_TEAM_ZMT_RETURN,

    GM_TEAM_TEAMFB_REQUEST = 11510,             // 多人本界面
    GM_TEAM_TEAMFB_RETURN,
    GM_TEAM_ZLKFB_REQUEST,                      // 坠龙窟界面
    GM_TEAM_ZLKFB_RETURN,
    GM_TEAM_ZLKSWEEP_REQUEST,                   // 坠龙窟扫荡
    GM_TEAM_ZLKSWEEP_RETURN,
    GM_TEAM_ZLKBUY_REQUEST,                     // 坠龙窟购买体力
    GM_TEAM_ZLKBUY_RETURN,
    GM_TEAM_MZCXFB_REQUEST,                     // 魔族巢穴界面
    GM_TEAM_MZCXFB_RETURN,
    GM_TEAM_XIANQI_REQUEST,                     // 仙器副本界面
    GM_TEAM_XIANQI_RETURN,
    GM_TEAM_XIANQI_SWEEP_REQUEST,               // 仙器副本扫荡
    GM_TEAM_XIANQI_SWEEP_RETURN,
    GM_TEAM_XIANQI_BUY_REQUEST,                 // 仙器副本购买次数
    GM_TEAM_XIANQI_BUY_RETURN,
    GM_TEAM_SHENBING_REQUEST,                   // 神兵副本界面
    GM_TEAM_SHENBING_RETURN,
    GM_TEAM_SHENBING_SWEEP_REQUEST,             // 神兵副本扫荡
    GM_TEAM_SHENBING_SWEEP_RETURN,
    GM_TEAM_SHENBING_BUY_REQUEST,               // 神兵副本购买次数
    GM_TEAM_SHENBING_BUY_RETURN,

    GM_TEAMFBDOUBLESWEEP_REQUEST,               // 请求双倍领取多人本扫荡奖励
    GM_TEAMFBDOUBLESWEEP_RETURN,

    GM_TEAM_CREATE_REQUEST = 11540,             // 创建队伍
    GM_TEAM_CREATE_RETURN,
    GM_TEAM_COMBINE_REQUEST,                    // 请求组队(和别人组队)
    GM_TEAM_COMBINE_RETURN,
    GM_TEAM_LEAVE_REQUEST,                      // 离开队伍
    GM_TEAM_LEAVE_RETURN,
    GM_TEAM_KICKOUT_REQUEST,                    // 踢人
    GM_TEAM_KICKOUT_RETURN,
    GM_TEAM_INVITE_REQUEST,                     // 邀请入队
    GM_TEAM_INVITE_RETURN,
    GM_TEAM_ANSWER_INVITE_REQUEST,              // 回答邀请
    GM_TEAM_ANSWER_INVITE_RETURN,
    GM_TEAM_APPLY_REQUEST,                      // 申请入队
    GM_TEAM_APPLY_RETURN,
    GM_TEAM_ANSWER_APPLY_REQUEST,               // 回答申请
    GM_TEAM_ANSWER_APPLY_RETURN,
    GM_TEAM_LEADER_REQUEST,                     // 提升队长
    GM_TEAM_LEADER_RETURN,
    GM_TEAM_TEAMINFO_REQUEST,                   // 组队信息请求
    GM_TEAM_TEAMINFO_RETURN,

    //副本
    GM_TEAM_JOINFB_REQUEST = 11600,             // 进入某个副本组队
    GM_TEAM_JOINFB_RETURN,
    GM_TEAM_QUITFB_REQUEST,                     // 退出某个副本组队
    GM_TEAM_QUITFB_RETURN,
    GM_TEAM_BROASTCAST_REQUEST,                 // 广播组队信息
    GM_TEAM_BROASTCAST_RETURN,
    GM_TEAM_TALKIN_REQUEST,                     // 从广播中进组队
    GM_TEAM_TALKIN_RETURN,
    GM_TEAM_FAKELIST_REQUEST,                   // 化身列表
    GM_TEAM_FAKELIST_RETURN,
    GM_TEAM_FRIEND_REQUEST,                     // 好友列表
    GM_TEAM_FRIEND_RETURN,
    GM_TEAM_ADDFAKE_REQUEST,                    // 添加化身
    GM_TEAM_ADDFAKE_RETURN,
    GM_TEAM_RELEASE_REQUEST,                    // 解散队伍
    GM_TEAM_RELEASE_RETURN,
    GM_TEAM_READY_REQUEST,                      // 准备挑战
    GM_TEAM_READY_RETURN,
    GM_TEAM_UNREADY_REQUEST,                    // 取消准备
    GM_TEAM_UNREADY_RETURN,
    GM_TEAM_START_REQUEST,                      // 开始挑战
    GM_TEAM_START_RETURN,
    GM_TEAM_TEAMUI_REQUEST,                     // 副本组队界面
    GM_TEAM_TEAMUI_RETURN,
    GM_TEAM_CREATE_COPY_REQUEST,                // 创建副本队伍
    GM_TEAM_CREATE_COPY_RETURN,
    GM_TEAM_GANGMEMBER_REQUEST,                 // 盟友列表
    GM_TEAM_GANGMEMBER_RETURN,
    GM_TEAM_ADDTEAM_REQUEST,                    // 加入副本
    GM_TEAM_ADDTEAM_RETURN,
    GM_TEAM_CHANGECOPY_REQUEST,                 // 切换副本
    GM_TEAM_CHANGECOPY_RETURN,
    GM_TEAM_START_FIGHT_REQUEST,                // 准备挑战的界面(如果都准备了开始副本,否则弹出准备界面)
    GM_TEAM_START_FIGHT_RETURN,
    GM_TEAM_CONFIRM_READY_REQUEST,              // 准备
    GM_TEAM_CONFIRM_READY_RETURN,
    GM_TEAM_CONFIRM_GIVEUP_REQUEST,             // 放弃
    GM_TEAM_CONFIRM_GIVEUP_RETURN,


    GM_TEAM_INFO_NOTIFY = 11660,                // 通知队伍信息
    GM_TEAM_LEAVE_NOTIFY,                       // 通知某玩家离开队伍
    GM_TEAM_LEAVEOK_NOTIFY,                     // 通知玩家离开队伍成功
    GM_TEAM_ADD_NOTIFY,                         // 通知加入
    GM_TEAM_KICKOUT_NOTIFY,                     // 通知踢人
    GM_TEAM_BEKICKOUT_NOTIFY,                   // 通知被踢
    GM_TEAM_STATUS_NOTIFY,                      // 通知状态
    GM_TEAM_READY_NOTIFY,                       // 通知准备
    GM_TEAM_UNREADY_NOTIFY,                     // 通知未准备
    GM_TEAM_DISMISS_NOTIFY,                     // 通知解散
    GM_TEAM_ASKJOIN_NOTIFY,                     // 通知请求加入
    GM_TEAM_ASKINVITE_NOTIFY,                   // 通知邀请某人
    GM_TEAM_LEADER_NOTIFY,                      // 通知队长改变
    GM_TEAM_FBTYPE_NOTIFY,                      // 通知副本改变
    GM_TEAM_FBFIGHT_NOTIFY,                     // 通知副本次数
    GM_TEAM_REFUSEINVITE_NOTIFY,                // 通知拒绝邀请
    GM_TEAM_REFUSEAPPLY_NOTIFY,                 // 通知拒绝申请
    GM_TEAM_NAME_CHANGE_NOTIFY,                 // 通知队员改名
    GM_TEAM_CLEAR_NOTIFY,                       // 通知清空队伍
    GM_TEAM_CLEARREADY_NOTIFY,                  // 广播准备状态移除
    GM_TEAM_ONLINESTATE_NOTIFY,                 // 广播队友状态
    GM_TEAM_GIVEUP_NOTIFY,                      // 通知放弃准备
    GM_TEAM_PLAYER_FBFIGHT_NOTIFY,              // 通知玩家副本次数变化
    GM_TEAM_BROADCASTTIME_NOTIFY,               // 通知招募时间
    GM_TEAM_TEAMMEM_NOTIFY,                     // 队员信息通知
    GM_TEAM_LEVEL_NOTIFY,                       // 队员等级通知

    GM_TEAM_ZYT_START_NOTIFY = 11690,           // 通知镇妖塔开始
    GM_TEAM_ZYT_OVER_NOTIFY,                    // 通知镇妖塔结束
    GM_TEAM_TEAM_TIMES_NOTIFY,                  // 通知多人本次数
    GM_TEAM_ZYT_UI_REQUEST,                     // 镇妖塔界面
    GM_TEAM_ZYT_UI_RETURN,
    GM_TEAM_XIANQI_TIMES_NOTIFY,                // 通知仙器本次数
    GM_TEAM_SHENBING_TIMES_NOTIFY,              // 通知神兵本次数
	GM_TEAM_OTHERJOIN_NOTIFY,                   // 通知其他人去和队长集合


    /*************** 组队模块结束 *************************/

    /*************** 仙盟开始 *************************/
    SM_GANG_REQUEST = 11700,
    SM_GANG_RETURN,
    SM_GANG_SKILL_REQUEST,
    SM_GANG_SKILL_RETURN,
    SM_GANG_SHOP_REQUEST,
    SM_GANG_SHOP_RETURN,

    GM_GANG_LIST_REQUEST = 11710,           // 仙盟列表
    GM_GANG_LIST_RETURN,
    GM_GANG_APPLY_REQUEST,                  // 仙盟申请
    GM_GANG_APPLY_RETURN,
    GM_GANG_NOAPPLY_REQUEST,                // 取消申请
    GM_GANG_NOAPPLY_RETURN,
    GM_GANG_ONEKEY_APPLY_REQUEST,           // 一键申请
    GM_GANG_ONEKEY_APPLY_RETURN,
    GM_GANG_LEAVE_REQUEST,                  // 离开仙盟
    GM_GANG_LEAVE_RETURN,
    GM_GANG_DISMISS_REQUEST,                // 解散仙盟
    GM_GANG_DISMISS_RETURN,
    GM_GANG_CREATE_DIAMOND_REQUEST,         // 元宝创建仙盟
    GM_GANG_CREATE_DIAMOND_RETURN,
    GM_GANG_CREATE_TOKEN_REQUEST,           // 令牌创建仙盟
    GM_GANG_CREATE_TOKEN_RETURN,
    GM_GANG_UI_REQUEST,                     // 仙盟信息
    GM_GANG_UI_RETURN,
    GM_GANG_BROADCAST_REQUEST,              // 招募信息
    GM_GANG_BROADCAST_RETURN,
    GM_GANG_MODIY_REQUEST,                  // 修改宗旨
    GM_GANG_MODIY_RETURN,
    GM_GANG_GETSALARY_REQUEST,              // 获取薪水
    GM_GANG_GETSALARY_RETURN,
    GM_GANG_STORE_UI_REQUEST,               // 仙盟商店
    GM_GANG_STORE_UI_RETURN,
    GM_GANG_STORE_BUY_REQUEST,              // 仙盟商店购买
    GM_GANG_STORE_BUY_RETURN,
    GM_GANG_CONTRIBUTE_UI_REQUEST,          // 仙盟捐献
    GM_GANG_CONTRIBUTE_UI_RETURN,
    GM_GANG_CONTRIBUTE_GOLD_REQUEST,        // 仙盟捐献铜币
    GM_GANG_CONTRIBUTE_GOLD_RETURN,
    GM_GANG_CONTRIBUTE_DIAMOND_REQUEST,     // 仙盟捐献元宝
    GM_GANG_CONTRIBUTE_DIAMOND_RETURN,
    GM_GANG_SKILL_UI_REQUEST,               // 仙盟技能
    GM_GANG_SKILL_UI_RETURN,
    GM_GANG_SKILL_LEARN_REQUEST,            // 仙盟技能学习
    GM_GANG_SKILL_LEARN_RETURN,
    GM_GANG_CHANGE_NAME_REQUEST,            // 修改仙盟名字
    GM_GANG_CHANGE_NAME_RETURN,
    GM_GANG_CHANGE_BORADCAST,               // 仙盟改名广播

    SM_GANG_SEALBOSSROLE_REQUEST,           //请求封印大妖个人数据
    SM_GANG_SEALBOSSROLE_RETURN,

    GM_GANG_SEALBOSS_REQUEST,               //请求打开仙盟大妖界面
    GM_GANG_SEALBOSS_RETURN,
    GM_GANG_SEALBOSS_JOIN_REQUEST,          //请求加入仙盟大妖
    GM_GANGSEALBOSS_JOIN_RETURN,
    GM_GANG_SEALBOSS_ASK_REQUEST,           //请求协助
    GM_GANGSEALBOSS_ASK_RETURN,
    GM_GANGSEALBOSS_Notify,
    GM_GANG_SEALBOSS_LEAVE_REQUEST,         //请求离开仙盟大妖界面


    GM_GANG_MEMBER_UI_REQUEST = 11800,      // 仙盟成员
    GM_GANG_MEMBER_UI_RETURN,
    GM_GANG_MEMBER_LOW_REQUEST,             // 降职
    GM_GANG_MEMBER_LOW_RETURN,
    GM_GANG_MEMBER_HIGH_REQUEST,            // 升职
    GM_GANG_MEMBER_HIGH_RETURN,
    GM_GANG_MEMBER_LEADER_REQUEST,          // 转让盟主
    GM_GANG_MEMBER_LEADER_RETURN,
    GM_GANG_MEMBER_KICKOUT_REQUEST,         // 请离仙盟
    GM_GANG_MEMBER_KICKOUT_RETURN,
    GM_GANG_LOG_REQUEST,                    // 仙盟日志
    GM_GANG_LOG_RETURN,
    GM_GANG_APPLY_UI_REQUEST,               // 仙盟日志
    GM_GANG_APPLY_UI_RETURN,
    GM_GANG_APPLY_ACCEPT_REQUEST,           // 仙盟接受
    GM_GANG_APPLY_ACCEPT_RETURN,
    GM_GANG_APPLY_ONEKEY_REQUEST,           // 仙盟一键接受
    GM_GANG_APPLY_ONEKEY_RETURN,
    GM_GANG_APPLY_IGNORE_REQUEST,           // 仙盟忽略
    GM_GANG_APPLY_IGNORE_RETURN,
    GM_GANG_APPLY_AUTO_CLOSE_REQUEST,       // 仙盟关闭自动接收
    GM_GANG_APPLY_AUTO_CLOSE_RETURN,
    GM_GANG_APPLY_AUTO_OPEN_REQUEST,        // 仙盟启动自动接收
    GM_GANG_APPLY_AUTO_OPEN_RETURN,


    GM_GANG_POSITION_NOTIFY = 11850,        // 通知仙盟职位变化变化
    GM_GANG_TENET_NOTIFY,                   // 通知仙盟宗旨变化
    GM_GANG_ADDLOG_NOTIFY,                  // 新日志通知
    GM_GANG_ADDMEMBER_NOTIFY,               // 新盟友通知
    GM_GANG_LEAVE_MEMBER_NOTIFY,            // 通知成员离开
    GM_GANG_DISMISS_NOTIFY,                 // 通知解散
    GM_GANG_BEADDED_NOTIFY,                 // 已经加入公会通知
    GM_GANG_LEVEL_NOTIFY,                   // 通知仙盟等级变化
    GM_GANG_SALARY_NOTIFY,                  // 通知有新的俸禄可以领取

    /*************** 仙盟结束 *************************/

    /*************** 排行榜开始 *************************/
    SM_RANKLIST_REQUEST = 11900,
    SM_RANKLIST_RETURN,

    GM_RANKLIST_LIST_REQUEST = 11920,           // 仙盟列表
    GM_RANKLIST_LIST_RETURN,
    GM_PLAYER_BASE_INFO_REQUEST,                // 玩家基本信息（显示信息）
    GM_PLAYER_BASE_INFO_RETURN,
    GM_PLAYER_DETAIL_REQUEST,                   // 玩家详细信息
    GM_PLAYER_DETAIL_RETURN,
    GM_PLAYER_DETAIL_EQUIP_REQUEST,             // 玩家装备信息
    GM_PLAYER_PETRIDE_REQUEST,                  // 玩家灵兽信息
    GM_PLAYER_PETRIDE_RETURN,
    GM_PLAYER_EQUIP_REQUEST,                    // 玩家某件装备信息
    GM_PLAYER_EQUIP_RETURN,
    GM_PLAYER_SIMPLE_INFO_REQUEST,              // 玩家基本信息（无显示信息）
    GM_PLAYER_SIMPLE_INFO_RETURN,



    GM_RANKLIST_NOTIFY = 11950,

    /*************** 排行榜结束 *************************/

    /*************** 仙域争霸开始 *************************/
    GM_GANG_GANGWAR_UI_REQUEST = 12000, // 仙域争霸界面 (只能请求最近10场的排名)
    GM_GANG_GANGWAR_UI_RETURN,
    GM_GANG_GANGWAR_START_REQUEST,      // 仙域争霸进入
    GM_GANG_GANGWAR_START_RETURN,


    GM_GANG_GANGWAR_NOTIFY = 12050,

    /*************** 仙域争霸结束 *************************/

    /*************** 仙盟仓库开始 *************************/
    GM_GANG_PACKAGE_UI_REQUEST = 12100,         // 仙盟仓库
    GM_GANG_PACKAGE_UI_RETURN,
    GM_GANG_PACKAGE_TIDY_REQUEST,               // 仙盟仓库整理
    GM_GANG_PACKAGE_TIDY_RETURN,
    GM_GANG_PACKAGE_EQUIP_REQUEST,              // 仙盟仓库装备信息
    GM_GANG_PACKAGE_EQUIP_RETURN,
    GM_GANG_PACKAGE_STORE_REQUEST,              // 仙盟仓库放入装备
    GM_GANG_PACKAGE_STORE_RETURN,
    GM_GANG_PACKAGE_OBTAIN_REQUEST,             // 仙盟取出信息
    GM_GANG_PACKAGE_OBTAIN_RETURN,
    GM_GANG_PACKAGE_APPLY_REQUEST,              // 仙盟仓库申请物品
    GM_GANG_PACKAGE_APPLY_RETURN,
    GM_GANG_PACKAGE_APPLYLIST_REQUEST,          // 仙盟仓库申请日志
    GM_GANG_PACKAGE_APPLYLIST_RETURN,
    GM_GANG_PACKAGE_AGREE_REQUEST,              // 仙盟仓库同意申请
    GM_GANG_PACKAGE_AGREE_RETURN,
    GM_GANG_PACKAGE_LOG_REQUEST,                // 仙盟仓库日志
    GM_GANG_PACKAGE_LOG_RETURN,

    GM_GANG_PACKAGE_ITEM_NOTIFY = 12150,
    GM_GANG_PACKAGE_CHANGE_NOTIFY,              // 仙盟仓库刷新

    /*************** 仙盟仓库结束 *************************/

    /*************** 仙域守护开始 *************************/
    GM_GANGDEFEND_UI_REQUEST = 12200,   // 仙域守护界面 (只能请求最近10场的排名)
    GM_GANGDEFEND_UI_RETURN,
    GM_GANGDEFEND_LIST_REQUEST,         // 仙域守护排名
    GM_GANGDEFEND_LIST_RETURN,
    GM_GANGDEFEND_OPEN_REQUEST,         // 仙域守护开启
    GM_GANGDEFEND_OPEN_RETURN,
    GM_GANGDEFEND_START_REQUEST,        // 仙域守护界进入
    GM_GANGDEFEND_START_RETURN,

    GM_GANGDEFEND_NOTIFY = 12250,

    /*************** 仙域守护结束 *************************/

    /*************** 仙域运镖开始 *************************/
    GM_GANGDART_UI_REQUEST = 12300,     // 运镖界面
    GM_GANGDART_UI_RETURN,
    GM_GANGDART_SELECT_UI_REQUEST,      // 运镖选择界面
    GM_GANGDART_SELECT_UI_RETURN,
    GM_GANGDART_SELECT_REQUEST,         // 运镖选择界面
    GM_GANGDART_SELECT_RETURN,
    GM_GANGDART_OVER_RETURN,            // 运镖完成返回结果

    GM_GANGDART_NOTIFY = 12350,

    GM_GANGDART_DART_OVER_NOTIFY,

    /*************** 仙域运镖结束 *************************/

    /*************** 仙域攻城战 开始 *************************/
    GM_GANGCITY_UI_REQUEST = 12400,         // 仙域城战界面
    GM_GANGCITY_UI_RETURN,
    GM_GANGCITY_WORSHIP_REQUEST,            // 仙域膜拜
    GM_GANGCITY_WORSHIP_RETURN,
    GM_GANGCITY_JOINLIST_REQUEST,           // 仙盟攻城列表
    GM_GANGCITY_JOINLIST_RETURN,
    GM_GANGCITY_STORE_UI_REQUEST,           // 攻城商店信息
    GM_GANGCITY_STORE_UI_RETURN,
    GM_GANGCITY_STORE_BUY_REQUEST,          // 攻城商店购买
    GM_GANGCITY_STORE_BUY_RETURN,
    GM_GANGCITY_APPLYATTACK_REQUEST,        // 攻城申请
    GM_GANGCITY_APPLYATTACK_RETURN,
    GM_GANGCITY_ENTERCITY_REQUEST,          // 进入城内
    GM_GANGCITY_ENTERCITY_RETURN,
    GM_GANGCITY_ENTER_SECOND_REQUEST,       // 请求进入第二场
    GM_GANGCITY_ENTER_SECOND_RETURN,

    GM_GANGCITY_NOTIFY = 12480,             // 活动通知

    /*************** 仙域攻城战 结束 *************************/

    /*************** 自由物品 开始 *************************/
    GM_FREEITEM_MAIL_REQUEST = 12500,       // 自由物品 邮件物品请求
    GM_FREEITEM_MAIL_RETURN,
    GM_FREEITEM_MARKET_REQUEST,             // 自由物品 市场物品请求
    GM_FREEITEM_MARKET_RETURN,


    GM_FREEITEM_RETURN = 12580,

    /*************** 自由物品 结束 *************************/


    /*************** 活动 开始 *************************/
    GM_ACTIVITY_PANEL_REQUEST = 12600,      // 活动左边栏
    GM_ACTIVITY_PANEL_RETURN,
    GM_ACTIVITY_DETIAL_REQUEST,             // 活动详情
    GM_ACTIVITY_DETIAL_RETURN,
    GM_ACTIVITY_RECEIVE_REQUEST,            // 活动领取
    GM_ACTIVITY_RECEIVE_RETURN,
    GM_ACTIVITY_ICON_REQUEST,               // 活动icon
    GM_ACTIVITY_ICON_RETURN,

    GM_ACTIVITY_TESTCHARGE_REQUEST,         // 充值返利信息
    GM_ACTIVITY_TESTCHARGE_RETURN,
    GM_ACTIVITY_TESTREBATE_REQUEST,         // 充值返还信息
    GM_ACTIVITY_TESTREBATE_RETURN,
    SM_ACTIVITY_TESTREBATE_ACCOUNT,         // 账号服务器获取返还信息
    SM_ACTIVITY_TESTREBATE_ACCOUNT_RETURN,
    SM_ACTIVITY_TESTREBATE_CHARGE,          // 通知修改充值信息
    SM_ACTIVITY_TESTREBATE_GETREBATE,
    SM_ACTIVITY_TESTREBATE_GETREBATE_RETURN,
    GM_ACTIVITY_ENTRY_REQUEST,              // 请求某活动某个条目的信息
    GM_ACTIVITY_ENTRY_RETURN,

    GM_ACTIVITY_5STAR_UI_REQUEST,           // 5星好评界面
    GM_ACTIVITY_5STAR_UI_RETURN,
    GM_ACTIVITY_5STAR_GET_REQUEST,          // 5星好评领取
    GM_ACTIVITY_5STAR_GET_RETURN,

    SM_ACTIVITY_DAILYLOGIN_REQUEST = 12640, // 每日签到数据库请求
    SM_ACTIVITY_DAILYLOGIN_RETURN,
    GM_ACTIVITY_DAILYLOGIN_REQUEST,         // 每日签到
    GM_ACTIVITY_DAILYLOGIN_RETURN,
    GM_ACTIVITY_DAILYLOGIN_GET_REQUEST,     // 每日签到领取
    GM_ACTIVITY_DAILYLOGIN_GET_RETURN,
    GM_ACTIVITY_DOWNLOAD_FINISH,            // 客户端下载完成通知
    GM_ACTIVITY_DOWNLOADUI_REQUEST,         // 领取下载界面是否领取
    GM_ACTIVITY_DOWNLOADUI_RETURN,
    GM_ACTIVITY_RECV_REQUEST,               // 领取下载奖励
    GM_ACTIVITY_RECV_RETURN,

    SM_ACTIVITY_LIMITTIME_REQUEST,          // 限时活动信息数据库请求
    SM_ACTIVITY_LIMITTIME_RETURN,
    GM_ACTIVITY_LIMITTIME_REQUEST,          // 限时活动信息
    GM_ACTIVITY_LIMITTIME_RETURN,
    GM_ACTIVITY_LIMITTIME_RECV_REQUEST,     // 限时活动领取
    GM_ACTIVITY_LIMITTIME_RECV_RETURN,


    SM_ACTIVITY_CDKEY_UI_REQUEST = 12660,   // 服务器间请求兑换礼包
    SM_ACTIVITY_CDKEY_UI_RETURN,
    SM_ACTIVITY_CDKEY_REQUEST,              // 服务器间请求激活码
    SM_ACTIVITY_CDKEY_RETURN,
    GM_ACTIVITY_CDKEY_UI_REQUEST,           // 兑换礼包UI
    GM_ACTIVITY_CDKEY_UI_RETURN,
    GM_ACTIVITY_CDKEY_REQUEST,              // 激活码
    GM_ACTIVITY_CDKEY_RETURN,
    SM_ACTIVITY_KEYUSED_REQUEST,            // 激活码使用数据
    SM_ACTIVITY_KEYUSED_RETURN,
    SM_FRESH_CDKEY_GIFTOBJECT,              //刷新cdkey奖励表  
    SM_ACTIVITY_5STAR_REQUEST,              // 5星好评界面信息
    SM_ACTIVITY_5STAR_RETURN,

    GM_ACTIVITY_NOTIFY = 12680,             // 活动通知
    GM_ACTIVITY_NEW_RECEIVE_NOTIFY,         // 通知活动有新的可领取
    GM_ACTIVITY_LIMIT_NOTIFY,               // 通知限时活动改变
    GM_ACTIVITY_REBATE_NOTIFY,              // 通知返利活动改变
    GM_ACTIVITY_TESTREBATE_NOTIFY,          // 通知返还活动改变
    GM_ACTIVITY_LEVELGIFT_NOTIFY,           // 通知等级奖励

    GM_ACTIVITY_ADD_NOTIFY,                 // 通知新增活动
    GM_ACTIVITY_REMOVE_NOTIFY,              // 通知移除活动


    /*************** 活动 结束 *************************/

    /*************** 市场 开始 *************************/
    GM_MARKET_UI_REQUEST = 12700,           // 市场界面
    GM_MARKET_UI_RETURN,
    GM_MARKET_MY_UI_REQUEST,                // 我的拍卖
    GM_MARKET_MY_UI_RETURN,
    GM_MARKET_RENEWAL_REQUEST,              // 续期
    GM_MARKET_RENEWAL_RETURN,
    GM_MARKET_TAKEBACK_REQUEST,             // 取回
    GM_MARKET_TAKEBACK_RETURN,
    GM_MARKET_ONSELL_REQUEST,               // 上架
    GM_MARKET_ONSELL_RETURN,
    GM_MARKET_BUY_REQUEST,                  // 购买
    GM_MARKET_BUY_RETURN,

    GM_MARKET_NOTIFY = 12780,               // 活动通知


    /*************** 市场 结束 *************************/

    /*************** 玩法活动 开始 *************************/
    GM_ACTIVITY_PLAY_UI_REQUEST = 12800,            // 玩法活动界面左边
    GM_ACTIVITY_PLAY_UI_RETURN,
    GM_ACTIVITY_PLAY_DETAIL_REQUEST,                // 玩法详细信息
    GM_ACTIVITY_PLAY_DETAIL_RETURN,
    GM_ACTIVITY_NEWPLAY_UI_REQUEST,                 // 玩法活动界面左边
    GM_ACTIVITY_NEWPLAY_UI_RETURN,

    GM_ACTIVITY_PLAY_NOTIFY = 12880,                // 活动通知
    GM_ACTIVITY_SPECIALPLAY_NOTIFY,                 // 特殊活动通知

    /*************** 玩法活动 结束 *************************/

    /*************** 系统相关 开始 *************************/
    GM_SYSTEM_UNLOCK_REQUEST = 12900,       // 系统模块解锁
    GM_SYSTEM_UNLOCK_RETURN,
    GM_SYSTEM_TIPS_REQUEST,                 // 模块解锁提示
    GM_SYSTEM_TIPS_RETURN,
    GM_SYSTEM_TESTCOPY_REQUEST,             // 测试副本

    GM_SYSTEM_UNLOCK_NOTIFY = 12980,        // 通知模块解锁
    GM_SYSTEM_GUIDE_NOTIFY,                 // 通知指引解锁
    GM_SYSTEM_SPECIAL_MODULE_NOTIFY,        // 模块弹窗通知
                                            /*************** 系统相关 结束 *************************/

    /*************** 人物交易 开始 *************************/
    GM_P2P_TRADE_REQUEST = 13000,           // 请求交易
    GM_P2P_TRADE_RETURN,
    GM_P2P_TRADE_ALLOW_REQUEST,             // 同意交易
    GM_P2P_TRADE_ALLOW_RETURN,
    GM_P2P_TRADE_ADDITEM_REQUEST,           // 添加物品
    GM_P2P_TRADE_ADDITEM_RETURN,
    GM_P2P_TRADE_REMOVEITEM_REQUEST,        // 移除物品
    GM_P2P_TRADE_REMOVEITEM_RETURN,
    GM_P2P_TRADE_LOCK_REQUEST,              // 锁定交易
    GM_P2P_TRADE_LOCK_RETURN,
    GM_P2P_TRADE_ENTER_REQUEST,             // 确认交易
    GM_P2P_TRADE_ENTER_RETURN,
    GM_P2P_TRADE_CANCEL_REQUEST,            // 主动取消交易
    GM_P2P_TRADE_CANCEL_RETURN,
    GM_P2P_TRADE_REFUSE_REQUEST,            // 拒绝交易
    GM_P2P_TRADE_REFUSE_RETURN,

    GM_P2P_TRADE_NOTIFY = 13080,            // 通知交易请求
    GM_P2P_TRADE_START_NOTIFY,              // 通知交易开始
    GM_P2P_TRADE_ADDITEM_NOTIFY,            // 通知对方放入物品
    GM_P2P_TRADE_REMOVEITEM_NOTIFY,         // 通知对方移除物品
    GM_P2P_TRADE_LOCK_NOTIFY,               // 通知对方交易锁定
    GM_P2P_TRADE_CHECK_NOTIFY,              // 通知开始确认交易
    GM_P2P_TRADE_ENTER_NOTIFY,              // 通知对方确认交易
    GM_P2P_TRADE_OVER_NOTIFY,               // 通知交易结束
    GM_P2P_TRADE_INTERRUPT_NOTIFY,          // 通知取消交易
    GM_P2P_TRADE_REFUESE_NOTIFY,            // 通知谁拒绝交易

    /*************** 人物交易 结束 *************************/

    /*************** 仙盟篝火 开始 *************************/
    GM_GANG_BONFIRE_ENTER_REQUEST = 13100,          // 请求进入篝火活动
    GM_GANG_BONFIRE_ENTER_RETURN,
    GM_GANG_BONFIRE_TEAM_REQUEST,                   // 请求篝火同组信息
    GM_GANG_BONFIRE_TEAM_RETURN,
    GM_GANG_BONFIRE_SWAP_REQUEST,                   // 篝火中切换同组场景
    GM_GANG_BONFIRE_SWAP_RETURN,

    GM_GANG_BONFIRE_NOTIFY = 13180,                 // 篝火信息通知
    GM_GANG_BONFIRE_EXP_NOTIFY,                     // 通知经验改变
    GM_GANG_BONFIRE_BLOOD_NOTIFY,                   // 通知血量改变
    GM_GANG_BONFIRE_EXPPLUS_NOTIFY,                 // 通知经验加成

    /*************** 仙盟篝火 结束 *************************/

    /*************** 仙盟 吉星高照 开始 *************************/
    SM_GANG_LUCKY_REQUEST = 13200,          // 
    SM_GANG_LUCKY_RETURN,

    GM_GANG_LUCKY_UI_REQUEST = 13220,       // 吉星高照 界面
    GM_GANG_LUCKY_UI_RETURN,
    GM_GANG_LUCKY_RANK_REQUEST,             // 吉星高照 仙盟排名（单独请求）
    GM_GANG_LUCKY_RANK_RETURN,
    GM_GANG_LUCKY_PLAYDICE_REQUEST,         // 吉星高照 掷骰子
    GM_GANG_LUCKY_PLAYDICE_RETURN,
    GM_GANG_LUCKY_CHANGEDICE_REQUEST,       // 吉星高照 改运(元宝和免费)
    GM_GANG_LUCKY_CHANGEDICE_RETURN,
    GM_GANG_LUCKY_CONFIRMDUCE_REQUEST,      // 吉星高照 确认骰子
    GM_GANG_LUCKY_CONFIRMDUCE_RETURN,

    GM_GANG_LUCKY_NOTIFY = 13280,           // 吉星高照 通知


    /*************** 仙盟 吉星高照 结束 *************************/

    /*********************************神技 evange***************************************/
    SM_SPECIALSKILL_INFO_REQUEST = 13300,           // DB请求玩家技能信息
    SM_SPECIALSKILL_INFO_RETURN,                // DB玩家技能信息返回

    GM_SPECIALSKILL_INFO_REQUEST = 13320,           // 请求玩家技能信息
    GM_SPECIALSKILL_INFO_RETURN,                    // 玩家技能信息返回
    GM_SPECIALSKILL_UPGRADE_REQUEST,                // 技能升级
    GM_SPECIALSKILL_UPGRADE_RETURN,             // 技能升级结果
    GM_SPECIALSKILL_SETTING_REQUEST,                // 技能设置修改
    GM_SPECIALSKILL_SETTING_RETURN,             // 技能设置成功  只有操作结果

    GM_SPECIALSKILL_INFO_NOTIFY = 13380,                // 技能信息通知

    /*********************************神技结束***************************************/

    /*********************************终极囚天 evange***************************************/
    SM_FINALBOSS_REQUEST = 13400,                   // 
    SM_FINALBOSS_RETURN,

    GM_FINALBOSS_ENTER_REQUEST = 13420,         // 请求进入副本
    GM_FINALBOSS_ENTER_RETURN,

    GM_FINALBOSS_NOTIFY = 13480,                // 通知

    /*********************************终极囚天结束***************************************/

    /*********************************跨服赛 个人争霸 evange***************************************/
    SM_CROSSPLAYERTOP_REQUEST = 13500,          // 
    SM_CROSSPLAYERTOP_RETURN,

    GM_CROSSPLAYERTOP_SIGNUPUI_REQUEST = 13520, // 通知客户端请求报名界面
    GM_CROSSPLAYERTOP_SIGNUPUI_RETURN,
    GM_CROSSPLAYERTOP_SINGUP_REQUEST,           // 通知客户端请求报名
    GM_CROSSPLAYERTOP_SINGUP_RETURN,
    GM_CROSSPLAYERTOP_BETUI_REQUEST,            // 通知客户端下注界面
    GM_CROSSPLAYERTOP_BETUI_RETURN,
    GM_CROSSPLAYERTOP_BET_REQUEST,              // 通知客户端下注
    GM_CROSSPLAYERTOP_BET_RETURN,

    GM_CROSSPLAYERTOP_NOTIFY = 13580,               // 通知


    /*********************************跨服赛 个人争霸 结束***************************************/

    /********************************切换角色***************************************************/
    GM_LOGOUT_TO_ROLE_LIST_REQUEST = 13600,         //请求下线
    GM_LOGOUT_TO_ROLE_LIST_RETURN,                  //请求下线回调
    GM_KICKOFF_PLAYER,                              //踢角色下线
                                                    /********************************切换角色***************************************************/

    /********************************玩家pk模块***************************************************/
    SM_PK_KILL_REQUEST = 13700,         //请求击杀记录
    SM_PK_KILL_RETURN,

    GM_PK_KILL_REQUEST = 13720,
    GM_PK_KILL_RETURN,

    GM_PK_NOTIFY = 13780,                   // 击杀通知
    GM_PK_LUCKY_NOTIFY,                     // 恶意击杀掉幸运值通知
                                            /********************************玩家pk模块***************************************************/

    /********************************药园模块***************************************************/
    SM_GARDEN_REQUEST = 13800,          // 药园
    SM_GARDEN_RETURN,

    GM_GARDEN_UI_REQUEST = 13820,           // 药园界面
    GM_GARDEN_UI_RETURN,
    GM_GARDEN_UNLOCK_REQUEST,           // 解锁地
    GM_GARDEN_UNLOCK_RETURN,
    GM_GARDEN_PLANT_UI_REQUEST,         // 种植界面
    GM_GARDEN_PLANT_UI_RETURN,
    GM_GARDEN_PLANT_REQUEST,            //  种植
    GM_GARDEN_PLANT_RETURN,
    GM_GARDEN_REFRESH_REQUEST,          //  刷新种子
    GM_GARDEN_REFRESH_RETURN,
    GM_GARDEN_REDUCE_CD_REQUEST,        //  消耗甘露刷新cd
    GM_GARDEN_REDUCE_CD_RETURN,
    GM_GARDEN_PICKUP_REQUEST,           // 收获
    GM_GARDEN_PICKUP_RETURN,            // 会通知单块地信息

    GM_GARDEN_GROUND_REQUEST = 13880,       // 单块地请求	
    GM_GARDEN_GROUND_RETURN,            // 单块地通知

    /********************************玩家pk模块***************************************************/

    /********************************丹药模块***************************************************/
    SM_PILL_REQUEST = 13900,            // 丹药使用数据
    SM_PILL_RETURN,

    GM_PILL_ALLINFO_REQUEST = 13920,    // 丹药所有信息
    GM_PILL_ALLINFO_RETURN,
    GM_PILL_INFO_REQUEST,           // 某各模块的丹药信息
    GM_PILL_INFO_RETURN,
    GM_PILL_USE_REQUEST,            // 使用某种丹药
    GM_PILL_USE_RETURN,

    GM_PILL_NOTIFY = 13980,     // 丹药通知
                                /********************************丹药模块结束***************************************************/

    /********************************仙盟周任务模块***************************************************/
    SM_GANG_WEEK_TASK_DATA_REQUEST = 14000,         // 仙盟任务数据
    SM_GANG_WEEK_TASK_DATA_RETURN,

    GM_GANG_WEEK_TASK_UI_REQUEST = 14020,       // 仙盟任务界面
    GM_GANG_WEEK_TASK_UI_RETURN,
    GM_GANG_WEEK_TASK_QUICK_REQUEST,        // 仙盟任务直接完成本轮
    GM_GANG_WEEK_TASK_QUICK_RETURN,
    GM_GANG_WEEK_TASK_DROP_REQUEST,         // 仙盟任务放弃任务
    GM_GANG_WEEK_TASK_DROP_RETURN,
    GM_GANG_WEEK_TASK_REWARD_REQUEST,       // 仙盟任务领取奖励
    GM_GANG_WEEK_TASK_REWARD_RETURN,
    GM_GANG_WEEK_START_REQUEST,             // 仙盟任务开始判断
    GM_GANG_WEEK_START_RETURN,

    GM_GANG_WEEK_TASK_NOTIFY = 14080,           // 通知

    /********************************丹药模块结束***************************************************/

    /********************************仙盟BOSS模块***************************************************/
    SM_GANGBOSS_REQUEST = 14100,        // 仙盟任务数据
    SM_GANGBOSS_RETURN,

    GM_GANGBOSS_UI_REQUEST = 14120,         // 界面信息
    GM_GANGBOSS_UI_RETURN,
    GM_GANGBOSS_SUBMINT_REQUEST,            // 上交兽粮
    GM_GANGBOSS_SUBMINT_RETURN,
    GM_GANGBOSS_FIGHT_REQUEST,              // 开启挑战
    GM_GANGBOSS_FIGHT_RETURN,
    GM_GANGBOSS_ENTER_REQUEST,              // 进入副本
    GM_GANGBOSS_ENTER_RETURN,
    GM_GANGBOSSCOPYINFO_NOTIFY,           ///通知玩家副本信息
	GMGANGBOSSDIE_SETTLE,                         ///玩家死亡或者boss副本结束结算
	GM_GANGBOSSADDREWARD_NOTIFY,       ///通知逻辑服务器加物品

    GM_GANGBOSS_NOTIFY = 14180,             // 通知

    /********************************仙盟BOSS模块***************************************************/

    /********************************套装模块***************************************************/
    SM_EQUIPSUIT_DATA_REQUEST = 14200,      // 请求套装信息
    SM_EQUIPSUIT_DATA_RETURN,

    GM_EQUIPSUIT_UI_REQUEST = 14220,            // 请求套装信息
    GM_EQUIPSUIT_UI_RETURN,
    GM_EQUIPSUIT_FORGE_REQUEST,             // 套装打造
    GM_EQUIPSUIT_FORGE_RETURN,
    GM_EQUIPSUIT_REFINE_REQUEST,            // 套装淬炼
    GM_EQUIPSUIT_REFINE_RETURN,
    GM_EQUIPSUIT_REALIZE_REQUEST,           // 套装唤灵
    GM_EQUIPSUIT_REALIZE_RETURN,

    GM_EQUIPSUIT_NOTIFY = 14280,                // 通知

    /********************************套装模块***************************************************/

    /********************************vipboss模块***************************************************/
    SM_VIPBOSS_DATA_REQUEST = 14300,        // 界面信息
    SM_VIPBOSS_DATA_RETURN,

    GM_VIPBOSS_UI_REQUEST = 14320,      // 界面信息
    GM_VIPBOSS_UI_RETURN,
    GM_VIPBOSS_FIGHT_REQUEST,           // 挑战boss
    GM_VIPBOSS_FIGHT_RETURN,

    GM_VIPBOSS_NOTIFY = 14380,          // 通知

    /********************************vipboss模块***************************************************/


    /********************************领域模块***************************************************/
    SM_FIELD_DATA_REQUEST = 14400,      // 数据获取
    SM_FIELD_DATA_RETURN,

    GM_FIELD_UI_REQUEST = 14420,            // 请求界面信息
    GM_FIELD_UI_RETURN,
    GM_FIELD_DATA_REQUEST,              // 请求数据
    GM_FIELD_DATA_RETURN,
    GM_FIELD_ACTIVE_REQUEST,            // 激活领域
    GM_FIELD_ACTIVE_RETURN,
    GM_FIELD_UPGRADE_REQUEST,           // 升级领域
    GM_FIELD_UPGRADE_RETURN,
    GM_FIELD_BATTLE_REQUEST,            // 领域出战
    GM_FIELD_BATTLE_RETURN,
    GM_FIELD_UNMOUNT_REQUEST,           // 领域卸下
    GM_FIELD_UNMOUNT_RETURN,

    GM_FIELD_NOTIFY = 14480,                // 通知

    /********************************领域模块***************************************************/


    /********************************跨服-巅峰竞技模块***************************************************/
    SM_CROSSPEAK_DATA_REQUEST = 14500,      // 数据获取
    SM_CROSSPEAK_DATA_RETURN,

    GM_CROSS_PEAK_POINT_REQUEST = 14520,            // 竞技积分
    GM_CROSS_PEAK_POINT_RETURN,
    GM_CROSS_PEAK_HONOR_REQUEST,                // 荣誉值请求
    GM_CROSS_PEAK_HONOR_RETURN,
    GM_CROSS_PEAK_UI_REQUEST,                   // 界面信息
    GM_CROSS_PEAK_UI_RETURN,
    GM_CROSS_PEAK_BUY_REQUEST,                  // 购买挑战次数
    GM_CROSS_PEAK_BUY_RETURN,
    GM_CROSS_PEAK_BOX_REQUEST, // 获取宝盒奖励
    GM_CROSS_PEAK_BOX_RETURN,
    GM_CROSS_PEAK_DAILYREWARD_REQUEST, // 每日段位奖励
    GM_CROSS_PEAK_DAILYREWARD_RETURN,
    GM_CROSS_PEAK_MATCH_REQUEST, // 匹配
    GM_CROSS_PEAK_MATCH_RETURN,
    GM_CROSS_PEAK_CANCELMATCH_REQUEST, // 取消匹配
    GM_CROSS_PEAK_CANCELMATCH_RETURN,
    GM_CROSS_PEAK_RANK_REQUEST, // 排行榜信息
    GM_CROSS_PEAK_RANK_RETURN,
    GM_CROSS_PEAK_WUXUN_REQUEST, // 武勋领取
    GM_CROSS_PEAK_WUXUN_RETURN,

    GM_CROSS_PEAK_MATCH_NOTIFY = 14580, // 荣誉值通知
    GM_CROSS_PEAK_MATCH_SETTLE,         // 结算信息通知

    /********************************跨服-巅峰竞技模块***************************************************/


    /******************************************周末活动模块开始*********************************************/

    SM_WEEKENDACT_DATA_REQUEST = 14600,         // 数据获取
    SM_WEEKENDACT_DATA_RETURN,
    SM_WEEKENDACT_REWARD_INSTANCE,              // 通知副本队员奖励信息


    GM_WEEKENDACT_UI_REQUEST = 14620,               // 活动界面
    GM_WEEKENDACT_UI_RETURN,
    GM_WEEKENDACT_RANK_REQUEST,                 // 排行数据
    GM_WEEKENDACT_RANK_RETURN,
    GM_WEEKENDACT_REWARD_REQUEST,               // 奖励数据
    GM_WEEKENDACT_REWARD_RETURN,
    GM_WEEKENDACT_FIGHT_REQUEST,                // 挑战副本
    GM_WEEKENDACT_FIGHT_RETURN,
    GM_WEEKENDACT_TEAM_REQUEST,                 // 获取队伍的进度信息
    GM_WEEKENDACT_TEAM_RETURN,

    GM_WEEKENDACT_NOTIFY = 14680,                   // 通知
    GM_WEEKENDACT_FIGHT_FAIL_NOTIFY,            // 通知玩家的进度不一致
    GM_WEEKENDACT_BEST_NOTIFY,                  // 通知玩家的最好成绩信息

    /******************************************周末活动模块结束*********************************************/



    /******************************************支付模块开始*********************************************/
    GM_CREATE_PAYMENT_REQUEST = 14700,          //客户端请求打开支付界面 即生成支付请求
    GM_CREATE_PAYMENT_RETURN,
    GM_APPSTORE_VERIFY_ORDER_REQUEST,               //客户端请求验证订单 Appstore用
    GM_APPSTORE_VERIFY_ORDER_RETURN,                //回复客户端finish包
    GM_GET_CHAREG_DATA_REQUEST,         //请求充值界面数据
    GM_GET_CHAREG_DATA_RETURN,
    GM_GOOGLEPLAY_VERIFY_ORDER_REQUEST, //客户端请求验证订单 google支付用(GooglePlay)
    GM_GOOGLEPLAY_VERIFY_ORDER_RETURN,              //回复客户端finish包
    GM_RECHARGE_OVER_RETURN,            //通知客户端  订单完成

    SM_CHECK_PAYMENT_REQUEST,           //向Http服务器请求检查漏单
    SM_CREATE_PAYMENT_REQUEST,          //向Http服务器请求创建一条支付信息
    SM_CREATE_PAYMENT_RETURN,
    SM_GET_PAYMENT_REQUEST,             //向Http服务器请求是否有未完成的支付订单
    SM_APPSTORE_VERIFY_ORDER_REQUEST,               //向Http服务器发包
    SM_APPSTORE_VERIFY_ORDER_RETURN,                //http服务器回包
    SM_CHAREG_DATA_DB_REQUEST,          //向数据库请求玩家数据
    SM_CHAREG_DATA_DB_RETURN,
    SM_GOOGLEPLAY_VERIFY_ORDER_REQUEST,             //向Http服务器发包
    SM_GOOGLEPLAY_VERIFY_ORDER_RETURN,              //http服务器回包
    SM_SEND_PAYMENT_REQUEST,    //发放订单
    SM_SEND_PAYMENT_RETURN,
    SM_FINISH_PAYMENT_REQUEST,          //向http服务器请求修改订单为完成状态
    SM_FINISH_PAYMENT_RETURN,
    SM_CREATE_ORDER_REQUEST,            //请求创建订单  - 新（Dean）

    SM_GET_WEEKCARD_FROM_DB,                        //逻辑服务器向db请求玩家周卡相关数据
    SM_GET_WEEKCARD_FROM_DB_RETURN,                 //数据服务器返回玩家周卡相关数据
    SM_GET_RECHARGE_FROM_DB,                        //逻辑服务器向db请求玩家充值数据
    SM_GET_RECHARGE_FROM_DB_RETURN,                 //数据服务器返回玩家充值数据
    GM_WEEKCARD_REQUEST,                            //请求周卡数据
    GM_WEEKCARD_RETURN,
    GM_WEEKCARD_CLICK_REQUEST,                      //请求领取周卡奖励
    GM_WEEKCARD_CLICK_RETURN,
    GM_RECHARGE_OPEN_REQUEST,                       //客户端请求打开充值界面
    GM_RECHARGE_OPEN_RETURN,                        //回客户端玩家充值信息
    GM_RECHARGE_REQUEST,                            //请求充值
    GM_RECHARGE_RETURN,                             //告知客户端充值结果
    GM_RECHARGE_FIRSTRECHARGE_REQUEST,              //显示首充信息
    GM_RECHARGE_FIRSTRECHARGE_RETURN,
    GM_RECHARGE_FIRSTRECHARGECLICK_REQUEST,         //请求领取首冲奖励
    GM_RECHARGE_FIRSTRECHARGECLICK_RETURN,
    GM_RECHARGE_FIRSTRECHARGEREWARD_REQUEST,        //请求首充奖励信息
    GM_RECHARGE_FIRSTRECHARGEREWARD_RETURN,
    GM_RECHARGE_FIRSTRECHARGEINFO_REQUEST,          //请求首冲信息
    GM_RECHARGE_FIRSTRECHARGEINFO_RETURN,

    GM_RECHARGE_LOVEREWARD_REQUEST,                 //请求爱心礼包信息
    GM_RECHARGE_LOVEREWARD_RETURN,
    GM_RECHARGE_LOVEREWARDINFO_REQUEST,             //请求爱心礼包个人信息
    GM_RECHARGE_LOVEREWARDINFO_RETURN,
    GM_RECHARGE_LOVEREWARDCLICK_REQUEST,            //请求领取爱心礼包
    GM_RECHARGE_LOVEREWARDCLICK_RETURN,

    SM_GET_FRISTRECHARGEEACH_FROM_DB,                       //逻辑服务器向db请求玩家购买商品信息
    SM_GET_FRISTRECHARGEEACH_FROM_DB_RETURN,

    GM_RECHARGE_CLEARCHARGE_NOTIFY,                 //通知客户端 首冲状态改变
    DB_RECHARGE_TRUNCATEEACH_REQUEST,           //清空首冲记录
    DB_PLAYER_CONFIGSYSTEMTIME_REQUEST,         //配置系统时间
    DB_PLAYER_CONFIGSYSTEMTIME_RETURN,

    GM_RECHARGELIST_INFO_REQUEST,               //请求充值排行榜界面基础信息
    GM_RECHARGELIST_INFO_RETURN,
    GM_RECHARGELIST_DETAIL_REQUEST,             //请求充值排行细节信息
    GM_RECHARGELIST_DETAIL_RETURN,
    GM_RECHARGELIST_OPEN_RETURN,                //通知有新的充值排行活动开启
    GM_RECHARGELIST_CLOSE_RETURN,               //通知有新的充值排行活动关闭

    GM_CENTER_RECHARGELIST_INFO_REQUEST,        //请求跨服充值排行榜界面基础信息
    GM_CENTER_RECHARGELIST_INFO_RETURN,
    GM_CENTER_RECHARGELIST_DETAIL_REQUEST,      //请求跨服充值排行细节信息
    GM_CENTER_RECHARGELIST_DETAIL_RETURN,
    GM_CENTER_RECHARGELIST_OPEN_RETURN,         //通知有新的跨服充值排行活动开启
    GM_CENTER_RECHARGELIST_CLOSE_RETURN,        //通知有新的跨服充值排行活动关闭

    SM_CENTER_RECHARGELIST_ADD_REQUEST,     // 通知中心服务器 玩家充值
    SM_CENTER_RECHARGELIST_DAYMAIL,         // 通知发放跨服充值每日奖励邮件
    SM_CENTER_RECHARGELIST_TOTALMAIL,           // 通知发放跨服充值结束奖励邮件

    SM_AUTO_SUBSCRIBE_REQUEST,                  //向Http服务器请求订阅
    SM_AUTO_SUBSCRIBE_RETURN,
    /******************************************支付模块结束**********************************************/


    /*************************7天登录************************************/
    SM_GET_SEVENLOGIN_FROM_DB = 14800,                  //向DB请求玩家7天登录信息
    SM_GET_SEVENLOGIN_FROM_DB_RETURN,                   //DB返回玩家7天登录信息

    GM_SEVENDAY_LOGIN_REWARD_REQUEST,                   //请求7天登录奖励数据
    GM_SEVENDAY_LOGIN_REWARD_RETURN,                    //回客户端7天登录奖励数据
    GM_SEVENDAY_LOGIN_REQUEST,                          //客户端请求7天登录数据
    GM_SEVENDAY_LOGIN_RETURN,                           //回客户端7天登录数据
    GM_SEVENDAY_LOGIN_CLICK_REQUEST,                    //客户端请求领取7天登录奖励
    GM_SEVENDAY_LOGIN_CLICK_RETURN,                     //请求领取7天登录奖励返回
    GM_SEVENDAY_LOGIN_SHOW_REQUEST,                     //请求7天登录展示信息
    GM_SEVENDAY_LOGIN_SHOW_RETURN,                      //请求7天登录展示信息返回

    /*************************7天登录结束************************************/

    /*************************装备强化************************************/
    SM_GET_EQUIPSTRENGTHINFO_FROM_DB = 14900,                   //向DB请求玩家装备强化信息
    SM_GET_EQUIPSTRENGTHINFO_FROM_DB_RETURN,                    //DB返回玩家装备强化信息

    GM_EQUIPSTRENGTHINFO_REQUEST,                   //请求强化信息
    GM_EQUIPSTRENGTHINFO_RETURN,                    //回客户端强化信息
    GM_EQUIPSTRENGTH_REQUEST,                           //客户端请求强化装备
    GM_EQUIPSTRENGTH_RETURN,                            //回客户端强化装备结果
    GM_EQUIPSTRENGALLTHINFO_REQUEST,                    //请求所有装备强化信息
    GM_EQUIPSTRENGALLTHINFO_RETURN,
    GM_EQUIPLEVELUP_REQUEST,                            //请求升阶
    GM_EQUIPLEVELUP_RETURN,
    GM_EQUIPREFINE_REQUEST,                             //请求精炼
    GM_EQUIPREFINE_RETURN,
    GM_EQUIPSTRENGTH_ONEKEY_REQUEST,                    //请求一键强化
    GM_EQUIPSTRENGTH_ONEKEY_RETURN,
    GM_POSEQUIPDATA_REQUEST,     ///部位强化数据请求
	GM_POSEQUIPDATA_RETURN,
    GM_CLIENT_POSEQUIPDATA_REQUEST,     ///客户端请求部位强化数据
	GM_CLIENT_POSEQUIPDATA_RETURN,
    GM_EQUIPLEVELUP_USEROLL_REQUEST,            //使用强化卷
    GM_EQUIPLEVELUP_USEROLL_RERURN,


    SM_PETEQUIPDATA_REQUEST = 14950,     /// 部位强化数据请求
	SM_PETEQUIPDATA_RETURN,



    /*************************装备强化结束************************************/
    /*************************VIP************************************/
    SM_GET_VIP_FROM_DB = 15000,                 //向DB请求玩家vip信息
    SM_GET_VIP_FROM_DB_RETURN,                  //DB返回玩家vip信息
    GM_VIP_UPLEVEL_RETURN,						///通知客户端VIP信息变动
	GM_VIP_REQUEST,                         //客户端获得玩家vip信息
    GM_VIP_RETURN,                                  //回客户端玩家vip信息
    GM_VIP_GETEXP,                              //领取vip经验
    GM_VIP_GETEXP_RETURN,                       //领取vip经验返回
    GM_VIP_GETREWARDDATA,                       //请求vip特权数据
    GM_VIP_GETREWARD_RETURN,                    //请求vip特权数据返回
    GM_VIP_GETVIPREWARD,                        //领取vip奖励
    GM_VIP_GETVIPREWARD_RETURN,                 //领取vip奖励返回
                                                /*************************VIP结束************************************/
                                                /*************************好友模块************************************/
    SM_FRIEND_DATA_REQUEST = 15100,         //向数据库请求玩家好友数据
    SM_FRIEND_DATA_RETURN,                  //从数据库返回玩家好友数据
    SM_FRIEND_INFO_REQUEST,             //向数据库请求玩家馈赠次数数据
    SM_FRIEND_INFO_RETRUN,              //从数据库返回玩家馈赠次数数据

    GM_OPEN_FRIEND_REQUEST,                 //请求打开好友界面
    GM_OPEN_FRIEND_RETURN,
    GM_FRIEND_GIVE_REQUEST,                 //请求馈赠好友体力
    GM_FRIEND_GIVE_RETURN,
    GM_FRIEND_RECIEVE_REQUEST,              //请求领取馈赠
    GM_FRIEND_RECIEVE_RETURN,
    GM_FRIENDADD_REQUEST,                   //请求添加好友
    GM_FRIENDADD_RETURN,
    GM_FRIENDDELETE_REQUEST,                //请求删除好友
    GM_FRIENDDELETE_RETURN,
    GM_FRIENDBLACK_REQUEST,                 //请求添加黑名单
    GM_FRIENDBLACK_RETURN,                  //请求添加黑名单返回
    GM_FRIENDFLOWER_REQUEST,                //请求送好友鲜花
    GM_FRIENDFLOWER_RETURN,
    GM_FRIENDFIND_REQUEST,                  //请求查找好友
    GM_FRIENDFIND_RETURN,
    GM_FRIENDRECOMMEND_REQUEST,                 //请求推荐好友
    GM_FRIENDRECOMMEND_RETURN,
    GM_FRIEND_NOTICE_RETURN,                //好友消息改变通知客户端
    GM_FRIENDBLACKREMOVE_REQUEST,           //移除黑名单
    GM_FRIENDBLACKREMOVE_RETURN,
    GM_FRIEND_NOTICE_TV,                    //通知体力变化
    GM_FRIEND_GIVEALL_REQUEST,          //请求一键赠送馈赠
    GM_FRIEND_GIVEALL_RETURN,
    SM_FRIEND_ENEMY_REQUEST,            //向数据库请求玩家仇人数据
    SM_FRIEND_ENEMY_RETRUN,             //从数据库返回玩家仇人数据
    GM_OPEN_FRIENDENEMY_REQUEST,        //请求玩家仇人数据
    GM_OPEN_FRIENDENEMY_RETURN,         //请求玩家仇人数据
    GM_FRIENDGOENEMY_REQUEST,           //传送到仇人身边
    GM_FRIENDGOENEMY_RETURN,
    GM_FRIEND_ENEMY_Notify,             //仇人通知
                                        /*************************好友模块结束************************************/
                                        /*****************************结义模块************************************/
    SM_SWORNBROTHERREWARD_REQUEST = 15200,          //向数据库请求玩家结义奖励领取数据
    SM_SWORNBROTHERREWARD_RETURN,                   //从数据库返回玩家结义奖励领取数据
    GM_SWORNBROTHER_REQUEST,                        //请求结义
    GM_SWORNBROTHER_RETURN,
    GM_OPENSWORNBROTHER_REQUEST,                    //请求打开结义界面
    GM_OPENSWORNBROTHER_RETURN,
    GM_OPENSWORNBROTHERTASK_REQUEST,                //请求打开结义任务界面
    GM_OPENSWORNBROTHERTASK_RETURN,
    GM_SWORNBROTHER_SENDWINE_REQUEST,               //请求赠送美酒
    GM_SWORNBROTHER_SENDWINE_RETURN,
    GM_SWORNBROTHER_BREAK_REQUEST,                  //请求分道扬镳
    GM_SWORNBROTHER_BREAK_RETURN,
    GM_SWORNBROTHER_REWARD_REQUEST,                 //领取结义任务奖励
    GM_SWORNBROTHER_REWARD_RETURN,
    GM_SWORNBROTHER_UPDATE_REQUEST,                 //修改结义誓言
    GM_SWORNBROTHER_UPDATE_RETURN,

    GM_SWORNBROTHER_KILL_NOTIFY,                    //通知杀怪
    GM_SWORNBROTHER_TASKFINISH_NOTIFY,              //通知完成任务
    GM_SWORNBROTHER_ADDBROTHERBAL_NOTIFY,           //通知增加情义值
    GM_SWORNBROTHER_BROTHERDELETE_NOTIFY,           //通知结义关系取消

    GM_SWORNBROTHER_NOTIFY,                         //弹框确认通知
    GM_SWORNBROTHERACCEPT_REQUEST,                          //同意弹框操作
                                                            /**************************结义模块结束***********************************/
                                                            /*****************************邮件模块************************************/
    SM_MAIL_DATA_REQUEST = 15300,           //向数据库请求玩家邮件数据
    SM_MAIL_DATA_RETURN,                    //从数据库返回玩家邮件数据
    SM_MAIL_COUNT_REQUEST,              //向数据库请求玩家全局邮件读取数据
    SM_MAIL_COUNT_RETRUN,               //从数据库返回玩家全局邮件读取数据

    GM_MAIL_REQUEST,                    //请求邮件数据
    GM_MAIL_RETURN,
    GM_MAIL_READ_REQUEST,               //请求阅读邮件
    GM_MAIL_READ_RETURN,
    GM_MAIL_GETITEM_REQUEST,            //请求领取邮件附件
    GM_MAIL_GETITEM_RETURN,
    GM_MAIL_DELETE_REQUEST,             //请求删除邮件
    GM_MAIL_DELETE_RETURN,
    GM_MAIL_GETALLITEM_REQUEST,         //一键领取邮件
    GM_MAIL_GETALLITEM_RETURN,
    GM_MAIL_DELETEALL_REQUEST,          //请求批量删除邮件
    GM_MAIL_DELETEALL_RETURN,
    GM_MAIL_DELETEALLREAD_REQUEST,      //请求删除已读邮件
    GM_MAIL_DELETEALLREAD_RETURN,
    GM_MAIL_DELETE_Notify,              //通知有邮件过期
    GM_MAIL_ADD_Notify,                 //通知收到邮件
    DB_OFFLINE_MAIL_REQUEST,            //发送一封离线邮件,

    /*****************************邮件模块结束********************************/
    /*****************************商店模块************************************/
    GM_OPENSHOP_REQUEST = 15400,                //请求打开杂货
    GM_OPENSHOP_RETURN,
    GM_SHOP_BUY_REQUEST,                        //请求购买杂货
    GM_SHOP_BUY_RETURN,
    GM_SHOPEQUIP_BUY_REQUEST,                   //请求购买装备
    GM_SHOPEQUIP_BUY_RETURN,
    GM_SHOPEXPLOIT_BUY_REQUEST,                 //请求购买功勋物品
    GM_SHOPEXPLOIT_BUY_RETURN,
    GM_SHOPPOPULARITY_BUY_REQUEST,              //请求购买声望物品
    GM_SHOPPOPULARITY_BUY_RETURN,
    GM_SHOPSCORE_BUY_REQUEST,                   //请求购买积分物品
    GM_SHOPSCORE_BUY_RETURN,
    GM_SHOPHONOR_BUY_REQUEST,                   //请求购买荣誉物品
    GM_SHOPHONOR_BUY_RETURN,
    SM_SHOP_RECROD_DATA_REQUEST,                //向数据库请求玩家每天购买数据
    SM_SHOP_RECROD_DATA_RETURN,
    //SM_SHOP_WEEKRECROD_DATA_REQUEST,			//向数据库请求玩家每周购买数据
    //SM_SHOP_WEEKRECROD_DATA_RETURN,	
    /*****************************商店模块结束********************************/
    /*****************************商城模块************************************/
    SM_MALL_DATA_REQUEST = 15500,                       //向数据库请求玩家商城购买数据
    SM_MALL_DATA_RETURN,
    GM_MALLOPEN_REQUEST,                        //请求打开商城界面
    GM_MALLOPEN_RETURN,
    GM_MALLBUY_REQUEST,                         //请求购买商品
    GM_MALLBUY_RETURN,
    /*****************************商城模块结束********************************/
    /*************************单人副本************************************/
    SM_GET_SINGLEFBINFO_FROM_DB = 15600,                //向DB请求玩家单人副本信息
    SM_GET_SINGLEFBINFO_FROM_DB_RETURN,                 //DB返回玩家单人副本信息
    SM_GET_SINGLEFBSTARINFO_FROM_DB,                    //向DB请求玩家单人副本星级信息
    SM_GET_SINGLEFBSTARINFO_FROM_DB_RETURN,             //DB返回玩家单人副本星级信息

    GM_SINGLEFBOPEN_REQUEST,                            //请求打开单人副本界面
    GM_SINGLEFBOPEN_RETURN,
    GM_SINGLEFBBUY_REQUEST,                             //请求购买副本次数
    GM_SINGLEFBBUY_RETURN,
    GM_SINGLEFBLOGIN_REQUEST,                           //请求进入副本
    GM_SINGLEFBLOGIN_RETURN,
    GM_SINGLEFBSWEEP_REQUEST,                           //请求扫荡副本
    GM_SINGLEFBSWEEP_RETURN,
    GM_SINGLEFBGUIDE_REQUEST,                           //请求进入指引副本
    GM_SINGLEFBGUIDE_RETURN,
    SM_GET_SINGLEFBGUILDINFO_FROM_DB,                   //向DB请求玩家单人指引副本信息
    SM_GET_SINGLEFBGUILDINFO_FROM_DB_RETURN,
    GM_SINGLEFBDOUBLESWEEP_REQUEST,                     //请求双倍领取上次扫荡奖励
    GM_SINGLEFBDOUBLESWEEP_RETURN,
    GM_FBDOUBLECLICK_REQUEST,                           //请求领取双倍副本通关奖励
    GM_FBDOUBLECLICK_RETURN,
    /*************************单人副本结束************************************/
    /********************************坐骑************************************/
    SM_RIDE_DATA_REQUEST = 15700,               //向DB请求玩家坐骑信息
    SM_RIDE_DATA_RETURN,
    SM_RIDEFASHION_DATA_REQUEST,                //向DB请求玩家坐骑信息
    SM_RIDEFASHION_DATA_RETURN,
    GM_RIDEOPEN_REQUEST,                        //请求打开坐骑界面
    GM_RIDEOPEN_RETURN,
    GM_RIDE_REQUEST,                            //请求坐骑培养
    GM_RIDE_RETURN,
    GM_RIDETRANSFORM_REQUEST,                   //坐骑化形	
    GM_RIDETRANSFORM_RETURN,
    GM_RIDEON_REQUEST,                          //骑上坐骑
    GM_RIDEON_RETURN,
    GM_RIDEOFF_REQUEST,                         //下坐骑
    GM_RIDEOFF_RETURN,
    GM_MOUNT_RIDINGEQUIP_REQUEST,               //请求穿上骑装
    GM_MOUNT_RIDINGEQUIP_RETURN,
    GM_UNMOUNT_RIDINGEQUIP_REQUEST,             //请求卸下骑装
    GM_UNMOUNT_RIDINGEQUIP_RETURN,
    GM_RIDINGEQUIP_COMPOSE_REQUEST,             //骑装合成 
    GM_RIDINGEQUIP_COMPOSE_RETURN,
    GM_RIDING_FASHION_REQUEST,                  //请求坐骑幻化界面信息
    GM_RIDING_FASHION_RETURN,
    GM_RIDING_FASHION_CHANGE_REQUEST,           //请求坐骑幻化
    GM_RIDING_FASHION_CHANGE_RETURN,
    GM_RIDING_FASHION_OVER_NOTIFY,              //通知坐骑幻化到期
    GM_RIDING_FASHION_UNCHANGE_REQUEST,         //请求取消坐骑幻化
    GM_RIDING_FASHION_UNCHANGE_RETURN,
    GM_RIDING_LEVELUP_NOTIFY,                   //坐骑升阶通知

    GM_RIDE_LOGINREWARD_REQUEST = 15750,        // 坐骑登录送礼
    GM_RIDE_LOGINREWARD_RETURN,
    GM_RIDE_LOGINREWARD_RECV_REQUEST,               // 坐骑登录送礼领取
    GM_RIDE_LOGINREWARD_RECV_RETURN,

    /***************************坐骑结束************************************/
    /********************************法宝************************************/
    SM_TRUMP_DATA_REQUEST = 15800,              //向DB请求玩家法宝信息
    SM_TRUMP_DATA_RETURN,
    SM_TRUMPWEAR_DATA_REQUEST,                  //向DB请求玩家法宝穿戴信息
    SM_TRUMPWEAR_DATA_RETURN,
    GM_TRUMPOPEN_REQUEST,                       //请求法宝信息
    GM_TRUMPOPEN_RETURN,
    GM_TRUMPACTIVATE_REQUEST,                   //请求激活法宝
    GM_TRUMPACTIVATE_RETURN,
    GM_TRUMPREFINE_REQUEST,                     //请求淬炼法宝
    GM_TRUMPREFINE_RETURN,
    GM_TRUMPSOUL_REQUEST,                       //请求注灵法宝
    GM_TRUMPSOUL_RETURN,
    GM_TRUMPON_REQUEST,                         //请求穿戴法宝
    GM_TRUMPON_RETURN,
    GM_TRUMPOFF_REQUEST,                        //请求卸下法宝
    GM_TRUMPOFF_RETURN,
    /****************************法宝结束************************************/
    /********************************仙器************************************/
    SM_XIANQI_DATA_REQUEST = 15900,             //向DB请求玩家仙器信息
    SM_XIANQI_DATA_RETURN,
    SM_XIANQIFASHION_DATA_REQUEST,              //向DB请求玩家仙器时装信息
    SM_XIANQIFASHION_DATA_RETURN,
    GM_XIANQIOPEN_REQUEST,                      //请求仙器信息
    GM_XIANQIOPEN_RETURN,
    GM_XIANQISTRENTH_REQUEST,                   //请求提升仙器
    GM_XIANQISTRENTH_RETURN,
    GM_XIANQION_REQUEST,                        //请求佩戴仙器
    GM_XIANQION_RETURN,
    GM_XIANQIOFF_REQUEST,                       //请求卸下法宝
    GM_XIANQIOFF_RETURN,
    GM_XIANQI_FASHION_REQUEST,
    GM_XIANQI_FASHION_RETURN,
    GM_XIANQI_FASHION_CHANGE_REQUEST,
    GM_XIANQI_FASHION_CHANGE_RETURN,
    GM_XIANQI_FASHION_UNCHANGE_REQUEST,
    GM_XIANQI_FASHION_UNCHANGE_RETURN,
    GM_XIANQI_FASHION_OVER_NOTIFY,
    /****************************仙器结束************************************/
    /********************************聊天************************************/
    SM_CHAT_DATA_REQUEST = 16000,               //向DB请求玩家聊天信息
    SM_CHAT_DATA_RETURN,
    GM_SEND_CHAT_WORD,                          //请求聊天
    GM_SEND_CHAT_WORD_RETURN,
    GM_CHAT_ERROR,                              //错误
    GM_CHAT_SYSTEMWORD_RETURN,                  //系统通知
    GM_AUDIO_SERVERIP_REQUEST,                  //请求语音服务器的IP地址,
    GM_AUDIO_SERVERIP_RETURN,
    GM_SEND_AUDIO_REQUEST,						///客户端请求发送语音,
	GM_SEND_AUDIO_RETURN,
    GM_CHAT_GANGWORD_RETURN,                    //仙盟通知
    GM_SEALLANUAGER_NOTIFY,				///通知客户端被禁言/解除禁言,
	GM_CHAT_SYSTEMWORD_FROMSCENE,               //获得场景发来的公告，然后广播出去
    GM_GET_AUDIO_STATE_REQUEST,                 //请求自动播放状态
    GM_GET_AUDIO_STATE_RETURN,
    GM_SET_AUDIO_STATE_REQUEST,                 //请求修改播放状态
    GM_SET_AUDIO_STATE_RETURN,
    GM_SPEECH_REQUEST,                              ///客户端请求发送语音聊天
	GM_SPEECH_RETURN,                               ///返回结果
	GM_SPEECH_BC,                                        ///语音广播
	GM_SPEECHDATA_REQUEST,                     ///客户端请求语音聊天内容
	GM_SPEECHDATA_RETURN,                      ///返回语音聊天内容
	GM_CHAT_UPLOCK_REQUEST,                      ///返回聊天限制等级
	GM_CHAT_UPLOCK_RETURN,
    /****************************聊天结束************************************/
    /********************************武炼之道************************************/
    SM_WLZDFB_DATA_REQUEST = 16100,             //向DB请求武炼之道副本信息
    SM_WLZDFB_DATA_RETURN,
    SM_WLZDBOX_DATA_REQUEST,                        //向DB请求武炼之道宝箱信息
    SM_WLZDBOX_DATA_RETURN,
    SM_WLZDSWEEP_DATA_REQUEST,                      //向DB请求武炼之道扫荡信息
    SM_WLZDSWEEP_DATA_RETURN,

    GM_WLZDFBOPEN_REQUEST,                      //请求打开武炼之道界面
    GM_WLZDFBOPEN_RETURN,
    GM_WLZDFB_REQUEST,                          //请求进入武炼之道副本
    GM_WLZDFB_RETURN,
    GM_WLZDFB_SWEEP_REQUEST,                    //请求扫荡武炼之道副本		
    GM_WLZDFB_SWEEP_RETURN,
    GM_WLZDFB_BOX_REQUEST,                      //请求领取宝箱
    GM_WLZDFB_BOX_RETURN,
    /****************************武炼之道结束************************************/
    /********************************竞技场************************************/
    SM_ARENA_DATA_REQUEST = 16200,                  //向DB请求竞技场信息
    SM_ARENA_DATA_RETURN,
    SM_ARENA_CHALLENGE_REQUEST,                     //向DB请求竞技场挑战记录
    SM_ARENA_CHALLENGE_RETURN,
    SM_ARENA_DETAIL_REQUEST,                        //向DB请求竞技场个人信息
    SM_ARENA_DETAIL_RETURN,

    GM_ARENA_REQUEST,                           //请求竞技场界面
    GM_ARENA_RETURN,
    GM_ARENARANKING_REQUEST,                    //请求竞技场排行榜信息
    GM_ARENARANKING_RETURN,
    GM_ARENAFRESH_REQUEST,                      //请求换一批	
    GM_ARENAFRESH_RETURN,
    GM_ARENAREWARD_REQUEST,                     //请求领取竞技场奖励
    GM_ARENAREWARD_RETURN,

    GM_ARENAFIGHT_REQUEST,                      //请求挑战玩家
    GM_ARENAFIGHT_RETURN,
    GM_ARENACLEAR_REQUEST,                      //请求清除挑战冷却时间
    GM_ARENACLEAR_RETURN,
    GM_ARENABUY_REQUEST,                        //请求购买挑战次数
    GM_ARENABUY_RETURN,
    /****************************竞技场结束************************************/
    /********************************挑战boss************************************/
    SM_BOSSFY_DATA_REQUEST = 16300,                 //向DB请求个人boss信息
    SM_BOSSFY_DATA_TURN,


    GM_BOSS_REQUEST,                            //请求boss信息
    GM_BOSS_RETURN,
    GM_BOSSDIGONG_REQUEST,                      //请求进入地宫
    GM_BOSSDIGONG_RETURN,
    GM_BOSSINSIDE_REQUEST,                      //请求里熔恶之地	
    GM_BOSSINSIDE_RETURN,
    GM_BOSSFY_REQUEST,                          //请求封印boss
    GM_BOSSFY_RETURN,
    GM_BOSSKILL_NOTIFY,                         //boss击杀通知
    GM_BOSSDROPITEM_SENDWORD,                   //击杀boss掉落物品

    SM_BOSSXW_DATA_REQUEST,                     //向DB请求个人虚无禁地信息
    SM_BOSSXW_DATA_TURN,
    GM_BOSSXW_REQUEST,                          //请求进入虚无禁地
    GM_BOSSXW_RETURN,
    GM_BOSSXW_TIREDVAL_REQUEST,                 //请求虚无禁地疲劳值
    GM_BOSSXW_TIREDVAL_RETURN,
    GM_BOSSXW_USETAOFA_TIREDVAL_RETURN,
    /****************************挑战boss结束************************************/
    /****************************心法开始************************************/
    SM_MENTAL_DATA_REQUEST = 16400,             //向DB请求玩家心法信息
    SM_MENTAL_DATA_RETURN,
    SM_MENTALSKILL_DATA_REQUEST,                //向DB请求玩家心法技能信息
    SM_MENTALSKILL_DATA_RETURN,

    GM_MENTALOPEN_REQUEST,                      //请求心法信息
    GM_MENTALOPEN_RETURN,
    GM_MENTALSTRENTH_REQUEST,                   //请求提升心法
    GM_MENTALSTRENTH_RETURN,
    GM_MENTALSKILL_REQUEST,                     //请求提升技能
    GM_MENTALSKILL_RETURN,
    /****************************心法结束************************************/
    /****************************神器开始************************************/
    SM_ARTIFACT_DATA_REQUEST = 16500,               //向DB请求玩家神器信息
    SM_ARTIFACT_DATA_RETURN,
    SM_ARTIFACTPIECE_DATA_REQUEST,                  //向DB请求玩家神器碎片信息
    SM_ARTIFACTPIECE_DATA_RETURN,

    GM_ARTIFACTOPEN_REQUEST,                        //请求神器信息
    GM_ARTIFACTOPEN_RETURN,
    GM_ARTIFACTACTIVE_REQUEST,                      //请求激活碎片
    GM_ARTIFACTACTIVE_RETURN,
    GM_ARTIFACT_REQUEST,                            //请求提升神器
    GM_ARTIFACT_RETURN,
    GM_ARTIFACT_ALLREQUEST,                         //请求一键提升神器
    GM_ARTIFACT_ALLRETURN,
    GM_ARTIFACT_AUTOUP,                             //请求获得碎片时自动提升
    GM_ARTIFACT_AUTOUP_RETURN,
    /****************************神器结束************************************/
    /****************************铸魂开始************************************/
    SM_BUILDSOUL_DATA_REQUEST = 16600,              //向DB请求玩家铸魂信息
    SM_BUILDSOUL_DATA_RETURN,

    GM_BUILDSOULOPEN_REQUEST,                       //请求铸魂信息
    GM_BUILDSOULOPEN_RETRUN,
    GM_BUILDSOUL_REQUEST,                           //请求铸魂
    GM_BUILDSOUL_RETURN,

    /****************************铸魂结束************************************/

    /****************************成就开始************************************/
    SM_ACHIEVEMENT_REQUEST = 16700,                 //向DB请求玩家成就信息
    SM_ACHIEVEMENT_RETURN,
    SM_ACHIEVEMENT_COUNT_REQUEST,                   //向DB请求玩家成就统计信息
    SM_ACHIEVEMENT_COUNT_RETURN,

    GM_ACHIEVEMENTOPEN_REQUEST,                     //请求成就信息
    GM_ACHIEVEMENTOPEN_RETURN,
    GM_ACHIEVEMENT_REQUEST,                         //请求领取成就
    GM_ACHIEVEMENT_RETURN,
    GM_ACHIEVEMENT_NOTIFY,                          //解锁通知

    SM_ACHIEVEMENTALL_REQUEST,                  //向DB请求玩家成就点奖励领取信息
    SM_ACHIEVEMENTALL_RETURN,

    GM_ACHIEVEMENTALL_REQUEST,                      //请求领取成就点奖励
    GM_ACHIEVEMENTALL_RETURN,
    GM_ACHIEVEMENTALL_CLICKINFO_REQUEST,                //请求成就点领取情况
    GM_ACHIEVEMENTALL_CLICKINFO_RETURN,
    /****************************铸魂结束************************************/
    /****************************每日必做(战阶)开始************************************/
    SM_FIGHTRANK_REQUEST = 16800,                           //向DB请求玩家战阶信息
    SM_FIGHTRANK_RETURN,
    SM_FIGHTRANKPROCESS_REQUEST,                            //向DB请求玩家战阶进度信息
    SM_FIGHTRANKPROCESS_RETURN,
    GM_FIGHTRANK_REQUEST,
    GM_FIGHTRANK_RETURN,
    GM_FIGHTRANK_UPGRADE_REQUEST,
    GM_FIGHTRANK_UPGRADE_RETURN,
    GM_FIGHTRANK_NOTIFY,
    GM_FIGHTRANK_FRESH_NOTIFY,                      //通知刷新

    SM_FIGHTRANKBOX_REQUEST,                            //向DB请求玩家战阶宝箱信息
    SM_FIGHTRANKBOX_RETURN,
    GM_FIGHTRANK_BOXCLICK_REQUEST,
    GM_FIGHTRANK_BOXCLICK_RETURN,

    SM_MUSTDONEREWARD_REQUEST = 16820,              //向DB请求玩家成就信息
    SM_MUSTDONEREWARD_RETURN,
    GM_MUSTDONE_REWARD_REQUEST = 16830,             //请求每日必做活跃度信息
    GM_MUSTDONE_REWARD_RETURN,
    GM_MUSTDONE_REWARD_RCV_REQUEST,                 // 活跃宝箱领取
    GM_MUSTDONE_REWARD_RCV_RETURN,

    GM_MUSTDONE_ACTIVE_NOTIFY = 16880,              // 通知活跃度信息

    /****************************每日必做结束************************************/
    /******************************藏宝库开始************************************/
    SM_TREASURE_REQUEST = 16900,                    //向DB请求玩家成就信息
    SM_TREASURE_RETURN,
    GM_TREASUREOPEN_REQUEST,                    //请求打开宝藏界面
    GM_TREASUREOPEN_RETURN,
    GM_TREASURE_REQUEST,                        //请求抽取宝藏
    GM_TREASURE_RETURN,
    GM_TREASURE_Notify,                         //通知
    GM_TREASUREOPEN_HIGH_REQUEST,
    GM_TREASUREOPEN_HIGH_RETURN,
    GM_TREASURE__HIGH_REQUEST,
    GM_TREASURE_HIGH_RETURN,
    GM_TREASURE_HIGH_Notify,
    /******************************藏宝库结束************************************/
    /******************************武道大会开始************************************/
    GM_WUDAOHUI_STATE_REQUEST = 17000,              //请求武道会状态
    GM_WUDAOHUI_STATE_RETURN,
    GM_WUDAOHUI_REQUEST,                            //请求武道会信息
    GM_WUDAOHUI_RETURN,
    GM_WUDAOHUI_ENTER_REQUEST,                      //请求进入武道会活动场景
    GM_WUDAOHUI_ENTER_RETURN,
    GM_WUDAOHUI_EXIT_REQUEST,                       //请求退出武道会活动场景
    GM_WUDAOHUI_EXIT_RETURN,
    GM_WUDAOHUI_ENROLL_REQUEST,                     //请求武道会报名
    GM_WUDAOHUI_ENROLL_RETURN,
    GM_WUDAOHUI_Notify,
    GM_WUDAOHUI_FightNotify,                        //通知战斗结果
    GM_WUDAOHUI_HuaShenNotify,                      //通知对面为化身

    GM_WUDAOHUI_ADMIREINFO_REQUEST,                 // 武道会前三名信息
    GM_WUDAOHUI_ADMIREINFO_RETURN,                  // 武道会前三名信息返回
                                                    /******************************武道大会结束************************************/
                                                    /******************************仙武之巅开始************************************/
    GM_XIANWU_REQUEST = 17100,              //请求仙武之巅信息
    GM_XIANWU_RETURN,
    GM_XIANWUBANG_REQUEST,                      //请求仙武之巅排行榜信息
    GM_XIANWUBANG_RETURN,
    GM_XIANWUBET_REQUEST,                       //请求仙武之巅下注
    GM_XIANWUBET_RETURN,
    GM_XIANWUENTER_REQUEST,                     //请求进入仙武之巅
    GM_XIANWUENTER_RETURN,
    GM_XIANWU_Notify,
    GM_XIANWU_INFO_REQUEST,                     //刷新仙武之巅信息
    GM_XIANWU_INFO_RETURN,
    GM_XIANWU_PLAYER_REQUEST,                   // 仙武之巅参赛者请求
    GM_XIANWU_PLAYER_NOTIFY,                    // 仙武之巅参赛者通知
    GM_XIANWU_BATTLE_RESULT,                    // 仙武之巅胜利者通知

    /******************************仙武之巅结束************************************/
    /******************************夺宝奇兵开始************************************/
    GM_DUOBAO_REQUEST = 17200,                  //请求夺宝奇兵信息
    GM_DUOBAO_RETURN,
    GM_DUOBAOENTER_REQUEST,                     //请求进入夺宝奇兵场景
    GM_DUOBAOENTER_RETURN,
    GM_DUOBAOBALL_REQUEST,                      //请求拾取宝珠
    GM_DUOBAOBALL_RETURN,
    GM_DUOBAOCLICK_REQUEST,                     //请求交还宝珠
    GM_DUOBAOCLICK_RETURN,
    GM_DUOBAO_NOTIFY,
    /******************************夺宝奇兵结束************************************/
    /******************************封神之战开始************************************/
    GM_FENGSHENWAR_REQUEST = 17300,                 //请求夺宝奇兵信息
    GM_FENGSHENWAR_RETURN,
    GM_FENGSHENWAR_BANG_REQUEST,                    //请求封神之战排行榜信息
    GM_FENGSHENWAR_BANG_RETURN,
    GM_FENGSHENWAR_ENTER_REQUEST,                   //请求进入封神之战
    GM_FENGSHENWAR_ENTER_RETURN,

    GM_FENGSHENWAR_NOTIFY,
    /******************************封神之战结束************************************/
    /******************************结婚开始************************************/
    SM_MARRYROLEDATA_REQUEST = 17400,               //向DB请求玩家个人结婚信息
    SM_MARRYROLEDATA_RETURN,
    GM_MARRY_REQUEST,                           //请求结婚
    GM_MARRY_RETURN,
    GM_MARRYOPEN_REQUEST,                       //请求打开结婚界面
    GM_MARRYOPEN_RETURN,

    GM_MARRYCHOOSE_REQUEST,                     //请求选择信物
    GM_MARRYCHOOSE_RETURN,
    GM_MARRYAGAIN_REQUEST,                      //请求补办婚礼
    GM_MARRYAGAIN_RETURN,
    GM_MARRYBREAK_REQUEST,                      //请求离婚
    GM_MARRYBREAK_RETURN,
    GM_MARRYIMPROVE_REQUEST,                    //请求提升信物品质
    GM_MARRYIMPROVE_RETURN,
    GM_MARRYENTER_REQUEST,                  //请求进入结婚副本
    GM_MARRYENTER_RETURN,
    GM_MARRYENTERAGREE_REQUEST,                 //同意进入副本
    GM_MARRYENTERAGREE_RETURN,
    GM_MARRYACCEPT_REQUEST,                     // 同意结婚
    GM_MARRYREQUESTENTE_RETURN,                 // 邀请伴侣进入副本提示,

    GM_MARRYREQUEST_ALLWORDGET,                 // 客户端请求所有获得字信息,
    GM_MARRYREQUESTENTE_ALLWORDGET,             //通知客户端所有获得字信息,
    GM_MARRYREQUESTENTE_WORDGET,                //通知客户端怪物死亡，获得字并飘字,

    GM_MARRY_NOTIFY,                            //通知

    GM_MARRY_LOVETOKEN_REQUEST,                 //请求打开信物界面
    GM_MARRY_LOVETOKEN_RETURN,                  //
    GM_MARRY_LOVETOKEN_CHANGE_REQUEST,          //选择信物
    GM_MARRY_LOVETOKEN_CHANGE_NOTIFY,
    GM_MARRYCHOOSE_NOTIFY,                  //选好信物通知
    GM_MARRY_LOVE_REQUEST,                      //请求洞房界面
    GM_MARRY_LOVE_RETURN,
    GM_MARRY_MAKELOVE_REQUEST,                  //请求洞房
    GM_MARRY_MAKELOVE_RETURN,
    GM_MARRY_MAKELOVE_CD_REQUEST,               //请求清除洞房cd
    GM_MARRY_MAKELOVE_CD_RETURN,
    GM_MARRY_MAKELOVE_INVITE,                   //洞房邀请通知
    GM_MARRY_MAKELOVE_ACCEPT_REQUEST,           //洞房弹框操作


    /******************************结婚结束************************************/
    /******************************仙域战场开始************************************/
    GM_DOMAINBATTLEFIELD_REQUEST = 17500,                   //请求仙域战场信息,
    GM_DOMAINBATTLEFIELD_RETURN,
    GM_DOMAINBATTLEFIELDENTER_REQUEST,                      //请求进入仙域战场场景,
    GM_DOMAINBATTLEFIELDENTER_RETURN,
    GM_DOMAINBATTLEFIELD_COPY_RETURN,                       //副本信息（玩家进入副本和数据更新时会自动下发：所有副本玩家）,
    GM_DOMAINBATTLEFIELD_NOTIFY,                            //通知客户端战场状态变化,
                                                            /******************************仙域战场结束************************************/
                                                            /******************************每日运镖开始************************************/
    GM_TRANSPORTDART_REQUEST = 17550,                   //请求每日运镖信息,
    GM_TRANSPORTDART_RETURN,
    GM_TRANSPORTDARTENTER_REQUEST,                      //请求运镖,
    GM_TRANSPORTDARTENTER_RETURN,

    GM_TRANSPORTDARTINFO_REQUEST,                       //（向场景服发送消息）请求自己的镖车信息,
    GM_TRANSPORTDARTINFO_RETURN,                        //服务器返回镖车创建信息(镖车创建和客户端请求会下发),

    GM_TRANSPORTDARTINFO_NOTIFY,                        //通知客户端每日运镖活动状态变化,
    GM_TRANSPORTDART_OVER_NOTIFY,                       //通知客户端镖车结算信息
    GM_TRANSPORTDART_BEKILLED_NOTIFY,                   //通知客户端镖车被击杀

    GM_TRANSPORTDARTPOSITION_REQUEST,                   //（向场景服发送消息）请求自己的镖车坐标,
    GM_TRANSPORTDARTPOSITION_RETURN,                    // 服务器返回镖车坐标,


    /******************************每日运镖结束************************************/
    /******************************爬塔开始************************************/
    SM_CLIMBTOWER_REQUEST = 17600,                  //向DB请求玩家成就信息
    SM_CLIMBTOWER_RETURN,
    GM_CLIMBTOWER_REQUEST,                      //请求爬塔个人信息
    GM_CLIMBTOWER_RETURN,
    GM_CLIMBTOWER_CHALLENGE_REQUEST,            //请求爬塔
    GM_CLIMBTOWER_CHALLENGE_RETURN,
    GM_CLIMBTOWER_SWEEP_REQUEST,                //请求扫荡
    GM_CLIMBTOWER_SWEEP_RETURN,
    GM_CLIMBTOWER_NOTIFY,                       //通知用
                                                /******************************爬塔结束************************************/
                                                /******************************魔戒寻主开始************************************/
    SM_LOADRINGS_REQUEST = 17700,                   //向DB请求玩家魔戒总览信息
    SM_LOADRINGS_RETURN,
    SM_LOADRINGSRECORD_REQUEST,                         //向DB请求玩家魔戒小项记录
    SM_LOADRINGSRECORD_RETURN,
    GM_LOADRINGSOPEN_REQUEST,                       //请求魔戒界面信息
    GM_LOADRINGSOPEN_RETURN,
    GM_LOADRINGSREWARD_REQUEST,                 //请求小目标领奖
    GM_LOADRINGSREWARD_RETURN,
    GM_LOADRINGSSKILL_REQUEST,                  //请求领取技能
    GM_LOADRINGSSKILL_RETURN,
    GM_LOADRINGS_NOTIFY,                        //通知用

    GM_LOADRINGS_DIAMONDACT_REQUEST,            //元宝戒指激活
    GM_LOADRINGS_DIAMONDACT_RETURN,
    GM_LOADRINGS_VIPRING_NOTIFY,                    //通知vip戒解锁

    GM_LOADRINGS_DUPGRADE_REQUEST,              //D戒升级
    GM_LOADRINGS_DUPGRADE_RETURN,
    GM_LOADRINGS_VUPGRADE_REQUEST,              //V戒升级
    GM_LOADRINGS_VUPGRADE_RETURN,
    GM_LOADRINGS_POINT_NOTIFY,
    GM_LOADRINGS_FRESH_NOTIFY,                  //刷新通知
                                                /******************************魔戒寻主结束************************************/
                                                /********************************足迹************************************/
    SM_FOOT_DATA_REQUEST = 17800,               //向DB请求玩家足迹信息
    SM_FOOT_DATA_RETURN,
    SM_FOOTFASHION_DATA_REQUEST,                //向DB请求玩家坐骑信息
    SM_FOOTFASHION_DATA_RETURN,
    GM_FOOTOPEN_REQUEST,                        //请求打开足迹界面
    GM_FOOTOPEN_RETURN,
    GM_FOOT_REQUEST,                            //请求足迹培养
    GM_FOOT_RETURN,
    GM_FOOT_ON_REQUEST,                 //足迹佩戴	
    GM_FOOT_ON_RETURN,
    GM_FOOT_OFF_REQUEST,                    //足迹脱下	
    GM_FOOT_OFF_RETURN,                     //
    GM_FOOT_FASHION_REQUEST,                //请求足迹幻化界面信息
    GM_FOOT_FASHION_RETURN,
    GM_FOOT_FASHION_CHANGE_REQUEST,         //请求足迹幻化
    GM_FOOT_FASHION_CHANGE_RETURN,
    GM_FOOT_FASHION_UNCHANGE_REQUEST,       //请求取消足迹幻化
    GM_FOOT_FASHION_UNCHANGE_RETURN,
    GM_FOOT_FASHION_OVER_NOTIFY,            //通知
                                            /***************************足迹结束************************************/
                                            /****************************神器开始************************************/
    SM_GODWEAPON_DATA_REQUEST = 17900,              //向DB请求玩家神兵信息
    SM_GODWEAPON_DATA_RETURN,


    GM_GODWEAPON_OPEN_REQUEST,                      //请求神兵信息
    GM_GODWEAPON_OPEN_RETURN,
    GM_GODWEAPON_REQUEST,                           //请求升级
    GM_GODWEAPON_RETURN,
    /****************************神器结束************************************/

    /****************************小助手 开始************************************/
    SM_ASSISTANT_REWARD_DATA_REQUEST = 18000,       //向DB请求
    SM_ASSISTANT_REWARD_DATA_RETURN,

    GM_ASSISTANT_MAINUI_REQUEST = 18020,            // 请求界面信息
    GM_ASSISTANT_MAINUI_RETURN,
    GM_ASSISTANT_REWARD_REQUEST,                    // 领取奖励
    GM_ASSISTANT_REWARD_RETURN,
    GM_ASSISTANT_MINIUI_REQUEST,                    // 简单界面信息
    GM_ASSISTANT_MINIUI_RETURN,

    GM_ASSISTANT_NOTIFY = 18080,                    // 通知


    /****************************小助手 结束************************************/

    /****************************绝地乱战 开始************************************/
    SM_JDLD_REWARD_DATA_REQUEST = 18100,        //向DB请求
    SM_JDLD_REWARD_DATA_RETURN,

    GM_JDLD_MAIN_UI_REQUEST = 18120,            // 主界面
    GM_JDLD_MAIN_UI_RETURN,
    GM_JDLD_RECORD_UI_REQUEST,                  // 战绩界面
    GM_JDLD_RECORD_UI_RETURN,
    GM_JDLD_REWARD_UI_REQUEST,                  // 排名奖励界面
    GM_JDLD_REWARD_UI_RETURN,
    GM_JDLD_GETJOIN_REQUEST,                    // 领取参与奖励
    GM_JDLD_GETJOIN_RETURN,
    GM_JDLD_GETKILL_REQUEST,                    // 领取击杀奖励
    GM_JDLD_GETKILL_RETURN,
    GM_JDLD_MATCH_REQUEST,                      // 报名
    GM_JDLD_MATCH_RETURN,
    GM_JDLD_CANCEL_MATCH_REQUEST,               // 取消报名
    GM_JDLD_CANCEL_MATCH_RETURN,
    GM_JDLD_LOGININFO_REQUEST,                  // 登入服务器信息
    GM_JDLD_LOGININFO_RETURN,
    GM_JDLD_EXITCOPY_REQUEST,                   // 退出副本
    GM_JDLD_EXITCOPY_RETURN,

    GM_JDLD_MATCH_SUCCESS_NOTIFY = 18180,       // 匹配成功通知 3秒自动拉入
    GM_JDLD_MATCH_COUNT_NOTIFY,                 // 匹配人数通知
    GM_DEATHFIGHT_COPYRANK_NOTIFY,              // 单场奖励发送结果

    /****************************绝地乱战 结束************************************/


    /****************************神秘商店 开始************************************/
    SM_MYSTICALSTORE_POINT_REQUEST = 18200,     //向DB请求积分信息
    SM_MYSTICALSTORE_POINT_RETURN,

    GM_MYSTICALSTORE_UI_REQUEST = 18220,        // 请求界面信息
    GM_MYSTICALSTORE_UI_RETURN,                 // 界面信息通知
    GM_MYSTICALSTORE_BUY_REQUEST,               // 单场奖励发送结果
    GM_MYSTICALSTORE_BUY_RETURN,
    GM_MYSTICALSTORE_REFRESH_REQUEST,           // 刷新购买界面
    GM_MYSTICALSTORE_REFRESH_RETURN,            // 界面刷新通知
    GM_MYSTICALSTORE_POINT_REQUEST,             // 积分兑换
    GM_MYSTICALSTORE_POINT_RETURN,
    GM_MYSTICALSTORE_LONGIN_REQUEST,            // 当前活动请求
    GM_MYSTICALSTORE_LONGIN_RETURN,

    GM_MYSTICALSTORE_START_NOTIFY = 18280,// 通知有活动开始
    GM_MYSTICALSTORE_END_NOTIFY,        // 通知有活动结束

    /****************************神秘商店 结束************************************/

    /****************************跨服3v3 开始************************************/
    SM_CROSS3V3_DATA_REQUEST = 18300,       //向DB请求积分信息
    SM_CROSS3V3_DATA_RETURN,

    GM_CROSS3V3_MATCHUI_REQUEST = 18320,        // 请求匹配界面信息
    GM_CROSS3V3_MATCHUI_RETURN,                 // 界面信息通知
    GM_CROSS3V3_READY_REQUEST,                  // 准备界面队员准备
    GM_CROSS3V3_READY_RETURN,
    GM_CROSS3V3_UNREADY_REQUEST,                // 准备界面队员取消准备
    GM_CROSS3V3_UNREADY_RETURN,                 // 界面刷新通知
    GM_CROSS3V3_MATCH_REQUEST,                  // 匹配界面请求匹配
    GM_CROSS3V3_MATCH_RETURN,
    GM_CROSS3V3_CANCELMATCH_REQUEST,            // 匹配界面取消匹配
    GM_CROSS3V3_CANCELMATCH_RETURN,
    GM_CROSS3V3_LIST_REQUEST,                   // 积分排行
    GM_CROSS3V3_LIST_RETURN,
    GM_CROSS3V3_LISTREWARD_REQUEST,             // 积分排名奖励信息
    GM_CROSS3V3_LISTREWARD_RETURN,
    GM_CROSS3V3_WEEKREWARD_REQUEST,             // 周积分奖励信息
    GM_CROSS3V3_WEEKREWARD_RETURN,
    GM_CROSS3V3_WEEKREWARD_GET_REQUEST,         // 周积分奖励领取
    GM_CROSS3V3_WEEKREWARD_GET_RETURN,
    GM_CROSS3V3_POINTSTORE_REQUEST,             // 积分商店界面信息
    GM_CROSS3V3_POINTSTORE_RETURN,
    GM_CROSS3V3_POINTSTORE_EXCHANGE_REQUEST,    // 积分商店兑换
    GM_CROSS3V3_POINTSTORE_EXCHANGE_RETURN,

    GM_CROSS3V3_MATCH_NOTIFY = 18380,       // 通知开始匹配
    GM_CROSS3V3_CANCELMATCH_NOTIFY,         // 通知取消匹配
    GM_CROSS3V3_MATCH_SUCCESS_NOTIFY,       // 通知匹配成功 3秒自己进副本
    GM_CROSS3V3_COPYMAIL_NOTIFY,            // 通知单场奖励邮件发送

    /****************************跨服3v3 结束************************************/

    /****************************自动订阅 开始************************************/
    SM_AUTOSUB_DATA_REQUEST = 18400,        //向DB请求积分信息
    SM_AUTOSUB_DATA_RETURN,
    SM_CENTER_ANTOSUB_MINIUI_REQUEST,               //获取订阅界面信息
    SM_CENTER_ANTOSUB_MINIUI_RETURN,                //订阅信息返回
    SM_CENTER_ANTOSUB_UI_REQUEST,                   //获取订阅界面信息
    SM_CENTER_ANTOSUB_UI_RETURN,                    //订阅信息返回
    SM_CENTER_ANTOSUB_NOTIFY_GAMESERVER,            //中心服务器通知游戏服务器订阅成功
    SM_CENTER_ANTOSUB_TIME_REWARD,                  //发放订阅奖励
    SM_CENTER_ANTOSUB_EVENT_REWARD,                 // 其他订阅事件发送
    SM_CENTER_ANTOSUB_OVER_REWARD,                  //发放补发奖励

    GM_AUTOSUB_MINIUI_REQUEST = 18420,      // 登录请求信息
    GM_AUTOSUB_MINIUI_RETURN,
    GM_AUTOSUB_UI_REQUEST,                  // 请求界面信息 翅膀+坐骑
    GM_AUTOSUB_UI_RETURN,
    GM_AUTOSUB_SUB_REQUEST,                 // 请求订阅
    GM_AUTOSUB_SUB_RETURN,
    GM_AUTOSUB_CLICKLOG_NOTIFY,             // 按钮日志

    GM_AUTOSUB_NOTIFY = 18480,              // 通知订阅成功


    /****************************自动订阅 结束************************************/

    /****************************妖神谱 开始************************************/
    SM_YAOSHEN_DATA_REQUEST = 18500,        //向DB请求积分信息
    SM_YAOSHEN_DATA_RETURN,

    GM_YAOSHEN_INFO_REQUEST = 18520,        // 请求信息
    GM_YAOSHEN_INFO_RETURN,
    GM_YAOSHEN_UPGRADE_REQUEST,         // 精魄升级
    GM_YAOSHEN_UPGRADE_RETURN,

    GM_YAOSHEN_NOTIFY = 18580,          // 通知元宝改变
    GM_YAOSHEN_JINGPO_NOTIFY,           // 精魄改变通知
    GM_YAOSHEN_STORE_NOTIFY,            // 商店精魄触发通知
    GM_YAOSHEN_JINGPO_REMAIN_NOTIFY,    // 精魄今日掉落获取通知

    /****************************妖神谱 结束************************************/

    /****************************0元礼包 开始************************************/
    SM_ZEROGIFT_DATA_REQUEST = 18600,       //向DB请求0元礼包激活信息
    SM_ZEROGIFT_DATA_RETURN,
    SM_ZEROGIFTREWARD_DATA_REQUEST,             //向DB请求0元礼包奖励信息
    SM_ZEROGIFTREWARD_DATA_RETURN,

    GM_ZEROGIFT_REQUEST = 18620,        // 请求0元礼包界面信息
    GM_ZEROGIFT_RETURN,
    GM_ZEROGIFT_CLICK_REQUEST,          // 请求领取0元礼包
    GM_ZEROGIFT_CLICK_RETURN,
    GM_ZEROGIFT_NOTIFY,                 // 通知

    /****************************0元礼包 结束************************************/

    /****************************投资理财 开始************************************/
    SM_INVESTMENT_DATA_REQUEST = 18650,     //向DB请求投资信息
    SM_INVESTMENT_DATA_RETURN,
    SM_INVESTMENT_REWARD_DATA_REQUEST,      //向DB请求栏位领取信息
    SM_INVESTMENT_REWARD_DATA_RETURN,

    GM_INVESTMENT_BASE_REQUEST,     // 请求投资理财界面数据
    GM_INVESTMENT_BASE_RETURN,

    GM_INVESTMENT_PERSON_REQUEST,       // 请求投资理财个人数据
    GM_INVESTMENT_PERSON_RETURN,

    GM_INVESTMENT_REQUEST,              // 请求投资
    GM_INVESTMENT_RETURN,
    GM_INVESTMENT_CLICK_REQUEST,        // 请求领取栏位奖励
    GM_INVESTMENT_CLICK_RETURN,

    /****************************投资理财 结束************************************/


    /****************************跨服大道仙音 开始************************************/
    SM_CROSSEXERCISE_DATA_REQUEST = 18700,
    SM_CROSSEXERCISE_DATA_RETURN,

    GM_CROSSEXERCISE_REDDOT_REQUEST = 18720,// 请求红点信息
    GM_CROSSEXERCISE_REDDOT_RETURN,
    GM_CROSSEXERCISE_MAINUI_REQUEST,        // 主界面信息
    GM_CROSSEXERCISE_MAINUI_RETURN,
    GM_CROSSEXERCISE_ROOMUI_REQUEST,        // 道场界面信息
    GM_CROSSEXERCISE_ROOMUI_RETURN,
    GM_CROSSEXERCISE_SIT_REQUEST,           // 道场坐下
    GM_CROSSEXERCISE_SIT_RETURN,
    GM_CROSSEXERCISE_OCCUMPY_REQUEST,       // 道场占领 如果无人占领 相当于坐下
    GM_CROSSEXERCISE_OCCUMPY_RETURN,
    GM_CROSSEXERCISE_COOLDOWN_REQUEST,      // 道场占领cd清除
    GM_CROSSEXERCISE_COOLDOWN_RETURN,
    GM_CROSSEXERCISE_BUY_REQUEST,           // 道场购买次数
    GM_CROSSEXERCISE_BUY_RETURN,
    GM_CROSSEXERCISE_REWARD_REQUEST,        // 道场领奖 直接发邮件提示 奖励发给玩家
    GM_CROSSEXERCISE_REWARD_RETURN,

    GM_CROSSEXERCISE_NOTIFY = 18780,        // 通知信息

    /****************************跨服大道仙音 结束************************************/


    ///--------------------------监测网络--------------------------
    GM_NETLISTEN_REQUEST = 21200,///发包监测网络是否链接正常
	GM_NETLISTEN_RETURN,  ///回包返回网络正常
	CS_RETURNMONEY_REQUEST,             //逻辑服务器->中心服务器-请求是否要还钱给他
    CS_RETURNMONEY_RETURN,              //中心服务器->逻辑服务器-是否要返给他

    GM_SEALACCOUNT_REQUEST = 21900,///逻辑服务器请求被封账号信息
	GM_SEALACCOUNT_RETURN,  ///返回被封账号信息
                            ///--------------------------监测网络--------------------------

    /****************************************战役模块**************************************************/

    DB_FBUNLOCK_REQUEST = 23600,		///向数据库请求数据,
	DB_FBUNLOCK_RETURN,				///解锁回调,
	DB_FBCHESTS_RETURN,				///宝箱回调,
	GM_CHESTSINFO_NOTIFY,			///服务器主动通知<可领取宝箱信息>
	GM_FBSTAR_NOTIFY,				///服务器主动通知<星星信息>
	GM_LASTFBID_NOTIFY,

    GM_FBUNLOCK_REQUEST = 23620,		///客户端请求副本解锁信息
	GM_FBUNLOCK_RETURN,				///回调,
	GM_FBSTARANK_REQUEST,			///客户端请求副本星星排行
	GM_FBSTARANK_RETURN,			///回调,
	GM_FBJOIN_REQUEST,				///客户端请求进入副本
	GM_FBJOIN_RETURN,				///回调,
	GM_FBSWEEP_REQUEST,				///客户端请求扫荡副本
	GM_FBSWEEP_RETURN,				///回调,
	GM_FBRESET_REQUEST,				///客户端请求重置副本挑战次数
	GM_FBRESET_RETURN,				///回调,
	GM_CHESTSACHIEVE_REQUEST,		///客户端请求领取宝箱奖励
	GM_CHESTSACHIEVE_RETURN,		///回调,
	GM_OTHERFB_UNLOCK_REQUES,		///客户端请求其他副本解锁信息（征战三荒）,
	GM_OTHERFB_UNLOCK_RETURN,		///回调,
	GM_FBDRAWCARD_REQUEST,          //翻牌请求
    GM_FBDRAWCARD_RETURN,           //翻牌结果
    GM_SWEEPOBJECT_REQUEST,			///逻辑服务器向副本服务器请求扫荡物品,
	GM_SWEEPOBJECT_RETURN,          ///回调,
    /****************************************战役模块**************************************************/
    /*****************************开服礼包模块************************************/
    SM_OPENSERVERGIFT_DATA_REQUEST = 23700,             //向数据库请求玩家商城购买数据
    SM_OPENSERVERGIFT_DATA_RETURN,
    GM_OPENSERVERGIFT_REQUEST,                          //请求开服礼包奖励数据
    GM_OPENSERVERGIFT_RETURN,
    GM_OPENSERVERGIFT_INFO_REQUEST,                     //请求开服礼包个人购买数据
    GM_OPENSERVERGIFT_INFO_RETURN,
    GM_OPENSERVERGIFT_BUY_REQUEST,                      //请求购买开服礼包
    GM_OPENSERVERGIFT_BUY_RETURN,

    SM_LUCKYWHEEL_DATA_REQUEST = 23800,             //向数据库请求玩家幸运转盘数据
    SM_LUCKYWHEEL_DATA_RETURN,
    GM_LUCKYWHEELOPEN_REQUEST,                      //请求幸运转盘数据
    GM_LUCKYWHEELOPEN_RETURN,
    GM_LUCKYWHEELINFO_REQUEST,                      //请求幸运转盘个人数据
    GM_LUCKYWHEELINFO_RETURN,
    GM_LUCKYWHEEL_REQUEST,                          //请求抽取幸运转盘
    GM_LUCKYWHEEL_RETURN,
    GM_LUCKYWHEEL_Notify,                           //通知

    GM_NOTICE_REQUEST,                              //请求游戏公告信息
    GM_NOTICE_RETURN,
    GM_NOTICE_CLICK_REQUEST,                        //领取公告奖励
    GM_NOTICE_CLICK_RETURN,

    SM_MALLLIMITBUY_DATA_REQUEST,                       //向数据库请求玩家商城抢购数据
    SM_MALLLIMITBUY_DATA_RETURN,
    GM_MALLLIMITBUY_REQUEST,                            //请求商城抢购奖励数据
    GM_MALLLIMITBUY_RETURN,
    GM_MALLLIMITBUY_INFO_REQUEST,                       //请求商城抢购个人购买数据
    GM_MALLLIMITBUY_INFO_RETURN,
    GM_MALLLIMITBUY_BUY_REQUEST,                        //请求购买商城抢购
    GM_MALLLIMITBUY_BUY_RETURN,

    SM_DIAMONDGOD_DATA_REQUEST,                     //向数据库请求玩家财神到信息
    SM_DIAMONDGOD_DATA_RETURN,
    GM_DIAMONDGOD_INFO_REQUEST,
    GM_DIAMONDGOD_INFO_RETURN,
    GM_DIAMONDGOD_REQUEST,
    GM_DIAMONDGOD_RETURN,
    GM_DIAMONDGOD_Notify,
    GM_DIAMONDGOD_JOIN_REQUEST,
    GM_DIAMONDGOD_LEAVE_REQUEST,
    GM_DIAMONDGOD_OPEN_RETURN,
    GM_DIAMONDGOD_CLOSE_RETURN,
    /*****************************开服礼包模块结束********************************/

    /*****************************资源回收模块********************************/
    SM_FINDRESOURCE_REQUEST = 23900,
    SM_FINDRESOURCE_RETURN,
    GM_FINDRESOURCE_OPEN_REQUEST,               //请求打开资源回收界面
    GM_FINDRESOURCE_OPEN_RETURN,
    GM_FINDRESOURCE_REQUEST,                    //请求回收资源
    GM_FINDRESOURCE_RETURN,
    GM_FINDRESOURCE_ONEKEY_REQUEST,
    GM_FINDRESOURCE_ONEKEY_RETURN,
    /*****************************资源回收模块结束********************************/

    /*****************************修炼日模块********************************/
    SM_PRACTICEDAY_REQUEST = 24000,
    SM_PRACTICEDAY_RETURN,
    SM_PRACTICEDAY_TASK_REQUEST,                //向数据库请求玩家修炼日任务数据
    SM_PRACTICEDAY_TASK_RETURN,
    SM_PRACTICEDAY_LIMITBUY_REQUEST,            //向数据库请求玩家修炼日限购数据
    SM_PRACTICEDAY_LIMITBUY_RETURN,
    SM_PRACTICEDAY_EXCHANGE_REQUEST,            //向数据库请求玩家修炼日兑换数据
    SM_PRACTICEDAY_EXCHANGE_RETURN,

    GM_PRACTICEDAY_INFO_REQUEST,                //请求修炼日每日界面信息
    GM_PRACTICEDAY_INFO_RETURN,
    GM_PRACTICEDAY_TASK_REQUEST,                    //请求领取每日任务
    GM_PRACTICEDAY_TASK_RETURN,
    GM_PRACTICEDAY_EXCHANGE_REQUEST,                //请求兑换道具
    GM_PRACTICEDAY_EXCHANGE_RETURN,
    GM_PRACTICEDAY_LIMITBUY_REQUEST,                //超值限购
    GM_PRACTICEDAY_LIMITBUY_RETURN,
    GM_PRACTICEDAY_RECHARGE_REQUEST,                //领取充值奖励
    GM_PRACTICEDAY_RECHARGE_RETURN,

    GM_PRACTICEDAY_JOIN_REQUEST,
    GM_PRACTICEDAY_LEAVE_REQUEST,
    GM_PRACTICEDAY_Notify,
    GM_PRACTICEDAY_Task_Notify,                     //任务完成
    GM_PRACTICEDAY_OPEN_RETURN,                     //活动开启
    GM_PRACTICEDAY_CLOSE_RETURN,                    //活动关闭
    GM_PRACTICEDAY_Recharge_Notify,                 //充值变化通知

    /*****************************修炼日模块结束********************************/

    /*****************************符文系统模块********************************/
    SM_RUNES_REQUEST = 24100,                       //向数据库请求玩家符文数据
    SM_RUNES_RETURN,
    SM_RUNES_GRID_REQUEST,                      //向数据库请求符文槽位数据
    SM_RUNES_GRID_RETURN,
    SM_RUNES_PACKAGE_REQUEST,                   //向数据库请求玩家符文背包数据
    SM_RUNES_PACKAGE_RETURN,

    GM_RUNES_INFO_REQUEST,                      //请求符文系统界面信息
    GM_RUNES_INFO_RETURN,
    GM_RUNES_MOUNT_REQUEST,                     //请求镶嵌符文
    GM_RUNES_MOUNT_RETURN,
    GM_RUNES_LEVELUP_REQUEST,                   //请求升级符文
    GM_RUNES_LEVELUP_RETURN,
    GM_RUNES_DECOMPOSE_REQUEST,                 //请求分解符文
    GM_RUNES_DECOMPOSE_RETURN,
    GM_RUNES_COMPOSE_REQUEST,                   //请求合成符文
    GM_RUNES_COMPOSE_RETURN,

    SM_RUNES_COPY_REQUEST = 24130,                  //向数据库请求玩家符文副本数据
    SM_RUNES_COPY_RETURN,
    GM_RUNES_COPY_REQUEST = 24140,                  // 请求挑战符文副本
    GM_RUNES_COPY_RETURN,
    GM_RUNES_COPYINFO_REQUEST,                      // 请求符文副本信息
    GM_RUNES_COPYINFO_RETURN,
    GM_RUNES_CopyNotify,                            // 通关副本发生改变
    GM_RUNES_COPY_BUY_REQUEST,                      // 符文副本次数购买
    GM_RUNES_COPY_BUY_RETURN,

    SM_RUNES_TREASURE_REQUEST = 24150,              //向数据库请求玩家符文寻宝数据
    SM_RUNES_TREASURE_RETURN,

    GM_RUNESTREASURE_INFO_REQUEST,                  //请求符文寻宝个人信息
    GM_RUNESTREASURE_INFO_RETURN,
    GM_RUNESTREASURE_REQUEST,                       //请求抽取符文
    GM_RUNESTREASURE_RETURN,
    GM_RUNESTREASURE_RECORD_REQUEST,                //请求符文抽取记录
    GM_RUNESTREASURE_RECORD_RETURN,
    GM_RUNESTREASURE_Notify,                        //符文抽取通知
    GM_RUNESTREASURE_JOIN_REQUEST,                  //打开符文寻宝界面
    GM_RUNESTREASURE_LEAVE_REQUEST,                 //关闭符文寻宝界面

    GM_RUNESTREASURE_BUY_REQUEST,                   //请求购买符文商店商品
    GM_RUNESTREASURE_BUY_RETURN,

    GM_RUNE_GETITEM_NOTIFY,                         //获取物品通知
    GM_RUNES_UNLOCKLEFT_REQUEST,                        //请求解锁左符文槽
    GM_RUNES_UNLOCKLEFT_RETURN,
    GM_RUNES_UNLOCKRIGHT_REQUEST,                       //请求解锁右符文槽
    GM_RUNES_UNLOCKRIGHT_RETURN,

    /*****************************符文系统模块结束********************************/

    /*****************************节日活动模块********************************/
    SM_HOLIDAY_REQUEST = 24200,
    SM_HOLIDAY_RETURN,
    SM_HOLIDAY_COLLECT_REQUEST,             //向数据库请求玩家采集数据
    SM_HOLIDAY_COLLECT_RETURN,


    GM_HOLIDAY_INFO_REQUEST,                        //请求节日活动界面基础信息
    GM_HOLIDAY_INFO_RETURN,
    GM_HOLIDAY_PERSONINFO_REQUEST,                  //请求节日活动动态数据
    GM_HOLIDAY_PERSONINFO_RETURN,
    GM_HOLIDAY_EXCHANGE_REQUEST,                    //请求兑换奖励
    GM_HOLIDAY_EXCHANGE_RETURN,
    GM_HOLIDAY_COLLECT_REQUEST,                     //请求是否可以采集活动采集物
    GM_HOLIDAY_COLLECT_RETURN,
    GM_HOLIDAY_OPEN_RETURN,                         //通知有新的节日活动开启
    GM_HOLIDAY_CLOSE_RETURN,                        //通知节日活动关闭
                                                    /*****************************节日活动模块结束********************************/

    /*****************************聊天验证模块********************************/
    SM_CHATCHECK_REQUEST = 24300,
    SM_CHATCHECK_RETURN,
    SM_CHATCHECK_REPORT_REQUEST,                    //
    SM_CHATCHECK_REPORT_RETURN,
    SM_CHATCHECK_REPORTINFO_REQUEST,                    //
    SM_CHATCHECK_REPORTINFO_RETURN,
    SM_CHATCHECK_RECORD_REQUEST,                    //
    SM_CHATCHECK_RECORD_RETURN,

    GM_CHECKCHAT_REPORT_REQUEST,                    //举报玩家
    GM_CHECKCHAT_REPORT_RETURN,
    GM_CHECKCHAT_VERIFY_REQUEST,                    //验证问题
    GM_CHECKCHAT_VERIFY_RETURN,

    GM_CHATCHECK_SEALLEFT_NOTIFY,                   //封禁通知
    GM_CHATCHECK_NOTIFY,                            //验证通知
    GM_CHATCHECK_LOADVERIFY,                        //上传验证信息
    GM_CHATCHECK_LOADREPORT,                        //上传举报信息

    SM_PUSHCHAT_REQUEST = 24400,                        //推送聊天信息		1377平台特定需求	

    /*****************************聊天验证结束********************************/

    /****************************极品装备模块********************************/
    GM_BESTEQUIP_REQUEST = 24450,                               //请求单个极品装备属性
    GM_BESTEQUIP_RETURN,
    GM_BESTEQUIP_UPGRADESTAR_REQUES,                    //请求极品装备升星
    GM_BESTEQUIP_UPGRADESTAR_RETURN,
    GM_BESTEQUIP_STRENGTH_REQUEST,                      //请求极品装备强化
    GM_BESTEQUIP_STRENGTH_RETURN,
    GM_BESTEQUIP_CLEAR_REQUEST,                         //请求极品装备洗练
    GM_BESTEQUIP_CLEAR_RETURN,
    GM_BESTEQUIP_CLEAR_REPLACE_REQUEST,                 //请求替换洗练属性
    GM_BESTEQUIP_CLEAR_REPLACE_RETURN,

    SM_BESTEQUIP_REQUEST,                           //向DB请求玩家极品装备数据
    SM_BESTEQUIP_RETURN,
    SM_BESTEQUIP_DETAIL_REQUEST,                    //向DB请求玩家极品装备细节数据
    SM_BESTEQUIP_DETAIL_RETURN,
    /****************************极品装备模块结束********************************/

    GM_PLAYER_OTHER_REQUEST = 24500,                    // 查看其它玩家基本信息（无显示信息）  4坐骑
    GM_PLAYER_OTHER_PLAYER_RETURN,                  // 人物信息
    GM_PLAYER_OTHER_PROPERTY_RETURN,                // 属性信息
    GM_PLAYER_OTHER_SKILL_RETURN,                   // 技能信息
    GM_PLAYER_OTHER_PET_RETURN,                     // 伙伴信息
    GM_PLAYER_OTHER_TITLE_RETURN,                   // 称号信息
    GM_PLAYER_OTHER_SUITEQUIP_RETURN,               // 套装信息
    GM_PLAYER_OTHER_RIDE_RETURN,
    GM_PLAYER_OTHER_WING_RETURN,
    GM_PLAYER_OTHER_FOOT_RETURN,                    // 足迹信息
    GM_PLAYER_OTHER_TRUMP_RETURN,                   // 玄兵
    GM_PLAYER_OTHER_XIANQI_RETURN,                  // 仙器
    GM_PLAYER_OTHER_ARTIFACT_RETURN,                // 法宝
    GM_PLAYER_OTHER_GODWEAPON_RETURN,               // 神兵
    GM_PLAYER_OTHER_FIELD_RETURN,                   // 领域
    GM_PLAYER_OTHER_MUSTDONE_RETURN,                // 道铠
    GM_PLAYER_OTHER_RUNE_RETURN,                    // 符文
    GM_PLAYER_OTHER_NOTIFY,                         // 通知客户端 玩家数据获取中

    GM_PLAYER_OTHER_COMPARE_REQUEST,                // 查看对比信息
    GM_PLAYER_OTHER_COMPARE_RETURN,

    GATE_MESSAGE_GAME_SERVER_END = 100000,
    /***************************网关服务器分配网络包消息id段结束：GameServer*****************************************/


    /***************************副本服务器分配网络包消息id段：FBServer*****************************************/
    GATE_MESSAGE_CROSS_SERVER_BEGIN = 100001,
    //***************************************副本消息*******************************************/
    GM_REGISTER_FBSERVER,//注册副本服务器
    GM_REQUEST_ACTIVENUM,//请求副本服务器，服务器负载量
    GM_REQUEST_ACTIVENUM_RETURN,////返回逻辑服务器 服务器负载量

    // 	GM_REQUEST_BATTLE,			///战斗总接口
    // 	GM_REQUEST_BATTLE_RETURN,	//请求创建副本返回
    // 	GM_FBSERVERINFO_RETURN,		///副本服务器信息返回,通过这个信息链接到副本服务器
    // 	GM_LOGINFB_REQUEST,			//玩家登陆副本服务器请求
    // 	GM_LOGINFB_RETURN,			//玩家登陆副本服务器返回
    // 	GM_BATTLE_NEW_CHARACTER,	//广播有新玩家加入副本
    // 	GM_SEND_READY,				//客户端通知加载完成
    // 	GM_NOTIFY_BATTLEENDTIME,	//发送战斗结束时间包
    // 	GM_ACTIVE_BIGWAVE_REQUEST,	//通知激活怪物
    // 	GM_ACTIVE_BIGWAVE_RETURN,	//返回通知
    // 	GM_CLIENT_NOTIFY_DIED,		//客户端通知死亡事件
    // 	GM_BATTLE_RESULT,			//战斗结果
    // 	GM_ALL_CHARACTERINFO,		//获取所有角色信息
    // 	GM_INFORM_OBJECT_ACTION,    //动作包
    // 	GM_BROADCAST_OBJECT_ACTION, //动作包转发给其他角色
    // 	GM_BROADCAST_BATTLESCENE_LEAVE, //角色离开
    // 	GM_GODLIKE,					//通关副本
    // 	GM_NOTIFY_DIED,				//通知对象死亡
    // 	GM_AI_CONCTROL,				//AI控制权限
    // 	GM_ATTACK,					//攻击处理
    // 	GM_ATTACK_RETURN,			//攻击返回
    // 	GM_BROADCAST_HPMPNOW_CHANGE,//广播掉血
    // 	GM_NOTIFY_BACK,				//客户端主动离开副本
    // 	GM_REPLACE_PET_REQUESET,	//宠物替换
    // 	GM_REPLACE_PET_RETURN,		//宠物替换返回
    // 	GM_SYNC_MOVEMENT,			//副本位置同步信息
    // 	GM_NOTIFY_RELIVE,			//通知客户端重生
    // 	GM_NOTIFY_RELIVE_TIME,		//通知客户端重生倒计时
    // 	GM_PET_BATTLEINFO,			//宠物位置信息
    // 	GM_NOTIFY_POINT_CHANGE,		//通知客户端积分信息(包括采集点)
    // 	SM_NOTIFY_CLIENT_OFFLINE,	//通知客户端离线
    // 	GM_NOTIFY_ADDBUFF,			//添加buff
    // 	GM_NOTIFY_REMOVEBUFF,		//移除buff
    // 	GM_CLIENT_STORY_TIME,		//获取副本剧情占时
    // 	GM_TAKE_PLAYERBACK,			//把玩家拉回去
    // 	GM_CHANGE_PLAYERTOAI,		//修改玩家成机器人
    // 	SM_KICKOUT_FB,				//超时被提出副本
    // 	GM_CLIENT_DROPHP,			//客户端通知掉血
    // 	GM_CLIENT_NOTIFY_SPECIALSKILL,	//客户端通知稀有技使用
    // 	SM_NOTIFY_DATARELOAD,			//通知副本服务器更新
    // 	GM_NORMOLFB_BOSSSHOW,			//boss出现
    // 	GM_NOTIFYFB_LOGINFB,		//通知副本登陆完成
    // 	GM_CLIENT_NOTIFY_RELIVE,		//客户端通知玩家复活（用于buff）
    // 	GM_CLIENT_STOPTIME,			//普通副本暂停时间
    // 	GM_CLIENT_SUMMON,			//客户端请求召唤新对象
    // 	GM_BROADCAST_PET_VISIBLE,	//通知客户端宠物可见性
    // 	GM_BROADCAST_PET_INVISIBLE,	//通知客户端宠物不可见性
    // 	GM_UNSTOP_TIME,				//暂停结束后时间
    // 	GM_CLIENT_RunesShow,		// 符文数据
    // 	GM_CLIENT_RunesCreate,		// 符文创建
    // 	GM_CLIENT_RunesDestory,		// 符文销毁
    // 	GM_CLIENT_SENDBUFFS,		// 发送对象的buffs信息
    // 	GM_CLIENT_MPCHANGE,			// 客户端通知蓝变化
    // 	GM_CHAOSBUFF_CHANGE,		//通知客户端混沌战场buff层数和杀怪数改变
    // 	GM_TEAMBUFF_CHANGE,			//通知客户端勇气之煞buff携带者改变


    //-----------------------------------------------------------新模块开始--------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------场景交互+战斗---------------------------------------------------------------------------------------
    GM_MOVE_REQUEST = 110000,                           ///客户端请求移动
	GM_MOVE_RETURN,                                        ///如果玩家出错，返回结果
	GM_MOVE_BROCAST,                                      ///广播玩家移动
	GM_SKILLRELEASE_REQUEST,                           ///客户端请求释放技能
	GM_SKILLRELEASE_RETURN,                             ///如果玩家技能出错，返回结果
	GM_SKILLRELEASE_BROCAST,                           ///广播玩家释放技能
	GM_DROPBLOOD_BROCAST,                            ///广播掉血
	GM_SURFACECHANGE_BROCAST,                    ///广播外观改变
	GM_ADDBLOOD_BROCAST,                              ///加血广播
	GM_SPECIALSTATE_BROCAST,                          ///特殊状态广播
	GM_ITEMDROP_BROCAST,                               ///广播物品掉落
	GM_LOGINSCENE_REQUEST,                            ///客户端请求登入场景服务器
	GM_LOGINSCENE_RETURN,                              ///返回登入结果
	GM_OBJECITTOSCENE_BC,                               ///广播进人场景
	GM_OBJECTDIE_BC,                                         ///广播角色死亡
	GM_OBJECTRELIVE_BC,                                    ///广播角色重生
	GM_OBJECOUTSCENE_BC,                               ///广播退出场景
	GM_OBJECTMOVEOUT_BC,                             ///广播移出视线
	GM_PLAYERLOGININFO_REQUEST,                 ///场景服务器向逻辑服务器请求玩家场景显示信息
	GM_PLAYERLOGININFO_RETURN,              ///逻辑服务器返回玩家场景显示信息
	GM_NOTIFYSCENEOUTLINE,                           ///逻辑服务器通知场景服务器玩家下线
	GM_SCENEINFO_REQUEST,                             ////客户端请求场景信息
    GM_SCENEINFO_RETURN,                              ///逻辑服务器返回玩家场景坐标信息
	GM_LOCKENEMY_REQUEST,                           ///客户端请求锁定敌人
	GM_LOCKENEMY_RETURN,                             ///返回锁定结果
	GM_PICKUPITEM_REQUEST,                           ///客户端请求拾取物品
	GM_PICKUPITEM_RETURN,                             ///返回物品拾取结果
	GM_ADDEXPINFORM,                                    ///场景服务器通知逻辑服务器加经验
	GM_NOTIFYPLAYEREVENT,                            ///逻辑服务器通知场景服务器事件
	GM_NOTIFYPLAYERLEVELUP,                         ///通知玩家升级
	GM_NOTIFYPLAYER_REMOVE,                       ///将玩家从场景中移除，警告：不是从内存中移除
	GM_NOTIFYPLAYER_INTO,                             ///让玩家加入到场景
	GM_NOTIFYDELEPLAYER,                               ///将玩家删除，从内存中删除
	GM_NOTIFYGANGCHANGE,                           ///逻辑服务器通知场景服务器公会发生改变
	GM_PLAYERLEVELUP_BC,                              ///广播玩家升级
	GM_SKILLCHANGE_INFORM,                        ///逻辑服务器通知场景服务器玩家技能数据改变
	GM_BUFFCHANGE_INFORM,                        ///逻辑服务器通知场景服务器buff数据改变
	GM_PLAYERFIGHTDATA_SEND,                     ///逻辑服务器将战斗数据发送给场景服务器
	GM_FLY_REQUEST,                                       ///客户端请求传送
	GM_FLY_RETURN,                                         ///返回传送结果
	GM_CANCELLOCK_REQUEST,                        ///客户端请求取消锁定
	GM_RELIVE_REQUEST,                                  ///客户端请求复活
	GM_RELIVE_RETURN,                                    ///返回复活结果
	GM_HPMPCHANGE_INFORM,                      ///通知客户端和逻辑服务器血量和蓝量改变
	GM_MONSTERKILL_INFORM,                       ///通知逻辑服务器怪物死亡
	GM_CREATCOPY_REQUEST,                          ///逻辑服务器向副本服务器请求登入场景
	GM_CREATCOPY_RETURN,                            ///通知逻辑服务器副本创建成功
	GM_INTOCOPY_INFORM,                             ///逻辑服务器通知玩家进人副本服务器
	GM_PLAYERINTOSCENE_INFORM,                ///通知逻辑服务器玩家进人场景
	GM_COUNTCOPYTOCLIENT_BASEPVE,         ///普通pve副本通知客户端结算
	GM_COUNTCOPYTOSERVER_BASEPVE,        ///通知逻辑服务器玩家副本结算
	GM_EXITCOPY_REQUEST,                             ///玩家请求退出副本
	GM_EXITCOPY_INFORM,                              ///通知逻辑服务器玩家退出副本
	GM_NOTIFYINTOSCENE,                              ///逻辑服务器通知客户端进人场景
	GM_CHOOSECARD_REQUEST,                      ///玩家请求翻牌
	GM_CHOOSECARD_RETURN,                       ///返回玩家翻牌结果
	GM_ADDITEM_INFORM,                              ///场景服务器通知逻辑服务器给玩家加道具，如果背包满了，发送邮件
	GM_TIMEOUT_REQUEST,                             ///客户端请暂停副本
	GM_TIMEOUT_RETURN,                              ///返回玩家暂停副本结果
	GM_COPYINFO_RETURN,                           ///服务器返回客户端副本基础信息
	GM_TIMEOUTCANCel_REQUEST,                ///客户端请求取消暂停副本
	GM_TIMEOUTCANCel_RETURN,                  ///返回取消暂停结果
	GM_FLASHMOVE_BC,                                 ///通知客户端有物体瞬移
	GM_FLASHMOVE_REQUEST,                       ///客户端请求瞬移
	GM_FLASHMOVE_RETURN,                         ///返回瞬移结果
	GM_ADDBUFF_BC,                                      //////广播给物体施加buff
    GM_REMOVEBUFF_BC,                               ///广播移出buff
	GM_BUFFTIGGER_INFORM,                        ///通知玩家buff触发
	GM_BOSSTIME_REQUEST,                          ///逻辑服务器请求boss刷新时间
	GM_BOSSTIME_RETURN,                           ///场景服务器返回boss刷新时间
	GM_WLZD_SETTLE,                                   ///武练之道结算
	GM_WLZD_SETTLE_CLIENT,                      ///武练之道结算通知客户端
	GM_ARENA_SETTLE,                                 ///竞技场副本服务器通知逻辑服务器结算
	GM_ARENA_SETTLE_CLIENT,                    ///逻辑服务器返回
	GM_CLOSECOPY_NOTIFY,                       ///通知副本服务器关闭某个副本
	GM_HBLYCOPY_SETTLE,                          ///副本服务器通知逻辑服务器结算(寒冰炼狱)
	GM_HBLYCOPY_SETTLE_CLIENT,             ///通知客户端结算（寒冰炼狱）
	GM_INTOCOPYAGAIN_INFORM,            ///副本服务器通知客户端重新进入副本
	GM_RELIVEKIND_INFORM,                     ///通知客户端复活类型
	GM_CALLINFO_RETURN,                        ///通知客户端召唤物血量
	GM_LINGSHOUDAOBRUSH_INFORM,    ///通知客户端灵兽刷新
	GM_LINGSHOUSAVE_INFORM,              ///通知客户端灵兽信息
	GM_WAVEINFO_NOTIFY,                       ///通知客户端当前波数
	GM_FIGHTDATACHANGE_INFORM,       ///通知客户端战斗属性改变
	GM_PICKUPBUFF_REQUEST,                  ///客户端请求拾取buff
	GM_PICKUPBUFF_RETURN,                    ///返回拾取结果
	GM_PICKBUFF_BC,                                 ///广播玩家拾取buff
	GM_WUDAOHUI_SETTLE,                       ///通知逻辑服务器结算
	GM_WUDAOHUI_SETTLE_CLIENT,           ///通知客户端结算
	GM_SPECIALSHOW_NOTIFY,                  ///通知客户端显示特效
	GM_ZHENMOTA_SETTLE,                       ///通知逻辑服务器镇魔塔结算
	GM_ZHENMOTA_SETTLE_CLIENT,          ///通知客户端结算
	GM_FOCUSSYSTIME_REQUEST,             ///向客户端发送求延时包
	GM_FOCUSSYSTIME_RETURN,              ///客户端回报
	GM_SERVERTIME_INFORM,                  ///向客户端发送服务器时间和延时，实现对时
	GM_CLICKSKILLBUTTON_REQUEST,      ///客户端点击技能按钮
	GM_CLICKSKILLBUTTON_RETURN,       ///返回点击结果
	GM_CLICKSKILLBUTTON_BC,               ///广播客户端点击技能按钮
	GM_BOSSCOPY_SETTLE,                      ///boss战通知逻辑服务器结算
	GM_BOSSCOPY_SETTLE_CLIENT,          ///通知客户端结算
	GM_OPENACTIVEINSCENE,///逻辑服务器通知场景服务器开启活动
	GM_CLOSEACTIVEINSCENE,///逻辑服务器通知场景服务器关闭活动
	GM_PICKUPSPECIALITEM_REQUEST,///客户端请求拾取特殊道具
	GM_PICKUPSPECIALITEM_RETURN,///返回客户端消息
	GM_PICKUPSPECIALITEMTOGAMESERVER_REQUEST,///发送到逻辑服务器看是否能够拾取
	GM_PICKUPSPECIALITEMTOGAMESERVER_RETURN,///逻辑服务器返回能否拾取
	GM_PICKUPSPECIALITEM_INFORM,///通知逻辑服务器拾取特殊物品
	GM_PLAYERINTOCOPY_REQUEST,///通过副本gmid让玩家进人该副本
	GM_PLAYERINTOCOPY_RETURN,///返回玩家进人副本结果
	GM_COMMITSPECIALITEM_REQUEST,///客户端请求提交特殊道具
	GM_COMMITSPECIALITEM_RETURN,///返回客户端提交结果
	GM_COMMITSPECIALITEM_INFORM,///通知逻辑服务器玩家提交特殊物品
	GM_PLAYER_PILLADDHP_REQUEST,// 增加玩家血量
    GM_PLAYER_PILLADDMP_REQUEST,// 增加玩家蓝
    GM_FSZZ_KILLMONSTER_INFORM,///通知逻辑服务器玩家击杀怪物
	GM_FSZZ_KILLPLAYER_INFORM,///通知逻辑服务器玩家击杀其他玩家
	GM_BOSSOWN_BC,              ///广播boss拥有者
	GM_CHANGEKILLSTATE_REQUEST,  ///客户端请求修改攻击状态
	GM_CHANGEKILLSTATE_RETURN,  ///返回客户端修改攻击状态结果
	GM_PLAYERDIE_INFORM,///通知逻辑服务器玩家死亡
	GM_PLAYERDIEDROP_INFORM,///逻辑服务器通知场景服务器玩家死亡掉落
	GM_KILLBYTHUNDER_INFORM,///通知场景玩家被雷击杀
	GM_PETINFO_INIT,           ///通知初始化场景服务器宠物信息
	GM_PETSHOWINFOCHANGE_INFORM,///通知场景服务器宠物显示改变
	GM_PETSHOWINFO_BC,          ///广播玩家宠物显示改变
	GM_PETBUFFCHANGE_INFORM,  ///通知场景服务器宠物技能修改
	GM_PETRELEASESKILL_REQUEST,  ///玩家请求宠物释放技能
	GM_PETRELEASESKILL_RETURN,///返回宠物释放技能结果
	GM_PETRELEASESKILL_BC,        ///广播宠物释放技能
	GM_PETFIGHTDATECHANGEINFORM,///通知场景服务器宠物属性改变
	GM_COPYPLAYERDIE_RETURN,     ///场景服务器返回玩家被击杀信息,
	GM_LIANZHAN_RETURN,     ///场景服务器通知客户端玩家连斩信息,
	GM_LIANZHAN_CHATINFO,     ///场景服务器通知逻辑服广播连斩信息,
	GM_GAMESETTLE_OVER,         // 通用副本结算
    GM_GAMESETTLE_OVER2Client,  // 通用通知客户端副本结算,
    GM_OBJECTPOSITION_REQUEST,  ///玩家请求场景对象位置信息
	GM_OBJECTPOSITION_RETURN,   ///返回玩家视野里的怪物信息
	GM_MONSTEROBJECTMISHI_RETURN,   ///通知客户端怪物迷失状态变化,
	GM_INSTANCE_CHANGECOPY,		///玩家直接在副本间切换
	GM_PLAYERDIEDROP_CLIENT,	///服务器通知玩家死亡掉落物品
	GM_FLY_GAME_REQUEST,		///通知飞鞋给逻辑服务器
	GM_FLY_GAME_RETURN,			///飞鞋给逻辑服务器回报
	GM_BATTLESTATECHANGE_INFORM,///通知客户端战斗状态改变
	GM_SAVESHIHUA_REQUEST,///客户端请求解决石化玩家
	GM_SAVESHIHUA_RETURN,///返回解决结果
	GM_ACTIVESCENEINFO_REQUEST,///客户端请求活动的场景信息
	GM_ACTIVESCENEINFO_RETURN, ///返回请求活动场景信息结果
	GM_REPLACECTRLINFO_RETURN, ///返回化身控制信息,
	GM_BOSSOWN_REQUEST,///客户端请求boss拥有者
	GM_BOSSOWN_RETURN,///返回玩家请求boss拥有者结果
	GM_LOADINGOVER_INFORM,///客户端通知服务器进人副本加载完成
	GM_GOTOCOPY_INFORM,///玩家加载资源完成通知客户端进人副本
	GM_COPYINFORMGAMEPLAYERINIT,///副本服务器通知逻辑服务器，玩家数据初始化完，可以通知客户端进人副本
	GM_PLAYERSHOWBUFF_REQUEST,// 玩家副本信息请求
    GM_PLAYERSHOWBUFF_RETURN,
    GM_COPYOVER_INFORM,///通知客户端副本结束
	GM_NOTIFYROLECHANGE,                           ///逻辑服务器通知场景服务器玩家名字改变
	GM_ROLENAMECHANGE_BROCAST,                  // 广播玩家名字改变
    GM_REPLACECTRLINFO_CHECK,					///化身控制结果
	GM_SCENE_FIGHTDATA_REQUEST,					/// 玩家重登场景获取战斗数据
	GM_SCENE_FIGHTDATA_RETURN,

    GM_CLIMBTOWER_SETTLE,                      ///爬塔通知逻辑服务器结算
	GM_CLIMBTOWER_SETTLE_RETURN,                        //通知客户端爬塔结果

    GM_SCENE_SKILL_RELEASE_NOTIFY,              // 通知技能释放
    GM_EVILKILL_BC,                                     ///广播玩家杀戮状态
	GM_BATTLETIME_NOTIFY,                       ///通知玩家进人战斗状态
	GM_CANGANGASSIST_NOTIFY,               ///通知玩家可以仙盟求助
	GM_GANGASSIST_REQUEST,                    ///玩家请求仙盟求助
	GM_GANGASSIST_BC,                              ///向本仙盟玩家广播求助
	GM_GANGASSISTNOTASSITST_REQUEST, ///设置本次登入不收到仙盟求助
	SM_GANGNAMECHANGE_NOTIFY,                         /// 逻辑服务器通知仙盟改名
	GM_INSTANCE_CAMP_NOTIFY,                         /// 副本中通知玩家阵营变化

    SM_SPECIALFLY_REQUEST,          // 逻辑服务器飞场景,包含特殊场景
    SM_SPECIALFLY_RETURN,
    GM_SPECIALFLY_RETURN,           // 客户端飞特殊场景提示
    GM_SCENE_BUFF_RELEASE_NOTIFY,   // 通知Buff技能释放

    GM_KILLADDVALUE_NOTIFY, ////通知玩家增加杀戮值
    GM_CUSTOMOBJECT_BROCAST,                               ///广播自定义对象
	GM_HOLIDAY_ACTIVITY_BRUSH,                  // 节日活动刷怪通知
    GM_HOLIDAY_ACTIVITY_CLEAR,                  // 清除节日活动怪物通知
    GM_CLOSECOPY_COPYID_NOTIFY,                       ///通知副本服务器copyid的副本
	GM_DROPITEM_OWNCHANGE_NOTIFY,               ///通知 掉落物权限变化
	GM_SCENECAMP_NOTIFY,                        // 阵营变化通知
    GM_FLYOVER_NOTIFY,                          // 传送完成通知
    GM_HYQYDROP_NOTIFY,                     ///荒野奇袭掉落
	GM_SKILLBREAKOFF_BROCAST,               ///广播玩家技能被打断
	SM_JINGPO_NOTIFY,						 /// 通知逻辑服务器精魄获取
	SM_JINGPO_COPYDROP_NOTIFY,				/// 通知逻辑服务器精魄获取
	SM_JINGPO_BUFFPLUS_NOTIFY,				/// 通知逻辑服务器精魄获取
	SM_JINGPO_JINGPODROP_NOTIFY,            // 通知精魄掉落数量变化
    SM_JINGPO_JINGPODROP_RESET,             // 重置精魄掉落


    //--------------------------------------------------------场景交互基础消息end------------------------------------------------------------------------------------
    GM_BONFIRE_KILLMONSTER = 110500,        // 篝火击杀晶石
    GM_BONFIRE_INFO_REQUEST,    // 篝火信息请求
    GM_BONFIRE_INFO_RETURN,
    GM_BONFIRE_BLOOD_NOTIFY,    // 篝火晶石血量改变
    GM_BONFIRE_NOTIFY_RELIVE,   // 通知game玩家死亡传送回原场景
    GM_BONFIRE_RELIVE_ORI,      // 玩家死亡传送回原场景
    GM_BONFIRE_DIE_NOFITY,      // 篝火玩家死亡通知

    GM_FENGSHENZHIZHANKILL_INFORM = 110520,///通知逻辑服务器封神之战击杀事件
	GM_SSJSINFO_INFORM,        ///通知玩家神圣晶石信息改变
	GM_PlAYERINTOSSJSAREA_INFORM,///场景服务器通知逻辑服务器玩家神圣晶石活动区域变化

    GM_XIANWU_CHALLENGERINFO = 110530,  // 仙武之巅逻辑服通知场景服将当前挑战玩家传入挑战的坐标, 
    GM_XIANWU_GAMERESULT,   // 仙武之巅场景服通知逻辑服挑战结果,
    GM_XIANWU_STOPMOVE, // 仙武之巅场景停止移动
    GM_XIANWU_CANMOVE,  // 仙武之巅场景继续移动

    GM_DEFEND_COPYINFO_REQUEST = 110600,    // 请求守护副本信息
    GM_DEFEND_COPYINFO_CLIENT,  // 发送客户端守护副本信息
    GM_DEFEND_DAMAGE_NOTIFY,    // 守护玩家对怪物伤害
    GM_DEFEND_SETTLE,           // 守护结算包
    GM_DEFEND_BIGWAVE_NOTIFY,   // 通知当前守护波数
    GM_DEFEND_INVASIVE_NOTIFY,  // 通知闯入的怪物数量
    GM_DEFEND_SETTLE_CLIENT,    // 守护副本结算

    GM_GANGWAR_SETTLE = 110620,         // 仙域争霸结算
    GM_GANGWAR_SETTLE_CLIENT,   // 发送客户端仙域争霸结算
    GM_GANGWAR_FIGHTDATA,       // 副本所需的公会信息
    GM_GANGWAR_GANGDATA_CLIENT, // 通知玩家战场仙盟信息
    GM_GANGWAR_ROLEDATA_CLIENT, // 通知玩家个人资源信息
    GM_GANGWAR_GANG_RES_NOTIFY, // 通知工会资源改变
    GM_GANGWAR_ROLE_RES_NOTIFY, // 通知玩家资源信息
    GM_GANGWAR_CANFIGHT_NOTIFY, // 通知玩家可以进入中间
    GM_GANGWAR_GOIN_CENTER_REQUEST,     // 仙域争霸玩家请求传送进战场中间
    GM_GANGWAR_GOIN_CENTER_RETURN,

    GM_GANGCITY_CHANES_STONE_HP = 110650,   // 仙盟城战改变外城的晶石血量包
    GM_GANGCITY_STATE_CHANGE_NOTIFY,        // 攻城战变化
    GM_GANGCITY_MONSTER_HP_NOTIFY,          // 怪物血量变化
    GM_IG_GANGCITY_STONE_DAMAGE,            // 仙盟城战晶石被攻击
    GM_IG_GANGCITY_STONE_DIE,               // 仙盟城战晶石死亡
    GM_IG_GANGCITY_STONE_ALLDIE,            // 仙盟城战所有晶石死亡
    GM_IG_GANGCITY_OPEN_SECOND,             // 开启第二个仙盟
    GM_IG_GANGCITY_FIRSTGMID_NOTIFY,        // 仙盟城战第一个副本第二副本copygmid
    GM_IG_GANGCITY_INNER_FLAG,              // 通知阵旗显示
    GM_IG_GANGCITY_INNER_SETTLE,            // 城战副本结算
    GM_IG_GANGCITY_INNER_RELIVE,            // 城战副本内城复活
    GM_IG_GANGCITY_INNER_DIE,               // 城战死亡通知
    GM_IG_GANGCITY_OUT_OVER,                // 通知第一场城战结束
    GM_IG_GANGCITY_ALL_OVER,                // 通知第二场城战结束

    GM_TRANSPORTDART_CREATE = 110700,   ///通知场景服创建镖车,
	GM_TRANSPORTDART_KILLSELF = 110701,   ///通知场景服镖车自杀,
	GM_TRANSPORTDART_DIE,   ///通知逻辑服镖车销往,
	GM_DOMAINFIELD_BROADCAST,   // 仙域战场通知

    GM_DART_INFO_REQUEST = 110720,  // 请求镖车信息
    GM_DART_INFO_RETURN,
    GM_DART_DIE_NOTIFY,// 镖车消亡通知

    SM_DART_INFO_REQUEST = 110740,  // 请求镖车信息
    SM_DART_INFO_RETURN,
    SM_DART_CREATE_REQUEST, // 请求镖车信息
    SM_DART_CREATE_RETURN,
    SM_DART_DIE_NOTIFY, //镖车死亡/消失(通知逻辑服处理)
    SM_DART_KillSelf_NOTIFY, // 让镖车自杀
    SM_DART_BEATTACKING_NOTIFY, // 镖车被攻击通知

    SM_GANGBOSS_SETTLE = 110750,            // 仙盟boss结算

    SM_VIPBOSSCOPY_SETTLE,                 /// Vip boss通知逻辑服务器结算
	GM_VIPBOSSCOPY_SETTLE_CLIENT,          /// 通知客户端Vip boss结算

    GM_GMTOOLS_UPDATE_TYPE = 110800,	/// 更新副本信息
	GM_GMTOOLS_UPDATE_LUA,			/// 更新lua
	GM_GMTOOLS_UPDATE_TABLE,		/// 更新基础表
	GM_SCENEBOSSINFO_UPDATE,///将场景boss击杀时间通知客户端
	GM_SCENEBOSSHPINFO_REQUEST,///场景请求boss血量信息
	GM_SCENEBOSSHPINFO_RETURN,///将场景boss血量改变信息发给场景服务器
	GM_PLAYERBATTLESTATE_NOTIFY,///通知逻辑服务玩家战斗状态变化
	GM_INBATTLESTATE_CREATCOPY, ///通知玩家在战斗状态，不能进入副本

    //-------------------------------------------------------------------------------挖宝--------------------------------------------------------------------------------------------
    GM_TREASUREMAPPOSITION_REQUEST = 110900,///客户端请求藏宝图位置（逻辑服务器）
	GM_TREASUREMAPPOSITION_RETURN,              ///返回结果
	GM_USETREASUREMAP_REQUEST,                      ///客户端请求使用藏宝图（逻辑服务器）
	GM_USETREASUREMAP_RETURN,                        ///返回玩家使用结果
	GM_BRUSHNPC_NOTIFY,                                     ///逻辑服务器通知场景服务器刷NPC
	GM_OPRNTREASUREBOX_REQUEST,                    ///客户端请求开启宝箱(向副本服务器发送)
	GM_OPRNTREASUREBOX_RETURN,                      ///返回玩家开启宝箱结果
	GM_ENTERTONPCCOPY_REQUEST,                      ///客户端通过npc请求进入副本（向逻辑服务器发送）
	GM_ENTERTONPCCOPY_RETURN,                       ///返回玩家进人结果
	GM_ENTERTONPCCOPY_LOGIC_REQUEST,          ///逻辑服务器通知场景服务器玩家请求进人npc副本
	GM_ENTERTONPCCOPY_LOGIC_RETURN,            ///场景服务器通知逻辑服务器允许玩家进人副本
	GM_PINGLUANTIMES_REQUEST,                         ///客户端请求平乱除暴次数（逻辑服务器）
	GM_PINGLUANTIMES_RETURN,                          ///返回玩家的次数

    //------------------------------------------- 荒古神域
    GM_SCENE_FINALBOSS_INFO = 111000,		/// 通知客户端副本信息
	GM_SCENE_FINALBOSS_BOSS_STATUS,     // 通知客户端boss状态变化
    GM_SCENE_FINALBOSS_BOSS_PLAYER,     // 通知客户端玩家伤害变化
    GM_SCENE_FINALBOSS_BOSS_GANG,       // 通知客户端仙盟伤害变化
    GM_SCENE_FINALBOSS_BOSS_OWNER,      // 通知客户端boss拥有信息变化
    GM_SCENE_FINALBOSS_BOSS_HP,         // 通知boss血量变化
    SM_FINALBOSS_COPY_SETTLE,           // 通知逻辑服务器 发送个人奖励
    SM_FINALBOSS_COPY_BOSS,             // 通知逻辑服务器 boss仙盟结算
    SM_FINALBOSS_COPY_ROLE,             // 通知逻辑服务器 个人BOSS击杀通知

    //------------------------------------------- 仙盟周任务副本
    GM_SCENE_WEEKCOPY_POINT_INFO = 111100,	/// 通知客户端积分副本信息
	GM_SCENE_WEEKCOPY_FLY_INFO,             /// 通知客户端杀怪副本信息

    //------------------------------------------- 虚无禁地场景
    GM_BOSSANGER_PLAYERINFO = 111200,       // 通知虚无禁地怒气信息
    GM_BOSSANGER_FULLANGER,         // 通知虚无禁地怒气已满 + 30秒被雷劈死
    GM_BOSSANGER_RELIVE,            // 通知虚无禁地雷电击杀复活信息
    SM_BOSSANGER_NEWPLAYER,         // 逻辑服务器通知新玩家进入场景
    SM_BOSSANGER_PLAYERINFO,        // 场景服务器通知玩家愤怒值改变

    //------------------------------------------- 符文副本
    SM_RUNECOPY_SETTLE = 111300, // 符文副本结算 
    GM_RUNECOPY_SETTLE_CLIENT, // 客户端符文副本结算
    GM_RUNECOPY_COPYINFO, // 符文副本信息
    GM_RUNECOPY_BRUSH_REQUEST,  // 开始刷怪
    GM_RUNECOPY_BRUSH_RETURN,
    GM_RUNECOPY_BRUSHNEXT_REQUEST,  // 刷下一波怪
    GM_RUNECOPY_BRUSHNEXT_RETURN,
    GM_RUNECOPY_GUARD_REQUEST,  // 放守卫
    GM_RUNECOPY_GUARD_RETURN,
    GM_RUNECOPY_GUARD_UPGRADE_REQUEST,  // 升级守卫
    GM_RUNECOPY_GUARD_UPGRADE_RETURN,
    GM_RUNECOPY_GUARD_RECYCLE_REQUEST,  // 回收守卫
    GM_RUNECOPY_GUARD_RECYCLE_RETURN,
    GM_RUNECOPY_GOLDGUARD_REQUEST,  // 召唤金守卫
    GM_RUNECOPY_GOLDGUARD_RETURN,
    GM_RUNECOPY_GOLDGUARD_CANCALL,  // 通知可以再次召唤金守卫
    SM_RUNECOPY_GOLDGUARD_REQUEST,  // 通知逻辑服务器召唤金守卫消耗
    SM_RUNECOPY_GOLDGUARD_RETURN,
    GM_RUNECOPY_SOURCE_NOTIFY,  // 当前资源通知

    /**********************************场景模块 副本服务器、场景服务器均会使用*********************************************/
    SM_REGISTER_SCENE_SERVER = 120100,    //SS->GM 注册场景服务器
    SM_SEND_PLAYER_INFO,              //SS->GM 通知逻辑服务器，角色场景坐标改变
    SM_SEND_BROADCASTCOUNT,           //GM->SS 显示人数改变
                                      // 	//通用  主动通知
                                      // 	GM_NOTIFY_ROLE_SHOW_CHANGE,		///广播角色显示变化,
                                      // 	GM_NOTIFY_ROLE_TITLE_CHANGE,	///广播角色称号变化,
                                      // 	GM_NOTIFY_ROLE_GANG_CHANGE,		///广播角色公会信息变化,
                                      // 	GM_NOTIFY_ROLE_VIP_CHANGE,		///广播VIP信息改变
                                      // 	SM_SCENE_LEAVE_GAME,            ///离开游戏
                                      // 	GM_MONSTER_CONTROL_CHANGE,      ///野怪控制权变化
                                      // 	SM_SCENE_UPDATE_DATA,		// 更新场景人物的数据

    //--------------------------------------------------------------------end--------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------crossserver-------------------------------------------------------------------------------------------------
    GM_REGISTERTOCROSS_REQUEST = 130000,///逻辑服务器向跨服战注册服务器信息
	GM_REGISTERTOCROSS_RETURN,          // 注册回报
    GM_CROSSPLAYERINFO_REQUEST,            ///跨服服务器向逻辑服务器请求玩家战斗数值
	GM_CROSSPLAYERINFO_RETURN,              ///逻辑服务器向跨服战服务器发送玩家信息
	GM_SINGLECROSSSTATE_REQUEST,           ///客户端请求跨服战状态
	GM_SINGLECROSSSTATE_RETURN,             ///返回该区跨服战状态
	GM_SINGLECROSSSIGNUP_REQUEST,         ///向逻辑服务器请求报名数据
	GM_SINGLECROSSSIGNUP_RETURN,          ///向跨服战服务器返回报名玩家基础数据
	GM_SINGLECROSSSTATE_BC,                     ///广播跨服赛状态
	GM_SINGLECROSSINFO_REQUEST,            ///逻辑服务器请求跨服战数据
	GM_SINGLECROSSINFO_RETURN,              ///返回跨服战数据
	GM_ENTERSINGLECOPY_REQUEST,            ///逻辑服务器请求玩家进人副本
	GM_ENTERSINGLECOPY_RETURN,              ///返回玩家请求进人跨服战结果
	GM_ELIMINATEBATTLERECORD_REQUEST, ///请求我的淘汰赛战绩
	GM_ELIMINATEBATTLERECORD_RETURN,   ///返回我的淘汰赛战绩
	GM_PROMATEBATTLERECORD_REQUEST,  ///请求晋级赛节点战绩
	GM_PROMATEBATTLERECORD_RETURN,    ///返回晋级赛节点战绩


    CG_CROSSPLAYER_STATE_REQUEST,           // 逻辑服务器请求跨服战状态
    CG_CROSSPLAYER_STATE_RETURN,
    CG_CROSSPLAYER_STATE_NOTIFY,            // 跨服服务器通知状态变化
    CG_CROSSPLAYER_RESULT_NOTIFY,           // 跨服服务器通知结果
    CG_CROSSPLAYER_RESULTDEAL_NOTIFY,       // 已经处理结果通知
    CG_CROSSPLAYER_AllRANK_NOTIFY,          // 战斗结果通知
    CG_CROSSPLAYER_ELIMINATE_RESULT_NOTIFY, // 晋级赛本服玩家数量
    GM_NOTIFYBEGINBATTLE,                            ///通知逻辑服务器玩家可以进入战斗
	GM_CROSSCOPYINFO_NOTIFY,                    ///通知玩家副本信息
	GM_CROSSCOPYSETTLE,                               ///副本结算
	GM_HASJOINSINGLECROSS_REQUEST,          ///客户端请求是否参加跨服战
	GM_HASJOINSINGLECROSS_RETURN,           ///返回客户端是否参加跨服战
	CG_CROSSPLAYER_FIRST_REQUEST,           //第一名上线
    CG_CROSSPLAYER_FIRST_RETURN,
    GM_CROSSSPLAYERBASEINFO_REQUEST,     ///请求玩家基本信息
	GM_CROSSSPLAYERBASEINFO_RETURN,      ///返回玩家基本信息
	GM_PROMATESTATECHANGE_NOTIFY,        ///晋级赛状态改变通知
	GM_ELIMINATESTATECHANGE_NOTIFY,      ///淘汰赛状态改变通知
	GM_EXISTCROSSCOPY_NOTIFY,                  ///跨服战服务器通知逻辑服务器玩家退出副本
	GM_CROSSSISOPEN_REQUEST,                   ///玩家请求跨服战是否开启
	GM_CROSSSISOPEN_RETURN,                    ///返回跨服战是否开启按钮
	GM_CROSSPLAYERPROMATE_NOTIFY,       ///玩家淘汰赛晋级信息
	GM_LOGINCROSSCOPY_NOTIFY,                  /// 玩家登陆跨服通知

    //-----------------------------------------------------------end--------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------仙盟据点战---------------------------------------------------------------------------------------------------------
    GM_MYGANGEPOINTINFO_REQUEST = 130100,        ///玩家请求我的仙盟据点信息
	GM_MYGANGEPOINTINFO_RETURN,         ///返回我的仙盟据点信息
	GM_GANGPOINTINFO_REQUEST,              ///玩家请求仙盟据点战信息
	GM_GANGPOINTINFO_RETURN,                ///返回仙盟据点信息
	GM_GANGPOINTLOG_REQUEST,                ///玩家请求仙盟据点战日志
	GM_GANGPOINTLOG_RETURN,                 ///返回仙盟据点日志
	GM_GANGPOINTINTEGRALSORT_REQUEST, ///玩家请求仙盟据点积分排行
	GM_GANGPOINTINTEGRALSORT_RETURN,  ///返回仙盟积分排行
	GM_GANGWEEKREWARDINFO_REQUEST,    ///玩家请求仙盟据点周奖励信息
	GM_GANGWEEKREWARDINFO_RETURN,      ///返回仙盟周积分排名奖励信息
	GM_GANGPOINTREWARD_REQUEST,           ///玩家请求领取据点战每日奖励
	GM_GANGPOINTREWARD_RETURN,             ///返回玩家领取奖励信息
	GM_GANGTOKENGIVE_REQUEST,                 ///玩家请求上交仙盟据点令
	GM_GANGTOKENGIVE_RETURN,                  ///返回玩家上交仙盟令请求
	GM_CHOICEATTACKPOINT_REQUEST,          ///玩家宣布攻打仙盟据点
	GM_CHOICEATTACKPOINT_RETURN,           ///返回玩家攻打据点战请求
	GM_GANGSTRINFO_REQUEST,                     ///仙盟唯一标示信息请求
	GM_GANGSTRINFO_RETURN,                       ///返回仙盟唯一标示信息
	GM_GANGPOINTREWARDINFO_REQUEST,   ///玩家领取仙盟据点战奖励信息请求
	GM_GANGPOINTREWARDINFO_RETURN,    ///返回信息
	GM_GANGINFOINPOINT_REQUEST,             ///跨服战服务器向逻辑服务器请求仙盟信息
	GM_GANGINFOINPOINT_RETURN,               ///逻辑服务器返回跨服战请求信息
	GM_GANGINFOCHANGE_NOTIFY,                ///逻辑服务器通知跨服战服务器仙盟信息修改
	GM_ADDGANGTOKENNUM_REQUEST,         ///逻辑服务器通知客户端增加据点令
	GM_GANGPOINTBATTLECAMPARE_NOTIFY, ///跨服战服务器通知逻辑服务器今晚有据点战
	GM_NORIGHTATTACKPOINT_NOTIFY,          ///跨服战服务器通知逻辑服务器该仙盟没有获得进攻资格
	GM_GANGPOINTBATTLEBEGIN_NOTIFY,      ///跨服战服务器通知逻辑服务器该仙盟据点战开始
	GM_CAPTUREINFOCHANGE_NOTIFY,          ///通知逻辑服务器仙盟对据点占领信息的改变
	GM_GANGPOINTINFOUPDATE,                   ///通知跨服战服务器更新仙盟信息
	GM_DELETEGANGINFO_NOTIFY,                 ///通知跨服战服务器仙盟解散
	GM_ENTERGANGPOINTCOPY_REQUEST,     ///玩家请求进人据点战斗
	GM_ENTERGANGPOINTCOPY_RETURN,      ///返回玩家进入据点战副本结果
	GM_PLAYERFIGHTDATATOCROSS_REQUEST, ///逻辑服务器发送玩家数据给跨服战服务器
	GM_GANGPOINTCOPYINFO_NOTIFY,         ///通知据点战副本信息改变
	GM_GANGPOINTCOPYOVER_NOTIFY,        ///通知客户端副本结算
	GM_SENDWEEKREWARD_NOTIFY,              ///通知逻辑服务器发送周奖励
	GM_GANGPOINTBATTLEEND_NOTIFY,       ///通知逻辑服务仙盟据点战结束
    GM_TOKENRANKINFO_REQUEST,              ///请求某个据点上交据点令排名
	GM_TOKENRANKINFO_RETURN,
	GM_GANGPOINTREWAERDINFO_REQUEST, ///请求据点战奖励信息
	GM_GANGPOINTREWAERDINFO_RETURN,  ///返回奖励信息
	GM_GANGPOINTQUIKTALK_REQUEST,///玩家请求快速聊天
	GM_GANGPOINTQUIKTALK_RETURN,
	GM_GANGPOINTQUIKTALK_BC,      ///广播聊天信息
	GM_POINTBATTLELOG_REQUEST,///玩家请求查看战报
	GM_POINTBATTLELOG_RETURN,///返回玩家查看战报信息
	GM_ADDGANGREWARD_NOTIFY,///通知逻辑服务器发送奖励信息
	GM_SEND_GANGPOINTCHATWORD,///通知客户端据点战聊天内容
    //----------------------------------------------------------------end------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------巅峰竞技------------------------------------------------------------------------------------------------------------
    GM_TOPAREA_PLAYERSCORE_REQUEST = 130300,       ///逻辑服务器请求玩家积分
	GM_TOPAREA_PLAYERSCORE_RETURN,        ///返回玩家积分
	GM_TOPAREA_RANKLIST_REQUEST,             ///逻辑服务器请求排行榜50名信息
	GM_TOPAREA_RANKLIST_RETURN,              ///返回排行榜信息
	GM_TOPAREA_RANK32REWARD_INFORM,  ///通知逻辑服务器排行榜前32发奖励
	GM_TOPAREA_RANK32REWARD_INFORM_RETURN,///逻辑服务器返回排行奖励发送成功
	GM_TOPAREA_PLAYERREWARD_INFORM,   ///通知逻辑服务器发送个人赛季奖励
	GM_TOPAREA_PLAYERREWARD_INFORM_RETURN,///逻辑服务器返回个人赛季奖励发送成功
	GM_TOPAREA_CAMPBEGIN_REQUEST,        ///逻辑服务器通知开始匹配
	GM_TOPAREA_CAMPBEGIN_RETURN,          ///返回玩家开始匹配结果
	GM_TOPAREA_CAMPCANCLE_REQUEST,     ///逻辑服务器通知取消匹配
	GM_TOPAREA_CAMPCANCLE_RETURN,       ///返回玩家取消匹配结果
	GM_TOPAREA_CAMPSUCCESS_INFORM,     ///通知逻辑服务器匹配成功
	GM_TOPAREACAMPEND_INFORM,              ///逻辑服务器通知活动结束
	GM_TOPAREACAMPBEGIN_INFORM,           ///逻辑服务器通知活动开始
	GM_TOPAREAPLAYERFIGHTINFO_INFORM, ///逻辑服务器将玩家战斗信息发给跨服服务器
	GM_TOPAREACOPYINFO_NOTIFY,              ///将副本信息发给玩家
	GM_TOPAREABATLLEOVER_NOTIFY,           ///通知逻辑服务器战斗结束
	GM_TOPAREABATLLEOVER_NOTIFY_CLIENT, ///通知客户端战斗结束
	GM_TOPAREASEASSION_REQUEST,             ///逻辑服务器请求第几届信息
	GM_TOPAREASEASSION_RETURN,              ///返回第几届信息
	GM_TOPAREA_PLAYERPOINT_INFORM,      ///通知逻辑服务器发送积分信息


    //----------------------------------------------------------------end------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------异界虚空------------------------------------------------------------------------------------------------------------
    GM_PLAYERHOLLOWDATA_REQUEST = 130400,   ///逻辑服务器向数据库服务器请求异界虚空数据
	GM_PLAYERHOLLOWDATA_RETURN,
    GM_PLAYERHOLLOWUPDATE_NOTIFY,              ///逻辑服务器通知跨服服务器更新玩家数据
	GM_KILLOBJECT_NOTIFY,                                  ///跨服服务器通知击杀怪物或者人
	GM_INTOHOLLOWAREA_REQUEST,                   ///向逻辑服务器请求进入异界虚空
	GM_INTOHOLLOWAREA_RETURN,
    GM_EXITHOLLOWAREA_REQUEST,                    ///向逻辑服务器请求退出异界虚空
	GM_EXITHOLLOWAREA_RETURN,
    GM_CHATWORDHOLLOW_REQUEST,                ///向跨服服务器请求聊天
	GM_CHATWORDHOLLOW_RETURN,
    GM_CHATWORDHOLLOW_BC,                          ///广播场景聊天
	GM_KILLTIREDCHANGE_NOTIFY,                      ///通知客户端疲劳值和积分刷新
	GM_HOLLOWPLAYERLOGINOFF_NOTIFY,        ///跨服服务器通知玩家离线
	GM_BOSSBRUSHTIMES_NOTIFY,                     ///通知玩家场景boss刷新时间
	GM_JUMPINHOLLOW_REQUEST,                     ///玩家请求跳第几层
	GM_JUMPINHOLLOW_RETURN,                      ///返回玩家传送结果
	GM_THIREDFLOORINFO_BC,                           ///广播第三层的状态
	GM_KILLPLAYERNOADDSCORE_NOTIFY,         ///通知客户端击杀玩家不增加积分
	GM_HOLLOWNOTICE,                                    ///通知对应的服务器增加系统公告
	GM_HOLLOWDROPBC,                                  ///异界虚空boss 掉落广播
	GM_HOLLOWBOSSBRUSH,                            ///异界虚空boss刷新
	SM_HOLLOWENTERTHIRDFLOORGS,                     // 玩家进入第三层通知逻辑服务器
                                                    //----------------------------------------------------------------end------------------------------------------------------------------------------------------------------------------
                                                    //-----------------------------------------------------------------极速挑战（跨服排行）----------------------------------------------------------------------------------------------
    GM_SPEEDFIGHTUPDATETIMES_REQUEST = 130500,     ///逻辑服务器请求更新玩家挑战时间
	GM_SPEEDFIGHT_RANKLIST_REQUEST,           ///逻辑服务器请求排行榜50名信息
	GM_SPEEDFIGHT_RANKLIST_RETURN,            ///返回排行榜信息
	GM_SPEEDFIGHT_RANKREWARD_INFORM,    ///通知逻辑服务器排行榜发奖励
	GM_SPEEDFIGHT_RANKREWARD_INFORM_RETURN, ///逻辑服务器返回排行奖励发送成功
	GM_SPEEDFIGHT_RANKFIRST_INFORM, ///排行榜第一名变化
    //----------------------------------------------------------------end------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------武道会修改----------------------------------------------------------------------------------------------
    GM_MARTIALINFO_REQUEST = 130600,     ///客户端向逻辑服务器请求武道会数据
	GM_MARTIALINFO_RETURN,                    ///跨服服务器返回武道会数据
	GM_MARTIALEXIT_REQUEST,                    ///客户端退出武道会请求
	GM_MARTIALCAMPARE_REQUEST,           ///客户端向逻辑服务器请求匹配
	GM_MARTIALCAMPARE_RETURN,             ///跨服服务器返回匹配操作结果
	GM_MARTIALCOMPARE_SUCCESS,           ///跨服服务器通知匹配成功
	GM_MARTIALBATTLE_OVER,                     ///跨服服务器通知战斗结果
	GM_MARTIALCOMPARECANCLE_REQUEST,////客户端向逻辑服务器请求终止匹配
    GM_MARTIALCOMPARECANCLE_RETURN,   ///跨服服务器返回结果
	GM_MARTIALCOPYINFO_NOTIFY,               ///跨服服务器通知玩家副本信息
	GM_MARTIALCOPYSETTLE_NOTIFY_CLIENT,  ///通知客户端结算
	GM_MARTIALCOPYSETTLE_NOTIFY_SERVER,  ///通知逻辑服务器添加物品
	GM_MARTIALRANK_UPDATE,                         ///通知玩家更新排行榜信息
	GM_MARTIALPLAYERINFO_UPDATE,              ///通知更新玩家信息
	GM_MARTIALBATTLELOG_MY_UPDATE,         ///通知客户端增加一条我的战斗记录
	GM_MARTIALBATTLELOG_UPDATE,               ///通知客户端增加一条战斗信息
	GM_MARTIALNEWPLAYERADD_NOTIFY,       ///通知新进一个玩家
	GM_MARTIALINPSPIRE_REQUEST,                ///玩家请求鼓舞
	GM_MARTIALINPSPIRE_RETURN,                 ///返回鼓舞结果
	GM_MARTIAL_WIN_BC,                               ///广播玩家连胜
	GM_MARTIAL_WINSHUTDOWN_BC,           ///广播连胜终结
    //----------------------------------------------------------------end------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------绝地乱斗----------------------------------------------------------------------------------------------

    GM_DEATHFIGHT_COPYPINFO_NOTIFY = 130700,        // 副本界面信息
    GM_DEATHFIGHT_COPYCHANGE_NOTIFY,            // 副本信息改变通知
    GM_DEATHFIGHT_COPYSETTLE,                   // 副本结算信息
    GM_DEATHFIGHT_LIANZHAN_NOTIFY,              // 玩家连斩信息通知
    GM_DEATHFIGHT_SYSTEMCHAT_NOTIFY,            // 场景通知
    GM_DEATHFIGHT_PLAYER_NOTIFY,                // 副本人数通知
    GM_DEATHFIGHT_POINT_NOTIFY,                 // 副本积分信息变化

    SM_DEATHFIGHT_OPEN_NOTIFY = 130750,         // 通知活动开始
    SM_DEATHFIGHT_END_NOTIFY,                   // 通知活动结束
    SM_DEATHFIGHT_KILLNUM_REQUEST,              // 请求击杀人数信息
    SM_DEATHFIGHT_KILLNUM_RETURN,
    SM_DEATHFIGHT_RANK_REQUEST,                 // 请求玩家上一届或者本届排名信息
    SM_DEATHFIGHT_RANK_RETURN,
    SM_DEATHFIGHT_MATCH_REQUEST,                // 请求匹配
    SM_DEATHFIGHT_MATCH_RETURN,
    SM_DEATHFIGHT_CANCELMATCH_REQUEST,          // 取消匹配
    SM_DEATHFIGHT_CANCELMATCH_RETURN,
    SM_DEATHFIGHT_LONGININFO_REQUEST,           // 玩家战场信息
    SM_DEATHFIGHT_LONGININFO_RETURN,
    SM_DEATHFIGHT_REWARD_REQUEST,               // 玩家奖励通知
    SM_DEATHFIGHT_REWARD_RETURN,
    SM_JDLD_EXITCOPY_REQUEST,                   // 退出副本
    SM_JDLD_EXITCOPY_RETURN,
    SM_DEATHFIGHT_ALLREWARD_REQUEST,            // 玩家奖励信息回报


    SM_DEATHFIGHT_ROLEOFFLINE_NOTIFY = 130780,  // 玩家离线通知, 取消匹配状态
    SM_DEATHFIGHT_MATCHNUM_NOTIFY,              // 匹配人数通知
    SM_DEATHFIGHT_MATCHSUCCESS_NOTIFY,          // 匹配人数通知
    SM_DEATHFIGHT_COPYTOP_NOTIFY,               // 单场第一通知
    SM_DEATHFIGHT_ALLREWARED_NOTIFY,            // 通知活动发送奖励

    //-----------------------------------------------------------------绝地乱斗 end------------------------------------------------------------------------------------------------------------------

    //-------------------------------------------------------------------经验谷----------------------------------------------------------------------------------------------------------------------
    GM_EXPVALLEYDATA_REQUEST = 130800,               ///逻辑服务器向数据库服务器请求玩家数据
	GM_EXPVALLEYDATA_RETURN,                             ///数据库服务器返回玩家数据
	GM_INTOEXPVALLEY_REQUEST,                            ///客户端请求进入经验谷
	GM_INTOEXPVALLEY_RETURN,                             ///返回玩家进入结果
	GM_EXPVALLEYCOPYGMID_REQUEST,                 ///向副本服务器请求副本gmid
	GM_EXPVALLEYCOPYGMID_RETURN,                  ///副本服务器返回副本gmid
	GM_EXPVALLEYINFOTOINSTANCE,                     ///将玩家信息发送给副本服务器
	GM_EXPVALLEYGET_NOTIFY,                              ///副本服务器通知逻辑服务器物品获得
	GM_EXPVALLEYGET_NOTIFYTOPLAYER,              ///副本服务器通知玩家更新信息
    //-------------------------------------------------------------------经验谷 end----------------------------------------------------------------------------------------------------------------------

    //-------------------------------------------------------------------经验副本----------------------------------------------------------------------------------------------------------------------
    GM_EXPCOPYINSPIRE_REQUEST,                         ///客户端向逻辑服务器请求经验副本鼓舞
	GM_EXPCOPYINSPIRE_RETURN,                           ///返回鼓舞结果
	GM_EXPCOPYINSPIRECOST_REQUEST,                 ///客户端向逻辑服务器请求经验副本鼓舞消耗
	GM_EXPCOPYINSPIRECOST_RETURN,                  ///f返回元宝消耗
	GM_EXPCOPYINFO_NOTIFY,                               ///通知副本信息
	GM_EXPCOPY_SETTLE,                                        ///副本结算
    //-------------------------------------------------------------------经验副本end----------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------跨服3v3----------------------------------------------------------------------------------------------
    GM_CROSS3V3_COPYINFO_NOTIFY = 130900,           // 副本界面信息
    GM_CROSS3V3_COPYUSEHP_REQUEST,              // 副本使用红药
    GM_CROSS3V3_COPYUSEHP_RETURN,
    GM_CROSS3V3_COPYQUICKWORD_REQUEST,          // 副本快捷消息
    GM_CROSS3V3_COPYQUICKWORD_RETURN,
    GM_CROSS3V3_COPYSETTLE,                     // 副本结算信息
    GM_CROSS3V3_COPYTALK_NOTIFY,                // 聊天
    GM_CROSS3V3_COPYJOIN_NOTIFY,                // 通知玩家进入
    GM_CROSS3V3_COPYLEAVE_NOTIFY,               // 玩家离开通知
    GM_CROSS3V3_COPYPOINT_NOTIFY,               // 占领值改变通知
    GM_CROSS3V3_COPYKILL_NOTIFY,                // 击杀信息
    GM_CROSS3V3_COPYALTAR_NOTIFY,               // 通知矩点信息
    GM_CROSS3V3_OCCUPY_NOTIFY,                  // 通知祭坛占领信息
    GM_CROSS3V3_SYSTEMCHAT_NOTIFY,              // 系统消息

    SM_CROSS3V3_PLAYERINFO_REQUEST = 130980,    // 逻辑服务器强求玩家信息
    SM_CROSS3V3_PLAYERINFO_RETURN,
    SM_CROSS3V3_MATCH_REQUEST,                  // 匹配界面请求匹配
    SM_CROSS3V3_MATCH_RETURN,
    SM_CROSS3V3_MATCH_NOTIFY,                   // 通知匹配成功
    SM_CROSS3V3_CANCELMATCH_REQUEST,            // 匹配界面取消匹配
    SM_CROSS3V3_CANCELMATCH_RETURN,
    SM_CROSS3V3_LIST_REQUEST,                   // 积分排行
    SM_CROSS3V3_LIST_RETURN,
    SM_CROSS3V3_COPYSETTLE_NOTIFY,              // 单场结算通知
    SM_CROSS3V3_ALLREWARD_REQUEST,              // 所有玩家奖励信息
    SM_CROSS3V3_ALLREWARD_RETURN,

    SM_CROSS3V3_LEAVETEAM_NOTIFY,               // GS通知离开队伍
                                                // 测试消息 用于命令开启结束活动
    SM_CROSS3V3_TEST_OPEN_NOTIFY,       // 开启活动
    SM_CROSS3V3_TEST_END_NOTIFY,        // 结束活动
    SM_CROSS3V3_TEST_REWARD_NOTIFY,     // 活动奖励


    //-----------------------------------------------------------------跨服3v3end----------------------------------------------------------------------------------------------


    GATE_MESSAGE_CROSS_SERVER_END = 200000,


    /***************************网关服务器分配网络包消息id段结束：场景服务器*****************************************/
    GATE_MESSAGE_SCENE_SERVER_BEGIN = 200001,



    GATE_MESSAGE_SCENE_SERVER_END = 300000,
    GM_MAX_MESSAGE,

}

///怪物类型枚举,
const enum MonsterType
{	
	MT_SPEEDKILL=0,	///0、速杀怪物,
	MT_NORMAL,		///1、普通怪物 
	MT_ELITE,		///2、精英怪物,
	MT_RARE,		///3、稀有怪物,
	MT_OBSTACLES,	///4、破坏物,
	MT_MACHINE,		///5、机关怪物,
	MT_BOSSBEGIN,	//boss开始,
	MT_BOSS = MT_BOSSBEGIN,///6、副本Boss怪物,
	MT_BOSSSTATE,	///7、BOSS关卡怪物,
	MT_ELITEBOSS,	///8、精英BOSS怪物,
	MT_WORLDBOSS,	///9、世界BOSS怪物	
	MT_GUILDBOSS,	///10、公会BOSS怪物,
	MT_TEAMBOSS,	///11、组队BOSS怪物,
	MT_TEAMCOPYBOSS,///12、组队副本分身boss
	MT_BOSSEND,		///13,BOSS结束,
	MT_GOLDBOSS,	///14、金币BOSS怪物,
	MT_SUPERGOLD,	///15、掉20堆金币怪物,
	MT_SUMMON,		///16、召唤怪物,

	MT_Count
}


const enum AttackType
{
	physicalAttack=0,		///物理攻击,
	magicAttack,			///魔法攻击,
}

const enum AttackProcess
{
	initiativeAttack=0,		///主动攻击,
	passiveAttack,			///被动攻击,
}

const enum RoleMotionType
{
	RMT_None,
	RMT_MoveBegin,
	RMT_Walk,
	RMT_WalkBack,
	RMT_WalkLeft,
	RMT_WalkRight,
	RMT_Run,
	RMT_MoveEnd,

	RMT_Idle=50,
	RMT_BeAttack,
	RMT_BeAttack1,
	RMT_BeAttack2,	
	RMT_Die,
	RMT_BeatBack,
	RMT_BlowFly,
	RMT_BeatBackStand,
	RMT_BlowFlyStand,
	RMT_EnterReady,
	RMT_Enter,
	RMT_SpacialIdle,	///特殊待机,

	RMT_Dance1,			///跳舞动作1,
	RMT_Relive,			///复活动作,
	RMT_Mining,			///挖矿动作,
	RMT_Win,			///胜利动作,

	RMT_KnockDown,		///击倒,
	RMT_KnockDownStand,///击倒起身,

	RMT_WeakIdle,

	RMT_AttackStart = 100,

	RMT_Attack1,
	RMT_Attack2,
	RMT_Attack3,
	RMT_Attack4,
	RMT_Attack5,
	RMT_Attack6,
	RMT_Attack7,
	RMT_Attack8,
	RMT_Attack9,
	RMT_Attack10,

	RMT_AttackEnd = 199,


	RMT_SkillStart = 200,

	RMT_Skill_1,
	RMT_Skill_2,
	RMT_Skill_3,
	RMT_Skill_4,
	RMT_Skill_5,
	RMT_Skill_6,
	RMT_Skill_7,
	RMT_Skill_8,
	RMT_Skill_9,
	RMT_Skill_10,
	RMT_Skill_11,
	RMT_Skill_12,
	RMT_Skill_13,
	RMT_Skill_14,
	RMT_Skill_15,
	RMT_Skill_16,
	RMT_Skill_17,
	RMT_Skill_18,
	RMT_Skill_19,
	RMT_Skill_20,
	RMT_Skill_21,
	RMT_Skill_22,
	RMT_Skill_23,
	RMT_Skill_24,
	RMT_Skill_25,
	RMT_Skill_26,
	RMT_Skill_27,
	RMT_Skill_28,
	RMT_Skill_29,
	RMT_Skill_30,
	RMT_Skill_31,
	RMT_Skill_32,
	RMT_Skill_33,
	RMT_Skill_34,
	RMT_Skill_35,
	RMT_Skill_36,
	RMT_Skill_37,
	RMT_Skill_38,
	RMT_Skill_39,
	RMT_Skill_40,
	RMT_Skill_41,
	RMT_Skill_42,
	RMT_Skill_43,
	RMT_Skill_44,

	RMT_SkillEnd,

}

const enum OutPosType
{
	OPT_NORMALFB=0,
	OPT_DEATHTOWER,
	OPT_CITY,
	OPT_NONE,
	OPT_Elite,
	OPT_SpecialFb,
	OPT_MoWang,	///魔王副本,
}


const enum CharacterType
{ 
	CT_Player=0,		//角色,
	CT_Monster,			//怪物,
	CT_Robot,			//机器人,
	CT_Pet,				//宠物,
	CT_Offline,			//掉线玩家,
	CT_Summon,			//召唤怪物,
}
const enum ColorType  // '物品颜色(0,不分颜色,1,白色,2,绿色,3,蓝色,4,紫色,5,金色,6,橙色)',
{
    enCTNone = 0,
    enCTWhite,
    enCTGreen,
    enCTBlue,
    enCTPurple,
    enCTGold,
    enCTOrange,

    enCTCount,
}

//职业枚举(0,通用,1,蛮士,2,巫修,3,仙族)
const enum Profession
{
	P_COMMON=0,				//通用,
	P_WARRIOR,				//蛮士,
	P_ASSASSIN,				//巫修(刺客)
	P_MAGE,					//仙族	
	P_ProfessionCount,		//职业种类数,
}


/**货币/经验/属性产出来源枚举,*/
const enum AddWay
{
    //邮件source对应的addway
    OBJECT_MailSystem,				///系统
	OBJECT_MailGMTool,              ////gm工具
    OBJECT_MailCdKey,               ///激活码cdkey

    OBJECT_MailDiamond,             // 宝石返还
    OBJECT_MailGangDismiss,         // 仙盟解散
    OBJECT_MailGangDefend,          // 仙盟守护
    OBJECT_MailGangDart,                // 仙盟运镖
    OBJECT_MailGangStore,           // 仙盟仓库返还
    OBJECT_MailGangAutoLeader,      // 仙盟自动转让盟主
    OBJECT_MailActivity,                // 活动
    OBJECT_MailMarket,              // 市场相关
    OBJECT_MailWudaoHui,                // 武道会
    OBJECT_MailGangCity,                // 仙盟城战
    OBJECT_MailXianWu,              // 仙武之巅
    OBJECT_MailFengShen,                // 封神之战
    OBJECT_MailDomainBattlefield,   // 仙域战场
    OBJECT_Mailpackage,             // 背包
    OBJECT_MailPlayerDie,           // 玩家死亡掉落
    OBJECT_MailSevenlogin,              // 七天登录返回未领取邮件

    Add_NONE = 500,             //未知原因
    Add_Recharge,               //充值获得
    Add_ChargeCard,             //使用充值卡
    Object_None = 1000,         //不明确理由
    Object_Combine = 1001,      // 合服邮件

    ///玩家获得物品时，AddWay格式用：OBJECT_模块。
    OBJECT_InitPlayer = 2000,                   // 初始化人物等级
    OBJECT_StoreGoods,                      // 存物品到仓库
    OBJECT_StoreSell,                       // 卖出到商店
    OBJECT_StoreBack,                       // 回购获得
    OBJECT_GetTmp,                          // 从临时背包获取
    OBJECT_Compose,                         // 合成获取
    OBJECT_UnlockGrid,                      // 开格子获取经验
    OBJECT_ZhuangSheng,                     // 转生
    OBJECT_Exchange,                        // 额外经验转换修为
    OBJECT_GoldPract,                       // 金币运功
    OBJECT_DiamPract,                       // 钻石运功
    OBJECT_GoldGuide,                       // 金币指点
    OBJECT_DiamGuide,                       // 钻石指点
    OBJECT_ItemUse,                         // 物品使用获得
    OBJECT_ShopBuy,                         // 杂货
    OBJECT_MallBuy,                         // 商城
    OBJECT_MailGet,                         // 领取邮件
    OBJECT_FirstRecharge,                   //首冲
    OBJECT_EquipLevelUp,                    //升阶
    OBJECT_EquipRefine,                     //精炼
    OBJECT_KILLMONSTER,						///杀怪
	OBJECT_WingUpgrade,                     // 翅膀升级 使用元宝 返还多余钱
    OBJECT_MountDiamond,                    //装备镶嵌
    OBJECT_UnountDiamond,                   //装备卸下宝石
    OBJECT_FBSweep,                         //副本扫荡
    OBJECT_RideUpLevel,                     //坐骑培养	
    OBJECT_RideCompose,                     //骑装合成
    OBJECT_PetGrow,                         // 宠物成长 钻石转换多余的
    OBJECT_PetSoul,                         // 宠物灵修 钻石转换多余的		
    OBJECT_FBDROP,							///副本掉落
	OBJECT_PetSkillChange,                  // 宠物技能抄写获得
    OBJECT_PetSkillCompose,                 // 宠物技能合成
    OBJECT_Task,                            // 任务奖励
    OBJECT_ItemExchange,                    // 物品换购
    OBJECT_TrumpRefine,                     // 法宝淬炼
    OBJECT_XianqiStrenth,                   // 仙器提升
    OBJECT_WeekCard,                        // 周卡
    OBJECT_VipReward,                       // vip
    OBJECT_GMCommand,                       // GM命令
    OBJECT_TrialReward,                     // 试炼任务奖励
    OBJECT_TrialAll,                        // 一键高级试炼
    OBJECT_CircleAll,                       // 一键环式试炼
    OBJECT_CircleReward,                    // 环式试炼奖励
    OBJECT_BrotherReward,                   // 结义宝箱奖励
    OBJECT_WlzdBox,                         //武炼之道宝箱领取
    OBJECT_Arena,                           //竞技场结算奖励
    OBJECT_ZLKSweep,                        // 坠龙窟扫荡
    OBJECT_GangShop,                        // 仙盟商店
    OBJECT_GangContribute,                  // 仙盟捐献
    OBJECT_GangSalary,                      // 仙盟薪水
    OBJECT_ArtiFactBag,                     // 使用神器碎片袋
    OBJECT_SevenLogin,                      // 七天登录
    OBJECT_GangStore,                       // 仙盟仓库
    OBJECT_BuildSoul,                       // 铸魂
    OBJECT_CHOICECARD,						///副本翻牌
	OBJECT_GANGDEFENDWIN,					/// 工会守护成功
	OBJECT_GANGDEFENDFAILED,				/// 工会守护失败
	OBJECT_GANGDEFENDPRI,					/// 工会守护成功 个人奖励
	OBJECT_ArenaChallenge,					/// 竞技场挑战
	OBJECT_GangDartRank,					/// 仙盟运镖奖励
	OBJECT_MustDone,						/// 每日必做
	OBJECT_Activity,						/// 活动奖励
	OBJECT_Wlzd,							/// 无尽试炼通关
	OBJECT_Treasure,                        // 抽宝藏
    OBJECT_EquipMount,                      // 穿装备
    OBJECT_EquipUnmount,                    // 卸装备
    OBJECT_ZYTWin,                          // 镇妖塔胜利
    OBJECT_Market,                          // 市场获取
    OBJECT_DailySign,                       // 每日签到
    OBJECT_CDKey,                           // 礼包激活码获取
    OBJECT_CityShop,                        // 城战商店
    OBJECT_CityWorship,                     // 城战敬仰
    OBJECT_ZYTFirstWin,                     // 镇妖塔今日第一次完成
    OBJECT_XianWuBet,                       // 仙武之巅下注获胜奖励
    OBJECT_DuoBao,                          // 夺宝奇兵获得
    OBJECT_FengShen,                        // 封神之战
    OBJECT_XiuweiPill,                      // 消耗修为丹获取修为
    OBJECT_DomainBattlefield,               // 仙域战场
    OBJECT_PickUpDrop,                      // 获取掉落物
    OBJECT_Marry,                           // 结婚
    OBJECT_KILLPLAYER,						///击杀玩家
	OBJECT_TradeMove,						/// 交易移动
	OBJECT_TradeSwap,                       // 交易获取
    OBJECT_Bonfire,                         // 篝火活动增加经验
    OBJECT_SSJS,                                ///神圣晶石
	OBJECT_GangWarG,                         ///仙域争霸仙盟总奖励
	OBJECT_GangWarM,                         ///仙域争霸仙盟成员奖励
	OBJECT_TransportDart,                 ///每日运镖奖励
	OBJECT_GWGC,                           ///怪物攻城
	OBJECT_Guide,                           ///引导lua添加
	OBJECT_EquipStrength,                   //装备强化
    OBJECT_MentalStrenth,                   // 心法提升
    OBJECT_OPSGift,                 // 购买开服礼包
    OBJECT_DownloadReward,                  // 下载礼包
    OBJECT_LoveReward,                      //领取爱心礼包
    OBJECT_LuckyWheel,                      //抽取幸运转轮
    OBJECT_Notice,                          //游戏公告奖励
    OBJECT_RideEquipMount,                  // 坐骑装备
    OBJECT_RideEquipUnmount,                // 坐骑卸装备
    OBJECT_TmpBagPick,                      // 临时背包拾取
    OBJECT_DynItemUse,                      // 动态物品使用
    OBJECT_TreasureMapUse,                ///藏宝图使用
	OBJECT_GardenPick,                      // 药园拾取
    OBJECT_TrialExtra,                      // 试炼特殊获取
    OBJECT_CircleExtra,                     // 环式特殊获取
    OBJECT_GangSealBoss,					///仙盟封印大妖
	OBJECT_MustDoneReward,                  // 奖励信息
    OBJECT_RideReward,                      // 坐骑登录送礼
    OBJECT_LimitAct,						/// 限时活动
	OBJECT_Achieve,                         // 成就
    OBJECT_MallLimitBuy,                    // 购买商场抢购礼包
    OBJECT_ReStoreGoods,                    // 仓库取物品
    OBJECT_GangLuckyConfirm,                // 吉星高照确认骰子获取
    OBJECT_GangLuckyPerson,                 // 吉星高照 个人排名奖励
    OBJECT_GangLuckyGang,                   // 吉星高照 仙盟奖励
    OBJECT_ClimbTower,                      // 爬塔
    OBJECT_CrossSingleBet,                  // 跨服赛 单人 下注
    OBJECT_CrossSingleRank,                 // 跨服赛 单人 排名
    OBJECT_DiamondGod,                      // 财神到
    OBJECT_CircleWheel,                     // 环式转盘
    OBJECT_FightRank,                       // 战阶
    OBJECT_GANGPOINT,                  ///据点战
	OBJECT_GangWeekTaskReward,              ///周任务奖励
	OBJECT_GangTaskQuickReward,              ///周任务快速奖励
	OBJECT_GangWeekTaskWheelReward,         ///周任务转盘奖励
	OBJECT_LordRings,                       // 魔戒奖励
    OBJECT_FootUpLevel,                     // 足迹培养
    OBJECT_GangBossGang,                    // 仙盟boss仙盟奖励
    OBJECT_FashionBox,                      // 时装宝箱使用获取
    OBJECT_FindResource,                    // 发放奖励
    OBJECT_XianQiSweep,                     //仙器本扫荡
    OBJECT_ShenBIngSweep,                   //神兵本扫荡
    OBJECT_PracticeTask,                    //修炼日任务
    OBJECT_PracticeExchange,                //修炼日兑换
    OBJECT_PracticeLimitBuy,                //修炼日限购
    OBJECT_PracticeRecharge,                //修炼日充值
    OBJECT_RuneCopy,                        // 符文副本
    OBJECT_RuneShop,                        // 符文积分商店
    OBJECT_CrossPeakBox,                    // 巅峰竞技 次数宝箱奖励
    OBJECT_CrossPeakFeat,                       // 巅峰竞技 武勋奖励
    OBJECT_CrossPeakFight,                      // 巅峰竞技 对战奖励

    OBJECT_Holiday,                         //节日活动
    OBJECT_CircleStore,                         // 环式存储获取
    OBJECT_Assistant,                           // 小助手领取
    OBJECT_ChatCheck,                           //验证聊天
    OBJECT_DeathFightJoin,                      // 绝地乱斗 参与奖
    OBJECT_DeathFightKill,                      // 绝地乱斗 击杀奖
    OBJECT_Martial,                            ///新武道会
	OBJECT_DeathFightCopy,                      // 绝地乱斗 单场排名奖励
    OBJECT_HighTreasure,                        // 抽高级宝藏
    OBJECT_EquipPetMount,                   // 穿戴时 添加宠物装备
    OBJECT_EquipPetUnmount,                 // 卸装备 添加宠物装备


    ///玩家消耗物品时，AddWay格式用：COST_模块。
    COST_StoreGoods = 10000,                    // 存仓库物品
    COST_StoreSell,                         // 商店卖出
    COST_StoreBack,                         // 商店回购
    COST_GetTmp,                            // 临时背包取出
    COST_DropItem,                          // 丢弃物品
    COST_Compose,                           // 合成消耗
    COST_Decompose,                         // 分解消耗
    COST_UnlockGrid,                        // 开格子消耗
    COST_EquipStrength,                     // 装备强化
    COST_SkillUpgrade,                      // 技能升级
    COST_ZhuangSheng,                       // 转生
    COST_Exchange,                          // 额外经验转换修为
    COST_XiuweiDiamond,                     // 修为元宝转换
    COST_GoldPract,                         // 金币运功
    COST_DiamPract,                         // 钻石运功
    COST_GoldGuide,                         // 金币指点
    COST_DiamGuide,                         // 钻石指点
    COST_FashionUpgrade,                    // 时装升级
    COST_WingUpgrade,                   // 翅膀升级
    COST_Brother,                           //结义
    COST_ItemUse,                           // 物品使用消耗
    COST_ShopBuy,                           //购买杂货
    COST_MallBuy,                           //购买商城物品
    COST_EquipClear,                            //装备洗练
    COST_EquipLevelUp,                      //装备升阶
    COST_EquipRefine,                       //装备精炼
    COST_EquipDiamond,                      //装备镶嵌
    COST_Friend,                            //好友
    COST_Inherit,                           // 装备继承
    COST_SingleFBBuy,                       //单人副本购买
    COST_RideUpLevel,                       //培养坐骑
    COST_RideCompose,                       //骑装合成
    COST_PetGrow,                           // 宠物成长
    COST_PetSoul,                           // 宠物灵修
    COST_PetEatdan,                         // 宠物吃资质丹
    COST_PetEatEgg,                         // 宠物吃宠物蛋
    COST_PetSkillSave,                      // 宠物技能封印
    COST_PetSkillChange,                    // 宠物技能抄写消耗
    COST_PetSkillCompose,                   // 宠物技能合成
    COST_PetLearn,                          // 仙羽解锁
    COST_Task,                              // 任务消耗
    COST_ItemExchange,                      // 物品换购
    COST_TrumpActivate,                     // 法宝激活
    COST_TrumpRefine,                       // 法宝淬炼
    COST_XianqiStrenth,                     // 仙器提升
    COST_FashionExchange,                   // 时装兑换
    COST_WingUnlock,                        // 仙羽解锁
    COST_Chat,                              // 聊天
    COST_TrialQuick,                        // 试炼快速完成
    COST_TrialReward,                       // 试炼任务奖励
    COST_TrialAll,                          // 一键高级试炼
    COST_CircleAll,                         // 一键环式试炼
    COST_CircleReward,                      // 环式试炼奖励
    COST_Arena,                             //竞技场刷新冷却时间
    COST_ZLKBUYTIRED,                       // 坠龙窟购买体力
    COST_ZLKSweep,                          // 坠龙窟扫荡
    COST_GangSkill,                         // 仙盟技能
    COST_GangCreateDia,                     // 仙盟元宝创建
    COST_GangCreateTiken,                   // 仙盟令创建
    COST_GangShop,                          // 仙盟商店
    COST_GangContribute,                    // 仙盟捐献
    COST_ChallengeBoss,                     // 挑战boss
    COST_MentalStrenth,                     // 心法提升
    COST_ActiFactActivate,                  // 神器激活
    COST_GangApplyItem,                     // 公会申请仓库物品
    COST_GangApplyAdd,                      // 公会仓库存入物品
    COST_BuildSoul,                         // 铸魂
    COST_Treasure,                          // 抽宝藏
    COST_EquipMount,                        // 穿装备
    COST_EquipUnmount,                      // 卸装备
    COST_MarketBroad,                       // 市场广播消耗
    COST_Market,                            // 市场消耗
    COST_CityShop,                          // 城战商店
    COST_CityApply,                         // 城战申请
    COST_XianWuBet,                         // 仙武之巅下注
    COST_KillDrop,                          // 击杀掉落
    COST_Marry,                             // 结婚
    COST_MarryBreak,                        // 离婚
    COST_TradeMove,                         // 交易移动
    COST_TradeSwap,                         // 交易消耗
    COST_TransportDart,						///每日运镖消耗
	COST_Relive,							///复活消耗
	COST_FlyCost,							///飞鞋消耗
	COST_FrendEnemyFly,						///传送仇人消耗
	COST_GangDismiss,						///公会解散
	COST_GangLeave,							///离开公会
	COST_MaliceKill,						///恶意击杀
	COST_OpenServerGift,					///购买开服礼包
	COST_GangDart,							///仙盟运镖消耗
	COST_LimitAct,							/// 限时活动
	COST_TaskRefresh,                       // 环式任务刷星
    COST_RideEquipMount,                    // 坐骑装备
    COST_RideEquipUnmount,                  // 坐骑卸装备
    COST_TmpBagPick,                        // 临时背包拾取
    COST_ChangeGangName,                    // 改变仙盟名
    COST_ChangeRoleName,                    // 改变玩家名字
    COST_GardenUnlock,                      // 药园地解锁
    COST_GardenRefresh,                     // 药园刷新
    COST_GardenCD,                          // 药园减少cd
    COST_PillUse,                           // 丹药使用
    COST_ItemExpire,                        // 物品过期
    COST_MallLimitBuy,					    ///购买商城抢购礼包
	COST_ChangeLucky,					    ///吉星高照改运
	COST_ReStoreGoods,                      // 仓库取物品
    COST_SpecialSkill,                      // 神技升级
    COST_ClimbTower,                        //爬塔
    COST_DiamondUpgrade,                    // 已镶嵌宝石升级消耗
    COST_DiamondGod,                        // 财神到
    COST_GangWeekTaskQuick,                 // 玩家直接完成一轮任务
    COST_GangBossSublimt,                   // 仙盟上交
    COST_FashionBox,                        // 时装宝箱消耗
    COST_FootUpLevel,                       //足迹坐骑
    COST_LordRings,                         //神戒
    COST_SuitForge,                         //套装锻造
    COST_SuitRefine,                        //套装淬炼
    COST_SuitRealize,                       //套装锻造
    COST_FindResource,                      //资源找回
    COST_FBSweep,                           //副本扫荡
    COST_XianQiSweep,                       //仙器本扫荡消耗
    COST_ShenBIngSweep,                     //神兵本扫荡消耗
    COST_XianQIBuy,                         //仙器本购买次数
    COST_ShenBingBuy,                       //神兵本购买次数
    COST_GodWeapon,                         //神兵
    COST_VipBossFB,                         //vipboss副本进入
    COST_PracticeExchange,                  //修炼日兑换
    COST_PracticeLimitBuy,                  //修炼日限购
    COST_FieldActive,                   //领域激活
    COST_FieldUpgrade,                  //领域升级
    COST_XuwuBoss,                          // 虚无禁地
    COST_RunesLevelup,                      // 符文升级
    COST_RuneCopyGold,                      // 符文副本召唤金守卫
    COST_RuneExtract,                       // 符文寻宝
    COST_CrossPeakBuy,                      // 巅峰竞技 购买次数
    COST_RuneBuyTimes,                      // 符文副本 购买副本次数
    COST_UnlockRune,                        // 解锁符文槽位
    COST_Holiday,                   // 节日活动
    COST_MARTIAL,                         ///武道会消耗
	COST_EXPCOPYINSPIRE,            ///经验副本鼓舞
	COST_HighTreasure,                          // 抽高级宝藏
    COST_BestEquipUpgrade,                  // 极品装备升星
    COST_BestEquipStrength,                 // 极品装备强化
    COST_BestEquipClear,                    // 极品装备洗练
    COST_EquipPetMount,                 // 穿戴时移出宠物装备
    COST_EquipPetUnmount,				// 卸装备移出宠物装备
}

/**角色属性改变通知,**/
const enum NotifyType
{
	Set_HP=1,
	Set_MP,
	Set_FullHP,
	Set_FullMP,
}


//模块操作通用错误,
const enum ModuleResult
{
	E_OUTOF_SHAREMEMORY,		//共享内存不足,
}


/**
 * \enum	PackageResult 
 * \brief	背包操作返回结果集
*/
const enum PackageResult
{
    EPKG_SUCCESS = 0,           /*!< 背包操作成功 */
    EPKG_INVALIDTYPE,       /*!< 错误的物品类型 */
    EPKG_INVALIDGMID,       /*!< 错误的GMID */
    EPKG_INVALIDPACKAGE,    /*!< 无效的背包 */
    EPKG_NumNotEnough,      /*!< 物品数量不足 */

    EPKG_PACKAGEFULL,       // 背包已满
    EPKG_NOENOUGHGRID,      // 空间不足

    EPKG_NOSRCPACK,         // 源背包不存在
    EPKG_NODSTPACK,         // 目标背包不存在

    EPKG_Exception,         /*!< 异常情况 */
    EPKG_BindStatusError,   // 错误的绑定状态

    EPKG_OPERATE_FAILD,     //操作失败

    EPKG_DiaNotEnough,      // 钻石不足  （用于砖石转换物品）

    EPKG_ErrorProff,        // 职业错误

    // 物品使用返回值
    EPKG_CantUse,           //不能被使用

    // 时装相关
    EPKG_ErrorFashion,      // 错误时装

    // 药丸
    EPKG_FullHp,            // 血量已满
    EPKG_FullMp,            // 蓝量已满
    EPKG_NotEquiped,        // 祝福油  未装备武器
    EPKG_StillLive,         // 未死亡
    EPKG_InZhuanSheng,      // 转生等级，无法使用 (升级丹)
                            // 宠物蛋使用
    EPKG_PetFull,           // 可拥有宠物已满
                            // 正在冷却
    EPKG_CoolDown,
    // 回城卷
    EPKG_WrongPos,          // 只能在主城中使用

    EPKG_FullLucky,         // 祝福油  幸运值已满

    //秘藏钥匙和宝箱
    EPKG_NoMoreKey,// 钥匙不足
    EPKG_NoMoreBox,// 箱子不足

    EPKG_LowLevel,          // 等级不足,无法使用

    EPKG_DiamondLess,       // 元保不足
    EPKG_MeetCondition,     // 不满足开启条件
    EPKG_LessRideLv,        //少于坐骑丹使用阶数
    EPKG_MoreRideLv,        //多于坐骑丹使用阶数

    EPKG_NoWing,            // 没有翅膀
    EPKG_WingLimit,         // 翅膀等级过高
    EPKG_WingFail,			// 当前翅膀无法使用
    EPKG_MaxZhuan,			// 最高等级无法使用
    EPKG_RUNEPACKAGEFULL,   // 符文背包已满
    EPKG_NoBossTired,		// 当前没有boss疲劳
}



// 物品类型	11,人物时装；12，坐骑时装；13，足迹时装；14，人物装备；15，坐骑装备；16，药品消耗；
//			17，宝箱门票；18，养成材料；19，合成材料；20，宠物蛋；21，货币材料；22，不发背包的道具
const enum ObjectSubKind
{
    enKindWingsFashion = 9,
    enKindRunes = 10,
    enKindRoleFashion = 11,
    enKindRidingShow,
    enKindFootPrint,
    enKindEquipment,
    enKindRidingEquip = 15,
    enKindMedicines,
    enKindPrecious,
    enKindPromote,
    enKindCompose,
    enKindPetEggs = 20,
    enKindCurrency,
    enKindSpecial,

}

// 装备部位（1，护肩；2，衣服；3，裤子；4，护腕；5，腰带；6，鞋子；7，头盔；8，项链；9，护符；10，戒指；11，武器；12，手套）
const enum EquipPlace
{
    enEPStart = 0,
    enEPPauldron,       // 护肩
    enEPCloth,              // 衣服
    enEPTrousers,           // 裤子 
    enEPBracers,            // 护腕
    enEPBelt,               // 腰带
    enEPShoes = 6,          // 鞋子
    enEPHelmet,             // 头盔
    enEPNecklace,           // 项链
    enEPTalisman,           // 护符
    enEPRing,               // 戒指
    enEPWeapon = 11,        // 武器
    enEPGlove,              // 手套
                            //-------------------- 特殊装备 1-4
    enEPSpecial1,
    enEPSpecial2,
    enEPSpecial3,
    enEPSpecial4,

    enEPEnd,
}

//玩家属性改变   通知枚举,
const enum PlayDataClass
{
    notify_profession = 1,          //职业
    notify_trans,                   //转生次数
    notify_level,                   //等级,
    notify_levelmix,                //混合等级,
    notify_hpfull,                  //满hp值
    notify_hpnow,                   //hp当前值,
    notify_mpfull,                  //mp最大值,
    notify_mpnow,                   //mp当前值,

    notify_fightvalue,              //战力,
    notify_gold,                    //金币,
    notify_diamond,                 //砖石,
    notify_bindgold,                //金币,
    notify_binddiamond,             //砖石,
    notify_exp,                     //经验,

    notify_playermapid,             //地图id,
    notify_playerposx,              //位置sx,
    notify_playerposy,              //位置sy,
    notify_playervecx,              //方向cx,
    notify_playervecy,              //方向cy,
    notify_last_loginoff_time,      //上次下线时间,
    notify_accountid,               //账号id,
    notify_onlinestate,             //角色在线状态,

    notify_vipLv,                   //vip等级,
    notify_killValue,				///杀戮值
	notify_savvy,                   // 悟性
    notify_relive,                  // 复活次数

    notify_point,                   // 积分
    notify_feats,                   // 功勋
    notify_prestige,				// 声望

    notify_GangContribute,			// 仙盟贡献改变

}

const enum BindMethod
{
	enEquipBind = 1,		/*!< 装备绑定, */
	enPickBind,			/*!< 拾取绑定, */
}

// 绑定类型
const enum BindType
{
    enBTNone = 0,
    enBTBinded = 1,  // 绑定的
    enBTUnbind,  // 未绑定的
    enBTMixed,   // 混合

    enBTCount,
}

/**玩家属性枚举,*/
const enum RoleAttribute
{
    ///数值属性,
    RA_HP = 1,			///生命值,
	RA_MP,				///魔法值,
	RA_MinAttack,		///攻击力,
	RA_MaxAttack,       ///最大攻击力
	RA_MinDef,          ///最小防御
	RA_MaxDef,          ////最大防御
    RA_Hitrate,			///命中率,
	RA_Dodgerate,		///回避率,
	RA_Critrate,		///暴击率,
	RA_Critresistrate,	///韧性
	RA_LuckyValue,      ///幸运值
	RA_AttriCount,
}

const enum VirtualPlayerID
{
	enSystemPlayer=0,		//系统角色,
}

const enum ServerFlag
{
	SERVER_FLAG_NEW=0,	///新服,
	SERVER_FLAG_TUIJIAN,	///推荐,
	SERVER_FLAG_NULL,		///无标志,
}

const enum ServerState
{
    SERVER_STATE_LIANGHAO = 0,		///良好,
	SERVER_STATE_TUIJIAN,			    ///推荐,
	SERVER_STATE_XINFU,		            ///新服,
	SERVER_STATE_BAOMAN,			    ///爆满,
	SERVER_STATE_WEIHU,			        ///维护
	SERVER_STATE_WEIKAI,                ///暂未开放
	SERVER_STATE_CESHI,                  ///测试
}


const enum Recover_DeleteRole_Result
{
	DELETEROLE_OPER_SUCCESS=0, //成功,
	ERROR_SERVER_INIT_NOTOK=1,     //服务器数据未初始化好,
	ERROR_ALREADY_DELETED=2,       //角色已经删除了,
	ERROR_ROLEID_NOTEXIST=3,       //角色ID不存在,
	ERROR_DELETE_ROLE_UNKNOW=4,                //未知错误,
}
const enum AppStoreVerifyResult
{
	ASR_SUCCESS=0,				//客户端提示成功,
	ASR_HasPay=1,				//客户端不提示 直接finish
	ASR_ErrorPlayer=3,			//客户端提示非当前角色订单  请稍后,
	ASR_ErrorOrder=4,			//客户端提示订单错误  请稍后,
	ASR_ErrorProductID=5,		//客户端不提示 直接finish
}

const enum LoadTableOperation
{
	LO_Act_Begin=0,			//活动用的枚举,
	LO_Act_End=100000,		
	LO_Shop,
	LO_ActivityTime,
	LO_ChargeData,	//充值界面的数据,
	LO_TreasureBox,	//宝箱重新读取概率,


	LO_Center_Begin=200000,
	LO_GiftBag,		//更新动态礼包数据	 200000到300000发给中心服务器,
	LO_Center_End=300000,
}
const enum PlatformType
{
	PT_Android=1,
	PT_IOS=0,
}


//系统设置中cdkey使用情况 
const enum SystemSet_CDkeystate
{
	SystemSet_CDkey_success,	//成功,
	SystemSet_CDkey_invalError,	//无效的key
	SystemSet_CDkey_timeError,	//时间无效,
	SystemSet_CDkey_usedError,	//已经被使用,
	SystemSet_CDkey_areaError,	//区号限制,
	SystemSet_CDkey_bagError,	//格子不够,
	SystemSet_CDkey_sameError,	//已经使用过相同的key
	SystemSet_CDkey_noidError,	//没有找到奖励id
}

const enum MailSource
{
	enMailGMTool,			////gm工具,
	enMailCdKey,			///激活码cdkey
	enMailBlackMarket,		///黑市,
	enMailTreasureChest,	///开宝箱,
	enMailSanHuang,			// 征战三荒,
	enMailGshjFirst,		//古神浩劫首杀,
	enMailChallengeRent,	//试炼股宠物,
	enMailGangDismiss,		//公会解散,
	enMailArenaRefresh,		//竞技场刷新历史排名,
	enMailSnatch,			//被夺宝了挑衅下,
	enMailDailySignVip,			//VIP改变 每日签到奖励 补发,
	enMailSparCondegreeReturn,	//晶石竞标失败返还,
	enMailArenaSpiritDayReward, //竞技场每日奖励,
	enMailTopfightDayReward, //决战天寒每日奖励,
	enMailTopfightWeekReward, //决战天寒每周奖励,
	enMailFightAid,			//战斗援助,
	enMailMarry,				//姻缘邮件,
	enMailAnswer,				//论道奖励,
	enMailNone=300,
}

const enum TeamOperResult
{
	enTeamNotExist=1,     //队伍不存在或者已经开始匹配或者未开始匹配,
	enTeamRoleNotExist=2, //角色不在线,
	enTeamRoleNotIn=3,    //角色不再队伍中,
	enTeamRoleInAnother=4, //角色已经加入其他队伍,
	enTeamRoleInFb=5,     //角色加入其他活动,
	enTeamNotLeader=6,    //角色不是队长,
	enTeamFull=7,         //队伍已满,
	enTeamLeaderNotOper=8,//队长不能这样操作,
	enTeamException=9,    //服务器异常,
}

const enum TeamType
{
	enTeamNormal=0,   //普通组队,
	enTeamSanHuang=1, //三荒组队,
	enTeamWuMan=2, //三荒组队,
}

const enum TeamStatus
{
	enTeamInIng=0,   //在队伍中,
	enTeamDisMiss=1, //解散,
	enTeamKickOut=2, //被踢出,
	enTeamLeave=3,   //离开队伍,
}

///-----------------------------------------------------------------------------------------------------------------
/**
 * \enum	战斗数据来源的枚举 
 * \brief	
*/
const enum FightDataSource
{
	enFDRole=0,				/*!< 角色本身的基础属性, */
	enFDEquip,					/*装备属性,*/
	enFDTitle,					/*!< 称号提升, */
	enFDRune,					/*!< 雕纹提升, */
	enFDPet,					/*!< 宠物影响角色战斗力, */
	enFDEquipAwaken,			/*!< 装备觉醒属性变化, */
	enFDEquipForge,			/*!< 装备强化属性变化, */
	enFDEquipRefin,			/*!< 装备精练属性变化, */
	enFDEquipBreak,			/*!< 装备突破属性变化, */
	enFDPetFight,			// 上阵宠物战斗力变化  空的 只是为了重计算,
	enFDAstrolog,			//占星,
	enFDWing,				//羽化,
}


const enum BATTLETYPE
{
	BATTLE_CITY=0,				//主城,
	BATTLE_PVE_START=100,		//Pve战斗开始,
	BATTLE_NORNAL,				//普通副本,
	BATTLE_ELITE,				//精英副本,
	BATTLE_CHECKPOINT,			//关卡副本,
	BATTLE_SURVIVAL,			//生存副本,
	BATTLE_GOLD,				//金币副本,
	BATTLE_TEAM,				//组队副本,
	BATTLE_EVERYONE,			//全民乱战,古神浩劫,

    Battle_XianMengZhengBa=116,    //仙域争霸

    Battle_YiJieXuKong=147,         //异界虚空

	BATTLE_PVP_START=200,		//pvp战斗开始,
	BATTLE_SNATCH,				//夺宝大会,
	BATTLE_ARENA,				//竞技场,
	BATTLE_TOPFIGHT,			//巅峰对决,
	BATTLE_REALTIME,			//实时战场,
	BATTLE_TAIJI,				//太极战场,巫蛮之战，天岚壁障（无复活）,
	BATTLE_QUNPI,				//逐鹿战场，巫蛮之战，巫族战场,
	BATTLE_RING,				//擂台霸主，道海试炼,
	BATTLE_GUILDWAR,			//公会战1人战斗,
	BATTLE_TOPMATCH,			//巅峰联赛,
	BATTLE_THRONE,				//王座之巅,
	BATTLE_GUILDWAR_3v3,		//公会战3人战斗,
	BATTLE_CHAOSWAR,			//混沌战场,

	BATTLE_TEAM_BOSS,			// 神秘遗迹(组队打怪兽),
	BATTLE_ANSWER,				//论道,
	BATTLE_TEAM_BUFF,			//勇气之煞,
	BATTLE_WEDDING,			//喜宴,
}

///-----------------------------------------------------------------------------------------------------------------

const enum VIPACCESSTYPE
{
	enVIPACCESS_Recharge=0,		// 充值额度,
	enVIPACCESS_Reward,			// 领取礼包,
	enVIPACCESS_Title,			// VIP称号,
	enVIPACCESS_StaminaLimit,		// 体力上限,
	enVIPACCESS_Chastenlimit,	// 历练上限,
	enVIPACCESS_FifthSnatch,	// 五连夺宝权限,
	enVIPACCESS_OneKeySynthesis=6,	// 一键合成权限,
	enVIPACCESS_OneKeyReinforce,	// 一件强化,
	enVIPACCESS_BattleFBLimit,		// 战役副本上限,
	enVIPACCESS_FifthSweep,			// 五次扫荡权限,
	enVIPACCESS_TeamFBLimit,		// 组队副本上限,
	enVIPACCESS_RealTimeBattleLimit=11,	// 实时战场上限,
	enVIPACCESS_PVPReset,			// 擂台霸主充值,
	enVIPACCESS_DiamondAwaken,		// 钻石觉醒次数,
	enVIPACCESS_DiamondRealize,		// 钻石领悟次数,
	enVIPACCESS_BlackMarketRefresh,	// 刷新黑市次数,
	enVIPACCESS_GoldBagBuyLimit=16,	// 	金币袋购买数量,
	enVIPACCESS_StaminaPillBuyLimit,	// 体力丹购买数量,
	enVIPACCESS_ChastenPillBuyLimit,	// 历练丹购买数量,
	enVIPACCESS_IronBagBuyLimit,		// 陨铁袋购买数量,
	enVIPACCESS_SwapAwakenStoneBuyLimit,	//换魂石购买数量,
	enVIPACCESS_ImmortalStoneBuyLimit=21,	// 升仙石购买数量,
	enVIPACCESS_SilverChestBuyLimit,		//白银宝箱购买数量,
	enVIPACCESS_SilverChestKeyBuyLimit,		//白银钥匙购买数量,
	enVIPACCESS_GoldChestBuyLimit,			//黄金宝箱购买数量,
	enVIPACCESS_GoldChestKeyBuyLimit,		//黄金钥匙,
	enVIPACCESS_AnimalBoneBuyLimit=26,		//开尘兽骨购买次数,
	enVIPACCESS_StarDustBuyLimit,			//星之粉尘购买次数,
	enVIPACCESS_TopFightProtectTime,		//决战天寒保护次数,
	enVIPACCESS_FBExpIncrease,				//副本经验增加,
	enVIPACCESS_TiredRecoverLimit,			//体力恢复时间,
	enVIPACCESS_ChastenRecoverLimit,		//历练恢复时间,
	enVIPACCESS_END
}

// 排行榜类型,
const enum SORT_CRITERION 
{ 
	LEVEL_RANK,			//角色等级排行榜,
	POWER_RANK,			//角色战力排行榜,
	TOP_RANK,			//巅峰排行榜,
	COPY_RANK,			//副本排行榜,
	LIMITPET_RANK,		//限时宠物积分排行榜,
	CHALLENGE_EZ_RANK,	//试炼简单排行榜,
	CHALLENGE_HD_RANK,	//试炼困难排行榜,
	CHALLENGE_NM_RANK,	//试炼噩梦排行榜,
	GSHJ_RANK,			//古神浩劫排行榜(临时用的)
	TOP_REALTIME_RANK,	//决战天寒实时,
	RANK_COUNT,

	MARRY_RANK,		//姻缘排行榜,
}



/**
	*@brief		奖励的类型,
	*/
// const enum RewardType
// {
// 	Reward_SingleCharge=102,	///单笔充值,
// 	Reward_TotalCharge=103,		///累积充值,
// 	Reward_RushLevel=130,		///七天冲级,
// 	Reward_BindTelphone=150,	///手机绑定,
// 
// 	Reward_CdKey=202,			///激活码cdkey
// 	Reward_Vip=204,				///vip特权,
// 
// 	Reward_SevenSurprise=402,	///七天惊喜,
// 	Reward_JJGiftbag=403,		///竞技场礼包,
// 	Reward_32Good=404,			///32个赞,
// 	
// 	Reward_Swept=800,			///扫荡卷每日领取,
// 	Reward_MonthCard=801,		///月卡,
// 
// 	Reward_DayReward = 802,		///每日奖励,
// 	Reward_Gang = 803,			///公会礼包,
// 	Reward_ArenaRank = 804,		///竞技场排名,	
// 	Reward_JuedouFight = 805,	///角斗场排名礼包,
// 	Reward_BossFight = 806,		///Boss战斗排名礼包,
// 	Reward_3v3Rank = 807,		///3V3排名礼包,
// 	Reward_SevenDayVip = 808,	///七天vip,
// 	Reward_AreanVP=809,			///竞技场疲劳值,
// 	Reward_IosPay = 810,		///IOS付费礼包,
// 	Reward_GivingTried=811,		///赠送疲劳值,
// 	Reward_topfightTried=812,	///决斗之巅疲劳值,
// 	Reward_NiceReward=815,		///好评送好礼,
// 
// 	Wonderful_Sign=820,			///1、签到奖励 
// 	Wonderful_Hero,				///3、英雄投资 
// 	Wonderful_Login,			///4、登录送礼  
// 	Wonderful_DayCharge,		///5、每日充值 
// 	Wonderful_TotalCost,		///7、累计消费,
// 	Wonderful_Fuli,				///8、福利多多   
// 
// 	Reward_Default=1001,		///默认的简单运营活动,
// 	Reward_Count,
// }

const enum ActivityState
{
	Act_CanRcv=0,		///可领取,
	Act_NotRcv,			///未领取,
	Act_HadRcv,			///已领取,
}

const enum ActivityEnum
{
	GM_ZERO=0,
	GB_CHARGE=1,		//充值活动,
	GB_ACTIVITY=2,		//礼包活动,
	ONLINE_ACTIVITY=3,	//在线活动,
	OTHER_ACTIVITY=4,	//其他类,


	ACT_Month=100,		//月签礼包,
	ACT_Level,			//等级礼包,
	ACT_OpenServer,		//开服礼包,
	ACT_Online,			//在线礼包,
	ACT_DigTreasure,	//熊猫挖宝,
	ACT_Invest,			//投资计划,
	ACT_Eat,			//吃大餐,
	ACT_LimitPet,		//限时武神,
	ACT_MonthCharge,	//真情回馈(月充值)
	ACT_DayCharge,		//单日累计充值(日充值)
	ACT_Expend,			//钻石消耗,
	ACT_DiaTreasure,	//钻石宝箱十连抽,
	ACT_DoubleCopy,		//双倍副本,
	ACT_Login,			//累计登录,
	ACT_FirstOpen,		//新服礼包,
	ACT_DoubleArena,	//双倍竞技,
	ACT_DoubleCard,		//双卡惊喜,
	ACT_TenLuck,			//十连赠礼,
	ACT_Rotate,			//转盘活动,
	ACT_OSPreferential,		//开服特惠,
	ACT_ChargeReward,		//充值豪礼,
	ACT_FightUp=121,	//战力狂飙,

	/** 活动副本,*/
	ACT_FBActivity = 500,			//	活动副本开始,
	ACT_SpiritArena=510,			// 升灵竞技场  pvp ai
	ACT_Snatch=520,					// 夺宝大会		pvp	ai 抢东西,
	ACT_TeamFight=530,				// 组队副本  征战三荒,
	ACT_TopFightUnlock=540,				// 决战天寒解锁时间	pvp 实时,
	ACT_TopFightDouble=541,			// 决战天寒双倍,
	ACT_RealTime=550,				// 巫蛮之战 实时战场	多人pvp
	//ACT_TLPZUnlockNoon=551,			// 巫蛮之战 天岚壁障 中午开启	
	//ACT_TLPZUnlockMoon=552,			// 巫蛮之战 天岚壁障 晚上开启,
	//ACT_WZDDUnlockNoon=553,			// 巫蛮之战 巫族大地 中午开启,
	//ACT_WZDDUnlockMoon=554,			// 巫蛮之战 巫族大地 晚上开启,
	//ACT_HUNDUNUnlockNoon=555,		// 混沌战场 巫族大地 晚上开启,
	//ACT_HUNDUNUnlockMoon=556,		// 混沌战场 巫族大地 晚上开启,
	//ACT_BOSSNUnlockNoon=557,		// 神秘遗迹 巫族大地 晚上开启,
	//ACT_BOSSNUnlockMoon=558,		// 神秘遗迹 巫族大地 晚上开启,
	ACT_ANSWER=559,					//	习文论道,
	ACT_Challenge=560,				// 道海试炼 1v10 pvp ai
	ACT_GangWar_Fight=571,			// 部族战争 战斗,
	ACT_GangWar_Bid=572,			// 部族战争 竞标,
	ACT_GSHJ_Noon=580,				// 古神浩劫 中午时间,
	ACT_GSHJ_After=581,				// 古神浩劫 下午时间,
	ACT_GSHJ_Moon=582,				// 古神浩劫 晚上时间,




}
/**********************************其他运营活动枚举结束,***********************************/

const enum AcitivityEver
{
	AE_EverActivity=0,		//永久活动,
	AE_DaliyActivity=1,		//每天某个时段活动,
	AE_WeeklyActivity=2,	//每周某个时段活动,
	AE_AddedActivity=3,		//加开的活动,即一次性的,
}

const enum ActivityType
{
	AT_OtherActivity=0,		//运营活动 福利列表,
	AT_LimitActivity=1,		//缤纷礼包,
	AT_WonderfulActivity=2,	//精彩活动,
	AT_FBActivity=5,		///副本活动,
}

const enum ArenaVPState
{
	RewardArena_Minus=-1,		///免费体力次数 -1,
	RewardArena_Add=1,			///免费体力次数 +1,
}

///-----------------------------------------------------------------------------------------------------------------
///帮派职位,
const enum GangJob
{
	GJ_None = -1,
	GJ_Leader = 0,		///会长,
	GJ_AgentLeader,		///代理族长,
	GJ_ViceLeader,		///副会长,(长老)
	GJ_Elite,			///精英,
	GJ_Normal,			///普通会员,
	GJ_Count,
}

const enum  GangModuleID
{
	GANG_Bless=1,///帮派祈福,
	GANG_LifeTree=2,///帮派生命树,
	GANG_Boss=3,        ///帮派boss
	GANG_Battle=4,   ///帮派战,
	GANG_Default=10,///默认,
}

///-----------------------------------------------------------------------------------------------------------------
const enum Wonderful_Result
{
	WonderfulR_Success = 1,		///成功,
	WonderfulR_Error=2,			///非法请求,
	WonderfulR_Bagfull=3,		///背包已满,
	WonderfulR_SignHad=4,		///签到奖励已经领取,
	WonderfulR_Gearfull=5,		///英雄计划已经领取到最大档位了,
	WonderfulR_LessLevel=6,		///英雄计划等级不足,
	WonderfulR_HadHero=7,		///英雄计划已购买,
	WonderfulR_LessDiamond=8,	///晶石不足,
	WonderfulR_SevenHad=9,		///已领取当次七天惊喜奖励,
	WonderfulR_NotGiftbag=10,	///礼包不存在,
	WonderfulR_NotTried=11,		///体力不可领取,
	WonderfulR_NoTimes=12,		///补签次数不足,
	WonderfulR_NeedtResign=13,	///不需要在补签了,
	WonderfulR_NoSet=14,		///没有设置奖励数据,
	WonderfulR_NoTime=15,		///时间未到,
	WonderfulR_HasGet=16,		///已经领取了该奖励,
	WonderfulR_CantGet=17,		///不可领取,
	WonderfulR_VipLess=18,		///vip等级不足,
	WonderfulR_LastNum,			//次数不足,
}

const enum Wonderful_State
{
	WonderfulState_NotAch=0,	///不可领取,
	WonderfulState_CanAch,		///可领取,
	WonderfulState_HadAch,		///已领取,
	WonderfulState_Close,		///已关闭,
	WonderfulState_NotOpen,		///未开启,
}


const enum Op_Event_Log
{
	// loginserver
	OEL_ClientFirstOpenStart = 1,	// 客户端初次打开,
	OEL_ClientFirstOpenEnd,			// 客户端打开完成,
	OEL_ResouceDownloadBegin,		// 资源下载开始,
	OEL_ResouceDownloadEnd,			// 资源下载完成,
	OEL_RegisterAccount = 5,		// 帐号注册完成,
	OEL_AccountLogin,				// 帐号登录完成,
	OEL_NoticeOpen,					// 公告打开,
	OEL_NoticeClose,				// 公告关闭,
	OEL_SelectServer,				// 选择服务器,
	OEL_StartGame=10,				// 点击屏幕开启游戏,
	OEL_RoleCreateUIStart,			// 角色创建界面加载开始,
	OEL_RoleCreateUIEnd,			// 角色创建界面加载完成,
	// gameserver
	OEL_CreateRole,  // 点击创建角色按钮,
	OEL_NewBeeFBStart,				// 新手副本加载开始	
	OEL_NewBeeFBEnd = 15,			// 新手副本加载完成,
	OEL_FirstMove,					// 第一次移动摇杆,
	OEL_EnterBlueCircle,			// 进入蓝圈内,
	OEL_FirstNormalAttack,			// 第一次点击普通攻击,
	OEL_FirstRefreshMonster,		// 第一次刷新怪物,
	OEL_SillUnlock=20,				// 技能解锁,
	OEL_USESkill_1,					// 使用技能1
	OEL_USESkill_2,					// 使用技能2
	OEL_USESkill_3,					// 使用技能3
	OEL_USESkill_4,					// 使用技能4
	OEL_EnterArea2 = 25,			// 进入区域2
	OEL_SecondScene,				// 出现第二个剧情,
	OEL_PetComeOut,					// 宠物出现,
	OEL_JumpFirstScene,				// 第一次点击跳过剧情,
	OEL_EnterArea3,					// 进入区域3
	OEL_DiTianComeOut=30,			// 帝天出现,
	OEL_ThirdScene,					// 出现第三个剧情,
	OEL_PetDead,					// 宠物死亡,
	OEL_JumpSecondScene,			// 第二次点击跳过剧情,
	OEL_SoulSummon,					// 引兽魂入体,
	OEL_FourthScene,				// 出现第四个剧情,
	OEL_SumingAppear,				// 苏铭出现,
	OEL_SumingTalk,					// 苏铭对话,
	OEL_JumpThirdScene,				// 第三次点击跳过剧情,
	OEL_CityLoadStart,			// 主城加载开始,
	OEL_CityLoadEnd=40,				// 主城加载完成,
	//	OEL_Task1Guid,					// 点击任务1指引,
	OEL_FirstNPCTalk,				// 第一次加载ＮＰＣ对话,
	OEL_Task1Complete,				// 点击任务1完成,
	OEL_Task2Guid ,				// 点击任务2 指引,
	OEL_FB1LoadStart,				// 副本1加载开始,
	OEL_FB1LoadEnd=45,					// 副本1加载完成,
	OEL_KillBossSlowStart,			// 击杀boss加载慢镜头开始,
	OEL_KillBoss1SlowEnd,			// 击杀boss加载慢镜头完成,
	OEL_FB1Result,				// 副本1结算,
	OEL_FB1SwitchCard,				// 副本1翻牌,
	OEL_SecondLoadCity=50,				// 第二次主城加载完成,
	OEL_UnlockSkill2,				// 解锁技能2
	OEL_Task2Complete,				// 任务2完成,
	OEL_Task3Guid,				// 点击任务3指引,
	OEL_FB2LoadStart,				// 副本2加载开始,
	OEL_FB2LoadEnd=55,					// 副本2加载完成,
	OEL_KillBoss2SlowEnd,			// 击杀boss加载慢镜头完成,
	OEL_FB2Result,					// 副本2结算,
	OEL_FB2SwitchCard,			// 副本2翻牌,
	OEL_ThirdLoadCity,				// 第三次主城加载完成,
	OEL_LevelWard=60,					// 领取等级礼包,
	OEL_OpenBronzeOne,				// 抽取精良宝箱,
	OEL_CleanPackage,				// 整理背包,
	OEL_SwapEquip,				// 替换武器,
	OEL_UpgradeEquip,				// 升级武器,
	OEL_Task3Finsh=65,					// 任务3完成,
	OEL_Task4Guid,					// 点击任务4指引,
	OEL_FB3LoadStart,				// 副本3加载开始,
	OEL_FB3LoadEnd,				// 副本3加载完成,
	OEL_KillBoss3SlowEnd,			// 击杀boss加载慢镜头完成,
	OEL_FB3Result=70,					// 副本3结算,
	OEL_FB3SwitchCard,				// 副本3翻牌,
	OEL_ForthLoadCity,				// 第四次主城加载完成,
	OEL_OpenBronzeTen,			// 开启精良宝箱十连抽,
	OEL_FirstPetSummon,				// 召唤小红,
	OEL_FirstPetStren=75,				// 强化小红,
	OEL_FirstPetBattle,				// 小红上阵,
	OEL_UnlockSkill3,				// 解锁技能3
	OEL_UpPetSkill,	  // 升级附灵技,
	OEL_Task4Complete,				// 点击任务4完成,
	OEL_Task5Guid=80,					// 点击任务5指引,
	OEL_FB4LoadStart,				// 副本4加载开始,
	OEL_FB4LoadEnd,					// 副本4加载完成,
	OEL_KillBoss4Slow,			// 击杀boss加载慢镜头完成,
	OEL_FB4Result,					// 副本4结算,
	OEL_FB4SwitchCard=85,				// 副本4翻牌,
	OEL_FifthLoadCity,				// 第五次主城加载完成,
	OEL_PrologueChest,				// 序章宝箱领取,
	OEL_Task5Complete,				// 完成任务5
}

//服务器控制开关对应枚举(表s_type_activity_switch)
const enum FunctionEnum
{
	FI_BEGIN=1,
	FI_FirstRecharge = FI_BEGIN,// 首充,
	FI_EnablePayment,			// 支付,
	FI_LoginReward,				// 登陆豪礼 
	FI_Swapcode,				// 礼包兑换,
	FI_END,
}

// 设置枚举,
const enum PushSwitch 
{
	PS_PhysicalMax = 1,			// 体力值回复满	2^0
	PS_ChastenMax = 2,			// 历练值回复满,
	PS_EatFood = 4,				// 美食天下通知,
	PS_GSHJ = 8,				// 古神浩劫开启,
	PS_WMZZ = 16,				// 巫蛮之战开启,
	PS_TopFight = 32,			// 决战天寒开启,
	PS_GangFight = 64,			// 部落战争开启	2^6

	PS_FriendApply = 32768,		// 好友申请		2^15
	PS_GangJoin = 65535,		// 加入部族,
	PS_GangApply = 131072,		// 部族申请,
	PS_GangPosition = 262144,	// 部族职位变动,
	PS_SnatchNotify = 524288,	// 秘宝之争,
	PS_TeamInvite = 1048576,	// 组队邀请		2^20

}

const enum BuffWarBuffId 
{
	BUFFWAR_BUFFID = 6080103,			// buff id 

}

const enum SURFACEPLACE
{
    SP_TITLE = 1,////称号
    SP_WING = 2,///翅膀
	SP_WEAPON = 3,///武器
	SP_BODY = 4,///身体
	SP_HORS = 5,///坐骑
	SP_VIP = 7,///vip等级
	SP_KILLVALUE = 8,///杀戮值
	SP_XIANQI = 9,	///仙器
	SP_TRUMP = 10,	///法宝
	SP_MINSTREN = 11,	///最小强化等级
	SP_KILLSTATE = 12,///杀戮模式改变
	SP_TEAMCHANGE = 13,///      
	SP_YINSHEN = 14,/// 隐身状态     
	SP_SPEEDCHANGE = 15,///移动速度变化
	SP_EVILSTATECHANGE = 16,///恶意杀人状态，0、没有恶意杀人，1、恶意杀人
	SP_FOOT = 17,				///足迹
    SP_MOVESPEED = 18,    ///人物最终的移动速度
}

//const enum COPYKIND    ///副本类型
//{
//    CK_DEFAULT = 0,
//    CK_SCENE = 1,///主场景
//	CK_SINGLEPVE = 10,///单人pve
//	CK_DOUBLEPVE,///多人pve
//	CK_SINGLEPVP,///单人pvP
//	CK_TEAMPVP,///组队pvP
//	CK_WULIANZHIDAO,///武练之道
//	CK_ARENA,///竞技场
//	CK_HBLY,///寒冰炼狱副本
//	CK_DHQ,///断魂桥
//	CK_LINGSHOUDAO,///灵兽岛
//	CK_WULIANGSHENGDI,///无量圣地
//	CK_SIWANGHUANGMO,///死亡荒漠
//	CK_ZHUILONGKU,///坠龙窟
//	CK_DUOBAOQIBING,///夺宝奇兵
//	CK_BOSS,///boss战副本
//	CK_ZHENMOTA,///镇魔塔
//	CK_WUDAOHUI,///武道会
//	CK_FENGSHENZHIZHAN,///封神之战
//	CK_XIANMENGGOUHUO,///仙盟篝火
//	CK_MIZANGLIEREN,///密藏猎人
//	CK_SIXIANGSHENTAI,///四象神台
//	CK_XIANMOHUANJING,///仙魔幻境(仙域战场)
//	CK_MARRY,	///仙侣副本,
//	CK_GANGDEFEND,///仙域守护
//	CK_GANGWAR,///仙域争霸
//	CK_GANGCITY,///仙盟城战
//	CK_GANGCITYINNER,///仙盟城战内城
//	CK_WUDAOZHIDIAN,///武道之巅(仙武之巅)
//	CK_GANGWARSECOND,///仙盟争霸第二场
//	CK_MAINTASK,///主线任务
//	CK_WUDAOHUI_PREPARE,///武道会准备场景
//	CK_NEWCOPY,///新手本
//	CK_TESTCOPY,// 测试副本
//    CK_CANGBAODONG,///藏宝洞副本
//	CK_PINGLUANCHUBAO,///平乱除暴副本
//	CK_FINALBOSS,/// 荒古神域
//	CK_CLIMBTOWER,/// 爬塔
//	CK_SINGLECROSSS,///单人跨服
//	CK_GANGBOSS,	///仙盟boss
//	CK_FOOTCOPY,	///足迹本
//	CK_XIANQICOPY,	///仙气本
//	CK_SHENBINGCOPY,///神兵本
//	CK_WEEKTASK1,	///杀怪通过
//	CK_WEEKTASK2,	///积分通关
//	CK_WEEKTASK3,	///传送点通关
//	CK_GANGPOINT,  ///据点战副本
//	CK_VIPBOSS,  ///vipboss
//    CK_RUNECOPY,
//    CK_TOPAREA,///巅峰竞技
//	CK_HOLLOW,///异界虚空
//	CK_WEEKENDACT,///周末活动
//	CK_MARTIAL,///新武道会
//	CK_DEATHFIGHT,///绝地乱斗
//    CK_EQUIPCOPY,	/// 装备副本
//	CK_EXPCOPY,		/// 经验副本
//	CK_RIDECOPY,	/// 坐骑副本
//	CK_WINGCOPY,	/// 翅膀副本
//    CK_EXPVALLEYCOPY,///经验谷
//    CK_Cross3V3,	///跨服3v3
//}


const enum COPYKIND    ///副本类型
{
	CK_DEFAULT = "CK_DEFAULT",
	CK_SCENE = "CK_SCENE",///主场景
	CK_SINGLEPVE = "CK_SINGLEPVE",///单人pve
	CK_DOUBLEPVE = "CK_DOUBLEPVE",///多人pve
	CK_SINGLEPVP = "CK_SINGLEPVP",///单人pvP
	CK_TEAMPVP = "CK_TEAMPVP",///组队pvP
	CK_WULIANZHIDAO = "CK_WULIANZHIDAO",///武练之道
	CK_ARENA = "CK_ARENA",///竞技场
	CK_HBLY = "CK_HBLY",///寒冰炼狱副本
	CK_DHQ = "CK_DHQ",///断魂桥
	CK_LINGSHOUDAO = "CK_LINGSHOUDAO",///灵兽岛
	CK_WULIANGSHENGDI = "CK_WULIANGSHENGDI",///无量圣地
	CK_SIWANGHUANGMO = "CK_SIWANGHUANGMO",///死亡荒漠
	CK_ZHUILONGKU = "CK_ZHUILONGKU",///坠龙窟
	CK_DUOBAOQIBING = "CK_DUOBAOQIBING",///夺宝奇兵
	CK_BOSS = "CK_BOSS",///boss战副本
	CK_ZHENMOTA = "CK_ZHENMOTA",///镇魔塔
	CK_WUDAOHUI = "CK_WUDAOHUI",///武道会
	CK_FENGSHENZHIZHAN = "CK_FENGSHENZHIZHAN",///封神之战
	CK_XIANMENGGOUHUO = "CK_XIANMENGGOUHUO",///仙盟篝火
	CK_MIZANGLIEREN = "CK_MIZANGLIEREN",///密藏猎人
	CK_SIXIANGSHENTAI = "CK_SIXIANGSHENTAI",///四象神台
	CK_XIANMOHUANJING = "CK_XIANMOHUANJING",///仙魔幻境(仙域战场)
	CK_MARRY = "CK_MARRY",	///仙侣副本,
	CK_GANGDEFEND = "CK_GANGDEFEND",///仙域守护
	CK_GANGWAR = "CK_GANGWAR",///仙域争霸
	CK_GANGCITY = "CK_GANGCITY",///仙盟城战
	CK_GANGCITYINNER = "CK_GANGCITYINNER",///仙盟城战内城
	CK_WUDAOZHIDIAN = "CK_WUDAOZHIDIAN",///武道之巅(仙武之巅)
	CK_GANGWARSECOND = "CK_GANGWARSECOND",///仙盟争霸第二场
	CK_MAINTASK = "CK_MAINTASK",///主线任务
	CK_WUDAOHUI_PREPARE = "CK_WUDAOHUI_PREPARE",///武道会准备场景
	CK_NEWCOPY = "CK_NEWCOPY",///新手本
	CK_TESTCOPY = "CK_TESTCOPY",// 测试副本
	CK_CANGBAODONG = "CK_CANGBAODONG",///藏宝洞副本
	CK_PINGLUANCHUBAO = "CK_PINGLUANCHUBAO",///平乱除暴副本
	CK_FINALBOSS = "CK_FINALBOSS",/// 荒古神域
	CK_CLIMBTOWER = "CK_CLIMBTOWER",/// 爬塔
	CK_SINGLECROSSS = "CK_SINGLECROSSS",///单人跨服
	CK_GANGBOSS = "CK_GANGBOSS",	///仙盟boss
	CK_FOOTCOPY = "CK_FOOTCOPY",	///足迹本
	CK_XIANQICOPY = "CK_XIANQICOPY",	///仙气本
	CK_SHENBINGCOPY = "CK_SHENBINGCOPY",///神兵本
	CK_WEEKTASK1 = "CK_WEEKTASK1",	///杀怪通过
	CK_WEEKTASK2 = "CK_WEEKTASK2",	///积分通关
	CK_WEEKTASK3 = "CK_WEEKTASK3",	///传送点通关
	CK_GANGPOINT = "CK_GANGPOINT",  ///据点战副本
	CK_VIPBOSS = "CK_VIPBOSS",  ///vipboss
	CK_RUNECOPY = "CK_RUNECOPY",
	CK_TOPAREA = "CK_TOPAREA",///巅峰竞技
	CK_HOLLOW = "CK_HOLLOW",///异界虚空
	CK_WEEKENDACT = "CK_WEEKENDACT",///周末活动
	CK_MARTIAL = "CK_MARTIAL",///新武道会
	CK_DEATHFIGHT = "CK_DEATHFIGHT",///绝地乱斗
	CK_EQUIPCOPY = "CK_EQUIPCOPY",	/// 装备副本
	CK_EXPCOPY = "CK_EXPCOPY",		/// 经验副本
	CK_RIDECOPY = "CK_RIDECOPY",	/// 坐骑副本
	CK_WINGCOPY = "CK_WINGCOPY",	/// 翅膀副本
	CK_EXPVALLEYCOPY = "CK_EXPVALLEYCOPY",///经验谷
	CK_Cross3V3 = "CK_Cross3V3",	///跨服3v3
}


const enum FashionType
{
    Body=1,
    Weapon=2
}

//const enum YinShenType
//{
//    UnYinShen=0,
//    YinShen
//}


/// <summary>
/// 常用物品、属性ID
/// </summary>
const enum ObjectID
{
    /// <summary>
    /// 悟性
    /// </summary>
    Wuxing= 215503001,
    BindGold = 215514001,//绑铜
}

/// <summary>
/// 角色类型
/// </summary>
const enum RoleType
{
	CT_None="CT_None",
	CT_Hero = "CT_Hero",        //角色,
	CT_Monster="CT_Monster",         //怪物,
	CT_Boss="CT_Boss",			//机器人,
	CT_NPC="CT_Npc",     //Npc
	CT_Pet="CT_Pet",				//宠物,
	CT_Collect="CT_Collect", //采集物
	CT_LightWall="CT_LightWall",  //光墙
	CT_Summom="CT_Summom",
	CT_Show="CT_Show",   //展示用(模型之类
}

/// <summary>
/// 坐骑姿势
/// </summary>
const enum RidePose
{
    RP_Site=1,
    RP_Stand=2,
    RP_Lying = 3,
}

const enum LoadingType
{

}

// 杀戮状态
const enum Kill_State
{
	KS_None=0,
	KS_PEACE = 1,///和平模式
	KS_ALLKILL = 2,///全体模式
	KS_TEAM = 3,///组队模式
	KS_GANG = 4,///仙盟模式
	KS_SHANER = 5,///善恶
}


// 玩法类型id
const enum PlayType
{
    enPT_Start = 10000,             // 玩法活动
                                    //10001	地宫boss
    enPT_TransportDart = 10002,     // 每日运镖
    enPT_GWGC = 10003,              // 怪物攻城
                                    //10004	秘藏猎人
    enPT_Gang_Dart = 10005,         // 仙盟运镖
    enPT_Gang_Bonfire = 10006,      // 仙盟篝火
    enPT_Domain_Battlefield = 10007,// 仙魔幻境
    enPT_WuDaoHui = 10008,          // 武道会
    enPT_Gang_CityFight = 10009,    // 仙盟攻城
    enPT_Gang_War = 10010,          // 仙域争霸
    enPT_Gang_Defend = 10011,       // 仙域守护
    enPT_SacredStone = 10012,       // 神圣晶石
    enPT_HYQX = 10013,              // 荒野奇袭
    enPT_DuoBao = 10014,            // 夺宝奇兵
    enPT_FengShen = 10015,          // 封神之战
    enPT_XianWu = 10016,            // 武道之巅
    enPT_CHUBAO = 10017,            // 除暴活动
    enPT_XunBao = 10018,            // 寻宝平乱
    enPT_FinalBoss = 10019,         // 终极囚天
    enPT_CrossCopy = 10020,         // 跨服战
    enPT_GangWeekTask = 10021,      // 仙盟周任务
    enPT_GangBoss = 10022,          // 仙盟boss


    enPT_BOSS12 = 20000,          ///12点boss
	enPT_BOSS14,          ///14点boss
	enPT_BOSS16,          ///16点boss
	enPT_BOSS18,          ///18点boss
	enPT_BOSS20,          ///20点boss
	enPT_BOSS22,          ///22点boss
	enPT_HunChe = 30000,          ///婚车（按时间刷怪活动）
	enPT_GangCity = 40000,  // 外城活动
    enPT_GangCityIn,        // 内城活动
    enPT_End,						// 玩法活动结束
}

/// <summary>
/// 玩法基本状态
/// </summary>
const enum ActBaseState
{
    enABS_None = 0,             // 未开始

    enABS_ActStart = 10,        // icon显示

    enABS_ActFight = 20,        // 战斗开始

    enABS_ActEnd = 30,			// 结束

}

// 日志踩点枚举
const enum ClientPoint
{
    CLIENTPOINT_1 = 1,  // 点击游戏开始
    CLIENTPOINT_1_1,    // 检查游戏版本
    CLIENTPOINT_1_2,    // 添加下载资源
    CLIENTPOINT_1_3,    // 检查资源是否完整
    CLIENTPOINT_2,      // 更新开始
    CLIENTPOINT_3,      // 更新结束
    CLIENTPOINT_4,      // 客户端进入登入界面（SDK登陆
    CLIENTPOINT_5,      // 进入注册账号界面
    CLIENTPOINT_6,      // 开始账号注册
    CLIENTPOINT_7,      // 完成账号注册
    CLIENTPOINT_7_1,    // 开始登陆
    CLIENTPOINT_8,      // 登陆完成
    CLIENTPOINT_8_1,    // 向服务器发包请求服务器列表
    CLIENTPOINT_8_2,	// 服务器回服务器列表
    CLIENTPOINT_9,      // 进入服务器选择界面
    CLIENTPOINT_10,     // 点击开始游戏
    CLIENTPOINT_11,     // 角色创建界面加载开始
    CLIENTPOINT_12,     // 角色创建界面加载完成
    CLIENTPOINT_13,     // 角色创建界面结束
    CLIENTPOINT_14,     // 新手副本加载开始
    CLIENTPOINT_15,     // 第一次剧情对话（角色自言自语）
    CLIENTPOINT_16,     // 达到区域一
    CLIENTPOINT_17,     // 第二次剧情对话（和小怪对话）
    CLIENTPOINT_18,     // 击杀小怪一（200001）
    CLIENTPOINT_19,     // 达到区域二
    CLIENTPOINT_20,     // 第三次剧情对话（和小怪对话）
    CLIENTPOINT_21,     // 击杀小怪二（200002）
    CLIENTPOINT_22,     // 第四次剧情对话（怪物掉宝）
    CLIENTPOINT_23,     // 吸取掉落物
    CLIENTPOINT_24,     // 第五次剧情对话（实力增强）
    CLIENTPOINT_25,     // 达到区域三
    CLIENTPOINT_26,     // 第六次剧情对话（PK）
    CLIENTPOINT_27,     // 更改人物状态
    CLIENTPOINT_28,     // 击杀小怪三（200003）
    CLIENTPOINT_29,     // 第七次剧情对话（祝福油）
    CLIENTPOINT_29_1,   // 达到区域四
    CLIENTPOINT_30,     // 第八次剧情对话（BOSS）
    CLIENTPOINT_31,     // 跑向指定位置
    CLIENTPOINT_32,     // BOSS血量小于等于280000
    CLIENTPOINT_33,     // 第九次剧情对话（使用祝福油）
    CLIENTPOINT_34,     // 弹出使用框
    CLIENTPOINT_35,     // 第十次剧情对话（祝福油强力）
    CLIENTPOINT_36,     // 跑向指定位置
    CLIENTPOINT_37,     // BOSS血量小于等于100000
    CLIENTPOINT_38,     // 第十一次剧情对话（红名）
    CLIENTPOINT_39,     // 跑向指定位置
    CLIENTPOINT_40,     // 击杀红名（200005）
    CLIENTPOINT_41,     // 第十二次剧情对话（击杀红名）
    CLIENTPOINT_42,     // 跑向指定位置
    CLIENTPOINT_43,     // BOSS血量小于等于80000
    CLIENTPOINT_44,     // 第十三次剧情对话（BOSS暴走）
    CLIENTPOINT_45,     // BOSS释放全屏特效
    CLIENTPOINT_46,     // 第十四次剧情对话(与BOSS对话
    CLIENTPOINT_47,     // 是否跳过新手本
    CLIENTPOINT_48,     // 是否开始loading
    CLIENTPOINT_49,     // 预先加载某些资源
    CLIENTPOINT_50,     // 开始加载主城一资源
    CLIENTPOINT_51,     // 主城一资源加载完成
    CLIENTPOINT_52,     // 等待服务器回包
    CLIENTPOINT_53,     // 开始加载人物资源
    CLIENTPOINT_54,     // 人物资源加载完成
    CLIENTPOINT_55,     // 加载资源完成
    CLIENTPOINT_56,     // loading界面关闭
    CLIENTPOINT_57,     // 进入主城一
    CLIENTPOINT_58_1,   // 宠物预览
    CLIENTPOINT_58_2,   // 翅膀预览
    CLIENTPOINT_58_3,   // 坐骑预览

    CLIENTPOINT_Task1_1,    // 点击接受任务1（左上角）
    CLIENTPOINT_Task1_2,    // 点击接受任务1对话框
    CLIENTPOINT_Task1_3,    // 点击完成任务1对话框开始
    CLIENTPOINT_Task1_4,    // 点击完成任务1对话框结束

    CLIENTPOINT_Task2_1,    // 点击接受任务2（左上角）
    CLIENTPOINT_Task2_2,    // 点击接受任务2对话框开始
    CLIENTPOINT_Task2_3,    // 点击任务2对话框结束
    CLIENTPOINT_Task2_4,    // 接受任务2后开始寻路
    CLIENTPOINT_Task2_5,    // 任务2寻路被打断
    CLIENTPOINT_Task2_6,    // 接受任务2后寻路结束
    CLIENTPOINT_Task2_7,    // 点击任务2交任务对话框开始
    CLIENTPOINT_Task2_8,    // 点击任务2交任务对话框结束
    CLIENTPOINT_Task2_9,    // 点击装备

    CLIENTPOINT_Task3_1,    // 点击任务3接受任务（左上角）
    CLIENTPOINT_Task3_2,    // 点击任务3接受任务对话框开始
    CLIENTPOINT_Task3_3,    // 点击任务3接受任务对话框结束
    CLIENTPOINT_Task3_4,    // 点击任务3完成任务（左上角）
    CLIENTPOINT_Task3_5,    // 点击任务3完成任务对话框开始
    CLIENTPOINT_Task3_6,    // 点击任务3完成任务对话框结束
    CLIENTPOINT_Task3_7,    // 点击装备

    CLIENTPOINT_Task4_1,    // 点击接受任务4（左上角）
    CLIENTPOINT_Task4_2,    // 点击任务4对话框开始
    CLIENTPOINT_Task4_3,    // 点击任务4对话框结束
    CLIENTPOINT_Task4_4,    // 点击普攻按钮
    CLIENTPOINT_Task4_5,    // 点击任务4完成对话框开始
    CLIENTPOINT_Task4_6,    // 点击任务4完成对话框结束

    CLIENTPOINT_Task5_1,    // 点击任务5接受任务（左上角）
    CLIENTPOINT_Task5_2,    // 点击任务5接受任务对话框开始
    CLIENTPOINT_Task5_3,    // 点击任务5接受任务对话框结束
    CLIENTPOINT_Task5_4,    // 任务5寻路开始
    CLIENTPOINT_Task5_5,    // 任务5寻路中断
    CLIENTPOINT_Task5_6,    // 任务5寻路结束
    CLIENTPOINT_Task5_7,    // 点击任务5对话框开始
    CLIENTPOINT_Task5_8,    // 点击任务5对话框结束

    CLIENTPOINT_Click_1,    // 点击遥感移动
    CLIENTPOINT_Click_2,    // 点击地面移动
    CLIENTPOINT_Click_3,    // 点击人物头像
    CLIENTPOINT_Click_4,    // 点击vip充值
    CLIENTPOINT_Click_5,    // 点击和平按钮
    CLIENTPOINT_Click_6,    // 点击小地图
    CLIENTPOINT_Click_7,    // 点击首充
    CLIENTPOINT_Click_8,    // 点击福利
    CLIENTPOINT_Click_9,    // 点击充值返还
    CLIENTPOINT_Click_10,   // 点击精彩活动
    CLIENTPOINT_Click_11,   // 点击开服活动
    CLIENTPOINT_Click_12,   // 点击排行榜
    CLIENTPOINT_Click_13,   // 点击邮件
    CLIENTPOINT_Click_14,   // 点击背包
    CLIENTPOINT_Click_15,   // 点击设置
    CLIENTPOINT_Click_16,   // 点击人物
    CLIENTPOINT_Click_17,   // 点击外观
    CLIENTPOINT_Click_18,   // 点击商城
    CLIENTPOINT_Click_19,   // 点击市场
    CLIENTPOINT_Click_20,	// 点击社交

}

//系统设置
const enum SystemSettingEnum
{
    SystemSettine_None=0,
    SystemSetting_PingBi,              //同屏人数
    SystemSetting_SceneEffect,         //场景特效
    SystemSetting_OthersPlayerEffect,  //其他玩家的特效
    SystemSetting_Map,                 //小地图更新
    SystemSetting_MainUIEffect,        //主界面特效
    SystemSetting_MyEffect,            //自身的特效
}

const enum GAMEPLATFORM  ///游戏平台
{
    GP_NONE = 0,///内部平台
	GP_Andriod = 1,///安卓混服
	GP_Appstore = 2,///appstore
	GP_Yingyongbao = 3,///应用宝
	GP_Jiuyou = 4,///九游
	GP_Appstore_majia = 5,///appstore马甲专服
	GP_Yinghe = 6,///硬核（OPPO、vivo、酷派、金立、联想、华为、魅族、小米）
	GP_PAPA = 7,///啪啪专服
	GP_MHJ = 8,///莽荒纪
	GP_TUOWAN_Appstore = 9,///拓玩appstore
	GP_TUOWAN_Andriod = 10,///拓玩安卓
	GP_PINGCE = 11,///评测服
	GP_Xinji = 12,      ///心迹专服
	GP_JiuJiu = 13,    ///九九
	GP_Youxi = 14,    ///游禧
	GP_HuiYao = 15,	///辉耀专服
	GP_HaoDong = 16, ///浩动专服
	GP_ChuangYu = 17,///创娱专服
	GP_Anqu = 18,///安趣专服
	GP_TuoWan_GangAoTai = 19,///拓玩港澳台
	GP_MiaoJu = 20,///妙聚
	GP_LiuWu = 21,///65游戏
	GP_DuoQu = 22,///多趣游戏
	GP_SiJiuYou = 23,///49游
	GP_DuoQu_Second = 24,///多趣游戏 新专服
	GP_YunTianKong = 25,///云天空专服
	GP_WuXiang = 26,///物象专服
	GP_TuTu = 27,///图图专服
	GP_LeTang = 28,///乐糖专服
	GP_YouLong = 29,///游龙专服
	GP_XueGao = 30,///雪糕专服
	GP_QiLinYou = 31,///麒麟游
	GP_DuoQu_Third = 32,///多趣专服3
	GP_JiTuo = 33,///即拓
	GP_ChuangXing = 34,///创星
	GP_MiYU = 35,///米娱
	GP_MiaoJu_IOS = 36,///妙聚IOS专区
	GP_Duoqu_Fourth = 37,///多趣专服4
	GP_ChuangMeng = 38,///创梦专区
	GP_51gamer_Leiting_29Game = 39,///51gamer 雷霆游戏 29游戏三个渠道混在一个专服
	GP_7k7k = 40,///7k7k专服
	GP_Baidu = 41,///百度专服
	GP_QiangWan = 42,///抢玩专服
	GP_vietnam = 43,///越南专服
	GP_Appstore_1 = 44,///自家appstore专服
	GP_Duoqu_Five = 45,// 多趣5
    GP_ZhongYou = 46,///中游
	GP_BanMa = 47,///斑马专服
	GP_KuXuanYou = 48,///酷炫游
	GP_HuJiao = 49,///胡椒
	GP_QuanMinHuYu = 50,///全民互娱
	GP_AnQu_QILinYou_TuTu = 51,///安趣 麒麟游 图图 三个渠道混在一个专服
	GP_MiaoLe = 52,///秒乐
	GP_KuaiYou = 53,///快游
	GP_Duoqu_Six = 54,// 多趣6
    GP_1377 = 55,// 贪玩
    GP_ZhanYu = 56,// 瞻宇
    GP_1377_IOS = 57,// 贪玩IOS
    GP_BoYou = 58,//博游
    GP_AWeiYou = 59,//阿游威
    GP_KXY_GAT = 60,//酷炫游港澳台
    GP_TianZhan = 61,//天战
    GP_QiPaBT = 62,//奇葩BT
    GP_TanWanNEW = 63,//新贪玩
    GP_QiPaNew = 64,//新奇葩
    GP_HuiXuan = 65,//惠选66
    GP_QingFeng = 66,//清风
    GP_XiaoQi = 67,//小七专服
    GP_QiPaBT2 = 68,//奇葩2
	GP_YouXiMao=70,//游戏猫
    GP_New_Andriod = 101,// 新混服 莽荒纪



    GP_YhyxToMhj = 1000, // 永恒仙域-硬核-移动
}
