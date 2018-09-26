<template>
  <div id="app">
    <keep-alive exclude="Detail,SearchList">
      <router-view/>
    </keep-alive>
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
