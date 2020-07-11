import Vue from 'vue'
import Router from 'vue-router'
import diarylist from '../views/diary-list.vue'
import addjournal from '../views/add-journal.vue'
import viewjournal from '../views/veiw-journal.vue'
import login from '../views/login.vue'
Vue.use(Router)
// This will remove the warning for router
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
const router = new Router({
  mode: 'history',

  routes: [
    {
      path: '*',
      redirect: '/login'

    },
    {
      path: '/diarylist',
      name: 'diarylist',
      component: diarylist
    },
    {
      path: '/viewjournal/:id',
      name: 'viewjournal',
      component: viewjournal
    },
    {
      path: '/addjournal',
      name: 'addjournal',
      component: addjournal
    },

    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

export default router
