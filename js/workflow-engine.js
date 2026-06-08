let currentWorkflow = null;
let currentStepId = null;
let historyStack = [];

const categorySelect =
document.getElementById(
"categorySelect"
);

const scenarioSelect =
document.getElementById(
"scenarioSelect"
);

const subScenarioSelect =
document.getElementById(
"subScenarioSelect"
);

const workflowTitle =
document.getElementById(
"workflowTitle"
);

const workflowQuestion =
document.getElementById(
"workflowQuestion"
);

const workflowChoices =
document.getElementById(
"workflowChoices"
);

const recommendedActions =
document.getElementById(
"recommendedActions"
);

const kaReferences =
document.getElementById(
"kaReferences"
);

const qtReferences =
document.getElementById(
"qtReferences"
);

const scriptContent =
document.getElementById(
"scriptContent"
);

const workflowBadge =
document.getElementById(
"workflowBadge"
);

const progressTracker =
document.getElementById(
"progressTracker"
);

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
            document.createElement(
                "option"
            );

        option.value =
            category;

        option.textContent =
            category;

        categorySelect.appendChild(
            option
        );

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
    document.createElement(
        "option"
    );

option.value =
    workflowLibrary[
        category
    ].scenario;

option.textContent =
    workflowLibrary[
        category
    ].scenario;

scenarioSelect.appendChild(
    option
);

populateSubScenario();
```

}

function populateSubScenario() {

```
const category =
    categorySelect.value;

subScenarioSelect.innerHTML = "";

Object.keys(
    workflowLibrary[
        category
    ].subScenarios
).forEach(sub => {

    const option =
        document.createElement(
            "option"
        );

    option.value =
        sub;

    option.textContent =
        sub;

    subScenarioSelect
        .appendChild(option);

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
    workflowLibrary[
        category
    ].subScenarios[
        subScenario
    ];

currentStepId =
    currentWorkflow.startStep;

historyStack = [];

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

renderProgress(
    step.stage
);
```

}

function renderChoices(step) {

```
workflowChoices.innerHTML = "";

if (
    !step.choices ||
    step.choices.length === 0
) {

    return;

}

step.choices.forEach(
    choice => {

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

                currentStepId =
                    choice.next;

                renderCurrentStep();

            };

        workflowChoices
            .appendChild(
                button
            );

    }
);
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
                       ${item.name}
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
                       ${item.name}
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

progressTracker.innerHTML =
    "";

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

recommendedActions.innerHTML =
    "No workflow loaded.";

kaReferences.innerHTML =
    "No resources loaded.";

qtReferences.innerHTML =
    "No tools loaded.";

scriptContent.innerHTML =
    "Select a workflow to begin.";
```

}
