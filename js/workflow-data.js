const workflowLibrary = {

```
"Account Access Recovery": {

    scenario: "Account Access",

    subScenarios: {

        "Cannot Access Account": {

            title: "Account Access Recovery",

            startStep: "access_review",

            steps: {

                access_review: {

                    stage: "Investigation",

                    title: "Review Account Access",

                    question:
                        "What account access issue is the customer experiencing?",

                    script:
                        "Let me review the account details and determine the best recovery path.",

                    actions: [
                        "Review aliases",
                        "Review account status",
                        "Review sign in history"
                    ],

                    resources: [
                        {
                            name: "Account Access - Voice",
                            url: "https://cf1.lightning.force.com/lightning/r/Knowledge__kav/ka0Pn000000NiGTIA0/view"
                        }
                    ],

                    tools: [
                        {
                            name: "CF1 Lightning",
                            url: "#"
                        }
                    ],

                    choices: [
                        {
                            label: "Recovery Available",
                            next: "close_case"
                        }
                    ]

                },

                close_case: {

                    stage: "Call Closure",

                    title: "Close Interaction",

                    question:
                        "Complete the interaction.",

                    script:
                        "Thank you for contacting Cash App. Is there anything else I can assist you with today?",

                    actions: [
                        "Document interaction",
                        "Apply disposition"
                    ],

                    resources: [],

                    tools: [],

                    choices: []

                }

            }

        }

    }

},

"Missing Direct Deposit": {

    scenario: "Banking",

    subScenarios: {

        "Missing Direct Deposit": {

            title: "Missing Direct Deposit",

            startStep: "deposit_review",

            steps: {

                deposit_review: {

                    stage: "Investigation",

                    title: "Review Deposit",

                    question:
                        "Can the deposit be located?",

                    script:
                        "Let me review the deposit details.",

                    actions: [
                        "Review transaction history",
                        "Review pending deposits"
                    ],

                    resources: [
                        {
                            name: "Direct Deposit",
                            url: "https://cf1.lightning.force.com/lightning/r/Knowledge__kav/ka0Pn000000WxzRIAS/view"
                        }
                    ],

                    tools: [
                        {
                            name: "CF1 Lightning",
                            url: "#"
                        }
                    ],

                    choices: [
                        {
                            label: "Deposit Located",
                            next: "close_case"
                        }
                    ]

                },

                close_case: {

                    stage: "Call Closure",

                    title: "Close Interaction",

                    question:
                        "Complete the interaction.",

                    script:
                        "Thank you for contacting Cash App. Is there anything else I can assist you with today?",

                    actions: [
                        "Document interaction",
                        "Apply disposition"
                    ],

                    resources: [],

                    tools: [],

                    choices: []

                }

            }

        }

    }

}
```

};
