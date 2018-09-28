<template>
    <div>
        <favorite-head :title="title"></favorite-head>
        <div class="favorite" ref="favorite">
            <ul class="wrapper">
                <li class="goods" v-for="(item,index) of goodsList" :key="index" @click="detail(item.invalid,item,$event)">
                    <div class="icon">
                        <img class="img" :src="item.goods_pic" alt="">
                        <div class="tip" :class="{'disnone':item.invalid}">
                            <i class="icon-9"></i>
                        </div>
                    </div>
                    <div class="desc">
                        <h1 class="title">{{item.goods_short_title}}</h1>
                        <div class="row-price">
                            <div class="goods-price">原价 {{item.goods_price}}</div>
                            <div class="goods-sales">已售 {{item.goods_sales}}</div>
                        </div>
                        <div class="row-coupon"> 
                            <div class="quanhou">券后价￥ {{item.goods_price-item.coupon_price | round}}</div>
                            <div class="coupon-price">{{item.coupon_price | parseInt}}元券</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import FavoriteHead from 'common/head/Head'
import {loadFromLocal, deleteToLocal} from '@/assets/js/Store'
export default {
    name: 'Favorite',
    data () {
        return {
            goodsList: {},
            title: '我的收藏'
        }
    },
    created () {
        this.selectFavorite()
        this._initScroll()
    },
    filters: {
        round (number) {
            return number.toFixed(1)
        },
        parseInt (number) {
            return parseInt(number)
        },
        time (t) {
            let now = Date.parse(new Date())
            let end = Date.parse(new Date(t))
            if (now > end) { // 过期
                return false
            } else { // 未过期
                return true
            }
        }
    },
    methods: {
        _initScroll () {
            if (!this.scroll) {
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs.favorite, {
                            click: true
                        })
                    })
            } else {
                this.scroll.refresh()
            }
        },
        selectFavorite: function () { // 查询全部收藏
            let fav = loadFromLocal('', 'favorite', '')
            let arr = []
            for (let k in fav) {
                let now = Date.parse(new Date())
                let end = Date.parse(new Date(fav[k].coupon_end_time))
                if (now > end) { // 过期
                    fav[k].invalid = false
                } else { // 未过期
                    fav[k].invalid = true
                }
                arr.push(fav[k])
            }
            this.goodsList = arr
            console.log(this.goodsList)
        },
        deleteFavorate: function (id) { // 删除该商品的收藏
            deleteToLocal(id, 'favorite', '')
            this.selectFavorite()
        },
        detail: function (invalid, item, $event) {
            if (!event._constructed) {
                return
            }
            if (invalid) {
                this.$router.push({name: 'Detail', params: item})
            } 
        }
    },
    components: {
        FavoriteHead
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
        if (from.path === '/detail') {
                console.log('返回的的')
                to.meta.isBack = true
            } else {
                console.log('新进入的')
                vm.selectFavorite()
            }
        })
    }
}
</script>

<style scoped lang="stylus">
@import '~styles/common.styl'
    .favorite
        position: absolute 
        top: .8rem 
        left: 0
        right: 0
        bottom: 0
        background: #f5f5f5
        .wrapper
            .goods
                width: 100%
                display: flex
                margin-bottom: .16rem
                background: #fff
                .icon
                    width: 2.4rem
                    height: 2.4rem
                    margin-left: .2rem
                    flex: 0 0 2.4rem
                    position: relative
                    .img
                        width: 100%
                        height: 100%
                    .tip
                        position: absolute 
                        width: 100%
                        height: 100%
                        background: rgba(255,255,255,.7)
                        z-index: 20
                        top: 0
                        left: 0
                        &.disnone
                            display: none
                        .icon-9
                            font-size: 2.4rem
                .desc
                    flex: 1
                    padding: 0 .2rem
                    .title
                        ellipsis()
                        height: 1.2rem
                        line-height: .6rem
                        font-size: .28rem
                        color: #333333
                        font-weight: 400
                    .row-price
                        font-size: .24rem
                        color: #888
                        line-height: .48rem
                        height: .48rem
                        .goods-price
                            float:left
                            text-decoration:line-through
                        .goods-sales
                            float: right 
                            text-align: right
                    .row-coupon
                        height: .44rem
                        line-height: .44rem
                        font-size: .28rem
                        color: $RedColor
                        .coupon-price
                            width: 50%
                            float: right
                            text-align: right
                        .quanhou
                            width: 50%
                            float: left
                            ellipsis()
</style>
