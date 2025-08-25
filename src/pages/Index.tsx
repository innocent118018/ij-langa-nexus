
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Users, Award, Clock, Shield, Scale, Building2, FileCheck, Star, Phone, Mail, MapPin, TrendingUp, Globe, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Badge variant="outline" className="border-amber-400 text-amber-400 bg-amber-400/10 text-sm px-4 py-2">
              <Scale className="w-4 h-4 mr-2" />
              22+ Years of Legal Excellence
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-gray-100 to-amber-100 bg-clip-text text-transparent leading-tight">
            Your Trusted
            <span className="block text-amber-400">Legal Partner</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-300 leading-relaxed">
            Professional company registration, tax compliance, and business solutions 
            with over two decades of expertise in South African corporate law
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/pricing">
              <Button size="lg" className="bg-amber-500 text-slate-900 hover:bg-amber-400 text-lg px-8 py-4 h-auto font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Building2 className="mr-3 h-6 w-6" />
                Start Your Business Today
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 text-lg px-8 py-4 h-auto font-semibold transition-all duration-300">
                <FileCheck className="mr-3 h-6 w-6" />
                Our Expertise
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">22+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">5000+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Companies Registered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">99%</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">24/7</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4 text-slate-600">
              <Shield className="w-4 h-4 mr-2" />
              Comprehensive Legal Services
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Everything Your Business Needs
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              From company registration to tax compliance, we provide end-to-end legal solutions 
              that help your business thrive in South Africa's regulatory environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-900">Company Registration</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-slate-600 mb-6 line-clamp-3">
                  Complete company registration services including Pty Ltd, NPO, and specialized business structures
                </p>
                <Link to="/services/register/company">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0 h-auto font-semibold">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileCheck className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-900">SARS Services</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-slate-600 mb-6 line-clamp-3">
                  Tax clearance, VAT registration, PAYE, and comprehensive SARS compliance solutions
                </p>
                <Link to="/services/sars/tax-clearance">
                  <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 p-0 h-auto font-semibold">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-900">Compliance</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-slate-600 mb-6 line-clamp-3">
                  Annual returns, BEE certificates, CSD registration, and ongoing compliance management
                </p>
                <Link to="/services/other/annual-returns">
                  <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 p-0 h-auto font-semibold">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-slate-900">Business Packages</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-slate-600 mb-6 line-clamp-3">
                  Complete business setup packages tailored to your industry and growth objectives
                </p>
                <Link to="/pricing">
                  <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 p-0 h-auto font-semibold">
                    View Packages <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Register Your Company?
            </h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of successful businesses who chose IJ Langa Consulting for their legal needs
            </p>
            <Link to="/pricing">
              <Button size="lg" className="bg-amber-500 text-slate-900 hover:bg-amber-400 font-semibold">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Enhanced */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4 text-slate-600">
              <Award className="w-4 h-4 mr-2" />
              Why Choose IJ Langa Consulting
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Your Success is Our Priority
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">22+ Years Experience</h3>
              <p className="text-slate-600 leading-relaxed">
                Over two decades of expertise in South African business law, corporate registration, and compliance management
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Trusted by Banks</h3>
              <p className="text-slate-600 leading-relaxed">
                ABSA, Nedbank, and Standard Bank trust our services for their clients' business registration needs
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Fast & Reliable</h3>
              <p className="text-slate-600 leading-relaxed">
                Quick turnaround times with professional support throughout your business journey
              </p>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-amber-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-slate-700 font-medium mb-6 italic">
              "IJ Langa Consulting made our company registration process seamless. Their expertise and professionalism are unmatched in the industry."
            </blockquote>
            <div className="text-slate-600">
              <div className="font-semibold">Sarah Mitchell</div>
              <div className="text-sm">CEO, TechStart Solutions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="border-amber-400 text-amber-400 bg-amber-400/10 mb-6">
                <Globe className="w-4 h-4 mr-2" />
                Get in Touch
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's Discuss Your
                <span className="block text-amber-400">Business Needs</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Ready to take the next step? Our legal experts are here to guide you through every aspect of your business setup and compliance requirements.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="font-semibold">Call Us</div>
                    <div className="text-gray-300">+27 1300 40 620</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="font-semibold">Email Us</div>
                    <div className="text-gray-300">info@ijlanga.co.za</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="font-semibold">Visit Us</div>
                    <div className="text-gray-300">79 TekaTakho, Kabokwen, Nelspruit 1200</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:text-right">
              <div className="inline-block">
                <Link to="/auth">
                  <Button size="lg" className="bg-amber-500 text-slate-900 hover:bg-amber-400 text-lg px-12 py-6 h-auto font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 mb-6">
                    <Users className="mr-3 h-6 w-6" />
                    Get Started Today
                  </Button>
                </Link>
                <div className="block">
                  <Link to="/pricing">
                    <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 text-lg px-12 py-6 h-auto font-semibold transition-all duration-300">
                      View Our Services
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
