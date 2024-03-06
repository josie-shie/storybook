const calculateDelayUntilTargetTime = () => {
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const utcSeconds = now.getUTCSeconds();
    const utcMilliseconds = now.getUTCMilliseconds();
    const currentUTCMilliseconds =
        (utcHours * 3600 + utcMinutes * 60 + utcSeconds) * 1000 + utcMilliseconds;
    const targetUTCMilliseconds = 4 * 3600 * 1000;

    let delay;
    if (currentUTCMilliseconds > targetUTCMilliseconds) {
        delay = 24 * 3600 * 1000 - currentUTCMilliseconds + targetUTCMilliseconds;
    } else {
        delay = targetUTCMilliseconds - currentUTCMilliseconds;
    }

    return delay;
};

const startScheduledTask = () => {
    const delay = calculateDelayUntilTargetTime();

    setTimeout(() => {
        postMessage('updateMatchData');
        startScheduledTask();
    }, delay);
};

onmessage = e => {
    if (e.data === 'setMatchWorker') {
        startScheduledTask();
    }
};
