const workflowLibrary = {

"Account Access": {

scenario: "Unable To Access Account",

subScenarios: {

"Account Recovery": {

title: "Account Access → Account Recovery",

steps: [

{
title: "Verification",
question: "Can the customer provide their Full Legal Name?",
choices: ["Yes","No"],

actions:[
"Verify customer identity",
"Review account profile",
"Validate legal name"
],

kas:[
"KA-1001 Identity Verification Standards",
"KA-1002 Voice Authentication Guide"
],

qts:[
"QT-1001 Authentication Tool",
"QT-1002 Customer Lookup"
],

script: `
Thank you for contacting Cash App Support.

Before we proceed, I need to verify your identity.

Can you please provide your full legal name?
`
},

{
title: "Verification",
question: "Which secondary authentication is available?",

choices:[
"ZIP Code",
"Last 4 Debit Card",
"Last 4 Cash Card",
"Recent P2P Payment"
],

actions:[
"Complete secondary verification",
"Confirm ownership of account"
],

kas:[
"KA-1003 Secondary Authentication"
],

qts:[
"QT-1003 Verification Assistant"
],

script: `
Thank you.

For security purposes, please provide one additional verification item.
`
},

{
title: "Investigation",
question: "Has customer attempted Account Recovery?",

choices:[
"Yes",
"No"
],

actions:[
"Review recovery attempts",
"Validate recovery eligibility"
],

kas:[
"KA-1004 Account Recovery Process"
],

qts:[
"QT-1004 Account Recovery Tool"
],

script: `
Thank you for verifying your account.

Let me review the recovery options available.
`
},

{
title: "Investigation",
question: "Is customer able to access registered email or phone?",

choices:[
"Email",
"Phone",
"Neither"
],

actions:[
"Review recovery channel",
"Determine access path"
],

kas:[
"KA-1005 Recovery Channel Assessment"
],

qts:[
"QT-1005 Recovery Eligibility"
],

script: `I need to determine which recovery channel is available to you.`
},

{
title: "Resolution",
question: "What resolution path should be used?",

choices:[
"Grant Access",
"Temporary Access",
"Balance Transfer",
"Reopen Account"
],

actions:[
"Determine final resolution",
"Review account status"
],

kas:[
"KA-1006 Resolution Decision Matrix"
],

qts:[
"QT-1006 Resolution Selector"
],

script: `Based on my review, I have identified the most appropriate resolution path.`
},

{
title: "Call Closure",
question: "Resolution successfully identified.",

choices:[],

actions:[
"Provide next steps",
"Document interaction",
"Close workflow"
],

kas:[
"KA-1099 Case Closure"
],

qts:[
"QT-1099 Workflow Completion"
],

script: `
That completes the actions available for this case today.

Is there anything else I can assist you with?
`
}

]

}

}

},
"Banking": {

scenario:"Missing Direct Deposit",

subScenarios:{

"Deposit Investigation":{

title:"Banking → Missing Direct Deposit",

steps:[

{
title:"Verification",
question:"Can customer pass identity verification?",
choices:[
"Verified"
],

actions:[
"Verify identity"
],

kas:[
"KA-2001 Identity Verification"
],

qts:[
"QT-2001 Authentication Tool"
],

script:`Before we review the deposit, I need to verify your identity.`
},

{
title:"Investigation",
question:"Can the deposit be located?",

choices:[
"Pending",
"Failed",
"Not Found"
],

actions:[
"Search deposit history",
"Review transaction records"
],

kas:[
"KA-2002 Deposit Investigation"
],

qts:[
"QT-2002 Deposit Lookup"
],

script:`Let me investigate the deposit status.`
},

{
title:"Investigation",
question:"Has it been more than 3 business days?",

choices:[
"Yes",
"No"
],

actions:[
"Review deposit timeline"
],

kas:[
"KA-2003 Deposit Timeline"
],

qts:[
"QT-2003 Timeline Calculator"
],

script:`I need to determine how long the deposit has been outstanding.`
},

{
title:"Resolution",
question:"What resolution should be provided?",

choices:[
"ETA Education",
"Deposit Trace",
"Employer Verification"
],

actions:[
"Determine next steps"
],

kas:[
"KA-2004 Deposit Resolution"
],

qts:[
"QT-2004 Deposit Trace Tool"
],

script:`Based on my investigation, I have identified the next step.`
},

{
title:"Call Closure",
question:"Investigation complete.",

choices:[],

actions:[
"Provide next steps",
"Close interaction"
],

kas:[
"KA-2099 Closure"
],

qts:[
"QT-2099 Completion"
],

script:`Your case has been reviewed and guidance has been provided.`
}

]

}

}

},
"Payments": {

scenario:"P2P Misdirected Payment",

subScenarios:{

"Payment Reversal":{

title:"Payments → P2P Misdirected Payment",

steps:[

{
title:"Verification",
question:"Can customer pass identity verification?",

choices:[
"Verified"
],

actions:[
"Authenticate customer"
],

kas:[
"KA-3001 Authentication"
],

qts:[
"QT-3001 Customer Lookup"
],

script:`Before reviewing the payment, I need to verify your identity.`
},

{
title:"Investigation",
question:"Who is contacting support?",

choices:[
"Sender",
"Recipient"
],

actions:[
"Determine workflow path"
],

kas:[
"KA-3002 Sender Recipient Assessment"
],

qts:[
"QT-3002 Transaction Review"
],

script:`I need to understand your relationship to the payment.`
},

{
title:"Investigation",
question:"Was the payment sent to the wrong recipient?",

choices:[
"Yes",
"No"
],

actions:[
"Review payment destination"
],

kas:[
"KA-3003 Wrong Recipient Process"
],

qts:[
"QT-3003 Recipient Validation"
],

script:`Let me review the payment details.`
},

{
title:"Resolution",
question:"Is payment eligible for reversal?",

choices:[
"Eligible",
"Not Eligible"
],

actions:[
"Determine resolution path"
],

kas:[
"KA-3004 Reversal Eligibility"
],

qts:[
"QT-3004 Reversal Tool"
],

script:`Based on my review, I can determine whether a reversal is possible.`
},

{
title:"Call Closure",
question:"Workflow complete.",

choices:[],

actions:[
"Provide guidance",
"Close interaction"
],

kas:[
"KA-3099 Closure"
],

qts:[
"QT-3099 Completion"
],

script:`That completes the review of this payment concern.`
}

]

}

}

}

};
