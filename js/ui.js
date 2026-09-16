// ============================================================
//  ui.js — Renderização das telas, modais, ações e feedback
// ============================================================

import { MODULES, keyOf, classify, splitNum, MONTHS, TOTAL } from "./data.js";
import { esc, linkify, fmtDate, fmtDateTime } from "./utils.js";
import {
  state, auth, ui, saveUI, canEdit, GENERAL,
  lessonsSorted, latestId, recOf, statusOf, counts, subjectsOfLesson
} from "./store.js";
import * as api from "./api.js";

// Estado de interface só desta camada (não persiste no banco)
let filter = null;
let query = "";
let noteKey = null;
let lessonId = null;

const $ = id => document.getElementById(id);

// ---------- Feedback ----------
let toastT = null;
export function toast(msg){
  const el = $("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastT);
  toastT = setTimeout(() => el.classList.remove("show"), 2600);
}
export function setConn(txt, cls){
  $("sync").className = "sync " + (cls || "");
  $("modeText").textContent = txt;
}

// ---------- Render principal ----------
export function render(){
  renderStats();
  renderActiveSel();
  renderList();
  renderGeneralWall();
  renderLessons();
}

// ---------- Comentários (reutilizável: aula ou mural geral) ----------
function commentsHTML(bucketId){
  const cmts = state.comments[bucketId] || [];
  return `<div class="comments">
    <div class="comments-h">Comentários</div>
    <div class="comment-list">${
      cmts.map(c => `<div class="comment"><div class="c-meta"><b>${esc(c.author || "Anônimo")}</b> · ${fmtDateTime(c.created_at)}</div><div class="c-body">${linkify(c.body)}</div>${auth.isEditor ? `<button class="c-del" data-cid="${c.id}">apagar</button>` : ""}</div>`).join("")
      || `<div class="c-empty">Sem comentários ainda. Deixe o seu abaixo.</div>`
    }</div>
    <div class="comment-form">
      <input class="c-name" type="text" placeholder="Seu nome (opcional)" maxlength="40">
      <textarea class="c-input" placeholder="Escreva um comentário…"></textarea>
      <button class="btn btn-primary c-send">Enviar</button>
    </div>
  </div>`;
}
function bindComments(container, bucketId){
  container.querySelectorAll(".c-del").forEach(b => b.addEventListener("click", () => handleDeleteComment(b.dataset.cid)));
  const cin = container.querySelector(".c-input"), cname = container.querySelector(".c-name"), csend = container.querySelector(".c-send");
  if(csend) csend.addEventListener("click", () => {
    const v = cin.value.trim();
    if(v){ handleAddComment(bucketId, v, cname.value.trim()); cin.value = ""; }
  });
}
function renderGeneralWall(){
  const el = $("generalWall");
  el.innerHTML = `<div class="lesson wall">
    <div class="lesson-head">
      <div class="wall-ico">💬</div>
      <div class="lesson-info"><div class="lt">Mural da turma</div><div class="lm">Comentários gerais, sem aula específica</div></div>
    </div>
    <div class="lesson-body">${commentsHTML(GENERAL)}</div>
  </div>`;
  bindComments(el, GENERAL);
}

function renderStats(){
  const c = counts();
  $("cProx").textContent = c.prox;
  $("cUltima").textContent = c.ultima;
  $("cFeito").textContent = c.feito;
  $("cNota").textContent = c.nota;
  const passed = c.feito + c.ultima, pct = TOTAL ? Math.round(passed/TOTAL*100) : 0;
  $("ringPct").textContent = pct + "%";
  $("ringSub").textContent = passed + "/" + TOTAL;
  $("ring").style.strokeDashoffset = (2*Math.PI*48) * (1 - passed/TOTAL);
  document.querySelectorAll(".chip").forEach(ch => ch.classList.toggle("active", ch.dataset.k === filter));
}

function renderActiveSel(){
  const sel = $("activeSel"), s = lessonsSorted();
  sel.innerHTML = `<option value="">${s.length ? "— selecione uma aula —" : "— nenhuma aula criada —"}</option>` +
    s.map(l => `<option value="${l.id}">${fmtDate(l.date)} · ${esc(l.title || "Aula")}</option>`).join("");
  sel.value = ui.active || "";
}

// ---------- Aba Assuntos ----------
function renderList(){
  const list = $("list");
  const q = query.trim().toLowerCase();
  list.innerHTML = "";
  let shown = 0;

  MODULES.forEach((m, mi) => {
    const rows = m.items.map((t, ii) => ({t, ii, k:keyOf(m, ii)})).filter(x => {
      const st = statusOf(x.k);
      if(filter === "nota"){ if(!recOf(x.k).note) return false; }
      else if(filter && st !== filter) return false;
      if(q && !x.t.toLowerCase().includes(q)) return false;
      return true;
    });
    if(!rows.length) return;
    shown += rows.length;

    const done = m.items.filter((_, ii) => {
      const s = statusOf(keyOf(m, ii));
      return s === "feito" || s === "ultima";
    }).length;
    const collapsed = ui.open[m.slug] === false && !q && !filter;

    const mod = document.createElement("div");
    mod.className = "module" + (collapsed ? " collapsed" : "");

    const head = document.createElement("button");
    head.className = "mod-head";
    head.setAttribute("aria-expanded", String(!collapsed));
    head.innerHTML = `
      <svg class="mod-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
      <span class="mod-idx">${mi+1}</span>
      <span class="mod-title"><span class="t">${esc(m.n)}</span><span class="meta">${done} de ${m.items.length} passados</span></span>
      <span class="mod-prog"><span class="mod-count">${done}/${m.items.length}</span><span class="mod-bar"><i style="width:${Math.round(done/m.items.length*100)}%"></i></span></span>`;
    head.addEventListener("click", () => { ui.open[m.slug] = collapsed; saveUI(); renderList(); });
    mod.appendChild(head);

    const box = document.createElement("div");
    box.className = "items";
    rows.forEach(x => {
      const st = statusOf(x.k), r = recOf(x.k), cls = classify(x.t), sp = splitNum(x.t);
      const ld = r.lesson && state.lessons[r.lesson] ? state.lessons[r.lesson].date : "";
      const item = document.createElement("div");
      item.className = "item";
      item.dataset.s = st;
      item.innerHTML = `
        <div class="item-row" role="button" tabindex="0">
          <span class="mark"></span>
          <span class="name">${sp.num ? `<span class="num">${esc(sp.num)}</span>` : ""}<span class="txt">${esc(sp.rest)}</span></span>
          ${ld ? `<span class="date-badge">${fmtDate(ld)}</span>` : ""}
          ${cls ? `<span class="tag ${cls.c}">${cls.l}</span>` : ""}
          <button class="note-btn ${r.note ? "has" : ""}" title="Anotação" aria-label="Anotação"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>
        </div>
        ${r.note ? `<div class="note-view">${linkify(r.note)}</div>` : ""}`;
      const row = item.querySelector(".item-row");
      row.addEventListener("click", e => { if(e.target.closest(".note-btn")) return; assignToActive(x.k); });
      row.addEventListener("keydown", e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); assignToActive(x.k); } });
      item.querySelector(".note-btn").addEventListener("click", e => { e.stopPropagation(); openNote(x.k, x.t); });
      box.appendChild(item);
    });
    mod.appendChild(box);
    list.appendChild(mod);
  });

  if(!shown){
    const e = document.createElement("div");
    e.className = "empty";
    e.textContent = query ? "Nenhum assunto encontrado." : "Nenhum assunto neste filtro.";
    list.appendChild(e);
  }
}

