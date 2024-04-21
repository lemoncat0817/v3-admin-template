<template>
  <div>
    <el-card>
      <el-table border style="margin: 10px 0px;" :data="skuArr">
        <el-table-column label="序號" type="index" aling="center" width="100px"></el-table-column>
        <el-table-column label="名稱" show-overflow-tooltip width="225px" prop="skuName"></el-table-column>
        <el-table-column label="描述" show-overflow-tooltip width="225px" prop="skuDesc"></el-table-column>
        <el-table-column label="默認圖片" width="225px">
          <template #="{ row }">
            <el-image :src="row.skuDefaultImg" style="width: 100px; height: 100px;" />
          </template>
        </el-table-column>
        <el-table-column label="重量(克)" width="225px" prop="weight"></el-table-column>
        <el-table-column label="價格" width="225px" prop="price"></el-table-column>
        <el-table-column label="操作" width="300px" fixed="right">
          <template #="{ row }">
            <el-button :title="row.isSale === 0 ? '上架Sku' : '下架Sku'" :type="row.isSale === 0 ? 'success' : 'info'"
              size="small" :icon="row.isSale === 0 ? 'Top' : 'Bottom'" @click="sale(row)"></el-button>
            <el-button title="編輯Sku" type="warning" size="small" icon="Edit" @click="updateSku"></el-button>
            <el-button title="查看Sku詳情" type="info" size="small" icon="InfoFilled" @click="findSku(row)"></el-button>
            <el-popconfirm :title="`你確定要刪除${row.skuName}嗎?`" @confirm="deleteSku(row)">
              <template #reference>
                <el-button title="刪除Sku" type="danger" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分頁組件 -->
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
        :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total"
        @current-change="handelPage" @size-change="handelSize" />
      <!-- 抽屜組件 -->
      <el-drawer v-model="drawer">
        <template #header>
          <h4>查看商品詳情</h4>
        </template>
        <template #default>
          <el-row style="margin: 10px 0px;">
            <el-col :span="6">名稱</el-col>
            <el-col :span="18">{{ skuInfo.skuName }}</el-col>
          </el-row>
          <el-row style="margin: 10px 0px;">
            <el-col :span="6">描述</el-col>
            <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
          </el-row>
          <el-row style="margin: 10px 0px;">
            <el-col :span="6">價格</el-col>
            <el-col :span="18">{{ skuInfo.price }}</el-col>
          </el-row>
          <el-row style="margin: 10px 0px;">
            <el-col :span="6">平台屬性</el-col>
            <el-col :span="18">
              <el-tag type="success" style="margin: 5px 5px;" v-for="item in skuInfo.skuAttrValueList" :key="item.id">
                {{ item.valueName }}
              </el-tag>
            </el-col>
          </el-row>
          <el-row style="margin: 10px 0px;">
            <el-col :span="6">銷售屬性</el-col>
            <el-col :span="18">
              <el-tag type="warning" style="margin: 5px;" v-for="item in skuInfo.skuSaleAttrValueList" :key="item.id">
                {{ item.saleAttrValueName }}
              </el-tag>
            </el-col>
          </el-row>
          <el-row style="margin: 10px 0px;">
            <el-col :span="6">商品圖片</el-col>
            <el-col :span="18">
              <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                  <el-image :src="item.imgUrl" style="width: 100%; height: 100%;" />
                </el-carousel-item>
              </el-carousel>
            </el-col>
          </el-row>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqDeleteSku, reqSkuList, reqSaleSku, reqCancelSaleSku, reqSkuInfo } from '@/api/product/sku/index'
import type { SkuResponseData, SkuData, SkuInfoData } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus';

const pageNo = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const skuArr = ref<SkuData[]>([])
const drawer = ref<boolean>(false)
const skuInfo = ref<SkuData>({})

onMounted(() => {
  getHasSku()
})

const getHasSku = async () => {
  const result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
  if (result.code === 200) {
    total.value = result.data.total
    skuArr.value = result.data.records
  }
}

const handelPage = (page: number) => {
  pageNo.value = page
  getHasSku()
}

const handelSize = (limit: number) => {
  pageSize.value = limit
  getHasSku()
}

const sale = async (row: SkuData) => {
  // 將物品上架
  if (row.isSale === 0) {
    await reqSaleSku((row.id as number))
    row.isSale = 1
    ElMessage.success('上架成功')
  } else {
    // 將物品下架
    await reqCancelSaleSku((row.id as number))
    row.isSale = 0
    ElMessage.success('下架成功')
  }
}

const updateSku = () => {
  ElMessage.warning('功能待完善')
}

const findSku = async (row: SkuData) => {
  drawer.value = true
  const result: SkuInfoData = await reqSkuInfo(row.id as number)
  if (result.code === 200) {
    skuInfo.value = (result.data as SkuData)
  }
}

const deleteSku = async (row: SkuData) => {
  const res = await reqDeleteSku(row.id as number)
  if (res.code === 200) {
    ElMessage.success('刪除成功')
    getHasSku()
  } else {
    ElMessage.error(`刪除失敗因為${res.data}`)
  }
}

</script>

<style scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
