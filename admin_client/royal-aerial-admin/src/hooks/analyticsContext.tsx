import React, { createContext, useContext, useEffect, useState } from "react";
import { getAnalytics } from "../api/api";
import { AnalyticsRevenue } from "../types/types";
import { useAuth } from "./authContext";


interface AnalyticsContextType {
  labels: string[];
  dataPoints: number[];
  loading: boolean;
  fetchAnalyticsData: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
  undefined
);

// Custom hook
export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (context === undefined) {
      throw new Error("useAnalytics must be used within an AnalyticsProvider");
    }
    return context;
  };

// Analytics Provider component
export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {loggedIn}= useAuth()

  // Fetch analytics data
  const fetchAnalyticsData = async () => {
    loggedIn &&
    setLoading(true); // Start loading
    try {
      const analyticsData: AnalyticsRevenue[] = await getAnalytics("category");
      const fetchedLabels = analyticsData.map((item) => item._id);
      const fetchedData = analyticsData.map((item) => item.totalRevenue);

      setLabels(fetchedLabels);
      setDataPoints(fetchedData);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setLoading(false); 
    }
  };


  useEffect(() => {
    loggedIn &&
    fetchAnalyticsData();
  }, [loggedIn]);

  return (
    <AnalyticsContext.Provider
      value={{ labels, dataPoints, loading, fetchAnalyticsData }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};


