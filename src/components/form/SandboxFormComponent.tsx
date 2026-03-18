import type {SandboxForm} from "../../domain/sandboxForm.ts";
import {FormProvider, type SubmitHandler, useForm, type UseFormReturn} from "react-hook-form";
import {defaultValues} from "../../domain/defaultValues.ts";
import {yupResolver} from '@hookform/resolvers/yup'
import schema from '../../validationSchema'
import * as React from "react";
import {isEmpty} from "lodash";

interface SandboxFormProps {
    sandboxForm: SandboxForm | null
}

const SandboxFormComponent: (props: SandboxFormProps) => React.JSX.Element = (props: SandboxFormProps): React.JSX.Element => {
    const formMethods: UseFormReturn<SandboxForm> = useForm<SandboxForm>({
        defaultValues: props.sandboxForm ?? defaultValues,
        resolver: yupResolver(schema)
    })

    const onSubmit: SubmitHandler<SandboxForm> = (data: SandboxForm): void => {
        console.log(data)
    }

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={(e: React.SubmitEvent<HTMLFormElement>): void => {
                void formMethods.handleSubmit(onSubmit)(e)
            }}>
                <h1>Sandbox</h1>
                <input {...formMethods.register("testField", {required: true})} />
                {formMethods.formState.errors.testField?.type === "required" && <p>This field is required</p>}
                <br/>
                <input {...formMethods.register("anotherField", {required: true})}
                       onChange={() => {
                           formMethods.setValue('testField', defaultValues.testField, {
                               shouldValidate: true,
                               shouldDirty: true
                           })
                       }}/>
                <br/>
                <input type="submit" disabled={!isEmpty(formMethods.formState.errors)}/>
            </form>
        </FormProvider>
    )
}

export default SandboxFormComponent
