document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeWorkflowEngine();

        document
            .getElementById(
                "loadWorkflowBtn"
            )
            .addEventListener(
                "click",
                loadWorkflow
            );

    }
);
