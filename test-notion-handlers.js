const config = require('./config/config');
const { logger } = require('./src/utils');
const NotionHandler = require('./src/notion-handler');
const NotionPDFHandler = require('./src/notion-pdf-handler');

async function testNotionHandlers() {
  try {
    console.log('🧪 Testing Notion handlers...');
    
    // Test audio Notion handler
    console.log('\n1️⃣ Testing audio Notion handler...');
    const notionHandler = new NotionHandler();
    
    // Test connection
    const audioConnection = await notionHandler.testConnection();
    console.log(`✅ Audio Notion connection: ${audioConnection ? 'SUCCESS' : 'FAILED'}`);
    
    if (!audioConnection) {
      console.error('❌ Audio Notion handler connection failed');
      console.error('Check your NOTION_API_KEY and NOTION_DATABASE_ID');
      return;
    }
    
    // Test PDF Notion handler
    console.log('\n2️⃣ Testing PDF Notion handler...');
    const notionPDFHandler = new NotionPDFHandler();
    
    const pdfConnection = await notionPDFHandler.testConnection();
    console.log(`✅ PDF Notion connection: ${pdfConnection ? 'SUCCESS' : 'FAILED'}`);
    
    if (!pdfConnection) {
      console.error('❌ PDF Notion handler connection failed');
      console.error('Check your NOTION_API_KEY and NOTION_PDF_DATABASE_ID');
      return;
    }
    
    // Test database schema
    console.log('\n3️⃣ Testing database schemas...');
    
    try {
      const audioSchema = await notionHandler.getDatabaseSchema();
      console.log('✅ Audio database schema retrieved');
      console.log('Available properties:', Object.keys(audioSchema));
      
      const pdfSchema = await notionPDFHandler.getDatabaseSchema();
      console.log('✅ PDF database schema retrieved');
      console.log('Available properties:', Object.keys(pdfSchema));
      
    } catch (error) {
      console.error('❌ Failed to get database schemas:', error.message);
    }
    
    console.log('\n🎉 Notion handlers test completed successfully!');
    console.log('Your Notion integration is working correctly.');
    
  } catch (error) {
    console.error('❌ Notion handlers test failed:', error.message);
    console.error('Error details:', error);
  }
}

// Run the test
if (require.main === module) {
  testNotionHandlers()
    .then(() => {
      console.log('\n✅ Test completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Test failed:', error);
      process.exit(1);
    });
}

module.exports = { testNotionHandlers };