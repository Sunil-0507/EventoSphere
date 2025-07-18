import React from 'react';

export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      {/* Contact Info */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-primary mb-4">Contact Us & Feedback</h1>
        <p className="text-lg text-gray-700 mb-2">Have questions or need support? We’re here to help.</p>

        <div className="mt-6 space-y-3 text-gray-800 text-base">
          <p><strong>Email:</strong> support@eventosphere.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Office Hours:</strong> Monday - Friday, 9:00 AM to 6:00 PM IST</p>
          <p><strong>Address:</strong> 2nd Floor, Innovate Hub, Hyderabad, Telangana, India</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-primary mb-6">Frequently Asked Questions (FAQs)</h2>
        <div className="space-y-6 text-gray-700">

          <div>
            <h3 className="text-xl font-semibold">How do I create an event?</h3>
            <p>You must be logged in to access the "Create Event" button in the header. Fill out the required details and submit your event. Once created, it will appear on the home page.</p>
          </div>

         

          <div>
            <h3 className="text-xl font-semibold">Where can I view my booked tickets?</h3>
            <p>After logging in, go to the "Wallet" section in the header to see all your booked tickets, download them, or delete them.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">How is EventoSphere promoting sustainability?</h3>
            <p>EventoSphere supports paperless, eco-friendly event management through QR code ticketing, digital invites.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Who can I contact for partnership opportunities?</h3>
            <p>Please email our partnership team at <strong>partners@eventosphere.com</strong>. We'll respond within 24–48 hours.</p>
          </div>
        </div>
      </div>

    
    </div>
  );
}
