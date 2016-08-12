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

    it('should translate a colourless card (with watermark) correctly', () => {
      var translatedCard = translate.card(testData.artifact.json)
      expect(translatedCard).to.be.card_like(testData.artifact.xml)
    })

    // Redundant, but good to have.
    it('should translate a sorcery card correctly', () => {
      var translatedCard = translate.card(testData.sorcery.json)
      expect(translatedCard).to.be.card_like(testData.sorcery.xml)
    })

    it('should translate a hybrid card correctly', () => {
      var translatedCard = translate.card(testData.hybrid.json)
      expect(translatedCard).to.be.card_like(testData.hybrid.xml)
    })

    it('should translate a gold hybrid card correctly', () => {
      var translatedCard = translate.card(testData.goldHybrid.json)
      expect(translatedCard).to.be.card_like(testData.goldHybrid.xml)
    })

    it('should handle mana costs that combine hybrid and colourless correctly', () => {
      var translatedCard = translate.card(testData.oneAndHybrid.json)
      expect(translatedCard).to.be.card_like(testData.oneAndHybrid.xml)
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
    },
    sorcery: {
      json: {
        "artist": "Chippy",
        "cmc": 5,
        "colorIdentity": [
          "R"
        ],
        "colors": [
          "Red"
        ],
        "id": "fcbca64ac6d1747a8dae1ecfc8dbb3f15a320331",
        "imageName": "shivan meteor",
        "layout": "normal",
        "manaCost": "{3}{R}{R}",
        "mciNumber": "106",
        "multiverseid": 134740,
        "name": "Shivan Meteor",
        "number": "106",
        "rarity": "Uncommon",
        "text": "Shivan Meteor deals 13 damage to target creature.\nSuspend 2\u2014{1}{R}{R} (Rather than cast this card from your hand, you may pay {1}{R}{R} and exile it with two time counters on it. At the beginning of your upkeep, remove a time counter. When the last is removed, cast it without paying its mana cost.)",
        "type": "Sorcery",
        "types": [
          "Sorcery"
        ]
      },
      xml: `
        <card name="Shivan Meteor" id="fba75c80-1e36-5f06-b42c-040ba8a50c06">
          <property name="Cost" value="{3}{R}{R}" />
          <property name="CMC" value="5" />
          <property name="Color" value="Red" />
          <property name="Type" value="Sorcery" />
          <property name="Rarity" value="Uncommon" />
          <property name="Rules" value="Shivan Meteor deals 13 damage to target creature.&#xD;&#xA;Suspend 2—{1}{R}{R} (Rather than cast this card from your hand, you may pay {1}{R}{R} and exile it with two time counters on it. At the beginning of your upkeep, remove a time counter. When the last is removed, cast it without paying its mana cost.)" />
          <property name="Artist" value="Chippy" />
          <property name="Number" value="106" />
          <property name="MultiverseId" value="134740" />
        </card>
      `
    },
    hybrid: {
      json: {
        "artist": "Kev Walker",
        "cmc": 5,
        "colorIdentity": [
          "U",
          "R"
        ],
        "colors": [
          "Blue",
          "Red"
        ],
        "flavor": "\"Nothing is truly your own. It is his, whether you know it or not.\"\n\u2014The Seer's Parables",
        "id": "064f72676ac76385f6c49050ba9e76900472e0fc",
        "imageName": "dominus of fealty",
        "layout": "normal",
        "manaCost": "{U\/R}{U\/R}{U\/R}{U\/R}{U\/R}",
        "mciNumber": "102",
        "multiverseid": 151154,
        "name": "Dominus of Fealty",
        "number": "102",
        "power": "4",
        "rarity": "Rare",
        "subtypes": [
          "Spirit",
          "Avatar"
        ],
        "text": "Flying\nAt the beginning of your upkeep, you may gain control of target permanent until end of turn. If you do, untap it and it gains haste until end of turn.",
        "toughness": "4",
        "type": "Creature \u2014 Spirit Avatar",
        "types": [
          "Creature"
        ]
      },
      xml: `
        <card name="Dominus of Fealty" id="f6340f5d-3cb5-0574-e38f-9b420c883dac">
          <property name="Cost" value="{U/R}{U/R}{U/R}{U/R}{U/R}" />
          <property name="CMC" value="5" />
          <property name="Color" value="Hybrid Blue Red" />
          <property name="Type" value="Creature" />
          <property name="Subtype" value="Spirit Avatar" />
          <property name="Rarity" value="Rare" />
          <property name="Rules" value="Flying&#xD;&#xA;At the beginning of your upkeep, you may gain control of target permanent until end of turn. If you do, untap it and it gains haste until end of turn." />
          <property name="Power" value="4" />
          <property name="Toughness" value="4" />
          <property name="PT Box" value="4 / 4" />
          <property name="Artist" value="Kev Walker" />
          <property name="Number" value="102" />
          <property name="Flavor" value="&quot;Nothing is truly your own. It is his, whether you know it or not.&quot;—The Seer's Parables" />
          <property name="MultiverseId" value="151154" />
        </card>
      `
    },
    goldHybrid: {
      json: {
        "artist": "Michael Komarck",
        "cmc": 2,
        "colorIdentity": [
          "W",
          "U",
          "G"
        ],
        "colors": [
          "White",
          "Blue",
          "Green"
        ],
        "flavor": "Soldiers who fought through Grixis learned to hit first, recite the prayer of Asha later.",
        "id": "cbf6043e8fb48d7ee4399100992030e6aabd9cff",
        "imageName": "bant sureblade",
        "layout": "normal",
        "manaCost": "{G\/U}{W}",
        "mciNumber": "143",
        "multiverseid": 188975,
        "name": "Bant Sureblade",
        "number": "143",
        "power": "2",
        "rarity": "Common",
        "subtypes": [
          "Human",
          "Soldier"
        ],
        "text": "As long as you control another multicolored permanent, Bant Sureblade gets +1\/+1 and has first strike.",
        "toughness": "1",
        "type": "Creature \u2014 Human Soldier",
        "types": [
          "Creature"
        ]
      },
      xml: `
        <card name="Bant Sureblade" id="ca5fdcf1-67fd-fe0e-087f-aef7985d6848">
          <property name="Cost" value="{G/U}{W}" />
          <property name="CMC" value="2" />
          <property name="Color" value="Multicolor Green Blue White" />
          <property name="Type" value="Creature" />
          <property name="Subtype" value="Human Soldier" />
          <property name="Rarity" value="Common" />
          <property name="Rules" value="As long as you control another multicolored permanent, Bant Sureblade gets +1/+1 and has first strike." />
          <property name="Power" value="2" />
          <property name="Toughness" value="1" />
          <property name="PT Box" value="2 / 1" />
          <property name="Artist" value="Michael Komarck" />
          <property name="Number" value="143" />
          <property name="Flavor" value="Soldiers who fought through Grixis learned to hit first, recite the prayer of Asha later." />
          <property name="MultiverseId" value="188975" />
        </card>
      `
    },
    oneAndHybrid: {
      json: {
        "artist": "Dany Orizio",
        "cmc": 2,
        "colorIdentity": [
          "W",
          "B"
        ],
        "colors": [
          "White",
          "Black"
        ],
        "flavor": "During their ascent to spirithood, patriarchs of Orzhova shed both flesh and emotion. This earthly slag is collected and formed into thrulls.",
        "id": "4eca26f5fecaf6c4945a5a20c438c2fd0409c324",
        "imageName": "mourning thrull",
        "layout": "normal",
        "manaCost": "{1}{W\/B}",
        "multiverseid": 96910,
        "name": "Mourning Thrull",
        "number": "146",
        "power": "1",
        "rarity": "Common",
        "subtypes": [
          "Thrull"
        ],
        "text": "({W\/B} can be paid with either {W} or {B}.)\nFlying\nWhenever Mourning Thrull deals damage, you gain that much life.",
        "toughness": "1",
        "type": "Creature \u2014 Thrull",
        "types": [
          "Creature"
        ],
        "watermark": "Orzhov"
      },
      xml: `
        <card name="Mourning Thrull" id="c7c72d22-d113-6286-1cc5-021ab93f25a6">
          <property name="Cost" value="{1}{W/B}" />
          <property name="CMC" value="2" />
          <property name="Color" value="Hybrid White Black" />
          <property name="Type" value="Creature" />
          <property name="Subtype" value="Thrull" />
          <property name="Rarity" value="Common" />
          <property name="Rules" value="({W/B} can be paid with either {W} or {B}.)&#xD;&#xA;Flying&#xD;&#xA;Whenever Mourning Thrull deals damage, you gain that much life." />
          <property name="Power" value="1" />
          <property name="Toughness" value="1" />
          <property name="PT Box" value="1 / 1" />
          <property name="Artist" value="Dany Orizio" />
          <property name="Number" value="146" />
          <property name="Flavor" value="During their ascent to spirithood, patriarchs of Orzhova shed both flesh and emotion. This earthly slag is collected and formed into thrulls." />
          <property name="Faction" value="Orzhov" />
          <property name="MultiverseId" value="96910" />
        </card>
      `
    }
  }
}

