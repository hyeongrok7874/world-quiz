import Head from "next/head";
import React from "react";

interface HelmetProps {
  title: string;
}

const Helmet: React.FC<HelmetProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default Helmet;
