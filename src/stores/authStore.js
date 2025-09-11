import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "@/utils/supabase";

export const useAuthStore = defineStore('auth', () => {

  const hasAccount = ref(Boolean(localStorage.getItem('hasAccount')));
  const user = ref(null);

  supabase.auth.getUser().then(({ data }) => {
    user.value = data.user;
  });

  function setUser(newUser) {
    user.value = newUser;
  }

  function signOut() {
    supabase.auth.signOut();
    user.value = null;
  }

  function setHasAccount(value) {
    hasAccount.value = value;
    if (value) {
      localStorage.setItem('hasAccount', 'true');
    }
    else {
      localStorage.removeItem('hasAccount');
    }
  }

  return { user, setUser, signOut, hasAccount, setHasAccount };
});
