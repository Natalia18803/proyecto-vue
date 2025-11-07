export function buscarPokemon(pokemonIdRef, mostrarErrorRef, mensajeErrorRef, pokemonRef, cargandoRef, debilidadesRef) {
  const id = parseInt(pokemonIdRef.value);
  if (isNaN(id) || id < 1 || id > 999) {
    mostrarErrorRef.value = true;
    mensajeErrorRef.value = 'Por favor, ingresa un número entre 1 y 999';
    pokemonRef.value = null;
    return;
  }

  cargandoRef.value = true;
  mostrarErrorRef.value = false;
  pokemonRef.value = null;
  debilidadesRef.value = [];

  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
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
