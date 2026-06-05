
$(document).ready(function() {
    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800, 'easeInOutQuart');
        }
    });

    // Navbar scroll effect
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 100) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });

    // Mobile menu toggle
    $('.hamburger').on('click', function() {
        $('.nav-menu').toggleClass('active');
        $(this).toggleClass('active');
    });

    // Close mobile menu on link click
    $('.nav-menu a').on('click', function() {
        $('.nav-menu').removeClass('active');
        $('.hamburger').removeClass('active');
    });

    // Hero CTA buttons
    $('#bookNow').on('click', function() {
        openBookingModal();
    });

    $('.secondary').on('click', function() {
        $('html, body').animate({
            scrollTop: $('#services').offset().top - 80
        }, 800);
    });

    // Service cards booking buttons
    $('.service-btn').on('click', function() {
        const serviceType = $(this).closest('.service-card').data('service');
        openBookingModal(serviceType);
    });

    // Testimonials slider
    let currentTestimonial = 0;
    const totalTestimonials = $('.testimonial').length;

    $('.next').on('click', function() {
        nextTestimonial();
    });

    $('.prev').on('click', function() {
        prevTestimonial();
    });

    // Auto slide testimonials
    setInterval(function() {
        nextTestimonial();
    }, 5000);

    function nextTestimonial() {
        $('.testimonial').eq(currentTestimonial).removeClass('active');
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        $('.testimonial').eq(currentTestimonial).addClass('active');
    }

    function prevTestimonial() {
        $('.testimonial').eq(currentTestimonial).removeClass('active');
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        $('.testimonial').eq(currentTestimonial).addClass('active');
    }

    // Booking modal
    function openBookingModal(serviceType = '') {
        $('#serviceType').val(serviceType);
        $('#bookingModal').fadeIn(300);
        $('body').addClass('no-scroll');
    }

    $('.close, .modal').on('click', function(e) {
        if (e.target === this) {
            closeBookingModal();
        }
    });

    function closeBookingModal() {
        $('#bookingModal').fadeOut(300);
        $('body').removeClass('no-scroll');
    }

    // Form submission
    $('#bookingForm').on('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            service: $('#serviceType option:selected').text(),
            name: $('#name').val(),
            phone: $('#phone').val(),
            address: $('#address').val(),
            datetime: $('#datetime').val()
        };

        if (validateForm(formData)) {
            // Simulate API call
            showBookingSuccess(formData);
        }
    });

    function validateForm(data) {
        if (!data.name || !data.phone || !data.address || !data.datetime || !data.service) {
            alert('Please fill all fields correctly!');
            return false;
        }
        if (!/^\d{10}$/.test(data.phone.replace(/\s/g, ''))) {
            alert('Please enter a valid 10-digit phone number!');
            return false;
        }
        return true;
    }

    function showBookingSuccess(data) {
        const message = `Thank you ${data.name}! Your ${data.service} booking is confirmed for ${new Date(data.datetime).toLocaleString('en-IN')}. We'll call you shortly on ${data.phone}.`;
        
        // Create success modal or alert
        $('<div class="success-popup">')
            .html(`
                <div class="success-content">
                    <i class="fas fa-check-circle"></i>
                    <h3>Booking Confirmed!</h3>
                    <p>${message}</p>
                    <button onclick="this.parentElement.parentElement.remove()">Close</button>
                </div>
            `)
            .appendTo('body')
            .fadeIn(300);

        // Reset form
        $('#bookingForm')[0].reset();
        closeBookingModal();

        // Scroll to top
        $('html, body').animate({ scrollTop: 0 }, 500);
    }

    // Staggered animations on scroll
    function animateOnScroll() {
        $('.service-card, .feature').each(function() {
            const elementTop = $(this).offset().top;
            const elementVisible = 150;
            
            if ($(window).scrollTop() + $(window).height() > elementTop + elementVisible) {
                $(this).addClass('animate');
            }
        });
    }

    $(window).on('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Add animate class with CSS transition
    setTimeout(function() {
        $('.service-card, .feature').addClass('animate');
    }, 100);

    // Floating cards animation enhancement
    $('.float1').addClass('animate-float');
    setTimeout(() => $('.float2').addClass('animate-float'), 500);
    setTimeout(() => $('.float3').addClass('animate-float'), 1000);

    // Success popup styles (inline)
    const successStyle = `
        .success-popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 3000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .success-content {
            background: white;
            padding: 3rem;
            border-radius: 20px;
            text-align: center;
            max-width: 500px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .success-content i {
            font-size: 4rem;
            color: var(--success);
            margin-bottom: 1rem;
        }
        .success-content h3 {
            margin-bottom: 1rem;
            color: var(--text-dark);
        }
        .success-content button {
            background: var(--success);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 600;
        }
    `;
    $('<style>').text(successStyle).appendTo('head');

    // Prevent body scroll when modal open
    $('body').on('touchmove', function(e) {
        if ($('#bookingModal').is(':visible')) {
            e.preventDefault();
        }
    });

    // Typing effect for hero title (optional enhancement)
    const heroTitle = $('.hero-title');
    const text = heroTitle.text();
    heroTitle.html('');
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroTitle.html(text.substring(0, i + 1));
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    setTimeout(typeWriter, 500);
});

// Smooth scrolling easing function
jQuery.extend( jQuery.easing, {
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    }
});

// Intersection Observer for better performance (modern browsers)
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('in-view');
            }
        });
    }, { threshold: 0.1 });

    $('.service-card, .feature').each(function() {
        observer.observe(this);
    });
}

