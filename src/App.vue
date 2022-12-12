<script setup lang="ts">
import { useRouter } from "vue-router";

import { signOut } from "@firebase/auth";
import { useCurrentUser } from "vuefire";
import { auth } from "@/plugins/firebase";

const router = useRouter();

const user = useCurrentUser();

const logout = async () => {
  await signOut(auth);
};
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>Appointment client</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn @click="router.push('/')" variant="flat">Home</v-btn>

      <v-spacer></v-spacer>

      <template v-if="user">
        {{ user.displayName }}
        <v-btn @click="logout" variant="flat">Logout</v-btn>
      </template>
      <template v-else>
        <v-btn @click="router.push('/login')" variant="flat">Login</v-btn>
        <v-btn @click="router.push('/register')" variant="flat">Register</v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
