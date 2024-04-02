"use client";

import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Service {
  id: string;
  nome: string;
  preco: number;
}

interface SavedData {
  name: string;
  services: Service[];
}
export default function Services(): JSX.Element {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedName, setSelectedName] = useState<string>("");

  useEffect(() => {
    api
      .get("/servicos")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSave = () => {
    if (!selectedService) {
      console.log("Nenhum serviço selecionado");
      return;
    }

    const collaboradorId = localStorage.getItem("selectedName");
    console.log(collaboradorId);

    api
      .post("/sales", {
        collaboratorId: collaboradorId,
        servicoId: selectedService.id,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // router.push("/Sumary");
  };

  return (
    <div className="flex flex-col items-center justify-center py-11 text-black ">
      <div className="flex  items-center justify-center space-y-4 my-12 w-full bg-slate-300 p-5">
        <h2 className="text-3xl font-bold">{selectedName}'s Services</h2>
      </div>

      {services.map((service: Service, index) => (
        <button
          key={index}
          className={`flex flex-row justify-between p-5 rounded bg-slate-300 ${
            selectedService === service ? "bg-green-500" : ""
          }`}
          onClick={() => setSelectedService(service)}
        >
          <p>{service.nome}</p>
          <p>{service.preco}</p>
        </button>
      ))}
      <button
        className=" bg-slate-300 flex flex-row justify-between p-5 rounded text-black"
        onClick={handleSave}
      >
        Salvar
      </button>
    </div>
  );
}
