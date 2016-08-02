$('#c-entry-box__title').on('click', function(){
    var value = $(this).attr('href');
    console.log(value);
});

$('#c-entry-box_image').on('click','img',function(){
    var imgsrc=$(this).attr('src');
    $("html").append("<div id='image_popup'><img src='"+imgsrc+"'></div>");
});