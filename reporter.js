const reporter = require('cucumber-html-reporter')

const options = {
    theme: 'bootstrap',
    jsonDir: 'cypress/reports',
    output: 'cypress/reports/index.html',
    reportSuiteAsScenarios: true,
    ignoreBadJsonFile: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        "App Name":"Demo Automation",
        "Test Environment": "STAGING",
        "Browser": "Electron",
        "Platform": "Windows 10",
        "Executed": "Remote"
    }
}

reporter.generate(options)