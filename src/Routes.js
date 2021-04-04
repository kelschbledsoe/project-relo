import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import NewRequest from "./NewRequest/NewRequest";
import ClientList from "./ClientList/ClientList";
import Home from "./Home/Home";
import AddAgent from "./AddAgent/AddAgent";
import history from './history';
import AddCompany from "./AddCompany/AddCompany";
import ClientDetail from "./ClientDetail/ClientDetail";
import CompanyDetail from "./CompanyDetail/CompanyDetail";
import Search from "./Search/Search";
import AgentDetail from "./AgentDetail/AgentDetail";
import AdminCompanyDetail from './AdminCompanyDetail/AdminCompanyDetail';
import AgentHome from './Agent-Home/Agent-Home';
import AdditionalRequest from './AdditionalRequest/AdditionalRequest'
import EditAgent from './EditAgent/EditAgent'
import EditCompany from './EditCompany/EditCompany'

export default class Routes extends Component {

    render() {

        const url = window.location.href;
        if (url.includes("agent")){
            return(
                <Router history={history}>
                    <Switch>
                        <Route path="/" exact component={AgentHome} />
                        <Route path="/NewRequest" component={NewRequest} />
                        <Route path="/ClientList" component={ClientList} />
                        <Route path="/AddAgent" component={AddAgent} />
                        <Route path="/AddCompany" component={AddCompany}/>
                        <Route path="/ClientDetail" component={ClientDetail}/>
                        <Route path="/CompanyDetail" component={CompanyDetail}/>
                        <Route path="/Search" component={Search}/>
                        <Route path="/AgentDetail" component={AgentDetail}/>
                        <Route path="/AdminCompanyDetail" component={AdminCompanyDetail}/>
                        <Route path="/AdditionalRequest" component={AdditionalRequest}/>
                        <Route path="/EditAgent" component={EditAgent} />
                        <Route path="/EditCompany" component={EditCompany} />

                    </Switch>
                </Router>
            )
        }
        else{
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
                        <Route path="/AgentDetail" component={AgentDetail}/>
                        <Route path="/AdminCompanyDetail" component={AdminCompanyDetail}/>
                        <Route path="/AdditionalRequest" component={AdditionalRequest}/>
                        <Route path="/EditAgent" component={EditAgent} />
                        <Route path="/EditCompany" component={EditCompany} />

                    </Switch>
                </Router>
            )
        }
    }
}
