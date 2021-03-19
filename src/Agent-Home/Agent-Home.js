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
  
    return (
      <>
      {isLoaded && (
        <>
          <div className="content">
            <Row>
              <Col lg="12" md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag='h1'>Welcome to Project Relo, Agent</CardTitle>
                    <CardTitle tag="h4">Recent Clients</CardTitle>
                  </CardHeader>
                  <CardBody>
                    {isLoaded ? (
                      <Table className="tablesorter" bordered>
                      <thead className="text-primary">
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Status</th>
                          <th>Email</th>
                          <th>Select for detail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {//Need to make key that auto inc for the agent ID. Also need status part
                        agents.map(function(agent,index)
                        {
                          if(agent.lastName === "Amet" || agent.lastName === "deployed" || agent.lastName === "test" || agent.firstName === "Jewelyan" || agent.firstName === "" || agent.companyName === "qcki"){
                            return;
                          }
                          return(<tr>
                          <td>{index}</td>
                          <td>{agent.firstName} {agent.lastName}</td>
                          <td>{agent.companyName}</td>
                          <td>{agent.email}</td>
                          <td><Button href="/ClientDetail" color="warning">Detail</Button></td>
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
                    <CardTitle tag="h4">Recent Requests</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table className="tablesorter" bordered>
                      <thead className="text-primary">
                        <tr>
                          <th>ID</th>
                          <th>Company</th>
                          <th>Company Email</th>
                          <th>Status</th>
                          <th>Select for detail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {//Need to make key that auto inc for the agent ID. Also need status part
                        companys.map(function(company,index)
                        {
                          if(company.name === "TAPA" || company.name === "Co." || company.name === "" || company.name === "bb" || company.email === "mortgage.requests@quickenloans.com"){
                            return;
                          }
                          return(<tr>
                          <td>{index+4}</td>
                          <td>{company.name}</td>
                          <td>{company.email}</td>
                          <td>{company.requestMethod}</td>
                          <td><Button href="/CompanyDetail" color="warning">Detail</Button></td>
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

