<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced Dose Calculator</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #f4f7f9; padding: 20px; color: #333; }
        .container { max-width: 1000px; margin: auto; background: white; padding: 25px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        
        h2 { color: #1a73e8; border-bottom: 2px solid #e8f0fe; padding-bottom: 10px; margin-bottom: 25px; }
        
        /* Input Grid */
        .input-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 30px; background: #fcfcfc; border: 1px solid #eee; padding: 20px; border-radius: 8px; }
        
        .field { display: flex; flex-direction: column; }
        label { font-size: 0.75rem; font-weight: bold; color: #666; text-transform: uppercase; margin-bottom: 5px; }
        input, select { padding: 10px; border: 1px solid #ccd0d5; border-radius: 5px; font-size: 14px; }
        input:focus { border-color: #1a73e8; outline: none; background: #fff; }

        /* Table Design */
        .table-container { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; min-width: 800px; }
        th { background: #1a73e8; color: white; padding: 12px; text-align: left; font-size: 0.85rem; }
        td { padding: 15px; border-bottom: 1px solid #eee; background: #fff; }
        
        .calc-val { font-weight: bold; color: #1a73e8; font-size: 1.1rem; }
        .med-name { font-weight: bold; color: #d93025; }
        
        .disclaimer { margin-top: 30px; font-size: 0.8rem; color: #888; border-left: 4px solid #1a73e8; padding-left: 15px; }
    </style>
</head>
<body>

<div class="container">
    <h2>Medication Dose Calculator</h2>
    
    <div class="input-grid">
        <div class="field">
            <label>Age (Years)</label>
            <input type="number" id="yrs" placeholder="Yrs" oninput="calculate()">
        </div>
        <div class="field">
            <label>Age (Months)</label>
            <input type="number" id="mths" placeholder="Mths" oninput="calculate()">
        </div>
        <div class="field">
            <label>Weight (kg)</label>
            <input type="number" id="weight" placeholder="0.0" oninput="calculate()">
        </div>
        <div class="field">
            <label>Medication Name</label>
            <input type="text" id="medName" placeholder="e.g. Paracetamol" oninput="calculate()">
        </div>
        <div class="field">
            <label>Dosage (mg/kg)</label>
            <input type="number" id="dosage" placeholder="mg/kg" oninput="calculate()">
        </div>
        <div class="field">
            <label>Strength (mg/mL)</label>
            <input type="number" id="strength" placeholder="mg / ml" oninput="calculate()">
        </div>
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Medication</th>
                    <th>Strength</th>
                    <th>Dose (mg)</th>
                    <th>Dose (mL)</th>
                    <th>Frequency</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span id="outMed" class="med-name">-</span></td>
                    <td><span id="outStr">-</span></td>
                    <td><span id="resMg" class="calc-val">0 mg</span></td>
                    <td><span id="resMl" class="calc-val">0 mL</span></td>
                    <td>
                        <select id="freq">
                            <option value="Stat">Stat</option>
                            <option value="BD">BD (Twice Daily)</option>
                            <option value="TDS">TDS (3x Daily)</option>
                            <option value="QID">QID (4x Daily)</option>
                            <option value="PRN">PRN (As Needed)</option>
                        </select>
                    </td>
                    <td><input type="text" id="note" placeholder="e.g. For fever" style="width: 100%; border:none; border-bottom:1px solid #ddd;"></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="disclaimer">
        <strong>Verification Required:</strong> Patient Age: <span id="outAge">0y 0m</span>. 
        Always cross-reference with weight-based clinical protocols.
    </div>
</div>

<script>
    function calculate() {
        // Inputs
        const yrs = document.getElementById('yrs').value || 0;
        const mths = document.getElementById('mths').value || 0;
        const weight = parseFloat(document.getElementById('weight').value);
        const medName = document.getElementById('medName').value;
        const dosage = parseFloat(document.getElementById('dosage').value);
        const strength = parseFloat(document.getElementById('strength').value);

        // UI Outputs
        document.getElementById('outAge').innerText = yrs + "y " + mths + "m";
        document.getElementById('outMed').innerText = medName || "-";
        document.getElementById('outStr').innerText = strength ? strength + " mg/mL" : "-";

        if (weight > 0 && dosage > 0) {
            const mg = weight * dosage;
            document.getElementById('resMg').innerText = mg.toFixed(1) + " mg";

            if (strength > 0) {
                const ml = mg / strength;
                document.getElementById('resMl').innerText = ml.toFixed(2) + " mL";
            } else {
                document.getElementById('resMl').innerText = "0 mL";
            }
        } else {
            document.getElementById('resMg').innerText = "0 mg";
            document.getElementById('resMl').innerText = "0 mL";
        }
    }
</script>

</body>
</html>
