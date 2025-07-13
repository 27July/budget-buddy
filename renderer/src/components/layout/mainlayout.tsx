import Sidebar from './sidebar';

export default function MainLayout ({children}: {children: React.ReactNode}) {
    return(
        <div className = "flex h-screen bg-[var(--soft-pink)] text-[var(--blue-gray)]">
            <Sidebar />
            <main className = "flex-1 p-6 overflow-y-auto text-3xl">{children}</main>
        </div>
    );
}