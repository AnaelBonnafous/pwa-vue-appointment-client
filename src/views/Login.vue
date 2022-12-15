<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  signInWithCredential,
} from "@firebase/auth";
import { auth } from "@/plugins/firebase";

const router = useRouter();

const provider = new GithubAuthProvider();
provider.addScope("repo");

const form = reactive({
  email: "",
  password: "",
});

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, form.email, form.password);

    router.push({ name: "Dashboard" });
  } catch (error) {
    //
  }
};

const github = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const credential = GithubAuthProvider.credentialFromResult(result);

    if (credential) {
      const token = credential.accessToken;
      const user = result.user;
      
      await signInWithCredential(auth, credential);
    }
  } catch (error) {
    console.log(error);
    
  }
};
</script>

<template>
  <h1>Login</h1>
  <v-form @submit.prevent="login">
    <v-text-field
      v-model="form.email"
      type="email"
      placeholder="john.doe@mail.com"
    />
    <v-text-field
      v-model="form.password"
      type="password"
      placeholder="******"
    />
    <v-btn type="submit" block>submit</v-btn>
  </v-form>
  <div class="mt-10 text-center">
    <v-btn @click="github" icon="mdi-github"></v-btn>
  </div>
</template>
