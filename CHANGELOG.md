# Changelog

All notable changes to the Krishna Infosys website are documented in this file.

Format: [Semantic Versioning](https://semver.org/).

## [1.0.0] — 2026-10-26

### Added
- Public marketing site (Home, About, Solutions, Industries, Projects, AMC, Contact, Careers, Blog, legal pages)
- Admin console (jobs, blog, leads CRM, users, MFA) — pre-Odoo phase
- MongoDB-backed public APIs for jobs, blog, contact, applications
- Lazy-loaded home sections; KI orbital route loading UI

### Security
- Custom admin sessions, RBAC/ABAC, TOTP MFA, idle session handling

### Notes
- Baseline release for ISO configuration control.
- Future CMS/CRM may move to Odoo; version history remains in git tags + this file.
