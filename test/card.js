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

    it('should translate a gold card correctly', () => {
      var translatedCard = translate.card(testData.gold.json)
      expect(translatedCard).to.be.card_like(testData.gold.xml)
    })

    it('should translate an colourless card (with watermark) correctly', () => {
      var translatedCard = translate.card(testData.artifact.json)
      expect(translatedCard).to.be.card_like(testData.artifact.xml)
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
    },
    gold: {
      json: {
        "artist": "Cyril Van Der Haegen",
        "cmc": 2,
        "colorIdentity": [
          "U",
          "B"
        ],
        "colors": [
          "Blue",
          "Black"
        ],
        "flavor": "The scullers beneath Esper keep strixes as trained pets, and set them loose when a fare refuses to pay.",
        "id": "7d1db2828fcca5c63e7761970801b017e4eee22e",
        "imageName": "tidehollow strix",
        "layout": "normal",
        "manaCost": "{U}{B}",
        "mciNumber": "203",
        "multiverseid": 175015,
        "name": "Tidehollow Strix",
        "number": "203",
        "power": "2",
        "rarity": "Common",
        "subtypes": [
          "Bird"
        ],
        "text": "Flying\nDeathtouch (Any amount of damage this deals to a creature is enough to destroy it.)",
        "toughness": "1",
        "type": "Artifact Creature \u2014 Bird",
        "types": [
          "Artifact",
          "Creature"
        ]
      },
      xml: `
        <card name="Tidehollow Strix" id="f3984c7c-b64c-20a5-1700-77b3350cc455">
          <property name="Cost" value="{U}{B}" />
          <property name="CMC" value="2" />
          <property name="Color" value="Multicolor Blue Black" />
          <property name="Type" value="Artifact Creature" />
          <property name="Subtype" value="Bird" />
          <property name="Rarity" value="Common" />
          <property name="Rules" value="Flying&#xD;&#xA;Deathtouch (Any amount of damage this deals to a creature is enough to destroy it.)" />
          <property name="Power" value="2" />
          <property name="Toughness" value="1" />
          <property name="PT Box" value="2 / 1" />
          <property name="Artist" value="Cyril Van Der Haegen" />
          <property name="Number" value="203" />
          <property name="Flavor" value="The scullers beneath Esper keep strixes as trained pets, and set them loose when a fare refuses to pay." />
          <property name="MultiverseId" value="175015" />
        </card>
      `
    },
    artifact: {
      json: {
        "artist": "John Avon",
        "cmc": 3,
        "colorIdentity": [
          "U",
          "R"
        ],
        "flavor": "\"What is it? Um . . . what do you want it to be?\"\n\u2014Juzba, Izzet tinker",
        "id": "5d2a481c978cd399dcbb2f924ad082cb4aa65b4e",
        "imageName": "mizzium transreliquat",
        "layout": "normal",
        "manaCost": "{3}",
        "multiverseid": 107096,
        "name": "Mizzium Transreliquat",
        "number": "153",
        "rarity": "Rare",
        "text": "{3}: Mizzium Transreliquat becomes a copy of target artifact until end of turn.\n{1}{U}{R}: Mizzium Transreliquat becomes a copy of target artifact and gains this ability.",
        "type": "Artifact",
        "types": [
          "Artifact"
        ],
        "watermark": "Izzet"
      },
      xml: `
        <card name="Mizzium Transreliquat" id="41e005d1-3729-f138-8660-68f5f9ffa4a2">
          <property name="Cost" value="{3}" />
          <property name="CMC" value="3" />
          <property name="Color" value="Colorless" />
          <property name="Type" value="Artifact" />
          <property name="Rarity" value="Rare" />
          <property name="Rules" value="{3}: Mizzium Transreliquat becomes a copy of target artifact until end of turn.&#xD;&#xA;{1}{U}{R}: Mizzium Transreliquat becomes a copy of target artifact and gains this ability." />
          <property name="Artist" value="John Avon" />
          <property name="Number" value="153" />
          <property name="Flavor" value="&quot;What is it? Um . . . what do you want it to be?&quot;—Juzba, Izzet tinker" />
          <property name="Faction" value="Izzet" />
          <property name="MultiverseId" value="107096" />
        </card>
      `
    }
  }
}

