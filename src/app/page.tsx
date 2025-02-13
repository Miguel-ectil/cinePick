import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 gap-4 justify-center items-center ">
        <Image
          className=""
          src="/logo.svg"
          alt="Next.js logo"
          width={100}
          height={38}
          priority
        />
        <p className="text-2xl lg:text-3xl xl:text-4xl font-bold">Não sabe o que assistir?</p>
        <button
          className="md:text-xl flex items-center gap-x-4 rounded-lg bg-[#E9E6E3] px-5 py-2 text-sm font-semibold text-white transition hover:scale-90 hover:bg-[#ccc9c6] md:px-6 md:py-3 shadow-md"
        >
          <Image src="/logo.svg" width={28} height={26} alt="CV" className="rounded-lg" />
          <span className='flex w-full justify-center items-center text-black'>Encontrar filme</span>
          </button>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
