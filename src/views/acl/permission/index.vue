<template>
  <div>
    <el-table style="width: 100%; margin-bottom: 20px" border row-key="id" :data="permissionArr">
      <el-table-column prop="name" label="名稱" />
      <el-table-column prop="code" label="權限值" />
      <el-table-column prop="updateTime" label="修改時間" />
      <el-table-column label="操作">
        <template #="{ row }">
          <el-button @click="addPermission(row)" type="primary" size="small" :disabled="row.level === 4">
            {{ row.level === 3 ? '添加功能' : '添加菜單' }}
          </el-button>
          <el-button @click="updatePermission(row)" type="primary" size="small"
            :disabled="row.level === 1">編輯</el-button>
          <el-popconfirm width="260px" :title="`你確定要刪除${row.name}嗎?`" @confirm="removeMenu(row.id)">
            <template #reference>
              <el-button type="primary" size="small" :disabled="row.level === 1">刪除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加功能和添加菜单的弹窗 -->
    <el-dialog v-model="dialogVisible" :title="menuData.id ? '更新菜單' : '添加菜單'" width="500">
      <el-form label-width="80px" style="margin: 10px 0px;">
        <el-form-item label="名稱">
          <el-input placeholder="請輸入菜單名稱" v-model="menuData.name"></el-input>
        </el-form-item>
        <el-form-item label="權限值">
          <el-input placeholder="請輸入權限值" v-model="menuData.code"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">確定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { reqAllPermission, reqAddOrUpdateMenu, reqRemoveMenu } from '@/api/acl/menu/index'
import type { PermissionResponseData, PermissionsList, Permission, MenuParams } from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'

const permissionArr = ref<PermissionsList>([])
const dialogVisible = ref<boolean>(false)
const menuData = reactive<MenuParams>({
  code: '',
  level: 0,
  name: '',
  pid: 0,
})

const save = async () => {
  const res: any = await reqAddOrUpdateMenu(menuData)
  if (res.code === 200) {
    ElMessage.success(menuData.id ? '修改成功' : '添加成功')
    getHasPermission()
    dialogVisible.value = false
  } else {
    ElMessage.error(menuData.id ? `修改失败因為${res.data}` : `添加失败因為${res.data}`)
    dialogVisible.value = false
  }
}

onMounted(() => {
  getHasPermission()
})

const getHasPermission = async () => {
  const res: PermissionResponseData = await reqAllPermission()
  if (res.code === 200) {
    permissionArr.value = res.data
  }
}

const addPermission = (row: Permission) => {
  dialogVisible.value = true
  Object.assign(menuData, {
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  })
  menuData.level = row.level + 1
  menuData.pid = (row.id as number)
}

const updatePermission = (row: Permission) => {
  dialogVisible.value = true
  Object.assign(menuData, row)
  menuData.updateTime = ''
}

const removeMenu = async (id: number) => {
  const res = await reqRemoveMenu(id)
  if (res.code === 200) {
    ElMessage.success('刪除成功')
    getHasPermission()
  } else {
    ElMessage.error(`刪除失敗因為${res.data}`)
  }
}

</script>

<style scoped></style>
