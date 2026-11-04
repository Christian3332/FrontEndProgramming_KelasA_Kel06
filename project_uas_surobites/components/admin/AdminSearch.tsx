import { Form } from "react-bootstrap";
import ui from "@/app/styles/admin-ui.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
};

export default function AdminSearch({ value, onChange, placeholder, label }: Props) {
  return (
    <div className={`position-relative ${ui.search}`}>
      <i className={`fa-solid fa-magnifying-glass position-absolute top-0 bottom-0 d-flex align-items-center ${ui.inputSymbol}`}></i>
      <Form.Control
        type="search"
        className={`${ui.input} ${ui.searchInput}`}
        placeholder={placeholder}
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
