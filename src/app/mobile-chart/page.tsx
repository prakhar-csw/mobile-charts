import Script from "next/script";
import ChartUI from "@/components/page-components/ChartUI";

const page = () => {
  return (
    <main className="h-full flex flex-col bg-[#F0F4FF]">
      <Script strategy="beforeInteractive" src="datafeeds/udf/dist/bundle.js" />
      <ChartUI marketUpColor="" marketDownColor="" />
    </main>
  );
};

export default page;
