import { useState, useEffect } from 'react';
import { 
  BarChart2, 
  ChartBar, 
  ClipboardList,
  Activity,
  AlertTriangle,
  CheckCircle,
  Bot,
  Calendar,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FarmRecordsAnalytics = () => {
  const [farmRecords, setFarmRecords] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({
    yieldTrends: [],
    expenseBreakdown: [],
    monthlyProfit: [],
    cropPerformance: []
  });
  const [selectedTimeframe, setSelectedTimeframe] = useState('6m'); // 1m, 3m, 6m, 1y
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFarmData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock farm records
        const mockRecords = [
          {
            id: 1,
            date: '2024-11-15',
            type: 'expense',
            category: 'Seeds',
            description: 'Wheat seeds HD-2967',
            amount: 2500,
            field: 'North Field',
            crop: 'Wheat'
          },
          {
            id: 2,
            date: '2024-11-20',
            type: 'expense',
            category: 'Fertilizer',
            description: 'Urea and DAP',
            amount: 3200,
            field: 'North Field',
            crop: 'Wheat'
          },
          {
            id: 3,
            date: '2024-12-05',
            type: 'income',
            category: 'Crop Sale',
            description: 'Wheat sale - 25 quintals',
            amount: 55000,
            field: 'North Field',
            crop: 'Wheat'
          },
          {
            id: 4,
            date: '2024-12-10',
            type: 'expense',
            category: 'Irrigation',
            description: 'Water pump diesel',
            amount: 1800,
            field: 'South Field',
            crop: 'Rice'
          },
          {
            id: 5,
            date: '2024-12-15',
            type: 'income',
            category: 'Crop Sale',
            description: 'Rice sale - 18 quintals',
            amount: 68400,
            field: 'South Field',
            crop: 'Rice'
          }
        ];
        
        setFarmRecords(mockRecords);
        
        // Mock analytics data
        setAnalyticsData({
          yieldTrends: [
            { month: 'Jan', wheat: 20, rice: 15, sugarcane: 40 },
            { month: 'Feb', wheat: 22, rice: 18, sugarcane: 42 },
            { month: 'Mar', wheat: 25, rice: 20, sugarcane: 45 },
            { month: 'Apr', wheat: 28, rice: 25, sugarcane: 48 },
            { month: 'May', wheat: 30, rice: 30, sugarcane: 50 },
            { month: 'Jun', wheat: 28, rice: 28, sugarcane: 48 },
          ],
          expenseBreakdown: [
            { category: 'Seeds', amount: 15000, percentage: 25 },
            { category: 'Fertilizer', amount: 18000, percentage: 30 },
            { category: 'Irrigation', amount: 12000, percentage: 20 },
            { category: 'Pesticides', amount: 8000, percentage: 13 },
            { category: 'Labor', amount: 10000, percentage: 12 }
          ],
          monthlyProfit: [
            { month: 'Jan', profit: -5000 },
            { month: 'Feb', profit: -3000 },
            { month: 'Mar', profit: 2000 },
            { month: 'Apr', profit: 8000 },
            { month: 'May', profit: 15000 },
            { month: 'Jun', profit: 12000 },
          ],
          cropPerformance: [
            { crop: 'Wheat', yield: 28, profit: 12000, efficiency: 85 },
            { crop: 'Rice', yield: 22, profit: 8000, efficiency: 78 },
            { crop: 'Sugarcane', yield: 45, profit: 22000, efficiency: 92 }
          ]
        });
        
      } catch (err) {
        setError('Failed to load farm records. Please check your connection.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFarmData();
  }, [selectedTimeframe]);

  const getTotalIncome = () => {
    return farmRecords
      .filter(record => record.type === 'income')
      .reduce((sum, record) => sum + record.amount, 0);
  };

  const getTotalExpenses = () => {
    return farmRecords
      .filter(record => record.type === 'expense')
      .reduce((sum, record) => sum + record.amount, 0);
  };

  const getNetProfit = () => {
    return getTotalIncome() - getTotalExpenses();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Farm Records & Analytics
        </h1>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="1m">1 Month</option>
            <option value="3m">3 Months</option>
            <option value="6m">6 Months</option>
            <option value="1y">1 Year</option>
          </select>
          
          <button
            onClick={() => {}}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
          >
            <Bot className="mr-2 h-4 w-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Income</span>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">This {selectedTimeframe === '1m' ? 'month' : selectedTimeframe === '3m' ? 'quarter' : selectedTimeframe === '6m' ? 'half-year' : 'year'}</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{getTotalIncome().toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <ClipboardList className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Expenses</span>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">This {selectedTimeframe === '1m' ? 'month' : selectedTimeframe === '3m' ? 'quarter' : selectedTimeframe === '6m' ? 'half-year' : 'year'}</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{getTotalExpenses().toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Net Profit</span>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">This {selectedTimeframe === '1m' ? 'month' : selectedTimeframe === '3m' ? 'quarter' : selectedTimeframe === '6m' ? 'half-year' : 'year'}</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{getNetProfit().toLocaleString()}
          </p>
          {getNetProfit() >= 0 ? (
            <p className="text-xs text-green-500">Profit</p>
          ) : (
            <p className="text-xs text-red-500">Loss</p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Fields</span>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">Currently Cultivated</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            3
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Wheat, Rice, Sugarcane
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yield Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Yield Trends
            </h2>
          </div>
          
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={analyticsData.yieldTrends}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="wheat" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="rice" stroke="#82ca9d" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="sugarcane" stroke="#ffc658" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-8884d8 rounded" />
              <span>Wheat</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-82ca9d rounded" />
              <span>Rice</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-ffc658 rounded" />
              <span>Sugarcane</span>
            </div>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Expense Breakdown
            </h2>
          </div>
          
          <div className="space-y-4">
            {analyticsData.expenseBreakdown.map((item, index) => (
              <div key={index} className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                    <ChartBar className="text-red-500 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{item.category}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ₹{item.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.percentage}%
                  </p>
                  <div className="w-24 h-2 bg-gray-200 dark:bg-gray-600 rounded overflow-hidden mt-1">
                    <div 
                      className={`h-full bg-red-500`} 
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Profit & Crop Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Profit */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Monthly Profit/Loss
            </h2>
          </div>
          
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={analyticsData.monthlyProfit}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke={getNetProfit() >= 0 ? '#10b981' : '#ef4444'} 
                  activeDot={{ r: 8 }}
                  dot={{ r: 6 }}
                >
                  {/* Conditional dot coloring based on profit/loss */}
                  <Line type="monotone" dataKey="profit" 
                    stroke={getNetProfit() >= 0 ? '#10b981' : '#ef4444'} 
                  >
                    {/* This is a simplified approach - in reality you'd need to conditionally render dots */}
                  </Line>
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Crop Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Crop Performance
            </h2>
          </div>
          
          <div className="space-y-4">
            {analyticsData.cropPerformance.map((crop, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/20 rounded-lg border-l-4 border-blue-500 dark:border-blue-400">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{crop.crop}</h3>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Yield:</span>
                        <span className="font-medium">{crop.yield} quintal/acre</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Profit:</span>
                        <span className="font-medium">₹{crop.profit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Efficiency:</span>
                        <span className="font-medium">{crop.efficiency}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-3">
                      <BarChart2 className="text-blue-500 w-6 h-6" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Overall Score
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Transactions
          </h2>
          <button
            onClick={() => {}}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Add Record
          </button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 animate-spin mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">Loading records...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {farmRecords.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {farmRecords.map(record => (
                  <div key={record.id} className="py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800/20 rounded-lg flex items-center justify-center">
                            {record.type === 'income' ? (
                              <CheckCircle className="text-green-500 w-5 h-5" />
                            ) : (
                              <AlertTriangle className="text-red-500 w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white truncate">
                              {record.description}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                              {record.field} • {record.crop}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {record.date}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right space-x-3">
                        <div className="flex items-baseline">
                          <p className={record.type === 'income' 
                              ? 'text-2xl font-bold text-gray-900 dark:text-white text-green-600' 
                              : 'text-2xl font-bold text-gray-900 dark:text-white text-red-600'}>
                            ₹{record.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {record.type === 'income' ? 'Income' : 'Expense'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  No transaction records found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmRecordsAnalytics;