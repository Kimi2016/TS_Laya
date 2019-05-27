SDispatcher = function() {
    function t() {}
    return t.prototype.on = function(t, e, i) {
        var n = this.ls;
        null == n && (this.ls = n = {});
        var s = n[t];
        null == s && (s = ListenerVector.frees.length ? ListenerVector.frees.shift() : new ListenerVector, n[t] = s),
        s.push(e, i)
    },
    t.prototype.off = function(t, e, i) {
        if (null != this.ls) {
            var n = this.ls,
            s = n[t];
            s && s.remove(e, i) && 0 == s.cal.length && (n[t] = null, delete n[t], s.destroy(), ListenerVector.frees.push(s))
        }
    },
    t.prototype.rmvAll = function() {
        if (this.ls) {
            var t, e = this.ls;
            for (var i in e) t = e[i],
            t && (t.destroy(), ListenerVector.frees.push(t));
            this.ls = e = null
        }
    },
    t.prototype.has = function(t) {
        return this.ls && this.ls.hasOwnProperty(t)
    },
    t.prototype.dis = function(t, e, i, n) {
        void 0 === e && (e = null),
        void 0 === i && (i = null),
        void 0 === n && (n = !1),
        this.has(t) && (null == e && (e = this), this.ls[t].dis(t, e, i))
    },
    t
} (),