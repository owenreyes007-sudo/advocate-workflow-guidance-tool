document.addEventListener("DOMContentLoaded", () => {

```
console.log("App initialized");

initializeWorkflowEngine();

const loadBtn =
    document.getElementById("loadWorkflowBtn");

const resetBtn =
    document.getElementById("resetWorkflowBtn");

if(loadBtn){

    loadBtn.addEventListener(
        "click",
        loadWorkflow
    );

}

if(resetBtn){

    resetBtn.addEventListener(
        "click",
        () => {

            console.log(
                "Reset button clicked"
            );

            resetWorkflow();

        }
    );

}
```

});
