import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import NewRequest from "./NewRequest/NewRequest";
import ClientList from "./ClientList/ClientList";
import Home from "./Home/Home";
import AddAgent from "./AddAgent/AddAgent";
import history from './history';
import AddCompany from "./AddCompany/AddCompany"
import ClientDetail from "./ClientDetail/ClientDetail"
import CompanyDetail from "./CompanyDetail/CompanyDetail"
import Search from "./Search/Search"
import Login from "./Login/Login"
import AgentDetail from "./AgentDetail/AgentDetail"
import AdminCompanyDetail from './AdminCompanyDetail/AdminCompanyDetail'

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/NewRequest" component={NewRequest} />
                    <Route path="/ClientList" component={ClientList} />
                    <Route path="/AddAgent" component={AddAgent} />
                    <Route path="/AddCompany" component={AddCompany}/>
                    <Route path="/ClientDetail" component={ClientDetail}/>
                    <Route path="/CompanyDetail" component={CompanyDetail}/>
                    <Route path="/Search" component={Search}/>
                    <Route path="/Login" component={Login}/>
                    <Route path="/AgentDetail" component={AgentDetail}/>
                    <Route path="/AdminCompanyDetail" component={AdminCompanyDetail}/>
                </Switch>
            </Router>
        )
    }
}
