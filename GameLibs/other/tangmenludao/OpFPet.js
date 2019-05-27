OpFPet = function(t) {
    function e() {
        return t.call(this) || this
    }
    return __extends(e, t),
    e.prototype.findTarget = function() {
        if (this.sendFlag) {
            var t, e, i = this.getCaster(),
            n = [];
            i.type == UnitType.AIPet ? (e = this.m_sceneMgr.getObject(i.data.own), e && n.push(e.data.sguid)) : (t = this.m_sceneMgr.self, t.isAlive && n.push(t.sguid)),
            this.targets = n
        }
    },
    e.prototype.doStart = function() {
        this.shoutImage(),
        t.prototype.doStart.call(this)
    },
    e.prototype.shoutImage = function() {
        if (OpBase.can(this.lType) && this.skillAction.shout) {
            var t = this.getCaster();
            if (t && t.isOpenRender && t.inView && (t.self || HurtPool.canShow())) {
                var e = PathDefine.IMG + "skill/" + this.skillAction.shout + ".png",
                i = ObjectPool.g("ShoutBitmap"),
                n = t;
                n.addChild(i);
                var s = t.getHurt();
                i.start(e, 0, s ? s.y: -50)
            }
        }
    },
    e
} (OpAttack),