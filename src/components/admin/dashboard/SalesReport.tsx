import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
import { format } from 'date-fns';
import { URL } from '@/Common/api';
import toast from 'react-hot-toast';


interface SalesReportProps {
  startDate: Date;
  endDate: Date;
}

interface Sale {
  _id: {
    year: number;
    month: number;
    day: number;
  };
  totalProfit: number;
  courseDetails: {
    title: string;
    pricing:{
     amount: number;
    }
    instructorRef: string;
  }[];
}

const SalesReport: FC<SalesReportProps> = ({ startDate, endDate }) => {
  const [salesData, setSalesData] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(`${URL}/course/enrollment/salesreport`, {
          params: { startDate: format(startDate, 'yyyy-MM-dd'), endDate: format(endDate, 'yyyy-MM-dd') },
        });
        console.log("🚀 ~ file: SalesReport.tsx:37 ~ fetchSalesData ~ response:", response)
        setSalesData(response.data.data);
      } catch (error) {
        toast.error('Error fetching sales data:')
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, [startDate, endDate]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    const start = format(startDate, 'yyyy-MM-dd');
    const end = format(endDate, 'yyyy-MM-dd');
    
    doc.setFontSize(18);
    doc.text(`Sales Report ${start} to ${end}`, 14, 22);

    const tableColumns = ['Date', 'Course Title', 'Amount', 'Instructor Ref'];
    const tableRows: (string | number)[][] = [];

    let totalRevenue = 0;
    salesData.forEach((sale) => {
      const saleDate = `${sale._id.year}-${sale._id.month}-${sale._id.day}`;
      sale.courseDetails.forEach((course) => {
        const saleData = [saleDate, course.title, course.pricing.amount, course.instructorRef];
        tableRows.push(saleData);
      });
      totalRevenue += sale.totalProfit;
    });
    tableRows.push(['', '', 'Total Revenue:', totalRevenue]);

    (doc as any).autoTable({ 
      startY: 30,
      head: [tableColumns],
      body: tableRows,
    });

    doc.save('sales_report.pdf');
  };

  return (
    <div className="flex justify-end">
      <button onClick={downloadPDF} className='bg-transparent border rounded-lg border-gray-300 hover:btn-ghost  btn-xs'>Download PDF</button>
    </div>
  );
};

export default SalesReport;
