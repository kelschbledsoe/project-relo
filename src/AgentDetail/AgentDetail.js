import React from "react";

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

function AgentDetail(){
    return (
        <>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader tag='h2'>
                    Agent Detail
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="pr-md-1" md="5">
                          <FormGroup>
                            <label>First Name</label>
                            <Input
                              placeholder="John"
                              type="text"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="5">
                          <FormGroup>
                            <label>Last Name</label>
                            <Input
                              placeholder="Smith"
                              type="text"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md='2'>
                          <FormGroup>
                            <label>ID</label>
                            <Input
                              placeholder="5"
                              type="text"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="4">
                          <FormGroup>
                            <label>Company</label>
                            <Input
                              placeholder="Chase"
                              type="text"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label>Email Address</label>
                            <Input
                              placeholder="john.smith@chase.com"
                              type="email"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label>Status</label>
                            <Input
                              placeholder="Active"
                              type="text"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button href='/' className="btn-fill" color="warning" type="submit">
                      Leave
                    </Button>
                    {' '}
                    
                  </CardFooter>
                </Card>
              </Col>
            </Row>
            </div>
        </>
      );
}

export default AgentDetail;