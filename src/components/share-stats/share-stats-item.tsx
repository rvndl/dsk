interface Props {
  name: string;
  value: number | string;
}

export const ShareStatsItem = ({ name, value }: Props) => {
  return (
    <div className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6">
      <dt className="text-sm font-medium text-gray-500 truncate">{name}</dt>
      <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
    </div>
  );
};
