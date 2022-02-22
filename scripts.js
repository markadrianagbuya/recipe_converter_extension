replaceTemperatures(document.body)

function replaceTemperatures(element) {
  if (element.hasChildNodes()) {
    element.childNodes.forEach(replaceTemperatures)
  } else if (element.nodeType === Text.TEXT_NODE) {
    element.textContent = element.textContent.replace(/(([0-9]*)-)?([0-9]*)[\s ]?(°(C|F)|℃|℉)/, replacer)
  }
}

function replacer(match, _range, startRange, temperature, type, unit) {
  const rangeString = startRange ? `${convert(unit, startRange)}-` : ''
  const conversion = convert(unit, temperature)
  const alternateUnit = unit === 'F' || type == '℉' ? 'C' : 'F'
  return `${match} (${rangeString}${conversion}°${alternateUnit})`
}

function convert(unit, temperature) {
  if (unit === 'F') {
    return fareinheitToCelsius(temperature)
  } else {
    return celsiusToFareinheit(temperature)
  }
}

function celsiusToFareinheit(celsius) {
  return (celsius * 9 / 5) + 32
}

function fareinheitToCelsius(fareinheit) {
  return (fareinheit - 32) * 5 / 9
}
