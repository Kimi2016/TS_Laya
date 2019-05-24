var TimeUtils;
!(function (t) {
  function e () {
    g || ((g = !0), GameTick.add (a, this));
  }
  function i (t, e) {
    var i = new Date (t),
      n = {
        'M+': i.getMonth () + 1,
        'd+': i.getDate (),
        'h+': i.getHours (),
        'm+': i.getMinutes (),
        's+': i.getSeconds (),
        'q+': Math.floor ((i.getMonth () + 3) / 3),
        S: i.getMilliseconds (),
      };
    /(y+)/.test (e) &&
      (e = e.replace (
        RegExp.$1,
        (i.getFullYear () + '').substr (4 - RegExp.$1.length)
      ));
    for (var a in n)
      new RegExp ('(' + a + ')').test (e) &&
        (e = e.replace (
          RegExp.$1,
          1 == RegExp.$1.length
            ? n[a]
            : ('00' + n[a]).substr (('' + n[a]).length)
        ));
    return e;
  }
  function n (t, e) {
    void 0 === e && (e = 'dd hh:mm:ss');
    var i = new Date (1970, 1, 1, 0, 0, 0, 0);
    i.setMilliseconds (t);
    var n = {
      'd+': i.getDate () - 1,
      'h+': i.getHours (),
      'm+': i.getMinutes (),
      's+': i.getSeconds (),
    };
    for (var a in n)
      new RegExp ('(' + a + ')').test (e) &&
        (e = e.replace (
          RegExp.$1,
          1 == RegExp.$1.length
            ? n[a]
            : ('00' + n[a]).substr (('' + n[a]).length)
        ));
    return e;
  }
  function a (t) {
    var e, i;
    for (i = u.length - 1; i >= 0; i--)
      (e = u[i]), e &&
        (1 == e.delay
          ? e.callback.call (e.thisRef, t)
          : ((e.time += t), (!e.delay || e.time >= e.delay) &&
              (e.callback.call (e.thisRef, e.time - e.tick), (e.tick = e.time =
                e.time % e.delay))));
    for (i = d.length - 1; i >= 0; i--)
      (e = d[i]), e &&
        ((e.time += t), (!e.delay || e.time >= e.delay) &&
          (d.splice (i, 1), e.callback.apply (
            e.thisRef,
            e.args
          ), e.dispose (), p.push (e)));
  }
  function s () {
    return u.length + ',' + d.length;
  }
  function o (t, e, i) {
    if (!t) return Log.e ('regBack time=' + t), void 0;
    for (var n, a = u.length - 1; a >= 0; a--)
      if (((n = u[a]), n && n.thisRef == i && n.callback == e)) return;
    (n = p.length ? p.shift () : new TimeCallback ()), n.setTo (
      t,
      i,
      e
    ), u.push (n);
  }
  function r (t, e) {
    for (var i, n = u.length - 1; n >= 0; n--)
      if (((i = u[n]), i && i.thisRef == e && i.callback == t))
        return u.splice (n, 1), i.dispose (), p.push (i), void 0;
  }
  function h (t, e) {
    for (var i, n = u.length - 1; n >= 0; n--)
      if (((i = u[n]), i && i.thisRef == e && i.callback == t)) {
        u.splice (n, 1), i.dispose (), p.push (i);
        break;
      }
  }
  function l (t, e, i) {
    void 0 === i && (i = 100);
    for (var n = [], a = 3; a < arguments.length; a++)
      n[a - 3] = arguments[a];
    if (!i) return Log.e ('callLate time=' + i), void 0;
    for (var s, o = d.length - 1; o >= 0; o--)
      if (((s = d[o]), s && s.thisRef == e && s.callback == t))
        return (s.args = n), void 0;
    (s = p.length ? p.shift () : new TimeCallback ()), s.setTo (
      i,
      e,
      t,
      n
    ), d.push (s);
  }
  function c (t, e) {
    for (var i, n = d.length - 1; n >= 0; n--)
      if (((i = d[n]), i && i.thisRef == e && i.callback == t))
        return d.splice (n, 1), i.dispose (), p.push (i), void 0;
  }
  var g = !1;
  (t.run = e), (t.f = i), (t.c = n), (t.toString = s);
  var p = [], u = [], d = [];
  (t.regBack = o), (t.clearCallback = r), (t.rmvBack = h), (t.callLate = l), (t.clearLate = c);
}) (TimeUtils || (TimeUtils = {}));
var TimeCallback = (function () {
  function t () {
    (this.delay = 0), (this.time = 0), (this.tick = 0);
  }
  return (t.prototype.setTo = function (t, e, i) {
    for (var n = [], a = 3; a < arguments.length; a++)
      n[a - 3] = arguments[a];
    (this.delay = t), (this.thisRef = e), (this.callback = i), (this.args = n);
  }), (t.prototype.dispose = function () {
    (this.callback = null), (this.thisRef = null), (this.time = 0), (this.tick = 0);
  }), t;
}) (),
  StringUtils;
