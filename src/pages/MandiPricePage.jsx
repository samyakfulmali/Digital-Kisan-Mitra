import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMandiPrices } from '../hooks';

const MandiPricePage = () => {
  const { t } = useTranslation();
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('');
  const [dateRange, setDateRange] = useState('7'); // 1, 7, 30 days
  const [crops, setCrops] = useState([]);
  const [markets, setMarkets] = useState([]);
  const { prices, loading, error, refetch } = useMandiPrices({
    crop: selectedCrop,
    market: selectedMarket,
    days: parseInt(dateRange)
  });

  // Fetch crops and markets for dropdowns
  useState(() => {
    // In a real app, these would come from API calls
    // For now, using mock data
    setCrops([
      { id: 'rice', name: t('rice') || 'Rice' },
      { id: 'wheat', name: t('wheat') || 'Wheat' },
      { id: 'cotton', name: t('cotton') || 'Cotton' },
      { id: 'sugarcane', name: t('sugarcane') || 'Sugarcane' },
      { id: 'vegetables', name: t('vegetables') || 'Vegetables' },
      { id: 'fruits', name: t('fruits') || 'Fruits' },
    ]);
    
    setMarkets([
      { id: 'mumbai', name: t('mumbaiMandi') || 'Mumbai Mandi' },
      { id: 'delhi', name: t('delhiMandi') || 'Delhi Mandi' },
      { id: 'bangalore', name: t('bangaloreMandi') || 'Bangalore Mandi' },
      { id: 'chennai', name: t('chennaiMandi') || 'Chennai Mandi' },
      { id: 'kolkata', name: t('kolkataMandi') || 'Kolkata Mandi' },
      { id: 'ahmedabad', name: t('ahmedabadMandi') || 'Ahmedabad Mandi' },
    ]);
  }, []);

  // Refetch when filters change
  useState(() => {
    refetch();
  }, [selectedCrop, selectedMarket, dateRange, refetch]);

  const handleRefetch = () => {
    refetch();
  };

  // Format price change
  const formatPriceChange = (change) => {
    if (change > 0) return `+${change.toFixed(2)}`;
    if (change < 0) return `${change.toFixed(2)}`;
    return change.toFixed(2);
  };

  // Get price change class
  const getPriceChangeClass = (change) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800">{t('mandiPrices')}</h1>
        <p className="text-gray-600 max-w-md text-center">
          {t('mandiPricesSubtitle') || 'Get latest market prices for your crops'}
        </p>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="card-body">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('selectCrop')}
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="input w-full"
                >
                  <option value="">{t('allCrops') || 'All Crops'}</option>
                  {crops.map(crop => (
                    <option key={crop.id} value={crop.id}>
                      {crop.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('selectMarket')}
                </label>
                <select
                  value={selectedMarket}
                  onChange={(e) => setSelectedMarket(e.target.value)}
                  className="input w-full"
                >
                  <option value="">{t('allMarkets') || 'All Markets'}</option>
                  {markets.map(market => (
                    <option key={market.id} value={market.id}>
                      {market.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('dateRange')}
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="input w-full"
                >
                  <option value="1">{t('today') || 'Today'}</option>
                  <option value="7">{t('last7Days') || 'Last 7 Days'}</option>
                  <option value="30">{t('last30Days') || 'Last 30 Days'}</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={handleRefetch}
                  className="btn btn-outline"
                >
                  {t('applyFilters')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prices Table */}
      <div className="card">
        <div className="card-header flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">{t('currentPrices')}</h2>
          <Link to="/mandi/history" className="text-sm text-primary-600 hover:text-primary-700">
            {t('viewPriceHistory')}
          </Link>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="animate-spin rounded-full border-4 border-primary-600 border-t-transparent w-8 h-8"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
              <button onClick={handleRefetch} className="btn btn-outline mt-4">
                {t('retry')}
              </button>
            </div>
          ) : prices.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">{t('noPriceData') || 'No price data available for the selected filters'}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {t('crop')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {t('market')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {t('price')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {t('unit')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {t('change')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {t('updated')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {prices.map((price, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {price.cropName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {price.marketName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{price.price.toFixed(2)}/{price.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {price.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`${getPriceChangeClass(price.change)} font-medium`}>
                          {formatPriceChange(price.change)}
                        </span>
                        <span className="ml-1 text-xs text-gray-500">
                          ({price.changePercent}%)
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(price.updatedAt).toLocaleDateString()} {new Date(price.updatedAt).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Price Chart Placeholder */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-medium text-gray-800">{t('priceTrend')}</h2>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <div className="animate-spin rounded-full border-4 border-primary-600 border-t-transparent w-8 h-8"></div>
            </div>
          ) : prices.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">{t('noChartData') || 'No data available for chart'}</p>
            </div>
          ) : (
            <div>
              {/* In a real app, this would be an actual chart */}
              <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 italic">
                  {t('chartPlaceholder') || 'Price trend chart would be displayed here'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MandiPricePage;