import ui from "@/app/styles/admin-ui.module.css";

type Props = {
  id: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export default function SectionHead({ id, title, description, children }: Props) {
  return (
    <div className={`d-flex flex-wrap align-items-end justify-content-between ${ui.sectionHead}`}>
      <div>
        <h2 id={id} className={ui.sectionTitle}>{title}</h2>
        <p className={ui.sectionText}>{description}</p>
      </div>
      {children}
    </div>
  );
}
