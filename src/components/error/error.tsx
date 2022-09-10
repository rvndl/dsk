interface Props {
  msg?: string;
}

export const Error = ({ msg }: Props) => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="px-10 py-2.5 border border-red-300 rounded-lg bg-red-500/40 w-max">
      <p className="text-sm font-semibold text-red-500">{msg}</p>
    </div>
  </div>
);
