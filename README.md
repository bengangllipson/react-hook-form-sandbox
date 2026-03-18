# React Hook Form Sandbox

A sample application demonstrating how to use [React Hook Form](https://react-hook-form.com/)
and [Yup](https://github.com/jquense/yup) to set up front end state management and validation. This repository serves as
a minimal, reproducible sandbox for understanding how these tools work together.

## Features

- Global state management
- Field validation
- Hooks for arbitrary logic on field events

## Usage

### Running

```bash
npm run dev
```

### Linting

```bash
npm run lint
```

## Notes

To optimize rendering, you always want to break elements up into components with as small of pieces as possible. The
factors that determine whether a component re-renders are the fields used by that component, or the fields being watched
by that component. Whenever either of those change, the entire component re-renders. As such, it's important to only
include elements that care about the specific changed field in a component.

### Example
#### Unoptimized, rerenders all the components
```typescript jsx
<FormProvider {...formMethods}>
    <form onSubmit={(e: React.SubmitEvent<HTMLFormElement>): void => {
        void formMethods.handleSubmit(onSubmit)(e)
    }}>
        <h1>Sandbox</h1>
        <input {...formMethods.register("testField", {required: true})} />
        {formMethods.formState.errors.testField?.type === "required" && <p>This field is required</p>}
        <br/>
        <input {...formMethods.register("anotherField")}
               onChange={() => {
                   formMethods.setValue("testField", defaultValues.testField, {
                       shouldValidate: true,
                       shouldDirty: true
                   })
               }}/>
        <br/>
        <input {...formMethods.register("thirdField")}/>
        <br/>
        <input type="submit" disabled={!isEmpty(formMethods.formState.errors)}/>
    </form>
</FormProvider>
```

#### Optimized, only rerenders what's needed

```typescript jsx
<FormProvider {...formMethods}>
    <form onSubmit={(e: React.SubmitEvent<HTMLFormElement>): void => {
        void formMethods.handleSubmit(onSubmit)(e)
    }}>
        <h1>Sandbox</h1>
        <TestField/>
        <br/>
        <AnotherField/>
        <br/>
        <ThirdField/>
        <br/>
        <Submit/>
    </form>
</FormProvider>
```

```typescript jsx
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
```

```typescript jsx
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
```

```typescript jsx
import * as React from "react";
import {useFormContext, type UseFormReturn} from "react-hook-form";
import type {SandboxForm} from "../../domain/sandboxForm.ts";

const ThirdField: () => React.JSX.Element = (): React.JSX.Element => {
    const sandboxForm: UseFormReturn<SandboxForm> = useFormContext<SandboxForm>()
    return <input {...sandboxForm.register("thirdField")}/>
}

export default ThirdField
```

```typescript jsx
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
```