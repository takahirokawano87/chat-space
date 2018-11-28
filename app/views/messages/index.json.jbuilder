json.new_message @new_message.each do |message|
  json.name message.user.name
  json.date message.created_at
  json.content message.content
  json.image message.image.url
  json.id message.id
end

# if @new_message.present? # @new_messageに中身があれば
#   json.array! @new_message  # 配列かつjson形式で@new_messageを返す
# end
