import { FC, useEffect, useRef, useState } from 'react';

interface CategoryEnrollmentChartProps {
  enrollmentsData: [string, number][];
}

declare global {
  interface Window {
    google: any;
  }
}

const CategoryEnrollmentChart: FC<CategoryEnrollmentChartProps> = ({ enrollmentsData }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const prepareChartData = () => {
      if (enrollmentsData.length > 0) {
        const categoryCounts = enrollmentsData.reduce((acc: any, enrollment: [string, number]) => {
          const category = enrollment[0];
          const count = enrollment[1];
          acc[category] = (acc[category] || 0) + count;
          return acc;
        }, {});

        // Convert category counts to an array suitable for the chart
        const chartDataArray = Object.entries(categoryCounts).map(([category, count]) => [category, count]);
        setChartData([['Category', 'Enrollments'], ...chartDataArray]);
      }
    };

    prepareChartData();
  }, [enrollmentsData]);

  useEffect(() => {
    if (chartRef.current && chartData.length > 0) {
      // Ensure google.charts is available
      if (window.google && window.google.charts) {
        window.google.charts.load('current', { packages: ['corechart'] });
        window.google.charts.setOnLoadCallback(drawChart);
      }
    }
  }, [chartData]);

  const drawChart = () => {
    if (!window.google) return;

    const data = window.google.visualization.arrayToDataTable(chartData);

    const options = {
      title: 'Category-Wise Enrollments',
      pieHole: 0.4,
      is3D: true,
      legend: { position: 'bottom' },
      backgroundColor: 'transparent', 
      chartArea: { backgroundColor: 'transparent' }, 
      titleTextStyle: { color: '#FFFFFF' },
      legendTextStyle: { color: '#FFFFFF' },
    };

    const chart = new window.google.visualization.PieChart(chartRef.current!);
    chart.draw(data, options);
  };

  return (

    <div className="rounded-lg">
        <div className='h-[400px]' ref={chartRef}  />
    </div>
  )
};

export default CategoryEnrollmentChart;
