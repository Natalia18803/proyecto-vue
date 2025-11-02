<template>
  <span 
    :class="['type-badge', 'type-' + tipo]"
    :style="{ backgroundColor: color }"
  >
    {{ tipo }}
  </span>
</template>

<script>
import { coloresTipos } from '../utils/coloresTipos.js'

export default {
  name: 'TipoBadge',
  props: {
    tipo: {
      type: String,
      required: true
    }
  },
  computed: {
    color() {
      return coloresTipos[this.tipo] || '#777';
    }
  }
}
</script>

<style scoped>
.type-badge {
  padding: 8px 20px;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 14px;
  display: inline-block;
}
</style>