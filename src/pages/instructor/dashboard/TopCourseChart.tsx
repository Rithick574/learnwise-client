import { FC, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface TopCourse {
  _id: string;
  totalEnrollments: number;
  course: {
    _id: string;
    title: string;
  };
}

interface TopCourseChartProps {
  topCoursesData: TopCourse[];
}

const TopCourseChart: FC<TopCourseChartProps> = ({ topCoursesData }) => {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const processTopCourseData = () => {
      const labelsArray = topCoursesData.map((item) => item.course.title);
      const dataArray = topCoursesData.map((item) => item.totalEnrollments);
      setLabels(labelsArray);
      setData(dataArray);
    };

    if (topCoursesData.length > 0) {
      processTopCourseData();
    }
  }, [topCoursesData]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Total Enrollments',
        data: data,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: '#3B82F6',
        borderWidth: 2,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
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
          display: true,
        },
      },
    },
  };

  return (
    <div className="rounded-lg w-full border">
      <h1 className="text-lg text-center font-bold mt-6 mb-4">Top Courses by Enrollments</h1>
      <Line style={{ height: "500px" }} data={chartData} options={chartOptions} />
    </div>
  );
};

export default TopCourseChart;
