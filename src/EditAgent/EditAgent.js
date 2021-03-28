import React, { useReducer, useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { API, graphqlOperation } from 'aws-amplify'
import { Agent } from './../models';
import { listAgents } from './../graphql/queries'
import * as mutations from './../graphql/mutations';


// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Spinner,
    Table
  } from "reactstrap";
import { isNumericLiteral } from 'typescript';

  // State object logic
const formReducer = (state, event) => {
    if(event.reset) {
      return {
        First: '',
        Last: '',
        Company: '',
        Email: '',
      }
    }
    return {
      ...state,
      [event.name]: event.value
    }
  }

function EditAgent(){

    //Setting Confirmation Statement for adding new agent
    function confirmationTemplate(){
        const firstName = formData.First;
        const lastName = formData.Last;
        const email = formData.Email;
        const company = formData.Company;
    
        var confirmationMessage = 'Please confirm all the information filled is correct.\nYou are submitting the following \n\n' + 
                                  'First Name: ' + firstName + '\n' + 
                                  'Last Name: ' + lastName + '\n' + 
                                  'Email Address: ' + email + '\n' +
                                  'Company: ' + company;
        return confirmationMessage;
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

  

  var editUrl = String(window.location.href);
  var agentId = editUrl.slice(-3)
  if(isNaN(agentId)){
      agentId = agentId.slice(-2)
      if (isNaN(agentId)){
        agentId = agentId.slice(-1)
      }
  }




    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader tag='h2'>
                  Edit Agent Info
                </CardHeader>
                <CardHeader>Agent Current Information</CardHeader>
                <CardBody>
                    {isLoaded ? (
                      <Table className="tablesorter" bordered>
                      <thead className="text-primary">
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Company</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                        agents.map(function(agent)
                        {
                          if(!agent.agentId || agent.companyName === "test" || agent.status === 0){
                            return;
                          }
                          if (Number(agentId) === Number(agent.agentId)){
                          return(<tr>
                          <td>{agent.agentId}</td>
                          <td>{agent.firstName} {agent.lastName}</td>
                          <td>{agent.companyName}</td>
                          <td>{agent.email}</td>
                          </tr>)}})}
                      </tbody>
                    </Table>
                    ):(<Spinner color="dark"/>)}
                  </CardBody>
                <CardHeader>Please enter the fields you would like to edit for this agent.</CardHeader>
                {/* {submitting &&
                  <div>
                  You are submitting the following:
                  <ul>
                    {Object.entries(formData).map(([name, value]) => (
                      <li key={name}><strong>{name}</strong>:{value.toString()}</li>
                    ))}
                  </ul>
                </div>
                } */}
                
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            placeholder="First Name"
                            name="First"
                            type="text"
                            onChange={handleChange}
                            value={formData.First || ''}
                            
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            placeholder="Last Name"
                            name="Last"
                            type="text"
                            onChange={handleChange}
                            value={formData.Last || ''}
                            
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Company Name</label>
                          <Input
                            placeholder="Company Name"
                            name="Company"
                            type="text"
                            onChange={handleChange}
                            value={formData.Company || ''}
                            
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Email Address</label>
                          <Input
                            placeholder="Email Address"
                            name="Email"
                            type="email"
                            onChange={handleChange}
                            value={formData.Email || ''}
                            
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <CardFooter>
                      <Button color="warning" href='/'>Back</Button>{' '}
                      <Button className="btn-fill" color="warning" type="submit" onClick={() => { if (window.confirm(confirmationTemplate())) return }}>
                        Submit
                      </Button>{' '}
                      <Button color="warning" >Log</Button>
                    </CardFooter>
                  </Form>
                </CardBody>
                
              </Card>
            </Col>
          </Row>
            {/* <button onClick={queryAgent}>Test Submit Button</button> */}
        </div>
      </>
    );
  }
  
export default EditAgent;
