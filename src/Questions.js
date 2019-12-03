import React, { Component } from "react";
import jump from "jump.js";

class SmallDose extends Component{
    constructor() {
        super();
        this.state = {
            timeChoice: "Select Time",
            doseChoice: "Select Amount",
        };
    };

    weHaveASelection = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    submitClicked = (e) => {
        jump('.App', {
            duration: 1000,
            offset: 0,
            callback: undefined,
            a11y: false
        })
        this.props.getTimeState(this.state.timeChoice);
        this.props.getDoseState(this.state.doseChoice);
        this.props.getStoryProp(e, this.state.timeChoice);
        if (this.state.timeChoice === "" || this.state.doseChoice === "") {
            alert("You need to answer both questions to proceed!");
        }
        this.resetButton();
    }

    resetButton = () => {
        this.setState({
            timeChoice: "",
            doseChoice:""
        })  
    }

    
    render() {

        return (
            <div>
                <form className="target" action="">
                    <label htmlFor="timeOfDay">What's the time of day?</label>
                    <select name="timeChoice" id="timeOfDay" tabindex="0" onChange={this.weHaveASelection} value={this.state.timeChoice}>
                        <option value="" tabindex="0">Select Time</option>
                        <option value="day" tabindex="0">Daytime</option>
                        <option value="night" tabindex="0">Nighttime</option>
                    </select>
                    
                    <label htmlFor="amountTaken">How many drops of the tincture will you have?</label>
                    <select name="doseChoice" id="amountTaken" tabindex="0" onChange={this.weHaveASelection} value={this.state.doseChoice}>
                        <option value="" tabindex="0">Select Amount</option>
                        <option value="small" tabindex="0">Just a little, I know my limits</option>
                        <option value="medium" tabindex="0">An appropriate amount</option>
                        <option value="large" tabindex="0">I may have overdone it</option>
                    </select>
                </form>
                <button type="submit" tabindex="0" onClick={this.submitClicked
                }>Go to The Park</button>
            </div>
        );
    };
};

export default SmallDose