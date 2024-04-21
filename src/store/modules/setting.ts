// 小倉庫: layout 組件相關配置倉庫
import { defineStore } from 'Pinia'
import { ref } from 'vue'

export const useLayOutSettingStore = defineStore(
  'SettingStore',
  () => {
    const fold = false
    const refresh = false
    const dark = ref<boolean>(false)
    const color = ref<string>('rgba(255, 69, 0, 0.68)')

    return { fold, refresh, dark, color }
  },
  {
    persist: true,
  },
)
