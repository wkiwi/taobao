<template>
    <div class="goods-list">
        <div class="goods-item" v-for="(item,index) of goodslist" :key="index" @click="detail(item,$event)">
            <div class="goods-item-wrapper">
                <div class="icon">
                    <img class="img" v-lazy="item.goods_pic" src="" :alt="item.goods_short_title">
                </div>
                <div class="desc">
                    <h1 class="title">{{item.goods_short_title}}</h1>
                    <div class="row-price">
                        <div class="goods-price">原价 {{item.goods_price}}</div>
                        <div class="goods-sales">已售 {{item.goods_sales}}</div>
                    </div>
                    <div class="row-coupon"> 
                        <div class="quanhou">券后 {{item.goods_price-item.coupon_price | round}}</div>
                        <div class="coupon-price">{{item.coupon_price | parseInt}}元券</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'Goods',
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
        }
    },
    components: {

    },
    methods: {
        detail (data, event) {
            if (!event._constructed) {
                return
            }
            // console.log(data.seller_id)
            this.$router.push({name: 'Detail', params: data})
        }
    }
}
</script>

<style scoped lang="stylus">
@import '~styles/common.styl'
    .goods-list
        width: 100%
        overflow: hidden
        background: #f3f4f5
        .goods-item
            float: left 
            width: 50%
            &:nth-child(odd)
                .goods-item-wrapper
                    margin-right: .05rem
            &:nth-child(even)
                .goods-item-wrapper
                    margin-left: .05rem
            .goods-item-wrapper
                background: #fff
                margin-bottom: .1rem
                .icon
                    width: 100%
                    height: 0
                    padding-bottom: 100%
                    position: relative
                    .img
                        position: absolute
                        top: 0
                        left: 0
                        width: 100%
                        height: 100%
                .desc
                    height: 1.6rem
                    padding: 0 .2rem
                    .title
                        ellipsis()
                        height: .6rem
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
