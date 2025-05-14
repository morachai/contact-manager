<template>
  <form @submit.prevent="handleSubmit" class="contact-form">
    <h2 class="form-title">{{ isEdit ? 'Modifier le Contact' : 'Nouveau Contact' }}</h2>
    
    <div class="form-group">
      <label>Nom:</label>
      <div class="input-wrapper">
        <span class="input-icon">👤</span>
        <input 
          v-model="form.name" 
          :class="{ 'has-error': errors.name }"
          @input="validateField('name')"
          placeholder="name"
          required 
        />
      </div>
      <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
    </div>

    <div class="form-group">
      <label>Email:</label>
      <div class="input-wrapper">
        <span class="input-icon">✉️</span>
        <input 
          v-model="form.email" 
          type="email" 
          :class="{ 'has-error': errors.email }"
          @input="validateField('email')"
          placeholder="email@example.com"
          required 
        />
      </div>
      <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
    </div>

    <div class="form-group">
      <label>Téléphone:</label>
      <div class="input-wrapper">
        <span class="input-icon">📱</span>
        <input 
          v-model="form.phone" 
          :class="{ 'has-error': errors.phone }"
          @input="validateField('phone')"
          placeholder="0123456789"
          required 
        />
      </div>
      <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
    </div>

    <div class="form-actions">
      <button type="button" class="cancel-button" @click="$emit('cancel')">
        Annuler
      </button>
      <button 
        type="submit" 
        :disabled="loading || hasErrors" 
        class="submit-button"
      >
        <span v-if="loading" class="loader-inline"></span>
        {{ loading ? 'Envoi en cours...' : (isEdit ? 'Modifier' : 'Ajouter') }}
      </button>
    </div>

    <div v-if="error || success" class="form-feedback">
      <p v-if="error" class="error">❌ {{ error }}</p>
      <p v-if="success" class="success">✅ {{ success }}</p>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  contact: {
    type: Object,
    default: () => ({
      name: '',
      email: '',
      phone: ''
    })
  },
  isEdit: {
    type: Boolean,
    default: false
  }
});

const form = ref({ ...props.contact });
const loading = ref(false);
const error = ref(null);
const success = ref(null);
const errors = ref({
  name: '',
  email: '',
  phone: ''
});

const hasErrors = computed(() => {
  return Object.values(errors.value).some(error => error !== '');
});

const emit = defineEmits(['save-contact', 'cancel']);

const validateField = (field) => {
  errors.value[field] = '';
  
  switch (field) {
    case 'name':
      if (form.value.name.length < 2) {
        errors.value.name = 'Le nom doit contenir au moins 2 caractères';
      }
      break;
    case 'email':
      {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.value.email)) {
          errors.value.email = 'Veuillez entrer une adresse email valide';
        }
      }
      break;
    case 'phone':
      {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(form.value.phone)) {
          errors.value.phone = 'Le numéro de téléphone doit contenir 10 chiffres';
        }
      }
      break;
  }
};

const handleSubmit = async () => {
  // Validate all fields before submission
  ['name', 'email', 'phone'].forEach(validateField);
  if (hasErrors.value) return;

  try {
    loading.value = true;
    error.value = null;
    
    emit('save-contact', form.value);
    success.value = `Contact ${props.isEdit ? 'modifié' : 'ajouté'} avec succès!`;
    
    if (!props.isEdit) {
      form.value = { name: '', email: '', phone: '' };
    }
    
    setTimeout(() => {
      success.value = null;
    }, 3000);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.contact-form {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.form-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  font-size: 1.2rem;
}

.contact-form input {
  width: 100%;
  padding: 0.75rem;
  padding-left: 2.5rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.contact-form input:focus {
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.contact-form input.has-error {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: block;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.submit-button,
.cancel-button {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button {
  background: #42b983;
  color: white;
}

.submit-button:hover:not(:disabled) {
  background: #3aa876;
  transform: translateY(-1px);
}

.cancel-button {
  background: #e9ecef;
  color: #2c3e50;
}

.cancel-button:hover {
  background: #dee2e6;
}

.form-feedback {
  margin-top: 1rem;
  text-align: center;
}

.loader-inline {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
  vertical-align: middle;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>