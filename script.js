// SOL + AGUA — interações dos simuladores e recursos de acessibilidade

// Menu de navegação
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

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


// Simulador de comparação de distâncias
// Modelo ideal: intensidade proporcional a 1 / distância².


});


// Simulador de aquecimento da piscina
// Q = irradiância x área x tempo x eficiência

// Simulador de luminosidade do LDR


  });


// Aumentar e diminuir o tamanho do texto

let fontScale = 100;

function applyFontScale() {
  document.documentElement.style.fontSize =
    `${fontScale}%`;
}

document
  .getElementById("increaseFont")
  .addEventListener("click", () => {
    fontScale = Math.min(130, fontScale + 10);
    applyFontScale();
  });

document
  .getElementById("decreaseFont")
  .addEventListener("click", () => {
    fontScale = Math.max(80, fontScale - 10);
    applyFontScale();
  });

document
  .getElementById("resetFont")
  .addEventListener("click", () => {
    fontScale = 100;
    applyFontScale();
  });


/* =====================================
   SIMULADOR 1 - LDR OU FOTODIODO?
===================================== */

const checkSensor = document.getElementById("checkSensor");

if (checkSensor) {
  checkSensor.addEventListener("click", () => {
    const scenario = document.getElementById("sensorScenario").value;
    const result = document.getElementById("sensorResult");

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
          "O fotodiodo é indicado para detectar sinais luminosos rápidos, pois possui resposta mais veloz que um LDR em muitas aplicações."
      }
    };

    const answer = explanations[scenario];

    result.innerHTML = `
      <h4>Sensor indicado: ${answer.sensor}</h4>
      <p>${answer.explanation}</p>
    `;
  });
}


/* =====================================
   SIMULADOR 2 - HORÁRIOS DO SOL
===================================== */

const sunTime = document.getElementById("sunTime");

function updateSunSimulation() {
  if (!sunTime) return;

  const visual = document.getElementById("sunVisual");
  const result = document.getElementById("sunResult");

  const periods = {
    morning: {
      title: "Manhã",
      text:
        "No período da manhã, a posição do Sol muda gradualmente. A incidência de radiação depende do horário, da estação do ano e das condições do céu.",
      position: "25%"
    },
    noon: {
      title: "Meio-dia",
      text:
        "Por volta do meio-dia solar, o Sol costuma atingir uma posição mais alta no céu. Em muitas situações, uma superfície bem orientada recebe maior incidência de radiação.",
      position: "50%"
    },
    afternoon: {
      title: "Tarde",
      text:
        "Durante a tarde, o Sol aparenta se deslocar em direção ao horizonte. A incidência sobre uma superfície pode diminuir ou mudar conforme sua orientação.",
      position: "80%"
    }
  };

  const selected = periods[sunTime.value];

  visual.style.setProperty("--sun-position", selected.position);

  result.innerHTML = `
    <h4>${selected.title}</h4>
    <p>${selected.text}</p>
  `;
}

if (sunTime) {
  sunTime.addEventListener("change", updateSunSimulation);
  updateSunSimulation();
}


/* =====================================
   SIMULADOR 3 - AQUECIMENTO DA PISCINA
===================================== */

const poolArea = document.getElementById("poolArea");
const sunHours = document.getElementById("sunHours");
const poolVolume = document.getElementById("poolVolume");

function updatePoolValues() {
  if (!poolArea || !sunHours || !poolVolume) return;

  document.getElementById("poolAreaValue").textContent =
    `${poolArea.value} m²`;

  document.getElementById("sunHoursValue").textContent =
    `${sunHours.value} horas`;

  document.getElementById("poolVolumeValue").textContent =
    `${poolVolume.value} litros`;
}

[poolArea, sunHours, poolVolume].forEach(input => {
  if (input) {
    input.addEventListener("input", updatePoolValues);
  }
});

const calculatePool = document.getElementById("calculatePool");

if (calculatePool) {
  calculatePool.addEventListener("click", () => {
    const area = Number(poolArea.value);
    const hours = Number(sunHours.value);
    const volume = Number(poolVolume.value);

    // Valores didáticos aproximados:
    // radiação média de 700 W/m² e eficiência de 45%.
    const irradiance = 700;
    const efficiency = 0.45;

    const energy = irradiance * area * hours * 3600 * efficiency;

    // Aproximação: 1 litro de água equivale a 1 kg.
    const waterMass = volume;
    const temperatureIncrease =
      energy / (waterMass * 4186);

    const result = document.getElementById("poolResult");

    result.innerHTML = `
      <h4>Resultado estimado</h4>
      <p>
        Energia aproveitada: ${(energy / 1000000).toFixed(2)} MJ
      </p>
      <p>
        Aumento teórico de temperatura:
        <strong>${temperatureIncrease.toFixed(2)} °C</strong>
      </p>
      <p>
        Esta é uma estimativa simplificada. Na prática, perdas de calor,
        temperatura inicial, circulação da água, clima e características
        do coletor alteram o resultado.
      </p>
    `;
  });
}

updatePoolValues();
