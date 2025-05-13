# Strapi CMS Setup for DRN Moda Tekstil Services

This guide explains how to set up the Strapi CMS to manage the services content for the DRN Moda Tekstil website.

## Accessing the Strapi Admin Panel

1. Start the Strapi server (if not already running):
   ```
   cd drn-moda-cms
   npm run develop
   ```

2. Access the admin panel at: http://localhost:1337/admin

3. Create an admin account if you haven't already done so, or login with your existing credentials.

## Creating Content Types

### 1. Service Category Content Type

1. Go to Content-Type Builder in the sidebar.
2. Click "Create new collection type".
3. Name it "Service Category" (singularized as "service-category").
4. Add the following fields:
   - **Name**: Short Text (required, unique)
   - **Slug**: UID (required, unique, based on Name field)
   - **Description**: Long Text (optional)
5. Click "Save" to create the collection type.

### 2. Service Content Type

1. Go to Content-Type Builder in the sidebar.
2. Click "Create new collection type".
3. Name it "Service" (singularized as "service").
4. Add the following fields:
   - **Title**: Short Text (required, unique)
   - **Slug**: UID (required, unique, based on Title field)
   - **Description**: Long Text (required)
   - **Content**: Rich Text (required)
   - **Featured Image**: Media (required, single image)
   - **Gallery**: Media (optional, multiple images)
   - **Category**: Relation (required, Many-to-One with Service Category)
5. Click "Save" to create the collection type.

## Configure Permissions

1. Go to Settings > Roles > Public.
2. Enable "find" and "findOne" permissions for both Service and Service Category.
3. Click "Save" to apply the permissions.

## Adding Sample Data

### Service Categories

Create the following service categories:

1. **Moda & Tasarım**
   - Slug: moda-tasarim
   - Description: "Moda trendleri ve yenilikçi tasarım hizmetlerimiz"

2. **İş Geliştirme & Tedarik**
   - Slug: is-gelistirme-tedarik
   - Description: "İş süreçlerini geliştirme ve etkili tedarik zinciri yönetimi"

3. **Üretim & Sevkiyat**
   - Slug: uretim-sevkiyat
   - Description: "Kaliteli üretim ve hızlı sevkiyat hizmetlerimiz"

4. **Baskı & Nakış**
   - Slug: baski-nakis
   - Description: "Modern baskı teknikleri ve özel nakış hizmetlerimiz"

5. **Fitness & Spor**
   - Slug: fitness-spor
   - Description: "Spor ve fitness giyim için özel çözümlerimiz"

6. **Günlük Giyim**
   - Slug: gunluk-giyim
   - Description: "Günlük giyim koleksiyonları ve tasarım hizmetlerimiz"

### Services

For each category, create at least one service with sample content, titles, descriptions, and images.

## Media Library

1. Upload relevant images for each service and category.
2. Make sure to use properly sized and optimized images.
3. Add proper alt texts for all images for accessibility.

## Testing the API

After setting up your content, you can test the API endpoints:

- Get all service categories: http://localhost:1337/api/service-categories
- Get all services: http://localhost:1337/api/services
- Get a specific service by ID: http://localhost:1337/api/services/1
- Get a service with populated relations: http://localhost:1337/api/services/1?populate=*

## Connecting to the Next.js Frontend

The Next.js application is already configured to fetch data from your Strapi API. Make sure:

1. The Strapi server is running at http://localhost:1337
2. The environment variable `NEXT_PUBLIC_STRAPI_API_URL` is set to the Strapi URL
3. Permissions are properly configured to allow access to your content

## Further Customization

You can extend the content types with additional fields as needed:
- Service features
- FAQs
- Testimonials
- Pricing information
- And more! 
 