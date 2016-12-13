import React from 'react'
import PageWrapper from './components/page-wrapper'
import {Row, Col,FormGroup,ControlLabel,HelpBlock,FormControl,Button, Form,Checkbox,Nav,NavItem,Panel} from 'react-bootstrap'
import {style} from 'glamor'
import PouchDB from 'pouchdb'
import {Link} from 'react-router'
const db = new PouchDB('slo-dev')
import {filter,pluck} from 'ramda'
import moment from 'moment'
var FontAwesome = require('react-fontawesome')
import DatePicker from 'react-datepicker'


const container = style({
  display: 'block',
  margin: "0 auto"
})

const sideBarStyle = style({
  borderRadius: '4px',
  textAlign: 'center',
  paddingBottom: '40px'
})

const mainSectionStyle = style({
  paddingLeft: 30,
  padding: '0 0 40px 0'
})


const ListEvents = React.createClass({
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
    this.props.getArtistEvents(data)
      .then(res => this.setState({
        results: pluck('doc',res.data)
      }))
      .catch(err => console.log(err.message))
  },
  handleSelect(type){
    const filterData = type => {
      return item => {
        return item.eventtype === type
      }
    }
    let results = filter(filterData(type),this.state.data)
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
    this.props.getArtistEvents(data)
      .then(res => this.setState({
        results: pluck('doc',res.data)
      }))
      .catch(err => console.log(err.message))
  },
  render(){
    const results = (item,i) => {
      let date = moment(item.date.split('T')[0]).format('MMM DD')
      let icon = item.eventtype=== 'press'
        ? <FontAwesome name='microphone' />
        : <FontAwesome name='ticket' />
      console.log('icon',icon)
      return (
        <Link key={i} to={`/manage/events/${item._id}/show`}>
          <Panel key={i}>
            <div className="panel-date">{icon} {date}</div>
            <div className="panel-event-name">{item.name}</div>
            <div className="panel-event-location">{item.city},{item.state}</div>
          </Panel>
         </Link>
      )
    }
    return(
      <div>
        <PageWrapper title="Events">
          <div>fix this?</div>
          <Row {...container} className="show-grid">
            <Col xs={12} md={2}>
              <h3 className="search-result-header">Filter</h3>
                <DatePicker
                  selected={this.state.startDate}
                  selectsStart  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleDateChange('startDate')} />
                  <p className="sidebar-to">to</p>
                <DatePicker
                  selected={this.state.endDate}
                  selectsEnd  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleDateChange('endDate')} />
                  <Button className="sidebar-btn" onClick={this.handleSearch}>Search</Button>
              <Nav {...style({marginTop:'50px'})} bsStyle="pills" stacked>
                <NavItem className="add-btn"><Link to="/manage/events/add">Add Event</Link></NavItem>
              </Nav>
            </Col>
            <Col xs={12} md={10}>
              <h3 className="search-result-header">Results</h3>
              {this.state.results.map(results)}
            </Col>
          </Row>
          {/* <pre>
            {JSON.stringify({endDate: this.state.endDate.format('YYYY DD MM '),startDate: this.state.startDate.format('YYYY DD MM ')},null,2)}
          </pre> */}
        </PageWrapper>
      </div>
    )
  }
})

export default ListEvents
