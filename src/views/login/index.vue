<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>歡迎來到硅谷甄選</h2>
          <el-form-item prop="username">
            <el-input prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="Lock" type="password" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_btn" type="primary" @click="login">
              登入
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
// 獲取el-form組件
const loginForms = ref()
// 控制登入按鈕的loading
const loading = ref(false)

// 收集帳號與密碼
const loginForm = reactive({ username: 'admin', password: '111111' })
const login = async () => {
  await loginForms.value.validate()
  // loading執行運轉
  loading.value = true
  // 登入
  try {
    await userStore.userLogin(loginForm)
    await userStore.userInfo()
    // 登入成功後結束loading運轉
    loading.value = false
    const redirect = route.query.redirect as string
    router.push({ path: redirect || '/' })
    ElNotification({
      message: '登入成功',
      type: 'success',
      title: `Hi,${getTime()}呀 ${userStore.username} `,
    })
  } catch (error) {
    // 登入失敗後結束loading運轉
    loading.value = false
    ElNotification.error('登入失敗請檢查帳號與密碼是否正確')
  }
}

// // 自定義校驗規則
// const validatorUserName = (rule: any, value: any, callback: any) => {
//   if (value === '') {
//     callback(new Error('請輸入帳號'))
// }    else if (value.length < 3 || value.length > 10) {
//     callback(new Error('帳號長度為3-10'))
//   } else {
//     callback()
//   }
//   }

const rules = {
  username: [
    { required: true, message: '請輸入帳號', trigger: 'blur' },
    { min: 3, max: 10, message: '帳號長度為3-10', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 6, max: 15, message: '密碼長度為6-15', trigger: 'blur' },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
