import Vue from 'vue'
import Router from 'vue-router'

// default View for application
import Default from '@/routes/default'

// test views for convenience
import test__GSAP_dependencies from '@/routes/test__GSAP_dependencies'
import test__stampit_dependencies from '@/routes/test__stampit_dependencies'

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
    },
    {
      path: '/test__stampit_dependencies',
      name: 'test__stampit_dependencies',
      component: test__stampit_dependencies
    }
  ]
})
