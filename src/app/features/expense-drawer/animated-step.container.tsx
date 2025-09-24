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
        initial={{ x: initialX, opacity: initialOpacity }}
        animate={{ x: animateX, opacity: animateOpacity }}
        exit={{ x: exitX, opacity: exitOpacity }}
        transition={{ duration, type: "spring", bounce: 0.3 }}
    >
        {children}
    </motion.div>
)
