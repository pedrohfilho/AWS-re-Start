// ============================================================
//  main.js — Inicialização e orquestração
// ============================================================

import { configured } from "./config.js";
import { ui } from "./store.js";
import * as api from "./api.js";
import { render, renderAuth, switchTab, initUI, setConn } from "./ui.js";

// 1) Interface (uma vez) + primeira pintura com o estado vazio
initUI();
switchTab(ui.tab || "assuntos");
render();

// 2) Conexão com o Supabase
if(!configured()){
  document.getElementById("cfgWarn").style.display = "block";
  setConn("Falta configurar o Supabase", "local");
  renderAuth();
}else{
  api.init();
  api.setOnData(render);                 // toda mudança de dados repinta a tela
  (async () => {
    await api.refreshSession();
    await api.refreshEditor();
    renderAuth();
    setConn("Conectado", "on");
    await api.loadAll();
    api.subscribeRealtime();
    api.onAuthChange(() => { renderAuth(); render(); });
  })();
}
