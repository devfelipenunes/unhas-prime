"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Service {
  servico: string;
  preco: number;
  count: number;
}

interface StoredData {
  name: string;
  services: Service[];
}

export default function Summary(): JSX.Element {
  const [storedData, setStoredData] = useState<StoredData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData: StoredData[] = JSON.parse(
        localStorage.getItem("savedData") || "[]"
      );
      if (savedData) {
        setStoredData(savedData);
      }
    }
  }, []);

  const calculateTotal = (services: Service[]): number => {
    return services.reduce((total, service) => {
      return total + service.count * service.preco;
    }, 0);
  };

  const calculateManicureShare = (total: number): string => {
    const manicureShare: number = total * 0.35;
    return manicureShare.toFixed(2).replace(".", ",");
  };

  const formatValue = (value: number): string => {
    return value.toFixed(2).replace(".", ",");
  };

  const goBack = () => {
    router.push("/");
  };

  const handleNameClick = (index: number) => {
    setCurrentIndex(index === currentIndex ? null : index);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full p-4 text-black">
      <h1>Summary</h1>
      <div className="my-4 w-full">
        {storedData.map((data, index) => {
          const total: number = calculateTotal(data.services);
          const formattedTotal: string = formatValue(total);
          const manicureShare: string = calculateManicureShare(total);
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
              {currentIndex === index && (
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
