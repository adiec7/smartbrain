import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import Rank from './component/Rank/Rank';
import SignIn from './component/SignIn/SignIn';
import Register from './component/Register/Register';
import Particles from 'react-particles-js';
import Header from './component/Header/Header';
import Slider from './component/Slider/Slider';
import Backdrop from './component/Backdrop/Backdrop'
import ErrorMessage from './component/ErrorMessage/ErrorMessage'

const particlesOptions = {
                particles: {
                  number:{
                    value:15,
                    density:{
                      enable:true,
                      value_area:350
                    }
                  }
                     
                }
              }

const initialState = {
      input: '',
      imageUrl: '',
      faces: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        registered: ''
      },
      show: false,
      uploadState: '',
      loading: false,
      loaded: false,
      invalid: false,
      error: false,
      errorMessage: ''
    }


class App extends Component {
  constructor(){
    super();
    this.state = initialState;
      }


  calculateFaceLocation = (data) =>{
   const image = document.querySelector('#inputImage');
   const width = Number(image.width);
   const height = Number(image.height);
   return {
      leftCol: data.left_col * width,
      topRow: data.top_row * height,
      rightCol: width - (data.right_col * width),
      bottomRow: height - (data.bottom_row * height) 
   }
  }

  processFace = (data) =>{
    const image = document.querySelector('#inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    let faces = []
    for(let i = 0; i < data.faces.length; i++){
      const {x1,x2,y1,y2,features,attributes} = data.faces[i];
      let face = {
        leftCol: x1 * width,
        rightCol: width - (x2 * width) ,
        topRow: y1 * height,
        bottomRow: height - (y2 * height),
        leftEye: {
          x: features.left_eye.x * width,
          y: features.left_eye.y * height
        },
        rightEye: {
          x: features.right_eye.x * width,
          y: features.right_eye.y * height
        },
        noseTip: {
          x: features.nose_tip.x * width,
          y: features.nose_tip.y * height
        },
        leftMouthCorner: {
          x: features.left_mouth_corner.x * width,
          y: features.left_mouth_corner.y * height
        },
        rightMouthCorner: {
          x: features.right_mouth_corner.x * width,
          y: features.right_mouth_corner.y * height
        },
        gender: (attributes.male > attributes.female)? 'male': 'female',
        minor: attributes.minor > 0.5 ? 'Minor': 'Adult',
        glasses: attributes.sunglasses > 0.5 ? 'Yes': 'No glasses'
      }

      faces.push(face)
    }
    return faces
  }

  loadUser = (data) => {
    this.setState({
      user: {
         id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        registered: data.registered
      }
    })
   
  }

  displayFaceBox = (faces) => {
    this.setState({faces: faces, loading: false, uploadState:'', loaded: true});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  processImage = (imageUrl) => {
    this.setState({uploadState:'Analyzing Image', loading: true, invalid:false})
    fetch('https://smart-brain-001.herokuapp.com/imageUrl',{
      method: 'post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
        imageUrl: imageUrl
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data !== 'api error'){
        fetch('https://smart-brain-001.herokuapp.com/image',{
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response =>  response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch()
      }
      this.displayFaceBox(this.processFace(data));
      document.querySelector('#table').scrollIntoView({
        behavior: 'smooth'
      });
      // REMEMBER TO COME BACK HERE FOR MORE EXPLOITS
      //this.displayFaceBox(this.calculateFaceLocation(data.outputs[0].data.regions[0].region_info.bounding_box))
  })
    .catch(err => {
      this.setState({error:true, errorMessage:'Error: Check your network connection'});
      
    });
  }

  onButtonSubmit = () => {
   this.setState({imageUrl: this.state.input});
   const imageLink = this.state.input;
   if(!(imageLink.endsWith('.jpg')|| imageLink.endsWith('.jpeg') || imageLink.endsWith('.png') || imageLink.endsWith('.tiff') || imageLink.endsWith('.gif') ||
   imageLink.endsWith('.JPG')|| imageLink.endsWith('.JPEG') || imageLink.endsWith('.PNG') || imageLink.endsWith('.TIFF') || imageLink.endsWith('.GIF'))){
     this.setState({invalid: true});
     return
   }
   
   setTimeout(function(){
    if(document.querySelector('#spinner')){
      document.querySelector('#spinner').scrollIntoView({
      behavior: 'smooth'
    })
    } 
     this.processImage(this.state.input);
  }, 1000)
  //I'm using a delay here because setState takes time to implement due
  //to its asynchronous nature, 
  
  //   window.scroll({
  //   top: 500,
  //   left: 0,
  //   behavior: 'smooth'
  // })

  
  }

  menuClicked = () =>{
    this.setState({show: !this.state.show})
  }

  onRouteChange = (route) => {
    if(route === 'home'){
      this.setState({ isSignedIn: true,route:'home'})
    } else if (route === 'signout'){
      this.setState(initialState);
      this.setState({isSignedIn:false})
    } else{
      this.setState({route: route});
    }
    
  }

  CLOUDINARY_URL='	https://api.cloudinary.com/v1_1/yourUsername/upload'
  CLOUDINARY_UPLOAD_PRESET='user_your_preset'
  formData = new FormData();
   
  fileChangeHandler = (event) =>{
    event.persist();
    this.setState({uploadState:'Uploading Image', loading: true})
    
    setTimeout(() => {
      if(document.querySelector('#spinner')){
        document.querySelector('#spinner').scrollIntoView({
        behavior: 'smooth'
      })
      } 
      
      this.formData.append('file', event.target.files[0]);
    this.formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET);

    // fetch('http://localhost:3000/uploadImage',{
    //   method: 'post',
    //   headers:{'Content-Type': 'application/json'},
    //   body: JSON.stringify({
    //     file: event.target.files[0]
    //   })
    // }).then(response => response.json())
    // .then(console.log)
    // .catch(console.log);

    axios({
      url: this.CLOUDINARY_URL,
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: this.formData
    }).then(res =>{
      this.setState({imageUrl:res.data.secure_url,error:false});
      this.processImage(res.data.secure_url);
    }).catch(err => {
      this.setState({error: true, errorMessage: err})
    })
    }, 1000)

    // window.scroll({
    //   top: 500,
    //   left: 0,
    //   behavior: 'smooth'
    // })
    
  }

  handleError = () => {
    this.setState({error:false, loading:false, uploadState:''})
  }

  render() {
   const {isSignedIn, imageUrl, route, faces,user} = this.state;
    return (
      <div className="App">
      <Particles  className='particles'
              params={particlesOptions}
            />
        <Header show ={this.state.show} menuClicked={this.menuClicked} onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn}/>
        <Slider menuClicked={this.menuClicked} loadUser = {this.loadUser} isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange} show={this.state.show} />
        <Backdrop menuClicked={this.menuClicked} show={this.state.show}/>
         {
           this.state.error? <ErrorMessage handleError={this.handleError} errorMessage={this.state.errorMessage} /> : null
         }
        { route === 'signin'?
        <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} /> :
        (
          this.state.route === 'home'?
          <div>
            <Rank entries = {user.entries} name = {user.name} />
            <ImageLinkForm invalid={this.state.invalid} uploadState={this.state.uploadState} loading={this.state.loading} onFileChange={this.fileChangeHandler}onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
            <FaceRecognition loaded={this.state.loaded} faces = {faces} imageUrl = {imageUrl} /> 
          </div>:
          <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
          )
              
        }
      </div>
    );
  }
}

export default App;
