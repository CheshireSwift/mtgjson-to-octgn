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

  return {
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
  }
}

function translateBooster(booster) {
  var [simplePicks, pickGroups] = _.partition(booster, e => typeof e === 'string')
  var picks = _(simplePicks)
    .countBy()
    .map(boosterPick)
    .compact()
    .value()

  var optionGroups = _.map(pickGroups, optionGroup => ({
    options: _.map(optionGroup, optionPick => ({
      option: [
        { _attr: { probability: probability(optionGroup, optionPick) } },
        boosterPick(1, optionPick)
      ]
    }))
  }))

  return {
    pack: _.concat(
      { _attr: { name: 'Booster', id: UUID.v4() } },
      picks,
      optionGroups
    )
  }

  function boosterPick(count, rawRarity) {
    var rarity = mapRarity(rawRarity)
    if (!rarity) return

    return {
      pick: [
        { _attr: { qty: count, key: 'Rarity', value: rarity } }
      ]
    }
  }

  function mapRarity(jsonRarity) {
    switch (jsonRarity) {
      case 'land':
        return 'Basic Land'
      case 'marketing':
        // Drop non-playable cards
        return
      default:
        return _(jsonRarity)
          .split(' ')
          .map(_.capitalize)
          .join(' ')
    }
  }

  function probability(optionGroup, optionPick) {
    // Handle the typical rare/mythic rare case semi-intelligently, otherwise assume evens.
    if (optionGroup.length === 2) {
      return optionPick === 'mythic rare' ? 0.125 : 0.875
    } else {
      return 1/optionGroup.length
    }
  }
}

function translateSet(set) {
  var attrs = {
    _attr: {
      name: set.name,
      id: UUID.v4(),
      gameId: 'A6C8D2E8-7CD8-11DD-8F94-E62B56D89593',
      gameVersion: '3.3.0.0',
      version: '1.0'
    }
  }
  var packaging = { packaging: [translateBooster(set.booster)] }
  var cards = { cards: _.map(set.cards, translateCard) }
  return { set: [ attrs, packaging, cards ] }
}

module.exports = {
  card: _.flow(translateCard, xml),
  booster: _.flow(translateBooster, xml),
  set: _.flow(translateSet, xml)
}

