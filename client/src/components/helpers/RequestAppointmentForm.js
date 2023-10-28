import React, { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useCsrfToken } from '../CsrfTokenContext';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'react-dropdown/style.css'
import { Form, Field } from 'react-final-form';
import { Link } from 'react-router-dom';

function RequestAppointmentForm(props) {
  const { csrfToken, setCsrfToken } = useCsrfToken();
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [selectedPatientType, setSelectedPatientType] = useState('new');

  const [state, setState] = useState({
    showDropdownLocations: false,
    showDropdownNewOrReturning: false,
    titleVarLocations: 'Select a location',
    titleVarNewOrReturning: 'New or returning patient?',
    clickShowLocations: false,
    clickShowNewOrReturning: false,
    errors: {
      fName: '',
      lName: '',
      email: '',
      phone: '',
      message: '',
      agree: '',
      recaptcha: '',
    },
    lastTyped: '',
    showAllErrors: false,
    phoneNumber: '',
    agreeToTerms: false,
    agreeToTermsText: false,
    recaptchaToken: '',
    recaptchaChecked: false,
    csrfToken: csrfToken,
    setCsrfToken: setCsrfToken,
  });

  useEffect(() => {
    if (!csrfToken) {
      fetchReviews();
    }
  }, []);

  const fetchReviews = () => {
    console.log('fetchReviews');

    const url =
      process.env.NODE_ENV === 'production'
        ? 'https://la-orthos-bdc751615c67.herokuapp.com/api/v1/pull_google_places_cache'
        : 'http://localhost:3000/api/v1/pull_google_places_cache';

    const headers = {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    };

    fetch(url, { headers })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch reviews');
        }
      })
      .then((data) => {
        if (typeof data.reviews === 'string') {
          const reviewsArray = JSON.parse(data.reviews);
          if (data.csrf_token) {
            setCsrfToken(data.csrf_token);
          }
        } else {
          throw new Error('Data.reviews is not a string');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const initializeRecaptcha = () => {
    window.grecaptcha.enterprise.ready(() => {
      window.grecaptcha.enterprise.execute(process.env.REACT_APP_RECAPTCHA, { action: 'submit_form' }).then((token) => {
        setState({ ...state, recaptchaToken: token });
      });
    });
  };

  const handleSubmitRecaptcha = (values) => {
    if (values) {
      setState({ ...state, recaptchaChecked: true, errors: { ...state.errors, recaptcha: '' } });
    }
  };

  const handleAgreeChange = () => {
    setState((prevState) => ({
      ...state,
      agreeToTerms: !prevState.agreeToTerms,
    }));
  };

  const handleAgreeTextChange = () => {
    setState((prevState) => ({
      ...state,
      agreeToTermsText: !prevState.agreeToTermsText,
    }));
  };

  const formatPhoneNumber = (value) => {
    if (value) {
      const phoneNumber = value.replace(/\D/g, '');
      const formattedPhoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
      return formattedPhoneNumber;
    }
    return '';
  };

  const parsePhoneNumber = (value) => {
    if (value) {
      return value.replace(/\D/g, '');
    }
    return '';
  };

  const onSubmit = async (values) => {
    console.log('onSubmit');
    const formData = {
      ...values,
      recaptcha: state.recaptchaChecked,
      agreeToTerms: state.agreeToTerms,
      selectedPatientType: selectedPatientType
    };
    try {
      const response = await fetch('https://la-orthos-bdc751615c67.herokuapp.com/api/v1/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Email sending failed');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const renderError = (field) => {
    if (field && state.showAllErrors) {
      return (
        <div id="error-div">
          <h8 style={{ display: 'flex', color: 'red', fontSize: '0.8rem', padding: '0rem', margin: '0rem' }}>
            {field}
          </h8>
        </div>
      );
    }
    return null;
  };

  const renderSendButton = (values, errors, form) => {
    console.log('Here you are in your code');
    console.log('values', values);
    console.log('errors', errors);
    console.log('form', form);
    const shouldDisable = (
      !values.fName ||
      !values.lName ||
      !values.email ||
      !values.phone ||
      !values.message ||
      !state.agreeToTerms
    );

    const buttonClass = shouldDisable ? 'chat-box-button' : (Object.keys(errors).length === 0 ? 'chat-box-button-ready' : 'chat-box-button-blue');

    return (
        <div style={{ backgroundColor: 'white', justifyContent: 'flex-end', display: 'flex', padding: "0px", margin: '0px', width: '100%', borderRadius: '0px 0px 10px 10px' }}>
            <button
            id="chat-box-button"
            onClick={(e) => {
            e.preventDefault();
            if (shouldDisable) {
                console.log('shouldDisable true');
                console.log('values', values);

                setState({ ...state, showAllErrors: true });
            } else {
                console.log('onSubmit(values)', values);
                onSubmit(values);
                document.getElementById("chat-middle-component").style.opacity = '0%';
                document.getElementById("chatbox-div").style.backgroundColor = 'rgba(105,116,146, 40%)';
                document.getElementById("chatbox-div").style.opacity = '0%';
                document.getElementById("chat-box-button-ready").style.opacity = '0%';
                setTimeout(() => {
                form.reset();
                }, 3000);
            }
            }}
            style={{ backgroundColor: "rgb(243,74, 2)" }}
            type="submit"
            className={buttonClass}
        >
            Request Appointment <i style={{ justifySelf: 'center' }} class="fas fa-envelope"></i>
            </button>
        </div>
    );
  };
  // Date of Birth formatter
  const formatDob = (value) => {
    if (value) {
      const dob = value.replace(/\D/g, '');
      const formattedDob = `${dob.slice(0, 2)}/${dob.slice(2, 4)}/${dob.slice(4, 8)}`;
      return formattedDob;
    }
    return '';
  };

  // Date of Birth parser
  const parseDob = (value) => {
    if (value) {
      return value.replace(/\D/g, '');
    }
    return '';
  };
  const renderFieldBorder = (error) => {
    return !error || !state.showAllErrors ? "field-id" : "field-id-red";
  };
  const handleCloseForm = () => {
    console.log('handleCloseForm');
    props.toggleAppointmentForm(false);
    setIsFormVisible(false);
  };
  const renderPatientTypeRadio = () => {
    return (
      <div className='apt-line' style={{ fontSize: "1rem", padding: "0 0 0 5px" }}>
        <div style={{ margin: '0px 0px 0px 20px', padding: '0.2rem 0.5rem', display: 'flex', flexDirection: 'column' }}>
          <p>Are you a new or returning patient?</p>
          <div className="new-returning-div">
            <label className="apt-request-radio">
              <input
                type="radio"
                value="new"
                className='radio-circle'
                checked={selectedPatientType === 'new'}
                onChange={() => setSelectedPatientType('new')}
              />
              New
            </label>
            <label className="apt-request-radio">
              <input
                type="radio"
                value="returning"
                className='radio-circle'
                checked={selectedPatientType === 'returning'}
                onChange={() => setSelectedPatientType('returning')}
              />
              Returning
            </label>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Form
      validate={(values) => {
        const errors = {};

        if (!values.fName) {
          errors.fName = "First Name is empty";
        } else if (values.fName.length > 20) {
          errors.fName = "First Name is too long";
        } else if (!/^[a-z]+$/i.test(values.fName)) {
          errors.fName = "First Name can only contain letters";
        }

        if (!values.lName) {
          errors.lName = "Last Name is empty";
        } else if (values.lName.length > 30) {
          errors.lName = "Last Name is too long";
        } else if (!/^[a-z]+$/i.test(values.lName) && !values.lName.includes("-")) {
          errors.lName = "Last Name can only contain letters";
        }

        if (!values.email) {
          errors.email = "Email is empty";
        } else if (values.email.length > 40 || !values.email.includes('@')) {
          errors.email = "Please enter a valid email format";
        }

        if (!values.phone) {
          errors.phone = "Phone is empty";
        }

        if (!state.agreeToTerms) {
          errors.agree = 'Please agree to Privacy Policy & Terms of Use';
        }

        if (!values.message) {
          errors.message = "Message is empty";
        } else if (values.message.length > 2000) {
          errors.message = "Message is too long";
        }

        if (!values.dob) {
          errors.dob = 'Date of birth is empty';
        }

        setState({ ...state, errors });

        return errors;
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit, values, form }) => (
        <form
          className='popout-content'
          style={{
            display: 'flex',
            // maxWidth: '80%',
            height: '100vh',
            width: '100vw',
            flexDirection: 'column',
            backgroundColor: 'rgba(0,0,0,.8)',
            position: 'fixed',
            zIndex: 12,
            top: "50%",
            padding: "0px 0px 0px 0px",
            margin: "0px",
            borderRadius: "0px",
            left: "50%",
            alignItems: 'center',
            justifyContent: 'center',
            transform: "translate(-50%, -50%)",
            overflowY: 'scroll'
          }}
          onSubmit={handleSubmit}
        > 
          <div id="appointment-form">

            <div className="form-title">
                <p className="title-request-appointment">
                        Appointment Request
                </p>
                <button className="close-button" onClick={handleCloseForm}>x</button>
            </div>
            <div style={{ maxHeight: '100%', minWidth: '150px', alignSelf: 'center', padding: '10px 10px 0px 0px', margin: '0px', backgroundColor: 'white' }} id="chatbox-div">
                <div id="chat-middle-component-request-apt">
                <div id="middle-form-top-div">
                    <div style={{ justifyContent: 'flex-start', display: 'flex' }} id="chat-form-top-div">
                    <div id="chat-form-inner-div" style={{ width: '97%' }}>
                        {renderPatientTypeRadio()}
                        <div className="apt-line" style={{ display: 'flex', flex: '1'  }}>
                            <div id="chat-form-lines-request-apt">
                            <label style={{ fontSize: "0.9rem", padding: "0 0 0 5px" }}>First Name</label>
                            <Field
                                key="fNameKey"
                                id={renderFieldBorder(state.errors.fName)}
                                style={{ borderRadius: '10px', paddingLeft: '5px' }}
                                name="fName"
                                component="input"
                                />
                            <div style={{ marginBottom: '0.3rem' }}>
                                {renderError(state.errors.fName)}
                            </div>
                            </div>
                            <div id="chat-form-lines-request-apt">
                            <label style={{ fontSize: "0.9rem", padding: "0 0 0 5px" }}>Last Name</label>
                            <Field
                                key="lNameKey"
                                id={renderFieldBorder(state.errors.lName)}
                                style={{ borderRadius: '10px', paddingLeft: '5px' }}
                                name="lName"
                                component="input"
                                />
                            <div style={{ marginBottom: '0.3rem' }}>
                                {renderError(state.errors.lName)}
                            </div>
                            </div>


                            <div id="chat-form-lines-request-apt">
                            <label style={{ fontSize: "0.9rem", padding: "0 0 0 5px" }}>Phone</label>
                            <Field
                                id={renderFieldBorder(state.errors.phone)}
                                style={{ borderRadius: '10px', paddingLeft: '5px' }}
                                type="tel"
                                name="phone"
                                label="Phone"
                                component="input"
                                placeholder="(•••) ••• ••••"
                                parse={parsePhoneNumber}
                                format={formatPhoneNumber}
                            />
                            <div style={{ marginBottom: '0.3rem' }}>
                                {renderError(state.errors.phone)}
                            </div>
                            </div>
                        </div>
                        <div className='apt-line' style={{ display: 'flex', flex: '1'  }}>
                            <div id="chat-form-lines-request-apt">
                            <label style={{ fontSize: "0.9rem", padding: "0 0 0 5px" }}>Date of Birth</label>
                            <Field
                                id={renderFieldBorder(state.errors.dob)}
                                style={{ borderRadius: '10px', paddingLeft: '5px' }}
                                type="tel"
                                name="dob"
                                component="input"
                                placeholder="MM/DD/YYYY"
                                format={formatDob} // Use the date of birth formatter
                                parse={parseDob} // Use the date of birth parser
                            />
                            <div style={{ marginBottom: '0.3rem' }}>
                                {renderError(state.errors.dob)}
                            </div>
                            </div>
                            <div id="chat-form-lines-request-apt">
                                <label style={{ fontSize: "0.9rem", padding: "0 0 0 5px" }}>Email</label>
                                <Field
                                    key="emailKey"
                                    id={renderFieldBorder(state.errors.email)}
                                    style={{ borderRadius: '10px', paddingLeft: '5px' }}
                                    name="email"
                                    component="input"
                                />
                                <div style={{ marginBottom: '0.3rem' }}>
                                    {renderError(state.errors.email)}
                                </div>
                                </div>
                        </div>





                       
                        <div id="chat-form-lines-request-apt">
                            <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', textAlign: "left" }}>
                                <label style={{ fontSize: "0.9rem", padding: "0 0 0 5px" }}>Additional Information</label>
                                <Field id={renderFieldBorder(state.errors.message)} style={{ border: 'none', borderRadius: '10px 10px 10px 10px', backgroundColor: "rgba(192,200,200, 25%)", zIndex: '10', width: '97%', paddingLeft: '5px', paddingTop: '5px' }} name="message" component="textarea" rows="5" />
                                {renderError(state.errors.message)}
                            </div>
                        </div>
                    </div>
                    {renderError(state.errors.errorMain)}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', margin: '0px 0px 0px 0px', padding: '0.2rem 0.5rem'  }} id="chat-middle-component">
                        <div style={{ displa: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div id="terms-and-policy">
                                <label>
                                <input
                                    type="checkbox"
                                    name="terms"
                                    style={{ transform: 'scale(2)' }}
                                    checked={state.agreeToTerms}
                                    onChange={handleAgreeChange}
                                />
                                </label>
                            </div>
                            <div style={{ fontSize: "0.9rem" }} id="terms-and-policy">
                                I have read and agreed to the Privacy Policy and Terms of Use and I am at least 13 and have the authority to make this appointment.
                            </div>
                            </div>
                            <div style={{ marginBottom: '0.3rem' }}>
                            {renderError(state.errors.agree)}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div id="terms-and-policy">
                                <label>
                                <input
                                    type="checkbox"
                                    name="termsText"
                                    style={{ transform: 'scale(2)' }}
                                    checked={state.agreeToTermsText}
                                    onChange={handleAgreeTextChange}
                                />
                                </label>
                            </div>
                            <div style={{ fontSize: "0.9rem" }} id="terms-and-policy">
                                I agree to receive text messages from this practice and understand that message frequency and data rates may apply.
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            {renderSendButton(values, state.errors, form)}
          </div>
        </form>
      )}
    />
  );
};

export default RequestAppointmentForm;
