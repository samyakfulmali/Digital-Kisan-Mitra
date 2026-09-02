import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { cropAPI, weatherAPI, mandiAPI, farmerAPI, analyticsAPI } from '../services/api';

// Custom hook for fetching crops
export const useCrops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setLoading(true);
        const response = await cropAPI.getCrops();
        setCrops(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch crops');
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  const refetch = async () => {
    setLoading(true);
    try {
      const response = await cropAPI.getCrops();
      setCrops(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch crops');
    } finally {
      setLoading(false);
    }
  };

  return { crops, loading, error, refetch };
};

// Custom hook for fetching weather
export const useWeather = (location) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!location) return;
      try {
        setLoading(true);
        const [currentResp, forecastResp] = await Promise.all([
          weatherAPI.getCurrentWeather(location),
          weatherAPI.getForecast(location, 7)
        ]);
        setWeather(currentResp.data);
        setForecast(forecastResp.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch weather');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  return { weather, forecast, loading, error };
};

// Custom hook for fetching mandi prices
export const useMandiPrices = (filters = {}) => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const response = await mandiAPI.getPrices(filters);
        setPrices(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch mandi prices');
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [JSON.stringify(filters)]);

  const refetch = async () => {
    setLoading(true);
    try {
      const response = await mandiAPI.getPrices(filters);
      setPrices(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch mandi prices');
    } finally {
      setLoading(false);
    }
  };

  return { prices, loading, error, refetch };
};

// Custom hook for farmer profile
export const useFarmerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () {
      try {
        setLoading(true);
        const response = await farmerAPI.getProfile();
        setProfile(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id]);

  return { profile, loading, error };
};

// Custom hook for dashboard stats
export const useDashboardStats = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await analyticsAPI.getDashboardStats();
        setStats(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};