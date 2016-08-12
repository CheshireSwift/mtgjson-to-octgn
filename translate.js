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
    colors: (manaCost, colors) => {
      switch (colors.length) {
        case 0:
          return 'Colorless'
        case 1:
          return _.first(colors)
        default:
          var counts = _.countBy(manaCost)
          var prefix = isGold(manaCost) ? 'Multicolor ' : 'Hybrid '
          return prefix + _.sortBy(colors, c =>
            manaCost.indexOf({ White: 'W', Blue: 'U', Black: 'B', Red: 'R', Green: 'G' }[c])
          ).join(' ')
      }

      function isGold(manaCost) {
        return _.uniq(manaCost.match(/\{[^0-9X]+?\}/g)).length !== 1
      }
    },
    text: text => text.split('\n').join('\r\n'),
    join: field => field.join(' '),
    flavor: flavor => flavor && flavor.split('\n').join('')
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
      xmlProperty('Color',        handle.colors(card.manaCost, card.colors || [])),
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

