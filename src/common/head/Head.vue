<template>
    <div class="header">
        <div class="wrapper">
            <span class="back icon-4" @click="back"></span>
            {{title}}
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'Head',
    props: {
        title: {
            type: String
        }
    },
    methods: {
        back: function () {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped lang="stylus">
@import '~styles/common.styl'
    .header
        position: fixed
        top: 0
        left: 0
        z-index: 500
        width: 100%
        height: .8rem
        line-height: .8rem
        text-align: center
        gradient()
        color: #ffffff
        font-size: .36rem
        .wrapper
            padding: 0 .4rem
        .back
            float: left
            line-height: .8rem
</style>
