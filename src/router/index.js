import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import OnboardingView from '@/views/OnboardingView.vue';
import AccountView from '@/views/AccountView.vue';
import LoginView from '@/views/LoginView.vue';
import SignupView from '@/views/SignupView.vue';
import LandingView from '@/views/LandingView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: '/home',
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
    },
    {
      path: '/account/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/account/signup',
      name: 'sign up',
      component: SignupView,
    }
  ],
});


export default router;
