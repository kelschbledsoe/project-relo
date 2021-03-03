import "./Home.css";
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { listAgents } from './../graphql/queries'

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
  const [isLoaded, setIsLoaded] = useState(false)
  let listofagents;
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
  
    return (
      <>
      {isLoaded && (
        <>
          <div className="content">
            <Row>
              <Col lg="12" md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag='h1'>Welcome to Project Relo</CardTitle>
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
                          <th>Select for detail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {//Need to make key that auto inc for the agent ID. Also need status part
                        agents.map(function(agent,index)
                        {
                          if(agent.lastName === "Amet" || agent.lastName === "deployed" || agent.lastName === "test"){
                            return;
                          }
                          return(<tr>
                          <td>{index}</td>
                          <td>{agent.firstName} {agent.lastName}</td>
                          <td>{agent.companyName}</td>
                          <td>{agent.email}</td>
                          <td><Button href="/AgentDetail" color="warning">Detail</Button></td>
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
                          <th>Method</th>
                          <th>Select for detail</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>21</td>
                          <td>Quicken Loans</td>
                          <td>API</td>
                          <td><Button href="/CompanyDetail" color="warning">Detail</Button></td>
                        </tr>
                        <tr>
                          <td>22</td>
                          <td>Chase</td>
                          <td>Email</td>
                          <td><Button href="/CompanyDetail" color="warning">Detail</Button></td>
                        </tr>
                        <tr>
                          <td>23</td>
                          <td>PNC Bank</td>
                          <td>Email</td>
                          <td><Button href="/CompanyDetail" color="warning">Detail</Button></td>
                        </tr>
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

