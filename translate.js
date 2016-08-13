var xml = require('xml')
var UUID = require('node-uuid')
var _ = require('lodash')
var leftPad = require('left-pad')

var xmlProperty = (name, value, force) =>
  name && (value || force) && {
    property: {
      _attr: { name, value }
    }
  }

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
    join: (...fields) => _(fields).flatten().compact().join(' '),
    flavor: flavor => flavor && flavor.split('\n').join(''),
    ptBox: (power, toughness, loyalty) => loyalty || power && toughness && `${power} / ${toughness}`,
    pad: (field, ...args) => field && leftPad(field, ...args)
  }

  return xml({
    card: _.compact([
      { _attr: { name: card.name, id: UUID.v4() } },
      xmlProperty('Cost',         card.manaCost),
      xmlProperty('CMC',          card.cmc || '0'),
      xmlProperty('Rarity',       card.rarity),
      xmlProperty('Power',        card.power),
      xmlProperty('Toughness',    card.toughness),
      xmlProperty('Artist',       card.artist),
      xmlProperty('MultiverseId', card.multiverseid),
      xmlProperty('Faction',      card.watermark),

      xmlProperty('Number',       handle.pad(card.number, 3, 0)),
      xmlProperty('Type',         handle.join(card.supertypes, card.types)),
      xmlProperty('Subtype',      handle.join(card.subtypes || [])),
      xmlProperty('Color',        handle.colors(card.manaCost, card.colors || [])),
      xmlProperty('Rules',        handle.text(card.text || ''), true),
      xmlProperty('Flavor',       handle.flavor(card.flavor)),
      xmlProperty('PT Box',       handle.ptBox(card.power, card.toughness, card.loyalty))
    ])
  })
}

function translateBooster(booster) {
  return xml({
    pack:
      _(booster)
        .countBy()
        .map(function (count, rarity) {
          return { pick: [ { _attr: { qty: count, key: 'Rarity', value: _.capitalize(rarity) } } ] }
        })
        .concat({ _attr: { name: 'Booster', id: UUID.v4() } })
        .value()
  })
}

module.exports = { card: translateCard, booster: translateBooster }

