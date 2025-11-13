# QR Menu SaaS - Subdomain Testing Script (PowerShell)
# This script tests all subdomain routing in production

param(
    [string]$Domain = "qrmenu.app"
)

Write-Host "🧪 Testing QR Menu SaaS Subdomain Routing" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Testing domain: $Domain" -ForegroundColor Yellow
Write-Host ""

# Counters
$totalTests = 0
$passedTests = 0
$failedTests = 0

# Function to test URL
function Test-Url {
    param(
        [string]$Url,
        [int]$ExpectedStatus = 200,
        [string]$Description
    )
    
    Write-Host "Testing $Description... " -NoNewline
    
    try {
        $response = Invoke-WebRequest -Uri $Url -Method Get -UseBasicParsing -MaximumRedirection 5 -ErrorAction Stop
        $statusCode = $response.StatusCode
        
        if ($statusCode -eq $ExpectedStatus) {
            Write-Host "✓ PASS" -ForegroundColor Green -NoNewline
            Write-Host " (Status: $statusCode)"
            return $true
        } else {
            Write-Host "✗ FAIL" -ForegroundColor Red -NoNewline
            Write-Host " (Expected: $ExpectedStatus, Got: $statusCode)"
            return $false
        }
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        if ($statusCode -eq $ExpectedStatus) {
            Write-Host "✓ PASS" -ForegroundColor Green -NoNewline
            Write-Host " (Status: $statusCode)"
            return $true
        } else {
            Write-Host "✗ FAIL" -ForegroundColor Red -NoNewline
            Write-Host " (Expected: $ExpectedStatus, Got: $statusCode)"
            return $false
        }
    }
}

# Function to test URL contains text
function Test-UrlContains {
    param(
        [string]$Url,
        [string]$SearchText,
        [string]$Description
    )
    
    Write-Host "Testing $Description... " -NoNewline
    
    try {
        $response = Invoke-WebRequest -Uri $Url -Method Get -UseBasicParsing -MaximumRedirection 5 -ErrorAction Stop
        $content = $response.Content
        
        if ($content -match $SearchText) {
            Write-Host "✓ PASS" -ForegroundColor Green -NoNewline
            Write-Host " (Found: '$SearchText')"
            return $true
        } else {
            Write-Host "✗ FAIL" -ForegroundColor Red -NoNewline
            Write-Host " (Not found: '$SearchText')"
            return $false
        }
    } catch {
        Write-Host "✗ FAIL" -ForegroundColor Red -NoNewline
        Write-Host " (Error: $($_.Exception.Message))"
        return $false
    }
}

# Test 1: Main Domain (Landing Site)
Write-Host "1️⃣  Testing Main Domain (Landing Site)" -ForegroundColor Cyan
Write-Host "-----------------------------------"
if (Test-Url -Url "https://$Domain" -ExpectedStatus 200 -Description "Main domain loads") {
    $passedTests++
} else {
    $failedTests++
}
$totalTests++

if (Test-UrlContains -Url "https://$Domain" -SearchText "QR Menu" -Description "Landing page content") {
    $passedTests++
} else {
    $failedTests++
}
$totalTests++

Write-Host ""

# Test 2: WWW Subdomain
Write-Host "2️⃣  Testing WWW Subdomain" -ForegroundColor Cyan
Write-Host "----------------------"
if (Test-Url -Url "https://www.$Domain" -ExpectedStatus 200 -Description "WWW subdomain loads") {
    $passedTests++
} else {
    $failedTests++
}
$totalTests++

Write-Host ""

# Test 3: Panel Subdomain (Restaurant Panel)
Write-Host "3️⃣  Testing Panel Subdomain (Restaurant Panel)" -ForegroundColor Cyan
Write-Host "-------------------------------------------"
if (Test-Url -Url "https://panel.$Domain" -ExpectedStatus 200 -Description "Panel subdomain loads") {
    $passedTests++
} else {
    $failedTests++
}
$totalTests++

if (Test-UrlContains -Url "https://panel.$Domain/login" -SearchText "Login" -Description "Panel login page") {
    $passedTests++
} else {
    $failedTests++
}
$totalTests++

if (Test-UrlContains -Url "https://panel.$Domain/register" -SearchText "Register" -Description "Panel register page") {
    $passedTests++
} else {
    $failedTests++
}
$totalTests++

Write-Host ""

# Test 4: Admin Subdomain (Super Admin Panel)
Write-Host "4️⃣  Testing Admin Subdomain (Super Admin Panel)" -ForegroundColor Cyan
Write-Host "--------------------------------------------"
if (Test-Url -Url "https://admin.$Domain" -ExpectedStatus 200 -Description "Admin subdomain loads") {
    $passedTests++
} else {
    $failedTests++
}
$totalTests++

