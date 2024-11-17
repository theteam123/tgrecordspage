interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
    >
      <option value="all">All Countries</option>
      <option value="Algeria">Algeria</option>
      <option value="Egypt">Egypt</option>
      <option value="Panama">Panama</option>
      <option value="Slovenia">Slovenia</option>
      <option value="South Africa">South Africa</option>
    </select>
  );
}