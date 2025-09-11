# AI Yield Aggregator Backend

Flask backend for the AI Yield Aggregator application.

## API Endpoints

- `GET /` - Health check
- `GET /api/protocols` - Get all DeFi protocols with APY data
- `POST /api/optimize` - Optimize portfolio allocation
- `GET /api/portfolio/<address>` - Get portfolio for address
- `GET /api/analytics` - Get analytics data
- `GET /api/transaction-history/<address>` - Get transaction history
- `GET /api/portfolio-performance/<address>` - Get portfolio performance

## Deployment

This backend is configured for deployment on Railway with:
- `Procfile` for process management
- `railway.json` for Railway-specific configuration
- Environment variable support for port and debug mode
