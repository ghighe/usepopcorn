const Button = ({ children, onClick }) => {
  return (
    <button className="btn-toggle" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
