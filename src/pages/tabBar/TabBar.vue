<template>
    <div class="tabbar border-top">
        <div class="tabbar-wrapper">
            <router-link to="/" tag="div" class="tabbar-item">
                <div class="wrapper">
                    <i class="iconfont icon-home3"></i>
                    首页
                </div>
            </router-link>
            <router-link to="/kuai9" tag="div" class="tabbar-item">
                <div class="wrapper">
                    <i class="iconfont icon-price-tag"></i>
                    9块9
                </div>
            </router-link>
            <router-link to="/classify" tag="div" class="tabbar-item">
                <div class="wrapper">
                    <i class="iconfont icon-stats-bars"></i>
                    分类
                </div>
            </router-link>
            <router-link to="/user" tag="div" class="tabbar-item">
                <div class="wrapper">
                    <i class="iconfont icon-user"></i>
                    个人中心
                </div>
            </router-link>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'TabBar',
    data () {
        return {

        }
    }
}
</script>
<style scoped lang="stylus">
    .tabbar
        position: fixed
        left: 0
        bottom: 0
        width: 100%
        height: 1rem
        .tabbar-wrapper
            display: flex
            height: 1rem
            text-align: center
            background: #fefefe
            font-size: .28rem
            .tabbar-item
                flex: 1
                .wrapper
                    padding: .1rem 0
                    line-height: .4rem
                    color: rgb(7,17,27)
                &.active
                    .wrapper
                        color: rgb(240, 20, 20)
                .iconfont
                    font-size: .40rem
                    display:block
</style>
