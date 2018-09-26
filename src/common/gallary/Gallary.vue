<template>
    <div class="container" @click="handleGallaryClick">
        <div class="wrapper">
            <swiper  :options="swiperOption">
            <!-- slides -->
            <swiper-slide v-for="(item,index) in imgs" :key="index">
                <img class="gallary-img" :src="item" />
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommonGallary',
    props: {
        imgs: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets'
                },
                observer: true,
                observeParents: true  
            }
        }
    },
    methods: {
        handleGallaryClick: function () {
            this.$emit('close')
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~styles/common.styl'
    .container >>>.swiper-container
        overflow:inherit
    .container
        display: flex
        flex-direction: column
        justify-content: center
        z-index: 1000
        position: fixed
        left: 0
        right: 0
        top: 0
        bottom: 0
        background: #000
        .wrapper
            width: 100%
            height: 0
            width: 100%
            padding-bottom: 100%
            .gallary-img
                width:100%
            .swiper-pagination
                color:#fff
                bottom: -1rem
                >>>.swiper-pagination-bullet
                    background: #fff
                    opacity: .8
                >>>.swiper-pagination-bullet-active
                    background: $RedColor
</style>
