#!/bin/bash

# QR Menu SaaS - Subdomain Testing Script
# This script tests all subdomain routing in production

echo "🧪 Testing QR Menu SaaS Subdomain Routing"
echo "=========================================="
echo ""

# Configuration
DOMAIN="${1:-qrmenu.app}"
echo "Testing domain: $DOMAIN"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to test URL
test_url() {
    local url=$1
    local expected_status=${2:-200}
    local description=$3
    
    echo -n "Testing $description... "
    
    # Make request and get status code
    status_code=$(curl -s -o /dev/null -w "%{http_code}" -L "$url")
    
    if [ "$status_code" -eq "$expected_status" ]; then
        echo -e "${GREEN}✓ PASS${NC} (Status: $status_code)"
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (Expected: $expected_status, Got: $status_code)"
        return 1
    fi
}

# Function to test URL contains text
test_url_contains() {
    local url=$1
    local search_text=$2
    local description=$3
    
    echo -n "Testing $description... "
    
    # Make request and search for text
    response=$(curl -s -L "$url")
    
    if echo "$response" | grep -q "$search_text"; then
        echo -e "${GREEN}✓ PASS${NC} (Found: '$search_text')"
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (Not found: '$search_text')"
        return 1
    fi
}

# Counter for results
total_tests=0
passed_tests=0
failed_tests=0

# Test 1: Main Domain (Landing Site)
echo "1️⃣  Testing Main Domain (Landing Site)"
echo "-----------------------------------"
test_url "https://$DOMAIN" 200 "Main domain loads"
if [ $? -eq 0 ]; then ((passed_tests++)); else ((failed_tests++)); fi
((total_tests++))

test_url_contains "https://$DOMAIN" "QR Menu" "Landing page content"
if [ $? -eq 0 ]; then ((passed_tests++)); else ((failed_tests++)); fi
((total_tests++))

echo ""

# Test 2: WWW Subdomain
echo "2️⃣  Testing WWW Subdomain"
echo "----------------------"
test_url "https://www.$DOMAIN" 200 "WWW subdomain loads"
if [ $? -eq 0 ]; then ((passed_tests++)); else ((failed_tests++)); fi
((total_tests++))

echo ""

# Test 3: Panel Subdomain (Restaurant Panel)
echo "3️⃣  Testing Panel Subdomain (Restaurant Panel)"
echo "-------------------------------------------"
test_url "https://panel.$DOMAIN" 200 "Panel subdomain loads"
if [ $? -eq 0 ]; then ((passed_tests++)); else ((failed_tests++)); fi
((total_tests++))

test_url_contains "https://panel.$DOMAIN/login" "Login" "Panel login page"
if [ $? -eq 0 ]; then ((passed_tests++)); else ((failed_tests++)); fi
((total_tests++))

test_url_contains "https://panel.$DOMAIN/register" "Register" "Panel register page"
if [ $? -eq 0 ]; then ((passed_tests++)); else ((failed_tests++)); fi
((total_tests++))

echo ""

# Test 4: Admin Subdomain (Super Admin Panel)
echo "4️⃣  Testing Admin Subdomain (Super Admin Panel)"
echo "--------------------------------------------"
test_url "https://admin.$DOMAIN" 200 "Admin subdomain loads"
if [ $? -eq 0 ]; then ((passed_tests++)); else ((failed_tests++)); fi
((total_tests++))

test_url_contains "https://admin.$DOMAIN" "Admin" "Admin panel content"
if [ $? -eq 0 ]; then ((passed_tests++)); else ((failed_tests++)); fi
((total_tests++))

echo ""

# Test 5: Restaurant Subdomain (Digital Menu)
echo "5️⃣  Testing Restaurant Subdomain (Digital Menu)"
echo "--------------------------------------------"
echo -e "${YELLOW}Note: This test requires a restaurant with slug 'test-restaurant' to exist${NC}"

test_url "https://test-restaurant.$DOMAIN" 200 "Restaurant subdomain loads"
if [ $? -eq 0 ]; then ((passed_tests++)); else ((failed_tests++)); fi
((total_tests++))

