# Nobreak Card

A custom card to display Nobreak/UPS information in Home Assistant.

## Installation

1. Install via HACS
2. Add the card to your dashboard:

```yaml
type: custom:ha-card-nobreak
entity: sensor.your_ups_entity
```

## Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| entity | string | required | Entity ID of your UPS/Nobreak sensor |
```
