export const convertDataToFormData = (data) => {
    let form_data = new FormData();

    for (let key in data) {
        if (data[key]) {
            if (typeof data[key] === "object" && !data[key]?.name) {
                form_data.append(key, JSON.stringify(data[key]));
            } else {
                form_data.append(key, data[key]);
            }
        }
    }

    return form_data;
}


export const convertObjectToForm = (object, form = new FormData(), namespace = '') => {
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            const value = object[key];
            const formKey = namespace ? `${namespace}[${key}]` : key;

            if (value instanceof Date) {
                form.append(formKey, value.toISOString());
            } else if (value instanceof Array) {
                value.forEach((element, index) => {
                    const tempFormKey = `${formKey}[${index}]`;
                    if (typeof element === 'object' && !(element instanceof File)) {
                        convertObjectToForm(element, form, tempFormKey);
                    } else {
                        form.append(tempFormKey, element);
                    }
                });
            } else if (typeof value === 'object' && !(value instanceof File)) {
                convertObjectToForm(value, form, formKey);
            } else {
                form.append(formKey, value);
            }
        }
    }
    return form;
};