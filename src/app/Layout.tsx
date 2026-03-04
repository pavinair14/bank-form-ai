const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-dvh flex flex-col bg-gray-100">
            <h1 className="text-3xl font-semibold text-center mt-3">
                Bank AI Form
            </h1>
            <main className="flex lg:flex-row flex-col lg:h-screen h-full p-4 items-center">{children}</main>
        </div>
    );
};

export default Layout;