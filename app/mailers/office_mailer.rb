class OfficeMailer < ApplicationMailer
    default from: 'unitymskwebsite@gmail.com' # Set your default sender email address
  
    # Method for sending the contact form submission email
    def contact_us_email(form_data)
      @form_data = form_data # Make the form data accessible in the email view template
      mail(to: 'unitymskwebsites@gmail.com.com', subject: 'New Contact Form Submission')
    end
  end
  