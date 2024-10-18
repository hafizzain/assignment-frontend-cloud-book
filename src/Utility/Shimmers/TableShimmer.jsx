

const TableShimmer = ({ columns }) => {
    let renderColumnsLength = columns ? columns : 8;

    const renderColumns = () => {
        return (
            <>
                {[...Array(renderColumnsLength)].map((_, index) => (
                    <th key={index} className="py-5 px-4 bg-[#E5E5F2]">
                        <div className="h-6 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                    </th>
                ))}
            </>
        );
    };

    const renderRowColumns = () => {
        return (
            <>
                {[...Array(renderColumnsLength)].map((_, index) => (
                    <td key={index} className="py-5 px-4">
                        <div className="h-6 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                    </td>
                ))}
            </>
        );
    };

    return (
        <div className="rounded-lg border border-[#E5E5F2] overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-[60rem] w-full">
                    <thead className='bg-secondary-base'>
                        <tr className="text-left">
                            {renderColumns()}
                        </tr>
                    </thead>
                    <tbody className="divide-y text-xs">
                        {[0, 1, 2, 3, 4, 5]?.map((_, index) => (
                            <tr key={index} className="hover:bg-slate-100">
                                {renderRowColumns()}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableShimmer;
