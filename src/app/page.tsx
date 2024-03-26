"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  // const [selectedName, setSelectedName] = useState("");
  const router = useRouter();

  const handleNameSelection = (name: string) => {
    localStorage.setItem("selectedName", name);
    router.push("/Services");
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <h1 className="text-3xl font-bold underline">Colaboradores</h1>
      <div className="flex flex-col items-center justify-center space-y-4 mt-12">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleNameSelection("Cacau")}
        >
          Cacau
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleNameSelection("Conceição")}
        >
          Conceição
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleNameSelection("Juliana")}
        >
          Juliana
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleNameSelection("Ester")}
        >
          Ester
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleNameSelection("Verônica")}
        >
          Verônica
        </button>
      </div>
    </div>
  );
}
