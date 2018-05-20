function queryObj(){
    return window.location.search.substr(1).split('&').reduce((acc, s)=>{
        s = s.split('=').map((s)=>{ return window.decodeURIComponent(s) });
        acc[s[0]] = s[1];
        return acc;
    }, {});
}
