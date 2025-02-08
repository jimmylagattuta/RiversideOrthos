class OfficeMailer < ApplicationMailer
  default from: 'unitymskwebsites@gmail.com' # Set your default sender email address

  def contact_us_email(form_data, cc_emails)
    @form_data = form_data # Make the form data accessible in the email view template
    mail(to: 'unitymskwebsites@gmail.com', cc: cc_emails, subject: 'OAR: New Contact Form Submission')
  end

  def request_appointment_email(form_data, cc_emails)
    @form_data = form_data # Make the form data accessible in the email view template
    mail(to: 'unitymskwebsites@gmail.com', cc: cc_emails, subject: 'OAR: New Request Appointment Form Submission')
  end

  def alert_no_reviews_email
    mail(to: 'moaoarpages@gmail.com', subject: 'Alert: No Reviews Found')
  end

  def error_email(type, description)
    @type = type
    @description = description
    mail(to: 'moaoarpages@gmail.com', subject: "#{type} - OAR: Error Notification", body: "#{type}: #{@description}")
  end
end
