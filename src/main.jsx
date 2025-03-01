import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import StudyRouter from './router'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <StudyRouter />
    </StrictMode>
)
