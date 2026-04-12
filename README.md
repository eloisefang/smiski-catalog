# Smiski Dex 🌱

A fan-made Smiski catalog, collection tracker, and community platform designed for collectors to explore, organize, and trade their Smiski figures.

## Overview

Smiski Dex is a full-stack web application that allows users to browse a complete catalog of Smiski figures, track which ones they own, and interact with a community through trading and showcase posts.

The goal of this project is to combine a clean, minimal user interface with practical full-stack features such as authentication, database integration, and user-generated content.

## Features

* 📚 **Catalog System**

  * Browse Smiski figures by series and type
  * Search by name or tags
  * Filter by series, type, and ownership

* 🧍 **Collection Tracking**

  * Mark Smiskis as "owned"
  * View your personal collection
  * Filter catalog to show owned items only

* 🌐 **Community Platform**

  * Create trade and showcase posts
  * Upload images
  * View posts from other users
  * (Planned) reporting and moderation system

* 🔐 **Authentication**

  * User login via Supabase (OAuth)
  * Personalized data (owned items, posts)

## Tech Stack

* **Frontend**

  * Next.js
  * React
  * TypeScript
  * Tailwind CSS

* **Backend / Services**

  * Supabase (Authentication, Database, Storage)

* **Deployment**

  * Vercel
 
## Architecture

This project follows a hybrid structure that separates static and dynamic data:

* **Static Data**

  * Smiski catalog is stored as structured TypeScript objects
  * Used for fast rendering and filtering

* **Dynamic Data**

  * User-owned items
  * Community posts (trade / showcase)
  * Stored and managed via Supabase

The frontend directly communicates with Supabase (Backend-as-a-Service), avoiding the need for a custom API server.

## Key Learnings

During development, I worked through several real-world challenges:

* Configuring OAuth authentication and handling redirect URLs
* Managing differences between local and deployed environments
* Designing a clean separation between static catalog data and user-specific data
* Implementing user permissions (e.g., deleting own posts)
* Handling image uploads and validation
* Resolving Next.js hydration issues

## Future Improvements

* User profiles and collection stats
* Advanced trading system (matching, status tracking)
* Comment and like system
* Admin moderation tools
* Moving catalog data to a database for scalability
  
## Disclaimer

This is a fan-made project and is not affiliated with or endorsed by the official Smiski brand or its creators.

All character designs, names, and related assets belong to their respective owners. This project is for educational and portfolio purposes only.

---

## Author

Developed by Eloise Fang

---
