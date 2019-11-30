import React, { Component } from 'react';
import firebase from './firebase'
import Questions from './Questions'
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      story: [],
      dayPhrase1: '',
      dayPhrase2: '',
      nightPhrase1: '',
      nightPhrase2: '',
      latinPhrase1: '',
      latinPhrase2: 'this is a placeholder in english',
      latinPhrase3: 'another placeholder',
      latinPhrase4: 'another another',
      latinPhrase5: 'wow the 5th latin phrase but english'
      
    }
  }

  // Connecting application to firebase database where I have objects stored that hold information that adds to the story
  componentDidMount() {
    const dbRef = firebase.database().ref();
    // console.log(dbRef)
    dbRef.on('value', (snapshot) => {
      // make a variable that would refer to our firebase data
      const storyData = snapshot.val()

      const strings = Object.values(storyData)
      // console.log('this is the story data',strings)
      // view the data we have in firebase on our console.log 
      const dayArray = strings[0];
      const dayArrayCopy = [...dayArray];

      const latinArray = strings[1];
      const latinArrayCopy = [...latinArray];

      const nightArray = strings[2];
      const nightArrayCopy = [...nightArray];
      // making a copy of the day array 
      
// create a function that randomizes multiple times over the selected phrases in the array and splices out whatever was already used during render

      // random day sentences 
      const randomDaySentence1 = dayArrayCopy.splice((Math.floor(Math.random(dayArrayCopy) * dayArrayCopy.length)), 1);
      const randomDaySentence2 = dayArrayCopy.splice((Math.floor(Math.random(dayArrayCopy) * dayArrayCopy.length)), 1);
      console.log('random day sentences',randomDaySentence1,randomDaySentence2)

      // random night sentences
      const randomNightSentence1 = nightArrayCopy.splice((Math.floor(Math.random(nightArrayCopy) * nightArrayCopy.length)), 1)
      const randomNightSentence2 = nightArrayCopy.splice((Math.floor(Math.random(nightArrayCopy) * nightArrayCopy.length)), 1)
      console.log('random night sentences', randomNightSentence1, randomNightSentence2);
      // console.log('here is the random day index thingyy', randomDaySentence1, randomDayIndex);


      // random latin sentences
      const randomLatinSentence1 = latinArrayCopy.splice((Math.floor(Math.random(latinArrayCopy) * latinArrayCopy.length)), 1)
      const randomLatinSentence2 = latinArrayCopy.splice((Math.floor(Math.random(latinArrayCopy) * latinArrayCopy.length)), 1)
      const randomLatinSentence3 = latinArrayCopy.splice((Math.floor(Math.random(latinArrayCopy) * latinArrayCopy.length)), 1)
      const randomLatinSentence4 = latinArrayCopy.splice((Math.floor(Math.random(latinArrayCopy) * latinArrayCopy.length)), 1)
      const randomLatinSentence5 = latinArrayCopy.splice((Math.floor(Math.random(latinArrayCopy) * latinArrayCopy.length)), 1)

      console.log('THESE ARE ALL THE RANDOM LATIN SENTENCES', randomLatinSentence1, randomLatinSentence2, randomLatinSentence3, randomLatinSentence4, randomLatinSentence5)

      
      this.setState({
        data: storyData,
        dayPhrase1: randomDaySentence1,
        dayPhrase2: randomDaySentence2,
        nightPhrase1: randomNightSentence1,
        latinPhrase1: randomLatinSentence1,
        nightPhrase2: randomNightSentence2,
        latinPhrase3: 'another placeholder',
        latinPhrase4: 'another another',
        latinPhrase5: 'wow the 5th latin phrase but english'
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
        <p className="para">
          {this.state.nightPhrase1} || {this.state.latinPhrase1}
        </p>
        
        <Questions getStoryProp={(e, choice) => {
          e.preventDefault();
          console.log(choice)
        }}/>        

      </div>
    );
  }
}

export default App;
