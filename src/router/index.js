import {createRouter,createWebHistory} from 'vue-router'

const routes=[{
  path:'/',
  redirect:'/home'
},{
  path:'/home',
  component:()=>import('@/components/Home/Home')
},{
path:'/login',
component:()=>import('@/components/Login/Login')
},{
  path:'/playlist',
  component:()=>import('@/components/Playlist/Playlist')
},{
  path:'/search',
  component:()=>import('@/components/Search/Search'),
  redirect: '/search/searchList',
  children:[{
    path:'searchList',
    component:()=>import('@/components/SearchList/SearchList')
  },{
    path:'searchDetail',
    component:()=>import('@/components/SearchDetail/SearchDetail')
  }]
}]


const router=createRouter({
  history:createWebHistory(),
  routes
})

export default router



