<template>
    <div class="banner border-topbottom">
        <div class="banner-title">
            <h1 class="title">大家都在领</h1>
            <span class="desc">手慢无</span>
        </div>
        <div class="banner-content" ref="pic-wrapper">
            <div class="wrapper" ref="banner-wrapper">
                <div class="item" v-for="(item,index) of goodslist" :key="index" >
                    <div class="item-wrapper">
                        <div class="icon">
                            <img :src="item.goods_pic" alt="" class="img">
                            <div class="tip">
                                <span class="goods-sales">{{item.goods_sales | towan}}万人已领 |</span>
                                <span class="coupon-price">{{item.coupon_price | parseInt}}元券</span>
                            </div>
                        </div>
                        <div class="desc">
                            <h1 class="title">{{item.goods_short_title}}</h1>
                            <div class="price">
                                <span class="quanhou">￥ {{item.goods_price-item.coupon_price | round}}</span>
                                <span class="goods-price">￥ {{item.goods_price }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
    name: 'Banner',
    props: {
        goodslist: {
            type: Array
        }
    },
    data () {
        return {

        }
    },
    filters: {
        round (number) {
            return number.toFixed(1)
        },
        parseInt (number) {
            return parseInt(number)
        },
        towan (number) {
            return (number / 10000).toFixed(1)
        }
    },
    watch: {
        goodslist: function () {
            this._initPics()
        }
    },
    methods: {
        _initPics () {
            if (this.goodslist.length) {
                let itemWidth = 130.02
                let width = itemWidth * this.goodslist.length
                this.$refs['banner-wrapper'].style.width = parseInt(width) + 'px'
                console.log(width + 'px')
                if (!this.scrollPic) {
                        this.$nextTick(() => {
                            this.scrollPic = new BScroll(this.$refs['pic-wrapper'], {
                                click: true,
                                scrollX: true,
                                eventPassthrough: 'vertical'
                            })
                        })
                } else {
                    this.scrollPic.refresh()
                }
            }
        }
    }
}
</script>

<style scoped lang="stylus">
@import '~styles/common.styl'
    .banner
        position: relative
        margin: .1rem 0
        height: 4.44rem
        .banner-title
            height: .44rem
            line-height: .44rem
            font-size: .28rem
            padding: 0 .2rem
            .title
                float: left
                padding-left: .4rem
                border-left: .08rem solid #FC436D
            .desc
                float: right
        .banner-content
            position: absolute
            width: 100%
            box-sizing: border-box
            padding: .2rem
            overflow: hidden
            height: 4rem
            .item
                float:left
                width: 3rem
                .item-wrapper
                    padding: .2rem
                    .icon
                        position: relative
                        width: 100%
                        height: 0
                        padding-bottom: 100%
                        border-radius: 10px
                        overflow: hidden
                        .img
                            position: absolute 
                            top: 0
                            left: 0
                            width: 100%
                            height: 100%
                        .tip
                            position: absolute 
                            bottom:0
                            left: 0
                            z-index: 3
                            width: 100%
                            height: .4rem
                            line-height: .4rem
                            font-size: .2rem
                            color: #fff
                            gradient2()
                            .goods-sales
                                font-size: .2rem
                                padding-left: .1rem
                                width: 1.5rem
                                ellipsis()
                            .coupon-price
                                float: right
                                padding-right: .1rem
                                font-size: .2rem
                                width: .8rem
                                ellipsis()
                    .desc
                        height: 1rem
                        .title
                            padding: .2rem .1rem
                            font-size: .2rem
                            ellipsis()
                        .price
                            height: .4rem
                            line-height: .4rem
                            font-size: .24rem
                            .quanhou
                                color: #FC436D
                            .goods-price
                                color: #888888
                                text-decoration:line-through
                                float: right
</style>
