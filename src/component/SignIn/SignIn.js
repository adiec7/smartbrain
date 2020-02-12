import React from 'react';
import {RingLoader} from 'react-spinners';
import {css} from 'react-emotion';


class SignIn extends React.Component {
 	
 	constructor(props){
 		super(props);
 		this.state = {
 			signInEmail: '',
			 signInPassword: '',
			 error: false,
			 errorMessage: '',
			 loading: false
 		}
 	}
	  override = css`
	 display: inline;
		 margin: 0 30px;
		 border-color: red;
	 `
 	onEmailChange = (event) => {
 		this.setState({ signInEmail: event.target.value});
 	}

 	onPasswordChange = (event) => {
 		this.setState({ signInPassword: event.target.value});
 	}

 	onSubmitSignin = () => {
		 this.setState({loading:true,errorMessage:''})
		 if(this.state.signInPassword.length < 1 || this.state.signInEmail.length<1){
			this.setState({error:true,loading:false});
			return;
		 }
 		fetch('https://smart-brain-001.herokuapp.com/signin',{
 			method: 'post',
 			headers: {'Content-Type': 'application/json'},
 			body: JSON.stringify({
 				email: this.state.signInEmail,
 				password: this.state.signInPassword
 			})
 		})
 		.then(response => response.json())
 		.then(user => {
 			if(user.id){
			this.setState({error: false,errorMessage:'',loading:false})
 			this.props.loadUser(user);
 			this.props.onRouteChange('home');
 			} else{
				 this.setState({error:true, errorMessage:user, loading:false})
			 }
		 })
 	}

	render(){
		const {onRouteChange} = this.props;
		return(
		  <article className="br4 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f3 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
			        <input 
			        onChange = {this.onEmailChange} 
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="email" 
			        name="email-address"  
			        id="email-address" 
			        />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
			        <input 
			        onChange = {this.onPasswordChange} 
			        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" 
			        name="password"  
			        id="password" />
							{this.state.error? <label style={{color:'red'}}>invalid credentials</label>  : null}
							{this.state.loading? 
							<div className='sweeet-loading' >
								{'checking...'}
								<RingLoader 
									className={this.override}
									sizeUnit={'px'}
									size={50}
									color={'gold'}
									loading={this.state.loading}
									/>
							</div>
							:null
						}
							
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      onClick = {this.onSubmitSignin}
			      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" 
			      type="submit" 
			      value="Sign in" />
			    </div>
			    <div className="lh-copy mt3">
			      <p onClick = {() => onRouteChange('register')} className="f4 link dim black db pointer">Sign up</p>
			    </div>
			  </div>
		    </main>
		  </article> 
		);
  }	
}


export default SignIn;