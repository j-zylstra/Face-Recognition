import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from './components/Particles/particles';
import './App.css';




const initialState = {
  input:'',
  imageUrl:'',
  box:{},
  route: 'signin',
  isSignedIn: false,
  user: {
    email: '',
    id: '',
    name: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input:'',
      imageUrl:'',
      box:{},
      route: 'signin',
      isSignedIn: false,
      user: {
        email: '',
        id: '',
        name: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
      this.setState({user: {
        email: data.email,
        id: data.id,
        name: data.name,
        entries: data.entries,
        joined: data.joined
  }})
  }

  

calculateFaceLocation = (data) => {

  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
     leftCol: clarifaiFace.left_col * width,
     topRow: clarifaiFace.top_row * height,
     rightCol: width - (clarifaiFace.right_col * width),
     bottomRow: height - (clarifaiFace.bottom_row * height),
  
  }
}

displayFaceBox = (box) => {
  console.log(box);
  this.setState({box: box});
}

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
  
    fetch('http://localhost:3001/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
          input: this.state.input
          }) 
        })
          
         .then(response => response.json())
         .then(response => {
          if (response) {
            fetch('http://localhost:3001/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
          id: this.state.user.id
          })
         })
         .then(response => response.json())
         .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }))
         })
         .catch(console.log)
      }
        this.displayFaceBox(this.calculateFaceLocation(response))
        
        })
     .catch(err => console.log('error'));
     
  } 

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  
  render() { 
   
    return (
      <div className="App">
      
        
        <Particles className='particles'/>
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/> 
        { this.state.route === 'home'
         ? <div>
          
            <Logo/>
            <Rank name = {this.state.user.name} entries = {this.state.user.entries} />
            <ImageLinkForm 
               onInputChange={this.onInputChange} 
               onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
        : (
          this.state.route === 'signin' 
          ?<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
