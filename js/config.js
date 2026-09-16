// ============================================================
//  config.js — Configuração do Supabase
//  Cole aqui a URL e a anon key do seu projeto (Project Settings → API).
//  A anon key é pública; quem protege os dados são as regras do schema.sql.
// ============================================================

export const SUPABASE_URL = "https://mscqdelqholsvcrdbygt.supabase.co/rest/v1/";          // ex: https://xxxxxxxx.supabase.co
export const SUPABASE_ANON_KEY = "sb_publishable_V20a6JE0mKLNwrr3hgAHug_m3-Xcuay";

export function configured(){
  return /^https:\/\/.+\.supabase\.co/.test(SUPABASE_URL) && SUPABASE_ANON_KEY.length > 20;
}
