# Requirements Document

## Introduction

QR Menu SaaS is a multi-tenant platform that enables restaurant owners to create, manage, and deploy QR code-based digital menus. The system allows restaurants to register, customize their menu appearance, manage products and categories, generate QR codes for tables, and serve menus through unique subdomains. The platform targets Turkish restaurants and supports multiple languages and currencies.

## Glossary

- **QR Menu Platform**: The complete SaaS system that hosts and manages digital menus for multiple restaurants
- **Landing Site**: The public-facing marketing website that introduces the platform and its features
- **Restaurant Owner**: A user who registers their restaurant and manages menu content
- **Restaurant Panel**: The administrative dashboard where restaurant owners manage their menu, categories, products, and settings
- **Super Admin Panel**: The platform administrator interface for monitoring all restaurants, users, payments, and system metrics
- **Platform Administrator**: The system owner who has access to the Super Admin Panel
- **Digital Menu**: The customer-facing menu interface accessed via QR code through restaurant subdomain
- **Subdomain**: A unique URL prefix assigned to each restaurant (e.g., restaurant-name.domain.com)
- **Category**: A grouping of menu items (e.g., Starters, Main Courses, Beverages)
- **Product**: An individual menu item with name, description, price, and optional image
- **QR Code**: A scannable code that directs customers to the restaurant's digital menu
- **Theme**: Visual customization settings including colors, fonts, and layout
- **Allergen Information**: Dietary and allergy-related information for menu items
- **Stock Status**: Availability indicator for menu items (available or sold out)
- **Subscription**: A payment plan that grants restaurant owners access to platform features

## Requirements

### Requirement 1: Restaurant Registration and Authentication

**User Story:** As a restaurant owner, I want to register my restaurant and securely log in, so that I can access the menu management system.

#### Acceptance Criteria

1. WHEN a restaurant owner submits valid registration information (restaurant name, email, password, phone), THE QR Menu Platform SHALL create a new restaurant account with a unique subdomain slug
2. WHEN a restaurant owner attempts to register with an email that already exists, THE QR Menu Platform SHALL display an error message indicating the email is already in use
3. WHEN a registered restaurant owner submits valid login credentials, THE QR Menu Platform SHALL authenticate the user and grant access to the Menu Management System
4. WHEN a restaurant owner requests password reset, THE QR Menu Platform SHALL send a password reset link to the registered email address
5. THE QR Menu Platform SHALL enforce password requirements of minimum 8 characters with at least one uppercase letter, one lowercase letter, and one number

### Requirement 2: Category Management

**User Story:** As a restaurant owner, I want to create and organize menu categories, so that my menu items are logically grouped for customers.

#### Acceptance Criteria

1. WHEN a restaurant owner creates a new category with a valid name, THE Menu Management System SHALL save the category and associate it with the restaurant
2. WHEN a restaurant owner updates a category name, THE Menu Management System SHALL update the category while preserving all associated products
3. WHEN a restaurant owner deletes a category, THE Menu Management System SHALL prompt for confirmation and remove the category along with its product associations
4. THE Menu Management System SHALL allow restaurant owners to reorder categories by drag-and-drop or position number
5. WHEN displaying categories to customers, THE Digital Menu SHALL show categories in the order specified by the restaurant owner

### Requirement 3: Product Management

**User Story:** As a restaurant owner, I want to add, edit, and manage menu items with details, so that customers see accurate and complete product information.

#### Acceptance Criteria

1. WHEN a restaurant owner creates a product with name, price, category, and optional description, THE Menu Management System SHALL save the product and associate it with the specified category
2. WHEN a restaurant owner uploads a product image, THE Menu Management System SHALL store the image and associate it with the product
3. WHEN a restaurant owner adds allergen information to a product, THE Menu Management System SHALL save the allergen data and display it on the Digital Menu
4. WHEN a restaurant owner marks a product as sold out, THE Menu Management System SHALL update the stock status and THE Digital Menu SHALL display a sold-out indicator
5. WHEN a restaurant owner deletes a product, THE Menu Management System SHALL remove the product from all categories and the Digital Menu

