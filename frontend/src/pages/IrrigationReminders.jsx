import { useState } from 'react';
import { 
  Droplet, 
  CloudSun, 
  AlertTriangle,
  CheckCircle,
  Bot,
  Thermometer,
  Calendar,
  Trash2
} from 'lucide-react';

const IrrigationReminders = () => {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      field: 'North Field - Wheat',
      crop: 'Wheat',
      variety: 'HD-2967',
      date: '2024-12-15',
      time: '06:00 AM',
      duration: '2.5 hours',
      waterAmount: '20 mm',
      method: 'Drip Irrigation',
      priority: 'high',
      status: 'pending',
      notes: 'Apply during cool hours to minimize evaporation'
    },
    {
      id: 2,
      field: 'South Field - Rice',
      crop: 'Rice',
      variety: 'PR-126',
      date: '2024-12-16',
      time: '05:30 AM',
      duration: '4.0 hours',
      waterAmount: '50 mm',
      method: 'Flood Irrigation',
      priority: 'medium',
      status: 'completed',
      notes: 'Maintain 5-10cm water level'
    },
    {
      id: 3,
      field: 'East Field - Sugarcane',
      crop: 'Sugarcane',
      variety: 'Co-86032',
      date: '2024-12-17',
      time: '07:00 AM',
      duration: '3.0 hours',
      waterAmount: '25 mm',
      method: 'Sprinkler',
      priority: 'low',
      status: 'pending',
      notes: 'Ensure even coverage'
    }
  ]);
  
  const [formVisible, setFormVisible] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [newSchedule, setNewSchedule] = useState({
    field: '',
    crop: '',
    variety: '',
    date: '',
    time: '',
    duration: '',
    waterAmount: '',
    method: 'Drip Irrigation',
    priority: 'medium',
    notes: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (editingSchedule) {
        // Update existing schedule
        setSchedules(schedules.map(schedule => 
          schedule.id === editingSchedule.id ? { ...editingSchedule, ...newSchedule } : schedule
        ));
      } else {
        // Add new schedule
        const newScheduleWithId = {
          ...newSchedule,
          id: Date.now(),
          status: 'pending'
        };
        setSchedules([...schedules, newScheduleWithId]);
      }
      
      setFormVisible(false);
      setNewSchedule({
        field: '',
        crop: '',
        variety: '',
        date: '',
        time: '',
        duration: '',
        waterAmount: '',
        method: 'Drip Irrigation',
        priority: 'medium',
        notes: ''
      });
      setEditingSchedule(null);
      setIsLoading(false);
    }, 1000);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this irrigation schedule?')) {
      setIsLoading(true);
      setTimeout(() => {
        setSchedules(schedules.filter(schedule => schedule.id !== id));
        setIsLoading(false);
      }, 800);
    }
  };

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setNewSchedule({
      field: schedule.field,
      crop: schedule.crop,
      variety: schedule.variety,
      date: schedule.date,
      time: schedule.time,
      duration: schedule.duration,
      waterAmount: schedule.waterAmount,
      method: schedule.method,
      priority: schedule.priority,
      notes: schedule.notes
    });
    setFormVisible(true);
  };

  const handleToggleStatus = (id) => {
    setSchedules(schedules.map(schedule =>
      schedule.id === id
        ? { ...schedule, status: schedule.status === 'pending' ? 'completed' : 'pending' }
        : schedule
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return priority;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20';
      case 'completed': return 'border-green-300 bg-green-50 dark:bg-green-900/20';
      default: return 'border-gray-300 bg-gray-50 dark:bg-gray-900/10';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Irrigation Reminders
        </h1>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button 
            onClick={() => setFormVisible(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <Droplet className="h-4 w-4" />
            Add Schedule
          </button>
          
          <button 
            onClick={() => {}}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            <Bot className="h-4 w-4" />
            AI Suggestions
          </button>
        </div>
      </div>

      {/* Add/Edit Schedule Form */}
      {formVisible && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Field Name
                </label>
                <input
                  type="text"
                  name="field"
                  value={newSchedule.field}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Crop Type
                </label>
                <input
                  type="text"
                  name="crop"
                  value={newSchedule.crop}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Variety
                </label>
                <input
                  type="text"
                  name="variety"
                  value={newSchedule.variety}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Water Amount (mm)
                </label>
                <input
                  type="number"
                  name="waterAmount"
                  value={newSchedule.waterAmount}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={newSchedule.date}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={newSchedule.time}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Duration (hours)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={newSchedule.duration}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0.1"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Method
                </label>
                <select
                  name="method"
                  value={newSchedule.method}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Drip Irrigation">Drip Irrigation</option>
                  <option value="Sprinkler">Sprinkler</option>
                  <option value="Flood Irrigation">Flood Irrigation</option>
                  <option value="Center Pivot">Center Pivot</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  value={newSchedule.priority}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={newSchedule.notes}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Any special instructions or observations..."
                />
                </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setFormVisible(false);
                  setNewSchedule({
                    field: '',
                    crop: '',
                    variety: '',
                    date: '',
                    time: '',
                    duration: '',
                    waterAmount: '',
                    method: 'Drip Irrigation',
                    priority: 'medium',
                    notes: ''
                  });
                  setEditingSchedule(null);
                }}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? 'Saving...' : editingSchedule ? 'Update Schedule' : 'Add Schedule'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Schedules List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Upcoming Schedules
          </h2>
          {schedules.length === 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              No irrigation schedules set
            </span>
          )}
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 animate-spin mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">Loading schedules...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {schedules.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {schedules.map(schedule => (
                  <div key={schedule.id} className="py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                            <Droplet className="text-blue-500 w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white truncate">
                              {schedule.field}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                              {schedule.crop} ({schedule.variety})
                            </p>
                            <div className="mt-1 flex flex-wrap gap-2 text-xs">
                              <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full">
                                {schedule.waterAmount} mm
                              </span>
                              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800/20 text-gray-800 dark:text-gray-200 rounded-full">
                                {schedule.duration}
                              </span>
                              <span className={`px-2 py-0.5 bg-gray-100 dark:bg-gray-800/20 text-gray-800 dark:text-gray-200 rounded-full ${getPriorityColor(schedule.priority)}`}>
                                {getPriorityText(schedule.priority)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right space-x-3">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {schedule.date} • {schedule.time}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(schedule)}
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                            title="Edit"
                          >
                            <Thermometer className="h-4 w-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(schedule.id)}
                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                            title={schedule.status === 'pending' ? 'Mark as Completed' : 'Mark as Pending'}
                          >
                            {schedule.status === 'pending' ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(schedule.id)}
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
                  No irrigation schedules set
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IrrigationReminders;