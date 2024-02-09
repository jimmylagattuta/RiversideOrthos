class Api::V1::EmailController < ApplicationController
  def send_email
    form_data = email_params
    if send_email_to_office(form_data)
      render json: { message: "Email sent successfully" }, status: :ok
    else
      render json: { error: "Email sending failed" }, status: :unprocessable_entity
    end
  end

  private

  def email_params
    params.permit(:fName, :lName, :email, :phone, :message, :recaptcha, :agreeToTerms, :dob, :agreeToTermsTexts, :selectedPatientType, :selectedSex, :selectedLocation, :selectedProvider)
  end

  def send_email_to_office(form_data)
    # cc_email = 'tguerrero@laorthos.com'
    cc_email = 'unitymskwebsites@gmail.com'

    if form_data[:dob]
      if form_data[:agreeToTermsTexts]
        # texter wireup
        puts "Texter"
      end
      OfficeMailer.request_appointment_email(form_data, cc_email).deliver_now
    else
      OfficeMailer.contact_us_email(form_data, cc_email).deliver_now
    end

    true
  rescue StandardError => e
    Rails.logger.error("Email sending error: #{e.message}")
    false
  end
end
