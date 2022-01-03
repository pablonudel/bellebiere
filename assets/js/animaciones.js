function animCantAdd() {
    $(() => {
        $('#cant').css({
            top: '-2.5rem',
            opacity: 0
        }).animate({
            top: 0,
            opacity: 1
        }, 300)
    })
}

function animCantRem(prev, act) {
    $(() => {
        $('#cant').text(prev)
        $('#cant').animate({
            top: '-2.5rem',
            opacity: 0
        }, 300, function () {
            $('#cant').text(act)
            $('#cant').css({
                top: 0,
                opacity: 0
            })
        }).animate({
            opacity: 1
        }, 500)
    })
}

function animCantDel() {
    $(() => {
        $('#cant').animate({
            opacity: 0
        }, 500)
    })
}