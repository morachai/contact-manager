<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-brand">📘 Contact Manager</div>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Contacts</router-link>
        <router-link to="/add" class="nav-link">Add Contact</router-link>
      </div>
    </nav>
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
/* Styles globaux */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}

#app {
  min-height: 100vh;
  background: #f8f9fa;
}

/* Navbar styles */
.navbar {
  background: #ffffff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: #2c3e50;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: #e9ecef;
  color: #42b983;
}

.main-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 600;
}

/* Styles pour la liste de contacts */
.contact-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.contact-item {
  background: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.contact-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.contact-item h3 {
  color: #2c3e50;
  margin-bottom: 5px;
}

.contact-item p {
  margin: 5px 0;
  color: #555;
}

/* Styles pour les boutons */
button {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

button:hover {
  background: #369f6e;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Styles pour le formulaire */
form {
  background: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #42b983;
  outline: none;
}

/* Messages d'état */
.error {
  color: #e74c3c;
  margin-top: 10px;
}

.success {
  color: #42b983;
  margin-top: 10px;
}

/* Loader (animation de chargement) */
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b983;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>