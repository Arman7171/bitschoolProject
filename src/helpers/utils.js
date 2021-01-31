export function formatDate(date = ''){
    return date.slice(0, 10);
}

export function shortStr(str = '', length){
    if(str.length > 50){
        return str.slice(0, length) + '...';
    }
    else{
        return str;
    }
}