import React, { Component } from 'react';
import jump from 'jump.js';

class SmallDose extends Component{
    constructor() {
        super();
        this.state= {
            timeChoice: '',
            doseChoice: '',
        }

        console.log('check the props thing', this.prop)
    };
    
    weHaveATime = (e) => {
        e.preventDefault();
        // seeing the values of the choices that the user selects
        console.log('what will we see when we select?', e.target.value)

        // this.props.getTimeState(e.target.value)
        this.setState({
            timeChoice: e.target.value
        })
    };

    weHaveADose = (e) => {
        e.preventDefault();
        // seeing the values of the choices that the user selects
        console.log('what will we see when we select?', e.target.value)

        // this.props.getDoseState(e.target.value)
        this.setState({
            doseChoice: e.target.value
        })
    };

    // console.log('we have a dose thing', weHaveADose)

    submitClicked = (e) => {
        this.props.getTimeState(this.state.timeChoice)
        this.props.getDoseState(this.state.doseChoice)
        this.props.getStoryProp(e, this.state.timeChoice)
        if (this.state.timeChoice === "" || this.state.doseChoice === "") {
            alert('you have to select!')

        }
        // jump('.story')
        // this.resetButton() 
    }

    // resetButton = () => {
    //     this.setState({
    //         timeValue: '',
    //         doseValue:''
    //     })  
    // }

    
    render() {

        return (
            <div>
    <form action="">
        <label htmlFor="timeOfDay">What's the time of day?</label>
        <select name="dayOrNight" id="timeOfDay" onChange={this.weHaveATime}>
            <option value="">Select Time</option>
            <option value="day">Daytime</option>
            <option value="night">Nighttime</option>
        </select>
                    
        <label htmlFor="amountTaken">How many drops of the tincture will you have?</label>
        <select name="takenSelection" id="amountTaken" onChange={this.weHaveADose}>
            <option value="">Select Amount</option>
            <option value="small">Just a little, I know my limits</option>
            <option value="medium">An appropriate amount</option>
            <option value="large">I may have overdone it</option>
        </select>
    </form>
                <button type='submit' onClick={this.submitClicked
                }>Go to The Park</button>
            </div>
        )
    }
}

export default SmallDose