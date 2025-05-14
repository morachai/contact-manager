<template>
  <div class="home">
    <div class="header">
      <h1>Gestionnaire de Contacts</h1>
      <div class="controls">
        <div class="search-filter">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Rechercher un contact..."
            class="search-input"
          >
          <select v-model="filterBy" class="filter-select">
            <option value="all">Tous</option>
            <option value="name">Nom</option>
            <option value="email">Email</option>
            <option value="phone">Téléphone</option>
          </select>
        </div>
        <router-link to="/add" class="add-button">
          ✨ Nouveau Contact
        </router-link>
      </div>
    </div>

    <transition name="fade">
      <div v-if="showAddForm" class="modal-overlay" @click.self="router.push('/')">
        <div class="modal">
          <ContactForm 
            @save-contact="handleAdd" 
            @cancel="router.push('/')"
          />
        </div>
      </div>
    </transition>

    <LoadingSpinner v-if="loading" />
    <div v-if="error" class="error-message">
      <span>❌ {{ error }}</span>
      <button @click="fetchContacts" class="retry-button">Réessayer</button>
    </div>

    <div v-if="!loading && filteredContacts.length === 0" class="empty-state">
      <span class="empty-icon">📭</span>
      <p>Aucun contact à afficher</p>
      <small v-if="searchQuery">Essayez de modifier vos critères de recherche</small>
    </div>

    <div v-if="!loading && filteredContacts.length > 0">
      <transition-group name="list" tag="div" class="contact-list">
        <ContactList
          :contacts="filteredContacts"
          @delete-contact="handleDelete"
          @edit-contact="handleEdit"
        />
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ContactList from '@/components/ContactList.vue';
import ContactForm from '@/components/ContactForm.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const contacts = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const filterBy = ref('all');
const route = useRoute();
const router = useRouter();
const showAddForm = computed(() => route.path === '/add');

const filteredContacts = computed(() => {
  if (!searchQuery.value) return contacts.value;
  
  const query = searchQuery.value.toLowerCase();
  return contacts.value.filter(contact => {
    if (filterBy.value === 'all') {
      return (
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.phone.toLowerCase().includes(query)
      );
    }
    return contact[filterBy.value].toLowerCase().includes(query);
  });
});

const fetchContacts = async () => {
  try {
    loading.value = true;
    const response = await fetch('http://localhost:3000/contacts');
    if (!response.ok) throw new Error('Erreur lors du chargement des contacts');
    contacts.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchContacts();
});

const handleDelete = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/contacts/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression du contact');
    contacts.value = contacts.value.filter(contact => contact.id !== id);
  } catch (err) {
    error.value = err.message;
  }
};

const handleEdit = async (updatedContact) => {
  try {
    const response = await fetch(`http://localhost:3000/contacts/${updatedContact.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedContact)
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour du contact');
    const index = contacts.value.findIndex(c => c.id === updatedContact.id);
    if (index !== -1) {
      contacts.value[index] = updatedContact;
    }
  } catch (err) {
    error.value = err.message;
  }
};

const handleAdd = async (newContact) => {
  if (!newContact.id) {
    newContact.id = Math.random().toString(36).substr(2, 4);
  }
  try {
    const response = await fetch('http://localhost:3000/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newContact)
    });
    if (!response.ok) throw new Error('Erreur lors de l\'ajout du contact');
    const savedContact = await response.json();
    contacts.value.push(savedContact);
    router.push('/');
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped>
.header {
  margin-bottom: 2rem;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.search-filter {
  display: flex;
  gap: 1rem;
  flex: 1;
}

.search-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #42b983;
  outline: none;
}

.filter-select {
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  min-width: 120px;
}

.filter-select:focus {
  border-color: #42b983;
  outline: none;
}

.add-button {
  display: inline-block;
  background: #42b983;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 500;
  text-decoration: none;
}

.add-button:hover {
  background: #369f6e;
  transform: translateY(-1px);
}
</style>