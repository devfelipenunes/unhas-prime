"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Service {
  servico: string;
  preco: number;
  count: number;
}

interface SavedData {
  name: string;
  services: Service[];
}

export default function Services(): JSX.Element {
  const [services, setServices] = useState<Service[]>([]);
  const [totalExercises, setTotalExercises] = useState<number>(0);
  const [selectedName, setSelectedName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // Recuperar o nome selecionado armazenado em localStorage
    const name: string | null = localStorage.getItem("selectedName");
    setSelectedName(name || "");

    // Recuperar os serviços salvos no localStorage de acordo com o nome selecionado
    const savedData: SavedData[] = JSON.parse(
      localStorage.getItem("savedData") || "[]"
    );
    const selectedServices: SavedData | undefined = savedData.find(
      (data) => data.name === name
    );
    if (selectedServices) {
      setServices(selectedServices.services);
    } else {
      const serviceList = [
        { servico: "Mão Simples", preco: 27.99, count: 0 },
        { servico: "Mão Simples (Segunda a Quarta)", preco: 31.99, count: 0 },
        { servico: "Cutilagem das mãos", preco: 24.99, count: 0 },
        { servico: "Esmaltação das Mãos", preco: 21.99, count: 0 },
        { servico: "Cortar e lixar", preco: 17.99, count: 0 },
        { servico: "Unha decorada p/ dedo", preco: 5.0, count: 0 },
        { servico: "Francesinha / adesivo", preco: 5.0, count: 0 },
        { servico: "Pé Simples", preco: 29.99, count: 0 },
        { servico: "Pé Simples (Segunda a Quarta)", preco: 34.99, count: 0 },
        { servico: "Cutilagem dos pés", preco: 28.99, count: 0 },
        { servico: "Esmaltação dos pés", preco: 21.99, count: 0 },
        { servico: "Cortar/lixar(unha dos pés)", preco: 17.99, count: 0 },
        { servico: "SPA dos pés Prime", preco: 59.99, count: 0 },
        {
          servico: "Mão e pé simples(Segunda a Quarta-feira)",
          preco: 47.99,
          count: 0,
        },
        {
          servico: "Mão e pé simples (Quinta a sábado)",
          preco: 51.99,
          count: 0,
        },
        { servico: "Pé + mão + Spa Prime", preco: 89.99, count: 0 },
        { servico: "Aplicação de Acrigel simples", preco: 164.99, count: 0 },
        { servico: "Manutenção de Acrigel simples", preco: 109.99, count: 0 },
        { servico: "Aplicação de fibra simples", preco: 179.99, count: 0 },
        { servico: "Manutenção de fibra simples", preco: 139.99, count: 0 },
        { servico: "Banho de gel simples", preco: 99.99, count: 0 },
        { servico: "Manutenção Banho de gel", preco: 99.99, count: 0 },
        { servico: "Postiça Simples", preco: 60.0, count: 0 },
        { servico: "Postiça Realista", preco: 80.0, count: 0 },
        { servico: "Esmaltação em gel", preco: 40.0, count: 0 },
        { servico: "Francesinha com esmalte em gel", preco: 35.0, count: 0 },
        { servico: "Babyboomer e Babyglitter(por dedo)", preco: 8.0, count: 0 },
        { servico: "Pedrinha", preco: 3.0, count: 0 },
        { servico: "Spaid gel", preco: 2.0, count: 0 },
        { servico: "Encapsulada (por dedo)", preco: 8.0, count: 0 },
        {
          servico: "Remoção de Alongamento e Banho de gel",
          preco: 29.99,
          count: 0,
        },
        { servico: "Remoção de Esmaltação em gel", preco: 25.0, count: 0 },
        { servico: "Troca de formato de Unha", preco: 15.0, count: 0 },
        {
          servico: "Manutenção de outra profissional tera um adicional",
          preco: 20.0,
          count: 0,
        },
        { servico: "Colocação (unidade)", preco: 10.0, count: 0 },
      ];
      setServices(serviceList);
    }
  }, [router]);

  const handleSave = () => {
    const savedData: SavedData[] = JSON.parse(
      localStorage.getItem("savedData") || "[]"
    );
    const newData: SavedData = {
      name: selectedName,
      services: services,
    };
    const updatedData: SavedData[] = [
      ...savedData.filter((data) => data.name !== selectedName),
      newData,
    ];
    localStorage.setItem("savedData", JSON.stringify(updatedData));
    router.push("/Sumary");
  };

  const handleServiceChange = (index: number, action: string) => {
    const updatedServices: Service[] = [...services];
    if (action === "increase") {
      updatedServices[index].count++;
      setTotalExercises(totalExercises + 1);
    } else if (action === "decrease" && updatedServices[index].count > 0) {
      updatedServices[index].count--;
      setTotalExercises(totalExercises - 1);
    }
    setServices(updatedServices);

    localStorage.setItem("services", JSON.stringify(updatedServices));
  };

  const renderServices = () => {
    return services.map((service, index) => (
      <div
        className="w-full bg-blue-500 text-black flex flex-row justify-between px-3 h-14 rounded text-2xl"
        key={index}
      >
        <div className="flex items-center">
          <span className="font-bold text-black">{service.servico}</span>
        </div>
        <div className="flex flex-row space-x-2 items-center">
          <button
            className="h-full w-7 bg-blue-700"
            onClick={() => handleServiceChange(index, "decrease")}
          >
            -
          </button>
          <span className="text-black font-bold">{service.count}</span>
          <button
            className="h-full w-7 bg-blue-700"
            onClick={() => handleServiceChange(index, "increase")}
          >
            +
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center py-11 text-black ">
      <div className="flex  items-center justify-center space-y-4 my-12 w-full bg-slate-300 p-5">
        <h2 className="text-3xl font-bold">{selectedName}'s Services</h2>
      </div>
      <div className="flex flex-col items-center justify-center space-y-4 my-12 w-full px-6">
        {renderServices()}
      </div>
      <button
        className=" bg-slate-300 flex flex-row justify-between p-5 rounded text-black"
        onClick={handleSave}
      >
        Salvar
      </button>
    </div>
  );
}
