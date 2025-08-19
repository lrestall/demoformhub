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

// Weather Widget Configuration
const WEATHER_CONFIG = {
    // OpenWeather API Key
    apiKey: 'b55ed0762d1c5f2b26a9d6b3d7e6e277',
    baseUrl: 'https://api.openweathermap.org/data/2.5/onecall',
    geocodingUrl: 'https://api.openweathermap.org/geo/1.0/zip',
    units: 'imperial', // Use imperial units (Fahrenheit, mph)
    
    // Mock data as fallback
    mockData: {
        current: {
            dt: Math.floor(Date.now() / 1000),
            temp: 75,
            weather: [{
                id: 800,
                main: 'Clear',
                description: 'clear sky',
                icon: '01d'
            }],
            uvi: 7.5,
            humidity: 45,
            wind_speed: 5.5
        },
        daily: [
            // Array of 7 days, we'll just show the first 5
            { dt: Math.floor(Date.now() / 1000) + 86400, temp: { day: 78 }, weather: [{ icon: '01d' }] },
            { dt: Math.floor(Date.now() / 1000) + 172800, temp: { day: 82 }, weather: [{ icon: '02d' }] },
            { dt: Math.floor(Date.now() / 1000) + 259200, temp: { day: 80 }, weather: [{ icon: '03d' }] },
            { dt: Math.floor(Date.now() / 1000) + 345600, temp: { day: 76 }, weather: [{ icon: '10d' }] },
            { dt: Math.floor(Date.now() / 1000) + 432000, temp: { day: 74 }, weather: [{ icon: '04d' }] },
            { dt: Math.floor(Date.now() / 1000) + 518400, temp: { day: 72 }, weather: [{ icon: '01d' }] },
            { dt: Math.floor(Date.now() / 1000) + 604800, temp: { day: 75 }, weather: [{ icon: '02d' }] }
        ],
        timezone: 'America/Los_Angeles'
    },
    
    // Weather Icons Map
    weatherIcons: {
        '01d': 'sun', '01n': 'moon', '02d': 'cloud-sun', '02n': 'cloud-moon',
        '03d': 'cloud', '03n': 'cloud', '04d': 'cloud', '04n': 'cloud',
        '09d': 'cloud-rain', '09n': 'cloud-rain', '10d': 'cloud-sun-rain',
        '10n': 'cloud-moon-rain', '11d': 'bolt', '11n': 'bolt',
        '13d': 'snowflake', '13n': 'snowflake', '50d': 'smog', '50n': 'smog'
    },
    
    // UV Index Descriptions
    uvDescriptions: {
        low: { text: 'Low', color: '#4ade80', max: 2 },
        moderate: { text: 'Moderate', color: '#facc15', max: 5 },
        high: { text: 'High', color: '#f97316', max: 7 },
        veryHigh: { text: 'Very High', color: '#ef4444', max: 10 },
        extreme: { text: 'Extreme', color: '#7e22ce', max: 15 }
    },
    
    // Solar Tips
    solarTips: [
        'Ideal conditions for solar energy production today!',
        'Great day for solar energy generation!',
        'Your location has excellent solar potential!',
        'Perfect weather for maximum solar efficiency!',
        'Solar panels would work efficiently in this weather!'
    ]
};

