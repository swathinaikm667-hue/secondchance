# Marketplace Listing App – User Story

## Overview
A web application where users can register and log in to create, update, delete, and search for items (listings). Each listing must include an image, and users can search by category or location.

## Details and Assumptions
- Users must register and log in before creating or managing listings.
- Only logged‑in users can create, edit, or delete their own listings.
- Every listing requires:
  - Title
  - Description
  - Category
  - Location
  - At least one image (image URL or file).
- Users can view all public listings.
- Category search allows filtering by predefined categories (e.g., Electronics, Furniture, Clothing).
- Location search filters listings by location (e.g., city, area).
- No public user can edit or delete another user’s listing.

## Acceptance Criteria

- [x] User registration and login  
  - Users can register with a username/email and password.
  - After registration, users can log in and access their dashboard.
  - Login status is maintained (e.g., sessions or JWT).

- [x] CRUD item operations  
  - Create: Logged‑in users can create a new listing with all required fields (including at least one image).
  - Read: Users can view all listings or their own listings.
  - Update: Logged‑in users can edit only their own listings.
  - Delete: Logged‑in users can delete only their own listings.

- [x] Category search works  
  - Users can apply a category filter (dropdown or input) to see only listings of that category.
  - The search is performed on the server side with the category field.
  - If no matching category exists, an empty or “no results” view is shown.

- [x] Images required for all listings  
  - Each listing must include at least one image (image URL or file upload, depending on backend implementation).
  - If image upload is not supported, a placeholder image is shown by default.
  - Invalid or missing image data is handled gracefully (no broken layout).

- [x] Location search works  
  - Users can filter listings by location (e.g., city, area).
  - Searching by location returns all matching listings.
  - Partial matches (e.g., similar cities) are not required unless the spec mentions it.
