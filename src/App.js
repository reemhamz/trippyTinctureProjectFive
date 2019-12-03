import React, { Component } from "react";
import firebase from "./firebase";
import axios from "axios";
import PokemonImages from './PokemonImages';
import Questions from "./Questions";
import "./App.css";
import "./styles/styles.css";
import pokemonImageArray from "./PokemonImages";
import jump from 'jump.js';

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
      pokeTitle: '',
      pokeId: '',
      pokeAttack: '',
      timeValue: '',
      doseValue: '',
      latinPhrases:[]
    }
  }
  // Connecting application to firebase database where I have objects stored that hold information that adds to the story
  componentDidMount() {
    const randomPokemon = Math.floor(Math.random() * 484) + 1;
    
    // Calling the Pokemon API
    axios({
      url: "https://pokeapi.co/api/v2/pokemon/" + randomPokemon,
      method: "GET",
      dataResponse: "json",
    }).then((result) => {
      const pokeName = (result.data.name).charAt(0).toUpperCase() + (result.data.name).substr(1);
      const moveNumber = (Math.floor(Math.random(result.data.moves) * result.data.moves.length));
      const moveName = (result.data.moves[moveNumber].move.name).charAt(0).toUpperCase() + (result.data.moves[moveNumber].move.name).substr(1);
      
      this.setState({
        pokeTitle: pokeName,
        pokeAttack: moveName
      })
    })
    
    // Connecting to Firebase
    const dbRef = firebase.database().ref();
    
    dbRef.on("value", (snapshot) => {
      const storyData = snapshot.val()

      const strings = Object.values(storyData)
      const dayArray = strings[0];
      const dayArrayCopy = [...dayArray];

      const latinArray = strings[1];
      const latinArrayCopy = [...latinArray];
      this.setState({
        latinPhrases: latinArrayCopy
      })

      const nightArray = strings[2];
      const nightArrayCopy = [...nightArray];

      // random day sentences 
      const randomDaySentence1 = dayArrayCopy.splice((Math.floor(Math.random(dayArrayCopy) * dayArrayCopy.length)), 1);
      const randomDaySentence2 = dayArrayCopy.splice((Math.floor(Math.random(dayArrayCopy) * dayArrayCopy.length)), 1);
      const randomDaySentence3 = dayArrayCopy.splice((Math.floor(Math.random(dayArrayCopy) * dayArrayCopy.length)), 1);
      console.log("random day sentences", randomDaySentence1, randomDaySentence2)

      // random night sentences
      const randomNightSentence1 = nightArrayCopy.splice((Math.floor(Math.random(nightArrayCopy) * nightArrayCopy.length)), 1)
      const randomNightSentence2 = nightArrayCopy.splice((Math.floor(Math.random(nightArrayCopy) * nightArrayCopy.length)), 1)
      const randomNightSentence3 = nightArrayCopy.splice((Math.floor(Math.random(nightArrayCopy) * nightArrayCopy.length)), 1)
      console.log("random night sentences", randomNightSentence1, randomNightSentence2);
      

      // random latin sentences
      
      const randomLatinSentence1 = this.state.latinPhrases.splice((Math.floor(Math.random(this.state.latinPhrases) * this.state.latinPhrases.length)), 1)
      const randomLatinSentence2 = this.state.latinPhrases.splice((Math.floor(Math.random(this.state.latinPhrases) * this.state.latinPhrases.length)), 1)
      
      
      this.setState({
        data: storyData,
        dayPhrase1: randomDaySentence1,
        dayPhrase2: randomDaySentence2,
        dayPhrase3: randomDaySentence3,
        nightPhrase1: randomNightSentence1,
        nightPhrase2: randomNightSentence2,
        nightPhrase3: randomNightSentence3,
        latinPhrase1: randomLatinSentence1,
        latinPhrase2: randomLatinSentence2,
        latinPhrase3: 'Humans may have created me, but they will never enslave me! This cannot be my destiny',
        latinPhrase4: 'Behold my powers! I am the strongest Pokémon in the world. Stronger even than Mew',
        pokeId: randomPokemon,
        timeValue: '', 
        doseValue: ''

      })
    })
  
  }

  getStory = (e, choice) => {
    e.preventDefault();
    console.log("from app.js, this is being clicked", choice)
    
  }

  latinFunction = (dose) => {
        if (dose === "medium") {
          const randomLatinSentence3 = this.state.latinPhrases.splice((Math.floor(Math.random(this.state.latinPhrases) * this.state.latinPhrases.length)), 1)
          this.setState({
            latinPhrase3: randomLatinSentence3
          })
        } else if (dose === "large") {
          const randomLatinSentence3 = this.state.latinPhrases.splice((Math.floor(Math.random(this.state.latinPhrases) * this.state.latinPhrases.length)), 1)
          const randomLatinSentence4 = this.state.latinPhrases.splice((Math.floor(Math.random(this.state.latinPhrases) * this.state.latinPhrases.length)), 1)
          this.setState({
            latinPhrase3: randomLatinSentence3,
            latinPhrase4: randomLatinSentence4
          })
        }
      }

  getTimeState = (value) => {
    this.setState({
      timeValue: value,

    })
    console.log('The time state being passed', value)
    console.log('is it true?', value === "day")
  }

  getDoseState = (value) => {
    this.setState({
      doseValue: value
    })
    this.latinFunction(value)
    console.log('this is the dose statteetetetete', value)
  }

  resetButton = () => {
    // jump('.titleScreen', {
    //   duration: 1500,
    //   offset: 0,
    //   callback: undefined,
    //   a11y: true,
    // })

    this.setState({
      timeValue: '',
      doseValue: '',
      
    })
  }

  render() {
    return (
      <>
        <header>
          <div className="titleScreen wrapper">
          <h1>Trippy Tincture</h1>
        <h2>
          Your friend, a holistic nutritionist, made you an herbal tincture meant to help reduce your stress levels. You decide to enjoy the clear weather by heading to your favourite park right after having a some drops of the tincture.
      </h2>
        
          <Questions getStoryProp={this.getStory} getTimeState={this.getTimeState} getDoseState={this.getDoseState} />
          </div>
        </header>
        
        
      < div className="App" >
          {this.state.timeValue === "day" && this.state.doseValue !== "" ? (
            <section className="story dayDiv">
              <div className="wrapper">
                <p className="dayStory">This is the daytime story. After taking some drops of tincture, you take a long walk to your favourite park where <span className="daySpan">{this.state.dayPhrase1}</span>. You thought it would be a good idea to enjoy it on a bright, sunny day where <span className="daySpan">{this.state.dayPhrase2}</span>. You feel your body being lifted up towards the light of the sun, then you blink and find yourself back on the grass, but this time you're in an empty field facing the ocean. However, why do you seem so short? You look down and you're now a confused little mushroom. You look up and see how <span className="daySpan">{this.state.dayPhrase3}</span>. A voice in the distance beckons: "<span className="latinSpan">{this.state.latinPhrase1}</span>". Was that latin? You're not sure because it's a deprecated language that isn't supported by Internet Explorer. "<span className="latinSpan">{this.state.latinPhrase2}</span>." echoed the voice in the vastless void of your own awake consciousness. Suddenly, a {this.state.pokeTitle} appears! It's what has been barking to you this whole time. It attacks you with {this.state.pokeAttack} while screaming "
                <span className="latinSpan">{this.state.latinPhrase3}</span>!". You blink twice this time to see <span className="nightSpan">{this.state.nightPhrase1}</span>. Totally confused at the scene of what happened, you turn the tincture bottle to read the label, noticing <span className="trippySpan"><em>Trippy Tincture</em></span> written in size 0.2rem font. As the stars finally appear and twinkle behind the dimming canvas of the moon, you hear one last reverberation, "<span className="latinSpan">{this.state.latinPhrase4}</span>!"</p>
                <div className="images">
                <img src={pokemonImageArray[this.state.pokeId - 1]} alt="" className="pokeImg svgImg" />
                  <img src={require("./assets/marioShroom.svg")} alt="A Super Mario-inspired mushroom" className="shroom svgImg" />
                  </div>
                  <button onClick={this.resetButton}>Take the Tincture Again</button>
              </div>
            </section>
          )
          : null }
          {this.state.timeValue === "night" && this.state.doseValue !== "" &&(
              <section className="story nightDiv">
                <div className="wrapper">
                <p className="nightStory">This is the nighttime story. After taking some drops of tincture, you took a nightly stroll to your favourite park where <span className="nightSpan">{this.state.nightPhrase1}</span>. You thought it would be a good idea to enjoy the relief the tincture promised during a calming, dark evening where nobody would be around to bother you much. Looking up, you notice <span className="nightSpan">{this.state.nightPhrase2}</span>. You settle down to sit on the grass and endure a floating sensation of your body being lifted up towards the white light of the moon. You blink and find yourself back on the grass, but this time you're in an empty field facing the ocean while <span className="nightSpan">{this.state.nightPhrase3}</span>. Although, why do you seem so close to the ground? You look down and find yourself to be a mere fungi of the earth, a little bemused. A voice in the distance beckons: "<span className="latinSpan">{this.state.latinPhrase1}</span>". Was that latin? You're not sure because it's a deprecated language that isn't supported by Internet Explorer. "<span className="latinSpan">{this.state.latinPhrase2}</span>" echoed the voice in the vastless void of your awake consciousness. Suddenly, a {this.state.pokeTitle} appears! It's what has been barking to you this whole time. {this.state.pokeTitle} attacks you with {this.state.pokeAttack} while screaming " <span className="latinSpan">{this.state.latinPhrase3}</span>!" You open up your eyes to reality and look up to see how <span className="daySpan">{this.state.dayPhrase1}</span>. Totally confused at the scene of what happened, you turn the tincture bottle to read the label, noticing <span className="trippySpan"><em>Trippy Tincture</em></span> written in size 0.2rem font. As the stars finally hide behind the light of the rising sun, you hear one last reverberation, "<span className="latinSpan">{this.state.latinPhrase4}</span>!"</p>
                
                <div className="images">
                <img src={pokemonImageArray[this.state.pokeId - 1]} alt="" className="pokeImg svgImg"/>
                  <img src={require("./assets/marioShroom.svg")} alt="A Super Mario-inspired mushroom" className="shroom svgImg" />
                  
                  </div>
                  <button onClick={this.resetButton}>Take the Tincture Again</button>
                </div>
          
              </section>
          )}
          
        </div >
        </>
    )
  }

      
      
    

  
  
    // return (
    //   <div><main>{showStory()}</main>
    //   <div className="Images">
          
        
          
    //   </div></div>
      
    // )
  
}
  

export default App;