// Lead Buyers Configuration
const LEAD_BUYERS = {
    premium: {
        name: 'Premium Solar Solutions',
        minCreditScore: 700,
        minMonthlyBill: 150,
        states: ['CA', 'AZ', 'NV', 'TX', 'FL', 'NY', 'NJ', 'MA'],
        pricePerLead: 45.00,
        apiEndpoint: 'https://api.leadsystem.com/premium-solar',
        description: 'Premium service for high-value residential solar installations'
    },
    standard: {
        name: 'National Solar Network',
        minCreditScore: 600,
        minMonthlyBill: 100,
        states: 'all', // All states
        pricePerLead: 32.50,
        apiEndpoint: 'https://api.leadsystem.com/national-solar',
        description: 'Nationwide coverage for standard solar installations'
    },
    value: {
        name: 'Value Solar Options',
        minCreditScore: 580,
        minMonthlyBill: 75,
        states: 'all',
        pricePerLead: 22.75,
        apiEndpoint: 'https://api.leadsystem.com/value-solar',
        description: 'Affordable solar solutions for budget-conscious homeowners'
    },
    // Specialized buyers for specific cases
    commercial: {
        name: 'Commercial Solar Partners',
        minCreditScore: 650,
        minMonthlyBill: 500,
        propertyTypes: ['commercial', 'industrial'],
        pricePerLead: 85.00,
        apiEndpoint: 'https://api.leadsystem.com/commercial-solar',
        description: 'Specializing in commercial and industrial solar installations'
    },
    diy: {
        name: 'DIY Solar Kits',
        minCreditScore: 0,
        minMonthlyBill: 0,
        states: 'all',
        pricePerLead: 15.00,
        apiEndpoint: 'https://api.leadsystem.com/diy-solar',
        description: 'For customers interested in DIY solar panel installations'
    }
};

// DOM Elements
const form = document.getElementById('solarLeadForm');
const thankYouMessage = document.getElementById('thankYouMessage');
const newQuoteBtn = document.getElementById('newQuoteBtn');

// Main initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Show all form fields by default
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.style.display = 'block';
    });
    
    // Set default ZIP code if empty and handle ZIP code changes
    const zipInput = document.getElementById('zip');
    if (zipInput) {
        if (!zipInput.value) {
            zipInput.value = FORM_CONFIG.defaults.defaultZip;
        }
        
        // Update weather widget when ZIP code changes
        zipInput.addEventListener('change', function() {
            console.log('ZIP code changed to:', this.value);
            updateWeatherWidget();
        });
        
        // Initialize the weather widget with current ZIP
        console.log('Initializing weather widget with ZIP:', zipInput.value);
        updateWeatherWidget();
    } else {
        console.error('ZIP input element not found');
    }
    
    // Phone number input formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            const input = e.target;
            const formattedInput = formatPhoneNumber(input.value);
            input.value = formattedInput;
        });
    }
    
    // ZIP code input - update weather when ZIP changes
    if (zipInput) {
        // Update weather when ZIP code changes
        zipInput.addEventListener('blur', function() {
            if (this.value.length >= 5) {
                updateWeatherWidget();
            }
        });
        
        // Format ZIP code as user types (12345 or 12345-6789)
        zipInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = `${value.slice(0, 5)}-${value.slice(5, 9)}`;
            }
            e.target.value = value;
            
            // Validate ZIP code format
            const zipRegex = /^\d{5}(-\d{4})?$/;
            if (value && !zipRegex.test(value)) {
                this.setCustomValidity('Please enter a valid ZIP code (e.g., 12345 or 12345-6789)');
                this.reportValidity();
            } else {
                this.setCustomValidity('');
            }
        });
    }
    
    // Form submission handler
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const formData = {};
            const inputs = form.querySelectorAll('input, select, textarea');
            
            // Validate all fields
            inputs.forEach(input => {
                formData[input.name] = input.value.trim();
                
                // Required field validation
                if (input.required && !input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                    input.classList.add('error');
                    isValid = false;
                } else if (input.type === 'tel' && !/^\+?[\d\s-()]{10,}$/.test(input.value)) {
                    input.classList.add('error');
                    isValid = false;
                } else if (input.id === 'zip' && !/^\d{5}(-\d{4})?$/.test(input.value)) {
                    input.classList.add('error');
                    isValid = false;
                } else if (input.type === 'checkbox' && input.required && !input.checked) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // Get form data
            const formData = new FormData(form);
            
            // Validate form
            const errors = validateForm(formData);
            
            if (errors.length > 0) {
                // Show errors
                alert(errors.join('\n'));
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                return;
            }
            
            try {
                // Add timestamp and other required fields
                formData.append('lp_request_id', 'req_' + Date.now());
                formData.append('lp_s1', 'form_submit');
                formData.append('lp_s2', 'auto_insurance');
                
                // Log form data (for testing)
                const formDataObj = Object.fromEntries(formData.entries());
                console.log('Form data:', formDataObj);
                
                // Submit to LeadsPedia
                const response = await submitToLeadsPedia(formData);
                
                // If we get here, submission was successful
                form.style.display = 'none';
                thankYouMessage.style.display = 'block';
                
                // Reset form
                form.reset();
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                        `;
                    }
                    
                    // Scroll to thank you message
                    thankYouMessage.scrollIntoView({ behavior: 'smooth' });
                } else {
                    throw new Error(result.error || 'Failed to submit form');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error submitting your form. Please try again.');
            } finally {
                // Reset button state
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        });
    }
    
    // New Quote button handler
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', function() {
            // Reset form
            form.reset();
            
            // Hide thank you message and show form
            thankYouMessage.style.display = 'none';
            form.style.display = 'block';
            
            // Scroll to top of form
            form.scrollIntoView({ behavior: 'smooth' });
            
            // Reset weather widget
            updateWeatherWidget();
        });
    }
});

// Geocode address using OpenWeather Geocoding API
async function geocodeAddress(address) {
    try {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(address)},US&limit=1&appid=${WEATHER_CONFIG.apiKey}`);
        const data = await response.json();
        
        if (data && data.length > 0) {
            const location = data[0];
            return {
                lat: location.lat,
                lon: location.lon,
                city: location.name,
                state: location.state,
                zip: location.postcode || ''
            };
        }
        return null;
    } catch (error) {
        console.error('Error geocoding address:', error);
        return null;
    }
}

