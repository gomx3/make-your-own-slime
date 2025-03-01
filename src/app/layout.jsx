import '../styles/tailwind.css'
import { NavBar } from '../components/common'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
    return (
        <>
            <NavBar />
            <main className="">
                <Outlet />
            </main>
        </>
    )
}
