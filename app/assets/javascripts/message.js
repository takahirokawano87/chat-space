// $(document).on('turbolinks:load', function() {
  $(function(){
    // メッセージ投稿非同期通信化時のHTML
    function buildHTML(message){
      var image = message.image ? `<img src="${message.image}">` : "";
      var html = `<div class="chat_main_body_message">
                    <div class="chat_main_body_message clearfix" data-message-id="${message.id}">
                      <div class="chat_main_body_message_name">
                        ${message.name}
                      </div>
                      <div class="chat_main_body_message_time">
                        ${message.created_at}
                      </div>
                      <div class="chat_main_body_message_body">
                        <p class="lower-message__content">
                          ${message.content}
                        </p>
                        ${image}
                      </div>
                    </div>
                  </div>`;
      return html
    }
    // メッセージ自動更新時のHTML
    function buildMessage(message){
      var image = message.image ? `<img src="${message.image}">` : "";
      var html = `<div class="chat_main_body_message">
                    <div class="chat_main_body_message clearfix" data-message-id="${message.id}">
                      <div class="chat_main_body_message_name">
                        ${message.name}
                      </div>
                      <div class="chat_main_body_message_time">
                        ${message.date}
                      </div>
                      <div class="chat_main_body_message_body">
                        <p class="lower-message__content">
                          ${message.content}
                        </p>
                        ${image}
                      </div>
                    </div>
                  </div>`;
      return html
    }
    // メッセージ自動更新の挙動
    var interval = setInterval(function(){
      var message_id = $('.chat_main_body_message:last').data('messageId');
      console.log(message_id)
      if(window.location.href.match(/\/groups\/\d+\/messages/)){
        $.ajax({
          url: location.href,
          type: 'GET',
          data: {message: {id: message_id}},
          dataType: 'json'
        })
        .done(function(json){
          console.log(json)
          var insertHTML = '';
          json.new_message.forEach(function(message){
            insertHTML += buildMessage(message);
          });
          $('.chat_main_body').append(insertHTML);
        })
        .fail(function(json){
          alert('自動更新に失敗しました');
        });
      }
      else{
        clearInterval(interval);
      }
    }, 5000);
    // メッセージ投稿後、最新メッセージへのスクロール
    function scroll(){
      $('.chat_main_body').animate({scrollTop: $('.chat_main_body')[0].scrollHeight});
    }
    // メッセージ投稿非同期通信化の挙動
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
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
        $('.chat_main_body').append(html)
        $("form")[0].reset();
        $('#message_image').val('')
        scroll()
      })
      .fail(function(){
        alert('error');
      })
      .always(function(){
        $(".form__submit").removeAttr("disabled");
      })
    })
  });
// })
