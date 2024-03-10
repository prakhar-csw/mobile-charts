import Script from "next/script";
import ChartUI from "@/components/page-components/ChartUI";
import { DATA_FEED_URL } from "../utils/constants";

const page = () => {
  const dataFeedUrl = DATA_FEED_URL;
  return (
    <main className="h-full flex flex-col">
      <Script strategy="beforeInteractive" src="datafeeds/udf/dist/bundle.js" />
      <ChartUI dataFeedUrl={dataFeedUrl} marketUpColor="" marketDownColor="" />
    </main>
  );
};

export default page;
