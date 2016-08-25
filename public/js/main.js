function like(song_id, user_id) {
    var url_like = "/songs/like/" + song_id + "/" + user_id;
    $.ajax({
        url: url_like,
        type: "POST",
        success: function(result) {}
    });
    var btn = "#btn_" + song_id;
    $(btn).removeClass("btn-primary");
    $(btn).addClass("medium green");
    $(btn).html("Liked");
};