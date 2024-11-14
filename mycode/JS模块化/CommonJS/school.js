const name = '大学'
const slogan = '厚德载物'

function getTel() {
  return '0101010'
}

function getCities() {
  return ['beijing', 'shanghai', 'guangzhou', 'shenzhen']
}

exports.name = name
exports.slogan = slogan
exports.getTel = getTel

module.exports = {
  name: name,
  slogan: slogan,
  getTel: getTel
}