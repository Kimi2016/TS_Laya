OpAttack = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t),
    e.prototype.stop = function() {
        TimeUtils.rmvBack(this.playAreaEffect, this),
        TimeUtils.rmvBack(this.doTarget, this),
        t.prototype.stop.call(this)
    },
    e.prototype.doStart = function() {
        this.playCasterEffect(0, this.skillAction.seRotate),
        OpBase.can(this.lType) && (this.skillAction.area1 && "" != this.skillAction.area1 || this.skillAction.area2 && "" != this.skillAction.area2) ? this.skillAction.areaDelay ? TimeUtils.callLate(this.playAreaEffect, this, this.skillAction.areaDelay) : this.playAreaEffect() : this.skillAction.hurtDelay ? TimeUtils.callLate(this.doTarget, this, this.skillAction.hurtDelay) : this.doTarget()
    },
    e.prototype.playAreaEffect = function() {
        t.prototype.playAreaEffect.call(this),
        this.doTarget()
    },
    e.prototype.doTarget = function() {
        t.prototype.doTarget.call(this),
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