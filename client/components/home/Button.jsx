export const Button = ({ children, ...props }) => {
  return (
    <button className="p-4 m-2 text-gray-100 rounded-md bg-gray-600" {...props}>
      {children}
    </button>
  );
};
