export const Button = ({ children, ...props }) => {
  if (props.isactive == "true") {
    return (
      <button className="p-4 m-2 text-gray-100 rounded-md bg-gray-700 border-2" {...props}>
        {children}
      </button>
    );
  } else {
    return (
      <button className="p-4 m-2 text-gray-100 rounded-md bg-gray-600" {...props}>
        {children}
      </button>
    );
  }
};