!(function (t) {
  function e (t, e, i, n, a, s, o, r) {
    return void 0 === e && (e = 20), void 0 === i && (i = '#000000'), void 0 ===
      n && (n = 'left'), void 0 === a && (a = 'top'), void 0 === s &&
      (s = 1), void 0 === o && (o = !1), void 0 === r && (r = !0), t &&
      t.style &&
      ((t.style.fontFamily =
        'Microsoft YaHei'), (t.style.fontSize = e), (t.style.color = i), (t.style.valign = a), (t.style.align = n), (t.style.leading = s), (t.mouseEnabled = o), (t.style.wordWrap = r)), t;
  }
  t.setHtmlStyle = e;
}) (StringUtils || (StringUtils = {}));
var VersionManager = (function () {
  function t () {}
  return Object.defineProperty (t, 'ins', {
    get: function () {
      return this.m_i || (this.m_i = new t ());
    },
    enumerable: !0,
    configurable: !0,
  }), (t.prototype.adVnPr = function (e) {
    var i = t.m_i.vsn, n = e.replace (PathDefine.resPrefix, '');
    if (i && i.hasOwnProperty ('files')) {
      if (i.files.hasOwnProperty (n))
        return PathDefine.resPrefix + i.files[n] + '/' + n;
      var a, s = n.indexOf ('LayaScene_');
      if (
        (-1 != s
          ? ((a = n.substring (s, n.length)), (a = a.substring (
              0,
              a.indexOf ('/')
            )), (a = n.substring (0, s + a.length + 1)))
          : (a = n.substring (0, n.lastIndexOf ('/') + 1)), a &&
          i.folder.hasOwnProperty (a))
      )
        return PathDefine.resPrefix + i.folder[a] + '/' + n;
    }
    return e;
  }), t;
}) (),
  LoadingMananger = (function () {
    function t () {}
    return Object.defineProperty (t, 'instance', {
      get: function () {
        return null == this.m_instance && (this.m_instance = new t ()), this
          .m_instance;
      },
      enumerable: !0,
      configurable: !0,
    }), (t.prototype.initLoading = function () {
      this.m_loading || (this.m_loading = new LoadingWin ()), this.m_loading
        .parent ||
        (Laya.stage.addChild (this.m_loading), this.m_loading.pos (
          (Laya.stage.width - this.m_loading.width) >> 1,
          (Laya.stage.height - this.m_loading.height) >> 1
        ));
    }), (t.prototype.showLoading = function () {
      this.m_loading &&
        !this.m_loading.parent &&
        (Laya.stage.addChild (this.m_loading), this.m_loading.pos (
          (Laya.stage.width - this.m_loading.width) >> 1,
          (Laya.stage.height - this.m_loading.height) >> 1
        ));
    }), (t.prototype.resizeLoading = function () {
      this.m_loading &&
        this.m_loading.parent &&
        this.m_loading.pos (
          (Laya.stage.width - this.m_loading.width) >> 1,
          (Laya.stage.height - this.m_loading.height) >> 1
        );
    }), (t.prototype.setProgressRang = function (t, e) {
      this.m_loading && this.m_loading.pgRge (t, e);
    }), (t.prototype.closeingLoading = function () {
      this.m_loading && this.m_loading.clsLad ();
    }), (t.prototype.destroyLoading = function () {
      this.m_loading &&
        (this.m_loading.parent &&
          this.m_loading.parent.removeChild (
            this.m_loading
          ), this.m_loading.unreg (), this.m_loading.destroy (), (this.m_loading = null));
      var t = Laya.Browser.document.getElementById ('load');
      t && t.parentNode.removeChild (t);
    }), t;
  }) (),
  Log = (function () {
    function t () {}
    return (t.e = function () {
      for (var e = [], i = 0; i < arguments.length; i++)
        e[i] = arguments[i];
      t.ShowDebug && console.log.apply (console, ['[Error]:'].concat (e));
    }), (t.i = function () {
      for (var e = [], i = 0; i < arguments.length; i++)
        e[i] = arguments[i];
      t.ShowInfo && console.log.apply (console, ['[Info]:'].concat (e));
    }), (t.ShowDebug = !1), (t.ShowInfo = !1), t;
  }) (),
  ImageCache = (function () {
    function t () {
      this.cache = [];
    }
    return (t.getVO = function () {
      return this.vopools.length ? this.vopools.shift () : new ImageCacheVO ();
    }), (t.saveVO = function (t) {
      t.destroy (), this.vopools.push (t);
    }), (t.clear = function (e) {
      void 0 === e && (e = !0);
      var i = t.resRef;
      for (var n in i)
        if (
          i[n] <= 0 &&
          Laya.loader.getRes (n) &&
          (Laya.loader.clearRes (n), delete t.resRef[n], Log.i (
            '清理遗留图片：url=' + n
          ), e)
        )
          return !0;
      return !1;
    }), (t.prototype.load = function (e, i) {
      if (e && i) {
        for (var n, a = this.cache, s = a.length - 1; s >= 0; s--) {
          if (((n = a[s]), n && n.image == e)) {
            if (n.url == i) return;
            this.clearResRef (n.url);
            break;
          }
          n = null;
        }
        n || ((n = t.getVO ()), (n.image = e), a.push (n)), (n.url = i);
        var o = Laya.loader.getRes (i);
        o
          ? (this.addResRef (i), (e.source = o))
          : (this.addResRef (i), Laya.loader.load (
              i,
              Laya.Handler.create (this, this.onLoaded, [e]),
              null,
              Laya.Loader.IMAGE,
              LoadPriority.Level2
            ));
      }
    }), (t.prototype.unload = function () {
      for (var e, i = this.cache, n = i.length - 1; n >= 0; n--)
        (e = i[n]), e && (this.clearResRef (e.url), e.destroy (), t.saveVO (e));
      i.length = 0;
    }), (t.prototype.unloadBy = function (e) {
      for (var i, n = this.cache, a = n.length - 1; a >= 0; a--)
        if (((i = n[a]), i && i.image == e)) {
          (e.source = null), this.clearResRef (i.url), i.destroy (), t.saveVO (
            i
          ), n.splice (a, 1);
          break;
        }
    }), (t.prototype.onLoaded = function (t, e) {
      if (e)
        for (var i, n = this.cache, a = n.length - 1; a >= 0; a--)
          if (((i = n[a]), i && i.url == e.url && i.image == t)) {
            i.image.source = e;
            break;
          }
    }), (t.prototype.addResRef = function (e) {
      var i = t.resRef;
      i.hasOwnProperty (e) ? (i[e] += 1) : (i[e] = 1);
    }), (t.prototype.clearResRef = function (e) {
      var i = t.resRef;
      i.hasOwnProperty (e) && (i[e] -= 1), (!i.hasOwnProperty (e) ||
        i[e] <= 0) &&
        ((t.resRef[e] = 0), Laya.loader.getRes (e) && delete t.resRef[e]);
    }), (t.resRef = {}), (t.vopools = []), t;
  }) (),
  ImageCacheVO = (function () {
    function t () {}
    return (t.prototype.destroy = function () {
      (this.image = null), (this.url = null);
    }), t;
  }) (),
  GameTween = (function () {
    function t () {}
    return (t.get = function (e) {
      if (
        (this.tag || ((this.tag = !0), GameTick.add (this.tick, this)), this
          .tweens[e.__tweenkey])
      )
        return this.tweens[e.__tweenkey];
      e.__tweenkey = this.num++;
      var i = this.pools.length ? this.pools.shift () : new t ();
      return (i.target = e), (this.tweens[e.__tweenkey] = i), i;
    }), (t.removeTweens = function (t) {
      var e = this.tweens;
      e[t.__tweenkey] &&
        (e[t.__tweenkey].stop (), this.pools.push (e[t.__tweenkey]), delete e[
          t.__tweenkey
        ]);
    }), (t.tick = function (t) {
      var e = this.tweens, i = 0;
      for (var n in e)
        i++, e[n].tick (t);
      this.count = i;
    }), (t.toString = function () {
      return String (this.count);
    }), (t.prototype.to = function (t, e, i, n, a) {
      void 0 === i && (i = null), void 0 === n && (n = null), void 0 === a &&
        (a = null);
      for (var s = [], o = 5; o < arguments.length; o++)
        s[o - 5] = arguments[o];
      return (this.target instanceof laya.ui.Label ||
        this.target instanceof laya.display.Text ||
        this.target instanceof laya.ui.TextArea ||
        (this.target instanceof laya.html.dom.HTMLElement &&
          (t.hasOwnProperty ('stroke') ||
            t.hasOwnProperty ('border') ||
            t.hasOwnProperty ('color') ||
            t.hasOwnProperty ('scaleX') ||
            t.hasOwnProperty ('scaleY')))) &&
        Log.e (
          'GameTween:target is Text'
        ), (this.m_props = t), (this.m_duration = e), (this.m_ease = i), n
        ? ((this.m_callback = n), (this.m_callbackThis = a), (this.m_callbackArgs = s))
        : ((this.m_callback = null), (this.m_callbackThis = null), (this.m_callbackArgs = null)), this.init (), this;
    }), (t.prototype.init = function () {
      (this.m_d = 0), (this.m_iprops = {});
      for (var t in this.m_props)
        this.m_iprops[t] = this.target[t];
    }), (t.prototype.tick = function (e) {
      if (this.target.destroyed)
        Log.e ('已销毁对象没有移除缓动'), delete t.tweens[
          this.target.__tweenkey
        ], this.stop (), t.pools.push (this);
      else {
        (this.m_d += e), (this.m_perc = Math.min (
          this.m_d / this.m_duration,
          1
        )), this.m_ease &&
          (this.m_perc = this.m_ease (
            this.m_d,
            0,
            1,
            this.m_duration
          )), (this.m_perc = Math.min (
          this.m_perc,
          1
        )), (this.m_perc = Math.max (this.m_perc, 0));
        for (var i in this.m_props)
          this.target[i] = 0 == this.m_perc || 1 == this.m_perc
            ? this.m_props[i]
            : this.m_iprops[i] +
                (this.m_props[i] - this.m_iprops[i]) * this.m_perc;
        (!this.m_duration || this.m_d >= this.m_duration) &&
          (delete t.tweens[this.target.__tweenkey], this.m_callback &&
            this.m_callback.apply (
              this.m_callbackThis,
              this.m_callbackArgs
            ), this.stop (), t.pools.push (this));
      }
    }), (t.prototype.stop = function () {
      (this.target = null), (this.m_props = null), (this.m_callback = null), (this.m_callbackThis = null), (this.m_callbackArgs = null), (this.m_ease = null), (this.m_iprops = null);
    }), (t.pools = []), (t.tweens = {}), (t.num = 0), (t.count = 0), t;
  }) (),
  GameTick = (function () {
    function t () {}
    return (t.init = function () {
      this.inited ||
        ((this.inited = !0), (this.frameTime =
          1e3 /
          60), (this.lastTimeStamp = this.lastTick = 0), (this.lastCount = this.frameInterval = Math.round (
          1e3
        )), Laya.timer.frameLoop (
          2,
          this,
          this.onTick,
          null,
          !0,
          Laya.Timer.PRIORITY_3
        ));
    }), (t.add = function (t, e) {
      this.inited || this.init ();
      var i = this.getTickIndex (t, e);
      -1 == i && (this.callBackList.push (t), this.thisObjectList.push (e));
    }), (t.rmv = function (t, e) {
      var i = this.getTickIndex (t, e);
      -1 != i &&
        (this.callBackList.splice (i, 1), this.thisObjectList.splice (i, 1));
    }), (t.onTick = function () {
      var t = Laya.Browser.now (), e = t - this.lastTimeStamp;
      if (((this.lastTimeStamp = t), e >= this.frameTime))
        this.lastCount = this.frameInterval;
      else {
        if (((this.lastCount -= 1e3), this.lastCount > 0)) return !1;
        this.lastCount += this.frameInterval;
      }
      (t = Laya.Browser.now ()), (e = t - this.lastTick), (this.lastTick = t);
      for (
        var i = this.callBackList, n = this.thisObjectList, a = i.length - 1;
        a >= 0;
        a--
      )
        i[a].call (n[a], e);
      return !1;
    }), (t.getTickIndex = function (t, e) {
      for (
        var i = this.callBackList, n = this.thisObjectList, a = i.length - 1;
        a >= 0;
        a--
      )
        if (i[a] == t && n[a] == e) return a;
      return -1;
    }), (t.inited = !1), (t.callBackList = []), (t.thisObjectList = []), t;
  }) (),
  MapType;
