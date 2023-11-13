const html = window.igTemplating.html;
igRegisterScript("columnBodyTemplateScript", (ctx) => {
    // Bug templating: .click -> @click
    return html`
        <igc-button master-view-scope size="large" @click="${() => {console.log(ctx); window.dotNetHelper.invokeMethodAsync('SetOrderId', ctx.implicit)}}" class="button">
            Button
            <igc-ripple></igc-ripple>
        </igc-button>
    `
}, false);

window.setDotNetRef = (dotNetHelper) => {
    window.dotNetHelper = dotNetHelper;
}
