<template>
  <div id="app">
    <div class="container">
      <h1>Elige pokemon!! </h1>

      <div class="search-container">
        <input
          v-model="pokemonId"
          v-on:keyup.enter="buscarPokemonLocal"
          type="number"
          placeholder="ID del Pokémon (1-999)"
          min="1"
          max="999"
          class="search-input"
        >
        <button v-on:click="buscarPokemonLocal" class="search-button">Buscar</button>
      </div>

      <div v-if="mostrarError" class="error-message">
        {{ mensajeError }}
      </div>

      <div v-if="cargando" class="loading">
        Cargando Pokémon...
      </div>

      <PokemonCard v-if="pokemon && !cargando" :pokemon="pokemon" :debilidades="debilidades" />

      <div v-if="!pokemon && !cargando && !mostrarError" class="loading">
        Ingresa un ID del 1 al 999 para buscar un Pokémon
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PokemonCard from './components/PokemonCard.vue'
import { buscarPokemon } from './utils/functions.js'

const pokemonId = ref('')
const pokemon = ref(null)
const cargando = ref(false)
const mostrarError = ref(false)
const mensajeError = ref('')
const debilidades = ref([])

function buscarPokemonLocal() {
  buscarPokemon(pokemonId, mostrarError, mensajeError, pokemon, cargando, debilidades)
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Rackety DEMO';
}

body {
  background: url(/imgPokemon.jpg) no-repeat, center;
  min-height: 100vh;
  padding: 30px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

h1 {
  text-align: center;
  color: #42373fff;
  margin-bottom: 30px;
  font-size: 2.5em;
}

.search-container {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  justify-content: center;
}

.search-input {
  padding: 12px 20px;
  border: 2px solid #99999942;
  border-radius: 25px;
  font-size: 16px;
  width: 1500px;
  text-align: center;
}

.search-button {
  padding: 12px 25px;
  background: #fd8787ff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.search-button:hover {
  background: #ff5252;
}

.error-message {
  background: #ffebee;
  color: #c62828;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 1.2em;
  color: #666;
}
</style>