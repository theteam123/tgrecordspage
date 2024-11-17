interface ColumnFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}

export function ColumnFilter({ value, onChange, options, placeholder }: ColumnFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}