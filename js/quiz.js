/**
 * quiz.js — Enquesta anònima de claustre sobre l'ús de la IA
 * Escola Giroi · Formació Digital
 *
 * Sense retroalimentació individual: l'objectiu és recollir les respostes
 * del conjunt de l'equip docent per alimentar la gràfica de visió general del claustre.
 */

'use strict';

// ================================================================
// PREGUNTES DE L'ENQUESTA DE CLAUSTRE (LLENGUATGE INCLUSIU)
// ================================================================

const SURVEY_QUESTIONS = [
  {
    id: 1,
    title: "1. Freqüència d'ús de la IA",
    text: "Amb quina freqüència utilitzeu eines d'intel·ligència artificial (com ChatGPT, Gemini, Copilot o similars) en la pràctica educativa quotidiana?",
    options: [
      { id: "1a", key: "mai", label: "Mai o gairebé mai (no s'utilitza o només per curiositat puntual fora de l'escola)" },
      { id: "1b", key: "esporadic", label: "Ús esporàdic (un cop al mes o en moments puntuals de cerca d'idees)" },
      { id: "1c", key: "setmanal", label: "Ús setmanal (forma part habitual de la planificació o preparació d'activitats)" },
      { id: "1d", key: "diari", label: "Ús intensiu / diari (està plenament integrada en la rutina professional)" }
    ]
  },
  {
    id: 2,
    title: "2. En què es basa aquest ús de la IA?",
    text: "Si feu servir la IA (o teniu intenció de fer-la servir), en quina tasca principal se situa aquest ús?",
    options: [
      { id: "2a", key: "creativitat", label: "Inspiració i disseny d'activitats: trobar idees per a reptes, projectes o jocs motrius" },
      { id: "2b", key: "dua", label: "Inclusió i DUA: adaptar lectures a diferents ritmes o generar suports visuals per a tothom" },
      { id: "2c", key: "avaluacio", label: "Avaluació formadora: redacció de rúbriques, criteris d'assoliment o preguntes de reflexió" },
      { id: "2d", key: "gestio", label: "Gestió i comunicació: redactar missatges a les famílies, síntesi de reunions o documents" },
      { id: "2e", key: "cap", label: "Encara no té cap aplicació concreta en la tasca docent" }
    ]
  },
  {
    id: 3,
    title: "3. Com es formulen les peticions (prompts)?",
    text: "Com s'acostuma a interactuar amb l'eina d'IA a l'hora de demanar propostes?",
    options: [
      { id: "3a", key: "cercador", label: "Consultes curtes i ràpides d'estil cercador (ex: 'activitat tardor 2n')" },
      { id: "3b", key: "context_basic", label: "Instruccions amb context bàsic (s'indica el curs i el tema general de treball)" },
      { id: "3c", key: "estructurat", label: "Prompts estructurats (s'especifica rol, objectiu pedagògic, edat del grup i format desitjat)" },
      { id: "3d", key: "no_faig", label: "Encara no s'han formulat peticions a cap eina d'IA" }
    ]
  },
  {
    id: 4,
    title: "4. Revisió i filtre del contingut generat",
    text: "Quan la IA proporciona una proposta o text, com s'actua abans de portar-lo a l'aula?",
    options: [
      { id: "4a", key: "directe", label: "S'utilitza pràcticament de manera directa per optimitzar el temps si té bon aspecte" },
      { id: "4b", key: "ortografia", label: "Es fa una lectura per revisar la llengua i l'estil, sense aprofundir gaire més" },
      { id: "4c", key: "critic", label: "Es revisa a fons el contingut: es contrasten dades, s'eliminen biaixos i s'adapta al grup" },
      { id: "4d", key: "no_aplica", label: "No aplica (no s'han generat mai continguts amb IA)" }
    ]
  },
  {
    id: 5,
    title: "5. Protecció de dades (RGPD) de l'alumnat",
    text: "Com es gestiona la informació de l'alumnat quan s'interactua amb eines d'IA?",
    options: [
      { id: "5a", key: "desconeixement", label: "No s'havia plantejat: alguna vegada s'han introduït textos o comentaris amb noms reals" },
      { id: "5b", key: "parcial", label: "Només es posa el nom de pila, mai cognoms ni imatges" },
      { id: "5c", key: "anonim_total", label: "Anonimització estricta: mai s'introdueixen dades personals reals ni identificables" },
      { id: "5d", key: "no_faig", label: "No s'utilitzen eines d'IA" }
    ]
  },
  {
    id: 6,
    title: "6. Quina és la necessitat o preocupació principal?",
    text: "Què creieu que necessita prioritàriament el nostre claustre respecte a la IA?",
    options: [
      { id: "6a", key: "formacio_practica", label: "Formació pràctica: aprendre a crear recursos concrets per a l'aula" },
      { id: "6b", key: "criteris_centre", label: "Acords de claustre: consensuar quan i com té sentit utilitzar-la a l'Escola Giroi" },
      { id: "6c", key: "preocupacio_etica", label: "Debat ètic: analitzar els impactes en l'aprenentatge, el pensament crític i la privacitat" },
      { id: "6d", key: "temps", label: "Temps per investigar i compartir experiències pedagògiques al claustre" }
    ]
  }
];

