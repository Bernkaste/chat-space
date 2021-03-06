$(function() {
  function buildHTML(message){
    var image_url = (message.image)? `<image class="lower-message_image" src="${message.image}">`:"";
    var html = `<div class="message" id='${message.id}'>
                  <div class="upper-message" >
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                      ${image_url}
                  </div>
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
        $('.message').append(html);
        $('.new_message')[0].reset();
        $( ".form__submit").prop( "disabled", false );

        $('.messages').animate({ scrollTop: $(".messages")[0].scrollHeight }, "fast");
    })
    
    .fail(function(){
      alert('error');
    })
  })
});
