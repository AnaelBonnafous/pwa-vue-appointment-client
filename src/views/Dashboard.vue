<script setup lang="ts">
import { reactive } from "vue";

import { addDoc, collection } from "firebase/firestore";
import { firestore } from "@/plugins/firebase";
import { getCurrentUser } from "vuefire";

interface Appointment {
  date: Date | null;
  description: string;
  client_uid: string | undefined;
  provider_uid: string;
}

const form = reactive<Appointment>({
  date: null,
  description: "",
  client_uid: "",
  provider_uid: "",
});

const providers = [""];

const createAppointment = async () => {
  form.client_uid = (await getCurrentUser())?.uid;
  await addDoc(collection(firestore, "appointment"), { ...form });
};
</script>

<template>
  <h1>Dashboard</h1>
  <v-form @submit.prevent="createAppointment">
    <v-text-field
      v-model="form.date"
      type="datetime-local"
      label="Datetime"
    ></v-text-field>
    <v-select
      v-model="form.provider_uid"
      label="Provider"
      :items="providers"
    ></v-select>
    <v-textarea v-model="form.description" label="Description"></v-textarea>
    <v-btn type="submit" block>submit</v-btn>
  </v-form>
</template>
