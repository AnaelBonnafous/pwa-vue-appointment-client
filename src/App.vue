<script setup lang="ts">
import { useRouter } from "vue-router";

import { signOut } from "@firebase/auth";
import { useCurrentUser } from "vuefire";
import { auth } from "@/plugins/firebase";

const router = useRouter();

const user = useCurrentUser();

const logout = async () => {
  await signOut(auth);
  router.push({ name: "Login" });
};
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>Appointment client</v-app-bar-title>

      <template v-if="user">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props">
              {{ user.displayName }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="logout">
              <template v-slot:prepend>
                <v-icon icon="mdi-logout" />
              </template>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <v-btn @click="router.push({ name: 'Login' })" variant="flat"
          >Login</v-btn
        >
        <v-btn @click="router.push({ name: 'Register' })" variant="flat"
          >Register</v-btn
        >
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <v-bottom-navigation>
      <v-btn @click="router.push({ name: 'Home' })">
        <v-icon icon="mdi-home" />
        Home
      </v-btn>
      <v-btn @click="router.push({ name: 'Dashboard' })">
        <v-icon icon="mdi-notebook" />
        Appointments
      </v-btn>
      <v-btn>
        <v-icon icon="mdi-map-marker" />
        Map
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
