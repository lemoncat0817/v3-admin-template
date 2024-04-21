import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './permission'
import { isHasButton } from './directive/has'
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import gloablComponent from './components/index'
import '@/styles/index.scss'
import router from './router'
import pinia from '@/store/index'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import 'element-plus/theme-chalk/dark/css-vars.css'

//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhTw, //element-plus国际化配置
})
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
isHasButton(app)
app.use(gloablComponent)
app.mount('#app')
