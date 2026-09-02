import { useState } from 'react';
import { 
  Sprout, 
  Plus, 
  Trash2, 
  Edit,
  AlertTriangle,
  Loader
} from 'lucide-react';

const CropManagement = () => {
  const [crops, setCrops] = useState([
    {
      id: 1,
      name: 'Wheat',
      variety: 'HD-2967',
      plantingDate: '2024-11-15',
      expectedHarvest: '2025-04-20',
      area: 2.5,
      status: 'growing',
      health: 85
    },
    {
      id: 2,
      name: 'Rice',
      variety: 'PR-126',
      plantingDate: '2024-06-20',
      expectedHarvest: '2024-10-10',
      area: 1.8,
      status: 'harvested',
      health: 92
    },
    {
      id: 3,
      name: 'Sugarcane',
      variety: 'Co-86032',
      plantingDate: '2024-03-10',
      expectedHarvest: '2025-03-15',
      area: 3.2,
      status: 'growing',
      health: 78
    }
  ]);
  
  const [formVisible, setFormVisible] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [newCrop, setNewCrop] = useState({
    name: '',
    variety: '',
    plantingDate: '',
    expectedHarvest: '',
    area: '',
    status: 'planning'
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCrop(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (editingCrop) {
        // Update existing crop
        setCrops(crops.map(crop => 
          crop.id === editingCrop.id ? { ...editingCrop, ...newCrop } : crop
        ));
      } else {
        // Add new crop
        const newCropWithId = {
          ...newCrop,
          id: Date.now(),
          health: Math.floor(Math.random() * 20) + 80 // Random health between 80-100
        };
        setCrops([...crops, newCropWithId]);
      }
      
      setFormVisible(false);
      setNewCrop({
        name: '',
        variety: '',
        plantingDate: '',
        expectedHarvest: '',
        area: '',
        status: 'planning'
      });
      setEditingCrop(null);
      setIsLoading(false);
    }, 1000);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this crop?')) {
      setIsLoading(true);
      setTimeout(() => {
        setCrops(crops.filter(crop => crop.id !== id));
        setIsLoading(false);
      }, 800);
    }
  };

  const handleEdit = (crop) => {
    setEditingCrop(crop);
    setNewCrop({
      name: crop.name,
      variety: crop.variety,
      plantingDate: crop.plantingDate,
      expectedHarvest: crop.expectedHarvest,
      area: crop.area,
      status: crop.status
    });
    setFormVisible(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'planning': return 'text-gray-500';
      case 'planting': return 'text-blue-500';
      case 'growing': return 'text-green-500';
      case 'harvested': return 'text-amber-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'planning': return 'Planning';
      case 'planting': return 'Planting';
      case 'growing': return 'Growing';
      case 'harvested': return 'Harvested';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Crop Management
        </h1>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button 
            onClick={() => setFormVisible(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Crop
          </button>
          
          <button 
            onClick={() => {}}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <Loader className="h-4 w-4 animate-spin" />
            Import Data
          </button>
        </div>
      </div>

      {/* Add/Edit Crop Form */}
      {formVisible && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {editingCrop ? 'Edit Crop' : 'Add New Crop'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Crop Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newCrop.name}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Variety
                </label>
                <input
                  type="text"
                  name="variety"
                  value={newCrop.variety}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Planting Date
                </label>
                <input
                  type="date"
                  name="plantingDate"
                  value={newCrop.plantingDate}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Expected Harvest
                </label>
                <input
                  type="date"
                  name="expectedHarvest"
                  value={newCrop.expectedHarvest}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Area (acres)
                </label>
                <input
                  type="number"
                  name="area"
                  value={newCrop.area}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="0.1"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={newCrop.status}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="planning">Planning</option>
                  <option value="planting">Planting</option>
                  <option value="growing">Growing</option>
                  <option value="harvested">Harvested</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setFormVisible(false);
                  setNewCrop({
                    name: '',
                    variety: '',
                    plantingDate: '',
                    expectedHarvest: '',
                    area: '',
                    status: 'planning'
                  });
                  setEditingCrop(null);
                }}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? 'Saving...' : editingCrop ? 'Update Crop' : 'Add Crop'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Crops List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Your Crops
          </h2>
          {crops.length === 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              No crops added yet
            </span>
          )}
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">
            <Loader className="h-6 w-6 animate-spin mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">Loading crops...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {crops.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {crops.map(crop => (
                  <div key={crop.id} className="py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                            <Sprout className="text-green-500 dark:text-green-400 w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white truncate">
                              {crop.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                              Variety: {crop.variety}
                            </p>
                            <div className="mt-1 flex flex-wrap gap-2 text-xs">
                              <span className="px-2 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full">
                                {crop.area} acres
                              </span>
                              <span className={`px-2 py-0.5 bg-gray-100 dark:bg-gray-800/20 text-gray-800 dark:text-gray-200 rounded-full ${getStatusColor(crop.status)}`}>
                                {getStatusText(crop.status)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right space-x-3">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">{crop.health}%</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Health</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Planting: {new Date(crop.plantingDate).toLocaleDateString()} <br />
                          Harvest: {new Date(crop.expectedHarvest).toLocaleDateString()}
                        </p>
                        <div className="mt-2 flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(crop)}
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" />
                          </button>
                          <button
                            onClick={() => handleDelete(crop.id)}
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  Start by adding your first crop using the button above!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CropManagement;