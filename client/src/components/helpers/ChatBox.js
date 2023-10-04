import react, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'react-dropdown/style.css'
import { Form, Field } from 'react-final-form';
import { Link } from 'react-router-dom';
class ChatBox extends Component {
	constructor(props){  
	    super(props);  
	    this.state = {  
	    		selectLocationItems: [
		    		{
		    			item: 'Wabash Ave, Chicago',
		    			link: "/"
		    		},
	    			{
	    				item: 'Hometown',
	    				link: "/"
	    			},
	    			{
	    				item: 'La Grange',
	    				link: "/"
	    			},
	    			{
	    				item: 'Greenwood Plaza, Chicago',
	    				link: "/"
	    			}
	    		],
	    		newOrReturning: [
		    		{
		    			item: 'New Patient',
		    			link: "/",
		    			icon: "fas fa-clipboard-check fa-lg"
		    		},
		    		{
		    			item: 'Returning Patient',
		    			link: "/",
		    			icon: "fas fa-hospital-user fa-sm"
		    		},
		    		{
		    			item: 'Other',
		    			link: "/",
		    			icon: "fas fa-envelope-open-text"
		    		}
	    		],
	    		showDropdownLocations: false,
	    		showDropdownNewOrReturning: false,
	    		titleVarLocations: 'Select a location',
	    		titleVarNewOrReturning: 'New or returning patient?',
	    		titleLocations: 'Select a location',
	    		titleNewOrReturning: 'New or returning patient?',
	    		clickShowLocations: false,
	    		clickShowNewOrReturning: false,

	    		errorFName: "",
	    		errorFNameShow: false,
	    		errorLName: "",
	    		errorLNameShow: false,
	    		errorEmail: "",
	    		errorEmailShow: false,
	    		errorPhone: "",
	    		errorPhoneShow: false,
	    		errorMessage: "",
	    		errorMessageShow: false,
	    		errorMain: "",
	    		errorMainShow: false,

	    		lastTyped: '',
	    		showAllErrors: false,
                phoneNumber: ''
		}
    } 
    formatPhoneNumber = (value) => {
        if (value) {
          // Remove all non-numeric characters from the input
          const phoneNumber = value.replace(/\D/g, '');
      
          // Format the phone number as (XXX) XXX-XXXX
          const formattedPhoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
            3,
            6
          )}-${phoneNumber.slice(6, 10)}`;
      
          return formattedPhoneNumber;
        }
      
        return ''; // Return an empty string for undefined or null values
      };
      
      parsePhoneNumber = (value) => {
        if (value) {
          // Remove all non-numeric characters from the input
          return value.replace(/\D/g, '');
        }
      
        return ''; // Return an empty string for undefined or null values
      };
	onSubmit(values) {
		console.log('onSubmit sign up!', values);
	}
	handleSubmitFunction(handleSubmit) {
	}
	

	renderIcon(icon) {
		return <i style={{ marginRight: '0.5rem', alignSelf: 'center', color: 'black' }} class={icon}></i>
	}

	hideDropdown() {
		if (!this.state.clickShowNewOrReturning) {
			this.setState({ show: false });
		}
	}
	showDropdown() {
		this.setState({ show: true });
	}
	renderShow() {/*for Dropdown Menu*/
		if (this.state.clickShowNewOrReturning) {
			return "dropdown-basic-button-new-or-returning";
		} else {
			return "dropdown-basic-button-new-or-returning"
		}
	}
	renderLocationsClicked() {
		if (this.state.clickShowLocations) {
			return "dropdown-basic-button-locations";
		} else {
			return "dropdown-basic-button-locations"
		}
	}
	renderErrorEmail(error) {
		if (error && this.state.showAllErrors) {
			return (
				<div id="error-div">
					<h8 style={{ display: 'flex', color: 'red', fontSize: '0.9rem', padding: '0rem', margin: '0rem' }}>
						{error}
					</h8>
				</div>
			)
		}
	}
	renderErrorPhone(error) {
		if (error && this.state.showAllErrors) {
			return (
				<div id="error-div">
					<h8 style={{ display: 'flex', color: 'red', fontSize: '0.9rem', padding: '0rem', margin: '0rem' }}>
						{error}
					</h8>
				</div>
			)
		}
	}
	renderErrorLocations(error) {
		if (error && this.state.showAllErrors) {
			return (
				<div id="error-div">
					<h8 style={{ display: 'flex', color: 'red', fontSize: '0.9rem', padding: '0rem', margin: '0rem' }}>
						{error}
					</h8>
				</div>
			)
		}
	}
	renderErrorNewOrReturning(error) {
		if (error && this.state.showAllErrors) {
			return (
				<div id="error-div">
					<h8 style={{ display: 'flex', color: 'red', fontSize: '0.9rem', padding: '0rem', margin: '0rem' }}>
						{error}
					</h8>
				</div>
			)
		}
	}
	renderErrorMessage(error) {
		if (error && this.state.showAllErrors) {
			return (
				<div id="error-div">
					<h8 style={{ display: 'flex', color: 'red', fontSize: '0.9rem', padding: '0rem', margin: '0rem' }}>
						{error}
					</h8>
				</div>
			)
		}
	}
	renderErrorMain(error) {
		if (error && this.state.showAllErrors) {
			return (
				<div id="error-div">
					<h8 style={{ display: 'flex', color: 'red', fontSize: '0.9rem', padding: '0rem', margin: '0rem' }}>
						{error}
					</h8>
				</div>
			)
		}
	}
	checkDoneOnForm(typing) {
		if (typing === 'location') {
			if (this.state.emailDone) {

			}
		}
	}
	validateField(field, value) {
		if (field === 'fName') {
			const passed = /^[a-z]+$/i.test(field);
		}
	}
	inputChangeHandler(k) {
	  this.setState({ [k]: true });
	}
	renderErrorFName(error) {
		if (error && this.state.showAllErrors) {
			return (
				<div id="error-div">
					<h8 style={{ display: 'flex', color: 'red', fontSize: '0.9rem', padding: '0rem', margin: '0rem' }}>
						{error}
					</h8>
				</div>
			)
		}
	}
	renderErrorLName(error) {
		if (error && this.state.showAllErrors) {

			return (
				<div id="error-div">
					<h8 style={{ display: 'flex', color: 'red', fontSize: '0.9rem', padding: '0rem', margin: '0rem' }}>
						{error}
					</h8>
				</div>
			)
		}
	}
	renderSendButton(values, errors, form) {
		if (
			values.fName ||
			values.lName ||
			values.email ||
			values.phone ||
			values.message
		) {
			if (Object.keys(errors).length === 0) {
				return <button id="chat-box-button-blue" 
					onClick={(e) => {
						e.preventDefault();
						this.onSubmit(values);
						form.reset();
						document.getElementById("chat-middle-component").style.opacity = '0%';
						document.getElementById("chatbox-div").style.backgroundColor = 'rgba(105,116,146, 40%)';
						document.getElementById("chatbox-div").style.opacity = '0%';


						// !!!!!
						// document.getElementById("giant icon guy")
						// !!!!!


					}} type="submit">
						Send
					</button>
			} else {
				return <button id="chat-box-button-blue" 
					onClick={(e) => {
						this.setState({ showAllErrors: true });
						e.preventDefault();
					}} type="submit">
						Send
					</button>
			}
		} else {
			return <button id="chat-box-button" 
				onClick={(e) => {
					e.preventDefault();
				}} type="submit">
					Send
				</button>
		}
	}

	renderBorderFName(errors) {
		if (!errors.fName || !this.state.showAllErrors) {
			return "field-id";
		} else {
			return "field-id-red";
		}
	}
	renderBorderLName(errors) {
		if (!errors.lName || !this.state.showAllErrors) {
			return "field-id";
		} else {
			return "field-id-red";
		}
	}
	renderBorderEmail(errors) {
		if (!errors.email || !this.state.showAllErrors) {
			return "field-id";
		} else {
			return "field-id-red";
		}
	}
	renderBorderPhone(errors) {
		if (!errors.phone || !this.state.showAllErrors) {
			return "field-id";
		} else {
			return "field-id-red";
		}
	}
	renderBorderMessage(errors) {
		if (!errors.message || !this.state.showAllErrors) {
			return "field-id";
		} else {
			return "field-id-red";
		}
	}
	render() {
		return (
			<Form 
				validate={values => {
					const errors = {};
					let newObject = [];
					

					if (!values.fName) {
						errors.fName = "First Name is empty";
						// this.setState({ errorFName: "First Name is empty" });
					} else if (values.fName.length > 20) {
						errors.fName = "First Name is too long";
						// this.setState({ errorFName: "First Name is too long" });
					} else if (!/^[a-z]+$/i.test(values.fName)) {
						errors.fName = "First Name can only contain letters";
						// this.setState({ errorFName: "First Name can only contain letters" });
					}

					if (!values.lName) {
						errors.lName = "Last Name is empty";
						// this.setState({ errorLName: "Last Name is empty" });
					} else if (values.lName.length > 30) {
						errors.lName = "Last Name is too long";
						// this.setState({ errorLName: "Last Name is too long" });
					} else if (!/^[a-z]+$/i.test(values.lName)) {
						if (!values.lName.includes("-")) {
							errors.lName = "Last Name can only contain letters";
							// this.setState({ errorLName: "Last Name can only contain letters" });
						}
					}

					if (!values.email) {
						errors.email = "Email is empty";
						// this.setState({ errorEmail: "Email is empty" });
					} else if (values.email.length > 40) {
						errors.email = "Email is too long";
						// this.setState({ errorEmail: "Email is too long" });
					} else if (!values.email.includes('@')) {
						errors.email = "Please enter a valid email format";
						// this.setState({ errorEmail: "Please enter a valid email format" });
					}

					if (!values.phone) {
						errors.phone = "Phone is empty";
						// this.setState({ errorPhone: "Phone is empty" });
					}

					if (!values.message) {
						errors.message = "Message is empty";
						// this.setState({ errorMessage: "Message is empty" });
					} else if (values.message.length > 2000) {
						errors.message = "Message is too long";
						// this.setState({ errorMessage: "Message is too long" });
					}


					return errors;
				}}
				onSubmit={this.onSubmit}
			    render={({ props, handleSubmit, values, errors, form }) => (
			        <form style={{ display: 'flex' }} onSubmit={handleSubmit} >
						<div id="chatbox-div">
							<div id="chat-middle-component">
								<div id="middle-form-top-div">
							      	<div id="chat-form-top-div">
							      		<div id="chat-form-inner-div">
									       	<div id="chat-form-lines">
                                                <Field
                                                    key="fNameKey"
                                                    id={this.renderBorderFName(errors)}
                                                    style={{ borderRadius: '3px' }}
                                                    name="fName"
                                                    component="input" 
                                                    placeholder="First Name"
                                                />
                                                <div style={{ marginBottom: '0.3rem' }}>
                                                    {this.renderErrorFName(errors.fName)}
                                                </div>
                                            </div>
									       	<div id="chat-form-lines">
                                                <Field
                                                    key="lNameKey"
                                                    id={this.renderBorderLName(errors)}
                                                    style={{ borderRadius: '3px' }}
                                                    name="lName"
                                                    component="input"
                                                    placeholder="Last Name"
                                                />
                                                <div style={{ marginBottom: '0.3rem' }}>
                                                    {this.renderErrorLName(errors.lName)}
                                                </div>
											</div>
									        <div id="chat-form-lines">
									          	<Field
													key="emailKey"
									          		id={this.renderBorderEmail(errors)}
									          		style={{ borderRadius: '3px' }}
									          		name="email"
									          		component="input"
									          		placeholder="Email address"
									          	/>
                                                <div style={{ marginBottom: '0.3rem' }}>
                                                    {this.renderErrorEmail(errors.email)}
                                                </div>
									        </div>
									        <div id="chat-form-lines">
                                            <Field
                                                id={this.renderBorderPhone(errors)}
                                                style={{ padding: '0.5rem', borderRadius: '3px' }}
                                                type="tel" // Use type="tel" for phone numbers
                                                name="phone"
                                                component="input"
                                                placeholder="(•••) ••• ••••"
                                                parse={this.parsePhoneNumber} // Parse the phone number
                                                format={this.formatPhoneNumber} // Format the phone number
                                            />									        </div>
                                            <div style={{ marginBottom: '0.3rem' }}>
                                                {this.renderErrorPhone(errors.phone)}
                                            </div>
									    </div>
										{this.renderErrorMain(this.state.errorMain)}
							      	</div>
								</div>
							</div>
							<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} id="chat-middle-component">
                                <div >
                                    <Field id={this.renderBorderMessage(errors)} style={{ resize: 'none', border: 'none', backgroundColor: "rgba(192,200,200, 15%)",  padding: '0.5rem', borderRadius: '3px', width: '20rem'  }}  name="message" component="textarea" rows="5" placeholder="Send a message..." />
                                    {this.renderErrorMessage(errors.message)}
                                </div>
                                <div id="terms-and-policy">
                                    I understand and agree that any information submitted will be forwarded to our office by email and not via a secure messaging system. This form should not be used to transmit private health information, and we disclaim all warranties with respect to the privacy and confidentiality of any information submitted through this form.
                                </div>
                                    {
                                        this.renderSendButton(values, errors, form)
                                    }
                            </div>

						</div>
			        </form>
			    )}
			  />
		);
	}
}
export default ChatBox;