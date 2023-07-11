import { FieldErrors, FieldValues } from "react-hook-form"

export function findInputError(errors: FieldErrors<FieldValues>, name: string):  any {
    const filtered = Object.keys(errors)
    .filter(key => key == name)
    .reduce((cur, key) => {
        return Object.assign(cur, {error: errors[key]})

    }, {})
    console.log('filtered:',name,filtered)
    console.log('errors:',name,errors)
    return filtered
}