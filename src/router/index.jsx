import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from '../app/layout'
import StudyPage from '../app/page'
import Week1 from '../app/week1/page'
import Week2 from '../app/week1/page2'
import Color from '../app/color/page'
import Base from '../app/base'
import TestPage from '../app/test/page'

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
                path: '/week2',
                element: <Week2 />,
            },
            {
                path: '/base',
                element: <Base />,
            },
            {
                path: '/color',
                element: <Color />,
            },
            {
                path: '/test',
                element: <TestPage />,
            },
        ],
    },
])

export default function StudyRouter() {
    return <RouterProvider router={studyRouter} />
}
