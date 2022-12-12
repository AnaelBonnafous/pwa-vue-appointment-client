<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { addDoc, collection } from "@firebase/firestore";
import { updateCurrentUserProfile } from "vuefire";
import { auth, firestore } from "@/plugins/firebase";

const router = useRouter();

const form = reactive({
  firstname: "",
  lastname: "",
  email: "",
  password: "",
});

const register = async () => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      form.email,
      form.password
    );

    await addDoc(collection(firestore, "client"), {
      uid: user.uid,
      firstname: form.firstname,
      lastname: form.lastname,
    });

    await signInWithEmailAndPassword(auth, form.email, form.password);

    await updateCurrentUserProfile({
      displayName: `${form.firstname} ${form.lastname}`,
    });

    router.push({ name: "Dashboard" });
  } catch (error) {
    //
  }
};
</script>

<template>
  <h1>Register</h1>
  <v-form @submit.prevent="register">
    <v-text-field v-model="form.firstname" type="text" placeholder="John" />
    <v-text-field v-model="form.lastname" type="text" placeholder="Doe" />
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
</template>
