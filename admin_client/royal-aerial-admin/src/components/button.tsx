

interface ButtonProps {
    onClick?: () => void;
    text: string;
    type?: 'submit' | 'reset' | 'button'; 
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, type, disabled})  => {
  return (
    <button type= {type} onClick={onClick} className="w-auto h-[50px] bg-primary text-white uppercase font-bold cursor-pointer flex justify-center items-center hover:bg-tertiary-100 hover:text-primary hover:border hover:border-secondary-color" disabled={disabled}>{text}</button>
  );
};

export default Button;
