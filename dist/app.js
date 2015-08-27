var Slack, jsonHttp, os, productsList, productsObject, productsUrl, slack, webhookUri;

Slack = require('slack-node');

os = require('os');

jsonHttp = require('json-http');

webhookUri = 'https://hooks.slack.com/services/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';

slack = new Slack;

slack.setWebhook(webhookUri);

productsUrl = 'http://www.kimonolabs.com/api/92bh1m08?apikey=K62btvEgWDCF5tcbDcSTgoT4Bu0FIJCX';

jsonHttp.getJson(productsUrl, function(err, response) {
  var productsArray;
  if (err !== "null") {
    productsArray = response["results"]["products"];
    return productsList(productsArray);
  } else {
    return console.log("Houston we have an error: " + err);
  }
});

productsList = function(productsArray) {
  var attachments;
  productsArray = productsArray.slice(0, 4);
  attachments = [];
  productsArray.forEach(function(product) {
    var pDescription, pName, pNumber, pUrl, pVotes;
    pNumber = product["index"];
    pName = product["name"].text;
    pUrl = product["name"].href;
    pDescription = product["description"];
    pVotes = product["votes"].text;
    return attachments.push({
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
      ]
    });
  });
  return slack.webhook(productsObject(attachments), function(err, response) {
    return console.log('Listo brotha ☕');
  });
};

productsObject = function(attachments) {
  return {
    channel: '#home',
    username: '@jorge',
    attachments: attachments
  };
};


