import React from 'react';
import {css} from 'react-emotion';
import {RingLoader} from 'react-spinners'

class Register extends React.Component {
	constructor(){
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			error: false,
			errorMessage:'',
			loading: false
		}
	}

	override = css`
	display: inline;
		margin: 0 30px;
		border-color: red;
	`

	onNameChange = (event) => {
 		this.setState({ name: event.target.value});
 	}
	onEmailChange = (event) => {
 		this.setState({ email: event.target.value});
 	}

 	onPasswordChange = (event) => {
 		this.setState({ password: event.target.value});
 	}

 	onSubmitRegister = () => {
		 this.setState({loading:true,error:false})
		 if(this.state.email.length < 8 || this.state.name.length < 2 || this.state.password < 3){
			 this.setState({loading:false, error:true, errorMessage:'Fill the form properly'})
			 return
		 }
 		fetch('https://smart-brain-001.herokuapp.com/register',{
 			method: 'post',
 			headers: {'Content-Type': 'application/json'},
 			body: JSON.stringify({
 				email: this.state.email,
 				password: this.state.password,
 				name: this.state.name
 			})
 		})
 		.then(response => response.json())
 		.then(user => {
 			console.log(user)
 			if(user.id){
 			this.props.loadUser(user);
 			this.props.onRouteChange('home');
 			} else {
					this.setState({error:true,errorMessage:'A user exists with same email',loading:false,email:''})
			 }
 		})
 		.catch(err => console.log(err));
 	}

	render(){
		const {onRouteChange} = this.props;
		return(
	  <article className="br4 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
		<main className="pa4 black-80">
		  <div className="measure">
		    <form id="sign_up" className="ba b--transparent ph0 mh0">
		      <legend className="f3 fw6 ph0 mh0">Register Here</legend>
		      <div className="mt3">
		        <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
		        <input 
		        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        type="text" 
		        name="name"  
		        id="name"
		        onChange = {this.onNameChange} 
		        />
		      </div>
		      <div className="mt3">
		        <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
		        <input 
		        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        type="email" 
		        name="email-address"  
						id="email-address"
						value={this.state.email}
		        onChange = {this.onEmailChange}
		        />
		      </div>
		      <div className="mv3">
		        <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
		        <input 
		        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        type="password" 
		        name="password"  
		        id="password" 
		        onChange = {this.onPasswordChange}
		        />
						{this.state.error? <label style={{color:'red'}}>{this.state.errorMessage}</label>  : null}
							{this.state.loading? 
							<div className='sweeet-loading' >
								{'Registering...'}
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
		    </form>
		    <div className="">
		      <input 
		      onClick = {this.onSubmitRegister}
		      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" 
		      type="submit" 
		      value="Register" />
		    </div>
		    <div className="lh-copy mt3">
		      <p onClick = {() => onRouteChange('signin')} 
		      className="f4 link dim black db pointer">Sign in</p>
		    </div>
		  </div>
	   </main>
	  </article> 
		);
	}	
	}


export default Register;