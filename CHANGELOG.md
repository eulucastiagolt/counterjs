# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.1.0] - 2025-01-28

### Added
- Hide label functionality for all time units
- New data attributes to hide labels individually:
  - `data-counterjs-hide-label-year` - Hide year label (keeps the number visible)
  - `data-counterjs-hide-label-month` - Hide month label (keeps the number visible)
  - `data-counterjs-hide-label-day` - Hide day label (keeps the number visible)
  - `data-counterjs-hide-label-hour` - Hide hour label (keeps the number visible)
  - `data-counterjs-hide-label-minute` - Hide minute label (keeps the number visible)
  - `data-counterjs-hide-label-second` - Hide second label (keeps the number visible)

### Features
- Create minimalist counters showing only numbers without labels
- Mix visible and hidden labels for custom designs
- Maintains full backward compatibility

### Usage Example
```html
<!-- Counter with only numbers, no labels -->
<div data-counterjs
     data-counterjs-date="31/12/2025 23:59:59"
     data-counterjs-hide-label-year="true"
     data-counterjs-hide-label-month="true"
     data-counterjs-hide-label-day="true"
     data-counterjs-hide-label-hour="true"
     data-counterjs-hide-label-minute="true"
     data-counterjs-hide-label-second="true">
</div>
```

## [4.0.0] - 2025-01-28

### Added
- Custom label support for all time units (year, month, day, hour, minute, second)
- New data attributes for label customization:
  - `data-counterjs-label-year` - Custom label for year (singular)
  - `data-counterjs-label-years` - Custom label for years (plural)
  - `data-counterjs-label-month` - Custom label for month (singular)
  - `data-counterjs-label-months` - Custom label for months (plural)
  - `data-counterjs-label-day` - Custom label for day (singular)
  - `data-counterjs-label-days` - Custom label for days (plural)
  - `data-counterjs-label-hour` - Custom label for hour (singular)
  - `data-counterjs-label-hours` - Custom label for hours (plural)
  - `data-counterjs-label-minute` - Custom label for minute
  - `data-counterjs-label-minutes` - Custom label for minutes
  - `data-counterjs-label-second` - Custom label for second
  - `data-counterjs-label-seconds` - Custom label for seconds

### Changed
- Default labels now support both singular and plural forms
- Labels are now fully customizable per counter instance

### Features
- Allows internationalization by customizing labels
- Supports abbreviated labels (e.g., "A" for "Ano", "M" for "Mês")
- Maintains backward compatibility with default Portuguese labels

## [3.0.2] - 2025-05-22

### Fixed
- Fixed display of empty separators
- Improved separator handling logic

### Changed
- Documentation moved to dedicated repository
- Added multi-language support in documentation
- Removed package manager references from documentation

## [3.0.1] - 2025-05-22

### Changed
- Translated all content to English
- Improved internationalization support

## [3.0.0] - 2025-05-22

### Added
- Support for date and time in DD/MM/YYYY HH:MM:SS format
- Customizable separator system:
  - `data-counterjs-date-separator` - Separator for date items (year/month/day)
  - `data-counterjs-time-separator` - Separator for time items (hour:minute:second)
  - `data-counterjs-datetime-separator` - Separator between date and time
- Option to hide counter when it reaches zero (`data-counterjs-hidden`)
- Better error handling for invalid dates

### Changed
- Improved counter display logic
- Optimized and cleaner code
- Enhanced overall performance

### Fixed
- Better handling of edge cases in date/time parsing

## [2.1.1] - 2025-05-22

### Added
- Support for partial date/time formats (date-only or time-only)
- Automatic fallback to current date when only time is provided
- Improved input validation

### Changed
- Enhanced error handling
- Better validation for date/time inputs

## [2.0.1] - 2025-05-21

### Changed
- Removed window event listener
- Code cleanup and optimization

## [2.0.0] - 2025-05-21

### Added
- Initial public release on GitHub
- Basic countdown timer functionality
- Support for DD/MM/YYYY date format
- Hide/show individual time units
- Automatic singular/plural handling for Portuguese labels
- Responsive design
- Lightweight implementation (~3KB minified)

### Features
- `data-counterjs` - Initialize counter
- `data-counterjs-date` - Target date
- `data-counterjs-hide-year` - Hide year unit
- `data-counterjs-hide-month` - Hide month unit
- `data-counterjs-hide-day` - Hide day unit
- `data-counterjs-hide-hour` - Hide hour unit
- `data-counterjs-hide-minute` - Hide minute unit
- `data-counterjs-hide-second` - Hide second unit

## [1.0.0] - 2021-09-14

### Added
- Initial commit
- Basic project structure

[4.1.0]: https://github.com/eulucastiagolt/counterjs/compare/v4.0.0...v4.1.0
[4.0.0]: https://github.com/eulucastiagolt/counterjs/compare/v3.0.2...v4.0.0
[3.0.2]: https://github.com/eulucastiagolt/counterjs/compare/v3.0.1...v3.0.2
[3.0.1]: https://github.com/eulucastiagolt/counterjs/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/eulucastiagolt/counterjs/compare/v2.1.1...v3.0.0
[2.1.1]: https://github.com/eulucastiagolt/counterjs/compare/v2.0.1...v2.1.1
[2.0.1]: https://github.com/eulucastiagolt/counterjs/compare/v1.0.0...v2.0.1
[2.0.0]: https://github.com/eulucastiagolt/counterjs/releases/tag/v2.0.0
[1.0.0]: https://github.com/eulucastiagolt/counterjs/releases/tag/v1.0.0
