import React from "react";
import IndexHeader from "@/components/home/IndexHeader";
import IndexSection from "@/components/home/IndexSection";
import IndexReview from "@/components/home/IndexReview";
import ApplyasInstructor from "@/components/home/ApplyasInstructor";
import IndexFeatures from "@/components/home/IndexFeatures";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";


const IndexPage: React.FC = () => {
  return (
    <>
     <Header />
      <IndexHeader />
      <IndexSection />
      <IndexReview />
      <IndexFeatures />
      <ApplyasInstructor />
      <Footer />
    </>
  );
};

export default IndexPage;
