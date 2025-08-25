import React, { useCallback, useEffect, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export default function NavBarFilter({ onSearchChange, onSortChange }) {
	const [query, setQuery] = useState('');
	const [sort, setSort] = useState('name-asc');

	// debounce query
	useEffect(() => {
		const t = setTimeout(() => onSearchChange?.(query), 300);
		return () => clearTimeout(t);
	}, [query, onSearchChange]);

	useEffect(() => {
		onSortChange?.(sort);
	}, [sort, onSortChange]);

	const handleQuery = useCallback((e) => setQuery(e.target.value), []);
	const handleSort = useCallback((e) => setSort(e.target.value), []);

	return (
		<Form className="my-3">
			<Row className="g-2">
				<Col xs={12} md={8}>
					<Form.Control placeholder="Search by title..." value={query} onChange={handleQuery} />
				</Col>
				<Col xs={12} md={4}>
					<Form.Select value={sort} onChange={handleSort}>
						<option value="name-asc">Name A→Z</option>
						<option value="price-asc">Price Ascending</option>
						<option value="price-desc">Price Descending</option>
					</Form.Select>
				</Col>
			</Row>
		</Form>
	);
}


