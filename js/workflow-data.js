const workflowLibrary = {

  "Account Access": {
    scenario: "Unable To Access Account",

    subScenarios: {

      "Account Recovery": {

        title: "Account Access → Account Recovery",

        steps: [

          {
            id: 1,
            title: "Verify Identity",
            question: "Can the customer provide their Full Legal Name?",
            choices: ["Yes", "No"],
            actions: [
              "Validate legal name against account profile",
              "Confirm exact spelling",
              "Document verification result"
            ],
            kas: [
              "KA-1001 Identity Verification Standards",
              "KA-1002 Customer Authentication"
            ],
            qts: [
              "QT-1001 Customer Authentication",
              "QT-1002 Regulator Lookup"
            ],
            script: `
            Purpose: Verify Identity

            Thank you for contacting Cash App Support.

            Before I can discuss account specific information,
            I need to verify your identity.

            Can you please provide your full legal name?
            `
          },

          {
            id: 2,
            title: "Secondary Verification",
            question: "Which verification method is available?",
            choices: [
              "ZIP Code",
              "Last 4 Debit Card",
              "Last 4 Cash Card",
              "Recent P2P Transaction"
            ],
            actions: [
              "Collect secondary verification",
              "Validate information",
              "Document successful authentication"
            ],
            kas: [
              "KA-1003 Secondary Verification"
            ],
            qts: [
              "QT-1003 Verification Assistant"
            ],
            script: `
            Thank you.

            Please provide one additional verification item.
            `
          },

          {
            id: 3,
            title: "Pre Action Checklist",
            question: "Has the customer claimed an Account Takeover (ATO)?",
            choices: [
              "Yes",
              "No"
            ],
            actions: [
              "Review risk indicators",
              "Determine eligibility"
            ],
            kas: [
              "KA-1004 Account Recovery Review"
            ],
            qts: [
              "QT-1004 Risk Assessment"
            ],
            script: `
            Let me review your account status before proceeding.
            `
          },

          {
            id: 4,
            title: "Account Recovery",
            question: "Has the customer attempted Account Recovery?",
            choices: [
              "Yes",
              "No"
            ],
            actions: [
              "Check account recovery status",
              "Review previous attempts"
            ],
            kas: [
              "KA-1005 Account Recovery Process"
            ],
            qts: [
              "QT-1005 Account Recovery Assistant"
            ],
            script: `
            Let's confirm whether account recovery has already been attempted.
            `
          },

          {
            id: 5,
            title: "Resolution Assessment",
            question: "What resolution path is required?",
            choices: [
              "Grant Access",
              "Temporary Access",
              "Balance Transfer",
              "Reopen Account"
            ],
            actions: [
              "Determine best resolution path"
            ],
            kas: [
              "KA-1006 Resolution Assessment"
            ],
            qts: [
              "QT-1006 Resolution Selector"
            ],
            script: `
            Based on the information collected,
            let's determine the appropriate resolution.
            `
          },

          {
            id: 6,
            title: "Resolution Complete",
            question: "Workflow Complete",
            choices: [],
            actions: [
              "Resolution Successfully Identified"
            ],
            kas: [
              "KA-1099 Resolution Complete"
            ],
            qts: [
              "QT-1099 Workflow Completion"
            ],
            script: `
            Resolution path has been identified.
            Customer may now proceed with next steps.
            `
          }

        ]
      }
    }
  },

  "Banking": {

    scenario: "Missing Direct Deposit",

    subScenarios: {

      "Deposit Investigation": {

        title: "Banking → Missing Direct Deposit",

        steps: [

          {
            id: 1,
            title: "Direct Deposit Access",
            question: "Does the account have access to Direct Deposit?",
            choices: [
              "Yes",
              "No"
            ],
            actions: [
              "Verify Direct Deposit eligibility",
              "Review account status"
            ],
            kas: [
              "KA-2001 Direct Deposit Eligibility"
            ],
            qts: [
              "QT-2001 Deposit Lookup"
            ],
            script: `
            Let me verify your account's Direct Deposit capability.
            `
          },

          {
            id: 2,
            title: "Transaction Visibility",
            question: "Can the transaction be located?",
            choices: [
              "Pending",
              "Failed",
              "Not Found"
            ],
            actions: [
              "Review transaction history",
              "Check deposit visibility"
            ],
            kas: [
              "KA-2002 Missing Direct Deposit Investigation"
            ],
            qts: [
              "QT-2002 Regulator Transaction Search"
            ],
            script: `
            Let me check whether the expected deposit can be located.
            `
          },

          {
            id: 3,
            title: "Deposit Validation",
            question: "Has the deposit already been spent?",
            choices: [
              "Yes",
              "No"
            ],
            actions: [
              "Review balance history",
              "Validate spending activity"
            ],
            kas: [
              "KA-2003 Balance Confusion"
            ],
            qts: [
              "QT-2003 Deposit Activity Review"
            ],
            script: `
            I need to verify whether the deposit was received and used.
            `
          },

          {
            id: 4,
            title: "Deposit Type",
            question: "Is this a Tax Refund?",
            choices: [
              "Yes",
              "No"
            ],
            actions: [
              "Determine deposit type"
            ],
            kas: [
              "KA-2004 Tax Refund Deposits"
            ],
            qts: [
              "QT-2004 IRS Guidance"
            ],
            script: `
            Let's identify the deposit type.
            `
          },

          {
            id: 5,
            title: "Timeline Assessment",
            question: "Has it been more than 3 business days?",
            choices: [
              "Less Than 3",
              "More Than 3"
            ],
            actions: [
              "Determine ETA or Investigation Path"
            ],
            kas: [
              "KA-2005 Deposit Timeline Review"
            ],
            qts: [
              "QT-2005 ETA Calculator"
            ],
            script: `
            Timing is important in determining next steps.
            `
          },

          {
            id: 6,
            title: "Investigation Complete",
            question: "Workflow Complete",
            choices: [],
            actions: [
              "Provide ETA or Escalate Investigation"
            ],
            kas: [
              "KA-2099 Investigation Complete"
            ],
            qts: [
              "QT-2099 Deposit Escalation"
            ],
            script: `
            Investigation path identified.
            `
          }

        ]
      }

    }

  },

  "Payments": {

    scenario: "P2P Misdirected Payment",

    subScenarios: {

      "Payment Reversal": {

        title: "Payments → P2P Misdirected Payment",

        steps: [

          {
            id: 1,
            title: "Workflow Qualification",
            question: "Is this a True Misdirected Payment?",
            choices: [
              "Yes",
              "No"
            ],
            actions: [
              "Validate workflow applicability"
            ],
            kas: [
              "KA-3001 Misdirected Payment Overview"
            ],
            qts: [
              "QT-3001 Payment Validation"
            ],
            script: `
            Let's confirm this is a misdirected payment scenario.
            `
          },

          {
            id: 2,
            title: "Customer Role",
            question: "Who is contacting support?",
            choices: [
              "Sender",
              "Recipient"
            ],
            actions: [
              "Determine workflow branch"
            ],
            kas: [
              "KA-3002 Sender vs Recipient"
            ],
            qts: [
              "QT-3002 Role Assessment"
            ],
            script: `
            I need to determine which side of the transaction you're on.
            `
          },

          {
            id: 3,
            title: "Payment Status",
            question: "What is the payment status?",
            choices: [
              "Complete",
              "Pending"
            ],
            actions: [
              "Determine eligibility"
            ],
            kas: [
              "KA-3003 Payment Status Review"
            ],
            qts: [
              "QT-3003 Transaction Review"
            ],
            script: `
            Let's check the current status of the payment.
            `
          },

          {
            id: 4,
            title: "Wrong Recipient",
            question: "Was the payment sent to the wrong recipient?",
            choices: [
              "Yes",
              "No"
            ],
            actions: [
              "Review recipient details"
            ],
            kas: [
              "KA-3004 Wrong Recipient Process"
            ],
            qts: [
              "QT-3004 Recipient Validation"
            ],
            script: `
            Let's verify where the payment was sent.
            `
          },

          {
            id: 5,
            title: "Reversal Eligibility",
            question: "Is the payment eligible for reversal?",
            choices: [
              "Eligible",
              "Not Eligible"
            ],
            actions: [
              "Determine escalation path"
            ],
            kas: [
              "KA-3005 Reversal Eligibility"
            ],
            qts: [
              "QT-3005 Similarity Checker"
            ],
            script: `
            We will determine whether this payment qualifies for reversal.
            `
          },

          {
            id: 6,
            title: "Resolution Complete",
            question: "Workflow Complete",
            choices: [],
            actions: [
              "Escalate or Educate Customer"
            ],
            kas: [
              "KA-3099 Resolution Complete"
            ],
            qts: [
              "QT-3099 Escalation Assistant"
            ],
            script: `
            Resolution path identified.
            `
          }

        ]
      }

    }

  }

};
