import "./Home.css";
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { listAgents } from './../graphql/queries'
import { listCompanys } from './../graphql/queries'


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
  

  //Pop up detail for selected agent
  function showAgent(id){
    var agentId = id;
    var agentName = " "
    agents.map(function(agent){
      if(!agent.agentId || agent.companyName === "test"){
        return;
      }
      
      agentName = agents[id].firstName + agents[id].lastName;
    })
   
    var confirmationMessage = 'Agent Information \n\n' + 
                              'ID: ' + agentId + '\n' +
                              'Name: ' + agentName + '\n' 
                              
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
                          <td><Button  color="warning">Detail</Button>
                          {" "}<Button color="warning">Set as Inactive</Button></td>
                          {/* {" "}<Button onClick={() => { if (window.confirm(showAgent(agent.agentId))) return }} color="warning">Set as Inactive</Button></td> */}
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
                          <td><Button href="/AdminCompanyDetail" color="warning">Detail</Button>
                          {" "}<Button href="/CompanyDetail" color="warning">Remove Company</Button></td>
                        </tr>)})}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
        )}
      </>
  );
}

