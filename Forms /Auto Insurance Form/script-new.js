// Initialize form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('insuranceForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
    }
    
    // Form submission
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // New quote button
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', resetForm);
    }
    
    function formatPhoneNumber(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
    }
    
    function validateForm(formData) {
        const errors = [];
        
        // Required field validation
        const requiredFields = ['first_name', 'last_name', 'email', 'phone', 'address', 'city', 'state', 'zip', 'birthdate'];
        requiredFields.forEach(field => {
            if (!formData.get(field)) {
                errors.push(`Please fill in the ${field.replace('_', ' ')} field`);
            }
        });
        
        // Email validation
        const email = formData.get('email');
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('Please enter a valid email address');
        }
        
        // Phone validation
        const phone = formData.get('phone').replace(/\D/g, '');
        if (phone && phone.length < 10) {
            errors.push('Please enter a valid phone number');
        }
        
        // ZIP code validation
        const zip = formData.get('zip');
        if (zip && !/^\d{5}(-\d{4})?$/.test(zip)) {
            errors.push('Please enter a valid ZIP code');
        }
        
        return errors;
    }
    
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        const formData = new FormData(this);
        const errors = validateForm(formData);
        
        if (errors.length > 0) {
            alert(errors.join('\n'));
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            return;
        }
        
        try {
            // Add required fields for LeadsPedia
            formData.append('lp_request_id', 'req_' + Date.now());
            formData.append('lp_s1', 'form_submit');
            formData.append('lp_s2', 'auto_insurance');
            
            // Log form data (for testing)
            console.log('Form data:', Object.fromEntries(formData.entries()));
            
            // Submit to LeadsPedia
            await submitToLeadsPedia(formData);
            
            // Show success message
            form.style.display = 'none';
            thankYouMessage.style.display = 'block';
            
            // Reset form
            this.reset();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting your form. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    }
    
    async function submitToLeadsPedia(formData) {
        // In a real implementation, this would make an actual API call
        console.log('Would submit to LeadsPedia:', Object.fromEntries(formData.entries()));
        return new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000));
    }
    
    function resetForm() {
        thankYouMessage.style.display = 'none';
        form.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
