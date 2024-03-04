export default function MobilePageLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="h-dvh">
        {children}
      </section>
    )
  }