"use client";
import { useState } from "react";
import Image from "next/image";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
};

export default function Home() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shownMovies, setShownMovies] = useState<number[]>([]);
  const [allMoviesShown, setAllMoviesShown] = useState(false); 

  async function fetchRandomMovie() {
    try {
      setLoading(true);
      setError("");
      setAllMoviesShown(false);
      console.log("API_URL:", process.env.NEXT_PUBLIC_API_URL);

      const response = await fetch(`${API_URL}${API_KEY}&language=pt-BR&page=1`);
      const data = await response.json();
      
      if (!data.results || data.results.length === 0) {
        setMovie(null);
        return;
      }

      const availableMovies = data.results.filter(
        (movie: Movie) => !shownMovies.includes(movie.id)
      );

      if (availableMovies.length === 0) {
        setMovie(null);
        setAllMoviesShown(true);
      } else {
        const randomIndex = Math.floor(Math.random() * availableMovies.length);
        const selectedMovie = availableMovies[randomIndex];

        setShownMovies((prev) => [...prev, selectedMovie.id]);
        setMovie(selectedMovie);
      }
    } catch (error) {
      console.error("Erro ao buscar filme:", error);
      setError("Erro ao buscar filme. Tente novamente.");
      setMovie(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16 sm:p-20 px-2">
      <main className="flex flex-col row-start-2 gap-y-4 justify-center items-center">
        <Image src="/logo.svg" alt="Next.js logo" width={100} height={38} priority />

        <p className="text-3xl lg:text-4xl xl:text-5xl font-bold">
          Não sabe o que assistir?
        </p>

        {error && <p className="text-red-500">{error}</p>}

        {movie && !loading ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-2 text-center sm:text-left rounded-lg shadow-md w-full max-w-lg text-white mt-1 xl:mt-14">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={180}
              height={260}
              className="w-32 sm:w-[180px] h-auto rounded-md object-cover transition hover:scale-110"
            />
            <div className="sm:ml-4 mt-4 xl:mt-0">
              <strong className="block font text-xl">{movie.title}</strong>
              <p className="text-md text-gray-300 px-14 sm:px-0 md:px-0 lg:px-0 xl:px-0 mt-2">{movie.overview}</p>
            </div>
          </div>
        ) : allMoviesShown ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-2 text-center sm:text-left rounded-lg shadow-md w-full max-w-lg text-white mt-1 xl:mt-14">
            <Image src="/poster.png" alt="Ícone de filme" width={180} height={240} />
            <div className="sm:ml-4">
              <p className="text-2xl font-bold text-gray-300 px-1 mt-2">
                Ops, hoje não é dia de assistir filme. Bora codar! 🚀
              </p>
            </div>
          </div>
        ) : null}

        <button
          onClick={fetchRandomMovie}
          // disabled={loading}
          className="md:text-xl flex items-center gap-x-4 rounded-lg bg-[#E9E6E3] px-5 py-2 text-sm font-semibold text-white transition hover:scale-90 hover:bg-[#ccc9c6] md:px-6 md:py-3 shadow-md mt-1 xl:mt-10"
        >
          <Image src="/logo.svg" alt="Ícone de filme" width={26} height={24} />
          <span className="text-black">{loading ? "Carregando..." : "Encontrar filme"}</span>
        </button>

        <p className="mt-1 px-1 sm:mt-2 sm:px-3 text-sm sm:text-sm text-center">
          Clique em <strong>&quot;Encontrar filme&quot;</strong> que traremos informações de algum filme para você assistir hoje.
        </p>
      </main>
    </div>
  );
}
