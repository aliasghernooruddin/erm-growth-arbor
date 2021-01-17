import Vue from 'vue'
import VueRouter from 'vue-router'
import Department from '../views/RiskDepartment.vue'
import Committee from '../views/RiskCommittee.vue'
import CEO from '../views/RiskCEO.vue'
import Owner from '../views/RiskOwner.vue'
import Creator from '../views/RiskCreator.vue'
import Layout from '../views/Layout.vue'
import Organisation from '../views/Organisation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/admin-login',
    name: 'AdminLogin',
    component: () => import('../views/Admin/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('admin')) {
        next('admin-home')
      } else {
        next()
      }
    }
  },
  {
    path: '/admin-home',
    name: 'AdminHome',
    component: () => import('../views/Admin/Home.vue'),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('admin')) {
        next('admin-login')
      } else {
        next()
      }
    }
  },
  {
    path: '/portal',
    redirect: '/portal/ceo',
    name: 'Portal',
    component: Layout,
    children: [{
      path: 'owner',
      name: 'Owner',
      components: {
        portal: Owner
      },
    },
    {
      path: 'ceo',
      name: 'Ceo',
      components: {
        portal: CEO
      },
    },
    {
      path: 'committee',
      name: 'Committee',
      components: {
        portal: Committee
      },
    },
    {
      path: 'creator',
      name: 'Creator',
      components: {
        portal: Creator
      },
    },
    {
      path: 'department',
      name: 'Department',
      components: {
        portal: Department
      },
    },
    {
      path: 'organisation',
      name: 'Organisation',
      components: {
        portal: Organisation
      },
    }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
