
// ==================================
// MENU RESPONSIVO
// ==================================

const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {

    const aberto = menu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", aberto);
    menuToggle.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

});

document.querySelectorAll("#menu a").forEach(link => {

    link.addEventListener("click", () => {
        menu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
    });

});


// ==================================
// SIMULADOR DE LUMINOSIDADE
// ==================================

const lightRange = document.getElementById("lightRange");

const lightValue = document.getElementById("lightValue");
const lightStatus = document.getElementById("lightStatus");

const progressBar = document.getElementById("progressBar");
const resistance = document.getElementById("resistance");

const sunIcon = document.getElementById("sunIcon");
const sensorState = document.getElementById("sensorState");


function updateSensor() {

    const luz = Number(lightRange.value);

    // Modelo didático simplificado:
    // maior iluminação = menor resistência relativa.

    const resistenciaLDR = 100 - luz;

    lightValue.textContent = luz + "%";

    progressBar.style.width = luz + "%";

    resistance.textContent = resistenciaLDR + "%";

    sensorState.textContent = "Ativo";

    if (luz < 25) {

        lightStatus.textContent = "Ambiente escuro";
        sunIcon.style.opacity = "0.3";

    } else if (luz < 70) {

        lightStatus.textContent = "Luminosidade moderada";
        sunIcon.style.opacity = "0.7";

    } else {

        lightStatus.textContent = "Ambiente muito iluminado";
        sunIcon.style.opacity = "1";

    }

}

lightRange.addEventListener("input", updateSensor);

updateSensor();


// ==================================
// AUTOMAÇÃO INTELIGENTE
// ==================================

const autoButton = document.getElementById("autoButton");

const lamp = document.getElementById("lamp");

const lampStatus = document.getElementById("lampStatus");

const automationMessage = document.getElementById(
    "automationMessage"
);

let automacaoAtiva = false;


function updateAutomation() {

    const luz = Number(lightRange.value);

    if (!automacaoAtiva) {

        lamp.classList.remove("on");

        lampStatus.textContent = "Automação desligada";

        automationMessage.textContent =
            "Ative a automação para simular o controle inteligente.";

        return;
    }

    if (luz < 40) {

        lamp.classList.add("on");

        lampStatus.textContent = "Iluminação ligada";

        automationMessage.textContent =
            "O ambiente está escuro. O sistema ativou a iluminação.";

    } else {

        lamp.classList.remove("on");

        lampStatus.textContent = "Iluminação desligada";

        automationMessage.textContent =
            "O ambiente possui iluminação suficiente. Energia preservada!";

    }

}


autoButton.addEventListener("click", () => {

    automacaoAtiva = !automacaoAtiva;

    autoButton.textContent = automacaoAtiva
        ? "Desativar automação"
        : "Ativar automação";

    updateAutomation();

});

lightRange.addEventListener("input", updateAutomation);


// ==================================
// MODO ALTO CONTRASTE
// ==================================

const contrastButton = document.getElementById("contrastButton");

contrastButton.addEventListener("click", () => {

    document.body.classList.toggle("high-contrast");

});


// ==================================
// FONTE PARA DISLEXIA
// ==================================

const dyslexiaButton = document.getElementById("dyslexiaButton");

dyslexiaButton.addEventListener("click", () => {

    document.body.classList.toggle("dyslexia-font");

});


// ==================================
// AJUSTE DO TAMANHO DA FONTE
// ==================================

const increaseFont = document.getElementById("increaseFont");

const decreaseFont = document.getElementById("decreaseFont");

let fontSize = 16;


function updateFont() {

    document.documentElement.style.fontSize = fontSize + "px";

}


increaseFont.addEventListener("click", () => {

    if (fontSize < 24) {

        fontSize += 2;

        updateFont();

    }

});


decreaseFont.addEventListener("click", () => {

    if (fontSize > 12) {

        fontSize -= 2;

        updateFont();

    }

});


// ==========================================
// COMPARAÇÃO DA INTENSIDADE LUMINOSA
// ==========================================

const distances = [
    {
        input: "distanceA",
        label: "distanceAValue",
        bar: "barA",
        result: "resultA"
    },
    {
        input: "distanceB",
        label: "distanceBValue",
        bar: "barB",
        result: "resultB"
    },
    {
        input: "distanceC",
        label: "distanceCValue",
        bar: "barC",
        result: "resultC"
    }
];

function updatePositions() {

    const readings = distances.map(sensor => {

        const distance = Number(
            document.getElementById(sensor.input).value
        );

        // Intensidade relativa para uma fonte pontual ideal.
        const intensity = 100 / (distance * distance);

        document.getElementById(sensor.label).textContent =
            distance + " m";

        return {
            ...sensor,
            distance,
            intensity
        };

    });

    const maxIntensity = Math.max(
        ...readings.map(item => item.intensity)
    );

    readings.forEach(item => {

        const width =
            (item.intensity / maxIntensity) * 100;

        document.getElementById(item.bar).style.width =
            width + "%";

        document.getElementById(item.result).textContent =
            item.intensity.toFixed(2) +
            " unidades relativas";

    });

    const strongest = readings.reduce((previous, current) =>
        current.intensity > previous.intensity
            ? current
            : previous
    );

    const sensorName =
        strongest.input.replace("distance", "");

    document.getElementById("positionConclusion").textContent =
        "O sensor " + sensorName +
        " está mais próximo da fonte e apresenta a maior intensidade relativa.";

}

distances.forEach(sensor => {

    document.getElementById(sensor.input)
        .addEventListener("input", updatePositions);

});

updatePositions();


// ==========================================
// SIMULADOR DA PISCINA ESCOLAR
// ==========================================

const irradiance = document.getElementById("irradiance");
const collectorArea = document.getElementById("collectorArea");
const exposureTime = document.getElementById("exposureTime");
const poolVolume = document.getElementById("poolVolume");
const efficiency = document.getElementById("efficiency");


function updatePoolSimulation() {

    const solarRadiation = Number(irradiance.value);
    const area = Number(collectorArea.value);
    const hours = Number(exposureTime.value);
    const volume = Number(poolVolume.value);
    const efficiencyValue = Number(efficiency.value) / 100;

    // Atualização dos valores exibidos.

    document.getElementById("irradianceValue").textContent =
        solarRadiation;

    document.getElementById("areaValue").textContent =
        area;

    document.getElementById("timeValue").textContent =
        hours;

    document.getElementById("volumeValue").textContent =
        volume;

    document.getElementById("efficiencyValue").textContent =
        (efficiencyValue * 100) + "%";


    /*
       Q = irradiância × área × tempo × eficiência

       ΔT = Q / (massa × calor específico)

       Consideramos:
       1 litro de água ≈ 1 kg
       Calor específico da água = 4186 J/kg°C
    */

    const seconds = hours * 3600;

    const energy =
        solarRadiation *
        area *
        seconds *
        efficiencyValue;

    const waterMass = volume;

    const specificHeat = 4186;

    const temperatureIncrease =
        energy / (waterMass * specificHeat);

    const energyMJ = energy / 1000000;

    document.getElementById("energyResult").textContent =
        energyMJ.toFixed(2).replace(".", ",") + " MJ";

    document.getElementById("temperatureResult").textContent =
        temperatureIncrease.toFixed(2).replace(".", ",") + " °C";

}


// Atualiza a simulação sempre que um controle mudar.

[
    irradiance,
    collectorArea,
    exposureTime,
    poolVolume,
    efficiency
].forEach(control => {

    control.addEventListener(
        "input",
        updatePoolSimulation
    );

});

updatePoolSimulation();

