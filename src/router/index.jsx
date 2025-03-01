import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import StudyPage from '../app/page'
import Week1 from '../app/week1/page'
import RootLayout from '../app/layout'
import Week111 from '../app/week1/page2'

const studyRouter = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <StudyPage />,
            },
            {
                path: '/week1',
                element: <Week1 />,
            },
            {
                path: '/week111',
                element: <Week111 />,
            },
        ],
    },
])

export default function StudyRouter() {
    return <RouterProvider router={studyRouter} />
}
