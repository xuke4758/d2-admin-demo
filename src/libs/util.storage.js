const storage = {}

storage.set = (key, info) =>{
    if(key == 'token'){
        window.localStorage.setItem(key, info);
    }else{
        window.localStorage.setItem(key,JSON.stringify(info));
    }
}

storage.get = (name) =>{
    if(name && window.localStorage.getItem(name)){
        let val = window.localStorage.getItem(name)
        if(name=='token'){
            return val
        }else{
            return val ? JSON.parse(val) : ''
        }
       
    }
    return ''
}
storage.remove = (name) =>{
	window.localStorage.removeItem(name);
}

export default storage