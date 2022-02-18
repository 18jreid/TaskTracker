export const ProjectWidget = ({ children, ...props }) => {
  return (
    <button className="shadow-md flex flex-col p-3 pt-8 pb-8 m-4 text-center bg-gray-300 rounded-md" {...props}>
      {children}
    </button>
  );
};
