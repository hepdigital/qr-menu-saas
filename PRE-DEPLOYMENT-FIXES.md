# Pre-Deployment Fixes Required

Before deploying to production, the following ESLint errors need to be fixed:

## ESLint Errors

### 1. Unescaped Entities

**Files affected:**
- `app/(landing)/landing/page.tsx` (line 429)
- `app/(menu)/menu/not-found.tsx` (lines 6, 6)
- `app/(panel)/panel/login/page.tsx` (line 12)
- `app/(panel)/panel/reset-password/page.tsx` (line 12)
- `components/auth/login-form.tsx` (line 151)
- `components/panel/delete-category-dialog.tsx` (lines 60, 60)

**Issue:** Apostrophes and quotes need to be escaped in JSX.

**Fix:** Replace `'` with `&apos;` or `&#39;` and `"` with `&quot;` or `&#34;`

**Example:**
```tsx
// Before
<p>Don't have an account?</p>

// After
<p>Don&apos;t have an account?</p>
```

### 2. React Hooks Warnings

**Files affected:**
- `components/admin/payment-list.tsx` (line 51)
- `components/admin/restaurant-details.tsx` (line 34)
- `components/admin/restaurant-list.tsx` (line 31)

**Issue:** Missing dependencies in useEffect hooks.

**Fix:** Add missing dependencies to dependency array or wrap functions in useCallback.

**Example:**
```tsx
// Option 1: Add dependency
useEffect(() => {
  fetchPayments()
}, [fetchPayments])

// Option 2: Move function inside useEffect
useEffect(() => {
  const fetchPayments = async () => {
    // fetch logic
  }
  fetchPayments()
}, [])
```

## Quick Fix Script

You can temporarily disable these rules in `.eslintrc.json` for deployment:

```json
{
  "extends": "next/core-web-vitals",
  "rules": {
    "react/no-unescaped-entities": "off",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

**Note:** This is not recommended for production. Fix the actual issues instead.

## Deployment Options

### Option 1: Fix All Issues (Recommended)
1. Fix all ESLint errors
2. Run `npm run build` to verify
3. Deploy to production

### Option 2: Temporary Workaround
1. Update `.eslintrc.json` to disable rules
2. Deploy to production
3. Create tickets to fix issues
4. Fix in next release

### Option 3: Skip Linting (Not Recommended)
Add to `next.config.js`:
```javascript
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
}
```

## Recommendation

**Fix the issues before deploying.** The errors are minor and can be fixed quickly:

1. Replace apostrophes with HTML entities (5 minutes)
2. Fix useEffect dependencies (10 minutes)
3. Test build: `npm run build`
4. Deploy

## Impact

These errors will:
- ❌ Block production builds on Vercel (if ESLint is enabled)
- ⚠️ Cause potential bugs with React hooks
- ⚠️ Display incorrectly escaped characters

## Status

- [ ] Fix unescaped entities
- [ ] Fix React hooks warnings
- [ ] Verify build succeeds
- [ ] Ready for deployment

---

**Note:** The deployment configuration created in Task 16 is complete and correct. These are pre-existing code quality issues that should be addressed before production deployment.
