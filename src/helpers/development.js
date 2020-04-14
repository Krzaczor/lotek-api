export default () => {
    const development = process.argv.find(arg => /^development=(true|false)$/.test(arg));

    if (development !== undefined) {
        if (development.split('=')[1] === 'true') {
            return true;
        }
    }

    return false;
}
