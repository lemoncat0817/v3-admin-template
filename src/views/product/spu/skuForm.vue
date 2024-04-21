<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="sku名稱">
        <el-input placeholder="sku名稱" v-model="skuParams.skuName"></el-input>
      </el-form-item>
      <el-form-item label="價格(元)">
        <el-input placeholder="價格(元)" type="number" v-model="skuParams.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input placeholder="重量(克)" type="number" v-model="skuParams.weight"></el-input>
      </el-form-item>
      <el-form-item label="sku描述">
        <el-input placeholder="sku描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台屬性">
        <el-form inline label-width="100px">
          <el-form-item v-for="item in attrArr" :key="item.id" :label="item.attrName">
            <el-select style="width: 230px;" v-model="item.attrIdAndValueId">
              <el-option v-for="attrValue in item.attrValueList" :key="attrValue.id" :label="attrValue.valueName"
                :value="`${item.id}:${attrValue.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="銷售屬性">
        <el-form inline label-width="100px">
          <el-form-item v-for="item in saleArr" :key="item.id" :label="item.saleAttrName">
            <el-select style=" width: 230px; " v-model="item.saleIdAndValueId">
              <el-option v-for="spuSaleAttrValue in item.spuSaleAttrValueList" :key="spuSaleAttrValue.id"
                :label="spuSaleAttrValue.saleAttrValueName" :value="`${item.id}:${spuSaleAttrValue.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="圖片名稱">
        <el-table border :data="imgArr" ref="table">
          <el-table-column type="selection" width="80px" align="center"></el-table-column>
          <el-table-column label="圖片">
            <template #="{ row }">
              <el-image :src="row.imgUrl" style="width: 100px; height: 100px;" />
            </template>
          </el-table-column>
          <el-table-column label="名稱" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button type="primary" size="small" @click="handel(row)">設置默認</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { SpuData, SpuHasImage, SpuImage, SaleAttrResponseData, SaleAttr, SkuData } from '@/api/product/spu/type'
import type { AttrResponseData, Attr } from '@/api/product/attr/type'
import { reqAttr } from '@/api/product/attr/index'
import { reqSpuImageList, reqSpuHasSaleAttr, reqAddSku } from '@/api/product/spu/index'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['changeScene'])

const attrArr = ref<Attr[]>([])
const saleArr = ref<SaleAttr[]>([])
const imgArr = ref<SpuImage[]>([])
const table = ref<any>()
const skuParams = reactive<SkuData>({
  //父组件传递过来的数据
  category3Id: "",//三级分类的ID
  spuId: "",//已有的SPU的ID
  tmId: "",//SPU品牌的ID
  //v-model收集
  skuName: "",//sku名字
  price: "",//sku价格
  weight: "",//sku重量
  skuDesc: "",//sku的描述
  skuAttrValueList: [],//平台属性的收集
  skuSaleAttrValueList: [],//销售属性
  skuDefaultImg: "",//sku图片地址
})

const save = async () => {
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, item: any) => {
    if (item.attrIdAndValueId) {
      const [attrId, valueId] = item.attrIdAndValueId.split(':')
      prev.push({ attrId, valueId })
    }
    return prev
  }, [])
  skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev: any, item: any) => {
    if (item.saleIdAndValueId) {
      const [saleAttrId, saleAttrValueId] = item.saleIdAndValueId.split(':')
      prev.push({ saleAttrId, saleAttrValueId })
    }
    return prev
  }, [])
  const res: any = await reqAddSku(skuParams)
  if (res.code === 200) {
    ElMessage.success('添加sku成功')
    emit('changeScene', 0)
  } else {
    ElMessage.error('添加sku失败')
  }

}

const cancel = () => {
  emit('changeScene', 0)
}

const handel = (row: SpuImage) => {
  imgArr.value.forEach((item: any) => {
    table.value.toggleRowSelection(item, false)
  })
  table.value.toggleRowSelection(row, true)

  skuParams.skuDefaultImg = (row.imgUrl as string)
}

const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: SpuData) => {
  skuParams.category3Id = spu.category3Id
  skuParams.spuId = spu.id
  skuParams.tmId = spu.tmId
  const result: AttrResponseData = await reqAttr(c1Id, c2Id, spu.category3Id)
  attrArr.value = result.data
  const result1: SaleAttrResponseData = await reqSpuHasSaleAttr((spu.id as number))
  saleArr.value = result1.data
  const result2: SpuHasImage = await reqSpuImageList((spu.id as number))
  imgArr.value = result2.data
}

defineExpose({
  initSkuData
})
</script>

<style scoped></style>