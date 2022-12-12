<script setup lang="ts">
import { reactive } from "vue";

import { addDoc, collection } from "firebase/firestore";
import { firestore } from "@/plugins/firebase";
import { getCurrentUser, useCollection } from "vuefire";

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

const appointmentsRef = collection(firestore, "appointment");
const appointments = useCollection(appointmentsRef);

const createAppointment = async () => {
  form.client_uid = (await getCurrentUser())?.uid;
  await addDoc(appointmentsRef, { ...form });
};
</script>

<template>
  <h1>Dashboard</h1>
  <v-row>
    <v-col>
      <h2>Nouveau rendez-vous</h2>
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
    </v-col>
    <v-col>
      <h2>Mes rendez-vous</h2>
      <v-list lines="one">
        <v-list-item
          v-for="(appointment, index) in appointments"
          :key="index"
          :title="appointment.description"
          subtitle="..."
        ></v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>
