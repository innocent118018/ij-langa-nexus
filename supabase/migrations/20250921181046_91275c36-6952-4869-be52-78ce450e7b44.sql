-- Insert all customer accounts with proper sub-account handling
INSERT INTO public.customer_accounts (email, customer_name, billing_address, delivery_address, phone, credit_limit, has_default_due_date_days, default_due_date_days, has_default_hourly_rate, default_hourly_rate, is_primary_account, parent_account_id) VALUES 

-- Primary accounts (first occurrence of each email)
('hmahlalela@mpg.gov.za', 'Agriculture, Rural Development Land & Environmental Affairs', '44 Church Street, Ermelo, 2350\nPrivate Bag x 9071, Ermelo, 2350', '44 Church Street, Ermelo, 2350\nPrivate Bag x 9071, Ermelo, 2350', '+27 (017) 819 2076', 0, true, 30, false, NULL, true, NULL),

('alfaautopanelbeater8@gmail.com', 'ALFA MUHY AUTO SPRAY PAINTING AND PANELBEATING', '35 OOSTHUIZEN STREET\nOPPOSITE LEKWA PARTS\nERMELO\nMPUMALANG, 2351', '35 OOSTHUIZEN STREET\nOPPOSITE LEKWA PARTS\nERMELO\nMPUMALANGA\n2351', NULL, 0, false, NULL, false, NULL, true, NULL),

('bongiwechiloane.bc@gmail.com', 'Alinda Jacob Jr', '74 JAN VAN RIEBECK STREET\nERMELO\nERMELO\nMPUMALANGA\n2350', '74 JAN VAN RIEBECK STREET\nERMELO\nERMELO\nMPUMALANGA\n2350', NULL, 0, true, 7, true, 80, true, NULL),

('INFO@AZALECOMMS.CO.ZA', 'AZALE COMMUNICATIONS (PTY) LTD', '1141 NCULU STREET\nORLANDO EAST\nSOWETO\n1804', '1141 NCULU STREET\nORLANDO EAST\nSOWETO\n1804', NULL, 0, false, NULL, false, NULL, true, NULL),

('sibozomp@gmail.com', 'BATHO BAKOPANO DISABLED COMPOSED WAIST', '1583 BLOCK H2\nALIWAL NORTH\nALIWA NORTH\n9750', '1583 BLOCK H2\nALIWAL NORTH\nALIWA NORTH\n9750', NULL, 0, false, NULL, false, NULL, true, NULL),

('ProcurementHO15@sanral.co.za', 'CHIEF EXECUTIVE OFFICER SOUTH AFRICAN NATIONAL ROADS AGENCY SOC LIMITED', '48 TAMBOTIE AVENUE\nVAL DE GRACE\nPRETORIA, 0184', '48 TAMBOTIE AVENUE\nVAL DE GRACE\nPRETORIA, 0184', NULL, 0, true, 30, false, NULL, true, NULL),

('songo.m@gmail.com', 'Chulumanco Lilitha', '885 RUGBY STREET\nWELTEVREDENPARK\nROODEPOORT\n1709', '885 RUGBY STREET\nWELTEVREDENPARK\nROODEPOORT\n1709', NULL, 0, true, 7, false, NULL, true, NULL),

('Elton.masheke@enthamedia.co.za', 'ENTHA MEDIA', '61 BOSCH STREET\nBOICHOKO\nPOSTMASBURG\nNORTHERN CAPE\n8420', '61 BOSCH STREET\nBOICHOKO\nPOSTMASBURG\nNORTHERN CAPE\n8420', NULL, 0, false, NULL, false, NULL, true, NULL),

('fikile.mabhena@yahoo.com', 'FIKILE KUYENZEKA KUNGUMUSA', '28 DR MALAN STREET\nDE BRUIN PARK\nERMELO\nMPUMALANGA\n2350', '28 DR MALAN STREET\nDE BRUIN PARK\nERMELO\nMPUMALANGA\n2350', NULL, 0, true, 7, false, NULL, true, NULL),

('kgotsoinnocent77@gmai.com', 'FREESTYLE KITCHEN AND CATERING', 'PO.BOX 49 NORLIM\nTAUNG\nTAUNG\nNORTH WEST\n8583\n0785631032', 'PO.BOX 49 NORLIM\nTAUNG\nTAUNG\nNORTH WEST\n8583\n0785631032', '0785631032', 600, true, 7, false, NULL, true, NULL),

