export default function BusinessLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <nav>Home Base</nav>   
        {children}
      </section>
    )
  }