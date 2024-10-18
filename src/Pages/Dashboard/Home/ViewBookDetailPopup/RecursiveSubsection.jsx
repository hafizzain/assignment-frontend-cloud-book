import Svgs from "@/Assets/Svgs"
import LoginBtn from "../../../../Components/Element/LoginBtn"

const RecursiveSubsection = ({ subsection, setEditSubSection, setShowDeleteSubSectionPopup, setCreateSubSection, setIsChild, role }) => {
    return (
        <div className="flex flex-col space-y-2 text-sm">
            <div className="flex gap-2 justify-between">
                <h2 className="font-semibold">{subsection?.title}</h2>
                <div className="flex gap-2 items-center">
                    <div className="cursor-pointer" onClick={() => {
                        setEditSubSection(subsection)
                        setIsChild(true)
                    }}>
                        <Svgs.EditPen />
                    </div>
                    {role == "author" &&
                        <div className="cursor-pointer" onClick={() => { setShowDeleteSubSectionPopup(subsection) }}>
                            <Svgs.DeleteBucket />
                        </div>
                    }
                </div>
            </div>
            <h2>{subsection?.content}</h2>

            {/* Check if the subsection has child subsections */}
            {subsection?.subsections?.length > 0 && (
                <>
                    <h2 className="font-semibold">Child Subsections</h2>
                    {subsection?.subsections?.map((childSubsection, index) => (
                        <RecursiveSubsection
                            key={index}
                            subsection={childSubsection}
                            setEditSubSection={setEditSubSection}
                            setShowDeleteSubSectionPopup={setShowDeleteSubSectionPopup}
                            setCreateSubSection={setCreateSubSection}
                            setIsChild={setIsChild}
                            role={role}
                        />
                    ))}
                </>
            )}

            {/* Add a new child subsection */}
            {role == "author" &&
                <div className="flex flex-1 w-full">
                    <LoginBtn
                        title={"Add Child Sub Section"}
                        className={"w-full"}
                        onClick={() => {
                            setCreateSubSection(subsection)
                            setIsChild(true)
                        }}
                    />
                </div>
            }
        </div>
    )
}

export default RecursiveSubsection
