function like(song_id, user_id, like_count) {
    var url_like = "/songs/like/" + song_id + "/" + user_id;
    $.ajax({
        url: url_like,
        type: "POST",
        success: function(result) {}
    });
    var btn = "#btn_" + song_id;
    $(btn).removeClass("btn-primary");
    $(btn).addClass("medium green");
    $(btn).html("You and " + like_count + " others liked this.");
};

function like_no_count(song_id, user_id) {
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