interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ ...rest }: Props) => {
  return (
    <div>
      <input {...rest} />
    </div>
  );
};
