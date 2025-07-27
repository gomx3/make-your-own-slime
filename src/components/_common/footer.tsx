export default function Footer() {
    const handleGithubClick = () => window.open('https://github.com/gomx3', '_blank')

    return (
        <footer className="fixed bottom-0 w-full flex justify-end bg-linear-to-t from-gray-100 to-transparent from-50%">
            <button onClick={handleGithubClick} className="cursor-pointer">
                link to github @gomx3
            </button>
        </footer>
    )
}
