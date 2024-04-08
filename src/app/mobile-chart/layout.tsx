import { Metadata } from "next";
import Script from "next/script";


export const metadata: Metadata = {
  title: "Trading View Charts",
};

export default function MobilePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section >
      <Script strategy="beforeInteractive" src="datafeeds/udf/dist/bundle.js" />
      {children}
    </section>
  );
}
