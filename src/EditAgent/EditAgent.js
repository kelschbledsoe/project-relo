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
    Table,
    Label
  } from "reactstrap";

  // State object logic
const formReducer = (state, event) => {
    if(event.reset) {
      return {
        First: '',
        Last: '',
        Company: '',
        Email: '',
        AgentID: '',
        CompanyID: '',
        CompanyName: '',
        CompanyEmail: '',
        Method: ''
      }
    }
    return {
      ...state,
      [event.name]: event.value
    }
  }

function EditAgent(){

    //Setting Confirmation Statement for adding new agent
    function confirmationAgent(){
        const firstName = formData.First;
        const lastName = formData.Last;
        const email = formData.Email;
        const company = formData.Company;
        const id = formData.AgentID;
    
        var confirmationMessage = 'Please confirm all the information filled is correct.\nYou are submitting the following \n\n' + 
                                  'ID: ' + id + '\n' +
                                  'First Name: ' + firstName + '\n' + 
                                  'Last Name: ' + lastName + '\n' + 
                                  'Email Address: ' + email + '\n' +
                                  'Company: ' + company;
        return confirmationMessage;
      }
    //Setting Confirmation Statement for adding new agent
    function confirmationCompany(){
      const name = formData.CompanyName;
      const method = formData.Method;
      const email = formData.CompanyEmail;
      const companyId = formData.CompanyID;
  
      var confirmationMessage = 'Please confirm all the information filled is correct.\nYou are submitting the following \n\n' + 
                                'ID: ' + companyId + '\n' + 
                                'Company Name: ' + name + '\n' + 
                                'Email Address: ' + email + '\n' +
                                'Request Method: ' + method;
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


    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader tag='h2'>
                  Edit Page
                </CardHeader>
                <CardHeader>Please enter the ID of the agent you would like to edit.</CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col className="pr-md-1" md="2">
                        <FormGroup>
                          <label>Agent ID</label>
                          <Input
                            placeholder="Agent ID"
                            type="text"
                            name="ID"
                            onChange={handleChange}
                            value={formData.AgentID || ''}
                            
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
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
                      <Button className="btn-fill" color="warning" type="submit" onClick={() => { if (window.confirm(confirmationAgent())) return }}>
                        Submit
                      </Button>
                      
                    </CardFooter>
                  </Form>
                </CardBody>
                <CardHeader>Please enter the ID of the company you would like to edit.</CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col className="pr-md-1" md="2">
                        <FormGroup>
                          <label>Company ID</label>
                          <Input
                            placeholder="Company ID"
                            type="text"
                            name="ID"
                            onChange={handleChange}
                            value={formData.CompanyID || ''}
                            
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardHeader>Please enter the fields you would like to edit for this company.</CardHeader>
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
                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <label>Company Name</label>
                          <Input
                            placeholder="Company Name"
                            type="text"
                            name="Company"
                            onChange={handleChange}
                            value={formData.CompanyName || ''}
                            
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <label>Company Email</label>
                          <Input
                            placeholder="Company Email"
                            type="text"
                            name="Email"
                            onChange={handleChange}
                            value={formData.CompanyEmail || ''}
                            
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup row>
                    <Label sm={2}>Select your request method:</Label>
                    <Col sm={10}>
                      <Input type="select" name="Method"
                      onChange={handleChange}
                      value={formData.Method || ''}>
                        <option></option>
                        <option>API</option>
                        <option>Email</option>
                      </Input>
                    </Col>
                  </FormGroup>
                    <CardFooter>
                      <Button color="warning" href='/'>Back</Button>{' '}
                      <Button className="btn-fill" color="warning" type="submit" onClick={() => { if (window.confirm(confirmationCompany())) return }}>
                        Submit
                      </Button>
                    </CardFooter>
                  </Form>
                </CardBody>
                
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
  
export default EditAgent;
