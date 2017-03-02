export const deleteFollower = (delUser) => {
    return ({ type: 'deleteFollower', delUser: delUser});
}

export const addFollower = (username) => {
    if (username.value == null 
    || username.value == "") {
        return ({ type: 'addFollowerError'});
    }
    const newFollower = { "name": username.value, "_id":  Math.random() * 10000, 
    "status": "I'm a new follower.", "img":"figures/imgUserHead1.jpg"};
    username.value = "";

    
    return ({ type: 'addFollower', newFollower});
}