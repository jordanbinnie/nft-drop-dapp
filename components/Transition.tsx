import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

interface Props {
    children: React.ReactNode
}

function Transition({ children }: Props) {
    const { asPath } = useRouter()

    const variants = {
        out: {
            opacity: 0,
            y: 40,
            transition: {
                duration: 0.75
            }
        },
        in: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.75,
                delay: 0.5
            }
        }
    }

    return (
        <div className="overflow-hidden">
            <AnimatePresence
                initial={false}
                mode="wait"
            >
                <motion.div 
                    key={asPath}
                    variants={variants}
                    animate="in"
                    initial="out"
                    exit="out"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default Transition