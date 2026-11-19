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

function updateDistances() {
  const ids = ["A", "B", "C"];

  const distances = ids.map(id =>
    Number(document.getElementById(`distance${id}`).value)
  );

  if (
    distances.some(value =>
      !Number.isFinite(value) || value <= 0
    )
  ) {
    return;
  }

  const intensities = distances.map(distance =>
    1 / (distance * distance)
  );

  const reference = Math.max(...intensities);

  ids.forEach((id, index) => {
    const relative = (intensities[index] / reference) * 100;

    document.getElementById(`value${id}`).textContent =
      `${relative.toLocaleString("pt-BR", {
        maximumFractionDigits: 2
      })} unidades relativas`;

    document.getElementById(`bar${id}`).style.width =
      `${relative}%`;
  });

  const highestIndex = intensities.indexOf(reference);

  document.getElementById("distanceMessage").textContent =
    `O sensor ${ids[highestIndex]} recebe a maior intensidade relativa neste exemplo.`;
}

["A", "B", "C"].forEach(id => {
  document
    .getElementById(`distance${id}`)
    .addEventListener("input", updateDistances);
});


// Simulador de aquecimento da piscina
// Q = irradiância x área x tempo x eficiência

function calculatePool() {
  const irradiance = Number(
    document.getElementById("irradiance").value
  );

  const area = Number(
    document.getElementById("collectorArea").value
  );

  const hours = Number(
    document.getElementById("exposureTime").value
  );

  const liters = Number(
    document.getElementById("waterVolume").value
  );

  const efficiency =
    Number(document.getElementById("efficiency").value) / 100;

  const values = [
    irradiance,
    area,
    hours,
    liters,
    efficiency
  ];

  if (
    values.some(value =>
      !Number.isFinite(value) || value <= 0
    ) ||
    efficiency > 1
  ) {
    document.getElementById("energyResult").textContent =
      "Verifique os valores";

    document.getElementById("temperatureResult").textContent =
      "—";

    return;
  }

  const energyJoules =
    irradiance * area * hours * 3600 * efficiency;

  // Aproximação: 1 litro de água equivale a 1 kg.
  const waterMassKg = liters;

  const temperatureRise =
    energyJoules / (waterMassKg * 4186);

  document.getElementById("energyResult").textContent =
    `${(energyJoules / 1e6).toLocaleString("pt-BR", {
      maximumFractionDigits: 2
    })} MJ`;

  document.getElementById("temperatureResult").textContent =
    `${temperatureRise.toLocaleString("pt-BR", {
      maximumFractionDigits: 2
    })} °C`;
}

document
  .getElementById("calculatePool")
  .addEventListener("click", calculatePool);


// Simulador de luminosidade do LDR

const lightRange = document.getElementById("lightRange");

function updateLight() {
  const light = Number(lightRange.value);
  const resistance = 100 - light;

  document.getElementById("lightValue").textContent =
    `${light}%`;

  document.getElementById("ldrResistance").textContent =
    `${resistance}%`;

  document.getElementById("meterFill").style.width =
    `${light}%`;

  let state = "Iluminação moderada";

  if (light < 25) {
    state = "Pouca iluminação";
  } else if (light > 75) {
    state = "Muita iluminação";
  }

  document.getElementById("lightState").textContent =
    state;
}

lightRange.addEventListener("input", updateLight);
updateLight();


// Automação ilustrativa da iluminação

let automationOn = false;

document
  .getElementById("automationButton")
  .addEventListener("click", () => {
    automationOn = !automationOn;

    document.getElementById("automationState").textContent =
      automationOn
        ? "Iluminação ligada"
        : "Iluminação desligada";

    document.getElementById("automationButton").textContent =
      automationOn
        ? "Desativar automação"
        : "Ativar automação";
  });


// Recursos de acessibilidade

// Alto contraste
document
  .getElementById("contrastButton")
  .addEventListener("click", () => {
    document.body.classList.toggle("high-contrast");
  });


// Fonte OpenDyslexic
document
  .getElementById("dyslexiaButton")
  .addEventListener("click", () => {
    document.body.classList.toggle("dyslexia-font");
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
