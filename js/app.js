document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeWorkflowEngine();

        const loadBtn =
            document.getElementById(
                "loadWorkflowBtn"
            );

        if (loadBtn) {

            loadBtn.addEventListener(
                "click",
                loadWorkflow
            );

        }

        const resetBtn =
            document.getElementById(
                "resetWorkflowBtn"
            );

        if (resetBtn) {

            resetBtn.addEventListener(
                "click",
                resetWorkflow
            );

        }

        const previousBtn =
            document.getElementById(
                "previousBtn"
            );

        if (previousBtn) {

            previousBtn.addEventListener(
                "click",
                previousStep
            );

        }

        const cancelBtn =
            document.getElementById(
                "cancelWorkflowBtn"
            );

        if (cancelBtn) {

            cancelBtn.addEventListener(
                "click",
                openCancelModal
            );

        }

        const closeModalBtn =
            document.getElementById(
                "closeModalBtn"
            );

        if (closeModalBtn) {

            closeModalBtn.addEventListener(
                "click",
                closeCancelModal
            );

        }

        const confirmCancelBtn =
            document.getElementById(
                "confirmCancelBtn"
            );

        if (confirmCancelBtn) {

            confirmCancelBtn.addEventListener(
                "click",
                confirmCancellation
            );

        }

        resetWorkflow();

    }
);

function openCancelModal() {

    const modal =
        document.getElementById(
            "cancelModal"
        );

    if (modal) {

        modal.classList.remove(
            "hidden"
        );

    }

}

function closeCancelModal() {

    const modal =
        document.getElementById(
            "cancelModal"
        );

    if (modal) {

        modal.classList.add(
            "hidden"
        );

    }

}

function confirmCancellation() {

    const reasonField =
        document.getElementById(
            "cancelReason"
        );

    const reason =
        reasonField
            ? reasonField.value
            : "Workflow Cancelled";

    workflowBadge.textContent =
        "CANCELLED";

    workflowQuestion.innerHTML = `
        <h2>
            Workflow Cancelled
        </h2>

        <br>

        <strong>
            Reason:
        </strong>

        ${reason}
    `;

    workflowChoices.innerHTML = "";

    recommendedActions.innerHTML = `
        <ul>
            <li>Document cancellation reason</li>
            <li>Apply disposition</li>
            <li>Close interaction</li>
        </ul>
    `;

    kaReferences.innerHTML =
        "No resources required.";

    qtReferences.innerHTML =
        "No tools required.";

    scriptContent.innerHTML = `
        This workflow was cancelled.

        Document the outcome and
        proceed with closure.
    `;

    closeCancelModal();

}
