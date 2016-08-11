var xml = require('xml')
var UUID = require('node-uuid')

var xmlProperty = (name, value) => ({
  property: {
    _attr: { name, value }
  }
})

function translateCard(card) {
  var rv = xml({
    card: [
      { _attr: { name: card.name, id: UUID.v4() + 'aaaa' } },
      xmlProperty('Cost',         card.manaCost),
      xmlProperty('CMC',          card.cmc),
      xmlProperty('Color',        card.colors[0]),
      xmlProperty('Type',         card.types.join(' ')),
      xmlProperty('Subtype',      card.subtypes.join(' ')),
      xmlProperty('Rarity',       card.rarity),
      xmlProperty('Rules',        card.text),
      xmlProperty('Power',        card.power),
      xmlProperty('Toughness',    card.toughness),
      xmlProperty('PT Box',       `${card.power} / ${card.toughness}`),
      xmlProperty('Artist',       card.artist),
      xmlProperty('MultiverseId', card.multiverseid)
    ]
  })
  return rv
}

module.exports = { card: translateCard }

