
// ============================================
// SOL + ÁGUA — SCRIPT PRINCIPAL
// Menu, simuladores e acessibilidade
// ============================================


// ============================================
// 1. MENU DE NAVEGAÇÃO
// ============================================

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "Fechar menu" : "Menu";
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "Menu";
    });
  });
}


// ============================================
// 2. SIMULADOR 1 — LDR OU FOTODIODO?
// ============================================

const checkSensor = document.getElementById("checkSensor");
const sensorScenario = document.getElementById("sensorScenario");
const sensorResult = document.getElementById("sensorResult");

if (checkSensor && sensorScenario && sensorResult) {
  checkSensor.addEventListener("click", () => {

    const explanations = {
      automatic: {
        sensor: "LDR",
        explanation:
          "O LDR é adequado porque sua resistência elétrica varia conforme a intensidade da luz. Ele pode ajudar a identificar quando o ambiente está escuro e acionar uma lâmpada."
      },

      precision: {
        sensor: "Fotodiodo",
        explanation:
          "O fotodiodo é uma boa escolha porque responde rapidamente à luz e pode detectar pequenas variações na intensidade luminosa."
      },

      brightness: {
        sensor: "LDR",
        explanation:
          "O LDR é útil para monitorar a luminosidade de ambientes, pois sua resistência muda de acordo com a quantidade de luz recebida."
      },

      lightSignal: {
        sensor: "Fotodiodo",
        explanation:
          "O fotodiodo é indicado para detectar sinais luminosos rápidos, pois geralmente apresenta resposta mais veloz que um LDR."
      }
    };

    const answer = explanations[sensorScenario.value];

    if (!answer) return;

    sensorResult.innerHTML = `
      <h4>Sensor indicado: ${answer.sensor}</h4>
      <p>${answer.explanation}</p>
    `;
  });
}


// ============================================
// 3. SIMULADOR 2 — HORÁRIOS DO SOL
// ============================================

const sunTime = document.getElementById("sunTime");
const sunVisual = document.getElementById("sunVisual");
const sunResult = document.getElementById("sunResult");

function updateSunSimulation() {

  if (!sunTime || !sunVisual || !sunResult) return;

  const periods = {
    morning: {
      title: "Manhã",
      text:
        "Durante a manhã, o Sol aparenta subir no céu. A incidência de radiação depende do horário, da estação do ano e das condições do céu.",
      position: "25%",
      height: "75px"
    },

    noon: {
      title: "Meio-dia",
      text:
        "Por volta do meio-dia solar, o Sol costuma atingir uma posição mais alta no céu. Uma superfície bem orientada pode receber maior incidência de radiação.",
      position: "50%",
      height: "25px"
    },

    afternoon: {
      title: "Tarde",
      text:
        "Durante a tarde, o Sol aparenta se deslocar em direção ao horizonte. A incidência sobre uma superfície pode diminuir ou mudar conforme sua orientação.",
      position: "80%",
      height: "75px"
    }
  };

  const selected = periods[sunTime.value];

  if (!selected) return;

  sunVisual.style.setProperty(
    "--sun-position",
    selected.position
  );

  const sun = sunVisual.querySelector(".sun");

  if (sun) {
    sun.style.top = selected.height;
  }

  sunResult.innerHTML = `
    <h4>${selected.title}</h4>
    <p>${selected.text}</p>
  `;
}

if (sunTime) {
  sunTime.addEventListener("change", updateSunSimulation);
  updateSunSimulation();
}


// ============================================
// 4. SIMULADOR 3 — DESAFIO: AQUEÇA A PISCINA
// ============================================

const poolArea = document.getElementById("poolArea");
const sunHours = document.getElementById("sunHours");
const poolVolume = document.getElementById("poolVolume");

const poolAreaValue = document.getElementById("poolAreaValue");
const sunHoursValue = document.getElementById("sunHoursValue");
const poolVolumeValue = document.getElementById("poolVolumeValue");

const calculatePool = document.getElementById("calculatePoolChallenge");
const poolResult = document.getElementById("poolResult");


function updatePoolValues() {

  if (
    !poolArea ||
    !sunHours ||
    !poolVolume ||
    !poolAreaValue ||
    !sunHoursValue ||
    !poolVolumeValue
  ) {
    return;
  }

  poolAreaValue.textContent = `${poolArea.value} m²`;

  sunHoursValue.textContent = `${sunHours.value} horas`;

  poolVolumeValue.textContent = `${poolVolume.value} litros`;
}


