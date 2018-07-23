function updateUser(ID){
		console.log("id is " + ID)
    $.ajax({
        url: '/user/' + ID,
        type: 'PUT',
        data: $('#update-user').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
