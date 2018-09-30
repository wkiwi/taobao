<template>
    <div class="tklpop">
        <div class="title">淘口令</div>
        <textarea class="tkl" name="tkl"  cols="30" rows="3" v-model="tkl" id="success_form_input" readonly="readonly"></textarea>
        <button class="copy" ref="copy" data-clipboard-action="copy" data-clipboard-target="#success_form_input" @click="copyLink">一键复制</button>
        <p class="tip">如一键复制失败，请手动全选》复制</p>
    </div>
</template>

<script type="text/ecmascript-6">
import Clipboard from 'clipboard'
export default {
    name: 'TklPop',
    props: {
        tkl: {
            type: String
        }
    },
    data () {
        return {
            copyBtn: null // 存储初始化复制按钮事件
        }
    },
    mounted () {
        this.copyBtn = new Clipboard(this.$refs.copy)
    },
    methods: {
        copyLink () {
            /* 这是点击按钮触发的点击事件，关于clipboard的使用就不再赘述了，上面介绍时已经讲述过，并且使用方法在官方文档上有 */
            let _this = this
            let clipboard = _this.copyBtn
            clipboard.on('success', function () {
                // console.log('复制成功')
            })
            clipboard.on('error', function () {
                // console.log('复制失败')
            })
            this.$emit('tklhide', false)
        }
    }
}
</script>

<style scoped lang="stylus">
@import '~styles/common.styl'
    .tklpop
        position: fixed
        top: 50%
        left: 50%
        width: 6rem
        height: 4rem
        margin-left: -3rem
        margin-top: -2rem
        background: #ffffff
        z-index: 501
        border-radius: .2rem
        .title
            text-align: center
            line-height: .6rem
            font-weight:  700
        .tkl
            display: block
            border: none
            line-height: .6rem
            width: 80%
            margin: 0 auto
        .copy
            margin: .2rem auto
            display: block
            padding: .1rem .2rem 
            background: $RedColor
            color: #fff
            border: none
            border-radius: .1rem
        .tip
            text-align: center
            color: #cccccc
            font-size: .2rem
</style>
