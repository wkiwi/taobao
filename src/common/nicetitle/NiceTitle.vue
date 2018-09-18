<template>
    <div class="nice-title">
        <span class="iconfont icon-nine_tab_left" v-if="type===0">
			<span class="path1"></span><span class="path2"></span>
        </span>
        <span class="iconfont icon-nine_tab_left_tow" v-if="type===1">
			<span class="path1"></span><span class="path2"></span><span class="path3"></span>
        </span>
        <slot></slot>
        <span class="iconfont icon-nine_tab_right" v-if="type===0">
			<span class="path1"></span><span class="path2"></span>
        </span>
        <span class="iconfont icon-nine_tab_right_tow" v-if="type===1">
			<span class="path1"></span><span class="path2"></span><span class="path3"></span>
        </span>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'NiceTitle',
    props: {
        type: Number
    },
    data () {
        return {

        }
    },
    components: {

    }
}
</script>

<style scoped lang="stylus">
@import '~styles/common.styl'
    .nice-title
        text-align: center
        color: $RedColor
        height: 1rem
        line-height: 1rem
        .iconfont
            display: inline-block
            margin: 0 .2rem
</style>
