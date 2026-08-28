"use client";

import React, { useEffect, useState, useMemo } from "react";
import styles from "./PokemonComponent.module.css";
import Image from "next/image";

/**
 * PokemonComponent (Next.js)
 * - Trae los primeros 151 pokémon
 * - Búsqueda, filtrado por tipo, paginación
 * - Recibe la prop darkMode para aplicar estilos oscuros
 */
export default function PokemonComponent({ darkMode }) {
  const [todosLosPokemons, setTodosLosPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [paginaActual, setPaginaActual] = useState(1);
  const pokemonsPorPagina = 20;

  const [filtroTipo, setFiltroTipo] = useState("ver-todos");
  const [busqueda, setBusqueda] = useState("");

  const tiposDisponibles = [
    "ver-todos","normal","fire","water","grass","electric","ice","fighting",
    "poison","ground","flying","psychic","bug","rock","ghost","dragon","steel","fairy"
  ];

  // Fetch: obtengo la lista de 151 pokémon.
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function cargarPokemons() {
      try {
        setLoading(true);
        const listRes = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`, { signal: controller.signal });
        if (!listRes.ok) throw new Error("Error al obtener la lista de pokémon");
        const listJson = await listRes.json();

        const detailPromises = listJson.results.map(r =>
          fetch(r.url, { signal: controller.signal }).then(res => {
            if (!res.ok) throw new Error("Error al obtener detalle");
            return res.json();
          })
        );

        const settled = await Promise.allSettled(detailPromises);
        const pokes = settled
          .filter(s => s.status === "fulfilled")
          .map(s => s.value);

        if (mounted) {
          setTodosLosPokemons(pokes);
          setLoading(false);
        }
      } catch (err) {
        if (mounted && err.name !== "AbortError") {
          setError(err.message || "Error al cargar pokemons");
          setLoading(false);
        }
      }
    }

    cargarPokemons();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  // Filtrado por tipo y búsqueda (memoizado)
  const pokemonsFiltrados = useMemo(() => {
    if (!todosLosPokemons || todosLosPokemons.length === 0) return [];

    let lista = todosLosPokemons;

    const q = busqueda.trim().toLowerCase();
    if (q !== "") {
      lista = lista.filter(
        (p) => p.name.includes(q) || p.id.toString() === q
      );
    }

    if (filtroTipo && filtroTipo !== "ver-todos") {
      lista = lista.filter((p) =>
        p.types.some((t) => t.type.name === filtroTipo)
      );
    }

    return lista;
  }, [todosLosPokemons, filtroTipo, busqueda]);

  // totalPaginas derivado
  const totalPaginas = Math.max(1, Math.ceil(pokemonsFiltrados.length / pokemonsPorPagina));

  // Página segura derivada
  const safePaginaActual = Math.min(Math.max(1, paginaActual), totalPaginas);

  const pokemonsPagina = useMemo(() => {
    const inicio = (safePaginaActual - 1) * pokemonsPorPagina;
    return pokemonsFiltrados.slice(inicio, inicio + pokemonsPorPagina);
  }, [pokemonsFiltrados, safePaginaActual]);

  const formatId = (id) => id.toString().padStart(3, "0");

  return (
    <div className={`${styles.pokemonView} ${darkMode ? styles.dark : ""}`}>
      {/* Toolbar interna */}
      <div className={styles.toolbar}>
        <div className={styles.pokemonLogo}>
                  <Image
            src="/logo.png"
            alt="Logo Pokédex"
            width={36}
            height={36}
            className={styles.logoImg}
          />
          <h2 className={styles.title}>Pokédex</h2>
        </div>

        <nav className={styles.navList} aria-label="Filtros por tipo">
          {tiposDisponibles.map((tipo) => {
            const isActive = filtroTipo === tipo;
            const tipoClass = styles[tipo] ? styles[tipo] : "";
            return (
              <button
                key={tipo}
                id={tipo}
                className={`${styles.btnHeader} ${tipoClass}`}
                onClick={() => {
                  setFiltroTipo(tipo);
                  setPaginaActual(1);
                }}
                aria-pressed={isActive}
              >
                {tipo === "ver-todos" ? "Ver todos" : tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Buscador */}
      <section className={styles.buscador}>
        <input
          type="text"
          id="buscador"
          placeholder="Buscar por nombre o número"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1);
          }}
          className={styles.buscadorInput}
          aria-label="Buscar pokémon por nombre o número"
        />
      </section>

      {loading && <p className={styles.loadingText}>Cargando pokémon...</p>}
      {error && <p className={styles.errorText}>{error}</p>}

      {/* Contenedor de Pokémon */}
      <div id="todos">
        <div className={styles.pokemonTodos} id="listaPokemon">
          {pokemonsPagina.map((poke) => {
            const pokeId = formatId(poke.id);
            return (
              <article key={poke.id} className={styles.pokemon}>
                <p className={styles.pokemonIdBack}>#{pokeId}</p>

                <div className={styles.pokemonImagen}>
                 <Image
  src={poke.sprites.other["official-artwork"].front_default}
  alt={poke.name}
  width={96}
  height={96}
  className={styles.pokeImg}
/>
                </div>

                <div className={styles.pokemonInfo}>
                  <div className={styles.nombreContenedor}>
                    <p className={styles.pokemonId}>#{pokeId}</p>
                    <h3 className={styles.pokemonNombre}>{poke.name}</h3>
                  </div>

                  <div className={styles.pokemonTipos}>
                    {poke.types.map((t) => {
                      const typeName = t.type.name;
                      const typeClass = styles[typeName] ? styles[typeName] : "";
                      return (
                        <span key={typeName} className={`${styles.tipo} ${typeClass}`}>
                          {typeName}
                        </span>
                      );
                    })}
                  </div>

                  <div className={styles.pokemonStats}>
                    <p className={styles.stat}>{poke.height}m</p>
                    <p className={styles.stat}>{poke.weight}kg</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Paginación */}
      <section className={styles.paginacion} aria-label="Paginación">
        <button
          id="btn-prev"
          onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
          disabled={safePaginaActual <= 1}
          className={styles.pageButton}
        >
          Anterior
        </button>

        <span id="contador" className={styles.contador}>
          Página {safePaginaActual} de {totalPaginas}
        </span>

        <button
          id="btn-next"
          onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
          disabled={safePaginaActual >= totalPaginas}
          className={styles.pageButton}
        >
          Siguiente
        </button>
      </section>
    </div>
  );
}
