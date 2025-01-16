#!/usr/bin/env node
/*This sample code assumes the request-promise package is installed. If it is not installed run: "npm install request-promise"*/

const request = require('request-promise');

// Bright Data Proxy Configuration (Replace with your actual values)
const BRIGHT_DATA_USERNAME = "brd-customer-hl_2cc5b765-zone-residential_proxy1";
const BRIGHT_DATA_PASSWORD = "t5opbf3g7bwq";
const BRIGHT_DATA_PROXY_HOST = "brd.superproxy.io";
const BRIGHT_DATA_PROXY_PORT = 33335;

// Target URL
const TARGET_URL = 'https://100xdevs.com';

// Construct the proxy URL string
const PROXY_URL = `http://${BRIGHT_DATA_USERNAME}:${BRIGHT_DATA_PASSWORD}@${BRIGHT_DATA_PROXY_HOST}:${BRIGHT_DATA_PROXY_PORT}`;

async function checkWebsiteStatus() {
  try {
    const response = await request({
        url: TARGET_URL,
        proxy: PROXY_URL,
        resolveWithFullResponse: true, // Get the full response object to check status code
         rejectUnauthorized: false,  // Disable SSL certificate verification (use with caution)
    });

    if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log(`Website ${TARGET_URL} is UP. Status code: ${response.statusCode}`);
    } else {
      console.log(`Website ${TARGET_URL} is DOWN. Status code: ${response.statusCode}`);
    }
  } catch (error) {
    console.error(`Error checking website ${TARGET_URL}:`);
    if (error.cause && error.cause.code) {
         console.error(`  Error Code: ${error.cause.code}`);
    } else if (error.response) {
      console.error(`  HTTP Status Code: ${error.response.statusCode}`);
      console.error(`  HTTP Status Message: ${error.response.statusMessage}`)
    }else{
        console.error(`  Message: ${error.message}`);
    }
      console.error(`Website ${TARGET_URL} is DOWN`);
  }
}

// Execute the function to check the website status
checkWebsiteStatus();