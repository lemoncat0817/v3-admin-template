import { defineStore } from 'Pinia'
import type { loginFormData, loginResponseData } from '@/api/user/type'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import { ref } from 'vue'
import router from '@/router'

// 引入路由
import { constantRoute, anyRoute } from '@/router/routes'

const filterAsyncRoute = (asyncRoute: any, routes: any) => {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name as string)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

// 創建用戶小倉庫
const useUserStore = defineStore(
  'user',
  () => {
    const menuRoutes = ref(constantRoute)
    const token = ref('')
    const username = ref('')
    const avatar = ref('')
    const buttons = ref([])

    const userLogin = async (data: loginFormData) => {
      const result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        token.value = result.data as string
        return 'ok'
      } else {
        // 登录失败
        return Promise.reject(new Error(result.data as string))
      }
    }
    // const addRoute = async () => {
    //   const res = await reqUserInfo()
    //   const userAsyncRoute = filterAsyncRoute(asyncRoute, res.data.routes)
    //   const routesToAdd = [...userAsyncRoute, anyRoute]
    //   routesToAdd.forEach((route) => {
    //     router.addRoute(route)
    //   })
    // }

    const userInfo = async () => {
      const res = await reqUserInfo()
      if (res.code === 200) {
        username.value = res.data.name
        avatar.value = res.data.avatar
        buttons.value = res.data.buttons as any
        // const userAsyncRoute = filterAsyncRoute(asyncRoute, res.data.routes)
        // const routesToAdd = [...userAsyncRoute, anyRoute]
        // routesToAdd.forEach((route) => {
        //   router.addRoute(route)
        // // })
        // menuRoutes.value = [...constantRoute, ...userAsyncRoute, anyRoute]

        return 'ok'
      } else {
        return Promise.reject('獲取用戶信息失敗')
      }
    }

    const userLogout = async () => {
      const res = await reqLogout()
      if (res.code === 200) {
        token.value = ''
        username.value = ''
        avatar.value = ''
        localStorage.removeItem('user')
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message as string))
      }
    }

    return {
      userLogin,
      token,
      menuRoutes,
      userInfo,
      username,
      avatar,
      userLogout,
      buttons,
    }
  },
  {
    persist: true,
  },
)

export default useUserStore
