import React from 'react'
import LyftOverlay from './lyftOverlay'
import MessagingOverlay from './messagingOverlay'
import axios from 'axios'
import '../styles/event.css'

class Event extends React.Component {

  constructor(props){
    super(props);
    console.log("EVENT***", props);

    this.state = {
      priceLabel: this.props.is_free === true ? "FREE" : "$",
      logoURL: this.props.logo ? this.props.logo.url : "/logoFiller.png",
      showMessaging: false,
      showLyft: false,
      haveVenueInfo: false,
      venue: {longitude: "",latitude: ""}
    }
  }

  toggleMessaging(){
    this.setState({showMessaging: true})
  }

  toggleLyft(){
    this.setState({showLyft: true})
  }

  getVenueInfo(){
    this.toggleLyft()

    if(!this.state.haveVenueInfo){
      this.setState({haveVenueInfo: true})
      axios.get(`https://barhopping101-backend.herokuapp.com/api/eventbrite/venues/${this.props.venue_id}`)
        .then((response) => {
          this.setState({
            venue: {longitude: response.data.longitude, latitude: response.data.latitude}
          })
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render(){
    return(
      <div className='event'>
        <LyftOverlay showLyft={this.state.showLyft} venueCoordinates={this.state.venue} userLocation={this.props.userLocation}/>
        <MessagingOverlay showMessaging={this.state.showMessaging} eventURL={this.props.url}/>
        <img src={this.state.logoURL} alt='event-logo' className='eventLogo' />
        <span className="price">
          <img src='/lyft_event_button.png' alt='lyft' onClick={() => {this.getVenueInfo()}}/>
          <img src='/message.png' alt='message' onClick={() => {this.toggleMessaging()}}/>
          {this.state.priceLabel}
        </span>
        <div className='details'>
          <div className='time'>
            {new Date(this.props.start.local).toLocaleString()}
          </div>
          <div className='title'>
            {this.props.name.text}
          </div>
          <div className='moreInfo'>
            <a href={this.props.url} target="_blank">More Info</a>
          </div>
        </div>
      </div>
    )
  }
  }

export default Event;
