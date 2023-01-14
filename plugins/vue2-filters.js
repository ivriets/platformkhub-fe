import Vue from 'vue'
import Vue2Filters from 'vue2-filters'

var Vue2FiltersConfig = {
    capitalize: {
      onlyFirstLetter: false
    },
    number: {
      format: '0',
      thousandsSeparator: '.',
      decimalSeparator: ','
    },
    bytes: {
      decimalDigits: 2
    },
    percent: {
      decimalDigits: 2,
      multiplier: 100,
      decimalSeparator: '.'
    },
    currency: {
      symbol: 'Rp',
      decimalDigits: 0,
      thousandsSeparator: '.',
      decimalSeparator: ',',
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      showPlusSign: false
    },
    pluralize: {
      includeNumber: false
    },
    ordinal: {
      includeNumber: false
    }
  }
Vue.use(Vue2Filters, Vue2FiltersConfig)