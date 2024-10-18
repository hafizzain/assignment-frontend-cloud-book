import Svgs from "@/Assets/Svgs"
import moment from "moment";

const BookTable = ({ data, onDeleteClick, onEditClick, onViewClick, role }) => {
    return (
        <div className="rounded-lg border border-[#E5E5F2] overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-[60rem] w-full">
                    <thead className='bg-secondary-base'>
                        <tr className='text-left'>
                            <th className="py-5 px-4">ID</th>
                            <th className="py-5 px-4">Name</th>
                            <th className="py-5 px-4">Created At</th>
                            <th className="py-5 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y text-xs'>
                        {data?.length > 0 ?
                            data?.map((item, index) => {
                                return (
                                    <tr key={index} className="hover:bg-slate-100 text-[#000300]">
                                        <td className="py-5 px-4">{item?.id}</td>
                                        <td className="py-5 px-4 text-[#891559] font-semibold">
                                            {item?.title ? item?.title : '---'}
                                        </td>
                                        <td className="py-5 px-4">
                                            {item?.created_at ? moment(item?.created_at).format("DD-MM-YYYY") : '---'}
                                        </td>
                                        <td className="py-5 px-4">
                                            <div className="flex gap-6">
                                                {role == "author" &&
                                                    <div className="cursor-pointer" onClick={() => { onDeleteClick && onDeleteClick(item) }}>
                                                        <Svgs.DeleteBucket />
                                                    </div>
                                                }
                                                {role == "author" &&
                                                    <div className="cursor-pointer" onClick={() => { onEditClick && onEditClick(item) }}>
                                                        <Svgs.EditPen />
                                                    </div>
                                                }
                                                <div className="cursor-pointer" onClick={() => { onViewClick && onViewClick(item) }}>
                                                    <Svgs.EyeIcon />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                            :
                            <tr>
                                <td colSpan="4" className="py-10 text-center text-lg font-bold">
                                    No Books Found
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BookTable