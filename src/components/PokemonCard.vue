<template>
  <div class="pokemon-card" :style="obtenerFondoGradienteLocal()">
    <div class="pokemon-header">
      <h2 class="pokemon-name">{{ pokemon.name }}</h2>
      <span class="pokemon-id">#{{ String(pokemon.id).padStart(3, '0') }}</span>
    </div>

    <div class="pokemon-image">
      <img 
        v-if="pokemon.sprites" 
        :src="pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites.front_default" 
        :alt="pokemon.name"
        class="pokemon-img"
      >
    </div>

    <div class="pokemon-types">
      <span
        v-for="tipoInfo in pokemon.types"
        :key="tipoInfo.slot"
        :class="['type-badge', 'type-' + tipoInfo.type.name]"
        :style="{ backgroundColor: coloresTipos[tipoInfo.type.name] }"
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
          <span class="stat-name" :style="{ color: coloresTipos[pokemon.types[0].type.name] }">{{ nombresEstadisticas[estadistica.stat.name] || estadistica.stat.name }}</span>
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

    <div v-if="pokemon.abilities && pokemon.abilities.length > 0" class="abilities-section">
      <h3>Habilidades</h3>
      <div class="abilities-grid">
        <div
          v-for="abilityInfo in pokemon.abilities"
          :key="abilityInfo.ability.name"
          class="ability-card"
          :style="{ backgroundColor: coloresHabilidades[abilityInfo.ability.name] || '#667eea' }"
        >
          <span class="ability-name">{{ abilityInfo.ability.name }}</span>
          <span v-if="abilityInfo.is_hidden" class="ability-hidden">Oculta</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { coloresTipos } from '../utils/coloresTipos.js'
import { obtenerFondoGradiente } from '../utils/functions.js'

const props = defineProps({
  pokemon: {
    type: Object,
    required: true
  },
  debilidades: {
    type: Array,
    default: () => []
  }
})

const nombresEstadisticas = {
  'hp': 'HP',
  'attack': 'Ataque',
  'defense': 'Defensa',
  'special-attack': 'Ataque Especial',
  'special-defense': 'Defensa Especial',
  'speed': 'Velocidad'
}

