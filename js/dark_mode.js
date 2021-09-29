const BLACK = 'black';
const WHITE = 'white';

function darkMode(is_black) {
    let profile_button = document.getElementById('profile_button');
    profile_button.value = 'true';
    let before_color = BLACK;
    let after_color = WHITE;
    if (is_black === 'true') {
        before_color = WHITE;
        after_color = BLACK;
        profile_button.value = 'false';
    }
    changeBody(before_color, after_color);
    changeJob(after_color, before_color);
    changeOverlay(after_color, before_color);
    changeFooter(before_color, after_color);
}

function changeBody(before_color, after_color) {
    let body = document.getElementById('body');
    body.classList.remove('body_' + before_color);
    body.classList.add('body_' + after_color);
}

function changeJob(before_color, after_color) {
    let profile_job = document.getElementById('profile_job');
    profile_job.classList.remove('color_' + before_color);
    profile_job.classList.add('color_' + after_color);
}

function changeOverlay(before_color, after_color) {
    let overlay = document.getElementById('overlay');
    overlay.classList.remove('background_' + before_color);
    overlay.classList.add('background_' + after_color);
}

function changeFooter(before_color, after_color) {
    let footer_color = document.getElementById('footer');
    footer_color.classList.remove('footer_' + before_color);
    footer_color.classList.add('footer_' + after_color);
}