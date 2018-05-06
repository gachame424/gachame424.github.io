var url_spulse = 'https://www.s-pulse.co.jp/games/result/';

$.get(url_spulse, {cache: false}, function (data) {
    var spulse = '清水エスパルス';
    var text = $(data.responseText).text();

    // 大会名取得
    var game_name = text.match(/<p class="matchboard__title">([\s\S]*?)<\/p>/)[1];
    var separator_game_name = game_name.split(/\s/);
    $('.spulse_result .game_name1').text(separator_game_name[0]);
    $('.spulse_result .game_name2').text(separator_game_name[1]);
    $('.spulse_result .game_stadium').text(separator_game_name[6]);

    // チーム名取得
    var match_team_name = text.match(/<p class="name">([\s\S]*?)<\/p>/g);
    for(var i in match_team_name){
        var team_name = match_team_name[i].match(/<p class="name">([\s\S]*?)<\/p>/)[1];
        if(team_name != spulse) $('.spulse_result .rival').text(team_name);
    }

    // スコア取得
    // spulse
    var spulse_score = text.match(/<p class="matchboard__score matchboard__text--home u-text-en">([\s\S]*?)<\/p>/)[1];
    $('.spulse_result .score').text(spulse_score);
    // rival
    var rival_score = text.match(/<p class="matchboard__score matchborad__text--away u-text-en">([\s\S]*?)<\/p>/)[1];
    $(".spulse_result .rival_score").text(rival_score);
});

var url_giants = 'http://www.giants.jp/G/realtime/ScoreBook.html';

$.get(url_giants, {cache: false}, function (data) {
    var giants = '巨 人';
    var text = $(data.responseText).text();

    // 大会名取得
    var game_name = text.match(/<h2>([\s\S]*?)<\/h2>/)[1];
    var date = game_name.split(/\s/)[0];
    var stadium = game_name.split(/・/)[1];
    $('.giants_result .game_name1').text(date);
    $('.giants_result .game_stadium').text(stadium);

    // チーム名取得
    var match_team_name = text.match(/<th class="team" scope="row">([\s\S]*?)<\/th>/g);
    var home_f = true;
    for(var i in match_team_name){
        var team_name = match_team_name[i].match(/<th class="team" scope="row">([\s\S]*?)<\/th>/)[1];
        if(team_name != giants)
        {
            if(i == 0) home_f = false;
            $('.giants_result .rival').text(team_name);
        }
    }

    // スコア取得
    var match_score = text.match(/<p class="score">([\s\S]*?)<\/p>/)[1];
    match_score = match_score.match(/.+\s((.{1,2}-.{1,2})*?)\s.+/)[1];
    var separator_match_score = match_score.split(/-/);
    var home_score = separator_match_score[0];
    var visitor_score = separator_match_score[1];
    if(home_f)
    {
        // giantsがホーム
        $('.giants_result .score').text(home_score);
        $(".giants_result .rival_score").text(visitor_score);
    }
    else
    {
        // giantsがビジター
        $('.giants_result .score').text(visitor_score);
        $(".giants_result .rival_score").text(home_score);
    }
});