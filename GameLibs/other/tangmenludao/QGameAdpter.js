QGameAdpter = function() {
    function t() {}
    return t.init = function() {
        if (!t._inited) {
            t._inited = !0,
            Laya.Loader.prototype.load = QGLoader.prototype.load;
            var e = Laya.Browser;
            t._preCreateElement = e.createElement,
            e.createElement = t.createElement,
            Laya.Input._createInputElement = QGInput._createInputElement;
            var i = Laya.Input.prototype._focusIn;
            Laya.Input.prototype._focusIn = function() {
                i.call(this),
                this.nativeInput.focus()
            },
            Laya.Camera.prototype.convertScreenCoordToOrthographicCoord = function(t, e) {
                if (this._orthographic) {
                    var i = Laya.RenderState,
                    n = i.clientWidth,
                    s = i.clientHeight,
                    a = this.orthographicVerticalSize * this.aspectRatio / n,
                    o = this.orthographicVerticalSize / s,
                    r = t.elements,
                    h = r[0],
                    l = r[1],
                    c = GameModel.ViewWH,
                    u = GameModel.ViewTH;
                    h += (GameModel.viewportW - c) * (h / c),
                    l += (GameModel.viewportH - u) * (l / u);
                    var p = e.elements;
                    return p[0] = ( - n / 2 + h) * a,
                    p[1] = (s / 2 - l) * o,
                    p[2] = (this.nearPlane - this.farPlane) * (r[2] + 1) / 2 - this.nearPlane,
                    Laya.Vector3.transformCoordinate(e, this.transform.worldMatrix, e),
                    !0
                }
                return ! 1
            }
        }
    },
    t.createElement = function(e) {
        return "textarea" == e || "input" == e ? t.createInput(e) : t._preCreateElement(e)
    },
    t.createInput = function(e) {
        var i = t._preCreateElement(e);
        return i.focus = QGInput.qginputFocus,
        i.blur = QGInput.qginputblur,
        i.style = {},
        i.value = 0,
        i.parentElement = {},
        i.placeholder = {},
        i.type = {},
        i.setColor = function() {},
        i.setType = function() {},
        i.setFontFace = function() {},
        i.addEventListener = function() {},
        i.contains = function() {
            return null
        },
        i.removeChild = function() {},
        i
    },
    t._inited = !1,
    t
} (),