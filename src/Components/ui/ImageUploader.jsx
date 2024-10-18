import Svgs from '@/Assets/Svgs';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import Popup from '../Element/Popup';

const ImageUploader = ({
    name,
    title,
    required,
    accept,
    id,
    multiple,
    mb_file_size,
    onChange,
    value,
    error,
    customHeight,
    errorValidation,
    errorText,
    hideEdit,
    imgWidth,
    imgHeight
}) => {
    const [imageList, setImageList] = useState([]); // Array to hold multiple files
    const [showPopup, setShowPopup] = useState(false);
    const inputRef = useRef(null);  // Ref for the input field

    useEffect(() => {
        if (value) {
            setImageList(value);
        }
    }, [value]);

    const handleLabelClick = (e) => {
        if (errorValidation) {
            e.preventDefault();
            toast.error(errorText ? errorText : "You can't add more images", { toastId: "errorValidationToast" });
        }
    };

    const handleDelete = (index) => {
        setImageList(prev => {
            const newList = prev.filter((_, i) => i !== index);
            onChange && onChange({
                target: {
                    name: name || 'file',
                    value: '',
                    files: newList
                }
            });
            return newList;
        });
        inputRef.current.value = ''; // Reset input field
    };

    const validateFile = (file) => {
        let fileSizeMB = file.size / 1024 / 1024; // Convert bytes to MB
        if (fileSizeMB > mb_file_size) {
            toast.info(`Maximum file size limit is ${mb_file_size} MB`, { toastId: "sizeLimitToast" });
            return false;
        }
        return true;
    };

    const validateImageDimensions = (img, file) => {
        return new Promise((resolve, reject) => {
            img.onload = () => {
                const { width, height } = img;
                if (imgWidth && imgHeight) {
                    if (width <= imgWidth && height <= imgHeight) {
                        resolve(file); // Resolve the actual file
                    } else {
                        reject(`Image ${file.name} dimensions exceed the maximum allowed size of ${imgWidth}x${imgHeight}.`);
                    }
                } else {
                    resolve(file); // Resolve the actual file if no dimensions are checked
                }
            };
            img.onerror = () => reject(`Failed to load image ${file.name}.`);
        });
    };

    const handleImageChange = (e) => {
        if (errorValidation) {
            toast.error(errorText || "You can't add more images", { toastId: "errorValidationToast" });
            return;
        }

        const files = Array.from(e.target.files);

        if (multiple) {
            const validFiles = [];
            const promises = files.map(file => {
                if (mb_file_size && !validateFile(file)) return Promise.reject();

                const reader = new FileReader();

                if (file.type.startsWith("image/")) {
                    return new Promise((resolve, reject) => {
                        reader.onload = (event) => {
                            const img = new Image();
                            img.src = event.target.result;

                            validateImageDimensions(img, file)
                                .then(() => {
                                    validFiles.push(file);
                                    resolve();
                                })
                                .catch(reject);
                        };
                        reader.onerror = (error) => {
                            console.error("Error reading file:", error);
                            reject("Failed to read file.");
                        };
                        reader.readAsDataURL(file);
                    });
                } else {
                    validFiles.push(file);
                    return Promise.resolve();
                }
            });

            Promise.allSettled(promises)
                .then(() => {
                    const updatedList = [...imageList, ...validFiles];
                    setImageList(updatedList);

                    onChange && onChange({
                        target: {
                            name: name || 'file',
                            files: updatedList,
                            value: updatedList
                        }
                    });
                })
                .catch(err => {
                    if (err) {
                        toast.info(err, { toastId: "toast" });
                    }
                    console.log("Error with selected files:", err);
                });
        } else {
            const file = files[0];
            if (mb_file_size && !validateFile(file)) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;

                // Only validate dimensions if imgWidth and imgHeight are provided
                if (imgWidth && imgHeight) {
                    validateImageDimensions(img, file)
                        .then(() => {
                            setImageList([file]);

                            onChange && onChange({
                                target: {
                                    name: name || 'file',
                                    files: [file],
                                    value: [file]
                                }
                            });
                        })
                        .catch(err => {
                            toast.info(err, { toastId: "toast" });
                        });
                } else {
                    // If no width/height validation is required, simply add the file
                    setImageList([file]);

                    onChange && onChange({
                        target: {
                            name: name || 'file',
                            files: [file],
                            value: [file]
                        }
                    });
                }
            };
            reader.onerror = (error) => {
                console.error("Error reading file:", error);
            };
            reader.readAsDataURL(file);
        }

        inputRef.current.value = null;
    };

    return (
        <div className="flex flex-col gap-2 flex-1 w-full">
            {title && (
                <div className="text-sm text-blueGrey flex items-center gap-1">
                    <div>{title}</div>
                    {required && <span className="leading-[1] text-red-600"> *</span>}
                </div>
            )}
            <label
                htmlFor={id || 'upload_img'}
                className={`cursor-pointer flex flex-1 items-center justify-center ${customHeight || 'h-[200px]'} border-2 ${error ? 'border-red-600' : 'border-[#D2D2D2]'} border-dashed rounded-lg bg-darkGrey p-2`}
                onClick={handleLabelClick}
            >
                <div className="flex flex-1 flex-col items-center justify-center text-center space-y-2 py-8 cursor-pointer">
                    <div className="mx-auto bg-[#F0F0F0] rounded-lg px-12 py-3">
                        <Svgs.SelectFileIcon />
                    </div>
                    <p className="text-[#797979] font-medium">
                        <span className="text-[#891559]">Click here</span> to upload
                    </p>
                </div>
            </label>
            <input
                type="file"
                id={id || 'upload_img'}
                className="hidden"
                name={name}
                accept={accept || 'image/*,application/pdf,.docx'} // Include additional file types
                multiple={multiple} // Enable multiple selection
                ref={inputRef}
                onChange={handleImageChange}
            />
            {imageList.length > 0 && (
                <div className="flex flex-col gap-2">
                    {imageList.map((file, index) => (
                        <div key={index} className="flex flex-1 gap-2 w-full items-center justify-between rounded-lg bg-[#FFEEEB] px-4 py-3">
                            <div className='flex items-center gap-3'>
                                {file.type.startsWith("image/") ? (
                                    <Svgs.FileIcon className={'size-7'} />
                                ) : (
                                    <Svgs.FileIcon className={'size-7'} /> // Use a generic file icon for non-image files
                                )}
                                <p className='text-black text-sm line-clamp-1'>{file.name}</p> {/* Display the file name */}
                            </div>
                            <div className="flex gap-4 items-center">
                                {!hideEdit && (
                                    <div className="flex gap-4 items-center">
                                        <div className="cursor-pointer rounded-full" onClick={() => handleDelete(index)}>
                                            <Svgs.closeIcon className='size-5' />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Popup removeHeading open={showPopup} close={setShowPopup} customSizeStyle="sm:w-[35vw] xl:w-[30vw]">
                <div className="flex flex-col gap-5 bg-white">
                    <div className="flex h-60">
                        <img src={imageList[0]?.src} className="object-contain" alt="Uploaded" />
                    </div>
                </div>
            </Popup>
        </div>
    );
};

ImageUploader.defaultProps = {
    onClick: () => { },
    multiple: true,
    title: ""
};

export default ImageUploader;
