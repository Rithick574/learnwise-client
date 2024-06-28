import React from "react";
import IndexHeader from "@/components/home/IndexHeader";
import IndexSection from "@/components/home/IndexSection";
import IndexReview from "@/components/home/IndexReview";
import ApplyasInstructor from "@/components/home/ApplyasInstructor";
import IndexFeatures from "@/components/home/IndexFeatures";



const IndexPage: React.FC = () => {
  return (
    <>
      <IndexHeader />
      <IndexSection />
      <IndexReview />
      <IndexFeatures />
      <ApplyasInstructor />
    </>
  );
};

export default IndexPage;
