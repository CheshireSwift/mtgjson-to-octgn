require('./support/chaiExtensions')
var expect = require('chai').expect

describe('Translate', () => {
  var translate = require('../translate.js')

  describe('#card', () => {
    var testData = getTestdata()

    it('should translate a card correctly', () => {
      var translatedCard = translate.card(testData.card.json)
      expect(translatedCard).to.be.card_like(testData.card.xml)
    })
  })
})

function getTestdata() {
  return {
    card: {
      json: {
        "artist": "Andi Rusu",
        "cmc": 4,
        "colorIdentity": [
          "W"
        ],
        "colors": [
          "White"
        ],
        "id": "bb814345e209568979e7f5dd8e5513b73c8816d4",
        "imageName": "kjeldoran home guard",
        "layout": "normal",
        "manaCost": "{3}{W}",
        "mciNumber": "135",
        "multiverseid": 3200,
        "name": "Kjeldoran Home Guard",
        "power": "1",
        "rarity": "Uncommon",
        "subtypes": [
          "Human",
          "Soldier"
        ],
        "text": "At end of combat, if Kjeldoran Home Guard attacked or blocked this combat, put a -0\/-1 counter on Kjeldoran Home Guard and put a 0\/1 white Deserter creature token onto the battlefield.",
        "toughness": "6",
        "type": "Creature \u2014 Human Soldier",
        "types": [
          "Creature"
        ]
      },
      xml: `
      <card name="Kjeldoran Home Guard" id="a8434484-69af-b76a-7a2c-83837e807222">
        <property name="Cost" value="{3}{W}" />
        <property name="CMC" value="4" />
        <property name="Color" value="White" />
        <property name="Type" value="Creature" />
        <property name="Subtype" value="Human Soldier" />
        <property name="Rarity" value="Uncommon" />
        <property name="Rules" value="At end of combat, if Kjeldoran Home Guard attacked or blocked this combat, put a -0/-1 counter on Kjeldoran Home Guard and put a 0/1 white Deserter creature token onto the battlefield." />
        <property name="Power" value="1" />
        <property name="Toughness" value="6" />
        <property name="PT Box" value="1 / 6" />
        <property name="Artist" value="Andi Rusu" />
        <property name="MultiverseId" value="3200" />
      </card>
      `
    }
  }
}

