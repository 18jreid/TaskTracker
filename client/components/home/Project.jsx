export const Project = ({ children, ...props }) => {
  return (
    <button className="shadow-md pt-8 pb-8 m-4 text-center bg-gray-300" {...props}>
      {children}
    </button>
  );
};