// Handle address lookup when user stops typing
let addressLookupDebounce;
const addressInput = document.getElementById('address');
if (addressInput) {
    addressInput.addEventListener('input', (e) => {
        clearTimeout(addressLookupDebounce);
        const address = e.target.value.trim();
        
        if (address.length > 5) { // Only search with reasonable length
            addressLookupDebounce = setTimeout(async () => {
                const location = await geocodeAddress(address);
                if (location) {
                    // Update form fields with geocoded data
                    if (location.city) document.getElementById('city').value = location.city;
                    if (location.state) document.getElementById('state').value = location.state;
                    if (location.zip) {
                        const zipInput = document.getElementById('zip');
                        zipInput.value = location.zip;
                        updateWeatherWidget();
                    }
                }
            }, 1000); // 1 second debounce
        }
    });
}

// Weather Widget Elements
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const weatherConditionElement = document.getElementById('weather-condition');
const weatherIconElement = document.getElementById('weather-icon');
const uvIndexElement = document.getElementById('uv-index');
const uvBarElement = document.getElementById('uv-bar');
const uvDescriptionElement = document.getElementById('uv-description');
const solarRadElement = document.getElementById('solar-rad');
const solarBarElement = document.getElementById('solar-bar');
const forecastDaysElement = document.getElementById('forecast-days');
const solarTipElement = document.getElementById('solar-tip');

// Determine the best buyer for a lead
function determineLeadBuyer(formData) {
    const creditScore = parseInt(formData.creditScore) || 0;
    const monthlyBill = parseFloat(formData.monthlyBill) || 0;
    const state = formData.state || '';
    const propertyType = formData.propertyType || 'residential';
    
    // Check for commercial leads first
    if (propertyType === 'commercial' || propertyType === 'industrial') {
        if (creditScore >= LEAD_BUYERS.commercial.minCreditScore && 
            monthlyBill >= LEAD_BUYERS.commercial.minMonthlyBill) {
            return LEAD_BUYERS.commercial;
        }
    }
    
    // Check for premium leads
    if (creditScore >= LEAD_BUYERS.premium.minCreditScore && 
        monthlyBill >= LEAD_BUYERS.premium.minMonthlyBill &&
        (LEAD_BUYERS.premium.states === 'all' || 
         LEAD_BUYERS.premium.states.includes(state))) {
        return LEAD_BUYERS.premium;
    }
    
    // Check for standard leads
    if (creditScore >= LEAD_BUYERS.standard.minCreditScore && 
        monthlyBill >= LEAD_BUYERS.standard.minMonthlyBill) {
        return LEAD_BUYERS.standard;
    }
    
    // Check for value leads
    if (creditScore >= LEAD_BUYERS.value.minCreditScore) {
        return LEAD_BUYERS.value;
    }
    
    // Default to DIY for all other cases
    return LEAD_BUYERS.diy;
}

