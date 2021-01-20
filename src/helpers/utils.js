export function formatDate(date = ''){
    return date.slice(0, 10);
}

export function shortStr(str = '', length=0){
    if(str.length > 100){
        return str.slice(0, length) + '...';
    }
    else{
        return str;
    }
}