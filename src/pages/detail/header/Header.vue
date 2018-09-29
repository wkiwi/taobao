<template>
    <div class="header">
        <div @click="back" class="header-abs" v-show="showAbs">
            <div class="iconfont icon-4"></div>
        </div>
        <div class="header-fixed" v-show="!showAbs" :style="opacityStyle">
            <div class="iconfont icon-4"  @click="back"></div>
            <!-- {{title}} -->
            <div class="tip "><span class="text" :class="{'selected':selected}">商品</span></div>
            <div class="tip "><span class="text" :class="{'selected':!selected}">详情</span></div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'DetailHeader',
    props: {
        scrollY: {
            type: Number
        },
        title: {
            type: String
        }
    },
    watch: {
        scrollY: function () {
            this.handleScroll()
        }
    },
    data () {
        return {
            showAbs: true,
            opacityStyle: {
                opacity: 0
            },
            selected: true
        }
    },
    methods: {
        handleScroll: function () {
            if (this.scrollY > 100) {
                let opacity = this.scrollY / 400
                opacity = opacity > 1 ? 1 : opacity
                this.opacityStyle.opacity = opacity
                this.showAbs = false
            } else {
                this.showAbs = true
            }
            if (this.scrollY > 400) {
                this.selected = false
            } else {
                this.selected = true
            }
        },
        back: function () {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~styles/common.styl'
    .header
        height: .86rem
        position: absolute
        top: 0
        left:0
        z-index: 100
        .header-abs
            position: fixed
            left: .2rem
            top: .2rem
            width: .6rem
            height: .6rem
            border-radius: .3rem
            background: rgba(0,0,0 .4)
            z-index: 100
            .icon-4
                width: .5rem
                padding-left: .1rem
                height: .6rem
                line-height: .6rem
                text-align: center
                font-size: .4rem
                color: #fff
        .header-fixed
            display: flex
            z-index: 2
            position: fixed
            top: 0
            left: 0
            right: 0
            height: $headerHeight
            line-height: $headerHeight
            color: #fff
            background: $bgColor
            font-size: .32rem
            .icon-4
                width: .86rem
                height: .86rem
                line-height: .86rem
                text-align: center
                font-size: .4rem
                color: #fff
                flex: 0 0 .86rem
            .tip
                flex: 1
                text-align: center
                .text
                    display: inline-block
                    padding: 0 .6rem
                    height: .78rem
                    line-height: .78rem
                    &.selected
                        border-bottom: 2px solid #fff

</style>
