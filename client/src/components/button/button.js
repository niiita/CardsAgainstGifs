import React from "react"

class Button extends React.Component {
  handleClick = () => {
    //add redirect page
  }

  render() {
      return (
          <div>
        {console.log(this.props)}
      <button onClick={this.handleClick} style={{backgroundColor:this.props.color}}>
        {this.props.title}
      </button>
      </div>
    )
  }
} 

export default Button;