!(function (t) {
  (t[(t.Common = 1)] = 'Common'), (t[(t.CaiLiao = 4)] = 'CaiLiao'), (t[
    (t.Challenge = 5)
  ] =
    'Challenge'), (t[(t.ShiBaLj = 6)] = 'ShiBaLj'), (t[(t.JingJi = 7)] =
    'JingJi'), (t[(t.ShiJieBoss = 8)] = 'ShiJieBoss'), (t[(t.VIPBoss = 10)] =
    'VIPBoss'), (t[(t.Money = 11)] = 'Money'), (t[(t.TaskCopy = 12)] =
    'TaskCopy'), (t[(t.OutdoorBoss = 14)] = 'OutdoorBoss'), (t[
    (t.LingYiCopy = 15)
  ] =
    'LingYiCopy'), (t[(t.Exp = 18)] = 'Exp'), (t[(t.TREASURE = 19)] =
    'TREASURE'), (t[(t.ZZCOPY = 20)] = 'ZZCOPY'), (t[(t.TAIXUTIANTA = 21)] =
    'TAIXUTIANTA'), (t[(t.GeRenBoss = 22)] = 'GeRenBoss'), (t[(t.Taste = 23)] =
    'Taste'), (t[(t.ClanDinner = 24)] = 'ClanDinner'), (t[(t.GuardClan = 25)] =
    'GuardClan'), (t[(t.HongMengDian = 26)] = 'HongMengDian'), (t[
    (t.ClanWar = 27)
  ] =
    'ClanWar'), (t[(t.JingYaoTa = 30)] = 'JingYaoTa'), (t[
    (t.XianPingShan = 31)
  ] =
    'XianPingShan'), (t[(t.DianFeng = 32)] = 'DianFeng'), (t[
    (t.XianLingDian = 33)
  ] =
    'XianLingDian');
}) (MapType || (MapType = {}));
var Mapsubtype;
!(function (t) {
  (t[(t.DingShi = 1)] = 'DingShi'), (t[(t.Border = 2)] = 'Border');
}) (Mapsubtype || (Mapsubtype = {}));
var DirType;
!(function (t) {
  (t[(t.Top = 0)] = 'Top'), (t[(t.TopRight = 1)] = 'TopRight'), (t[
    (t.Right = 2)
  ] =
    'Right'), (t[(t.BottomRight = 3)] = 'BottomRight'), (t[(t.Bottom = 4)] =
    'Bottom'), (t[(t.BottomLeft = 5)] = 'BottomLeft'), (t[(t.Left = 6)] =
    'Left'), (t[(t.TopLeft = 7)] = 'TopLeft');
}) (DirType || (DirType = {}));
var LoadState;
!(function (t) {
  (t[(t.Not = 0)] = 'Not'), (t[(t.Handup = 1)] = 'Handup'), (t[
    (t.Loading = 2)
  ] =
    'Loading'), (t[(t.Completed = 3)] = 'Completed'), (t[(t.Error = 4)] =
    'Error');
}) (LoadState || (LoadState = {}));
var LoadPriority;
!(function (t) {
  (t[(t.Level0 = 0)] = 'Level0'), (t[(t.Level1 = 1)] = 'Level1'), (t[
    (t.Level2 = 2)
  ] =
    'Level2'), (t[(t.Level3 = 3)] = 'Level3'), (t[(t.Level4 = 4)] =
    'Level4'), (t[(t.Level5 = 5)] = 'Level5'), (t[(t.Level6 = 6)] =
    'Level6'), (t[(t.Level7 = 7)] = 'Level7');
}) (LoadPriority || (LoadPriority = {}));
var AssetType;
!(function (t) {
  (t[(t.Role = 0)] = 'Role'), (t[(t.Weapon = 1)] = 'Weapon'), (t[
    (t.Effect = 2)
  ] =
    'Effect'), (t[(t.SceneEffect = 3)] = 'SceneEffect'), (t[(t.Unit = 4)] =
    'Unit'), (t[(t.Static = 5)] = 'Static'), (t[(t.Movie = 6)] = 'Movie'), (t[
    (t.Image = 7)
  ] =
    'Image');
}) (AssetType || (AssetType = {}));
var PlayerType;
!(function (t) {
  (t[(t.Role = 0)] = 'Role'), (t[(t.Mount = 1)] = 'Mount'), (t[(t.Unit = 2)] =
    'Unit');
}) (PlayerType || (PlayerType = {}));
var MonsterDifficulty;
!(function (t) {
  (t[(t.Common = 1)] = 'Common'), (t[(t.Elite = 2)] = 'Elite'), (t[
    (t.Boss = 3)
  ] =
    'Boss'), (t[(t.FieldBoss = 4)] = 'FieldBoss'), (t[(t.FuBen = 5)] =
    'FuBen'), (t[(t.BorderFieldBoss = 7)] = 'BorderFieldBoss');
}) (MonsterDifficulty || (MonsterDifficulty = {}));
var UnitType;
!(function (t) {
  (t[(t.Self = 1)] = 'Self'), (t[(t.Role = 2)] = 'Role'), (t[(t.Monster = 3)] =
    'Monster'), (t[(t.NPC = 4)] = 'NPC'), (t[(t.Static = 5)] = 'Static'), (t[
    (t.Teleport = 6)
  ] =
    'Teleport'), (t[(t.Fly = 7)] = 'Fly'), (t[(t.Drop = 8)] = 'Drop'), (t[
    (t.Collect = 9)
  ] =
    'Collect'), (t[(t.Box = 10)] = 'Box'), (t[(t.Pet = 11)] = 'Pet'), (t[
    (t.FaBao = 12)
  ] =
    'FaBao'), (t[(t.AIUnit = 13)] = 'AIUnit'), (t[(t.AIPet = 14)] =
    'AIPet'), (t[(t.Escort = 15)] = 'Escort'), (t[(t.JQUnit = 16)] =
    'JQUnit'), (t[(t.XianNv = 17)] = 'XianNv'), (t[(t.SEFFECT = 18)] =
    'SEFFECT');
}) (UnitType || (UnitType = {}));
var BufferLimit;
!(function (t) {
  (t[(t.Walk = 1)] = 'Walk'), (t[(t.Cast = 2)] = 'Cast');
}) (BufferLimit || (BufferLimit = {}));
var PickStatus;
!(function (t) {
  (t[(t.PICKING = 1)] = 'PICKING'), (t[(t.ERROR = 2)] = 'ERROR'), (t[
    (t.PICKED = 3)
  ] =
    'PICKED');
}) (PickStatus || (PickStatus = {}));
var ModeType;
!(function (t) {
  (t[(t.Peace = 0)] = 'Peace'), (t[(t.Team = 1)] = 'Team'), (t[(t.Clan = 2)] =
    'Clan'), (t[(t.Server = 3)] = 'Server'), (t[(t.Enemy = 4)] = 'Enemy'), (t[
    (t.Whole = 5)
  ] =
    'Whole'), (t[(t.Camp = 6)] = 'Camp'), (t[(t.Ally = 7)] = 'Ally');
}) (ModeType || (ModeType = {}));
var RANK_TYPE;
!(function (t) {
  (t[(t.MEISHOU = 1)] = 'MEISHOU'), (t[(t.POWER = 2)] = 'POWER'), (t[
    (t.LEVEL = 3)
  ] =
    'LEVEL'), (t[(t.CHENGJIU = 6)] = 'CHENGJIU'), (t[(t.BOUNDARY = 5)] =
    'BOUNDARY'), (t[(t.ZUOQI = 4)] = 'ZUOQI'), (t[(t.PET = 7)] = 'PET'), (t[
    (t.LINGYI = 8)
  ] =
    'LINGYI'), (t[(t.FABAO = 9)] = 'FABAO'), (t[(t.SHENBING = 10)] =
    'SHENBING'), (t[(t.PIFENG = 11)] = 'PIFENG');
}) (RANK_TYPE || (RANK_TYPE = {}));
var RANK_CHANGE_TYPE;
!(function (t) {
  (t[(t.ONE = 1)] = 'ONE'), (t[(t.TWO = 2)] = 'TWO');
}) (RANK_CHANGE_TYPE || (RANK_CHANGE_TYPE = {}));
var RANK_REQTYPE;
!(function (t) {
  (t[(t.LOCAL = 1)] = 'LOCAL'), (t[(t.GLOBAL = 2)] = 'GLOBAL');
}) (RANK_REQTYPE || (RANK_REQTYPE = {}));
var RANK_TARGRT;
!(function (t) {
  t[(t.TARGET_KAI = 1)] = 'TARGET_KAI';
}) (RANK_TARGRT || (RANK_TARGRT = {}));
var RANK_CONDATION;
!(function (t) {
  (t[(t.C_LEVEL = 1)] = 'C_LEVEL'), (t[(t.C_JIE = 2)] = 'C_JIE'), (t[
    (t.C_XING = 3)
  ] =
    'C_XING');
}) (RANK_CONDATION || (RANK_CONDATION = {}));
var RUNNER_QUALITY;
!(function (t) {
  (t[(t.WHITE = 0)] = 'WHITE'), (t[(t.GREE = 1)] = 'GREE'), (t[(t.BLUE = 2)] =
    'BLUE'), (t[(t.PURPLE = 3)] = 'PURPLE'), (t[(t.ORANGE = 4)] = 'ORANGE'), (t[
    (t.RED = 5)
  ] =
    'RED');
}) (RUNNER_QUALITY || (RUNNER_QUALITY = {}));
var RUNNER_STATE;
!(function (t) {
  (t[(t.LOCK = 1)] = 'LOCK'), (t[(t.UNLOCK = 2)] = 'UNLOCK'), (t[
    (t.SETUP = 3)
  ] =
    'SETUP');
}) (RUNNER_STATE || (RUNNER_STATE = {}));
var TREASURE_BTNSATE;
!(function (t) {
  (t[(t.FREE = 1)] = 'FREE'), (t[(t.COST = 2)] = 'COST'), (t[(t.FLY = 3)] =
    'FLY');
}) (TREASURE_BTNSATE || (TREASURE_BTNSATE = {}));
var ZHUANZHI_TYPE;
!(function (t) {
  (t[(t.TASK = 1)] = 'TASK'), (t[(t.GRID = 2)] = 'GRID'), (t[(t.COPY = 3)] =
    'COPY');
}) (ZHUANZHI_TYPE || (ZHUANZHI_TYPE = {}));
var EmType;
!(function (t) {
  (t[(t.EM = 1)] = 'EM'), (t[(t.PACK = 2)] = 'PACK'), (t[(t.BubbleSkin = 3)] =
    'BubbleSkin'), (t[(t.HeadSkin = 4)] = 'HeadSkin'), (t[(t.CLanguage = 5)] =
    'CLanguage'), (t[(t.POINT = 6)] = 'POINT'), (t[(t.Goods = 100)] =
    'Goods'), (t[(t.Point = 101)] = 'Point'), (t[(t.FuBen = 102)] =
    'FuBen'), (t[(t.Clan = 103)] = 'Clan'), (t[(t.Role = 104)] = 'Role'), (t[
    (t.XSTask = 105)
  ] =
    'XSTask'), (t[(t.JQXSTask = 106)] = 'JQXSTask'), (t[(t.ZZFuBen = 107)] =
    'ZZFuBen'), (t[(t.OBTAIN = 108)] = 'OBTAIN'), (t[(t.XIEZHU = 109)] =
    'XIEZHU'), (t[(t.BORDER = 110)] = 'BORDER');
}) (EmType || (EmType = {}));
var FashionType;
!(function (t) {
  (t[(t.fashion = 1)] = 'fashion'), (t[(t.weapon = 2)] = 'weapon'), (t[
    (t.photo = 3)
  ] =
    'photo'), (t[(t.bubble = 4)] = 'bubble');
}) (FashionType || (FashionType = {}));
var chatKey;
!(function (t) {
  (t[(t.Qipao = 1)] = 'Qipao'), (t[(t.XKuang = 2)] = 'XKuang'), (t[
    (t.SmallMsg = 3)
  ] =
    'SmallMsg'), (t[(t.Cyty = 4)] = 'Cyty'), (t[(t.SysMsg = 5)] = 'SysMsg'), (t[
    (t.LingMenYanHui = 6)
  ] =
    'LingMenYanHui'), (t[(t.CWName = 7)] = 'CWName'), (t[(t.CWPos = 8)] =
    'CWPos'), (t[(t.XSMsg = 9)] = 'XSMsg'), (t[(t.LanZuan = 10)] =
    'LanZuan'), (t[(t.HuangZuan = 11)] = 'HuangZuan');
}) (chatKey || (chatKey = {}));
var CollectType;
!(function (t) {
  (t[(t.Collect = 1)] = 'Collect'), (t[(t.Flag = 3)] = 'Flag'), (t[
    (t.Open = 9)
  ] =
    'Open'), (t[(t.Enjoy = 10)] = 'Enjoy');
}) (CollectType || (CollectType = {}));
var PathDefine = (function () {
  function t () {}
  return (t.init = function () {
    (t.RES = t.resPrefix + 'res/'), (t.CFG = t.RES + 'config/'), (t.AST =
      'view/module/'), (t.COM = 'view/common/'), (t.SOUND =
      t.RES + 'sound/'), Laya.isPc
      ? ((t.ATS = t.RES + 'noatlas/view/'), (t.MOV =
          t.RES + 'nomovie/'), (t.IMG = t.RES + 'noimage/'), (t.MAP =
          t.RES + 'nomap/'), (t.GOD = t.RES + 'noimage/goods/'), (t.VIW =
          t.RES + 'noimage/module/'), (t.ROLE =
          t.RES + 'no3d/role/'), (t.SKILL = t.RES + 'no3d/skill/'), (t.MONSTER =
          t.RES + 'no3d/monster/'), (t.STATIC =
          t.RES + 'no3d/static/'), (t.DROP = t.RES + 'no3d/drop/'))
      : ((t.ATS = t.RES + 'atlas/view/'), (t.MOV = t.RES + 'movie/'), (t.MAP =
          t.RES + 'map/'), (t.IMG = t.RES + 'image/'), (t.GOD =
          t.RES + 'image/goods/'), (t.VIW = t.RES + 'image/module/'), (t.ROLE =
          t.RES + '3d/role/'), (t.SKILL = t.RES + '3d/skill/'), (t.MONSTER =
          t.RES + '3d/monster/'), (t.STATIC = t.RES + '3d/static/'), (t.DROP =
          t.RES + '3d/drop/'));
  }), t;
}) (),
  LoadingDefine;
