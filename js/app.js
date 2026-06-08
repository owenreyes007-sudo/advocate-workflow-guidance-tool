document.addEventListener("DOMContentLoaded", () => {

```
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

            console.log(
                "Reset button pressed"
            );

            resetWorkflow();

        }
    );

// Initialize clean state
resetWorkflow();
```

});
