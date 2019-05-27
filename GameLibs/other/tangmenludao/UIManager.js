UIManager = function() {
    function t() {
        this.tweenParan = {},
        this.uncloseWin = [t.LOGIN_WIN, t.LOGIN_SELECT, t.CREATE_WIN],
        this.apptionWin = [],
        this.m_hideSEms = 0
    }
    return Object.defineProperty(t, "instance", {
        get: function() {
            return null == this.m_instance && (this.m_instance = new t),
            this.m_instance
        },
        enumerable: !0,
        configurable: !0
    }),
    t.prototype.init = function() {
        this.windows = new Object;
        var e = this.winClass = new Object,
        i = t;
        
        e[i.PLSJWIN] = PlatformSJWin,
        e[i.PLVIPWIN] = PlatformSuperVipWin,
        e[i.PLCHENMI] = PlatformChenMiWin,
        e[i.PCWDWIN] = PlatformWDWin,
        e[i.PCSDWIN] = PlatformSDWin,
        e[i.PCGQWIN] = PlatformGQWin,
        e[i.TASKGUIDEVIEW] = TaskGuideWin,
        this.limit = new ExPanelLimit,
        this.limit.addExclude(["store_storeWin", "role_roleWin", "symbol_symbolWin", "VIP_PAST", "skill_skillWin", "pack_packWin", "settingWin", "friend_friendWin", "chat_win", "map_win", "equip_win", "task_win", "pet_win", "hecheng_win", "copy_win", "clan_createWin", "boss_bossWin", "func_processwin", "rank_win", "everyDay_win", "contour_win", "story_desWin", "story_welComeWin", "jingji_win", "TAIXUTIANTA_CLOSE", "XUNBAOVIEW", "zhuanzhi_win", "husongxiannv", "activity_fuliWin", "ACTIVITY_KAIFUMUBIAO", "activity_quanminchongbang", "act_shouchong", "act_shouchongtehui", "act_shenmixiangou", "TREASURE_WIN", "zhuanzhiCopy_win", "lingyuanqianggou", "CHENGJIUMAINVIEW", "warHallWin", "clanwar_worshipWin", "TUJIAN_WIN", "jingyaota_win", "ShenQiWin", "kaifuhuodong_win", "recharge_win", "touzi_win", "act_shouchongfd", "act_vipwangzhe", "act_vipzhizun", "act_shengshi", "act_meirichong", "meiriyiyuan_win", "vipequip_win", "jiPinHongZhuangWin", "YiBuDengTianWin", "tehuiAct_win", "liudaobang_win", "wanba_shou_q_vip_privilege", "wanba_daily_gift", "wanba_vip_gift", "wanba_new_gift", "qzone_huangzuan", "qzone_tequan", "dating_lanzuanWin", "dating_lanzuanxufeiWin", "dating_lanzuanChargeWin", "dating_tequanWin", "newyear_win", "MarketWin", "wanba_score_gift", "xsygWin", "act_ShouChongFanLi", "HeFuActWin", "jieriActWin", "act_ZhuanPanAct", "hongniang_win", "liangyuan_win", "tiqin_win", "yanqing_win", "lihun_win", "yuyue_win", "dijieyinyuan_win", "hunli_win", "xhWinSuc", "xhWinAcp"]),
        this.m_uiLayer = new Laya.Component,
        this.m_uiLayer.name = "uiLayer",
        this.m_windowLayer = new Laya.Component,
        this.m_windowLayer.name = "windowLayer",
        this.m_dialogLayer = new Laya.Component,
        this.m_dialogLayer.name = "dialogLayer",
        this.m_tipLayer = new Laya.Component,
        this.m_tipLayer.name = "tipLayer",
        this.m_uiLayer.addChild(this.m_windowLayer),
        this.m_uiLayer.addChild(this.m_dialogLayer),
        this.m_uiLayer.addChild(this.m_tipLayer),
        this.m_uiLayer.mouseThrough = this.m_windowLayer.mouseThrough = this.m_dialogLayer.mouseThrough = this.m_tipLayer.mouseThrough = !0,
        TipsManager.ins.init(this.m_tipLayer)
    },
    t.prototype.initMainUI = function() {
        this.m_fightPanel || (this.m_fightPanel = new FightingChangePanel),
        this.m_mainView || (this.m_mainView = new MainView),
        this.m_windowLayer.addChildAt(this.m_mainView, 0),
        this.validateSize()
    },
    t.prototype.validateSize = function() {
        this.m_uiLayer.width = this.m_windowLayer.width = this.m_dialogLayer.width = this.m_tipLayer.width = Laya.stage.width,
        this.m_uiLayer.height = this.m_windowLayer.height = this.m_dialogLayer.height = this.m_tipLayer.height = Laya.stage.height,
        this.m_guideLayer && (this.m_guideLayer.width = this.m_uiLayer.width, this.m_guideLayer.height = this.m_uiLayer.height),
        this.m_mainView && (this.m_mainView.width = Laya.stage.width, this.m_mainView.height = Laya.stage.height),
        this.m_fightPanel && (this.m_fightPanel.x = (Laya.stage.width - this.m_fightPanel.width) / 2, this.m_fightPanel.y = (Laya.stage.height - this.m_fightPanel.height) / 2 + 250);
        var e = t;
        this.isOpen(e.Story_DesWin) && this.getWindow(e.Story_DesWin).valdtS(),
        this.isOpen(e.Story_WelcomeWin) && this.getWindow(e.Story_WelcomeWin).valdtS(),
        this.isOpen(e.Story_TalkWin) && this.getWindow(e.Story_TalkWin).valdtS(),
        this.isOpen(e.TASK_BOSSSHOWWIN) && this.getWindow(e.TASK_BOSSSHOWWIN).validateSize()
    },
    Object.defineProperty(t.prototype, "mainView", {
        get: function() {
            return this.m_mainView
        },
        enumerable: !0,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "fightPanel", {
        get: function() {
            return this.m_fightPanel
        },
        enumerable: !0,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "tipLayer", {
        get: function() {
            return this.m_tipLayer
        },
        enumerable: !0,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "dialogLayer", {
        get: function() {
            return this.m_dialogLayer
        },
        enumerable: !0,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "windowLayer", {
        get: function() {
            return this.m_windowLayer
        },
        enumerable: !0,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "uiLayer", {
        get: function() {
            return this.m_uiLayer
        },
        enumerable: !0,
        configurable: !0
    }),
    t.prototype.openWindow = function(e, i, n, s, a, o, r, h, l) {
        if (void 0 === i && (i = !0), void 0 === n && (n = null), void 0 === s && (s = !1), void 0 === a && (a = !1), void 0 === o && (o = null), AutoOpenWinManager.ins.isVer(e) && AutoOpenWinManager.ins.isHave()) return AutoOpenWinManager.ins.auto(e, {
            isCenter: i,
            winData: n,
            showMask: s,
            isTween: a,
            tweenArr: o,
            whArr: r,
            paneScale: h,
            xyPonit: l
        }),
        void 0;
        this.limit.onCheckLimit(e);
        var c = this.windows[e];
        return null == c && this.winClass[e] ? (c = new this.winClass[e], c && (c.name = e, this.windows[e] = c)) : c && !c.isReg && c.isInit && c.reg(),
        c ? (r && h && (c.scaleX = c.scaleY = h), c.data = n, c.parent ? (this.m_windowLayer.setChildIndex(c, this.m_windowLayer.numChildren - 1), UnitView.instance.
        switch (e), ViewUnitManager.instance.
        switch (e)) : (this.m_windowLayer.addChild(c), a && o ? (c.x = o[0], c.y = o[1], this.tweenParan || (this.tweenParan = {}), this.tweenParan[c.name] || (this.tweenParan[c.name] = {}), this.tweenParan[c.name] = {
            x: o[2],
            y: o[3]
        },
        GameTween.get(c).to({
            alpha: 1,
            x: o[2],
            y: o[3]
        },
        500, Laya.Ease.quadOut, this.onTweenComplete, this, c)) : i ? e == t.NPC_WIN || e == t.TASK_DAILYWIN || e == t.LOWSET_WIN || e == t.TASK_CLANWIN ? (c.x = 0, c.centerY = 0) : e == t.BOSS_MESS ? (c.right = 225, c.bottom = 350) : e == t.PACK_DRESS ? (c.centerX = 0, c.bottom = 200) : e == t.COPY_STAR ? (c.top = 150, c.x = Laya.stage.width - c.width) : e == t.ROLE_JHCHENGHAO ? (c.centerX = 0, c.bottom = 160) : e == t.ZIGUANXIANJIE_MAINTIMU ? this.globalPos && (c.x = this.globalPos.x - 70, c.y = this.globalPos.y - 40) : l ? (c.x = l.x, c.y = l.y) : (c.centerX = 0, !GameModel.pc && c.height < 800 && 645 == c.height ? c.y = 40 + (Laya.stage.height - 40 - c.height >> 1) : c.centerY = 0) : l ? (c.x = l.x, c.y = l.y) : (c.centerX = 0, c.y = 0)), c.showMask = s, !GameModel.pc && this.m_winLayer && this.m_winLayer.parent && this.m_windowLayer.setChildIndex(this.m_winLayer, this.m_windowLayer.numChildren - 1)) : Log.i("打开窗体失败  " + e),
        c
    },
    t.prototype.openRecharge = function() {
        return ShouChongManager.instance.isFirstRecharge() ? ShouChongManager.instance.isFirstRecharge() && ShouChongManager.instance.fanLiEndTime && Number(ShouChongManager.instance.fanLiEndTime) - GameModel.serverInfo.serverTime > 0 ? (t.instance.openWindow(t.ACT_SHOUCHONGFANLI, !0, null, !0), void 0) : 101 == Define.syLoginType ? (utils.recharge(0, 0), void 0) : (GameModel.pc && (GameModel.environment.isDaTing() || GameModel.environment.isQZone()) ? t.instance.openWindow(t.DATING_LANZUANRECHARGE, !0, null, !0) : t.instance.openWindow(t.RECHARGE_WIN, !0, {
            tabIndex: 0
        },
        !0), void 0) : (t.instance.openWindow(t.ACT_SHOUCHONG, !0, null, !0), void 0)
    },
    t.prototype.onTweenComplete = function(t) {
        this.tweenParan[t.name] && (t.x = this.tweenParan[t.name].x, t.y = this.tweenParan[t.name].y, this.tweenParan[t.name] = null, delete this.tweenParan[t.name])
    },
    t.prototype.getWindow = function(t) {
        return this.windows[t]
    },
    t.prototype.isUIWindow = function() {
        for (var e in this.windows) if (this.windows.hasOwnProperty(e)) {
            var i = this.windows[e];
            if (i && e != t.NPC_WIN && e != t.TASK_DAILYWIN && e != t.LOWSET_WIN && e != t.TASK_CLANWIN && e != t.ACT_SHOUCHONGQIPAO) return ! 0
        }
        return ! 1
    },
    t.prototype.isOpen = function(t) {
        return this.windows[t] && this.windows[t].parent
    },
    t.prototype.closeWin = function(t) {
        this.isOpen(t) && this.windows[t].cloWin()
    },
    t.prototype.closeAll = function() {
        var t = this.windows;
        for (var e in t) this.closeWin(e)
    },
    t.prototype.closeSpecifyWin = function(t) {
        if (this.mapTypeArr || (this.mapTypeArr = GlobalVO.getGlobalVO(1135).value.split(";")), this.specifyWin || (this.specifyWin = GlobalVO.getGlobalVO(1136).value.split(";")), -1 == this.mapTypeArr.indexOf(String(t))) this.closeAll();
        else for (var e in this.specifyWin) if (this.specifyWin.hasOwnProperty(e)) {
            var i = this.specifyWin[e];
            this.closeWin(i)
        }
    },
    t.prototype.closeApptionWin = function() {
        var t = this.windows;
        for (var e in t) e && this.apptionWin && -1 == this.apptionWin.indexOf(e) && -1 == this.uncloseWin.indexOf(e) && this.closeWin(e)
    },
    t.prototype.setUnopenWin = function(t) {
        t && t.length >= 0 && (this.apptionWin = t)
    },
    t.prototype.destroyWin = function(t) {
        var e = this.getWindow(t);
        e && null == e.parent && e.canDestroy() && (GameTween.removeTweens(e), this.windows[t] = null, delete this.windows[t], e.destroy())
    },
    t.prototype.removeFromParent = function(e) {
        e && (e.unreg(), e.showMask = !1, e.parent && e.parent.removeChild(e), e.freedTime = e.name == t.NPC_WIN ? Laya.Browser.now() : 0, this.destroyWin(e.name), AutoOpenWinManager.ins.isVer(e.name) && AutoOpenWinManager.ins.getWin())
    },
    t.prototype.clear = function(t) {
        void 0 === t && (t = !0);
        var e = 0,
        i = this.windows;
        for (var n in i) if (e += 1, !this.isOpen(n) && i[n].canDestroy() && (Log.i("清理窗体资源：window=" + n), this.destroyWin(n), t)) return ! 0;
        return 0 == e && this.m_hideSEms > 0 && this.m_mainView && (Log.e("清理隐藏 num=" + this.m_hideSEms), this.m_hideSEms = 0, this.showSceneElements(null)),
        !1
    },
    t.prototype.addToDialogLayer = function(t) {
        this.m_dialogLayer.addChild(t)
    },
    t.prototype.removeFromDialogLayer = function(t) {
        t.parent && this.m_dialogLayer.removeChild(t)
    },
    t.prototype.addToTipsLayer = function(t) {
        this.m_tipLayer.addChild(t)
    },
    t.prototype.removeFromTipsLayer = function(t) {
        t.parent && this.m_tipLayer.removeChild(t)
    },
    t.prototype.initGuideLayer = function() {
        this.m_guideLayer || (this.m_guideLayer = new Laya.Component, this.m_guideLayer.name = "guideLayer"),
        this.m_guideLayer && (this.m_guideLayer.width = this.m_uiLayer.width, this.m_guideLayer.height = this.m_uiLayer.height),
        this.m_guideLayer.parent || this.m_uiLayer.addChildAt(this.m_guideLayer, 0),
        this.m_guideLayer.mouseEnabled = !0,
        this.m_guideLayer.mouseThrough = !0
    },
    t.prototype.removeGuideLayer = function() {
        this.m_guideLayer && (this.m_guideLayer.removeSelf(), this.m_guideLayer = null)
    },
    t.prototype.addToGuideLayer = function(t) {
        this.m_guideLayer || this.initGuideLayer(),
        this.m_guideLayer.addChild(t)
    },
    t.prototype.removeFromGuideLayer = function(t) {
        t.parent && this.m_guideLayer && this.m_guideLayer.removeChild(t)
    },
    t.prototype.graphicsWhiteScreen = function() {
        var t = this;
        this.m_guideLayer.graphics.clear(),
        this.m_guideLayer.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#ffffff"),
        TimeUtils.callLate(function() {
            t.removeWhiteScreen()
        },
        this, 2e3)
    },
    t.prototype.removeWhiteScreen = function() {
        this.m_guideLayer.graphics.clear(),
        TimeUtils.callLate(function() {
            SceneManager.ins.removeStoryStatic()
        },
        this, 3e3)
    },
    t.prototype.getHideView = function() {
        return null != this.m_winLayer && null != this.m_winLayer.parent
    },
    t.prototype.getCoinPos = function(t) {
        if (!this.m_winLayer || this.m_winLayer && !this.m_winLayer.isInit) return null;
        var e;
        switch (t) {
        case BuyType.YinLiang:
            e = new Laya.Point(this.m_winLayer.moneyBox.x, this.m_winLayer.moneyBox.y);
            break;
        case BuyType.YuanBao:
            e = new Laya.Point(this.m_winLayer.goldBox.x, this.m_winLayer.goldBox.y);
            break;
        case BuyType.BangYuan:
            e = new Laya.Point(this.m_winLayer.bindGoldBox.x, this.m_winLayer.bindGoldBox.y)
        }
        return this.m_winLayer.localToGlobal(e)
    },
    t.prototype.showSceneElements = function() {
        this.m_hideSEms > 0 && this.m_hideSEms--,
        0 == this.m_hideSEms && (this.m_mainView && this.m_mainView.cgeVSta(!0), this.m_winLayer && (this.m_winLayer.unregist(), this.m_winLayer.parent && this.m_windowLayer.removeChild(this.m_winLayer)), SetManager.instance.openLimit = !1)
    },
    t.prototype.hideSceneElements = function(t) {
        0 == this.m_hideSEms && (this.m_mainView && (GameModel.pc ? this.m_mainView.cgeVSta(!0) : this.m_mainView.cgeVSta(!1)), SetManager.instance.openLimit = !0, GameModel.pc || (t.shwHead ? (null == this.m_winLayer && (this.m_winLayer = new WindowLayerWin), this.m_winLayer.regist(t.width, t.height), this.m_winLayer.parent ? this.m_windowLayer.setChildIndex(this.m_winLayer, this.m_windowLayer.numChildren) : this.m_windowLayer.addChildAt(this.m_winLayer, this.m_windowLayer.numChildren)) : this.m_winLayer && (this.m_winLayer.unregist(), this.m_winLayer.parent && this.m_windowLayer.removeChild(this.m_winLayer)))),
        t.canHide && this.m_hideSEms++
    },
    
    t.DATING_TEQUAN = "dating_tequanWin",
    t.XIN_YUE = "xin_yue",
    t.WANBAREDWIN = "WanBaRedWin",
    t.PLCOMWIN = "plcomwin",
    t.PLWX = "weixinWin",
    t.PLPFWIN = "PlatformPFWin",
    t.PLSJWIN = "PlatformSJWin",
    t.PLVIPWIN = "PlatformVIPWin",
    t.PLCHENMI = "PlatformChenMiWin",
    t.PCWDWIN = "PlatformWDWin",
    t.PCSDWIN = "PlatformSDWin",
    t.PCGQWIN = "PlatformGQWin",
    t.TASKGUIDEVIEW = "taskGuideView",
    t.closeWinArr = [],
    t
} (),