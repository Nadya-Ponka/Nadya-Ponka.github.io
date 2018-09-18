import React from 'react';
import classnames from 'classnames';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        if (!this.props.flipped) {
            this.props.checkMatch(this.props.value, this.props.id);
        }
    }

    render() {
        const classes = classnames(
            'flex-element',
            { 'Card--flipped': this.props.flipped },
            { 'Card--matched': this.props.matched },
        );

        return (
            <div className={classes} id={this.props.id} value={this.props.value} onClick={this.handleClick}>
                <div className={this.props.rotate} >
                    <div className="front" >
                        <img src={this.props.src} alt="" />
                    </div>
                    <div className="back">
                        <img src={this.props.back} alt="" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
