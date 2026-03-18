import * as React from "react";
import {useFormContext, type UseFormReturn} from "react-hook-form";
import type {SandboxForm} from "../../domain/sandboxForm.ts";

const ThirdField: () => React.JSX.Element = (): React.JSX.Element => {
    const sandboxForm: UseFormReturn<SandboxForm> = useFormContext<SandboxForm>()
    return <input {...sandboxForm.register("thirdField")}/>
}

export default ThirdField
