import React, { useCallback, useState } from 'react';
import { Container } from 'react-bootstrap';
import HeroSlider from '../components/HeroSlider.jsx';
import NavBarFilter from '../components/NavBarFilter.jsx';
import ProductGrid from '../components/ProductGrid.jsx';

export default function Home() {
	const [query, setQuery] = useState('');
	const [sort, setSort] = useState('name-asc');

	const onSearchChange = useCallback((q) => setQuery(q), []);
	const onSortChange = useCallback((s) => setSort(s), []);

	return (
		<>
			<HeroSlider />
			<Container className="py-4">
				<NavBarFilter onSearchChange={onSearchChange} onSortChange={onSortChange} />
				<ProductGrid query={query} sort={sort} />
			</Container>
		</>
	);
}