// Atualiza os valores enquanto os controles são movimentados.

[poolArea, sunHours, poolVolume].forEach(input => {

  if (input) {
    input.addEventListener("input", updatePoolValues);
  }

});


// Calcula a estimativa de aquecimento.

if (
  calculatePool &&
  poolArea &&
  sunHours &&
  poolVolume &&
  poolResult
) {

  calculatePool.addEventListener("click", () => {

    const area = Number(poolArea.value);
    const hours = Number(sunHours.value);
    const volume = Number(poolVolume.value);

    if (
      !Number.isFinite(area) ||
      !Number.isFinite(hours) ||
      !Number.isFinite(volume) ||
      area <= 0 ||
      hours <= 0 ||
      volume <= 0
    ) {
      poolResult.textContent =
        "Verifique os valores informados e tente novamente.";

      return;
    }

    // Valores aproximados para fins educativos.
    const irradiance = 700;
    const efficiency = 0.45;

    // Energia aproveitada em joules.
    const energy =
      irradiance *
      area *
      hours *
      3600 *
      efficiency;

    // Aproximação: 1 litro de água equivale a 1 kg.
    const waterMass = volume;

    // Calor específico da água: 4186 J/kg°C.
    const temperatureIncrease =
      energy / (waterMass * 4186);

    const energyInMJ = energy / 1000000;

    poolResult.innerHTML = `
      <h4>Resultado estimado</h4>

      <p>
        Energia solar aproveitada:
        <strong>${energyInMJ.toFixed(2)} MJ</strong>
      </p>

      <p>
        Aumento teórico da temperatura:
        <strong>${temperatureIncrease.toFixed(2)} °C</strong>
      </p>

      <p>
        Esta é uma estimativa simplificada. Na prática,
        perdas de calor, clima, circulação da água e
        características do coletor alteram o resultado.
      </p>
    `;

  });

}

updatePoolValues();


// ============================================
// 5. AUTOMAÇÃO DA ILUMINAÇÃO
// ============================================

const automationButton =
  document.getElementById("automationButton");

const automationState =
  document.getElementById("automationState");

if (automationButton && automationState) {

  let automationActive = false;

  automationButton.addEventListener("click", () => {

    automationActive = !automationActive;

    if (automationActive) {

      automationState.textContent = "Iluminação ligada";
      automationButton.textContent = "Desativar automação";

    } else {

      automationState.textContent = "Iluminação desligada";
      automationButton.textContent = "Ativar automação";

    }

  });

}



// ============================================
// 6. ACESSIBILIDADE
// ============================================

// TAMANHO DA FONTE



// ALTO CONTRASTE

const contrastButton = document.getElementById("contrastButton");

if (contrastButton) {
    contrastButton.addEventListener("click", () => {
        document.body.classList.toggle("high-contrast");

        const ativo = document.body.classList.contains("high-contrast");

        contrastButton.textContent = ativo
            ? "Desativar alto contraste"
            : "Alto contraste";
    });
}


 // TAMANHO DA FONTE

let fontScale = 1;

function applyFontScale() {
    document.querySelectorAll(
        "main, header, footer"
    ).forEach(element => {
        element.style.zoom = fontScale;
    });
}

const increaseFont = document.getElementById("increaseFont");
const decreaseFont = document.getElementById("decreaseFont");
const resetFont = document.getElementById("resetFont");

if (increaseFont) {
    increaseFont.addEventListener("click", () => {
        fontScale = Math.min(fontScale + 0.1, 1.5);
        applyFontScale();
    });
}

if (decreaseFont) {
    decreaseFont.addEventListener("click", () => {
        fontScale = Math.max(fontScale - 0.1, 0.8);
        applyFontScale();
    });
}

if (resetFont) {
    resetFont.addEventListener("click", () => {
        fontScale = 1;
        applyFontScale();
    });
}


// FONTE OPENDYSLEXIC

const dyslexiaButton = document.getElementById("dyslexiaButton");

if (dyslexiaButton) {
    dyslexiaButton.addEventListener("click", () => {
        document.body.classList.toggle("dyslexia-font");

        const ativo = document.body.classList.contains("dyslexia-font");

        dyslexiaButton.textContent = ativo
            ? "Desativar fonte para dislexia"
            : "Fonte para dislexia";
    });
}


