import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/icon/iconfont.css'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import mitt from 'mitt'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from '@/vuex/index'

router.beforeEach((to,from,next)=>{
  if(localStorage.getItem('token')){
    //如果已经登录，判断当前在哪里
    if(to.path=='/login'){
      next({path:'/home'})
    }else{
      next()
    }
  }else{
      if(to.path=='/login'){
        next()
      }else{
        next({path:'/login'})
      }
    }
  })


const app=createApp(App)

//挂载事务总线
app.config.globalProperties.$bus = new mitt()

app.use(ElementPlus, { size: 'small', zIndex: 3000 })

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store)
app.use(router)
app.mount('#app')
