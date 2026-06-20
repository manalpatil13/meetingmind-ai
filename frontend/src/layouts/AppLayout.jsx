import Sidebar from "../components/Sidebar";

function AppLayout({ children }) {
    return (
        <div className="app-layout">

            <Sidebar />

            <main className="main-content">
                <div className="page-width">
                    {children}
                </div>
            </main>

        </div>
    );
}

export default AppLayout;