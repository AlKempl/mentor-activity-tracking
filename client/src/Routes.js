import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import NotFound from "./NotFound/NotFound";
import Login from "./Auth/Login";

export default function Routes() {

    return (
        <Switch>
            <Route exact path="/"><Home /></Route>
            <Route exact path="/login"><Login /></Route>
            {/* Finally, catch all unmatched routes */}
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}