import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, BookOpen, Users, Award, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Mentorship = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    program: 'Starter (R4,500)'
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.functions.invoke('send-form-email', {
        body: {
          formType: 'mentorship_enrollment',
          data: formData,
          recipientEmail: 'orders@ijlanga.co.za'
        }
      });

      if (error) throw error;

      toast({
        title: 'Request Submitted',
        description: "We'll contact you within 24 hours to discuss your mentorship program.",
      });

      setFormData({ name: '', email: '', phone: '', description: '', program: 'Starter (R4,500)' });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit request',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4">New — Structured Mentorship</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mentorship that builds businesses
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              From idea to compliance — IJ Langa Consulting's mentorship program teaches practical skills in bookkeeping, tax, compliance (SARS), company registration, and business growth.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                '3 / 6 / 12-month tracks',
                'Hands-on case studies',
                'SARS & VAT practicals',
                'Certificate & Alumni access'
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button size="lg" onClick={() => document.getElementById('enroll')?.scrollIntoView({ behavior: 'smooth' })}>
                View Programs
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}>
                Free Consultation
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Comparison</CardTitle>
              <CardDescription>Choose the right program for your goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Starter', duration: '3 months', sessions: '6 x 1:1', price: 'R4,500' },
                { name: 'Growth', duration: '6 months', sessions: '12 x 1:1', price: 'R8,500' },
                { name: 'Leadership', duration: '12 months', sessions: '24 x 1:1', price: 'R15,000' }
              ].map((program) => (
                <div key={program.name} className="p-4 border rounded-lg hover:border-primary transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{program.name}</h3>
                      <p className="text-sm text-muted-foreground">{program.duration} • {program.sessions} sessions</p>
                    </div>
                    <span className="font-bold text-primary">{program.price}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Programs & What You Get</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Starter',
              icon: <BookOpen className="h-10 w-10 text-primary" />,
              duration: '3 months',
              description: 'Business setup, basic bookkeeping, SARS intro, VAT & PAYE basics, case studies, quizzes.',
              features: ['6 x 1:1 sessions', '1 group webinar', 'Textbook + quizzes', 'Certificate']
            },
            {
              title: 'Growth',
              icon: <TrendingUp className="h-10 w-10 text-primary" />,
              duration: '6 months',
              description: 'Advanced bookkeeping, tax planning, CIPC/NHBRC/CIDB compliance, monthly masterclasses.',
              features: ['12 x 1:1 sessions', 'Monthly masterclasses', 'Advanced case studies', 'Priority support']
            },
            {
              title: 'Leadership',
              icon: <Award className="h-10 w-10 text-primary" />,
              duration: '12 months',
              description: 'Advanced advisory, leadership training, investor prep, quarterly workshops, alumni networking.',
              features: ['24 x 1:1 sessions', 'Quarterly workshops', 'Investor preparation', 'Alumni network']
            }
          ].map((program) => (
            <Card key={program.title}>
              <CardHeader>
                <div className="mb-4">{program.icon}</div>
                <CardTitle>{program.title}</CardTitle>
                <CardDescription>{program.duration}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{program.description}</p>
                <ul className="space-y-2">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Modules Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Modules Covered</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: 1, title: 'Preparing to Start a Business', desc: 'Market research • Mini business plan' },
              { num: 2, title: 'Registering with CIPC', desc: 'Business structures • SARS registrations' },
              { num: 3, title: 'Compliance & Licensing', desc: 'UIF, COIDA, NHBRC basics' },
              { num: 4, title: 'Bookkeeping', desc: 'Financial statements • Payroll' },
              { num: 5, title: 'Tax: VAT', desc: 'Income tax • Provisional tax' },
              { num: 6, title: 'Returns & Payments', desc: 'EMP501 • VAT201 • IRP6' }
            ].map((module) => (
              <Card key={module.num}>
                <CardHeader>
                  <Badge className="w-fit mb-2">Module {module.num}</Badge>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <CardDescription>{module.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What Mentees Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: 'Nomfundo M.', text: 'IJ Langa helped me register my company and understand VAT — the mentorship was practical and fast.' },
            { name: 'Thabo P.', text: 'The case studies were the best part — real problems with real solutions.' }
          ].map((testimonial) => (
            <Card key={testimonial.name}>
              <CardContent className="pt-6">
                <p className="mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold">— {testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Enrollment Form */}
      <section id="consultation" className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Get Started — Free Consultation</CardTitle>
              <CardDescription>
                Tell us about your goals and we'll recommend the best track.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Full name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email address"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Phone (e.g. 013 004 0620)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Select value={formData.program} onValueChange={(value) => setFormData({ ...formData, program: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Starter (R4,500)">Starter (R4,500)</SelectItem>
                      <SelectItem value="Growth (R8,500)">Growth (R8,500)</SelectItem>
                      <SelectItem value="Leadership (R15,000)">Leadership (R15,000)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Textarea
                    rows={3}
                    placeholder="Short description of your business or goals"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Submitting...' : 'Request Consultation'}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  We'll contact you within 24 hours.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Enroll?</h3>
          <p className="mb-6">Email: order@ijlanga.co.za • Phone: 013 004 0620</p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Call Us Now
            </Button>
            <Button size="lg" variant="outline">
              Email Inquiry
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mentorship;