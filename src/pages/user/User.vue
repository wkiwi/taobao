<template>
    <div class="user">
        <div class="user-info">
            <div class="user-info-wrapper">
                <div class="icon">
                    <img src="http://cmsstatic.dataoke.com//wap_new/user/images/user_info_tx.png?v=201809171428" class="img">
                </div>
                <div class="desc">登录/注册</div>
            </div>
            <i class="setting icon-13"></i>
        </div>
        <nice-title :type="1">个人中心</nice-title>
        <div class="list">
            <ul class="nav-list">
                <li class="row border-bottom">
                    <i  class="icon icon-14"></i> <span class="text">我的收藏</span> <i class="icon-3 right"></i>
                </li>
                <li class="row border-bottom">
                    <i  class="icon icon-8"></i> <span class="text">浏览记录</span> <i class="icon-3 right"></i>
                </li>
            </ul>
            <div class="separate"></div>
            <ul class="nav-list">
                <li class="row border-bottom">
                    <i  class="icon icon-18"></i> <span class="text">意见反馈</span> <i class="icon-3 right"></i>
                </li>
                <li class="row border-bottom">
                    <i  class="icon icon-5"></i> <span class="text">联系客服</span> <i class="icon-3 right"></i>
                </li>
                <li class="row border-bottom">
                    <i  class="icon icon-10"></i> <span class="text">领券中心</span> <i class="icon-3 right"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import NiceTitle from 'common/nicetitle/NiceTitle'
export default {
    name: 'User',
    data () {
        return {

        }
    },
    components: {
        NiceTitle
    }
}
</script>

<style scoped lang="stylus">
@import '~styles/common.styl'
    .user-info
        position: relative
        width: 100%
        height: 4rem
        gradient()
        .user-info-wrapper
            padding: 1rem 0
            .icon
                display:inline-block
                vertical-align: middle
                width: 2rem
                height: 2rem
                background: rgba(255,255,255,.3)
                padding: .1rem
                border-radius: 50%
                margin-left: .6rem
                .img
                    width: 100%
                    height: 100%
            .desc
                display:inline-block
                color: #fff
                font-size: .36rem
                margin-left: .3rem
        .setting
            position: absolute 
            top: 0
            right: 0
            font-size: .36rem
            color: #fff
            padding: .3rem
    .list
        background: #fff
        .row
            height: .8rem
            line-height: .8rem
            padding: 0 .4rem
            &:last-child
                &::before
                    border: none
            .icon
                display: inline-block
                font-size: .48rem
                vertical-align: middle 
            .right
                display: inline-block 
                font-size: .36rem 
                float: right
                line-height: .8rem
            .text
                padding-left: .2rem
        .separate
            width: 100%
            height: .14rem
            background: #F5F5F5

</style>
