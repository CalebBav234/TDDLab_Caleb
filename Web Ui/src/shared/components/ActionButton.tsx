import "./ActionButton.css";

type ActionButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  variantStyle?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
};

const ActionButton = ({
  children,
  onClick,
  variantStyle = "primary",
  type = "button",
}: ActionButtonProps) => {
  return (
    <button type={type} className={`action-button action-button--${variantStyle}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default ActionButton;