// ---------- Aba Aulas ----------
function renderLessons(){
  const el = $("lessonList");
  const s = lessonsSorted();
  if(!s.length){
    el.innerHTML = `<div class="empty">Nenhuma aula ainda. Toque em “+ Nova aula” pra registrar a primeira — pode ser uma que já aconteceu.</div>`;
    return;
  }
  const latest = s[0].id;
  el.innerHTML = "";
  s.forEach(l => {
    const subs = subjectsOfLesson(l.id);
    const card = document.createElement("div");
    card.className = "lesson" + (l.id === latest ? " latest" : "");
    const p = (l.date || "").split("-");
    const dd = p.length === 3 ? p[2] : "–";
    const mm = p.length === 3 ? (MONTHS[parseInt(p[1],10)-1] || "") : "";
    card.innerHTML = `
      <div class="lesson-head">
        <div class="lesson-date"><div class="d">${dd}</div><div class="m">${mm}</div></div>
        <div class="lesson-info">
          <div class="lt">${esc(l.title || "Aula")}${l.id === latest ? `<span class="badge-latest">última aula</span>` : ""}</div>
          <div class="lm">${subs.length} assunto${subs.length === 1 ? "" : "s"} · ${l.date ? fmtDate(l.date) : "sem data"}</div>
        </div>
      </div>
      <div class="lesson-body">
        ${l.note ? `<div class="lesson-note">${linkify(l.note)}</div>` : ""}
        ${subs.length
          ? `<div class="subj-chips">${subs.map(x => `<span class="subj-chip"><span>${esc(x.t)}</span><button data-k="${x.k}" title="Tirar da aula" aria-label="Tirar da aula">×</button></span>`).join("")}</div>`
          : `<div class="lm" style="color:var(--ink-faint)">Nenhum assunto marcado. Deixe esta aula ativa e marque na aba Assuntos.</div>`}
        <div class="lesson-actions">
          <button class="btn" data-act="active" data-id="${l.id}">${ui.active === l.id ? "✓ Aula ativa" : "Marcar assuntos nela"}</button>
          <button class="btn" data-act="edit" data-id="${l.id}">Editar</button>
        </div>
        ${commentsHTML(l.id)}
      </div>`;

    card.querySelectorAll(".subj-chip button").forEach(b => b.addEventListener("click", () => removeFromLesson(b.dataset.k)));
    card.querySelector('[data-act="edit"]').addEventListener("click", () => openLesson(l.id));
    card.querySelector('[data-act="active"]').addEventListener("click", () => {
      ui.active = l.id; saveUI(); switchTab("assuntos"); toast("Agora marque os assuntos desta aula.");
    });
    bindComments(card, l.id);
    el.appendChild(card);
  });
}

