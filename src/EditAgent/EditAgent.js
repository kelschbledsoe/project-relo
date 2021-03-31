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
    Col
  } from "reactstrap";

// State object logic
const formReducer = (state, event) => {
    if(event.reset) {
      return {
        First: '',
        Last: '',
        Company: '',
        Email: '',
        AgentID: ''
      }
    }
    return {
      ...state,
      [event.name]: event.value
    }
  }

function EditAgent(){
  let listofagents;
  
  async function updateAgent(){
    const models = await API.graphql(graphqlOperation(listAgents));
    listofagents = models.data.listAgents.items;
    // I have to set it to an Amazon ID for typing reasons and so it's never null (API rule)
    let aid=listofagents[0].id;
    let afn, aln, acn, ae, aaid, newStatus, av;
    listofagents.map(function(agent)
    {
      if(agent.agentId && agent.companyName !== "test"){
        if(Number(agent.agentId) === Number(formData.AgentID)){
          // When the page first loads, the fields are default undefined. but after one submit they're ''
          if(formData.First !== undefined && formData.First !== ''){
            afn = formData.First;
          }
          else{
            afn = agent.firstName;
          }
          if(formData.Last !== undefined && formData.Last !== ''){
            aln = formData.Last;
          }
          else{
            aln = agent.lastName;
          }
          if(formData.Company !== undefined && formData.Company !== ''){
            acn = formData.Company;
          }
          else{
            acn = agent.companyName;
          }
          if(formData.Email !== undefined && formData.Email !== ''){
            ae = formData.Email;
          }
          else{
            ae = agent.email;
          }
          if(agent.id !== null){
            aid = agent.id;
          }
          
          aaid = agent.agentId;
          newStatus = agent.status;
          av = agent._version;
        }
      }
    })
    // I have to make the new entry this way
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
  
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader tag='h2'>
                  Edit Agent
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
                            name="AgentID"
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
                      <Button className="btn-fill" color="warning" type="submit" onClick={() => { if (window.confirm(confirmationAgent())) updateAgent(); }}>
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
