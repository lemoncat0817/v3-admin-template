<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0px;">
      <div v-show="scene === 0">
        <el-button @click="addAttr" type="primary" icon="Plus"
          :disabled="categoryStore.c3Id ? false : true">添加屬性</el-button>
        <el-table border style="margin: 10px 0px;" :data="attrArr">
          <el-table-column label="序號" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="屬性名稱" width="120px" prop="attrName"></el-table-column>
          <el-table-column label="屬性值">
            <template #="{ row }">
              <el-tag v-for="item in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #="{ row }">
              <el-button type="warning" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
              <el-popconfirm :title="`你確定要刪除${row.attrName}嗎?`" @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene === 1">
        <el-form inline>
          <el-form-item label="屬性名稱">
            <el-input placeholder="請輸入屬性名稱" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="addAttrValue" icon="Plus"
          :disabled="attrParams.attrName ? false : true">添加屬性值</el-button>
        <el-button @click="cancel">取消</el-button>
        <el-table border style="margin: 10px 0px;" :data="attrParams.attrValueList">
          <el-table-column type="index" align="center" label="序號" width="80px"></el-table-column>
          <el-table-column label="屬性值">
            <template #="{ row, $index }">
              <el-input :ref="(vc: any) => inputArr[$index] = vc" v-if="row.flag" size="small"
                @blur="toLook(row, $index)" placeholder="請你輸入屬性值名稱" v-model="row.valueName"></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label=" 操作">
            <template #="{ $index }">
              <el-button type="danger" size="small" icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="save"
          :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category'
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
import { reqAttr, reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr';
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus';

const categoryStore = useCategoryStore()
const attrArr = ref<Attr[]>([])
const scene = ref<number>(0)
const inputArr = ref<any>([])
const attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3
})

watch(() => categoryStore.c1Id, () => {
  attrArr.value = []
  if (categoryStore.c1Id) {
    getAttr()
  }
})

watch(() => categoryStore.c3Id, () => {
  attrArr.value = []
  if (categoryStore.c3Id) {
    getAttr()
  }
})

const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  const res: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (res.code === 200) {
    attrArr.value = res.data
  }
}

const addAttr = () => {
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id as number,
    categoryLevel: 3
  })

  if (attrParams.id) {
    delete attrParams.id
  }
  scene.value = 1
  attrParams.categoryId = categoryStore.c3Id as number
}

const updateAttr = (row: Attr) => {
  scene.value = 1

  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}

const save = async () => {
  const res: any = await reqAddOrUpdateAttr(attrParams)
  if (res.code === 200) {
    getAttr()
    scene.value = 0
    ElMessage.success(attrParams.id ? '修改成功' : '添加成功')
  } else {
    ElMessage.error(attrParams.id ? '修改失败' : '添加失败')
  }
}

const cancel = () => {
  scene.value = 0
}

const toLook = (row: AttrValue, $index: number) => {
  if (row.valueName.trim() === '') {
    attrParams.attrValueList.splice($index, 1)
    ElMessage.error('屬性值不能為空')
    return
  }
  attrParams.attrValueList.forEach((item, index) => {
    if (index !== $index && item.valueName === row.valueName) {
      attrParams.attrValueList.splice($index, 1)
      ElMessage.error('屬性值不能重複')
    }
  })
  row.flag = false
}

const addAttrValue = () => {
  attrParams.attrValueList.push({
    attrId: 0,
    valueName: '',
    flag: true
  })

  nextTick(() => {
    inputArr.value[inputArr.value.length - 1].focus();
  })
}

const toEdit = (row: AttrValue, $index: number) => {
  //相应的属性值对象flag:变为true,展示input
  row.flag = true;
  //nextTick:响应式数据发生变化,获取更新的DOM(组件实例)
  nextTick(() => {
    inputArr.value[$index].focus();
  })

}

const deleteAttr = async (attrId: number) => {
  const res: any = await reqDeleteAttr(attrId)
  if (res.code === 200) {
    getAttr()
    ElMessage.success('刪除成功')
  } else {
    ElMessage.error('刪除失敗')
  }
}

onBeforeUnmount(() => {
  categoryStore.c1Id = ''
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
})

</script>

<style scoped></style>
