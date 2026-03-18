import * as React from "react";
import {useFormContext, type UseFormReturn, useFormState} from "react-hook-form";
import type { SandboxForm } from "../../domain/sandboxForm.ts";

const TestField: () => React.JSX.Element = (): React.JSX.Element => {
    const methods: UseFormReturn<SandboxForm> = useFormContext<SandboxForm>();
    const { errors } = useFormState({ control: methods.control, name: "testField" });
    return (
        <>
            <input {...methods.register("testField", { required: true })} />
            {errors.testField?.type === "required" && <p>This field is required</p>}
        </>
    );
};

export default TestField
