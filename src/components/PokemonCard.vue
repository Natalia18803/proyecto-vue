<template>
  <div class="pokemon-card" :style="fondoGradiente">
    <div class="pokemon-header">
      <h2 class="pokemon-name">{{ pokemon.name }}</h2>
      <span class="pokemon-id">#{{ pokemon.id.toString().padStart(3, '0') }}</span>
    </div>

    <div class="pokemon-image">
      <img 
        v-if="pokemon.sprites" 
        :src="pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default" 
        :alt="pokemon.name"
        class="pokemon-img"
      >
    </div>

    <div class="pokemon-types">
      <span 
        v-for="tipoInfo in pokemon.types" 
        :key="tipoInfo.slot"
        :class="['type-badge', 'type-' + tipoInfo.type.name]"
      >
        {{ tipoInfo.type.name }}
      </span>
    </div>

    <div class="stats-section">
      <h3>Estadísticas</h3>
      <div class="stats-grid">
        <div 
          v-for="estadistica in pokemon.stats" 
          :key="estadistica.stat.name"
          class="stat-item"
        >
          <span class="stat-name">{{ obtenerNombreEstadistica(estadistica.stat.name) }}</span>
          <span class="stat-value">{{ estadistica.base_stat }}</span>
        </div>
      </div>
    </div>

    <div v-if="debilidades.length > 0" class="weaknesses-section">
      <h3>Debilidades</h3>
      <div class="weaknesses-grid">
        <span 
          v-for="debilidad in debilidades" 
          :key="debilidad"
          :class="['type-badge', 'type-' + debilidad]"
        >
          {{ debilidad }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { coloresTipos } from '../utils/coloresTipos.js'

export default {
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object,
      required: true
    },
    debilidades: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    fondoGradiente() {
      const tipos = this.pokemon.types;
      if (tipos.length === 1) {
        const color = coloresTipos[tipos[0].type.name];
        return {
          background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`
        };
      } else if (tipos.length === 2) {
        const color1 = coloresTipos[tipos[0].type.name];
        const color2 = coloresTipos[tipos[1].type.name];
        return {
          background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`
        };
      }
      return {
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      };
    }
  },
  methods: {
    obtenerNombreEstadistica(nombre) {
      const nombres = {
        'hp': 'HP',
        'attack': 'Ataque',
        'defense': 'Defensa',
        'special-attack': 'Ataque Especial',
        'special-defense': 'Defensa Especial',
        'speed': 'Velocidad'
      };
      return nombres[nombre] || nombre;
    }
  }
}
</script>

<style scoped>
.pokemon-card {
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.pokemon-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.pokemon-name {
  font-size: 2em;
  text-transform: capitalize;
}

.pokemon-id {
  background: rgba(0,0,0,0.3);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: bold;
}

.pokemon-image {
  margin: 20px 0;
}

.pokemon-img {
  width: 200px;
  height: 200px;
  object-fit: contain;
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
}

.pokemon-types {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.type-badge {
  padding: 8px 20px;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 14px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.3);
}

.stats-section {
  margin-top: 30px;
}

.stats-section h3 {
  margin-bottom: 20px;
  font-size: 1.5em;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.stat-item {
  background: rgba(255,255,255,0.2);
  padding: 15px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.3);
}

.stat-name {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  text-transform: capitalize;
}

.stat-value {
  font-size: 1.2em;
  font-weight: bold;
}

.weaknesses-section {
  margin-top: 20px;
}

.weaknesses-section h3 {
  margin-bottom: 15px;
  font-size: 1.5em;
}

.weaknesses-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
</style>