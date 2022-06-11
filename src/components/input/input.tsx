interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: Props) => {
  return (
    <div>
      <input {...rest} />
    </div>
  );
};

export default Input;
