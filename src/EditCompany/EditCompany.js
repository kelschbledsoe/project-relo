import React, { useReducer, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { listCompanys } from './../graphql/queries'
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
    Label
  } from "reactstrap";

// State object logic
const formReducer = (state, event) => {
    if(event.reset) {
      return {
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

function EditCompany(){
  let listofcompanys;
  // This function edits the information of a company
  async function updateCompany(){
    const models = await API.graphql(graphqlOperation(listCompanys))
    listofcompanys = models.data.listCompanys.items;
    // I have to set it to an Amazon ID for typing reasons and so it's never null (API rule)
    let cid=listofcompanys[0].id;
    let cn, ce, crm, ccid, newStatus, cv;
    listofcompanys.map(function(company)
    {
      if(company.companyId){
        if(Number(company.companyId) === Number(formData.CompanyID)){
          // When the page first loads, the fields are default undefined. but after one submit they're ''
          if(formData.CompanyName !== undefined && formData.CompanyName !== ''){
            cn = formData.CompanyName;
          }
          else{
            cn = company.name;
          }
          if(formData.CompanyEmail !== undefined && formData.CompanyEmail !== ''){
            ce = formData.CompanyEmail;
          }
          else{
            ce = company.email;
          }
          if(formData.Method !== undefined && formData.Method !== ''){
            crm = formData.Method;
          }
          else{
            crm = company.requestMethod;
          }
          cid = company.id;
          ccid = company.companyId;
          newStatus = company.status;
          cv = company._version;
        }
      }
    })
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
                Edit Company
                </CardHeader>
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
                            name="CompanyID"
                            onChange={handleChange}
                            value={formData.CompanyID || ''}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardHeader>Please enter the fields you would like to edit for this company.</CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <label>Company Name</label>
                          <Input
                            placeholder="Company Name"
                            type="text"
                            name="CompanyName"
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
                            name="CompanyEmail"
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
                      <Button className="btn-fill" color="warning" type="submit" onClick={() => { if (window.confirm(confirmationCompany())) updateCompany() }}>
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
