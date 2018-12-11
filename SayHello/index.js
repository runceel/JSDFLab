function sleep10s() {
    return new Promise(resolve => setTimeout(resolve, 10 * 1000));
}

module.exports = async function (context, name) {
    await sleep10s();
    return `Hello ${name}`;
};