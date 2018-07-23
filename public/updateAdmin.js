function updateAdmin(ID){
    $.ajax({
        url: '/admin/' + ID,
        type: 'PUT',
        data: $('#update-admin').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
