import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PurchaseFormRequest {
  service: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    processing_time?: string;
    requirements?: string;
  };
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    alternativePhone: string;
    companyName: string;
    registrationNumber: string;
    vatNumber: string;
    industry: string;
    companySize: string;
    physicalAddress: string;
    postalAddress: string;
    city: string;
    province: string;
    postalCode: string;
    urgency: string;
    preferredStartDate: string;
    additionalServices: string[];
    specialRequirements: string;
    documentsAvailable: string[];
    missingDocuments: string;
    budgetRange: string;
    paymentMethod: string;
    referralSource: string;
    additionalNotes: string;
    marketingConsent: boolean;
    termsAccepted: boolean;
  };
  isQuote: boolean;
  submissionDate: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { service, formData, isQuote, submissionDate }: PurchaseFormRequest = await req.json();

    const orderType = isQuote ? "Quote Request" : "Purchase Order";
    const priceDisplay = service.price > 0 
      ? `R${Math.round(service.price * 1.15).toLocaleString()} (incl. VAT)` 
      : "Custom Quote";

    // Format additional services
    const additionalServicesText = formData.additionalServices.length > 0 
      ? formData.additionalServices.join(", ") 
      : "None";

    // Create comprehensive email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="color: #333; margin: 0 0 10px 0;">${orderType} - ${service.name}</h1>
          <p style="color: #666; margin: 0;">Submitted on: ${new Date(submissionDate).toLocaleDateString('en-ZA')} at ${new Date(submissionDate).toLocaleTimeString('en-ZA')}</p>
        </div>

        <div style="background: white; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 20px;">
          <div style="background: #007bff; color: white; padding: 15px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Service Details</h2>
          </div>
          <div style="padding: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 30%;">Service Name:</td>
                <td style="padding: 8px 0;">${service.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Category:</td>
                <td style="padding: 8px 0;">${service.category}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Price:</td>
                <td style="padding: 8px 0;">${priceDisplay}</td>
              </tr>
              ${service.processing_time ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Processing Time:</td>
                <td style="padding: 8px 0;">${service.processing_time}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Description:</td>
                <td style="padding: 8px 0;">${service.description}</td>
              </tr>
            </table>
          </div>
        </div>

        <div style="background: white; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 20px;">
          <div style="background: #28a745; color: white; padding: 15px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Contact Information</h2>
          </div>
          <div style="padding: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 30%;">Name:</td>
                <td style="padding: 8px 0;">${formData.firstName} ${formData.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${formData.email}">${formData.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0;"><a href="tel:${formData.phone}">${formData.phone}</a></td>
              </tr>
              ${formData.alternativePhone ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Alternative Phone:</td>
                <td style="padding: 8px 0;"><a href="tel:${formData.alternativePhone}">${formData.alternativePhone}</a></td>
              </tr>
              ` : ''}
            </table>
          </div>
        </div>

        ${formData.companyName ? `
        <div style="background: white; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 20px;">
          <div style="background: #17a2b8; color: white; padding: 15px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Company Information</h2>
          </div>
          <div style="padding: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 30%;">Company Name:</td>
                <td style="padding: 8px 0;">${formData.companyName}</td>
              </tr>
              ${formData.registrationNumber ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Registration Number:</td>
                <td style="padding: 8px 0;">${formData.registrationNumber}</td>
              </tr>
              ` : ''}
              ${formData.vatNumber ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">VAT Number:</td>
                <td style="padding: 8px 0;">${formData.vatNumber}</td>
              </tr>
              ` : ''}
              ${formData.industry ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Industry:</td>
                <td style="padding: 8px 0;">${formData.industry}</td>
              </tr>
              ` : ''}
              ${formData.companySize ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Company Size:</td>
                <td style="padding: 8px 0;">${formData.companySize}</td>
              </tr>
              ` : ''}
            </table>
          </div>
        </div>
        ` : ''}

        ${(formData.physicalAddress || formData.city) ? `
        <div style="background: white; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 20px;">
          <div style="background: #fd7e14; color: white; padding: 15px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Address Information</h2>
          </div>
          <div style="padding: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              ${formData.physicalAddress ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 30%; vertical-align: top;">Physical Address:</td>
                <td style="padding: 8px 0;">${formData.physicalAddress.replace(/\n/g, '<br>')}</td>
              </tr>
              ` : ''}
              ${formData.postalAddress ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Postal Address:</td>
                <td style="padding: 8px 0;">${formData.postalAddress.replace(/\n/g, '<br>')}</td>
              </tr>
              ` : ''}
              ${formData.city ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">City:</td>
                <td style="padding: 8px 0;">${formData.city}</td>
              </tr>
              ` : ''}
              ${formData.province ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Province:</td>
                <td style="padding: 8px 0;">${formData.province}</td>
              </tr>
              ` : ''}
              ${formData.postalCode ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Postal Code:</td>
                <td style="padding: 8px 0;">${formData.postalCode}</td>
              </tr>
              ` : ''}
            </table>
          </div>
        </div>
        ` : ''}

        <div style="background: white; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 20px;">
          <div style="background: #6610f2; color: white; padding: 15px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Service Requirements</h2>
          </div>
          <div style="padding: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              ${formData.urgency ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 30%;">Urgency Level:</td>
                <td style="padding: 8px 0;">${formData.urgency}</td>
              </tr>
              ` : ''}
              ${formData.preferredStartDate ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Preferred Start Date:</td>
                <td style="padding: 8px 0;">${formData.preferredStartDate}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Additional Services:</td>
                <td style="padding: 8px 0;">${additionalServicesText}</td>
              </tr>
              ${formData.specialRequirements ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Special Requirements:</td>
                <td style="padding: 8px 0;">${formData.specialRequirements.replace(/\n/g, '<br>')}</td>
              </tr>
              ` : ''}
            </table>
          </div>
        </div>

        ${(!isQuote && (formData.budgetRange || formData.paymentMethod)) ? `
        <div style="background: white; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 20px;">
          <div style="background: #dc3545; color: white; padding: 15px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Budget and Payment</h2>
          </div>
          <div style="padding: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              ${formData.budgetRange ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 30%;">Budget Range:</td>
                <td style="padding: 8px 0;">${formData.budgetRange}</td>
              </tr>
              ` : ''}
              ${formData.paymentMethod ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Preferred Payment Method:</td>
                <td style="padding: 8px 0;">${formData.paymentMethod}</td>
              </tr>
              ` : ''}
            </table>
          </div>
        </div>
        ` : ''}

        ${(formData.referralSource || formData.additionalNotes) ? `
        <div style="background: white; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 20px;">
          <div style="background: #6c757d; color: white; padding: 15px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Additional Information</h2>
          </div>
          <div style="padding: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              ${formData.referralSource ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 30%;">Referral Source:</td>
                <td style="padding: 8px 0;">${formData.referralSource}</td>
              </tr>
              ` : ''}
              ${formData.additionalNotes ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Additional Notes:</td>
                <td style="padding: 8px 0;">${formData.additionalNotes.replace(/\n/g, '<br>')}</td>
              </tr>
              ` : ''}
            </table>
          </div>
        </div>
        ` : ''}

        <div style="background: white; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 20px;">
          <div style="background: #343a40; color: white; padding: 15px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Consent and Legal</h2>
          </div>
          <div style="padding: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 30%;">Marketing Consent:</td>
                <td style="padding: 8px 0;">${formData.marketingConsent ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Terms Accepted:</td>
                <td style="padding: 8px 0; color: green;">✓ Yes</td>
              </tr>
            </table>
          </div>
        </div>

        <div style="background: #e9ecef; padding: 20px; border-radius: 8px; text-align: center;">
          <h3 style="color: #333; margin: 0 0 10px 0;">Next Steps</h3>
          <p style="color: #666; margin: 0;">
            Thank you for your ${isQuote ? 'quote request' : 'order'}. 
            Our team will review the information and contact you within 24 hours to discuss the next steps.
          </p>
        </div>
      </div>
    `;

    // Send email to orders@ijlanga.co.za
    const emailResponse = await resend.emails.send({
      from: "IJ Langa Orders <orders@ijlanga.co.za>",
      to: ["orders@ijlanga.co.za"],
      subject: `${orderType}: ${service.name} - ${formData.firstName} ${formData.lastName}`,
      html: emailContent,
    });

    // Send confirmation email to customer
    const confirmationEmail = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #007bff; margin: 0;">IJ Langa Consulting</h1>
          <p style="color: #666; margin: 5px 0 0 0;">Professional Business Services</p>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #333; margin: 0 0 15px 0;">Thank you for your ${orderType.toLowerCase()}!</h2>
          <p style="color: #666; margin: 0;">
            We have received your ${orderType.toLowerCase()} for <strong>${service.name}</strong> 
            and will contact you within 24 hours to discuss the next steps.
          </p>
        </div>

        <div style="background: white; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h3 style="color: #333; margin: 0 0 15px 0;">Request Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 40%;">Service:</td>
              <td style="padding: 8px 0;">${service.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Price:</td>
              <td style="padding: 8px 0;">${priceDisplay}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Submitted:</td>
              <td style="padding: 8px 0;">${new Date(submissionDate).toLocaleDateString('en-ZA')} at ${new Date(submissionDate).toLocaleTimeString('en-ZA')}</td>
            </tr>
          </table>
        </div>

        <div style="background: #e7f3ff; border: 1px solid #b3d9ff; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h3 style="color: #0066cc; margin: 0 0 10px 0;">What happens next?</h3>
          <ul style="color: #333; margin: 0; padding-left: 20px;">
            <li>Our team will review your request within 24 hours</li>
            <li>We'll contact you to discuss requirements and timeline</li>
            <li>${isQuote ? 'We\'ll provide a detailed quote for your approval' : 'We\'ll confirm your order and arrange payment'}</li>
            <li>Once approved, we'll begin work on your project</li>
          </ul>
        </div>

        <div style="text-align: center; color: #666;">
          <p>If you have any questions, please contact us:</p>
          <p>
            📧 <a href="mailto:orders@ijlanga.co.za" style="color: #007bff;">orders@ijlanga.co.za</a><br>
            📞 <a href="tel:+27123456789" style="color: #007bff;">+27 (0) 12 345 6789</a>
          </p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "IJ Langa Consulting <orders@ijlanga.co.za>",
      to: [formData.email],
      subject: `${orderType} Confirmation - ${service.name}`,
      html: confirmationEmail,
    });

    console.log("Purchase form emails sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: `${orderType} submitted successfully` 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in send-purchase-form function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);