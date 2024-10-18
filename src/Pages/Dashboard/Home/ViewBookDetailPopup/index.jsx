import Svgs from "@/Assets/Svgs"
import LoginBtn from "../../../../Components/Element/LoginBtn"
import Popup from "../../../../Components/Element/Popup"
import CreateEditSectionPopup from "../CreateEditSectionPopup"
import useViewBookDetailPopup from "./helper"
import VerificationPopup from "@/Components/Popups/VerificationPopup"
import RecursiveSubsection from "./RecursiveSubsection"

const ViewBookDetailPopup = ({
    open,
    close,
    hideCloseButton,
    editData,
    successCallback
}) => {
    const { handleClosePopup, createSection, setCreateSection, editSection, setEditSection, showDeleteSectionPopup,
        setShowDeleteSectionPopup, deleteLoader, DeleteSection, createSubSection, setCreateSubSection,
        editSubSection, setEditSubSection, showDeleteSubSectionPopup, setShowDeleteSubSectionPopup, deleteSubSectionLoader,
        DeleteSubSection, isChild, setIsChild, role } = useViewBookDetailPopup(editData, successCallback, close)

    return (
        <Popup
            size={'sm:w-[600px] sm:max-w-[600px]'}
            open={open}
            onClose={handleClosePopup}
            hideCloseButton={hideCloseButton}
            closeOnOverlayClick={false}
            title={"Book Detail"}
        >
            <div className="space-y-4 text-[#000300]">
                <div className="flex flex-col space-y-2 text-sm">
                    <h2 className="font-semibold">Book Title:</h2>
                    <h2>{editData?.title}</h2>
                </div>

                {editData?.sections?.length === 0 ? (
                    role == "author" ?
                        <div className="flex flex-1 w-full">
                            <LoginBtn
                                title={"Add Section"}
                                className={"w-full"}
                                onClick={() => { setCreateSection(!createSection) }}
                            />
                        </div>
                        : ""
                ) : (
                    <>
                        <div className="flex justify-between items-center gap-4">
                            <h2 className="font-semibold">Sections</h2>
                            {role == "author" &&
                                <LoginBtn
                                    title={"Add Section"}
                                    className={"h-8"}
                                    onClick={() => { setCreateSection(!createSection) }}
                                />
                            }
                        </div>

                        {editData?.sections?.map((section, index) => (
                            <div className="flex flex-col space-y-2 text-sm" key={index}>
                                <div className="flex gap-2 justify-between">
                                    <h2 className="font-semibold">{section?.title}</h2>
                                    <div className="flex gap-2 items-center">
                                        <div className="cursor-pointer" onClick={() => { setEditSection(section) }}>
                                            <Svgs.EditPen />
                                        </div>
                                        {role == "author" &&
                                            <div className="cursor-pointer" onClick={() => { setShowDeleteSectionPopup(section) }}>
                                                <Svgs.DeleteBucket />
                                            </div>
                                        }
                                    </div>
                                </div>
                                <h2>{section?.content}</h2>

                                {section?.subsections?.length > 0 ? (
                                    <>
                                        <div className="flex justify-between items-center gap-4">
                                            <h2 className="font-semibold">Subsections</h2>
                                            {role == "author" &&
                                                <LoginBtn
                                                    title={"Add Sub Section"}
                                                    className={"h-8"}
                                                    onClick={() => { setCreateSubSection(section) }}
                                                />
                                            }
                                        </div>
                                        {section?.subsections?.map((subsection, index) => (
                                            <RecursiveSubsection
                                                key={index}
                                                subsection={subsection}
                                                setEditSubSection={setEditSubSection}
                                                setShowDeleteSubSectionPopup={setShowDeleteSubSectionPopup}
                                                setCreateSubSection={setCreateSubSection}
                                                setIsChild={setIsChild}
                                                role={role}
                                            />
                                        ))}
                                    </>
                                )
                                    :
                                    role == "author" ?
                                    <div className="flex flex-1 w-full">
                                        <LoginBtn
                                            title={"Add Sub Section"}
                                            className={"h-8 w-full"}
                                            onClick={() => { setCreateSubSection(section) }}
                                        />
                                    </div>
                                    : ""
                                    }
                            </div>
                        ))}
                    </>
                )}
            </div>

            {(createSection || editSection?.id) && (
                <CreateEditSectionPopup
                    open={createSection || editSection?.id}
                    close={editSection?.id ? setEditSection : setCreateSection}
                    title={editSection?.id ? "Edit Section" : "Create Section"}
                    bookData={editData}
                    editData={editSection}
                    successCallback={successCallback}
                />
            )}

            {(createSubSection?.id || editSubSection?.id) && (
                <CreateEditSectionPopup
                    open={createSubSection?.id || editSubSection?.id}
                    close={editSubSection?.id ? setEditSubSection : setCreateSubSection}
                    title={editSubSection?.id ? "Edit Sub Section" : "Create Sub Section"}
                    bookData={editData}
                    editData={editSubSection}
                    sectionData={createSubSection}
                    successCallback={successCallback}
                    isChild={isChild}
                    isSubSection
                />
            )}

            <VerificationPopup
                open={showDeleteSectionPopup?.id}
                close={setShowDeleteSectionPopup}
                title={<div className='flex flex-col space-y-4 mx-auto items-center justify-center pb-4 text-center'>
                    <h2 className=''>Are you sure you want to delete this
                        <br /> Section?</h2>
                </div>}
                hideCloseButton={true}
                loading={deleteLoader}
                onConfirm={DeleteSection}
            />

            <VerificationPopup
                open={showDeleteSubSectionPopup?.id}
                close={setShowDeleteSubSectionPopup}
                title={<div className='flex flex-col space-y-4 mx-auto items-center justify-center pb-4 text-center'>
                    <h2 className=''>Are you sure you want to delete this
                        <br /> Sub Section?</h2>
                </div>}
                hideCloseButton={true}
                loading={deleteSubSectionLoader}
                onConfirm={DeleteSubSection}
            />
        </Popup>
    )
}

export default ViewBookDetailPopup
