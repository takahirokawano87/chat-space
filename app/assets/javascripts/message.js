$(function(){
  function buildHTML(message){
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
                    <img src="${message.image}">
                  </div>
                </div>
              </div>`
    return html;
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
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $(".form__submit").removeAttr("disabled");
    })
  })
});
