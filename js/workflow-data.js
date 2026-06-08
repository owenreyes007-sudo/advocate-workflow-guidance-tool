const workflowLibrary = {

  "Account Access Recovery": {

    scenario: "Account Access",

    subScenarios: {

      "Cannot Access Account": {

        title: "Account Access Recovery",

        startStep: "verify_identity",

        steps: {

          verify_identity: {

            stage: "Verification",

            title: "Verify Customer Identity",

            question:
              "Has the customer successfully completed Tap to Confirm?",

            script:
              "I’ll first verify ownership of the account before reviewing account access options.",

            actions: [
              "Check Tap to Confirm",
              "Confirm account ownership",
              "Review linked aliases"
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
              },
              {
                name: "Regulator",
                url: "#"
              }
            ],

            choices: [
              {
                label: "Tap To Confirm Successful",
                next: "access_review"
              },
              {
                label: "Tap To Confirm Failed",
                next: "manual_verification"
              }
            ]

          },

          manual_verification: {

            stage: "Verification",

            title: "Manual Verification",

            question:
              "Was manual PII verification successful?",

            script:
              "For security purposes I need to verify your account ownership using the information available on file.",

            actions: [
              "Verify full name",
              "Verify phone or email",
              "Verify supporting identifiers"
            ],

            resources: [
              {
                name: "Voice - PII",
                url: "#"
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
                label: "PII Verified",
                next: "access_review"
              },
              {
                label: "Unable To Verify",
                next: "unable_to_verify"
              }
            ]

          },

          unable_to_verify: {

            stage: "Call Closure",

            title: "Unable To Verify Customer",

            question:
              "Customer could not be verified.",

            script:
              "For account security, I'm unable to discuss account specific information until ownership can be verified.",

            actions: [
              "Provide supported contact methods",
              "Do not disclose account information",
              "Document verification failure"
            ],

            resources: [],

            tools: [],

            choices: []

          },

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
                name: "Regulator",
                url: "#"
              }
            ],

            choices: [
              {
                label: "Recovery Available",
                next: "provide_recovery"
              },
              {
                label: "Escalation Required",
                next: "escalate_access"
              }
            ]

          },

          provide_recovery: {

            stage: "Resolution",

            title: "Provide Recovery Guidance",

            question:
              "Guide customer through recovery steps.",

            script:
              "I'll walk you through the next steps to regain access to your account.",

            actions: [
              "Provide recovery instructions",
              "Confirm understanding",
              "Verify customer can proceed"
            ],

            resources: [
              {
                name: "Account Access - Voice",
                url: "https://cf1.lightning.force.com/lightning/r/Knowledge__kav/ka0Pn000000NiGTIA0/view"
              }
            ],

            tools: [],

            choices: [
              {
                label: "Proceed To Closure",
                next: "close_case"
              }
            ]

          },

          escalate_access: {

            stage: "Resolution",

            title: "Escalate Account Access",

            question:
              "Recovery requires escalation.",

            script:
              "I'll submit this case to the appropriate team for additional review.",

            actions: [
              "Create escalation",
              "Document findings",
              "Provide expectations"
            ],

            resources: [],

            tools: [
              {
                name: "Escalation Queue",
                url: "#"
              }
            ],

            choices: [
              {
                label: "Proceed To Closure",
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
              "Apply disposition",
              "Deliver CSAT closing"
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

        startStep: "verify_identity",

        steps: {

          verify_identity: {

            stage: "Verification",

            title: "Verify Customer",

            question:
              "Has the customer successfully completed Tap to Confirm?",

            script:
              "Before reviewing the deposit, I'll verify account ownership.",

            actions: [
              "Review Tap To Confirm",
              "Verify ownership"
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
                label: "Tap To Confirm Successful",
                next: "deposit_investigation"
              },
              {
                label: "Tap To Confirm Failed",
                next: "manual_verification"
              }
            ]

          },

          manual_verification: {

            stage: "Verification",

            title: "Manual Verification",

            question:
              "Was manual verification successful?",

            script:
              "I'll verify ownership using available account information.",

            actions: [
              "Verify name",
              "Verify phone/email"
            ],

            resources: [
              {
                name: "Voice - PII",
                url: "#"
              }
            ],

            tools: [],

            choices: [
              {
                label: "PII Verified",
                next: "deposit_investigation"
              },
              {
                label: "Unable To Verify",
                next: "unable_to_verify"
              }
            ]

          }
          unable_to_verify: {

            stage: "Call Closure",

            title: "Unable To Verify Customer",

            question:
              "Customer could not be verified.",

            script:
              "For security reasons, I'm unable to discuss account-specific information until ownership has been verified.",

            actions: [
              "Do not disclose account information",
              "Provide supported contact methods",
              "Document verification failure"
            ],

            resources: [],

            tools: [],

            choices: []

          },

          deposit_investigation: {

            stage: "Investigation",

            title: "Locate Deposit",

            question:
              "Can the expected deposit be located?",

            script:
              "Let me review the account and determine the current status of the deposit.",

            actions: [
              "Review transaction history",
              "Check pending deposits",
              "Confirm expected amount"
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
              },
              {
                name: "Regulator",
                url: "#"
              }
            ],

            choices: [
              {
                label: "Deposit Found",
                next: "deposit_status"
              },
              {
                label: "Deposit Not Found",
                next: "deposit_trace"
              }
            ]

          },

          deposit_status: {

            stage: "Assessment",

            title: "Assess Deposit Status",

            question:
              "What is the current deposit status?",

            script:
              "I'll review the transaction status and determine the appropriate next steps.",

            actions: [
              "Review posting status",
              "Check settlement details",
              "Confirm availability"
            ],

            resources: [
              {
                name: "Direct Deposit",
                url: "https://cf1.lightning.force.com/lightning/r/Knowledge__kav/ka0Pn000000WxzRIAS/view"
              }
            ],

            tools: [],

            choices: [
              {
                label: "Pending",
                next: "provide_eta"
              },
              {
                label: "Completed",
                next: "balance_review"
              },
              {
                label: "Failed",
                next: "deposit_trace"
              }
            ]

          },

          balance_review: {

            stage: "Assessment",

            title: "Balance Review",

            question:
              "Was the deposit already spent or transferred?",

            script:
              "Let's review the account activity after the deposit posted.",

            actions: [
              "Review balance history",
              "Review transfers",
              "Review card activity"
            ],

            resources: [],

            tools: [
              {
                name: "Regulator",
                url: "#"
              }
            ],

            choices: [
              {
                label: "Deposit Used",
                next: "educate_customer"
              },
              {
                label: "Still Missing",
                next: "deposit_trace"
              }
            ]

          },

          provide_eta: {

            stage: "Resolution",

            title: "Provide ETA",

            question:
              "Deposit is still processing.",

            script:
              "The deposit is currently processing. I'll provide the expected completion timeframe.",

            actions: [
              "Provide ETA",
              "Review processing expectations",
              "Document guidance"
            ],

            resources: [],

            tools: [],

            choices: [
              {
                label: "Proceed To Closure",
                next: "close_case"
              }
            ]

          },

          deposit_trace: {

            stage: "Resolution",

            title: "Trace Deposit",

            question:
              "Additional investigation required.",

            script:
              "I'll document the details and initiate the next level of investigation.",

            actions: [
              "Create escalation",
              "Document deposit details",
              "Provide expectations"
            ],

            resources: [
              {
                name: "Direct Deposit",
                url: "https://cf1.lightning.force.com/lightning/r/Knowledge__kav/ka0Pn000000WxzRIAS/view"
              }
            ],

            tools: [
              {
                name: "Escalation Queue",
                url: "#"
              }
            ],

            choices: [
              {
                label: "Proceed To Closure",
                next: "close_case"
              }
            ]

          },

          educate_customer: {

            stage: "Resolution",

            title: "Deposit Located",

            question:
              "Deposit was successfully located.",

            script:
              "The deposit was received and account activity indicates it has already been used.",

            actions: [
              "Review activity",
              "Educate customer",
              "Document findings"
            ],

            resources: [],

            tools: [],

            choices: [
              {
                label: "Proceed To Closure",
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
              "Apply disposition",
              "Deliver CSAT closing"
            ],

            resources: [],

            tools: [],

            choices: []

          }

        }

      }

    }

  }

};
