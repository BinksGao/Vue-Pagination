import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Class1 from '@/components/Class1'
import Class2 from '@/components/Class2'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          path: '/class1',
          name: 'Class1',
          component: Class1
        },
        {
          path: '/class2',
          name: 'Class3',
          component: Class2,
          meta: { keepAlive: true },
        }
      ]
    }
  ]
})
