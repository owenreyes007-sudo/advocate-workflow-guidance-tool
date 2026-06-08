let currentWorkflow = null;
let currentStepId = null;
let historyStack = [];

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

const progressTracker =
document.getElementById("progressTracker");

const workflowBadge =
document.getElementById("workflowBadge");

function initializeWorkflowEngine(){

loadCategories();

categorySelect.addEventListener(
"change",
populateScenario
);

scenarioSelect.addEventListener(
"change",
populateSubScenario
);

}

function loadCategories(){

categorySelect.innerHTML = "";

Object.keys(workflowLibrary)
.forEach(category=>{

const option =
document.createElement("option");

option.value = category;
option.textContent = category;

categorySelect.appendChild(option);

});

populateScenario();

}

function populateScenario(){

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

}

function populateSubScenario(){

const category =
categorySelect.value;

subScenarioSelect.innerHTML = "";

Object.keys(
workflowLibrary[category]
.subScenarios
)
.forEach(sub=>{

const option =
document.createElement("option");

option.value = sub;
option.textContent = sub;

subScenarioSelect.appendChild(option);

});

}

function loadWorkflow(){

const category =
categorySelect.value;

const subScenario =
subScenarioSelect.value;

currentWorkflow =
workflowLibrary[category]
.subScenarios[subScenario];

historyStack = [];

currentStepId =
currentWorkflow.startStep;

workflowTitle.textContent =
currentWorkflow.title;

workflowBadge.textContent =
"In Progress";

renderCurrentStep();

}

function renderCurrentStep(){

const step =
currentWorkflow.steps[currentStepId];

workflowQuestion.innerHTML =

` <strong>
${step.stage} </strong>

<br><br>

${step.question}
`;

renderChoices(step);

renderActions(step);

renderKAs(step);

renderQTs(step);

renderScript(step);

renderProgress(step.stage);

}

function renderChoices(step){

workflowChoices.innerHTML = "";

if(step.choices.length === 0){

const completeBtn =
document.createElement("button");

completeBtn.className =
"choice-btn";

completeBtn.innerText =
"Complete Workflow";

completeBtn.onclick =
completeWorkflow;

workflowChoices.appendChild(
completeBtn
);

return;

}

step.choices.forEach(choice=>{

const button =
document.createElement("button");

button.className =
"choice-btn";

button.innerText =
choice.label;

button.onclick = ()=>{

historyStack.push(
currentStepId
);

currentStepId =
choice.next;

renderCurrentStep();

};

workflowChoices.appendChild(
button
);

});

if(historyStack.length > 0){

const previousBtn =
document.createElement("button");

previousBtn.className =
"choice-btn";

previousBtn.style.background =
"#CBD5E1";

previousBtn.innerText =
"Previous Step";

previousBtn.onclick =
previousStep;

workflowChoices.appendChild(
previousBtn
);

}

}

function previousStep(){

if(historyStack.length === 0){

return;

}

currentStepId =
historyStack.pop();

renderCurrentStep();

}

function renderActions(step){

    recommendedActions.innerHTML = `
        <ul>
            ${step.actions
                .map(item => `<li>${item}</li>`)
                .join("")}
        </ul>
    `;

}

function renderKAs(step){

    kaReferences.innerHTML = `
        <ul>
            ${step.kas
                .map(item => `<li>${item}</li>`)
                .join("")}
        </ul>
    `;

}

function renderQTs(step){

    qtReferences.innerHTML = `
        <ul>
            ${step.qts
                .map(item => `<li>${item}</li>`)
                .join("")}
        </ul>
    `;

}

function renderProgress(currentStage){

const stages = [

"Verification",
"Investigation",
"Resolution",
"Call Closure"

];

progressTracker.innerHTML = "";

stages.forEach(stage=>{

const div =
document.createElement("div");

div.className =
"journey-step";

if(stage === currentStage){

div.classList.add("active");

}

div.innerText = stage;

progressTracker.appendChild(div);

});

}

function resetWorkflow(){

    currentWorkflow = null;
    currentStepId = null;
    historyStack = [];

    workflowTitle.textContent =
        "Select Workflow";

    workflowBadge.textContent =
        "Ready";

    workflowQuestion.innerHTML =
        "Select a workflow from the left panel to begin.";

    workflowChoices.innerHTML = "";

    recommendedActions.innerHTML = `
        <ul>
            <li>Select a workflow</li>
            <li>Load workflow</li>
            <li>Follow guided troubleshooting</li>
        </ul>
    `;

    kaReferences.innerHTML = `
        <ul>
            <li>No Knowledge Articles Loaded</li>
        </ul>
    `;

    qtReferences.innerHTML = `
        <ul>
            <li>No QT References Loaded</li>
        </ul>
    `;

    scriptContent.innerHTML = `
        Welcome Advocate.<br><br>
        Select a workflow from Workflow Intake to begin.
    `;

    progressTracker.innerHTML = `
        <div class="journey-step active">
            Verification
        </div>

        <div class="journey-step">
            Investigation
        </div>

        <div class="journey-step">
            Resolution
        </div>

        <div class="journey-step">
            Call Closure
        </div>
    `;

}
function completeWorkflow(){

workflowBadge.textContent =
"Completed";

workflowQuestion.innerHTML =

`

<div style="text-align:center">

<h2>

Resolution Summary

</h2>

<br>

<p>

Workflow completed successfully.

</p>

<br>

<ul
style="
text-align:left;
display:inline-block;
line-height:2;
"
>

<li>✓ Identity Verified</li>

<li>✓ Investigation Completed</li>

<li>✓ Resolution Determined</li>

<li>✓ Ready For Call Closure</li>

</ul>

</div>
`;

workflowChoices.innerHTML = "";

recommendedActions.innerHTML =

`

<ul>

<li>Document interaction</li>

<li>Apply SOP</li>

<li>Provide guidance</li>

<li>Close interaction</li>

</ul>
`;

kaReferences.innerHTML =

`

<ul>

<li>KA-9999 Closure Standards</li>

<li>KA-9998 Documentation Guide</li>

</ul>
`;

qtReferences.innerHTML =

`

<ul>

<li>QT-9999 Documentation Tool</li>

<li>QT-9998 Closure Assistant</li>

</ul>
`;

scriptContent.innerHTML =

`
That completes the actions available for this case.

Is there anything else I can assist you with today?
`;

}
