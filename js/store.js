// ============================================================
//  store.js — Estado em memória e regras derivadas (status dos assuntos)
// ============================================================

import { MODULES, keyOf } from "./data.js";

const UIKEY = "awsrestart_ui_v3";

// "balde" dos comentários que não pertencem a nenhuma aula (mural geral)
export const GENERAL = "__geral__";

// Dados vindos do Supabase (preenchidos por api.js)
export const state = {
  lessons: {},          // id -> { date, title, note }
  subj: {},             // key -> { lesson, note }
  comments: {}          // lessonId -> [ {id, author, body, created_at, user_id} ]
};

// Sessão / permissão (preenchidos por api.js)
export const auth = {
  session: null,
  isEditor: false
};

// Preferências locais de interface (aba aberta, módulos recolhidos, aula ativa)
export const ui = loadUI();

function loadUI(){
  try{ const r = localStorage.getItem(UIKEY); if(r) return JSON.parse(r); }catch(e){}
  return { open:{}, tab:"assuntos", active:"" };
}
export function saveUI(){
  try{ localStorage.setItem(UIKEY, JSON.stringify(ui)); }catch(e){}
}

export function canEdit(){ return auth.isEditor; }

// ---- Derivação ----

// Aulas ordenadas da mais recente para a mais antiga.
export function lessonsSorted(){
  return Object.entries(state.lessons).map(([id,l]) => ({id, ...l}))
    .sort((a,b) => a.date < b.date ? 1 : a.date > b.date ? -1 : (a.id < b.id ? 1 : -1));
}
export function latestId(){
  const s = lessonsSorted();
  return s.length ? s[0].id : null;
}

export function recOf(key){ return state.subj[key] || {lesson:"", note:""}; }

// Status derivado: sem aula = próximo; aula mais recente = última aula; demais = concluído.
export function statusOf(key){
  const r = recOf(key);
  if(!r.lesson || !state.lessons[r.lesson]) return "prox";
  return r.lesson === latestId() ? "ultima" : "feito";
}

export function counts(){
  const c = {prox:0, ultima:0, feito:0, nota:0};
  MODULES.forEach(m => m.items.forEach((_, ii) => {
    const k = keyOf(m, ii);
    c[statusOf(k)]++;
    if(recOf(k).note) c.nota++;
  }));
  return c;
}

// Assuntos marcados numa aula específica.
export function subjectsOfLesson(id){
  const out = [];
  MODULES.forEach(m => m.items.forEach((t, ii) => {
    const k = keyOf(m, ii);
    if(recOf(k).lesson === id) out.push({k, t});
  }));
  return out;
}
