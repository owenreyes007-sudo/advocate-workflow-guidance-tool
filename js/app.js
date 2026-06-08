document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeWorkflowEngine();

        document
            .getElementById("loadWorkflowBtn")
            .addEventListener(
                "click",
                loadWorkflow
            );

        document
            .getElementById("resetWorkflowBtn")
            .addEventListener(
                "click",
                () => {

                    resetWorkflow();

                }
            );

        resetWorkflow();

    }
);
