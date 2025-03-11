export default function LoadingPage() {
    return (
        <main className="h-screen flex justify-center items-center bg-gray-900">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                <p className="mt-4 text-white text-lg">Loading...</p>
            </div>
        </main>
    );
}