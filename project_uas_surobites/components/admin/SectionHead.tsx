type Props = {
  id: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export default function SectionHead({ id, title, description, children }: Props) {
  return (
    <div className="section-head">
      <div>
        <h2 id={id}>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
