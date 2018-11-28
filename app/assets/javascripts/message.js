$(document).on('turbolinks:load', function() {
  $(function(){


    function buildHTML(message){
      var image = message.image ? `<img src="${message.image}">` : "";
      var html = `<div class="chat_main_body_message">
                    <div class="chat_main_body_message clearfix" data_id="">
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



    function buildMESSAGE(message){
      console.log(message)
      var image = message.image ? `<img src="${message.image}">` : "";
      var html = `<div class="chat_main_body_message" data-message-id="${message.id}">
                    <div class="chat_main_body_message clearfix" data_id="">
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




var interval = setInterval(function(){
        if(window.location.href.match(/\/groups\/\d+\/messages/)){
      $.ajax({
        url: location.href,
        dataType: 'json'
      })
      .done(function(json){
        var id = $('.chat_main_body_message:last').data('messageId');
        var insertHTML = '';
        json.messages.forEach(function(message){
          if(message.id > id){
            insertHTML += buildMESSAGE(message);
          }
        });
        $('.chat_main_body').append(insertHTML);
      })
      .fail(function(json){
        alart('自動更新に失敗しました');
      });
    } else{
      clearInterval(interval);
    }}, 5000);




    function scroll() {
      $('.chat_main_body').animate({scrollTop: $('.chat_main_body')[0].scrollHeight});
    }



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
        $('.form__message').val('')
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
})
