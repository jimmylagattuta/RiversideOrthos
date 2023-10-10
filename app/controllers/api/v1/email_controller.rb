class Api::V1::EmailController < ApplicationController
    def send_email
        # Extract the form data from the request
        form_data = email_params

        # Validate the form data (if needed)
        # ...

        # Send the email using Action Mailer
        if send_email_to_office(form_data)
          render json: { message: "Email sent successfully" }, status: :ok
        else
          render json: { error: "Email sending failed" }, status: :unprocessable_entity
        end
      end

      private

      def email_params
        params.permit(:fName, :lName, :email, :phone, :message, :recaptcha, :agreeToTerms)
      end

      def send_email_to_office(form_data)
        # Implement your email sending logic here using Action Mailer
        # Use the form_data to construct the email content

        # Example (you should customize this):
        OfficeMailer.contact_us_email(form_data).deliver_now

        # Return true if the email was sent successfully, or false otherwise
        true
      rescue StandardError => e
        # Handle any exceptions that occur during email sending
        Rails.logger.error("Email sending error: #{e.message}")
        false
      end
end
