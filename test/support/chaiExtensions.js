'use strict'
var _ = require('lodash')
var parseXml = require('xml2js').parseString
var Assertion = require('chai').Assertion

Assertion.addMethod('card_like', function (otherCard) {
  var card = this._obj

  // Check we have correct data type
  new Assertion(card).to.be.a('string')


  parseXml(card, function (e, cardObj) {
    // Check string is valid XML
    if (e) throw e

    parseXml(otherCard, function (e, otherCardObj) {
      // Check other string is valid XML (silly)
      if (e) throw e

      try {
        // Check ID is GUID
        new Assertion(cardObj.card.$.id).to.match(
          /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}/
        )

        // Finally check cards match, subject to normalisation
        normaliseCardObj(cardObj)
        normaliseCardObj(otherCardObj)
        new Assertion(cardObj).to.eql(otherCardObj)
      } catch (e) {
        e.message = 'XML structure did not match OCTGN card object: ' + e.message
        throw e
      }
    })
  })
})

function normaliseCardObj(cardObj) {
  cardObj.card.$.id = '(id removed)'
  cardObj.card.property = _.orderBy(cardObj.card.property, '$.name')
}
