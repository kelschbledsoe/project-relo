import "./Home.css";
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { listAgents } from './../graphql/queries'
import { listCompanys } from './../graphql/queries'
import * as mutations from './../graphql/mutations';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Spinner,
} from "reactstrap";

export default function Home(){
  const [agents, setAgents] = useState([])
  const [companys, setCompanys] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  let listofagents;
  // Sorry this is spelt wrong. That's the back-end team's fault and I don't want to change the convention
  let listofcompanys;
  // render page
  useEffect(() => {
    async function queryAgent(){
      /* make page take longer to load await new Promise(x=>setTimeout(x,10000)) */
      const models = await API.graphql(graphqlOperation(listAgents))
      listofagents = models.data.listAgents.items
      if(listofagents){
        setAgents(listofagents);
        setIsLoaded(true);
      }
    }
    queryAgent()
  }, [setIsLoaded])

  useEffect(() => {
    async function queryCompany(){
      /* make page take longer to load await new Promise(x=>setTimeout(x,10000)) */
      const models = await API.graphql(graphqlOperation(listCompanys))
      listofcompanys = models.data.listCompanys.items
      if(listofcompanys){
        setCompanys(listofcompanys);
        setIsLoaded(true);
      }
    }
    queryCompany()
  }, [setIsLoaded])
  
async function searchAgent()
{
  const search = await API.graphql(graphqlOperation(`
  query searchAgent {
    listAgents (filter:{ firstName:{ contains:"Jihwan"}})
    {
      items{
        id
        firstName
        lastName
        email
        companyName
        agentId
        status
        _version
      }
    }
  }
  `))
  console.log(search);
}

  //Pop up detail for selected agent
  function showAgent(id){
    var agentName = " "
    var agentEmail = " "
    var agentStatus = " "
    agents.map(function(agent){
      if(!agent.agentId || agent.companyName === "test"){
        return;
      }
      if (Number(id) === Number(agent.agentId)){
      agentName = agent.firstName + " " + agent.lastName;
      agentEmail = agent.email
      if (agent.status === 1){
        agentStatus = "Active"
      }
      else{
        agentStatus = "Inactive"
      }}
    })
    var confirmationMessage = 'Agent Information \n\n' + 
                              'ID: ' + id + '\n' +
                              'Name: ' + agentName + '\n' +
                              'Email: ' + agentEmail + '\n' +
                              'Status: ' + agentStatus
                              
    return confirmationMessage;
  }
  /// Confirmation message when changing agent status
  function updateAgentStatusConfirmation(id){
    var agentName = " "
    var agentEmail = " "
    var agentStatus = " "
    agents.map(function(agent){
      if(!agent.agentId || agent.companyName === "test"){
        return;
      }
      if (Number(id) === Number(agent.agentId)){
      agentName = agent.firstName + " " + agent.lastName;
      agentEmail = agent.email
      if (agent.status === 1){
        agentStatus = "Active"
      }
      else{
        agentStatus = "Inactive"
      }}
    })
    var confirmationMessage = 'Are you sure you would like to change the status of this agent? \n Once confirmed, you must repeat this process to change the status again. \n Changes will be visible once you refresh the page. \n\n' + 
                              'ID: ' + id + '\n' +
                              'Name: ' + agentName + '\n' +
                              'Email: ' + agentEmail + '\n' 
                              
    return confirmationMessage;    
  }
  
  //Pop up detail for selected company
  function showCompanyInfo(id){
    var companyName = " "
    var companyEmail = " "
    var companyMethod = " "
    companys.map(function(company){
      if(!company.companyId){
        return;
      }
      if (Number(id) === Number(company.companyId)){
      companyName = company.name;
      companyEmail = company.email
      companyMethod = company.requestMethod
      }
    })
    var confirmationMessage = 'Company Information' + '\n\n' + 
                              'ID: ' + id + '\n' +
                              'Name: ' + companyName + '\n' +
                              'Email: ' + companyEmail + '\n' + 
                              'Request Method: ' + companyMethod + '\n'
                              
    return confirmationMessage;  
  }
  
  /// Confirmation message when removing company
  function removeCompanyConfirmation(id){
    var companyName = " "
    var companyEmail = " "
    var companyMethod = " "
    companys.map(function(company){
      if(!company.companyId){
        return;
      }
      if (Number(id) === Number(company.companyId)){
      companyName = company.name;
      companyEmail = company.email
      companyMethod = company.requestMethod
      }
    })
    var confirmationMessage = 'Are you sure you would like to remove this company from Project Relo?' + '\n' + 
                              'This action cannot be undone once confirmed. ' + '\n' + 
                              'Changes will be visible once you refresh the page. ' + '\n\n' + 
                              'ID: ' + id + '\n' +
                              'Name: ' + companyName + '\n' +
                              'Email: ' + companyEmail + '\n' + 
                              'Request Method: ' + companyMethod + '\n'
    
    return confirmationMessage;            
  }

  function AgentEdit(id) {
    var url = "EditAgent?id=" + encodeURIComponent(id);
    window.location.href = url;
  }

  function CompanyEdit(id){
    var url = "EditCompany?id=" + encodeURIComponent(id);
    window.location.href = url;
  }
  
  // Function to update the agent information. Pass in all the agent values.
  async function updateAgent(aid, afn, aln, acn, ae, aaid, as, av){
    // Make this all the details of the existing agent and change any you want changed
    // I know in this use case it's just to deactivate an agent but I'm putting this logic here incase I need it later
    let newStatus = as === 1 ? 0:1;
    const agentDetails={
      id: aid,
      firstName: afn,
      lastName: aln,
      companyName: acn,
      email: ae,
      agentId: aaid,
      status: newStatus,
      _version: av
    };
    const updatedTodo = await API.graphql({ query: mutations.updateAgent, variables: {input: agentDetails}});
  }
  // This doesn't actually delete the company from the table. It changes the status to 0.
  // Might be good to rather say inactive or archived.
  async function deleteCompany(cid, cn, ce, crm, ccid, cs, cv){
    let newStatus = cs === 1 ? 0:1;
    const companyDetails={
      id: cid,
      name: cn,
      email: ce,
      requestMethod: crm,
      companyId: ccid,
      status: newStatus,
      _version: cv
    };
    const updatedTodo = await API.graphql({ query: mutations.updateCompany, variables: {input: companyDetails}});
  }


    return (
      <>
      {isLoaded && (
        <>
          <div className="content">
            <Row>
              <Col lg="12" md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag='h1'>Welcome to Project Relo, Admin</CardTitle>
                    <CardTitle tag="h4">Recent Agents</CardTitle>
                  </CardHeader>
                  <CardBody>
                    {isLoaded ? (
                      <Table className="tablesorter" bordered>
                      <thead className="text-primary">
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Company</th>
                          <th>Email</th>
                          <th>Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                        agents.map(function(agent)
                        {
                          if(!agent.agentId || agent.companyName === "test" || agent.status === 0){
                            return;
                          }
                          return(<tr>
                          <td>{agent.agentId}</td>
                          <td>{agent.firstName} {agent.lastName}</td>
                          <td>{agent.companyName}</td>
                          <td>{agent.email}</td>
                          <td><Button onClick={() => { if (window.confirm(showAgent(agent.agentId))) return }} color="warning">Detail</Button>
                          {/* {" "}<Button color="warning">Set as Inactive</Button></td> */}
                          {" "}<Button onClick={() => { if (window.confirm(updateAgentStatusConfirmation(agent.agentId)))
                            updateAgent(agent.id, agent.firstName, agent.lastName, agent.companyName, agent.email, agent.agentId, agent.status, agent._version) }} 
                            color="warning">Set as Inactive</Button>
                            {" "}<Button onClick={() => { if (window.confirm("Are you sure you would like to edit this agent's information?")) AgentEdit(agent.agentId) }} color="warning">Edit</Button></td>
                        </tr>)})}
                      </tbody>
                    </Table>
                    ):(<Spinner color="dark"/>)}
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="12" md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Recent Companies</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table className="tablesorter" bordered>
                      <thead className="text-primary">
                        <tr>
                          <th>ID</th>
                          <th>Company</th>
                          <th>Company Email</th>
                          <th>Method</th>
                          <th>Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                        companys.map(function(company)
                        {
                          if(!company.companyId || company.status === 0){
                            return;
                          }
                          return(<tr>
                          <td>{company.companyId}</td>
                          <td>{company.name}</td>
                          <td>{company.email}</td>
                          <td>{company.requestMethod}</td>
                          <td><Button onClick={() => { if (window.confirm(showCompanyInfo(company.companyId))) return }} color="warning">Detail</Button>
                          {" "}<Button onClick={() => { if (window.confirm(removeCompanyConfirmation(company.companyId))) 
                            deleteCompany(company.id, company.name, company.email, company.requestMethod, company.companyId, company.status, company._version)
                          }} color="warning">Remove Company</Button>
                          {" "}<Button onClick={() => { if (window.confirm("Are you sure you would like to edit this company's information?")) CompanyEdit(company.companyId) }} color="warning">Edit</Button></td>
                        </tr>)})}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {/* <button onClick={searchAgent}>SearchAgent</button> */}
          </div>
        </>
        )}
      </>
  );
}

