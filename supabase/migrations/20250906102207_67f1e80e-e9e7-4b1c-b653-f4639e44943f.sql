-- Add unique constraint on customer name field
ALTER TABLE public.customers ADD CONSTRAINT customers_name_unique UNIQUE (name);

-- Insert customers using a simpler approach with manual conflict handling
DO $$
DECLARE
    customer_data RECORD;
    customers_to_insert TEXT[][] := ARRAY[
        ['Agriculture, Rural Development Land & Environmental Affairs', 'agriculture@gov.za', 'Active', '0.00'],
        ['ALFA MUHY AUTO SPRAY PAINTING AND PANELBEATING', 'alfa@email.com', 'Active', '0.00'],
        ['Alinda Jacob Jr', 'alinda@email.com', 'Active', '0.00'],
        ['AZALE COMMUNICATIONS (PTY) LTD', 'azale@email.com', 'Active', '0.00'],
        ['BATHO BAKOPANO DISABLED COMPOSED WAIST', 'batho@email.com', 'Active', '0.00'],
        ['CHIEF EXECUTIVE OFFICER SOUTH AFRICAN NATIONAL ROADS AGENCY SOC LIMITED', 'ceo@sanral.co.za', 'Active', '0.00'],
        ['Chulumanco Lilitha', 'chulumanco@email.com', 'Active', '-720.37'],
        ['Department of Public Works,Road And Transport', 'dpwrt@gov.za', 'Active', '0.00'],
        ['ENTHA MEDIA', 'entha@email.com', 'Active', '0.00'],
        ['ESKOM ROTEK INDUSTRIES 4230', 'eskom@email.com', 'Active', '0.00'],
        ['FIKILE KUYENZEKA KUNGUMUSA', 'fikile@email.com', 'Active', '0.00'],
        ['FREESTYLE KITCHEN AND CATERING', 'freestyle@email.com', 'Active', '0.00'],
        ['Gauteng Department of e-Government', 'egov@gauteng.gov.za', 'Active', '0.00'],
        ['George munyonga', 'george@email.com', 'Active', '0.00'],
        ['Given', 'given@email.com', 'Active', '0.00'],
        ['Global Business Solutions', 'global@email.com', 'Active', '18212.05'],
        ['Highveld Worship Center', 'highveld@email.com', 'Active', '0.00'],
        ['JAMA KAMNISI TRADING AND PROJECTS', 'jama@email.com', 'Active', '1575.48'],
        ['JO CHILOANE', 'jo@email.com', 'Active', '23179.19'],
        ['KHAYA LAMI TRAVEL AND TOURS', 'khaya@email.com', 'Active', '0.00'],
        ['kuthele civil engineering and construction pty ltd', 'kuthele@email.com', 'Active', '0.00'],
        ['M C MOTAU TRADING', 'mcmotau@email.com', 'Active', '0.00'],
        ['MABS MEDIA AGENCY', 'mabs@email.com', 'Active', '5875.20'],
        ['Madidi Property Management', 'madidi@email.com', 'Active', '0.00'],
        ['MANYUNYU LOGISTICS', 'manyunyu@email.com', 'Active', '0.00'],
        ['MDALUKWANE PROJECTS ENTERPRISE', 'mdalukwane@email.com', 'Active', '-184.50'],
        ['MOHAUMOLUTSI CIVIL WORKS', 'mohaumolutsi@email.com', 'Active', '0.00'],
        ['Mr MTHOBISI DERRICK XABA', 'mthobisi@email.com', 'Active', '0.00'],
        ['Msukaligwa Local Municipality', 'msukaligwa@email.com', 'Active', '0.00'],
        ['Musawenkosi Msibi', 'musawenkosi@email.com', 'Active', '0.00'],
        ['NATHAN N NYANGUWO MEDICAL ORTHOTIST AND PROSTHETIST', 'nathan@email.com', 'Active', '0.00'],
        ['NKUDU TRADING', 'nkudu@email.com', 'Active', '0.00'],
        ['NKUYAHAE HOLDINGS (PTY)LTD', 'nkuyahae@email.com', 'Active', '0.00'],
        ['NSIBANDE MHURI TRADING AND PROJEC', 'nsibande@email.com', 'Active', '-52.50'],
        ['NTANDOSE TRADING AND PROJECTS', 'ntandose@email.com', 'Active', '0.00'],
        ['OFENTSE SAMUEL MALAPANE', 'ofentse@email.com', 'Active', '0.00'],
        ['OLEBILE BUSINESS ENTERPRISES (PTY) LTD', 'olebile@email.com', 'Active', '0.00'],
        ['ORIS POULTRY AND GENERAL TRADING', 'oris@email.com', 'Active', '0.00'],
        ['PRETTY HOPE SMITH', 'pretty@email.com', 'Active', '0.00'],
        ['PROJECTS MANAGEMENT UNIT (PTY) LTD', 'pmu@email.com', 'Active', '0.00'],
        ['REDEEM GROUP', 'redeem@email.com', 'Active', '0.00'],
        ['Refithile Agency', 'refithile@email.com', 'Active', '-0.70'],
        ['SANDICO ENTERPRISE', 'sandico@email.com', 'Active', '0.00'],
        ['SBONGIMPILENDE', 'sbongimpilende@email.com', 'Active', '0.00'],
        ['Sembo Collective', 'sembo@email.com', 'Active', '0.00'],
        ['SHAKWANENG BUSINESS ENTERPRISE', 'shakwaneng@email.com', 'Active', '0.00'],
        ['Sibongile Molefi', 'sibongile@email.com', 'Active', '0.00'],
        ['SILVER STEIN', 'silver@email.com', 'Active', '0.00'],
        ['SIPHALI', 'siphali@email.com', 'Active', '-311.70'],
        ['SP NGOBESE', 'spngobese@email.com', 'Active', '0.00'],
        ['SSL PROJECTS AND SUPPLY', 'ssl@email.com', 'Active', '814.20'],
        ['STARLITE EDUCATORS', 'starlite@email.com', 'Active', '0.00'],
        ['Sthuthamagade Trading and Projects Cc', 'sthuthamagade@email.com', 'Active', '0.00'],
        ['Surprise Tuckshop & General', 'surprise@email.com', 'Active', '128.14'],
        ['Suzan Ramapulane', 'suzan@email.com', 'Active', '1621.86'],
        ['TECHLOGIX', 'techlogix@email.com', 'Active', '3266.00'],
        ['THE LINK GROUP', 'linkgroup@email.com', 'Active', '0.00'],
        ['THE NEW ST SAMPSON APOSTOLIC CHURCH', 'stsampson@email.com', 'Active', '661.25'],
        ['THOKOZA NHLANHLA INVESTMENTS', 'thokoza@email.com', 'Active', '2921.00'],
        ['THOKOZA SIYAVUMA CONSTRUCTION AND PROJECTS', 'siyavuma@email.com', 'Active', '10.00'],
        ['TSANTSABANE ENGINEERING SOLUTION PTY LTD', 'tsantsabane@email.com', 'Active', '0.00'],
        ['VILLAGE CINEMA LINE', 'village@email.com', 'Active', '0.00'],
        ['Vusisizwe Self Help And Projects', 'vusisizwe@email.com', 'Active', '0.00'],
        ['WILINGA TRADING (PTY) LTD', 'wilinga@email.com', 'Active', '0.00'],
        ['YOWGATY', 'yowgaty@email.com', 'Active', '440.80'],
        ['DESIREE NOLWAZI LUTHULI', 'desiree@email.com', 'Active', '0.00'],
        ['FEZEKA CIVIL ENGINEERING AND CONSTRUCTION', 'fezeka@email.com', 'Active', '0.00'],
        ['Joseph Innocent Langa', 'joseph@ijlanga.co.za', 'Active', '0.00']
    ];
    customer_row TEXT[];
BEGIN
    FOREACH customer_row SLICE 1 IN ARRAY customers_to_insert
    LOOP
        INSERT INTO public.customers (name, email, phone, address, status, accounts_receivable)
        VALUES (customer_row[1], customer_row[2], NULL, NULL, customer_row[3], customer_row[4]::numeric)
        ON CONFLICT (name) DO UPDATE SET 
            email = EXCLUDED.email,
            status = EXCLUDED.status,
            accounts_receivable = EXCLUDED.accounts_receivable;
    END LOOP;
END $$;