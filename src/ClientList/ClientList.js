import React, { useState, useReducer } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { listClients} from './../graphql/queries'
import { Table, Button, Navbar, Container, Nav, 
  Form, FormGroup, Input, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';

const formReducer = (state, event) => {
  if(event.reset) {
    return {
      searchBy: '',
      searchField: '',
    }
  }
  return {
    ...state,
    [event.name]: event.value
  }
}

function ClientList(){
  const [clients, setClients] = useState([])
  let listofclients;
  /*
    I know this is the complete wrong way to implement a search page. The back-end team would not properly
    create a query for me to actually implement the search page. This was the only way I could get something
    functional in time.
  */
  async function queryClient(){
    const models = await API.graphql(graphqlOperation(listClients))
    listofclients = models.data.listClients.items
    if(listofclients){
      let filteredlist = [];
      if(formData.searchBy === "ID"){
        filteredlist = listofclients.filter(client=>{return client&&client.clientId === Number(formData.searchField)});
      }
      else if(formData.searchBy === "Name"){
        filteredlist = listofclients.filter(client=>{return client&&
          ((client.firstName === String(formData.searchField)) || (client.lastName === String(formData.searchField)))

        });
      }
      setClients(filteredlist);
    }
  } 

  const [formData, setFormData] = useReducer(formReducer, {});
  // This event is the Submit button behavior. Has a cool down period to let the API catch up then has a JS alert box.
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFormData({
        reset: true
      })
    }, 3000)
  }

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }


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

  return(
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Client List Search</h5>
                <Navbar expand="lg">
                  <Container>
                    <Nav className="justify-content-left">
                      <label>
                        <h5 className="title">Search by:</h5>
                      </label>
                      <Col className="ml-auto">
                        <Input type="select" name="searchBy"
                          onChange={handleChange}
                          value={formData.searchBy || ''}>
                            <option></option>
                            <option>Name</option>
                            <option>ID</option>
                        </Input>
                      </Col>
                      <Col>
                        <Form inline className="ml-auto" size="lg">
                          <FormGroup className="no-border">
                          <Input
                          placeholder="Search"
                          name="searchField"
                          type="text"
                          onChange={handleChange}
                          value={formData.searchField || ''}
                          required
                        />
                        </FormGroup>
                        </Form>
                      </Col>
                      <Form onSubmit={handleSubmit}>
                        <Col>
                          <Button color="warning" type="submit" onClick={() => {queryClient()}}>Submit</Button>
                        </Col>
                      </Form>
                    </Nav>
                  </Container>
                </Navbar>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      <CardBody>
        <h3>Client Results</h3>
        <Table bordered>
          <thead>
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
              if (status === "Active"){
              return(<tr>
              <td>{client.clientId}</td>
              <td>{client.firstName} {client.lastName}</td>
              <td>{client.email}</td>
              <td>{status}</td>
              <td><Button onClick={()=>{ alert(showClient(client.clientId)); }} color="warning">Detail</Button>
              {" "}<Button onClick={() => { if (window.confirm(updateClientStatusConfirmation(client.clientId))) return }} color="warning">Mark as Complete</Button></td>
            </tr>)}
            else{
              return(<tr>
                <td>{client.clientId}</td>
                <td>{client.firstName} {client.lastName}</td>
                <td>{client.email}</td>
                <td>{status}</td>
                <td><Button onClick={()=>{ alert(showClient(client.clientId)); }} color="warning">Detail</Button></td>
              </tr>)}
            })}
          </tbody>
        </Table>
      </CardBody>
    </div>
      </>
  );
}

export default ClientList;