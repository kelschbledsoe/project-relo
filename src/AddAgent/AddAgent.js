import React, { useReducer, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { API, graphqlOperation } from 'aws-amplify'
import { Agent } from './../models';
import { listAgents } from './../graphql/queries'

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

  // These async functions are for the API
  async function createAgent()
  {
    await DataStore.save(
      new Agent({
      "firstName": formData.First,
      "lastName": formData.Last,
      "companyName": formData.Company,
      "email": formData.Email
    })
  );
  }
  async function queryAgent()
  {
    //const models = await DataStore.query(Agent);
    const models = await API.graphql(graphqlOperation(listAgents))
    const listofagents = models.data.listAgents.items
    console.log("working");
    console.log(listofagents);
    console.log(listofagents[0].firstName)
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
                  Add New Agent
                </CardHeader>
                <CardHeader>Please complete all fields to submit your request.</CardHeader>
                {submitting &&
                  <div>
                  You are submitting the following:
                  <ul>
                    {Object.entries(formData).map(([name, value]) => (
                      <li key={name}><strong>{name}</strong>:{value.toString()}</li>
                    ))}
                  </ul>
                </div>
                }
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
                      <Button className="btn-fill" color="warning" type="submit" onClick={createAgent}>
                        Submit
                      </Button>
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
  
  export default AddAgent;
  