### Requirement 4: Visual Customization

**User Story:** As a restaurant owner, I want to customize my menu's appearance with my brand colors and logo, so that the digital menu reflects my restaurant's identity.

#### Acceptance Criteria

1. WHEN a restaurant owner uploads a logo image, THE Menu Management System SHALL store the logo and display it on the Digital Menu header
2. WHEN a restaurant owner selects brand colors (primary and secondary), THE Menu Management System SHALL apply these colors to the Digital Menu theme
3. WHEN a restaurant owner uploads a cover photo, THE Menu Management System SHALL display the cover photo on the Digital Menu landing page
4. WHERE a restaurant owner selects a pre-built theme option, THE Menu Management System SHALL apply the theme's color scheme and layout to the Digital Menu
5. THE QR Menu Platform SHALL provide at least 3 pre-built theme options for restaurant owners to choose from

### Requirement 5: QR Code Generation and Management

**User Story:** As a restaurant owner, I want to generate QR codes for my tables, so that customers can scan and access the digital menu.

#### Acceptance Criteria

1. WHEN a restaurant owner requests QR code generation, THE QR Menu Platform SHALL create a QR code that links to the restaurant's subdomain
2. WHEN a restaurant owner specifies a table number, THE QR Menu Platform SHALL generate a QR code with the table number parameter embedded in the URL
3. WHEN a restaurant owner requests QR code download, THE QR Menu Platform SHALL provide the QR code in PNG format with minimum 300 DPI resolution
4. THE QR Menu Platform SHALL allow restaurant owners to generate multiple QR codes with different table numbers in a single batch operation
5. WHEN a customer scans a QR code, THE QR Menu Platform SHALL redirect to the restaurant's Digital Menu with the table number displayed

### Requirement 6: Multi-language and Currency Support

**User Story:** As a restaurant owner, I want to set my menu's language and currency, so that customers see prices and content in the appropriate format.

#### Acceptance Criteria

1. WHEN a restaurant owner selects a primary language (Turkish or English), THE Menu Management System SHALL save the language preference
2. WHEN displaying the Digital Menu, THE QR Menu Platform SHALL show all interface elements in the selected language
3. WHEN a restaurant owner selects a currency (TRY, USD, EUR), THE Menu Management System SHALL save the currency preference
4. WHEN displaying product prices, THE Digital Menu SHALL format prices according to the selected currency with appropriate symbol and decimal places
5. WHERE a restaurant owner adds product names and descriptions in multiple languages, THE Digital Menu SHALL display content in the language matching the customer's browser preference or default to the primary language

### Requirement 7: Subdomain Routing and Menu Display

**User Story:** As a customer, I want to access a restaurant's menu through a unique URL, so that I can view the menu on my mobile device.

#### Acceptance Criteria

1. WHEN a restaurant account is created, THE QR Menu Platform SHALL generate a unique subdomain based on the restaurant name slug
2. WHEN a customer navigates to a restaurant's subdomain, THE QR Menu Platform SHALL load and display the restaurant's Digital Menu
3. WHEN a customer views the Digital Menu on a mobile device, THE QR Menu Platform SHALL display a responsive layout optimized for mobile screens
4. WHEN a customer views the Digital Menu on a desktop device, THE QR Menu Platform SHALL display a responsive layout optimized for larger screens
5. IF a customer navigates to a non-existent subdomain, THEN THE QR Menu Platform SHALL display a 404 error page

### Requirement 8: Analytics Tracking

**User Story:** As a restaurant owner, I want to see how many times my menu has been viewed, so that I can understand customer engagement.

#### Acceptance Criteria

1. WHEN a customer accesses a restaurant's Digital Menu, THE QR Menu Platform SHALL record a menu view event with timestamp
2. WHEN a restaurant owner accesses the analytics dashboard, THE Restaurant Panel SHALL display the total number of menu views
3. THE Restaurant Panel SHALL display menu view statistics grouped by day for the past 30 days
4. WHEN a customer scans a QR code with a table number, THE QR Menu Platform SHALL record which table was scanned
5. THE Restaurant Panel SHALL display a breakdown of views by table number for the past 30 days

