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

async function changeJihwanStatus()
{
  const todoDetails = {
    id: '9e6afd4e-9566-4e22-8e0b-8950c7b1b430',
    firstName: 'Jihwan',
    lastName: 'Jihwan',
    companyName: 'Quicken Loans',
    email: 'jihwan@jihwan.com',
    agentId: 47,
    status: 1,
    _version:35

  };
  
  const updatedTodo = await API.graphql({ query: mutations.updateAgent, variables: {input: todoDetails}});
  console.log(updatedTodo);
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
   
    var confirmationMessage = 'Are you sure you would like to set this agent as inactive? \n\n' + 
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
                              'This action cannot be undone once confirmed. ' + '\n\n' + 
                              'ID: ' + id + '\n' +
                              'Name: ' + companyName + '\n' +
                              'Email: ' + companyEmail + '\n' + 
                              'Request Method: ' + companyMethod + '\n'
                              
    return confirmationMessage;  
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
                          if(!agent.agentId || agent.companyName === "test"){
                            return;
                          }
                          return(<tr>
                          <td>{agent.agentId}</td>
                          <td>{agent.firstName} {agent.lastName}</td>
                          <td>{agent.companyName}</td>
                          <td>{agent.email}</td>
                          <td><Button onClick={() => { if (window.confirm(showAgent(agent.agentId))) return }} color="warning">Detail</Button>
                          {/* {" "}<Button color="warning">Set as Inactive</Button></td> */}
                          {" "}<Button onClick={() => { if (window.confirm(updateAgentStatusConfirmation(agent.agentId))) return }} color="warning">Set as Inactive</Button></td>
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
                        companys.map(function(company,index)
                        {
                          if(!company.companyId){
                            return;
                          }
                          return(<tr>
                          <td>{company.companyId}</td>
                          <td>{company.name}</td>
                          <td>{company.email}</td>
                          <td>{company.requestMethod}</td>
                          <td><Button onClick={() => { if (window.confirm(showCompanyInfo(company.companyId))) return }} color="warning">Detail</Button>
                          {" "}<Button onClick={() => { if (window.confirm(removeCompanyConfirmation(company.companyId))) return }} color="warning">Remove Company</Button></td>
                        </tr>)})}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <button onClick={searchAgent}>SearchAgent</button>
            <button onClick={changeJihwanStatus}>changeJihwanStatus</button>
          </div>
        </>
        )}
      </>
  );
}

