import React from "react";

import {
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    CardFooter,
    Button,
  } from "reactstrap";

function AdminCompanyDetail(){
    return(
        <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader tag='h2'>
                  Company Detail for Admin (Under Development)
                </CardHeader>
                <CardBody>
                  <Form>
  
                    
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label>Company</label>
                          <Input
                            placeholder="Quicken Loans"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label>Email Address</label>
                          <Input
                            placeholder="relocation@quickenloans.com"
                            type="email"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    <Col md="6">
                        <FormGroup>
                          <label>Request Method</label>
                          <Input
                            placeholder="Email"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                
              </Card>
            </Col>
          </Row>
        <Row>
            <CardBody>
                <CardFooter>
                <Button href='/' className="btn-fill" color="warning" type="submit">
                    Leave
                </Button> {" "}
                <Button href='/' className="btn-fill" color="warning" type="submit">
                    Remove Company
                </Button>
                </CardFooter>
            </CardBody>
        </Row>
        </div>
      </>
    );
}

export default AdminCompanyDetail;