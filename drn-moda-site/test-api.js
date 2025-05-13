const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

async function testApi() {
  console.log('Testing Strapi API connection...');

  try {
    // Test categories
    console.log('\nTesting service categories endpoint:');
    const categoriesResponse = await axios.get(`${STRAPI_URL}/api/service-categories?populate=*`);
    console.log(`Status: ${categoriesResponse.status}`);
    console.log(`Found ${categoriesResponse.data.data?.length || 0} categories`);
    
    if (categoriesResponse.data.data?.length > 0) {
      const firstCategory = categoriesResponse.data.data[0];
      if (firstCategory && firstCategory.attributes) {
        console.log('First category:', {
          id: firstCategory.id,
          name: firstCategory.attributes.name,
          slug: firstCategory.attributes.slug
        });
      } else {
        console.log('First category has unexpected structure:', firstCategory);
      }
    }

    // Test services
    console.log('\nTesting services endpoint:');
    const servicesResponse = await axios.get(`${STRAPI_URL}/api/services?populate=*`);
    console.log(`Status: ${servicesResponse.status}`);
    console.log(`Found ${servicesResponse.data.data?.length || 0} services`);
    
    if (servicesResponse.data.data?.length > 0) {
      const firstService = servicesResponse.data.data[0];
      if (firstService && firstService.attributes) {
        console.log('First service:', {
          id: firstService.id,
          title: firstService.attributes.title,
          slug: firstService.attributes.slug,
          hasImage: !!firstService.attributes.featuredImage?.data,
          categoryId: firstService.attributes.category?.data?.id
        });
      } else {
        console.log('First service has unexpected structure:', firstService);
      }
    }

    console.log('\nAPI tests completed successfully!');
  } catch (error) {
    console.error('Error testing API:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Full error:', error);
    }
  }
}

testApi(); 
 