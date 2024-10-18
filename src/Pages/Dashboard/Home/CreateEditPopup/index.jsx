import { Dropdown } from '@/Components/ui/ComboBox'
import LoginBtn from "../../../../Components/Element/LoginBtn"
import Popup from "../../../../Components/Element/Popup"
import { Input } from "../../../../Components/ui/input"
import useCreateEditHelper from "./helper"
import UserSelected from '@/Components/Element/SelectedUser'

const CreateEditPopup = ({
    title,
    open,
    close,
    hideCloseButton,
    editData,
    successCallback
}) => {

    const { formData, handleChange, errors, handleSubmit, loading, handleClosePopup, collaborators, role, addCollaboratorToBook,
        selectedCollaborators, deleteCollaboratorFromBook
    } = useCreateEditHelper(editData, successCallback, close)
    return (
        <Popup
            size={'sm:w-[600px] sm:max-w-[600px]'}
            open={open}
            onClose={handleClosePopup}
            hideCloseButton={hideCloseButton}
            closeOnOverlayClick={false}
            title={title}
        >
            <div className="space-y-4 text-[#000300]">
                <Input
                    error={errors?.title}
                    onChange={handleChange}
                    value={formData?.title}
                    placeholder='Enter Book Title'
                    label='Title'
                    name="title"
                    className={errors?.title && 'mb-6'}
                    onEnterSubmit={handleSubmit}
                    required
                />
                {(editData?.id && role == "author") &&
                    <Dropdown
                        name={"collaborator"}
                        onChange={(e) => {
                            console.log(e)
                            addCollaboratorToBook(e.target.value)
                        }}
                        options={collaborators
                            ?.filter(member => !selectedCollaborators?.includes(member?.value))}
                        value={""}
                        placeholder={"Add Collaborator"}
                        title={"Collaborator"}
                        noValue
                    />
                }
                {selectedCollaborators?.length > 0 &&
                    <div className="flex gap-2 flex-wrap">
                        {collaborators
                            ?.filter(member => selectedCollaborators?.includes(member?.value))
                            ?.map(member => (
                                <UserSelected
                                    key={member.value}
                                    user={`${member?.label}`}
                                    handleClose={() => {
                                        deleteCollaboratorFromBook(member?.value)
                                    }}
                                />
                            ))}
                    </div>
                }
                <LoginBtn
                    title={'Submit'}
                    className={'w-full'}
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={loading}
                />
            </div>
        </Popup>
    )
}

export default CreateEditPopup