// Format form data for API submission
function formatLeadData(formData, buyer) {
    return {
        lead: {
            contact: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zip: formData.zip
            },
            property: {
                type: formData.propertyType || 'residential',
                ownership: formData.ownership,
                roofType: formData.roofType,
                monthlyBill: parseFloat(formData.monthlyBill) || 0
            },
            financial: {
                creditScore: parseInt(formData.creditScore) || 0,
                creditRange: formData.creditRange || 'unknown'
            },
            timeline: formData.timeline || 'unsure',
            comments: formData.comments || '',
            source: 'solar_lead_form',
            buyer: buyer.name,
            price: buyer.pricePerLead,
            timestamp: new Date().toISOString()
        }
    };
}

// Send lead to buyer's API
async function sendLeadToBuyer(leadData, buyer) {
    try {
        // In a real implementation, you would make an actual API call here
        console.log(`Sending lead to ${buyer.name} at ${buyer.apiEndpoint}`, leadData);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real implementation, you would handle the API response
        // const response = await fetch(buyer.apiEndpoint, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(leadData)
        // });
        // 
        // if (!response.ok) {
        //     throw new Error(`Failed to send lead to ${buyer.name}`);
        // }
        
        return { success: true, buyer: buyer.name, price: buyer.pricePerLead };
    } catch (error) {
        console.error(`Error sending lead to ${buyer.name}:`, error);
        return { success: false, error: error.message };
    }
}

// Format phone number as (XXX) XXX-XXXX
function formatPhoneNumber(value) {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}

// Get UV Index Description
function getUvDescription(uvi) {
    if (uvi <= WEATHER_CONFIG.uvDescriptions.low.max) return WEATHER_CONFIG.uvDescriptions.low;
    if (uvi <= WEATHER_CONFIG.uvDescriptions.moderate.max) return WEATHER_CONFIG.uvDescriptions.moderate;
    if (uvi <= WEATHER_CONFIG.uvDescriptions.high.max) return WEATHER_CONFIG.uvDescriptions.high;
    if (uvi <= WEATHER_CONFIG.uvDescriptions.veryHigh.max) return WEATHER_CONFIG.uvDescriptions.veryHigh;
    return WEATHER_CONFIG.uvDescriptions.extreme;
}

// Get Weather Icon
function getWeatherIcon(iconCode) {
    if (!iconCode) return '<i class="fas fa-sun"></i>';
    
    // Map OpenWeather icon codes to Font Awesome icons
    const iconMap = {
        '01d': 'sun', '01n': 'moon',
        '02d': 'cloud-sun', '02n': 'cloud-moon',
        '03d': 'cloud', '03n': 'cloud',
        '04d': 'cloud', '04n': 'cloud',
        '09d': 'cloud-rain', '09n': 'cloud-rain',
        '10d': 'cloud-sun-rain', '10n': 'cloud-moon-rain',
        '11d': 'bolt', '11n': 'bolt',
        '13d': 'snowflake', '13n': 'snowflake',
        '50d': 'smog', '50n': 'smog'
    };
    
    const icon = iconMap[iconCode] || 'sun';
    return `<i class="fas fa-${icon}"></i>`;
}

