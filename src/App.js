import React, { Component } from 'react';
import firebase from './firebase'
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      story: [],
      nightPhrase: '',
      dayPhrase: '',
      latinPhrase: '',
      latinPhrase2: 'this is a placeholder in english',
      
    }
  }

  // Connecting application to firebase database where I have objects stored that hold information that adds to the story
  componentDidMount() {
    const dbRef = firebase.database().ref();
    // console.log(dbRef)
    dbRef.on('value', (snapshot) => {
      // make a variable that would refer to our firebase data
      const storyData = snapshot.val()
      console.log('this is seeing the high data', storyData)

      const strings = Object.values(storyData)
      console.log('this is the story data',strings)
      // view the data we have in firebase on our console.log 
      const dayArray = strings[0];
      const dayArrayCopy = [...dayArray];

      const latinArray = strings[1];
      const latinArrayCopy = [...latinArray];

      const nightArray = strings[2];
      const nightArrayCopy = [...nightArray];
      // making a copy of the day array 
      
      
      
      
// create a function that randomizes multiple times over the selected phrases in the array and splices out whatever was already used during render

      const randomDaySentence1 = dayArrayCopy.splice((Math.floor(Math.random(dayArrayCopy) * dayArrayCopy.length)), 1);

      console.log('day array after splice', dayArrayCopy)
      
      const randomDaySentence2 = dayArrayCopy.splice((Math.floor(Math.random(dayArrayCopy) * dayArrayCopy.length)), 1);

      console.log('random sentencessssss',randomDaySentence1,randomDaySentence2)

      // console.log('here is the random day index thingyy', randomDaySentence1, randomDayIndex);
      
      // for (i = dayArrayCopy * length; i >= 0; i--) {
      //   console.log(item)
      // }

      const randomDayString = dayArrayCopy[randomDaySentence1]
      console.log('this is the random day sentence', randomDayString)

      const randomNightIndex = (Math.floor(Math.random(nightArrayCopy) * nightArrayCopy.length))
      const randomNightString = nightArrayCopy[randomNightIndex]
      console.log('this is a random night sentence', randomNightString)

      const randomLatinIndex = (Math.floor(Math.random(latinArrayCopy) * latinArrayCopy.length))
      const randomLatinString = latinArrayCopy[randomLatinIndex]
      console.log('this is the random latin string', randomLatinString)


      console.log('another instance of a latin sentence', randomLatinString)
      

      
      



      this.setState({
        data: storyData,
        nightPhrase: randomNightString,
        dayPhrase: randomDayString,
        latinPhrase: randomLatinString
      })

    })

    
  }
  render() {
    return(
      
      <div className="App">
        {/* Enlightenment story is told here, where information retrived from my firebase database will append */}
        
        <h1>~Trippy Tincture~</h1>
        <h3> 
          Your friend, a holistic nutritionist, made you an herbal tincture meant to help reduce your stress levels. You decide to enjoy the clear weather by heading to your favourite park right after having a some drops of the tincture.
      </h3>
        <p>
          {
            this.state.nightPhrase
          }
        </p>
        
        {/* Questions. When answered, they will add on to the story */}
        
        <label htmlFor="timeOfDay">What's the time of day?</label>
        <select name="dayOrNight" id="timeOfDay">
          <option value="day">Daytime</option>
          <option value="night">Nighttime</option>
        </select>

        <label htmlFor="amountTaken">How many drops of the tincture did you have?</label>
        <select name="takenSelection" id="amountTaken">
          <option value="small">Just a little, I know my limits</option>
          <option value="medium">An appropriate amount</option>
          <option value="large">I may have overdone it</option>
        </select>
        
        {/* Will import a component here that is used to randomize all the information into a storyline. This component will be the story to be appended to the page.  */}
        

      </div>
    );
  }
}

export default App;
