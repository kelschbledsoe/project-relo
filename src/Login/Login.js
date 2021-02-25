import React from "react";

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

function Login(){
    return(
<div className="content" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader tag='h3'>
                Login (Under Development)
              </CardHeader>
              <CardBody>
                <Form>

                  <Row>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Email</label>
                        <Input
                          placeholder="Email"
                          type="text"
                          required
                        />
                      </FormGroup>
                    </Col>
                    
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Password</label>
                        <Input
                          placeholder="Password"
                          type="password"
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <CardFooter>
                    <Button className="btn-fill" color="warning" type="submit">
                    Login
                    </Button>{' '}
                    <Button className="btn-fill" color="warning" type="submit">
                      Forgot Password
                    </Button>
                  </CardFooter>
                  </Form>
              </CardBody>
            </Card>
        </Col>
        </Row>
    </div>
    )
}

export default Login;