// Update Weather Widget with real data from OpenWeather API
async function updateWeatherWidget() {
    console.log('updateWeatherWidget function called');
    const zipInput = document.getElementById('zip');
    if (!zipInput) {
        console.error('ZIP input element not found');
        return;
    }
    
    const zipCode = zipInput.value.replace(/\D/g, '');
    
    if (!zipCode || zipCode.length < 5) {
        console.log('Invalid ZIP code:', zipInput.value);
        // Show error to user
        const locationElement = document.querySelector(FORM_CONFIG.selectors.locationElement);
        if (locationElement) {
            locationElement.textContent = 'Please enter a valid 5-digit ZIP code';
        }
        return;
    }
    
    showWeatherLoading();
    
    try {
        // First, get the latitude and longitude for the ZIP code
        const geoUrl = `${WEATHER_CONFIG.geocodingUrl}?zip=${zipCode},US&appid=${WEATHER_CONFIG.apiKey}`;
        console.log('Fetching geolocation data from:', geoUrl);
        
        const geoResponse = await fetch(geoUrl);
        
        if (!geoResponse.ok) {
            const errorText = await geoResponse.text();
            console.error('Geocoding API error:', errorText);
            throw new Error(`Failed to get location data: ${geoResponse.status} ${geoResponse.statusText}`);
        }
        
        const locationData = await geoResponse.json();
        const { lat, lon } = locationData;
        
        // Then get the weather data
        const weatherUrl = `${WEATHER_CONFIG.baseUrl}?lat=${lat}&lon=${lon}` +
                         `&exclude=minutely,hourly,alerts` +
                         `&units=${WEATHER_CONFIG.units}` +
                         `&appid=${WEATHER_CONFIG.apiKey}`;
        
        console.log('Fetching weather data from:', weatherUrl);
        const weatherResponse = await fetch(weatherUrl);
        
        if (!weatherResponse.ok) {
            const errorText = await weatherResponse.text();
            console.error('Weather API error:', errorText);
            throw new Error(`Failed to get weather data: ${weatherResponse.status} ${weatherResponse.statusText}`);
        }
        
        const weatherData = await weatherResponse.json();
        
        // Update the UI with the real data
        updateWeatherUI(weatherData, locationData.name);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        
        // Show error to user
        const locationElement = document.querySelector(FORM_CONFIG.selectors.locationElement);
        if (locationElement) {
            locationElement.textContent = 'Error loading weather data. Please try again.';
        }
        
        // Show error in weather content
        const weatherContent = document.querySelector(`${FORM_CONFIG.selectors.weatherWidget} .weather-content`);
        if (weatherContent) {
            weatherContent.innerHTML = `
                <div class="weather-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Unable to load weather data. Please check your ZIP code and try again.</p>
                    ${error.message ? `<p class="error-detail">${error.message}</p>` : ''}
                </div>`;
        }
        
        // Fall back to mock data if available
        if (WEATHER_CONFIG.mockData) {
            console.log('Falling back to mock data');
            updateWeatherUI(WEATHER_CONFIG.mockData, 'Example Location');
        }
    } finally {
        hideWeatherLoading();
    }
}

// Update the UI with weather data
function updateWeatherUI(weatherData, locationName) {
    const current = weatherData.current;
    const timezoneOffset = weatherData.timezone_offset * 1000; // Convert to milliseconds
    
    // Update location
    if (locationElement) {
        locationElement.textContent = locationName || 'Your Location';
    }
    
    // Update current weather
    if (temperatureElement) {
        temperatureElement.textContent = `${Math.round(current.temp)}°F`;
    }
    
    if (weatherConditionElement) {
        const condition = current.weather[0].description;
        weatherConditionElement.textContent = condition.charAt(0).toUpperCase() + condition.slice(1);
    }
    
    // Update weather icon
    if (weatherIconElement) {
        const iconCode = current.weather[0].icon;
        weatherIconElement.innerHTML = getWeatherIcon(iconCode);
    }
    
    // Update UV index
    if (uvIndexElement && uvBarElement) {
        const uvi = Math.round(current.uvi * 10) / 10; // Round to 1 decimal place
        const uvDesc = getUvDescription(uvi);
        
        uvIndexElement.textContent = `UV Index: ${uvi} (${uvDesc.text})`;
        uvIndexElement.style.color = uvDesc.color;
        
        // Update UV bar
        const uvPercentage = Math.min((uvi / 11) * 100, 100); // Cap at 100%
        uvBarElement.style.width = `${uvPercentage}%`;
        uvBarElement.style.backgroundColor = uvDesc.color;
    }
    
    // Update additional weather info
    if (weatherInfoElement) {
        weatherInfoElement.innerHTML = `
            <div class="weather-info-item">
                <i class="fas fa-tint"></i>
                <span>${current.humidity}%</span>
            </div>
            <div class="weather-info-item">
                <i class="fas fa-wind"></i>
                <span>${Math.round(current.wind_speed)} mph</span>
            </div>
            <div class="weather-info-item">
                <i class="fas fa-sun"></i>
                <span>${current.clouds}%</span>
            </div>
        `;
    }
    
    // Update forecast
    if (forecastDaysElement && weatherData.daily) {
        updateForecast(weatherData.daily, weatherData.timezone, timezoneOffset);
    }
    
    // Show a random solar tip
    if (solarTipElement && WEATHER_CONFIG.solarTips.length > 0) {
        const randomTip = WEATHER_CONFIG.solarTips[Math.floor(Math.random() * WEATHER_CONFIG.solarTips.length)];
        solarTipElement.textContent = randomTip;
    }
}

