const Loader = () => {

    return (

        <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">

            <div className="flex flex-col items-center gap-4">
                <div className="h-14 w-14 rounded-full border-4 border-white/10 border-t-cyan-400 animate-spin" />
                <p className="text-sm text-slate-400">
                    Loading dashboard...
                </p>
            </div>

        </div>

    );

};

export default Loader;