!(function (t) {
  function e () {
    LoadingMananger.instance.closeingLoading ();
  }
  t.closeLoading = e;
}) (LoadingDefine || (LoadingDefine = {}));
var Define;
!(function (t) {
  t.isWyw = !1;
}) (Define || (Define = {}));
var __extends =
  (this && this.__extends) ||
  (function () {
    var t = function (e, i) {
      return (t =
        Object.setPrototypeOf ||
        ({__proto__: []} instanceof Array &&
          function (t, e) {
            t.__proto__ = e;
          }) ||
        function (t, e) {
          for (var i in e)
            e.hasOwnProperty (i) && (t[i] = e[i]);
        }) (e, i);
    };
    return function (e, i) {
      function n () {
        this.constructor = e;
      }
      t (e, i), (e.prototype = null === i
        ? Object.create (i)
        : ((n.prototype = i.prototype), new n ()));
    };
  }) (),
  component;
!(function (t) {
  var e = (function (t) {
    function e (e) {
      return t.call (this, e) || this;
    }
    return __extends (e, t), Object.defineProperty (e.prototype, 'skin', {
      set: function (t) {
        this._skin != t &&
          ((this._skin = t), (this._bar.skin = this._skin), this.callLater (
            this.changeValue
          ));
      },
      enumerable: !0,
      configurable: !0,
    }), e;
  }) (Laya.ProgressBar);
  t.XProgressBar = e;
  var i = (function (t) {
    function e (e, i) {
      void 0 === e && (e = null), void 0 === i && (i = '');
      var n = t.call (this, e, i) || this;
      return (n.scaleTime = 100), (n.stateNum = 1), n.on (
        Laya.Event.MOUSE_DOWN,
        n,
        n.scaleSmall
      ), n.on (Laya.Event.MOUSE_UP, n, n.scaleBig), n.on (
        Laya.Event.MOUSE_OUT,
        n,
        n.scaleBig
      ), n;
    }
    return __extends (e, t), (e.prototype.scaleSmall = function () {
      GameTween.removeTweens (this), GameTween.get (this).to (
        {scaleX: 0.8, scaleY: 0.8},
        this.scaleTime
      );
    }), (e.prototype.scaleBig = function () {
      GameTween.removeTweens (this), GameTween.get (this).to (
        {scaleX: 1, scaleY: 1},
        this.scaleTime
      );
    }), (e.prototype.destroy = function () {
      GameTween.removeTweens (this), this.off (
        Laya.Event.MOUSE_DOWN,
        this,
        this.scaleSmall
      ), this.off (Laya.Event.MOUSE_UP, this, this.scaleBig), this.off (
        Laya.Event.MOUSE_OUT,
        this,
        this.scaleBig
      ), t.prototype.destroy.call (this);
    }), e;
  }) (Laya.Button);
  t.XButtonScale = i;
  var n = (function (t) {
    function e () {
      var e = t.call (this) || this;
      return (e._shwHead = !0), (e._canHide = !1), e;
    }
    return __extends (e, t), Object.defineProperty (e.prototype, 'data', {
      get: function () {
        return this._data;
      },
      set: function (t) {
        this._data = t;
      },
      enumerable: !0,
      configurable: !0,
    }), Object.defineProperty (e.prototype, 'isInit', {
      get: function () {
        return this._isInit;
      },
      enumerable: !0,
      configurable: !0,
    }), Object.defineProperty (e.prototype, 'isReg', {
      get: function () {
        return this._isReg;
      },
      enumerable: !0,
      configurable: !0,
    }), Object.defineProperty (e.prototype, 'unReg', {
      set: function (t) {
        this._unReg = t;
      },
      enumerable: !0,
      configurable: !0,
    }), (e.prototype.createChildren = function () {
      (this._isInit = !1), (this._isReg = !1), (this._unReg = !1), (this.resArr = []), t.prototype.createChildren.call (
        this
      );
    }), (e.prototype.createView = function (t) {
      (this.uiView = t), this.uiView &&
        this.uiView.props &&
        ((this.width = this.uiView.props.width), (this.height = this.uiView.props.height)), this
        .resArr && this.resArr.length > 0
        ? Laya.loader.load (
            this.resArr,
            Laya.Handler.create (this, this.onResourceLoaded),
            null,
            Laya.Loader.ATLAS,
            LoadPriority.Level1
          )
        : this.onResourceLoaded ();
    }), (e.prototype.onResourceLoaded = function () {
      t.prototype.createView.call (this, this.uiView);
      var i = e.resRef, n = this.resArr;
      if (n && n.length > 0)
        for (var a = 0; a < n.length; a++) {
          var s = n[a].url;
          i.hasOwnProperty (s) ? (i[s] += 1) : (i[s] = 1);
        }
    }), (e.prototype.initComplete = function () {
      t.prototype.initComplete.call (
        this
      ), (this._isInit = !0), TimeUtils.callLate (
        this.callLateRegist,
        this,
        10
      );
    }), (e.prototype.callLateRegist = function () {
      this._unReg || this.reg ();
    }), (e.prototype.reg = function () {
      this._canHide &&
        (this._hided = !0), (this._isReg = !0), (this._unReg = !1), this
        .isInit &&
        this.data &&
        (this.data = this.data);
    }), (e.prototype.unreg = function () {
      TimeUtils.clearLate (
        this.callLateRegist,
        this
      ), (this._isReg = !1), (this._unReg = !0), this._hided &&
        (this._hided = !1), this.imgCac && this.imgCac.unload ();
    }), (e.prototype.destroy = function () {
      if (
        (this.isReg &&
          Log.e ('销毁前没有调用 unreg ：' + this.name), (this._isInit = !1), this
          ._childs && this.getChildAt (0))
      ) {
        var i = this.getChildAt (0);
        i && i.paneBg && i.paneBg.oUlad ();
      }
      TimeUtils.clearLate (
        this.callLateRegist,
        this
      ), t.prototype.destroy.call (this, !0);
      var n = e.resRef, a = this.resArr;
      if (a && a.length > 0)
        for (var s = 0; s < a.length; s++) {
          var o = a[s].url;
          n.hasOwnProperty (o) && (n[o] -= 1), !n.hasOwnProperty (o) ||
            n[o] <= 0;
        }
      (this.resArr = []), this.imgCac &&
        this.imgCac.unload (), (this.imgCac = null);
    }), (e.prototype.getCac = function (t, e) {
      this.imgCac || (this.imgCac = new ImageCache ()), this.imgCac.load (t, e);
    }), (e.prototype.cleCac = function (t) {
      this.imgCac && this.imgCac.unloadBy (t);
    }), Object.defineProperty (e.prototype, 'canHide', {
      get: function () {
        return this._canHide;
      },
      enumerable: !0,
      configurable: !0,
    }), Object.defineProperty (e.prototype, 'shwHead', {
      get: function () {
        return this._shwHead;
      },
      enumerable: !0,
      configurable: !0,
    }), (e.resRef = {}), e;
  }) (Laya.View);
  t.XView = n;
  var a = (function (t) {
    function e () {
      var e = t.call (this) || this;
      return (e.m_freedTime = 0), e;
    }
    return __extends (e, t), (e.prototype.initComplete = function () {
      t.prototype.initComplete.call (this);
      var e = this.maskSpr;
      ((this._showMask && (!e || !e.parent)) ||
        (!this._showMask && e && e.parent)) &&
        (this.showMask = this._showMask), this &&
        this.getChildByName ('pane') &&
        this.getChildByName ('pane').hasOwnProperty ('bigCloseBtn')
        ? ((this.bigBtn = this.getChildByName (
            'pane'
          ).bigCloseBtn), Define.isWyw &&
            this.bigBtn &&
            this.width >= 900 &&
            this.height >= 500
            ? (this.bigBtn.visible = !0)
            : this.bigBtn && (this.bigBtn.visible = !1))
        : this &&
            this.hasOwnProperty ('bigCloseBtn') &&
            ((this.bigBtn = this.bigCloseBtn), Define.isWyw && this.bigBtn
              ? (this.bigBtn.visible = !0)
              : this.bigBtn && (this.bigBtn.visible = !1));
    }), (e.prototype.destroy = function () {
      this._closeBtn &&
        this._closeBtn.off (
          Laya.Event.MOUSE_DOWN,
          this,
          this.clsBtnHandler
        ), (this._closeBtn = null), this._bigBtn &&
        this._bigBtn.off (
          Laya.Event.MOUSE_DOWN,
          this,
          this.clsBtnHandler
        ), (this._bigBtn = null);
      var e = this.maskSpr;
      e &&
        (Laya.stage.off (
          Laya.Event.RESIZE,
          this,
          this.onStageResize
        ), e.parent &&
          e.parent.removeChild (
            e
          ), e.graphics.clear (), (this.maskSpr = null), (this.mouseEnabled = !0), (this.mouseThrough = !1)), t.prototype.destroy.call (
        this
      );
    }), (e.prototype.canDestroy = function () {
      return (
        null == this.parent && Laya.Browser.now () - this.m_freedTime >= 6e4
      );
    }), Object.defineProperty (e.prototype, 'freedTime', {
      get: function () {
        return this.m_freedTime;
      },
      set: function (t) {
        this.m_freedTime = t;
      },
      enumerable: !0,
      configurable: !0,
    }), Object.defineProperty (e.prototype, 'showMask', {
      get: function () {
        return this._showMask;
      },
      set: function (t) {
        if (((this._showMask = t), this.isInit)) {
          var e = this.maskSpr;
          t
            ? (e ||
                ((e = this.maskSpr = new Laya.Sprite ()), (e.alpha = 0.4), (e.mouseEnabled = !0), (e.mouseThrough = !1), (this.mouseEnabled = !0), (this.mouseThrough = !0), Laya.stage.on (
                  Laya.Event.RESIZE,
                  this,
                  this.onStageResize
                ), this.onStageResize (null)), e.parent
                ? this.setChildIndex (e, 0)
                : this.addChildAt (e, 0))
            : e &&
                (Laya.stage.off (
                  Laya.Event.RESIZE,
                  this,
                  this.onStageResize
                ), e.parent &&
                  e.parent.removeChild (
                    e
                  ), e.graphics.clear (), (e = null), (this.mouseEnabled = !0), (this.mouseThrough = !1));
        }
      },
      enumerable: !0,
      configurable: !0,
    }), Object.defineProperty (e.prototype, 'clsBtn', {
      get: function () {
        return this._closeBtn;
      },
      set: function (t) {
        var e = this._closeBtn;
        e != t &&
          (e &&
            e.off (
              Laya.Event.MOUSE_DOWN,
              this,
              this.clsBtnHandler
            ), (e = this._closeBtn = t), e.on (
            Laya.Event.MOUSE_DOWN,
            this,
            this.clsBtnHandler
          ));
      },
      enumerable: !0,
      configurable: !0,
    }), Object.defineProperty (e.prototype, 'bigBtn', {
      get: function () {
        return this._bigBtn;
      },
      set: function (t) {
        this._bigBtn != t &&
          (this._bigBtn &&
            this._bigBtn.off (
              Laya.Event.CLICK,
              this,
              this.clsBtnHandler
            ), (this._bigBtn = t), this._bigBtn.on (
            Laya.Event.CLICK,
            this,
            this.clsBtnHandler
          ));
      },
      enumerable: !0,
      configurable: !0,
    }), (e.prototype.clsBtnHandler = function () {
      this.cloWin (), Laya.stage.event (Laya.Event.CLICK);
    }), (e.prototype.onStageResize = function () {
      var t = this.maskSpr;
      if (t) {
        var e = Laya.stage.width, i = Laya.stage.height;
        (t.x = -(e - this.width) / 2), (t.y =
          -(i - this.height) / 2), (t.width = e), (t.height = i);
        var n = t.graphics;
        n.clear (), n.drawRect (0, -100, e, i + 300, '#000000');
      }
    }), (e.prototype.cloWin = function () {}), e;
  }) (n);
  t.XWindow = a;
}) (component || (component = {}));
var __extends =
  (this && this.__extends) ||
  (function () {
    var t = function (e, i) {
      return (t =
        Object.setPrototypeOf ||
        ({__proto__: []} instanceof Array &&
          function (t, e) {
            t.__proto__ = e;
          }) ||
        function (t, e) {
          for (var i in e)
            e.hasOwnProperty (i) && (t[i] = e[i]);
        }) (e, i);
    };
    return function (e, i) {
      function n () {
        this.constructor = e;
      }
      t (e, i), (e.prototype = null === i
        ? Object.create (i)
        : ((n.prototype = i.prototype), new n ()));
    };
  }) (),
  XView = component.XView,
  XWindow = component.XWindow,
  XProgressBar = component.XProgressBar,
  XButtonScale = component.XButtonScale,
  View = laya.ui.View,
  Dialog = laya.ui.Dialog,
  ui;
