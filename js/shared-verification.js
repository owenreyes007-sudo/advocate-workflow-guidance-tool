const sharedVerification = {

    ttc: {

        stage: "Verification",

        title: "Tap To Confirm",

        question:
            "Has the customer successfully completed Tap To Confirm?",

        choices: [

            {
                label: "Yes",
                next: "verified"
            },

            {
                label: "No",
                next: "manual_name"
            }

        ],

        actions: [

            "Confirm Tap To Confirm status",
            "Document verification outcome"

        ],

        resources: [

            {
                name: "Voice - PII",
                url: "#"
            }

        ],

        tools: [

            {
                name: "CF1",
                url: "#"
            }

        ],

        script: `
Thank you for contacting Cash App Support.

Before we continue, I need to verify your identity.

Have you completed the Tap To Confirm prompt in your Cash App?
        `

    },

    manual_name: {

        stage: "Verification",

        title: "Manual Verification",

        question:
            "Can the customer provide their Full Legal Name?",

        choices: [

            {
                label: "Yes",
                next: "secondary_verification"
            },

            {
                label: "No",
                next: "unable_to_verify"
            }

        ],

        actions: [

            "Verify legal first name",
            "Verify legal last name",
            "Review verified legal name"

        ],

        resources: [

            {
                name: "Voice - PII",
                url: "#"
            }

        ],

        tools: [

            {
                name: "Regulator",
                url: "#"
            }

        ],

        script: `
Thank you.

Can you please provide your full legal first and last name exactly as it appears on your Cash App account?
        `

    },

    secondary_verification: {

        stage: "Verification",

        title: "Secondary Verification",

        question:
            "Select verification method used.",

        choices: [

            {
                label: "Billing ZIP",
                next: "verified"
            },

            {
                label: "Last 3 Bank",
                next: "verified"
            },

            {
                label: "Last 4 Debit Card",
                next: "verified"
            },

            {
                label: "Last 4 Cash Card",
                next: "verified"
            },

            {
                label: "Recent P2P Transactions",
                next: "verified"
            }

        ],

        actions: [

            "Verify secondary authentication",
            "Confirm ownership",
            "Document verification method"

        ],

        resources: [

            {
                name: "Voice - PII",
                url: "#"
            }

        ],

        tools: [

            {
                name: "Regulator",
                url: "#"
            }

        ],

        script: `
Thank you.

I need one additional verification item before I can access account-specific information.
        `

    },

    verified: {

        stage: "Verification",

        title: "Verification Complete",

        question:
            "Customer successfully verified.",

        choices: [

            {
                label: "Continue",
                next: "__WORKFLOW_START__"
            }

        ],

        actions: [

            "Verification successful",
            "Proceed to investigation"

        ],

        resources: [

            {
                name: "Voice - PII",
                url: "#"
            }

        ],

        tools: [

            {
                name: "Regulator",
                url: "#"
            }

        ],

        script: `
Thank you.

Your identity has been successfully verified.
Let's continue reviewing your concern.
        `

    },

    unable_to_verify: {

        stage: "Call Closure",

        title: "Unable To Verify",

        question:
            "Customer could not be verified.",

        choices: [],

        actions: [

            "Do not disclose account information",
            "Advise customer to contact support again once information is available"

        ],

        resources: [

            {
                name: "Voice - PII",
                url: "#"
            }

        ],

        tools: [],

        script: `
I'm sorry, but I wasn't able to successfully verify the account.

For security reasons I cannot discuss account-specific information at this time.
        `

    }

};

const cancellationReasons = [

    "Call Disconnected",

    "Customer Resolved Issue",

    "Wrong Workflow Selected",

    "Duplicate Contact",

    "Transferred To Another Team",

    "Customer Refused Verification",

    "Other"

];
