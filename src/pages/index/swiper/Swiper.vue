<template>
  <div class="wrapper">
    <swiper :options="swiperOption" ref="mySwiper" v-if="showSwiper">
      <!-- slides -->
      <swiper-slide v-for="item of list" :key="item.id">
        <img class="swiper-img" :src="item.imgUrl" >
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div> 
      <div class="swiper-scrollbar"   slot="scrollbar"></div>-->
    </swiper>
  </div>
</template>

<script>
export default {
   name: 'HomeSwiper',
   props: {
     list: Array
   },
   data () {
       return {
        swiperOption: {
          pagination: {
                el: '.swiper-pagination'
          },
          loop: true,
          autoplay: 3000,
          preventClicksPropagation: true // 阻止click冒泡。拖动Swiper时阻止click事件。
        }
      }
   },
   computed: {
     showSwiper: function () {
       return this.list.length
     },
     swiper () {
        return this.$refs.mySwiper.swiper
    }
   } 
}
</script>

<style lang="stylus" scoped>
@import "~styles/common.styl"
  .wrapper >>> .swiper-pagination-bullet-active
    background:$RedColor
    width: 16px
    border-radius: 4px
  .wrapper
    overflow:hidden
    width:100%
    height:0
    padding-bottom 41.58%
    background:#eee
    .swiper-img
      width:100%
</style>
