<template>
    <div class="app">
      <div>
        <nice-title :type="0">首页</nice-title>
      </div>
    </div>
</template>

<script>
import NiceTitle from 'common/nicetitle/NiceTitle'
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    NiceTitle
  }
}
</script>

<style scoped lang="stylus">

</style>
