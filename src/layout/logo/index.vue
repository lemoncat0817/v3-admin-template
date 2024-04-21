<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting.ts'
</script>

<script lang="ts">
export default {
  name: 'Logo',
}
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;

  img {
    margin-left: 10px;
    width: 40px;
    height: 40px;
  }

  p {
    size: $base-logo-title-fontSize;
    margin-left: 10px;
    white-space: nowrap;
  }
}
</style>
