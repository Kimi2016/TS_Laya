Camera2D = function() {
    function t() {
        this.MODE_FOLLOW = 1,
        this.MODE_MOVE = 2,
        this.m_preFollowPoint = new Laya.Point
    }
    return Object.defineProperty(t.prototype, "rending", {
        get: function() {
            return this.m_followRending && this.m_mode == this.MODE_FOLLOW || this.m_shockDuration > 0 || this.m_overTime < this.m_remainTime
        },
        enumerable: !0,
        configurable: !0
    }),
    Object.defineProperty(t.prototype, "followRending", {
        get: function() {
            return this.m_followRending
        },
        set: function(t) {
            this.m_followRending = t
        },
        enumerable: !0,
        configurable: !0
    }),
    t.prototype.updateViewRect = function(t, e) {
        this.m_viewWidth = t,
        this.m_viewHeight = e,
        this.validateRect()
    },
    t.prototype.updateSceneRect = function(t, e) {
        this.m_sceneWidth = t,
        this.m_sceneHeight = e,
        this.validateRect()
    },
    t.prototype.reset = function() {
        this.stopShock(),
        this.m_overTime = this.m_remainTime = this.moveTime = 0
    },
    t.prototype.validateRect = function() {
        this.width = Math.min(this.m_viewWidth, this.m_sceneWidth),
        this.height = Math.min(this.m_sceneHeight, this.m_viewHeight),
        this.centerX = Math.round(.5 * this.width),
        this.centerY = Math.round(.5 * this.height) + 90
    },
    Object.defineProperty(t.prototype, "followPoint", {
        get: function() {
            return this.m_followPoint
        },
        enumerable: !0,
        configurable: !0
    }),
    t.prototype.follow = function(t) {
        this.m_mode = this.MODE_FOLLOW,
        this.m_followPoint = t,
        this.updatePosi(t.x, t.y)
    },
    t.prototype.moveTo = function(t, e, i, n, s) {
        for (var a = [], o = 5; o < arguments.length; o++) a[o - 5] = arguments[o];
        this.m_mode = this.MODE_MOVE,
        this.m_remainTime = i,
        this.m_overTime = 0,
        this.m_startX = t,
        this.m_startY = e,
        this.m_incrementX = Util.roundDecimalToPlace((this.x - t) / i, 3),
        this.m_incrementY = Util.roundDecimalToPlace((this.y - e) / i, 3),
        this.m_onCompleted = n,
        this.m_thisObject = s,
        this.m_params = a
    },
    t.prototype.movTo = function(t, e, i, n) {
        for (var s = [], a = 4; a < arguments.length; a++) s[a - 4] = arguments[a];
        this.m_mode = this.MODE_MOVE,
        this.m_remainTime = e,
        this.m_overTime = 0;
        var o = this.x,
        r = this.y,
        h = t[0].x,
        l = t[0].y;
        t.length > 1 && (o = t[1].x, r = t[1].y),
        this.m_startX = o,
        this.m_startY = r,
        this.m_incrementX = Util.roundDecimalToPlace((h - o) / e, 3),
        this.m_incrementY = Util.roundDecimalToPlace((l - r) / e, 3),
        this.m_onCompleted = i,
        this.m_thisObject = n,
        this.m_params = s
    },
    t.prototype.tel = function(t, e) {
        this.updatePosi(t, e)
    },
    t.prototype.startShock = function(t, e) {
        void 0 === e && (e = 3),
        this.m_shockDuration = t,
        this.m_shockStep = e
    },
    t.prototype.stopShock = function() {
        this.m_shockDuration = 0,
        this.m_shockOffsetX = this.m_shockOffsetY = 0
    },
    Object.defineProperty(t.prototype, "isShock", {
        get: function() {
            return this.m_shockDuration > 0
        },
        enumerable: !0,
        configurable: !0
    }),
    t.prototype.getViewX = function(t) {
        return t - this.left
    },
    t.prototype.getViewY = function(t) {
        return t - this.top
    },
    t.prototype.getSceneX = function(t) {
        return this.left + t
    },
    t.prototype.getSceneY = function(t) {
        return this.top + t
    },
    t.prototype.update = function(t) {
        if (this.moveTime += t, 0 == t || this.rending) if (this.m_shockDuration > 0 && (this.m_shockDuration = this.m_shockDuration - t, this.m_shockDuration > 0 ? (this.m_shockOffsetX = Math.random() <= .5 ? this.m_shockStep: -this.m_shockStep, this.m_shockOffsetY = Math.random() <= .5 ? this.m_shockStep: -this.m_shockStep) : this.m_shockDuration = this.m_shockOffsetX = this.m_shockOffsetY = 0), this.m_mode == this.MODE_FOLLOW && (this.m_followPoint.x != this.m_preFollowPoint.x || this.m_followPoint.y != this.m_preFollowPoint.y || this.m_shockDuration > 0)) this.m_preFollowPoint.x = this.m_followPoint.x,
        this.m_preFollowPoint.y = this.m_followPoint.y,
        this.updatePosi(this.m_followPoint.x, this.m_followPoint.y);
        else if (this.m_mode == this.MODE_MOVE && this.m_overTime < this.m_remainTime && (this.m_overTime = Math.min(this.m_remainTime, this.m_overTime + t), this.updatePosi(this.m_startX + this.m_overTime * this.m_incrementX, this.m_startY + this.m_overTime * this.m_incrementY), this.m_overTime == this.m_remainTime && this.m_onCompleted)) {
            var e = this.m_onCompleted,
            i = this.m_thisObject,
            n = this.m_params;
            this.m_onCompleted = null,
            this.m_thisObject = null,
            this.m_params = null,
            e.apply(i, n)
        }
    },
    t.prototype.updatePosi = function(x, y) { (x > this.m_sceneWidth || y > this.m_sceneHeight) && Log.e("坐标大于地图大小：x=" + x + "  y=" + y + " width=" + this.m_sceneWidth + "  height=" + this.m_sceneHeight),
        this.m_shockDuration > 0 ? (this.x = x + this.m_shockOffsetX, this.y = y + this.m_shockOffsetY) : (this.x = x, this.y = y),
        this.left = this.x - this.centerX,
        this.top = this.y - this.centerY,
        this.right = this.left + this.width,
        this.bottom = this.top + this.height,
        this.left < 0 && (this.left = 0, this.right = this.width),
        this.top < 0 && (this.top = 0, this.bottom = this.height),
        this.m_viewWidth > this.m_sceneWidth ? (this.left = -(this.m_viewWidth - this.m_sceneWidth) >> 1 >> 0, this.right = this.left + this.m_sceneWidth) : this.right > this.m_sceneWidth && (this.right = this.m_sceneWidth, this.left = this.right - this.width),
        this.m_viewHeight > this.m_sceneHeight ? (this.top = -(this.m_viewHeight - this.m_sceneHeight) >> 1 >> 0, this.bottom = this.top + this.m_sceneHeight) : this.bottom > this.m_sceneHeight && (this.bottom = this.m_sceneHeight, this.top = this.bottom - this.height)
    },
    t.MODE_MOVE_COMPLETED = "modeMoveCompleted",
    t
} (),