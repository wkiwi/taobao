<template>
    <div v-if="data">
        <detail-header :title="data.goods_title" :scrollY="scrollY"></detail-header>
        <fade>
            <parameter :itemProperties="itemProperties" :listShow="PropertiesTip" v-show="PropertiesTip" v-on:hide="hideProperties"></parameter>
        </fade>
        <fade>
            <div class="mask" v-show="PropertiesTip"  @click="hideProperties" ></div>
        </fade>
        <fade>
            <tkl-pop :tkl="TKOUl" v-show="tklMask" v-on:tklhide="hideTklMask"></tkl-pop>
        </fade>
        <fade>
            <div class="mask" v-show="tklMask"  @click="hideTklMask"></div>
        </fade>
        <div class="detail" ref="detail">
            <div class="wrapper">
                <detail-swiper :swiperimgs="swiperImgs" :sightName="name"></detail-swiper>
                <div class="good-info">
                    <h1 class="title"><span class="is-tianmao">{{data.is_tmall}}</span>{{data.goods_title}}</h1>
                    <div class="row">
                        <span class="quanhou">券后价 ￥ <span class="strong">{{data.goods_price - data.coupon_price | round}} </span></span>
                        <span class="goods-sales">已售: {{data.goods_sales}}</span>
                    </div>
                    <div class="row">
                        <span class="goods-price"> 原价{{data.goods_price}}</span>
                        <span class="favorite" :class="{'favorited':favorited}" @click="favorite">{{favorited ? '已收藏':'收藏'}} <i class="icon-14"></i></span>
                    </div>
                    <div class="quan-info" @click="buy" >
                        <div class="desc">
                            <div class="left">
                                <div class="wrapper">
                                    <p class="coupon_price"> <span class="strong">{{data.coupon_price | parseInt}}</span>元优惠券</p>
                                    <p class="date">{{data.coupon_start_time |date}} ~ {{data.coupon_end_time | date}}</p>
                                </div>
                            </div>
                            <div class="right"><span class="text">立即领券</span></div>
                        </div>
                    </div>
                    <div class="goods-introduce">{{data.goods_introduce}}</div>
                </div>
                <div class="split"></div>
                <div class="item-properties" @click="showProperties">
                    参数
                    <i class="icon-3 to-right"></i>
                </div>
                <div class="split"></div>
                <nice-title :type="0">店铺信息</nice-title>
                <div class="shop-content">
                    <div class="shop-wrapper">
                        <div class="shop-icon">
                            <img class="img" :src="seller.shopIcon" alt="LOGO">
                        </div>
                        <div class="shop-title">
                            <div class="shop-name">
                                    {{seller.shopName}}
                            </div>
                            <div class="shop-type">
                                    <img class="img" :src="seller.creditLevelIcon" >
                            </div>
                        </div>
                        <div class="shop-desc" v-if="seller.evaluates">
                            <div class="box border-right">
                                {{seller.evaluates[0].title}} {{seller.evaluates[0].score}}
                                <span class="mini-text" :style="{'color':seller.evaluates[0].levelBackgroundColor,'background':seller.evaluates[0].levelTextColor}">{{seller.evaluates[0].levelText}}</span>
                            </div>
                            <div class="box border-right">
                                {{seller.evaluates[1].title}} {{seller.evaluates[1].score}}
                                <span class="mini-text" :style="{'color':seller.evaluates[1].levelBackgroundColor,'background':seller.evaluates[1].levelTextColor}">{{seller.evaluates[1].levelText}}</span>
                            </div>
                            <div class="box">
                                {{seller.evaluates[2].title}} {{seller.evaluates[2].score}}
                                <span class="mini-text" :style="{'color':seller.evaluates[2].levelBackgroundColor,'background':seller.evaluates[2].levelTextColor}">{{seller.evaluates[2].levelText}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="split"></div>
                <nice-title :type="0">宝贝详情</nice-title>
                <div class="detail-img">
                    <div class="detail-img-wrapper" >
                        <img class="img" v-for="(item,index) of detailImg" :key="index" :src="item" >
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import DetailHeader from './header/Header'
import DetailSwiper from './swiper/Swiper'
import Parameter from './parameter/Parameter'
import TklPop from './tklpop/TklPop'
import BScroll from 'better-scroll'
import NiceTitle from 'common/nicetitle/NiceTitle'
import Fade from 'common/fade/FadeAnimation'
import {saveToLocal, loadFromLocal, deleteToLocal} from '@/assets/js/Store'
export default {
    name: 'Detail',
    data () {
        return {
            data: {},
            details: {},
            name: '牙膏',
            swiperImgs: [],
            detailImg: [],
            seller: {},
            TKOUl: '',
            favorited: false,
            itemProperties: [],
            PropertiesTip: false,
            scrollY: 0,
            showAbs: true,
            tklMask: false
        }
    },
    created () {
        this.data = this.$route.params
        this.getDetail()
        this.getDetailImg()
        this.selectFavorite()
    },
    mounted () {
        // console.log(this.data)
        this._initScroll()
    },
    filters: {
        round (number) {
            return number.toFixed(1)
        },
        parseInt (number) {
            return parseInt(number)
        },
        date (date) {
            return date.slice(0, 11)
        }
    },
    methods: {
        _initScroll () {
            if (!this.scroll) {
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs.detail, {
                            click: true,
                            probeType: 3
                        })
                        this.scroll.on('scroll', (pos) => {
                            this.scrollY = Math.abs(Math.round(pos.y))
                            this.scrollY > 200 ? (this.showAbs = false) : (this.showAbs = true)
                        })
                    })
            } else {
                this.scroll.refresh()
            }
        },
        getDetail: function () {
            axios.get('https://h5api.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/?data=%7B%22itemNumId%22%3A%22' + this.data.goods_id + '%22%7D')
            .then(this.handlegetDetailSucc)  
        },
        handlegetDetailSucc: function (res) {
            // console.log(res.data)
            let data = res.data
            if (data.ret[0] === 'SUCCESS::调用成功') {
                this.details = data.data
                this.swiperImgs = data.data.item.images
                this.seller = data.data.seller
                let groupProps = data.data.props.groupProps[0]['基本信息']
                let arr = []
                for (let i = 0; i < groupProps.length; i++) {
                    let obj = {}
                    for (let k in groupProps[i]) {
                        obj.name = k
                        obj.value = groupProps[i][k]
                        arr.push(obj)
                    }
                }
                this.itemProperties = arr
                // console.log(this.itemProperties)
            }
        },
        getDetailImg: function () { // 旧接口  https://hws.m.taobao.com/cache/mtop.wdetail.getItemDescx/4.1/?data={%22item_num_id%22:%22' + this.data.goods_id + '%22}&type=json&dataType=json
            axios.get('http://h5api.m.taobao.com/h5/mtop.taobao.detail.getdesc/6.0/?data={%22id%22:%22' + this.data.goods_id + '%22}')
            .then(this.handlegetDetailImgfSucc)  
        },
        handlegetDetailImgfSucc: function (res) {
            let data = res.data
            // console.log(data)
            if (data.ret[0] === 'SUCCESS::调用成功') {
                // this.detailImg = data.data.images
                // console.log(data.data.pcDescContent)
                let str = data.data.pcDescContent
                let arr = []
                str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
                    arr.push('http:' + capture)
                })
                this.detailImg = arr
            }
        },
        buy: function () {
            if (!this.TKOUl) { // 二次点击直接显示不请求
                axios.get('http://api.kiwifruits.cn/djzk/heightMoney.php?id=' + this.data.goods_id)
                .then(this.handleBuySucc) 
            } else {
                this.tklMask = true
            }
        },
        handleBuySucc: function (res) {
            let data = res.data
            // console.log(res)
            this.tkl(data.url)
        },
        tkl: function (url) {
            axios.get('http://api.kiwifruits.cn/djzk/tkl.php?TEXT=' + this.data.goods_title + '&URL=' + url)
            .then(this.handleTklSucc) 
        },
        handleTklSucc: function (res) {
            let data = res.data
            this.TKOUl = '复制框内整段文字，打开【手淘APP】即可领券购买。' + data.data.model
            this.tklMask = true
            // console.log(data.data.model)
        },
        favorite: function () { // 收藏
            if (!this.favorited) {
                saveToLocal(this.data.goods_id, 'favorite', this.data)
            } else {
                this.deleteFavorate()
            }
            this.selectFavorite()
        },
        selectFavorite: function () { // 查询收藏
            let fav = loadFromLocal(this.data.goods_id, 'favorite', '')
            fav ? (this.favorited = true) : (this.favorited = false)
        },
        deleteFavorate: function () { // 取消该商品的收藏
            deleteToLocal(this.data.goods_id, 'favorite', '')
        },
        showProperties: function () {
            this.PropertiesTip = true
        },
        hideProperties: function () {
            this.PropertiesTip = false
        },
        hideTklMask: function () {
            this.tklMask = false
        }
    },
    components: {
        DetailHeader,
        DetailSwiper,
        NiceTitle,
        Parameter,
        Fade,
        TklPop
    },
    beforeRouteLeave (to, from, next) {
        to.meta.isBack = true
        next()
    }
}
</script>

