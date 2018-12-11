const df = require('durable-functions');
module.exports = df.orchestrator(function* (context) {
    context.df.setCustomStatus({ message: 'OrchestrationFunction started'});
    const output = [];
    output.push(yield context.df.callActivity('SayHello', context.df.getInput().first));
    context.df.setCustomStatus({ message: 'first activity is completed'});
    output.push(yield context.df.callActivity('SayHello', context.df.getInput().second));
    context.df.setCustomStatus({ message: 'second activity is completed'});
    output.push(yield context.df.callActivity('SayHello', context.df.getInput().third));
    context.df.setCustomStatus({ message: `third activity is completed, waiting accept event: ${JSON.stringify(output)}`});
    const accept = context.df.waitForExternalEvent('accept');
    const reject = context.df.waitForExternalEvent('reject');

    const event = yield context.df.Task.any([accept, reject]);
    if (event === accept) {
        return output;
    } else {
        return [];
    }
});