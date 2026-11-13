/**
 * dashboard.js — Panell de visualització de les respostes de tot el claustre
 * Escola Giroi · Formació Digital
 *
 * Mostra les gràfiques agregades del claustre:
 *   1. Freqüència i grau d'ús de la IA a l'escola
 *   2. En què es basa aquest ús (àrees d'aplicació educativa)
 *   3. Formulació de peticions (prompts)
 *   4. Nivell de revisió i filtre crític
 *   5. Protecció de dades de l'alumnat
 *   6. Necessitats prioritàries de claustre
 */

'use strict';

const STORAGE_KEY = 'giroi_ia_survey_data';

// Dades de mostra representatives del claustre de l'Escola Giroi (22 respostes)
const DEFAULT_CLAUSTRE_SAMPLE = {
  totalParticipants: 22,
  lastUpdated: new Date().toISOString(),
  q1: { mai: 8, esporadic: 9, setmanal: 4, diari: 1 },
  q2: { creativitat: 9, dua: 5, avaluacio: 3, gestio: 2, cap: 3 },
  q3: { cercador: 10, context_basic: 7, estructurat: 3, no_faig: 2 },
  q4: { directe: 4, ortografia: 9, critic: 7, no_aplica: 2 },
  q5: { desconeixement: 5, parcial: 6, anonim_total: 9, no_faig: 2 },
  q6: { formacio_practica: 11, criteris_centre: 5, preocupacio_etica: 3, temps: 3 }
};

document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
});

function initDashboard() {
  let data = getSurveyData();

  if (!data || data.totalParticipants === 0) {
    data = DEFAULT_CLAUSTRE_SAMPLE;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  renderDashboard(data);
}

function getSurveyData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (e) {
    return null;
  }
}

function renderDashboard(data) {
  const total = data.totalParticipants || 0;

  const countEl = document.getElementById('total-participants-count');
  if (countEl) countEl.textContent = total;

  // GRÀFICA 1: FREQÜÈNCIA D'ÚS
  renderBarChart('chart-frequency', [
    { label: "Mai o gairebé mai", count: data.q1.mai, total: total, color: "#7f8c8d" },
    { label: "Ús esporàdic (puntual)", count: data.q1.esporadic, total: total, color: "#2980b9" },
    { label: "Ús setmanal (habitual)", count: data.q1.setmanal, total: total, color: "#1a7d3f" },
    { label: "Ús intensiu / diari", count: data.q1.diari, total: total, color: "#8e44ad" }
  ]);

  // GRÀFICA 2: EN QUÈ ES BASA L'ÚS
  renderBarChart('chart-use-basis', [
    { label: "💡 Inspiració i disseny d'activitats", count: data.q2.creativitat, total: total, color: "#2980b9" },
    { label: "♿ Inclusió DUA i adaptació de textos", count: data.q2.dua, total: total, color: "#16a085" },
    { label: "📊 Avaluació formadora i rúbriques", count: data.q2.avaluacio, total: total, color: "#1a7d3f" },
    { label: "⏱️ Gestió i comunicació", count: data.q2.gestio, total: total, color: "#e67e22" },
    { label: "⚪ Encara no té aplicació a l'aula", count: data.q2.cap, total: total, color: "#95a5a6" }
  ]);

  // GRÀFICA 3: FORMULACIÓ DE PROMPTS
  renderBarChart('chart-prompts', [
    { label: "Consultes ràpides d'estil cercador", count: data.q3.cercador, total: total, color: "#e67e22" },
    { label: "Context bàsic (tema i curs)", count: data.q3.context_basic, total: total, color: "#2980b9" },
    { label: "Prompts estructurats (rol, context, format)", count: data.q3.estructurat, total: total, color: "#1a7d3f" },
    { label: "No s'han formulat mai peticions", count: data.q3.no_faig, total: total, color: "#7f8c8d" }
  ]);

  // GRÀFICA 4: REVISIÓ I FILTRE
  renderBarChart('chart-review', [
    { label: "Ús directe per optimitzar el temps", count: data.q4.directe, total: total, color: "#c0392b" },
    { label: "Lectura ràpida (llengua i estil)", count: data.q4.ortografia, total: total, color: "#f39c12" },
    { label: "Revisió crítica a fons (dades, biaixos)", count: data.q4.critic, total: total, color: "#1a7d3f" },
    { label: "No aplica (no es genera contingut)", count: data.q4.no_aplica, total: total, color: "#7f8c8d" }
  ]);

  // GRÀFICA 5: PROTECCIÓ DE DADES
  renderBarChart('chart-rgpd', [
    { label: "Desconeixement (s'havien posat noms)", count: data.q5.desconeixement, total: total, color: "#c0392b" },
    { label: "Només nom de pila (parcial)", count: data.q5.parcial, total: total, color: "#f39c12" },
    { label: "Anonimització estricta / entorns segurs", count: data.q5.anonim_total, total: total, color: "#1a7d3f" },
    { label: "No s'utilitzen eines d'IA", count: data.q5.no_faig, total: total, color: "#7f8c8d" }
  ]);

  // GRÀFICA 6: PRIORITATS DEL CLAUSTRE
  renderBarChart('chart-needs', [
    { label: "🎓 Formació pràctica per a l'aula", count: data.q6.formacio_practica, total: total, color: "#1a5276" },
    { label: "📋 Acords i criteris de centre (Giroi)", count: data.q6.criteris_centre, total: total, color: "#16a085" },
    { label: "⚖️ Debat ètic i impacte educatiu", count: data.q6.preocupacio_etica, total: total, color: "#8e44ad" },
    { label: "⏳ Temps per provar i compartir", count: data.q6.temps, total: total, color: "#e67e22" }
  ]);
}

