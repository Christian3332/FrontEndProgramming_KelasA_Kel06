type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
};

export default function AdminSearch({ value, onChange, placeholder, label }: Props) {
  return (
    <div className="admin-search">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        type="search"
        className="form-control"
        placeholder={placeholder}
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
