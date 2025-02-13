"use client";
import { useState } from "react";
import Image from "next/image";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`;

export default function Home() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchRandomMovie() {
    if (!API_KEY) {
      setError("Erro: API Key não definida!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        setMovie(data.results[randomIndex]);
      } else {
        setError("Nenhum filme encontrado.");
      }
    } catch (error) {
      setError("Erro ao buscar filme. Tente novamente.");
      console.error("Erro ao buscar filme:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 gap-4 justify-center items-center">
        <Image src="/logo.svg" alt="Next.js logo" width={100} height={38} priority />

        <p className="text-2xl lg:text-3xl xl:text-4xl font-bold">Não sabe o que assistir?</p>

        {/* Exibe erro, se houver */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Exibe filme aleatório */}
        {movie && !loading && (
          <div className="flex gap-x-4 border p-4 rounded-lg shadow-md w-full max-w-md bg-gray-800 text-white">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={100}
              height={150}
              className="rounded-lg"
            />
            <div>
              <strong className="block text-lg">{movie.title}</strong>
              <p className="text-sm line-clamp-3">{movie.overview}</p>
            </div>
          </div>
        )}

        {/* Botão para buscar filme */}
        <button
          onClick={fetchRandomMovie}
          disabled={loading}
          className="md:text-xl flex items-center gap-x-4 rounded-lg bg-[#E9E6E3] px-5 py-2 text-sm font-semibold text-white transition hover:scale-90 hover:bg-[#ccc9c6] md:px-6 md:py-3 shadow-md"
        >
          {loading ? "Carregando..." : "Encontrar filme"}
        </button>

        <p className="mt-1 px-1 sm:mt-2 sm:px-2.5 text-xs sm:text-sm text-center">
          Clique em <strong>"Encontrar filme"</strong> que traremos informações de algum filme para você assistir hoje.
        </p>
      </main>
    </div>
  );
}
