import React from 'react'
import {Button,FormControl,FieldGroup,FormGroup,Form,Table} from 'react-bootstrap'



const FanSearchBar = ({handleSubmit,handleChange,q}) => (
  <Form inline onSubmit={handleSubmit}>
    <label>Search By</label>
    <FormControl className="pullRight" componentClass="select" placeholder="select" onChange={handleChange('searchtype')}>
     <option value="email">Email</option>
     <option value="state">State</option>
     <option value="city">City</option>
     <option value="l_name">Last Name</option>
   </FormControl>
    <FormGroup>
      <label>Search</label>
      <FormControl
        type="text"
        label="Search"
        placeholder="Search"
        value={q}
        onChange={handleChange('q')} />
    </FormGroup>
    <Button type="submit">Search</Button>
  </Form>
)


export default FanSearchBar
