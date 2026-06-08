document.addEventListener(
"DOMContentLoaded",
() => {

```
    initializeWorkflowEngine();

    document
        .getElementById(
            "loadWorkflowBtn"
        )
        .addEventListener(
            "click",
            loadWorkflow
        );

    document
        .getElementById(
            "previousBtn"
        )
        .addEventListener(
            "click",
            previousStep
        );

    document
        .getElementById(
            "resetWorkflowBtn"
        )
        .addEventListener(
            "click",
            resetWorkflow
        );

    document
        .getElementById(
            "cancelWorkflowBtn"
        )
        .addEventListener(
            "click",
            openCancelModal
        );

    document
        .getElementById(
            "closeModalBtn"
        )
        .addEventListener(
            "click",
            closeCancelModal
        );

    document
        .getElementById(
            "confirmCancelBtn"
        )
        .addEventListener(
            "click",
            confirmCancellation
        );

    resetWorkflow();

}
```

);

function openCancelModal() {

```
document
    .getElementById(
        "cancelModal"
    )
    .classList
    .remove("hidden");
```

}

function closeCancelModal() {

```
document
    .getElementById(
        "cancelModal"
    )
    .classList
    .add("hidden");
```

}

function confirmCancellation() {

```
const reason =
    document
    .getElementById(
        "cancelReason"
    )
    .value;

workflowBadge.textContent =
    "CANCELLED";

workflowBadge.className =
    "status-badge cancelled";

workflowQuestion.innerHTML = `
    <h2>
        Workflow Cancelled
    </h2>

    <br>

    <p>
        Reason:
        <strong>${reason}</strong>
    </p>
`;

workflowChoices.innerHTML = "";

recommendedActions.innerHTML = `
    <ul>
        <li>Document cancellation</li>
        <li>Apply disposition</li>
        <li>Close interaction</li>
    </ul>
`;

kaReferences.innerHTML = `
    <ul>
        <li>
            Closure Standards
        </li>
    </ul>
`;

qtReferences.innerHTML = `
    <ul>
        <li>
            Case Documentation Tool
        </li>
    </ul>
`;

scriptContent.innerHTML = `
    The workflow has been cancelled.

    Document the reason and
    proceed with case closure.
`;

closeCancelModal();
```

}