### Requirement 9: Landing Site and Marketing

**User Story:** As a potential customer, I want to learn about the QR Menu platform and its features, so that I can decide whether to register my restaurant.

#### Acceptance Criteria

1. WHEN a visitor navigates to the main domain, THE Landing Site SHALL display an overview of platform features and benefits
2. THE Landing Site SHALL display pricing information for different subscription tiers
3. WHEN a visitor clicks the registration call-to-action, THE Landing Site SHALL redirect to the restaurant registration page
4. THE Landing Site SHALL display example digital menus and QR code demonstrations
5. THE Landing Site SHALL provide contact information and support options for potential customers

### Requirement 10: Restaurant Panel Access and Navigation

**User Story:** As a restaurant owner, I want to access a dedicated dashboard to manage all aspects of my digital menu, so that I can efficiently update my restaurant information.

#### Acceptance Criteria

1. WHEN a restaurant owner logs in successfully, THE QR Menu Platform SHALL redirect to the Restaurant Panel dashboard
2. THE Restaurant Panel SHALL display navigation menu with sections for Menu Management, QR Codes, Customization, Analytics, and Settings
3. WHEN a restaurant owner navigates between sections, THE Restaurant Panel SHALL maintain session state and display the selected section
4. THE Restaurant Panel SHALL display the restaurant name and logo in the header
5. WHEN a restaurant owner logs out, THE Restaurant Panel SHALL clear the session and redirect to the login page

### Requirement 11: Super Admin Panel Access and Monitoring

**User Story:** As a platform administrator, I want to monitor all restaurants and system metrics, so that I can manage the platform effectively.

#### Acceptance Criteria

1. WHEN a platform administrator logs in with super admin credentials, THE QR Menu Platform SHALL grant access to the Super Admin Panel
2. THE Super Admin Panel SHALL display total number of registered restaurants with active and inactive status breakdown
3. THE Super Admin Panel SHALL display a list of all restaurants with registration date, subscription status, and last activity
4. WHEN a platform administrator views a restaurant's details, THE Super Admin Panel SHALL display the restaurant's menu statistics, subscription information, and contact details
5. THE Super Admin Panel SHALL allow platform administrators to search and filter restaurants by name, status, or registration date

### Requirement 12: Payment and Subscription Management

**User Story:** As a platform administrator, I want to track restaurant subscriptions and payments, so that I can manage billing and revenue.

#### Acceptance Criteria

1. WHEN a restaurant owner selects a subscription plan, THE QR Menu Platform SHALL record the subscription details with start date and billing cycle
2. THE Super Admin Panel SHALL display a list of all active subscriptions with restaurant name, plan type, amount, and next billing date
3. WHEN a payment is processed, THE QR Menu Platform SHALL record the payment transaction with amount, date, and status
4. THE Super Admin Panel SHALL display payment history for each restaurant with transaction details
5. WHEN a subscription expires or payment fails, THE QR Menu Platform SHALL update the restaurant status and restrict access to the Restaurant Panel

### Requirement 13: Multi-Site Architecture

**User Story:** As a system user, I want to access different parts of the platform through appropriate URLs, so that I can navigate between landing site, restaurant panel, and digital menus.

#### Acceptance Criteria

1. WHEN a user navigates to the main domain (e.g., qrmenu.app), THE QR Menu Platform SHALL display the Landing Site
2. WHEN a user navigates to the panel subdomain (e.g., panel.qrmenu.app), THE QR Menu Platform SHALL display the Restaurant Panel login page
3. WHEN a user navigates to the admin subdomain (e.g., admin.qrmenu.app), THE QR Menu Platform SHALL display the Super Admin Panel login page
4. WHEN a customer navigates to a restaurant subdomain (e.g., restaurant-name.qrmenu.app), THE QR Menu Platform SHALL display the restaurant's Digital Menu
5. THE QR Menu Platform SHALL handle subdomain routing and serve appropriate content based on the subdomain prefix
