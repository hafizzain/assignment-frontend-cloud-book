import Svgs from '@/Assets/Svgs';
import { useState, useEffect } from 'react';

const TextEditor = ({ parent, readOnly, name, id, disabled, required, error, value, onChange, textarea, errorClass, placeholder, onEnterSubmit, ...props }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        const script = document.createElement("script");
        script.src = "/tinymce/tinymce.min.js";
        script.async = true;
        script.onload = () => {
            if (typeof tinymce !== 'undefined') {
                tinymce.init({
                    selector: `#textarea-${id}`,
                    icons: 'thin',
                    height: '12rem',
                    menubar: false,
                    // skin: 'oxide-dark',
                    // content_css: 'dark',
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | link image table',
                    content_style: `
                            body {
                                font-family:Helvetica,Arial,sans-serif; 
                                font-size: 1rem;
                                direction: ltr; 
                                 z-index: 25;
                            }`,
                    borderColor: error ? 'var(--error-color)' : 'var(--blurGrey-color)',
                    branding: false,
                    readonly: readOnly,
                    disabled: disabled,
                    placeholder: placeholder ? placeholder : "",
                    resize: false,
                    statusbar: false,
                    file_picker_types: 'image', // Restrict file picker to images
                    file_picker_callback: (callback, value, meta) => {
                        if (meta.filetype === 'image') {
                            const input = document.createElement('input');
                            input.setAttribute('type', 'file');
                            input.setAttribute('accept', 'image/*');
                            input.addEventListener('change', () => {
                                const file = input.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        callback(reader.result, {
                                            title: file.name
                                        });
                                    };
                                    reader.readAsDataURL(file);
                                }
                            });
                            input.click();
                        }
                    },
                    setup: (editor) => {
                        handleEditorChange(editor);
                        editor.on('init', () => {
                            editor.getContainer().style.border = `2px solid var(--blueGrey-color)`;
                            setLoading(false);
                        });
                    },
                });
            }
        };
        document.body.appendChild(script);
        return () => {
            if (typeof tinymce !== 'undefined') {
                tinymce.remove();
            }
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (typeof tinymce !== 'undefined' && value == "") {
            const editor = tinymce.get(`textarea-${id}`);
            if (editor) {
                editor.setContent(''); // Update content with new value
            }
        }
    }, [value, id]);

    const handleEditorChange = (editor) => {
        editor.on("keyup", (e) => {
            const content = editor.getContent();
            // Remove HTML tags and convert non-breaking spaces to regular spaces
            const plainText = content?.replace(/<[^>]*>/g, '')?.replace(/&nbsp;/g, ' ');

            // Check if the plainText is only spaces
            const isOnlySpaces = /^\s*$/.test(plainText);

            // Set the value to an empty string if it's only spaces, otherwise preserve content
            const valueToSet = isOnlySpaces ? '' : content;
            const event = { target: { value: valueToSet, name: name } };
            onChange && onChange(event);
        });
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && onEnterSubmit && !disabled) {
            onEnterSubmit(); // Trigger the onEnterSubmit function when Enter key is pressed
        }
    };


    return (
        <div className={`flex flex-col gap-2 relative ${parent}`}>
            <p className='text-sm'>
                {props.title}
                {required && props.title && <span className='text-red-500'> *</span>}
                {!required && props.title && !readOnly && <span className='text-[#A1A1A1] text-sm'>(Optional)</span>}
            </p>
            <div className={`relative ${error ? errorClass ? errorClass : "border border-red-600 rounded-xl overflow-hidden" : textarea ? textarea : ''}`}>
                <div className={`${loading && "!min-h-[22rem] animate-pulse"} rounded-xl w-full`}>
                    <textarea
                        id={`textarea-${id}`}
                        value={value}
                        className={`resize-none`}
                        onChange={handleEditorChange}
                        disabled={disabled}
                        onKeyDown={handleKeyPress}
                    />
                </div>
            </div>
            {error && typeof error === "string" ? (
                <p className={`text-[#eb3b3b] flex items-center gap-1 text-xs absolute top-[106%] w-full justify-end normal-case pt-1`}>
                    <Svgs.I fill="#eb3b3b" />
                    {error}
                </p>
            ) : typeof error === "boolean" && error === true ? (
                <p className={`text-[#eb3b3b] flex items-center gap-1 text-xs absolute top-[106%] w-full justify-end normal-case pt-1`}>
                    <Svgs.I fill="#eb3b3b" />
                    This field is required
                </p>
            ) : (
                ""
            )}
        </div>
    );
};

TextEditor.defaultProps = {
    counter: true,
    limit: '150',
    rows: '5'
};

export default TextEditor;