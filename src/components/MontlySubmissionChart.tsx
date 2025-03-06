import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const MonthlySubmissionChart: React.FC = () => {
  // Hanya satu series
  const series = [
    {
      name: 'Total Submissions',
      data: [10, 20, 15, 40, 25, 50, 30, 60, 45, 70, 55, 80],
    },
  ];

  // Opsi konfigurasi chart dengan teks berwarna hijau
  const options: ApexOptions = {
    chart: {
      id: 'monthly-submission-chart',
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr',
        'May', 'Jun', 'Jul', 'Aug',
        'Sep', 'Oct', 'Nov', 'Dec',
      ],
      labels: {
        style: {
          colors: '#008FFB', // Teks sumbu X berwarna hijau
        },
      },
    },
    yaxis: {
      title: {
        text: 'Total Submissions',
        style: {
          color: '#008FFB', // Teks judul sumbu Y berwarna hijau
        },
      },
      labels: {
        style: {
          colors: '#008FFB', // Teks sumbu Y berwarna hijau
        },
      },
    },
    colors: ['oklch(0.795 0.184 86.047)'],
    stroke: {
      curve: 'smooth', // Membuat garis area lebih halus
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        type: 'vertical', // Gradasi vertikal
        opacityFrom: 0.6,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: false, // Menonaktifkan label di area
    },
    legend: {
      position: 'bottom',
      labels: {
        colors: '#008FFB', // Teks legend berwarna hijau
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    title: {
      text: 'Monthly Submission Chart',
      align: 'left',
      style: {
        color: '#008FFB', // Teks judul chart berwarna hijau
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Chart
        options={options}
        series={series}
        type="area"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default MonthlySubmissionChart;
