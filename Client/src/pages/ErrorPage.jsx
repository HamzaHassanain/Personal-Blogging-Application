import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an error has occurred.</p>
      <p className="error-body">
        <i>
          {error.statusText} {error.message} {error.additionalMessage}
        </i>
      </p>
    </div>
  );
}