const coloresHabilidades = {
  'overgrow': '#78C850', // Grass
  'chlorophyll': '#78C850',
  'blaze': '#F08030', // Fire
  'solar-power': '#F08030',
  'torrent': '#6890F0', // Water
  'rain-dish': '#6890F0',
  'swarm': '#A8B820', // Bug
  'compound-eyes': '#A8B820',
  'static': '#F8D030', // Electric
  'lightning-rod': '#F8D030',
  'levitate': '#705898', // Ghost
  'keen-eye': '#A890F0', // Flying
  'tangled-feet': '#A890F0',
  'run-away': '#C03028', // Normal (run related)
  'pickup': '#A8A878',
  'intimidate': '#705848', // Dark
  'shed-skin': '#A040A0', // Poison
  'moxie': '#705848',
  'justified': '#C03028', // Fighting
  'speed-boost': '#F85888', // Psychic (speed)
  'wonder-guard': '#F85888',
  'thick-fat': '#B8A038', // Rock
  'arena-trap': '#E0C068', // Ground
  'pickup': '#B8B8D0', // Steel
  'cute-charm': '#EE99AC', // Fairy
  'hustle': '#A8A878', // Normal (speed related)
  'sniper': '#A040A0', // Poison
  'damp': '#6890F0', // Water
  'limber': '#C03028', // Fighting
  'imposter': '#705898', // Ghost
  'infiltrator': '#705898',
  'stance-change': '#C03028', // Fighting
  'water-absorb': '#6890F0', // Water
  'volt-absorb': '#F8D030', // Electric
  'flash-fire': '#F08030', // Fire
  'sap-sipper': '#78C850', // Grass
  'telepathy': '#F85888', // Psychic
  'big-pecks': '#A890F0', // Flying
  'sand-rush': '#E0C068', // Ground
  'healer': '#EE99AC', // Fairy
  'aurora-veil': '#98D8D8', // Ice
  'shell-armor': '#B8A038', // Rock
  'battle-armor': '#B8A038',
  'weak-armor': '#B8A038',
  'rivalry': '#A8A878', // Normal
  'steadfast': '#C03028', // Fighting
  'inner-focus': '#A8A878', // Normal
  'infiltrator': '#705898', // Ghost
  'own-tempo': '#F85888', // Psychic
  'oblivious': '#F85888',
  'forewarn': '#F85888',
  'dry-skin': '#78C850', // Grass
  'scrappy': '#C03028', // Fighting
  'storm-drain': '#78C850', // Grass
  'ice-body': '#98D8D8', // Ice
  'solid-rock': '#B8A038', // Rock
  'snow-warning': '#98D8D8', // Ice
  'honey-gather': '#A8B820', // Bug
  'frisk': '#705898', // Ghost
  'reckless': '#C03028', // Fighting
  'multitype': '#7038F8', // Dragon
  'flower-gift': '#78C850', // Grass
  'bad-dreams': '#705898', // Ghost
  'pickpocket': '#705848', // Dark
  'sheer-force': '#A8A878', // Normal
  'contrary': '#A040A0', // Poison
  'unnerve': '#705848', // Dark
  'defiant': '#C03028', // Fighting
  'defeatist': '#A8A878', // Normal
  'cursed-body': '#705898', // Ghost
  'healer': '#EE99AC', // Fairy
  'friend-guard': '#EE99AC',
  'weak-armor': '#B8A038', // Rock
  'heavy-metal': '#B8B8D0', // Steel
  'light-metal': '#B8B8D0',
  'multiscale': '#7038F8', // Dragon
  'toxic-boost': '#A040A0', // Poison
  'flare-boost': '#F08030', // Fire
  'harvest': '#78C850', // Grass
  'telepathy': '#F85888', // Psychic
  'moody': '#705848', // Dark
  'overcoat': '#A8B820', // Bug
  'poison-touch': '#A040A0', // Poison
  'regenerator': '#78C850', // Grass
  'big-pecks': '#A890F0', // Flying
  'sand-rush': '#E0C068', // Ground
  'wonder-skin': '#F85888', // Psychic
  'analytic': '#A8A878', // Normal
  'illusion': '#705898', // Ghost
  'competitive': '#F85888', // Psychic
  'cursed-body': '#705898', // Ghost
  'magic-guard': '#EE99AC', // Fairy
  'no-guard': '#C03028', // Fighting
  'stance-change': '#C03028', // Fighting
  'adaptability': '#A8A878', // Normal
  'download': '#A8A878', // Normal
  'anger-point': '#C03028', // Fighting
  'anticipation': '#A8A878', // Normal
  'forewarn': '#F85888', // Psychic
  'gluttony': '#A8A878', // Normal
  'hydration': '#6890F0', // Water
  'ice-body': '#98D8D8', // Ice
  'iron-fist': '#B8B8D0', // Steel
  'klutz': '#A8A878', // Normal
  'leaf-guard': '#78C850', // Grass
  'motor-drive': '#F8D030', // Electric
  'normalize': '#A8A878', // Normal
  'poison-heal': '#A040A0', // Poison
  'quick-feet': '#A040A0', // Poison
  'rain-dish': '#6890F0', // Water
  'reckless': '#C03028', // Fighting
  'rivalry': '#A8A878', // Normal
  'scrappy': '#C03028', // Fighting
  'simple': '#A8A878', // Normal
  'skill-link': '#A8A878', // Normal
  'slow-start': '#A8A878', // Normal
  'sniper': '#A040A0', // Poison
  'snow-cloak': '#98D8D8', // Ice
  'snow-warning': '#98D8D8', // Ice
  'solar-power': '#F08030', // Fire
  'soundproof': '#A8A878', // Normal
  'speed-boost': '#F85888', // Psychic
  'stall': '#A8A878', // Normal
  'steadfast': '#C03028', // Fighting
  'storm-drain': '#78C850', // Grass
  'sturdy': '#B8A038', // Rock
  'super-luck': '#A8A878', // Normal
  'tangled-feet': '#A890F0', // Flying
  'technician': '#A8A878', // Normal
  'tinted-lens': '#A8A878', // Normal
  'truant': '#A8A878', // Normal
  'unaware': '#A8A878', // Normal
  'unburden': '#A8A878', // Normal
  'victory-star': '#A8A878', // Normal
  'vital-spirit': '#A8A878', // Normal
  'volt-absorb': '#F8D030', // Electric
  'water-veil': '#6890F0', // Water
  'weak-armor': '#B8A038', // Rock
  'white-smoke': '#A8A878', // Normal
  'wonder-guard': '#F85888', // Psychic
  'zen-mode': '#F85888' // Psychic
}

function obtenerFondoGradienteLocal() {
  return obtenerFondoGradiente(props.pokemon, coloresTipos)
}
</script>

<style scoped>
.pokemon-card {
  background: rgba(236, 234, 234, 0.486);
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  max-width: 400px;
  margin: 0 auto;
}

.pokemon-header {
  text-align: center;
  margin-bottom: 20px;
}

.pokemon-name {
  font-size: 2em;
  margin: 0;
  text-transform: capitalize;
  color: #333;
}

.pokemon-id {
  color: #666;
  font-weight: bold;
}

.pokemon-image {
  text-align: center;
  margin-bottom: 20px;
}

.pokemon-img {
  width: 210px;
  height: 210px;
  object-fit: contain;
}

.pokemon-types, .weaknesses-section, .stats-section, .abilities-section {
  margin-bottom: 20px;
}

.pokemon-types, .weaknesses-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.type-badge {
  padding: 8px 20px;
  border-radius: 20px;
  color: rgb(156, 156, 156);
  font-weight: bold;
  text-transform: capitalize;
  font-size: 14px;
  display: inline-block;
}

.stats-section h3, .weaknesses-section h3, .abilities-section h3 {
  margin-bottom: 10px;
  color: #333;
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 10px;
  font-size: 14px;
}

.stat-name {
  font-weight: bold;
}

.stat-value {
  color: #666;
}

.abilities-section {
  margin-top: 20px;
}

.abilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
}

.ability-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 16px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.ability-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.ability-card:hover::before {
  left: 100%;
}

.ability-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
}

.ability-name {
  display: block;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 14px;
  margin-bottom: 4px;
}

.ability-hidden {
  font-size: 12px;
  opacity: 0.8;
  font-style: italic;
}
</style>
