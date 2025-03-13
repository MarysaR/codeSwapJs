<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchTestLogic } from "../services/apiService";

const testLogic = ref("Chargement...");

onMounted(async () => {
  testLogic.value = await fetchTestLogic();
});
</script>

<template>
  <div>
    <h2 class="test-title">Récupération depuis le back</h2>
    <p>Message API: {{ testLogic }}</p>
    <router-link to="/">Retour à l'accueil</router-link>
  </div>
</template>
