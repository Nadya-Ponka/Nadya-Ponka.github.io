import React, { Fragment } from 'react';

class Input extends React.Component {
    
  render(props) {
    return (
      <Fragment>
        <label htmlFor={this.props.for}>{this.props.labelText}</label>        
        <input placeholder={this.props.placeholder} checked={this.props.checked} type={this.props.type} value={this.props.value} onChange={this.props.onChange} id={this.props.id} maxLength={this.props.maxLength}/>
      </Fragment>
    );
  }
}

export default Input;
