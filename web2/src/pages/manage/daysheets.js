import React from 'react'
import PageWrapper from './components/page-wrapper'
import {Row, Col,FormGroup,ControlLabel,HelpBlock,FormControl,Button, Form,Checkbox,Nav,NavItem,Panel} from 'react-bootstrap'
import {style} from 'glamor'
import PouchDB from 'pouchdb'
import {Link} from 'react-router'
const db = new PouchDB('slo-dev')
import {filter, pluck} from 'ramda'
import moment from 'moment'
import DatePicker from 'react-datepicker'


const container = style({
  display: 'block',
  margin: "0 auto"
})

const sideBarHeaderStyle = style({
  textAlign: 'center',
  fontFamily: 'AvenirNext-Regular, sans-serif',
  fontSize: 18
})

const resultsHeaderStyle = style({
  fontFamily: 'AvenirNext-Regular, sans-serif',
  fontSize: 18
})

const sideBarStyle = style({
  // borderRight: '1px solid rgb(221, 221, 221)',
  borderRadius: '0px',
  textAlign: 'center',
  paddingBottom: '40px'
})

const DaySheets = React.createClass({
  getInitialState(){
    return({
      filter: '',
      filterkey: 0,
      data: [],
      results: [],
      endDate: moment().add(1, 'months'),
      startDate: moment(),
      band: "band_Stop_Light_Observations"

    })
  },
  componentDidMount(){
    let data = {
      artistId: this.state.band,
      startdate: this.state.startDate.format(),
      enddate: this.state.endDate.format()
    }
    this.props.getArtistDaySheets(data)
      .then(res => this.setState({
        results: pluck('doc',res.data)
      }))
      .catch(err => console.log(err.message))
  },
  handleSelect(type){
    let results = this.state.data
    this.setState({
      filter: type,
      results
     })
  },
  handleDateChange(path){
    return date => {
      let currentState = this.state
      currentState[path] = date
      this.setState(currentState)
    }
  },
  handleSearch(){
    let data = {
      artistId: this.state.band,
      startdate: this.state.startDate.format(),
      enddate: this.state.endDate.format()
    }
    this.props.getArtistDaySheets(data)
      .then(res => this.setState({
        results: pluck('doc',res.data)
      }))
      .catch(err => console.log(err.message))
  },
  render(){
    const results = (item,i) => {
      let date = item.date.split('T')[0]
      return <Link to={`/manage/daysheets/${item._id}/show`}><Panel key={i}>{date} {item.city},{item.state}</Panel></Link>
    }
    return(
      <div>
        <PageWrapper title="Browse Daysheets">
          <div>fix this?</div>
          <Row className="show-grid">
            <Col {...sideBarStyle} xs={12} md={4}>
              <h3 {...style({textAlign: 'center'})}>Filter</h3>
              <Nav bsStyle="pills" stacked activeKey={this.state.filter} onSelect={this.handleSelect}>
                {/* <NavItem eventKey={'all'}>All</NavItem> */}
                {/* <NavItem eventKey={'press'} title="Item">Press</NavItem> */}
                {/* <NavItem eventKey={'other'}>Other</NavItem> */}
              </Nav>
              <DatePicker
                selected={this.state.startDate}
                selectsStart  startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleDateChange('startDate')} />
              <DatePicker
                selected={this.state.endDate}
                selectsEnd  startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleDateChange('endDate')} />
                <Button {...style({display: 'block'})} onClick={this.handleSearch}>Search</Button>
              <Nav {...style({marginTop:'50px'})} bsStyle="pills" stacked>
                <NavItem><Link to="/manage/daysheets/add">Add DaySheet</Link></NavItem>
              </Nav>
            </Col>
            <Col xs={12} md={8}>
              <h3 className="search-result-header">Results</h3>
              {this.state.results.map(results)}
            </Col>
          </Row>
          {/* <pre>
            {JSON.stringify(this.state,null,2)}
          </pre> */}
        </PageWrapper>
      </div>
    )
  }
})

export default DaySheets