// ================================================================
// RENDERITZAT DEL FORMULARI SENSE RETROALIMENTACIÓ INDIVIDUAL
// ================================================================

function renderSurvey() {
  const container = document.getElementById('survey-container');
  if (!container) return;

  let formHtml = `
    <form id="claustre-survey-form" onsubmit="submitSurvey(event)" novalidate>
  `;

  SURVEY_QUESTIONS.forEach((q, idx) => {
    const optionsHtml = q.options.map(opt => `
      <li class="option-item">
        <input
          type="radio"
          class="option-input"
          id="opt-${opt.id}"
          name="question-${q.id}"
          value="${opt.key}"
          required
        >
        <label class="option-label" for="opt-${opt.id}">
          <span class="option-marker" aria-hidden="true"></span>
          <span>${escapeHtml(opt.label)}</span>
        </label>
      </li>
    `).join('');

    formHtml += `
      <fieldset class="question-block" style="border:none; margin-bottom:2rem;">
        <legend class="question-header" style="display:flex; align-items:center; gap:0.5rem; width:100%;">
          <span class="question-number" aria-hidden="true">Pregunta ${idx + 1}</span>
          <span style="font-weight:700; font-size:1.15rem; color:var(--color-primary);">${escapeHtml(q.title)}</span>
        </legend>
        <p class="question-text" style="margin-top:0.5rem; font-size:1.1rem;">
          ${escapeHtml(q.text)}
        </p>
        <ul class="options-list" role="list">
          ${optionsHtml}
        </ul>
      </fieldset>
    `;
  });

  formHtml += `
      <div id="survey-validation-alert" class="alert alert-warning" style="display:none;" role="alert">
        <span class="alert-icon" aria-hidden="true">⚠️</span>
        <div class="alert-body">
          <strong>Falten preguntes per respondre:</strong> Si us plau, seleccioneu una resposta a cadascuna de les 6 preguntes abans de trametre el formulari.
        </div>
      </div>

      <div style="text-align:center; margin-top:2.5rem; margin-bottom:2rem;">
        <button type="submit" class="btn btn-primary btn-lg" id="submit-survey-btn" style="padding:1rem 2.5rem; font-size:1.25rem;">
          ✉️ Enviar la resposta anònima
        </button>
        <p style="margin-top:0.75rem; font-size:0.9rem; color:var(--color-neutral);">
          🔒 Resposta 100% anònima. S'afegirà a la gràfica general de l'Escola Giroi.
        </p>
      </div>
    </form>

    <!-- PANELL D'ÈXIT EN ENVIAR -->
    <div id="survey-success-panel" class="card text-center" style="display:none; padding:3rem 2rem; background:var(--color-white); border-top:6px solid var(--color-success);">
      <span style="font-size:3.5rem;" aria-hidden="true">🎉</span>
      <h2 style="color:var(--color-success); margin-top:1rem;">Resposta enviada correctament!</h2>
      <p style="font-size:1.2rem; max-width:650px; margin:1rem auto 2rem;">
        Moltes gràcies per la col·laboració. La resposta s'ha recollit de forma totalment anònima i ja forma part de la diagnosi general del claustre.
      </p>
      <div class="alert alert-info" style="max-width:650px; margin:0 auto 2rem; text-align:left;">
        <span class="alert-icon" aria-hidden="true">📺</span>
        <div class="alert-body">
          <strong>Atenció a la pantalla de la sala:</strong><br>
          Es projectarà la <strong>gràfica general en temps real</strong> amb el recull de tot el claustre per analitzar-la de manera compartida.
        </div>
      </div>
      <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
        <a href="resultats.html" class="btn btn-secondary btn-lg">
          📊 Veure la Gràfica General del Claustre
        </a>
        <a href="eines.html" class="btn btn-primary btn-lg">
          🛠️ Explorar el Repositori d'Eines d'IA
        </a>
      </div>
    </div>
  `;

  container.innerHTML = formHtml;
}

