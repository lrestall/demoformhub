document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('insuranceForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const newQuoteBtn = document.getElementById('newQuoteBtn');

    // Format phone number
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
        });
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = form.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            try {
                // Get form data
                const formData = new FormData(form);
                const formDataObj = Object.fromEntries(formData.entries());
                
                // Add timestamp and other required fields
                formDataObj.lp_request_id = 'req_' + Date.now();
                formDataObj.lp_response = 'json';
                
                // Log form data (for testing)
                console.log('Form data:', formDataObj);
                
                // Simulate API call (replace with actual API endpoint)
                const response = await submitFormData(formDataObj);
                
                // Show success message
                form.style.display = 'none';
                thankYouMessage.style.display = 'block';
                
                // Reset form
                form.reset();
                
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error submitting your form. Please try again.');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
    
    // New quote button
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', function() {
            thankYouMessage.style.display = 'none';
            form.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// Function to submit form data to LeadsPedia
async function submitFormData(formData) {
    // This is a placeholder for the actual API endpoint
    const API_ENDPOINT = 'https://post.leadspediatrack.com/post.do';
    
    // Convert form data to URL-encoded string
    const formBody = Object.entries(formData)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody,
            mode: 'no-cors' // Handle CORS
        });
        
        // Since we're using no-cors, we can't read the response
        // In a real implementation, you would handle the response here
        console.log('Form submitted successfully');
        return { success: true };
        
    } catch (error) {
        console.error('Error submitting to API:', error);
        throw error;
    }
}

// Initialize any third-party tracking if needed
function initializeTracking() {
    // Add any third-party tracking code here
    console.log('Tracking initialized');
}

// Call initialization functions
document.addEventListener('DOMContentLoaded', function() {
    initializeTracking();
});
