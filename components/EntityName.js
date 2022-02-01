const EntityName = (props) => {
  return (
    <div className="flex justify-center justify-items-center sm:my-4">
      <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-gray-600 pb-2">
        {props.name}
      </h1>
    </div>
  );
};

export default EntityName;
