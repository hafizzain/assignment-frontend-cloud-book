import { useNavigate } from "react-router-dom"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import BreadCrumbShimmer from "@/Utility/Shimmers/BreadCrumbShimmer"

export default function BreadCrumb({ items, loading }) {
    const navigate = useNavigate()

    return (
        loading ?
            <BreadCrumbShimmer items={items} /> :
            <Breadcrumb>
                <BreadcrumbList>
                    {items?.map((item, index) => (
                        <BreadcrumbItem key={index}>
                            {item?.link ? (
                                <BreadcrumbLink className={"cursor-pointer"} onClick={() => navigate(item?.link)}>
                                    {item?.name}
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage>{item?.name}</BreadcrumbPage>
                            )}
                            {index < items?.length - 1 && <BreadcrumbSeparator />}
                        </BreadcrumbItem>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
    )
}
