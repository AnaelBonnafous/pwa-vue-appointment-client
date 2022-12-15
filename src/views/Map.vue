<script setup lang="ts">
import { onMounted, watch } from "vue";

import { collection } from "@firebase/firestore";
import { firestore } from "@/plugins/firebase";
import { useCollection } from "vuefire";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

const providers = useCollection(collection(firestore, "provider"));

let map: L.Map;

onMounted(() => {
  map = L.map("map").setView([45.76, 4.83], 11);
  L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png").addTo(
    map
  );
});

watch(providers, (value) => {
  value.forEach((provider) => {
    L.marker([provider.latitude, provider.longitude])
      .addTo(map)
      .bindPopup(`${provider.firstname} ${provider.lastname} address`)
      .openPopup();
  });
});
</script>

<template>
  <h1>Providers map</h1>
  <div id="map" />
</template>

<style scoped>
#map {
  width: 100%;
  min-height: 400px;
}
</style>