if (Test-UrlContains -Url "https://admin.$Domain" -SearchText "Admin" -Description "Admin panel content") {
    $passedTests++
} else {
    $failedTests++
}
$totalTests++

Write-Host ""

# Test 5: Restaurant Subdomain (Digital Menu)
Write-Host "5️⃣  Testing Restaurant Subdomain (Digital Menu)" -ForegroundColor Cyan
Write-Host "--------------------------------------------"
Write-Host "Note: This test requires a restaurant with slug 'test-restaurant' to exist" -ForegroundColor Yellow

if (Test-Url -Url "https://test-restaurant.$Domain" -ExpectedStatus 200 -Description "Restaurant subdomain loads") {
    $passedTests++
} else {
    $failedTests++
}
$totalTests++

# Test non-existent restaurant (should return 404 or error page)
if (Test-Url -Url "https://nonexistent-restaurant-xyz.$Domain" -ExpectedStatus 404 -Description "Non-existent restaurant returns 404") {
    $passedTests++
} else {
    $failedTests++
}
$totalTests++

Write-Host ""

# Test 6: DNS Resolution
Write-Host "6️⃣  Testing DNS Resolution" -ForegroundColor Cyan
Write-Host "----------------------"

function Test-Dns {
    param(
        [string]$Hostname,
        [string]$Description
    )
    
    Write-Host "Testing $Description... " -NoNewline
    
    try {
        $result = Resolve-DnsName -Name $Hostname -ErrorAction Stop
        if ($result) {
            $ip = $result[0].IPAddress
            Write-Host "✓ PASS" -ForegroundColor Green -NoNewline
            Write-Host " (Resolves to: $ip)"
            return $true
        }
    } catch {
        Write-Host "✗ FAIL" -ForegroundColor Red -NoNewline
        Write-Host " (No DNS record)"
        return $false
    }
}

if (Test-Dns -Hostname $Domain -Description "Main domain DNS") {
    $passedTests++
} else {
    $failedTests++
}
$totalTests++

if (Test-Dns -Hostname "panel.$Domain" -Description "Panel subdomain DNS") {
    $passedTests++
} else {
    $failedTests++
}
$totalTests++

if (Test-Dns -Hostname "admin.$Domain" -Description "Admin subdomain DNS") {
    $passedTests++
} else {
    $failedTests++
}
$totalTests++

if (Test-Dns -Hostname "test-restaurant.$Domain" -Description "Restaurant subdomain DNS (wildcard)") {
    $passedTests++
} else {
    $failedTests++
}
$totalTests++

Write-Host ""

# Test 7: Response Headers
Write-Host "7️⃣  Testing Response Headers" -ForegroundColor Cyan
Write-Host "-------------------------"

function Test-Header {
    param(
        [string]$Url,
        [string]$HeaderName,
        [string]$Description
    )
    
    Write-Host "Testing $Description... " -NoNewline
    
    try {
        $response = Invoke-WebRequest -Uri $Url -Method Get -UseBasicParsing -MaximumRedirection 5 -ErrorAction Stop
        $header = $response.Headers[$HeaderName]
        
        if ($header) {
            Write-Host "✓ PASS" -ForegroundColor Green
            return $true
        } else {
            Write-Host "⚠ WARNING" -ForegroundColor Yellow -NoNewline
            Write-Host " (Header not found)"
            return $true  # Don't fail on missing headers
        }
    } catch {
        Write-Host "⚠ WARNING" -ForegroundColor Yellow -NoNewline
        Write-Host " (Could not check header)"
        return $true
    }
}

Test-Header -Url "https://$Domain" -HeaderName "x-vercel-id" -Description "Vercel deployment header"
Test-Header -Url "https://$Domain" -HeaderName "strict-transport-security" -Description "HSTS header"
Test-Header -Url "https://$Domain" -HeaderName "x-frame-options" -Description "X-Frame-Options header"

Write-Host ""

# Summary
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "📊 Test Summary" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Total tests: $totalTests"
Write-Host "Passed: " -NoNewline
Write-Host "$passedTests" -ForegroundColor Green
Write-Host "Failed: " -NoNewline
Write-Host "$failedTests" -ForegroundColor Red
Write-Host ""

if ($failedTests -eq 0) {
    Write-Host "🎉 All tests passed!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "❌ Some tests failed. Please review the output above." -ForegroundColor Red
    exit 1
}
