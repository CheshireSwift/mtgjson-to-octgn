var chai = require('chai')
var expect = chai.expect
chai.use(require('./support/chaiExtensions'))

describe('XML assertions', () => {
  it('matches equivalent XML', () => {
    expect('<abc />').to.match_xml('<abc></abc>')
  })

  it('does nested tags and attributes and whatnot', () => {
    expect(`
    <fancyXml key="value" otherKey="otherValue">
      <abc />
      <collection>
        <waffle />
        <crepe />
        <sundae>Knickerbocker</sundae>
      </collection>
    </fancyXml>
    `).to.match_xml(`
    <fancyXml otherKey="otherValue" key="value">
      <abc></abc>
      <collection>
        <waffle></waffle>
        <crepe></crepe>
        <sundae>Knickerbocker</sundae>
      </collection>
    </fancyXml>
    `)
  })

  it('wouldn\'t like mismatched tags when they\'re angry', () => {
    expect('<abc />').to.not.match_xml('<def />')
  })
})


