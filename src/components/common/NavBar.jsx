import { Link } from 'react-router-dom'

export const NavBar = () => {
    return (
        <nav className="flex flex-row gap-5">
            <Link to={`/base`}>base</Link>
            <Link to={`/week1`}>week1</Link>
            <Link to={`/week2`}>week2</Link>
            <Link to={`/color`}>color</Link>
        </nav>
    )
}
