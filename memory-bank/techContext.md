# Technical Context for Islamic Society of Sheboygan Website

## Technologies Used

### Core Technologies

1. **Jekyll (v4.3+)**: Static site generator that transforms content, templates, and assets into a complete website
2. **HTML5/CSS3**: Modern markup and styling standards
3. **JavaScript (ES6+)**: For interactive components and API integration
4. **Markdown**: Content authoring format for pages, posts and events
5. **YAML**: For front matter metadata and data files
6. **Liquid**: Template language used by Jekyll
7. **Bootstrap 5**: CSS framework for responsive design
8. **Font Awesome**: Icon library

### APIs & External Services

1. **Aladhan API**: For prayer time calculations and Hijri date conversion
2. **Netlify CMS**: Headless content management system
3. **Netlify Identity**: Authentication service for the CMS
4. **Git Gateway**: Service connecting Netlify CMS to GitHub repository
5. **EmailJS**: Form handling service for contact forms without server-side processing
6. **Netlify**: Hosting and continuous deployment platform

### Build & Deployment

1. **GitHub**: Version control and project management
2. **Ruby**: Required for Jekyll development environment
3. **Bundler**: Ruby dependency management
4. **GitHub Actions**: Optional CI/CD pipeline

## Development Setup

### Prerequisites

- Ruby 2.5.0 or higher
- RubyGems
- GCC and Make
- Git

### Local Development Process

1. Clone the repository
   ```
   git clone https://github.com/username/mosque-website.git
   cd mosque-website
   ```

2. Install dependencies
   ```
   bundle install
   ```

3. Start the development server
   ```
   bundle exec jekyll serve
   ```

4. View the site at http://localhost:4000

### Build Process

1. Jekyll processes the site:
   - Converts Markdown to HTML
   - Applies layout templates
   - Processes Liquid tags and filters
   - Generates static HTML pages

2. The built site is output to the `_site` directory

3. For deployment to Netlify:
   ```
   git add .
   git commit -m "Update content"
   git push origin main
   ```
   
4. Netlify automatically:
   - Detects the push to the repository
   - Runs the build command (`bundle exec jekyll build`)
   - Deploys the `_site` directory to Netlify's CDN
   - Makes the site available at the configured domain

## Technical Constraints

### GitHub Pages Constraints

1. **Limited Plugin Support**: Only [certain plugins](https://pages.github.com/versions/) are supported in GitHub Pages' default build process
2. **Build Time Limits**: Long builds may time out
3. **Static Site Only**: No server-side processing
4. **Size Limits**: Repositories have soft limits of 1GB

### Browser Support

- **Modern Browsers**: Full support for Chrome, Firefox, Safari, Edge (latest 2 versions)
- **IE Support**: None (IE is deprecated)
- **Mobile Browsers**: iOS Safari, Chrome for Android

### Performance Targets

- **Page Load Speed**: Under 2 seconds for initial load
- **Time to Interactive**: Under 3 seconds
- **Lighthouse Score**: 90+ for Performance, Accessibility, Best Practices, and SEO

## Dependencies

### Ruby Gems

- `jekyll (~> 4.3.3)`: Static site generator
- `jekyll-feed (~> 0.12)`: Generates RSS feed
- `jekyll-seo-tag (~> 2.7)`: SEO optimization
- `jekyll-sitemap (~> 1.4)`: Sitemap generation
- `webrick (~> 1.7)`: Web server
- `csv`: For Ruby 3.4+ compatibility
- `logger`: For Ruby 3.4+ compatibility
- `base64`: For Ruby 3.4+ compatibility

### Frontend Libraries

- **Bootstrap 5**: Responsive design framework
- **jQuery**: JavaScript library (minimal usage, mainly for Bootstrap)
- **Font Awesome 6**: Icon library

## Configuration Details

### Jekyll Configuration

The main configuration is in `_config.yml`:
- Site metadata
- Build settings
- Collection configurations
- Plugin configurations

### Netlify CMS Configuration

The CMS is configured in `admin/config.yml`:
- Backend configuration (GitHub)
- Media folder settings
- Content collections and fields

### API Configurations

- **Aladhan API**: Uses ISNA calculation method (method=2)
- **Time Zone**: All prayer times use America/Chicago (Central Time)

## Maintenance Considerations

1. **Ruby Version**: Keep up with Jekyll compatibility requirements
2. **API Limits**: Monitor Aladhan API usage (currently no authentication required)
3. **Browser Updates**: Test with new browser versions quarterly
4. **Dependency Updates**: Review dependencies for security updates monthly
5. **Performance Monitoring**: Check page load times periodically

## Deployment Instructions

1. **Netlify Setup**:
   - Create a Netlify account at netlify.com
   - Connect your GitHub repository
   - Configure build settings:
     - Build command: `bundle exec jekyll build`
     - Publish directory: `_site`
   - Configure environment variables if needed
   - Set up a custom domain (optional)
   - Enable HTTPS

2. **Netlify Identity Setup**:
   - Enable Netlify Identity in site settings
   - Set registration preferences to "Invite only"
   - Enable Git Gateway service
   - Invite users via email through the Identity tab
   - Configure external providers (optional)

3. **Netlify CMS Setup**:
   - Verify the admin interface works at `/admin`
   - Log in with Netlify Identity
   - Test content creation and publishing flow
   - Confirm Git Gateway is working by publishing a test post
