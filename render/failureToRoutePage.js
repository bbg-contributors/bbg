import i18n from "../i18n.js";

export default function () {
    document.querySelector("#app").innerHTML = /* html */ `
                                                <div id="failure_to_route_page_container">
                                                    <mdui-card id="failure_to_route_page_card">
                                                        <mdui-card-content>
                                                            <h1><mdui-icon name="error" style="font-size:30px"></mdui-icon> ${i18n("failureroute_title")}${xss(bbg.cntPath)}</h1>
                                                            <p>${i18n("failureroute_desc")}</p>
                                                        </mdui-card-content>
                                                    </mdui-card>
                                                </div>`;
}
