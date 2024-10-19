import React from 'react';
import './ForesightSquareNew.css';
import MorphingFont from './MorphingFont';

const ForesightSquareNew = ({ togglePopup }) => {
    return (
        <div className="full-screen-popup-new">
            <article className="popup-article-new">
                <div className="popup-form-new">
                    <div className="popup-header-new">
                        <button onClick={togglePopup} className="popup-close-button-new">
                            <i className="fas fa-times"></i> {/* Close icon */}
                        </button>
                        <h4 className="popup-alert-new">* You need to bring these forms finished on your first visit.</h4>
                    </div>

                    {/* Registration Form */}
                    <div className="popup-section-new">
                        <div className="popup-section-header-new">
                            <h4 className="popup-subheader-new">Download</h4>
                            <MorphingFont texts={["Registration Form", "Formulario de Registro de Pacientes"]} />
                        </div>
                        <div className="popup-buttons-new">
                            <a className="popup-button-new" href={process.env.PUBLIC_URL + '/Registration.pdf'} target="_blank" rel="noopener noreferrer">
                                English
                            </a>
                            <a className="popup-button-new" href={process.env.PUBLIC_URL + '/RegistrationSpanish.pdf'} target="_blank" rel="noopener noreferrer">
                                Español
                            </a>
                        </div>
                    </div>

                    {/* Authorization Form */}
                    <div className="popup-section-new">
                        <div className="popup-section-header-new">
                            <h4 className="popup-subheader-new">Download</h4>
                            <MorphingFont texts={["Authorization Form", "Formulario de Autorización"]} />
                        </div>
                        <div className="popup-buttons-new">
                            <a className="popup-button-new" href={process.env.PUBLIC_URL + '/DAR.pdf'} target="_blank" rel="noopener noreferrer">
                                English
                            </a>
                            <a className="popup-button-new" href={process.env.PUBLIC_URL + '/DARSpanish.pdf'} target="_blank" rel="noopener noreferrer">
                                Español
                            </a>
                        </div>
                    </div>

                    {/* Release Form */}
                    <div className="popup-section-new">
                        <div className="popup-section-header-new">
                            <h4 className="popup-subheader-new">Download</h4>
                            <MorphingFont texts={["Release Form", "Formulario de Exención"]} />
                        </div>
                        <div className="popup-buttons-new">
                            <a className="popup-button-new" href={process.env.PUBLIC_URL + '/authorization.pdf'} target="_blank" rel="noopener noreferrer">
                                English (Release)
                            </a>
                            <a className="popup-button-new" href={process.env.PUBLIC_URL + '/authorizationSpanish.pdf'} target="_blank" rel="noopener noreferrer">
                                Español (Lanzamiento)
                            </a>
                        </div>
                    </div>

                    {/* Medical History */}
                    <div className="popup-section-new">
                        <div className="popup-section-header-new">
                            <h4 className="popup-subheader-new">Download</h4>
                            <MorphingFont texts={["Medical History", "Historial Médico"]} />
                        </div>
                        <div className="popup-buttons-new">
                            <a className="popup-button-new" href={process.env.PUBLIC_URL + '/MedHistory.pdf'} target="_blank" rel="noopener noreferrer">
                                English
                            </a>
                            <a className="popup-button-new" href={process.env.PUBLIC_URL + '/MedHistorySpanish.pdf'} target="_blank" rel="noopener noreferrer">
                                Español
                            </a>
                        </div>
                    </div>

                    {/* Privacy Form */}
                    <div className="popup-section-new">
                        <div className="popup-section-header-new">
                            <h4 className="popup-subheader-new">Download</h4>
                            <MorphingFont texts={["Privacy Form", "Formulario de Privacidad"]} />
                        </div>
                        <div className="popup-buttons-new">
                            <a className="popup-button-new" href={process.env.PUBLIC_URL + '/PrivacyNotice.pdf'} target="_blank" rel="noopener noreferrer">
                                English (HIPAA)
                            </a>
                            <a className="popup-button-new" href={process.env.PUBLIC_URL + '/PrivacyNoticeSpanish.pdf'} target="_blank" rel="noopener noreferrer">
                                Español (HIPAA)
                            </a>
                        </div>
                    </div>

                    {/* Financial Form */}
                    <div className="popup-section-new">
                        <div className="popup-section-header-new">
                            <h4 className="popup-subheader-new">Download</h4>
                            <MorphingFont texts={["Financial Form", "Forma Financiera"]} />
                        </div>
                        <div className="popup-buttons-new">
                            <a className="popup-button-new" href={process.env.PUBLIC_URL + '/FinancialPolicy.pdf'} target="_blank" rel="noopener noreferrer">
                                English
                            </a>
                            <a className="popup-button-new" href={process.env.PUBLIC_URL + '/FinancialPolicySpanish.pdf'} target="_blank" rel="noopener noreferrer">
                                Español
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default ForesightSquareNew;
