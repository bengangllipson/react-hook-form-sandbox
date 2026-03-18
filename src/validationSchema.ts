import {boolean, number, object, string} from "yup";

const schema = object().shape({
    testId: number().required().nullable(),
    testField: string().required("Required field message"),
    disabled: boolean().required()
})

export default schema
