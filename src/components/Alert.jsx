const Alert = ({ type, text }) => {
  const alertTypeClass = type === "danger" ? "bg-red-800" : "bg-blue-800";
  const alertLabelClass = type === "danger" ? "bg-red-500" : "bg-blue-500";
  const alertMessage = type === "danger" ? "Failed" : "Success";

  return (
    <div className="fixed bottom-5 right-5 flex justify-center items-center z-50">
      <div
        className={`p-5 ${alertTypeClass} items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex rounded-md`}
        role="alert"
      >
        <p
          className={`flex rounded-full ${alertLabelClass} uppercase px-2 py-1 text-xs font-semibold mr-3`}
        >
          {alertMessage}
        </p>
        <p className="mr-2 text-left">{text}</p>
      </div>
    </div>
  );
};

export default Alert;