('info@globalbusinessolutions.co.za', 'Global Business Solutions', 'HOUSE NO 1678 UNIT 2 SECTION\nMOTHIBISTAD\nhttp://www.globalbusinessolutions.co.za\ninfo@globalbusinessolutions.co.za', 'HOUSE NO 1678 UNIT 2 SECTION\nMOTHIBISTAD\nhttp://www.globalbusinessolutions.co.za\ninfo@globalbusinessolutions.co.za', NULL, 0, true, 7, false, NULL, true, NULL),

('mvelasenkonzo@gmail.com', 'JAMA KAMNISI TRADING AND PROJECTS', 'STAND NO 210 KWALUGEDLANE\nMANGWENI\nNKOMAZI\nMPUMALANGA\n1341', 'STAND NO 210 KWALUGEDLANE\nMANGWENI\nNKOMAZI\nMPUMALANGA\n1341', NULL, 500, true, 7, false, NULL, true, NULL),

('chiloaneoscar16@gmail.com', 'JO CHILOANE', 'PO BOX 7199\nTASBET PARK 3\n1040\n0792600425', 'PO BOX 7199\nTASBET PARK 3\n1040\n0792600425', '0792600425', 0, true, 7, true, 80, true, NULL),

('88msequence@gmail.com', 'KHAYA LAMI TRAVEL AND TOURS', 'BOX 2931\nPARKLANDS\nPARKLANDS\nGAUTENG\n2121\n+27 84 240 6229\n88msequence@gmail.com\nMUSHATHAMA MARGARET\nSIKHWENI\n7704080323082', 'BOX 2931\nPARKLANDS\nPARKLANDS\nGAUTENG\n2121\n+27 84 240 6229\n88msequence@gmail.com\nMUSHATHAMA MARGARET\nSIKHWENI\n7704080323082', '+27 84 240 6229', 0, false, NULL, false, NULL, true, NULL),

('kuthele.civil@gmail.com', 'kuthele civil engineering and construction pty ltd', '8101 EXTENSION 5\nWESSELTON LOCATION\nERMELO\n2350', '8101 EXTENSION 5\nWESSELTON LOCATION\nERMELO\n2350', NULL, 0, false, NULL, false, NULL, true, NULL),

('musawenkosicm@gmail.com', 'M C MOTAU TRADING', '4082 EXT 3\nTHUSI WESSELTON\nERMELO\nMPUMALANGA\n2350', '4082 EXT 3\nTHUSI WESSELTON\nERMELO\nMPUMALANGA\n2350', NULL, 0, false, NULL, false, NULL, true, NULL),

('mabiletsathabang@gmail.com', 'MABS MEDIA AGENCY', '8159 BUHALA STREET\nEXT 11\nPROTEA GLEN\nGAUTENG\n1819', '8159 BUHALA STREET\nEXT 11\nPROTEA GLEN\nGAUTENG\n1819', NULL, 0, true, 7, false, NULL, true, NULL),

('ritohlu@awesome-events.co.za', 'MANYUNYU LOGISTICS', 'HOUSE NO 40\nSECTION D2\nGIYANI\nLIMPOPO\n0826', 'HOUSE NO 40\nSECTION D2\nGIYANI\nLIMPOPO\n0826', NULL, 0, true, 7, false, NULL, true, NULL),

('masekoluyanda3@gmail.com', 'MDALUKWANE PROJECTS ENTERPRISE', 'STAND 233\nKWA THANDEKA\nAMSTERDAM\nMPUMALANGA\n2375', 'STAND 233\nKWA THANDEKA\nAMSTERDAM\nMPUMALANGA\n2375', NULL, 0, true, 7, false, NULL, true, NULL),

('Info.globalbsolutions@gmail.com', 'MOHAUMOLUTSI CIVIL WORKS', '19 ABRAHAMSON AVENUE\nFLAMWOOD\nKLERKSDORP\nNORTH WEST\n2571', '19 ABRAHAMSON AVENUE\nFLAMWOOD\nKLERKSDORP\nNORTH WEST\n2571', NULL, 0, true, 7, false, NULL, true, NULL),

('fnhangobe@msukaligwa.gov.za', 'Msukaligwa Local Municipality', 'Supply Chain Management, Demand and Acquisition Section\nMsukaligwa Local Municipality\nCNR Taute and Kerk Street\nCivic Centre Ermelo', 'Supply Chain Management, Demand and Acquisition Section\nMsukaligwa Local Municipality\nCNR Taute and Kerk Street\nCivic Centre Ermelo', NULL, 0, false, NULL, false, NULL, true, NULL),

('mussawenkosi.111@gmail.com', 'Musawenkosi Msibi', NULL, NULL, NULL, 0, true, 7, false, NULL, true, NULL),

