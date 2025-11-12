-- Clean all pricing related data
TRUNCATE TABLE public.services CASCADE;
TRUNCATE TABLE public.products CASCADE;

-- Also clean archived tables if they exist
DROP TABLE IF EXISTS public.services_archive CASCADE;
DROP TABLE IF EXISTS public.products_archive CASCADE;

-- Reset sequences
ALTER SEQUENCE IF EXISTS services_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS products_id_seq RESTART WITH 1;