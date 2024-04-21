import pinia from '@/store'
import useUserStore from '@/store/modules/user'

export const isHasButton = (app: any) => {
  const userStore = useUserStore(pinia)
  app.directive('has', {
    mounted(el: any, options: any) {
      // 判断是否有权限
      if (!(userStore.buttons as any).includes(options.value)) {
        el.parentNode.removeChild(el)
      }      
    },
  })
}
