import React, { useEffect, useRef, useState } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import './HeroSlider.css';

const slides = [
	{ 
		src: '/images/slide1.png', 
		alt: 'Big Sale - Up to 30% Off',
		title: 'Big Sale',
		subtitle: 'Up to 30% Off on Premium Phones',
		description: 'Discover amazing deals on the latest smartphones',
		ctaText: 'Shop Now',
		ctaLink: '/products'
	},
	{ 
		src: '/images/slide2.png', 
		alt: 'New Arrivals This Week',
		title: 'New Arrivals',
		subtitle: 'Latest Smartphones Just In',
		description: 'Be the first to experience cutting-edge technology',
		ctaText: 'Explore New',
		ctaLink: '/products'
	},
	{ 
		src: '/images/slide3.png', 
		alt: 'Hot Picks Just For You',
		title: 'Hot Picks',
		subtitle: 'Curated Selection for You',
		description: 'Handpicked devices that match your style',
		ctaText: 'View Picks',
		ctaLink: '/products'
	}
];

export default function HeroSlider() {
	const [paused, setPaused] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const ref = useRef(null);

	useEffect(() => {
		if (!ref.current) return;
		
		// Auto-hide loading after images load
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);
		
		return () => clearTimeout(timer);
	}, []);

	const handleSelect = (selectedIndex) => {
		setActiveIndex(selectedIndex);
	};

	const handleImageLoad = () => {
		setIsLoading(false);
	};

	const handleImageError = (e) => {
		console.warn('Failed to load image:', e.target.src);
		e.target.src = '/images/placeholder.jpg';
		setIsLoading(false);
	};

	const handleCTAClick = (link) => {
		// Smooth scroll to products section if on same page
		if (link === '/products') {
			const productsSection = document.querySelector('.product-section');
			if (productsSection) {
				productsSection.scrollIntoView({ behavior: 'smooth' });
			}
		}
	};

	return (
		<section className="hero-slider-section">
			<Container fluid className="px-0">
				<div 
					className="hero-slider-wrapper"
					onMouseEnter={() => setPaused(true)} 
					onMouseLeave={() => setPaused(false)}
				>
					{isLoading && (
						<div className="loading-overlay">
							<div className="loading-spinner"></div>
						</div>
					)}
					
					<Carousel 
						pause={paused ? 'hover' : false} 
						ref={ref} 
						indicators={false} 
						interval={4000}
						onSelect={handleSelect}
						className="hero-carousel"
						fade={true}
						touch={true}
						wrap={true}
					>
						{slides.map((slide, idx) => (
							<Carousel.Item key={idx} className="hero-carousel-item">
								<div className="slide-image-container">
									<img 
										className="slide-image" 
										src={slide.src} 
										alt={slide.alt}
										onLoad={handleImageLoad}
										onError={handleImageError}
									/>
									<div className="slide-overlay"></div>
								</div>
								<Carousel.Caption className="slide-caption">
									<div className="caption-content">
										<h2 className="slide-title">{slide.title}</h2>
										<h3 className="slide-subtitle">{slide.subtitle}</h3>
										<p className="slide-description">{slide.description}</p>
										<button 
											className="slide-cta-btn"
											onClick={() => handleCTAClick(slide.ctaLink)}
										>
											{slide.ctaText}
										</button>
									</div>
								</Carousel.Caption>
							</Carousel.Item>
						))}
					</Carousel>
					
					{/* Custom Indicators */}
					<div className="custom-indicators">
						{slides.map((_, idx) => (
							<button
								key={idx}
								className={`indicator-dot ${idx === activeIndex ? 'active' : ''}`}
								onClick={() => {
									if (ref.current) {
										ref.current.select(idx);
									}
								}}
								aria-label={`Go to slide ${idx + 1}`}
							/>
						))}
					</div>
					
					{/* Progress Bar */}
					<div className="progress-bar-container">
						<div 
							className="progress-bar-fill"
							style={{ 
								width: `${((activeIndex + 1) / slides.length) * 100}%` 
							}}
						></div>
					</div>
				</div>
			</Container>
		</section>
	);
}


