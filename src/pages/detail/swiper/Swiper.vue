<template>
    <div>
        <div class="banner" @click="handleBannerClick">
            <swiper  :options="swiperOption">
            <!-- slides -->
            <swiper-slide v-for="(item,index) in swiperimgs" :key="index">
                <img class="gallary-img" :src="item" />
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
        <!-- <fade-animation>
                <common-gallary @close="handleGallaryClose" :imgs="swiperimgs" v-show="showGallary"></common-gallary>
        </fade-animation> -->
    </div>
</template>

<script>
import CommonGallary from 'common/gallary/Gallary'
import FadeAnimation from 'common/fade/FadeAnimation'
export default {
    name: 'DetailBanner',
    props: {
        sightName: String,
        swiperimgs: Array
    },
    data () {
        return {
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination',
                    type: 'fraction'
                },
                observer: true,
                observeParents: true  
            },
            showGallary: false,
            imgs: ['http://img1.qunarzz.com/sight/p0/201404/23/04b92c99462687fa1ba45c1b5ba4ad77.jpg_600x330_bf9c4904.jpg', 'http://img1.qunarzz.com/sight/p0/201404/23/04b92c99462687fa1ba45c1b5ba4ad77.jpg_600x330_bf9c4904.jpg']
        }
    },
    components: {
        CommonGallary,
        FadeAnimation
    },
    methods: {
        handleBannerClick: function () {
            this.showGallary = true  
        },
        handleGallaryClose: function () {
            this.showGallary = false
        }
    }
}
</script>

<style lang="stylus" scoped>
    .banner
        position:relative
        z-index: 50
        overflow: hidden
        height: 0
        padding-bottom: 100%
        .gallary-img
            width: 100%
        .swiper-pagination-fraction
            color: #fff
            font-size: .2rem
            width: .8rem
            text-align: center
            border-radius: .2rem
            line-height: .4rem
            background: rgba(7,17,27,.3)
            right: .2rem 
            left: inherit
    .gallary-wrapper
        width: 100%
        height: 100%
</style>
