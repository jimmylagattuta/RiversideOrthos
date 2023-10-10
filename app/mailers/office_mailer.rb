class OfficeMailer < ApplicationMailer
    default from: 'unitymskwebsites@gmail.com' # Set your default sender email address
  
    # Method for sending the contact form submission email
    def contact_us_email(form_data)
      puts "contact_us_email"
      puts "form_data"
      puts form_data.inspect
      @form_data = form_data # Make the form data accessible in the email view template
      puts "@form_data"
      puts @form_data.inspect
      mail(to: 'unitymskwebsites@gmail.com', subject: 'New Contact Form Submission')
    end
  end
  