import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute"
import NotFound from "./containers/NotFound";

export default({ childProps }) => 
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <UnauthenticatedRoute path="/login" exact component ={Login} props={childProps} />
        <UnauthenticatedRoute path="/signup" exact component ={SignUp} props={childProps} />
        <AuthenticatedRoute path="/notes/new" exact component={NewNote} props={childProps} />
        <AuthenticatedRoute path="/notes/:id" exact component={Notes} props={childProps} />
        <Route component={NotFound} />
    </Switch>;
