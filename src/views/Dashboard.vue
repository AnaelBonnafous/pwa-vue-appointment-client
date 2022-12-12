<script setup lang="ts">
import { reactive } from "vue";

import { addDoc, collection, query, where } from "@firebase/firestore";
import { firestore } from "@/plugins/firebase";
import { useCollection, useCurrentUser } from "vuefire";

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

const user = useCurrentUser();

const providerRef = collection(firestore, "provider");
const providers = useCollection(providerRef);

const appointmentRef = collection(firestore, "appointment");
const appointments = useCollection(
  query(appointmentRef, where("client_uid", "==", user.value?.uid || ""))
);

const createAppointment = async () => {
  form.client_uid = user.value?.uid;
  await addDoc(appointmentRef, { ...form });
};
</script>

<template>
  <h1>Dashboard</h1>
  <v-row>
    <v-col>
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
          :item-value="(provider) => provider.uid || null"
          :item-title="
            (provider) => `${provider.firstname} ${provider.lastname}`
          "
        ></v-select>
        <v-textarea v-model="form.description" label="Description"></v-textarea>
        <v-btn type="submit" block>submit</v-btn>
      </v-form>
    </v-col>
    <v-col>
      <v-list>
        <v-list-item
          v-for="appointment in appointments"
          :key="appointment.id"
          :title="appointment.description"
          subtitle="..."
        >
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>
