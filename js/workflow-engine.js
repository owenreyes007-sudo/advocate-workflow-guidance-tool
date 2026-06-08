let currentWorkflow = null;
let currentStepId = null;
let historyStack = [];
let workflowSummary = {};

const categorySelect =
document.getElementById("categorySelect");

const scenarioSelect =
document.getElementById("scenarioSelect");

const subScenarioSelect =
document.getElementById("subScenarioSelect");

const workflowTitle =
document.getElementById("workflowTitle");

const workflowQuestion =
document.getElementById("workflowQuestion");

const workflowChoices =
document.getElementById("workflowChoices");

const recommendedActions =
document.getElementById("recommendedActions");

const kaReferences =
document.getElementById("kaReferences");

const qtReferences =
document.getElementById("qtReferences");

const scriptContent =
document.getElementById("scriptContent");

const workflowBadge =
document.getElementById("workflowBadge");

const progressTracker =
document.getElementById("progressTracker");

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

Object.keys(workflowLibrary)
    .forEach(category => {

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
    workflowLibrary[category]
    .subScenarios
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

historyStack = [];

workflowSummary = {
    workflow:
        currentWorkflow.title,
    status:
        "In Progress"
};

currentStepId = "ttc";

workflowTitle.textContent =
    currentWorkflow.title;

workflowBadge.textContent =
    "IN PROGRESS";

workflowBadge.className =
    "status-badge progress";

renderCurrentStep();
```

}

function getCurrentStep() {

```
if (
    sharedVerification[currentStepId]
) {

    return sharedVerification[
        currentStepId
    ];

}

return currentWorkflow.steps[
    currentStepId
];
```

}

function renderCurrentStep() {

```
const step =
    getCurrentStep();

workflowQuestion.innerHTML = `
    <strong>
        ${step.title}
    </strong>

    <br><br>

    ${step.question}
`;

renderChoices(step);

renderActions(step);

renderResources(step);

renderTools(step);

renderScript(step);

renderProgress(step.stage);
```

}

function renderChoices(step) {

```
workflowChoices.innerHTML = "";

if (
    step.choices.length === 0
) {

    const button =
        document.createElement(
            "button"
        );

    button.className =
        "primary-btn";

    button.textContent =
        "Complete Workflow";

    button.onclick =
        completeWorkflow;

    workflowChoices.appendChild(
        button
    );

    return;

}

step.choices.forEach(choice => {

    const button =
        document.createElement(
            "button"
        );

    button.className =
        "choice-btn";

    button.textContent =
        choice.label;

    button.onclick =
        () => {

            historyStack.push(
                currentStepId
            );

            if (
                choice.next ===
                "__WORKFLOW_START__"
            ) {

                currentStepId =
                    currentWorkflow.startStep;

            } else {

                currentStepId =
                    choice.next;

            }

            renderCurrentStep();

        };

    workflowChoices
        .appendChild(button);

});
```

}

function renderActions(step) {

```
recommendedActions.innerHTML =
    "<ul>" +
    step.actions
    .map(
        item =>
        `<li>${item}</li>`
    )
    .join("") +
    "</ul>";
```

}

function renderResources(step) {

```
kaReferences.innerHTML =
    "<ul>" +
    step.resources
    .map(
        item =>
        `<li>
            <a href="${item.url}"
               target="_blank">
               📚 ${item.name}
            </a>
        </li>`
    )
    .join("") +
    "</ul>";
```

}

function renderTools(step) {

```
qtReferences.innerHTML =
    "<ul>" +
    step.tools
    .map(
        item =>
        `<li>
            <a href="${item.url}"
               target="_blank">
               🛠 ${item.name}
            </a>
        </li>`
    )
    .join("") +
    "</ul>";
```

}

function renderScript(step) {

```
scriptContent.innerHTML =
    step.script;
```

}

function renderProgress(
currentStage
) {

```
const stages = [

    "Verification",

    "Investigation",

    "Assessment",

    "Resolution",

    "Call Closure"

];

progressTracker.innerHTML = "";

stages.forEach(stage => {

    const div =
        document.createElement(
            "div"
        );

    div.className =
        "journey-step";

    if (
        stage === currentStage
    ) {

        div.classList.add(
            "active"
        );

    }

    div.textContent =
        stage;

    progressTracker
        .appendChild(div);

});
```

}

function previousStep() {

```
if (
    historyStack.length === 0
) {

    return;

}

currentStepId =
    historyStack.pop();

renderCurrentStep();
```

}

function resetWorkflow() {

```
currentWorkflow = null;
currentStepId = null;
historyStack = [];

workflowTitle.textContent =
    "Select Workflow";

workflowBadge.textContent =
    "READY";

workflowBadge.className =
    "status-badge ready";

workflowQuestion.innerHTML =
    "Select a workflow to begin.";

workflowChoices.innerHTML =
    "";

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

function completeWorkflow() {

```
workflowBadge.textContent =
    "COMPLETED";

workflowBadge.className =
    "status-badge complete";

workflowQuestion.innerHTML = `
    <h2>
        Workflow Summary
    </h2>

    <p>
        Workflow Completed Successfully
    </p>
`;

workflowChoices.innerHTML =
    "";

scriptContent.innerHTML = `
    Thank you for contacting
    Cash App Support.

    Is there anything else
    I can assist you with
    today?
`;
```

}
