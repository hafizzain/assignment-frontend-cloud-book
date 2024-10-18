import {
    Dialog as BaseDialog,
    DialogContent,
    DialogOverlay,
} from '@/Components/ui/dialog';

const Popup = ({
    open,
    onClose,
    close,
    size = 'sm:max-w-lg',
    content,
    title,
    children,
    closeOnOverlayClick = true,
    hideCloseButton = false,
    description
}) => {
    // Handle close logic based on overlay click
    const handleClose = (isOpen) => {
        if (!isOpen && closeOnOverlayClick) {
            onClose && onClose(false);  // Close the dialog if clicking on overlay is allowed
            close && close(false);
        }
    };

    // Handle close when close button is clicked, independent of overlay click setting
    const handleCloseButtonClick = () => {
        onClose && onClose(false);
        close && close(false);
    };

    return (
        <BaseDialog open={open} onOpenChange={handleClose}>
            <DialogOverlay />
            <DialogContent handleCloseButtonClick={handleCloseButtonClick} hideCloseButton={hideCloseButton} className={`fixed left-[50%] top-[50%] ${size} max-w-[95vw] max-h-[90vh] overflow-y-auto translate-x-[-50%] translate-y-[-50%] bg-white shadow-lg py-6 !px-0`}>
                <div className="flex flex-col space-y-1 px-6">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    {description && <p className='text-[#797979] text-sm'>{description}</p>}
                </div>
                <div className="mt-2 py-2 max-h-[70vh] overflow-y-auto px-6">
                    {children ? children : ""}
                    {content ? content : ""}
                </div>
            </DialogContent>
        </BaseDialog>
    );
};

export default Popup;
