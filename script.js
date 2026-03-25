<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Multi-Medication Dose Calculator</title>
    <style>
        :root { --primary: #1a73e8; --secondary: #5f6368; --bg: #f8f9fa; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: var(--bg); padding: 20px; }
        .container { max-width: 1100px; margin: auto; background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #eee; margin-bottom: 20px; padding-bottom: 10px; }
        
        /* Patient Info Bar */
        .patient-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px; background: #eef4ff; padding: 20px; border-radius: 8px; margin-bottom: 25px; }
        .field { display: flex; flex-direction: column; }
        label { font-size: 0.7rem; font-weight: bold; color: var(--secondary); text-transform: uppercase; margin-bottom: 5px; }
        input { padding: 10px; border: 1px solid #cbd5e0; border-radius: 6px; font-size: 1rem; }
        input:focus { border-color: var(--primary); outline: none; box-shadow: 0 0 0 3px rgba(26,115,232,0.1); }

        /* Results Table */
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th { background: var(--primary); color: white; padding: 12px; text-align: left; font-size: 0.85rem; }
        tr:nth-child(even) { background: #fcfcfc; }
        td { padding: 12px; border-bottom: 1px solid #eee; font-size: 0.95rem; }
        
        .med-name { font-weight: bold; color: #333; }
        .val-mg { font-weight: bold; color: #1a73e8; }
        .val-ml { font-weight: bold; color: #d93025; background: #fff5f5; padding: 4px 8px; border-radius: 4px; }
        
        .btn-clear { background: #ea4335; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h2>Dose Reference Sheet</h2>
        <button class="btn-clear" onclick="clearAll()">Clear All</button>
    </div>

    <div class="patient-info">
        <div class="field">
            <label>Age (Years)</label>
            <input type="number" id="yrs" placeholder="0" oninput="calculateAll()">
        </div>
        <div class="field">
            <label>Age (Months)</label>
            <input type="number" id="mths" placeholder="0" oninput="calculateAll()">
        </div>
        <div class="field">
            <label>Body Weight (kg)</label>
            <input type="number" id="weight" placeholder="0.0" oninput="calculateAll()">
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Medication</th>
                <th>Strength (mg/mL)</th>
                <th>Standard Dosage</th>
                <th>Dose (mg)</th>
                <th>Dose (mL)</th>
                <th>Frequency</th>
                <th>Notes</th>
            </tr>
        </thead>
        <tbody id="medTable">
            </tbody>
    </table>

    <p style="font-size: 0.8rem; color: #888; margin-top: 20px;">
        *Calculations based on $Dose = Weight \times mg/kg$. Always verify clinically.
    </p>
</div>

<script>
    // DEFINE YOUR MEDICATIONS HERE
    const medications = [
        { name: "Paracetamol (Syrup)", strength: 120, perMl: 5, doseKg: 15, freq: "QID/TDS", note: "Max 4 doses/24hr" },
        { name: "Ibuprofen (Syrup)", strength: 100, perMl: 5, doseKg: 10, freq: "TDS", note: "After food" },
        { name: "Amoxicillin (Syr)", strength: 125, perMl: 5, doseKg: 15, freq: "TDS", note: "Complete course" },
        { name: "Cetirizine (Syr)", strength: 5, perMl: 5, doseKg: 0.25, freq: "OD", note: "Night use" }
    ];

    function initTable() {
        const tbody = document.getElementById('medTable');
        tbody.innerHTML = "";
        medications.forEach((med, index) => {
            const concentration = med.strength / med.perMl; // e.g. 120mg/5ml = 24mg per ml
            
            tbody.innerHTML += `
                <tr>
                    <td class="med-name">${med.name}</td>
                    <td>${med.strength}mg / ${med.perMl}ml</td>
                    <td>${med.doseKg} mg/kg</td>
                    <td><span id="mg-${index}" class="val-mg">0 mg</span></td>
                    <td><span id="ml-${index}" class="val-ml">0 mL</span></td>
                    <td>${med.freq}</td>
                    <td><small>${med.note}</small></td>
                </tr>
            `;
        });
    }

    function calculateAll() {
        const weight = parseFloat(document.getElementById('weight').value);
        
        if (!weight || weight <= 0) {
            medications.forEach((_, i) => {
                document.getElementById(`mg-${i}`).innerText = "0 mg";
                document.getElementById(`ml-${i}`).innerText = "0 mL";
            });
            return;
        }

        medications.forEach((med, i) => {
            const mg = weight * med.doseKg;
            const concentration = med.strength / med.perMl;
            const ml = mg / concentration;

            document.getElementById(`mg-${i}`).innerText = mg.toFixed(1) + " mg";
            document.getElementById(`ml-${i}`).innerText = ml.toFixed(2) + " mL";
        });
    }

    function clearAll() {
        document.getElementById('yrs').value = '';
        document.getElementById('mths').value = '';
        document.getElementById('weight').value = '';
        calculateAll();
    }

    // Load table on start
    initTable();
</script>

</body>
</html>
