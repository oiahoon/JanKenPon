ActiveModelSerializers.config.adapter = :json
api_mime_types = %W(
  application/json
  application/vnd.api+json
  text/x-json
)
Mime::Type.register 'application/json', :json, api_mime_types