document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('gradeForm');
    const activityTable = document.getElementById('activityTable');
    const addRowButton = document.getElementById('addRow');
    const weightedButton = document.getElementById('weightedButton');
    const meanButton = document.getElementById('meanButton');
    const resultDiv = document.getElementById('result');

    addRowButton.addEventListener('click', () => {
        const newRow = document.createElement('tr');
        const activityCount = activityTable.rows.length + 1;

        newRow.innerHTML = `
            <td>Activity ${activityCount}</td>
            <td>A${activityCount}</td>
            <td><input type="number" class="input-box" name="weight" min="0" step="0.01"></td>
            <td><input type="number" class="input-box" name="gradeObtained" min="0" max="100"> / <input type = "number" class="input-box" name="gradeTotal" min="0" max="100"></td>
            <td><input type="text" name="percent" readonly></td>
        `;

        activityTable.appendChild(newRow);
    });

    form.addEventListener('input', (event) => {
        if (event.target.name === 'gradeObtained'|| event.target.name === 'gradeTotal') {
            updatePercent(event.target);
        }
    });

    weightedButton.addEventListener('click', () => {
        const weights = getValues('weight');
        const grades = getGrades();

        if (weights.length === 0 || grades.length === 0) {
            alert('Enter data required in all the fields');
            return;
        }

        const weightedResult = calculateWeighted(grades, weights);
        resultDiv.textContent = `Result ${weightedResult.toFixed(2)}%`;
    });

    meanButton.addEventListener('click', () => {
        const grades = getGrades();

        if (grades.length === 0) {
            alert('Enter data required in all the fields');
            return;
        }

        const meanResult = calculateMean(grades);
        resultDiv.textContent = `Result ${meanResult.toFixed(2)}%`;
    });

    function updatePercent(input) {
      const row = input.closest('tr');
      const gradeObtained = row.querySelector('[name="gradeObtained"]').value;
      const gradeTotal = row.querySelector('[name="gradeTotal"]').value;
      const percent = (gradeObtained / gradeTotal) * 100;
      row.querySelector('[name="percent"]').value = percent.toFixed(2);

      if (isNaN(gradeObtained) || isNaN(gradeTotal) || gradeTotal == 0)
        {
            percentInput.value = '';
        }
      else
        {
            percentInput.value = percent.toFixed(2);
        }

    }

    function getValues(name) 
    {
        return Array.from(document.getElementsByName(name)).map(input => parseFloat(input.value)).filter(value => !isNaN(value));
    }

    function getGrades()
    {
        const gradeObtained = Array.from(document.getElementsByName('gradeObtained')).map(input=> parseFloat(input.value));
        const gradeTotal = Array.from(document.getElementsByName('gradeTotal')).map(input=> parseFloat(input.value));
        return gradeObtained.map((grade, index) => (grade/ gradeTotal[index])*100).filter(value => !isNaN(value));
    }

    function calculateWeighted(grades, weights) 
    {
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        const weightedSum = grades.reduce((sum, grade, index) => sum + grade * weights[index], 0);
        return (weightedSum / totalWeight);
    }

    function calculateMean(grades)
    {
        const total = grades.reduce((sum, grade) => sum + grade, 0);
        return (total / grades.length);
    }
});
