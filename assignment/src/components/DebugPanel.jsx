import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { debugLocalStorage, clearAllData, createTestAccount } from '../utils/debug.js';

export default function DebugPanel() {
	const handleDebug = () => {
		debugLocalStorage();
	};

	const handleClear = () => {
		if (window.confirm('Are you sure you want to clear all data?')) {
			clearAllData();
			window.location.reload();
		}
	};

	const handleCreateTest = () => {
		createTestAccount();
		window.location.reload();
	};

	return (
		<Card className="mb-3">
			<Card.Header>Debug Panel</Card.Header>
			<Card.Body>
				<Button variant="info" onClick={handleDebug} className="me-2">
					Debug localStorage
				</Button>
				<Button variant="warning" onClick={handleCreateTest} className="me-2">
					Create Test Account
				</Button>
				<Button variant="danger" onClick={handleClear}>
					Clear All Data
				</Button>
			</Card.Body>
		</Card>
	);
}