// Show loading state for weather widget
function showWeatherLoading() {
    const weatherWidget = document.querySelector(FORM_CONFIG.selectors.weatherWidget);
    if (!weatherWidget) {
        console.error('Weather widget element not found');
        return;
    }
    
    // Add loading class and update UI
    weatherWidget.classList.add('loading');
    
    // Update location text to show loading state
    const locationElement = document.querySelector(FORM_CONFIG.selectors.locationElement);
    if (locationElement) {
        locationElement.textContent = 'Loading weather data...';
    }
    
    // Clear any previous weather data
    const weatherContent = weatherWidget.querySelector('.weather-content');
    if (weatherContent) {
        weatherContent.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Fetching weather data...</div>';
    }
}

// Hide loading state for weather widget
function hideWeatherLoading() {
    const weatherWidget = document.querySelector(FORM_CONFIG.selectors.weatherWidget);
    if (!weatherWidget) {
        console.error('Weather widget element not found');
        return;
    }
    
    // Remove loading class
    weatherWidget.classList.remove('loading');
    
    // Clear any loading spinners
    const loadingSpinners = weatherWidget.querySelectorAll('.loading-spinner');
    loadingSpinners.forEach(spinner => spinner.remove());
    
    // Restore default location text if no location is set
    const locationElement = document.querySelector(FORM_CONFIG.selectors.locationElement);
    if (locationElement && !locationElement.textContent.trim()) {
        locationElement.textContent = 'Enter ZIP code for weather data';
    }
}

// Update Forecast
function updateForecast(forecastData, timezone, timezoneOffset) {
    forecastDaysElement.innerHTML = '';
    
    // Show next 5 days (skip today)
    for (let i = 1; i <= 5; i++) {
        const day = forecastData[i] || forecastData[0]; // Fallback to first day if not enough data
        const date = new Date((day.dt * 1000) + timezoneOffset);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.temp.day);
        const icon = day.weather[0].icon;
        
        const dayElement = document.createElement('div');
        dayElement.className = 'forecast-day';
        dayElement.innerHTML = `
            <div class="forecast-day-name">${dayName}</div>
            <div class="forecast-icon">${getWeatherIcon(icon)}</div>
            <div class="forecast-temp">${temp}°</div>
        `;
        
        forecastDaysElement.appendChild(dayElement);
    }
}
    
