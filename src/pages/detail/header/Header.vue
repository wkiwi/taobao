<template>
    <div class="header">
        <div @click="back" class="header-abs" v-show="showAbs">
            <div class="iconfont icon-4"></div>
        </div>
        <div class="header-fixed" v-show="!showAbs" :style="opacityStyle">
            <div @click="back">
                <div class="iconfont icon-4"></div>
            </div>
            {{title}}
        </div>
    </div>
</template>

<script>

export default {
    name: 'DetailHeader',
    props: {
        title: {
            type: String
        }
    },
    data () {
        return {
            showAbs: true,
            opacityStyle: {
                opacity: 0
            }
        }
    },
    methods: {
        handleScroll: function () {
            const top = document.documentElement.scrollTop
            if (top > 60) {
                let opacity = top / 140
                opacity = opacity > 1 ? 1 : opacity
                this.opacityStyle = { opacity }
                this.showAbs = false
            } else {
                this.showAbs = true
            }
        },
        back: function () {
            this.$router.go(-1)
        }
    }/* ,
    activated (){
        window.addEventListener('scroll',this.handleScroll)
    },
    deactivated (){
        window.removeEventListener('scroll',this.handleScroll)
    } */

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
                color: #fff
                font-size: .4rem
                line-height: .6rem
                padding-left: .15rem
        .header-fixed
            z-index: 2
            position: fixed
            top: 0
            left: 0
            right: 0
            height: $headerHeight
            line-height: $headerHeight
            text-align: center
            color: #fff
            background: $bgColor
            font-size: .32rem
            .icon-4
                position: absolute
                top: 0
                left: 0
                width: .64rem
                text-align: center
                font-size: .4rem
                color: #fff

</style>
