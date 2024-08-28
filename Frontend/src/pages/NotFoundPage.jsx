import { Link } from "react-router-dom"

const NotFoundPage = () => {
    return (
        <div>
            404 Not Found <br />
            <Link to={'/'}>Go back to home page</Link>
        </div>
    )
}

export default NotFoundPage