"use client";

import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Collaborator = {
  id: string;
  nome: string;
};
export default function Home() {
  const [collaborator, setCollabator] = useState([]);
  const router = useRouter();

  const handleNameSelection = (id: string) => {
    localStorage.setItem("selectedName", id);
    router.push("/Collaborator");
  };

  useEffect(() => {
    api
      .get("/collaborators")
      .then((response) => {
        setCollabator(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <h1 className="text-3xl font-bold underline">Colaboradores</h1>
      <div className="flex flex-col items-center justify-center space-y-4 mt-12">
        {collaborator.map((collaborator: Collaborator) => (
          <button
            key={collaborator.id}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleNameSelection(collaborator.id)}
          >
            {collaborator.nome}
          </button>
        ))}
      </div>
    </div>
  );
}
