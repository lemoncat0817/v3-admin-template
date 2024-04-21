<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="SPU名稱">
        <el-input placeholder="請輸入SPU名稱" v-model="SpuParams.spuName"></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select style="width: 15%;" placeholder="請選擇品牌" v-model="SpuParams.tmId">
          <el-option :value="item.id" :label="item.tmName" v-for="item in AllTradeMark" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" placeholder="請輸入SPU描述" v-model="SpuParams.description"></el-input>
      </el-form-item>
      <el-form-item label="SPU照片">
        <el-upload v-model:file-list="(imgList as UploadUserFile[])"
          action="http://sph-api.atguigu.cn/admin/product/fileUpload" list-type="picture-card"
          :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="beforeUpload">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU銷售屬性">
        <el-select v-model="saleAttrIdAndValueName" style="width: 15%;"
          :placeholder="unSelectSaleAttr.length ? `還未選擇${unSelectSaleAttr.length}個` : '無'">
          <el-option :label="item.name" :value="`${item.id}:${item.name}`" v-for="item in unSelectSaleAttr"
            :key="item.id"></el-option>
        </el-select>
        <el-button @click="addSaleAttr" :disabled="saleAttrIdAndValueName ? false : true" type="primary" icon="Plus"
          style="margin-left: 10px;">添加屬性</el-button>
        <el-table style="margin: 10px 0px;" border :data="saleAttr">
          <el-table-column type="index" label="序號" width="80px" align="center" />
          <el-table-column label="屬性名" width="100px" prop="saleAttrName" />
          <el-table-column label="屬性值">
            <template #="{ row, $index }">
              <el-tag style="margin: 0px 5px;" v-for="(tag, index) in row.spuSaleAttrValueList" :key="tag.id" closable
                @close="row.spuSaleAttrValueList.splice(index, 1)">
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input :ref="(vc: any) => inputArr[$index] = vc" @blur="toLook(row)" v-model="row.saleAttrValue"
                v-if="row.flag === true" placeholder="請你輸入屬性值" size="small" style="width: 100px;"></el-input>
              <el-button @click="toEdit(row, $index)" v-else type="success" size="small" icon="Plus"></el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100px">
            <template #="{ $index }">
              <el-button type="danger" size="small" icon="Delete" @click="saleAttr.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button :disabled="saleAttr.length > 0 ? false : true" type="primary" @click="save">保存</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script setup lang="ts">
import type { SpuData } from '@/api/product/spu/type'
import { reqAddOrUpdateSpu, reqAllTrademark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSaleAttr } from '@/api/product/spu'
import type { SaleAttrValue, TradeMark, AllTradeMark, SpuHasImage, SpuImage, SaleAttrResponseData, SaleAttr, HasSaleAttrResponseData, HasSaleAttr } from '@/api/product/spu/type'
import { ref, computed, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadUserFile } from 'element-plus'

const dialogImageUrl = ref<string>('')
const dialogVisible = ref<boolean>(false)
const AllTradeMark = ref<TradeMark[]>([])
const imgList = ref<SpuImage[]>([])
const saleAttr = ref<SaleAttr[]>([])
const saleAttrIdAndValueName = ref<string>('')
const allSaleAttr = ref<HasSaleAttr[]>([])
const inputArr = ref<any>([])

const SpuParams = ref<SpuData>({
  category3Id: "",//收集三级分类的ID
  spuName: "",//SPU的名字
  description: "",//SPU的描述
  tmId: '',//品牌的ID
  spuImageList: [],
  spuSaleAttrList: [],
})



const emit = defineEmits(['changeScene', 'changePage'])

const cancel = () => {
  emit('changeScene', 0)
}

const initHasSpuData = async (spu: SpuData) => {
  SpuParams.value = spu
  const result: AllTradeMark = await reqAllTrademark()
  AllTradeMark.value = result.data
  const result1: SpuHasImage = await reqSpuImageList(spu.id as number)
  imgList.value = result1.data.map(item => {
    return {
      name: item.imgName,
      url: item.imgUrl
    }
  })
  const result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  saleAttr.value = result2.data
  const result3: HasSaleAttrResponseData = await reqAllSaleAttr()
  allSaleAttr.value = result3.data
}

const handlePictureCardPreview = (uploadFile: any) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}

const handleRemove = (uploadFile: any) => {
  imgList.value.forEach((item, index) => {
    if (item.name === uploadFile.name) {
      imgList.value.splice(index, 1)
    }
  })
}

const beforeUpload = (rawFile: any) => {
  if (rawFile.type !== 'image/png' && rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/gif') {
    ElMessage.error('上傳的圖片類型只能是jpeg﹑gif﹑png檔')
    return false
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('圖片的檔案大小不能超過 4MB!')
    return false
  }
  return true
}

const unSelectSaleAttr = computed(() => {
  const unSelectArr = allSaleAttr.value.filter(item => {
    return saleAttr.value.every(item1 => item1.saleAttrName != item.name)
  })
  return unSelectArr
})

const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')

  const newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: []
  }
  saleAttr.value.push(newSaleAttr)
  saleAttrIdAndValueName.value = ''
}

const toEdit = (row: SaleAttr, $index: number) => {
  row.flag = true
  row.saleAttrValue = ''
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}

const toLook = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row
  if ((saleAttrValue as string).trim() == '') {
    ElMessage.error('屬性值不能為空')
    row.flag = false
    return
  }

  if (row.spuSaleAttrValueList.find(item => {
    return item.saleAttrValueName == saleAttrValue
  })) {
    ElMessage.error('屬性值不能重複')
    row.flag = false
    return
  }

  const newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: (saleAttrValue as string)
  }
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  row.flag = false
}

const save = async () => {
  SpuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: item.response && item.response.data || item.url
    }
  })
  SpuParams.value.spuSaleAttrList = saleAttr.value
  const res = await reqAddOrUpdateSpu(SpuParams.value)
  if (res.code === 200) {
    ElMessage.success(SpuParams.value.id ? '更新成功' : '添加成功')
    cancel()
    getchangePage()
  } else {
    ElMessage.error(SpuParams.value.id ? `更新失敗因為${res.data}` : `添加失敗因為${res.data}`)
  }
}

const initAddSpu = async (c3Id: number | string) => {
  Object.assign(SpuParams.value, {
    category3Id: "",//收集三级分类的ID
    spuName: "",//SPU的名字
    description: "",//SPU的描述
    tmId: '',//品牌的ID
    spuImageList: [],
    spuSaleAttrList: [],
  })
  SpuParams.value.id = ''
  imgList.value = []
  saleAttr.value = []
  saleAttrIdAndValueName.value = ''
  SpuParams.value.category3Id = c3Id
  const result: AllTradeMark = await reqAllTrademark()
  AllTradeMark.value = result.data
  const result1: HasSaleAttrResponseData = await reqAllSaleAttr()
  allSaleAttr.value = result1.data
}

const getchangePage = () => {
  emit('changePage', 1)
}

defineExpose({
  initHasSpuData, initAddSpu
})
</script>

<style scoped></style>