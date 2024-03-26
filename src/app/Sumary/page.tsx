"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Summary() {
  const [storedData, setStoredData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null); // Alteração: Inicializar currentIndex como null
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = JSON.parse(localStorage.getItem("savedData"));
      if (savedData) {
        setStoredData(savedData);
      }
    }
  }, []);

  // Função para calcular o valor total dos serviços
  const calculateTotal = (services) => {
    return services.reduce((total, service) => {
      return total + service.count * service.preco;
    }, 0);
  };

  // Função para calcular o valor que a manicure receberá (35% do valor total)
  const calculateManicureShare = (total) => {
    const manicureShare = total * 0.35;
    return manicureShare.toFixed(2).replace(".", ",");
  };

  // Função para formatar o valor com vírgula e duas casas decimais
  const formatValue = (value) => {
    return value.toFixed(2).replace(".", ",");
  };

  const goBack = () => {
    router.push("/");
  };

  const handleNameClick = (index) => {
    setCurrentIndex(index === currentIndex ? null : index); // Alteração: Alternar currentIndex entre o índice atual e null se já estiver selecionado
  };

  return (
    <div className="flex flex-col justify-center items-center w-full p-4 text-black">
      <h1>Summary</h1>
      <div className="my-4 w-full">
        {storedData.map((data, index) => {
          const total = calculateTotal(data.services);
          const formattedTotal = formatValue(total);
          const manicureShare = calculateManicureShare(total);
          return (
            <div
              className="w-full my-5"
              key={index}
            >
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-row justify-between w-full"
                onClick={() => handleNameClick(index)}
              >
                <h2>{data.name}</h2>
                <div>{currentIndex === index ? "▲" : "▼"}</div>
              </button>
              {currentIndex === index && ( // Alteração: Renderizar o conteúdo apenas se currentIndex corresponder ao índice atual
                <div className="flex flex-col justify-between w-full bg-slate-300">
                  <ul className="py-4">
                    {data.services
                      .filter((service) => service.count > 0)
                      .map((service, idx) => (
                        <li key={idx}>
                          ({service.count}) {service.servico}:{" "}
                          {formatValue(service.count * service.preco)}
                        </li>
                      ))}
                  </ul>
                  <div className="py-4 w-full bg-slate-500">
                    <p>Total: {formattedTotal}</p>
                    <p>Manicure receberá: {manicureShare}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => goBack()}
      >
        Home
      </button>
    </div>
  );
}
