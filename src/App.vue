<template>
  <div id="app">
    <keep-alive > <!-- exclude="Detail,SearchList" -->
      <router-view v-if="$route.meta.keepAlive" class="router-view"/>
    </keep-alive>
     <router-view v-if="!$route.meta.keepAlive" class="router-view" />
  </div>
</template>

<script>
import TabBar from './pages/tabBar/TabBar'
export default {
  name: 'App',
  components: {
    TabBar
  }
}
</script>

<style scoped lang="stylus">

</style>
