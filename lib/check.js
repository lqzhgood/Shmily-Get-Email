const { myKeyWords, herKeyWords, otherWhileKeyWords } = require('../config');
const { matchStrByArr } = require('../utils/index');

function checkRes1AndRes2DateSame(res1, res2) {
    // Date
    if (res1.date && res2.date) {
        if (new Date(res1.date).getTime() !== new Date(res2.date).getTime()) {
            throw new Error('Time not same');
        }

    }
}


function checkDirection(header, res1, res2) {
    const { direction, sender, senderName, receiver, receiverName } = header;
    if (direction == 'go') {
        const notHave_sender = !matchStrByArr(sender, myKeyWords);
        const notHave_receiver = !matchStrByArr(receiver, herKeyWords);
        if (notHave_sender || notHave_receiver) {
            if (matchStrByArr(sender, otherWhileKeyWords) || matchStrByArr(receiver, otherWhileKeyWords)) return;
            console.warn('checkDirection error', header, res1, res2);
            throw new Error('checkDirection error');
        }
    }

    if (direction == 'come') {
        const notHave_sender = !matchStrByArr(sender, herKeyWords);
        const notHave_receiver = !matchStrByArr(receiver, myKeyWords);
        if (notHave_sender || notHave_receiver) {
            if (matchStrByArr(sender, otherWhileKeyWords) || matchStrByArr(receiver, otherWhileKeyWords)) return;

            console.warn('checkDirection error', header, res1, res2);
            throw new Error('checkDirection error');
        }
    }



}


module.exports = {
    checkRes1AndRes2DateSame,
    checkDirection,
};