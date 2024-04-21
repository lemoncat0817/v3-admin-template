<template>
  <div>
    <el-card style="height: 80px;">
      <el-form inline class="form">
        <el-form-item label="角色名稱:">
          <el-input placeholder="角色名稱" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" :disabled="keyword.length === 0">搜尋</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0px;">
      <el-button type="primary" icon="Plus" @click="addRole">添加角色</el-button>
      <!-- 表格 -->
      <el-table style="margin: 10px 0px;" border :data="allRole">
        <el-table-column width="200px" label="#" type="index" align="center"></el-table-column>
        <el-table-column label="Id" align="center" prop="id"></el-table-column>
        <el-table-column label="角色名稱" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
        <el-table-column label="創建時間" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="更新時間" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="350px" align="center">
          <template #="{ row }">
            <el-button type="primary" size="small" icon="User" @click="setPermission(row)">分配權限</el-button>
            <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">編輯</el-button>
            <el-popconfirm width="260px" @confirm="removeRole(row.id)" :title="`你確定要刪除${row.roleName}嗎?`">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete">刪除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分頁組件 -->
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
        :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total"
        @current-change="handelPage" @size-change="handelSize" />
    </el-card>
    <!-- 添加職位以及更新職位的dialog -->
    <el-dialog v-model="dialogVisible" :title="RoleParams.id ? '更新角色' : '添加角色'" width="500px">
      <el-form label-width="80px" :model="RoleParams" :rules="rules" ref="roleForm">
        <el-form-item style="margin: 10px 0px;" label="角色名稱" prop="roleName">
          <el-input placeholder="請填寫角色名稱" v-model="RoleParams.roleName"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">確認</el-button>
      </template>
    </el-dialog>
    <!-- 抽屜組件 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配權限</h4>
      </template>
      <template #default>
        <el-tree ref="tree" :data="menuArr" show-checkbox node-key="id" default-expand-all
          :default-checked-keys="selectArr" :props="defaultProps" />
      </template>
      <template #footer>
        <div style="flex:auto">
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="handle">確認</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import type { RoleResponseData, Records, MenuResponseData, MenuList } from '@/api/acl/role/type'
import { reqRemoveRole, reqAllRoleList, reqAddOrUpdateRole, reqAllMenuList, reqSetPermission } from '@/api/acl/role'
import { RoleData } from '@/api/acl/user/type';
import { ElMessage } from 'element-plus';

const pageNo = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const allRole = ref<Records>([])
const keyword = ref<string>('')
const keyword1 = ref<string>('')
const dialogVisible = ref<boolean>(false)
const drawer = ref<boolean>(false)
const roleForm = ref<any>()
const menuArr = ref<MenuList>([])
const selectArr = ref<number[]>([])
const tree = ref<any>()
const RoleParams = reactive<any>({
  roleName: ''
})

const getHasRole = async () => {
  const res: RoleResponseData = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value)
  if (res.code === 200) {
    allRole.value = res.data.records
    total.value = res.data.total
  }
}

onMounted(() => {
  getHasRole()
})

const validatorRoleName = (_rule: any, value: string, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('角色名稱不能為空且不能小於2位'))
  }
}

const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }]
}

const addRole = () => {
  RoleParams.roleName = ''
  RoleParams.id = ''
  nextTick(() => {
    roleForm.value.clearValidate('roleName')
  })
  dialogVisible.value = true
}

const save = async () => {
  await roleForm.value.validate()
  const res: any = await reqAddOrUpdateRole(RoleParams)
  if (res.code === 200) {
    ElMessage.success(RoleParams.id ? '更新成功' : '添加成功')
    dialogVisible.value = false
    if (RoleParams.id === '') {
      pageNo.value = 1
    }
    getHasRole()
  } else {
    ElMessage.error(RoleParams.id ? '更新失敗' : '添加失敗')
    dialogVisible.value = false
  }
}

const updateRole = (row: RoleData) => {
  dialogVisible.value = true
  Object.assign(RoleParams, row)
  RoleParams.updateTime = ''
  nextTick(() => {
    roleForm.value.clearValidate('roleName')
  })
}


const handelPage = (page: number) => {
  pageNo.value = page
  getHasRole()
}

const handelSize = (limit: number) => {
  pageSize.value = limit
  getHasRole()
}

const reset = () => {
  pageNo.value = 1
  keyword.value = ''
  keyword1.value = ''
  getHasRole()
}

const search = () => {
  keyword1.value = keyword.value
  getHasRole()
  keyword.value = ''
}

const setPermission = async (row: RoleData) => {
  drawer.value = true
  Object.assign(RoleParams, row)
  const result: MenuResponseData = await reqAllMenuList((RoleParams.id as number))
  if (result.code === 200) {
    menuArr.value = result.data
    selectArr.value = filterSelectArr(menuArr.value, [])
  }
}

const defaultProps = {
  children: 'children',
  label: 'name'
}

const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}

const handle = async () => {
  const roleId = RoleParams.id
  const permissionId = tree.value.getCheckedKeys()
  const res = await reqSetPermission(roleId, permissionId)
  if (res.code === 200) {
    ElMessage.success('分配權限成功')
  } else {
    ElMessage.error('分配權限失敗')
  }
  drawer.value = false
}

const removeRole = async (id: number) => {
  const res = await reqRemoveRole(id)
  if (res.code === 200) {
    ElMessage.success('刪除成功')
    getHasRole()
  } else {
    ElMessage.error(`刪除失敗因為${res.data}`)
  }
}

</script>


<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>