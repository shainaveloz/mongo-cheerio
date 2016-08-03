$('#c-entry-box__title').on('click', function(){
    var value = $(this).attr('href');
    console.log(value);
});

//$('#c-entry-box_image').on('click','img',function(){
//    var imgsrc=$(this).attr('src');
//    $("html").append("<div id='image_popup'><img src='"+imgsrc+"'></div>");
//});

$('#submit').on('click', function(){
  $.ajax({
      type: "POST",
      url: '/submit',
      dataType: 'json',
      data: {
        title: $('#Title').val(),
        link: $('#Link').val(),
        created: Date.now()
      }
   });
  .done(function(data){
      console.log(data);
      getReload();
      $('#Title').val("");
      $('#Link').val("");
  }
  );
  return false;
});

