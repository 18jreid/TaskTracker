export const Project = ({ children, ...props }) => {
  if (props.create == 'true') {
    return (
      <div className="shadow-md m-4 text-center bg-gray-300 rounded-md text-9xl pb-4" {...props}>
        <button className="h-full w-full">{props.title}</button>
      </div>
    );
  } else {
    return (
      <div className="shadow-md m-4 text-center bg-gray-300 rounded-md overflow-auto" {...props}>
        <button className="h-full w-full">
          <h1 className="h-12 w-full pt-3 break-words">{props.title}</h1>
          <text className="bg-gray-600 text-white text-center inline-block h-full w-full p-2 flex-wrap break-words rounded-b-xl rounded-bl-xl">
            {props.description}
          </text>
        </button>
      </div>
    );
  }
};
