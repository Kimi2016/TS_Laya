OpBase = function() {
    function t() {
        this.m_sceneMgr = SceneManager.ins,
        this.m_socket = GameModel.socket,
        t.limitSet(),
        t.limitCount[EffectLimitType.NOMAL] = 0,
        t.limitCount[EffectLimitType.HIT] = 0
    }
    return t.can = function(e) {
        return e != EffectLimitType.LIMIT && (e == EffectLimitType.NO || this.limitCount[e] < t.limitMax[e])
    },
    t.raise = function(t) {
        this.limitCount[t]++
    },
    t.reduce = function(t) {
        this.limitCount[t]--
    },
    t.limitSet = function() {
        var e = Laya.FPSMonitor.instance.getLevel();
        e >= Laya.FPSMonitor.LEVEL_3 ? GameModel.pc ? (t.limitMax[EffectLimitType.NOMAL] = 40, t.limitMax[EffectLimitType.HIT] = 40) : GameModel.ios ? (t.limitMax[EffectLimitType.NOMAL] = 0, t.limitMax[EffectLimitType.HIT] = 0) : (t.limitMax[EffectLimitType.NOMAL] = 0, t.limitMax[EffectLimitType.HIT] = 0) : GameModel.pc ? (t.limitMax[EffectLimitType.NOMAL] = 40, t.limitMax[EffectLimitType.HIT] = 40) : GameModel.ios ? (t.limitMax[EffectLimitType.NOMAL] = 5, t.limitMax[EffectLimitType.HIT] = 5) : (t.limitMax[EffectLimitType.NOMAL] = 8, t.limitMax[EffectLimitType.HIT] = 8)
    },
    t.prototype.getCaster = function() {
        return this.getSceneObj(this.castetGuid)
    },
    t.prototype.setScenePosition = function(t, e) {
        this.m_scenePosi2D = new Laya.Point(t, e),
        this.m_viewPosi2D = new Laya.Vector3(this.m_sceneMgr.cam2.getViewX(t), this.m_sceneMgr.cam2.getViewY(e)),
        this.m_viewPosi3D = new Laya.Vector3,
        this.m_sceneMgr.screenCoordTo3DCoord(this.m_viewPosi2D, this.m_viewPosi3D)
    },
    t.prototype.start = function() {
        return null == this.skillParent || null == this.getCaster() ? (this.stop(), void 0) : (this.doStart(), void 0)
    },
    t.prototype.stop = function() {
        this.doCompleted()
    },
    t.prototype.getTX = function() {
        return this.m_viewPosi2D.x
    },
    t.prototype.getTY = function() {
        return this.m_viewPosi2D.y
    },
    t.prototype.doStart = function() {},
    t.prototype.doTarget = function() {
        this.sendFlag ? (this.findTarget(), MapManager.ins.mapVO.mapType != MapType.JingJi && this.sendTarget()) : this.message && t.showHurts(String(this.message.attackerId), this.skillParent, this.skillAction, this.message.attVOList)
    },
    t.prototype.doCompleted = function() {
        this.sendFlag = !1,
        this.castetGuid = null,
        this.skillParent = null,
        this.skillAction = null,
        this.lType = 0,
        this.targets = null,
        ObjectPool.d(this)
    },
    t.prototype.shake = function() {
        if (this.skillAction.shake) {
            var t = this.getCaster(); (t == this.m_sceneMgr.self || t.type == UnitType.Monster && t.data.difficulty == MonsterDifficulty.Boss) && this.m_sceneMgr.shakeScreen()
        }
    },
    t.prototype.findTarget = function(t, e, i) {
        if (void 0 === t && (t = -1), void 0 === e && (e = -1), void 0 === i && (i = -1), this.sendFlag) {
            var n = this.getCaster();
            if (null != n) {
                if (this.targetGuid && 3 == this.skillAction.choose && 1 == this.skillAction.maxTarget) {
                    var s = this.getSceneObj(this.targetGuid);
                    if (s && s.canAtk()) return this.targets = [s.data.sguid],
                    void 0
                }
                var a = AttackManager.ar[this.skillAction.stype];
                this.targets = a ? a.find(n, this.skillAction, this.getTX(), this.getTY(), t, e, i) : null
            }
        }
    },
    t.prototype.sendTarget = function() {
        if (this.sendFlag && this.targets && this.targets.length) {
            var t = this.getCaster();
            if (null == t) return;
            var e = PathManager.tilPoi(this.m_scenePosi2D.x, this.m_scenePosi2D.y),
            i = CMDManager.gq("42002");
            i.caster = t.data.sguid,
            i.skillId = this.skillParent.id,
            i.actionId = this.skillAction.actionid,
            i.index = this.skillAction.index,
            i.targetList = this.targets,
            i.x = e.x,
            i.y = e.y,
            this.m_socket.send(42002, i)
        }
    },
    t.prototype.playCasterEffect = function(e, i) {
        if (void 0 === e && (e = 0), void 0 === i && (i = !1), null != this.skillParent && t.can(this.lType)) {
            var n = this.getCaster();
            if (null != n && n.isOpenRender && n.inView) {
                var s = 0;
                if (i) {
                    s = Util.getPointAngle(this.m_viewPosi3D.x - n.pos3D.x, this.m_viewPosi3D.y - n.pos3D.y) + .5 * Math.PI;
                    var a = Util.radian2angle(s);
                    s = 0 > a ? 360 + a: a
                }
                this.skillAction.se1 && "" != this.skillAction.se1 && t.plyEff(this.getEffectUri(e, this.skillAction.se1), n, n.scePos, s, !1, !0, this.lType, !1),
                this.skillAction.se2 && "" != this.skillAction.se2 && t.plyEff(this.getEffectUri(e, this.skillAction.se2), n, n.scePos, s, !1, !0, this.lType, !0),
                this.skillAction.se3 && "" != this.skillAction.se3 && t.playUnitEffect(n, this.getEffectUri(e, this.skillAction.se3), s, !0, this.lType, null, !1),
                this.skillAction.se4 && "" != this.skillAction.se4 && t.playUnitEffect(n, this.getEffectUri(e, this.skillAction.se4), s, !0, this.lType, null, !0),
                this.skillAction.ss && n == this.m_sceneMgr.self && t.playSound(this.skillAction.ss)
            }
        }
    },
    t.prototype.getEffectUri = function(t, e) {
        return e
    },
    t.prototype.playAreaEffect = function() {
        if (null != this.skillParent && t.can(this.lType)) {
            var e = this.getCaster();
            null != e && e.isOpenRender && e.inView && (this.skillAction.area1 && "" != this.skillAction.area1 && t.plyEff(this.skillAction.area1, e, this.m_scenePosi2D, 0, !1, !0, this.lType, !1), this.skillAction.area2 && "" != this.skillAction.area2 && t.plyEff(this.skillAction.area2, e, this.m_scenePosi2D, 0, !1, !0, this.lType, !0))
        }
    },
    t.playUnitEffect = function(e, i, n, s, a, o, r, h) {
        return void 0 === n && (n = 0),
        void 0 === s && (s = !0),
        void 0 === a && (a = EffectLimitType.NOMAL),
        void 0 === o && (o = null),
        void 0 === r && (r = !0),
        void 0 === h && (h = !1),
        i = PathDefine.SKILL + "LayaScene_" + i + "/" + i + ".lh",
        SceneManager.ins.cam2 ? null != e && e.isOpenRender && e.inView && null != i && 0 != i.length ? s && !AssetManager.ins.hasEff(AssetType.Effect, i, CacheResUtils.getEffectAssetTime(e.self || h), !0, e.self || h) ? null: t.can(a) ? e.plyEff(i, !1, a, o, n, r, h) : null: null: null
    },
    t.plyEff = function(e, i, n, s, a, o, r, h) {
        void 0 === s && (s = 0),
        void 0 === a && (a = !1),
        void 0 === o && (o = !0),
        void 0 === r && (r = EffectLimitType.NOMAL),
        void 0 === h && (h = !0),
        e = PathDefine.SKILL + "LayaScene_" + e + "/" + e + ".lh";
        var l = SceneManager.ins;
        if (!l.cam2) return null;
        if (null == e || 0 == e.length) return null;
        if (o && !AssetManager.ins.hasEff(AssetType.Effect, e, CacheResUtils.getEffectAssetTime(i.self), !0, i.self)) return null;
        if (!t.can(r)) return null;
        var c = ObjectPool.g("EffectPlayer");
        return c.aType = AssetType.Effect,
        c.self = i.self,
        c.pos(n.x, n.y),
        c.lType = r,
        c.rot = s,
        c.setBack(l.rmvEff, l),
        c.play(e),
        c.lType != EffectLimitType.NO && t.raise(c.lType),
        l.addEff(c, h),
        c
    },
    t.showHurts = function(t, e, i, n) {
        for (var s = SetManager.instance,
        a = Laya.FPSMonitor.instance.getLevel(), o = SceneManager.ins.getObject(t), r = s.openLimit || !GameModel.isFoucus || (null == o || !o.self) && (s.isLimit(SettingKey.SHIELD_EFFECT) || a >= Laya.FPSMonitor.LEVEL_3) ? EffectLimitType.LIMIT: EffectLimitType.HIT, h = n.length - 1; h >= 0; h--) this.showHurt(o, i, n[h], r)
    },
    t.showHurt = function(e, i, n, s) {
        var a = SceneManager.ins,
        o = a.getObject(String(n.roleId));
        if (null == o && n.hasOwnProperty("story") && n.story && (o = a.getStoryObject(n.roleId), null == e && n.hasOwnProperty("casterId") && (e = a.getStoryObject(n.casterId), StoryManager.instance.dis(StoryManager.HurtEndEvent, StoryManager.instance, n.roleId))), MapManager.ins.isJingjiMap() && (e = a.getArenaIUnit(n.casterId), o = a.getArenaIUnit(n.roleId)), null != o && null != e) {
            if (n.isDead) {
                var r = ObjectPool.g("ActionParamVO");
                r.unit = e,
                r.dType = n.deathType,
                o.doAct(ActionDefine.Dead, r),
                MapManager.ins.mapVO.mapType == MapType.OutdoorBoss && o.type == UnitType.Monster && (o.cont.active = !1)
            } else if (o.type == UnitType.Monster && 1 == o.data.hitType && e != o && n.harmType != HurtType.FanTan) {
                var r = ObjectPool.g("ActionParamVO");
                r.unit = e,
                o.doAct(ActionDefine.Hit, r)
            }
            if (e.type == UnitType.Role && o instanceof RoleSelf) {
                var h = o.atkCtrl;
                h.lastHurt = Laya.Browser.now(),
                h.atkSta || (h.atkSta = !0, TipsManager.ins.e(LangManager.ins.v("Main_pk26")), AttackController.setRTar(e.data.guid, !0))
            }
            if (o.inView) {
                var l = e == SceneManager.ins.self;
                if (o.isOpenRender && i && i.ae && t.can(s)) {
                    var c = 0;
                    i.seRotate && e && (c = Util.getAngle(e.scePos.x, e.scePos.y, o.scePos.x, o.scePos.y));
                    var u = o.getHit();
                    u = u ? u.clone() : new Laya.Vector3(0, -50, 0),
                    this.playUnitEffect(o, i.ae, c, !0, s, u, !0, l)
                }
                HurtPool.instance.showHurt(o, n.value, n.harmType, e, n.hasOwnProperty("story")),
                i && i.ats && l && this.playSound(i.ats)
            }
        }
    },
    t.playSound = function(t) {
        SoundManager.instance.playSound(t)
    },
    t.prototype.getSceneObj = function(t) {
        return MapManager.ins.isJingjiMap() ? this.m_sceneMgr.getArenaIUnit(t) : t && -1 != t.indexOf("jm") ? this.m_sceneMgr.getStoryObject(t) : this.m_sceneMgr.getObject(t)
    },
    t.limitMax = {},
    t.limitCount = {},
    t
} (),
__extends = this && this.__extends ||
function() {
    var t = function(e, i) {
        return (t = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array &&
        function(t, e) {
            t.__proto__ = e
        } ||
        function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
        })(e, i)
    };
    return function(e, i) {
        function n() {
            this.constructor = e
        }
        t(e, i),
        e.prototype = null === i ? Object.create(i) : (n.prototype = i.prototype, new n)
    }
} (),