('medorthprosth@gmail.com', 'NATHAN N NYANGUWO MEDICAL ORTHOTIST AND PROSTHETIST', '15 DE-CLERQ STREET\nSUITE 3\nERMELO\n2351', '15 DE-CLERQ STREET\nSUITE 3\nERMELO\n2351', NULL, 0, true, 7, false, NULL, true, NULL),

('nkuyahaeholdings@gmail.com', 'NKUYAHAE HOLDINGS (PTY)LTD', 'PO BOX 390\nBALFOUR\n2410\n0763394281', 'PO BOX 390\nBALFOUR\n2410\n0763394281', '0763394281', 0, true, 7, false, NULL, true, NULL),

('NONDUMISAS@GMAIL.COM', 'NSIBANDE MHURI TRADING AND PROJEC', '1148 COWVILLAGE\nMZINONI TOWNSHIP\nBETHAL 2310\nMPUMALANGA\n2310', '1148 COWVILLAGE\nMZINONI TOWNSHIP\nBETHAL 2310\nMPUMALANGA\n2310', NULL, 0, false, NULL, false, NULL, true, NULL),

('ntandosetrading@gmail.com', 'NTANDOSE TRADING AND PROJECTS', '14 PO BOX\nFERNIE\n2339', '14 PO BOX\nFERNIE\n2339', NULL, 0, false, NULL, false, NULL, true, NULL),

('olebile@live.co.za', 'OLEBILE BUSINESS ENTERPRISES (PTY) LTD', 'PO BOX 4634\nTHE REEDS\n0157\n0614705263', 'PO BOX 4634\nTHE REEDS\n0157\n0614705263', '0614705263', 0, true, 7, false, NULL, true, NULL),

('prettysmithhope@gmail.com', 'PRETTY HOPE SMITH', '528 WESSELTON\nEXT 11\nERMELO\n2351', '528 WESSELTON\nEXT 11\nERMELO\n2351', NULL, 0, true, 7, false, NULL, true, NULL),

('selbylaqui@gmail.com', 'PROJECTS MANAGEMENT UNIT (PTY) LTD', '373 RIVONIA BOULEVARD\nSANDTON\nSANDTON\nGAUTENG\n2118', '373 RIVONIA BOULEVARD\nSANDTON\nSANDTON\nGAUTENG\n2118', NULL, 0, false, NULL, false, NULL, true, NULL),

('pumlanimzaku@gmail.com', 'REDEEM GROUP', '2024/717604/07\n6429 ROWANDA STREET\nEXTENSION 6 COSMO CITY\nRANDBURG\nGAUTENG\n2188\nPFUNZO NTHEMBULUSENI 9402225469088\nPUMLANI MZAKU 8812085652089\npumlanimzaku@gmail.com }{ +27 62 604 1108', '2024/717604/07\n6429 ROWANDA STREET\nEXTENSION 6 COSMO CITY\nRANDBURG\nGAUGAUTENG\n2188\nPFUNZO NTHEMBULUSENI 9402225469088\nPUMLANI MZAKU 8812085652089\npumlanimzaku@gmail.com }{ +27 62 604 1108', '+27 62 604 1108', 0, true, 7, false, NULL, true, NULL),

('refithileagency@yahoo.com', 'Refithile Agency', '305 BAFEDILE STREET\nMOLAPO\nSOWETO\nGAUTENG\n1818', '305 BAFEDILE STREET\nMOLAPO\nSOWETO\nGAUTENG\n1818', NULL, 0, false, NULL, false, NULL, true, NULL),

('sandico.enterprises@gmail.com', 'SANDICO ENTERPRISE', '7 ELLIOT STREET\nEXT9\nELDORADO PARK\nGAUTENG\n1812', '7 ELLIOT STREET\nEXT9\nELDORADO PARK\nGAAUTENG\n1812', NULL, 0, true, 7, false, NULL, true, NULL),

('bongekileterressa@gmail.com', 'SBONGIMPILENDE', '2019/010253/07\n6946 WARD 11\nOSIZWENI\nNEWCASTLE\nKWA-ZULU NATAL\n2952\nPHUMZILE QUEEN MBATHA 8302250485085', 'PO BOX 78080\nOSIZWENI\nNEWCASTLE\nKWA-ZULU NATAL\n2952\nPHUMZILE QUEEN MBATHA 8302250485085', NULL, 0, true, 7, false, NULL, true, NULL),

('Zamamkhize992@gmail.com', 'Sembo Collective', '57 Rooibos road, Montana, Pretoria.\n0011130126086\n0792377433', '57 Rooibos road, Montana, Pretoria.\n0011130126086\n0792377433', '0792377433', 0, true, 7, false, NULL, true, NULL),

