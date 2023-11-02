import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import { routes } from './app-routing.js';
import { defineComponents, IgcButtonComponent, IgcComboComponent, IgcRippleComponent } from 'igniteui-webcomponents';
import { CustomerDto } from './models/north-windv-2api/customer-dto';
import { northWindv2APIService } from './services/NorthWindv2API-service';

defineComponents(IgcComboComponent, IgcButtonComponent, IgcRippleComponent);

@customElement('app-root')
export default class App extends LitElement {
  static styles = css`
    :host {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
    }
    .column-layout {
      display: flex;
      flex-direction: column;
    }
    .group {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      min-width: 50px;
      min-height: 50px;
      flex-grow: 1;
      flex-basis: 0;
    }
    .group_1 {
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
      position: relative;
      min-width: 50px;
      min-height: 50px;
      flex-shrink: 0;
    }
    .row-layout {
      display: flex;
    }
    .single-select-combo {
      height: max-content;
      min-width: min-content;
    }
    .button {
      height: max-content;
    }
    .view-container {
      overflow: auto;
      display: block;
      position: relative;
      min-width: 0;
      min-height: 0;
      flex-grow: 1;
    }
  `;

  constructor() {
    super();
    northWindv2APIService.getCustomerDtoList().then((data) => {
      this.northWindv2APICustomerDto = data;
    }, err => console.log(err));
  }

  @state()
  private northWindv2APICustomerDto: CustomerDto[] = [];

  public singleSelectComboIgcChange(event: any) {
    northWindv2APIService.selectedCustomer.next(event.detail.newValue[0] as CustomerDto);
  }

  render() {
    return html`
      <link rel='stylesheet' href='../../ig-theme.css'>
      <div class="column-layout group">
        <div class="column-layout group_1">
          <igc-combo .data="${this.northWindv2APICustomerDto}" label="Label/Placeholder" display-key="customerId" ?outlined="${false}" ?single-select="${true}" @igcChange="${this.singleSelectComboIgcChange}" class="single-select-combo"></igc-combo>
          <igc-button size="large" @click="${() => Router.go('/child-view')}" class="button">
            Button
            <igc-ripple></igc-ripple>
          </igc-button>
        </div>
        <div class="row-layout group">
          <router-outlet class="view-container"></router-outlet>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    const outlet = this.shadowRoot?.querySelector('router-outlet');
    const router = new Router(outlet);
    router.setRoutes(routes);
  }
}
