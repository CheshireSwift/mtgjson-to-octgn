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
            normalise(thisXmlObj)
            normalise(otherXmlObj)
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

  Assertion.addMethod('octgn_like', function (otherObj, identifiedTag, subtags, orderAttr) {
    var obj = this._obj
    new Assertion(obj).to.match_xml(otherObj, function(obj, otherObj) {
      // Check ID is GUID
      new Assertion(obj[identifiedTag].$.id).to.match(
        /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/
      )
    }, function (someObj) {
      someObj[identifiedTag].$.id = '(id removed)'
      someObj[identifiedTag][subtags] = _.orderBy(someObj[identifiedTag][subtags], '$.' + orderAttr)
    })
  })

  function octgnAssertionMethod(identifiedTag, subtags, orderAttr) {
    return function(other) {
      new Assertion(this._obj).to.octgn_like(other, identifiedTag, subtags, orderAttr)
    }
  }

  Assertion.addMethod('card_like', octgnAssertionMethod('card', 'property', 'name'))
  Assertion.addMethod('booster_like', octgnAssertionMethod('pack', 'pick', 'qty'))
}
