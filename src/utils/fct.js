import { DateTime } from 'luxon';
import config from '../config';
import axios from '../utils/axios';

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

f.addUsernamesToArray = async (arr) => {
    const uniqueUserIds = [...new Set(arr.map((tip) => tip.userId))];
    const responseUsers = (await axios.get(config.apiHost + '/v1/users/', {params: { id: uniqueUserIds, limit: 10 }})).data.results;
    let usr;
    for (let a of arr) {
        usr = responseUsers.find(u => a.userId = u.id);
        a.username = usr ? usr.username : 'n/a';
    }
    return arr
}

export default f;