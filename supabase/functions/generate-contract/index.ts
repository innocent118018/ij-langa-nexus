import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow, AlignmentType, WidthType } from "npm:docx@8.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContractRequest {
  productId: string;
  productName: string;
  price: number;
  unit: string;
  billing: string;
  category: string;
  features?: string[];
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerIdNo?: string;
  businessName?: string;
  businessReg?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error("Unauthorized");
    }

    const requestData: ContractRequest = await req.json();
    console.log("Generating contract for:", requestData);

    // Generate contract number
    const { data: contractNumber, error: rpcError } = await supabaseClient.rpc("generate_contract_number");
    if (rpcError) throw rpcError;

    console.log("Generated contract number:", contractNumber);

    // Create DOCX document
    const today = new Date().toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
    
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // Title
          new Paragraph({
            children: [
              new TextRun({
                text: "SERVICE CONTRACT & POLICIES",
                bold: true,
                size: 40,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "IJ Langa Consulting (Pty) Ltd",
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [new TextRun({ text: `Date of Issue: ${today}`, size: 22 })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          // Parties Section
          new Paragraph({
            children: [new TextRun({ text: "PARTIES", bold: true, size: 24 })],
            spacing: { after: 200 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: "Supplier", bold: true })],
                    width: { size: 50, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: "Buyer / Customer", bold: true })],
                    width: { size: 50, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph("IJ Langa Consulting (Pty) Ltd"),
                      new Paragraph("Reg/Ref: SAIBA16176"),
                      new Paragraph("Address: 79 TekaTakho, Kabokwen, Nelspruit 1200"),
                      new Paragraph("Email: info@ijlanga.co.za | Phone: +27 13 004 0620"),
                      new Paragraph("Website: www.ijlanga.co.za"),
                      new Paragraph("Bank: Standard Bank, Branch: Ermelo (2844)"),
                      new Paragraph("Account: 10186883984 (Current), SWIFT: SBZAZAJJ"),
                      new Paragraph("Payment gateway: iKhokha"),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(`Full Names & Surname: ${requestData.customerName || "________________________"}`),
                      new Paragraph(`ID/Passport No.: ${requestData.customerIdNo || "________________________"}`),
                      new Paragraph(`Email: ${requestData.customerEmail || "________________________"}`),
                      new Paragraph(`Mobile: ${requestData.customerPhone || "________________________"}`),
                      new Paragraph(`Business Name (optional): ${requestData.businessName || "________________________"}`),
                      new Paragraph(`Business Registration (if any): ${requestData.businessReg || "________________________"}`),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: "", spacing: { after: 300 } }),

          // Service Order Section
          new Paragraph({
            children: [new TextRun({ text: "SERVICE ORDER", bold: true, size: 24 })],
            spacing: { after: 200 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Service Order / Contract No.")] }),
                  new TableCell({ children: [new Paragraph(contractNumber)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Service / Product Purchased")] }),
                  new TableCell({ children: [new Paragraph(requestData.productName)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Pricing & Billing")] }),
                  new TableCell({ 
                    children: [new Paragraph(`Price: R${requestData.price.toFixed(2)} ${requestData.unit || ""} | Billing: ${requestData.billing} | VAT: As indicated on invoice`)] 
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: "", spacing: { after: 300 } }),

          // Key Terms
          new Paragraph({
            children: [new TextRun({ text: "KEY TERMS", bold: true, size: 24 })],
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: "This contract is governed by South African law (including ECTA, CPA & POPIA). By signing or accepting electronically, you consent to recurring debits where applicable via iKhokha. Month-to-month services can be cancelled with 30 days' notice. Privacy and confidentiality are maintained per POPIA. Our aggregate liability is limited to fees paid in the preceding 3 months, excluding indirect or consequential loss.",
            spacing: { after: 300 },
          }),

          // Signatures
          new Paragraph({
            children: [new TextRun({ text: "SIGNATURES", bold: true, size: 24 })],
            spacing: { after: 200 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("For: IJ Langa Consulting (Pty) Ltd")] }),
                  new TableCell({ children: [new Paragraph(`For: ${requestData.customerName || "Customer"}`)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Signature: ___________________________")] }),
                  new TableCell({ children: [new Paragraph("Signature: ___________________________")] }),
                ],
              }),
            ],
          }),
        ],
      }],
    });

    // Generate DOCX buffer
    const buffer = await Packer.toBuffer(doc);
    const fileName = `${user.id}/${contractNumber}.docx`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseClient.storage
      .from("contracts")
      .upload(fileName, buffer, {
        contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw uploadError;
    }

    console.log("Uploaded contract to storage:", uploadData);

    // Create service contract record
    const { data: contract, error: contractError } = await supabaseClient
      .from("service_contracts")
      .insert({
        user_id: user.id,
        product_id: requestData.productId,
        contract_number: contractNumber,
        contract_text: `Contract for ${requestData.productName}`,
        contract_document_path: fileName,
        start_date: new Date().toISOString().split("T")[0],
        contract_status: "pending",
      })
      .select()
      .single();

    if (contractError) {
      console.error("Contract creation error:", contractError);
      throw contractError;
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseClient.storage
      .from("contracts")
      .getPublicUrl(fileName);

    return new Response(
      JSON.stringify({
        contractNo: contractNumber,
        contractUrl: publicUrl,
        contractPath: fileName,
        contractId: contract.id,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error generating contract:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});