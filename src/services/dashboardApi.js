import api from "./api";

// Get overall stats for dashboard
export const getOverview = async () => {
  try {
    const res = await api.get("/api/overview"); // endpoint for stats
    return res.data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
};

// Get analytics chart data
export const getAnalytics = async () => {
  try {
    const res = await api.get("/api/analytics"); 
    return res.data;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
};

// Get user
export const getUsers = async () => {
  try {
    const res = await api.get("/api/users"); 
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Get reminders or time trackers
export const getProduct= async () => {
  try {
    const res = await api.get("/api/products"); // endpoint for products
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};