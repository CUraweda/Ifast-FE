import React from 'react';

interface Pengajuan {
  id: number;
  nama: string;
  tanggal: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

const dataPengajuan: Pengajuan[] = [
  { id: 1, nama: 'Pengajuan 1', tanggal: '2025-02-15', status: 'Approved' },
  { id: 2, nama: 'Pengajuan 2', tanggal: '2025-02-16', status: 'Pending' },
  { id: 3, nama: 'Pengajuan 3', tanggal: '2025-02-17', status: 'Rejected' },
  { id: 3, nama: 'Pengajuan 3', tanggal: '2025-02-17', status: 'Rejected' },
  { id: 3, nama: 'Pengajuan 3', tanggal: '2025-02-17', status: 'Rejected' },
  { id: 3, nama: 'Pengajuan 3', tanggal: '2025-02-17', status: 'Rejected' },
  { id: 3, nama: 'Pengajuan 3', tanggal: '2025-02-17', status: 'Rejected' },
  { id: 3, nama: 'Pengajuan 3', tanggal: '2025-02-17', status: 'Rejected' },
  { id: 3, nama: 'Pengajuan 3', tanggal: '2025-02-17', status: 'Rejected' },
  { id: 3, nama: 'Pengajuan 3', tanggal: '2025-02-17', status: 'Rejected' },
];

const HistorySubmissions: React.FC = () => {
  return (
    <div className='w-full'>

    <div className="overflow-x-auto p-4">
      <table className="table w-full table-zebra">
        <thead>
          <tr>
            <th>No</th>
            <th>Submission Name</th>
           
            <th>Type</th>

            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dataPengajuan.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.nama}</td>
              
              <td>{item.nama}</td>

              <td>
               
                {item.status === 'Approved' && (
                  <span className="badge badge-success">{item.status}</span>
                )}
                {item.status === 'Pending' && (
                  <span className="badge badge-warning">{item.status}</span>
                )}
                {item.status === 'Rejected' && (
                  <span className="badge badge-error">{item.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default HistorySubmissions;
