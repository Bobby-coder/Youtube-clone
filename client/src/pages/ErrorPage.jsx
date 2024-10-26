import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    console.log(error);
    return (
    <div className="flex items-center justify-center h-screen flex-col space-y-4">
        <img src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png" alt="Monkey" className="w-24 h-24" />
        <h1 className="text-4xl font-bold">Oops!</h1>
        <p className="text-lg">Sorry, an unexpected error has occurred.</p>
        <p className="text-xl font-bold">
            <i>{error.status} {error.statusText}</i>
        </p>
        <p>{error.data}</p>
        <Link to="/" className="text-blue-500">Go to Home</Link>

    </div>
    )
    
}

export default ErrorPage;
