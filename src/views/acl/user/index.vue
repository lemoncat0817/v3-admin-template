<template>
  <div>
    <el-card style="height: 80px;">
      <el-form inline class="form">
        <el-form-item label="用戶名:">
          <el-input v-model="keyword" placeholder="請輸入用戶名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="keyword.trim().length === 0" @click="search">搜尋</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0px;">
      <el-button type="primary" @click="addUser" icon="Plus">添加用戶</el-button>
      <el-button type="danger" :disabled="selectIdArr.length === 0" @click="deleteSelectUser">批量刪除</el-button>
      <!-- 表格 -->
      <el-table @selection-change="selectChange" style="margin: 10px 0px;" border :data="userArr">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="#" type="index" align="center"></el-table-column>
        <el-table-column label="Id" align="center" prop="id"></el-table-column>
        <el-table-column label="用戶名字" align="center" prop="username" show-overflow-tooltip></el-table-column>
        <el-table-column label="用戶暱稱" align="center" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="用戶角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
        <el-table-column label="創建時間" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="更新時間" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template #="{ row }">
            <el-button type="primary" size="small" icon="User" @click="setRole(row)">分配角色</el-button>
            <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">編輯</el-button>
            <el-popconfirm width="260px" :title="`你確定要刪除${row.username}嗎?`" @confirm="deleteUser(row)">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete">刪除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分頁組件 -->
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 7, 9]"
        :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total"
        @current-change="handelPage" @size-change="handelSize" />
    </el-card>
    <!-- 抽屜組件 添加/編輯用戶 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>{{ userParams.id ? '編輯用戶' : '添加用戶' }}</h4>
      </template>
      <template #default>
        <div>
          <el-form :model="userParams" :rules="rules" ref="formRef">
            <el-form-item label="用戶姓名:" prop="username">
              <el-input placeholder="請輸入用戶名字" v-model="userParams.username"></el-input>
            </el-form-item>
            <el-form-item label="用戶暱稱:" prop="name">
              <el-input placeholder="請輸入用戶暱稱" v-model="userParams.name"></el-input>
            </el-form-item>
            <el-form-item v-if="userParams.id ? false : true" label="用戶密碼:" prop="password">
              <el-input placeholder="請輸入用戶密碼" v-model="userParams.password"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="save">確定</el-button>
          <el-button type="info" @click="cancel">取消</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 抽屜組件 分配角色 -->
    <el-drawer v-model="drawer1">
      <template #header>
        <h4>分配角色用戶</h4>
      </template>
      <template #default>
        <div>
          <el-form inline>
            <el-form-item label="用戶姓名">
              <el-input :disabled="true" v-model="userParams.username"></el-input>
            </el-form-item>
            <el-form-item label="角色列表">
              <div>
                <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                  @change="(handleCheckAllChange as any)">全選</el-checkbox>
                <el-checkbox-group v-model="(userRole as any)" @change="(handleCheckedCitiesChange as any)">
                  <el-checkbox v-for="(role, index) in allRole" :key="index" :label="role">
                    {{ role.roleName }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="confirmClick">確定</el-button>
          <el-button type="info" @click="drawer1 = false">取消</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import useUserStore from '@/store/modules/user'
import { reqCheckUser, reqUser, reqUserInfo, reqAddOrUpdateUser, reqAllRole, reqSetUserRole, reqRemoveUser, reqSelectUser } from '@/api/acl/user/index'
import type { UserCheckResponseData, userInfoReponseData, UserResponseData, Records, User, AllRoleResponseData, AllRole, SetRoleData } from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
const userStore = useUserStore()


const pageNo = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)
const drawer = ref<boolean>(false)
const drawer1 = ref<boolean>(false)
const checkAll = ref<boolean>(false)
const isIndeterminate = ref<boolean>(true)
const same = ref<boolean>(false)
const userArr = ref<Records>([])
const formRef = ref<any>()
const allRole = ref<AllRole>([])
const userRole = ref<AllRole>([])
const selectIdArr = ref<User[]>([])
const keyword = ref<string>('')
const keyword1 = ref<string>('')
const userParams = reactive<User>({
  username: '',
  name: '',
  password: ''
})

