/**
 * Created by Mori on 2015/11/30.
 */
$(function(){
    $('.moveUser').on('click',function(e){
        var target = $(e.target);
        var id = target.attr('data-id');
        var tr = $('.item-id-' + id);
        console.log(tr);
        $.ajax({
            type: "DELETE",
            url: '/admin/moveUser?id=' + id
        }).done(function(results){
            if(results.success === 1){
                if(tr.length > 0){
                    tr.remove();
                }
            }
        });
    });
});