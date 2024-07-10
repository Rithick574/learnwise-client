import { FC } from 'react';
import jsPDF from 'jspdf';
import logoImage from '@/assets/learnwiseLogo.png'; 
import { PdfUpload } from './PdfUpload';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { sendCertificateData } from './certificateApi';

interface CertificateProps {
  userName: string;
  courseName: string;
}

const CertificateGenerator: FC<CertificateProps> = ({ userName, courseName }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const generateCertificate = async() => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // Set background color
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, 297, 210, 'F');

    // Add border
    doc.setDrawColor(0);
    doc.setLineWidth(5);
    doc.rect(10, 10, 277, 190);

    // Add logo
    const logoWidth = 20;
    const logoHeight = 20;
    doc.addImage(logoImage, 'PNG', 20, 20, logoWidth, logoHeight);

    // Add logo text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 0);
    doc.text('LearnWise', 20 + logoWidth + 5, 20 + (logoHeight / 2), { baseline: 'middle' });

    // Set font for the rest of the document
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(30);
    doc.setTextColor(0, 0, 0);

    // Add title
    doc.text('Certificate of Course Completion', 70.5, 60, {}, { align: 'center' });

    // Add content
    doc.setFontSize(20);
    doc.setFont('helvetica', 'normal');
    doc.text('This is to certify that', 148.5, 90, { align: 'center' });

    // Add user name
    doc.setFontSize(30);
    doc.setFont('helvetica', 'bold');
    doc.text(userName, 148.5, 110, { align: 'center' });

    // Add course information
    doc.setFontSize(20);
    doc.setFont('helvetica', 'normal');
    doc.text('has successfully completed the course', 148.5, 130, { align: 'center' });

    // Add course name
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(courseName, 148.5, 150, { align: 'center' });

    // Add congratulatory note
    doc.setFontSize(16);
    doc.setFont('helvetica', 'italic');
    doc.text('Congratulations on your achievement!', 148.5, 170, { align: 'center' });

    // Add date
    const date = new Date().toLocaleDateString();
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${date}`, 148.5, 190, { align: 'center' });

    // Save the PDF
    doc.save(`${userName}_${courseName}_Certificate.pdf`);

    // Get PDF blob
    const pdfBlob = doc.output('blob');
    const pdfFile = new File([pdfBlob], `${userName}_${courseName}_Certificate.pdf`, { type: 'application/pdf' });
    try {
      const uploadUrl = await PdfUpload(pdfFile);
      if (uploadUrl) {
        console.log("🚀 ~ file: CertificateGenerator.tsx:87 ~ generateCertificate ~ uploadUrl:", uploadUrl)
        await sendCertificateData(user._id, courseName, uploadUrl);
        console.log('Certificate data sent to backend successfully');
      } else {
        console.error('PDF upload failed');
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
    }
  };

  return (
    <div>
      <button onClick={generateCertificate} className='btn btn-ghost'>Download Certificate</button>
    </div>
  );
};

export default CertificateGenerator;
