import { DateTime, Duration } from 'luxon';
import config from '../config';
import axios from '../utils/axios';
import { IconCalendarStats, IconCalendarOff, IconCheck, IconBell, IconBellOff } from '@tabler/icons';

const f = {};

f.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

f.getBetProgress = (bet) => {
    

    
    //console.log('start: ' + start + '\n' + (new Date(start)).toString());
    //console.log('now: ' + now + '\n' + (new Date(now)).toString());
    //console.log('end: ' + end + '\n' + (new Date(end)).toString());

    //const later = DateTime.fromISO(date);
    //const i = Interval.fromDateTimes(later,now);

    
}

f.getStatus = (bet) => {
    const start = (new Date(bet._createdAt)).getTime();
    const now = Date.now();
    const end = (new Date(bet.timeLimit)).getTime();
    console.log(start,end);
    let progress = 0;

    if (end < now)
        progress = 100;
    else if (now < start)
        progress = 0;
    else
        progress = Math.floor( ((now - start) / (end - start)) * 100 );
    
    let icon,title,color,tag;

    if (bet.isAborted) {
        icon = IconCalendarStats;
        tag = 'aborted';
        title = 'Aborted';
        color = 'errorDark';
    } else if (bet.isFinished) {
        icon = IconCheck;
        tag = 'finished';
        title = 'Finished';
        color = 'infoDark';
    } else if (progress < 100) {
        icon = IconCalendarStats;
        tag = 'inProgress';
        title = 'In progress';
        color = 'successDark';
    } else {
        icon = IconCalendarOff;
        tag = 'ended';
        title = 'Ended';
        color = 'warningDark';
    }

    return { progress, icon, title, color, tag };
}

f.getTimeDifference = (start,end) => {
    start = (new Date(start)).getTime();
    end = (new Date(end)).getTime();

    return end - start;
}

f.timeAgoString = (time) => {
    const now = Date.now();
    
    const diffSec = f.getTimeDifference(now,time) / 1000;
    
    if (diffSec > -1)
        return 'Just now';
    else
        return '' + f.secondsToMHD(-diffSec) + ' ago';
}

f.timeLeftString = (time) => {
    const now = Date.now();

    const diffSec = f.getTimeDifference(time,now) / 1000;
    console.log('AAAA', diffSec,time,now);
    if (diffSec < 1)
        return '' + f.secondsToMHD(Math.abs(diffSec)) + ' left';
    else
        return '';
}

f.secondsToMHD = (seconds) => {
    var numyears = Math.floor(seconds / 31536000);
    var numdays = Math.floor((seconds % 31536000) / 86400); 
    var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    var numseconds = Math.floor((((seconds % 31536000) % 86400) % 3600) % 60);

    if (numyears != 0)
        return numyears + 'y';
    if (numdays != 0)
        return numdays + 'd';
    if (numhours != 0)
        return numhours + 'h';
    if (numminutes != 0)
        return numminutes + 'm';
    if (numseconds != 0)
        return numseconds + 's';


    return 'n/a';
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

f.capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

f.getCorrectAnswerStrings = (bet, maxCharacters) => {
    let correctAnswerStrings = [], moreAnswersString = '';

    if (bet.isFinished) {
        if (bet.betType == 'catalogue') {

            let i = 0, chars = 0,title;
            for (i = 0; i < bet.correctAnswerIds.length; i++) {
                title = bet.catalogue_answers[bet.correctAnswerIds[i]].title;
                correctAnswerStrings.push(title);

                chars += title.length;
                if (chars > maxCharacters)
                    break;
            }
            i++;

            if (bet.correctAnswerIds.length > i)
                moreAnswersString = 'and ' + (bet.correctAnswerIds.length - i) + ' more'
        } else if (bet.betType == 'scale') {
            correctAnswerStrings.push(bet.correctAnswerDecimal.$numberDecimal);
        }
    }

    return {correctAnswerStrings, moreAnswersString}
}


export default f;