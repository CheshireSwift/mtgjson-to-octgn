var xml = require('xml')
var UUID = require('node-uuid')
var _ = require('lodash')

var xmlProperty = (name, value) => (name && value && {
  property: {
    _attr: { name, value }
  }
})

function translateCard(card) {
  var handle = {
    colors: colors => {
      switch (colors.length) {
        case 0:
          return 'Colorless'
        case 1:
          return _.first(colors)
        default:
          return 'Multicolor ' + colors.join(' ')
      }
    },
    text: text => text.replace('\n', '\r\n'),
    join: field => field.join(' '),
    flavor: flavor => flavor && flavor.replace('\n', '')
  }

  var rv = xml({
    card: _.compact([
      { _attr: { name: card.name, id: UUID.v4() + 'aaaa' } },
      xmlProperty('Cost',         card.manaCost),
      xmlProperty('CMC',          card.cmc),
      xmlProperty('Rarity',       card.rarity),
      xmlProperty('Power',        card.power),
      xmlProperty('Toughness',    card.toughness),
      xmlProperty('Artist',       card.artist),
      xmlProperty('MultiverseId', card.multiverseid),
      xmlProperty('Number',       card.number),
      xmlProperty('Faction',      card.watermark),

      xmlProperty('Type',         handle.join(card.types)),
      xmlProperty('Subtype',      handle.join(card.subtypes || [])),
      xmlProperty('Color',        handle.colors(card.colors || [])),
      xmlProperty('Rules',        handle.text(card.text)),
      xmlProperty('Flavor',       handle.flavor(card.flavor)),

      card.power !== undefined &&
        card.toughness !== undefined &&
        xmlProperty('PT Box',       `${card.power} / ${card.toughness}`)
    ])
  })
  return rv
}

module.exports = { card: translateCard }

