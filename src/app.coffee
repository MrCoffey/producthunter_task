Slack = require('slack-node')
os = require('os')
jsonHttp = require('json-http')

#Slack stuff
webhookUri = 'URL'
slack = new Slack
slack.setWebhook webhookUri

#Kimono uri
productsUrl = 'URL'

#Get products from kimono
jsonHttp.getJson productsUrl, (err, response) ->
  if err isnt "null"
    productsArray = response["results"]["products"] #Return an array with all the products
    productsList(productsArray)
  else
    console.log "Houston we have an error: " + err

#Parse the array which contains the products
productsList = (productsArray) ->
  productsArray = productsArray.slice(0,4)
  attachments = []
  productsArray.forEach (product)->
    pNumber = product["index"]
    pName = product["name"].text
    pUrl = product["name"].href
    pDescription = product["description"]
    pVotes = product["votes"].text
    attachments.push({
          "fallback": "Featured product",
          "title": pName,
          "title_link": pUrl,
          "text": pDescription,
          "color": "#7CD197",
          "fields": [
               {
                   "title": pVotes,
                   "short": true
               }
           ],
        })

  #Send attachament object to the slack room
  slack.webhook productsObject(attachments), (err, response) ->
      console.log 'Listo brotha ☕'

#Return the string that will be prompted into the slack room
productsObject = (attachments) ->
  {
    channel: '#home',
    username: '@jorge',
    attachments: attachments
  }
