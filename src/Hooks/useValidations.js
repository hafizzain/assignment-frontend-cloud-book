import { useState } from "react"
import { objectKeyConvertToArray } from './useObjectKeys';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useValidations() {

    const [errors, setErrors] = useState({});
    const [editErrors, setEditErrors] = useState({});

    const state = useSelector((state) => state);

    // removed error from a spacific input  when user click in it
    const onFocusHandler = (formField) => {
        setErrors(prev => ({ ...prev, ...formField }))
        setEditErrors(prev => ({ ...prev, ...formField }))
    }

    //show error when user click on specific input field and leave it without enter valid data
    const onBlurHandler = (formField) => {
        setErrors(prev => ({ ...prev, ...validation(formField) }))
        setEditErrors(prev => ({ ...prev, ...validation(formField) }))
    }
    // email error 
    const emailValidation = (name, value) => {
        if (value?.toLowerCase()?.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
        else {
            setErrors((prev) => ({ ...prev, [name]: "Please enter a valid email address." }));
        }
    }
    // passwordValidation
    const passwordValidation = (name, value, confirm_password, name2) => {
        if (value.length < 8) {
            setErrors((prev) => ({ ...prev, [name]: "Use 8 characters or more for your password" }));
            return false
        }
        if (value.length > 7) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
            return true
        }
        if (confirm_password !== '') {
            if (value.length >= 8) {
                if (confirm_password !== value) {
                    setErrors((prev) => ({ ...prev, [name2]: "Your password does not match" }));
                }
                if (confirm_password === value) {
                    setErrors((prev) => ({ ...prev, [name]: "", [name2]: "" }));
                }
            }
        }

    }

    // confirmPasswordValidation
    const confirmPasswordValidation = (name, value, password) => {
        if (value.length < 8) {
            setErrors((prev) => ({ ...prev, [name]: "Password length must be equal to 8." }));
        }
        if (value != password) {
            setErrors((prev) => ({ ...prev, [name]: "Your password does not match" }));
        }
        if (!value) {
            setErrors((prev) => ({ ...prev, [name]: "This field is required" }));
        }
        if (value === password) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    }
    //check url is valid or not 
    const validateWebsiteUrl = (webiste) => {
        let regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+)(\/[^\s]*)?$/;
        return regex.test(webiste);
    }

    const validateWebsiteUrlWithHttps = (website) => {
        // This function doesn't allow websites like www.example.com (without protocol) 
        // or sub-pages like https://www.example.com/test-home/ (with path)

        // Ensure that the input has a valid URL format including the scheme
        if (website) {
            // Regular expression for validating base URLs with required http/https scheme
            let baseUrlRegex = /^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,}))\/?$/;

            // Check if it matches a base URL
            if (baseUrlRegex.test(website)) {
                return true; // Valid base URL with no sub-page
            } else {
                // If it doesn't match base URL, check for sub-page
                const subPageRegex = /^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,}))(\/[^\s]+.*)$/;
                if (subPageRegex.test(website)) {
                    toast.error("Pages/Sub-pages are not allowed to audit. Please enter a valid website Url.", { toastId: "toast" });
                    return false; // Sub-page detected
                } else {
                    return false; // Invalid base URL
                }
            }
        } else {
            return false; // No URL provided
        }
    };

    const validateWebsiteUrlWithNameWithHttps = (name, website) => {
        // Ensure that the input has a valid URL format including the scheme
        if (website) {
            // Regular expression for validating base URLs with required http/https scheme
            let baseUrlRegex = /^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,}))\/?$/;

            // Check if it matches a base URL
            if (baseUrlRegex.test(website)) {
                setErrors((prev) => ({ ...prev, [name]: "" })); // Clear errors if valid
                return true; // Valid base URL with no sub-page
            } else {
                // If it doesn't match base URL, check for sub-page
                const subPageRegex = /^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,}))(\/[^\s]+.*)$/;
                if (subPageRegex.test(website)) {
                    setErrors((prev) => ({ ...prev, [name]: "Pages/Sub-pages are not allowed to audit. Please enter a valid website Url." }));
                } else {
                    setErrors((prev) => ({ ...prev, [name]: "Please enter a valid Url." })); // Invalid base URL
                }
            }
        } else {
            setErrors((prev) => ({ ...prev, [name]: "Please enter a valid Url." })); // No URL provided
        }
    };

    //check url is valid or not 
    const validateWebsiteUrlWithName = (name, webiste) => {
        // let regex = /((https?:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/gmi;
        let regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+)(\/[^\s]*)?$/;
        if (regex.test(webiste)) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        } else {
            setErrors((prev) => ({ ...prev, [name]: "Please enter a valid Url." }));
        }
    }


    //check email formate if email is proper email return true than false
    const validateEmail = (email) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    };


    //check Mobile Number formate  
    const validateNumber = (name, value) => {
        const regex = /^([+]?\d{1,4}[-\s]?|)\d{3}[-\s]?\d{2,3}[-\s]?\d{3,4}$/
        if (!regex.test(value)) {
            setErrors((prev) => ({ ...prev, [name]: "Please enter a valid number." }));
        } else {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    //check Mobile Number formate  
    const validateMoblieNumber = (name, number) => {
        const regex = /^([+]?\d{1,4}[-\s]?|)\d{3}[-\s]?\d{2,3}[-\s]?\d{3,4}$/
        // Remove non-numeric characters
        const cleanedValue = number?.replace(/[^\d]/g, '');
        if (!regex.test(number) || cleanedValue.length < 7 || cleanedValue.length > 11) {
            setErrors((prev) => ({ ...prev, [name]: "Please enter a valid number." }));
        } else {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };


    //removed white spaces and special charactors from a given string like "  !test@#  " to "test"
    const removeWhiteSpacesAndSpecialCharactors = (string) => {
        const result = string && string.replace(/[&\/\\#,@+!_^()$~%.'":*?<>{}]/g, "").trim();
        return result;
    }


    // removed only white spaces from both ends 
    const removeWhiteSpacesFromStartAndEnd = (value) => {
        let wsRegex = /^\s+|\s+$/g;
        let result = value?.replaceAll(wsRegex, "");
        return result;
    }

    // removed hypen ( _ ) from fieldName value and capitalize first latter of fieldName like ( first_name to First name)
    const capitalizeFirstLatters = (fieldName) => {

        let fieldNameArr = fieldName.split("_");
        let firstValue = fieldNameArr[0];
        let captilizeFirstLatter = firstValue[0].toUpperCase() + firstValue.slice(1);

        fieldNameArr.splice(0, 1, captilizeFirstLatter);
        let strValue = fieldNameArr.join(" ");

        return strValue;
    }


    //remove empty spaces from the input fields value like ("     ali     " to "ali" or "      " to "")
    const trimEmptySpace = (object) => {
        let trimmedObject = {};

        Object.keys(object).forEach((item) => {
            trimmedObject = {
                ...trimmedObject,
                [item]: object[item] ? object[item].trim() : "",
            };
        })

        return trimmedObject;
    }

    //validate all input fields and proper error about each field
    const validation = (fields, message = "", ignoreData) => {
        let errorArr = [];
        let errorMessages;
        // create array of field names
        let fieldName = objectKeyConvertToArray(fields);

        // create array of objects from field name and value
        const fieldArr = Object.entries(fields).map(([key]) => {
            return { name: key };
        });

        // new checks with trimmed empty space
        fieldName.forEach(item => {
            fieldArr.forEach(field => {
                // Skip validation if the field is in ignoreData
                if (ignoreData != undefined && ignoreData[field.name]) return;

                if (field.name === item && field.name) {
                    let fieldValue = fields[field.name];
                    let trimmedValue = '';
                    
                    // Handle different data types, including arrays
                    if (Array.isArray(fieldValue)) {
                        // Check if the array has length greater than zero
                        if (fieldValue.length > 0) {
                            trimmedValue = true;  // Mark as valid if array is not empty
                        } else {
                            trimmedValue = false;  // Invalid if array is empty
                        }
                    } else if (typeof fieldValue === 'string') {
                        trimmedValue = fieldValue.trim();
                    } else if (typeof fieldValue === 'number' || typeof fieldValue === 'boolean') {
                        trimmedValue = fieldValue === false ? "" : fieldValue.toString().trim();
                    } else if (fieldValue instanceof File) {
                        trimmedValue = fieldValue.name.trim();
                    } else if (!isNaN(parseFloat(fieldValue)) && isFinite(fieldValue)) {
                        trimmedValue = fieldValue.toString().trim();
                    }
                    // Check for empty or invalid fields
                    if (!trimmedValue || trimmedValue === "") {
                        let fieldName = capitalizeFirstLatters(field.name);
                        errorArr.push({
                            [field.name]: message ? message : `${fieldName} is required`
                        });
                    } else if (field.name === "email") {
                        if (!validateEmail(fields[field.name])) {
                            let fieldName = capitalizeFirstLatters(field.name);
                            errorArr.push({ [field.name]: `${fieldName} is invalid` });
                        }
                    } else if (["mobile_number", "phone_number", "wa_number"].includes(field.name)) {
                        const regex = /^([+]?\d{1,4}[-\s]?|)\d{3}[-\s]?\d{2,3}[-\s]?\d{3,4}$/;
                        // Remove non-numeric characters
                        const cleanedValue = trimmedValue?.replace(/[^\d]/g, '');
                        if (!regex.test(cleanedValue) || cleanedValue.length < 7 || cleanedValue.length > 11) {
                            let fieldName = field.name === "wa_number" ? "WhatsApp number" : capitalizeFirstLatters(field.name);
                            errorArr.push({ [field.name]: `${fieldName} is invalid` });
                        }
                    } else if (field.name === "website") {
                        if (!validateWebsiteUrl(fields[field.name])) {
                            let fieldName = capitalizeFirstLatters(field.name);
                            errorArr.push({ [field.name]: `${fieldName} is invalid` });
                        }
                    }
                }
            });
        });

        // Convert array of error messages to an object
        errorMessages = Object.assign({}, ...errorArr);
        return errorMessages;
    };

    return {
        trimEmptySpace,
        validation,
        removeWhiteSpacesAndSpecialCharactors,
        removeWhiteSpacesFromStartAndEnd,
        onFocusHandler,
        onBlurHandler,
        errors,
        setErrors,
        editErrors,
        setEditErrors,
        validateWebsiteUrl,
        validateMoblieNumber,
        validateEmail,
        confirmPasswordValidation,
        passwordValidation,
        emailValidation,
        validateNumber,
        validateWebsiteUrlWithName,
        validateWebsiteUrlWithHttps,
        validateWebsiteUrlWithNameWithHttps
    }
}
