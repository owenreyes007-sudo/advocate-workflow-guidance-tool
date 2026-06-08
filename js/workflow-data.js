const workflowLibrary = {

    "Account Access": {

        scenario: "Unable To Access Account",

        subScenarios: {

            "Account Recovery": {

                title: "Account Access → Account Recovery",

                startStep: "verify_name",

                steps: {

                    verify_name: {

                        stage: "Verification",

                        question: "Can the customer provide their Full Legal Name?",

                        choices: [
                            {
                                label: "Yes",
                                next: "secondary_auth"
                            },
                            {
                                label: "No",
                                next: "unable_verify"
                            }
                        ],

                        actions: [
                            "Validate legal name",
                            "Review account profile"
                        ],

                        kas: [
                            "KA-1001 Identity Verification Standards"
                        ],

                        qts: [
                            "QT-1001 Authentication Tool"
                        ],

                        script: `
Thank you for contacting Cash App Support.

Before we proceed, I need to verify your identity.

Can you please provide your full legal name?
`
                    },

                    secondary_auth: {

                        stage: "Verification",

                        question: "Which secondary verification method is available?",

                        choices: [
                            {
                                label: "ZIP Code",
                                next: "recovery_review"
                            },
                            {
                                label: "Last 4 Debit Card",
                                next: "recovery_review"
                            },
                            {
                                label: "Last 4 Cash Card",
                                next: "recovery_review"
                            },
                            {
                                label: "Recent P2P Payment",
                                next: "recovery_review"
                            }
                        ],

                        actions: [
                            "Complete secondary authentication"
                        ],

                        kas: [
                            "KA-1002 Secondary Authentication"
                        ],

                        qts: [
                            "QT-1002 Verification Assistant"
                        ],

                        script: `
Thank you.

For security purposes, please provide one additional verification item.
`
                    },

                    recovery_review: {

                        stage: "Investigation",

                        question: "Has the customer already attempted account recovery?",

                        choices: [
                            {
                                label: "Yes",
                                next: "access_channel"
                            },
                            {
                                label: "No",
                                next: "access_channel"
                            }
                        ],

                        actions: [
                            "Review recovery attempts",
                            "Determine eligibility"
                        ],

                        kas: [
                            "KA-1003 Account Recovery Process"
                        ],

                        qts: [
                            "QT-1003 Recovery Tool"
                        ],

                        script: `
Thank you for verifying your account.

Let me review available recovery options.
`
                    },

                    access_channel: {

                        stage: "Investigation",

                        question: "Which recovery channel is available?",

                        choices: [
                            {
                                label: "Email Access",
                                next: "resolution"
                            },
                            {
                                label: "Phone Access",
                                next: "resolution"
                            },
                            {
                                label: "Neither",
                                next: "resolution"
                            }
                        ],

                        actions: [
                            "Assess recovery channels"
                        ],

                        kas: [
                            "KA-1004 Recovery Channel Assessment"
                        ],

                        qts: [
                            "QT-1004 Eligibility Checker"
                        ],

                        script: `
I need to determine which recovery channel is available.
`
                    },

                    resolution: {

                        stage: "Resolution",

                        question: "Select the recommended resolution path.",

                        choices: [
                            {
                                label: "Grant Access",
                                next: "closure"
                            },
                            {
                                label: "Temporary Access",
                                next: "closure"
                            },
                            {
                                label: "Balance Transfer",
                                next: "closure"
                            },
                            {
                                label: "Reopen Account",
                                next: "closure"
                            }
                        ],

                        actions: [
                            "Identify final resolution"
                        ],

                        kas: [
                            "KA-1005 Resolution Decision Matrix"
                        ],

                        qts: [
                            "QT-1005 Resolution Selector"
                        ],

                        script: `
Based on my review, I have identified the recommended resolution.
`
                    },

                    unable_verify: {

                        stage: "Resolution",

                        question: "Customer could not be verified.",

                        choices: [
                            {
                                label: "Continue",
                                next: "closure"
                            }
                        ],

                        actions: [
                            "Advise customer verification requirements"
                        ],

                        kas: [
                            "KA-1006 Unable To Verify Policy"
                        ],

                        qts: [
                            "QT-1006 Verification Failure"
                        ],

                        script: `
Unfortunately, I am unable to verify ownership of the account.
`
                    },

                    closure: {

                        stage: "Call Closure",

                        question: "Workflow Complete",

                        choices: [],

                        actions: [
                            "Provide next steps",
                            "Document interaction",
                            "Close workflow"
                        ],

                        kas: [
                            "KA-1099 Closure Standards"
                        ],

                        qts: [
                            "QT-1099 Workflow Completion"
                        ],

                        script: `
That completes the actions available for this case today.

Is there anything else I can assist you with?
`
                    }

                }

            }

        }

    },

    "Banking": {

        scenario: "Missing Direct Deposit",

        subScenarios: {

            "Deposit Investigation": {

                title: "Banking → Missing Direct Deposit",

                startStep: "verify",

                steps: {

                    verify: {
                        stage: "Verification",
                        question: "Can customer be verified?",
                        choices: [
                            { label: "Verified", next: "deposit_search" }
                        ],
                        actions: ["Verify identity"],
                        kas: ["KA-2001 Deposit Verification"],
                        qts: ["QT-2001 Authentication"],
                        script: "Before we review the deposit, I need to verify your identity."
                    },

                    deposit_search: {
                        stage: "Investigation",
                        question: "Can the deposit be located?",
                        choices: [
                            { label: "Pending", next: "timeline" },
                            { label: "Found", next: "timeline" },
                            { label: "Not Found", next: "timeline" }
                        ],
                        actions: ["Search deposit records"],
                        kas: ["KA-2002 Deposit Investigation"],
                        qts: ["QT-2002 Deposit Lookup"],
                        script: "Let me investigate the deposit status."
                    },

                    timeline: {
                        stage: "Investigation",
                        question: "Has it been more than 3 business days?",
                        choices: [
                            { label: "Yes", next: "resolution" },
                            { label: "No", next: "resolution" }
                        ],
                        actions: ["Review timeline"],
                        kas: ["KA-2003 Deposit Timeline"],
                        qts: ["QT-2003 Timeline Calculator"],
                        script: "I need to determine the expected deposit timeframe."
                    },

                    resolution: {
                        stage: "Resolution",
                        question: "Choose the appropriate resolution.",
                        choices: [
                            { label: "Deposit Trace", next: "closure" },
                            { label: "ETA Education", next: "closure" },
                            { label: "Employer Verification", next: "closure" }
                        ],
                        actions: ["Determine next steps"],
                        kas: ["KA-2004 Deposit Resolution"],
                        qts: ["QT-2004 Deposit Trace Tool"],
                        script: "Based on my investigation, I have identified the next step."
                    },

                    closure: {
                        stage: "Call Closure",
                        question: "Workflow Complete",
                        choices: [],
                        actions: ["Close interaction"],
                        kas: ["KA-2099 Closure"],
                        qts: ["QT-2099 Completion"],
                        script: "Your case has been reviewed and guidance has been provided."
                    }

                }

            }

        }

    },

    "Payments": {

        scenario: "P2P Misdirected Payment",

        subScenarios: {

            "Payment Reversal": {

                title: "Payments → P2P Misdirected Payment",

                startStep: "verify",

                steps: {

                    verify: {
                        stage: "Verification",
                        question: "Can customer be verified?",
                        choices: [
                            { label: "Verified", next: "role" }
                        ],
                        actions: ["Authenticate customer"],
                        kas: ["KA-3001 Authentication"],
                        qts: ["QT-3001 Customer Lookup"],
                        script: "Before reviewing the payment, I need to verify your identity."
                    },

                    role: {
                        stage: "Investigation",
                        question: "Who is contacting support?",
                        choices: [
                            { label: "Sender", next: "recipient" },
                            { label: "Recipient", next: "recipient" }
                        ],
                        actions: ["Determine customer role"],
                        kas: ["KA-3002 Sender Recipient Review"],
                        qts: ["QT-3002 Transaction Review"],
                        script: "I need to determine your relationship to the payment."
                    },

                    recipient: {
                        stage: "Investigation",
                        question: "Was the payment sent to the wrong recipient?",
                        choices: [
                            { label: "Yes", next: "eligibility" },
                            { label: "No", next: "eligibility" }
                        ],
                        actions: ["Review recipient details"],
                        kas: ["KA-3003 Wrong Recipient Process"],
                        qts: ["QT-3003 Recipient Validation"],
                        script: "Let me review the payment details."
                    },

                    eligibility: {
                        stage: "Resolution",
                        question: "Is the payment eligible for reversal?",
                        choices: [
                            { label: "Eligible", next: "closure" },
                            { label: "Not Eligible", next: "closure" }
                        ],
                        actions: ["Determine final outcome"],
                        kas: ["KA-3004 Reversal Eligibility"],
                        qts: ["QT-3004 Reversal Tool"],
                        script: "Based on my review, I can determine reversal eligibility."
                    },

                    closure: {
                        stage: "Call Closure",
                        question: "Workflow Complete",
                        choices: [],
                        actions: ["Provide guidance", "Close interaction"],
                        kas: ["KA-3099 Closure"],
                        qts: ["QT-3099 Completion"],
                        script: "That completes the review of this payment concern."
                    }

                }

            }

        }

    }

};
