let currentWorkflow = null;
let currentStepIndex = 0;

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
workflowLibrary[category].subScenarios
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

currentStepIndex = 0;

workflowTitle.textContent =
currentWorkflow.title;

workflowBadge.textContent =
"In Progress";

renderStep();

}

function renderStep(){

const step =
currentWorkflow.steps[currentStepIndex];

workflowQuestion.innerHTML =

`<strong>${step.title}</strong> <br><br>
${step.question}`;

renderChoices(step);

renderActions(step);

renderKAs(step);

renderQTs(step);

renderScript(step);

renderProgress(step.title);

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
choice;

button.onclick = ()=>{

nextStep();

};

workflowChoices.appendChild(
button
);

});

if(currentStepIndex > 0){

const backButton =
document.createElement("button");

backButton.className =
"choice-btn";

backButton.style.background =
"#CBD5E1";

backButton.innerText =
"Previous Step";

backButton.onclick =
previousStep;

workflowChoices.appendChild(
backButton
);

}

}

function renderActions(step){

recommendedActions.innerHTML =
"<ul>" +
step.actions
.map(item=>`<li>${item}</li>`)
.join("")
+
"</ul>";

}

function renderKAs(step){

kaReferences.innerHTML =
"<ul>" +
step.kas
.map(item=>`<li>${item}</li>`)
.join("")
+
"</ul>";

}

function renderQTs(step){

qtReferences.innerHTML =
"<ul>" +
step.qts
.map(item=>`<li>${item}</li>`)
.join("")
+
"</ul>";

}

function renderScript(step){

scriptContent.innerHTML =
step.script;

}

function renderProgress(currentStage){

const stages = [

"Verification",
"Investigation",
"Resolution",
"Call Closure"

];

progressTracker.innerHTML = "";

let activeReached = false;

stages.forEach(stage=>{

const div =
document.createElement("div");

div.className =
"journey-step";

if(stage === currentStage){

div.classList.add("active");

activeReached = true;

}

if(!activeReached){

div.style.opacity = "1";

}else{

div.style.opacity = "0.7";

}

div.innerText = stage;

progressTracker.appendChild(div);

});

}

function nextStep(){

currentStepIndex++;

if(
currentStepIndex >=
currentWorkflow.steps.length
){

completeWorkflow();

return;

}

renderStep();

}

function previousStep(){

if(currentStepIndex > 0){

currentStepIndex--;

renderStep();

}

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

<ul style="
text-align:left;
display:inline-block;
line-height:2;
">

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

<li>Provide customer guidance</li>

<li>Apply SOP</li>

<li>Close interaction</li>

</ul>
`;

kaReferences.innerHTML =

`

<ul>

<li>KA-9999 Workflow Completion</li>

<li>KA-9998 Closure Standards</li>

</ul>
`;

qtReferences.innerHTML =

`

<ul>

<li>QT-9999 Case Documentation</li>

<li>QT-9998 Interaction Closure</li>

</ul>
`;

scriptContent.innerHTML =

`
That completes the actions available for this case.

Is there anything else I can assist you with today?
`;

}
