import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface PieChartProps {
  series: number[];
  labels: string[];
}

// Fungsi untuk menghasilkan satu warna acak dalam format oklch
const generateRandomOklchColor = () => {
  const lightness = 0.546; // nilai lightness tetap
  const chroma = 0.245;    // nilai chroma tetap
  const hue = Math.random() * 360; // hue acak antara 0 dan 360
  return `oklch(${lightness} ${chroma} ${hue.toFixed(3)})`;
};

// Fungsi untuk menghasilkan array warna acak sebanyak count
const generateRandomColors = (count: number) => {
  return Array.from({ length: count }, () => generateRandomOklchColor());
};

const PieChart: React.FC<PieChartProps> = ({ series, labels }) => {
  // Menghasilkan tepat 10 warna acak
  const chartColors = generateRandomColors(10);

  const chartOptions: ApexOptions = {
    labels: labels,
    colors: chartColors, // Menggunakan warna acak untuk setiap pie slice
    legend: {
      position: 'bottom' as const,
      labels: {
        colors: chartColors, // Warna teks legend sama dengan warna pie chart
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
        },
      },
    ],
  };

  return (
    <Chart
      options={chartOptions}
      series={series}
      type="pie"
      width="100%"
      height="100%"
    />
  );
};

export default PieChart;