// Removed duplicate DOMContentLoaded event listener - initialization is now handled in the main listener above
    
    // ZIP code input - update weather when ZIP changes
    const zipInput = document.getElementById('zip');
    if (zipInput) {
        // Update weather when ZIP code changes
        zipInput.addEventListener('blur', function() {
            if (this.value.length >= 5) {
                updateWeatherWidget();
            }
        });
        
        // Format ZIP code as user types (12345 or 12345-6789)
        zipInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = `${value.slice(0, 5)}-${value.slice(5, 9)}`;
            }
            e.target.value = value;
            
            // Validate ZIP code format
            const zipRegex = /^\d{5}(-\d{4})?$/;
            if (value && !zipRegex.test(value)) {
                this.setCustomValidity('Please enter a valid ZIP code (e.g., 12345 or 12345-6789)');
                this.reportValidity();
            } else {
                this.setCustomValidity('');
            }
        });
        
        // Remove any previous error messages when focusing on the field
        zipInput.addEventListener('focus', function() {
            this.setCustomValidity('');
        });
    }
    
    // Form submission handler
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            // Validate all required fields
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Add error message if it doesn't exist
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                } else {
                    field.classList.remove('error');
                    // Remove any existing error message
                    if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
                        field.nextElementSibling.remove();
                    }
                }
            });
            
            if (!isValid) {
                // Scroll to the first error
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
    
    // New Quote button handler
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', function() {
            if (form) {
                // If not on the last step, go to next step
                if (currentStep < progressSteps.length - 1) {
                    // Validate current step before proceeding
                    const currentFields = formSections[currentStep];
                    let isValid = true;
                    
                    currentFields.forEach(fieldName => {
                        const field = form.querySelector(`[name="${fieldName}"]`);
                        if (field && field.required && !field.value.trim()) {
                            isValid = false;
                            field.classList.add('error');
                            
                            // Add error message if not already present
                            if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                                const errorMsg = document.createElement('div');
                                errorMsg.className = 'error-message';
                                errorMsg.textContent = 'This field is required';
                                field.parentNode.insertBefore(errorMsg, field.nextSibling);
                            }
                        }
                    });
                    
                    if (!isValid) {
                        // Show error message or alert
                        return;
                    }
                    
                    // Proceed to next step
                    currentStep++;
                    updateProgress();
                } else {
                    // On the last step, submit the form
                    form.dispatchEvent(new Event('submit'));
                }
            }
        });
    }
    
    // Add Previous button functionality
    const prevButton = document.createElement('button');
    prevButton.type = 'button';
    prevButton.className = 'btn btn-secondary';
    prevButton.textContent = 'Previous';
    prevButton.style.marginRight = '10px';
    prevButton.style.display = 'none';
    
    // Insert the Previous button before the Next/Submit button
    if (newQuoteBtn && newQuoteBtn.parentNode) {
        newQuoteBtn.parentNode.insertBefore(prevButton, newQuoteBtn);
    }
    
    // Handle Previous button click
    prevButton.addEventListener('click', function() {
        if (currentStep > 0) {
            currentStep--;
            updateProgress();
            
            // Show/hide Previous button based on current step
            prevButton.style.display = currentStep === 0 ? 'none' : 'inline-block';
        }
    });
    
    // Reset form handler
    const resetForm = function() {
        if (form) {
            // Reset the form
            form.reset();
            
            // Reset any error states
            const errorMessages = form.querySelectorAll('.error-message');
            errorMessages.forEach(el => el.remove());
            
            const errorFields = form.querySelectorAll('.error');
            errorFields.forEach(el => el.classList.remove('error'));
            
            // Reset the submit button state
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Get My Solar Quote';
            }
            
            // Reset progress
            currentStep = 0;
            updateProgress();
            
            // Hide Previous button on reset
            if (prevButton) prevButton.style.display = 'none';
            
            // Show the form and hide thank you message
            if (form) form.style.display = 'block';
            if (thankYouMessage) thankYouMessage.style.display = 'none';
            
            // Reset the weather widget
            showWeatherLoading();
            
            // Fade in the form
            setTimeout(() => {
                if (form) form.style.opacity = '1';
                
                // Scroll to the top of the form
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Update weather widget with default location
                updateWeatherWidget();
            }, 300);
        }
    };
    
    // Set up the new quote button
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', resetForm);
    }
    
    // Set up the test weather button
    const testWeatherBtn = document.getElementById('testWeatherBtn');
    if (testWeatherBtn) {
        testWeatherBtn.addEventListener('click', function() {
            console.log('Test Weather button clicked');
            updateWeatherWidget();
        });
    }
    
    // Real-time validation for required fields
    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.required && !this.value.trim()) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            });
            
            // Clear error on input
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('error');
                }
            });
        });
    }
});
