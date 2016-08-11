var xml = require('xml')
var UUID = require('node-uuid')

var xmlProperty = (name, value) => (name && value && {
  property: {
    _attr: { name, value }
  }
})

function translateCard(card) {
  var handle = {
    colors: colors => (colors.length > 1 ? 'Multicolor ' : '') + colors.join(' '),
    text: text => text.replace('\n', '\r\n'),
    join: field => field.join(' ')
  }

  var rv = xml({
    card: [
      { _attr: { name: card.name, id: UUID.v4() + 'aaaa' } },
      xmlProperty('Cost',         card.manaCost),
      xmlProperty('CMC',          card.cmc),
      xmlProperty('Rarity',       card.rarity),
      xmlProperty('Power',        card.power),
      xmlProperty('Toughness',    card.toughness),
      xmlProperty('Artist',       card.artist),
      xmlProperty('MultiverseId', card.multiverseid),
      xmlProperty('Number',       card.mciNumber),
      xmlProperty('Flavor',       card.flavor),

      xmlProperty('Type',         handle.join(card.types)),
      xmlProperty('Subtype',      handle.join(card.subtypes)),
      xmlProperty('Color',        handle.colors(card.colors)),
      xmlProperty('Rules',        handle.text(card.text)),

      xmlProperty('PT Box',       `${card.power} / ${card.toughness}`)
    ]
  })
  return rv
}

module.exports = { card: translateCard }

