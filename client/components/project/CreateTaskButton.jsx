export const CreateTaskButton = ({ children, ...props }) => {
  return (
    <button className="shadow-md m-4 text-center bg-gray-300 rounded-md text-4xl p-4" {...props}>
      Create New Task
    </button>
  );
};