<style scoped lang="stylus">
@import '~styles/common.styl'
    .mask
        position: fixed
        top: 0
        left: 0
        bottom: 0
        right: 0
        width: 100%
        height: 100%
        background: rgba(7,17,27, .5)
        z-index: 499
    .detail
        position: absolute 
        top: 0
        left: 0
        right: 0
        bottom: 0
        .good-info
            padding:  .2rem
            .title
                font-size: .3rem
                line-height: .4rem
            .row
                height: .6rem
                line-height: .6rem
                font-size: .2rem
                .quanhou
                    color: $RedColor=#FC436D
                    .strong
                        font-size: .36rem
                        font-weight: 700
                .goods-sales
                    float: right
                .goods-price
                    text-decoration:line-through
                    color: #888
                .favorite
                    float: right
                .favorited
                    color: $RedColor
            .quan-info
                width: 100%
                background: url('./goods_quan.png') no-repeat
                background-size: auto 100%;
                height: 0
                padding-bottom: 23.897%
                position: relative
                z-index: 50
                .desc
                    width: 100%
                    height: 100%
                    position: absolute 
                    top: 0
                    left: 0
                    display: flex
                    .left
                        flex:7
                        padding: .4rem 0 .4rem .3rem
                        .wrapper
                            position: relative
                            height: 100%
                            border-right: 1px dotted #fff
                            color: #fff
                            .coupon_price
                                width: 100%
                                font-size: .28rem
                                position: absolute 
                                top: 0
                                text-align: center
                                font-weight: 700
                                .strong
                                    font-size: .36rem
                                    margin-right: .1rem
                            .date
                                width: 100%
                                position: absolute 
                                bottom: 0
                                font-size: .2rem
                                text-align: center
                    .right
                        position: relative
                        flex:4
                        padding: .4rem 0
                        .text
                            position: absolute
                            width: 100%
                            text-align: center 
                            top: 50%
                            color: #fff
                            font-size: .32rem
                            margin-top: -0.16rem
            .goods-introduce
                color: #888888
                font-size: .2rem
                line-height: .4rem
        .split
            height: .14rem
            width: 100%
            background: #f5f5f5
        .detail-img
            width: 100%
            .detail-img-wrapper
                .img
                    width: 100%  
        .item-properties
            padding: 0 .2rem
            line-height: .6rem 
            .to-right
                float: right
                line-height: .6rem
                color: #ccc
        .shop-content
            padding: .2rem
            .shop-wrapper
                .shop-icon
                    display: inline-block
                    width: 1.2rem
                    height: 1.2rem
                    margin-right: .3rem
                    .img
                        width: 100%
                        height:100%
                .shop-title
                    display: inline-block
                    vertical-align: top
                    height: 1.2rem
                    .shop-name
                        height: .8rem
                        line-height: .8rem
                        font-size: .28rem
                    .shop-type
                        height: .4rem
                        .img
                            height: .4rem
                .shop-desc
                    display: flex
                    padding: .3rem 0
                    .box
                        flex: 3
                        text-align: center
                        .mini-text
                            display: inline-block
                            font-size: .2rem
                            padding: .08rem
                            border-radius: .08rem
                            height: .24rem
                        
</style>
