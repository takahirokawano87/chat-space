json.new_message @new_message.each do |message|
  json.name message.user.name
  json.created_at message.created_at.strftime("%Y年%-m月%-d日 %-H時%-M分%-S秒")
  json.content message.content
  json.image message.image.url
  json.id message.id
end

# if @new_message.present? # @new_messageに中身があれば
#   json.array! @new_message  # 配列かつjson形式で@new_messageを返す
# end
