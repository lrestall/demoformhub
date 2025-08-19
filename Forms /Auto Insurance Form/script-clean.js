// Single Page Form Configuration
const FORM_CONFIG = {
    // Form field selectors
    selectors: {
        form: '#solarLeadForm',
        thankYouMessage: '#thankYouMessage',
        newQuoteBtn: '#newQuoteBtn',
        weatherWidget: '.weather-widget',
        locationElement: '#location',
        temperatureElement: '#temperature',
        weatherConditionElement: '#weather-condition',
        weatherIconElement: '#weather-icon',
        uvIndexElement: '#uv-index',
        uvBarElement: '#uv-bar',
        weatherInfoElement: '#weather-info',
        forecastDaysElement: '#forecast-days',
        solarTipElement: '#solar-tip',
        buyerInfoElement: '#buyerInfo'
    },
    
    // Validation patterns
    validation: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^\+?[\d\s-()]{10,}$/,
        zip: /^\d{5}(-\d{4})?$/
    },
    
    // Default values
    defaults: {
        location: 'Your Location',
        defaultZip: '94105' // San Francisco
    }
};