('sibongilemolefi51@gmail.com', 'Sibongile Molefi', NULL, NULL, NULL, 0, true, 7, false, NULL, true, NULL),

('lloydvandross@gmail.com', 'Soul keepers', '636 Manana street\n1 day\n0603089778', '636 Manana street\n1 day\n0603089778', '0603089778', 0, false, NULL, false, NULL, true, NULL),

('siphalipty1@gmail.com', 'SIPHALI', '29-613 KERIO CRESCENT\nCOSMO CREEK\nZANDSPRUIT\nGAUTENG\n2169', '29-613 KERIO CRESCENT\nCOSMO CREEK\nZANDSPRUIT\nGAUTENG\n2169', NULL, 0, false, NULL, false, NULL, true, NULL),

('sfisongobese530@gmail.com', 'SP NGOBESE', 'B572 KUNENE ROAD\nMPUMALANGA TOWNSHIP\nHAMMARSDALE\n3699\n0785899937\n7208285604080\nsfisongobese530@gmail.com', 'B572 KUNENE ROAD\nMPUMALANGA TOWNSHIP\nHAMMARSDALE\n3699\n0785899937\n7208285604080\nsfisongobese530@gmail.com', '0785899937', 0, true, 7, false, NULL, true, NULL),

('seriteled04@gmail.com', 'SSL PROJECTS AND SUPPLY', '147 C\nNAMAKGALE\nPHALABORWA\nLIMPOPO\n1390\nSERITE SOPHIE LEDWABA 9904100522089\nseriteled04@gmail.com', '147 C\nNAMAKGALE\nPHALABORWA\nLIMPOPO\n1390\nSERITE SOPHIE LEDWABA 9904100522089\nseriteled04@gmail.com', NULL, 0, true, 7, false, NULL, true, NULL),

('bongiwepatience93@gmail.com', 'STARLITE EDUCATORS', '2017/400737/07\n580 LOUIS BOTHA\nGRESSWOLD SAVOY\nJOHANNESBURG\nGAUTENG\n2090\nBONGIWE PATIENCE MNCUBE 9309191351085\nbongiwepatience93@gmail.com }{ +27 64 073 3565', '2017/400737/07\n580 LOUIS BOTHA\nGRESSWOLD SAVOY\nJOHANNESBURG\nGAUTENG\n2090\nBONGIWE PATIENCE MNCUBE 9309191351085\nbongiwepatience93@gmail.com }{ +27 64 073 3565', '+27 64 073 3565', 0, true, 7, false, NULL, true, NULL),

('mashinini.thabile723@g mail.com', 'Sthuthamagade Trading and Projects Cc', '2008/054626/23\n544 Masiteng Street\nExtension\nVosloorus\n1475\nVAT No: 4690250164\nCell: 083 368 7889\nCell: 079 502 6464\nEmail:mashinini.thabile723@gmail.com\nFax: 086 574 1425', '2008/054626/23\n544 Masiteng Street\nExtension\nVosloorus\n1475\nVAT No: 4690250164\nCell: 083 368 7889\nCell: 079 502 6464\nEmail:mashinini.thabile723@gmail.com\nFax: 086 574 1425', '083 368 7889', 0, true, 7, false, NULL, true, NULL),

('nkwele3@gmail.com', 'Surprise Tuckshop & General', '9189\nExt 34\nErmelo\n2350', '9189\nExt 34\nErmelo\n2350', NULL, 0, true, 7, false, NULL, true, NULL),

('motla.ramapulane@gmail.com', 'Suzan Ramapulane', '5A Buhrman street', '5A Buhrman street', NULL, 0, true, 7, false, NULL, true, NULL),

('banzizulu@gmail.com', 'TECHLOGIX', 'PO BOX 11972\nRYNFIELD\nBENONI\nGAUTENG\n1516', '36 EVA ROAD\nFAIRLEADS AH\nBENONI\nGAUTENG\n1516', NULL, 0, true, 7, false, NULL, true, NULL),

('mncubeh@thelinkgroup.net.za', 'THE LINK GROUP', '01 GLENVILLAS ORCHARD STREET\nBRAMLEY VIEW\nJOHANNESBURG\nGAUTENG\n2090', '01 GLENVILLAS ORCHARD STREET\nBRAMLEY VIEW\nJOHANNESBURG\nGAUTENG\n2090', NULL, 0, false, NULL, false, NULL, true, NULL);

