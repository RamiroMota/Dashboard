// src/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv'; // Importar dotenv

dotenv.config(); // Cargar las variables de entorno desde .env

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;