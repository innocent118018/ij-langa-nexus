
import React from 'react';
import { CheckCircle, Phone, MapPin, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">About IJ Langa Consulting</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Why you should use IJ Langa Consulting to Register your company
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Award className="h-8 w-8 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">We have been trading for 22 years</h3>
                    <p className="text-gray-600">
                      IJ Langa Consulting has provided company registration as its core business over twenty two years. 
                      Our consistency in the marketplace means that we register one out of every twenty companies in South Africa.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-8 w-8 text-green-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">We have the largest online presence</h3>
                    <p className="text-gray-600">
                      Our site is entirely dynamic and linked directly in with our back office. This means that you know 
                      what is happening with your company at all times. You can also track your order with your cell phone.
                    </p>
                    <p className="text-gray-600 mt-2">
                      All your past purchases are listed for you, along with important documents, under your personal login. 
                      We also store all your final company documents online in digital format meaning that five years from 
                      now you could still log on to our system and download a copy of your company documents.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-8 w-8 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">We are a real business with real offices and call centre</h3>
                    <p className="text-gray-600">
                      Many competitive companies to us do not have offices or a call centre. We have a proper call centre 
                      of six consultants ready to take your call Monday to Friday, who have immediate access to your 
                      information, faxes and ID's so they can answer any queries.
                    </p>
                    <p className="text-gray-600 mt-2">
                      They operate from 8:30 am to 4:30 pm from Monday to Friday. We are located in 79 Teka Takho, 
                      Kabokweni, Nelspruit, 1245.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Users className="h-8 w-8 text-green-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">We provide a back office service to many of the Banks</h3>
                    <p className="text-gray-600">
                      Both ABSA and Nedbank use our service to register companies for their clients. This means that you 
                      can go in to your local branch, speak to the Business Banker and they will use our service to 
                      register your company for you.
                    </p>
                    <p className="text-gray-600 mt-2">
                      Standard Bank has also provided a portal to IJ Langa Consulting through their Bizconnect site. 
                      If they are using us, then why not you? You can register through us directly online without going 
                      through the bank.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg mb-6">
              Join thousands of satisfied customers who trust IJ Langa Consulting for their business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started Today
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
