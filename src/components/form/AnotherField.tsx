import {useFormContext} from "react-hook-form";
import {defaultValues} from "../../domain/defaultValues.ts";
import type {SandboxForm} from "../../domain/sandboxForm.ts";
import * as React from "react";

const AnotherField: () => React.JSX.Element = (): React.JSX.Element => {
    const {register, setValue, trigger} = useFormContext<SandboxForm>()

    const handleChange: () => void = (): void => {
        setValue("testField", defaultValues.testField, {shouldValidate: true})
        void trigger("testField")
    }

    return <input {...register("anotherField")} onChange={handleChange} />
}

export default AnotherField
