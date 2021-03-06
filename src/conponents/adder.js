import React, { Component } from 'react';

class Adder extends Component {

    constructor(props) {
        super(props)

        this.select = false
        
        this.increment = this.increment.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    increment(size) {
        const value = (this.props.value || this.props.default) + size

        if (value < 100 && value > 0) {
            this.props.onChange(value)
        }
    }

    handleChange(event) {

        const value = Number.parseInt(event.target.value);

        if (Number.isInteger(value) && value < 100 && value > this.props.default - 1) {
            this.props.onChange(value)
        } else if (Number.isInteger(value) && value < this.props.default && value > 0) {
            if (this.props.value > 9) {
                this.props.onChange(null)
            } else {
                this.select = true
                this.props.onChange(value * 10)
            }
        } else if (Number.isNaN(value)) {
            this.props.onChange(null)
        }
    }

    componentDidUpdate(props) {
        if (this.select) {
            this.select = false
            this.refs.textBox.setSelectionRange(1, 2)
        }
    }

    render() {
        return (
            <div style={{ display: "inline-flex", alignItems: "center" }} >
                <div style={{
                    backgroundColor: `${this.props.value === 1 || !this.props.value ? "rgb(181, 183, 184)" : "#33C3F0"}`, borderRadius: "50%",
                    border: "1px solid", height: "20px", width: "20px", display: "inline-block",
                    marginRight: "5px", cursor: "pointer", color: "#FFFFFF"
                }} onClick={() => { this.increment(-1) }}>
                    <div className="center-wrapper" style={{ height: "20px", width: "20px", fontSize: "20px", }}>-</div>
                </div>

                <div style={{
                    backgroundColor: "#FFFFFF", borderColor: "#FFFFFF", borderRadius: "4px",
                    border: "1px solid", height: "20px", width: "40px", display: "inline-block"
                }}>
                    <input className="center-wrapper" onChange={this.handleChange} 
                    placeholder={this.props.default} type="text" 
                    value={this.props.value != null ? this.props.value : ""}
                    ref="textBox" 
                    style={{ height: "20px", width: "40px", textAlign: "center" }} />
                </div>

                <div style={{
                    backgroundColor: `${this.props.value === 99 ? "rgb(181, 183, 184)" : "#33C3F0"}`, borderRadius: "50%",
                    border: "1px solid", height: "20px", width: "20px", display: "inline-block",
                    marginLeft: "5px", cursor: "pointer", color: "#FFFFFF"
                }} onClick={() => { this.increment(1) }}>
                    <div className="center-wrapper" style={{ height: "20px", width: "20px", fontSize: "20px", }}>+</div>
                </div>

            </div>
        );
    }
}

export default Adder;