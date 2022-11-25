<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>Appointment client</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn @click="router.push('/')" variant="flat">Home</v-btn>
      <v-btn @click="router.push('/login')" variant="flat">Login</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
