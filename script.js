document.getElementById('dose-calculation-form').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateDoses();
});

// Function to calculate doses and update the table
function calculateDoses() {
    var weight = parseFloat(document.getElementById('weight').value);
    var age = parseFloat(document.getElementById('age').value);

    if (isNaN(weight) || isNaN(age) || weight <= 0) {
        alert('Please enter a valid weight and age.');
        return;
    }

    var tableBody = document.getElementById('medication-table').querySelector('tbody');
    tableBody.innerHTML = createTableRows(weight, age);
}
// Function to create table rows for all medications
function createTableRows(weight, age) {
    var rows = '';
    rows += getParacetamolRow(weight);
    rows += getSuppositoryRow(weight);
    rows += getPromethazineRow(weight, age);
    rows += getPrednisoloneRow(weight);
    rows += getAmoxycillinRow(weight);
    rows += getCephalexinRow(weight);
    rows += getCloxacillinRow(weight);
    rows += getErythromycinRow(weight);
    rows += getAUGMENTINRow(weight);
    rows += getDiphenhydramineRow(weight, age);
    rows += getBromhexineRow(weight, age);
    rows += getSalbutamolRow(weight, age);
    rows += getIsoniazidRow(weight, age);
    rows += getChlorpheniramineRow(weight, age);
    rows += getLactuloseRow(weight);
    rows += getFerricAmmoniumCitrateProphylaxisRow(weight);
    rows += getFerricAmmoniumCitrateTreatmentRow(weight);
    rows += getNystatinRow(age);
    rows += getAlbendazoleSyrupRow(age);
    rows += getAlbendazoleTabletRow(age);
    rows += getMultivitaminRow(age);
    return rows;
}


// Specific calculation functions for each medication
function getParacetamolRow(weight) {
    // Paracetamol calculation logic
    var doseMg = Math.min(15 * weight, 1000);
    var doseMl = (doseMg / 250) * 5;
    return createRow('Paracetamol', doseMl, doseMg, 'TDS/QID', '250MG/5ML', '15MG/KG', 'Maximum dose 1000mg');
}

function getSuppositoryRow(weight) {
    // Suppository calculation logic
	var dosePerKgSuppository = 30;
    var maxSingleDoseMgSuppository = 250;
    var suppositoryDoseMg = Math.min(dosePerKgSuppository * weight, maxSingleDoseMgSuppository);
    return createRow('Suppository', '-', suppositoryDoseMg, 'PRN', '125MG & 250MG', '30MG/KG', 'Max 250mg');
}

function getPromethazineRow(weight, age) {
    // Promethazine calculation logic
	var dosePerKgPromethazine = 0.3;
    var maxSingleDoseMgPromethazine = 8;
    var promethazineDisplayMg, promethazineDisplayMl;
    if (age < 2) {
        promethazineDisplayMg = "CONTRAINDICATED";
        promethazineDisplayMl = "CONTRAINDICATED";
    } else {
        var doseMgPromethazine = Math.min(dosePerKgPromethazine * weight, maxSingleDoseMgPromethazine);
        var doseMlPromethazine = (doseMgPromethazine / 5) * 5;
        promethazineDisplayMg = doseMgPromethazine.toFixed(1);
        promethazineDisplayMl = doseMlPromethazine.toFixed(1);
    }
    return createRow('Promethazine', promethazineDisplayMl, promethazineDisplayMg, 'TDS', '5MG/5ML', '0.3MG/KG', 'Max 8mg');
}
function getPrednisoloneRow(weight) {
    var doseMgPrednisolone = 1 * weight;
    var doseMlPrednisolone = (doseMgPrednisolone / 2.5) * 5;
    return createRow('Prednisolone', doseMlPrednisolone, doseMgPrednisolone, 'OD', '2.5MG/5ML', '1MG/KG', '-');
}

function getAmoxycillinRow(weight) {
    var doseMgAmoxycillin = Math.min(15 * weight, 500);
    var doseMlAmoxycillin = (doseMgAmoxycillin / 250) * 5;
    return createRow('Amoxycillin', doseMlAmoxycillin, doseMgAmoxycillin, 'TDS', '250MG/5ML', '15MG/KG', 'Maximum dose 500mg');
}

