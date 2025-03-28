import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './styles.css';

@customElement('ha-card-nobreak')
class NoBreakCard extends LitElement {
  @property({ type: Object }) hass;
  @property({ type: Object }) config;
  @property({ type: Boolean }) _isMocked = false;

  static getStubConfig() {
    return {
      title: 'NoBreak / UPS',
      entity: '',
      show_status: true,
      show_battery: true,
      show_input_voltage: true,
      show_output_voltage: true,
      show_load: true,
      show_time_left: true,
    };
  }

  setConfig(config) {
    if (!config.entity && !config.mock) {
      throw new Error('You need to specify an entity or enable mock data');
    }
    this.config = config;
    this._isMocked = Boolean(config.mock);
  }

  getCardSize() {
    return 3;
  }

  getMockedStateObj() {
    return {
      state: 'online',
      attributes: {
        friendly_name: 'NoBreak / UPS',
        battery_level: 85,
        input_voltage: 127,
        output_voltage: 127,
        load: 43,
        time_left: '2h 15min',
      }
    };
  }

  render() {
    if (!this.config || (!this.hass && !this._isMocked)) {
      return html`<ha-card>Please configure card</ha-card>`;
    }

    let stateObj;

    if (this._isMocked) {
      stateObj = this.getMockedStateObj();
    } else {
      stateObj = this.hass.states[this.config.entity];
    }

    if (!stateObj) {
      return html`
        <ha-card>
          <div class="card-header">
            <div>
              <ha-icon icon="mdi:power-plug-off"></ha-icon>
              ${this.config.title || 'NoBreak / UPS'}
            </div>
          </div>
          <div class="card-content">
            Entity not found: ${this.config.entity}
          </div>
        </ha-card>
      `;
    }

    const batteryLevel = stateObj.attributes.battery_level || 0;
    const inputVoltage = stateObj.attributes.input_voltage || 0;
    const outputVoltage = stateObj.attributes.output_voltage || 0;
    const load = stateObj.attributes.load || 0;
    const timeLeft = stateObj.attributes.time_left || 'N/A';

    let statusClass = 'status-offline';
    let statusText = 'Offline';
    let statusIcon = 'mdi:power-plug-off';

    if (stateObj.state === 'online') {
      statusClass = 'status-online';
      statusText = 'Online';
      statusIcon = 'mdi:power-plug';
    } else if (stateObj.state === 'battery') {
      statusClass = 'status-battery';
      statusText = 'On Battery';
      statusIcon = 'mdi:battery';
    }

    let batteryLevelClass = '';
    if (batteryLevel < 20) {
      batteryLevelClass = 'status-low';
    } else if (stateObj.state === 'battery') {
      batteryLevelClass = 'status-battery';
    }

    return html`
      <ha-card>
        <div class="card-header">
          <div>
            <ha-icon icon="${statusIcon}"></ha-icon>
            ${this.config.title || stateObj.attributes.friendly_name}
          </div>
        </div>
        <div class="card-content">
          ${this.config.show_status !== false ? html`
            <div class="status-indicator ${statusClass}">
              <div class="status-circle"></div>
              <div class="status-text">${statusText}</div>
            </div>
          ` : ''}

          ${this.config.show_battery !== false ? html`
            <div class="battery-level ${batteryLevelClass}">
              <div class="battery-level-inner" style="width: ${batteryLevel}%"></div>
              <div class="battery-level-text">${batteryLevel}%</div>
            </div>
          ` : ''}

          <div class="grid-container">
            ${this.config.show_input_voltage !== false ? html`
              <div class="grid-item">
                <div class="grid-item-value">${inputVoltage}V</div>
                <div class="grid-item-label">Input Voltage</div>
              </div>
            ` : ''}

            ${this.config.show_output_voltage !== false ? html`
              <div class="grid-item">
                <div class="grid-item-value">${outputVoltage}V</div>
                <div class="grid-item-label">Output Voltage</div>
              </div>
            ` : ''}

            ${this.config.show_load !== false ? html`
              <div class="grid-item">
                <div class="grid-item-value">${load}%</div>
                <div class="grid-item-label">Load</div>
              </div>
            ` : ''}

            ${this.config.show_time_left !== false ? html`
              <div class="grid-item">
                <div class="grid-item-value">${timeLeft}</div>
                <div class="grid-item-label">Time Left</div>
              </div>
            ` : ''}
          </div>
        </div>
      </ha-card>
    `;
  }
}

export default NoBreakCard;
