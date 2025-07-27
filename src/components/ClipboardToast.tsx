import * as motion from 'motion/react-client'
import { CloseButton } from '@chakra-ui/react'

const ClipboardToast = ({ handleToast }: { handleToast: () => void }) => {
    return (
        <div className="absolute top-0 flex justify-center w-full">
            <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: [0, 24, 16, 20] }}
                transition={{
                    duration: 0.7,
                    ease: 'easeIn',
                }}
                style={{
                    padding: '8px 0',
                    backgroundColor: '#e5e7eb',
                    border: '1px #d1d5dc solid',
                    borderRadius: '8px',
                    whiteSpace: 'nowrap',
                }}
            >
                <span style={{ paddingLeft: '14px', color: '#1e2939' }}>URL copied successfully! 🤓</span>

                <CloseButton onClick={handleToast} />
            </motion.div>
        </div>
    )
}

export default ClipboardToast
