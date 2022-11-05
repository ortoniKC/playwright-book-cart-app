const fs = require("fs");
fs.readFile("result.json", (err, data) => {
    if (err) throw Error(
        "File not found!"
    )
    const jsonData = JSON.parse(data);
    const suites = jsonData.suites;
    const suitesLen = suites.length;
    console.log(`No.of Suites: ${suitesLen}`);
    for (let topSuitesIndex = 0; topSuitesIndex < suitesLen; topSuitesIndex++) {
        const title = suites[topSuitesIndex].title;
        console.log("Test suite title: " + title);

        const innerSuites = suites[0].suites;
        const innerSuitesLen = innerSuites.length;
        // console.log(innerSuitesLen);
        // even though we have 1 here, may be it get changes based on config, so in precation adding loop
        for (let innerSuitesIndex = 0; innerSuitesIndex < innerSuitesLen; innerSuitesIndex++) {
            const specs = innerSuites[innerSuitesIndex].specs;
            const specsLen = specs.length;
            // console.log(specsLen);

            // loop through specs (Actual tests)
            for (let specsIndex = 0; specsIndex < specsLen; specsIndex++) {
                const spec = specs[specsIndex];
                const title = spec.title;
                console.log("Spec title (Test title): " + title);
                const testId = spec.id;
                const tests = spec.tests;
                for (let testsIndex = 0; testsIndex < tests.length; testsIndex++) {
                    const results = tests[testsIndex].results;
                    const resultlen = results.length;
                    for (let resultIndex = 0; resultIndex < resultlen; resultIndex++) {
                        const steps = results[resultIndex].steps;
                        const stepsLen = steps.length;
                        for (let stepIndex = 0; stepIndex < stepsLen; stepIndex++) {
                            console.log("Test step title and duration: " + steps[stepIndex].title, steps[stepIndex].duration);
                        }
                        // find attachment
                        const attachment = results[resultIndex].attachments;
                        const attachmentLen = attachment.length;
                        for (let attachIndex = 0; attachIndex < attachmentLen; attachIndex++) {
                            console.log("Attachment details: " + attachment[attachIndex].name, attachment[attachIndex].contentType, attachment[attachIndex].path);

                        }

                    }


                }
            }
        }



    }

});