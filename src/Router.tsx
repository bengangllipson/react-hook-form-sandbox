import {BrowserRouter, Route, Routes} from "react-router";
import {ROUTES} from "./constants/routes.ts";
import * as React from "react";
import Main from "./components/Main.tsx";

const Router: () => React.JSX.Element = (): React.JSX. Element => {
    return (
        <BrowserRouter>
            <Routes>
                {[ROUTES.home, '/'].map((path: string): React.JSX.Element => (
                    <Route path={path} element={<Main />} key={path} />
                ))}
            </Routes>
        </BrowserRouter>
    )
}

export default Router
