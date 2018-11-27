$(function(){
  var search_list = $("#user-search-result");
  var member_list = $("#chat_member");

  function appendProduct(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
  }

  function appendNoProduct(user) {
    var html = `<li>
                  <div class="chat-group-user clearfix">一致するメンバーはいません</div>
                </li>`
    search_list.append(html);
  }

  function appendMember(name, user_id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    member_list.append(html);
  }


  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();

    $.ajax({
      url: '/users',
      type: 'GET',
      data: {keyword: input},
      dataType: 'json',
    })

    .done(function(users){
      $("#user-search-result").empty();
      if(users.length !== 0){
        users.forEach(function(user){
          appendProduct(user);
        });
      }
      else{
        appendNoProduct("一致するメンバーがいません");
      }
    })
    .fail(function(){
      alert("メンバー検索に失敗しました");
    })
  });

  $(document).on("click", ".user-search-add", function(){
    $(this).parent().remove();
    var name = $(this).data('user-name');
    var user_id = $(this).data('user-id');
    appendMember(name, user_id)
  })
  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  })
});

