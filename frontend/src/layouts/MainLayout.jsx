const MainLayout = ({ children }) => {
    return (
        <div className="app-shell text-primary relative">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_28%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--surface-soft)] to-transparent" />

            <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-[110px]" />
            <div className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-[130px]" />
            <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-emerald-400/10 blur-[120px]" />

            <div className="pointer-events-none fixed inset-0 z-0 noise-overlay" />

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
