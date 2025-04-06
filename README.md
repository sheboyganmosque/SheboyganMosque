# Islamic Society of Sheboygan Website

This is a modern website for the Islamic Society of Sheboygan built with Jekyll and hosted on Netlify. The site includes blog support, events calendar, prayer times information, and a Netlify CMS with Git Gateway for easy content management.

## Features

- 📱 Responsive design for all devices
- 🕌 Dynamic prayer times calculation
- 📅 Events calendar with recurring events support
- 📰 Blog/news system for announcements
- 📝 Content management via Netlify CMS
- 📸 Photo gallery support
- 📧 Contact forms
- 💰 Donation system
- 🌙 Special Ramadan pages/features
- 🔍 SEO optimized

## Prerequisites

- [Ruby](https://www.ruby-lang.org/en/downloads/) version 2.5.0 or higher
- [RubyGems](https://rubygems.org/pages/download)
- [GCC](https://gcc.gnu.org/install/) and [Make](https://www.gnu.org/software/make/)
- [Node.js](https://nodejs.org/) (for Netlify CMS local development)

## Getting Started

### Installation

1. Clone this repository
```bash
git clone https://github.com/your-username/mosque-website.git
cd mosque-website
```

2. Install dependencies
```bash
bundle install
```

3. Run the development server
```bash
bundle exec jekyll serve
```

4. Visit http://localhost:4000 in your browser

### macOS Installation with Homebrew

For macOS users, Homebrew provides the easiest way to install and manage dependencies:

1. Install Homebrew (if not already installed):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Install Ruby:
   ```bash
   brew install ruby
   ```

3. Add Ruby to your PATH (add to your ~/.zshrc or ~/.bash_profile):
   ```bash
   echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc
   # Or for Apple Silicon Macs:
   # echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

4. Install Jekyll and Bundler:
   ```bash
   gem install jekyll bundler
   ```

5. Install project dependencies:
   ```bash
   bundle install
   ```

### Deploying to Netlify

1. Create an account on [Netlify](https://www.netlify.com/)

2. Connect your GitHub repository to Netlify:
   - Click "New site from Git"
   - Select GitHub and authorize Netlify
   - Choose your repository
   - Configure build settings:
     - Build command: `bundle exec jekyll build`
     - Publish directory: `_site`
   - Click "Deploy site"

3. Set up a custom domain (optional):
   - Go to "Domain settings" in your Netlify site dashboard
   - Add a custom domain and follow the instructions to configure DNS
   - Enable HTTPS

## Using the Netlify CMS

### Production Setup

1. Deploy the site to Netlify (as described in the Deployment section)
2. Enable Netlify Identity:
   - Go to your site settings in Netlify dashboard
   - Navigate to the "Identity" tab and click "Enable Identity"
   - Set "Registration preferences" to "Invite only" for security
   - Optional: Configure external providers in "External providers" section

3. Set up Git Gateway:
   - Still in the Identity tab, navigate to "Services"
   - Enable "Git Gateway" to connect Netlify CMS with your GitHub repository

4. Invite users:
   - Go to the "Identity" tab in your Netlify dashboard
   - Click "Invite users" and enter email addresses
   - Users will receive an email to set up their account

5. Access the admin panel at `/admin` (e.g., https://your-site.com/admin)
   - Log in with Netlify Identity credentials
   - Create and edit content through the user-friendly interface

### Local Netlify CMS Development

To work with Netlify CMS locally without needing to authenticate:

1. Install the Netlify CMS proxy server:
   ```bash
   npm install -g netlify-cms-proxy-server
   ```

2. In one terminal window, start the Jekyll server:
   ```bash
   bundle exec jekyll serve
   ```

3. In another terminal window, start the Netlify CMS proxy server:
   ```bash
   netlify-cms-proxy-server
   ```

4. Visit http://localhost:4000/admin/ to access the local CMS
   - The proxy server bypasses authentication for local development
   - Changes made in the local CMS will update files in your local repository

5. Testing content workflows locally:
   - Create a new blog post or event
   - Edit existing content
   - Upload media
   - Test the editorial workflow (drafts, review, publish)

## Project Structure

```
mosque-website/
├── _config.yml                 # Jekyll configuration
├── _layouts/                   # Template layouts
├── _includes/                  # Reusable components
├── _posts/                     # Blog posts
├── _events/                    # Events collection
├── _data/                      # Site data
├── assets/                     # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── pages/                      # Static pages
├── admin/                      # Netlify CMS admin area
└── index.html                  # Homepage
```

## Customizing the Theme

The website uses a custom Bootstrap 5 theme with Islamic-friendly colors and design. You can customize the theme by editing the following files:

- `assets/css/main.css`: Main stylesheets
- `assets/js/main.js`: JavaScript functionality
- `_includes/header.html` and `_includes/footer.html`: Page structure elements
- `_layouts/`: Page layout templates

## Adding Content

### Blog Posts

Create a new file in the `_posts` directory with the format `YYYY-MM-DD-title.md`:

```markdown
---
layout: post
title: "Post Title"
date: YYYY-MM-DD HH:MM:SS -0400
author: "Author Name"
category: "Category"
tags: ["tag1", "tag2"]
---

Content goes here...
```

### Events

Create a new file in the `_events` directory with the format `YYYY-MM-DD-title.md`:

```markdown
---
layout: event
title: "Event Title"
start_date: YYYY-MM-DD HH:MM:SS -0400
end_date: YYYY-MM-DD HH:MM:SS -0400
location: "Location"
recurring: false
---

Event description goes here...
```

### Pages

Create a new file in the `pages` directory:

```markdown
---
layout: page
title: "Page Title"
permalink: /pages/page-name/
---

Page content goes here...
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Troubleshooting

### Common Local Development Issues

1. **Ruby version mismatches**:
   - Check your Ruby version with `ruby -v`
   - Ensure it matches the version specified in `.ruby-version` or Gemfile
   - Use `rbenv` or `rvm` to manage multiple Ruby versions if needed

2. **Jekyll build errors**:
   - Run `bundle exec jekyll build --verbose` to see detailed error messages
   - Check Gemfile.lock for dependency conflicts
   - For Ruby 3.x compatibility issues, ensure you have the required gems: `gem install webrick csv base64 logger`

3. **Netlify CMS local backend not working**:
   - Verify that `local_backend: true` is set in `admin/config.yml`
   - Ensure netlify-cms-proxy-server is running
   - Check browser console for CORS or other errors
   - Make sure your browser supports local storage (used by the proxy server)

4. **EmailJS integration testing**:
   - Create a free account on EmailJS for testing: https://www.emailjs.com/
   - Set up a new service and template
   - Update the contact form with your test service ID, template ID and user ID
   - Test submissions will count toward the free tier limit

5. **Aladhan API issues**:
   - The site includes fallback data for when the API is unreachable
   - Use browser dev tools to inspect API requests if prayer times aren't loading
   - Consider implementing local caching to reduce API calls during development

## Contact

For questions or support, please contact:
- Email: contact@islamicsocietysheboygan.org