/**
 * Renderitza barres de percentatge visuals, vives i accessibles
 */
function renderBarChart(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let html = '<div style="display:flex; flex-direction:column; gap:0.95rem;">';

  items.forEach(item => {
    const count = item.count || 0;
    const total = item.total > 0 ? item.total : 1;
    const pct = Math.round((count / total) * 100);

    html += `
      <div role="group" aria-label="${escapeHtml(item.label)}: ${count} respostes (${pct}%)" style="font-size:0.95rem;">
        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.35rem;">
          <span style="font-weight:700; color:#111827;">${escapeHtml(item.label)}</span>
          <span style="font-weight:800; font-size:1.05rem; color:#111827; background:#ffffff; padding:0.15em 0.6em; border-radius:1em; border:2px solid ${item.color}; box-shadow:0 1px 4px rgba(0,0,0,0.08);">
            ${count} <small style="font-size:0.85em; font-weight:800; color:#1f2937;">(${pct}%)</small>
          </span>
        </div>
        <div style="width:100%; height:20px; background:#e2e8f0; border-radius:10px; overflow:hidden; box-shadow:inset 0 1px 3px rgba(0,0,0,0.1);">
          <div style="width:${pct}%; height:100%; background:linear-gradient(90deg, ${item.color} 0%, ${item.color}dd 100%); border-radius:10px; transition:width 0.8s cubic-bezier(0.4, 0, 0.2, 1); box-shadow:0 2px 6px ${item.color}55;"></div>
        </div>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;
}

// ================================================================
// CONTROLS DE DINAMITZACIÓ
// ================================================================

function loadSampleData() {
  if (confirm("Voleu carregar la mostra representativa del claustre de l'Escola Giroi (22 respostes)?")) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CLAUSTRE_SAMPLE));
    renderDashboard(DEFAULT_CLAUSTRE_SAMPLE);
  }
}

function resetSurveyData() {
  if (confirm("Voleu reiniciar les respostes a 0 per començar una nova recollida en directe?")) {
    const emptyData = {
      totalParticipants: 0,
      lastUpdated: new Date().toISOString(),
      q1: { mai: 0, esporadic: 0, setmanal: 0, diari: 0 },
      q2: { creativitat: 0, dua: 0, avaluacio: 0, gestio: 0, cap: 0 },
      q3: { cercador: 0, context_basic: 0, estructurat: 0, no_faig: 0 },
      q4: { directe: 0, ortografia: 0, critic: 0, no_aplica: 0 },
      q5: { desconeixement: 0, parcial: 0, anonim_total: 0, no_faig: 0 },
      q6: { formacio_practica: 0, criteris_centre: 0, preocupacio_etica: 0, temps: 0 }
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(emptyData));
    renderDashboard(emptyData);
  }
}

function refreshDashboard() {
  const data = getSurveyData() || DEFAULT_CLAUSTRE_SAMPLE;
  renderDashboard(data);
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