onMounted(() => {
  getHasUser()
})

const validatorUsername = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 3 && value.trim().length <= 10) {
    callback()
  } else {
    callback(new Error('用戶名字至少三位,最多十位'))
  }
}

const validatorName = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用戶暱稱至少五位'))
  }
}

const validatorPassword = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 6) {
    callback()
  } else {
    callback(new Error('用戶密碼至少六位'))
  }
}

const rules = {
  username: [
    { required: true, trigger: 'blur', validator: validatorUsername }
  ],
  name: [
    { required: true, trigger: 'blur', validator: validatorName }
  ],
  password: [
    { required: true, trigger: 'blur', validator: validatorPassword }
  ]
}

const getHasUser = async () => {
  const res: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value, keyword1.value)
  if (res.code === 200) {
    userArr.value = res.data.records
    total.value = res.data.total
  }
}

const addUser = () => {
  drawer.value = true
  userParams.id = ''
  Object.assign(userParams, {
    username: '',
    name: '',
    password: ''
  })
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}

const updateUser = (row: User) => {
  drawer.value = true
  Object.assign(userParams, row)
  userParams.updateTime = ''
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
  })
}

const handelPage = (page: number) => {
  pageNo.value = page
  getHasUser()
}

const handelSize = (limit: number) => {
  pageSize.value = limit
  getHasUser()
}

const save = async () => {
  await formRef.value.validate()
  const res: any = await reqAddOrUpdateUser(userParams)
  if (res.code === 200) {
    drawer.value = false
    ElMessage.success(userParams.id ? '修改成功' : '添加成功')
    const result: userInfoReponseData = await reqUser()
    if (result.code === 203) {
      await userStore.userLogout()
      ElMessage.warning('登入超時,2秒後跳轉登入頁')
      setTimeout(() => {
        window.location.reload()
      }, 2000)
      return
    }
    getHasUser()
  } else {
    drawer.value = false
    ElMessage.error(userParams.id ? '修改失敗' : '添加失敗')
  }
}

const cancel = () => {
  drawer.value = false
}

const setRole = async (row: User) => {
  Object.assign(userParams, row)
  userParams.updateTime = ''
  const res: AllRoleResponseData = await reqAllRole((userParams.id as number))
  if (res.code === 200) {
    allRole.value = res.data.allRolesList
    userRole.value = res.data.assignRoles
    drawer1.value = true
  }
}

const confirmClick = async () => {
  const data: SetRoleData = {
    userId: (userParams.id as number),
    roleIdList: (userRole.value.map(item => item.id) as number[])
  }
  const res: any = await reqSetUserRole(data)
  if (res.code === 200) {
    drawer1.value = false
    ElMessage.success('分配角色成功')
    getHasUser()
  }
}

const deleteUser = async (row: User) => {
  userStore.userInfo()
  if (row.username === userStore.username) {
    ElMessage.warning('不能刪除自己')
    return
  }
  const res: any = await reqRemoveUser((row.id as number))
  if (res.code === 200) {
    ElMessage.success('刪除成功')
    getHasUser()
  } else {
    ElMessage.error('刪除失敗')
  }
}

const selectChange = (val: User[]) => {
  selectIdArr.value = val
}

const deleteSelectUser = async () => {
  const idsList: any = selectIdArr.value.map(item => item.id)
  same.value = false
  const asyncOperations = idsList.map(async (item: number) => {
    const result: UserCheckResponseData = await reqCheckUser(item)
    if (result.data.username === userStore.username) {
      ElMessage.warning('批量刪除中包含自己，請移除自己再繼續')
      same.value = true
      return
    }
  })
  await Promise.all(asyncOperations)
  if (!same.value) {
    const res: any = await reqSelectUser(idsList)
    if (res.code === 200) {
      ElMessage.success('批量刪除成功')
      getHasUser()
    } else {
      ElMessage.error(`批量刪除失敗因為${res.data}`)
    }
  }
}

const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}

const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
}

const reset = () => {
  pageNo.value = 1
  keyword.value = ''
  keyword1.value = ''
  getHasUser()
}

const search = () => {
  keyword1.value = keyword.value
  getHasUser()
  keyword.value = ''
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
