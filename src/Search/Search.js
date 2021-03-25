import React, { useReducer, useState } from "react";
import { Table, Button, Navbar, Container, 
  Nav, Form, FormGroup, Input, Card, 
  CardHeader, Row, Col, CardBody } from 'reactstrap';

// State object logic
const formReducer = (state, event) => {
  if(event.reset) {
    return {
      searchBy: '',
      searchFor: '',
      searchField: '',
    }
  }
  return {
    ...state,
    [event.name]: event.value
  }
}
  
function Search(){
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

    return(
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Admin Search Section (Under Development)</h5>
                  <Navbar expand="lg">
                    <Container>
                      <Nav className="justify-content-left">
                        <label>
                          <h5 className="title">Search by:</h5>
                        </label>
                        <Col className="ml-auto">
                          <Input type="select" name="searchBy"
                            onChange={handleChange}
                            value={formData.searchBy || ''}>
                              <option></option>
                              <option>Name</option>
                              <option>ID</option>
                          </Input>
                        </Col>
                        <label>
                          <h5 className="title">Search for:</h5>
                        </label>
                        <Col className="ml-auto">
                          <Input type="select" name="searchFor"
                            onChange={handleChange}
                            value={formData.searchFor || ''}>
                              <option></option>
                              <option>Company</option>
                              <option>Agent</option>
                          </Input>
                        </Col>
                        <Col>
                          <Form inline className="ml-auto" size="lg">
                            <FormGroup className="no-border">
                              <Input type="text" placeholder="Search"/>
                            </FormGroup>
                          </Form>
                        </Col>
                        <Col>
                          <Button color="warning" type="submit">Submit</Button>
                        </Col>
                      </Nav>
                    </Container>
                  </Navbar>
                </CardHeader>
              </Card>
            </Col>
          </Row>
        <CardBody>
          <h3>Relocation Agent Results</h3>
          <Table bordered>
            <thead>
              <tr>
                <th className="text-center">ID</th>
                <th className="text-center">First Name</th>
                <th className="text-center">Last Name</th>
                <th className="text-center">Company</th>
                <th className="text-center">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                  <td className="text-center">1</td>
                  <td className="text-center">Andrew</td>
                  <td className="text-center">Mike</td>
                  <td className="text-center">Quicken Loans</td>
                  <td className="text-center">andrew.mike@quickenloans.com</td>
              </tr>
              <tr>
                  <td className="text-center">2</td>
                  <td className="text-center">Manuel</td>
                  <td className="text-center">Rico</td>
                  <td className="text-center">Chase</td>
                  <td className="text-center">manuel.rico@chase.com</td>
              </tr>
              <tr>
                  <td className="text-center">3</td>
                  <td className="text-center">Jane</td>
                  <td className="text-center">Smith</td>
                  <td className="text-center">MSUFCU</td>
                  <td className="text-center">jane.smith@msufcu.com</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
        <CardBody>
          <h3>Mortgage Company Results</h3>
          <Table bordered>
            <thead>
              <tr>
                <th className="text-center">Name</th>
                <th className="text-center">Email</th>
                <th className="text-center">Method</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                  <td className="text-center">PNC</td>
                  <td className="text-center">mortgages@pnc.com</td>
                  <td className="text-center">API</td>
              </tr>
              <tr>
                  <td className="text-center">JPMorgan</td>
                  <td className="text-center">mortgagerequest@jpmorgan.com</td>
                  <td className="text-center">Email</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </div>
        
    );
}

export default Search;