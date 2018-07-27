function deleteAward(id){
    $.ajax({
        url: '/user-awards/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
