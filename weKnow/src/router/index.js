import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';

import Helpers from '../js/others/Helpers';

import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Users from '../views/Users.vue';
import Edit from '../views/Edit.vue';
import RecoverPassword from '../views/RecoverPassword';
import Articles from '../views/Articles.vue';
import ArticleDetails from '../views/ArticleDetails.vue';
import ArticleInsertUpdate from '../views/ArticleInsertUpdate.vue';
import Categories from '../views/Categories.vue';
import Subjects from '../views/Subjects.vue';
import Courses from '../views/Courses.vue';

function AdminAuth(to, from, next) {
  const loginUrl = '/login';
  const token = localStorage.getItem('token');
  if (token != undefined) {
    const request = Helpers.getRequestWithHeader();
    const url = 'http://localhost:8686/validate';
    axios.post(url, {}, request).then ((response) => {
        console.log(response);
        next();
    }).catch((error) => {
        console.log(error.response);
        next(loginUrl);
      });
  }
  else {
    next(loginUrl);
  }
}

function LoginAuth(to, from, next) {
  const homeUrl = '/home';
  let sessionUser = localStorage.getItem('sessionUser');
  if (sessionUser != undefined) {
    sessionUser = JSON.parse(sessionUser);
    if (sessionUser.role == 0 || sessionUser.role == 1 || sessionUser.role == 2) {
      next();
    }
    else {
      next(homeUrl);
    }
  }
  else {
    next(homeUrl);
  }
}


Vue.use(VueRouter)

// Surpress route exception
/*const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};*/

const routes = [

  // Users
  { path: '/', name: 'Home', component: Home },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/admin/users', name: 'Users', component: Users, beforeEnter: AdminAuth },
  { path: '/recoverpassword', name: 'RecoverPassword', component: RecoverPassword, },
  { path: '/users/edit/:id', name: 'UserEdit', component: Edit, beforeEnter: LoginAuth },
  
  // Article
  { path: '/new-article', name: 'InsertArticle', component: ArticleInsertUpdate, beforeEnter: LoginAuth },
  { path: '/articles', name: 'Articles', component: Articles, beforeEnter: LoginAuth },
  { path: '/articles/edit/:id', name: 'UpdateArticle', component: ArticleInsertUpdate, beforeEnter: LoginAuth },
  { path: '/articles/details/:id', name: 'ArticleDetails', component: ArticleDetails },
  
  // Category
  { path: '/admin/categories', name: 'Categories', component: Categories, beforeEnter: AdminAuth },
  
  // Subjects
  { path: '/admin/subjects', name: 'Subjects', component: Subjects, beforeEnter: AdminAuth },
  
  // Courses
  { path: '/admin/courses', name: 'Courses', component: Courses, beforeEnter: AdminAuth },

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
