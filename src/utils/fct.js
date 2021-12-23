import { DateTime } from 'luxon';

const f = {};

f.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

f.getBetProgress = (createdAt, timeLimit) => {
    const start = (new Date(createdAt)).getTime();
    const now = Date.now();
    const end = (new Date(timeLimit)).getTime();

    
    //console.log('start: ' + start + '\n' + (new Date(start)).toString());
    //console.log('now: ' + now + '\n' + (new Date(now)).toString());
    //console.log('end: ' + end + '\n' + (new Date(end)).toString());

    //const later = DateTime.fromISO(date);
    //const i = Interval.fromDateTimes(later,now);

    let progress = 0;

    if (end < now)
        progress = 100;
    else if (now < start)
        progress = 0;
    else
        progress = Math.floor( ((now - start) / (end - start)) * 100 );
        

    return progress;
}

f.formatDateTime = (isoString) => {
    const dt = DateTime.fromISO(isoString);
    return dt.toLocaleString(DateTime.DATETIME_MED);
}

export default f;