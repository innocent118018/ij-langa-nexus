-- Insert all invoices with customer linking
DO $$
DECLARE
    invoice_data RECORD;
    invoices_to_insert TEXT[][] := ARRAY[
        ['20202611', 'Madidi Property Management', '2025-09-02', '1362.75', '0.00', 'Paid'],
        ['20202610', 'TECHLOGIX', '2025-09-01', '287.50', '287.50', 'Unpaid'],
        ['20202609', 'Madidi Property Management', '2025-09-01', '2216.05', '0.00', 'Paid'],
        ['20202608', 'KHAYA LAMI TRAVEL AND TOURS', '2025-08-31', '1536.40', '0.00', 'Paid'],
        ['20202607', 'FEZEKA CIVIL ENGINEERING AND CONSTRUCTION', '2025-08-26', '707.25', '0.00', 'Paid'],
        ['20202606', 'NSIBANDE MHURI TRADING AND PROJEC', '2025-08-26', '0.00', '0.00', 'Paid'],
        ['20202604', 'Sembo Collective', '2025-08-01', '678.50', '0.00', 'Paid'],
        ['20202603', 'Chulumanco Lilitha', '2025-07-31', '207.00', '0.00', 'Paid'],
        ['20202602', 'Chulumanco Lilitha', '2025-07-23', '1081.00', '0.00', 'Paid'],
        ['20202601', 'JO CHILOANE', '2025-07-23', '2680.98', '0.00', 'Paid'],
        ['20202600', 'NATHAN N NYANGUWO MEDICAL ORTHOTIST AND PROSTHETIST', '2025-07-22', '3448.85', '0.00', 'Paid'],
        ['20202599', 'Sthuthamagade Trading and Projects Cc', '2025-07-16', '1046.50', '0.00', 'Paid'],
        ['20202598', 'NATHAN N NYANGUWO MEDICAL ORTHOTIST AND PROSTHETIST', '2025-06-27', '4896.15', '0.00', 'Paid'],
        ['20202597', 'JAMA KAMNISI TRADING AND PROJECTS', '2025-06-27', '920.00', '-10.00', 'Overpaid'],
        ['20202596', 'Chulumanco Lilitha', '2025-06-27', '695.75', '0.00', 'Paid'],
        ['20202595', 'TECHLOGIX', '2025-06-20', '2978.50', '2978.50', 'Overdue'],
        ['20202594', 'JAMA KAMNISI TRADING AND PROJECTS', '2025-06-03', '345.00', '345.00', 'Overdue'],
        ['20202592', 'Global Business Solutions', '2025-05-29', '8162.70', '162.70', 'Overdue'],
        ['20202591', 'SSL PROJECTS AND SUPPLY', '2025-05-28', '678.50', '814.20', 'Overdue'],
        ['20202589', 'Global Business Solutions', '2025-05-20', '5750.00', '5750.00', 'Overdue'],
        ['20202590', 'Global Business Solutions', '2025-05-12', '24584.70', '12299.35', 'Overdue'],
        ['20202593', 'Sembo Collective', '2025-04-03', '1138.50', '0.00', 'Paid'],
        ['20202588', 'Suzan Ramapulane', '2025-03-25', '9093.05', '1621.86', 'Overdue'],
        ['20202605', 'JAMA KAMNISI TRADING AND PROJECTS', '2025-03-13', '1437.50', '3325.91', 'Overdue'],
        ['20202587', 'THE NEW ST SAMPSON APOSTOLIC CHURCH', '2025-03-11', '661.25', '661.25', 'Overdue'],
        ['20202586', 'THOKOZA NHLANHLA INVESTMENTS', '2025-03-03', '2921.00', '2921.00', 'Overdue'],
        ['20202585', 'PRETTY HOPE SMITH', '2025-03-03', '115.00', '0.00', 'Paid'],
        ['20202584', 'JAMA KAMNISI TRADING AND PROJECTS', '2025-03-02', '115.00', '15.00', 'Overdue'],
        ['20202583', 'NTANDOSE TRADING AND PROJECTS', '2025-02-28', '999.99', '0.00', 'Paid'],
        ['20202582', 'THOKOZA NHLANHLA INVESTMENTS', '2025-02-28', '1426.00', '0.00', 'Paid'],
        ['20202581', 'JAMA KAMNISI TRADING AND PROJECTS', '2025-02-24', '669.50', '-2100.43', 'Overpaid'],
        ['20202580', 'Chulumanco Lilitha', '2025-02-20', '1000.00', '0.00', 'Paid'],
        ['20202579', 'YOWGATY', '2025-02-17', '490.00', '440.80', 'Overdue'],
        ['20202578', 'Chulumanco Lilitha', '2025-02-10', '1000.00', '-150.00', 'Overpaid'],
        ['20202577', 'SIPHALI', '2025-01-30', '2078.00', '-311.70', 'Overpaid'],
        ['20202576', 'Chulumanco Lilitha', '2025-01-28', '1387.98', '737.98', 'Overdue'],
        ['20202575', 'ORIS POULTRY AND GENERAL TRADING', '2025-01-17', '1369.00', '0.00', 'Paid'],
        ['20202574', 'MDALUKWANE PROJECTS ENTERPRISE', '2025-01-08', '490.00', '-73.50', 'Overpaid'],
        ['20202573', 'NSIBANDE MHURI TRADING AND PROJEC', '2025-01-07', '350.00', '-52.50', 'Overpaid'],
        ['20202572', 'Chulumanco Lilitha', '2025-01-05', '579.00', '-86.85', 'Overpaid'],
        ['20202571', 'Chulumanco Lilitha', '2024-12-24', '1000.00', '-150.00', 'Overpaid'],
        ['20202570', 'Surprise Tuckshop & General', '2024-11-27', '474.00', '128.14', 'Overdue'],
        ['20202569', 'AZALE COMMUNICATIONS (PTY) LTD', '2024-11-22', '3250.00', '0.00', 'Paid'],
        ['20202568', 'Refithile Agency', '2024-11-18', '840.00', '0.00', 'Paid'],
        ['20202567', 'Refithile Agency', '2024-11-18', '660.00', '0.00', 'Paid'],
        ['20202566', 'MDALUKWANE PROJECTS ENTERPRISE', '2024-11-08', '740.00', '-111.00', 'Overpaid'],
        ['20202565', 'JO CHILOANE', '2024-11-07', '48179.19', '23179.19', 'Overdue'],
        ['20202564', 'Chulumanco Lilitha', '2024-10-29', '180.00', '-27.00', 'Overpaid'],
        ['20202563', 'Chulumanco Lilitha', '2024-10-24', '600.00', '36.50', 'Overdue'],
        ['20202562', 'FEZEKA CIVIL ENGINEERING AND CONSTRUCTION', '2024-10-08', '684.83', '0.00', 'Paid'],
        ['20202561', 'JAMA KAMNISI TRADING AND PROJECTS', '2024-10-04', '563.50', '0.00', 'Paid'],
        ['20202559', 'FREESTYLE KITCHEN AND CATERING', '2024-10-01', '690.00', '0.00', 'Paid'],
        ['20202558', 'Chulumanco Lilitha', '2024-09-30', '517.50', '0.00', 'Paid'],
        ['20202557', 'Chulumanco Lilitha', '2024-09-30', '897.00', '-17.50', 'Overpaid'],
        ['20202560', 'Chulumanco Lilitha', '2024-09-25', '1707.75', '0.00', 'Paid'],
        ['INV-20202553', 'THOKOZA SIYAVUMA CONSTRUCTION AND PROJECTS', '2024-09-20', '1320.00', '10.00', 'Overdue'],
        ['20202556', 'MANYUNYU LOGISTICS', '2024-09-20', '633.00', '0.00', 'Paid'],
        ['20202554', 'Refithile Agency', '2024-09-20', '609.50', '0.00', 'Paid'],
        ['INV-20202549', 'Chulumanco Lilitha', '2024-08-24', '563.50', '-563.50', 'Overpaid'],
        ['INV-20202548', 'Chulumanco Lilitha', '2024-08-20', '1470.00', '-500.00', 'Overpaid'],
        ['20202555', 'MABS MEDIA AGENCY', '2024-07-25', '1884.00', '5875.20', 'Overdue']
    ];
    invoice_row TEXT[];
    customer_id_var UUID;
BEGIN
    FOREACH invoice_row SLICE 1 IN ARRAY invoices_to_insert
    LOOP
        -- Get customer ID
        SELECT id INTO customer_id_var FROM public.customers WHERE name = invoice_row[2];
        
        IF customer_id_var IS NOT NULL THEN
            INSERT INTO public.invoices (reference, customer_id, issue_date, invoice_amount, balance_due, status)
            VALUES (invoice_row[1], customer_id_var, invoice_row[3]::date, invoice_row[4]::numeric, invoice_row[5]::numeric, invoice_row[6])
            ON CONFLICT (reference) DO UPDATE SET 
                customer_id = EXCLUDED.customer_id,
                issue_date = EXCLUDED.issue_date,
                invoice_amount = EXCLUDED.invoice_amount,
                balance_due = EXCLUDED.balance_due,
                status = EXCLUDED.status;
        END IF;
    END LOOP;
END $$;