const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById("btnSearch"); // optional (for later search feature)
const patients = [];

// Function to add a patient
function addPatient() {
  const name = document.getElementById("name").value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const age = document.getElementById("age").value;
  const condition = document.getElementById("condition").value;

  if (name && gender && age && condition) {
    // Store patient details in the patients array
    patients.push({
      name,
      gender: gender.value,
      age,
      condition
    });

    // Reset form fields
    resetForm();

    // Update and display the report
    generateReport();
  } else {
    alert("⚠️ Please fill in all fields before adding a patient.");
  }
}

// Reset the form fields
function resetForm() {
  document.getElementById("name").value = "";
  document.querySelectorAll('input[name="gender"]').forEach(input => input.checked = false);
  document.getElementById("age").value = "";
  document.getElementById("condition").value = "";
}

// Generate the patient report
function generateReport() {
  report.innerHTML = ""; // Clear old report

  if (patients.length === 0) {
    report.innerHTML = "<p>No patients added yet.</p>";
    return;
  }

  let html = "<h3>Patient Report</h3><ul>";
  patients.forEach(patient => {
    html += `<li>${patient.name}, ${patient.gender}, Age: ${patient.age}, Condition: ${patient.condition}</li>`;
  });
  html += "</ul>";

  report.innerHTML = html;
}

// Attach event listener to Add Patient button
addPatientButton.addEventListener("click", addPatient);
function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('health_analysis.json')
      .then(response => response.json())
      .then(data => {
        const condition = data.conditions.find(item => item.name.toLowerCase() === input);

        if (condition) {
          const symptoms = condition.symptoms.join(', ');
          const prevention = condition.prevention.join(', ');
          const treatment = condition.treatment;

          resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
          resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

          resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
          resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
          resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
        } else {
          resultDiv.innerHTML = 'Condition not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
    btnSearch.addEventListener('click', searchCondition);