import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/members',
    component: () => import('layouts/BlankLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'member-dashboard',
        component: () => import('pages/members/DashboardPage.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      { path: '', redirect: { name: 'login' } },
      {
        path: 'login',
        name: 'login',
        component: () => import('src/pages/auth/LoginPage.vue'),
      },
      {
        path: 'create-account',
        name: 'create-account',
        component: () => import('src/pages/auth/RegisterPage.vue'),
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('src/pages/auth/ForgotPasswordPage.vue'),
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('src/pages/auth/ResetPasswordPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
