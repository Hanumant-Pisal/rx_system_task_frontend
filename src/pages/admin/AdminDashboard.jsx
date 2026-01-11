import { useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { adminFetchStatsThunk } from "../../features/admin/adminThunks";
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Inner() {
  const dispatch = useAppDispatch();
  const { stats, statsLoading } = useAppSelector((s) => s.admin);

  useEffect(() => {
    dispatch(adminFetchStatsThunk());
  }, [dispatch]);

  const cardIcons = {
    users: (
      <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    stores: (
      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    ratings: (
      <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  };

  const cardTitles = {
    users: 'Total Users',
    stores: 'Total Stores',
    ratings: 'Total Ratings'
  };

  const cardColors = {
    users: 'from-indigo-50 to-white',
    stores: 'from-green-50 to-white',
    ratings: 'from-amber-50 to-white'
  };

  
  const chartData = {
    labels: ['Users', 'Stores', 'Ratings'],
    datasets: [
      {
        label: 'Count',
        data: [stats.users || 0, stats.stores || 0, stats.ratings || 0],
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)', 
          'rgba(16, 185, 129, 0.8)', 
          'rgba(245, 158, 11, 0.8)', 
        ],
        borderColor: [
          'rgba(79, 70, 229, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
        ],
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.parsed.y.toLocaleString()}`;
          }
        },
        displayColors: false,
        padding: 8,
        titleFont: {
          size: 12
        },
        bodyFont: {
          size: 12
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          callback: function(value) {
            return value.toLocaleString();
          },
          font: {
            size: 11
          },
          padding: 4
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11
          },
          padding: 2
        }
      }
    }
  };

  return (
    <AdminLayout>
      <div className="">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {["users", "stores", "ratings"].map((k) => (
            <div 
              key={k} 
              className={`bg-gradient-to-br ${cardColors[k]} rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {cardTitles[k]}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-800">
                    {statsLoading ? (
                      <span className="inline-block w-16 h-8 bg-gray-200 rounded animate-pulse"></span>
                    ) : (
                      stats[k]?.toLocaleString()
                    )}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white shadow-sm">
                  {cardIcons[k]}
                </div>
              </div>
             
            </div>
          ))}
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="mb-3">
              <h2 className="text-base font-semibold text-gray-800">Platform Statistics</h2>
            </div>
            <div className="h-64">
              {statsLoading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              ) : (
                <Bar data={chartData} options={chartOptions} />
              )}
            </div>
          </div>

         
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="mb-3">
              <h2 className="text-base font-semibold text-gray-800">Data Distribution</h2>
            </div>
            <div className="h-64">
              {statsLoading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              ) : (
                <div className="h-full">
                  <Pie data={{
                    labels: ['Users', 'Stores', 'Ratings'],
                    datasets: [{
                      data: [stats.users || 0, stats.stores || 0, stats.ratings || 0],
                      backgroundColor: [
                        'rgba(79, 70, 229, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(245, 158, 11, 0.8)'
                      ],
                      borderColor: [
                        'rgba(79, 70, 229, 1)',
                        'rgba(16, 185, 129, 1)',
                        'rgba(245, 158, 11, 1)'
                      ],
                      borderWidth: 1,
                      hoverOffset: 4
                    }]
                  }} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          boxWidth: 12,
                          padding: 16,
                          font: {
                            size: 12
                          }
                        }
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value.toLocaleString()} (${percentage}%)`;
                          }
                        },
                        displayColors: false,
                        padding: 8,
                        titleFont: {
                          size: 12
                        },
                        bodyFont: {
                          size: 12
                        }
                      }
                    }
                  }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute roles={["admin"]}>
      <Inner />
    </ProtectedRoute>
  );
}
