type FormInputProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  error?: string;
};

export default function FormInput({
  label,
  name,
  type = 'text',
  value,
  placeholder,
  onChange,
  error,
}: FormInputProps) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      <span>{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
      {error ? <span className="mt-2 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