// ---------- Barra de login ----------
export function renderAuth(){
  document.body.classList.toggle("is-editor", auth.isEditor);
  document.body.classList.toggle("is-auth", !!auth.session);
  const bar = $("authInfo");
  if(auth.session){
    bar.innerHTML = `<span class="who">${esc(auth.session.user.email)}${auth.isEditor ? " · <b>editor</b>" : ""}</span> <button class="btn" id="logout">Sair</button>`;
    $("logout").addEventListener("click", async () => { await api.signOut(); });
  }else{
    bar.innerHTML = `<button class="btn btn-primary" id="login">Entrar</button>`;
    $("login").addEventListener("click", openLogin);
  }
}

// ---------- Ações (assuntos / aulas) ----------
async function assignToActive(key){
  if(!canEdit()){ toast("Só editores marcam assuntos. Entre com uma conta autorizada."); return; }
  const act = ui.active;
  if(!act || !state.lessons[act]){ toast("Escolha ou crie uma aula ali em cima primeiro."); return; }
  const r = recOf(key);
  const now = r.lesson === act ? "" : act;   // alterna
  const note = r.note || "";
  if(!now && !note) delete state.subj[key]; else state.subj[key] = {lesson:now, note};
  render();
  try{ await api.persistSubj(key); }catch(e){ toast("Não consegui salvar (sem permissão?)."); }
}
async function setSubjNote(key, note){
  if(!canEdit()) return;
  const r = recOf(key), lesson = r.lesson || "";
  if(!note && !lesson) delete state.subj[key]; else state.subj[key] = {lesson, note};
  render();
  try{ await api.persistSubj(key); }catch(e){ toast("Não consegui salvar a anotação."); }
}
async function removeFromLesson(key){
  if(!canEdit()) return;
  const r = recOf(key);
  if(r.note) state.subj[key] = {lesson:"", note:r.note}; else delete state.subj[key];
  render();
  try{ await api.persistSubj(key); }catch(e){ toast("Não consegui atualizar."); }
}
function newId(){ return "l" + Date.now().toString(36) + Math.random().toString(36).slice(2,5); }
async function saveLessonData(id, d){
  state.lessons[id] = {date:d.date, title:d.title, note:d.note};
  render();
  try{ await api.persistLesson(id); }catch(e){ toast("Não consegui salvar a aula."); }
}
async function deleteLesson(id){
  Object.keys(state.subj).forEach(k => {
    if(state.subj[k].lesson === id){
      if(state.subj[k].note) state.subj[k] = {lesson:"", note:state.subj[k].note};
      else delete state.subj[k];
      api.persistSubj(k).catch(() => {});
    }
  });
  delete state.lessons[id];
  if(ui.active === id){ ui.active = ""; saveUI(); }
  render();
  try{ await api.deleteLessonRemote(id); }catch(e){ toast("Não consegui excluir a aula."); }
}
async function handleAddComment(bucketId, body, name){
  const lessonId = bucketId === GENERAL ? null : bucketId;
  try{ await api.addComment(lessonId, body, name); }catch(e){ toast("Não consegui enviar o comentário."); }
}
async function handleDeleteComment(id){
  try{ await api.deleteComment(id); }catch(e){ toast("Não consegui apagar."); }
}

// ---------- Modal: anotação de assunto ----------
function openNote(key, title){
  noteKey = key;
  $("nSub").textContent = title;
  const r = recOf(key);
  $("nText").value = r.note || "";
  $("nDelete").style.display = r.note ? "" : "none";
  $("noteBg").classList.add("show");
  setTimeout(() => $("nText").focus(), 30);
}
function closeNote(){ noteKey = null; $("noteBg").classList.remove("show"); }

