<template>
  <d2-container class="page">
    <div class="main-page">欢迎光临！</div>
  </d2-container>
</template>

<script>
// import D2PageCover from './components/d2-page-cover'
export default {
  // components: {
  //   D2PageCover
  // },
  data () {
    return {
      filename: __filename
    }
  }
}
</script>

<style lang="scss" scoped>
.main-page{
  @extend %full;
  @extend %unable-select;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
</style>
