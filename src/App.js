import React, { Component } from "react";
import firebase from "./firebase"
import axios from "axios"
import Questions from "./Questions"
import "./App.css";


class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      story: [],
      dayPhrase1: "",
      dayPhrase2: "",
      nightPhrase1: "",
      nightPhrase2: "",
      latinPhrase1: "",
      latinPhrase2: "this is a placeholder in english",
      latinPhrase3: "another placeholder",
      latinPhrase4: "another another",
      latinPhrase5: "wow the 5th latin phrase but english",
      pokeId: ''
      
    }
  }

  // Connecting application to firebase database where I have objects stored that hold information that adds to the story
  componentDidMount() {

    const randomPokemon = Math.floor(Math.random() * 484) + 1

    console.log("this is the random pokemon number", randomPokemon)
    axios({
      url: "https://pokeapi.co/api/v2/pokemon/" + randomPokemon,
      method: "GET",
      dataResponse: "json",
    }).then((result) => {
      console.log("the api result", result)
      console.log("this is the pokemon name", result.data.name)
      const pokeName = (result.data.name).charAt(0).toUpperCase() + (result.data.name).substr(1);
      console.log("the capped name", pokeName)

      const moveNumber = (Math.floor(Math.random(result.data.moves) * result.data.moves.length));
      const moveName = (result.data.moves[moveNumber].move.name).charAt(0).toUpperCase() + (result.data.moves[moveNumber].move.name).substr(1);
      console.log("this is the move name", moveName);
    })


    


    const dbRef = firebase.database().ref();
    
    dbRef.on("value", (snapshot) => {
      // make a variable that would refer to our firebase data
      const storyData = snapshot.val()

      const strings = Object.values(storyData)
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
      const randomDaySentence3 = dayArrayCopy.splice((Math.floor(Math.random(dayArrayCopy) * dayArrayCopy.length)), 1);
      console.log("random day sentences",randomDaySentence1,randomDaySentence2)

      // random night sentences
      const randomNightSentence1 = nightArrayCopy.splice((Math.floor(Math.random(nightArrayCopy) * nightArrayCopy.length)), 1)
      const randomNightSentence2 = nightArrayCopy.splice((Math.floor(Math.random(nightArrayCopy) * nightArrayCopy.length)), 1)
      console.log("random night sentences", randomNightSentence1, randomNightSentence2);
      // console.log("here is the random day index thingyy", randomDaySentence1, randomDayIndex);


      // random latin sentences
      const randomLatinSentence1 = latinArrayCopy.splice((Math.floor(Math.random(latinArrayCopy) * latinArrayCopy.length)), 1)
      const randomLatinSentence2 = latinArrayCopy.splice((Math.floor(Math.random(latinArrayCopy) * latinArrayCopy.length)), 1)
      const randomLatinSentence3 = latinArrayCopy.splice((Math.floor(Math.random(latinArrayCopy) * latinArrayCopy.length)), 1)
      const randomLatinSentence4 = latinArrayCopy.splice((Math.floor(Math.random(latinArrayCopy) * latinArrayCopy.length)), 1)
      const randomLatinSentence5 = latinArrayCopy.splice((Math.floor(Math.random(latinArrayCopy) * latinArrayCopy.length)), 1)

      console.log("THESE ARE ALL THE RANDOM LATIN SENTENCES", randomLatinSentence1, randomLatinSentence2, randomLatinSentence3, randomLatinSentence4, randomLatinSentence5)

      
      this.setState({
        data: storyData,
        dayPhrase1: randomDaySentence1,
        dayPhrase2: randomDaySentence2,
        dayPhrase3: randomDaySentence3,
        nightPhrase1: randomNightSentence1,
        nightPhrase2: randomNightSentence2,
        latinPhrase1: randomLatinSentence1,
        latinPhrase2: "You're not sure because it's a deprecated language that isn't supported by Internet Explorer",
        latinPhrase3: "Embraced by ancient rhythms of the world, history pushes its way into the present",
        latinPhrase4: "All the possibilities lay spread out before you are both ever-changing and ever-the-same",
        pokeId: randomPokemon
      })
    })
    
  }

  getStory = (e, choice) => {
    e.preventDefault();
    console.log("from app.js, this is being clicked", choice)
    
  }

  render() {

    return(
      
      <div className="App wrapper">
        {/* Enlightenment story is told here, where information retrived from my firebase database will append */}
        
        <h1>~Trippy Tincture~</h1>
        <header>
          <h3>  
          Your friend, a holistic nutritionist, made you an herbal tincture meant to help reduce your stress levels. You decide to enjoy the clear weather by heading to your favourite park right after having a some drops of the tincture.
      </h3>
        <p className="para">
          {this.state.nightPhrase1} || {this.state.latinPhrase1}
        </p>
        
        <Questions getStoryProp={this.getStory} /> 
        </header>
        

        <div className="pokeImage">
          IMAGE TO BE PLACED HEERE
          
        </div>
        <img src={require("./assets/pokemon/"+{this.state.pokeId}+".svg")} alt="" />

        <section className="story">
          <div className="dayDiv">
            <p className="dayStory">This is the daytime story. After taking some drops of tincture, heading to the park sounded like the perfect plan. You leave the dooming comfort of your home and take a long walk to your favourite park where <span className="daySpan">{this.state.dayPhrase3}</span>. You relax on an empty bench in the middle of an empty park, tempted to test out the effects of the ticture. You thought it would be a good idea to enjoy it on a bright, sunny day where <span className="daySpan">{this.state.dayPhrase1}</span>. You close your eyes and feel the warmth of the sun gently looming over your face. You feel a heavy drowzines and notice that you feel more with your eyes closed while  <span className="daySpan">{this.state.dayPhrase2}</span>. You drift off into sleep. You hear a voice in the distance, <span className="latinSpan">"{this.state.latinPhrase1}"</span>. Was that latin? <span className="latinSpan">{this.state.latinPhrase2}</span>. You feel an alleviated sense of calmness washing over you as hear the voice in the distance getting closer to you echoing the harmony of the spheres floating up in outer space. "Each road taken holds challenges untold, which road you choose is how life unfolds. <span className="latinSpan">{this.state.latinPhrase3}</span>" echoed the voice in the vastless void of subconsciousness. Your senses have been heightened tenfold and you begin to see linear colour gradients zooming past your sides, eventuall displaying an ominous sphere of light directly infront of you. Before you know it, you extend your hand to reach for the floating orb and suddently make a profound realization that you are as limitless as chaos and nothingness. This epiphany brings about the release of all your axiety and worries that have plagued you all these months. "<span className="latinSpan">{this.state.latinPhrase4}</span>" was the last thing you heard from the orb before opening your eyes, with it, a wave of good fortune bids you adieu. You open up your eyes to <span className="nightSpan">{this.state.nightPhrase1}</span>.</p>
          </div>

          <div className="nightDiv">
            <p className="nightStory">This is the night story. After taking some drops of tincture, heading to the park sounded like the perfect plan. You leave the dooming comfort of your home and take a long walk to your favourite park where <span className="daySpan">{this.state.dayPhrase3}</span>. You relax on an empty bench in the middle of an empty park, tempted to test out the effects of the ticture. You thought it would be a good idea to enjoy it on a bright, sunny day where <span className="daySpan">{this.state.dayPhrase1}</span>. You close your eyes and feel the warmth of the sun gently looming over your face. You feel a heavy drowzines and notice that you feel more with your eyes closed while  <span className="daySpan">{this.state.dayPhrase2}</span>. You drift off into sleep. You hear a voice in the distance, <span className="latinSpan">"{this.state.latinPhrase1}"</span>. Was that latin? <span className="latinSpan">{this.state.latinPhrase2}</span>. You feel an alleviated sense of calmness washing over you as hear the voice in the distance getting closer to you echoing the harmony of the spheres floating up in outer space. "Each road taken holds challenges untold, which road you choose is how life unfolds. <span className="latinSpan">{this.state.latinPhrase3}</span>" echoed the voice in the vastless void of subconsciousness. Your senses have been heightened tenfold and you begin to see linear colour gradients zooming past your sides, eventuall displaying an ominous sphere of light directly infront of you. Before you know it, you extend your hand to reach for the floating orb and suddently make a profound realization that you are as limitless as chaos and nothingness. This epiphany brings about the release of all your axiety and worries that have plagued you all these months. "<span className="latinSpan">{this.state.latinPhrase4}</span>" was the last thing you heard from the orb before opening your eyes, with it, a wave of good fortune bids you adieu. You open up your eyes to <span className="nightSpan">{this.state.nightPhrase1}</span>.</p>
          </div>

      </section>

        

        

      </div>
    
    );
    
  }
}

export default App;
