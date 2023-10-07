import react, { Component } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'react-dropdown/style.css'
import { Form, Field } from 'react-final-form';
import { Link } from 'react-router-dom';
//copy site key 6LfGeYIoAAAAAHbpEasH2XEmpv9_oJJ9fK1uA5db
// copy secret key 6LfGeYIoAAAAABhdCQcwwhn5OhMBWkz23i7Oedjx

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
                phoneNumber: '',
                agreeToTerms: false, // Add a state property for the radio button
				errorAgree: '',
                recaptchaToken: '', // To store the reCAPTCHA token
				recaptchaChecked: false,
				errorRecaptcha: ''
		}
    }
    componentDidMount() {
        // Load the reCAPTCHA script
        // this.loadRecaptchaScript();
      }

    loadRecaptchaScript() {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/enterprise.js?render=${process.env.REACT_APP_RECAPTCHA}`;
        script.async = true;
        script.defer = true;
        script.onload = this.initializeRecaptcha;
        document.head.appendChild(script);
      }
    initializeRecaptcha = () => {
        // Initialize reCAPTCHA with your site key
        window.grecaptcha.enterprise.ready(() => {
          window.grecaptcha.enterprise.execute(process.env.REACT_APP_RECAPTCHA, { action: 'submit_form' }).then((token) => {
            this.setState({ recaptchaToken: token });
          });
        });
      };

	  handleSubmitRecaptcha = (values) => {
		if (values) {
			this.setState({ recaptchaChecked: true, errorRecaptcha: '' });
		}
		// Here, you can use this.state.recaptchaToken in your form submission
		// to validate the reCAPTCHA response.
	
		// Perform your form submission logic
		// ...
	  };
	  
    handleAgreeChange = () => {
        this.setState((prevState) => ({
            agreeToTerms: !prevState.agreeToTerms, // Toggle the value
        }));
    };
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
		const formData = {
			values,
			recaptcha: this.state.recaptchaToken,
			agreeToTerms: this.state.agreeToTerms,
		};
		
		console.log("Combined form data:", formData);
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
	renderErrorRecaptcha(error) {
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
	renderErrorAgree(error) {
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
						document.getElementById("chat-middle-component").style.opacity = '0%';
						document.getElementById("chatbox-div").style.backgroundColor = 'rgba(105,116,146, 40%)';
						document.getElementById("chatbox-div").style.opacity = '0%';
						setTimeout(() => {
							form.reset();
						  }, 3000);


						// !!!!!
						// document.getElementById("giant icon guy")
						// !!!!!


					}} type="submit">
						SEND
					</button>
			} else {
				return <button id="chat-box-button-blue" 
					onClick={(e) => {
						this.setState({ showAllErrors: true });
						e.preventDefault();
					}} type="submit">
						SEND
					</button>
			}
		} else {
			return <button id="chat-box-button" 
				onClick={(e) => {
					e.preventDefault();
				}} type="submit">
					SEND
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

					if (!this.state.agreeToTerms) {
						errors.agree = 'Please Agree';
					}

					if (!values.message) {
						errors.message = "Message is empty";
						// this.setState({ errorMessage: "Message is empty" });
					} else if (values.message.length > 2000) {
						errors.message = "Message is too long";
						// this.setState({ errorMessage: "Message is too long" });
					}

					if (!this.state.recaptchaChecked) {
						errors.recaptcha = "Please Prove You're Not A Robot";
					}

					return errors;
				}}
				onSubmit={this.onSubmit}
			    render={({ props, handleSubmit, values, errors, form }) => (
			        <form 
                        className='popout-content'
                        style={{ 
                            display: 'flex',
                            width: '70%',
                            flexDirection: 'column',
                            backgroundColor: 'white',
                        }}
                        onSubmit={handleSubmit} >
                        <p style={{ fontWeight: '400', letterSpacing: '0.05rem', alignSelf: 'center', fontSize: '0.8rem', fontFamily: 'sans-serif', paddingTop: '10px' }}>CONTACT US</p>
                        <h2 style={{ fontWeight: '400', letterSpacing: '0.01rem', alignSelf: 'center', fontFamily: 'sans-serif', padding: '10px 5px 0px 5px', marginBottom: '0px' }}>Send A Message To Los Angeles Orthopedic Surgery Specialists</h2>
                        <p style={{ fontWeight: '400', alignSelf: 'center', fontSize: '0.9rem', padding: '10px 10px 0px 10px', maxWidth: '90%' }}>If you have any questions, concerns, or comments regarding Los Angeles Orthopedic Surgery Specialists, please fill out the short contact form below.</p>
                        
						<div style={{ maxWidth: '90%', alignSelf: 'center', padding: '10px 10px 0px 10px' }} id="chatbox-div">
							<div id="chat-middle-component">
								<div id="middle-form-top-div">
							      	<div id="chat-form-top-div">
							      		<div id="chat-form-inner-div">
									       	<div id="chat-form-lines">
                                                <Field
                                                    key="fNameKey"
                                                    id={this.renderBorderFName(errors)}
                                                    style={{ borderRadius: '10px' }}
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
                                                    style={{ borderRadius: '10px' }}
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
									          		style={{ borderRadius: '10px' }}
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
                                                style={{ padding: '0.5rem', borderRadius: '10px' }}
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
							<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }} id="chat-middle-component">
                                <div>
                                    <Field id={this.renderBorderMessage(errors)} style={{ resize: 'none', border: 'none', borderRadius: '10px 10px 10px 10px', backgroundColor: "rgba(192,200,200, 25%)", zIndex: '10', minWidth: '100%',  padding: '0.5rem'  }}  name="message" component="textarea" rows="5" placeholder="Comments" />
                                    {this.renderErrorMessage(errors.message)}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <div id="terms-and-policy">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="terms"
                                                style={{ transform: 'scale(2)' }}
                                                checked={this.state.agreeToTerms}
                                                onChange={this.handleAgreeChange}
                                                />
                                        </label>
                                    </div>
                                    <div id="terms-and-policy">
                                        By clicking I understand and agree that any information submitted will be forwarded to our office by email and not via a secure messaging system. This form should not be used to transmit private health information, and we disclaim all warranties with respect to the privacy and confidentiality of any information submitted through this form.
                                    </div>
                                </div>
								<div style={{ marginBottom: '0.3rem' }}>
									{this.renderErrorAgree(errors.agree)}
								</div>
								<ReCAPTCHA
									className='g-recaptcha'
									sitekey={process.env.REACT_APP_RECAPTCHA} // Use the environment variable
									onChange={this.handleSubmitRecaptcha}
								/>
								<div style={{ marginBottom: '0.3rem' }}>
									{this.renderErrorRecaptcha(errors.recaptcha)}
								</div>
                            </div>

						</div>
                        {
                            this.renderSendButton(values, errors, form)
                        }
			        </form>
			    )}
			  />
		);
	}
}
export default ChatBox;