-- Now get the parent account IDs for sub-accounts
DO $$ 
DECLARE
    khaya_lami_id UUID;
    jo_chiloane_id UUID;
    chulumanco_id UUID;
    olebile_id UUID;
    mohaumolutsi_id UUID;
BEGIN
    -- Get parent account IDs
    SELECT id INTO khaya_lami_id FROM public.customer_accounts WHERE email = '88msequence@gmail.com' AND customer_name = 'KHAYA LAMI TRAVEL AND TOURS';
    SELECT id INTO jo_chiloane_id FROM public.customer_accounts WHERE email = 'chiloaneoscar16@gmail.com' AND customer_name = 'JO CHILOANE';
    SELECT id INTO chulumanco_id FROM public.customer_accounts WHERE email = 'songo.m@gmail.com' AND customer_name = 'Chulumanco Lilitha';
    SELECT id INTO olebile_id FROM public.customer_accounts WHERE email = 'olebile@live.co.za' AND customer_name = 'OLEBILE BUSINESS ENTERPRISES (PTY) LTD' LIMIT 1;
    SELECT id INTO mohaumolutsi_id FROM public.customer_accounts WHERE email = 'Info.globalbsolutions@gmail.com' AND customer_name = 'MOHAUMOLUTSI CIVIL WORKS';

    -- Insert sub-accounts
    INSERT INTO public.customer_accounts (email, customer_name, billing_address, delivery_address, phone, credit_limit, has_default_due_date_days, default_due_date_days, has_default_hourly_rate, default_hourly_rate, is_primary_account, parent_account_id) VALUES 
    
    -- Sub-accounts for 88msequence@gmail.com
    ('88msequence@gmail.com', 'Madidi Property Management', 'KYALAMI TERRACE\nSPRINGWELL AVENUE\nKYALAMI\nGAUTENG\n1684\n+27 84 240 6229\n88msequence@gmail.com\nMUSHATHAMA MARGARET SIKHWENI\n7704080323082', 'KYALAMI TERRACE\nSPRINGWELL AVENUE\nKYALAMI\nGAUTENG\n1684', '+27 84 240 6229', 0, true, 7, false, NULL, false, khaya_lami_id),
    
    -- Sub-accounts for chiloaneoscar16@gmail.com
    ('chiloaneoscar16@gmail.com', 'SHAKWANENG BUSINESS ENTERPRISE', '2020/021271/07\n117 MERLIN CRESCENT\nKRIEL\nKRIEL\nMPUMALANGA\n2271', 'PO BOX 7199\nWITBANK\nWITBANK\nMPUMALANGA\n1040', NULL, 0, false, NULL, false, NULL, false, jo_chiloane_id),
    
    -- Sub-accounts for songo.m@gmail.com  
    ('songo.m@gmail.com', 'NKUDU TRADING', '9 WINNIE MANDELA CRESCENT\nMANDELA PARK\nCAPE TOWN\nWESTERN CAPE\n7784', '9 WINNIE MANDELA CRESCENT\nMANDELA PARK\nCAPE TOWN\nWESTERN CAPE\n7784', NULL, 0, true, 7, false, NULL, false, chulumanco_id),
    
    -- Sub-accounts for Info.globalbsolutions@gmail.com (case sensitive handling)
    ('INFO.GLOBALBSOLUTIONS@GMAIL.COM', 'Mr MTHOBISI DERRICK XABA', '49 MOHAMMEDIA\nMKHONDO\nPIET RETIEF\n2380', '49 MOHAMMEDIA\nMKHONDO\nPIET RETIEF\n2380', NULL, 0, true, 7, false, NULL, false, mohaumolutsi_id),
    
    ('Info.globalbsolutions@gmail.com', 'OFENTSE SAMUEL MALAPANE', '5 Mesopotamia\nGA-Kgapane\nPolokwane\n0838', '5 Mesopotamia\nGA-Kgapane\nPolokwane\n0838', NULL, 0, true, 7, true, 150, false, mohaumolutsi_id);
    
    -- Insert second OLEBILE account as sub-account
    INSERT INTO public.customer_accounts (email, customer_name, billing_address, delivery_address, phone, credit_limit, has_default_due_date_days, default_due_date_days, has_default_hourly_rate, default_hourly_rate, is_primary_account, parent_account_id) VALUES 
    ('olebile@live.co.za', 'OLEBILE BUSINESS ENTERPRISES (PTY) LTD', 'PO BOX 4634\nTHE REEDS\n0157\n0614705263', 'PO BOX 4634\nTHE REEDS\n0157\n0614705263', '0614705263', 0, true, 7, false, NULL, false, olebile_id);
    
END $$;