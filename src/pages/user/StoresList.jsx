import { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import RatingStars from "../../components/RatingStars";
import Button from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchStoresThunk } from "../../features/stores/storeThunks";
import { upsertRatingThunk } from "../../features/ratings/ratingThunks";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function StoresList() {
  const dispatch = useAppDispatch();
  const { list, loading, total } = useAppSelector((s) => s.stores);
  const [filters, setFilters] = useState({ name: "", address: "", page: 1, limit: 4 });
  const [hoveredRating, setHoveredRating] = useState({});
  const totalPages = Math.ceil(total / filters.limit);

  useEffect(() => {
    dispatch(fetchStoresThunk(filters));
  }, [dispatch, filters]);

  const submitRating = (storeId, value) => {
    dispatch(upsertRatingThunk({ storeId, value, refetchParams: filters }));
  };

  
  const stats = [
    {
      id: 'totalStores',
      title: 'Total Stores',
      value: total || 0,
      icon: (
        <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'from-indigo-50 to-white'
    },
    {
      id: 'totalRatings',
      title: 'Your Ratings',
      value: list.filter(store => store.myRating > 0).length,
      icon: (
        <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      color: 'from-amber-50 to-white'
    },
    {
      id: 'avgRating',
      title: 'Avg. Store Rating',
      value: list.length > 0 
        ? (list.reduce((sum, store) => sum + (store.avgRating || 0), 0) / list.length).toFixed(1)
        : 'N/A',
      icon: (
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'from-green-50 to-white'
    }
  ];

  return (
    <UserLayout>
      <div className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.id} className={`bg-gradient-to-br ${stat.color} border rounded-2xl p-6 shadow-sm`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="p-3 rounded-full bg-white shadow-sm">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 md:p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Find Stores</h2>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
               
                <div className="md:col-span-4">
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      id="store-search"
                      type="text"
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition duration-150 ease-in-out"
                      placeholder="Search by store name..."
                      value={filters.name}
                      onChange={(e) => setFilters({ ...filters, name: e.target.value, page: 1 })}
                      onKeyPress={(e) => e.key === 'Enter' && dispatch(fetchStoresThunk(filters))}
                    />
                  </div>
                </div>

                {/* Location Search */}
                <div className="md:col-span-4">
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <input
                      id="location-search"
                      type="text"
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition duration-150 ease-in-out"
                      placeholder="Enter location..."
                      value={filters.address}
                      onChange={(e) => setFilters({ ...filters, address: e.target.value, page: 1 })}
                      onKeyPress={(e) => e.key === 'Enter' && dispatch(fetchStoresThunk(filters))}
                    />
                  </div>
                </div>

                
                <div className="md:col-span-4 flex space-x-3">
                  <button
                    onClick={() => dispatch(fetchStoresThunk(filters))}
                    className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex-1 transition-colors duration-150"
                  >
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                  </button>
                  {(filters.name || filters.address) && (
                    <button
                      type="button"
                      onClick={() => {
                        setFilters({ ...filters, name: '', address: '', page: 1 });
                        dispatch(fetchStoresThunk({ ...filters, name: '', address: '', page: 1 }));
                      }}
                      className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                    >
                      <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="animate-pulse p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-100 rounded w-5/6 mb-4"></div>
                    <div className="h-8 bg-gray-100 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : list.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No stores found</h3>
              <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {list.map((store) => (
                <div key={store._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full">
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{store.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-1">{store.address}</p>
                    
                    <div className="space-y-4 mt-auto">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <RatingStars value={store.avgRating || 0} readOnly />
                          <span className="ml-2 text-sm font-medium text-gray-900">
                            {store.avgRating?.toFixed(1) || 'N/A'}
                            <span className="text-gray-400 font-normal"> ({store.ratingsCount || 0})</span>
                          </span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <p className="text-sm font-medium text-gray-700 mb-2 text-center">Your Rating</p>
                        <div 
                          className="flex justify-center space-x-1"
                          onMouseLeave={() => setHoveredRating(prev => ({ ...prev, [store._id]: null }))}
                        >
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              className={`text-2xl ${(hoveredRating[store._id] || store.myRating || 0) >= star 
                                ? 'text-yellow-400' 
                                : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                              onClick={() => submitRating(store._id, star)}
                              onMouseEnter={() => setHoveredRating(prev => ({ ...prev, [store._id]: star }))}
                              title={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                              aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                          {store.myRating 
                            ? `You rated ${store.myRating} star${store.myRating !== 1 ? 's' : ''}` 
                            : 'Click to rate'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={() => setFilters(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                  disabled={filters.page === 1}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setFilters(prev => ({ ...prev, page: Math.min(totalPages, prev.page + 1) }))}
                  disabled={filters.page === totalPages}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(filters.page - 1) * filters.limit + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(filters.page * filters.limit, total)}
                    </span>{' '}
                    of <span className="font-medium">{total}</span> results
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                      disabled={filters.page === 1}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (filters.page <= 3) {
                        pageNum = i + 1;
                      } else if (filters.page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = filters.page - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setFilters(prev => ({ ...prev, page: pageNum }))}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                            filters.page === pageNum
                              ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                              : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, page: Math.min(totalPages, prev.page + 1) }))}
                      disabled={filters.page === totalPages}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
