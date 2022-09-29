<template>
  <div id="app">
    <CaseDemo></CaseDemo>
  </div>
</template>

<script>
import CaseDemo from './components/Case-Demo.vue'

export default {
  name: 'App',
  components: {
    CaseDemo
  }
}
</script>

<style lang="sass">
  #app
    background-color: #eee
    padding: 4px
</style>
