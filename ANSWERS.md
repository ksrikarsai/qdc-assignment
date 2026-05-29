# Answers

## 1.
The current in-memory array works for a small application, but it would not scale well for a production QDC system. I would replace it with a database such as PostgreSQL and use efficient SQL queries for faster data retrieval and updates. Data would be stored in a cloud-hosted database to ensure reliability, scalability, and backup support. I would introduce a separate data access/repository layer so that business logic remains independent of database operations. Additionally, role-based dashboards can be provided for staff, managers, and administrators to improve workflow visibility. Continuous feedback and monitoring would also help identify performance issues and improve the system over time.

## 2.
The current approach is simple because it directly returns an error object when an order is not found. However, in a real-world application, exposing technical details to users is not ideal. Instead, I would return user-friendly error messages while logging the detailed error information on the server for developers and maintainers. I would also use proper HTTP status codes such as 404 for missing orders and 500 for server errors. This improves security, debugging, and provides a better user experience.

## 3.
As the application grows, I would organize the frontend into separate folders and files for components, pages, services, and utilities. API calls would be moved into dedicated service files instead of being written directly inside components. React components can be modularized into reusable parts such as filters, tables, and pagination controls. I would also use suitable packages and state management solutions when needed to handle complex data and multiple API calls. This makes the code easier to maintain, scale, and debug.

## 4.
The current models are quite simple and do not include important information required for real-world laundry operations. They lack billing information, payment status, customer contact details, additional notes or special instructions, garment quantity, and order timestamps such as pickup, delivery, and completion dates. The model could also be extended to support prepaid packages, delivery tracking, damage reports, and multiple workflow stages. Adding these fields would make the system more practical and capable of handling real business requirements.

## 5.
One of the biggest risks of AI-generated code is security. AI may generate code that works functionally but contains security vulnerabilities, inefficient queries, or poor validation. It can also misunderstand the project context and generate code that is either overly complex or too simplistic for the actual requirement. In my experience, AI sometimes ignores important edge cases and test scenarios, which can lead to bugs in production. Before shipping features, I would manually review the code, perform security checks, test edge cases, verify business requirements, and conduct code reviews to ensure the implementation is reliable, secure, and maintainable.

## 6.
Currently, users need to refresh the page to see new data. To support near real-time updates, I would either fetch updated data every few seconds or use WebSockets to automatically send updates from the server. While frequent fetching is simpler to build, it can increase server load. WebSockets provide a better user experience but are more complex to manage.
