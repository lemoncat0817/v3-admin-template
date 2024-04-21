<template>
  <el-card>
    <el-form inline :disabled="scene === 1">
      <el-form-item label="一級分類">
        <el-select style="width: 240px" v-model="categoryStore.c1Id" @change="handelC2(categoryStore.c1Id)">
          <el-option :label=item.name :value="item.id" v-for="item in categoryStore.category1" :key="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二級分類">
        <el-select style="width: 240px" v-model="categoryStore.c2Id" @change="handelC3(categoryStore.c2Id)">
          <el-option :label=item.name :value="item.id" v-for="item in categoryStore.category2" :key="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="三級分類">
        <el-select style="width: 240px" v-model="categoryStore.c3Id">
          <el-option :label=item.name :value="item.id" v-for="item in categoryStore.category3" :key="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useCategoryStore from '@/store/modules/category'
defineProps({
  scene: {
    type: Number
  }
})
const categoryStore = useCategoryStore()

const handelC2 = (c1Id: number | string) => {
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  categoryStore.getC2(c1Id)
}

const handelC3 = (c2Id: number | string) => {
  categoryStore.c3Id = ''
  categoryStore.getC3(c2Id)
}



onMounted(() => {
  categoryStore.getC1()
})
</script>

<style scoped></style>