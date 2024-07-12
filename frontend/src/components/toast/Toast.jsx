function Toast({ message }) {
  return (
    <div
      className="toast show position-fixed bottom-0 end-0 m-3 colo"
      role="alert"
      style={{ zIndex: 1055 }}
    >
      <div className="toast-body bg-danger text-white">{message}</div>
    </div>
  );
}

export default Toast;
