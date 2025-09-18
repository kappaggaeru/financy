import { motion } from "framer-motion"

type AnimatedStepProps = {
    id: string
    children: React.ReactNode
    duration?: number
    initialX: number
    animateX?: number
    exitX: number
    initialOpacity: number
    animateOpacity?: number
    exitOpacity: number
}

export const AnimatedStep = ({ id, children, duration = 0.4, initialX, animateX, exitX, initialOpacity, animateOpacity, exitOpacity }: AnimatedStepProps) => (
    <motion.div
        key={id}
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -200, opacity: 0 }}
        transition={{ duration, type: "spring", bounce: 0.3 }}
    >
        {children}
    </motion.div>
)
