
import React from 'react';
import { CheckCircle, Phone, MapPin, Users, Award, Eye, Target, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 lg:mb-12">About IJ Langa Consulting</h1>
          
          {/* Hero Image Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8 mb-8 lg:mb-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-full lg:w-1/2">
                <img 
                  src="/lovable-uploads/a3f20c56-4605-4c85-aee8-6315eef62701.png" 
                  alt="IJ Langa Consulting - Success Through Innovation" 
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl lg:text-3xl font-bold text-blue-600 mb-4">ABOUT US</h2>
                  <p className="text-gray-700 leading-relaxed">
                    IJ Langa Consulting (Pty) Ltd, established in 2014 is 100% Male, black-owned company, and is regulated by the Companies Act of South Africa and the South African Institute of Professional Accountants. The company was established in response to the need for black accountants in business management.
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We provide focused client value-added Accounting, Taxation, Statutory (Secretarial Services), B-BBEE and other related Financial Services. We are a medium-sized practice based in Pretoria East and committed to serving our clients via quality leadership through Professional Excellence.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Each client account is overseen by a partner and backed up by a professionally qualified team. Our clients see us as an integral part of their business.
                </p>
              </div>
            </div>
          </div>

          {/* Vision and Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 lg:mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
              <div className="flex items-center mb-4">
                <Eye className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-blue-600">Our Vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To be the most highly respected professional firm in the region where clients come for the peace of mind that their interests are being cared for by a team that enjoys working with them and one another.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-green-600">Our Mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To provide businesses, entrepreneurs and individuals with the highest quality accounting, tax planning and business advisory services delivered in a timely, efficient and innovative manner by a professional team that clearly enjoys working together to exceed their clients' needs. To serve our clients quality leadership through our Professional Excellence.
              </p>
            </div>
          </div>

          {/* Our Values Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8 mb-8 lg:mb-12">
            <div className="flex items-center mb-6">
              <Heart className="h-8 w-8 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-red-600">Our Values</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Professionalism',
                'Respect', 
                'Responsibility',
                'Accountability',
                'Honesty and Trustworthiness',
                'Integrity'
              ].map((value, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8 mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Why you should use IJ Langa Consulting to Register your company
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Award className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">We have been trading for 11 years</h3>
                    <p className="text-gray-600">
                      IJ Langa Consulting has provided company registration as its core business over eleven years. 
                      Our consistency in the marketplace means that we register one out of every twenty companies in South Africa.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-8 w-8 text-green-600 mt-1 flex-shrink-0" />
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
                  <Phone className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" />
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
                  <Users className="h-8 w-8 text-green-600 mt-1 flex-shrink-0" />
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

          <div className="bg-blue-600 text-white rounded-lg p-6 lg:p-8 text-center">
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
