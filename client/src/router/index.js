import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

// 인증 필요
const isAuth = (to, from, next) => {
  if (to.meta.auth && !store.getters.getUser) {
    // 로그인이 필요하기 때문에 login할 수 있는 라우터로 리다이렉트 해준다.
    const loginPath = `/login?rPath=${to.path}`
    next(loginPath)
    return
  }
  next()
}
// 인증 불필요
const isnotAuth = (to, from, next) => {
  if (!to.meta.auth && store.getters.getUser) {
    // 이미 인증되었거나 인증이 필요없다면 라우터를 진행시킨다.
    next('/')
    return
  }
  next()
}

const routes = [{
  path: '/',
  component: () => import('../views/Boards.vue'),
  name: 'boards',
  meta: { auth: true },
  beforeEnter: isAuth
},
{
  path: '/login',
  name: 'logn',
  component: () => import('../views/Login.vue'),
  meta: { auth: false },
  beforeEnter: isnotAuth
},
{
  path: '/board/:id',
  component: () => import('../views/Board.vue'),
  name: 'boards',
  meta: { auth: true },
  beforeEnter: isAuth,
  children: [{
    name: 'boards',
    path: 'add',
    component: () => import('../views/AddCards.vue')
  }]
},
{
  path: '/card/:id',
  component: () => import('../views/BCard.vue'),
  name: 'cards',
  meta: { auth: true },
  beforeEnter: isAuth
},
{
  path: '/projects',
  component: () => import('../views/Projects.vue'),
  meta: { auth: true },
  beforeEnter: isAuth
},
{
  path: '*',
  component: () => import('../views/PageNotFound.vue')
}
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
