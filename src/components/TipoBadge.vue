<template>
  <span
    :class="['type-badge', 'type-' + tipo]"
    :style="{ backgroundColor: coloresTipos[tipo] || '#777' }"
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
  data() {
    return {
      coloresTipos
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
}

.type-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
