json.messages @messages.each do |message|
  json.name message.user.name
  json.date message.created_at
  json.content message.content
  json.image message.image.url
  json.id message.id
end
