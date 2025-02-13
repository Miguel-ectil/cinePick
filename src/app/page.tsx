import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 gap-8 justify-center items-center ">
        <Image
          className=""
          src="/logo.svg"
          alt="Next.js logo"
          width={100}
          height={38}
          priority
        />
        <p className="text-2xl lg:text-3xl xl:text-4xl  font-bold">Não sabe o que assistir?</p>
        
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
