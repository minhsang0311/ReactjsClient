
import React from "react";
class Spinner extends React.Component {
    constructor(props) {
      super(props);
      this.defaultProps = { message: 'Loading...'};
    }
  
   
    render () {
      return (
      <div className="ui active dimmer">
        <div className="ui big text loader">{this.props.message}</div>
      </div>
    );
    }
  }
  export default Spinner;