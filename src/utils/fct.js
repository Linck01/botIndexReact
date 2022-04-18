import { DateTime, Duration } from 'luxon';
import config from '../config';
import axios from '../utils/axios';


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

f.paginate = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}



f.hasBetEnded = (bet) => {
    const now = Date.now();
    const end = (new Date(bet.timeLimit)).getTime();
    let isEnded = now < end ? false : true;

    return isEnded;
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

    return '0s';
}


f.formatDateTime = (isoString) => {
    const dt = DateTime.fromISO(isoString);
    return dt.toLocaleString(DateTime.DATETIME_MED);
}

/*f.addUsernamesToArray = async (arr) => {
    const uniqueUserIds = [...new Set(arr.map((tip) => tip.userId))];
    const responseUsers = (await axios.get(config.apiHost + '/v1/users/', {params: { id: uniqueUserIds, limit: 10 }})).data.results;
    
    let usr;
    const newArray = [];
    for (let a of arr) {
        console.log('a',a);     
        usr = responseUsers.find(u => a.userId ==y u.id);
        console.log('user',usr);
        newArray.push({...a, username: usr ? usr.username : 'n/a'});
    }
    console.log(newArray);
    return newArray;
}*/

f.addUsernamesToArray = async (arr) => {
    const uniqueUserIds = [...new Set(arr.map((tip) => tip.userId))];
    const responseUsers = (await axios.get(config.apiHost + '/v1/users/', {params: { id: uniqueUserIds, limit: 10 }})).data.results;
    let usr;
    for (let a of arr) {
        usr = responseUsers.find(u => a.userId == u.id);
        a.username = usr ? usr.username : 'n/a';
    }
    return arr
}

f.capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

f.getCorrectAnswerStrings = (bet, maxCharacters) => {
    let correctAnswerStrings = [], moreAnswersString = '';

    if (bet.isSolved) {
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