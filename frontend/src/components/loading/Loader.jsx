function Loader({message}) {
  return (
    <button class="btn btn-primary w-100" type="button" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  {message}
</button>
  );
}

export default Loader;
