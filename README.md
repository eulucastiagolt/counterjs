# CounterJS

[![GitHub license](https://img.shields.io/github/license/eulucastiagolt/counterjs)](https://github.com/eulucastiagolt/counterjs/blob/main/LICENSE)

A simple, lightweight and customizable countdown timer for your web projects.

## Features

- 🎨 Simple and clean API
- ⚡ Lightweight (~3KB minified)
- 🛠️ Highly customizable display
- 📱 Responsive design
- 📅 Supports dates in DD/MM/YYYY format
- ⏰ Supports time in HH:MM:SS format
- 🌍 Internationalization ready

## Installation

### Via CDN

```html
<script src="https://cdn.jsdelivr.net/gh/eulucastiagolt/counterjs@4.0.0/counter.min.js"></script>
```


## Usage

### Basic Usage

```html
<div data-counterjs data-counterjs-date="31/12/2025 23:59:59">
  Loading...
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const counter = new CounterJS();
    counter.init();
  });
</script>
```

### Advanced Usage

```html
<div
  data-counterjs
  data-counterjs-date="31/12/2025 23:59:59"
  data-counterjs-hide-year="false"
  data-counterjs-hide-month="false"
  data-counterjs-hide-day="false"
  data-counterjs-hide-hour="false"
  data-counterjs-hide-minute="false"
  data-counterjs-hide-second="false"
  data-counterjs-date-separator=" / "
  data-counterjs-time-separator=" : "
  data-counterjs-datetime-separator=" - "
  data-counterjs-label-year="A"
  data-counterjs-label-years="A"
  data-counterjs-label-month="M"
  data-counterjs-label-months="M"
  data-counterjs-label-day="D"
  data-counterjs-label-days="D"
  data-counterjs-label-hour="H"
  data-counterjs-label-hours="H"
  data-counterjs-label-minute="Min"
  data-counterjs-label-minutes="Min"
  data-counterjs-label-second="Seg"
  data-counterjs-label-seconds="Seg"
>
  Loading...
</div>
```

## Options

| Attribute | Description | Default |
|-----------|-------------|---------|
| `data-counterjs` | Initializes the counter on the element | - |
| `data-counterjs-date` | Target date (DD/MM/YYYY) and optional time (HH:MM:SS) | Required |
| `data-counterjs-hide-year` | Hide year | false |
| `data-counterjs-hide-month` | Hide month | false |
| `data-counterjs-hide-day` | Hide day | false |
| `data-counterjs-hide-hour` | Hide hour | false |
| `data-counterjs-hide-minute` | Hide minute | false |
| `data-counterjs-hide-second` | Hide second | false |
| `data-counterjs-date-separator` | Separator between date elements | " / " |
| `data-counterjs-time-separator` | Separator between time elements | " : " |
| `data-counterjs-datetime-separator` | Separator between date and time | " - " |
| `data-counterjs-label-year` | Custom label for year (singular) | "Ano" |
| `data-counterjs-label-years` | Custom label for years (plural) | "Anos" |
| `data-counterjs-label-month` | Custom label for month (singular) | "Mês" |
| `data-counterjs-label-months` | Custom label for months (plural) | "Meses" |
| `data-counterjs-label-day` | Custom label for day (singular) | "Dia" |
| `data-counterjs-label-days` | Custom label for days (plural) | "Dias" |
| `data-counterjs-label-hour` | Custom label for hour (singular) | "Hora" |
| `data-counterjs-label-hours` | Custom label for hours (plural) | "Horas" |
| `data-counterjs-label-minute` | Custom label for minute | "Min" |
| `data-counterjs-label-minutes` | Custom label for minutes | "Min" |
| `data-counterjs-label-second` | Custom label for second | "Seg" |
| `data-counterjs-label-seconds` | Custom label for seconds | "Seg" |

## Methods

### Initialize

```javascript
const counter = new CounterJS(selector);
counter.init();
```

### Destroy

```javascript
counter.destroy();
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE 11+

## License

MIT © [Lucas Tiago](https://github.com/eulucastiagolt)
