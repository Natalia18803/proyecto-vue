export function buscarPokemon(pokemonIdRef, mostrarErrorRef, mensajeErrorRef, pokemonRef, cargandoRef, debilidadesRef) {
  const query = pokemonIdRef.value.trim();
  if (!query) {
    mostrarErrorRef.value = true;
    mensajeErrorRef.value = 'Por favor, ingresa un nombre o ID del Pokémon';
    pokemonRef.value = null;
    return;
  }

  // Si es un número, validar rango
  const id = parseInt(query);
  if (!isNaN(id) && (id < 1 || id > 999)) {
    mostrarErrorRef.value = true;
    mensajeErrorRef.value = 'Por favor, ingresa un ID válido entre 1 y 999';
    pokemonRef.value = null;
    return;
  }

  cargandoRef.value = true;
  mostrarErrorRef.value = false;
  pokemonRef.value = null;
  debilidadesRef.value = [];

  fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Pokémon no encontrado');
      }
      return response.json();
    })
    .then(data => {
      pokemonRef.value = data;
      obtenerDebilidades(data.types, debilidadesRef);
      cargandoRef.value = false;
    })
    .catch(error => {
      mostrarErrorRef.value = true;
      mensajeErrorRef.value = error.message;
      cargandoRef.value = false;
    });
}

function obtenerDebilidades(tipos, debilidadesRef) {
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

      debilidadesRef.value = Array.from(todasDebilidades);
    })
    .catch(error => {
      console.error('Error obteniendo debilidades:', error);
      debilidadesRef.value = [];
    });
}

export function obtenerFondoGradiente(pokemon, coloresTipos) {
  const tipos = pokemon.types;
  if (tipos.length === 1) {
    const color = coloresTipos[tipos[0].type.name];
    return {
      background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`
    };
  } else {
    const colors = tipos.map(tipo => coloresTipos[tipo.type.name]);
    return {
      background: `linear-gradient(135deg, ${colors.join(', ')})`
    };
  }
}
