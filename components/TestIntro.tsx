import Quiz from "./Quiz";

export default function TestIntro({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="container">
      <section className="hero" style={{ paddingBottom: 16 }}>
        <h1>{title}</h1>
        <p className="lead">{intro}</p>
      </section>
      <section className="section">
        <Quiz />
      </section>
      {children && <section className="section" style={{ maxWidth: 760, margin: "0 auto" }}>{children}</section>}
    </div>
  );
}
