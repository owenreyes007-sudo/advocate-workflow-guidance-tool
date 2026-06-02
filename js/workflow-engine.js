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

function initializeWorkflowEngine() {

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

function loadCategories() {

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
}

function populateScenario() {

    const category =
        categorySelect.value;

    scenarioSelect.innerHTML = "";

    const scenario =
        workflowLibrary[category].scenario;

    const option =
        document.createElement("option");

    option.value = scenario;
    option.textContent = scenario;

    scenarioSelect.appendChild(option);

    populateSubScenario();
}

function populateSubScenario() {

    const category =
        categorySelect.value;

    subScenarioSelect.innerHTML = "";

    const subScenarios =
        workflowLibrary[category]
        .subScenarios;

    Object.keys(subScenarios)
        .forEach(sub => {

            const option =
                document.createElement("option");

            option.value = sub;
            option.textContent = sub;

            subScenarioSelect.appendChild(option);

        });
}

function loadWorkflow() {

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

function renderStep() {

    const step =
        currentWorkflow.steps[currentStepIndex];

    workflowQuestion.innerHTML = `
        <strong>${step.title}</strong>
        <br><br>
        ${step.question}
    `;

    renderChoices(step);

    renderActions(step);

    renderKAs(step);

    renderQTs(step);

    renderScript(step);

    renderProgress();
}

function renderChoices(step) {

    workflowChoices.innerHTML = "";

    if(step.choices.length === 0){

        const button =
            document.createElement("button");

        button.className =
            "choice-btn";

        button.innerText =
            "Workflow Complete";

        button.onclick =
            completeWorkflow;

        workflowChoices.appendChild(button);

        return;
    }

    step.choices.forEach(choice => {

        const button =
            document.createElement("button");

        button.className =
            "choice-btn";

        button.innerText =
            choice;

        button.onclick = () =>
            nextStep(choice);

        workflowChoices
            .appendChild(button);

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

        workflowChoices
            .appendChild(backButton);

    }

}

function renderActions(step){

    recommendedActions.innerHTML =
        "<ul>" +
        step.actions
            .map(action =>
                `<li>${action}</li>`)
            .join("")
        + "</ul>";

}

function renderKAs(step){

    kaReferences.innerHTML =
        "<ul>" +
        step.kas
            .map(ka =>
                `<li>${ka}</li>`)
            .join("")
        + "</ul>";

}

function renderQTs(step){

    qtReferences.innerHTML =
        "<ul>" +
        step.qts
            .map(qt =>
                `<li>${qt}</li>`)
            .join("")
        + "</ul>";

}

function renderScript(step){

    scriptContent.innerHTML =
        step.script;

}

function renderProgress(){

    progressTracker.innerHTML = "";

    currentWorkflow.steps
        .forEach((step,index)=>{

            const div =
                document.createElement("div");

            div.className =
                "progress-step";

            if(index === currentStepIndex){

                div.classList.add("active");

            }

            div.innerText =
                step.title;

            progressTracker
                .appendChild(div);

        });

}

function nextStep(){

    currentStepIndex++;

    if(currentStepIndex >=
        currentWorkflow.steps.length){

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

    workflowQuestion.innerHTML = `
        <div style="text-align:center">

            <h2>
            Resolution Path Identified
            </h2>

            <br>

            <p>
            Workflow completed successfully.
            </p>

        </div>
    `;

    workflowChoices.innerHTML = "";

    recommendedActions.innerHTML = `
        <strong>Recommended Outcome</strong>
        <ul>
            <li>Proceed with identified resolution</li>
            <li>Follow applicable SOP</li>
            <li>Document customer interaction</li>
        </ul>
    `;
}
