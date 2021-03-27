import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { listClients, listMortgageRequests} from './../graphql/queries'

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
  const [mortgageRequests, setmortgageRequests] = useState([])
  const [clients, setClients] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  let listofclients;
  let listofmortgagerequests;
  // render page
  useEffect(() => {
    async function queryClient(){
      const models = await API.graphql(graphqlOperation(listClients))
      listofclients = models.data.listClients.items
      if(listofclients){
        setClients(listofclients);
        setIsLoaded(true);
      }
    }
    queryClient()
  }, [setIsLoaded])

  useEffect(() => {
    async function querymortgageRequests(){
      /* make page take longer to load await new Promise(x=>setTimeout(x,10000)) */
      const models = await API.graphql(graphqlOperation(listMortgageRequests))
      listofmortgagerequests = models.data.listMortgageRequests.items
      if(listofmortgagerequests){
        setmortgageRequests(listofmortgagerequests);
        setIsLoaded(true);
      }
    }
    querymortgageRequests()
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
                          <th>Email</th>
                          <th>Status</th>
                          <th>Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                        clients.map(function(client)
                        {
                          let status;
                          client.status === 1 ? status="Active":status="Completed";
                          /* Commenting out so no issues with demo
                          if(!client.clientId){
                            return;
                          }*/
                          return(<tr>
                          <td>{client.clientId}</td>
                          <td>{client.firstName} {client.lastName}</td>
                          <td>{client.email}</td>
                          <td>{status}</td>
                          <td><Button href="/ClientDetail" color="warning">Detail</Button>
                          {" "}<Button href="/ClientDetail" color="warning">Mark as Complete</Button></td>
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
                    <CardTitle tag="h4">Recent Mortgage Requests</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table className="tablesorter" bordered>
                      <thead className="text-primary">
                        <tr>
                          <th>ID</th>
                          {/* Doing company ID instead of company name here b/c that's what I have stored. Can change if needed. */}
                          <th>Company ID</th> 
                          <th>Client ID</th>
                          <th>Status</th>
                          <th>Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                        mortgageRequests.map(function(request)
                        {
                          let status;
                          request.status === 1 ? status="Active":status="Completed";
                          /* if(!request.mortgageId){
                            return;
                          } */
                          return(<tr>
                          <td>{request.mortgageId}</td>
                          <td>{request.companyId}</td>
                          <td>{request.clientId}</td>
                          <td>{status}</td>
                          <td><Button href="/CompanyDetail" color="warning">Detail</Button>
                          {" "}<Button color="warning">Mark as Complete</Button></td>
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

