<template>
  <footer class="bg-slate-100 text-slate-900 p-4 pb-28 flex flex-wrap gap-8">
    <div>
      <h3 class="font-semibold">Copyright</h3>
      <p>&copy;2024-{{ new Date().getFullYear() }} Felix Wrba. All rights reserved.</p>
    </div>
    <div>
      <h3 class="font-semibold">Contact</h3>
      <p>E-mail: <a href="mailto:fmwrba@gmail.com" class="underline">fmwrba@gmail.com</a>
        Github: <a href="http://github.com/FelixWrba" target="_blank" rel="noopener noreferrer"
          class="underline">@FelixWrba</a></p>
    </div>
    <div>
      <h3 class="font-semibold">Assets used</h3>
      <p>App icon: material symbols 'playlist_add_check' Other: <a href="http://vuejs.org" target="_blank" rel="noopener noreferrer" class="underline">Vue.js</a>, <a href="http://tailwindcss.com" target="_blank" rel="noopener noreferrer" class="underline">Tailwind CSS</a>, <a href="http://heroicons.com" target="_blank" rel="noopener noreferrer" class="underline">Heroicons</a>, Roboto Font</p>
    </div>
    <div>
      <h3 class="font-semibold">Pages</h3>
      <ul class="flex flex-wrap gap-2">
        <li><router-link class="underline" to="/">Home</router-link></li>
        <li><router-link class="underline" to="/onboarding">Onboarding</router-link></li>
        <li><router-link class="underline" to="/account">Account</router-link></li>
        <li><router-link class="underline" to="/login">Login</router-link></li>
      </ul>
    </div>
  </footer>
</template>
