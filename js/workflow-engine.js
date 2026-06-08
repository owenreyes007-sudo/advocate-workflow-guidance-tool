let currentWorkflow = null;
let currentStepId = null;

const categorySelect = document.getElementById("categorySelect");
const scenarioSelect = document.getElementById("scenarioSelect");
const subScenarioSelect = document.getElementById("subScenarioSelect");

const workflowTitle = document.getElementById("workflowTitle");
const workflowQuestion = document.getElementById("workflowQuestion");
const workflowChoices = document.getElementById("workflowChoices");

const recommendedActions = document.getElementById("recommendedActions");
const kaReferences = document.getElementById("kaReferences");
const qtReferences = document.getElementById("qtReferences");

const scriptContent = document.getElementById("scriptContent");

function initializeWorkflowEngine() {

```
loadCategories();

categorySelect.addEventListener(
    "change",
    populateScenario
);

scenarioSelect.addEventListener(
    "change",
    populateSubScenario
);
```

}

function loadCategories() {

```
categorySelect.innerHTML = "";

Object.keys(workflowLibrary).forEach(category => {

    const option =
        document.createElement("option");

    option.value = category;
    option.textContent = category;

    categorySelect.appendChild(option);

});

populateScenario();
```

}

function populateScenario() {

```
const category =
    categorySelect.value;

scenarioSelect.innerHTML = "";

const option =
    document.createElement("option");

option.value =
    workflowLibrary[category].scenario;

option.textContent =
    workflowLibrary[category].scenario;

scenarioSelect.appendChild(option);

populateSubScenario();
```

}

function populateSubScenario() {

```
const category =
    categorySelect.value;

subScenarioSelect.innerHTML = "";

Object.keys(
    workflowLibrary[category].subScenarios
).forEach(sub => {

    const option =
        document.createElement("option");

    option.value = sub;
    option.textContent = sub;

    subScenarioSelect.appendChild(option);

});
```

}

function loadWorkflow() {

```
const category =
    categorySelect.value;

const subScenario =
    subScenarioSelect.value;

currentWorkflow =
    workflowLibrary[category]
    .subScenarios[subScenario];

currentStepId =
    currentWorkflow.startStep;

renderCurrentStep();
```

}

function renderCurrentStep() {

```
const step =
    currentWorkflow.steps[currentStepId];

workflowTitle.textContent =
    currentWorkflow.title;

workflowQuestion.innerHTML =
    `<strong>${step.title}</strong><br><br>${step.question}`;

scriptContent.innerHTML =
    step.script;

recommendedActions.innerHTML =
    "<ul>" +
    step.actions
        .map(
            item => `<li>${item}</li>`
        )
        .join("") +
    "</ul>";

kaReferences.innerHTML =
    "<ul>" +
    step.resources
        .map(
            item => `<li>${item.name}</li>`
        )
        .join("") +
    "</ul>";

qtReferences.innerHTML =
    "<ul>" +
    step.tools
        .map(
            item => `<li>${item.name}</li>`
        )
        .join("") +
    "</ul>";

workflowChoices.innerHTML = "";

step.choices.forEach(choice => {

    const button =
        document.createElement("button");

    button.className =
        "choice-btn";

    button.textContent =
        choice.label;

    button.onclick = () => {

        currentStepId =
            choice.next;

        renderCurrentStep();

    };

    workflowChoices.appendChild(button);

});
```

}

function resetWorkflow() {

```
currentWorkflow = null;
currentStepId = null;

workflowTitle.textContent =
    "Select Workflow";

workflowQuestion.innerHTML =
    "Select a workflow to begin.";

workflowChoices.innerHTML = "";

scriptContent.innerHTML =
    "Select a workflow to begin.";

recommendedActions.innerHTML =
    "No workflow loaded.";

kaReferences.innerHTML =
    "No resources loaded.";

qtReferences.innerHTML =
    "No tools loaded.";
```

}
