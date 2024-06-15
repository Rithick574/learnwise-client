import { FC, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface EnrollmentChartProps {
  enrollmentsData: [string, number][];
}

const EnrollmentChart: FC<EnrollmentChartProps> = ({ enrollmentsData }) => {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const processEnrollmentData = () => {
      const labelsArray = enrollmentsData.map((item) => item[0]);
      const dataArray = enrollmentsData.map((item) => item[1]);
      setLabels(labelsArray);
      setData(dataArray);
    };

    if (enrollmentsData.length > 0) {
      processEnrollmentData();
    }
  }, [enrollmentsData]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Enrollments',
        data: data,
        backgroundColor: '#3B82F6',
        borderRadius: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="rounded-lg w-full border">
      <h1 className="text-lg text-center font-bold mt-6 mb-4">Enrollments Over Time</h1>
      <Bar style={{ height: "500px" }} data={chartData} options={chartOptions} />
    </div>
  );
};

export default EnrollmentChart;
