import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/base.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ElementPlus from 'element-plus'

const app = createApp(App)

for (const [name, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(name, component);
}

app.use(ElementPlus, {locale: zhCn}),

app.mount('#app')
