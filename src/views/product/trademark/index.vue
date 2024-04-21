<template>
  <div>
    <el-card>
      <!-- 卡片頂部添加品牌按鈕 -->
      <el-button type="primary" icon="Plus" @click="addTrademark" v-has="`btn.Trademark.add`">添加品牌</el-button>
      <!-- 表格 -->
      <el-table style="margin: 10px 0px;" border :data="treademarkArr">
        <!-- 表格列 -->
        <el-table-column label="序號" type="index" width="80px" align="center" />
        <el-table-column label="品牌名稱" prop="tmName" />
        <el-table-column label="品牌LOGO">
          <template #default="{ row }">
            <img :src="row.logoUrl" alt="未有圖片" style="width: 100px; height: 100px">
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #default="{ row }">
            <el-button type="warning" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
            <el-popconfirm :title="`您確認要刪除${row.tmName}嗎?`" icon="Delete" width="250px"
              @confirm="removeTrademark(row.id)">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分頁組件 -->
      <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]"
        :background="true" layout="prev, pager, next, jumper, ->,sizes, total" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>
    <!-- 對話框組件 -->
    <el-dialog v-model="dialogFormVisible" :title=dialogTitle>
      <el-form style="width: 80%;" :model="trademarkParams" :rules="rules" ref="formRef">
        <el-form-item label="品牌名稱" label-width="100px" prop="tmName">
          <el-input placeholder="請您輸入品牌名稱" v-model="trademarkParams.tmName" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload class="avatar-uploader" action="http://sph-api.atguigu.cn/admin/product/fileUpload"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">確認</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqHasTrademark, reqAddorUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark';
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type'
import type { UploadProps, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'


// 頁碼
const pageNo = ref<number>(1)
const limit = ref<number>(5)
const total = ref<number>(0)
const treademarkArr = ref<Records>([])
const dialogTitle = ref<string>('')

// 對話框
const dialogFormVisible = ref<boolean>(false)

// 定義收集新增品牌數據
const trademarkParams: TradeMark = reactive({
  tmName: '',
  logoUrl: ''
})

const formRef = ref<any>()

const validatorTmName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('品牌名稱不能為空且不能少於2位'))
  }
}

const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack()
  } else {
    callBack(new Error('品牌LOGO不能為空'))
  }
}

const rules = reactive<FormRules<typeof trademarkParams>>({
  tmName: [
    { required: true, trigger: 'blur', validator: validatorTmName }
  ],
  logoUrl: [
    { required: true, trigger: 'change', validator: validatorLogoUrl }
  ]
})



const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/png' && rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/gif') {
    ElMessage.error('上傳的圖片類型只能是jpeg﹑gif﹑png檔')
    return false
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('圖片的檔案大小不能超過 4MB!')
    return false
  }
  return true
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  trademarkParams.logoUrl = response.data
  formRef.value.clearValidate('logoUrl')
}

const addTrademark = () => {
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
  trademarkParams.id = 0
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''
  dialogTitle.value = '添加品牌'
  dialogFormVisible.value = true
}

const updateTrademark = (row: TradeMark) => {
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
  dialogTitle.value = '修改品牌'
  trademarkParams.id = row.id
  trademarkParams.tmName = row.tmName
  trademarkParams.logoUrl = row.logoUrl
  dialogFormVisible.value = true
}

const removeTrademark = async (id: number) => {
  const res = await reqDeleteTrademark(id)
  if (res.code === 200) {
    ElMessage.success('刪除品牌成功')
    getHasTrademark()
  } else {
    ElMessage.error('刪除品牌失敗')
  }
}


const confirm = async () => {
  await formRef.value.validate()
  // 請求添加品牌
  const res: any = await reqAddorUpdateTrademark(trademarkParams)
  if (res.code === 200) {
    dialogFormVisible.value = false
    ElMessage.success(trademarkParams.id ? '修改品牌成功' : '添加品牌成功')
    if (!trademarkParams.id) {
      pageNo.value = Math.floor(total.value / limit.value) + 1
      getHasTrademark()
    } else {
      getHasTrademark()
    }
  } else {
    ElMessage.error(trademarkParams.id ? '修改品牌失敗' : '添加品牌失敗')
    dialogFormVisible.value = false
  }
}// 獲取品牌列表

const getHasTrademark = async () => {
  const res: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
  if (res.code === 200) {
    total.value = res.data.total
    treademarkArr.value = res.data.records
  }
}

// 每頁顯示條數改變
const handleSizeChange = (val: number) => {
  pageNo.value = 1
  limit.value = val
  getHasTrademark()
}

// 當前頁碼改變
const handleCurrentChange = (val: number) => {
  pageNo.value = val
  getHasTrademark()
}

onMounted(() => {
  getHasTrademark()
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
