# Nobreak Card

A custom Lovelace card for Home Assistant that displays Nobreak/UPS information.

## Installation

### HACS (Recommended)

1. Make sure [HACS](https://hacs.xyz/) is installed.
2. Search for "Nobreak Card" in the HACS Frontend section.
3. Install the card.
4. Add the card to your dashboard.

### Manual Installation

1. Download the `ha-card-nobreak.js` file from the latest release.
2. Upload the file to your `www` folder in Home Assistant.
3. Add a reference to the card in your `ui-lovelace.yaml`:

```yaml
resources:
  - url: /local/ha-card-nobreak.js
    type: module
```

## Usage

```yaml
type: custom:ha-card-nobreak
entity: sensor.your_ups_entity
```

## Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| entity | string | required | Entity ID of your UPS/Nobreak sensor |

## Development

### Setup
```bash
npm install
```

### Build
```bash
npm run build
```
