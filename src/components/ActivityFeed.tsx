import React from 'react';

/**
 * Tipe data untuk setiap item aktivitas.
 * Silakan sesuaikan dengan struktur data yang Anda butuhkan.
 */
interface ActivityItem {
  id: number;
  user: string;
  action: string;
  timestamp: string; // bisa juga Date, tergantung kebutuhan
}

/**
 * Data contoh aktivitas. Anda bisa mengganti ini
 * dengan data yang diambil dari API, database, dsb.
 */
const activityData: ActivityItem[] = [
  {
    id: 1,
    user: 'John Doe',
    action: 'Created new submission #120',
    timestamp: '2025-03-05 10:20',
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'Approved submission #118',
    timestamp: '2025-03-04 14:10',
  },
  {
    id: 3,
    user: 'Admin',
    action: 'Rejected submission #119',
    timestamp: '2025-03-03 09:05',
  },
];

const ActivityFeed: React.FC = () => {
  return (
    <div className="p-4 h-full">
      {/* Judul */}
      <h2 className="text-xl font-bold mb-2">Recent Updates</h2>

      {/* Kontainer daftar aktivitas */}
      <div className="flow-root">
        <ul className="divide-y divide-base-300">
          {activityData.map((item) => (
            <li key={item.id} className="py-4">
              <div className="flex space-x-3">
                {/* Contoh "avatar" inisial user */}
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                    {item.user.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  {/* Baris atas: nama user + timestamp */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{item.user}</h3>
                    <p className="text-xs">{item.timestamp}</p>
                  </div>
                  {/* Baris bawah: ringkasan aksi */}
                  <p className="text-sm">{item.action}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityFeed;
