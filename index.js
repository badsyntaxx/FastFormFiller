async function QuickFill(settings) {
    const defaults = {
        form: 'form',
        url: null,
        json: {},
        ignore: [],
    };

    const mergedSettings = extend(defaults, settings);

    try {
        let fetchedData = {};
        if (mergedSettings.url) {
            fetchedData = await fetchData(mergedSettings.url);
        }

        const jsonData = { ...mergedSettings.json };

        if (fetchedData) {
            if (Object.keys(jsonData).length === 0) {
                console.log('JSON object is empty');
            } else {
                compareAndOverwrite(fetchedData, jsonData);
            }
        }

        return populateForm(fetchedData, mergedSettings);
    } catch (error) {
        return {
            status: 'Error',
            message: error.message,
            target: mergedSettings.form,
        };
    }
}

function compareAndOverwrite(obj1, obj2) {
    for (const key in obj2) {
        if (obj1.hasOwnProperty(key)) {
            if (typeof obj2[key] === 'object' && obj2[key] !== null) {
                compareAndOverwrite(obj1[key], obj2[key]);
            } else {
                obj1[key] = obj2[key];
            }
        } else {
            obj1[key] = obj2[key];
        }
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch data from url');
    }
    return await response.json();
}

function extend(defaults, settings) {
    for (let prop in settings) {
        if (typeof settings[prop] === 'object') {
            defaults[prop] = extend(defaults[prop], settings[prop]);
        } else {
            defaults[prop] = settings[prop];
        }
    }
    return defaults;
}

function populateForm(data, settings) {
    const originalData = { ...data };
    const inputs = document.querySelectorAll(
        `${settings.form} input, ${settings.form} textarea, ${settings.form} select`
    );
    const ignore = settings.ignore;

    // Check if data is empty
    if (Object.keys(originalData).length === 0) {
        return {
            status: 'Error',
            message:
                'Form Filler did not receive any form data. Be sure to provide the config with json and/or a url',
            target: settings.form,
        };
    }

    // Remove ignored properties
    for (const prop of ignore) {
        delete data[prop];
    }

    // Fill the form
    for (const input of inputs) {
        for (const key in data) {
            if (key === input.name) {
                switch (input.type) {
                    case 'checkbox':
                        input.checked = data[key] === true;
                        break;
                    case 'radio':
                        const radios = document.querySelectorAll(
                            `${settings.form} input[name="${key}"]`
                        );
                        for (const radio of radios) {
                            if (radio.value === data[key]) {
                                radio.checked = true;
                            }
                        }
                        break;
                    default:
                        input.value = data[key];
                        break;
                }
                delete data[key];
                break; // Exit inner loop after finding a match
            }
        }
    }

    const unfilled = getUnfilledElements(inputs);

    return {
        status: 'Success',
        message: 'Form Filler completed successfully',
        target: settings.form,
        leftovers: data,
        unfilled: [...new Set(unfilled)],
    };
}

function getUnfilledElements(inputs) {
    let unfilled = [];
    const checkedRadioNames = new Set();
    for (const input of inputs) {
        switch (input.type) {
            case 'radio':
                // Check if a radio button with the same name is already checked
                if (!input.checked && !checkedRadioNames.has(input.name)) {
                    unfilled.push(input.name);
                } else {
                    checkedRadioNames.add(input.name); // Add checked radio name to the set
                }
                break;
            case 'checkbox':
                if (!input.checked) {
                    unfilled.push(input.name);
                }
                break;
            default:
                if (!input.value) {
                    unfilled.push(input.name);
                }
                break;
        }
    }
    return unfilled;
}

export default QuickFill;
