#!/usr/bin/env node

/**
 * SendGrid API Test Script
 * Tests the /api/notify endpoint with various scenarios
 */

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000'

async function testAPI(testName, url, options = {}) {
  console.log(`\n🧪 Testing: ${testName}`)
  console.log(`URL: ${url}`)
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options
    })
    
    const data = await response.json()
    
    console.log(`Status: ${response.status}`)
    console.log(`Response:`, data)
    
    if (response.ok) {
      console.log('✅ Success')
    } else {
      console.log('❌ Failed (expected for some tests)')
    }
    
    return { success: response.ok, data, status: response.status }
  } catch (error) {
    console.log('❌ Network Error:', error.message)
    return { success: false, error: error.message }
  }
}

async function runTests() {
  console.log('🚀 Starting SendGrid API Tests')
  console.log(`Base URL: ${BASE_URL}`)
  
  const tests = [
    {
      name: 'Valid email with role',
      body: JSON.stringify({
        email: 'test@example.com',
        role: 'student'
      })
    },
    {
      name: 'Invalid email format',
      body: JSON.stringify({
        email: 'invalid-email',
        role: 'student'
      })
    }
  ]
  
  const results = []
  
  for (const test of tests) {
    const result = await testAPI(
      test.name,
      `${BASE_URL}/api/notify`,
      { body: test.body }
    )
    results.push({ ...test, ...result })
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  
  console.log('\n📊 Test Summary Complete')
}

// Check if running directly
if (require.main === module) {
  runTests().catch(console.error)
}
