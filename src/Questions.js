import React, { Component } from 'react'

class SmallDose extends Component{
    constructor() {
        super();
        this.state= {
            timeChoice: '',
            doseChoice: '',
        }

        console.log('check the props thing', this.prop)
    }
    
    weHaveATarget = (e) => {
        e.preventDefault();
        // seeing the values of the choices that the user selects
        console.log('what will we see when we select?', e.target.value)

        this.setState({
            userChoice: e.target.value
        })
        this.props.getChildState(e.target.value)

    }
    render() {

        return (
            <div>
    <form action="">
        <label htmlFor="timeOfDay">What's the time of day?</label>
        <select name="dayOrNight" id="timeOfDay" onChange={this.weHaveATarget}>
            <option value="">Select time</option>
            <option value="day">Daytime</option>
            <option value="night">Nighttime</option>
        </select>
                    
        <label htmlFor="amountTaken">How many drops of the tincture did you have?</label>
        <select name="takenSelection" id="amountTaken" onChange={this.weHaveATarget}>
            <option value="">Select Amount</option>
            <option value="small">Just a little, I know my limits</option>
            <option value="medium">An appropriate amount</option>
            <option value="large">I may have overdone it</option>
        </select>
    </form>
                <button type='submit' onClick={(e) => {
                    this.props.getStoryProp(e, this.state.timeChoice)
                    console.log('submit is being clicked')
                }}>Find the fucks</button>
            </div>
        )
    }
}

export default SmallDose