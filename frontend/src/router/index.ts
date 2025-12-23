import { createRouter, createWebHistory } from 'vue-router'

import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import DaoView from '@/views/DaoView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import NewsDetailView from '@/views/NewsDetailView.vue'
import ProductsView from '@/views/ProductsView.vue'
import QiView from '@/views/QiView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ServicesView from '@/views/ServicesView.vue'
import WanView from '@/views/WanView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/dao', name: 'dao', component: DaoView },
    { path: '/qi', name: 'qi', component: QiView },
    { path: '/wan', name: 'wan', component: WanView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/products', name: 'products', component: ProductsView },
    { path: '/services', name: 'services', component: ServicesView },
    { path: '/contact', name: 'contact', component: ContactView },
    { path: '/news/:id', name: 'newsDetail', component: NewsDetailView, props: true },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router

