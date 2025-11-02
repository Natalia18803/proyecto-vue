<template>
  <div id="app">
    <div class="container">
      <h1>Mi Pokédex</h1>
      
      <div class="search-container">
        <input 
          v-model="pokemonId" 
          v-on:keyup.enter="buscarPokemon"
          type="number" 
          placeholder="ID del Pokémon (1-999)"
          min="1"
          max="999"
          class="search-input"
        >
        <button v-on:click="buscarPokemon" class="search-button">Buscar</button>
      </div>

      <div v-if="mostrarError" class="error-message">
        {{ mensajeError }}
      </div>

      <div v-if="cargando" class="loading">
        Cargando Pokémon...
      </div>

      <PokemonCard 
        v-if="pokemon && !cargando"
        :pokemon="pokemon"
        :debilidades="debilidades"
      />

      <div v-if="!pokemon && !cargando && !mostrarError" class="loading">
        Ingresa un ID del 1 al 999 para buscar un Pokémon
      </div>
    </div>
  </div>
</template>

<script>
import PokemonCard from './components/PokemonCard.vue'

export default {
  name: 'App',
  components: {
    PokemonCard
  },
  data() {
    return {
      pokemonId: '',
      pokemon: null,
      cargando: false,
      mostrarError: false,
      mensajeError: '',
      debilidades: []
    }
  },
  methods: {
    buscarPokemon() {
      const id = parseInt(this.pokemonId);
      if (isNaN(id) || id < 1 || id > 999) {
        this.mostrarError = true;
        this.mensajeError = 'Por favor, ingresa un número entre 1 y 999';
        this.pokemon = null;
        return;
      }

      this.cargando = true;
      this.mostrarError = false;
      this.pokemon = null;
      this.debilidades = [];

      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Pokémon no encontrado');
          }
          return response.json();
        })
        .then(data => {
          this.pokemon = data;
          this.obtenerDebilidades(data.types);
          this.cargando = false;
        })
        .catch(error => {
          this.mostrarError = true;
          this.mensajeError = error.message;
          this.cargando = false;
        });
    },

    obtenerDebilidades(tipos) {
      const promesasTipos = tipos.map(tipoInfo => 
        fetch(tipoInfo.type.url).then(res => res.json())
      );

      Promise.all(promesasTipos)
        .then(datosTipos => {
          const todasDebilidades = new Set();
          
          datosTipos.forEach(tipoData => {
            tipoData.damage_relations.double_damage_from.forEach(danio => {
              todasDebilidades.add(danio.name);
            });
          });

          this.debilidades = Array.from(todasDebilidades);
        })
        .catch(error => {
          console.error('Error obteniendo debilidades:', error);
          this.debilidades = [];
        });
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

h1 {
  text-align: center;
  color: #333;
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
  border: 2px solid #ddd;
  border-radius: 25px;
  font-size: 16px;
  width: 200px;
  text-align: center;
}

.search-button {
  padding: 12px 25px;
  background: #ff6b6b;
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