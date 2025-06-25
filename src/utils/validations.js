import {INPUT_VALIDATION_LENGTH_MSG} from "../constant";

export const inputLengthValidation = (query) => {
    if (query.length < 1 || query.length > 2000) {
        return {error: true, msg: INPUT_VALIDATION_LENGTH_MSG}
    }
    return {error: false}
}