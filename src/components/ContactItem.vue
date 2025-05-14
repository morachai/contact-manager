<template>
  <div class="contact-card" :class="{ 'editing': isEditing }">
    <transition name="fade" mode="out-in">
      <div v-if="!isEditing" class="contact-info">
        <div class="contact-header">
          <div class="avatar">
            {{ contact.name.charAt(0).toUpperCase() }}
          </div>
          <h3>{{ contact.name }}</h3>
        </div>
        
        <div class="contact-details">
          <div class="detail-item">
            <span class="icon">✉️</span>
            <a :href="`mailto:${contact.email}`" class="detail-text">{{ contact.email }}</a>
          </div>
          <div class="detail-item">
            <span class="icon">📱</span>
            <a :href="`tel:${contact.phone}`" class="detail-text">{{ contact.phone }}</a>
          </div>
        </div>

        <div class="contact-actions">
          <button @click="isEditing = true" class="edit-button">
            ✏️ Modifier
          </button>
          <button @click="confirmDelete" class="delete-button">
            🗑️ Supprimer
          </button>
        </div>
      </div>

      <ContactForm 
        v-else
        :contact="contact"
        :is-edit="true"
        @save-contact="handleUpdate"
        @cancel="isEditing = false"
      />
    </transition>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import ContactForm from './ContactForm.vue';

const props = defineProps({
  contact: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['delete', 'edit']);

const isEditing = ref(false);
  
const confirmDelete = () => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
    emit('delete', props.contact.id);
  }
};
  
const handleUpdate = (updatedContact) => {
  emit('edit', { ...updatedContact, id: props.contact.id });
  isEditing.value = false;
};
</script>

<style scoped>
.contact-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.contact-info {
  padding: 1.5rem;
}

.contact-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #42b983;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-right: 1rem;
}

.contact-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.25rem;
}

.contact-details {
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.icon {
  font-size: 1.2rem;
  margin-right: 0.75rem;
  width: 24px;
}

.detail-text {
  color: #2c3e50;
  text-decoration: none;
  transition: color 0.3s ease;
}

.detail-text:hover {
  color: #42b983;
}

.contact-actions {
  display: flex;
  gap: 0.75rem;
}

.edit-button,
.delete-button {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.edit-button {
  background: #e9ecef;
  color: #2c3e50;
}

.edit-button:hover {
  background: #dee2e6;
}

.delete-button {
  background: #fff5f5;
  color: #e74c3c;
}

.delete-button:hover {
  background: #ffe3e3;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>