import type {SandboxForm} from "../../domain/sandboxForm.ts";
import {FormProvider, type SubmitHandler, useForm, type UseFormReturn} from "react-hook-form";
import {defaultValues} from "../../domain/defaultValues.ts";
import {yupResolver} from '@hookform/resolvers/yup'
import schema from '../../validationSchema'
import * as React from "react";
import TestField from "./TestField.tsx";
import AnotherField from "./AnotherField.tsx";
import ThirdField from "./ThirdField.tsx";
import Submit from "./Submit.tsx";

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
                <TestField />
                <br/>
                <AnotherField />
                <br/>
                <ThirdField />
                <br/>
                <Submit />
            </form>
        </FormProvider>
    )
}

export default SandboxFormComponent
