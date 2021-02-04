import Vue from 'vue'
import VueRouter from 'vue-router'

import Department from '../views/Risks/RiskDepartment.vue'
import Committee from '../views/Risks/RiskCommittee.vue'
import CEO from '../views/Risks/RiskCEO.vue'
import Owner from '../views/Risks/RiskOwner.vue'
import Creator from '../views/Risks/RiskCreator.vue'
import RisksLayout from '../views/Risks/Layout.vue'
import Risks from '../views/Risks/Risks.vue'

import OrganisationsLayout from '../views/Organisation/Layout.vue'
import Details from '../views/Organisation/Details.vue'
import Variables from '../views/Organisation/Variables.vue'
import Departments from '../views/Organisation/Departments.vue'


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
    component: RisksLayout,
    children: [
      {
        path: 'owner',
        name: 'Owner',
        components: {
          portal: Owner
        },
        beforeEnter: (to, from, next) => {
          let views = localStorage.getItem('views')
          if (views == 'Risk Owner') {
            next()
          } else {
            next('login')
          }
        }
      },
      {
        path: 'ceo',
        name: 'Ceo',
        components: {
          portal: CEO
        },
        beforeEnter: (to, from, next) => {
          let views = localStorage.getItem('views')
          if (views == 'CEO') {
            next()
          } else {
            next('login')
          }
        }
      },
      {
        path: 'committee',
        name: 'Committee',
        components: {
          portal: Committee
        },
        beforeEnter: (to, from, next) => {
          let views = localStorage.getItem('views')
          if (views == 'Risk Committee') {
            next()
          } else {
            next('login')
          }
        }
      },
      {
        path: 'creator',
        name: 'Creator',
        components: {
          portal: Creator
        },
        beforeEnter: (to, from, next) => {
          let views = localStorage.getItem('views')
          if (views == 'Risk Creator') {
            next()
          } else {
            next('login')
          }
        }
      },
      {
        path: 'risks',
        name: 'Risks',
        components: {
          portal: Risks
        },
        beforeEnter: (to, from, next) => {
          let views = localStorage.getItem('views')
          if (views) {
            next()
          } else {
            next('login')
          }
        }
      },
      {
        path: 'department',
        name: 'Department',
        components: {
          portal: Department
        },
        beforeEnter: (to, from, next) => {
          let views = localStorage.getItem('views')
          if (views == 'Risk Department') {
            next()
          } else {
            next('login')
          }
        }
      }]
  },
  {
    path: '/organisation',
    redirect: '/organisation/details',
    name: 'Organisation',
    component: OrganisationsLayout,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('organisation')) {
        next('login')
      } else {
        next()
      }
    },
    children: [{
      path: 'details',
      name: 'Details',
      components: {
        organisation: Details
      }
    },
    {
      path: 'variables',
      name: 'Variables',
      components: {
        organisation: Variables
      }
    },
    {
      path: 'departments',
      name: 'Departments',
      components: {
        organisation: Departments
      }
    }
    ]
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
