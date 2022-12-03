// interface String {
//     trimText(leaveWordsCount: number, addDots: boolean): string;
// }
//
// String.prototype.trimText = function(leaveWordsCount: number, addDots: boolean = true) {
//     let result = this.split(' ').slice(0, 5).join(' ');
//
//     if(addDots)
//         return result + ' ...';
//
//     return result;
// };

export function trimText(text: string, leaveWordsCount: number, addDots: boolean = true) {
    let result = text.split(' ').slice(0, 5).join(' ');

    if (addDots)
        return result + ' ...';

    return result;
}


