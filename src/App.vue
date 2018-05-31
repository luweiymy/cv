<template lang="html">
  <div class="main">
    <About></About>
  </div>
</template>

<script>
import About from './components/about';
export default {
  data () {
    return {
      msg : 'ymy first vue project'
    }
  },
  components: {About}
}
</script>

<style lang="less">

</style>
