UnitTitle = function() {
    function t() {
        this._arr = [],
        this._obj = {},
        this.isInit = !1,
        this._sMng = SceneManager.ins
    }
    return Object.defineProperty(t.prototype, "isOpenRender", {
        get: function() {
            return this._open
        },
        set: function(t) {
            if (this._open != t && (this._open = t, this._arr.length > 0)) {
                for (var e, i = this._arr,
                n = i.length,
                s = 0; n > s; s++) e = i[s],
                e && e.display && (e.display instanceof MoviePlayer && (e.display.isOpenRender = t), this._open ? e.display.parent || this._sMng.addTitleDisplay(e.display) : e.display.parent && e.display.parent.removeChild(e.display));
                this.updPos()
            }
        },
        enumerable: !0,
        configurable: !0
    }),
    t.prototype.setUnit = function(t) {
        this._uni = t,
        this.isOpenRender = t.inView,
        this.isInit = !0
    },
    t.prototype.updPos = function() {
        this.layout()
    },
    t.prototype.shaw = function() {
        if (this._uni) {
            var t;
            t = this.sha,
            null == t && (t = this.sha = this.getImage(), t.on(Laya.Event.CLICK, this, this.onClickHandler)),
            t.skin = "view/hurt_title/shadow.png",
            t.width = 117,
            t.height = 78,
            TimeUtils.callLate(this.layout, this)
        }
    },
    t.prototype.shawVis = function(t) {
        if (this._uni) {
            var e = this.sha;
            e && e.visible != t && (e.visible = t)
        }
    },
    t.prototype.blod = function() {
        if (this._uni && (this._uni.type != Number(UnitType.AIUnit) || this._uni.type != Number(UnitType.JQUnit))) {
            var t, e = this._uni.type == UnitType.Monster;
            t = this.bld,
            null == t && (t = this.bld = this.getImage(), t.on(Laya.Event.CLICK, this, this.onClickHandler)),
            t.skin = "view/hurt_title/roleBloodBg.png",
            t.sizeGrid = "2,2,2,2",
            t.width = 101,
            t.height = e ? 8 : 10,
            this._obj[TitleDefine.BLOOD_BG] || this.addTitle(TitleDefine.BLOOD_BG, t, 0, 0, -t.width / 2, 0),
            t = this.bbar,
            null == t && (t = this.bbar = this.getImage(), t.on(Laya.Event.CLICK, this, this.onClickHandler)),
            t.skin = e ? "view/hurt_title/monsterBlood.png": "view/hurt_title/roleBlood.png",
            t.sizeGrid = "2,2,2,2",
            t.width = 99,
            t.height = e ? 6 : 8,
            this._obj[TitleDefine.BLOOD_BAR] || this.addTitle(TitleDefine.BLOOD_BAR, t, 0, t.height + this.bld.height + (e ? 5 : 3), -this.bld.width / 2 + 1, 1),
            t.scaleX = Math.min(Number(this._uni.data.hp) / Number(this._uni.data.maxHp), 1)
        }
    },
    t.prototype.valiBlod = function() {
        if (this.bbar) {
            var t = this.bbar,
            e = this._uni ? this._uni.data: null;
            t && e && (GameTween.removeTweens(t), !Laya.extLimit && this._uni.isOpenRender ? GameTween.get(t).to({
                scaleX: Math.min(Number(this._uni.data.hp) / Number(this._uni.data.maxHp), 1)
            },
            100) : t.scaleX = Math.min(Number(this._uni.data.hp) / Number(this._uni.data.maxHp), 1), Number(this._uni.data.hp) / Number(this._uni.data.maxHp) <= 0 && e instanceof MonsterVO && (this.bld && (this.bld.skin = null), this.rmvTitle(TitleDefine.BLOOD_BG), this.rmvTitle(TitleDefine.BLOOD_BAR)))
        }
    },
    t.prototype.lan = function(t) {
        var e = this.lz;
        if (t.split("_") && !(t.split("_").length < 1)) {
            var i = t.split("_")[0],
            n = Number(t.split("_")[1]);
            null == e && n > 0 && (e = this.lz = this.getImage(), "hhlzmin_" == i ? (e.width = 20, e.height = 20) : (e.width = 21, e.height = 19)),
            e && (n > 0 ? (e.skin = "view/module/main/pcMainView/" + t + ".png", this._obj[TitleDefine.LANZUAN] || this.addTitle(TitleDefine.LANZUAN, e, e.width, 0, 0, 2)) : this.rmvTitle(TitleDefine.LANZUAN))
        }
    },
    t.prototype.lanY = function(t) {
        var e = this.year;
        null == e && t && (e = this.year = this.getImage(), e.width = 21, e.height = 19),
        e && (t ? (e.skin = "view/module/main/pcMainView/" + t + ".png", this._obj[TitleDefine.YEAR] || this.addTitle(TitleDefine.YEAR, e, e.width, 0, 0, 2)) : this.rmvTitle(TitleDefine.YEAR))
    },
    t.prototype.huan = function(t) {
        var e = this.hz;
        null == e && t && (e = this.hz = this.getImage(), e.width = 38, e.height = 26),
        e && (t ? (e.skin = "view/module/main/pcMainView/" + t + ".png", this._obj[TitleDefine.HUANGZUAN] || this.addTitle(TitleDefine.HUANGZUAN, e, e.width, 0, 0, 0)) : this.rmvTitle(TitleDefine.HUANGZUAN))
    },
    t.prototype.setVip = function(t) {
        var e = this.vip;
        null == e && t > 0 && (e = this.vip = this.getImage(), e.width = 50, e.height = 27),
        e && (t > 0 ? (e.skin = "view/common/v" + t + ".png", this._obj[TitleDefine.VIP] || this.addTitle(TitleDefine.VIP, e, e.width, 0, 0, 0)) : this.rmvTitle(TitleDefine.VIP))
    },
    t.prototype.setJing = function(t) {
        var e = this.jing;
        if (null == e && t > 0 && (e = this.jing = this.getImage()), e) if (t > 0) if (e.skin = "view/hurt_title/jingjie_" + t + ".png", e.width = e.source.width, e.height = e.source.height, this._obj[TitleDefine.JINGJIE]) {
            var i = this._obj[TitleDefine.JINGJIE];
            i.width = e.width,
            this.resetPosi(TitleDefine.JINGJIE),
            TimeUtils.callLate(this.layout, this)
        } else this.addTitle(TitleDefine.JINGJIE, e, e.width, 0, 0, 0);
        else this.rmvTitle(TitleDefine.JINGJIE)
    },
    t.prototype.setName = function(t) {
        null == this.nameT && (this.nameT = this.getText(), this.nameT.on(Laya.Event.CLICK, this, this.onClickHandler)),
        this.setTextValue(this.nameT, t),
        this._obj[TitleDefine.NAME] || this.addTitle(TitleDefine.NAME, this.nameT, this.nameT.width, this.nameT.height)
    },
    t.prototype.setColor = function(t, e, i) {
        void 0 === e && (e = !1),
        void 0 === i && (i = "#000000");
        var n = this.nameT;
        null == n && (n = this.nameT = this.getText()),
        n.color != t && (n.color = t),
        n.bold != e && (n.bold = e),
        n.strokeColor != i && (n.strokeColor = i)
    },
    t.prototype.setPartner = function(t) {
        var e = this.partnerT;
        null == e && t && (e = this.partnerT = this.getText(), e.color = "#F4CE0C"),
        e && (t ? (this.setTextValue(e, t), this._obj[TitleDefine.PARTNER] || this.addTitle(TitleDefine.PARTNER, e, e.width, e.height, -e.width / 2)) : (this.setTextValue(e, ""), this.rmvTitle(TitleDefine.PARTNER)))
    },
    t.prototype.partnerColor = function(t, e, i) {
        void 0 === e && (e = !1),
        void 0 === i && (i = "#000000");
        var n = this.partnerT;
        null == n && (n = this.partnerT = this.getText()),
        n.color != t && (n.color = t),
        n.bold != e && (n.bold = e),
        n.strokeColor != i && (n.strokeColor = i)
    },
    t.prototype.bossTime = function(t, e) {
        void 0 === e && (e = "#ff0000"),
        null == this.countT && (this.countT = this.getText()),
        this.countT.color != e && (this.countT.color = e),
        t ? (this.setTextValue(this.countT, t), this._obj[TitleDefine.BOSSCOUNT] || this.addTitle(TitleDefine.BOSSCOUNT, this.countT, this.countT.width, this.countT.height, -this.countT.width / 2, 50)) : this.rmvTitle(TitleDefine.BOSSCOUNT)
    },
    t.prototype.setClan = function(t) {
        var e = this.clanT;
        null == e && t && (e = this.clanT = this.getText(), e.color = "#F4CE0C"),
        e && (t ? (this.setTextValue(e, t), this._obj[TitleDefine.CLAN] || this.addTitle(TitleDefine.CLAN, e, e.width, e.height, -e.width / 2)) : (this.setTextValue(e, ""), this.rmvTitle(TitleDefine.CLAN)))
    },
    t.prototype.clanColor = function(t, e, i) {
        void 0 === e && (e = !1),
        void 0 === i && (i = "#000000");
        var n = this.clanT;
        null == n && (n = this.clanT = this.getText()),
        n.color != t && (n.color = t),
        n.bold != e && (n.bold = e),
        n.strokeColor != i && (n.strokeColor = i)
    },
    t.prototype.clanWar = function(t) {
        if ("0" != t) {
            var e = this.warT;
            if (null == e && t && (e = this.warT = this.getText(), e.color = "#F4CE0C"), e) if (t) if (this.setTextValue(e, "[" + t + "]"), this._obj[TitleDefine.CWNAME]) {
                var i = this._obj[TitleDefine.CWNAME];
                i.width = e.width,
                this.resetPosi(TitleDefine.CWNAME),
                TimeUtils.callLate(this.layout, this)
            } else this.addTitle(TitleDefine.CWNAME, e, e.width, 0, 0, 0);
            else this.setTextValue(e, ""),
            this.rmvTitle(TitleDefine.CWNAME)
        }
    },
    t.prototype.warColor = function(t, e, i) {
        void 0 === e && (e = !1),
        void 0 === i && (i = "#000000");
        var n = this.warT;
        null == n && (n = this.warT = this.getText()),
        n.color != t && (n.color = t),
        n.bold != e && (n.bold = e),
        n.strokeColor != i && (n.strokeColor = i)
    },
    t.prototype.warPos = function(t) {
        var e = this.war;
        null == e && t > 0 && (e = this.war = this.getImage()),
        e && (t > 0 ? (t >= 4 && 20 >= t && (t = 4), e.skin = "view/hurt_title/ClanWarPos_" + t + ".png", e.width = 79, e.height = 26, this._obj[TitleDefine.CWPOS] ? TimeUtils.callLate(this.layout, this) : this.addTitle(TitleDefine.CWPOS, e, e.width, e.height, -e.width / 2, -e.height + 24)) : this.rmvTitle(TitleDefine.CWPOS))
    },
    t.prototype.warFlag = function(t) {
        if (0 >= t) this.rmvTitle(TitleDefine.FLAG);
        else if (MapManager.ins.mapVO && MapManager.ins.mapVO.mapType == MapType.ClanWar) {
            var e = this.clan;
            null == e && (e = this.clan = this.getImage(), e.width = 186, e.height = 144),
            e && (e.skin = "view/hurt_title/flag.png", this._obj[TitleDefine.FLAG] || this.addTitle(TitleDefine.FLAG, e, e.width, e.height, -e.width / 2, -e.height + 20))
        } else this.rmvTitle(TitleDefine.FLAG)
    },
    t.prototype.updFirst = function(t) {
        if (0 >= t) this.rmvTitle(TitleDefine.FirstHarm);
        else {
            var e = this.first;
            null == e && (e = this.first = this.getImage(), e.width = 169, e.height = 120),
            e && (e.skin = "view/hurt_title/copyboss_img.png", this._obj[TitleDefine.FirstHarm] || this.addTitle(TitleDefine.FirstHarm, e, e.width, e.height, -e.width / 2, -e.height + 20))
        }
    },
    t.prototype.updBorder = function(t) {
        if (0 >= t) this.rmvTitle(TitleDefine.BorderSteal);
        else if (MapManager.ins.mapVO && MapManager.ins.isBorderMap() && 1 == t) {
            var e = this.bord;
            null == e && (e = this.bord = this.getImage(), e.width = 79, e.height = 79),
            e && (e.skin = "view/hurt_title/borderStealImg.png", this._obj[TitleDefine.BorderSteal] || this.addTitle(TitleDefine.BorderSteal, e, e.width, e.height, -e.width / 2, -e.height + 20))
        } else this.rmvTitle(TitleDefine.BorderSteal)
    },
    t.prototype.updCheng = function(t) {
        if (0 >= t) this.rmvTitle(TitleDefine.CHENGHAO);
        else {
            var e = ChengHaoTem.getVoByuniId(t);
            if (e) {
                var i = e.sceneXY.split(";");
                i.length >= 2 ? this.addMovie(e.touxianicon, TitleDefine.CHENGHAO, Number(i[0]), Number(i[1])) : this.addMovie(e.touxianicon, TitleDefine.CHENGHAO, 200, 100)
            }
        }
    },
    t.prototype.addMovie = function(t, e, i, n) {
        void 0 === n && (n = 0),
        this.hasTitle(e) && this.rmvTitle(e);
        var s = this.getTitleVO(e);
        s.display = ObjectPool.g("MoviePlayer"),
        s.display instanceof MoviePlayer && s.display.getUrl() != t && (s.display.play(t, !0), s.height = n, s.width = i, s.x = 0, s.y = -n + 70, this.addTitle(e, s.display, i, n, 0, -n + 70))
    },
    t.prototype.setDrop = function(t, e) {
        if (t) {
            var i = this.drop;
            null == i && (i = this.drop = this.getImage(), this.drop.on(Laya.Event.CLICK, this, this.onClickHandler)),
            i.skin = "view/hurt_title/dropBg.png",
            i.sizeGrid = "2,2," + (i.width - 2) + "," + (i.height - 2),
            i.width = 248,
            i.height = 20;
            var n = this.dropT;
            null == n && (n = this.dropT = this.getText(), this.dropT.on(Laya.Event.CLICK, this, this.onClickHandler)),
            n && (n.fontSize = 16, n.color != e && (n.color = e), this.setTextValue(n, t), this._obj[TitleDefine.DROP] || this.addTitle(TitleDefine.DROP, n, n.width, n.height, -n.width / 2), i.scaleX = n.width / 248 + .1),
            this._obj[TitleDefine.DROP_BG] || this.addTitle(TitleDefine.DROP_BG, i, 0, 0, -248 * i.scaleX / 2, 2)
        } else this.rmvTitle(TitleDefine.DROP_BG),
        this.rmvTitle(TitleDefine.DROP)
    },
    t.prototype.boxName = function(t) {
        if (t) {
            var e = this.box1;
            null == e && (e = this.box1 = this.getImage()),
            e.skin = "view/hurt_title/dropBg.png",
            e.sizeGrid = "2,2," + (e.width - 2) + "," + (e.height - 2),
            e.width = 150,
            e.height = 20;
            var i = this.bossT;
            null == i && (i = this.bossT = this.getHTMLText()),
            i && (i.style.fontSize = 16, this.setHTMLTextValue(i, t), this._obj[TitleDefine.BOSSNAME] || this.addTitle(TitleDefine.BOSSNAME, i, i.width, i.height, -i.width / 2, -226), e.scaleX = i.width / 150 + .1),
            this._obj[TitleDefine.BOSSNAME_BG] || this.addTitle(TitleDefine.BOSSNAME_BG, e, 0, 0, -150 * e.scaleX / 2, -224)
        } else this.rmvTitle(TitleDefine.BOSSNAME_BG),
        this.rmvTitle(TitleDefine.BOSSNAME)
    },
    t.prototype.boxDrop = function(t) {
        if (t) {
            var e = this.box2;
            null == e && (e = this.box2 = this.getImage()),
            e.skin = "view/hurt_title/dropBg.png",
            e.sizeGrid = "2,2," + (e.width - 2) + "," + (e.height - 2),
            e.width = 150,
            e.height = 20;
            var i = this.bdropT;
            null == i && (i = this.bdropT = this.getHTMLText()),
            i && (i.style.fontSize = 16, this.setHTMLTextValue(i, t), this._obj[TitleDefine.BOXDROP] || this.addTitle(TitleDefine.BOXDROP, i, i.width, i.height, -i.width / 2, -223), e.scaleX = i.width / 150 + .1),
            this._obj[TitleDefine.BOXDROP_BG] || this.addTitle(TitleDefine.BOXDROP_BG, e, 0, 0, -150 * e.scaleX / 2, -221)
        } else this.rmvTitle(TitleDefine.BOXDROP_BG),
        this.rmvTitle(TitleDefine.BOXDROP)
    },
    t.prototype.boxHurt = function(t) {
        if (t) {
            var e = this.box3;
            null == e && (e = this.box3 = this.getImage()),
            e.skin = "view/hurt_title/dropBg.png",
            e.sizeGrid = "2,2," + (e.width - 2) + "," + (e.height - 2),
            e.width = 238,
            e.height = 20;
            var i = this.hurtT;
            null == i && (i = this.hurtT = this.getHTMLText()),
            i && (i.style.fontSize = 16, this.setHTMLTextValue(i, t), this._obj[TitleDefine.BOSSHURT] || this.addTitle(TitleDefine.BOSSHURT, i, i.width, i.height, -i.width / 2, -220), e.scaleX = i.width / 238 + .1),
            this._obj[TitleDefine.BOSSHURT_BG] || this.addTitle(TitleDefine.BOSSHURT_BG, e, 0, 0, -238 * e.scaleX / 2, -218)
        } else this.rmvTitle(TitleDefine.BOSSHURT_BG),
        this.rmvTitle(TitleDefine.BOSSHURT)
    },
    t.prototype.boxTime = function(t, e) {
        if (t) {
            var i = this.bcountT;
            null == i && (i = this.bcountT = this.getText()),
            i && (i.fontSize = 16, i.color != e && (i.color = e), this.setTextValue(i, t), this._obj[TitleDefine.COUNT] || this.addTitle(TitleDefine.COUNT, i, i.width, i.height, -i.width / 2, -100))
        } else this.rmvTitle(TitleDefine.COUNT)
    },
    t.prototype.setTalk = function(t) {
        if (t && "" != t) {
            var e = this.talk;
            null == e && (e = this.talk = this.getImage()),
            e.skin = "view/hurt_title/talkBg.png",
            e.sizeGrid = "10,10,30,70,0";
            var i = this.talkT;
            null == i && (i = this.talkT = this.getText()),
            i && (i.fontSize = 18, i.color = "#FFFFFF", i.wordWrap = !0, i.leading = 3, i.width = 260, this.setTextValue(i, t), i.width = i.textField.textWidth < 260 ? i.textField.textWidth: 260, this._obj[TitleDefine.TALK] || this.addTitle(TitleDefine.TALK, i, 0, 0, -50, 10 - i.height), e.width = i.width + 20, e.width < 100 && (e.width = 100), e.height = i.height + 30),
            this._obj[TitleDefine.TALK_BG] || this.addTitle(TitleDefine.TALK_BG, e, 0, 0, -60, 5 - i.height)
        } else this.rmvTitle(TitleDefine.TALK_BG),
        this.rmvTitle(TitleDefine.TALK)
    },
    t.prototype.addTitle = function(t, e, i, n, s, a) {
        if (void 0 === i && (i = 0), void 0 === n && (n = 0), void 0 === s && (s = 0), void 0 === a && (a = 0), !this._obj[t]) {
            var o = this.getTitleVO(t);
            o.display = e,
            o.width = i,
            o.height = n,
            this.resetPosi(t) || (o.x = s),
            o.y = a,
            TimeUtils.callLate(this.layout, this)
        }
    },
    t.prototype.rmvTitle = function(t) {
        var e = this._obj[t];
        e && (e.display && e.display.off(Laya.Event.CLICK, this, this.onClickHandler), e.destroy(), this._arr.splice(this._arr.indexOf(e), 1), delete this._obj[t], this._arr.sort(function(t, e) {
            return t.level > e.level ? 1 : -1
        }), this.resetPosi(t), TimeUtils.callLate(this.layout, this)),
        t == TitleDefine.BLOOD_BG ? this.bld = null: t == TitleDefine.BLOOD_BAR ? this.bbar = null: t == TitleDefine.VIP ? this.vip = null: t == TitleDefine.NAME ? this.nameT = null: t == TitleDefine.JINGJIE ? this.jing = null: t == TitleDefine.CLAN ? this.clanT = null: t == TitleDefine.DROP_BG ? this.drop = null: t == TitleDefine.DROP ? this.dropT = null: t == TitleDefine.COUNT ? this.bcountT = null: t == TitleDefine.TALK_BG ? this.talk = null: t == TitleDefine.TALK ? this.talkT = null: t == TitleDefine.FirstHarm ? this.first = null: t == TitleDefine.BOSSNAME_BG ? this.box1 = null: t == TitleDefine.BOSSNAME ? this.bossT = null: t == TitleDefine.BOXDROP_BG ? this.box2 = null: t == TitleDefine.BOXDROP ? this.bdropT = null: t == TitleDefine.BOSSHURT_BG ? this.box3 = null: t == TitleDefine.BOSSHURT ? this.hurtT = null: t == TitleDefine.BOSSCOUNT ? this.countT = null: t == TitleDefine.CWNAME ? this.warT = null: t == TitleDefine.CWPOS ? this.war = null: t == TitleDefine.FLAG ? this.clan = null: t == TitleDefine.BorderSteal ? this.bord = null: t == TitleDefine.LANZUAN ? this.lz = null: t == TitleDefine.YEAR ? this.year = null: t == TitleDefine.HUANGZUAN ? this.hz = null: t == TitleDefine.PARTNER && (this.partnerT = null)
    },
    t.prototype.hasTitle = function(t) {
        return this._obj[t]
    },
    t.prototype.resetPosi = function(t) {
        if (t == TitleDefine.LANZUAN || t == TitleDefine.HUANGZUAN || t == TitleDefine.YEAR || t == TitleDefine.VIP || t == TitleDefine.JINGJIE || t == TitleDefine.NAME || t == TitleDefine.CWNAME) {
            var e = this._obj[TitleDefine.LANZUAN] ? this._obj[TitleDefine.LANZUAN].width: 0,
            i = this._obj[TitleDefine.YEAR] ? this._obj[TitleDefine.YEAR].width: 0,
            n = this._obj[TitleDefine.HUANGZUAN] ? this._obj[TitleDefine.HUANGZUAN].width: 0,
            s = this._obj[TitleDefine.CWNAME] ? this._obj[TitleDefine.CWNAME].width: 0,
            a = this._obj[TitleDefine.VIP] ? this._obj[TitleDefine.VIP].width: 0,
            o = this._obj[TitleDefine.JINGJIE] ? this._obj[TitleDefine.JINGJIE].width: 0,
            r = this._obj[TitleDefine.NAME] ? this._obj[TitleDefine.NAME].width: 0;
            return this._obj[TitleDefine.LANZUAN] && (this._obj[TitleDefine.LANZUAN].x = -(s + a + o + r + e + i) / 2),
            this._obj[TitleDefine.YEAR] && (this._obj[TitleDefine.YEAR].x = -(s + a + o + r + e + i) / 2 + e),
            this._obj[TitleDefine.HUANGZUAN] && (this._obj[TitleDefine.HUANGZUAN].x = -(s + a + o + r + e + i + n) / 2),
            this._obj[TitleDefine.CWNAME] && (this._obj[TitleDefine.CWNAME].x = -(s + a + o + r + e + i + n) / 2 + e + i + n),
            this._obj[TitleDefine.VIP] && (this._obj[TitleDefine.VIP].x = -(s + a + o + r + e + i + n) / 2 + e + i + s + n),
            this._obj[TitleDefine.JINGJIE] && (this._obj[TitleDefine.JINGJIE].x = -(s + a + o + r + e + i + n) / 2 + e + i + s + a + n),
            this._obj[TitleDefine.NAME] && (this._obj[TitleDefine.NAME].x = -(s + a + o + r + e + i + n) / 2 + e + i + s + a + o + n),
            !0
        }
        return ! 1
    },
    t.prototype.layout = function() {
        var t = this._uni ? this._uni.pos2D: null;
        if (t) {
            for (var e, i = this._arr,
            n = i.length,
            s = 0,
            a = 0; n > a; a++) e = i[a],
            null != e && null != e.display && (null == e.display.parent && this._sMng.addTitleDisplay(e.display), e.display.pos(t.x + e.x, t.y + e.y + this.offsetY + s), s -= e.height > 0 ? e.height + 5 : e.height);
            var o = this.sha;
            o && (null == o.parent && this._sMng.addShadowDisplay(o), o.pos(t.x - 58, t.y - 39))
        }
    },
    t.prototype.clean = function() {
        for (var e, i = this._arr,
        n = i.length,
        s = 0; n > s; s++) e = i[s],
        e && (e.display && e.display.off(Laya.Event.CLICK, this, this.onClickHandler), e.destroy());
        i.length = 0,
        this._obj = {},
        this.bbar && GameTween.removeTweens(this.bbar);
        var a = this.sha;
        a && (a.visible = !0, a.off(Laya.Event.CLICK, this, this.onClickHandler), a.parent && a.parent.removeChild(a), t.ImgPools.push(a), this.sha = null),
        this.vip = null,
        this.jing = null,
        this.bld = null,
        this.bbar = null,
        this.drop = null,
        this.talk = null,
        this.first = null,
        this.war = null,
        this.clan = null,
        this.nameT = null,
        this.clanT = null,
        this.dropT = null,
        this.talkT = null,
        this.warT = null,
        this.partnerT = null,
        this.box1 = null,
        this.box2 = null,
        this.box3 = null,
        this.lz = null,
        this.year = null,
        this.hz = null,
        this.bord = null,
        this.bcountT = null,
        this.bdropT = null,
        this.countT = null,
        this.bossT = null,
        this.hurtT = null,
        this._open = !1,
        this._uni = null,
        this.isInit = !1
    },
    t.prototype.getTitleVO = function(e) {
        var i = this._obj[e];
        return null == i && (i = t.VOPools.length ? t.VOPools.shift() : new TitleVO, i.level = e, this._obj[e] = i, this._arr.push(i), this._arr.sort(function(t, e) {
            return t.level > e.level ? 1 : -1
        })),
        i
    },
    t.prototype.getImage = function() {
        var e;
        return e = t.ImgPools.length ? t.ImgPools.shift() : new Laya.Image,
        e.scaleX = 1,
        e.scaleY = 1,
        e
    },
    t.prototype.getText = function() {
        var e;
        return t.TxtPools.length ? e = t.TxtPools.shift() : (e = new Laya.Label, e.font = "Microsoft YaHei", e.align = "left", e.stroke = 1),
        e.wordWrap = !1,
        e.fontSize = 18,
        e.color = "#ffffff",
        e.bold = !1,
        e.strokeColor = "#000000",
        e.text = "",
        e
    },
    t.prototype.getHTMLText = function() {
        var e;
        return t.HTMLTxtPools.length ? e = t.HTMLTxtPools.shift() : (e = new Laya.HTMLDivElement, e.style.fontFamily = "Microsoft YaHei", e.style.valign = "top", e.style.align = "center", e.style.stroke = 1),
        e.style.fontSize = 18,
        e.style.color = "#ffffff",
        e.style.bold = !1,
        e.style.strokeColor = "#000000",
        e.style.leading = 8,
        e.text = "",
        e
    },
    t.prototype.setTextValue = function(t, e) {
        t.text != e && (t.text = e, t.width = t.textField.textWidth, t.height = t.textField.textHeight, t.x = -t.width >> 1 >> 0)
    },
    t.prototype.setHTMLTextValue = function(t, e) {
        t.text != e && (t.innerHTML = e, t.width = 300, t.style.height = t.contextHeight, t.x = -t.width >> 1 >> 0)
    },
    t.prototype.onClickHandler = function(t) {
        if (t.target && this._uni) {
            if (this._uni.data && this._uni.data.type == UnitType.Collect && !this._uni.data.asset) return;
            this._sMng.gotoUnit(this._uni)
        }
    },
    t.TxtPools = [],
    t.ImgPools = [],
    t.VOPools = [],
    t.HTMLTxtPools = [],
    t
} (),