// ================================================================
// GESTIÓ DE L'ENVIAMENT ANÒNIM
// ================================================================

function submitSurvey(event) {
  event.preventDefault();

  const answers = {};
  let allAnswered = true;

  SURVEY_QUESTIONS.forEach(q => {
    const selected = document.querySelector(`input[name="question-${q.id}"]:checked`);
    if (selected) {
      answers[q.id] = selected.value;
    } else {
      allAnswered = false;
    }
  });

  const alertBox = document.getElementById('survey-validation-alert');

  if (!allAnswered) {
    if (alertBox) {
      alertBox.style.display = 'flex';
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  if (alertBox) alertBox.style.display = 'none';

  saveAnonymousResponse(answers);

  const form = document.getElementById('claustre-survey-form');
  const successPanel = document.getElementById('survey-success-panel');

  if (form) form.style.display = 'none';
  if (successPanel) {
    successPanel.style.display = 'block';
    successPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function saveAnonymousResponse(answers) {
  const STORAGE_KEY = 'giroi_ia_survey_data';
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');

  if (!data) {
    data = initAggregatedData();
  }

  data.totalParticipants += 1;
  data.lastUpdated = new Date().toISOString();

  if (answers[1]) data.q1[answers[1]] = (data.q1[answers[1]] || 0) + 1;
  if (answers[2]) data.q2[answers[2]] = (data.q2[answers[2]] || 0) + 1;
  if (answers[3]) data.q3[answers[3]] = (data.q3[answers[3]] || 0) + 1;
  if (answers[4]) data.q4[answers[4]] = (data.q4[answers[4]] || 0) + 1;
  if (answers[5]) data.q5[answers[5]] = (data.q5[answers[5]] || 0) + 1;
  if (answers[6]) data.q6[answers[6]] = (data.q6[answers[6]] || 0) + 1;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function initAggregatedData() {
  return {
    totalParticipants: 0,
    lastUpdated: new Date().toISOString(),
    q1: { mai: 0, esporadic: 0, setmanal: 0, diari: 0 },
    q2: { creativitat: 0, dua: 0, avaluacio: 0, gestio: 0, cap: 0 },
    q3: { cercador: 0, context_basic: 0, estructurat: 0, no_faig: 0 },
    q4: { directe: 0, ortografia: 0, critic: 0, no_aplica: 0 },
    q5: { desconeixement: 0, parcial: 0, anonim_total: 0, no_faig: 0 },
    q6: { formacio_practica: 0, criteris_centre: 0, preocupacio_etica: 0, temps: 0 }
  };
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  renderSurvey();
});
