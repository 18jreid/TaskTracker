export const TaskWidget = ({ children, ...props }) => {
  return (
    <div className="shadow-md flex flex-col p-2 grid grid-cols-2 bg-gray-400 m-4">
      <div className="grid grid-flow-row">
        <div className="break-words shadow-md flex flex-col p-4 bg-gray-300">Task: {props.title}</div>
        <div className="break-words shadow-md flex flex-col p-4 bg-gray-300">Description {props.description}</div>
        <div className="break-words shadow-md flex flex-col p-4 bg-gray-300">Assigned: {props.assigned}</div>
      </div>
      <div className="text-right">
        <button
          className="border-2 border-green-800 bg-green-600 rounded-lg text-white w-1/3 text-center h-1/4"
          {...props}
        >
          Start
        </button>
      </div>
    </div>
  );
};
