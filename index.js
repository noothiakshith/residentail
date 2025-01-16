#!/usr/bin/env node
/* This script checks the status of a website using multiple proxies */

// Import the required package
const request = require('request-promise');

// Bright Data Proxy Configuration (Replace with your actual values)
const PROXIES = [
  {
    username: 'brd-customer-hl_2cc5b765-zone-residential_proxy3',
    password: 'h5997kb6ui7f',
    host: 'brd.superproxy.io',
    port: 33335,
  },
  {
    username: 'brd-customer-hl_2cc5b765-zone-residential_proxy3',
    password: 'h5997kb6ui7f',
    host: 'brd.superproxy.io',
    port: 33335,
  },
];

// Target URL
const TARGET_URL = 'https://100xdevs.com';

// Function to construct the proxy URL
function getProxyUrl(proxy) {
  return `http://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.port}`;
}

// Function to check website status using a proxy
async function checkWebsiteStatusWithProxy(proxy) {
  const proxyUrl = getProxyUrl(proxy);
  console.log(`Using proxy: ${proxyUrl}`);

  try {
    const response = await request({
      url: TARGET_URL,
      proxy: proxyUrl,
      resolveWithFullResponse: true, // Get the full response object to check status code
      rejectUnauthorized: false,    // Disable SSL certificate verification (use with caution)
    });

    if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log(`Website ${TARGET_URL} is UP  Status code: ${response.statusCode}`);
    } else {
      console.log(`Website ${TARGET_URL} is DOWN  Status code: ${response.statusCode}`);
    }
  } catch (error) {
    console.error(`Error checking website ${TARGET_URL} using proxy ${proxyUrl}:`);
    if (error.cause && error.cause.code) {
      console.error(`  Error Code: ${error.cause.code}`);
    } else if (error.response) {
      console.error(`  HTTP Status Code: ${error.response.statusCode}`);
      console.error(`  HTTP Status Message: ${error.response.statusMessage}`);
    } else {
      console.error(`  Message: ${error.message}`);
    }
    console.error(`Website ${TARGET_URL} is DOWN using proxy ${proxyUrl}`);
  }
}

// Function to iterate through all proxies and check website status
async function checkWebsiteStatus() {
  for (const proxy of PROXIES) {
    await checkWebsiteStatusWithProxy(proxy);
  }
}

// Execute the function to check the website status
checkWebsiteStatus();
