// ============================================================
//  api.js — Camada de dados (Supabase): auth, leitura, escrita, tempo real
// ============================================================

import { SUPABASE_URL, SUPABASE_ANON_KEY, configured } from "./config.js";
import { state, auth, recOf, GENERAL } from "./store.js";

let sb = null;
let onData = () => {};     // callback chamado quando os dados mudam (ligado no main.js)

export function setOnData(cb){ onData = cb; }
export function isReady(){ return !!sb; }

// Cria o cliente. Retorna false se as credenciais não foram configuradas.
export function init(){
  if(!configured()) return false;
  sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return true;
}

// ---- Sessão / permissão ----
export async function refreshSession(){
  const { data:{ session } } = await sb.auth.getSession();
  auth.session = session;
}
export async function refreshEditor(){
  auth.isEditor = !!auth.session;   // quem tem conta (logado) edita tudo
}
export function onAuthChange(cb){
  sb.auth.onAuthStateChange(async (_e, s) => {
    auth.session = s;
    await refreshEditor();
    cb();
  });
}
export async function signIn(email, password){
  return sb.auth.signInWithPassword({ email, password });
}
export async function signOut(){ await sb.auth.signOut(); }

// ---- Leitura ----
export async function loadAll(){
  if(!sb) return;
  const [ls, ss, cs] = await Promise.all([
    sb.from("lessons").select("*"),
    sb.from("subject_state").select("*"),
    sb.from("comments").select("*").order("created_at", { ascending:true })
  ]);
  state.lessons = {};
  (ls.data || []).forEach(l => state.lessons[l.id] = {date:l.date||"", title:l.title||"", note:l.note||""});
  state.subj = {};
  (ss.data || []).forEach(r => state.subj[r.key] = {lesson:r.lesson_id||"", note:r.note||""});
  state.comments = {};
  (cs.data || []).forEach(c => {
    const bucket = c.lesson_id || GENERAL;
    (state.comments[bucket] = state.comments[bucket] || []).push(c);
  });
  onData();
}

// ---- Tempo real ----
export function subscribeRealtime(){
  sb.channel("rt-all")
    .on("postgres_changes", {event:"*", schema:"public", table:"lessons"}, loadAll)
    .on("postgres_changes", {event:"*", schema:"public", table:"subject_state"}, loadAll)
    .on("postgres_changes", {event:"*", schema:"public", table:"comments"}, loadAll)
    .subscribe();
}

// ---- Escrita (assuntos e aulas: só editores, garantido pelas regras do banco) ----
export async function persistSubj(key){
  if(!sb) return;
  const r = recOf(key);
  try{
    if(!r.lesson && !r.note){
      await sb.from("subject_state").delete().eq("key", key);
    }else{
      await sb.from("subject_state").upsert({
        key, lesson_id:r.lesson||null, note:r.note||"",
        updated_by: auth.session?.user?.id || null, updated_at: new Date().toISOString()
      });
    }
  }catch(e){ throw e; }
}
export async function persistLesson(id){
  if(!sb) return;
  const l = state.lessons[id];
  await sb.from("lessons").upsert({
    id, date:l.date||null, title:l.title||"", note:l.note||"",
    updated_by: auth.session?.user?.id || null, updated_at: new Date().toISOString()
  });
}
export async function deleteLessonRemote(id){
  if(!sb) return;
  await sb.from("lessons").delete().eq("id", id);
}

// ---- Comentários (abertos: qualquer um adiciona; editor modera) ----
export async function addComment(lessonId, body, name){
  if(!sb) return;
  await sb.from("comments").insert({
    lesson_id: lessonId || null,       // null = comentário geral (sem aula)
    body,
    author: (name || "").slice(0, 40) || "Anônimo",
    user_id: auth.session?.user?.id || null
  });
}
export async function deleteComment(id){
  if(!sb) return;
  await sb.from("comments").delete().eq("id", id);
}
