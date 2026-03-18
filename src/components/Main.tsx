import * as React from "react";
import {useLocation} from "react-router";
import {isEmpty} from "lodash";
import type {SandboxForm} from "../domain/sandboxForm";
import SandboxFormComponent from "./form/SandboxFormComponent";

const isSandboxForm: (obj: unknown) => obj is SandboxForm = (obj: unknown): obj is SandboxForm => {
    if (typeof obj !== "object" || obj === null) {
        return false;
    }
    return "testField" in obj && "anotherField" in obj;
}

const Main: () => React.JSX.Element = (): React.JSX.Element => {
    const location = useLocation() as { state: unknown };
    const rawState: unknown = location.state;
    const formData: SandboxForm | null =
        !isEmpty(rawState) && isSandboxForm(rawState) ? rawState : null;
    return <SandboxFormComponent sandboxForm={formData}/>;
};

export default Main;
