<template>
  <div class="skeleton page">
    <div class="skeleton-nav"></div>
    <div class="skeleton-swiper"></div>
    <ul class="skeleton-tabs">
      <li v-for="(i,index) in 8" class="skeleton-tabs-item" :key="index"><span></span><p></p></li>
    </ul>
    <div class="skeleton-banner"></div>
    <div v-for="(i,index) in 8" class="skeleton-productions" :key="index"></div>
  </div>
</template>

<style>
.skeleton {
  position: relative;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  background: #fff;
}
.skeleton-nav {
  height: 40px;
  background: #eee;
  margin-bottom:5px;
}
.skeleton-swiper {
  height: 160px;
  background: #eee;
}
.skeleton-tabs {
  list-style: none;
  padding: 0;
  margin: 0 -15px;
  display: flex;
  flex-wrap: wrap;
  padding: .2rem;
}
.skeleton-tabs-item {
  width: 25%;
  padding-bottom: 25%;
  height:0;
  box-sizing: border-box;
  text-align: center;
  margin-bottom: 15px;
}
.skeleton-tabs-item span {
  display: inline-block;
  width: 55px;
  height: 55px;
  border-radius: 55px;
  background: #eee;
}
.skeleton-tabs-item p {
  display: block;
  margin-top: 8px;
  background: #eee;
}
.skeleton-banner {
  height: 200px;
  background: #eee;
  margin-bottom: 15px;
}
.skeleton-productions {
  height: 20px;
  margin-bottom: 15px;
  background: #eee;
}
</style>
