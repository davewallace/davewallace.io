import Vue from 'vue'
import Router from 'vue-router'

// default View for application
import Default from '@/components/default'

// test views for convenience
import test__GSAP_dependencies from '@/components/test__GSAP_dependencies'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'default',
      component: Default
    },
    {
      path: '/test__GSAP_dependencies',
      name: 'test__GSAP_dependencies',
      component: test__GSAP_dependencies
    }
  ]
})
