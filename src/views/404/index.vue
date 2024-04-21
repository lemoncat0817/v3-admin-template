<template>
  <div class="box">
    <img src="../../assets/images/error_images/404.png" alt="" />
    <el-button @click="$router.push('/')">回到首頁</el-button>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  background: yellowgreen;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 800px;
    height: 400px;
    background: yellowgreen;
  }
}
</style>
