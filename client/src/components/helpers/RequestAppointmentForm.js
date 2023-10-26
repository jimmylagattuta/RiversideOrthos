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
    const formData = {
      ...values,
      recaptcha: state.recaptchaChecked,
      agreeToTerms: state.agreeToTerms,
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
    const shouldDisable = (
      !values.fName ||
      !values.lName ||
      !values.email ||
      !values.phone ||
      !values.message ||
      !state.recaptchaChecked ||
      !state.agreeToTerms
    );

    const buttonClass = shouldDisable ? 'chat-box-button' : (Object.keys(errors).length === 0 ? 'chat-box-button-ready' : 'chat-box-button-blue');

    return (
      <button
        id="chat-box-button"
        onClick={(e) => {
          e.preventDefault();
          if (shouldDisable) {
            setState({ ...state, showAllErrors: true });
          } else {
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
        type="submit"
        className={buttonClass}
      >
        SEND
      </button>
    );
  };

  const renderFieldBorder = (error) => {
    return !error || !state.showAllErrors ? "field-id" : "field-id-red";
  };
  const handleCloseForm = () => {
    console.log('handleCloseForm');
    setIsFormVisible(false);
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
          errors.agree = 'Please Agree To Terms & Conditions';
        }

        if (!values.message) {
          errors.message = "Message is empty";
        } else if (values.message.length > 2000) {
          errors.message = "Message is too long";
        }

        if (!state.recaptchaChecked) {
          errors.recaptcha = "Please Prove You're Not A Robot";
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
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
          onSubmit={handleSubmit}
        >
          <div className="form-title">
            <p className="title-request-appointment">
                    Appointment Request
            </p>
            <button className="close-button" onClick={handleCloseForm}>x</button>
          </div>
          <div style={{ maxWidth: '60%', alignSelf: 'center', padding: '10px 10px 0px 10px', backgroundColor: 'white' }} id="chatbox-div">
            <div id="chat-middle-component-request-apt">
              <div id="middle-form-top-div">
                <div id="chat-form-top-div">
                  <div id="chat-form-inner-div">
                    <div id="chat-form-lines">
                      <Field
                        key="fNameKey"
                        id={renderFieldBorder(state.errors.fName)}
                        style={{ borderRadius: '10px' }}
                        name="fName"
                        component="input"
                        placeholder="First Name"
                      />
                      <div style={{ marginBottom: '0.3rem' }}>
                        {renderError(state.errors.fName)}
                      </div>
                    </div>
                    <div id="chat-form-lines">
                      <Field
                        key="lNameKey"
                        id={renderFieldBorder(state.errors.lName)}
                        style={{ borderRadius: '10px' }}
                        name="lName"
                        component="input"
                        placeholder="Last Name"
                      />
                      <div style={{ marginBottom: '0.3rem' }}>
                        {renderError(state.errors.lName)}
                      </div>
                    </div>
                    <div id="chat-form-lines">
                      <Field
                        key="emailKey"
                        id={renderFieldBorder(state.errors.email)}
                        style={{ borderRadius: '10px' }}
                        name="email"
                        component="input"
                        placeholder="Email address"
                      />
                      <div style={{ marginBottom: '0.3rem' }}>
                        {renderError(state.errors.email)}
                      </div>
                    </div>
                    <div id="chat-form-lines">
                      <Field
                        id={renderFieldBorder(state.errors.phone)}
                        style={{ padding: '0.5rem', borderRadius: '10px' }}
                        type="tel"
                        name="phone"
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
                  {renderError(state.errors.errorMain)}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }} id="chat-middle-component">
              <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                <Field id={renderFieldBorder(state.errors.message)} style={{ resize: 'none', border: 'none', borderRadius: '10px 10px 10px 10px', backgroundColor: "rgba(192,200,200, 25%)", zIndex: '10', width: '90%', padding: '0.5rem 0.5rem 0rem 0.5rem' }} name="message" component="textarea" rows="5" placeholder="Comments" />
                {renderError(state.errors.message)}
              </div>
              <div style={{ displa: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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
                  <div id="terms-and-policy">
                    By clicking I understand and agree that any information submitted will be forwarded to our office by email and not via a secure messaging system. This form should not be used to transmit private health information, and we disclaim all warranties with respect to the privacy and confidentiality of any information submitted through this form.
                  </div>
                </div>
                <div style={{ marginBottom: '0.3rem' }}>
                  {renderError(state.errors.agree)}
                </div>
              </div>
              <div style={{ marginBottom: '0.3rem' }}>
                {renderError(state.errors.recaptcha)}
              </div>
            </div>
          </div>
          {renderSendButton(values, state.errors, form)}
        </form>
      )}
    />
  );
};

export default RequestAppointmentForm;
