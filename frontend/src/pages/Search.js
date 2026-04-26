import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Leaf, Clock, AlertCircle } from 'lucide-react';

const Search = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    fetchPlants();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPlants(plants);
    } else {
      const filtered = plants.filter(plant =>
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientific_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.medicinal_uses.some(use => 
          use.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredPlants(filtered);
    }
  }, [searchTerm, plants]);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/plants/');
      if (!response.ok) {
        throw new Error('Failed to fetch plants');
      }
      const data = await response.json();
      setPlants(data.plants);
      setFilteredPlants(data.plants);
    } catch (err) {
      setError('Failed to load plants data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading plants database...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Search Medicinal Plants
          </h1>
          <p className="text-gray-600">
            Browse through our database of DOH-approved Philippine medicinal plants
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, scientific name, or medicinal use..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            {filteredPlants.length} {filteredPlants.length === 1 ? 'plant' : 'plants'} found
          </p>
        </div>

        {/* Plants Grid */}
        <div className="grid gap-6">
          {filteredPlants.map((plant) => (
            <div
              key={plant.id}
              className="card-shadow p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedPlant(plant)}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-green-700" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {plant.name}
                  </h3>
                  <p className="text-gray-500 italic mb-3">
                    {plant.scientific_name}
                  </p>
                  {plant.description && (
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {plant.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {plant.medicinal_uses.slice(0, 3).map((use, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                      >
                        {use}
                      </span>
                    ))}
                    {plant.medicinal_uses.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        +{plant.medicinal_uses.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPlants.length === 0 && (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No plants found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or browse all plants
            </p>
          </div>
        )}

        {/* Plant Detail Modal */}
        {selectedPlant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="nature-green-gradient text-white p-6 rounded-t-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedPlant.name}</h2>
                    <p className="text-green-100 italic">{selectedPlant.scientific_name}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPlant(null)}
                    className="text-white hover:text-green-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {selectedPlant.description && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-600">{selectedPlant.description}</p>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-green-600" />
                    Medicinal Uses
                  </h3>
                  <div className="grid gap-2">
                    {selectedPlant.medicinal_uses.map((use, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{use}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-green-600" />
                    Preparation Steps
                  </h3>
                  <div className="space-y-3">
                    {selectedPlant.preparation_steps.map((step, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-semibold text-sm mr-3">
                          {index + 1}
                        </div>
                        <p className="text-gray-600 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedPlant.cultural_relevance && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Cultural Relevance</h3>
                    <p className="text-gray-600">{selectedPlant.cultural_relevance}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
