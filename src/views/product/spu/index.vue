<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0px;">
      <div v-show="scene === 0">
        <el-button type="primary" icon="Plus" style="margin: 10px 0px;" :disabled="categoryStore.c3Id ? false : true"
          @click="addSpu">添加SPU</el-button>
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序號" width="80px" align="center" />
          <el-table-column prop="spuName" label="SPU名稱" />
          <el-table-column prop="description" label="SPU描述" show-overflow-tooltip />
          <el-table-column label="SPU操作">
            <template #="{ row }">
              <el-button type="primary" icon="Plus" size="small" title="添加SKU" @click="addSku(row)" />
              <el-button type="warning" icon="Edit" size="small" title="修改SPU" @click="updateSpu(row)" />
              <el-button type="info" icon="InfoFilled" size="small" title="查看SKU列表" @click="findSku(row)" />
              <el-popconfirm :title="`你要刪除${row.spuName}?`" width="200px" @confirm="deleteSpu(row)">
                <template #reference>
                  <el-button type="danger" icon="Delete" size="small" title="刪除SPU列表" />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]"
          :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
      <SpuForm ref="spu" v-show="scene === 1" @changeScene="changeScene" @changePage="changePage" />
      <SkuForm ref="sku" v-show="scene === 2" @changeScene="changeScene" />
      <el-dialog v-model="show" title="SKU列表">
        <el-table :data="skuArr" border>
          <el-table-column label="sku名字" prop="skuName" />
          <el-table-column label="sku價格" prop="price" />
          <el-table-column label="sku重量" prop="weight" />
          <el-table-column label="sku圖片">
            <template #="{ row }">
              <el-image style="width: 100px; height: 100px" :src="row.skuDefaultImg" />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import useCategoryStore from '@/store/modules/category'
import type { HasSpuResponseData, Records, SpuData, SkuInfoData, SkuData } from '@/api/product/spu/type'

import { reqHasSpu, reqSkuList, reqRemoveSpu } from '@/api/product/spu'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
import { ElMessage } from 'element-plus'
const categoryStore = useCategoryStore()


const scene = ref<number>(0)
const pageNo = ref<number>(1)
const limit = ref<number>(5)
const total = ref<number>(0)
const records = ref<Records>([])
const spu = ref<any>()
const sku = ref<any>()
const skuArr = ref<SkuData[]>([])
const show = ref<boolean>(false)

watch(() => categoryStore.c3Id, () => {
  if (categoryStore.c3Id) {
    getHasSpu()
  }
})

const addSpu = () => {
  scene.value = 1
  spu.value.initAddSpu(categoryStore.c3Id)
}

const getHasSpu = async () => {
  const res: HasSpuResponseData = await reqHasSpu(pageNo.value, limit.value, categoryStore.c3Id)
  if (res.code === 200) {
    total.value = res.data.total
    records.value = res.data.records
  }
}

const handleSizeChange = (page: number) => {
  limit.value = page
  if (categoryStore.c3Id) {
    getHasSpu()
  }
}

const handleCurrentChange = (page: number) => {
  pageNo.value = page
  getHasSpu()
}

const changeScene = (num: number) => {
  scene.value = num
  if (num === 0) {
    getHasSpu()
  }
}

const changePage = (num: number) => {
  pageNo.value = num
  getHasSpu()
}

const updateSpu = (row: SpuData) => {
  scene.value = 1
  spu.value.initHasSpuData(row)
}

const addSku = (row: SpuData) => {
  scene.value = 2
  sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}

const findSku = async (row: SpuData) => {
  const res: SkuInfoData = await reqSkuList((row.id as number))
  if (res.code === 200) {
    skuArr.value = res.data
    show.value = true
  }
}

const deleteSpu = async (row: SpuData) => {
  const res: any = await reqRemoveSpu(row.id as number)
  if (res.code === 200) {
    ElMessage.success('刪除成功')
    getHasSpu()
  } else {
    ElMessage.error(`刪除失敗因為${res.data}`)
  }
}

onBeforeUnmount(() => {
  categoryStore.c1Id = ''
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
})

</script>

<style scoped></style>
