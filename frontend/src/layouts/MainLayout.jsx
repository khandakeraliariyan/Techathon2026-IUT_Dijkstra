const MainLayout = ({ children }) => {
    return (
        <div className="relative min-h-screen overflow-hidden text-slate-100">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.1),transparent_25%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white/5 to-transparent" />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default MainLayout;