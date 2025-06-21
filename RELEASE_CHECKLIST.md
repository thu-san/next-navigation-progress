# Release Checklist

This checklist helps ensure a smooth release process for next-navigation-progress.

## 🚀 Quick Release

Run the interactive release script:
```bash
npm run release
```

## 📋 Manual Release Checklist

### Pre-Release Checks

- [ ] **Ensure you're on main branch**
  ```bash
  git checkout main
  git pull origin main
  ```

- [ ] **No uncommitted changes**
  ```bash
  git status
  ```

- [ ] **All tests pass**
  ```bash
  npm run test:run
  ```

- [ ] **Build succeeds**
  ```bash
  npm run build
  ```

- [ ] **Review recent changes**
  ```bash
  git log --oneline -20
  ```

### Release Steps

1. [ ] **Update version**
   ```bash
   # For patch release (bug fixes)
   npm version patch
   
   # For minor release (new features)
   npm version minor
   
   # For major release (breaking changes)
   npm version major
   ```

2. [ ] **Commit version bump**
   ```bash
   git add package.json package-lock.json
   git commit -m "chore: bump version to x.x.x"
   ```

3. [ ] **Push to main**
   ```bash
   git push origin main
   ```

4. [ ] **Create and push tag**
   ```bash
   git tag vx.x.x
   git push origin vx.x.x
   ```

5. [ ] **Wait for GitHub Actions**
   - Check: https://github.com/thu-san/next-navigation-progress/actions
   - Verify changelog was generated
   - Verify GitHub release was created

6. [ ] **Publish to npm**
   ```bash
   npm publish
   ```

### Post-Release Verification

- [ ] **Check npm package**
  - Visit: https://www.npmjs.com/package/next-navigation-progress
  - Verify new version is published

- [ ] **Check GitHub release**
  - Visit: https://github.com/thu-san/next-navigation-progress/releases
  - Verify release notes are correct

- [ ] **Test installation**
  ```bash
  npm install next-navigation-progress@latest
  ```

- [ ] **Update example if needed**
  ```bash
  cd example
  npm update next-navigation-progress
  ```

## 🐛 Troubleshooting

### npm publish fails
- Make sure you're logged in: `npm login`
- Check npm permissions: `npm whoami`
- Ensure package.json version was updated

### GitHub Actions fails
- Check workflow logs at: https://github.com/thu-san/next-navigation-progress/actions
- Ensure tag format is correct: `vx.x.x`
- Verify GitHub token permissions

### Tag already exists
```bash
# Delete local tag
git tag -d vx.x.x

# Delete remote tag
git push origin --delete vx.x.x

# Recreate tag
git tag vx.x.x
git push origin vx.x.x
```

## 📝 Version Guidelines

### Patch Release (x.x.X)
- Bug fixes
- Documentation fixes
- Internal refactoring
- Dependency updates (non-breaking)

### Minor Release (x.X.x)
- New features
- New configuration options
- Performance improvements
- Deprecations (with warnings)

### Major Release (X.x.x)
- Breaking API changes
- Removed deprecated features
- Major refactoring
- Significant behavior changes

## 🔗 Important Links

- NPM Package: https://www.npmjs.com/package/next-navigation-progress
- GitHub Releases: https://github.com/thu-san/next-navigation-progress/releases
- GitHub Actions: https://github.com/thu-san/next-navigation-progress/actions
- Changelog: https://github.com/thu-san/next-navigation-progress/blob/main/CHANGELOG.md