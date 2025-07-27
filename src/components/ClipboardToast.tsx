import * as motion from 'motion/react-client'
import { CloseButton } from '@chakra-ui/react'

const ClipboardToast = ({ handleToast }: { handleToast: () => void }) => {
    return (
        <div className="absolute top-0 flex justify-center w-full">
            <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: [0, 24, 16, 20] }}
                transition={{
                    duration: 0.8,
                    ease: 'easeOut',
                }}
                style={{
                    backgroundColor: '#e5e7eb',
                    border: '1px #d1d5dc solid',
                    borderRadius: '8px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 7px 10px -3px var(rgb(0 0 0 / 0.1))',
                }}
                className="
                    flex flex-row items-center p-3 gap-2 rounded-lg bg-gray-800
                    shadow-lg whitespace-nowrap text-center
                "
            >
                <span style={{ padding: '8px', color: '#1e2939' }}>URL copied successfully! 🤓</span>

                <CloseButton onClick={handleToast} />
            </motion.div>
        </div>
    )
}

export default ClipboardToast
