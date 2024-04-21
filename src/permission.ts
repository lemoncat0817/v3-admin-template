import router from './router'
import nprogress from 'nprogress'
import setting from './setting'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
import useUserStore from './store/modules/user'
import pinia from './store'

router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title} - ${to.meta.title} `
  const userStore = useUserStore(pinia)
  nprogress.start()
  const token = userStore.token
  const username = userStore.username

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          next({ ...to, replace: true })
        } catch (error) {
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})
