import React, { useReducer, useState, useEffect } from "react";
import { API, graphqlOperation } from 'aws-amplify';
import { Company } from './../models';
import { listCompanys } from './../graphql/queries';
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
    Label,
    Table
  } from "reactstrap";

// State object logic
const formReducer = (state, event) => {
  if(event.reset) {
    return {
      Company: '',
      Email: '',
      Method: '',
    }
  }
  return {
    ...state,
    [event.name]: event.value
  }
}

function EditCompany() {
    const [companys, setCompanys] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

  //Setting Confirmation Statement for adding new company
  function confirmationTemplate(){
    const company = formData.Company;
    const email = formData.Email;
    const method = formData.Method;

    var confirmationMessage = 'Please confirm all the information filled is correct.\nYou are submitting the following \n\n' + 
                              'Company: ' + company + '\n' + 
                              'Email Address: ' + email + '\n' +
                              'Method of Receiving Request: ' + method;
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
  let listofcompanys;

  useEffect(() => {
    async function queryCompany(){
      /* make page take longer to load await new Promise(x=>setTimeout(x,10000)) */
      const models = await API.graphql(graphqlOperation(listCompanys))
      listofcompanys = models.data.listCompanys.items
      if(listofcompanys){
        setCompanys(listofcompanys);
        setIsLoaded(true);
      }
    }
    queryCompany()
  }, [setIsLoaded])

  var editUrl = String(window.location.href);
  var companyId = editUrl.slice(-3)
  if(isNaN(companyId)){
      companyId = companyId.slice(-2)
      if (isNaN(companyId)){
        companyId = companyId.slice(-1)
      }
  }

    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader tag='h2'>
                  Edit Company Information
                </CardHeader>
                <CardHeader>Company Current Information</CardHeader>
                <CardBody>
                    <Table className="tablesorter" bordered>
                      <thead className="text-primary">
                        <tr>
                          <th>ID</th>
                          <th>Company</th>
                          <th>Company Email</th>
                          <th>Method</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                        companys.map(function(company)
                        {
                          if(!company.companyId || company.status === 0){
                            return;
                          }
                          if (Number(companyId) === Number(company.companyId)){
                          return(<tr>
                          <td>{company.companyId}</td>
                          <td>{company.name}</td>
                          <td>{company.email}</td>
                          <td>{company.requestMethod}</td>
                        </tr>)}})}
                      </tbody>
                    </Table>
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
                            value={formData.Company || ''}
                            
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
                            value={formData.Email || ''}
                            
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
                      <Button className="btn-fill" color="warning" type="submit" onClick={() => { if (window.confirm(confirmationTemplate())) return }}>
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
  
  export default EditCompany;
  