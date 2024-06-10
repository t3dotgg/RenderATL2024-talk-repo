import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col">
        <a href="/api/app" className="font-bold text-xl">
          Link to a totally normal Next app
        </a>
      </div>
    </main>
  );
}
