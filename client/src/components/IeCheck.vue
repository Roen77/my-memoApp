<template>
  <div v-if="check" class="ie">
    <div class="tit">
      <h1>해당 브라우저는 곧 서비스가 종료됩니다.</h1>
      <img src="images/cancel.png" alt="종료">
    </div>
    <p>더 이상 지원되지 않으니 다른 브라우저를 이용해주세요</p>
  </div>
</template>

<script>
import iechk from 'is-iexplorer'
export default {
  data () {
    return {
      check: false
    }
  },
  mounted () {
    if (iechk) this.check = true
  }
}
</script>

<style>
.ie{position: fixed; z-index: 99999; left:0; top:0; width: 100%; height: 100vh; background-color: #fff; padding: 20px; box-sizing: border-box; text-align: center;}
.ie .tit{display: flex; justify-content: center; align-items: center;}
.ie img{width: 30px; height: auto;}
</style>
