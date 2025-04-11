<template>
  <div>
    <h2 class="test-title">Récupération depuis le back</h2>
    <router-link to="/" class="router-back-link"
      >Retour à l'accueil</router-link
    >
  </div>

  <div class="page-container">
    <h1 class="title">Liste des utilisateurs</h1>

    <input
      type="text"
      v-model="searchQuery"
      class="search-input"
      placeholder="Rechercher par email"
    />

    <table v-if="!isLoading" class="user-table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Rôle</th>
          <th>Créé le</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ new Date(user.createdAt).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="isLoading">Chargement en cours...</p>
    <p v-if="!isLoading && filteredUsers.length === 0">
      Aucun utilisateur trouvé
    </p>
  </div>
</template>

<script setup lang="ts">
import { getUsers } from "../services/userService";
import { User } from "src/types/user";
import { ref, computed, onMounted } from "vue";

const allUsers = ref<User[]>([]);
const searchQuery = ref("");
const isLoading = ref(true);

const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return allUsers.value.filter((user) =>
    user.email.toLowerCase().includes(query)
  );
});

onMounted(async () => {
  isLoading.value = true;
  allUsers.value = await getUsers();
  isLoading.value = false;
});
</script>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 150, 136, 0.1);
  text-align: center;
  margin-top: 10vh;
}

.title {
  color: #007acc;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.test-title {
  margin-bottom: 5px;
}

.router-back-link {
  display: block;
  margin-top: 5px;
}

.search-input {
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 400px;
  margin-bottom: 1.5rem;
  border: 1px solid #00bfa5;
  border-radius: 6px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
}

.user-table th,
.user-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e0f2f1;
}

.user-table th {
  background-color: #e0f7fa;
  color: #00695c;
  font-weight: 600;
}

.user-table td {
  background-color: #f1f8e9;
  color: #004d40;
}

@media screen and (max-width: 600px) {
  .user-table,
  .user-table thead,
  .user-table tbody,
  .user-table th,
  .user-table td,
  .user-table tr {
    display: block;
  }

  .user-table td {
    text-align: right;
    padding-left: 50%;
    position: relative;
  }

  .user-table td::before {
    position: absolute;
    left: 10px;
    content: attr(data-label);
    font-weight: bold;
    text-align: left;
  }

  .user-table th {
    display: none;
  }
}
</style>
