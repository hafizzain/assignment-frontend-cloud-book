import LoginBtn from "../../../../Components/Element/LoginBtn"
import Popup from "../../../../Components/Element/Popup"
import { Input } from "../../../../Components/ui/input"
import useCreateEditHelper from "./helper"
import { TextArea } from '@/Components/Element/TextArea'

const CreateEditSectionPopup = ({
    title,
    open,
    close,
    hideCloseButton,
    editData,
    successCallback,
    bookData,
    isSubSection,
    sectionData,
    isChild
}) => {

    const { formData, handleChange, errors, handleSubmit, loading, handleClosePopup
    } = useCreateEditHelper(editData, successCallback, close, bookData, isSubSection, sectionData, isChild)
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
                    placeholder='Enter Section Title'
                    label='Title'
                    name="title"
                    className={errors?.title && 'mb-6'}
                    onEnterSubmit={handleSubmit}
                    required
                />
                <TextArea
                    error={errors?.content}
                    onChange={handleChange}
                    value={formData?.content}
                    placeholder='Enter Section content'
                    label='Content'
                    name="content"
                    className={errors?.content && 'mb-6'}
                    onEnterSubmit={handleSubmit}
                    required
                />
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

export default CreateEditSectionPopup
