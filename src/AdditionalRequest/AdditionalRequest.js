import React from 'react';

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

function AdditionalRequest() {


    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader tag='h2'>
                  Add Additional Mortgage Request
                </CardHeader>
                <CardHeader>Please complete all fields to submit your request.</CardHeader>
                <CardHeader>Enter the ID of the client you would like to make additional mortgage request for, then select the company you would like to send the request to.</CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Client ID</label>
                          <Input
                            placeholder="ID"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      
                    </Row>
                    <FormGroup row>
                    <Label for="SelectCompany" sm={2}>Select one company to send a mortgage request to.</Label>
                    <Col sm={10}>
                      <Input type="select" name="Company" id="SelectCompany">
                        <option></option>
                        <option>Chase</option>
                        <option>PNC Bank</option>
                        <option>Quicken Loans</option>
                        <option>Rocket Mortgage</option>
                        <option>USAA</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button color="warning" href='/'>Back</Button>{' '}
                  <Button onClick={()=>alert('Your request has been submitted')} className="btn-fill" color="warning" type="submit" href='/'>
                    Submit
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
  
  export default AdditionalRequest;