// Cephalexin
function getCephalexinRow(weight) {
    var doseMgCephalexin = Math.min(25 * weight, 500);
    var doseMlCephalexin = (doseMgCephalexin / 125) * 5;
    return createRow('Cephalexin', doseMlCephalexin, doseMgCephalexin, 'BD', '125MG/5ML', '25MG/KG', 'Maximum dose 500mg');
}

// Cloxacillin
function getCloxacillinRow(weight) {
    var doseMgCloxacillin = Math.min(15 * weight, 600);
    var doseMlCloxacillin = (doseMgCloxacillin / 125) * 5;
    return createRow('Cloxacillin', doseMlCloxacillin, doseMgCloxacillin, 'QID', '125MG/5ML', '15MG/KG', 'Maximum dose 600mg');
}

// Erythromycin
function getErythromycinRow(weight) {
    var doseMgErythromycin = Math.min(20 * weight, 800);
    var doseMlErythromycin = (doseMgErythromycin / 400) * 5;
    return createRow('Erythromycin', doseMlErythromycin, doseMgErythromycin, 'BD', '400MG/5ML', '20MG/KG', 'Maximum dose 800mg');
}

// AUGMENTIN
function getAUGMENTINRow(weight) {
    var doseMgAUGMENTIN = Math.min(20 * weight, 570);
    var doseMlAUGMENTIN = (doseMgAUGMENTIN / 228) * 5;
    return createRow('AUGMENTIN', doseMlAUGMENTIN, doseMgAUGMENTIN, 'BD', '228MG/5ML', '20MG/KG', 'Maximum dose 570mg');
}

// Diphenhydramine
function getDiphenhydramineRow(weight, age) {
    var doseMgDiphenhydramine;
    if (age < 2) {
        doseMgDiphenhydramine = "CONTRAINDICATED";
    } else if (age < 6) {
        doseMgDiphenhydramine = Math.min(1 * weight, 3.5);
    } else {
        doseMgDiphenhydramine = Math.min(1 * weight, 7);
    }
    var doseMlDiphenhydramine = doseMgDiphenhydramine !== "CONTRAINDICATED" ? (doseMgDiphenhydramine / 7) * 5 : "CONTRAINDICATED";
    return createRow('Diphenhydramine', doseMlDiphenhydramine, doseMgDiphenhydramine, 'TDS', '7MG/5ML', '1MG/KG', 'Max 3.5mg (2-6 yrs), 7mg (>6 yrs)');
}

// Bromhexine
function getBromhexineRow(weight, age) {
    var doseMgBromhexine;
    if (age < 2) {
        doseMgBromhexine = Math.min(0.3 * weight, 0.96);
    } else if (age < 6) {
        doseMgBromhexine = Math.min(0.3 * weight, 2);
    } else {
        doseMgBromhexine = Math.min(0.3 * weight, 4);
    }
    var doseMlBromhexine = (doseMgBromhexine / 4) * 5;
    return createRow('Bromhexine', doseMlBromhexine, doseMgBromhexine, 'TDS', '4MG/5ML', '0.3MG/KG', 'Max 0.96mg (<2 yrs), 2mg (2-6 yrs), 4mg (>6 yrs)');
}

// Salbutamol
function getSalbutamolRow(weight, age) {
    var doseMgSalbutamol;
    if (age < 2) {
        doseMgSalbutamol = "CONTRAINDICATED";
    } else if (age < 6) {
        doseMgSalbutamol = Math.min(0.15 * weight, 1);
    } else {
        doseMgSalbutamol = Math.min(0.15 * weight, 2);
    }
    var doseMlSalbutamol = doseMgSalbutamol !== "CONTRAINDICATED" ? (doseMgSalbutamol / 2) * 5 : "CONTRAINDICATED";
    return createRow('Salbutamol', doseMlSalbutamol, doseMgSalbutamol, 'TDS/QID', '2MG/5ML', '0.15MG/KG', 'Max 1mg (2-6 yrs), 2mg (>6 yrs)');
}

// Isoniazid
function getIsoniazidRow(weight, age) {
    var dosePerKgIsoniazid = age < 10 ? 10 : 5;
    var doseMgIsoniazid = dosePerKgIsoniazid * weight;
    var doseMlIsoniazid = doseMgIsoniazid / 40;
    return createRow('Isoniazid', doseMlIsoniazid, doseMgIsoniazid, 'OD', '40MG/ML', '<10 yo: 10mg/kg, =>10yo: 5mg/kg', '-');
}

