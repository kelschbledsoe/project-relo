import React, { useState, useReducer } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listAgents, listCompanys } from './../graphql/queries';
import * as mutations from './../graphql/mutations';
import { Table, Button, Navbar, Container, 
  Nav, Form, FormGroup, Input, Card, 
  CardHeader, Row, Col, CardBody } from 'reactstrap';

/*
Still to do for this page:
- Make the table headers only appear with the search results
- Make the search results for name not case sensitive
- Error message for when no results are found
*/
// State object logic
const formReducer = (state, event) => {
  if(event.reset) {
    return {
      searchBy: '',
      searchFor: '',
      searchField: '',
    }
  }
  return {
    ...state,
    [event.name]: event.value
  }
}
  
function Search(){
  const [companys, setCompanys] = useState([])
  const [agents, setAgents] = useState([])
  let listofagents;
  let listofcompanys;
  /*
    I know this is the complete wrong way to implement a search page. The back-end team would not properly
    create a query for me to actually implement the search page. This was the only way I could get something
    functional in time.
  */
  async function queryCompany(){
      const models = await API.graphql(graphqlOperation(listCompanys))
      listofcompanys = models.data.listCompanys.items
      if(listofcompanys){
        let filteredlist = [];
        if(formData.searchBy === "ID"){
          filteredlist = listofcompanys.filter(company=>{return company&&company.companyId === Number(formData.searchField)});
        }
        else if(formData.searchBy === "Name"){
          filteredlist = listofcompanys.filter(company=>{return company&&company.name === String(formData.searchField)});
        }
        setCompanys(filteredlist);
    }
  } 

  async function queryAgent(){
    const models = await API.graphql(graphqlOperation(listAgents))
    listofagents = models.data.listAgents.items
    if(listofagents){
      let filteredlist = [];
      if(formData.searchBy === "ID"){
        filteredlist = listofagents.filter(agent=>{return agent&&agent.agentId === Number(formData.searchField)});
      }
      else if(formData.searchBy === "Name"){
        filteredlist = listofagents.filter(agent=>{return agent&&
          ((agent.firstName === String(formData.searchField)) || (agent.lastName === String(formData.searchField)))
        });
      }
      setAgents(filteredlist);
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
    var confirmationMessage = 'Are you sure you would like to change the status of this agent? \nOnce confirmed, you must repeat this process to change the status again. \n\n' + 
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

  function AgentEdit(id) {
    var url = "EditAgent?id=" + encodeURIComponent(id);
    window.location.href = url;
  }

  function CompanyEdit(id){
    var url = "EditCompany?id=" + encodeURIComponent(id);
    window.location.href = url;
  }

  async function updateAgent(aid, afn, aln, acn, ae, aaid, as, av){
    // Hey look I needed the logic lol
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
    return(
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Admin Search</h5>
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
                        <label>
                          <h5 className="title">Search for:</h5>
                        </label>
                        <Col className="ml-auto">
                          <Input type="select" name="searchFor"
                            onChange={handleChange}
                            value={formData.searchFor || ''}>
                              <option></option>
                              <option>Agent</option>
                              <option>Company</option>
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
                            <Button color="warning" type="submit" 
                            onClick={() => 
                              {formData.searchFor === "Company" ? queryCompany() : queryAgent()}
                            }>Submit</Button>
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
          <h3>Relocation Agent Results</h3>
          <Table bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
            {
              agents.map(function(agent)
              {
                let status;
                agent.status === 1 ? status="Active":status="Deactivated";
                if(!agent.agentId || agent.companyName === "test"){
                  return;
                }
                if (Number(agent.status === 1)){
                  return(<tr>
                  <td>{agent.agentId}</td>
                  <td>{agent.firstName} {agent.lastName}</td>
                  <td>{agent.companyName}</td>
                  <td>{agent.email}</td>
                  <td>{status}</td>
                  <td><Button onClick={() => { if (window.confirm(showAgent(agent.agentId))) return }} color="warning">Detail</Button>
                            {/* {" "}<Button color="warning">Set as Inactive</Button></td> */}
                            {" "}<Button onClick={() => { if (window.confirm(updateAgentStatusConfirmation(agent.agentId))) 
                            updateAgent(agent.id, agent.firstName, agent.lastName, agent.companyName, agent.email, agent.agentId, agent.status, agent._version)
                            }} color="warning">Set as Inactive</Button>
                            {" "}<Button onClick={() => { if (window.confirm("Are you sure you would like to edit this agent's information?")) AgentEdit(agent.agentId) }} color="warning">Edit</Button></td>
                  </tr>)}
                  else{
                    return(<tr>
                      <td>{agent.agentId}</td>
                      <td>{agent.firstName} {agent.lastName}</td>
                      <td>{agent.companyName}</td>
                      <td>{agent.email}</td>
                      <td>{status}</td>
                      <td><Button onClick={() => { if (window.confirm(showAgent(agent.agentId))) return }} color="warning">Detail</Button>
                                {/* {" "}<Button color="warning">Set as Inactive</Button></td> */}
                                {" "}<Button onClick={() => { if (window.confirm(updateAgentStatusConfirmation(agent.agentId))) 
                                updateAgent(agent.id, agent.firstName, agent.lastName, agent.companyName, agent.email, agent.agentId, agent.status, agent._version)
                                }} color="warning">Set as Active</Button>
                                {" "}<Button onClick={() => { if (window.confirm("Are you sure you would like to edit this agent's information?")) AgentEdit(agent.agentId) }} color="warning">Edit</Button></td>
                      </tr>)}
                  })}
            </tbody>
          </Table>
        </CardBody>
        <CardBody>
          <h3>Mortgage Company Results</h3>
          <Table bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Method</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
            {companys.map(function(company)
          {
            let status;
            company.status === 1 ? status="Active":status="Deactivated";
            // We're rolling with if a company is "deleted" you can't search for it but idk if that's right
            if(!company.companyId || company.status !== 1){
              return;
            }
            return(<tr>
            <td>{company.companyId}</td>
            <td>{company.name}</td>
            <td>{company.email}</td>
            <td>{company.requestMethod}</td>
            <td>{status}</td>
            <td><Button onClick={() => { if (window.confirm(showCompanyInfo(company.companyId))) return }} color="warning">Detail</Button>
            {" "}<Button onClick={() => { if (window.confirm(removeCompanyConfirmation(company.companyId))) 
            deleteCompany(company.id, company.name, company.email, company.requestMethod, company.companyId, company.status, company._version)
            }} color="warning">Remove Company</Button>
            {" "}<Button onClick={() => { if (window.confirm("Are you sure you would like to edit this company's information?")) CompanyEdit(company.companyId) }} color="warning">Edit</Button></td>
          </tr>)})}
            </tbody>
          </Table>
        </CardBody>
      </div>
        </>
    );
}

export default Search;