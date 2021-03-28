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
  

  //Pop up detail for selected client
  function showClient(id){
    var clientName = " "
    var clientPhone = " "
    var clientAddress = " "
    var clientEmail = " "
    var clientNew = " "
    var clientAgent = " "
    var clientStatus = " "
    
    clients.map(function(client){
      let status;
      client.status === 1 ? status="Active":status="Completed";

      if (Number(id) === Number(client.clientId)){
      clientName = client.firstName + " " + client.lastName;
      clientEmail = client.email
      clientStatus = status
      clientPhone = client.phone
      clientAddress = client.curAddress + " " + client.curCity + ", " + client.curZip
      clientNew = client.newLocation
      clientAgent = client.agentId

      }
    })
   
    var confirmationMessage = 'Client Information \n\n' + 
                              'ID: ' + id + '\n' +
                              'Name: ' + clientName + '\n' +
                              'Phone Number: ' + clientPhone + '\n' +
                              'Email: ' + clientEmail + '\n' +
                              'Current Address: ' + clientAddress + '\n' +
                              'New Location: ' + clientNew + '\n' + 
                              'Agent ID: ' + clientAgent + '\n' +
                              'Status: ' + clientStatus + "\n" 

                              
    return confirmationMessage;
  }


    /// Confirmation message when changing client status to complete
    function updateClientStatusConfirmation(id){
      
     
      var confirmationMessage = 'Are you sure you would like to mark this client as completed? \n Once confirmed, this information will not be shown in the home page. \n\n'  
                                
                                
      return confirmationMessage;    
    }

      //Pop up detail for selected client
  function showMortgageRequest(id){
    var requestStatus = ' '
    var requestRelocationId = ' '
    var requestClientId = ' '
    var requestAgentId = ' '
    var requestCompanyId = ' '


    
    mortgageRequests.map(function(request){
      let status;
      request.status === 1 ? status="Active":status="Completed";

      if (Number(id) === Number(request.mortgageId)){
      requestStatus = status
      requestRelocationId = request.relocationId
      requestClientId = request.clientId
      requestAgentId = request.agentId
      requestCompanyId = request.companyId

      }
    })
   
    var confirmationMessage = 'Mortgage Request Information \n\n' + 
                              'ID: ' + id + '\n' +
                              'Company ID: ' + requestCompanyId + '\n' +
                              'Relocation ID: ' + requestRelocationId + '\n' + 
                              'Client ID: ' + requestClientId + '\n' + 
                              'Agent ID: ' + requestAgentId + '\n' +
                              'Status: ' + requestStatus + "\n" 

                              
    return confirmationMessage;
  }

  /// Confirmation message when changing client status to complete
  function updateMortgageStatusConfirmation(id){
      
     
    var confirmationMessage = 'Are you sure you would like to mark this mortgage request as completed? \n Once confirmed, this information will not be shown in the home page. \n\n'  
                                  
                                  
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
                          <td><Button onClick={()=>{ alert(showClient(client.clientId)); }} color="warning">Detail</Button>
                          {" "}<Button onClick={() => { if (window.confirm(updateClientStatusConfirmation(client.clientId))) return }} color="warning">Mark as Complete</Button>
                          {" "}<Button href='/AdditionalRequest' color="warning">Create Additional Request</Button></td>
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
                          <td><Button onClick={()=>{ alert(showMortgageRequest(request.mortgageId)); }} color="warning">Detail</Button>
                          {" "}<Button onClick={() => { if (window.confirm(updateMortgageStatusConfirmation(request.mortgageId))) return }} color="warning">Mark as Complete</Button></td>
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

