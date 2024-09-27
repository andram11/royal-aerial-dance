import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  ChartData,
  ChartOptions,
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { getAnalytics } from "../api/api";
import { AnalyticsRevenue } from "../types/types";
import { capitalizeFirstLetter } from "../utils";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC = () => {
  //State
  const [labels, setLabels] = useState<string[]>([]);
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //Get pie chart data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const analyticsData: AnalyticsRevenue[] = await getAnalytics(
          "category"
        ); // Assuming it returns an array of AnalyticsRevenue
        const fetchedLabels = analyticsData.map((item) => item._id);
        const fetchedData = analyticsData.map((item) => item.totalRevenue);

        setLabels(fetchedLabels);

        setDataPoints(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

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
