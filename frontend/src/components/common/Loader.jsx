import { motion } from "framer-motion";
import { FaBolt } from "react-icons/fa";

const Loader = () => {
    return (
        <div className="text-primary flex min-h-screen items-center justify-center px-6">
            <div className="glass-panel center-stack rounded-2xl px-8 py-10 sm:px-10">
                <div className="relative flex h-16 w-16 items-center justify-center">
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.3, repeat: Infinity, ease: "linear" }}
                        className="border-subtle absolute inset-0 rounded-full border-[3px] border-t-brand-400 border-r-cyan-400"
                    />
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 shadow-[0_0_24px_rgba(99,102,241,0.5)]">
                        <FaBolt className="text-sm text-white" />
                    </span>
                </div>
                <p className="text-muted text-sm tracking-wide">
                    Loading dashboard<span className="animate-pulse">…</span>
                </p>
            </div>
        </div>
    );
};

export default Loader;
