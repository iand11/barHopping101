import React from 'react'
import MessagingOverlay from './messagingOverlay'
import '../styles/event.css'

class Event extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      priceLabel: this.props.is_free === true ? "FREE" : "$",
      logoURL: this.props.logo ? this.props.logo.url : "/logoFiller.png",
      showMessaging: false
    }
  }

  render(){
    return(
      <div className='event'>
        <MessagingOverlay showMessaging={this.state.showMessaging}/>
        <img src={this.state.logoURL} alt='event-logo' className='eventLogo' />
        <span className="price">
          <img src='/lyft.png' alt='lyft' />
          <img src='/message.png' alt='message' onClick={() => {this.setState({showMessaging: true})}}/>
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
