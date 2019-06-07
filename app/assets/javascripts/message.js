$(function(){
  function buildHTML(message){
    var image_url = (message.image)? `<image class="lower-message_image" src="${message.image}">`:"";
    var html = `<div class="message" id='${message.id}'>
                  <div class="upper-message" >
                    <div class="upper-message__user-name">
                    ${message.name}
                    </div>
                    <div class="upper-message__date">
                    ${message.date}
                  </div>
                </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                      ${image_url}
                  </div>`
    return html;
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
        $('.message').append(html)
        $( ".form__submit").prop( "disabled", false );

        $('.messages').animate({ scrollTop: $(".messages")[0].scrollHeight }, "fast");

        $('.form__message').val('')
    })
    
    .fail(function(){
      alert('error');
    })
  })
});
