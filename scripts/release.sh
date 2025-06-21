#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Header
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🚀 next-navigation-progress Release Script${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check if on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    print_error "You must be on the main branch to release"
    echo "Current branch: $CURRENT_BRANCH"
    echo "Run: git checkout main"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    print_error "You have uncommitted changes"
    echo "Please commit or stash your changes before releasing"
    exit 1
fi

# Pull latest changes
print_info "Pulling latest changes from main..."
git pull origin main

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
print_info "Current version: v$CURRENT_VERSION"
echo ""

# Run tests
print_info "Running tests..."
if npm run test:run; then
    print_success "All tests passed!"
else
    print_error "Tests failed! Please fix failing tests before releasing."
    exit 1
fi
echo ""

# Build the package
print_info "Building the package..."
if npm run build; then
    print_success "Build successful!"
else
    print_error "Build failed! Please fix build errors before releasing."
    exit 1
fi
echo ""

# Check if version type was passed as argument
if [ "$1" == "patch" ] || [ "$1" == "minor" ] || [ "$1" == "major" ]; then
    VERSION_TYPE=$1
    NEW_VERSION=$(npx semver $CURRENT_VERSION -i $VERSION_TYPE)
    print_info "Version type specified: $VERSION_TYPE"
else
    # Select version type interactively
    echo "Select version type:"
    echo "  1) Patch (bug fixes)        - $(npx semver $CURRENT_VERSION -i patch)"
    echo "  2) Minor (new features)     - $(npx semver $CURRENT_VERSION -i minor)"
    echo "  3) Major (breaking changes) - $(npx semver $CURRENT_VERSION -i major)"
    echo "  4) Custom version"
    echo "  0) Cancel"
    echo ""
    read -p "Enter your choice (0-4): " VERSION_CHOICE

    case $VERSION_CHOICE in
        1)
            VERSION_TYPE="patch"
            NEW_VERSION=$(npx semver $CURRENT_VERSION -i patch)
            ;;
        2)
            VERSION_TYPE="minor"
            NEW_VERSION=$(npx semver $CURRENT_VERSION -i minor)
            ;;
        3)
            VERSION_TYPE="major"
            NEW_VERSION=$(npx semver $CURRENT_VERSION -i major)
            ;;
        4)
            read -p "Enter custom version (without 'v' prefix): " NEW_VERSION
            # Validate version format
            if ! npx semver $NEW_VERSION >/dev/null 2>&1; then
                print_error "Invalid version format: $NEW_VERSION"
                exit 1
            fi
            VERSION_TYPE="custom"
            ;;
        0)
            print_warning "Release cancelled"
            exit 0
            ;;
        *)
            print_error "Invalid choice"
            exit 1
            ;;
    esac
fi

echo ""
print_info "New version will be: v$NEW_VERSION"
echo ""

# Show recent commits that will be included
print_info "Recent commits that will be included in this release:"
echo ""
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
if [ -n "$LAST_TAG" ]; then
    git log ${LAST_TAG}..HEAD --oneline --pretty=format:"  - %s" | head -20
else
    git log --oneline --pretty=format:"  - %s" | head -20
fi
echo ""
echo ""

# Confirm release
read -p "Do you want to proceed with the release? (y/N): " CONFIRM
if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    print_warning "Release cancelled"
    exit 0
fi

echo ""
print_info "Starting release process..."
echo ""

# Update version in package.json
print_info "Updating version in package.json..."
npm version $NEW_VERSION --no-git-tag-version
print_success "Version updated to $NEW_VERSION"

# Commit version bump
print_info "Committing version bump..."
git add package.json package-lock.json
git commit -m "chore: bump version to $NEW_VERSION"
print_success "Version bump committed"

# Push to main
print_info "Pushing to main branch..."
git push origin main
print_success "Pushed to main"

# Create and push tag
print_info "Creating and pushing tag v$NEW_VERSION..."
git tag v$NEW_VERSION
git push origin v$NEW_VERSION
print_success "Tag created and pushed"

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 Release v$NEW_VERSION created successfully!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

print_info "GitHub Actions is now:"
echo "  📝 Generating changelog"
echo "  📋 Updating CHANGELOG.md"
echo "  🎯 Creating GitHub release"
echo ""
echo "Check the progress at:"
echo "  https://github.com/thu-san/next-navigation-progress/actions"
echo ""

print_warning "Don't forget to publish to npm when ready!"
echo ""
echo "To publish to npm, run:"
echo -e "${YELLOW}  npm publish${NC}"
echo ""
echo "Or if you need to login first:"
echo -e "${YELLOW}  npm login${NC}"
echo -e "${YELLOW}  npm publish${NC}"
echo ""

print_success "Release process complete! 🚀"