import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import OnboardingView from '@/views/OnboardingView.vue';
import AccountView from '@/views/AccountView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/onboarding/:page?',
      name: 'onboarding',
      component: OnboardingView,
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
    }
  ],
});

router.beforeEach((to, from) => {
  if (!localStorage.getItem('boarded') && to.name !== 'onboarding') {
    return { name: 'onboarding', params: { page: 1 } };
  }
});

export default router;
