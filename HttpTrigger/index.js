const df = require('durable-functions');
module.exports = async function (context, req) {
    const client = df.getClient(context);
    const instanceId = await client.startNew("OrchestrationFunction", undefined, req.body);
    return client.createCheckStatusResponse(req, instanceId);
};
