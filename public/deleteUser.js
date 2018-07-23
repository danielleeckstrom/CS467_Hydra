function deleteUser(ID){
    $.ajax({
        url: '/user/' + ID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
