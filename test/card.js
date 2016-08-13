var chai = require('chai')
var expect = chai.expect
chai.use(require('./support/chaiExtensions'))

var testData = require('./testData')

describe('Translate', () => {
  var translate = require('../translate.js')

  describe('#card', () => {
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

    it('should handle colourless mana symbols', () => {
      var translatedCard = translate.card(testData.cosy.json)
      expect(translatedCard).to.be.card_like(testData.cosy.xml)
    })

    it('should translate a vanilla creature correctly', () => {
      var translatedCard = translate.card(testData.vanilla.json)
      expect(translatedCard).to.be.card_like(testData.vanilla.xml)
    })

    it('should handle cards without mana costs', () => {
      var translatedCard = translate.card(testData.costless.json)
      expect(translatedCard).to.be.card_like(testData.costless.xml)
    })

    it('should translate a planeswalker card correctly', () => {
      var translatedCard = translate.card(testData.walker.json)
      expect(translatedCard).to.be.card_like(testData.walker.xml)
    })
  })
})