# Test non-existent restaurant (should return 404 or error page)
test_url "https://nonexistent-restaurant-xyz.$DOMAIN" 404 "Non-existent restaurant returns 404"
if [ $? -eq 0 ]; then ((passed_tests++)); else ((failed_tests++)); fi
((total_tests++))

echo ""

# Test 6: SSL Certificates
echo "6️⃣  Testing SSL Certificates"
echo "-------------------------"

test_ssl() {
    local url=$1
    local description=$2
    
    echo -n "Testing $description... "
    
    # Check SSL certificate
    ssl_info=$(echo | openssl s_client -servername "$url" -connect "$url:443" 2>/dev/null | openssl x509 -noout -dates 2>/dev/null)
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ PASS${NC} (SSL valid)"
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (SSL invalid)"
        return 1
    fi
}

test_ssl "$DOMAIN" "Main domain SSL"
if [ $? -eq 0 ]; then ((passed_tests++)); else ((failed_tests++)); fi
((total_tests++))

test_ssl "panel.$DOMAIN" "Panel subdomain SSL"
if [ $? -eq 0 ]; then ((passed_tests++)); else ((failed_tests++)); fi
((total_tests++))

test_ssl "admin.$DOMAIN" "Admin subdomain SSL"
if [ $? -eq 0 ]; then ((passed_tests++)); else ((failed_tests++)); fi
((total_tests++))

echo ""

# Test 7: DNS Resolution
echo "7️⃣  Testing DNS Resolution"
echo "----------------------"

test_dns() {
    local hostname=$1
    local description=$2
    
    echo -n "Testing $description... "
    
    # Check DNS resolution
    ip=$(dig +short "$hostname" | head -n 1)
    
    if [ -n "$ip" ]; then
        echo -e "${GREEN}✓ PASS${NC} (Resolves to: $ip)"
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (No DNS record)"
        return 1
    fi
}

test_dns "$DOMAIN" "Main domain DNS"
if [ $? -eq 0 ]; then ((passed_tests++)); else ((failed_tests++)); fi
((total_tests++))

test_dns "panel.$DOMAIN" "Panel subdomain DNS"
if [ $? -eq 0 ]; then ((passed_tests++)); else ((failed_tests++)); fi
((total_tests++))

test_dns "admin.$DOMAIN" "Admin subdomain DNS"
if [ $? -eq 0 ]; then ((passed_tests++)); else ((failed_tests++)); fi
((total_tests++))

test_dns "test-restaurant.$DOMAIN" "Restaurant subdomain DNS (wildcard)"
if [ $? -eq 0 ]; then ((passed_tests++)); else ((failed_tests++)); fi
((total_tests++))

echo ""

# Test 8: Response Headers
echo "8️⃣  Testing Response Headers"
echo "-------------------------"

test_header() {
    local url=$1
    local header=$2
    local description=$3
    
    echo -n "Testing $description... "
    
    # Check for header
    header_value=$(curl -s -I -L "$url" | grep -i "^$header:" | head -n 1)
    
    if [ -n "$header_value" ]; then
        echo -e "${GREEN}✓ PASS${NC}"
        return 0
    else
        echo -e "${YELLOW}⚠ WARNING${NC} (Header not found)"
        return 0  # Don't fail on missing headers
    fi
}

test_header "https://$DOMAIN" "x-vercel-id" "Vercel deployment header"
test_header "https://$DOMAIN" "strict-transport-security" "HSTS header"
test_header "https://$DOMAIN" "x-frame-options" "X-Frame-Options header"

echo ""

# Summary
echo "=========================================="
echo "📊 Test Summary"
echo "=========================================="
echo "Total tests: $total_tests"
echo -e "Passed: ${GREEN}$passed_tests${NC}"
echo -e "Failed: ${RED}$failed_tests${NC}"
echo ""

if [ $failed_tests -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Please review the output above.${NC}"
    exit 1
fi
