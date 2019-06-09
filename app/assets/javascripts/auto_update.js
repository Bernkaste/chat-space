$(function() {
  function buildHTML(message){
    var image_url = (message.image)? `<image class="lower-message_image" src="${message.image}">`:"";
    var html =
              `<div class='message' data-id="${message.id}">
                  <div class='upper-message'>
                    <div class='upper-message__user-name'>
                      ${message.user_name}
                    </div>
                    <div class='upper-message__date'>
                      ${message.created_at}
                    </div>
                  </div>
                  <div class='lower-message'>
                    <p class='lower-message__content'>
                      ${message.content}
                    </p>
                      ${image_url}
                  </div>   
                </div>`
      return html;
    }

  function autoUpdate(){
      var message_id = $('.message:last').data('id');

    $.ajax({
      url: "./api/messages",
      type: 'GET',
      data: {id: message_id},
      dataType: 'json'
    })
    .done(function(data) {
      var insertHTML = '';
      data.forEach(function(message) {
          if (message.id > message_id) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        }
      });
    })
    .fail(function(data){
      alert('自動更新に失敗しました。')
    })
  }

  var interval = setInterval(function(){
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        autoUpdate();
      } else {
        clearInterval(interval);
      }
    }, 5000)
});
