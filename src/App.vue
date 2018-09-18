<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <tab-bar></tab-bar>
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
