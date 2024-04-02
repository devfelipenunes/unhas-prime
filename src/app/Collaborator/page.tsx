"use client";

import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Collaborator() {
  const router = useRouter();
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const collaboratorId = localStorage.getItem("selectedName");

    api
      .get(`/sales/collaborator/${collaboratorId}`)
      .then((response) => {
        setSales(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sales]);

  // Função para formatar a data no formato "dia/mês/ano"
  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("pt-BR");
    return formattedDate;
  };

  // Função para filtrar as vendas por data
  const filterSalesByDate = (period) => {
    const currentDate = new Date();
    const filteredSales = sales.filter((sale) => {
      const saleDate = new Date(sale.createdAt);
      switch (period) {
        case "day":
          return (
            saleDate.getDate() === currentDate.getDate() &&
            saleDate.getMonth() === currentDate.getMonth() &&
            saleDate.getFullYear() === currentDate.getFullYear()
          );
        case "week":
          const firstDayOfWeek = new Date(
            currentDate.setDate(currentDate.getDate() - currentDate.getDay())
          );
          const lastDayOfWeek = new Date(
            currentDate.setDate(
              currentDate.getDate() - currentDate.getDay() + 6
            )
          );
          return saleDate >= firstDayOfWeek && saleDate <= lastDayOfWeek;
        case "month":
          return (
            saleDate.getMonth() === currentDate.getMonth() &&
            saleDate.getFullYear() === currentDate.getFullYear()
          );
        default:
          return true;
      }
    });
    return filteredSales;
  };

  // Função para atualizar as vendas com base no período
  const handleFilterClick = (period) => {
    const filteredSales = filterSalesByDate(period);
    setSales(filteredSales);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1>Historical Sales</h1>
      <div>
        <button onClick={() => router.push("/Services")}>Add Service</button>
      </div>
      <div className="flex flex-row space-x-5">
        <button onClick={() => handleFilterClick("day")}>Dia</button>
        <button onClick={() => handleFilterClick("week")}>Semana</button>
        <button onClick={() => handleFilterClick("month")}>Mês</button>
        <button onClick={() => setSales([])}>All Sales</button>
      </div>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            Service ID: {sale.servico_nome}, Date:{" "}
            {formatDate(sale.sale_created_at)}
          </li>
        ))}
      </ul>
    </div>
  );
}
