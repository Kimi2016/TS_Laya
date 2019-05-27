OpArrow = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t),
    e.prototype.stop = function() {
        this.m_arrowOver && this.m_areaEffectOver && (TimeUtils.rmvBack(this.fireArrow, this), TimeUtils.rmvBack(this.playAreaEffect, this), TimeUtils.rmvBack(this.doTarget, this), t.prototype.stop.call(this))
    },
    e.prototype.doStart = function() {
        return this.m_arrowOver = this.m_areaEffectOver = !0,
        OpBase.can(this.lType) ? (this.playCasterEffect(0, this.skillAction.seRotate), this.skillAction && this.skillAction.arrow && "" != this.skillAction.arrow && (this.m_arrowOver = !1, this.skillAction.arrowDelay ? TimeUtils.callLate(this.fireArrow, this, this.skillAction.arrowDelay) : this.fireArrow()), this.skillAction && (this.skillAction.area1 && "" != this.skillAction.area1 || this.skillAction.area2 && "" != this.skillAction.area2) && (this.m_areaEffectOver = !1, this.skillAction.areaDelay ? TimeUtils.callLate(this.playAreaEffect, this, this.skillAction.areaDelay) : this.playAreaEffect()), this.m_arrowOver && this.m_areaEffectOver && (this.doTarget(), t.prototype.stop.call(this)), void 0) : (this.doTarget(), t.prototype.stop.call(this), void 0)
    },
    e.prototype.playAreaEffect = function() {
        t.prototype.playAreaEffect.call(this),
        this.m_areaEffectOver = !0,
        this.stop()
    },
    e.prototype.doCompleted = function() {
        this.m_areaEffectOver = !1,
        this.m_arrowOver = !1,
        t.prototype.doCompleted.call(this)
    },
    e.prototype.fireArrow = function() {
        var t = this.getCaster();
        if (null == t) return this.m_arrowOver = !0,
        this.stop(),
        void 0;
        this.skillAction.hurtDelay ? TimeUtils.callLate(this.doTarget, this, this.skillAction.hurtDelay) : this.doTarget();
        var e = t.pos3D.clone(),
        i = this.m_viewPosi3D.clone(),
        n = 0,
        s = this.skillAction.arrow;
        this.skillAction.arrowFx && (n = Util.get3DAngle(e, i));
        var a = new Laya.Point(t.scePos.x, t.scePos.y + t.getCastY());
        if (t.isOpenRender && t.inView && (this.m_arrow = OpBase.plyEff(s, t, a, n, !0, !0, this.lType, !0)), this.m_arrow) {
            var o, r, h, l;
            1 == this.skillAction.arrowType ? (r = this.m_scenePosi2D.x, h = this.m_scenePosi2D.y, o = Util.getPixelDistance(a, this.m_scenePosi2D) * this.skillAction.arrowFps) : (l = 90 - t.rot, l = Util.angle2radian(l >= 0 ? l: 360 + l), r = a.x + Math.round(this.skillAction.arrowMax * Math.cos(l)), h = a.y + Math.round(this.skillAction.arrowMax * Math.sin(l)), o = this.skillAction.arrowMax * this.skillAction.arrowFps),
            GameTween.get(this.m_arrow).to({
                posiX: r,
                posiY: h
            },
            o, null, this.onArrowCallback, this, this.m_arrow)
        } else this.m_arrowOver = !0,
        this.stop()
    },
    e.prototype.onArrowCallback = function(t) {
        this.m_arrow && GameTween.removeTweens(this.m_arrow),
        t.destroy(),
        this.m_arrow = null,
        this.m_arrowOver = !0,
        this.stop()
    },
    e
} (OpBase),
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