import { FaBolt } from "react-icons/fa";
import { MdCircle } from "react-icons/md";

const Navbar = () => {

    return (

        <nav className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/75 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">

            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 shadow-[0_0_30px_rgba(250,204,21,0.18)]">
                        <FaBolt className="text-amber-300 text-lg" />
                    </div>

                    <div>

                        <h1 className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl">

                            Smart Office Monitor

                        </h1>

                        <p className="text-xs text-slate-400 sm:text-sm">

                            Real-time energy monitoring and device control

                        </p>

                    </div>

                </div>

                <div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-300">

                    <MdCircle className="animate-pulse text-emerald-400" />

                    <span className="font-medium">Live</span>

                </div>


            </div>

        </nav>

    );

};

export default Navbar;