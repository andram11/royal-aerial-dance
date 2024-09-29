import React from "react";
import { Pie } from "react-chartjs-2";
import {
  ChartData,
  ChartOptions,
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { useAnalytics } from "../hooks/analyticsContext";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC = () => {
  //State
  const { labels, dataPoints, loading } = useAnalytics();

  const rootStyle = getComputedStyle(document.documentElement);
  //Chart data
  const data: ChartData<"pie"> = {
    labels: labels,
    datasets: [
      {
        label: "Revenue per category",
        data: dataPoints,
        backgroundColor: [
          rootStyle.getPropertyValue("--primary").trim(),
          rootStyle.getPropertyValue("--primary-200").trim(),
          rootStyle.getPropertyValue("--secondary").trim(),
          rootStyle.getPropertyValue("--secondary-200").trim(),
          rootStyle.getPropertyValue("--tertiary").trim(),
        ],
        borderColor: [
          rootStyle.getPropertyValue("--primary-100").trim(),
          rootStyle.getPropertyValue("--primary-200").trim(),
          rootStyle.getPropertyValue("--secondary").trim(),
          rootStyle.getPropertyValue("--secondary-200").trim(),
          rootStyle.getPropertyValue("--tertiary").trim(),
        ],
        borderWidth: 1,
      },
    ],
  };
  const options: ChartOptions<"pie"> = {
    responsive: true,
    layout: {
      padding: 15,
    },
    plugins: {
      legend: {
        position: "top",
        align: "start",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw as number; // Assume it's always a number
            const formattedValue = new Intl.NumberFormat("fr-BE", {
              style: "currency",
              currency: "EUR",
            }).format(value);

            return `${label}: ${formattedValue}`;
          },
        },
      },
    },
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="shadow-2xl drop-shadow-xl">
      <Pie
        style={{ width: "300px", height: "300px" }}
        data={data}
        options={options}
      />
    </div>
  );
};

export default PieChart;