// Chlorpheniramine
function getChlorpheniramineRow(weight, age) {
    var doseMgChlorpheniramine;
    if (age < 2) {
        doseMgChlorpheniramine = "CONTRAINDICATED";
    } else {
        doseMgChlorpheniramine = Math.min(0.1 * weight, age <= 5 ? 1 : 2);
    }
    var doseMlChlorpheniramine = doseMgChlorpheniramine !== "CONTRAINDICATED" ? (doseMgChlorpheniramine / 2) * 5 : "CONTRAINDICATED";
    return createRow('Chlorpheniramine', doseMlChlorpheniramine, doseMgChlorpheniramine, 'TDS', '2MG/5ML', '0.1MG/KG', 'Max 1mg (<=5 yrs), 2mg (> 5 yrs)');
}

// Lactulose
function getLactuloseRow(weight) {
    var doseMlLactulose = 0.5 * weight;
    return createRow('Lactulose', doseMlLactulose, '-', 'OD/BD', '3.35G/5ML', '0.5ML/KG', '-');
}

// Ferric Ammonium Citrate (Prophylaxis)
function getFerricAmmoniumCitrateProphylaxisRow(weight) {
    var doseMlFerricAmmoniumCitrate = (2 * weight) * 5 / 84;
    return createRow('Ferric Ammonium Citrate (Prophylaxis)', doseMlFerricAmmoniumCitrate, '-', 'OD', '400MG/5ML', '2ML/KG', '-');
}

// Ferric Ammonium Citrate (Treatment)
function getFerricAmmoniumCitrateTreatmentRow(weight) {
    var doseMlFerricAmmoniumCitrateTreatment = (6 * weight) * 5 / 84;
    return createRow('Ferric Ammonium Citrate (Treatment)', doseMlFerricAmmoniumCitrateTreatment, '-', 'OD', '400MG/5ML', '6ML/KG', '-');
}

// Nystatin
function getNystatinRow(age) {
    var doseMlNystatin = age < 2 ? 1 : 5;
    return createRow('Nystatin', doseMlNystatin, doseMlNystatin, 'QID', '100000IU/ML', '<12 month-old: 100000IU, >12 month-old: 500000IU', '-');
}

// Albendazole Syrup
function getAlbendazoleSyrupRow(age) {
    var doseMlAlbendazole = age < 1 ? "CONTRAINDICATED" : (age < 2 ? "5.0" : "10.0");
    return createRow('Albendazole Syrup', doseMlAlbendazole, '-', 'STAT', '200MG/5ML', '1-2 year-old: 200mg, ≥ 2 year-old: 400mg', '-');
}

// Albendazole Tablet
function getAlbendazoleTabletRow(age) {
    var doseTabletsAlbendazole;
    if (age < 1) {
        doseTabletsAlbendazole = "CONTRAINDICATED";
    } else if (age < 2) {
        doseTabletsAlbendazole = "1";
    } else {
        doseTabletsAlbendazole = "2";
    }
    return createRow('Albendazole Tablet', '-', doseTabletsAlbendazole * 200, 'STAT', '200MG/TABLET', '-', doseTabletsAlbendazole + ' tablet/s');
}

// Multivitamin
function getMultivitaminRow(age) {
    var doseMlMultivitamin;
    if (age < 1) {
        doseMlMultivitamin = "CONTRAINDICATED";
    } else if (age < 4) {
        doseMlMultivitamin = "1";
    } else {
        doseMlMultivitamin = "2.5";
    }
    return createRow('Multivitamin Syrup', doseMlMultivitamin, (parseFloat(doseMlMultivitamin) * 1).toFixed(1), 'OD', '1MG/ML', '-', '-');
}

// Function to create a table row
function createRow(name, doseMl, doseMg, frequency, strength, doseRange, additionalInfo) {
// Convert to float if they are numeric strings
    let doseMlFloat = parseFloat(doseMl);
    let doseMgFloat = parseFloat(doseMg);

	return `
        <tr>
            <td>${name}</td>
            <td class="ml-column">${!isNaN(doseMlFloat) ? doseMlFloat.toFixed(1) : doseMl}</td>
            <td class="mg-column">${!isNaN(doseMgFloat) ? doseMgFloat.toFixed(1) : doseMg}</td>
            <td>${frequency}</td>
            <td>${strength}</td>
            <td>${doseRange}</td>
            <td>${additionalInfo}</td>
        </tr>`;
}


