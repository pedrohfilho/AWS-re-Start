// ============================================================
//  utils.js — Funções puras de formatação e segurança
// ============================================================

// Escapa HTML para evitar injeção ao renderizar texto do usuário.
export function esc(s){
  return String(s).replace(/[&<>"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));
}

// Escapa e transforma URLs em links clicáveis; preserva quebras de linha.
export function linkify(text){
  return esc(text)
    .replace(/(https?:\/\/[^\s<]+)/g, u => `<a href="${u}" target="_blank" rel="noopener noreferrer">${u}</a>`)
    .replace(/\n/g, "<br>");
}

// "2026-09-16" -> "16/09"
export function fmtDate(d){
  if(!d) return "";
  const p = d.split("-");
  return p.length === 3 ? `${p[2]}/${p[1]}` : d;
}

// ISO -> "16/09 14:30"
export function fmtDateTime(iso){
  if(!iso) return "";
  const d = new Date(iso);
  if(isNaN(d)) return "";
  const p = n => String(n).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth()+1)} ${p(d.getHours())}:${p(d.getMinutes())}`;
}