// ---------- Modal: aula ----------
function openLesson(id){
  if(!canEdit()){ toast("Só editores criam ou editam aulas."); return; }
  lessonId = id;
  const editing = !!id && state.lessons[id];
  $("lTitle").textContent = editing ? "Editar aula" : "Nova aula";
  const today = new Date().toISOString().slice(0, 10);
  $("lDate").value = editing ? state.lessons[id].date : today;
  $("lTitleInp").value = editing ? (state.lessons[id].title || "") : "";
  $("lNote").value = editing ? (state.lessons[id].note || "") : "";
  $("lDelete").style.display = editing ? "" : "none";
  $("lessonBg").classList.add("show");
  setTimeout(() => $("lTitleInp").focus(), 30);
}
function closeLesson(){ lessonId = null; $("lessonBg").classList.remove("show"); }

// ---------- Modal: login ----------
function openLogin(){
  $("loginBg").classList.add("show");
  $("liStatus").textContent = "";
  $("liPass").value = "";
  setTimeout(() => $("liEmail").focus(), 30);
}
function closeLogin(){ $("loginBg").classList.remove("show"); }

// ---------- Abas ----------
export function switchTab(t){
  ui.tab = t; saveUI();
  document.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b.dataset.tab === t));
  $("viewAssuntos").hidden = t !== "assuntos";
  $("viewAulas").hidden = t !== "aulas";
}

// ---------- Ligações de eventos (uma vez, no início) ----------
export function initUI(){
  // filtros
  document.querySelectorAll(".chip").forEach(ch => {
    const go = () => { filter = filter === ch.dataset.k ? null : ch.dataset.k; renderStats(); renderList(); };
    ch.addEventListener("click", go);
    ch.addEventListener("keydown", e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); go(); } });
  });
  // busca / seletor de aula ativa
  $("q").addEventListener("input", e => { query = e.target.value; renderList(); });
  $("activeSel").addEventListener("change", e => { ui.active = e.target.value; saveUI(); });
  // recolher/expandir
  const toggleBtn = $("toggleAll");
  toggleBtn.addEventListener("click", () => {
    const anyOpen = MODULES.some(m => ui.open[m.slug] !== false);
    MODULES.forEach(m => ui.open[m.slug] = !anyOpen);
    toggleBtn.textContent = anyOpen ? "Expandir tudo" : "Recolher tudo";
    saveUI(); renderList();
  });
  // abas
  document.querySelectorAll(".tab").forEach(b => b.addEventListener("click", () => switchTab(b.dataset.tab)));

  // modal anotação
  $("nSave").addEventListener("click", () => { if(noteKey) setSubjNote(noteKey, $("nText").value.trim()); closeNote(); });
  $("nCancel").addEventListener("click", closeNote);
  $("nDelete").addEventListener("click", () => { if(noteKey) setSubjNote(noteKey, ""); closeNote(); });
  $("noteBg").addEventListener("click", e => { if(e.target === $("noteBg")) closeNote(); });

  // modal aula
  $("newLesson").addEventListener("click", () => openLesson(null));
  $("lSave").addEventListener("click", () => {
    const date = $("lDate").value;
    if(!date){ toast("Escolha a data da aula."); return; }
    const title = $("lTitleInp").value.trim();
    const note = $("lNote").value.trim();
    let id = lessonId, isNew = !id;
    if(!id) id = newId();
    saveLessonData(id, {date, title, note});
    if(isNew){ ui.active = id; saveUI(); }
    closeLesson(); render();
    if(isNew) toast("Aula criada. Marque os assuntos dela na aba Assuntos.");
  });
  $("lCancel").addEventListener("click", closeLesson);
  $("lDelete").addEventListener("click", () => {
    if(lessonId && confirm("Excluir esta aula? Os assuntos dela voltam para “próximos”.")){ deleteLesson(lessonId); closeLesson(); }
  });
  $("lessonBg").addEventListener("click", e => { if(e.target === $("lessonBg")) closeLesson(); });

  // modal login
  $("liCancel").addEventListener("click", closeLogin);
  $("loginBg").addEventListener("click", e => { if(e.target === $("loginBg")) closeLogin(); });
  $("liSend").addEventListener("click", async () => {
    const email = $("liEmail").value.trim();
    const password = $("liPass").value;
    const st = $("liStatus");
    if(!email || !password){ st.textContent = "Preencha e-mail e senha."; return; }
    if(!api.isReady()){ st.textContent = "Supabase não configurado."; return; }
    st.textContent = "Entrando…";
    try{
      const { error } = await api.signIn(email, password);
      if(error) throw error;
      closeLogin();
    }catch(e){ st.textContent = "Erro: " + (e.message || "verifique e-mail e senha"); }
  });

  // esc fecha modais
  document.addEventListener("keydown", e => {
    if(e.key === "Escape"){
      if($("noteBg").classList.contains("show")) closeNote();
      if($("lessonBg").classList.contains("show")) closeLesson();
      if($("loginBg").classList.contains("show")) closeLogin();
    }
  });
}
