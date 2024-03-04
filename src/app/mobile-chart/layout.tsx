export default function MobilePageLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
    <section className="h-dvh">
        {children}
      </section>
    )
  };