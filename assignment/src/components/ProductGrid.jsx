import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col, Spinner, Pagination, Form } from 'react-bootstrap';
import ProductCard from './ProductCard.jsx';
import { getProducts } from '../services/api.js';

export default function ProductGrid({ query, sort }) {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(6);
	const [selectedBrand, setSelectedBrand] = useState('');

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const data = await getProducts();
				setProducts(data);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	// Get unique brands from products
	const brands = useMemo(() => {
		const uniqueBrands = [...new Set(products.map(p => p.name).filter(Boolean))];
		return uniqueBrands.sort();
	}, [products]);

	const visible = useMemo(() => {
		let list = products;
		
		// Filter by title query
		if (query) {
			const q = query.toLowerCase();
			list = list.filter((p) => p.title.toLowerCase().includes(q));
		}
		
		// Filter by brand
		if (selectedBrand) {
			list = list.filter((p) => p.name === selectedBrand);
		}
		
		// Sort
		if (sort === 'name-asc') list = [...list].sort((a, b) => a.title.localeCompare(b.title));
		if (sort === 'price-asc') list = [...list].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
		if (sort === 'price-desc') list = [...list].sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
		
		return list;
	}, [products, query, sort, selectedBrand]);

	// Pagination logic
	const totalPages = Math.ceil(visible.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentProducts = visible.slice(startIndex, endIndex);

	// Reset to first page when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [query, sort, selectedBrand]);

	// Reset to first page when items per page changes
	useEffect(() => {
		setCurrentPage(1);
	}, [itemsPerPage]);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleItemsPerPageChange = (e) => {
		setItemsPerPage(parseInt(e.target.value));
	};

	const handleBrandChange = (e) => {
		setSelectedBrand(e.target.value);
	};

	const renderPaginationItems = () => {
		const items = [];
		const maxVisiblePages = 5;
		let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
		let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

		// Adjust start page if we're near the end
		if (endPage - startPage + 1 < maxVisiblePages) {
			startPage = Math.max(1, endPage - maxVisiblePages + 1);
		}

		// First page
		if (startPage > 1) {
			items.push(
				<Pagination.Item key={1} onClick={() => handlePageChange(1)}>
					1
				</Pagination.Item>
			);
			if (startPage > 2) {
				items.push(<Pagination.Ellipsis key="ellipsis1" />);
			}
		}

		// Visible pages
		for (let i = startPage; i <= endPage; i++) {
			items.push(
				<Pagination.Item
					key={i}
					active={i === currentPage}
					onClick={() => handlePageChange(i)}
				>
					{i}
				</Pagination.Item>
			);
		}

		// Last page
		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				items.push(<Pagination.Ellipsis key="ellipsis2" />);
			}
			items.push(
				<Pagination.Item key={totalPages} onClick={() => handlePageChange(totalPages)}>
					{totalPages}
				</Pagination.Item>
			);
		}

		return items;
	};

	return (
		<div className="product-section">
			{loading ? (
				<div className="text-center py-5">
					<Spinner animation="border" variant="primary" />
					<p className="mt-3">Loading products...</p>
				</div>
			) : (
				<>
					{/* Brand Filter */}
					{visible.length > 0 && (
						<div className="mb-4">
							<Form.Group>
								<Form.Label>Filter by Brand:</Form.Label>
								<Form.Select
									value={selectedBrand}
									onChange={handleBrandChange}
									size="sm"
									style={{ maxWidth: '200px' }}
								>
									<option value="">All Brands</option>
									{brands.map((brand) => (
										<option key={brand} value={brand}>
											{brand}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						</div>
					)}

					{/* Products Grid */}
					{visible.length > 0 ? (
						<>
							<Row>
								{currentProducts.map((product) => (
									<Col key={product.id} xs={12} sm={6} md={4} lg={4} xl={3}>
										<ProductCard product={product} />
									</Col>
								))}
							</Row>

							{/* Pagination Controls */}
							{totalPages > 1 && (
								<div className="d-flex justify-content-between align-items-center mt-4">
									<div className="d-flex align-items-center">
										<Form.Label className="me-2 mb-0">Items per page:</Form.Label>
										<Form.Select
											value={itemsPerPage}
											onChange={handleItemsPerPageChange}
											size="sm"
											style={{ width: '80px' }}
										>
											<option value={6}>6</option>
											<option value={9}>9</option>
											<option value={12}>12</option>
										</Form.Select>
									</div>

									<Pagination className="mb-0">
										<Pagination.First
											onClick={() => handlePageChange(1)}
											disabled={currentPage === 1}
										/>
										<Pagination.Prev
											onClick={() => handlePageChange(currentPage - 1)}
											disabled={currentPage === 1}
										/>
										{renderPaginationItems()}
										<Pagination.Next
											onClick={() => handlePageChange(currentPage + 1)}
											disabled={currentPage === totalPages}
										/>
										<Pagination.Last
											onClick={() => handlePageChange(totalPages)}
											disabled={currentPage === totalPages}
										/>
									</Pagination>
								</div>
							)}
						</>
					) : (
						<div className="text-center py-5">
							<h4>No products found</h4>
							<p className="text-muted">
								Try adjusting your search criteria or filters.
							</p>
						</div>
					)}
				</>
			)}
		</div>
	);
}


