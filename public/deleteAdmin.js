function deleteAdmin(ID){
    $.ajax({
        url: '/admin/' + ID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
