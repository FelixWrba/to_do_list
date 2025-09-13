import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/views/LandingView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/onboarding/:page?',
      name: 'onboarding',
      component: () => import('@/views/OnboardingView.vue'),
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/AccountView.vue'),
    },
    {
      path: '/account/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/account/signup',
      name: 'sign up',
      component: () => import('@/views/SignupView.vue'),
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  }
});


export default router;
