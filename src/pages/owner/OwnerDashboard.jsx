import { useEffect, useState } from "react";
import OwnerLayout from "../../layouts/OwnerLayout";
import api from "../../utils/apiClient";
import Table from "../../components/Table";
import ProtectedRoute from "../../components/ProtectedRoute";

function OwnerDashboardInner() {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [raters, setRaters] = useState([]);
  const [search, setSearch] = useState("");
  const [storeSearch, setStoreSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadStores = async () => {
    try {
      console.log('Fetching stores from API...');
      const response = await api.get("/stores/owner/me/stores");
      console.log('API Response:', response);
      
      // The stores array is in response.data.data
      const storesData = response.data.data || [];
      console.log('Processed stores data:', storesData);
      
      if (!Array.isArray(storesData)) {
        console.error('Stores data is not an array:', storesData);
        return [];
      }
      
      setStores(storesData);
      if (storesData.length > 0 && !selectedStore) {
        console.log('Setting first store as selected:', storesData[0]);
        setSelectedStore(storesData[0]);
      }
      return storesData;
    } catch (error) {
      console.error('Error loading stores:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      });
      return [];
    }
  };

  const loadRatings = async (storeId) => {
    if (!storeId) {
      console.log('No storeId provided to loadRatings');
      setRaters([]);
      return;
    }
    
    try {
      console.log(`Loading ratings for store ${storeId}...`);
      const response = await api.get("/stores/owner/me/ratings", { 
        params: { 
          storeId,
          search, 
          page, 
          limit: 10 
        } 
      });
      
      console.log('Raw API Response:', JSON.stringify(response, null, 2));
      
      // Map the response to match the table columns
      const ratingsData = response.data?.items?.map(item => ({
        ...item,
        user: {
          name: item.user?.name || 'N/A',
          email: item.user?.email || 'N/A',
         
          address: item.user?.address || 'N/A'
        },
        rating: item.value || 0
      })) || [];
      
      console.log('Mapped ratings data:', JSON.stringify(ratingsData, null, 2));
      
      setRaters(ratingsData);
    } catch (error) {
      console.error('Error loading ratings:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          params: error.config?.params
        }
      });
      setRaters([]);
    }
  };

  // Load stores only once on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      const loadedStores = await loadStores();
      if (loadedStores.length > 0 && !selectedStore) {
        // Only set the first store as selected if none is selected
        setSelectedStore(loadedStores[0]);
      }
      setLoading(false);
    };
    loadInitialData();
  }, []); // Empty dependency array to run only once on mount

  // Load ratings when selectedStore or search/page changes
  useEffect(() => {
    if (selectedStore?._id) {
      loadRatings(selectedStore._id);
    }
  }, [selectedStore, search, page]);

  const cols = [
    { 
      key: "name", 
      title: "Name", 
      render: (r) => r.user?.name || 'N/A' 
    },
    { 
      key: "email", 
      title: "Email", 
      render: (r) => r.user?.email || 'N/A' 
    },
    { 
      key: "address", 
      title: "Address", 
      render: (r) => r.user?.address || 'N/A' 
    },
    { 
      key: "rating", 
      title: "Rating",
      render: (r) => r.rating || 'N/A'
    },
  ];

  const stats = [
    {
      id: 'store',
      title: 'Store Info',
      value: selectedStore?.name || 'Select a store',
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'from-blue-50 to-white',
      description: selectedStore?.address || 'No store selected'
    },
    {
      id: 'rating',
      title: 'Average Rating',
      value: selectedStore?.avgRating ? selectedStore.avgRating.toFixed(2) : 'N/A',
      icon: (
        <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      color: 'from-amber-50 to-white',
      description: `Based on ${selectedStore?.ratingsCount || 0} ratings`
    },
    {
      id: 'raters',
      title: 'Total Raters',
      value: raters.length,
      icon: (
        <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: 'from-indigo-50 to-white',
      description: 'People who rated this store'
    }
  ];

  return (
    <OwnerLayout>
      <div className="flex flex-row gap-4 w-full max-w-7xl mx-auto px-2">
        {/* Sidebar with Stores */}
        <div className="w-80 flex-shrink-0 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="relative mb-4">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search stores..."
                value={storeSearch}
                onChange={(e) => setStoreSearch(e.target.value)}
              />
              <svg
                className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Your Stores</h2>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                {stores.filter(store => 
                  store.name.toLowerCase().includes(storeSearch.toLowerCase())
                ).length} {stores.filter(store => 
                  store.name.toLowerCase().includes(storeSearch.toLowerCase())
                ).length === 1 ? 'Store' : 'Stores'}
              </span>
            </div>
            
            {stores.length > 0 ? (
              <div className="space-y-3">
                {stores
                  .filter(store => 
                    store.name.toLowerCase().includes(storeSearch.toLowerCase())
                  )
                  .map((store) => (
                  <div 
                    key={store._id}
                    onClick={() => setSelectedStore(store)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedStore?._id === store._id 
                        ? 'border-blue-500 ring-2 ring-blue-100 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{store.name}</h3>
                      {selectedStore?._id === store._id && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Selected
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{store.avgRating?.toFixed(1) || 'N/A'}</span>
                      <span className="mx-1">•</span>
                      <span>{store.ratingsCount || 0} ratings</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No stores found</p>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-6">
        {selectedStore ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.id} className={`bg-gradient-to-br ${stat.color} border rounded-2xl p-6 shadow-sm`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                    </div>
                    <div className="p-3 rounded-full bg-white shadow-sm">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ratings Table */}
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Ratings for {selectedStore.name}
                  </h2>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-64 pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Search raters..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <svg
                      className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="flex justify-center items-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    <Table columns={cols} data={raters} />
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg w-full">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Please select a store to view its details and ratings.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </OwnerLayout>
  );
}

export default function OwnerDashboard() {
  return (
    <ProtectedRoute roles={["owner"]}>
      <OwnerDashboardInner />
    </ProtectedRoute>
  );
}
