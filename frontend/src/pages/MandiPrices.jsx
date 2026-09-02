import { useState, useEffect } from 'react';
import { 
  Truck, 
  ChartBar, 
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Search,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const MandiPrices = () => {
  const [commodities, setCommodities] = useState([]);
  const [selectedCommodity, setSelectedCommodity] = useState('wheat');
  const [priceHistory, setPriceHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // name, price, change
  const [sortOrder, setSortOrder] = useState('asc'); // asc, desc

  useEffect(() => {
    const fetchMandiData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Mock commodities data
        const mockCommodities = [
          {
            id: 1,
            name: 'Wheat',
            variety: 'HD-2967',
            price: 2250,
            unit: 'quintal',
            change: 2.5,
            changeType: 'up',
            mandi: 'Ludhiana',
            lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
          },
          {
            id: 2,
            name: 'Rice',
            variety: 'Basmati',
            price: 3800,
            unit: 'quintal',
            change: -1.2,
            changeType: 'down',
            mandi: 'Karnal',
            lastUpdated: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
          },
          {
            id: 3,
            name: 'Sugarcane',
            variety: 'Co-86032',
            price: 320,
            unit: 'quintal',
            change: 0.8,
            changeType: 'up',
            mandi: 'Meerut',
            lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
          },
          {
            id: 4,
            name: 'Cotton',
            variety: 'Shankar-6',
            price: 6200,
            unit: 'quintal',
            change: -0.5,
            changeType: 'down',
            mandi: 'Rajkot',
            lastUpdated: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
          },
          {
            id: 5,
            name: 'Maize',
            variety: 'HQPM-1',
            price: 1850,
            unit: 'quintal',
            change: 1.8,
            changeType: 'up',
            mandi: 'Delhi',
            lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
          },
          {
            id: 6,
            name: 'Mustard',
            variety: 'RH-725',
            price: 5400,
            unit: 'quintal',
            change: -2.1,
            changeType: 'down',
            mandi: 'Jaipur',
            lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
          }
        ];
        
        setCommodities(mockCommodities);
        
        // Mock price history for selected commodity
        setPriceHistory(generatePriceHistory('wheat'));
        
      } catch (err) {
        setError('Failed to fetch mandi prices. Please check your connection.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMandiData();
  }, [selectedCommodity]);

  // Generate mock price history for a commodity
  const generatePriceHistory = (commodity) => {
    const history = [];
    const basePrice = {
      wheat: 2200,
      rice: 3700,
      sugarcane: 310,
      cotton: 6000,
      maize: 1800,
      mustard: 5200
    }[commodity] || 2000;
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const price = basePrice + Math.floor(Math.random() * 200) - 100; // ±100 from base
      history.push({
        date: date.toLocaleDateString(),
        price: price
      });
    }
    
    return history;
  };

  // Filter and sort commodities
  const filteredAndSorted = commodities
    .filter(commodity => 
      commodity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commodity.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commodity.mandi.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'price') {
        return sortOrder === 'asc' 
          ? a.price - b.price 
          : b.price - a.price;
      } else if (sortBy === 'change') {
        const changeA = a.changeType === 'up' ? a.change : -a.change;
        const changeB = b.changeType === 'up' ? b.change : -b.change;
        return sortOrder === 'asc' 
          ? changeA - changeB 
          : changeB - changeA;
      }
      return 0;
    });

  const handleCommodityChange = (e) => {
    setSelectedCommodity(e.target.value);
    setPriceHistory(generatePriceHistory(e.target.value));
  };

  if (isLoading && commodities.length === 0) {
    return (
      <div className="min-h-[200px] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 dark:border-green-400 mb-4" />
        <p className="text-gray-500 dark:text-gray-400">Loading mandi prices...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Live Mandi Prices
        </h1>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <input
            type="text"
            placeholder="Search commodity, variety, or mandi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
          />
          <button
            onClick={() => {}}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Prices
          </button>
        </div>
      </div>

      {/* Commodity Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-0">
            Select Commodity for Price Trends:
          </label>
          <select
            value={selectedCommodity}
            onChange={handleCommodityChange}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="wheat">Wheat</option>
            <option value="rice">Rice</option>
            <option value="sugarcane">Sugarcane</option>
            <option value="cotton">Cotton</option>
            <option value="maize">Maize</option>
            <option value="mustard">Mustard</option>
          </select>
        </div>
      </div>

      {/* Commodities Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Current Prices
          </h2>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-500 dark:text-gray-400 mr-2">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent mr-2"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="change">Change</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-300 rounded-lg">
            <AlertTriangle className="mr-2 h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
        
        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No commodities found matching your search
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSorted.map(commodity => (
              <div key={commodity.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <Truck className="text-blue-500 w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">
                          {commodity.name} ({commodity.variety})
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          Mandi: {commodity.mandi}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-x-3">
                    <div className="flex items-baseline">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ₹{commodity.price.toLocaleString()}/{
                          commodity.unit === 'quintal' ? 'qtl' : commodity.unit
                        }
                      </p>
                      <div className="ml-2 flex items-center space-x-1">
                        {commodity.change !== 0 && (
                          <>
                            {commodity.changeType === 'up' ? (
                              <ArrowUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <ArrowDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-sm font-medium">
                              {Math.abs(commodity.change)}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Updated: {new Date(commodity.lastUpdated).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price History Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Price Trends (Last 30 Days)
          </h2>
        </div>
        
        {isLoading && priceHistory.length === 0 ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 dark:border-green-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">Loading price history...</p>
          </div>
        ) : (
          <div className="h-96">
            {/* In a real app, we would use a charting library like recharts or chart.js here */}
            <div className="bg-gray-50 dark:bg-gray-700/20 rounded-lg p-4 h-full">
              <div className="text-center pt-8">
                <p className="text-gray-500 dark:text-gray-400">
                  Price chart would be displayed here showing trends for {selectedCommodity}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  (Chart implementation would use a library like Recharts or Chart.js)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MandiPrices;