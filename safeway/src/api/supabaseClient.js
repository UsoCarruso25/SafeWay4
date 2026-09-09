// src/api/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Obtener las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validar que existen
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Faltan variables de entorno de Supabase');
  console.log('URL:', supabaseUrl ? '✅' : '❌');
  console.log('Key:', supabaseAnonKey ? '✅' : '❌');
}

// Crear el cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  }
});

// Verificar conexión
console.log('🔌 Intentando conectar a Supabase...');
console.log('📡 URL:', supabaseUrl);
console.log('🔑 Key:', supabaseAnonKey ? '✅ Configurada' : '❌ No configurada');

// Exportar funciones de utilidad
export default supabase;