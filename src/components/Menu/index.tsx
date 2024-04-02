"use client";

import { useRouter } from "next/navigation";

export default function Menu() {
  const router = useRouter();

  return (
    <div className="w-full bg-slate-300 absolute bottom-0 h-12 flex flex-row justify-center items-center space-x-7">
      <button onClick={() => router.push("/")}>
        <p>Home</p>
      </button>
      <button onClick={() => router.push("/")}>
        <p>Colaboradoras</p>
      </button>
      <button onClick={() => router.push("/Sumary")}>
        <p>Extrato</p>
      </button>
    </div>
  );
}
