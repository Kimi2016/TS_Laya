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
