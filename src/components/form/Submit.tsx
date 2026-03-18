import {isEmpty} from "lodash";
import {useFormContext, useFormState} from "react-hook-form";
import type {SandboxForm} from "../../domain/sandboxForm.ts";
import * as React from "react";

const Submit: () => React.JSX.Element = (): React.JSX.Element => {
    const { control } = useFormContext<SandboxForm>();
    const { errors } = useFormState({ control });
    return <input type="submit" disabled={!isEmpty(errors)}/>
}

export default Submit