!(function (t) {
  var e;
  !(function (e) {
    var i;
    !(function (e) {
      var i = (function (e) {
        function i () {
          return e.call (this) || this;
        }
        return __extends (i, e), (i.prototype.createChildren = function () {
          e.prototype.createChildren.call (this), this.createView (
            t.module.loading.LoadingWinUI.uiView
          );
        }), (i.uiView = {
          type: 'XWindow',
          props: {
            width: 1280,
            top: 0,
            right: 0,
            left: 0,
            height: 720,
            centerY: 0,
            centerX: 0,
            bottom: 0,
          },
          child: [
            {
              type: 'Box',
              props: {
                width: 1280,
                var: 'cacheBox',
                height: 720,
                centerY: 0,
                centerX: 0,
                cacheAs: 'bitmap',
              },
              child: [
                {
                  type: 'Image',
                  props: {
                    width: 1800,
                    var: 'bgImg',
                    height: 1e3,
                    centerY: 0,
                    centerX: 0,
                  },
                },
                {
                  type: 'Label',
                  props: {
                    width: 313,
                    visible: !1,
                    text: '健康游戏忠告',
                    height: 41,
                    fontSize: 30,
                    font: 'Microsoft YaHei',
                    color: '#000000',
                    centerY: 252,
                    centerX: 0,
                    align: 'center',
                  },
                },
                {
                  type: 'Label',
                  props: {
                    y: 640,
                    width: 725,
                    visible: !1,
                    text: '抵制不良游戏，拒绝盗版游戏，注意自我保护，谨防受骗上当\\n适度游戏益脑，沉迷游戏伤身，合理安排时间，享受健康生活',
                    padding: '0,0,0,0',
                    leading: 15,
                    height: 81,
                    fontSize: 22,
                    font: 'Microsoft YaHei',
                    color: '#000000',
                    centerX: 0,
                    align: 'center',
                  },
                },
                {
                  type: 'Box',
                  props: {
                    x: 292,
                    width: 696,
                    var: 'barBox',
                    height: 19,
                    centerX: 0,
                    bottom: 30,
                  },
                  child: [
                    {
                      type: 'Image',
                      props: {
                        y: 0,
                        skin: 'view/module/loading/loading_progressBg.png',
                      },
                    },
                    {
                      type: 'XProgressBar',
                      props: {
                        y: 2,
                        x: 24,
                        width: 648,
                        var: 'progressBar',
                        value: 1,
                        skin: 'view/module/loading/loading_bar.png',
                        sizeGrid: '3,33,2,1',
                        height: 12,
                      },
                    },
                    {
                      type: 'Label',
                      props: {
                        width: 569,
                        var: 'tipsTxt0',
                        text: '首次加载时间稍长，请耐心等待。',
                        height: 34,
                        fontSize: 26,
                        font: 'Microsoft YaHei',
                        color: '#ffffff',
                        centerX: 4,
                        bottom: 18,
                        align: 'center',
                      },
                    },
                    {
                      type: 'Label',
                      props: {
                        width: 504,
                        var: 'tipsTxt',
                        text: '提示：（加载游戏主题文件）',
                        height: 32,
                        fontSize: 20,
                        font: 'Microsoft YaHei',
                        color: '#ffffff',
                        centerX: 0,
                        bottom: -30,
                        align: 'center',
                      },
                    },
                    {
                      type: 'Label',
                      props: {
                        width: 143,
                        var: 'refreshTxt',
                        underline: !0,
                        text: '点击刷新',
                        mouseEnabled: !0,
                        height: 34,
                        fontSize: 26,
                        font: 'Microsoft YaHei',
                        color: '#00ff00',
                        centerX: 250,
                        bottom: 18,
                        align: 'center',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        }), i;
      }) (XWindow);
      e.LoadingWinUI = i;
    }) ((i = e.loading || (e.loading = {})));
  }) ((e = t.module || (t.module = {})));
}) (ui || (ui = {}));
var __extends =
  (this && this.__extends) ||
  (function () {
    var t = function (e, i) {
      return (t =
        Object.setPrototypeOf ||
        ({__proto__: []} instanceof Array &&
          function (t, e) {
            t.__proto__ = e;
          }) ||
        function (t, e) {
          for (var i in e)
            e.hasOwnProperty (i) && (t[i] = e[i]);
        }) (e, i);
    };
    return function (e, i) {
      function n () {
        this.constructor = e;
      }
      t (e, i), (e.prototype = null === i
        ? Object.create (i)
        : ((n.prototype = i.prototype), new n ()));
    };
  }) (),
  LoadingWin = (function (t) {
    function e () {
      var e = t.call (this) || this;
      return (e.clo = !1), (e.txt = [
        '正在加载游戏主程序，请稍候',
        '正在加载游戏引用库，请稍候',
        '正在加载游戏主题文件，请稍候',
        '正在加载游戏服务器列表，请稍候',
        '正在连接服务器，请稍候',
        '正在加载游戏配置，请稍候',
        '正在加载游戏图片资源，请稍候',
      ]), (e.arr = [
        '',
        '.',
        '..',
        '...',
      ]), (e.cur = 0), (e.add = 0.1), (e.ext = 0), (e.num = 0), (e.idx = 0), e;
    }
    return __extends (e, t), (e.prototype.createView = function (e) {
      this.resArr.push ({
        url: PathDefine.ATS + 'module/loading.json',
        type: Laya.Loader.ATLAS,
      }), t.prototype.createView.call (this, e);
    }), (e.prototype.initComplete = function () {
      preload_hide ();
      var e = PathDefine.IMG + 'module/loading/loadingBg' + loadurl + '.jpg';
      Laya.isPc &&
        ((this.bgImg.width = 1920), (this.bgImg.height = 1080), (this.tIg = new Laya.Image ()), this.barBox.addChildAt (
          this.tIg,
          0
        ), this.tIg.pos (-289, -168), this.getCac (
          this.tIg,
          PathDefine.IMG + 'module/loading/loadingTipImg.png'
        ), (e =
          PathDefine.IMG +
          'module/loading/pcLoadingBg' +
          loadurl +
          '.jpg'), (100 == Define.syLoginType ||
          101 == Define.syLoginType ||
          Define.syLoginType <= 1) &&
          ((this.vBg = new Laya.Image ()), (this.vBg.sizeGrid =
            '5,5,5,5'), (this.vBg.height = 70), this.getCac (
            this.vBg,
            PathDefine.IMG + 'module/loading/loadingImg.png'
          ), this.barBox.addChild (
            this.vBg
          ), (this.vTx = new Laya.HTMLDivElement ()), 101 ==
            Define.syLoginType || Define.syLoginType <= 1
            ? StringUtils.setHtmlStyle (
                this.vTx,
                16,
                '#ffffff',
                'center',
                'top',
                3
              )
            : StringUtils.setHtmlStyle (
                this.vTx,
                20,
                '#ffffff',
                'center',
                'top',
                5
              ), (this.vTx.style.height = 60), this.vBg.addChild (
            this.vTx
          ), (this.vTx.innerHTML = 100 == Define.syLoginType
            ? '《唐门六道3D》由深圳传盛网络科技有限公司提供，若您遇到问题请联系客服QQ：3344623763<br/>新广出审[2016]125号  出版物号: ISBN 978-7-89988-550-5  著作权人: 深圳艾趣屋科技有限公司  软著登记号:2017SR614206'
            : '本网络游戏适合年满18周岁以上的用户使用，请您确定已如实进行实名注册。<br/>抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。<br/>出版单位：广州华多网络科技有限公司 批准文号：ISBN 978-7-89988-550-5 出版物号：新广出审[2016]125号 备案号：文网游备字[2016] W-RPG 1277号 著作权人：深圳市肃羽科技有限公司'), this.vTx.pos (
            0,
            5
          ), (101 == Define.syLoginType || Define.syLoginType <= 1) &&
            ((this.pcBox = new Laya.Box ()), (this.pcIg = new Laya.Image ()), this.getCac (
              this.pcIg,
              PathDefine.IMG + 'module/loading/pcIcon.png'
            ), this.pcBox.addChild (
              this.pcIg
            ), (this.pcTx = new Laya.HTMLDivElement ()), (this.pcTx.style.height = 20), StringUtils.setHtmlStyle (
              this.pcTx,
              20,
              '#00aded'
            ), (this.pcTx.innerHTML =
              "<a href=''>游戏备案</a>"), this.pcBox.addChild (
              this.pcTx
            ), this.pcTx.pos (41, 13), this.vBg.addChild (
              this.pcBox
            ), this.pcBox.pos (800, 0), this.pcBox.on (
              Laya.Event.CLICK,
              this,
              this.goto
            )))), (this.spr = new Laya.Sprite ()), (this.spr.alpha = 1), (this.spr.mouseEnabled = !0), (this.spr.mouseThrough = !1), this.addChildAt (
        this.spr,
        0
      ), Laya.stage.on (Laya.Event.RESIZE, this, this.msRsz), this.msRsz (
        null
      ), (this.refreshTxt.visible = !isMic), (this.tipsTxt.text =
        ''), (this.progressBar.value = 0), this.getCac (
        this.bgImg,
        e
      ), (this.clo = !1), Laya.timer.frameLoop (
        1,
        this,
        this.prgItv
      ), t.prototype.initComplete.call (this);
    }), (e.prototype.reg = function () {
      this.isInit &&
        (t.prototype.reg.call (this), this.refreshTxt &&
          this.refreshTxt.on (Laya.Event.CLICK, this, this.lkClk));
    }), (e.prototype.unreg = function () {
      this.isInit &&
        (this.refreshTxt.off (Laya.Event.CLICK, this, this.lkClk), this.vTx &&
          (this.vTx.destroy (), (this.vTx = null)), this.tIg &&
          (this.tIg.destroy (), (this.tIg = null)), this.vBg &&
          (this.vBg.destroy (), (this.vBg = null)), this.pcBox &&
          (this.pcBox.off (Laya.Event.CLICK, this, this.goto), this.pcTx &&
            (this.pcTx.destroy (), (this.pcTx = null)), this.pcIg &&
            (this.pcIg.destroy (), (this.pcIg = null)), this.pcBox &&
            (this.pcBox.destroy (), (this.pcBox = null)))), t.prototype.unreg.call (
        this
      );
    }), (e.prototype.destroy = function () {
      this.isInit && Laya.timer.clear (this, this.prgItv), this.spr &&
        (this.spr.parent &&
          this.spr.parent.removeChild (
            this.spr
          ), this.spr.graphics.clear (), (this.spr = null)), Laya.stage.off (
        Laya.Event.RESIZE,
        this,
        this.msRsz
      ), t.prototype.destroy.call (this);
    }), (e.prototype.msRsz = function () {
      if (this.spr) {
        Laya.isPc &&
          ((this.width = Laya.stage.width), (this.height =
            Laya.stage.height), (100 == Define.syLoginType ||
            101 == Define.syLoginType ||
            Define.syLoginType <= 1) &&
            ((this.vBg.width = this.width), (this.vTx.style.width = this.width), this.vBg.pos (
              (696 - this.width) / 2,
              50
            )), (101 == Define.syLoginType || Define.syLoginType <= 1) &&
            this.pcBox.pos (
              this.width - 380,
              0
            ), (this.barBox.bottom = 95)), (this.spr.x =
          -(Laya.stage.width - this.width) / 2), (this.spr.y =
          -(Laya.stage.height - this.height) / 2), (this.spr.width =
          Laya.stage.width), (this.spr.height = Laya.stage.height);
        var t = this.spr.graphics;
        t.clear (), t.drawRect (
          0,
          -100,
          Laya.stage.width,
          Laya.stage.height + 200,
          '#000000'
        );
      }
    }), (e.prototype.lkClk = function () {
      window.location.reload ();
    }), (e.prototype.prgItv = function () {
      (this.cur = this.cur + this.add + this.ext), this.cur > this.max &&
        (this.max = 100 * Math.ceil (this.cur / 100)), (this.ext = this.clo
        ? (100 - this.num) / 6
        : this.cur > this.max
            ? this.max - this.cur
            : this.cur < this.min ? (this.min - this.cur) / 30 : 0), this.ext <=
        -this.add && (this.ext = -this.add + 0.03), this.clo &&
        this.num > this.cur % 100 &&
        LoadingMananger.instance.destroyLoading (), (this.num = this.cur > 100
        ? this.cur % 100
        : this.cur), (this.idx = Math.floor (this.cur / 100)), (this.idx =
        this.idx % this.txt.length), this.isInit &&
        (this.tipsTxt.changeText (
          this.txt[this.idx] + ' ' + Number (this.num).toFixed (2) + '%'
        ), (this.progressBar.value = this.num / 100));
    }), (e.prototype.pgRge = function (t, e) {
      (this.min = t), (this.max = e);
    }), (e.prototype.clsLad = function () {
      (this.clo = !0), (this.max = 100);
    }), (e.prototype.goto = function (t) {
      t &&
        'click' == t.type &&
        openUrl (
          'http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/gameNetTag/4028c08b5419994e01545b98c91a091a'
        );
    }), e;
  }) (ui.module.loading.LoadingWinUI),
  Loading = (function () {
    function t () {
      console.log ('Loading 实例化');
    }
    return (t.prototype.init = function () {
      console.log ('Loading 初始化'), Laya3D.init (
        1422,
        800,
        !0
      ), (Laya.AtlasResourceManager.maxTextureCount = Laya.isPc
        ? 10
        : Laya.isIos
            ? 3
            : 4), (Laya.AtlasResourceManager.atlasTextureWidth = 1024), (Laya.AtlasResourceManager.atlasTextureHeight = 1024), (Laya.stage.screenMode =
        Laya.Stage.SCREEN_HORIZONTAL), (Laya.stage.alignV =
        Laya.Stage.ALIGN_MIDDLE), (Laya.stage.alignH = Laya.Stage.ALIGN_CENTER);
      var t = rootPath;
      t &&
        '' != t &&
        (PathDefine.resRoot = Laya.URL.rootPath = t), (PathDefine.resPrefix = resPath), PathDefine.init (), (Define.syLoginType = syLoginType), (LoadingDefine.libsurl = libsurl), (LoadingDefine.mainurl = mainurl), (VersionManager.ins.vsn = loadver), (Laya.URL.customFormat =
        VersionManager.ins.adVnPr), View.regComponent (
        'XProgressBar',
        XProgressBar
      ), View.regComponent (
        'XButtonScale',
        XButtonScale
      ), TimeUtils.run (), (GameModel.main = this), Laya.Browser.window.addEventListener (
        'resize',
        this.onResize
      ), Laya.stage.on (
        Laya.Event.RESIZE,
        null,
        this.onStageResize
      ), this.onResize (), LoadingMananger.instance.initLoading (), LoadingMananger.instance.showLoading (), report (
        4
      ), console.log ('4.进入loading程序'), this.loadMain ();
    }), (t.prototype.loadMain = function () {
      LoadingMananger.instance.setProgressRang (
        0,
        100
      ), (GameModel.main.main = GameModel.main.loadScript (
        'main',
        LoadingDefine.mainurl,
        GameModel.main.loadedMain,
        GameModel.main.loadMain
      ));
    }), (t.prototype.loadedMain = function () {
      report (6), console.log ('6.加载完成main主程序');
      var t = new Main ();
      t.init ();
    }), (t.prototype.loadScript = function (t, e, i, n) {
      var a = Laya.Browser.document.createElement ('script');
      return (a.type = 'text/javascript'), a.setAttribute (
        'id',
        t
      ), (a.onload = function () {
        i && i ();
      }), (a.onreadystatechange = function () {
        (a.readyState &&
          'loaded' != a.readyState &&
          'complete' != a.readyState) ||
          ((a.onreadystatechange = null), i && i ());
      }), (a.onerror = function () {
        a.parentNode.removeChild (a), n &&
          setTimeout (function () {
            n && n ();
          }, 1e3);
      }), (a.src = e), Laya.Browser.document.body.appendChild (a), a;
    }), (t.prototype.onResize = function () {
      var t, e, i = 0, n = 1.7775;
      Laya.Browser.clientWidth > Laya.Browser.clientHeight
        ? ((t = Laya.Browser.clientWidth), (e = Laya.Browser.clientHeight))
        : ((t = Laya.Browser.clientHeight), (e =
            Laya.Browser.clientWidth)), (i = t / e);
      var a = Math.max (t, i > n ? Math.round (1422 * i / n) : 1422),
        s = Math.max (e, i > n ? 800 : Math.round (800 * n / i));
      (Laya.stage.scaleMode = i > n
        ? Laya.Stage.SCALE_FIXED_HEIGHT
        : Laya.Stage
            .SCALE_FIXED_WIDTH), (Laya.stage.designWidth = a), (Laya.stage.designHeight = s);
    }), (t.prototype.onStageResize = function () {
      LoadingMananger.instance.resizeLoading ();
    }), t;
  }) (),
  GameModel = (function () {
    function t () {}
    return t;
  }) ();
