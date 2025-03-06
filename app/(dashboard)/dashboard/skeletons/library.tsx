const LibrarySkeleton = () => {
    const placeholders = Array.from({ length: 4 });

    return (
        <section className="grid grid-cols-4 gap-4">
            {placeholders.map((_, index) => (
                <section
                    key={index}
                    className="flex flex-col items-center"
                    aria-hidden="true"
                >
                    <span className="px-2 rounded-md text-md font-semibold bg-gray-300 h-6 w-32"></span>
                    <span className="text-sm break-normal bg-gray-200 h-4 w-24 rounded mt-1"></span>
                </section>
            ))}
        </section>
    );
};

export default LibrarySkeleton;
