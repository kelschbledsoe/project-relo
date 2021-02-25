import React, { useState } from "react";

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

function AddCompany() {

    const [rSelected, setRSelected] = useState(null);
  
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader tag='h2'>
                  Add New Company
                </CardHeader>
                <CardHeader>Please complete all fields to submit your request.</CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <label>Company Name</label>
                          <Input
                            placeholder="Company Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <label>Company Email</label>
                          <Input
                            placeholder="Company Email"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <label>
                        <h5 className="title">Request method: {rSelected}</h5>
                      </label>
                    </Row>
                    <Row>
                      <Col className="pr-md-1">
                        <Button color="warning" onClick={() => setRSelected("API")} active={rSelected === 'API'}>API</Button>
                        {' '}
                        <Button color="warning" onClick={() => setRSelected("Email")} active={rSelected === 'Email'}>Email</Button>
                      </Col>
                    </Row>
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
  
  export default AddCompany;
  