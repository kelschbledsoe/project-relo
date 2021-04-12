import React, { useReducer, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
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
  } from "reactstrap";

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

function AddAgent() {
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

  // This creates the agent entry in the database
  async function createAgent()
  {
    const createAgent = {
      firstName: formData.First,
      lastName: formData.Last,
      companyName: formData.Company,
      email: formData.Email
    };
    const newAgent = await API.graphql({ query: mutations.createAgent, variables:{input: createAgent}});
  }
  // Logic for the form information
  const [formData, setFormData] = useReducer(formReducer, {});
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
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader tag='h2'>
                  Add New Agent
                </CardHeader>
                <CardHeader>Please complete all fields to submit your request.</CardHeader>
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
                            required
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
                            required
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
                            required
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
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <CardFooter>
                      <Button color="warning" href='/'>Back</Button>{' '}
                      <Button className="btn-fill" color="warning" type="submit" onClick={() => { if (window.confirm(confirmationTemplate())) createAgent() }}>
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
  
  export default AddAgent;
  