import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCrops } from '../hooks';
import { cropAPI } from '../services/api';

const CropManagementPage = () => {
  const { t } = useTranslation();
  const { crops, loading, error, refetch } = useCrops();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    plantingDate: '',
    expectedHarvest: '',
    area: '',
    variety: '',
    status: 'planting',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useState(() => {
    if (editId) {
      const crop = crops.find(c => c.id === editId);
      if (crop) {
        setFormData({
          name: crop.name || '',
          plantingDate: crop.plantingDate ? new Date(crop.plantingDate).toISOString().split('T')[0] : '',
          expectedHarvest: crop.expectedHarvest ? new Date(crop.expectedHarvest).toISOString().split('T')[0] : '',
          area: crop.area || '',
          variety: crop.variety || '',
          status: crop.status || 'planting',
        });
      }
    }
  }, [editId, crops]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(false);
    setIsLoading(true);
    
    try {
      let response;
      if (editId) {
        response = await cropAPI.updateCrop(editId, formData);
        setFormSuccess(t('cropUpdated') || 'Crop updated successfully');
      } else {
        response = await cropAPI.createCrop(formData);
        setFormSuccess(t('cropAdded') || 'Crop added successfully');
      }
      
      // Reset form
      setFormData({
        name: '',
        plantingDate: '',
        expectedHarvest: '',
        area: '',
        variety: '',
        status: 'planting',
      });
      setShowForm(false);
      setEditId(null);
      
      // Refetch crops
      refetch();
      
      setTimeout(() => {
        setFormSuccess(false);
      }, 3000);
    } catch (err) {
      setFormError(err.response?.data?.message || t('cropOperationError') || 'Operation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      await cropAPI.deleteCrop(deleteId);
      refetch();
      setDeleteId(null);
    } catch (err) {
      setFormError(err.response?.data?.message || t('deleteError') || 'Failed to delete crop');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800">{t('cropManagement')}</h1>
        <p className="text-gray-600 max-w-md text-center">
          {t('cropManagementSubtitle') || 'Manage all your crops from planting to harvest'}
        </p>
      </div>

      {/* Add/Edit Crop Form */}
      <div className="card">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">
            {editId ? t('editCrop') : t('addNewCrop')}
          </h2>
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (!showForm) {
                setEditId(null);
                setFormData({
                  name: '',
                  plantingDate: '',
                  expectedHarvest: '',
                  area: '',
                  variety: '',
                  status: 'planting',
                });
              }
            }}
            className="btn btn-outline"
          >
            {showForm ? t('cancel') : t('addCrop')}
          </button>
        </div>
        
        {showForm && (
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('cropName')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    className="input w-full"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('variety')}
                  </label>
                  <input
                    type="text"
                    name="variety"
                    value={formData.variety || ''}
                    onChange={handleChange}
                    className="input w-full"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('plantingDate')}
                  </label>
                  <input
                    type="date"
                    name="plantingDate"
                    value={formData.plantingDate || ''}
                    onChange={handleChange}
                    className="input w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('expectedHarvest')}
                  </label>
                  <input
                    type="date"
                    name="expectedHarvest"
                    value={formData.expectedHarvest || ''}
                    onChange={handleChange}
                    className="input w-full"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('area')}
                </label>
                <input
                  type="number"
                  name="area"
                  value={formData.area || ''}
                  onChange={handleChange}
                  className="input w-full"
                  min="0.1"
                  step="0.1"
                />
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('status')}
                </label>
                <select
                  name="status"
                  value={formData.status || 'planting'}
                  onChange={handleChange}
                  className="input w-full"
                >
                  <option value="planting">{t('planting')}</option>
                  <option value="growing">{t('growing')}</option>
                  <option value="readyForHarvest">{t('readyForHarvest')}</option>
                  <option value="harvested">{t('harvested')}</option>
                </select>
              </div>
            </form>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                  setFormData({
                    name: '',
                    plantingDate: '',
                    expectedHarvest: '',
                    area: '',
                    variety: '',
                    status: 'planting',
                  });
                }}
                className="btn btn-ghost mr-2"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (editId ? t('updating') : t('adding')) || 'Saving...' : (editId ? t('updateCrop') : t('saveCrop'))}
              </button>
            </div>
            
            {formSuccess && (
              <div className="mt-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
                {formSuccess}
              </div>
            )}
            
            {formError && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
                {formError}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Crops List */}
      <div className="card">
        <div className="card-header flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">{t('myCrops')}</h2>
          <button
            onClick={() => {
              setShowForm(true);
              setEditId(null);
            }}
            className="btn btn-outline"
          >
            {t('addCrop')}
          </button>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="animate-spin rounded-full border-4 border-primary-600 border-t-transparent w-8 h-8"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
              <button onClick={refetch} className="btn btn-outline mt-4">
                {t('retry')}
              </button>
            </div>
          ) : crops.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">{t('noCropsYet') || 'You haven\'t added any crops yet'}</p>
              <button onClick={() => {
                setShowForm(true);
                setEditId(null);
              }} className="btn btn-primary mt-4">
                {t('addFirstCrop')}
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {crops.map((crop) => (
                <div key={crop.id} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 2a2 2 0 100-4 2 2 0 000 4zm0-6a4 4 0 11-8 0 4 4 0 018 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{crop.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 110 4m0 0a2 2 0 01-2 2.001M5.001 14A2 2 0 013 12V5a2 2 0 012-2h14a2 2 0 012 2v7a2 2 0 01-2 2z"></path>
                          </svg>
                          {crop.variety || t('notSpecified')}
                        </span>
                        <span className="flex items-center">
                          <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 110 4m0 0a2 2 0 01-2 2.001M5.001 14A2 2 0 013 12V5a2 2 0 012-2h14a2 2 0 012 2v7a2 2 0 01-2 2z"></path>
                          </svg>
                          {crop.area} acres
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      crop.status === 'planting' ? 'bg-blue-100 text-blue-800' :
                      crop.status === 'growing' ? 'bg-yellow-100 text-yellow-800' :
                      crop.status === 'readyForHarvest' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {t(crop.status) || crop.status}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setEditId(crop.id);
                          setShowForm(true);
                        }}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        {t('edit')}
                      </button>
                      <button
                        onClick={() => {
                          setDeleteId(crop.id);
                        }}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        {t('delete')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-96 max-w-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{t('confirmDelete')}</h2>
            <p className="text-gray-600 mb-6">
              {t('deleteCropConfirm') || 'Are you sure you want to delete this crop? This action cannot be undone.'}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteId(null)}
                className="btn btn-ghost"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-danger"
                disabled={isLoading}
              >
                {isLoading ? t('deleting') || 'Deleting...' : t('deleteCrop')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropManagementPage;