<template>
  <div class="contacts-wrapper">
    <transition-group 
      name="contact-list" 
      tag="div" 
      class="contact-grid"
    >
      <div 
        v-for="contact in contacts" 
        :key="contact.id"
        class="contact-grid-item"
      >
        <ContactItem 
          :contact="contact"
          @delete="(id) => $emit('delete-contact', id)"
          @edit="(contact) => $emit('edit-contact', contact)"
        />
      </div>
    </transition-group>
  </div>
</template>
  
<script setup>
import { defineProps, defineEmits } from 'vue';
// eslint-disable-next-line no-unused-vars
import ContactItem from './ContactItem.vue';

defineProps({
  contacts: {
    type: Array,
    required: true
  }
});

defineEmits(['delete-contact', 'edit-contact']);
</script>

<style scoped>
.contacts-wrapper {
  width: 100%;
  padding: 1rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  align-items: start;
}

.contact-grid-item {
  transition: all 0.3s ease;
}

/* List Transitions */
.contact-list-enter-active,
.contact-list-leave-active {
  transition: all 0.5s ease;
}

.contact-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.contact-list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.contact-list-move {
  transition: transform 0.5s ease;
}
</style>