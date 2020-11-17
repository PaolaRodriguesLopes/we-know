import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';

import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Users from '../views/Users.vue';
import Edit from '../views/Edit.vue';
import RecoverPassword from '../views/RecoverPassword';
import Articles from '../views/Articles.vue';
import ArticleDetails from '../views/ArticleDetails.vue';
import ArticleInsertUpdate from '../views/ArticleInsertUpdate.vue';



function AdminAuth(to, from, next){
  if(localStorage.getItem('token') != undefined){

    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }

    axios.post("http://localhost:8686/validate",{},req).then(res => {
      console.log(res);
      next();
    }).catch(err => {
      console.log(err.response);
      next("/login");
    });
  }else{
    next("/login");
  }
}


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: AdminAuth
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users,
    beforeEnter: AdminAuth
  },
  {
    path: '/recoverpassword',
    name: 'RecoverPassword',
    component: RecoverPassword,
  },
  {
    path: '/admin/users/edit/:id',
    name: 'UserEdit',
    component: Edit,
    beforeEnter: AdminAuth
  },
  {
    path: '/admin/articles',
    name: 'Articles',
    component: Articles,
    beforeEnter: AdminAuth
  },
  {
    path: '/new-article',
    name: 'InsertArticle',
    component: ArticleInsertUpdate,
    beforeEnter: AdminAuth
  },
  {
    path: '/admin/articles/edit/:id',
    name: 'UpdateArticle',
    component: ArticleInsertUpdate,
    beforeEnter: AdminAuth
  },
  {
    path: '/admin/articles/details/:id',
    name: 'ArticleDetails',
    component: ArticleDetails
  },
  {
    
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
