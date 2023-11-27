class OfficeMailer < ApplicationMailer
    default from: 'unitymskwebsites@gmail.com' # Set your default sender email address
  
    def contact_us_email(form_data, cc_email)
      @form_data = form_data # Make the form data accessible in the email view template
      mail(to: 'unitymskwebsites@gmail.com',, cc: cc_email, subject: 'New Contact Form Submission')
    end

    def request_appointment_email(form_data, cc_email)
      @form_data = form_data # Make the form data accessible in the email view template
      mail(to: 'unitymskwebsites@gmail.com',, cc: cc_email, subject: 'New Request Appointment Form Submission')
    end
  end