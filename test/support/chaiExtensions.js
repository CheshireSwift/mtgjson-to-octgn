'use strict'
var _ = require('lodash')
var parseXml = require('xml2js').parseString

module.exports = function(_chai, utils) {
  var Assertion = _chai.Assertion

  Assertion.addMethod('match_xml', function (otherXml, assertions, normalise) {
    var thisXml = this._obj
    var negate = utils.flag(this, 'negate')

    // Check we have correct data type
    new Assertion(thisXml).to.be.a('string')

    parseXml(thisXml, function (e, thisXmlObj) {
      // Check string is valid XML
      if (e) {
        e.message += ` (parsing xml ${thisXml})`
        throw e
      }

      parseXml(otherXml, function (e, otherXmlObj) {
        // Check other string is valid XML (silly)
        if (e) {
          e.message += ` (parsing xml ${otherXml})`
          throw e
        }

        try {
          if (assertions) {
            assertions(thisXmlObj, otherXmlObj)
          }

          if (normalise) {
            thisXmlObj = normalise(thisXmlObj)
            otherXmlObj = normalise(otherXmlObj)
          }

          if (negate) {
            new Assertion(thisXmlObj).to.not.eql(otherXmlObj)
          } else {
            new Assertion(thisXmlObj).to.eql(otherXmlObj)
          }
        } catch (e) {
          e.message = 'XML structure did not match object: ' + e.message
          throw e
        }
      })
    })
  })

  Assertion.addMethod('card_like', function (otherCard) {
    var card = this._obj
    new Assertion(card).to.match_xml(otherCard, function(cardObj, otherCardObj) {
      // Check ID is GUID
      new Assertion(cardObj.card.$.id).to.match(
        /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/
      )
    }, normaliseCardObj)
  })

  function normaliseCardObj(cardObj) {
    cardObj.card.$.id = '(id removed)'
    cardObj.card.property = _.orderBy(cardObj.card.property, '$.name')
  }
}
